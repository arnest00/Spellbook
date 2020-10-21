const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcryptjs'),
      passport = require('passport'),
      { ensureAuthenticated, forwardAuthenticated } = require('../middleware');

// ====== User model
const User = require('../models/User');

// ====== Login page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('./users/login');
});

// ====== Register page
router.get('/register', forwardAuthenticated, (req, res) => {
  res.render('./users/register');
});

// ====== Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  };
  
  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  };

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters long'});
  };

  if (errors.length > 0) {
    res.render('./users/register', {
      errors,
      name,
      email
    });
  } else {
    // Validation passed
    User.findOne({ email: email })
      .then(user => {
        errors.push({ msg: 'E-mail is already in use' });
        if (user) {
          // User exists
          res.render('./users/register', {
            errors,
            name,
            email
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              // Set password to hashed password
              newUser.password = hash;
              
              // Save user
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        };
      });
  };
});

// ====== Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/spells/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// ====== Logout handle
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;