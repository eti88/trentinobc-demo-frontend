import { assign, set } from '@/helpers/vuex'
import { responseError } from '~/helpers/utils.js'

const getDefaultState = () => ({
  list: [],
  loading: false,
  item: {},
  modal: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchTxs ({ commit, state }, query) {
    try {
      commit('setLoading', true)
      let success = false
      let data, message, parsedQuery
      if (query.message_action) {
        // TODO
        data = 1
        parsedQuery = null
        console.log(data)
      }

      // ?message.action=send&message.sender=cosmos16xyempempp92x9hyzz9wrgf94r6j9h5f06pxxv&page=1&limit=1
      await this.$axios.get(`/txs?${parsedQuery}`).then((res) => {
        success = (res.status === 200)
        if (res.status === 200) {
          data = res.data.data
        }
      }).catch((err) => {
        message = responseError(err.response)
      })

      if (!success) { throw new Error(message) }
      // TODO: set loading
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[vuex error][fetchTxs]: ${error}`)
      this.$notifier.showMessage({ content: error, color: 'error' })
    } finally {
      commit('setLoading', false)
    }

    await console.log('todo')
    console.log(commit)
    console.log(state)
  },
  async fetchFile ({ commit }, item) {
    await console.log('todo')
    console.log(commit)
    console.log(item)
  },
  async addFile ({ commit, state }, item) {
    await console.log('todo')
    console.log(commit)
    console.log(state)
    console.log(item)
  },
  async deleteFile ({ commit, state }, item) {
    await console.log('todo')
    console.log(commit)
    console.log(state)
    console.log(item)
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setList: set('list'),
  setLoading: set('loading'),
  setItem: set('item'),
  setModal: set('modal')
}

export const getters = {
  getLoading: state => state.loading,
  getList: state => state.list,
  getItem: state => state.item,
  getModal: state => state.modal
}
