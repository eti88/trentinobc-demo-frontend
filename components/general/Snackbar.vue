<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :multi-line="true"
    :timeout="timeout"
    :bottom="true"
    :right="true"
  >
    {{ message }}
    <v-btn text @click="show = false">
      Chiudi
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      show: false,
      message: '',
      timeout: 10000
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      content: 'notifications/getContent',
      color: 'notifications/getColor'
    })
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notifications/showMessage') {
        this.message = this.content
        this.show = true
      }
    })
  }
}
</script>
