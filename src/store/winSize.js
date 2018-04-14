const state = {
  width: 0,
  heigth: 0
}

const getters = {
  winWidth: state => state.width,
  winHeigth: state => state.heigth,
}

const actions = {}

const mutations = {
  setWinWidth(state, width) {
    state.width = width
  },
  setWinHeigth(state, heigth) {
    state.heigth = heigth
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
