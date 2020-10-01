const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const { mongoURI } = require('./config.json');
const { ObjectId } = require('mongodb');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to database!');

    const db = client.db('spellbook');
    const customSpellCollection = db.collection('custom-spells');
    

    // ====== INDEX
    app.get('/', (req, res) => {
      customSpellCollection.find().toArray()
        .then(results => {
          res.render('spells.ejs', { customSpells: results });
        })
        .catch(error => console.error(error));
    });

    // ====== CREATE
    app.post('/spells', (req, res) => {
      customSpellCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    });

    // ====== NEW
    app.get('/spells/new', (req, res) => {
      res.render('new.ejs');
    });

    // ====== EDIT
    app.get("/spells/:id/edit", (req, res) => {
      customSpellCollection.findOne({
          '_id': ObjectId(req.params.id)
      })
        .then(results => {
          res.render('edit.ejs', { spell: results } );
      })
      .catch(error => console.error(error));
    });

    // ====== UPDATE
    app.put('/spells/:id', (req, res) => {
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
          res.redirect('/');
        })
        .catch(error => console.error(error));
    });

    // ====== DESTROY
    app.delete('/spells/:id', (req, res) => {
      customSpellCollection.findOneAndDelete(
        { '_id': ObjectId(req.params.id) }
      )
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    });

    app.delete('/spells', (req, res) => {
      customSpellCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No spell to delete');
          }
          res.json('Deleted magic missile spell');
        })
        .catch(error => console.error(error));
    });
    
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch(error => console.error(error));