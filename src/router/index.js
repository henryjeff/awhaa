import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import SignIn from '@/pages/SignIn'
import SignOut from '@/pages/SignOut'
import Home from '@/pages/home'
import Error from '@/pages/error'
import CreateMeal from '@/pages/CreateMeal'
import AddPreppedMeal from '@/pages/AddPreppedMeal'
import UserSettings from '@/pages/UserSettings'
// import Search from '@/components/Search'
// import Dash from '@/components/Dash'
// import Event from '@/components/EventDisplay'
// import Map from '@/components/Map'
// import EventCreate from '@/components/EventCreate'
import { IonicVueRouter } from '@ionic/vue';

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/signout',
      name: 'Sign Out',
      component: SignOut
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/createmeal',
      name: 'Create Meal',
      component: CreateMeal
    },
    {
      path: '/addpreppedmeal',
      name: 'Add Prepared Meal',
      component: AddPreppedMeal
    },
    {
      path: '/user/:username',
      name: 'User Settings',
      component: UserSettings
    },
    {
      path: '/error/:code',
      name: 'Error',
      component: Error
    },
  ]
})
