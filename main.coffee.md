Facebook
========

    module.exports =
      init: (appId, options={}, callback) ->
        options.status ?= true
        options.xfbml ?= true
        options.appId = appId

        window.fbAsyncInit = ->
          # init the FB JS SDK
          FB.init options

          # Additional initialization code such as adding Event Listeners goes here
          callback?(FB)

        # Attach the fb-root element to the body
        fbRoot = document.createElement "div"
        fbRoot.id = "fb-root"
        document.body.appendChild(fbRoot)

        # Load the SDK asynchronously
        do (d=document, s='script', id='facebook-jssdk', js=undefined) ->
           fjs = d.getElementsByTagName(s)[0]
           return if d.getElementById(id)
           js = d.createElement(s)
           js.id = id
           js.src = "//connect.facebook.net/en_US/all.js"
           fjs.parentNode.insertBefore(js, fjs)
