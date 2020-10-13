require('dotenv').config();

const express = require('express'),
      methodOverride = require('method-override'),
      passport = require('passport');

const indexRoutes = require('./routes/index');
const spellRoutes = require('./routes/spells');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(passport.initialize());

app.use('/', indexRoutes)
app.use('/spells', spellRoutes);
    
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});