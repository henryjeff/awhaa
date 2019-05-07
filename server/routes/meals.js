var router = require('express').Router();

var User = require('../models/user.js')
var Meal = require('../models/meal.js');


// Find meals with an id
router.get('/meals/id/:id/', function(req, res, next){
  id = req.params.id
  Meal.findById(id, function(err, meal) {
      if (err) {
        res.send({ message: 'Error finding meal' });
      } else {
        if(!meal){
          res.send({ message: 'No meal found' });
        } else {
          res.send(meal);
        }
      }
  });
})

// Seach for meals
router.get('/meals/search', function(req, res, next){
  Meal.find({name: {$regex: req.query.name, $options: "$i"}}, function(err, meals) {
    if (err) {
      res.send({ message: 'Error finding meals' });
    } else {
      if(meals == []){
        res.send({ message: 'No meals found' });
      } else {
        res.send(meals);
      }
    }
  });
})


// Post User
/*
REQ.BODY EXAMPLE
{
  "user_id": "5cd085c02798de8f3046b9a8",
  "name": "Salad tumms",
  "prep": {
  	"steps":[],
    "time_min": 1
  },
  "calories":600,
  "regular_timing": "Linner",
  "days_good": 10
}
*/
router.post('/meals/', function(req, res, next){
  User.findById(req.body.user_id, function(err, u) {
      if (err) {
        res.send({ message: 'Error finding user -> Can\'t create meal'})
      } else {
        var meal = new Meal();

        meal.created_by = req.body.user_id
        meal.name = req.body.name
        meal.prep.steps = req.body.prep.steps;
        meal.prep.time_min = req.body.prep.time_min;
        meal.calories = req.body.calories
        meal.meal_times = req.body.meal_times
        meal.shelf_life = req.body.shelf_life

        meal.save(function(err) {
          if(err) {
            res.send(err);
          } else {
            res.send({ message: 'Meal created' })
          }
        })
      }
  })
})

module.exports = router;
