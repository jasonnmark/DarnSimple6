// Won't convert to coffee
Template.contactList.onCreated(function contactListOnCreated() {
  this.state = new ReactiveDict();
});


Template.contactList.helpers({
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

Template.contactList.events({
	"submit .selectize-input input" (event, instance) {
    	instance.state.set('searchString', event.target.value);
// 		console.log("change");
		console.log(instance.state.get('searchString'));
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