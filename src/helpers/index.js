const crypto = require('crypto');
const config = require('../config');


exports.createRandomToken = function() {
	return crypto.randomBytes(20).toString('hex');
};

exports.constructUrl = function(req, path) {
	return req.protocol + '://' + req.get('host') + path;
};


exports.getUserId = function(req, res) {
	if (typeof req.user !== 'undefined') {
		return req.user.id;
	}

	return false;
};

