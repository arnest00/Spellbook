require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override');

const indexRoutes = require('./routes/index');
const spellRoutes = require('./routes/spells');

const app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', indexRoutes)
app.use('/spells', spellRoutes);
    
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});