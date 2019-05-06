// Express dependencies
const express = require('express');

const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

var db = require('./db.js');

// var locationsRouter = require('./routes/locations');
// var usersRouter = require('./routes/users');
// var eventsRouter = require('./routes/events');

var app = express();
var router = express.Router()

app.use(logger('combined'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', usersRouter);
// app.use('/', locationsRouter);
// app.use('/', eventsRouter);


module.exports = app;
