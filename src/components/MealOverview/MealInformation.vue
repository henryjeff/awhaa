<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "MealInformation",
  props: {
    meal: Object
  }
}
</script>

<style>
.info-p {
  color: #737373;
}
</style>
