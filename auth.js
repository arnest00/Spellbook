module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    };

    req.flash('error_msg', 'You must be logged in to do that');
    res.redirect('/users/login');
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    };

    req.flash('success_msg', 'You are already logged in')
    res.redirect('/spells');
  }
}