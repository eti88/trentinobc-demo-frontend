<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span class="caption mx-3">&copy; {{ new Date().getFullYear() }}, TrentinoBC</span>
    </v-footer>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/general/Snackbar.vue'

export default {
  components: { Snackbar },
  data () {
    return {
      clipped: true,
      fixed: false,
      title: 'TrentinoBC'
    }
  },
  methods: {
    /**
     * Vuex Actions
     */
    logout () {
      this.$auth.logout('local')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
