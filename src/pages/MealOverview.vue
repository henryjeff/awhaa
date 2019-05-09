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
            <ion-icon slot="icon-only" color="primary" name="information-circle-outline"></ion-icon>
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
          <ion-card-subtitle>Number of Meals</ion-card-subtitle>
          <ion-item class="no-item-padding ">
            <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(-5)" color="danger">
              <p>-5</p>
            </ion-button>
            <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(-1)" color="danger">
              <p>-1</p>
            </ion-button>
            <ion-input style="text-align:center;" type="number" :value="num_meals" @input="num_meals = $event.target.value"></ion-input>
            <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(1)" primary>
              <p>+1</p>
            </ion-button>
            <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(5)" primary>
              <p>+5</p>
            </ion-button>
          </ion-item>
          <ion-card-subtitle style="margin-top: 13px;">Meal Information</ion-card-subtitle>
          <ion-item class="no-item-padding">
            <ion-grid class="no-start-padding no-end-padding">
              <ion-row>
                <ion-col class="col-overflow no-start-padding" align-self-start>
                  Name : <span class="info-p">{{meal.name}}</span>
                </ion-col>
                <ion-col class="col-overflow no-end-padding">
                  Prep-time : <span class="info-p">{{meal.prep.time_min}} min.</span>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class="col-overflow no-start-padding" align-self-start>
                  Calories : <span class="info-p">{{meal.calories}} cal</span>
                </ion-col>
                <ion-col class="col-overflow no-end-padding">
                  Recipe Steps : <span class="info-p">{{meal.prep.steps.length}}</span>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-card-subtitle style="margin-top: 13px;">Standard Meal Times</ion-card-subtitle>
          <ion-item class="no-item-padding">
            <ion-grid align-self-center>
              <ion-row class="no-start-padding no-end-padding" align-self-center>
                <ion-chip class="no-start-margin" style="margin-bottom: 8px;" color="primary" outline v-for='(time, index) in meal.meal_times' v-bind:key="index">
                  <ion-label color="primary">{{time.charAt(0).toUpperCase() + time.slice(1)}}</ion-label>
                </ion-chip>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-item href="#" @click="toggleRecipe()" v-if="steps_hidden">
            <ion-icon name="restaurant" slot="start"></ion-icon>
            <ion-label>View full recipe / prep steps</ion-label>
          </ion-item>
          <ion-item href="#" @click="toggleRecipe()" v-else>
            <ion-icon name="arrow-dropup" slot="start"></ion-icon>
            <ion-label>Hide recipe / prep steps</ion-label>
          </ion-item>
          <ion-list class="prep-steps" v-if="!steps_hidden">
            <ion-item lines="none" class="prep-header prep-step">
              <ion-label>HOW TO MAKE {{meal.name.toUpperCase()}}:<br>by {{creator}}</ion-label>
            </ion-item>
            <div class="prep-step-div"/>
            <div v-for='(step, index) in meal.prep.steps' v-bind:key="index">
              <ion-item lines="none" class="prep-step">
                <ion-label>Step {{index + 1}}) {{step.value}}</ion-label>
              </ion-item>
              <div class="prep-step-div"/>
            </div>
          </ion-list>
          <!-- <ion-item>
            <ion-icon name="restaurant" slot="start"></ion-icon>
            <ion-label>Gender</ion-label>
            <ion-select placeholder="Select">
              <ion-select-option value="f">Female</ion-select-option>
              <ion-select-option value="m">Male</ion-select-option>
            </ion-select>
          </ion-item> -->
          <!-- <ion-item>
            <ion-icon name="restaurant" slot="start"></ion-icon>
            <ion-label>View full recipe / prep steps</ion-label>
          </ion-item> -->
          <ion-item class="no-item-padding">
            <ion-textarea placeholder="Enter any notes about these meals here..." :value="notes" @input="notes = $event.target.value"></ion-textarea>
          </ion-item>
          <br>
          <ion-card-subtitle style="text-align:left!important;">Meal created by {{creator}}</ion-card-subtitle>
        </ion-card-content>
        <ion-card-content>
          <ion-buttons class="add-buttons">
              <ion-button class="add-meal" shape="round" fill="outline" color="primary" @click="addMeal()">Add Meal(s)</ion-button>
              <ion-button class="cancel-meal" shape="round" fill="outline" color="medium" @click="toRoute('/meals/search')">Back</ion-button>
          </ion-buttons>
        </ion-card-content>
      </ion-card>
      <!-- <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Next Meal - 500 calories</ion-card-subtitle>
          <ion-card-title>Chicken Salad</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Located In Fridge, Prep Info below:
          Microwave for 50 seconds
        <ion-spinner name="crescent"></ion-spinner>
        <ion-item>
          <ion-icon name="pin" slot="start"></ion-icon>
          <ion-label>ion-item in a card, icon left, button right</ion-label>
          <ion-button round slot="end">View</ion-button>
        </ion-item>
        <ion-item-divider>
          <ion-label>
            Eat by 1:01 pm
          </ion-label>
          <ion-label>
            Time left 53 minutes
          </ion-label>
        </ion-item-divider>
        </ion-card-content>
        <div class="meal-timer">
          <ion-label class="timer-label" primary>
            53 minutes left
          </ion-label>
          <div class="timer-bar">
            <ion-progress-bar v-bind:value="0.5"></ion-progress-bar>
          </div>
          <ion-item style="padding-right: 8px;">
          </ion-item>
        </div>
        <ion-item>
        </ion-item>
        <ion-toolbar>
         <ion-buttons slot="secondary">
           <ion-button>
             <ion-icon slot="icon-only" name="contact"></ion-icon>
           </ion-button>
           <ion-button>
             <ion-icon slot="icon-only" name="search"></ion-icon>
           </ion-button>
         </ion-buttons>
         <ion-buttons slot="primary">
           <ion-button color="secondary">
             <ion-icon slot="icon-only" name="more"></ion-icon>
           </ion-button>
         </ion-buttons>
         <ion-title>Default Buttons</ion-title>
       </ion-toolbar>
          <ion-button>
            Cancel
          </ion-button>
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button>
              <ion-icon slot="icon-only" name="contact"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon slot="icon-only" name="search"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-label>Default Buttons</ion-label>
          <ion-buttons slot="primary">
            <ion-button color="secondary">
              <ion-icon slot="icon-only" name="more"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-card> -->
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

