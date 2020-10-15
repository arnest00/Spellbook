const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// ====== User model
const User = require('../models/User');

// ====== Login page
router.get('/login', (req, res) => {
  res.render('./users/login');
});

// ====== Register page
router.get('/register', (req, res) => {
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
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        };
      });
  };
});

module.exports = router;