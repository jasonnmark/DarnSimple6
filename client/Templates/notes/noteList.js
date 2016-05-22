// Can't convert to Coffeescript

// Temporary UI state
// https://www.meteor.com/tutorials/blaze/temporary-ui-state

Template.noteList.helpers({
  notes() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Notes.find({ isItDone: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    	// Otherwise, return all of the tasks
    	return Notes.find({
    }, {sort: {dueDate: 1, starred: -1, title:1}});
  },
});




Template.noteList.onCreated(function noteListOnCreated() {
  this.state = new ReactiveDict();
});




Template.noteList.events({
	"change .hide-completed input" (event, instance) {
    	instance.state.set('hideCompleted', event.target.checked);
		console.log("click");
		console.log(instance.state.get('hideCompleted'));

	},
	
	"hover .note"(){
		console.log(this);
		Mousetrap.bind('s', () => {
			console.log('starred'); 
		});
	},
	
});


