// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../entities');
const shared = require('../helpers');

// const moment = require('moment-timezone');
const config = require('../config');


// var configAuth = require('./auth');
// var crypto = require('crypto');


module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        //   сохранит поле user.id в сеансе и cookie
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findById(id, function(err, user) {
        done(err, user);
        });
    });

    // login - имя стратегии, которое будет использоваться для идентификации этой стратегии
    // LocalStrategy(username-password) тип стратегии, которую вы хотите создать
    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        //позволяет получить доступ к объекту request в функции обратного вызова
        passReqToCallback : true
    },
    function(req, email, password, done) {
        // проверка в mongo, существует ли пользователь с таким логином
        models.User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user){
                console.log('No user found.');
                return done(null, false, req.flash('loginMessage', 'No user found.'));
                
            }
            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                console.log('Oops! Wrong password.');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                
            }
            // Make sure the user has been verified
            if (!user.isVerified) {
                console.log('Your account has not been verified.');
                return done(null, false, req.flash('loginMessage', 'Your account has not been verified.'));
            }

            return done(null, user);
        });

    }));


    passport.use('signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

        function(req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            models.User.findOne({ 'email' :  email }, (err, user) => {
                // if there are any errors, return the error
                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('errors', 'A user with that email address already exists.  Please try another email address.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    let verificationToken = shared.createRandomToken();
                    let user = new models.User();
                    user.password = password;
                    user.email = email;
                    user.verificationToken = verificationToken;
                    user.isVerified = false;
                    user.profile.firstName = req.body.firstName;
                    user.profile.lastName = req.body.lastName;
                    // save the user
                    user.save(function(err) {
                        if (err){
                            console.log(`There was the error: ${err} creating the user in the database.  Please try again.`);
                            return done(null, false, req.flash('signupMessage', `There was the error: ${err} creating the user in the database.  Please try again.`));

                        }
                    // Send the email
                    require('../helpers/mail')(req, user);
                    });
                    return done(null, user);
                }
            });
    }));

}