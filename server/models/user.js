var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  gid: Number,
  username: String,
  email: String,
  name: {
    first: String,
    last: String
  }
});

module.exports = mongoose.model('User', User);
