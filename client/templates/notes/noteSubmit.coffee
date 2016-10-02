Template.noteSubmit.events "click .noteStar": ->
  
  # 		console.log("star"); 
  Note.update @_id,
    $set:
      starred: not @starred



#
#  'submit form': function(e) {
#
#    e.preventDefault();
#
#    var note = {
#      title: $(e.target).find('[name=title]').val(),
#      dueDate: $(e.target).find('[name=dueDate]').val()
#    };
#
#    // Clear form
#    event.target.title.value = "";
#    event.target.dueDate.value = "";
#
#      Router.go('dashboard', {_id: result._id});  
#    });
#
#  }
#
Template.noteSubmit.rendered = ->
  @$(".datepicker").datepicker()