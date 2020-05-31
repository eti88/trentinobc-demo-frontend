<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="blue white--text">
        mdi-file
      </v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="value.title"></v-list-item-title>
      <v-list-item-subtitle v-text="value.release_date"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-menu
        :close-on-click="closeOnClick"
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
          >
            <v-icon color="grey lighten-1">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list >
          <v-list-item
            @click="onDownload(item)"
          >
            <v-list-item-title>
              Download
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="onShowInformation(item)"
          >
            <v-list-item-title>
              Informazioni
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      closeOnClick: true
    }
  },
  methods: {
    ...mapActions({
      reset: 'files/reset'
    }),
    onShowInformation (item) {
      console.log('todo')
    },
    onDownload (item) {
      console.log('todo')
    }
  }
}
</script>
