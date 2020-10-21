const Spell = require('./models/Spell');

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
  },
  checkSpellAuthorship: (req, res, next) => {
    if (req.isAuthenticated()) {
      // Check if spell exists
      Spell.findById(req.params.id)
        .then(foundSpell => {
          if (foundSpell.author.id.equals(req.user.id)) {
            next();
          } else {
            req.flash('error_msg', 'You do not have permission to do that');
            res.redirect('/spells');
          };
        })
        .catch(err => {
          req.flash('error_msg', 'That spell does not exist');
          res.redirect('/spells');
        });
    } else {
      req.flash('error_msg', 'You must be logged in to do that');
      res.redirect('/users/login');
    }
  }
}