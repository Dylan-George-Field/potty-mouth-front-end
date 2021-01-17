<template>
  <q-page class="wall">
     <template v-if="error">
        <div class="error absolute-center">
          <p>Hmm</p>
          <p class="emoji">🤔</p>
          <p>{{errorMessage}}</p>
        </div>
      </template>
      <template v-else>
        <q-list v-if="posts && posts.length" inset-separator no-border multiline>
          <q-item v-for="(post, index) in posts" :key='index' :id="index === posts.length - 1 ? 'last-message' : ''">
            <q-item-section avatar top>
              <avatar :nameId="post.NameId" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                {{post.Username}}
              </q-item-label>
              <q-item-label caption v-if="post.Text">
                {{post.Text}}
              </q-item-label>
              <q-item-label caption v-if="post.ImageUri">
                <img :src="post.ImageUri" />
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                {{post.FriendlyTime}}
              </q-item-label>
              <q-item-label caption>
                {{new Date(post.Timestamp).toLocaleDateString()}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </template>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<script>
import axios from 'axios'
import avatar from '../../components/avatar.vue'

export default {
  name: 'Wall',
  components: { avatar },
  data () {
    return {
      error: false,
      errorMessage: '',
      loading: false,
      isGeolocated: null,
      isWithinDistance: null,
      latitude: 0,
      longitude: 0,
      title: 'Untitled Wall'
    }
  },
  meta () {
    return {
      title: this.title
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.wall.authenticated
    },
    easyAuthToken () {
      return this.$store.state.wall.token
    },
    posts: {
      get () {
        return this.$store.state.wall.posts
      },
      set (val) {
        this.$store.dispatch('wall/update', val)
      }
    }
  },
  created () {
    this.$store.dispatch('wall/title', '')
    this.posts = []
    this.loading = true
    /*
    axios.get(process.env.API_URL + '/api/' + this.$route.params.id + '/IsGeolocated', { headers: this.getAuthHeaders() })
      .then(response => {
        this.isGeolocated = response.data.IsGeolocated
      }).catch(() => {
        this.error = true
        this.errorMessage = "There's a problem getting the geolocation status"
      })
    */
    this.retrieveWall()
  },
  watch: {
    isGeolocated: function (val) {
      if (val) {
        this.updateCoords()
      } else {
        this.retrieveWall()
      }
    },
    longitude: function () {
      this.checkDistance()
    },
    isWithinDistance: function (val) {
      if (val) {
        this.retrieveWall()
      } else {
        this.error = true
        this.errorMessage = 'You\'re outside the geolocation for this QR code'
      }
    }
  },
  methods: {
    updateCoords () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude
        })
      } else {
        this.error = true
        this.errorMessage = 'This wall is geo-locked. You must enable location-services to access it'
      }
    },
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
    checkDistance () {
      axios.get(process.env.API_URL + '/api/' + this.$route.params.id + '/IsWithinDistance?latitude=' + this.latitude + '&longitude=' + this.longitude,
        { headers: this.getAuthHeaders() })
        .then(response => {
          if (response.data.IsAdmin || response.data.IsGeolocated === false) {
            this.isWithinDistance = true
          } else {
            this.isWithinDistance = response.data.IsWithinDistance
          }
        })
    },
    retrieveWall () {
      // Todo, You can retrieve the wall regardless of your geolocation.
      this.loading = true
      axios.get(process.env.API_URL + '/api/wall/' + this.$route.params.id, { headers: this.getAuthHeaders() })
        .then(response => {
          this.posts = response.data.Messages
          this.$store.dispatch('wall/title', response.data.Title)
          this.title = response.data.Title
          this.loading = false
          this.error = false
          this.$emit('wallDownloadComplete')
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.errorMessage = 'Your session expired. Re-scan the QR code to view the wall'
          } else if (error.response.status === 404) {
            this.$router.replace('notfound')
          } else {
            this.errorMessage = 'There was an unknown problem'
          }
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

<style lang="stylus">
  .q-toolbar-title a
    color white
  .wall
    .footer
      width 100%
    .chatbox
      width: 100%
    .q-item__label
      img
        max-height 250px
        max-width 50vw
    .q-item-main
      line-height 1.4
    .q-item__section--avatar
      margin-top: -5px
    .q-item-side-right
      font-size 0.8em
    .q-item-side-left
      width 50px
    .q-item-sublabel
      word-wrap break-word
    .error
      text-align: center
      font-size: 20px
      .emoji
        font-size: 70px
</style>
