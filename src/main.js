import Vue from 'vue'
import App from './App'
import Ionic from '@ionic/vue';
import GSignInButton from 'vue-google-signin-button'
import VueSession from 'vue-session'
import { VueSpinners } from '@saeris/vue-spinners'

import '@ionic/core/css/ionic.bundle.css';
import style from './index.css'
import router from './router'

Vue.config.productionTip = false

Vue.use(Ionic);
Vue.use(VueSpinners)
Vue.use(GSignInButton)
Vue.use(VueSession)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
