// Won't convert to coffee
Template.contactSearch.onCreated(function contactListOnCreated() {
  this.state = new ReactiveDict();
});


Template.contactSearch.helpers({
	
	inputAttributes: function () { return { class: 'easy-search-input form-control', name: 'contactSearch', placeholder: 'Add or Find Contacts' }; },
	
	
  contactsIndex: () => ContactsIndex,
	
/*
  contacts: function() {
    return Contacts.find({}, {sort: {archived: 1, starred: -1, firstName: 1, lastName: 1}});
*/

  contacts() {
   const instance = Template.instance();
//  var searchString = instance.state.get('searchString');
   if (instance.state.get('searchString')) {
	  // return results based on what's typed so far  
      return Contacts.find({searchOnMe: instance.state.get('searchString')}, {sort: {archived: 1, starred: -1, firstName: 1, lastName: 1}});
    }
    // Otherwise, return starred contacts
    return Contacts.find({}, {sort: {archived: 1, starred: -1, firstName: 1, lastName: 1}});
	
  },

/*
  notes() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Notes.find({ isItDone: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Notes.find({}, {sort: {dueDate: 1, starred: -1, title:1}});
  },
*/    
   
});

// 		var someCursor = Contacts.find({ firstName: searchString });

/*
Template.contactEasySearchBox.helpers({
  contactsIndex: () => ContactsIndex
});
*/

Template.contactSearch.events({
	'submit .selectize-input input' (event, instance) {
    	instance.state.set('searchString', event.target.value);
// 		console.log("change");
		console.log(instance.state.get('searchString'));
	},


	'submit form': function(event){
		event.preventDefault();
//     var contactSearch = event.target.contactSearch.value;
// Use JQuery because it's more robust and produces less bugs.
    var contactSearch = $('[name="contactSearch"]').val();
    console.log(contactSearch);
/*
    var contactId = function(){
	    	return Notes.findOne(searchOnMe:contactSearch);
	    }
*/
    // 	    var contactID = Meteor.Contacts.findOne({searchOnMe:contactSearch});
     var contactFound = Contacts.findOne({"searchOnMe":contactSearch});
     console.log(contactFound);
/*
     var contactID= contactName._id
		 console.log(contactID);
*/
    Router.go('contactDetail', contactFound);
    // clears field
    $('[name="contactSearch"]').val('');
    
	},
	
	'click .contactFindClick': function(event){
		$('[name="contactSearch"]').val('');
		console.log("clicked");
	},

/*
Template.contactList.events({
	"keyup .selectize-input input" (event, instance) {
    	instance.state.set('searchString', event.target.value);
// 		console.log("change");
		console.log(instance.state.get('searchString'));
	},
*/
});