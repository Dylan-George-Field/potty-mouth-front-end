<template>
  <q-card inline>
    <card-image :wallId="wall.RowKey"/>
    <q-card-separator />
    <q-card-title class="relative-position">
        <map-modal :wallId="wall.RowKey" :latitude="wall.Latitude" :longitude="wall.Longitude" :maxDistance="wall.MaxDistance" />
        {{ wall.Title ? wall.Title : 'Untitled Wall' }}
      <div slot="right" class="row items-center q-mt-lg">
        {{ distance ? distance + ' km' : 'Unset' }}
      </div>
    </q-card-title>
    <q-card-separator ref="qrCode"/>
    <q-card-main>
      <p>Created: {{ formatDate(wall.Timestamp) }}</p>
      <p>Id: {{ wall.RowKey }} </p>
      <q-btn flat icon="get_app" color="primary" @click="openDownloadModal = true" class="left">
        Download
      </q-btn>
      <!-- todo, put this in component -->
        <q-modal v-model="openDownloadModal">
          <div class="q-pa-lg">
            <h5 class="q-mb-lg q-mt-sm"><q-icon name="photo" class="q-mb-xs" /> Choose a format</h5>
            <div class="row">
              <q-btn outline label="Jpeg" color="primary" @click="downloadJpeg" class="col-6" />
              <q-btn outline label="Png" color="primary" :disabled="true" @click="openDownloadModal = false" class="col-6" />
            </div>
            <div class="row">
              <q-btn outline label="Pdf" color="primary" :disabled="true" @click="openDownloadModal = false" class="col-6" />
              <q-btn outline label="Svg" color="primary" :disabled="true" @click="openDownloadModal = false" class="col-6" />
            </div>
            <div class="row q-mt-lg">
              <q-btn label="close" color="primary" @click="openDownloadModal = false" class="col-4 offset-8" />
            </div>
          </div>
        </q-modal>
      <a ref="download" :id="'image-download-' + wall.RowKey" :href="image" download="tryscanme.jpg"></a>
      <q-btn flat icon="delete_forever" color="red" @click="deleteDialog(wall.RowKey)" class="q-mb-sm float-right">
        Delete
      </q-btn>
    </q-card-main>
  </q-card>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
import cardImage from '../components/cardImage.vue'
import mapModal from '../components/map-modal.vue'

export default {
  name: 'dashboardCard',
  components: { cardImage, mapModal },
  props: ['wall', 'latitude', 'longitude'],
  data () {
    return {
      image: '',
      openDownloadModal: false,
      openMapModal: false,
      distance: '',
      maxDistance: 100
    }
  },
  computed: {
    qrCodes () {
      return this.$store.state.wall.qrCodes
    },
    authenticated () {
      return this.$store.state.wall.authenticated
    },
    easyAuthToken () {
      return this.$store.state.wall.token
    }
  },
  created () {
    var i
    for (i = 0; i < this.qrCodes.length; i++) {
      if (this.qrCodes[i].wallId === this.wall.RowKey) {
        this.image = this.qrCodes[i].qrCode
      }
    }
    this.getDistance()
  },
  methods: {
    formatDate (input) {
      return date.formatDate(input, 'DD/MM/YYYY')
    },
    downloadJpeg () {
      this.$refs.download.click()
      this.opened = false
    },
    deleteDialog (key) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure?',
        color: 'Primary',
        ok: true,
        cancel: true,
        icon: 'delete'
      }).then(() => {
        this.delete(key)
      }).catch(() => {})
    },
    delete () {
      axios.delete(process.env.API_URL + '/api/wall/' + this.wall.RowKey,
        { headers: this.getAuthHeaders() })
        .then(response => {
          this.walls = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDistance () {
      axios.get(process.env.API_URL + '/api/' + this.wall.RowKey + '/IsWithinDistance?latitude=' + this.latitude + '&longitude=' + this.longitude,
        { headers: this.getAuthHeaders() })
        .then(response => {
          this.maxDistance = response.data.MaxDistance
          this.distance = Math.round(response.data.Distance / 1000)
        })
    },
    // todo, put this in store
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
  .dashboard
    .q-card
      margin 10px
      max-width 300px
      img
        width 100%
        height auto
  .location-btn
    top 0
    right 8px
    transform translateY(-50%)
</style>
