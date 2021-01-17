<template>
  <q-page class="dashboard q-pa-md">
    <div v-if="!hasWalls && !hasError && loading === false">
      <p>You don't have any walls!</p>
    </div>
    <div v-else-if="hasWalls && loading === false">
      <div class="row">
        <div class="col-4">
           <q-btn flat color="primary" :disabled="true" class="q-ma-sm">
            <q-icon name="list" /> List
          </q-btn>
        </div>
        <div class="col-4 offset-4">
          <router-link to='/create/tracked'>
          <q-btn flat color="primary" class="q-ma-sm float-right">
            <q-icon name="add" /> Create
          </q-btn>
          </router-link>
        </div>
      </div>
      <div class="row justify-center">
        <div v-for="(wall, index) in walls" :key='index'>
          <dashboard-card :wall="wall" :latitude="latitude" :longitude="longitude" />
        </div>
      </div>
    </div>
    <div v-else-if="hasError">
      {{ errorMessage }}
    </div>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<script>
import axios from 'axios'
import dashboardCard from '../components/dashboardCard.vue'

export default {
  name: 'Dashboard',
  components: { dashboardCard },
  data () {
    return {
      walls: [],
      hasWalls: false,
      hasError: false,
      loading: false,
      latitude: 0,
      longitude: 0,
      distance: 0,
      hasCoords: false,
      errorMessage: ''
    }
  },
  watch: {
    walls: function (val) {
      this.hasWalls = val.length > 0
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.wall.authenticated
    },
    easyAuthToken () {
      return this.$store.state.wall.token
    }
  },
  created () {
    this.updateCoords()
    this.loading = true
    axios.get(process.env.API_URL + '/api/dashboard', { headers: this.getAuthHeaders() })
      .then(response => {
        this.walls = response.data
        this.loading = false
      })
      .catch(error => {
        console.log(error)
        this.hasError = true
        this.loading = false
        if (error.response.status === 403) {
          this.errorMessage = 'You do not have permission to view this page. Try logging in.'
        } else {
          this.errorMessage = 'There was an unknown error'
        }
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
    },
    updateCoords () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude
        })
      } else {
        this.latitude = 0
        this.longitude = 0
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
