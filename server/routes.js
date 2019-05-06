// var locationsRouter = require('./routes/locations');
var usersRouter = require('./routes/users');
var mealsRouter = require('./routes/meals');
// var eventsRouter = require('./routes/events');
module.exports = {
  users: usersRouter,
  meals: mealsRouter
};
