var express = require('express');
var router = express.Router();
var mongoUtil = require('../database/db.js');


//get user
router.get('/api/user', function(req, res, next){
  var id_token = req.query['id_token'];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_users').findOne({id_token: id_token});
  result_cursor.then(function(result){
    res.send(result);
  })
})


//create user
router.post('/api/user', function(req, res, next){
  var id_token = req.query['id_token'];
  var name = req.query['name'];
  var email = req.query['email'];
  var organizer = req.query['organizer'];
  var user = {
    "id_token":parseInt(id_token),
    "name":name,
    "email":email,
    "organizer": organizer=='true'
  };
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_users').findOne({id_token: id_token});
  result_cursor.then(function(result){
    var found = false;
    var users = db.collection('cc_users').find();
    users.forEach(function(doc){
      console.log(doc);
      if(doc['id_token'] == parseInt(id_token)){
        found = true;
      }
    });
    console.log(found);
    if(!found){
      db.collection('cc_users').insertOne(user);
      console.log("successfully added user to database");
      res.send('success');
    } else {
      console.log(result_cursor)
      console.log("could not add user to database");
      res.send('error');
    }
  })


})

module.exports = router;
