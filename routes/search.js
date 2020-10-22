const express = require('express'),
      router = express.Router(),
      fetch = require("node-fetch"),
      { URLSearchParams } = require('url'),
      { ensureAuthenticated } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

/// ====== API url
// const url = "https://www.dnd5eapi.co/api/spells/";
const url = "https://api.open5e.com/spells/?";

// ====== Display search form
router.get('/', (req, res) => {
  if (Object.keys(req.query).length) {
    const searchedLevel = req.query.level;
    const searchedClass = req.query.class;
    const searchedSchool = req.query.school;
    fetchSpells(searchedLevel, searchedClass, searchedSchool);
  };

  res.render('./search/search.ejs', { user: req.user });
});

// ====== Fetch list of spells from API
const fetchSpells = (searchedLevel, searchedClass, searchedSchool) => {
  console.log(url + new URLSearchParams({
    level: `${searchedLevel}`,
    school: `${searchedSchool}`
  }));
};

module.exports = router;