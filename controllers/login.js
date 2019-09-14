const passport = require('passport');
exports.loginDesktop = function (req,res) {
  console.log(req.ip);
}
exports.login = function (req,res,next) {
  console.log(req.body.login);
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Пользователь не найден.');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/index');
    });
  })(req, res, next);
}


exports.logout = function (req, res) {
  req.logOut();
  res.redirect('/');
};


exports.auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};


exports.geniral = function (req, res) {
  res.render('login');
}
