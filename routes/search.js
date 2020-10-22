const express = require('express'),
      router = express.Router(),
      { ensureAuthenticated } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

// ====== Display search form
router.get('/', (req, res) => {
  res.render('./search/search.ejs');
});

module.exports = router;