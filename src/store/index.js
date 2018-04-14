import Vue from 'vue'
import Vuex from 'vuex'
import color from './color'
import winSize from './winSize'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    winSize,
    color
  }
})
