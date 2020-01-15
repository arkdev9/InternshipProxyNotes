var express = require('express');
var formidable = require('formidable');
var router = express.Router();

router.post('/upload', (req, res) => {
	new formidable.IncomingForm().parse(req, (err, fields, files) => {
		if (err) {
			console.error('Error', err)
			throw err
		}
		console.log('Fields', fields)
		console.log('Files', files)
		for (const file of Object.entries(files)) {
			console.log(file)
		}
	});
});

module.exports = router;
