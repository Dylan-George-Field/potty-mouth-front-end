<template>
  <div class="google-autocomplete">
    <q-input float-label="Search" placeholder="Melbourne State Library, Casa Tropicana" v-model="terms" :disable="disable" :before="[{icon: 'pin drop', handler () {}}]">
      <q-autocomplete
        @show="disable"
        @search="search"
        :min-characters="3"
        @selected="selected"
      />
    </q-input>
  </div>
</template>

<script>
import maps from 'google-maps'

export default {
  name: 'google-autocomplete',
  props: ['disable'],
  data () {
    return {
      terms: '',
      autocomplete: null,
      geocoder: null
    }
  },
  mounted () {
    var self = this
    maps.KEY = '{{google-key}}'
    maps.LIBRARIES = ['places']

    maps.load(function (google) {
      self.autocompleteService = new google.maps.places.AutocompleteService()
      self.geocoder = new google.maps.Geocoder()
    })
  },
  methods: {
    search (terms, done) {
      this.autocompleteService.getQueryPredictions({ input: terms }, function (predictions, status) {
        var result = predictions.map((v) => ({ label: v.description, place_id: v.place_id }))
        done(result)
      })
    },
    selected (item) {
      var self = this
      this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
        self.$emit('latitude-changed', results[0].geometry.location.lat())
        self.$emit('longitude-changed', results[0].geometry.location.lng())
      })
    }
  }
}
</script>

<style lang="stylus">
  .google-autocomplete
    width 100%
</style>
