Template.noteEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentNoteId = this._id;

    var noteProperties = {
      title: $(e.target).find('[name=title]').val()
    }

// 	console.log(noteProperties); 
	console.log(this._id); 



    Notes.update(currentNoteId, {$set: noteProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('dashboard', {_id: currentNoteId});
      }
    });
  },


});