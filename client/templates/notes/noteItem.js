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


/*
  "click .hashtag": function() {
// Demo here: http://jsfiddle.net/tpL4M/1/
// This happens more the more you click on it.. some sort of bug.
	 	$('span.hashtag').click(function(){
    	var t = $(this).text();
    	console.log(this);
			alert(t);
		});
  },
  "click .noteStar": function() {
    return Notes.update(this._id, {
      $set: {
        starred: !this.starred
      }
    });
  }
  */
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
  },
  noteTextParsed: function () {
// 	  return (this.title);
		var startingText = (this).title;
		var hashtagged = startingText.replace(/#[a-z0-1A-Z]+/g, '<span class="hashtag"  onclick="clickHashtag((this.textContent || this.innerText))">$&</span>');
		var parsed = hashtagged.replace(/@[a-z0-1A-Z]+/g, '<span class="personlink">$&</span>');
	  return (parsed);
	  
// 	  $('note').each(function() {
/*
    $(this).html($(this).text()
                .replace(/#[a-z0-1A-Z]+/g, '<span style="color: red;">$&</span>'));
*/
// });
  }
});

