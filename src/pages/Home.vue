<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/signout')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button primary @click="toUserSettings()">
            <ion-icon slot="icon-only" color="primary" name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon name="restaurant"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button><ion-icon name="add" @click="toRoute('/addpreppedmeal')"></ion-icon></ion-fab-button>
          <ion-fab-button><ion-icon name="create" @click="toRoute('/createmeal')"></ion-icon></ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-title>
        Welcome back {{first_name}}
      </ion-title>
      <ion-title>
        <p style="font-size:14px;">Today's going to be great!</p>
      </ion-title>
      <SummerCountdown/>
      <NextMeal/>
    </ion-content>
  </div>
</template>

<script>
import NextMeal from '@/components/NextMeal'
import SummerCountdown from '@/components/SummerCountdown'
import axios from 'axios';

export default {
  name: "Home",
  data () {
    return {
      loading: false,
      first_name: ""
    }
  },
  methods: {
    toUserSettings() {
      this.$router.push(`/user/${this.$store.state.user.username}`);
    },
    toRoute(route) {
      this.$router.push(route);
    },
  },
  components: {
    NextMeal,
    SummerCountdown
  }
}
</script>
