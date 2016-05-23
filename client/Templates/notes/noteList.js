// Can't convert to Coffeescript

// Temporary UI state
// https://www.meteor.com/tutorials/blaze/temporary-ui-state

Template.noteList.helpers({
  notes() {
    var instance = Template.instance();
    if (instance.state.get('showCompleted')) {
	    return Notes.find({}, {sort: {dueDate: 1, starred: -1, title:1}});        	
    }
    	// Otherwise, return just some
			// If show completed is checked, filter tasks
      return Notes.find(
      	{ 
	      	$or: [
		      	{isItDone: { $ne: true } },
		      	{title: "number"} 	
	      	]
	    	}, 
	    	{ sort: { createdAt: -1 } }
	    );


  },
});

/*
// https://github.com/meteorhacks/search-source#get-the-reactive-data-source

SearchSource.defineSource('packages', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {packageName: regExp, description: regExp};
    return Packages.find(selector, options).fetch();
  } else {
    return Packages.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
*/



Template.noteList.onCreated(function noteListOnCreated() {
  this.state = new ReactiveDict();
});




Template.noteList.events({
	"change .show-completed input" (event, instance) {
    	instance.state.set('showCompleted', event.target.checked);
		console.log("click");
		console.log(instance.state.get('showCompleted'));

	},
	
	"hover .note"(){
		console.log(this);
		Mousetrap.bind('s', () => {
			console.log('starred'); 
		});
	},
	
});


