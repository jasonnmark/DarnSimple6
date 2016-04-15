Template.noteSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var note = {
      title: $(e.target).find('[name=title]').val()
    };


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