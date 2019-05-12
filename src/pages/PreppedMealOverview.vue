<template>
  <div class="ion-page" v-if="loading === false">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/mymeals/')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{preppedmeal.meal.name}}</ion-title>
        <ion-buttons slot="primary">
          <ion-button primary @click="toRoute('/mymeals/')">
            <ion-icon slot="icon-only" color="primary" name="help-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-card style="padding:none;">
        <ion-card-header class="border-bottom">
          <ion-card-title>{{preppedmeal.meal.name}}</ion-card-title>
          <ion-card-subtitle color="primary">{{preppedmeal.meal.calories}} calories</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content style="margin-top: 12px;">
          <MealExperationTimer class="border-bottom" style="padding-bottom:10px; margin-bottom: 5px;" v-if="!preppedmeal.eaten.status" :preppedmeal='preppedmeal'/>
          <MealEatenStatus class="border-bottom" style="padding-bottom:10px; margin-bottom: 5px;" v-else :preppedmeal='preppedmeal'/>
          <MealInformation :meal='preppedmeal.meal'/>
          <MealTimes :meal='preppedmeal.meal'/>
          <MealRecipe :meal='preppedmeal.meal' :creator='creator'/>
          <ion-item class="no-item-padding">
            <span style="color: #737373;">{{this.notes}}</span>
          </ion-item>
          <br>
          <ion-card-subtitle style="text-align:left!important;">Meal created by {{creator}}</ion-card-subtitle>
        </ion-card-content>
        <ion-card-content class="bottom-buttons">
          <ion-buttons v-if="!preppedmeal.eaten.status">
            <ion-button class="eat-meal" shape="round" fill="outline" color="primary" @click="eatMeal()">Eat Meal</ion-button>
            <ion-button class="delete-meal" shape="round" fill="outline" color="medium" @click="deleteMeal()">Delete Meal</ion-button>
          </ion-buttons>
          <ion-buttons v-else>
            <ion-button class="eat-meal" shape="round" fill="outline" color="danger" @click="deleteMeal()">Delete Meal</ion-button>
            <ion-button class="delete-meal" shape="round" fill="outline" color="medium" @click="toRoute('/mymeals/')">Back</ion-button>
          </ion-buttons>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

import MealExperationTimer from '@/components/MealOverview/MealExperationTimer'
import MealEatenStatus from '@/components/MealOverview/MealEatenStatus'
import MealInformation from '@/components/MealOverview/MealInformation'
import MealRecipe from '@/components/MealOverview/MealRecipe'
import MealTimes from '@/components/MealOverview/MealTimes'

export default {
  name: "PreppedMealOverview",
  data() {
    return {
      loading: true,
      preppedmeal: undefined,
      creator: undefined,
      notes: ""
    }
  },
  components: {
    MealExperationTimer,
    MealEatenStatus,
    MealInformation,
    MealRecipe,
    MealTimes,
  },
  mounted () {
    var id = this.$route.params.id
    this.$store.dispatch("fetchPreppedMeal", {"preppedmeal" : {"id" : id}})
      .then((response) => {
        this.preppedmeal = response.data
        this.creator = this.preppedmeal.user.name.first + " " + this.preppedmeal.user.name.last
        this.notes = "Notes: " + this.preppedmeal.notes
        if(this.preppedmeal.notes == ""){
          this.notes = "No notes for meal"
        }
        this.loading = false
      })
  },
  methods: {
    toRoute(route){
      this.$router.push(route)
    },
    eatMeal(){
      this.$router.push('/mymeals/')
      EventBus.$emit('start-loading', {'self':this})
      this.$store.dispatch("updatePreppedMeal", {"preppedmeal": this.preppedmeal, "update" : {"eaten" : true}})
        .then((response) => {
          EventBus.$emit('success-toast', {'message':'Successfully ate prepped meal'})
          this.loading = false
        })
    },
    deleteMeal(){
      this.$router.push('/mymeals/')
      EventBus.$emit('start-loading', {'self':this})
      this.$store.dispatch("deletePreppedMeal", {"preppedmeal": this.preppedmeal})
        .then((response) => {
          EventBus.$emit('success-toast', {'message':'Successfully deleted prepped meal'})
          this.loading = false
        })
    },
  }
}
</script>

<style>
.delete-meal{
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
