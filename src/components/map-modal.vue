<template>
  <div>
    <q-btn fab color="primary" icon="place" @click="isOpened = true" class="absolute location-btn" />
    <q-modal v-model="isOpened" class="map-modal">
      <div class="q-pa-lg">
        <q-btn flat @click="isOpened = false" class="close absolute-top-right q-ma-lg">
          <q-icon name="close" size="34px" />
        </q-btn>
        <h5 class="q-mt-none q-mb-sm"><q-icon name="pin_drop" size="40px" class="q-mb-xs" /> Geo-location</h5>
        <p class="q-mb-sm">Place the QrCode close to the center of the marker for highest accuracy.</p>
        <div class="row q-mb-sm">
          <google-autocomplete
            :disable="false"
            @latitude-changed="updateLatitude"
            @longitude-changed="updateLongitude"
          />
        </div>
        <div class="row" v-if="isOpened">
          <google-map
            :disable="false"
            :latitude="modalLatitude"
            :longitude="modalLongitude"
            :maxDistance="modalMaxDistance"
            @radius-changed="updateRadius"
            @latitude-changed="updateLatitude"
            @longitude-changed="updateLongitude"
           />
        </div>
        <div class="row q-mt-md">
          <div class="col-2 q-pr-md">
            <q-input float-label="Latitude" type="number" v-model.trim="modalLatitude" :before="[{icon: 'public', handler () {}}]"/>
          </div>
          <div class="col-2">
            <q-input float-label="Longitude" type="number" v-model.trim="modalLongitude" :before="[{icon: 'public', handler () {}}]" />
          </div>
          <div class="col-6">
            <q-field>
              <q-slider label-always :label-value="`${ modalMaxDistance }m`" v-model="modalMaxDistance" :min="1" :max="1000" />
            </q-field>
          </div>
           <div class="col-2">
            <q-btn color="primary" label="save" @click="save" :loading="isLoading" class="q-mt-md float-right" />
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import axios from 'axios'
import googleMap from '../components/google-map.vue'
import googleAutocomplete from '../components/google-autocomplete.vue'

export default {
  name: 'map-modal',
  props: ['wallId', 'latitude', 'longitude', 'maxDistance'],
  components: { googleMap, googleAutocomplete },
  data () {
    return {
      isOpened: false,
      isLoading: false,
      modalLatitude: this.latitude,
      modalLongitude: this.longitude,
      modalMaxDistance: this.maxDistance
    }
  },
  computed: {
    hasCoords () {
      return this.longitude !== 0 && this.latitude !== 0
    },
    isAuthenticated () {
      return this.$store.state.wall.authenticated
    },
    AuthToken () {
      return this.$store.state.wall.token
    }
  },
  methods: {
    updateRadius: function (value) {
      this.modalMaxDistance = Math.round(value)
    },
    updateLatitude: function (value) {
      this.modalLatitude = Number(value.toFixed(5))
    },
    updateLongitude: function (value) {
      this.modalLongitude = Number(value.toFixed(5))
    },
    getAuthHeaders () {
      var headers = {}
      if (this.isAuthenticated) {
        headers = {
          'accept': 'application/json',
          'content-type': 'application/json',
          'X-ZUMO-AUTH': this.AuthToken
        }
      }
      return headers
    },
    save () {
      this.isLoading = true
      var data = {
        latitude: this.modalLatitude,
        longitude: this.modalLongitude,
        distance: this.modalMaxDistance
      }
      var options = { headers: this.getAuthHeaders() }
      axios.patch(process.env.API_URL + '/api/location/' + this.wallId, data, options)
        .then(response => {
          this.isLoading = false
          this.isOpened = false
        })
        .catch(error => {
          console.log(error)
          // todo, create error message
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="stylus">
  .map-modal
    .modal-content
      width 70%
    .q-slider
      padding 31px 0 8px
</style>
