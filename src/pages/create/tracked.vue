<template>
  <q-page class="row justify-center tracked">
    <div class="col-11 text-center q-pa-lg">
        <qr-code-builder tracked="true" />
    </div>
  </q-page>
</template>

<script>
import store from '../../store/index.js'
import qrCodeBuilder from '../../components/create/qrCodeBuilder'

export default {
  name: 'Tracked',
  components: { qrCodeBuilder },
  beforeRouteEnter (to, from, next) {
    if (store.state.wall.authenticated) {
      console.log('authenticated!')
      next()
    } else {
      next({ path: '/login', query: { tracked: true } })
    }
  }
}
</script>

<style>
</style>
