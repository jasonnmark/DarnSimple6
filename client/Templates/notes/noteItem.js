/*
Template.noteItem.editing = function() {
    return Session.get("target" + this._id);
  };
	
*/

Template.noteItem.events({
	"click .toggleIsItDone": function () {
	  	Notes.update(this._id, {
	  		$set: {isItDone: ! this.isItDone}
	  	});
	},
	
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentNoteId = this._id;
			Notes.remove(currentNoteId);
			Router.go('dashboard');
		}
	},	

	"click #edit": function(e, t) {
      return Session.set("target" + t.data._id, true);
      
    },
	
	
	'submit form': function(e) {
	    e.preventDefault();
	
	    var currentNoteId = this._id;
	
	    var noteProperties = {
	      title: $(e.target).find('[name=title]').val()
	    }

	
	
	    Notes.update(currentNoteId, {$set: noteProperties}, function(error) {
	      if (error) {
	        // display the error to the user
	        throwError(error.reason);
	      } else {
	        Router.go('dashboard', {_id: currentNoteId});
	      }
	    });
	},
	
	"click .editable": function(){
	    $(this).editorEnabled = true;
		$((this)+".editable").hide();


	},
	
	'click .noteStar': function () {
		Notes.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});
	},	
	
	
});



/*
Template.layout.helpers({
	
	
});
*/