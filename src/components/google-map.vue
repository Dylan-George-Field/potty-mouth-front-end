<template>
  <div id="map" v-bind:class="{ disabled: disable }"></div>
</template>

<script>
import maps from 'google-maps'

export default {
  name: 'google-map',
  props: ['latitude', 'longitude', 'maxDistance', 'disable'],
  data () {
    return {
      google: null,
      map: null,
      circle: null,
      marker: null,
      autocompleteService: null,
      search: ''
    }
  },
  watch: {
    maxDistance: function (val) {
      this.circle.setRadius(parseInt(val))
    },
    latitude: function (val) {
      var position = new this.google.maps.LatLng(this.latitude, this.longitude)
      this.marker.setPosition(position)
      this.map.panTo(position)
    },
    disable: function (val) {
      var self = this
      this.map.setOptions({
        disableDefaultUI: val,
        draggableCursor: val ? 'not-allowed' : 'crosshair',
        draggable: !val
      })
      this.circle.setOptions({ editable: !val })

      if (val) {
        this.google.maps.event.clearListeners(this.map, 'click')
        this.google.maps.event.clearListeners(this.map, 'dblclick')
      } else {
        this.google.maps.event.addListener(this.map, 'click', function (event) {
          self.marker.setPosition(event.latLng)
        })

        this.google.maps.event.addListener(this.map, 'dblclick', function (event) {
          self.map.setCenter(self.marker.getPosition())
          self.map.setZoom(self.map.getZoom() + 1)
        })
      }
    }
  },
  mounted () {
    var self = this

    maps.KEY = 'AIzaSyCY_WfDklwmFyq31lWApm_9jkdgSVVVbQI'
    maps.LIBRARIES = ['places']

    maps.load(function (google) {
      self.google = google
      var location = new google.maps.LatLng(self.latitude, self.longitude)

      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggableCursor: 'crosshair',
        disableDefaultUI: self.disable
      })

      self.marker = new google.maps.Marker({
        position: location,
        title: '0'
      })

      self.marker.setMap(self.map)

      self.circle = new google.maps.Circle({
        map: self.map,
        editable: true,
        draggable: true,
        fillColor: '#ffffff',
        fillOpacity: 0.3,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 1.5,
        radius: self.maxDistance
      })

      self.circle.bindTo('center', self.marker, 'position')

      // grey map fix
      google.maps.event.addListener(self.map, 'idle', function () {
        google.maps.event.trigger(self.map, 'resize')
      })

      // we'll set a max distance for now
      google.maps.event.addListener(self.circle, 'radius_changed', function () {
        if (self.circle.getRadius() <= 2000) {
          self.$emit('radius-changed', self.circle.getRadius())
        } else {
          self.circle.setRadius(2000)
        }
      })

      google.maps.event.addListener(self.marker, 'position_changed', function (evt) {
        self.$emit('latitude-changed', self.marker.position.lat())
        self.$emit('longitude-changed', self.marker.position.lng())
      })

      google.maps.event.addListener(self.map, 'click', function (event) {
        self.marker.setPosition(event.latLng)
      })

      google.maps.event.addListener(self.map, 'dblclick', function (event) {
        self.map.setCenter(self.marker.getPosition())
        self.map.setZoom(self.map.getZoom() + 1)
      })
      // marker top left fix for modal
      setTimeout(function () { self.map.setCenter(location) }, 1000)
    })
  }
}
</script>

<style lang="stylus">
  #map
    height 400px
    width 100%
  .disabled
    opacity 0.1
</style>
