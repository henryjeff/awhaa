var router = require('express').Router();
var mongoose = require('mongoose');

var User = require('../models/user.js')
var Meal = require('../models/meal.js');
var PreppedMeal = require('../models/preppedmeal.js');

async function getPreppedMealData(preppedmeal) {
  return new Promise((resolve, reject) => {
    User.findById(preppedmeal.user, function(err, user) {
      if (err || !user) {
        reject({ message: 'Error finding user' })
      }
      Meal.findById(preppedmeal.meal, function(err, meal) {
        if (err || !meal) {
          reject({ message: 'Error finding meal' })
        }
        preppedmeal.user = user
        preppedmeal.meal = meal
        resolve(preppedmeal)
      })
    })
  })
}

function getDateNow() {
  var now = new Date(Date.now()).toString().split("GMT")
  now = new Date(now[0] + " GMT+0400") // HEROKU
  // now = new Date(now[0] + " GMT-0000") // LOCAL MACHINE
  return now
}

function getCurrentMealTime() {
  var cur_time = getDateNow().toString().split(" ")[4].split(":")
  var hour = parseInt(cur_time[0])
  var min = parseInt(cur_time[1])
  var sec = parseInt(cur_time[2])

  // BREAKFAST  5 - 10 // 5am-10am
  // BRUNCH    10 - 13 // 10am-1pm
  // LUNCH     13 - 16 // 1pm-4pm
  // LINNER    16 - 19 // 4pm-7pm
  // DINNER    19 - 22 // 7pm-10pm
  // SNACK     22 - 5  // 10pm-5am

  if        (hour >=  0 && hour < 10) { // BREAKFAST
    return "breakfast"
  } else if (hour >= 10 && hour < 13) { // BRUNCH
    return "brunch"
  } else if (hour >= 13 && hour < 16) { // LUNCH
    return "lunch"
  } else if (hour >= 16 && hour < 19) { // LINNER
    return "linner"
  } else if (hour >= 19 && hour < 22) { // DINNER
    return "dinner"
  } else {                             // SNACK
    return "snack"
  }
}

function getMealRange(meal_time) {
  switch(meal_time) {
    case "breakfast":
      return [0, 10]
    case "brunch":
      return [10, 13]
    case "lunch":
      return [13, 16]
    case "linner":
      return [16, 19]
    case "dinner":
      return [19, 22]
    case "snack":
      return[22, 24]
  }
}

function compareCalories(preppedmeal_a, preppedmeal_b) {
  const a_cals = preppedmeal_a.meal.calories
  const b_cals = preppedmeal_b.meal.calories
  let comparison = 0;
  if (b_cals > a_cals) {
    comparison = 1
  } else if (b_cals < a_cals) {
    comparison = -1
  }
  return comparison
}

function compareExpireDate(preppedmeal_a, preppedmeal_b) {
  const a_by = preppedmeal_a.prep.by
  const b_by = preppedmeal_b.prep.by
  let comparison = 0;
  if (b_by < a_by) {
    comparison = 1
  } else if (b_by > a_by) {
    comparison = -1
  }
  return comparison
}


// Find meals with an id
router.get('/mymeals/id/:id', function(req, res, next){
  PreppedMeal.findById(req.params.id, function(err, preppedmeal) {
    if (err || !preppedmeal) {
      res.send({ message: 'Error finding prepped meal' })
      return
    }
    getPreppedMealData(preppedmeal)
      .then(data => {
        res.send(data)
        return
      })
      .catch(err => {
        res.send(err)
        return
      })
  })
})

