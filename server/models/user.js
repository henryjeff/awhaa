var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  gid: String,
  username: String,
  email: String,
  name: {
    first: String,
    last: String
  },
  // meals: {
  //   prepped: [{
  //       type: Schema.Types.ObjectId,
  //       ref: 'PreppedMeal'
  //   }],
  //   eaten: [{
  //       type: Schema.Types.ObjectId,
  //       ref: 'PreppedMeal'
  //   }],
  // }
});

module.exports = mongoose.model('User', User);
