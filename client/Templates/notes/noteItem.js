/*
Template.noteItem.editing = function() {
    return Session.get("target" + this._id);
  };
	
*/

Template.noteItem.events({
	"click .toggleIsItDone": function () {
// 		console.log("done"); 
	  	Notes.update(this._id, {
	  		$set: {isItDone: ! this.isItDone}
	  	});
	},
	
	'click .delete': function(e) {
// 		console.log("done"); 
		e.preventDefault();
		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentNoteId = this._id;
			Notes.remove(currentNoteId);
			Router.go('dashboard');
		}
	},	

	"click #edit": function(e, t) {
// 	  console.log(this._id);
      return Session.set("target" + t.data._id, true);
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
	
	"click .editable": function(){
	    $(this).editorEnabled = true;
	    console.log((this)+"hey");
		$((this)+".editable").hide();


	},
	
	'click .noteStar': function () {
		console.log("star"); 
		Notes.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});
	},	
	
	
});



/*
Template.layout.helpers({
	
	
});
*/