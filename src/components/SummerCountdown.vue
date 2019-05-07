<template>
  <ion-card>
    <ion-card-subtitle style="padding:16px; padding-bottom: 10px;">Summer Countdown</ion-card-subtitle>
    <ion-label class="countdown-label" primary>
      {{days_left}} days left
    </ion-label>
    <div class="countdown-bar">
      <ion-progress-bar color="danger" v-bind:value="value" v-bind:buffer="buffer"></ion-progress-bar>
    </div>
  </ion-card>
</template>

<script>

export default {
  name: "SummerCountdown",
  data () {
    return {
      buffer: 0,
      days_left: 0,
      value: 0
    }
  },
  methods: {
    updateCountdown: function () {
      var self = this;
      var today = new Date();
      var end_of_summer = new Date('August 26, 2019 00:00:00');

      const diffTime = Math.abs(today.getTime() - end_of_summer.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.days_left = diffDays
      this.value = 1 - (diffDays / 116.0)
      this.buffer = 1 - ((diffDays / 2) / 116.0)

      setTimeout(function(){ self.updateCountdown() }, 100000);
    }
  },
  created: function () {
    this.updateCountdown();
  }
}
</script>
<style>
.card{
  border-radius: 10px;
  text-align: left;
}

.progress-bar-determinate{
  height: 5px;
  border-radius: 10px;
}

.countdown-label{
  color: #F04141;
  margin-bottom: 4px;
  padding-left: 16px;
}

.countdown-bar{
  margin:16px;
  margin-top: 7px;
  /* margin-bottom: 7px; */
}

</style>
