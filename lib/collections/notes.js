Notes = new Mongo.Collection('notes');


// This is used by AutoForms
Notes.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  dueDate: {
    type: Date,
    autoform: {
      type: "bootstrap-datepicker"
    }
  }
}));

/*
Notes.allow({
  update: function(userId, note) { return ownsDocument(userId, note); },
  remove: function(userId, note) { return ownsDocument(userId, note); },
});

Notes.deny({
  update: function(userId, note, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'title', 'starred').length > 0);
  }
});
*/

Meteor.methods({
  noteInsert: function(noteAttributes) {
    check(Meteor.userId(), String);
    check(noteAttributes, {
      title: String,
      dueDate: String
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
      submitted: new Date(),
      
/*
      authorId: user._id, 
      author: user.username, 
      assigneeId: user._id, 
      assignee: user.username,
      creationTimeStamp: new Date(),
      isItDone: 0
*/
    });

    var noteId = Notes.insert(note);

    return {
      _id: noteId
    };
  }
});


