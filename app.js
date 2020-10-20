require('dotenv').config();

const express = require('express'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      session = require('express-session'),
      passport = require('passport');

const indexRoutes = require('./routes/index'),
      spellRoutes = require('./routes/spells'),
      userRoutes = require('./routes/users');

const app = express();

// ====== Set .env variables
const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// ====== Passport config
require('./passport')(passport);

// ====== Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to database!'))
  .catch(error => console.log(error));

// ====== EJS
app.set('view engine', 'ejs');

// ====== Body parser
app.use(express.urlencoded({ extended: true }));

// ====== Express session
app.use(session({
  secret: 'look ma it\'s a secret',
  resave: true,
  saveUninitialized: true
}));

// ====== Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ====== Other middleware
app.use(express.static('public'));
app.use(methodOverride('_method'));

// ====== Connect flash config
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// ====== Routes
app.use('/', indexRoutes)
app.use('/spells', spellRoutes);
app.use('/users', userRoutes);
    
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});