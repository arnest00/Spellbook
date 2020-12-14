# My Spellbook

This is a CRUD web application that helps tabletop RPG players look up and keep track of spells for a game that cannot be mentioned by name due to copyright reasons.

- Non-registered users can search for spells available in the System Reference Document 5.1
  - Filtered by Level, Class, and/or School
  - View expanded details of individual spells
- Registered users also able to save spells to their own persistent collection
  - Save a search result to collection
  - Edit and delete spells already in collection
  - Create custom spells

## Live Demo

![Screenshot of live demo](./my-spellbok-demo-png)

[Try out the live demo of the project.](https://my-spellbook.herokuapp.com/)

## Built With

  - [Open5e](https://open5e.com/) - Spell data
  - HTML - Project structure
  - [Sass](https://sass-lang.com/) - Project presentation
  - JS - Vanilla JavaScript
  - [Mongoose](https://mongoosejs.com/) - Spell and User validation, saving documents to database
  - [Passport.js](http://www.passportjs.org/) - User authentication and validation
  - [bcrypt](https://github.com/dcodeIO/bcrypt.js#readme) - Password hashing and salt generation