'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Text = require('../model/textMessage.js');
const User = require('../model/user.js');
const getCreds = require('../lib/authorization.js');
// const bearerMiddleware = require('../lib/bearer-auth-middleware.js');

router.get('/text', (req, res) => {
  Text.find()
    .then(results => {
      res.send(results);
    })
    .catch(err => res.send(err.message));
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
        .then(isValid => {
          console.log('result=', isValid);
          if (isValid) {
            let payload = { userId: user._id };
            let token = jwt.sign(payload, process.env.SECRET);
            res.send(token);
          }
          if (!isValid) {
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          console.log('inside catch', err);
          res.sendStatus(401);
        });
    })
    .catch((err) => res.send(err.message));
});
    
router.post('/text', express.json(), (req, res) => {
  Text.create(req.body)
  console.log('inside post - req.body= ', req.body);
    .save()
    .then((text) => {
      res.send(text);
    })
    .catch(() => res.sendStatus(400));
});

module.exports = router;
