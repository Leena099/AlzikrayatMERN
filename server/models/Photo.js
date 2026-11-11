const mongoose = require('mongoose');

const Photo = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  fileName: {type: String, required: true},
  title: {type: String, required: true, trim: true},
  description: String,
  dateTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Photo', Photo);