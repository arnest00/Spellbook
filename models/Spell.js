const mongoose = require('mongoose');

const SpellSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  school: { 
    type: String,
    required: true
  },
  level: { 
    type: String,
    required: true
  },
  time: { 
    type: String,
    required: true
  },
  range: { 
    type: String,
    required: true
  },
  components: {
    type: [String],
    required: true
  },
  material: String,
  concentration: String,
  duration: { 
    type: String,
    required: true
  },
  desc: { 
    type: String,
    required: true
  },
  higherLevel: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  }
});

const Spell = mongoose.model('Spell', SpellSchema);

module.exports = Spell;