<template>
  <q-layout view="lHh LPr lFf" class="default-template">
    <q-header>
      <q-toolbar color="primary">
        <q-btn flat dense @click="drawer = !drawer" aria-label="Menu" class="q-mr-sm">
          <q-icon name="menu" />
        </q-btn>
        <q-separator v-if="isWall" dark vertical inset />

        <q-toolbar-title class="page-title">
          <div class="row no-wrap" :class="{'justify-between' : isWall === true, 'justify-center' : isWall === false}">
            <div v-if="isWall === true" :class="{'col-8' : isWall === true}">
              {{ title }}
            </div>
            <div v-else>
              <router-link to='/'>
                <img src="statics/potty-mouth.svg" class="home-logo" />
              </router-link>
            </div>
            <div class="right">
              <timer minutes="3" v-bind:starter="wallLoaded" v-if="isWall && wallLoaded" v-on:wallTimerExpired="showExpiredPage" />
            </div>
          </div>
        </q-toolbar-title>
        <q-separator v-if="isWall" dark vertical inset />
        <q-btn disabled v-if="!authenticated" flat dense icon="account_box" @click="login" class="q-ml-sm" />
        <q-btn v-else flat dense @click="login">
          <img :src="avatar" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer"
      :width="200"
      :breakpoint="500"
      show-if-above
      bordered
    >
      <q-list>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section class="emoji">🏡</q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/create">
          <q-item-section class="emoji">👩‍🍳</q-item-section>
          <q-item-section>Create</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/buy">
          <q-item-section class="emoji">💵</q-item-section>
          <q-item-section>Buy</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/feedback">
          <q-item-section class="emoji">📮</q-item-section>
          <q-item-section>Feedback</q-item-section>
        </q-item>
        <div class="absolute-bottom">
          <q-item clickable v-ripple to="/privacy">
            <q-item-section class="emoji">🤫</q-item-section>
            <q-item-section>Privacy</q-item-section>
          </q-item>
        </div>
        <!--
        <q-item v-if="authenticated"  @click.native="login" class="absolute-bottom">
          <q-item-section>👋</q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
        <q-item v-else to="/login" class="absolute-bottom">
          <q-item-section>🔑</q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
        -->
      </q-list>
    </q-drawer>

    <q-page-container id="page">
      <router-view @wallDownloadComplete="wallDownloadComplete" />
    </q-page-container>

    <template>
      <q-dialog v-model="customDialogModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Upload Photo</div>
        </q-card-section>

        <q-card-section>
          <img class="preview" :src="imageData" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK" @click="sendImage" :loading="uploadingImage" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </template>

    <template>
      <q-dialog v-model="loginModal" ok="Cancel">
        <span slot="title">Login</span>
        <div slot="body">
          <facebook-login />
        </div>
      </q-dialog>
    </template>

    <template v-if="isWall">
      <q-footer class="fixed-bottom-left footer">
          <q-toolbar class="row">
            <input type="file" @change="previewImage" name="image" accept="image/*" ref="uploadFile" class="upload-file">
            <q-btn flat @click="uploadPhoto" aria-label="Menu" class="q-mr-sm">
                <q-icon name="camera_alt" />
            </q-btn>
            <q-input
              bg-color="white"
              borderless
              type="text"
              @keyup.enter="sendMessage"
              v-model="message"
              placeholder="Say something..."
              class="full-width"
              :loading="loading"
            />
            <q-btn flat @click="sendMessage" class="q-ml-sm">
              <q-icon name="send" />
            </q-btn>
          </q-toolbar>
      </q-footer>
    </template>
  </q-layout>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import { openURL, scroll } from 'quasar'
