<template>
  <div>
    <div class="tracked-or-anon">
      <p>I'd like my wall to be</p>
      <q-btn label="Anonymous" color="red" to="/create/anonymous" />
      <span class="q-pa-sm">or</span>
      <q-btn label="Tracked" color="red" to="/create/tracked" />
    </div>
    <div class="row q-pa-md justify-center">
      <q-btn label="What's the difference?" size="sm" @click="opened = true"/>
    </div>
    <div v-show="opened">
      <div class="q-ma-lg text-left">
        <h3 class="text-center">What's the difference?</h3>
        <p class="text-center"><strong>Tracked</strong></p>
        <ul>
          <li>You're in-charge</li>
          <li>You can regenerate it if it's lost or delete it</li>
          <li>Requires login and gives you more settings to run your wall(s)</li>
        </ul>
        <p class="text-center"><strong>Anonymous</strong></p>
        <ul>
          <li>You have no control</li>
          <li>You have the same access as everyone else</li>
          <li>Once the wall is created you can only read/post like everyone else</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tracked-or-anon',
  data () {
    return {
      opened: false
    }
  }
}
</script>

<style lang="stylus">
  .create
    .tracked-or-anon
      button
        line-height 5
</style>
