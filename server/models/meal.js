var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meal = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  calories: Number,
  prep: {
    steps: Array,
    time_min: Number
  },
  meal_times: [{
       type: String,
       enum : ['breakfast','brunch','lunch','linner','dinner','snack'],
       default: 'snack'
   }],
  shelf_life: Number
});

module.exports = mongoose.model('Meal', Meal);
