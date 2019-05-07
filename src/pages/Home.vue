<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button primary @click="toUserSettings">
            <ion-icon slot="icon-only" color="primary" name="contact"></ion-icon>
          </ion-button>
          <!-- <ion-button primary @click="toCreateMeal">
            <ion-icon slot="icon-only" color="primary" name="add"></ion-icon>
          </ion-button> -->
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
          <ion-fab-button><ion-icon name="add" @click="toCreateMeal"></ion-icon></ion-fab-button>
          <ion-fab-button><ion-icon name="create" @click="toCreateMeal"></ion-icon></ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-title>
        Sign in to the home of the google
      </ion-title>
      <ion-title>
        <p style="font-size:14px;">to continue with Clean Up Crew</p>
      </ion-title>
      <NextMeal/>
    </ion-content>
  </div>
</template>

<script>
import NextMeal from '@/components/NextMeal'
import axios from "axios";

export default {
  name: "Home",
  methods: {
    toUserSettings() {
      axios.get(`/api/users/${this.$session.get('session_id')}`)
        .then((response) => {
          this.$router.push("/user/" + response.data.username);
        })
        .catch((errors) => {
          console.log("Database Error: Getting User")
          console.log(errors)
          this.$router.push('/error')
        })
    },
    toCreateMeal() {
      this.$router.push('/createmeal')
    }
  },
  components: {
    NextMeal
  }
}
</script>

<style>

.ion-md-time{
	color: red !important;
}

</style>
