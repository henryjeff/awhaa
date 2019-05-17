<template>
  <div>
    <div v-if="loading === false" class="fade-in-item">
      <div v-if="preppedmeal === undefined">
        <ion-card>
          <ion-card-header >
            <ion-card-title>You're out of meals</ion-card-title>
            <ion-card-subtitle>Add some more meals to your inventory</ion-card-subtitle>
            <hr>
            <ion-button shape="round" fill="outline" primary @click="toRoute('/meals/search')">
              Add Meals
            </ion-button>
          </ion-card-header>
        </ion-card>
      </div>
      <div v-else-if="already_ate === true">
        <ion-card>
          <ion-card-header >
            <ion-card-title>You're all caught up on eating</ion-card-title>
            <ion-card-subtitle>Check in at {{formatTime(eatby)}} for your next meal</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </div>
      <div v-else>
        <ion-card>
          <ion-card-header class="border-bottom">
            <ion-card-title>{{preppedmeal.meal.name}}</ion-card-title>
            <ion-card-subtitle color="primary">{{preppedmeal.meal.calories}} calories</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content style="margin-top: 12px;">
            <MealInformation :meal='preppedmeal.meal'/>
            <MealRecipe :meal='preppedmeal.meal' :creator='creator'/>
            <MealEatingTimer :preppedmeal='preppedmeal' :eatstart='eatstart' :eatby='eatby' style="margin-top: 16px;"/>
          </ion-card-content>
          <ion-card-content class="bottom-buttons">
            <ion-buttons>
              <ion-button class="eat-meal" shape="round" fill="outline" color="primary" @click="eatMeal()">Eat Meal</ion-button>
            </ion-buttons>
          </ion-card-content>
        </ion-card>
      </div>
    </div>
    <div v-else style="margin-top:54px;">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../events';

import MealExperationTimer from '@/components/MealOverview/MealExperationTimer'
import MealEatingTimer from '@/components/MealOverview/MealEatingTimer'
import MealInformation from '@/components/MealOverview/MealInformation'
import MealRecipe from '@/components/MealOverview/MealRecipe'

export default {
  name: "NextMeal",
  data () {
    return {
      loading: true,
      preppedmeal: undefined,
      eatstart: undefined,
      eatby: undefined,
      creator: "",
      already_ate: false
    }
  },
  components: {
    MealExperationTimer,
    MealEatingTimer,
    MealInformation,
    MealRecipe,
  },
  mounted() {
    EventBus.$on('new-meal-time', data => {
      this.getNextMeal()
    })
  },
  methods: {
    toRoute (route) {
      this.$router.push(route)
    },
    eatMeal(){
      this.loading = true
      this.$store.dispatch("updatePreppedMeal", {"preppedmeal": this.preppedmeal, "update" : {"eaten" : true}})
        .then((response) => {
          EventBus.$emit('success-toast', {'message':'Successfully ate prepped meal'})
          this.getNextMeal()
        })
    },
    formatTime(date){
      var d = date.split('T')[1].split('.')[0]
      var am_pm = 'a.m.'
      var hour = parseInt(d.split(':')[0])
      if(parseInt(d.split(':')[0]) >= 12) {
        am_pm = 'p.m.'
        if(parseInt(d.split(':')[0]) > 12){
          hour = parseInt(d.split(':')[0]) - 12
        }
      }
      return hour + " " + am_pm
    },
    getNextMeal(){
      this.$store.dispatch("fetchNextMeal", {'user' : {'id' : this.$store.state.user._id}})
        .then((response) => {
          if(response.data.message != undefined){
            this.$router.push("/error/ERR_DB_NEXT_MEAL")
          } else if(response.data.length == 0){
            this.loading = false
            this.preppedmeal = undefined
          } else {
            if(response.data.already_ate == true){
              this.already_ate = response.data.already_ate
              this.eatby = response.data.eatby
              this.loading = false
              this.preppedmeal = ""
            } else {
              this.already_ate = response.data.already_ate
              this.preppedmeal = response.data.preppedmeal
              this.eatstart = response.data.eatstart
              this.eatby = response.data.eatby
              this.$store.dispatch("fetchMeal", {'id': this.preppedmeal.meal._id})
              .then((response) => {
                this.creator = response.data.created_by.name.first + " " + response.data.created_by.name.last
                this.loading = false
              })
            }
          }
        })
    }
  },
  created () {
    this.loading = true
    this.getNextMeal()
  }
}
</script>
<style>
.card{
  border-radius: 10px;
  text-align: left;
}
.progress-bar-determinate{
  height: 5px;
  border-radius: 10px;
}
.postpone-one-hour{
  padding-left: 5px;
  width: 100%;
  height: 30px;
}
.eat-meal{
  padding-right: 5px;
  width: 100%;
  height: 30px;
}
</style>
