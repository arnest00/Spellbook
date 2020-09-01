const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { mongoURI } = require('./config.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to database!');

    const db = client.db('spellbook');
    const customSpellCollection = db.collection('custom-spells');

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
    
    app.post('/custom-spells', (req, res) => {
      customSpellCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    })
    
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch(error => console.error(error));