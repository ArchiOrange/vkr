const passport = require('passport');
var Login= require('./models/login');
const LocalStrategy = require('passport-local').Strategy;
var Sha1 = require('sha1');

var userDB = {
  id: null,
  login: null,
  password: null
};
passport.serializeUser(function(user, cb) {
  cb(null, user);
});


passport.deserializeUser(function(id, done) {
  Login.selectSession(id,function (err,docs) {
    var user = docs
    done(null, user);
  })

});
passport.use(new LocalStrategy(
  { usernameField: 'login' },function(login, password, done) {
    SHA1password = Sha1(password);
    Login.getPersonalData(login, SHA1password, function (err, result, failed) {
      //console.log(result);
      if (result!= 0)  {
            userDB.id = result[0].id;
            userDB.login = result[0].login;
            userDB.photo = result[0].photo;
        return done(null, userDB);
      } else {
        return done(null, false);
      }
    })
  })
);
