<template>
  <q-page padding class="four-oh-four">
    <div class="absolute-center text-center">
      <div class="message">
        <p>404</p>
        <p class="emoji">
          👻
        </p>
        <p>There's nothing here...</p>
      </div>
      <div class="navigation q-mt-xl">
          <q-btn to="/" label="Go Home" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style lang="stylus">
  .four-oh-four
    .message
      font-size 20px
      .emoji
        font-size 70px
    button
      width 200px
</style>
