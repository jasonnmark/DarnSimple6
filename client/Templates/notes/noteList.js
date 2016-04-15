Template.noteList.helpers({
  notes: function() {
    return Notes.find({}, {sort: {dueDate: 1}});
  }
});