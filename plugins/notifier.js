export default ({ app }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '' }) {
      app.store.commit('notifications/showMessage', { content, color })
    }
  })
}
