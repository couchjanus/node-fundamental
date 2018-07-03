// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../entities');
// const moment = require('moment-timezone');
// const config = require('../config');


// var configAuth = require('./auth');
// var crypto = require('crypto');


module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        //   сохранит поле user.id в сеансе и cookie
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
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
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);
        });

    }));

    passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
        // find a user in Mongo with provided username
        User.findOne({'username':username},function(err, user) {
            // In case of any error return
            if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
            }
            // already exists
            if (user) {
            console.log('User already exists');
            return done(null, false, 
                req.flash('message','User Already Exists'));
            } else {
            // if there is no user with that email
            // create the user
            let newUser = new User();
            // set the user's local credentials
            
            // newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            newUser.profile.firstName = req.param('firstName');
            newUser.profile.lastName = req.param('lastName');
    
            // save the user
            newUser.save(function(err) {
                if (err){
                console.log('Error in Saving user: '+err);  
                throw err;  
                }
                console.log('User Registration succesful');    
                return done(null, newUser);
            });
            }
        });
        };
        
        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
}



// passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, email, password, done) {
//     process.nextTick(function() {
//      models.User.findOne({ 'email' :  email }, function(err, user) {
//         if (err)
//             return done(err);
//         if (user) {
//             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//         } else {
//             let newUser            = new models.User();
//             newUser.email    = email;
//             newUser.profile.name   = req.body.name;
//             newUser.password = newUser.generateHash(password);
//             newUser.save(function(err) {
//                 if (err)
//                     throw err;
//                 return done(null, newUser);
//             });
//         }

//     });

//     });

// }));


// function getGAvatar(emailAdr) {
//    var mailToHash= crypto.createHash('md5').update(emailAdr).digest("hex");
//    return "https://www.gravatar.com/avatar/" + mailToHash + "?s=400";
// }


// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const models = require('../entities');
// const moment = require('moment-timezone');
// const config = require('../config');



// passport.use(new LocalStrategy({ usernameField: 'email' }, 
// (email, password, done) => {
// 	// проверка в mongo, существует ли пользователь с таким логином
// 	models.User.findOne({ email: email }, (err, user) => {
// 		if (!user) {
// 			// Пользователь не существует, ошибка входа и перенаправление обратно
// 			return done(null, false, { msg: 'No user with the email ' + email + ' was found.' });
// 		}

// 		if (!user.isVerified) {
// 			return done(null, false, { msg: 'Your email has not been verified.  Check your inbox for a verification email.<p><a href="/auth/verify-resend/' + email + '" class="btn waves-effect white black-text"><i class="material-icons left">email</i>Re-send verification email</a></p>' });
// 		}

// 		if (user.isLocked) {
// 			return user.incrementLoginAttempts((err) => {
// 				if (err) {
// 					return done(err);
// 				}

// 				return done(null, false, { msg: 'You have exceeded the maximum number of login attempts.  Your account is locked until ' + moment(user.lockUntil).tz(config.server.timezone).format('LT z') + '.  You may attempt to log in again after that time.' });
// 			});
// 		}

// 		user.comparePassword(password, (err, isMatch) => {
// 			if (isMatch) {
// 				// Пользователь существует и пароль верен верно
//         		// return метода done, что будет означать успешную аутентификацию
// 				return done(null, user);
// 			}
// 			else {
// 				user.incrementLoginAttempts((err) => {
// 					if (err) {
// 						return done(err);
// 					}
// 					// Пользователь существует, но пароль введен неверно
// 					return done(null, false, { msg: 'Invalid password.  Please try again.' });
// 				});
// 			}
// 		});
// 	});
// }));

// // As with any middleware it is quintessential to call next()
// // if the user is authenticated
// exports.isAuthenticated = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	}

// 	req.flash('info', { msg: "You must be logged in to visit that page." });
// 	res.redirect('/login');
// };

