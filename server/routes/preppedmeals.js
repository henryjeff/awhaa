var router = require('express').Router();

var User = require('../models/user.js')
var Meal = require('../models/meal.js');
var PreppedMeal = require('../models/preppedmeal.js');

// Find meals with an id
router.get('/mymeals/id/:id', function(req, res, next){
  id = req.params.id
  PreppedMeal.findById(id, function(err, preppedmeal) {
    if (err || !preppedmeal) {
      res.send({ message: 'Error finding prepped meal' })
      return next()
    }
    console.log("cokc")
    User.findById(preppedmeal.user, function(err, user) {
      if (err || !user) {
        res.send({ message: 'Error finding user' })
        return next()
      }
      Meal.findById(preppedmeal.meal, function(err, meal) {
        if (err || !meal) {
          res.send({ message: 'Error finding meal' })
          return next()
        }
        preppedmeal.user = user
        preppedmeal.meal = meal
        res.send(preppedmeal)
        return next()
      })
    })
  })
})

// Post Prepped Meal
/*
{
  "user_id": "5cd085c02798de8f3046b9a8",
  "meal_id": "5cd106c9e26317195c5b8b16",
  "days_good": 4,
  "notes": "This is noites for mealos"
  "num_meals": 4
}
*/
router.post('/mymeals/', function(req, res, next){
  User.findById(req.body.user_id, function(err, user) {
    if (err || !user) {
      res.send({ message: 'Error finding user -> Can\'t create meal' })
      return next()
    }
    Meal.findById(req.body.meal_id, function(err, meal) {
      if (err || !meal) {
        res.send({ message: 'Error finding meal -> Can\'t create meal' })
        return next()
      }
      var by_date = new Date();
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
            console.log("BIG PROBLEM")
            res.send(err);
            return next()
          }
        })
      }
      if(req.body.num_meals == 1){
        res.send({ message: 'Prepped Meal created'})
      } else {
        res.send({ message: req.body.num_meals + ' Prepped Meal created'})
      }
      return next()
    })
  })
})

module.exports = router;
