<template>
  <q-page padding class="under-construction">
    <div class="absolute-center text-center">
      <div class="message">
        <p>Hold on</p>
        <p class="emoji">
          👷‍♀️
        </p>
        <p>The page is being built</p>
      </div>
      <div class="navigation q-mt-xl">
          <q-btn to="/" label="Go Home" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UnderConstruction'
}
</script>

<style lang="stylus">
  .under-construction
    .message
      font-size 20px
      .emoji
        font-size 70px
    .q-btn
      width 200px
</style>
