Template.noteItem.events({
	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
			var currentNoteId = this._id;
			Notes.remove(currentNoteId);
			Router.go('dashboard');
		}
	}
});