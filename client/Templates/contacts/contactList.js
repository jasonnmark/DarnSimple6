Template.contactList.helpers({
  notes: function() {
    return Notes.find({}, {sort: {dueDate: 1, starred: -1, title:1}});
  }
});