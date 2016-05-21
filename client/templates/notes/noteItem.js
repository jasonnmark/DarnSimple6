Template.noteItem.events({
  "click .toggleIsItDone": function() {
    return Notes.update(this._id, {
      $set: {
        isItDone: !this.isItDone
      }
    });
  },
  "click .delete": function(e) {
    var currentNoteId;
    e.preventDefault();
    currentNoteId = this._id;
    Notes.remove(currentNoteId);
    return Router.go("dashboard");
  },
  "click #edit": function(e, t) {
    return Session.set("target" + t.data._id, true);
  },
  "submit form": function(e) {
    var currentNoteId, noteProperties;
    e.preventDefault();
    currentNoteId = this._id;
    noteProperties = {
      title: $(e.target).find("[name=title]").val()
    };
    return Notes.update(currentNoteId, {
      $set: noteProperties
    }, function(error) {
      if (error) {
        return throwError(error.reason);
      } else {
        return Router.go("dashboard", {
          _id: currentNoteId
        });
      }
    });
  },
  "click .noteStar": function() {
    return Notes.update(this._id, {
      $set: {
        starred: !this.starred
      }
    });
  }
});
Template.noteItem.helpers({
  dateColor: function() {
    if (simpleDate(this.dueDate) < simpleDate(new Date())) {
      return "overdue";
    } else {
      if (simpleDate(this.dueDate) === simpleDate(new Date())) {
        return "today";
      }
    }
  },
  daysFromNow: function() {
    if (this.dueDate) {
      return daysAgo(this.dueDate);
    }
  }
});

