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
  Facebook.requiringPermissions ["email", "user_photos"], ->
    console.log arguments
