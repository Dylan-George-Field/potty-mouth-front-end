<template>
  <div>
    <p>You need to allow popups</p>
    <q-btn v-if="!isAuthenticatedToAzure" label="Login with Facebook" :loading="isLoggingIn" color="primary" @click="login" />
    <q-btn v-else label="Log out" color="primary" :loading="isLoggingOut" @click="logout" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'facebook-login',
  data () {
    return {
      isLoggingIn: false,
      isLoggingOut: false,
      loginStatus: {},
      azureAccessToken: '',
      facebookUserId: '',
      facebookAccessToken: '',
      facebookDisplayName: '',
      isAuthenticatedToFacebook: false,
      isAuthenticatedToAzure: false
    }
  },
  created () {
    this.initFacebook()
    this.loadFacebookSDK()
  },
  watch: {
    loginStatus: function (response) {
      this.updateFacebookVariables(response)
    },
    isAuthenticatedToFacebook: function (isAuthenticated) {
      if (isAuthenticated === true) {
        this.presentFacebookTokenToAzure(this.facebookAccessToken)
      } else {
        console.log('You need to login to Facebook')
      }
    },
    isAuthenticatedToAzure: function (isAuthenticated) {
      if (isAuthenticated === true) {
        console.log('isAuthenticatedToAzure')
        console.log(this.loginStatus)
        this.$store.dispatch('wall/login', this.loginStatus)
      }
    }
  },
  methods: {
    updateFacebookVariables(response) {
      if (response.status === 'connected') {
        this.isAuthenticatedToFacebook = true
        this.facebookUserId = response.authResponse.userID
        this.facebookAccessToken = response.authResponse.accessToken
      } else {
        this.clearFacebookVariables()
      }
    },
    updateFacebookLoginStatus () {
      var self = this
      FB.getLoginStatus((response) => {
        console.log(response)
        self.loginStatus = response
      })
    },
    presentFacebookTokenToAzure (token) {
      var header = { 'access_token': token }
      console.log('Getting access token from .auth/login/facebook')
      axios.post(process.env.API_URL + '/.auth/login/facebook', header)
        .then(response => {
          this.azureAccessToken = response.data.authenticationToken
          this.$store.dispatch('wall/token', this.azureAccessToken)
          this.isAuthenticatedToAzure = true
          this.isLoggingIn = false
          console.log(this.azureAccessToken)
        }).catch(error => {
          console.log(error)
        })
    },
    login () {
      var self = this
      self.isLoggingIn = true
      console.log('Check Facebook login status')
      this.updateFacebookLoginStatus() // causes race condition
      setTimeout(function() {
        if (this.isAuthenticatedToFacebook) {
          console.log('Already connected to Facebook')
        } else {
          console.log('logging into Facebook')
          FB.login(response => {
            self.loginStatus = response
            console.log(response)
            self.setDisplayName()
          })
        }
      }, 100);
    },
    logout () {
      this.isLoggingOut = true
      this.updateFacebookLoginStatus()
      this.logoutOfAzure()
      this.logoutOfFacebook()
      this.isLoggingOut = false
    },
    logoutOfAzure() {
      var header = { 'access_token': this.azureAccessToken }
      console.log('Logging out .auth/logout')
      axios.post(process.env.API_URL + '/.auth/logout', header)
        .then(response => {
          console.log(response)
          this.isAuthenticatedToAzure = false
          this.$store.dispatch('wall/clearToken')
        }).catch(error => {
          console.log(error)
        })
    },
    logoutOfFacebook() {
       if (this.isAuthenticatedToFacebook) {
        FB.logout(response => {
          console.log('logged out of facebook')
          console.log(response)
          this.loginStatus = response
          this.$store.dispatch('wall/logout', response)
          this.isAuthenticatedToFacebook = false
        })
      } else {
        console.log('You\'re not logged into Facebook!')
      }
    },
    setDisplayName () {
      var self = this
      FB.api('/me', {fields: 'first_name'}, function (response) {
        console.log(response.first_name)
        this.facebookDisplayName = response.first_name
      })
    },
    clearFacebookVariables() {
      this.facebookUserId = ''
      this.facebookAccessToken = ''
      this.facebookDisplayName = ''
      this.isAuthenticatedToFacebook = false
    },
    initFacebook () {
      var self = this
      window.fbAsyncInit = function () {
        FB.init({
          appId            : '441766669597633',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.0'
        })
        //Run after SDK has loaded
        self.updateFacebookLoginStatus()
      }
    },
    loadFacebookSDK () {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      } (document, 'script', 'facebook-jssdk'))
    }
  }
}
</script>

<style>
</style>
