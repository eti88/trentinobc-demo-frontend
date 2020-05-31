<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list rounded>
        <v-list-item
          @click.stop="createNewItem()"
        >
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Nuovo'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
      drawer: true,
      fixed: false,
      miniVariant: false,
      title: 'TrentinoBC'
    }
  },
  methods: {
    createNewItem () {
      this.$store.commit('files/setModal', true)
    }
  }
}
</script>
