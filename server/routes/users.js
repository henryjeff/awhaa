var router = require('express').Router();

var User = require('../models/user.js');

// Get user
router.get('/users/:gid/', function(req, res, next){
  User.findOne({gid : req.params.gid}, function(err, user) {
      if (err) {
        res.send({ message: 'No user found' });
      } else {
        if(!user){
          res.send({ message: 'No user found'});
        } else {
          res.send(user);
        }
      }
  });
})

// Post User
router.post('/users/', function(req, res, next){
  var user = new User();

  user.gid = req.body.gid
  user.username = req.body.username;
  user.email = req.body.email;
  user.name.first = req.body.first;
  user.name.last = req.body.last;

  user.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: 'User created' });
    }
  })
})

module.exports = router;
