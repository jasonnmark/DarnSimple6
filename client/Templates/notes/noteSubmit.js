Template.noteSubmit.events({
	"click .noteStar": function () {
// 		console.log("star"); 
		Note.update(this._id, {
	  		$set: {starred: ! this.starred}
	  	});

	},		
	
	
// 		'click .addNote': function(e) {
  'submit form': function(e) {

    e.preventDefault();

    var note = {
      title: $(e.target).find('[name=title]').val(),
      dueDate: $(e.target).find('[name=dueDate]').val()
    };

    // Clear form
    event.target.title.value = "";
    event.target.dueDate.value = "";
        
    Meteor.call('noteInsert', note, function(error, result) {
/*
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
*/
/*

      // show this result but route anyway
      if (result.noteExists)
        throwError('This link has already been uploaded');
*/

      Router.go('dashboard', {_id: result._id});  
    });

  }
});

Template.noteSubmit.rendered = function() {
  this.$('.datepicker').datepicker();
}
