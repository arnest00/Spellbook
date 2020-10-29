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
  const foundSpell = createSpellObj(data.results[0]);
  foundSpell.desc = foundSpell.desc.split('\n');

  res.render('./search/spell.ejs', { foundSpell: foundSpell });
});

// ====== Add chosen spell to spellbook
router.post('/:spell', ensureAuthenticated, async (req, res) => {
  let queryStr = `slug=${ req.params.spell }`;

  const response = await fetch(`${url}${queryStr}`);
  const data = await response.json();
  const newSpell = createSpellObj(data.results[0]);
  newSpell.author = {
    id: req.user.id,
    name: req.user.name
  };

  Spell.create(newSpell, err => {
    if (err) throw err;

    req.flash('success_msg', 'Successfully added spell');
    res.redirect('/spells');
  });
});

// ====== Function to extract relevant data
const createSpellObj = data => {
  return {
    name: data.name,
    level: data.level === 'Cantrip' ? '0th' : data.level.slice(0,3),
    higherLevel: data.higher_level,
    desc: data.desc,
    range: data.range,
    components: data.components.toLowerCase().split(', '),
    material: data.material.toLowerCase().slice(0,-1),
    concentration: data.concentration === 'yes' ? 'on' : null,
    duration: data.duration === 'Instantaneous' ? data.duration : data.duration.toLowerCase(),
    concentration: data.concentration,
    time: data.casting_time,
    school: data.school.toLowerCase(),
    slug: data.slug
  }
}

module.exports = router;