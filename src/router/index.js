import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import SignIn from '@/pages/SignIn'
import SignOut from '@/pages/SignOut'
import Home from '@/pages/home'
import Error from '@/pages/error'
import CreateMeal from '@/pages/CreateMeal'
import MealsSearch from '@/pages/MealsSearch'
import UserSettings from '@/pages/UserSettings'
import MealOverview from '@/pages/MealOverview'
import PreppedMeals from '@/pages/PreppedMeals'
import PreppedMealOverview from '@/pages/PreppedMealOverview'

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
      path: '/meals/create',
      name: 'Create Meal',
      component: CreateMeal
    },
    {
      path: '/meals/search',
      name: 'Seach Meals',
      component: MealsSearch
    },
    {
      path: '/user/:username',
      name: 'User Settings',
      component: UserSettings
    },
    {
      path: '/meals/overview/:id',
      name: 'Meal',
      component: MealOverview
    },
    {
      path: '/error/:code',
      name: 'Error',
      component: Error
    },
    {
      path: '/mymeals/',
      name: 'My Prepared Meals',
      component: PreppedMeals
    },
    {
      path: '/mymeals/overview/:id',
      name: 'Prepared Meal',
      component: PreppedMealOverview
    }
  ]
})
