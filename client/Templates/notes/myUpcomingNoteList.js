Template.myUpcomingNoteList.helpers({
  posts: function() {
    return Notes.find({}, {sort: {submitted: -1}});
  }
});