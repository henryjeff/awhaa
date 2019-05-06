import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Welcome'
import Search from '@/components/Search'
import Dash from '@/components/Dash'
import Event from '@/components/EventDisplay'
import GoogleSignIn from '@/components/GoogleSignIn'
import Map from '@/components/Map'
import EventCreate from '@/components/EventCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/googlesignin',
      name: 'Google Sign In',
      component: GoogleSignIn
    },
    {
      path: '/search',
      name: 'Search Cleanup',
      component: Search
    },
    {
      path: '/dash',
      name: 'Dashboard',
      component: Dash
    },
    {
      path: '/event/:eventName/:publicID/:eventLoc/',
      name: 'EventDisplay',
      component: Event,
      props: true
    },
    {
      path: '/map',
      name: 'MapTest',
      component: Map
    },
    {
      path: '/eventcreate',
      name: 'Event Create',
      component: EventCreate
    }
  ]
})
