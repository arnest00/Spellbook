const express = require('express'),
      router = express.Router(),
      fetch = require("node-fetch"),
      { ensureAuthenticated } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

/// ====== API url
const url = "https://api.open5e.com/spells?";

// ====== Display search form
router.get('/', async (req, res) => {
  if (Object.keys(req.query).length) {
    const searchedLevel = req.query.level;
    const searchedClass = req.query.class;
    const searchedSchool = req.query.school;
    let pageCounter = 1;

    let foundSpells = [];
    let next;
    do {
      let queryStr = `level=${searchedLevel}&school=${searchedSchool}&page=${pageCounter}`;

      const response = await fetch(`${url}${queryStr}`);
      const data = await response.json();

      data.results.forEach(spell => {
        if (spell.dnd_class.includes(searchedClass)) {
          foundSpells.push({
            name: spell.name,
            level: spell.level,
            school: spell.school
          });
        };
      });

      next = data.next;
      pageCounter += 1;
    } while (next);

    res.render('./search/search.ejs', { foundSpells: foundSpells });
  } else {
    res.render('./search/search.ejs');
  };
});

// ====== Display chosen spell

module.exports = router;