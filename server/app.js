// Express dependencies
const express = require('express');

const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

var mongo_uri

try {
  mongo_uri = require('../config/.env').MONGODB_URI
} catch(e) {
  mongo_uri = require('../config/heroku.env').MONGODB_URI
}

var routes = require('./routes.js')

var app = express();
app.use(logger('dev'));
app.use(logger('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, "../dist")));

var mongoose = require('mongoose');

console.log("Establishing Connection...")

var s_time = process.hrtime()[1];
mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false});

var d_time = (process.hrtime()[1] - s_time) / 100000;

console.log("Connected to cluster")
console.log(`Connecition established in ${d_time} ms`)

app.use('/api', routes.users)
app.use('/api', routes.meals)
app.use('/api', routes.preppedmeals)

module.exports = app;
