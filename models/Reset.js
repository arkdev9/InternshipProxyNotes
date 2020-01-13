var mongoose = require('mongoose');

var Reset = mongoose.Schema({
	username: { type: String, required: true },
	code: { type: String, minlength: 4, maxlength: 4 },
	exp: { type: Date }
});

module.exports = mongoose.model('Rest', Reset, 'proxy-users-reset');