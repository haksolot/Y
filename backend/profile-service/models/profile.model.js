const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User'
  },
  display_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  avatar: {
    type: String, 
    default: '',
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
