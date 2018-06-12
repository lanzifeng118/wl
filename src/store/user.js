import api from 'libs/api'
import axios from 'axios'
const state = {
  name: '',
  sms: 0,
}

const getters = {
  username: state => state.name,
  usersms: state => state.sms,
}

const actions = {
  setUsersms({ commit }) {
    axios(api.personal.smsList({
      type: 'N', // A 0 Y 1 N 2
      page_no: 0,
      page_size: 1
    })).then(res => {
      let data = res.data
      console.log(data)
      if (data.code === 200) {
        commit('setUsersms', data.data.total)
      }
    })
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

const mutations = {
  setUsername(state, name) {
    state.name = name
  },
  setUsersms(state, sms) {
    state.sms = sms
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
