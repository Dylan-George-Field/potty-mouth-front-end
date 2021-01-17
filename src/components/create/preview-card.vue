<template>
  <q-card class="q-mb-lg preview-card">
    <div class="preview-image-container">
      <img v-if="!isFirstSampleLoaded" src="statics/sample.svg" alt="This is a sample image" />
      <img v-else :src="image" class="homepage-qrcode block" />
    </div>
    <q-card-separator />
    <q-card-title class="relative-position">
      <q-btn fab color="primary" icon="place" class="absolute location-btn" />
        {{ title ? title : 'Untitled Wall' }}
      <div slot="right" class="row items-center q-mt-lg">
        {{ distance ? (distance/1000).toFixed() + ' km' : 'Unknown' }}
      </div>
    </q-card-title>
    <div v-if="isComplete">
      <q-card-separator ref="qrCode" />
      <q-card-main>
        <p>Created: {{ formatDate(created) }}</p>
        <p>Id:  {{ wallId ? wallId : 'Hidden (anonymous)' }}</p>
        <div class="row">
          <q-btn flat icon="get_app" color="primary" @click="download" class="col-6">
            Download
          </q-btn>
          <a ref="download" :id="'image-download-' + wall.RowKey" :href="image" download="tryscanme.jpg"></a>
          <q-btn flat icon="delete_forever" color="red" @click="deleteDialog(wall.RowKey)" class="col-6">
            Delete
          </q-btn>
        </div>
      </q-card-main>
    </div>
  </q-card>
</template>

<script>
import axios from 'axios'
import { date, debounce } from 'quasar'

export default {
  name: 'previewCard',
  props: ['title', 'hasLogo', 'isComplete', 'latitude', 'longitude', 'created', 'wallId'],
  data () {
    return {
      wall: {},
      isFirstSampleLoaded: false,
      isLoading: false,
      image: '',
      wallToken: '',
      complete: false,
      clientLatitude: '',
      clientLongitude: '',
      distance: null,
      getDistance: null
    }
  },
  computed: {
    qrCodes () {
      return this.$store.state.wall.qrCodes
    },
    hasCoords () {
      if (this.latitude >= -90 && this.latitude <= 90 && this.longitude >= -180 && this.longitude <= 180) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    hasLogo: function () {
      this.getSampleImage()
    },
    hasCoords: function (val) {
      console.log(val)
    },
    latitude: function () {
      if (this.hasCoords) {
        this.getDistance()
      }
    },
    longitude: function () {
      if (this.hasCoords) {
        this.getDistance()
      }
    },
    clientLatitude: function () {
      this.getDistance()
    }
  },
  created () {
    this.getSampleImage()
    this.getClientCoords()

    this.getDistance = debounce(function () {
      axios.get(process.env.API_URL + '/api/distance',
        { params: { clientLatitude: this.clientLatitude, clientLongitude: this.clientLongitude, qrcodeLatitude: this.latitude, qrcodeLongitude: this.longitude } })
        .then(response => {
          this.distance = response.data.distance
        })
        .catch(error => {
          console.log(error)
        })
    }, 500)
  },
  methods: {
    getSampleImage () {
      this.isLoading = true
      axios.get(process.env.API_URL + '/api/sample', { params: { logo: this.hasLogo }, responseType: 'blob' })
        .then(response => {
          this.image = URL.createObjectURL(response.data)
          this.wallToken = response.headers['x-wallid']
          this.isLoading = false
          this.isFirstSampleLoaded = true
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    },
    getClientCoords () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.clientLatitude = position.coords.latitude
          this.clientLongitude = position.coords.longitude
        })
      }
    },
    formatDate (input) {
      return date.formatDate(input, 'DD/MM/YYYY')
    },
    download () {
      this.$refs.download.click()
    },
    deleteDialog (key) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure?',
        color: 'Primary',
        ok: true,
        cancel: true
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
    }
  }
}
</script>

<style lang="stylus">
  .preview-card
    border 1px #ccc solid
    img
      width 100%
      height auto
    .location-btn
      top 0
      right 8px
      transform translateY(-50%)
    .q-card-title-extra
      margin-left 10px
    .q-card-main
      word-wrap break-word
    .q-spinner
      display block
      margin auto
      height 150px
</style>
