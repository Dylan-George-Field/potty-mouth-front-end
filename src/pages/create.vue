<template>
  <q-page class="create">
    <div class="row text-center">
      <div class="col-12 q-mt-xl">
        <img :src="image" alt="Example" />
        <div>
          <q-btn label="download" :loading="loading" @click="download" id="download-btn" class="q-ma-lg" color="primary" />
          <a ref="download" :href="image" download="tryscanme.jpg"></a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Create',
  meta: {
    title: 'Create - Potty Mouth'
  },
  data () {
    return {
      image: 'statics/example.png',
      loading: false
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    getImage () {
      this.loading = true
      axios.get(process.env.API_URL + '/api/generate/image', { params: { logo: this.hasLogo }, responseType: 'blob' })
        .then(response => {
          this.image = URL.createObjectURL(response.data)
        }).then(() => {
          this.loading = false
        })
    },
    download () {
      this.$refs.download.click()
    }
  }
}
</script>

<style lang="stylus">
  .create
    img
      min-width 150px
      width 13%
    button
      width 200px
</style>
