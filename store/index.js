import axios from 'axios'
import * as Cookies from 'js-cookie'

var cookieparser = require('cookieparser')

export const state = () => ({
  auth: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.auth = user
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log(process.env.apiUrl)
    if (req.headers.cookie) {
      let cookie = cookieparser.parse(req.headers.cookie) 
      if (cookie.auth) {
        commit('SET_USER', cookie.auth)
      }
    }
  },

  async login({ commit }, { remember, username, password }) {
    try {
      let grant_type = 'password'
      let client_id = '1'
      let client_secret = 'X9MNiYa1cnojmfmwl4GHgZjHN5OYzhODdZLpW1KF'  
      const { data } = await axios.post('/oauth/token', { grant_type, client_id, client_secret, username, password })
      if (remember) {
        Cookies.set('auth', data.access_token)
      }
      commit('SET_USER', data.access_token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    commit('SET_USER', null)
    Cookies.remove('auth')
  }
}