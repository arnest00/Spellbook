const express = require('express'),
      router = express.Router(),
      { ensureAuthenticated, checkSpellAuthorship } = require('../middleware');

// ====== Spell model
const Spell = require('../models/Spell');

// ====== INDEX
router.get('/', ensureAuthenticated, (req, res) => {
  Spell.find({
    'author.id': req.user.id
  }, (err, allSpells) => {
    if (err) throw err;

    res.render('./spells/spells.ejs', { spells: allSpells, user: req.user });
  });
});

// ====== NEW
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('./spells/new.ejs', { user: req.user });
});

// ====== CREATE
router.post('/', ensureAuthenticated, (req, res) => {
  const { name, school, level, time, range, components, material, concentration, duration, desc, higherLevel } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !school || !level || !time || !range || !duration || !desc) {
    errors.push({ msg: 'Spell requires a name, school, level, casting time, range, duration, and description'});
  };

  // Check for at least one checked component
  if (typeof components === 'undefined') {
    errors.push({ msg: 'Spell requires at least one component'});
  };

  if (errors.length > 0) {
    res.render('./spells/new.ejs', {
      errors,
      name, school, level, time, range, components, material, concentration, duration, desc, higherLevel
    });
  } else {
    // Validation passed
    const newSpell = {
      name: name,
      school: school,
      level: level,
      time: time,
      range: range,
      components: components,
      material: material,
      concentration: concentration,
      duration: duration,
      desc: desc,
      higherLevel: higherLevel,
      author: {
        id: req.user.id,
        name: req.user.name
      }
    };
  
    Spell.create(newSpell, err => {
      if (err) throw err;
  
      req.flash('success_msg', 'Successfully added spell');
      res.redirect('/spells');
    });
  };
});

// ====== EDIT
router.get("/:id/edit", checkSpellAuthorship, (req, res) => {
  Spell.findById({
      '_id': req.params.id
  })
    .then(results => {
      res.render('./spells/edit.ejs', { spell: results, user: req.user } );
    })
    .catch(err => console.error(err));
});

// ====== UPDATE
router.put('/:id', checkSpellAuthorship, (req, res) => {
  const { name, school, level, time, range, components, material, concentration, duration, desc, higherLevel } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !school || !level || !time || !range || !duration || !desc) {
    errors.push({ msg: 'Spell requires a name, school, level, casting time, range, duration, and description'});
  };

  // Check for at least one checked component
  if (typeof components === 'undefined') {
    errors.push({ msg: 'Spell requires at least one component'});
  };

  if (errors.length > 0) {
    Spell.findById(req.params.id)
      .then(spell => {
        res.render('./spells/edit.ejs', {
          errors,
          spell
        });
      })
      .catch(err => console.error(err));
  } else {
    // Validation passed
    const updatedSpell = {
      name: name,
      school: school,
      level: level,
      time: time,
      range: range,
      components: components,
      material: material,
      concentration: concentration,
      duration: duration,
      desc: desc,
      higherLevel: higherLevel
    };
  
    Spell.findByIdAndUpdate(req.params.id, updatedSpell, err => {
      if (err) throw err;

      req.flash('success_msg', 'Successfully edited spell');
      res.redirect('/spells');
    });
  };
});

// ====== DESTROY
router.delete('/:id', checkSpellAuthorship, (req, res) => {
  Spell.findByIdAndRemove(req.params.id, err => {
    if (err) throw err;

    req.flash('success_msg', 'Successfully deleted spell');
    res.redirect('/spells');
  });
});

module.exports = router;