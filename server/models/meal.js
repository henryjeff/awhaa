var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meal = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  prep: {
    steps: Array,
    time_min: Number
  },
  calories: Number,
  regular_timing: {
       type: String,
       enum : ['Breakfast','Brunch','Lunch','Linner','Dinner','Snack','Ambiguous'],
       default: 'Ambiguous'
   },
  days_good: Number
});

module.exports = mongoose.model('Meal', Meal);
