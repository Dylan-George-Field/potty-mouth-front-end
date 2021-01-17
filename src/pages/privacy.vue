<template>
  <q-page class="row justify-center privacy">
    <div class="hero">
      <div class="hero-text">
        <h1>Privacy 🤫</h1>
        <h2>You're anonymous</h2>
      </div>
      <div class="hero-image">
        <img src="statics/potty-mouth-flinders-street-bridge-feature-1800-760.jpg" alt="Potty Mouth Flinders St Bridge, Melbourne - Feature" />
      </div>
    </div>
    <div class="widget text-center">
      <div class="row justify-center q-mt-lg">
        <div class="q-pa-lg col-6">
          <h4>The Basics</h4>
          <p>
            Potty Mouth protects your data. We have to under the Australian Privacy Act 1988. You are considered
            anonymous to us and we will never allow you to be identified. The exception is personal data submitted
            on our public walls.
          </p>
          <p>
            Potty Mouth moderates all posts. It is a public service that relies on content made by users.
            We cant control if someone posts your personal information. However, we will delete it
            as soon as possible.
          </p>
          <p>
            Potty Mouth doesn't know if consent is given for photos. We won't remove pictures of people
            unless they break the law, are reported to us or you have requested to have your photo
            searched and removed from our databases.
          </p>
          <h4>Information Sharing</h4>
          <p>
            All posts are considered public. We share these messages on other platforms for fun and entertainment.
            This includes the content and date of the post. No other information will be shared to other platforms.
          </p>
          <p>
            Posts are to be shared with: <br />
            - Facebook
          </p>
          <h4>Metadata</h4>
          <p>
            Potty Mouth collects metadata to improve our service. This includes and is not limited to:
            IP address, device operating system, browser, screen size, pages you visited and how long for.
          </p>
          <p>
            Potty Mouth will remove photo metadata (EXIF). This includes and is not limited to the:
            time, location and camera the photo was taken on.
          </p>
          <h4>Security of your data</h4>
          <p>
            Potty Mouth stores data in Australia on a modern cloud platform with the latest security controls.
            We use HTTPS encryption for data transmission. Public posts maybe stored on edge
            'Content Delivery Network' servers to provide a faster and more reliable service.
            These servers are generally within Australia and may be stored overseas.
          </p>
          <h4>Accessing your data</h4>
          <p>Potty Mouth will give you access to all information stored about you. We don't keep much.
            If we do, it can be updated and deleted.
          <p>
          <h4>Request Data to be Removed</h4>
          <p>
            You can request us to search for your personal data and delete it from all posts.
            This, ironically, requires you to give us your personal information to search our databases.
          </p>
          <p>
            We will need to identify you. This information will not be used for any other purpose.
          </p>
          <h4>Contacting Potty Mouth</h4>
          <p>
            We record all information about feedback and complaints. This is to both provide a better
            service and resolve the issue you're complaining about. We also need your contact details to
            respond to you. We won't use it for any other reason.
          </p>
          <p>
            ⚠ Contact and report privacy issues on our
            <router-link to='/feedback'>feedback page.</router-link>
          </p>
          <h4>Australian Law</h4>
          <p>
            You're protected by the Australian <i>Privacy Act 1988</i>.
            For more information visit <a target="_blank" href="https://www.oaic.gov.au">www.oaic.gov.au</a> and
            <a target="_blank" href="https://www.legislation.gov.au">www.legislation.gov.au</a>.
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
  .privacy
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
      margin-left 4%
      width 52%
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
    button
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
  name: 'Learn'
}
</script>
