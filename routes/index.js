var express = require('express');
var router = express.Router();

var unprotectedUrls = [
	'/api/auth/signout',
	'/api/auth/signin',
	'/api/auth/signup',
	'/api/auth/reset',
	'/api/signup',
	'/api/forgot',
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
	res.render('index', { title: 'Home | Proxy Notes API' });
});

module.exports = router;
