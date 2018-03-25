'use strict';

let jwt = require('jsonwebtoken');
const User = require('../model/user.js');

function bearerAuth(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.send('bad token');
      return;
    }

    User.findOne({ _id: decoded.userId })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
}

module.exports = { bearerAuth };
