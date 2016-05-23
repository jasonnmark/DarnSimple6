// Contacts = new Mongo.Collection('contacts');

Contacts = new Mongo.Collection('contacts'),
  ContactsIndex = new EasySearch.Index({
    collection: Contacts,
//     limit: 5,
//     props: {
// 	    'anyField' : true
// 	},
    fields: ['searchOnMe'],
    engine: new EasySearch.Minimongo({
	    sort: () => ['firstName', 'lastName', 'organization']
    })
  });
    
// This is used by AutoForms
Contacts.attachSchema(new SimpleSchema({
	
	firstName: {
	    optional: true,
	    type: String      
	},
	
	lastName: {
	    optional: true,
	    type: String
	},
	organization: {
	    optional: true,
	    type: String
	},
/*
	tags: {
    	type: [String],
		autoform: {
			type: 'tags',
				afFieldInput: bootstrap-tagsinput(["Amsterdam","Washington","Sydney","Beijing","Cairo"])
    },
*/
	searchOnMe: {
		type: String,
		optional: true,
		autoValue: function() {
// 	This doesn't work when editing because we often edit only one of these three fields at a time and so the value becomes "undefined".
// 				return this.field("firstName").value + ' ' + this.field("lastName").value + ' ' + this.field("organization").value 
		}

	},
	archived: {
    	type: Boolean,
    	optional: true
  	},
	starred: {
    	type: Boolean,
    	optional: true
  	},
  	social: {
	 	optional: true,
	    type: [Object],
	    custom: function () {
	    }
	},
	
	"social.$.type": {
	    optional: true,
	    type: String,
	    allowedValues: ['Twitter', 'Facebook', 'LinkedIn'],
	},
	"social.$.address": {
	    optional: true,
	    type: String,
// 	    regEx: SimpleSchema.RegEx.Email
	},
	"social.$.starred": {
	    optional: true,
	    type: Boolean,
	},
	emails: {
	 	optional: true,
	    type: [Object],
	    custom: function () {
	    }
	},
	
	"emails.$.address": {
	    optional: true,
	    type: String,
	    regEx: SimpleSchema.RegEx.Email
	},
	birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
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

  	contactOwnerID: {   // this is who owns the relationship
	    type: String,
	    autoValue: function() {
		   if (this.isInsert) {
		   		var user = Meteor.user();
		   		return user._id;
			}
    	}
  	},
  	
  	contactOwnerName: {   // to display first name, last name of owner
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


// Using collection-hooks: https://atmospherejs.com/matb33/collection-hooks
// have you use after otherwise it usees words from before submitting.
// Tutorial https://www.discovermeteor.com/blog/a-look-at-meteor-collection-hooks/


// const getSearchOnMe = doc => doc.firstName + ' ' + doc.lastName;

Contacts.before.insert(function (userId, doc) {
	if (doc.firstName){
		var firstName = doc.firstName + ' ';	
	} else {
		var firstName = '';
	}

	if (doc.lastName){
		var lastName = doc.lastName + ' ';	
	} else {
		var lastName = '';
	}
	
	if (doc.organization){
		var organization = doc.organization + ' ';	
	} else {
		var organization = '';
	}
	
	var searchOnMe = firstName + lastName + organization;
    doc.searchOnMe = searchOnMe;
});

Contacts.before.update(function (userId, doc, fieldNames, modifier) {
	// This updates the searchOnMe field to include first, last and organization whenver any of those fields are updated.
	if (fieldNames.indexOf("firstName") > -1){
		// If it's been changed, set var firstName to the new value
		var firstName = modifier.$set && modifier.$set.firstName + ' ';
	} else {
		if (doc.firstName){
			// if it hasn't been changed and is stored in the database set it to whatever is in database
			var firstName = doc.firstName + ' ';	
		} else {
			// otherwise set it to blank (so it's not undefined)
			var firstName = '';
		}
	}

	if (fieldNames.indexOf("lastName") > -1){
		var lastName = modifier.$set && modifier.$set.lastName + ' ';
	} else {
		if (doc.lastName){
			var lastName = doc.lastName + ' ';	
		} else {
			var lastName = '';
		}
	}
	
	if (fieldNames.indexOf("organization") > -1){
		var organization = modifier.$set && modifier.$set.organization;
	} else {
		if (doc.organization){
			var organization = doc.organization + ' ';	
		} else {
			var organization = '';
		}
	}

	var searchOnMe = firstName + lastName + organization;

    modifier.$set = modifier.$set || {};
    modifier.$set.searchOnMe = searchOnMe;
});