import facebookLogin from '../components/facebook-login.vue'
import timer from '../components/timer'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'LayoutDefault',
  data () {
    return {
      drawer: this.$q.platform.is.desktop,
      message: '',
      loading: false,
      imageData: '',
      customDialogModal: false,
      loginModal: false,
      wallLoaded: false,
      uploadingImage: false,
      files: []
    }
  },
  components: {
    facebookLogin,
    timer
  },
  computed: {
    isWall () {
      return this.$route.path.indexOf('wall') >= 0 &&
              this.$route.path.indexOf('/wall/expired') === -1 &&
              this.$route.path.indexOf('/wall/notfound') === -1
    },
    authenticated () {
      return this.$store.state.wall.authenticated
    },
    avatar () {
      return this.$store.state.wall.avatar
    },
    username () {
      return this.$store.state.wall.username
    },
    easyAuthToken () {
      return this.$store.state.wall.token
    },
    title: {
      get () {
        return this.$store.state.wall.title
      },
      set (val) {
        this.$store.dispatch('wall/title', val)
      }
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
  beforeUpdate () {
    if (!this.isWall) {
      this.title = this.$route.meta.title
    }
  },
  validations: {
    message: { required }
  },
  methods: {
    openURL,
    uploadPhoto () {
      this.$refs.uploadFile.click()
    },
    previewImage (event) {
      var input = event.target
      this.files = this.$refs.uploadFile.files
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
      this.customDialogModal = true
    },
    getAuthHeaders () {
      var auth = {}
      if (this.authenticated) {
        auth = {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-ZUMO-AUTH': this.easyAuthToken
          }
        }
      }
      return auth
    },
    sendMessage () {
      if (this.$v.message.$invalid) {
        this.$q.notify({
          message: 'You need to write a message',
          position: 'bottom',
          timeout: 1000
        })
      } else {
        this.loading = true

        axios.post(process.env.API_URL + '/api/wall/' + this.$route.params.id,
          this.message, this.getAuthHeaders()
        ).then(response => {
          this.posts = response.data.Messages
          this.clearMessage()
          this.loading = false
          this.scrollToLastMessage()
        }).catch(() => {
          this.loading = false
          this.postErrorNotification()
        })
      }
    },
    login () {
      this.loginModal = true
    },
    sendImage () {
      this.uploadingImage = true
      var form = new FormData()
      form.append('image', this.files[0])
      axios.post(process.env.API_URL + '/api/image/' + this.$route.params.id,
        form, this.getAuthHeaders()
      ).then(response => {
        this.posts = response.data.Messages
        this.customDialogModal = false
        this.uploadingImage = false
        setTimeout(
          this.scrollToLastMessage(),
          100
        )
      }).catch(() => {
        this.postErrorNotification()
        this.uploadingImage = false
      })
    },
    clearMessage () {
      this.message = ''
    },
    wallDownloadComplete () {
      this.wallLoaded = true
      setTimeout(
        this.scrollToLastMessage()
        , 1000
      )
    },
    postErrorNotification () {
      this.$q.notify({
        type: 'negative',
        timeout: 2000,
        color: 'secondary',
        message: 'Opps! There was a problem. Try again later',
        icon: 'report_problem',
        position: 'top'
      })
    },
    showExpiredPage () {
      this.$router.replace('expired')
    },
    scrollToLastMessage () {
      if (this.posts.length > 6) {
        const ele = document.getElementById('page')
        const target = getScrollTarget(ele)
        const duration = 50
        setScrollPosition(target, 99999, duration)
      }
    }
  }
}
</script>

<style lang="stylus">
  .default-template
    .q-drawer-container
      .q-layout-drawer-left
        .q-list-header
          font-size 18px
          .q-icon
            font-size 32px
        .create-subnavigation
          padding-left 30px
        .q-item-side-left
          font-size 24px
    .q-toolbar
      .timer
          margin-top: 1px
      .q-toolbar-title
        a
          color white
          text-decoration none
        &.text-right
          font-weight 300
          font-size 15px
        &.page-title
          text-align center
          font-weight 400
      img
        width 33px
        border-radius 3px
      img
        &.home-logo
          margin-top 5px
          width 59px
    .q-drawer
      .emoji
        font-size 25px
    .wall
      padding-top 10px
    .q-footer
      .q-toolbar
        .q-field__control
          height 40px
          .q-field__append
            margin-top -8px
            margin-right 10px
        input
          padding-left 10px
    .upload-file
      width 0.1px
      height 0.1px
      opacity 0
      overflow hidden
      position absolute
      z-index -1
  .q-dialog
    .q-card
      padding: 20px
      img
        width: 100%
</style>
