const express = require('express'),
      router = express.Router(),
      fetch = require("node-fetch"),
      { ensureAuthenticated } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

/// ====== API url
const url = "https://api.open5e.com/spells?";

// ====== Display search form
router.get('/', ensureAuthenticated, async (req, res) => {
  if (Object.keys(req.query).length) {
    const searchedLevel = req.query.level;
    const searchedClass = req.query.class;
    const searchedSchool = req.query.school;
    let pageCounter = 1;

    let foundSpells = [];
    let next;
    do {
      let queryStr = `level=${searchedLevel}&school=${searchedSchool}&ordering=level_int&document__slug=wotc-srd&page=${pageCounter}`;

      const response = await fetch(`${url}${queryStr}`);
      const data = await response.json();

      data.results.forEach(spell => {
        if (spell.dnd_class.includes(searchedClass)) {
          foundSpells.push({
            name: spell.name,
            level: spell.level,
            school: spell.school,
            slug: spell.slug
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
router.get('/:spell', ensureAuthenticated, async (req, res) => {
  let queryStr = `slug=${ req.params.spell }`;

  const response = await fetch(`${url}${queryStr}`);
  const data = await response.json();
  const foundSpell = {
    name: data.results[0].name,
    higherLevel: data.results[0].higher_level,
    range: data.results[0].range,
    material: data.results[0].material.toLowerCase().slice(0,-1),
    duration: data.results[0].duration.toLowerCase(),
    concentration: data.results[0].concentration,
    time: data.results[0].casting_time,
    school: data.results[0].school.toLowerCase()
  };
  foundSpell.desc = data.results[0].desc.split('\n');
  foundSpell.components = data.results[0].components.toLowerCase().split(', ');
  foundSpell.concentration = data.results[0].concentration === 'yes' ? 'on' : null;
  foundSpell.level = data.results[0].level === 'Cantrip' ? '0th' : data.results[0].level.slice(0,3);

  res.render('./search/spell.ejs', { foundSpell: foundSpell });
});

module.exports = router;