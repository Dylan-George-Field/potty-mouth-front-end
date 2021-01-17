<template>
  <q-layout view="lHh Lpr lFf" class="default-template">
    <q-header>
      <q-toolbar color="primary">
        <q-btn flat dense @click="drawer = !drawer" aria-label="Menu" class="q-mr-sm">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="page-title">
          <div class="row no-wrap justify-center">
            <div>
              {{ title }}
            </div>
            <div class="right">
            </div>
          </div>
        </q-toolbar-title>
        <div>
          <q-btn disabled v-if="!authenticated" flat dense icon="account_box" @click="login" />
          <q-btn v-else flat dense @click="login">
            <img :src="avatar" />
          </q-btn>
         </div>
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
        <q-item clickable v-ripple to="/learn">
          <q-item-section class="emoji">🎓</q-item-section>
          <q-item-section>Learn</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/feedback">
          <q-item-section class="emoji">📮</q-item-section>
          <q-item-section>Feedback</q-item-section>
        </q-item>
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
    <q-page-container>
      <router-view />
    </q-page-container>

    <template>
      <q-dialog v-model="loginModal" ok="Cancel">
        <span slot="title">Login</span>
        <div slot="body">
          <facebook-login />
        </div>
      </q-dialog>
    </template>

  </q-layout>
</template>

<script>
import facebookLogin from '../components/facebook-login.vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      drawer: this.$q.platform.is.desktop,
      customDialogModal: false,
      loginModal: false,
      title: ''
    }
  },
  components: {
    facebookLogin
  },
  computed: {
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
    }
  },
  created () {
    this.title = this.$route.meta.title
  },
  updated () {
    this.title = this.$route.meta.title
  },
  methods: {
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
    login () {
      this.loginModal = true
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
    .q-drawer
      .emoji
        font-size 25px
  .q-dialog
    .q-card
      padding: 20px
      img
        width: 100%
</style>
