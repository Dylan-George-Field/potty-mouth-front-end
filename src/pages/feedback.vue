<template>
  <q-page class="row justify-center feeback">
    <div class="hero">
      <div class="hero-text">
        <h1>Feedback 📮</h1>
        <h2>Tell us what you think ❤</h2>
      </div>
      <div class="hero-image">
        <img src="statics/potty-mouth-feature-south-melbourne-market-2-1800-760.jpg" alt="Potty Mouth in the bathroom - Feature Image" />
      </div>
    </div>
    <div class="col-xs-12 col-sm-8 col-md-6 text-center">
      <div class="q-pa-md">
        <q-rating size="32px" color="secondary" v-model="rating" :max="5" class="q-ma-sm" />
        <q-input bottom-slots v-model="email" label="📧 Your email" maxlength="50" class="q-ma-sm" />
        <q-input
          autogrow
          :clearable="clearable"
          v-model.trim="message"
          type="textarea"
          label="📝 Message"
          class="q-ma-sm"
          @blur="$v.message.$touch"
          :loading="loading"
          placeholder="Hello Potty-heads"
        />
        <q-btn @click="send" @keyup.enter="send" :disabled="this.$v.message.$invalid" class="q-ma-lg" color="primary">
          Send
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Feedback',
  data () {
    return {
      clearable: true,
      email: '',
      rating: 3,
      message: '',
      loading: false,
      httpError: false
    }
  },
  validations: {
    message: {
      required
    }
  },
  methods: {
    send () {
      var self = this
      self.$v.$touch()
      if (!self.hasValidationError()) {
        self.loading = true
        self.clearable = false
        axios.post(process.env.API_URL + '/api/feedback', {
          email: this.email,
          message: this.message,
          rating: this.rating
        }
        ).then(response => {
          self.clearMessage()
          self.showClearable()
          self.$q.notify({
            type: 'positive',
            timeout: 2000,
            color: 'secondary',
            message: 'Your feedback was sent and is appreciated!',
            icon: 'tag_faces',
            position: 'top'
          })
        }).catch(function () {
          self.showClearable()
          self.httpError = true
        })
      }
    },
    showClearable () {
      this.loading = false
      this.clearable = true
    },
    clearMessage () {
      this.message = ''
    },
    hasValidationError () {
      return this.$v.message.$error
    }
  }
}
</script>

<style lang="stylus">
  .feeback
    button
      width 200px
    .hero-image
      img
        height 100%
        width 100%
        object-fit cover
    .hero-text
      color white
      position absolute
      padding 10px
      margin-top 2%
      margin-left 4%
      width 65%
      text-shadow 0px 0px 7px #000, 1px 1px 4px #000000, 1px 1px 4px #000000
      transform rotate(-1deg)
      h1
        line-height 1.2
        font-size 7vw
        font-weight 600
        margin-bottom 0
      h2
        font-size 3vw
        line-height 1
        margin-bottom 5%
</style>
