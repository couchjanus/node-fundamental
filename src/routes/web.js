import express from 'express';
const router = new express.Router();
const passport = require('passport');

const isAuth = require('../middlewares/isAuth');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/home/index', { title: 'Hey Pug', message: 'Hello there Pug!'});
});

/* GET Login page. */
router.get('/login', (req, res) => {
  return res.render('auth/login', {title: "Login page", message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/user/profile', // TODO: redirect to the secure profile section
  failureRedirect : '/login', // TODO: redirect back to the signin page if there is an error
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
    successRedirect : '/user/profile', // TODO: redirect to the secure profile section
    failureRedirect : '/signup', // TODO: redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// forgot-password

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
  res.render('/user/home', { user: req.user });
});
 
module.exports = router;
