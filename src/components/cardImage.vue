<template>
  <div>
    <q-card-media>
    <router-link :to="'wall/' + wallId">
      <img v-if="!isLoaded" src="statics/sample.svg" alt="This is a sample image" />
      <img :id="'image-' + wallId" :src="image" />
      <div class="overlay">
      </div>
    </router-link>
  </q-card-media>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'cardImage',
  props: ['wallId'],
  data () {
    return {
      image: '',
      isLoaded: false
    }
  },
  computed: {
    qrCodes: {
      get () {
        return this.$store.state.wall.qrCodes
      },
      set (val) {
        this.$store.dispatch('wall/qrCodes', val)
      }
    },
    authenticated () {
      return this.$store.state.wall.authenticated
    },
    easyAuthToken () {
      return this.$store.state.wall.token
    }
  },
  created () {
    axios.get(process.env.API_URL + '/api/admin/qrCode/' + this.wallId,
      { headers: this.getAuthHeaders(), responseType: 'blob' })
      .then(response => {
        this.image = URL.createObjectURL(response.data)
        this.qrCodes = { wallId: this.wallId, qrCode: this.image }
        this.isLoaded = true
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    getAuthHeaders () {
      var headers = {}
      if (this.authenticated) {
        headers = {
          'accept': 'application/json',
          'content-type': 'application/json',
          'X-ZUMO-AUTH': this.easyAuthToken
        }
      }
      return headers
    }
  }
}
</script>

<style lang="stylus">
  .q-card-media
    a
      display block
      margin-bottom -5px
      &:hover
        .overlay
          opacity 0.3
      .overlay
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        height 100%
        width 100%
        opacity 0
        transition .3s ease
        background-color #027be3
</style>
