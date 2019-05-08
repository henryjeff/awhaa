import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
import router from '../router/'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: undefined,
  },
  mutations: {
    SIGNIN_USER(state, user){
      state.user = user
    },
  },
  actions: {
    // GET USER
    async fetchUser({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.get(`/api/users/${payload.user.gid}`)
          .then((response) => {
            if(payload.signin && payload.user.gid == response.data.gid){
              commit('SIGNIN_USER', response.data)
            }
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_POST_USER')
            reject(errors)
          })
      })
    },
    // POST USER
    async postUser({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.post("/api/users/", payload.user)
          .then((response) => {
            commit('SIGNIN_USER', response.data)
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_GET_USER')
            reject(errors)
          })
      })
    },
    // POST MEAL
    async postMeal({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.post("/api/meals/", payload.meal)
            .then((response) => {
              resolve(response)
            })
            .catch((errors) => {
              router.push('/error/ERR_DB_POST_MEAL')
              reject(errors)
            })
      })
    }
  }
})
