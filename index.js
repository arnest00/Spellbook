const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const spellRoutes = require('./routes/spells');
// const indexRoutes = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// app.use('/', indexRoutes)
app.use('/spells', spellRoutes);
    
app.listen(3000, () => {
  console.log('Listening on port 3000!');
});