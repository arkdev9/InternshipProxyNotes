var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var VideoSchema = mongoose.Schema({
	name: { type: String, required: true },
	path: { type: String, required: true }
});

var User = mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	videos: [VideoSchema]
});

User.pre("save", function (next) {
	const user = this;
	if (user.password === undefined) {
		return next();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) console.log(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) console.log(err);
			user.password = hash;
			next();
		});
	});
});

User.methods.checkPassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if (err) return cb(err, false);
		return cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', User, 'proxy-users');