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
	tags: {
    type: String,
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
  completedAt: {
    type: Date,
    optional: true
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



