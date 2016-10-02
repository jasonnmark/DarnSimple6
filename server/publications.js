Meteor.publish('notes', function() {
  return Notes.find();
  //   return Notes.find({assignedTo: this.userId});
});

Meteor.publish('userProfile', function() {
  return UserProfile.find();
});

Meteor.publish('contacts', function() {
  return Contacts.find();
});

