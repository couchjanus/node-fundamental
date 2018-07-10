const models = require('../entities');

// const async = require('async');
const shared = require('../helpers');
const config = require('../config');
const moment = require('moment-timezone');

exports.changePassword = {
	get: function(req, res) {
		res.render('users/change-password', { title: 'Change Password', minimumPasswordLength: config.login.minimumPasswordLength, csrf: req.csrfToken() });
	},
	post: function(req, res, next) {
		req.assert('password', 'Please enter a password of at least ' + config.login.minimumPasswordLength + ' characters.').len(config.login.minimumPasswordLength);
		req.assert('confirmPassword', 'Your passwords must match.').equals(req.body.password);

		let errors = req.validationErrors();

		if (errors) {
			req.flash('errors', errors);
			return res.redirect('back');
		}

		models.User.findOne({ email: req.user.email }, function(err, user) {
			if (err) {
				console.log(err);
				req.flash('errors', { msg: 'There was an error retrieving your user data from the database.  Please try again.' });
				return res.redirect('back');
			}

			user.password = req.body.password;

			user.save(function(err) {
				if (err) {
					console.log(err);
					req.flash('errors', { msg: 'There was an error updating your password in the database.  Please try again.' });
					return res.redirect('back');
				}

				req.flash('success', { msg: 'Your password has been successfully updated.' });
				res.redirect('/');
			});
		});
	}
};


exports.forgotPassword = {
	get: function(req, res) {
		if (req.isAuthenticated()) {
			return res.redirect('/');
		}

		res.render('auth/forgot', { title: 'Forgot Password'});
	},
	post: function(req, res, next) {
		req.assert('email', 'Please provide a valid email address.').isEmail();
		let errors = req.validationErrors();
		if (errors) {
			req.flash('errors', errors);
			return res.redirect('/forgot');
		}
		let passwordResetToken = shared.createRandomToken();
		let passwordResetExpires = moment().add(config.passwordResetTimeLimitInHours, 'hours').tz(config.timezone);

		models.User.findOneAndUpdate({ email: req.body.email }, { passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires }, function(err, user) {
			if (err) {
				console.log(err);
				req.flash('errors', { msg: 'There was an error setting your password reset token.  Please try again.' });
				return res.redirect('/forgot');
			}
			require('../helpers/reset')(req, req.body.email, passwordResetExpires,passwordResetToken);
			res.redirect('/');
		});
	}
};


// exports.resetPassword = {
// 	get: function(req, res) {
// 		if (req.isAuthenticated()) {
// 			return res.redirect('/');
// 		}

// 		models.User
// 			.findOne({ passwordResetToken: req.params.passwordResetToken })
// 			.where('passwordResetExpires').gt(moment().tz(config.server.timezone))
// 			.exec(function(err, user) {
// 				if (err) {
// 					console.log(err);
// 					req.flash('errors', { msg: 'There was an error retrieving your user information from the database.' });
// 					return res.redirect('/forgot');
// 				}

// 				if (!user) {
// 					req.flash('errors', { msg: 'Your password reset token is invalid or it has expired.'});
// 					return res.redirect('/forgot');
// 				}

// 				res.render('users/reset', { title: 'Reset Password', minimumPasswordLength: config.login.minimumPasswordLength, csrf: req.csrfToken() });
// 			});
// 	},
// 	post: function(req, res, next) {
// 		req.assert('password', 'Please enter a password of at least ' + config.login.minimumPasswordLength + ' characters.').len(config.login.minimumPasswordLength);
// 		req.assert('confirmPassword', 'Your passwords must match.').equals(req.body.password);

// 		let errors = req.validationErrors();

// 		if (errors) {
// 			req.flash('errors', errors);
// 			return res.redirect('back');
// 		}

// 		models.User
// 			.findOne({ passwordResetToken: req.params.passwordResetToken })
// 			.where('passwordResetExpires').gt(moment().tz(config.server.timezone))
// 			.exec(function(err, user) {
// 				if (err) {
// 					console.log(err);
// 					req.flash('errors', { msg: 'There was an error retrieving your user information from the database.' });
// 					return res.redirect('back');
// 				}

// 				if (!user) {
// 					req.flash('errors', { msg: 'Your password reset token is invalid or it has expired.'});
// 					return res.redirect('/forgot');
// 				}

// 				user.password = req.body.password;
// 				user.passwordResetToken = undefined;
// 				user.passwordResetExpires = undefined;
// 				user.loginAttempts = 0;
// 				user.lockUntil = undefined;

// 				user.save(function(err) {
// 					if (err) {
// 						console.log(err);
// 						req.flash('errors', { msg: 'There was an error updating your password in the database.' });
// 						return res.redirect('back');
// 					}

// 					req.flash('success', { msg: 'Your password has been successfully updated.  You may now log in with your new password.' });
// 					res.redirect('/login');
// 				});
// 			});
// 	}
// };

exports.confirmation = {
	get: function(req, res) {
		if (req.isAuthenticated()) {
			return res.redirect('/');
		}

		models.User.findOneAndUpdate({ verificationToken: req.params.verificationToken }, { isVerified: true }, function(err, user) {
			if (err) {
				console.log(err);
				req.flash('errors', { msg: 'There was an error verifying your email address.' });
				return res.redirect('/');
			}

			if (!user) {
				req.flash('errors', { msg: 'Your verification token is invalid.  Please enter your email address below to receive a new verification token.' });
				return res.redirect('/verify-resend');
			}

			req.flash('success', { msg: 'Your email address has been verified.  You may now log in.' });
			res.redirect('/login');
		});
	}
};

exports.verifyResend = {
	resendEmail: function(req, res, emailAddress) {
		var verificationToken = utility.createRandomToken();

		models.User.findOneAndUpdate({ email: emailAddress }, { verificationToken: verificationToken }, function(err, user) {
			if (err) {
				console.log(err);
				req.flash('errors', { msg: 'There was an error retrieving user information from the database.  Please try again.' });
				return res.redirect('/verify-resend');
			}

			if (!user) {
				req.flash('errors', { msg: 'No user with that email address exists.  Please try another email address.' });
				return res.redirect('/verify-resend');
			}

			if (user.isVerified) {
				req.flash('info', { msg: 'Your email address has already been verified.  Please log in.' });
				return res.redirect('/login');
			}

			shared.sendEmail(emailAddress, config.email.sendFrom, 'Email Verification Required', '<p>You have requested a new verification email.  Before you can log in, you must verify your email address:</p><a href="' + shared.constructUrl(req, '/users/verify/' + verificationToken) + '">Verify your email address</a>', 'text/html', function(err, json) {
					if (err) {
						console.log(err);
						req.flash('errors', { msg: 'There was an error sending your verification email.  Please try again.' });
						return res.redirect('/verify-resend');
					}

					req.flash('info', { msg: 'Check your inbox for the new verification email.'});
					res.redirect('/login');
				});
		});
	},
	get: function(req, res) {
		if (req.isAuthenticated()) {
			return res.redirect('/');
		}

		if (req.params.email) {
			exports.verifyResend.resendEmail(req, res, req.params.email);
		}
		else {
			res.render('users/verify-resend', { title: 'Re-Send Verification Email', csrf: req.csrfToken() });
		}
	},
	post: function(req, res) {
		req.assert('email', 'Please provide a valid email address.').isEmail();

		let errors = req.validationErrors();

		if (errors) {
			req.flash('errors', errors);
			return res.redirect('/login');
		}

		exports.verifyResend.resendEmail(req, res, req.body.email);
	}
};
