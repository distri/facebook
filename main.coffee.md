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

TODO: Test this out

Pass an array of scope permissions and a function to call once those permissions
have been granted.

      requiringPermissions: (scopes, fn) ->
        wrapped = (fn) ->
          ({authResponse}) ->
            fn(authResponse)

        FB.getLoginStatus ({status, authResponse}) ->
          if status is 'connected'
            FB.api '/me/permissions', ({data:[permissions]}) ->

              permissionsToPrompt = scopes.filter (permission) ->
                !permissions[permission]

              if permissionsToPrompt.length
                FB.login wrapped(fn),
                  scope: permissionsToPrompt.join(',')
              else
                fn(authResponse)
          else if status is 'not_authorized'
            FB.login wrapped(fn),
              scope: scope
          else
            FB.login wrapped(fn),
              scope: scope
