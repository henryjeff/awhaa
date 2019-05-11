<template>
  <div>
    <ion-row style="margin-bottom: 5px;">
      <ion-col align-self-start>
        <ion-card-subtitle style="text-align:left!important">Eaten {{formatDate(preppedmeal.eaten.on)}}</ion-card-subtitle>
      </ion-col>
    </ion-row>
  </div>
</template>

<script>
export default {
  name: "MealEatenStatus",
  props: {
    preppedmeal: Object
  },
  methods: {
    formatDate(date){
      var d = date.split('-')
      return d[1].replace(/^0+/, '') + "/" + d[2].split('T')[0].replace(/^0+/, '') + "/" + d[0]
    }
  }
}
</script>

<style>
</style>
