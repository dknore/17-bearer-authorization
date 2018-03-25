'use strict';

let mongoose = require('mongoose');

const Text = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.OjectId,
    ref: 'User'
  },
  date: {
    date: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Text', Text);
