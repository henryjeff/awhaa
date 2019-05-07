import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import SignIn from '@/pages/SignIn'
import SignOut from '@/pages/SignOut'
import Home from '@/pages/home'
import Error from '@/pages/error'
import CreateMeal from '@/pages/CreateMeal'
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
      path: '/user/:username',
      name: 'User Settings',
      component: UserSettings
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    // {
    //   path: '/search',
    //   name: 'Search Cleanup',
    //   component: Search
    // },
    // {
    //   path: '/dash',
    //   name: 'Dashboard',
    //   component: Dash
    // },
    // {
    //   path: '/event/:eventName/:publicID/:eventLoc/',
    //   name: 'EventDisplay',
    //   component: Event,
    //   props: true
    // },
    // {
    //   path: '/map',
    //   name: 'MapTest',
    //   component: Map
    // },
    // {
    //   path: '/eventcreate',
    //   name: 'Event Create',
    //   component: EventCreate
    // }
  ]
})
