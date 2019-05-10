<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "MealRecipe",
  data() {
    return {
      steps_hidden: true
    }
  },
  props: {
    meal: Object,
    creator: String
  },
  methods: {
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
</style>
