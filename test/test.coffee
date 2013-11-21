Facebook = require "../main"

makeLoginButton = ->
  login = document.createElement "fb:login-button"
  login.setAttribute "show-faces", "true"
  login.setAttribute "width", "200"
  login.setAttribute "max-rows", "1"

  return login

# Note, any xfbml inserted before we call the API is parsed, if any is inserted
# later we'll need to call `FB.XFBML.parse()`
# https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/
document.body.insertBefore(makeLoginButton())

Facebook.init "7570224823", null, (FB) ->
  FB.Event.subscribe 'auth.authResponseChange', (response) ->
    if response.status is 'connected'
      # The response object is returned with a status field that lets the app know the current
      # login status of the person. In this case, we're handling the situation where they 
      # have logged in to the app.
      FB.api '/me', (response) ->
        alert 'Your name is ' + response.name
  
    else if response.status is 'not_authorized'
      # In this case, the person is logged into Facebook, but not into the app, so we call
      # FB.login() to prompt them to do so. 
      # In real-life usage, you wouldn't want to immediately prompt someone to login 
      # like this, for two reasons:
      # (1) JavaScript created popup windows are blocked by most browsers unless they 
      # result from direct interaction from people using the app (such as a mouse click)
      # (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login()
    else
      FB.login()
