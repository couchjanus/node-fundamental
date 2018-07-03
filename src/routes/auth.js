const router = require('express').Router();
const controllers = require('../controllers');
// const authentication = require('../middleware/authentication');

// const passportLinkedIn = require('../middleware/auth/linkedin');
// const passportGithub = require('../middleware/auth/github');
// const passportTwitter = require('../middleware/auth/twitter');

router.get('/login', controllers.auth_controller.login.get);
// router.post('/login', controllers.auth_controller.login.post);
router.get('/register', controllers.auth_controller.register.get);
// router.post('/register', controllers.auth_controller.register.post);
// router.get('/logout', authentication.isAuthenticated, controllers.auth_controller.logout.get);

// router.get('/verify/:verificationToken', controllers.auth_controller.verify.get);
// router.get('/verify-resend/:email?', controllers.auth_controller.verifyResend.get);
// router.post('/verify-resend', controllers.auth_controller.verifyResend.post);
// router.get('/forgot', controllers.auth_controller.forgotPassword.get);
// router.post('/forgot', controllers.auth_controller.forgotPassword.post);
// router.get('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.get);
// router.post('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.post);

// router.get('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.get);
// router.post('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.post);

// router.get('/linkedin', passportLinkedIn.authenticate('linkedin'));

// router.get('/linkedin/callback',
//   passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback',
//   passportGithub.authenticate('github', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/google', passportGoogle.authenticate('google', { scope: [ 'user:email' ] }));

// router.get('/google/callback',
//   passportGoogle.authenticate('google', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/facebook', passportFacebook.authenticate('facebook', { scope: [ 'user:email' ] }));

// router.get('/facebook/callback',
//   passportFacebook.authenticate('facebook', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/twitter', passportTwitter.authenticate('twitter'));

// router.get('/twitter/callback',
//   passportTwitter.authenticate('twitter', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

module.exports = router;
