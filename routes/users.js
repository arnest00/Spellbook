const express = require('express');
const router = express.Router();

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

module.exports = router;