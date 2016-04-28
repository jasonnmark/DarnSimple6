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
	  		$set: {starred: ! this.starred}
	  	});
	}
	
});

