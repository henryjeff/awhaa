import Vue from 'vue'
import App from './App'
import GSignInButton from 'vue-google-signin-button'
import VueSession from 'vue-session'
import style from './index.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueWorker from 'vue-worker'


import router from './router'

Vue.config.productionTip = false

Vue.use(GSignInButton)
Vue.use(VueSession)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDs-DZDyN0p3S4O9V0K8b7X3GyxfeHaKis',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


// Vue.use(VueSocketIO, io('http://localhost'))


Vue.use(VueWorker);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
