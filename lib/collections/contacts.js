// Contacts = new Mongo.Collection('contacts');

Contacts = new Mongo.Collection('contacts'),
  ContactsIndex = new EasySearch.Index({
    collection: Contacts,
    fields: ['firstName','lastName'],
    engine: new EasySearch.Minimongo()
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
	companyName: {
	    optional: true,
	    type: String
	},
	seachOnMe: {
		type: String,
		optional: true,
	    autoValue: function() {
/*
			var firstName = this.field("firstName");
			var lastName = this.field("lastName");
			var searchTerm = firstName.value + ' ' + lastName.value + ' ' + firstName.value;
*/
// 			var searchTerm = this.siblingField("firstName").value + ' ' + this.siblingField("lastName").value + ' ' + this.siblingField("firstName").value;
// 			var last = this.field("lastName");
// 			return searchTerm;
			return this.firstName + ' ' + this.lastName;
// 			return 'testing';
// example of autoValue https://github.com/aldeed/meteor-collection2#autovalue
/*
    var content = this.field("content");
      if (content.isSet) {
        return content.value.split(' ')[0];
      } else {
        this.unset();
      }      
*/

        }
	},
	starred: {
    	type: Boolean,
    	optional: true
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



