require('dotenv').config();

const express = require('express'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose');

const indexRoutes = require('./routes/index');
const spellRoutes = require('./routes/spells');
const userRoutes = require('./routes/users');

const app = express();

// ====== Set .env variables
const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// ====== Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to database in app.js!'))
  .catch(error => console.log(error));

// ====== EJS
app.set('view engine', 'ejs');

// ====== Body parser
app.use(express.urlencoded({ extended: true }));

// ====== Other middleware
app.use(express.static('public'));
app.use(methodOverride('_method'));

// ====== Routes
app.use('/', indexRoutes)
app.use('/spells', spellRoutes);
app.use('/users', userRoutes);
    
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});