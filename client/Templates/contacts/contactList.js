Template.contactList.helpers({
  contacts: function() {
    return Contacts.find({}, {sort: {dueDate: 1, starred: -1, title:1}});
  }
});

// 		var someCursor = Contacts.find({ firstName: searchString });