Template.loggedInNavigation.events({
    'click #logout': function(e){
	    Meteor.logout ();    }
});

Template.loggedInNavigation.helpers({
	reminderCount: function(){
// 		return 15;
		return Notes.find({isItDone: {$ne: true}, starred: true}).count()
	}
});