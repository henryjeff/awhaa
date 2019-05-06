<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Welcome</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <template>
          <ion-list>
            <ion-thumbnail slot="start">
              <img class='big-logo' :src='logo'></img>
            </ion-thumbnail>
          </ion-list>
        </template>
        <ion-title>Choose an Account type</ion-title>
        <ion-label>Makes Your Beach/City/Park Litter Cleanups Smart!</ion-label>
        <ion-label></ion-label>
        <ion-button @click="goToLoginAsOrganizer"><i class="fas fa-sitemap"></i> Organizer</ion-button>
        <ion-row style="height:2px"/>
        <ion-button @click="goToLogin" ><i class="fas fa-hands-helping"></i>Volunteer</ion-button>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
import Logo from "@/img/logo.png"
export default {
  name: 'Welcome',
  data () {
    return {
      logo: Logo,
    }
  },
  beforeCreate: function () {
    if (this.$session.exists()) {
      if(this.$session.has('session_id') == true){
        this.$session.destroy()
      }
    }
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    goToLogin () {
      this.$session.destroy()
      this.$session.start()
      this.$session.set('is_organizer', false)
      this.$router.push('/googlesignin')
    },
    goToLoginAsOrganizer () {
      this.$session.destroy()
      this.$session.start()
      this.$session.set('is_organizer', true)
      this.$router.push('/googlesignin')
    }
  }
}
</script>
<style>
.big-logo{
  width:50%;
  margin-top: 30%;
  margin-bottom: 20px;
}

/* This is where you control how the button looks. Be creative! */
.button, .button-md{
  /* padding:!important; */
  /* margin: 20px; */
  height: 50px;
}

.fa-sitemap, .fa-hands-helping{
  padding-right:10px;
}

.button-inner{
  /* display: inline-block; */
  /* padding: 15px 15px; */
  padding: 5px;
  border-radius: 50px;
  /* background-color: #3c82f7; */
  color: #fff;
  /* margin-top: 10px; */
  /* box-shadow: 0 3px 0 #0f69ff; */
  font-size: 16px;
}
</style>
