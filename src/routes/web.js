import express from 'express';
const router = new express.Router();
const passport = require('passport');
const controllers = require('../controllers');
const isAuth = require('../middlewares/isAuth');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/home/index', { title: 'Hey Pug', messages: req.flash('loginMessage')});
});

/* GET Login page. */
router.get('/login', (req, res) => {
  return res.render('auth/login', {title: "Login page", info: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('login', {
  successRedirect : '/home', // TODO: redirect to the secure profile section
  failureRedirect : '/', // TODO: redirect back to the signin page if there is an error
        failureFlash : true // allow flash messages
}));

router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
});

/*
* Handle Signup routes
* */

router.get('/signup', (req, res) => {
  return res.render('auth/register', {title: "Signup page", message: req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect : '/signup', 
    failureFlash : true // allow flash messages
}));

router.get('/confirmation/:verificationToken', controllers.auth_controller.confirmation.get);

// forgot-password

router.get('/forgot', controllers.auth_controller.forgotPassword.get);

router.post('/forgot', controllers.auth_controller.forgotPassword.post);



// router.get('/verify-resend/:email?', controllers.auth_controller.verifyResend.get);
// router.post('/verify-resend', controllers.auth_controller.verifyResend.post);

// router.get('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.get);
// router.post('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.post);

// router.get('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.get);
// router.post('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.post);



/* Handle Logout */
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/logout', isAuth.isAuthenticated, function(req, res) {
  req.logout();
  res.redirect('/');
});

// /* GET Home Page */
router.get('/home', isAuth.isAuthenticated, function(req, res){
  res.render('user/home', { title: "Home Page", user: req.user });
});





module.exports = router;
