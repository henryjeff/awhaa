var router = require('express').Router();

var User = require('../models/user.js');

// Get user
router.get('/users/gid/:gid/', function(req, res, next){
  User.findOne({gid : req.params.gid}, function(err, user) {
    if (err || !user) {
      res.send({ message: 'Error finding user' });
      return
    }
    res.send(user);
    return
  });
})

router.get('/users/id/:id/', function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err || !user) {
      res.send({ message: 'Error finding user' });
      return
    }
    res.send(user);
    return
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
    return
  })
})

module.exports = router;
