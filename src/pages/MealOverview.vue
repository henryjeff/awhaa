<template>
  <div class="ion-page" v-if="loading === false">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/meals/search')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{meal.name}}</ion-title>
        <ion-buttons slot="primary">
          <ion-button primary @click="toRoute('/meals/search')">
            <ion-icon slot="icon-only" color="primary" name="help-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-card style="padding:none;">
        <ion-card-header class="border-bottom">
          <ion-card-title>{{meal.name}}</ion-card-title>
          <ion-card-subtitle color="primary">{{meal.calories}} calories</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content style="margin-top: 16px;">
          <MealCounter v-on:update-meal-count='num_meals = $event'/>
          <MealInformation :meal='meal'/>
          <MealTimes :meal='meal'/>
          <MealRecipe :meal='meal' :creator='creator'/>
          <MealNotes :meal='meal' v-on:update-meal-notes='notes = $event'/>
          <br>
          <ion-card-subtitle style="text-align:left!important;">Meal created by {{creator}}</ion-card-subtitle>
        </ion-card-content>
        <ion-card-content class="bottom-buttons">
          <ion-buttons>
            <ion-button class="add-meal" shape="round" fill="outline" color="primary" @click="addMeal()">Add Meal(s)</ion-button>
            <ion-button class="cancel-meal" shape="round" fill="outline" color="medium" @click="toRoute('/meals/search')">Back</ion-button>
          </ion-buttons>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

import MealInformation from '@/components/MealOverview/MealInformation'
import MealCounter from '@/components/MealOverview/MealCounter'
import MealRecipe from '@/components/MealOverview/MealRecipe'
import MealTimes from '@/components/MealOverview/MealTimes'
import MealNotes from '@/components/MealOverview/MealNotes'

export default {
  name: "MealOverview",
  data() {
    return {
      loading: true,
      num_meals: 1,
      notes: "",
      meal: undefined,
      creator: undefined,
    }
  },
  components: {
    MealInformation,
    MealTimes,
    MealRecipe,
    MealCounter,
    MealNotes
  },
  mounted () {
    var id = this.$route.params.id
    // EventBus.$emit('start-loading', {'self':this})
    this.$store.dispatch("fetchMeal", {"id" : id})
      .then((response) => {
        this.meal = response.data
        this.creator = this.meal.created_by.name.first + " " + this.meal.created_by.name.last
        this.loading = false
      })
  },
  methods: {
    toRoute(route){
      this.$router.push(route)
    },
    addMeal(){
      this.$router.push("/meals/search")
      EventBus.$emit('start-loading', {'self':this})
      var preppedmeal = {
        "preppedmeal": {
          "user_id": this.$store.state.user._id,
          "meal_id": this.meal._id,
          "shelf_life": this.meal.shelf_life,
          "notes": this.notes,
          "num_meals": this.num_meals
        }
      }
      this.$store.dispatch("postPreppedMeal", preppedmeal)
        .then((response) => {
          EventBus.$emit('success-toast', {'message':'Successfully added prepped meal(s) to your inventory'})
          this.loading = false
        })
    }
  }
}
</script>

<style>
.cancel-meal{
  padding-left: 5px;
  width: 100%;
  height: 30px;
}
.add-meal{
  padding-right: 5px;
  width: 100%;
  height: 30px;
}
</style>
