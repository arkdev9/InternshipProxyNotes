var express = require('express');
var formidable = require('formidable');
var User = require('../models/User');
var router = express.Router();

var uploadDir = __dirname.split('/');
uploadDir.pop();
uploadDir.push('public');
uploadDir.push('videos');
uploadDir = uploadDir.join('/');

router.post('/upload', (req, res) => {
	console.log(uploadDir);
	var form = new formidable.IncomingForm({
		uploadDir: uploadDir,
		keepExtensions: true
	});

	form.parse((req), (err, fields, files) => {
		if (err) res.status(500).send(err);
		else {
			var user = User.findById(req.session.user._id, (err, user) => {
				if (err) {
					console.error(err);
					res.status(500).send(err);
				} else {
					user.videos.push({ name: files.video.name, path: files.video.path });
					user.save((err, doc) => {
						if (err) {
							console.error(err);
							res.status(500).send(err);
						} else {
							res.status(200).json({ files: files, user: doc });
						}
					});
				}
			});
		}
	});
});

module.exports = router;
