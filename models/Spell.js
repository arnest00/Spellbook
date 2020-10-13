const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({ name: String });

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
    type: [ComponentSchema],
    default: undefined,
    required: true
  },
  concentration: String,
  duration: { 
    type: String,
    required: true
  },
  desc: { 
    type: String,
    required: true
  },
  higherLevel: String
});

const Spell = mongoose.model('Spell', SpellSchema);

module.exports = Spell;