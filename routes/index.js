const express = require('express'),
      router = express.Router(),
      { forwardAuthenticated } = require('../middleware');

// ====== Landing page
router.get('/', forwardAuthenticated, (req, res) => {
  res.render('landing.ejs');
});

module.exports = router;