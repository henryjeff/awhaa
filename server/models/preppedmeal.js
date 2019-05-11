var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreppedMeal = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  meal: {
    type: Schema.Types.ObjectId,
    ref: 'Meal'
  },
  prep: {
    created: {
      type: Date,
      default: Date.now
    },
    by: Date,
  },
  eaten:{
    status: {
      type: Boolean,
      default: false
    },
    on: Date
  },
  notes: String
});

module.exports = mongoose.model('PreppedMeal', PreppedMeal);
