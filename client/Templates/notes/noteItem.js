Template.noteItem.events({
	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentNoteId = this._id;
			Notes.remove(currentNoteId);
			Router.go('dashboard');
		}
	},
	
	
	'submit form': function(e) {
	    e.preventDefault();
	
	    var currentNoteId = this._id;
	
	    var noteProperties = {
	      title: $(e.target).find('[name=title]').val()
	    }
	
		// 	console.log(noteProperties); 
		// 	console.log(this._id); 
	
	
	
	    Notes.update(currentNoteId, {$set: noteProperties}, function(error) {
	      if (error) {
	        // display the error to the user
	        throwError(error.reason);
	      } else {
	        Router.go('dashboard', {_id: currentNoteId});
	      }
	    });
	},
	
	
	
	'click .noteStar': function () {
// 		console.log("star"); 
		Notes.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});

	},	
	
	
});

