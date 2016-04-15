Template.loggedInNavigation.events({
    'click #logout': function(e){
	    Meteor.logout ();    }
});