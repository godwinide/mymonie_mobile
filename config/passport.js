const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Account = require('../model/Account');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'account_number' }, (username, password, done) => {
      // Match user
      Account.findOne({
        account_number: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'invalid credentials' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
