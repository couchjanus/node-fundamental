const passport = require('passport');
const models = require('../../entities');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findById(id, function (err, user) {
      done(err, user);
    });
  });

};
