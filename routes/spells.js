const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../auth');

// ====== Spell model
const Spell = require('../models/Spell');

// const testComponents = ['v', 's'];
// const newSpell = new Spell({
//   name: 'Mongoose Test',
//   school: 'Mongoose',
//   level: '0th',
//   time: '1 action',
//   range: '30 feet',
//   components: testComponents,
//   concentration: 'off',
//   duration: 'Instantaneous',
//   desc: 'This is a test spell using the schema'
// });
// newSpell.save()
//   .then(spell => console.log('Spell saved!'))
//   .catch(err => console.log(err));

// ====== INDEX
router.get('/', ensureAuthenticated, (req, res) => {
  Spell.find({}, (err, allSpells) => {
    if (err) throw err;

    res.render('./spells/spells.ejs', { customSpells: allSpells, user: req.user });
  });
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
      errors
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
  
    Spell.create(newSpell, (err, createdSpell) => {
      if (err) throw err;
  
      res.redirect('/spells');
    });
  };
});

// ====== NEW
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('./spells/new.ejs', { user: req.user });
});

// ====== EDIT
router.get("/:id/edit", ensureAuthenticated, (req, res) => {
  Spell.findOne({
      '_id': ObjectId(req.params.id)
  })
    .then(results => {
      res.render('./spells/edit.ejs', { spell: results } );
  })
  .catch(error => console.error(error));
});

// ====== UPDATE
router.put('/:id', ensureAuthenticated, (req, res) => {
  Spell.findOneAndUpdate(
    { '_id': ObjectId(req.params.id) },
    {
      $set: {
        name: req.body.name,
        school: req.body.school,
        level: req.body.level,
        time: req.body.time,
        concentration: req.body.concentration,
        range: req.body.range,
        components: req.body.components,
        material: req.body.material,
        duration: req.body.duration,
        desc: req.body.desc,
        higherLevel: req.body.higherLevel,
      }
    }
  )
    .then(result => {
      res.redirect('/spells');
    })
    .catch(error => console.error(error));
});

// ====== DESTROY
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Spell.findOneAndDelete(
    { '_id': ObjectId(req.params.id) }
  )
    .then(result => {
      res.redirect('/spells');
    })
    .catch(error => console.error(error));
});

module.exports = router;