<template>
  <v-list
    two-line
    subheader
  >
    <v-subheader inset>
      Files
    </v-subheader>
    <v-list-item-group v-model="item" color="primary">
      <VFileItem
        v-for="item in files"
        :key="item.title"
        :value="item"
        class="item"
      />
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VFileItem from '~/components/general/FileItem.vue'

export default {
  components: { VFileItem },
  async fetch () {
    await this.fetchTxs()
    this.files = this.list
    console.log(`Loaded ${this.files.length} items.`)
  },
  fetchOnServer: false,
  data () {
    return {
      files: [],
      item: {}
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      loading: 'txs/getLoading',
      list: 'txs/getList'
    })
  },
  watch: {
    item (n) {
      this.$store.commit('txs/setItem', n)
    }
  },
  methods: {
    ...mapActions({
      reset: 'txs/reset',
      fetchTxs: 'txs/fetchTxs'
    })
  }
}
</script>

<style scoped>
  .item:hover {
    background: #8686861f;
  }
</style>
