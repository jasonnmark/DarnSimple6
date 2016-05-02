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
// 		autoValue: function() {
// 			return 'testing';
// 			return this.firstName.value + ' ' + this.lastName.value;
// 		}
/*
	    autoValue: function() {
			return this.field("firstName").value + ' ' + this.field("lastName").value;
*/

/*
			var firstName = this.field("firstName");
			var lastName = this.field("lastName");
			var searchTerm = firstName.value + ' ' + lastName.value + ' ' + firstName.value;
*/
// 			var searchTerm = this.siblingField("firstName").value + ' ' + this.siblingField("lastName").value + ' ' + this.siblingField("firstName").value;
// 			var last = this.field("lastName");
// 			return searchTerm;
// 			return this._id.firstName.value + ' ' + this.field("lastName").value;
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
//         }
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


Contacts.before.update(function (userId, doc, fieldNames, modifier)  {
// 	console.log(doc.firstName + ' ' + doc.lastName + ' ' + doc.organization);
// 	$set.searchOnMe = doc.firstName + ' ' + doc.lastName + ' ' + doc.organization;
// 	console.log('sdfd');


	if ($.inArray('firstName', fieldNames) > -1){
		var firstn = modifier.$set && modifier.$set.firstName
 + ' ';
		} else {
		if(doc.firstName){
			var firstn = doc.firstName + ' ';
		} else {
			var firstn = '';
		}
	};
	
	modifier.$set.searchOnMe = firstn;
	console.log(modifier);

/*
	if ($.inArray('lastName', fieldNames) > -1){
		var lastn = modifier.$set && modifier.$set.lastName + ' ';
		}
	else{
		if(doc.lastName){
			var lastn = doc.lastName + ' ';
		}
		else{
			var lastn = '';
		}
	};
	if ($.inArray('organization', fieldNames) > -1){
		var organize = 'organizationFromModifier' + ' ';
		}
	else{
		if(doc.organization){
			var organize = modifier.$set && modifier.$set.organization + ' ';
		}
		else{
			var organize = '';
		}
	};
*/
	
// 	var firstName = modifier.$set && modifier.$set.firstName;
/*
	console.log(firstName);
	console.log(fieldNames);
	console.log(modifier);
*/
/*
	var combined = firstn + lastn + organize;	
	console.log(combined);
*/

	
/*	
	$set.firstName = firstn;
	$set.lastName = lastn;
	$set.organization = organization;	
	$set.searchOnMe = combined;
*/
	
	
// 	console.log(fieldNames);
// 	modifier ();

/*
	console.log(modifier);
	modifier.$set.searchOnMe = doc.firstName + ' ' + doc.lastName + ' ' + doc.organization;
	console.log(modifier);
*/
	
	
// 	updateSearchField(doc);

// This works "before.update" but not after... which means it has OLD data, not new...
// 	modifier.$set.searchOnMe = doc.firstName + ' ' + doc.lastName + ' ' + doc.organization;


//     Contacts.update({searchOnMe: 'jason was here'});
});

/*
test.after.update(function (userId, doc, fieldNames, modifier, options) {
  // ...
}, {fetchPrevious: true/false});
*/

function updateSearchField (contact) {
    console.log(contact);
//     function () {
	    var toUpdate = (contact.firstName + ' ' + contact.lastName + ' ' + contact.organization);
	    console.log(toUpdate);
/*
		Contacts.update(contact._id, {
	  		$set: {searchOnMe: toUpdate}
	  	});
*/
// 	}

//         return true;
};