Template.contactItem.events({
	"click .toggleIsItDone": function () {
// 		console.log("done"); 
	  	Contacts.update(this._id, {
	  		$set: {isItDone: ! this.isItDone}
	  	});
	},
	
	'click .delete': function(e) {
// 		console.log("done"); 
		e.preventDefault();
		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentContactId = this._id;
			Contacts.remove(currentContactId);
			Router.go('dashboard');
		}
	},	

	"click #edit": function(e, t) {
// 	  console.log(this._id);
      return Session.set("target" + t.data._id, true);
      
    },
	
	
	'submit form': function(e) {
	    e.preventDefault();
	
	    var currentContactId = this._id;
	
	    var contactProperties = {
	      title: $(e.target).find('[name=title]').val()
	    }
	
		// 	console.log(contactProperties); 
		// 	console.log(this._id); 
	
	
	
	    Contacts.update(currentContactId, {$set: contactProperties}, function(error) {
	      if (error) {
	        // display the error to the user
	        throwError(error.reason);
	      } else {
	        Router.go('dashboard', {_id: currentContactId});
	      }
	    });
	},
	
});



