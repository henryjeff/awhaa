var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreppedMeal = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  meal: {
    type: ObjectId,
    ref: 'Meal'
  },
  prep: {
    date: Date,
    by: Date,
  },
  notes: String
});
