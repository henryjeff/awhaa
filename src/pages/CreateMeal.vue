<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/home')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Create a meal</ion-title>
        <ion-buttons slot="end">
          <ion-button primary>
            <ion-icon slot="icon-only" color="primary" name="information-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-card>
        <ion-card-header class="border-bottom" style="margin-bottom: 8px;">
          <ion-card-title>Create a Meal</ion-card-title>
          <ion-card-subtitle>Meal Template maker</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-card-subtitle>Basic info</ion-card-subtitle>
            <ion-item>
              <ion-label class="input-label">Name : </ion-label>
              <ion-input placeholder="Ex: Chicken Salad" :value="name" @input="name = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="input-label">Calories : </ion-label>
              <ion-input placeholder="Ex: 500 calories" type="number" :value="calories" @input="calories = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="input-label">Preferred Meal Times : </ion-label>
              <ion-select multiple="true" cancelText="No" okText="Okay!" placeholder="Select" @ionChange="meal_times = $event.target.value">
                <ion-select-option value="snack">Snack</ion-select-option>
                <ion-select-option value="breakfast">Breakfast</ion-select-option>
                <ion-select-option value="brunch">Brunch</ion-select-option>
                <ion-select-option value="lunch">Lunch</ion-select-option>
                <ion-select-option value="linner">Linner</ion-select-option>
                <ion-select-option value="dinner">Dinner</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <br>
          <ion-list>
            <ion-card-subtitle>Preperation</ion-card-subtitle>
            <ion-item>
              <ion-label class="input-label">Shelf Life : </ion-label>
              <ion-input placeholder="Ex: 5 days" type="number" :value="shelf_life" @input="shelf_life = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="input-label">Preperation Time : </ion-label>
              <ion-input placeholder="Ex: 5 minutes" type="number" :value="prep_time" @input="prep_time = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label class="input-label">Preperation Steps</ion-label>
              <ion-input/>
              <ion-button class="step-add" shape="round" fill="outline" @click="addStep" primary>+</ion-button>
            </ion-item>
            <ion-item v-for="(step, index) in prep_steps" v-bind:key="index">
              <ion-label class="input-label" style="color: #737373;">   Step {{index + 1}} : </ion-label>
              <ion-input placeholder="Step Description" :value="step.value" @input="step.value = $event.target.value"></ion-input>
            </ion-item>
          </ion-list>
          <ion-buttons class="meal-buttons">
              <ion-button class="create-meal" shape="round" fill="outline" color="primary" @click="createMeal">Create</ion-button>
              <ion-button class="cancel-meal" shape="round" fill="outline" color="medium" @click="toRoute('/home')">Cancel</ion-button>
          </ion-buttons>
       </ion-card-content>
     </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

export default {
  name: "CreateMeal",
  data() {
    return {
      name: null,
      calories: null,
      meal_times: [],
      shelf_life: null,
      prep_time: null,
      prep_steps: [],
      loading: false
    }
  },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
    addStep() {
      this.prep_steps.push({value: ""})
    },
    createMeal() {
      var prep_steps = []

      this.prep_steps.forEach(function(step) {
        prep_steps.push(step.value)
      })

      var status = ""

      if(this.name == null || this.name == ""){
        status += "• Invalid name\n"
      }
      if(this.calories == null || this.calories < 0){
        status += "• Invalid amount of calories\n"
      }
      if(this.meal_times.length < 1){
        status += "• Invalid number of meal times\n"
      }
      if(this.shelf_life == null || this.shelf_life < 1){
        status += "• Invalid shelf life\n"
      }
      if(this.prep_time == null || this.prep_time < 0){
        status += "• Invalid prep time\n"
      }

      if(status != ""){
        EventBus.$emit('danger-toast', {'message':'Failed to create meal for the following reasons:\n' + status})
        return
      }

      var meal = {
        user_id: null,
        name: this.name,
        prep: {
          steps: this.prep_steps,
          time_min: this.prep_time
        },
        calories: this.calories,
        meal_times: this.meal_times,
        shelf_life: this.shelf_life
      }

      meal.user_id = this.$store.state.user._id

      EventBus.$emit('start-loading', {'self':this,'redirect':'/home'})

      this.$store.dispatch('postMeal', {'meal' : meal})
        .then((response) => {
          this.loading = false
          EventBus.$emit('success-toast', {'message':'Successfully created meal'})
        })
    }
  }
}
</script>

<style>
.input-label{
  color: #222!important;
}
.step-add{
  border-radius: 20px;
}
.meal-buttons{
  margin-top: 10px;
  margin-bottom: 10px;
}
.border-bottom {
  border-bottom: 1px solid rgb(221, 221, 221);
}
.cancel-meal{
  padding-left: 5px;
  width: 100%;
  height: 30px;
}
.create-meal{
  padding-right: 5px;
  width: 100%;
  height: 30px;
}
</style>
