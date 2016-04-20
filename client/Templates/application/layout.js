/*
Template.layout.events({
    "click .googleLogin": function(e, tmpl){
        Meteor.loginWithGoogle({
            requestPermissions: ['email', 'profile']
        }, function (err) {
            if(err) {
                //error handling
                alert('error : '+ err);
                throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
            } else {
                //show an alert
                // alert('logged in');
            }
        });
    }
});
*/

Template.layout.helpers({
  playersIndex: () => PlayersIndex
});




