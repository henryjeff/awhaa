var router = require('express').Router();

var User = require('../models/user.js')
var Meal = require('../models/meal.js');


// Create a meal

router.get('/meals/id/:id/', function(req, res, next){
  id = req.params.id
  Meal.findById(id, function(err, meal) {
      if (err) {
        res.send({ message: 'No meal found' });
      } else {
        res.send(meal);
      }
  });
})

// router.get('/meals/search', function(req, res, next){
//   Meal.find({name: {$regex: req.query.name, $options: "$i"}}, function(err, meals) {
//     console.log(meals)
//     res.send("fock fock")
//   });
// })

// Post User
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
        meal.regular_timing = req.body.regular_timing
        meal.days_good = req.body.days_good

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
