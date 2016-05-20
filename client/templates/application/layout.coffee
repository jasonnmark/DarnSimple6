Template.layout.events "click .googleLogin": (e, tmpl) ->
  Meteor.loginWithGoogle
    requestPermissions: [ "email", "profile" ]
  , (err) ->
    if err
      
      #error handling
      alert "error : " + err
      throw new Meteor.Error(Accounts.LoginCancelledError.numericError, "Error")
    else



#show an alert
# alert('logged in');