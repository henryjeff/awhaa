var express = require('express');
var router = express.Router();
var mongoUtil = require('../database/db.js');
var mongodb = require('mongodb');


router.post('/api/loc', function(req, res, next){
  var lat = req.query['lat'];
  var long = req.query['long'];
  var event_id = req.query['event_id']
  var user_id = req.query['user_id'];
  var date = req.query['date'];
  var time_stamp = new Date(date);
  var loc = {
    "lat":parseFloat(lat),
    "long":parseFloat(long),
    "event_id":parseInt(event_id),
    "user_id":parseInt(user_id),
    "date":time_stamp
  };
  console.log(time_stamp);
  var db = mongoUtil.getDb();
  var c = db.collection('cc_loc').insertOne(loc);
  console.log("successfully added location to database");
  res.send('success');
})


//get all locations
router.get('/api/loc', function(req, res, next){
  var loc_arr = [];
  var iter = 0;
  var result_cursor = db.collection('cc_loc').find();
  result_cursor.forEach(function(doc){
     loc_arr.push(doc);
  }).then(function(){
    var return_obj = {
      "loc_arr" : loc_arr
    }
    res.send(return_obj);
  });
});

//get locations by name id
router.get("/api/loc_by_user", function(req, res, next){
  var db = mongoUtil.getDb();
  var user_id = req.query['user_id'];
  var loc_arr = [];
  var result_cursor = db.collection('cc_loc').find({user_id: user_id});
  result_cursor.forEach(function(doc){
     loc_arr.push(doc);
  }).then(function(){
    var return_obj = {
      "loc_arr" : loc_arr
    }
    res.send(return_obj);
  });
})

//get locations by event id
router.get("/api/loc_by_event", function(req, res, next){
  var db = mongoUtil.getDb();
  var event_id = req.query['event_id'];
  var loc_arr = [];
  var result_cursor = db.collection('cc_loc').find({event_id: event_id});
  result_cursor.forEach(function(doc){
     loc_arr.push(doc);
  }).then(function(){
    var return_obj = {
      "loc_arr" : loc_arr
    }
    res.send(return_obj);
  });
})

module.exports = router;
