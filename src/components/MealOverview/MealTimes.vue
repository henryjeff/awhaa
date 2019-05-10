<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "MealTimes",
  props: {
    meal: Object
  }
}
</script>

<style>
</style>
