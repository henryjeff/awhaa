var usersRouter = require('./routes/users');
var mealsRouter = require('./routes/meals');
var preppedmealsRouter = require('./routes/preppedmeals');

module.exports = {
  users: usersRouter,
  meals: mealsRouter,
  preppedmeals: preppedmealsRouter
};
