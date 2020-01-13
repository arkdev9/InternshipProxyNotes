const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "rogueDev21@gmail.com",
		pass: "Abhinov21$"
	}
});

module.exports = transporter;