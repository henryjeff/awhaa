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
      var req_url = ""
      if(payload.user.gid != undefined){
        req_url = `gid/${payload.user.gid}`
      } else if (payload.user.id != undefined) {
        req_url = `id/${payload.user.id}`
      } else {
        router.push('/error/ERR_INV_GET_USER_REQ')
      }
      return new Promise((resolve, reject) => {
        axios.get(`/api/users/${req_url}`)
          .then((response) => {
            if(payload.signin && ((payload.user.gid == response.data.gid) || (payload.user.id == response.data._id))){
              commit('SIGNIN_USER', response.data)
            }
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_GET_USER')
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
            router.push('/error/ERR_DB_POST_USER')
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
    },
    // FETCH A MEAL
    async fetchMeal({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.get(`/api/meals/id/${payload.id}/`)
          .then((response) => {
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_FETCH_MEAL')
            reject(errors)
          })
      })
    },
    // SEARCH FOR MEALS
    async fetchMeals({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.get(`/api/meals/search?name=${payload.name}`)
          .then((response) => {
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_FETCH_MEALS')
            reject(errors)
          })
      })
    },
    async postPreppedMeal({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.post('/api/mymeals/', payload.preppedmeal)
          .then((response) => {
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_POST_PREPPED_MEAL')
            reject(errors)
          })
      })
    },
    async fetchPreppedMeal({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.get(`/api/mymeals/id/${payload.preppedmeal.id}`)
          .then((response) => {
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_FETCH_PREPPED_MEAL')
            reject(errors)
          })
      })
    },
    async fetchPreppedMeals({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.get(`/api/mymeals/inventory/${payload.user.id}`)
          .then((response) => {
            resolve(response)
          })
          .catch((errors) => {
            router.push('/error/ERR_DB_FETCH_INVENTORY')
            reject(errors)
          })
      })
    },
  }
})
