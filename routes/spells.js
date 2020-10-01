const MongoClient = require('mongodb').MongoClient,
      express = require('express'),
      router = express.Router();

const { mongoURI } = require('../config.json'),
      { ObjectId } = require('mongodb');

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to database!');

  const db = client.db('spellbook');
  const customSpellCollection = db.collection('custom-spells');
  
  // ====== INDEX
  router.get('/', (req, res) => {
    customSpellCollection.find().toArray()
      .then(results => {
        res.render('spells.ejs', { customSpells: results });
      })
      .catch(error => console.error(error));
  });

  // ====== CREATE
  router.post('/', (req, res) => {
    customSpellCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/spells');
      })
      .catch(error => console.error(error));
  });

  // ====== NEW
  router.get('/new', (req, res) => {
    res.render('new.ejs');
  });

  // ====== EDIT
  router.get("/:id/edit", (req, res) => {
    customSpellCollection.findOne({
        '_id': ObjectId(req.params.id)
    })
      .then(results => {
        res.render('edit.ejs', { spell: results } );
    })
    .catch(error => console.error(error));
  });

  // ====== UPDATE
  router.put('/:id', (req, res) => {
    customSpellCollection.findOneAndUpdate(
      { '_id': ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          school: req.body.school,
          level: req.body.level,
          time: req.body.time,
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
  router.delete('/:id', (req, res) => {
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