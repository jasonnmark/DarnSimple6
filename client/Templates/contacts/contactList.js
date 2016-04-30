Template.contactList.helpers({
  contacts: function() {
    return Contacts.find({}, {sort: {archived: 1, starred: -1, firstName: 1, lastName: 1}});
  }
});

// 		var someCursor = Contacts.find({ firstName: searchString });