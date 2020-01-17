const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: "gmail"
	// Auth required
});

module.exports = transporter;