router.get('/mymeals/id/:id/next', function(req, res, next){
  var query = {'user' : req.params.id, 'eaten.status': false}
  PreppedMeal.find(query, function(err, preppedmeals) {
    var inventory = []
    if(preppedmeals.length == 0 || err){
      res.send([])
      return
    }
    let requests = preppedmeals.map((preppedmeal) => {
      return new Promise((resolve) => {
        getPreppedMealData(preppedmeal)
          .then(data => {
            inventory.push(data)
            resolve()
          })
          .catch(err => {
            res.send(err)
            return
          })
      })
    })
    Promise.all(requests)
      .then(() => {
        var filtered_inventory = []
        var cur_meal_time = getCurrentMealTime()

        if(inventory.length == 0){
          res.send([])
          return
        }

        inventory.forEach(function(preppedmeal){
          preppedmeal.meal.meal_times.forEach(function(time){
            if(time == cur_meal_time){
              filtered_inventory.push(preppedmeal)
            }
          })
        })

        if(filtered_inventory.length == 0){
          filtered_inventory = inventory
        }

        filtered_inventory.sort(compareCalories)
        filtered_inventory.sort(compareExpireDate)

        var meal_range = getMealRange(cur_meal_time)

        // var now = new Date()
        var now = getDateNow()
        var eatstart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        var eatby = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        eatstart.setUTCHours(meal_range[0])
        eatby.setUTCHours(meal_range[1])


        PreppedMeal.find({'user' : req.params.id, 'eaten.on' : {$gte : new Date(now.getFullYear(), now.getMonth(), now.getDate())}}, function(err, preppedmeals) {
          var eaten_today = []
          let eaten_requests = preppedmeals.map((preppedmeal) => {
            return new Promise((resolve) => {
              getPreppedMealData(preppedmeal)
                .then(data => {
                  eaten_today.push(data)
                  resolve()
                })
                .catch(err => {
                  res.send(err)
                  return
                })
            })
          })
          Promise.all(eaten_requests)
            .then(() => {
              var next_meal = filtered_inventory[0]
              var result = {
                'eatstart': eatstart,
                'eatby': eatby,
                'preppedmeal' : next_meal,
                'already_ate': false
              }

              eaten_today.forEach(function(preppedmeal){
                console.log(preppedmeal.eaten.on)
                console.log(eatstart)
                console.log(eatby)
                if(preppedmeal.eaten.on >= eatstart && preppedmeal.eaten.on <= eatby){
                  console.log("already ate")
                  result = {
                    'eatby': eatby,
                    'already_ate': true
                  }
                }
              })

              res.send(result)
              return
            })
          .catch(() => {
            res.send({ message: "Error finding eaten meals"})
            return
          })
        })
      })
      .catch(() => {
        res.send({ message: "Error finding all preppared meals"})
        return
      })
  })
})

router.put('/mymeals/id/:id/update', function(req, res, next){
  // getDateNow()
  // var now = new Date(Date.now()).toString().split("GMT")
  // now = new Date(now[0] + " GMT-0000")
  var now = getDateNow()
  // console.log(now)
  PreppedMeal.findOneAndUpdate({"_id" : req.params.id}, {$set: {"eaten.status": req.body.eaten, "eaten.on": now}}, function(err, preppedmeal) {
    if (err || !preppedmeal) {
      res.send({ message: 'Error finding prepped meal' })
      return
    }
    getPreppedMealData(preppedmeal)
      .then(data => {
        res.send(data)
        return
      })
      .catch(err => {
        res.send(err)
        return
      })
  })
})

router.delete('/mymeals/id/:id', function(req, res, next){
  PreppedMeal.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send({ message: 'Error deleteing prepped meal' })
      return
    }
    res.send({ message: 'Successfully deleted meal'})
    return
  })
})

router.get('/mymeals/inventory/:id', function(req, res, next){
  var eaten = req.query.eaten
  var query = {'user' : req.params.id}
  if(eaten != 'undefined') {
    var query = {'user' : req.params.id, 'eaten.status': JSON.parse(eaten)}
  }
  PreppedMeal.find(query , function(err, preppedmeals) {
    var inventory = []
    let requests = preppedmeals.map((preppedmeal) => {
      return new Promise((resolve) => {
        getPreppedMealData(preppedmeal)
          .then(data => {
            inventory.push(data)
            resolve()
          })
          .catch(err => {
            res.send(err)
            return
          })
      })
    })
    Promise.all(requests)
      .then(() => {
        res.send(inventory)
        return
      })
      .catch(() => {
        res.send({ message: "Error finding all preppared meals"})
        return
      })
  })
})

// Post Prepped Meal
router.post('/mymeals/', function(req, res, next){
  User.findById(req.body.user_id, function(err, user) {
    if (err || !user) {
      res.send({ message: 'Error finding user -> Can\'t create meal' })
      return
    }
    Meal.findById(req.body.meal_id, function(err, meal) {
      if (err || !meal) {
        res.send({ message: 'Error finding meal -> Can\'t create meal' })
        return
      }
      // getDateNow()
      // var by_date = new Date(Date.now())
      var by_date = getDateNow()
      by_date.setDate(by_date.getDate() + req.body.shelf_life);

      var num_meals = req.body.num_meals

      if(num_meals == undefined) {
        num_meals = 1
      }

      for(var i = 0; i < num_meals; i++){
        var preppedmeal = new PreppedMeal()

        preppedmeal.user = req.body.user_id
        preppedmeal.meal = req.body.meal_id
        preppedmeal.notes = req.body.notes
        preppedmeal.prep.by = by_date

        preppedmeal.save(function(err) {
          if(err) {
            res.send(err);
            return
          }
        })
      }
      if(req.body.num_meals == 1){
        res.send({ message: 'Prepped Meal created'})
      } else {
        res.send({ message: req.body.num_meals + ' Prepped Meal created'})
      }
      return
    })
  })
})

module.exports = router;
