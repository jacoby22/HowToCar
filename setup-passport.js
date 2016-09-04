var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
  domain:       'app55939845.auth0.com',
  clientID:     'SRdhH0HiDy8RsMiGkuHTAbFmAWPYO1ZV',
  clientSecret: 'ab1FaBisHks9YbbHPhDV3iYfgMZ412Kw-87hQVsiYsqHIG_8gONEzNE4GYY-ZX6A',
  callbackURL:  '/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    console.log('We used our strategy');
  return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
