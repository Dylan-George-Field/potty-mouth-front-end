<template>
  <q-page class="row justify-center buy">
    <div class="hero">
      <div class="hero-text">
        <h1>Buy 💵</h1>
        <h2>
          Get your own Potty
        </h2>
      </div>
      <div class="hero-image">
        <img src="statics/potty-mouth-flinders-street-bridge-feature-1800-760.jpg" alt="Potty Mouth Flinders St Bridge, Melbourne - Feature" />
      </div>
      <div class="row justify-center q-ma-lg">
        <div class="col-10">
          <div class="row">
            <div class="col-12 text-center">
              <h4>Printed and Delivered 🚚</h4>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-8">
              <p><strong>Postage Fee (Australia)</strong> - $1.10</p>
              <p><strong>Postage Fee (International)</strong> - $3.20</p>
              <p><strong>Handling Fee</strong> - $1.00</p>
              <p><strong>Printing Fee</strong> - $0.25/Potty</p>
              <p>Contact us on our feedback page with your name, quantity
                and postage address.
              </p>
              <p><q-btn to="/feedback" label="Buy Now" color="primary" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
  .buy
    .hero-image
      img
        height 100%
        width 100%
        object-fit cover
    .hero-text
      color white
      position absolute
      padding 10px
      margin-top 2%
      margin-left 11%
      width 43%
      text-shadow 0px 0px 7px #000, 1px 1px 4px #000000, 1px 1px 4px #000000
      transform rotate(-1deg)
      h1
        line-height 1.2
        font-size 7vw
        font-weight 600
        margin-bottom 0
      h2
        font-size 3vw
        line-height 1
        margin-bottom 5%
    .widget
      .emoji
        font-size 50px
      h5
        margin-bottom 10px
      p
        font-size 15px
        font-weight 300
        padding-left 10px
        text-align left
    .culture
      img
        width 100%
    .create-section
      p
        text-align center
    img
      margin 0 auto
    .q-btn
      width 200px
    .how-to
      img
        max-height 300px
      span
        font-size 2em
        color #26A69A
</style>

<script>
export default {
  name: 'Buy'
}
</script>
