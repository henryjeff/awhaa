<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Create a meal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Meal Template maker</ion-card-subtitle>
          <ion-card-title>Create a Meal</ion-card-title>
        </ion-card-header>
        <!-- <hr> -->
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
              <ion-button class="step-add" shape="round" fill="outline" @click="addStep" primary>+</ion-button>
            </ion-item>
            <ion-item v-for="(step, index) in prep_steps" v-bind:key="index">
              <ion-label class="input-label" style="color: #737373;">   Step {{index + 1}} : </ion-label>
              <ion-input placeholder="Step Description" :value="step.value" @input="step.value = $event.target.value"></ion-input>
            </ion-item>
          </ion-list>
          <br>
          <ion-item>
            <ion-button class="create-meal" shape="round" fill="outline" @click="createMeal">Create</ion-button>
            <ion-button class="cancel-meal" shape="round" fill="outline" @click="cancelCreation">Cancel</ion-button>
          </ion-item>
       </ion-card-content>
     </ion-card>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "CreateMeal",
  // components: {
  //   NextMeal
  // }
  data() {
    return {
      name: null,
      calories: null,
      meal_times: [],
      shelf_life: null,
      prep_time: null,
      prep_steps: []
    }
  },
  methods: {
    addStep() {
      this.prep_steps.push({value: ""})
    },
    cancelCreation() {
      this.$router.push("/home")
    },
    createMeal() {
      console.log(this.meal_times)
      // this.$router.push("/home")
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
/* .create-meal .cancel-meal{
  width: 100%;
} */

</style>
