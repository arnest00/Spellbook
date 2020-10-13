const express = require('express'),
      router = express.Router();

// ====== Landing page
router.get('/', (req, res) => {
  res.render('landing.ejs');
});

module.exports = router;