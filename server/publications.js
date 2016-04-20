Meteor.publish('posts', function() {
  return Notes.find();
});

