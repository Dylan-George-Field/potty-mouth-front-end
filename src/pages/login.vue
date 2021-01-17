<template>
  <q-page class="row justify-center create">
    <div class="width-1of3 offset-2of3 text-center">
      <h1 class="q-mb-sm">Login 🔑</h1>
      <h5 v-if="isTrackedPage" class="q-mb-lg">You need to login to create tracked codes</h5>
      <h5 v-else class="q-mb-lg">Gain access to more features</h5>
      <div>
        <q-spinner v-if="isRedirecting" size="50px" />
        <facebook-login v-else />
      </div>
    </div>
  </q-page>
</template>

<script>
import facebookLogin from '../components/facebook-login'

export default {
  name: 'Login',
  components: { facebookLogin },
  data () {
    return {
      isTrackedPage: false,
      isRedirecting: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.wall.authenticated
    }
  },
  watch: {
    isAuthenticated () {
      if (this.isAuthenticated && this.isTrackedPage) {
        this.ToTrackedPage()
      }
    }
  },
  methods: {
    ToTrackedPage () {
      var self = this
      this.isRedirecting = true
      setTimeout(function () {
        self.isRedirecting = false
        self.$router.push('create/tracked')
      }, 2000)
    }
  },
  created () {
    this.isTrackedPage = this.$route.query.tracked
  },
  beforeRouteUpdate (to, from, next) {
    this.isTrackedPage = to.query.tracked
    next()
  }
}
</script>

<style>
</style>
