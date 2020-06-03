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
  async fetchTxs ({ commit }, query) {
    try {
      commit('setLoading', true)
      let success = false
      let data, message, parsedQuery
      parsedQuery = ''
      if (typeof query !== 'undefined') {
        parsedQuery = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')
      }

      const url = (parsedQuery.length > 0) ? `/transactions?${parsedQuery}` : '/transactions'
      await this.$axios.get(url).then((res) => {
        success = (res.status === 200)
        if (res.status === 200) {
          data = res.data.data
          console.log(data)
        }
      }).catch((err) => {
        message = responseError(err.response)
      })

      if (!success) { throw new Error(message) }
      commit('setList', data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[vuex error][fetchTxs]: ${error}`)
      this.$notifier.showMessage({ content: error, color: 'error' })
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchTx ({ commit }, hash) {
    try {
      commit('setLoading', true)
      let success = false
      let data, message
      await this.$axios.get(`/txs/${hash}`, { baseURL: 'http://95.217.177.211:1317' }).then((res) => {
        success = (res.status === 200)
        if (res.status === 200) {
          data = res.data.data
          console.log(data)
        }
      }).catch((err) => {
        message = responseError(err.response)
      })

      if (!success) { throw new Error(message) }
      commit('setItem', data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[vuex error][fetchTxs]: ${error}`)
      this.$notifier.showMessage({ content: error, color: 'error' })
    } finally {
      commit('setLoading', false)
    }
  },
  async downloadFile ({ commit }, item) {
    await console.log('todo')
    console.log(commit)
    console.log(item)
  },
  async addFile ({ commit }, item) {
    try {
      commit('setLoading', true)
      let success = false
      let message
      if (typeof item.data === 'undefined' || item.data.length === 0) {
        this.$notifier.showMessage({ content: 'No file selected for upload', color: 'warning' })
        return false
      }
      await this.$axios.post('/upload', item.data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
        success = (res.status === 201)
        if (res.status === 201) {
          this.$notifier.showMessage({ content: 'File uploaded', color: 'success' })
        }
      }).catch((err) => {
        message = responseError(err.response)
      })
      if (!success) { throw new Error(message) }
      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[vuex error][uploadFiles]: ${error}`)
      this.$notifier.showMessage({ content: error, color: 'error' })
      return false
    } finally {
      commit('setLoading', false)
    }
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