export default {
  name: "MealOverview",
  data() {
    return {
      loading: true,
      steps_hidden: true,
      num_meals: 1,
      notes: "",
      meal: undefined,
      creator: undefined,
    }
  },
  mounted () {
    var id = this.$route.params.id
    EventBus.$emit('start-loading', {'self':this})
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
      EventBus.$emit('start-loading', {'self':this, 'redirect':'/meals/search'})
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
    },
    addToMealCount(num) {
      this.num_meals = parseInt(this.num_meals) + num
      if(this.num_meals < 1) this.num_meals = 1
    },
    toggleRecipe(){
      if(this.steps_hidden)
        this.steps_hidden = false
      else
        this.steps_hidden = true
    }
  }
}
</script>

<style>
.add-buttons{
  margin-bottom: 10px;
}
.small-button{
  width: 43px;
  height: 50px;
  font-size: 23px;
  padding-bottom: 7px;
}
.small-button > p {
  font-size: 14px;
}
.cancel-meal{
  padding-left: 5px;
  width: 100%;
  height: 30px;
}
.meal-header-col{
  max-width: 50%;
  text-overflow:ellipsis;
}
.meal-header{
  max-height: 105px;
  position:relative;
  /* background:linear-gradient(transparent 150px, white); */
  overflow: hidden;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.no-item-padding {
  --padding-start: 6px;
  --inner-padding-end: 6px;
}
.border-bottom {
  border-bottom: 1px solid rgb(221, 221, 221);
}
.info-p {
  color: #737373;
}
.no-start-padding {
  -webkit-padding-start: unset;
  padding-inline-start: unset;
}
.no-end-padding {
  -webkit-padding-end: unset;
  padding-inline-end: unset;
}
.no-start-margin {
  -webkit-margin-start: unset;
  margin-inline-start: unset;
}
.no-end-margin {
  -webkit-margin-end: unset;
  margin-inline-end: unset;
}

.prep-steps {
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 16px !important;
  border-top: 1px dashed #cacaca;
}

.prep-step > *{
  font-family: monospace!important;
  background-color: #ebebeb!important;
  white-space:normal!important;
  text-overflow: inherit;
  padding-left: 3px;
  padding-right: 3px;
}

.prep-step-div {
  height: 2px;
  padding-bottom: 4px;
  border-top: 1px dashed #cacaca;
}

.col-overflow{
   text-align:left!important;
   padding:none!important;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.add-meal{
  padding-right: 5px;
  width: 100%;
  height: 30px;
}
</style>
