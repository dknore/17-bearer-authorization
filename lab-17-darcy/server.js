'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab-16-user');

const router = require('./route/routes.js');

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log('Listening on http://localhost: ' + PORT);
});

server.isRunning = true;
