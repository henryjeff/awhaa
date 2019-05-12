<template>
  <div>
    <ion-row style="margin-bottom: 5px;">
      <ion-col align-self-start>
        <ion-card-subtitle style="text-align:left!important">Prepared {{formatDate(preppedmeal.prep.created)}}</ion-card-subtitle>
      </ion-col>
      <ion-col align-self-end>
        <ion-card-subtitle style="text-align:right!important">Expires {{formatDate(preppedmeal.prep.by)}}</ion-card-subtitle>
      </ion-col>
    </ion-row>
    <ion-row style="padding-left:5px;padding-right:5px;">
      <ion-progress-bar v-if="progress_val <= 0.1" v-bind:value="progress_val" color="danger"></ion-progress-bar>
      <ion-progress-bar v-else-if="progress_val <= 0.25" v-bind:value="progress_val" color="warning"></ion-progress-bar>
      <ion-progress-bar v-else v-bind:value="progress_val" color="success"></ion-progress-bar>
    </ion-row>
    <ion-row>
      <ion-col align-self-end>
        <ion-card-subtitle  v-if="progress_val <= 0.1" class="meal-condition">Expires Soon {{time_left}}</ion-card-subtitle>
        <ion-card-subtitle  v-else-if="progress_val <= 0.25" class="meal-condition" >Eat Soon -  {{time_left}}</ion-card-subtitle>
        <ion-card-subtitle  v-else class="meal-condition">Good Condition - {{time_left}} left</ion-card-subtitle>
      </ion-col>
    </ion-row>
  </div>
</template>

<script>
export default {
  name: "MealExperationTimer",
  data () {
    return {
      progress_val: 0,
      mins_left: 0,
      time_left: ""
    }
  },
  props: {
    preppedmeal: Object
  },
  created() {
    var c_date = new Date(this.preppedmeal.prep.created)
    var by_date = new Date(this.preppedmeal.prep.by)
    var now_date = new Date()

    var diff_c_b = this.getDiffMinutes(c_date, by_date)
    var diff_n_b = this.getDiffMinutes(now_date, by_date)

    this.mins_left = diff_n_b
    this.progress_val = (diff_n_b / diff_c_b)

    var hours = (this.mins_left - (this.mins_left % 60)) / 60
    var minutes = this.mins_left % 60
    var days = (hours - (hours % 24)) / 24
    hours = hours % 24

    var day_s = "s"
    var hour_s = "s"
    var minute_s = "s"

    if(days == 1) day_s = ""
    if(hours == 1) hour_s = ""
    if(minutes == 1) minute_s = ""

    this.time_left = `${days} day${day_s}, ${hours} hour${hour_s}, ${minutes} minute${minute_s}`
  },
  methods: {
    formatDate(date){
      var d = date.split('-')
      return d[1].replace(/^0+/, '') + "/" + d[2].split('T')[0].replace(/^0+/, '') + "/" + d[0]
    },
    getDiffMinutes(date_a, date_b){
      var diffTime = Math.abs(date_a.getTime() - date_b.getTime())
      var diffMins = Math.ceil(diffTime / (1000 * 60))
      return diffMins
    },
  }
}
</script>

<style>
.info-p {
  color: #737373;
}
.meal-condition {
  /* font-weight: 100!important; */
  /* opacity: 0.5; */
  text-align:left!important;
  padding-top: 5px;
}
</style>
