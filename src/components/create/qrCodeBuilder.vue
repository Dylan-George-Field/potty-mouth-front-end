<template>
  <div class="row">
    <div v-show="!isComplete" class="col-8 q-pa-md q-mb-lg create-panel">
        <div class="row text-left">
          <q-field helper="This is displayed at the top of the wall" :count="50" class="q-mx-md q-mb-md">
            <q-input v-model="title" float-label="Title" placeholder="Eg, Jane's House, My Guestbook, The Secret Wall" :error="$v.title.$error" @blur="$v.title.$touch"/>
          </q-field>
          <q-field helper="This is the first message on the wall" :count="250" class="q-ma-md">
            <q-input v-model="introMessage" float-label="Introduction Message" placeholder="Eg, Welcome to my wall, leave a message!" />
          </q-field>
           <q-field helper="Geo-lock your wall so people outside the circle can't access it. Increase the area of the circle if GPS accuracy is low.
            Place the wall code in the middle of the circle. Uncheck this if it'll be moving such as on a train, car or bus." class="q-ma-md">
            <q-toggle v-model="hasLogo" label="Remove logo" class="q-mb-md" />
            <br />
            <q-toggle v-model="hasGeolock" label="Geo-lock" />
          </q-field>
        <div class="row q-mx-md" style="width: 100%">
          <q-field help="Select the location your wall will be">
            <google-autocomplete
              :disable="!hasGeolock"
              @latitude-changed="updateLatitude"
              @longitude-changed="updateLongitude"
            />
          </q-field>
        </div>
          <div class="row q-ma-md" style="width: 100%">
            <google-map
              :disable="!hasGeolock"
              :latitude="latitude"
              :longitude="longitude"
              :maxDistance="maxDistance"
              @radius-changed="updateRadius"
              @latitude-changed="updateLatitude"
              @longitude-changed="updateLongitude"
            />
          </div>
          <div class="row q-ma-md">
            <div class="col-6 q-pr-md">
              <q-input float-label="Latitude" type="number" :disable="!hasGeolock" v-model.trim="latitude" :error="$v.latitude.$error" @blur="$v.latitude.$touch" :before="[{icon: 'public', handler () {}}]" />
            </div>
            <div class="col-6">
              <q-input float-label="Longitude" type="number" :disable="!hasGeolock" v-model.trim="longitude" :error="$v.longitude.$error" @blur="$v.longitude.$touch" :before="[{icon: 'public', handler () {}}]" />
            </div>
            <p class="q-field-bottom">
            </p>
            <q-field helper="Allowed distance from geo-location. We recommend 20 meters in open areas and up to 100 meters in built up areas.">
              <q-slider label-always :disable="!hasGeolock" :label-value="`${ maxDistance }m`" v-model="maxDistance" :min="1" :max="1000" />
            </q-field>
          </div>
          <div style="width:100%">
            <q-btn @click="confirm" color="primary" :disable="isConfirmDisabled || isLoadingPreview" :loading="isGenerating" class="float-right q-ml-md confirm-button">
              Confirm
            </q-btn>
            <q-btn color="primary" @click="refresh" :loading="isLoadingPreview" class="float-right">
              <q-icon name="refresh" />
            </q-btn>
          </div>
        </div>
    </div>
    <div class="col-4 text-left">
      <preview-card ref="previewCard" :title="title" :hasLogo="hasLogo" :isComplete="isComplete" :latitude="latitude" :longitude="longitude" :wallId="wallId" :created="created" />
    </div>
    <div v-show="isComplete" class="col-8 q-pa-lg">
      <h2>Congratulations! 🎉🎉</h2>
      <p>Your wall has been successfully created.</p>
      <p>Download the code and print it.</p>
      <q-btn label="Create another" @click="isComplete = false" color="primary" class="q-ma-lg" />
      <div class="row justify-center">
        <div class="image-wrap relative-position">
            <div class="overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import previewCard from './preview-card.vue'
import googleMap from '../google-map.vue'
import googleAutocomplete from '../google-autocomplete.vue'
import { between, maxLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'qr-code-builder',
  components: { previewCard, googleMap, googleAutocomplete },
  props: ['tracked'],
  data () {
    return {
      isMounted: false,
      title: '',
      introMessage: '',
      hasLogo: true,
      hasGeolock: true,
      maxDistance: 100,
      latitude: 3.13726,
      longitude: 101.59452,
      params: {},
      isComplete: false,
      isLoading: false,
      isGenerating: false,
      errorMessage: '',
      wallId: '',
      created: null
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.wall.authenticated
    },
    AuthToken () {
      return this.$store.state.wall.token
    },
    isConfirmDisabled () {
      if (this.hasGeolock) {
        return this.$v.latitude.$error || this.$v.longitude.$error || this.$v.title.$error
      } else {
        return this.$v.title.$error
      }
    },
    isLoadingPreview () {
      if (!this.isMounted) {
        return
      }
      return this.$refs.previewCard.isLoading
    }
  },
  watch: {
    hasGeolock: function (val) {
      if (val) {
        this.$v.latitude.$touch()
        this.$v.longitude.$touch()
      } else {
        this.$v.latitude.$reset()
        this.$v.longitude.$reset()
      }
    }
  },
  created () {
    if (this.tracked === 'true') {
      this.params.tracked = true
    } else {
      this.params.tracked = false
    }
  },
  mounted () {
    this.isMounted = true
  },
  methods: {
    updateRadius: function (value) {
      this.maxDistance = Math.round(value)
    },
    updateLatitude: function (value) {
      this.latitude = Number(value.toFixed(5))
    },
    updateLongitude: function (value) {
      this.longitude = Number(value.toFixed(5))
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

    refresh () {
      this.$refs.previewCard.getSampleImage()
    },
    confirm () {
      // This is confusing because if you have an invalid box then empty it and click confirm it will take the last valid value
      // Confused? So am I.
      if (!this.hasGeolock || (this.latitude >= -90 && this.latitude <= 90 && this.longitude >= -180 && this.longitude <= 180)) {
        this.validate()
      } else {
        console.log('error')
      }
    },
    validate () {
      if (this.hasGeolock) {
        this.$v.latitude.$touch()
        this.$v.longitude.$touch()
      }
      this.$v.title.$touch()
      if (!this.$v.title.$error || !this.$v.latitude.$error || !this.$v.longitude.$error) {
        this.generate()
      }
    },
    generate () {
      this.isGenerating = true

      if (this.hasGeolock) {
        this.params.latitude = this.latitude
        this.params.longitude = this.longitude
        this.params.maxDistance = this.maxDistance
      }
      this.params.wallToken = this.$refs.previewCard.wallToken
      this.params.title = this.title
      this.params.logo = this.hasLogo

      var options = { params: this.params, headers: this.getAuthHeaders() }
      axios.get(process.env.API_URL + '/api/Generate', options)
        .then(response => {
          this.created = response.data.Created
          this.wallId = response.data.WallId
          this.isGenerating = false
          this.isComplete = true
        }).catch(error => {
          console.log(error)
          this.isGenerating = false
        })
    }
  },
  validations: {
    title: { required, maxLength: maxLength(50) },
    introMessage: { maxLength: maxLength(250) },
    latitude: { required, between: between(-90, 90) },
    longitude: { required, between: between(-180, 180) }
  }
}
</script>

<style lang="stylus">
  .create-panel
    border 1px solid #ccc
    .printer-icon
      margin-top -17px
      margin-bottom 5px
    .q-field
      width 100%
    .confirm-button
      width 200px
  .image-wrap
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
      border-radius 10px
    &:hover
      .overlay
        opacity 0.3
</style>
