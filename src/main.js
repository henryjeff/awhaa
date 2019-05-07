import Vue from 'vue'
import App from './App'
import Ionic from '@ionic/vue';
import GSignInButton from 'vue-google-signin-button'
import VueSession from 'vue-session'
import { VueSpinners } from '@saeris/vue-spinners'

import '@ionic/core/css/ionic.bundle.css';
import style from './index.css'
import router from './router'


Vue.use(Ionic);
Vue.use(VueSpinners)
Vue.use(GSignInButton)
Vue.use(VueSession)

Vue.config.ignoredElements = [
  'ion-app',
  'ion-page',
  'ion-header',
  'ion-toolbar',
  'ion-title',
  'ion-content',
  'ion-list',
  'ion-item',
  'ion-label',
  'ion-router-outlet',
  'ion-container',
  'ion-button',
  'ion-buttons',
  'ion-icon',
  'ion-card',
  'ion-card-header',
  'ion-card-subtitle',
  'ion-card-title',
  'ion-card-content',
  'ion-progress-bar',
  'ion-input',
  'ion-fab',
  'ion-fab-button',
  'ion-fab-list',
  'ion-select',
  'ion-select-option',
  'ion-searchbar'
]

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
