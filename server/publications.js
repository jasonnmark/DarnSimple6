Meteor.publish('notes', function() {
  return Notes.find();
});

Meteor.publish('contacts', function() {
  return Contacts.find();
});

Meteor.publish('players', function() {
  return Players.find();
});
