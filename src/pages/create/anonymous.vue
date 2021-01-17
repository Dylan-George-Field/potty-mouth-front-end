<template>
  <q-page class="row justify-center tracked">
    <div class="col-10 text-center q-pa-lg">
        <qr-code-builder />
    </div>
  </q-page>
</template>

<script>
import qrCodeBuilder from '../../components/create/qrCodeBuilder'

export default {
  name: 'anonymous',
  components: { qrCodeBuilder }
}
</script>

<style>
</style>
