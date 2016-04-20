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
    },
    optional: true
  },
  starred: {
    type: Boolean,
    optional: true
  },
  isItDone: {
    type: Boolean,
    optional: true
  },
  authorID: {
	    type: String,
	    autoValue: function() {
		   if (this.isInsert) {
			   var user = Meteor.user();

		     return user._id;
			}
    	}
  	},
  	assignedToID: {
	    type: String,
	    autoValue: function() {
		   if (this.isInsert) {
		   		var user = Meteor.user();
		   		return user._id;
			}
    	}
  	},
  	assignedToName: {  // Just for display
	    type: String,
	    autoValue: function() {
		   if (this.isInsert) {
				var user = Meteor.user();
				return user.username;
			}
    	}
  	},
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
 
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
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

/* Before AutoForms
Meteor.methods({
  noteInsert: function(noteAttributes) {
    check(Meteor.userId(), String);
    check(noteAttributes, {
      title: String,
      dueDate: String
    });

    var user = Meteor.user();
    var note = _.extend(noteAttributes, {
      userId: user._id, 
      author: user.username, 
    });

    var noteId = Notes.insert(note);

    return {
      _id: noteId
    };
  }
});
*/


