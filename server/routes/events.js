var express = require('express');
var router = express.Router();
var mongoUtil = require('../database/db.js');
var mongodb = require('mongodb');


//write event to db
router.post('/api/events', function(req, res, next){
  var event_organizer_id = req.query['event_organizer_id'];
  var event_users = [];
  var public_id = req.query['public_id'];
  var address = req.query['address'];
  var event_name = req.query['event_name'];
  var event_start_time = req.query['event_start_time'];
  var event_end_time = req.query['event_end_time'];
  var lat = req.query['lat'];
  var long = req.query['long'];
  var radius = req.query['radius'];
  var event = {
    "event_organizer_id": parseInt(event_organizer_id),
    "event_users": event_users,
    "public_id": parseInt(public_id),
    "address":address,
    "event_name": event_name,
    "event_start_time": new Date(event_start_time),
    "event_end_time": new Date(event_end_time),
    "lat": parseFloat(lat),
    "long": parseFloat(long),
    "radius": parseInt(radius)
  };

  var db = mongoUtil.getDb();
  var c = db.collection('cc_event').insertOne(event);
  console.log("successfully added event to database");
  res.send('success');
})

//get all events
router.get('/api/all_events', function(req, res, next){
  var event_arr = [];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_event').find();
  result_cursor.forEach(function(doc){
     event_arr.push(doc);
  }).then(function(){
    var return_obj = {
      "event_arr" : event_arr
    }
    res.send(return_obj);
  });
})

//read event from db by @query-param public_id
router.get('/api/events', function(req, res, next){
  var public_id = req.query['public_id'];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_event').findOne({public_id : public_id});
  result_cursor.then(function(result){
    res.send(result);
  })
})

//add user to event
router.post('/api/event_add_user', function(req, res, next){
  var public_id = req.query['public_id'];
  var user_id = req.query['user_id'];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_event').updateOne({public_id : public_id}, {$push: {'event_users':  user_id } }, false);
  res.send('success');

})

//delete user from event
//@param public_id, user_id
router.delete('/api/event_delete_user', function(req, res, next){
  var public_id = req.query['public_id'];
  var user_id = req.query['user_id'];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_event').updateOne({public_id : public_id}, {$pull: {'event_users':  user_id } }, false);
  res.send('success');
})

//delete entire event
router.delete('/api/event', function(req, res, next){
  var public_id = req.query['public_id'];
  var db = mongoUtil.getDb();
  var result_cursor = db.collection('cc_event').deleteOne({public_id: public_id}, true);
  res.send('success');
})


module.exports = router;
