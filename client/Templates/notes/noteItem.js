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

	
	'click .noteStar': function () {
		Notes.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});
	},	
});


Template.noteItem.helpers({
	dateColor: function() {
// 		return simpleDate(this.dueDate);
		
		if(simpleDate(this.dueDate) < simpleDate(new Date()))
		{
			return 'overdue';
		} else {
			if(simpleDate(this.dueDate) === simpleDate(new Date()))
			{
				return 'today';
			}
		}
		
	},
	daysFromNow: function() {
		return daysAgo(this.dueDate);
	}
});