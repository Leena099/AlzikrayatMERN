const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format']},
  password: {type: String, required: true },
  location: String,
  description: String,
  occupation: String
});

module.exports = mongoose.model('User', User);