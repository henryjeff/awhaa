<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/mymeals/')">
            <ion-icon slot="icon-only" color="primary" name="logo-buffer"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button primary @click="openUserPopover()">
            <ion-icon slot="icon-only" color="primary" name="person"></ion-icon>
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
          <ion-fab-button class="fade-in-item"><ion-icon name="add" @click="toRoute('/meals/search')"></ion-icon></ion-fab-button>
          <ion-fab-button class="fade-in-item"><ion-icon name="create" @click="toRoute('/meals/create')"></ion-icon></ion-fab-button>
        </ion-fab-list>
      </ion-fab>
      <div>
        <ion-title>
          Welcome back {{first_name}}
        </ion-title>
        <ion-title>
          <p style="font-size:14px;">Today's going to be great!</p>
        </ion-title>
      </div>
      <SummerCountdown/>
      <NextMeal/>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

import NextMeal from '@/components/NextMeal'
import UserPopover from '@/components/UserPopover'
import SummerCountdown from '@/components/SummerCountdown'

export default {
  name: "Home",
  data () {
    return {
      loading: true,
      first_name: "",
      popover: undefined
    }
  },
  created() {
    EventBus.$on('close-popover', route => {
      if(this.popover != undefined) this.popover.dismiss()
      this.$router.push(route)
    })
  },
  methods: {
    openUserPopover() {
      this.$ionic.popoverController.create({
          component: UserPopover,
          translucent: true,
          event
      })
      .then(p => {
        this.popover = p
        this.popover.present()
      })
    },
    toUserSettings() {
      this.$router.push(`/user/${this.$store.state.user.username}`)
    },
    toRoute(route) {
      this.$router.push(route)
    },
  },
  mounted() {
    this.first_name = this.$store.state.user.name.first
  },
  components: {
    NextMeal,
    SummerCountdown,
    UserPopover
  }
}
</script>
