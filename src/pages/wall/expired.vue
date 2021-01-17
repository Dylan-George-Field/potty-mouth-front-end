<template>
  <q-page padding class="expired">
    <div class="absolute-center text-center">
      <div class="message">
        <p>You're locked out</p>
        <p class="emoji">
          😭
        </p>
        <p>Go back and re-scan the QR code</p>
      </div>
      <div class="navigation q-mt-xl">
          <q-btn to="/" label="Go Home" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Expired'
}
</script>

<style lang="stylus">
  .expired
    .message
      font-size 20px
      .emoji
        font-size 70px
    .q-btn
      width 200px
</style>
