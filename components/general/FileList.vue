<template>
  <v-list
    two-line
    subheader
  >
    <v-subheader inset>
      Files
    </v-subheader>

    <VFileItem
      v-for="item in files"
      :key="item.title"
      :value="item"
      class="item"
    />
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VFileItem from '~/components/general/FileItem.vue'

export default {
  components: { VFileItem },
  async fetch () {
    await console.log('start')
  },
  fetchOnServer: false,
  data () {
    return {
      files: [
        {
          title: 'First War',
          author: 'Mario Rossi',
          genre: 'Hystory',
          release_date: '2020-05-20',
          release_date_precision: 'Month',
          explicit: true,
          copyright: 'CC',
          doc: '/ipfs/QQQQQQM....',
          doc_original: '/ipfs/QQQQQQM....',
          image: '/ipfs/QM....',
          pages: 224,
          credits: 'TrentinoBC',
          tags: 'tag1,tag2',
          upc_ean: 'upc',
          isbn: '12345678'
        },
        {
          title: 'First War',
          author: 'Mario Rossi',
          genre: 'Hystory',
          release_date: '2020-05-20',
          release_date_precision: 'Month',
          explicit: true,
          copyright: 'CC',
          doc: '/ipfs/QQQQQQM....',
          doc_original: '/ipfs/QQQQQQM....',
          image: '/ipfs/QM....',
          pages: 224,
          credits: 'TrentinoBC',
          tags: 'tag1,tag2',
          upc_ean: 'upc',
          isbn: '12345678'
        },
        {
          title: 'First War',
          author: 'Mario Rossi',
          genre: 'Hystory',
          release_date: '2020-05-20',
          release_date_precision: 'Month',
          explicit: true,
          copyright: 'CC',
          doc: '/ipfs/QQQQQQM....',
          doc_original: '/ipfs/QQQQQQM....',
          image: '/ipfs/QM....',
          pages: 224,
          credits: 'TrentinoBC',
          tags: 'tag1,tag2',
          upc_ean: 'upc',
          isbn: '12345678'
        }
      ]
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      // files: 'files/getList',
      loading: 'files/getLoading'
    })
  },
  methods: {
    ...mapActions({
      reset: 'files/reset'
    })
  }
}
</script>

<style scoped>
  .item:hover {
    background: #8686861f;
  }
</style>
