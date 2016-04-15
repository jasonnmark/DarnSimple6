Notes = new Mongo.Collection('notes');

Notes.allow({
  update: function(userId, note) { return ownsDocument(userId, note); },
  remove: function(userId, note) { return ownsDocument(userId, note); },
});

Notes.deny({
  update: function(userId, note, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  noteInsert: function(noteAttributes) {
    check(Meteor.userId(), String);
    check(noteAttributes, {
      title: String
    });

/*
    var noteWithSameLink = Notes.findOne({url: noteAttributes.url});
    if (noteWithSameLink) {
      return {
       	noteExists: true,
        _id: noteWithSameLink._id
      }
    }
*/

    var user = Meteor.user();
    var note = _.extend(noteAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });

    var noteId = Notes.insert(note);

    return {
      _id: noteId
    };
  }
});
