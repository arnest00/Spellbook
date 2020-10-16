require('dotenv').config();

const MongoClient = require('mongodb').MongoClient,
      { ObjectId } = require('mongodb'),
      express = require('express'),
      router = express.Router(),
      { ensureAuthenticated } = require('../auth');

MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to database!');

  const db = client.db('spellbook');
  const customSpellCollection = db.collection('custom-spells');
  
  // ====== INDEX
  router.get('/', ensureAuthenticated, (req, res) => {
    customSpellCollection.find().toArray()
      .then(results => {
        res.render('./spells/spells.ejs', { customSpells: results, user: req.user });
      })
      .catch(error => console.error(error));
  });

  // ====== CREATE
  router.post('/', ensureAuthenticated, (req, res) => {
    customSpellCollection.insertOne(req.body)
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
    customSpellCollection.findOne({
        '_id': ObjectId(req.params.id)
    })
      .then(results => {
        res.render('./spells/edit.ejs', { spell: results } );
    })
    .catch(error => console.error(error));
  });

  // ====== UPDATE
  router.put('/:id', ensureAuthenticated, (req, res) => {
    customSpellCollection.findOneAndUpdate(
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
    customSpellCollection.findOneAndDelete(
      { '_id': ObjectId(req.params.id) }
    )
      .then(result => {
        res.redirect('/spells');
      })
      .catch(error => console.error(error));
  });
})
.catch(error => console.error(error));

module.exports = router;