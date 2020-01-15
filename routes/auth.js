var express = require('express');
var User = require('../models/User');
var Reset = require('../models/Reset');
var transporter = require('../mailer');

var router = express.Router();

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}

function checkSignedIn(req, res, next) {
	if (req.session.signedIn) {
		res.status(200).json({ success: false, reason: "Already signed in!" });
	} else {
		next();
	}
}

router.post('/signout', (req, res) => {
	if (req.session.signedIn) {
		req.session.destroy((err) => {
			if (err) res.status(500).json({ success: false, reason: err });
			else res.status(200).json({ success: true, message: "Signed out" });
		});
	} else {
		res.status(200).json({ success: true, message: "You're not signed in" });
	}
});

router.post('/signup', checkSignedIn, (req, res) => {
	if (req.body.username) {
		User.exists({ username: req.body.username })
			.then((exists) => {
				if (exists) {
					res.status(200).json({ success: false, reason: "Username already exists. Please sign in." })
				} else {
					User.create({
						username: req.body.username,
						password: req.body.password
					}).then((user) => {
						req.session.signedIn = true;
						req.session.user = user;
						res.status(200).json({ success: true });
					}).catch((reason) => {
						res.status(500).json({ success: false, reason: reason });
					});
				}
			})
			.catch((reason) => {
				res.status(500).json({ success: false, reason: reason });
			});
	} else {
		res.status(200).send("Invalid credentials");
	}
});

router.post('/signin', checkSignedIn, (req, res) => {
	User.exists({ username: req.body.username }).then((exists) => {
		if (exists) {
			User.findOne({ username: req.body.username })
				.then((user) => {
					user.checkPassword(req.body.password, (err, isMatch) => {
						if (err) res.status(500).status({ success: false, reason: err });
						else if (isMatch) {
							req.session.signedIn = true;
							req.session.user = user;
							res.status(200).json({ success: true, message: "Signed in!" });
						}
						else res.status(200).json({ success: false, reason: "Invalid password" });
					});
				})
				.catch((reason) => {
					res.status(500).send(reason);
				});
		} else {
			res.status(200).json({ success: false, reason: "Invalid username" });
		}
	}).catch((reason) => {
		res.status(500).send(reason);
	})
});

// Generate code and send email
router.post('/forgot', checkSignedIn, (req, res) => {
	if (req.body.username) {
		User.findOne({ username: req.body.username })
			.then((user) => {
				var code = Math.floor(Math.random() * 10000);
				Reset.create({
					username: user.username,
					code: code,
					exp: new Date().addHours(1)
				}).then((doc) => {
					var body = '<h2>If you received this email, you previously' +
						' registered and requested to reset your password</h2>' +
						'<p>Enter this code when prompted: ' + code + ' at this' +
						'<a href="http://localhost:3000/reset/"> link.</a></p>';
					const mailOptions = {
						from: "rogueDev21@gmail.com",
						to: user.username,
						subject: 'Password Reset',
						html: body
					};
					transporter.sendMail(mailOptions, (err, info) => {
						if (err) {
							res.status(500).json({ err: err });
						} else {
							res.status(200).json({
								success: true,
								message: 'Email sent successfully!',
								info: info
							});
						}
					});
				}).catch((reason) => {
					res.status(500).json({ success: false, reason: reason });
				});
			}).catch((err) => {
				res.status(500).json({
					success: false,
					reason: 'No account is registered with that email'
				});
			});
	} else {
		res.status(200).json({ success: false, status: 'No email is entered' });
	}
});

// Check code and reset
router.post('/reset', (req, res) => {
	if (req.body.username) {
		User.findOne({ username: req.body.username })
			.then((user) => {
				Reset.exists({ username: user.username, code: req.body.code }).then((exists) => {
					if (exists) {
						user.password = req.body.password
						user.save();
						res.status(200).json({ success: true, message: "Password reset!" });
					} else {
						res.status(200).json({ success: false, reason: "Invalid code" });
					}
				}).catch((reason) => {
					res.status(500).json({ success: false, reason: reason, stop: 1 });
				})
			})
			.catch((reason) => {
				res.status(500).json({ success: false, reason: reason, stop: 2 });
			})
	} else {
		res.status(200).json({ success: false, reason: "Check credentials" });
	}
});

module.exports = router;
