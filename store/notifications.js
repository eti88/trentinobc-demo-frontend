import { set } from '@/helpers/vuex'

const getDefaultState = () => ({
  content: '',
  color: ''
})

export const state = () => getDefaultState()

export const mutations = {
  setContent: set('content'),
  setColor: set('color'),
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
  }
}

export const getters = {
  getContent: state => state.content,
  getColor: state => state.color
}
