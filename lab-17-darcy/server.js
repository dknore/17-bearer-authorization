'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const userRouter = require('./route/userRoutes.js');
const textRouter = require('./route/userRoutes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRouter);
app.use('/api', textRouter);

const server = app.listen(PORT, () => {
  console.log('Listening on http://localhost: ' + PORT);
});

server.isRunning = true;
