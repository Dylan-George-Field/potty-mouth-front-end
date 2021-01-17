<template>
  <q-page padding class="notfound">
    <div class="absolute-center text-center">
      <div class="message">
        <p>Hmm</p>
        <p class="emoji">
          🤔
        </p>
        <p>The wall you scanned doesn't exist</p>
      </div>
      <div class="navigation q-mt-xl">
          <q-btn to="/" label="Go Home" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="stylus">
  .notfound
    .message
      font-size 20px
      .emoji
        font-size 70px
    .q-btn
      width 200px
</style>
