'use strict';

const express = require('express');

const router = express.Router();

const User = require('../model/user.js');
const getCreds = require('../lib/authorization.js');

router.get('/', (req, res) => {
  User.find()
    .then(results => {
      res.send(results);
    });
});

router.get('/signin', (req, res) => {
  let [username, password] = getCreds(req, res);
  console.log('username, password=', username, password);

  User.findOne({
    username: username
  })
    .then(user => {
      console.log('**user= ', user);
      user.verifyPassword(password)
        .then(result => {
          console.log('result=', result);
          if (result) {
            res.sendStatus(200);
          }
          if (!result) {
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          console.log('inside catch', err);
          res.sendStatus(401);
        });
    });
});
    
router.post('/signup', express.json(), (req, res) => {
  User.create(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(400));
});

module.exports = router;
