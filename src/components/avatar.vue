<template>
  <img v-if="nameId" :src="image" class="avatar" />
  <img v-else src="statics/greeting.png" class="avatar" />
</template>

<script>
import axios from 'axios'

export default {
  name: 'Avatar',
  props: ['nameId'],
  data () {
    return {
      image: ''
    }
  },
  created () {
    var self = this
    if (!this.nameId) return
    var url = 'https://graph.facebook.com/v3.0/' + this.nameId + '/picture?type=normal'
    axios.get(url, { responseType: 'blob' })
      .then(response => {
        var reader = new FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = function () {
          self.image = reader.result
        }
      })
  }
}
</script>

<style lang="stylus">
  img.avatar
    border-radius 3px
    box-shadow none
    width 48px
  .anon-avatar
    font-size 30px
</style>
