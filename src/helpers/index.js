const crypto = require('crypto');

exports.createRandomToken = function() {
	return crypto.randomBytes(20).toString('hex');
};

exports.getUserId = function(req, res) {
	if (typeof req.user !== 'undefined') {
		return req.user.id;
	}

	return false;
};
