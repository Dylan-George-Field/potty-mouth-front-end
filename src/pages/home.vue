<template>
  <q-page class="home">
    <div class="hero">
      <div class="hero-text">
        <h1>
          Digital<br />
          Graffiti<br />
          Wall
        </h1>
        <h2>Write on the wall 🧱</h2>
        <h3>👈 Try it yourself</h3>
      </div>
      <div class="hero-image">
        <img src="statics/potty-mouth-flinders-st-station-feature-1800-760.jpg" alt="Potty Mouth on the Street - Feature Image" />
      </div>
    </div>
    <div class="widget row justify-around text-center q-mt-lg">
      <div class="q-pa-lg col-lg-4 col-sm-6 col-xs-12">
        <span class="emoji">🎨</span>
        <h5>Customize and print your own</h5>
        <p>
          We'll generate your unique Potty Mouths to put wherever you like. You can
          choose our design or create your own using only the QR code.
          It's quick, easy and you can make as many as you like!
        </p>
        <q-btn to="/create" label="Create your own" class="q-ma-lg" color="primary" />
      </div>
      <div class="q-pa-lg col-lg-4 col-sm-6 col-xs-12">
        <span class="emoji">🎓</span>
        <h5>What is Potty Mouth?</h5>
        <p>
          Potty Mouth is a secret digital graffiti wall.
          Think of it like writing on a table or toilet wall.
          Scan the QR code and you'll get temporary access
          to leave messages and photos for one minute only.
        </p>
        <q-btn to="/buy" label="Buy your own" class="q-ma-lg" color="primary" />
      </div>
    </div>
        <div class="widget text-center">
      <div class="row justify-center q-mt-lg">
        <div class="q-pa-lg col-lg-4 col-sm-6 col-xs-12">
          <span class="emoji">📱</span>
          <h4>No app</h4>
          <p>
            Nope, just a smartphone. iPhone has a QR code reader
            built into the camera. Just open the app, point the
            camera at the QR code and follow the link. For Samsung
            use Bixby and Google use Lens.
          </p>
        </div>
        <div class="q-pa-lg col-lg-4 col-sm-6 col-xs-12">
          <span class="emoji">⏲</span>
          <h4>Short access</h4>
          <p>
            To keep users physically located
            to the qr code we use temporary access, sessions and
            geolocation data to prevent users re-accessing the sticker
            content when you haven't scanned a sticker.
          </p>
        </div>
        <div class="q-pa-lg col-lg-4 col-sm-6 col-xs-12">
          <span class="emoji">🌍</span>
          <h4>Use anywhere</h4>
          <p>
            Stick one on the back of your laptop, on
            the bus seat or top of a mountain. All that's needed
            is an internet connection and your imagination.
          </p>
        </div>
      </div>
      <div class="row culture q-pa-xl">
        <div class="col-xs-12 col-sm-6">
          <img src="statics/potty-mouth-hoiser-lane-1613-1210.jpg" alt="Potty Mouth in Hoiser Lane - Melbourne" />
        </div>
        <div class="col-xs-12 col-sm-6 q-px-xl">
          <h4>Pot Culture</h4>
          <p>
            Potty Mouth is unique. Anyone can leave a message on it or read the contents.
            The topic is where you're standing.
            It's all about connecting with strangers.
            A potty can be in a popular place like a bus or hidden in a hard to reach
            place like under a table.
            Everywhere is different and every Potty has a different story.
            They aren't connected and they aren't accessible from the internet.
            Leave an anonymous message for the next stranger and have fun.
          </p>
        </div>
      </div>
      <div class="q-pa-lg create-section">
        <span class="emoji">👩‍🍳</span>
        <h3>Create your own</h3>
        <p>
          Follow the steps and pop-a-potty! Don't vandalise.
        </p>
        <div class="row justify-center how-to">
          <div class="col-lg-4 col-sm-6 col-xs-12">
              <p><span>Step 1</span>Create it</p>
              <img src="statics/learn/step1.png" alt="Create a QR Code" />
          </div>
          <div class="col-lg-4 col-sm-6 col-xs-12">
            <p><span>Step 2</span> Print it</p>
            <img src="statics/learn/step2.png" alt="Print it" />
          </div>
          <div class="col-lg-4 col-sm-6 col-xs-12">
            <p><span>Step 3</span> Pop it</p>
            <img src="statics/learn/step3.png" alt="Pop it" />
          </div>
        </div>
          <q-btn to="/create" label="Create a Potty!" class="q-ma-lg" color="primary" />
          <q-btn to="/buy" label="Buy a Potty!" class="q-ma-lg" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  meta: {
    title: 'Potty Mouth - Speak like no one\'s listening'
  }
}
</script>

<style lang="stylus">
  .home
    .hero-image
      img
        height 100%
        width 100%
        object-fit cover
    .hero-text
      color white
      padding 10px
      position absolute
      margin-top -2%
      left 43%
      width 55%
      text-shadow 0px 0px 7px #000, 1px 1px 4px #000000, 1px 1px 4px #000000
      transform rotate(-1deg)
      h1
        line-height 0.8
        font-size 7vw
        font-weight 600
        margin-bottom 0
      h2
        font-size 3vw
        font-weight 400
        line-height 1
        margin-top 1%
        margin-bottom 1%
      h3
        border-top 1px solid white
        font-size 2vw
        font-weight 300
        line-height 1
        width 45%
        margin-top 1%
        padding-top 1%
    .widget
      .emoji
        font-size 50px
    .culture
      img
        width 100%
    .how-to
      img
        max-height 300px
      span
        font-size 2em
        color #26A69A
      h5
        margin-bottom 10px
      p
        font-size 15px
        font-weight 300
        padding-left 10px
        text-align left
    .q-btn
      width 200px
</style>
