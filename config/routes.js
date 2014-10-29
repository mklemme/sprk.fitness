var routeMiddleware = {
  checkAuthentication: function(req, res, next) {
    if (!req.user) {
      res.redirect('/login', {messages: "Please log in first"});
    }
    else {
     return next();
    }
  },

  preventLoginSignup: function(req, res, next) {
    if (req.user) {
      res.redirect('/home');
    }
    else {
     return next();
    }
  }
};
module.exports = routeMiddleware;

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};
