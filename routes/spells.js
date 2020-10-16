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
  Spell.insertOne(req.body)
    .then(result => {
      res.redirect('/spells');
    })
    .catch(error => console.error(error));
});

// ====== NEW
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('./spells/new.ejs');
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