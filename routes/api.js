var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.render('signin', { title: 'Sign in' });
});

router.get('/signup', (req, res) => {
	res.render('signup', { title: 'Sign up' });
});

router.get('/forgot', (req, res) => {
	res.render('forgot', { title: 'Forgot password' });
});

router.get('/reset', (req, res) => {
	res.render('reset', { title: 'Reset password' });
});

module.exports = router;
