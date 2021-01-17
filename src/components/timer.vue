<template>
  <div class="text-subtitle2 timer">
    <div class="float-right">
      {{ time | prettify }} to
    </div>
    <div class="subheading">
      re-scan
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: ['minutes', 'starter'],
  data () {
    return {
      show: false,
      started: this.starter,
      timer: null,
      timeRemaining: 0
    }
  },
  filters: {
    prettify: function (value) {
      let data = value.split(':')
      let minutes = data[0]
      let seconds = data[1]

      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds
    }
  },
  watch: {
    started: function (val) {
      if (val === true) {
        this.start()
      }
    }
  },
  computed: {
    time () {
      let time = this.timeRemaining / 60
      let minutes = parseInt(time)
      let seconds = Math.round((time - minutes) * 60)
      return minutes + ':' + seconds
    }
  },
  created () {
    if (this.started) {
      this.start()
    }
  },
  methods: {
    start () {
      this.timeRemaining = this.minutes * 60
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining--
          } else {
            clearInterval(this.timer)
            this.$emit('wallTimerExpired')
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus">
  .timer
    line-height: 1
    .subheading
      clear: both
</style>
