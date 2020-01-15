var express = require('express');
var User = require('../models/User');
var router = express.Router();

var unprotectedUrls = [
	'/api/auth/signout',
	'/api/auth/signin',
	'/api/auth/signup',
	'/api/auth/reset',
	'/api/auth/forgot',
	'/api/forgot',
	'/api/signup',
	'/api'
];
router.use((req, res, next) => {
	if (!req.session.signedIn) {
		if (unprotectedUrls.includes(req.originalUrl)) next();
		else res.redirect('/api');
	} else {
		next();
	}
});

router.get('/', (req, res) => {
	User.findById(req.session.user._id, (err, user) => {
		if (err) {
			console.error(err);
			res.send("Something went wrong\n" + err);
		} else {
			console.log(JSON.stringify(user));
			res.render('index', { title: 'Home | Proxy Notes API', videos: user.videos });
		}
	});
});

module.exports = router;
