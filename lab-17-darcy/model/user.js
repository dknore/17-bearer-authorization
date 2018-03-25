'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    required: true
  },
  email: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String, 
    required: true}
});

User.methods.verifyPassword = function(password) {
  console.log('inside verifyPassword', password);
  return bcrypt.compare(password, this.password);
};

User.pre('save', function(next) {
  if (this.isNew) {
    console.log('New user: ', this);
    
    bcrypt.hash(this.password, 10)
      .then(hash => {
        console.log('hash=', hash);
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

module.exports = mongoose.model('User', User);
