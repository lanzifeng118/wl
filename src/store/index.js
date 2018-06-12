import Vue from 'vue'
import Vuex from 'vuex'
import color from './color'
import winSize from './winSize'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    winSize,
    color
  }
})
