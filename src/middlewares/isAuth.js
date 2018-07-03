// As with any middleware it is quintessential to call next()
// if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	req.flash('info', { msg: "You must be logged in to visit that page." });
	res.redirect('/login');
};
