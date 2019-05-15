<template>
  <ion-item class="no-item-padding rounded-item" lines="none" :color='color'>
    <ion-grid class="timer">
      <ion-row>
        <ion-col align-self-center size="12">
          <ion-card-title class="meal-timer-header">Next Meal Timer</ion-card-title>
        </ion-col>
      </ion-row>
      <ion-row style="margin-bottom: 2px;">
        <ion-col align-self-start size="8">
          <ion-card-subtitle class="time-left">{{formatTimeLeft(time_left)}} left</ion-card-subtitle>
        </ion-col>
        <ion-col align-self-end size="4">
          <ion-card-subtitle class="eat-by">Eat By {{eat_by_time}}</ion-card-subtitle>
        </ion-col>
      </ion-row>
      <ion-row style="padding-left:5px;padding-right:5px;" >
        <ion-progress-bar class="meal-timer" v-bind:value="progress_val" color="light" v-bind:buffer="buffer"></ion-progress-bar>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<script>
import { EventBus } from '../../events';

export default {
  name: "MealEatingTimer",
  data () {
    return {
      progress_val: 0,
      buffer: 0,
      time_left: 0,
      eat_by_time: "",
      color: "",
      old_eatby: 0
    }
  },
  props: {
    preppedmeal: Object,
    eatstart: String,
    eatby: String
  },
  created() {
    this.updateTimer()
  },
  methods: {
    updateTimer(){
      var now = new Date(Date.now()).toString().split("GMT")
      now = new Date(now[0] + " GMT-0400")
      var eatstart = this.eatstart
      var eatby = this.eatby

      if(this.time_left <= 0){
        EventBus.$emit('new-meal-time')
      }

      var diff_s_b = this.getDiffSeconds(eatstart, eatby)
      var diff_n_b = this.getDiffSeconds(now, eatby)

      this.time_left = diff_n_b
      if(this.time_left <= 1200){
        this.color = "danger"
      } else {
        this.color = "primary"
      }

      this.progress_val = (diff_n_b / diff_s_b)
      this.eat_by_time = this.formatTime(eatby)

      let self = this
      setTimeout(function(){
        self.updateTimer()
      }, 1000);
    },
    formatTime(date){
      var d = date.split('T')[1].split('.')[0]
      var am_pm = 'a.m.'
      var hour = parseInt(d.split(':')[0])
      if(parseInt(d.split(':')[0]) >= 12) {
        am_pm = 'p.m.'
        if(parseInt(d.split(':')[0]) > 12){
          hour = parseInt(d.split(':')[0]) - 12
        }
      }
      return hour + " " + am_pm
    },
    getDiffSeconds(date_a, date_b){
      var da
      var db
      if(typeof date_a != typeof new Date()){
        var hour_a = date_a.split('T')[1].split('.')[0].split(':')[0]
        if(hour_a > 0) hour_a = hour_a - 1
        da = new Date(date_a.split('T')[0] + " " + (hour_a) + ":00:00 EST")
      } else {
        da = new Date(date_a)
      }
      if(typeof date_b != typeof new Date()){
        var hour_b = date_b.split('T')[1].split('.')[0].split(':')[0]
        if(hour_b > 0) hour_b = hour_b - 1
        db = new Date(date_b.split('T')[0]  + " " + (hour_b) + ":00:00 EST")
      } else {
        db = new Date(date_b)
      }
      var diffTime = Math.abs(da.getTime() - db.getTime())
      var diffSecs = Math.ceil(diffTime / (1000))
      return diffSecs
    },
    formatTimeLeft(seconds){
      var text = ""
      var hours = Math.floor(seconds / 60 / 60)
      if(hours > 0) {
        seconds -= (hours * 60 * 60)
        text += hours + " hour "
      }
      var mins = Math.floor(seconds / 60)
      if(mins > 0) {
        seconds -= (mins * 60)
        text += mins + " min "
      }
      var secs = seconds
      text += secs + " sec "

      return text
    }
  }
}
</script>

<style>
.time-left{
  text-align:left!important;
  color:white;
}
.eat-by{
  text-align:right!important;
  color:white;
}
.meal-timer-header{
  text-align:center!important;
  color:white;
}
.meal-timer {
  height: 10px;
}
.timer {
  padding: 8px 6px 16px 6px;
}
.rounded-item{
    --border-radius: 10px!important;
}
</style>
