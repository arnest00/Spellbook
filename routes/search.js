const express = require('express'),
      router = express.Router(),
      fetch = require("node-fetch"),
      { URLSearchParams } = require('url'),
      { ensureAuthenticated } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

/// ====== API url
// const url = "https://www.dnd5eapi.co/api/spells?";
const url = "https://api.open5e.com/spells?";

// ====== Display search form
router.get('/', (req, res) => {
  if (Object.keys(req.query).length) {
    const searchedLevel = req.query.level;
    const searchedClass = req.query.class;
    const searchedSchool = req.query.school;

    fetch(url + new URLSearchParams({
      level: `${searchedLevel}`,
      school: `${searchedSchool}`
    }))
      .then(response => response.json())
      .then(data => {
        let foundSpells = [];
  
        data.results.forEach(spell => {
          if (spell.dnd_class.includes(searchedClass)) {
            foundSpells.push({
              name: spell.name,
              school: spell.school,
              class: spell.dnd_class
            });
          };
        });

        res.render('./search/search.ejs', { foundSpells: foundSpells });
      })
      .catch(err => console.error(err));
  } else {
    res.render('./search/search.ejs');
  };
});

module.exports = router;