Template.contactItem.events({
	
	'click .delete': function(e) {
// 		console.log("done"); 
		e.preventDefault();
// 		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentContactId = this._id;
			Contacts.remove(currentContactId);
			Router.go('dashboard');
// 		}
	},
		
	'click .contactStar': function () {
		Contacts.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});
	},
	
	'click .socialStar': function () {
		Contacts.update(this._id, {
			
			// Is this a problem because it's a subarray?
			$set: {starred: false}
// 	  		$set: {starred: ! this.starred}

	   	});
// 	   	console.log("star clicked");
	   	console.log(this);
	   	console.log(this.starred);
	}
	
});

Template.contactItem.helpers({
  socialIcon: function() {
    switch (this.type) {
	    case 'Twitter':
	        return 'fa-twitter';
	    case 'Facebook':
	    	return 'fa-facebook';
	    case 'LinkedIn':
	    	return 'fa-linkedin';
	    case 'Instagram':
	    	return 'fa-instagram';
	} 
  }
});