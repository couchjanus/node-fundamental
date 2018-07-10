const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const models = require('../../entities');
const config = require('../../config');
const init = require('./init');

passport.use(new GitHubStrategy({
  clientID: '7330f48ab651211604f6',
  clientSecret: 'bc121607e7e15d2117e8a517bffa31c008a3d463',
  callbackURL: 'http://localhost:3000/auth/github/callback'
  },

  function(accessToken, refreshToken, profile, done) {

    let searchQuery = {
      name: profile.displayName
    };

    let updates = {
      name: profile.displayName,
      socID: profile.id
    };

    let options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    models.User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;
