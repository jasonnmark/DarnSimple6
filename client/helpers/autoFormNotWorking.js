// From: https://github.com/aldeed/meteor-autoform

/*
AutoForm.addHooks(null, hooksObject);

var hooksObject = {


  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	  console.log("test");
	  this.done();
    // You must call this.done()!
    //this.done(); // submitted successfully, call onSuccess
    //this.done(new Error('foo')); // failed to submit, call onError with the provided error
    //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
  },

 
};
*/

// Doesn't work on form type "insert", only on Normal, but when I use normal I can't get it to submit.

AutoForm.addHooks('addContactsForm', {
  onSubmit: function(insertDoc, updateDoc, currentDoc){
	  
	  
	    //Do some custom async js here as required,
  //Then I call my meteor method directly from obSubmit hook
  Meteor.call("addPost", insertDoc, function (error, post) {});
  //reset the form.
  AutoForm.resetForm('formId');
  return false;
  
  
// 	    PeopleSchema.clean(doc);
// 	    console.log("People doc with auto values", doc);
//         this.done();

//         this.event.preventDefault();
//         console.log('before update call');
//         alert("testing");
//         return false;
	
  }
});

/*
AutoForm.addHooks('addContactsForm', hooksObject);

var hooksObject = {
	onSubmit: function (insertDoc, updateDoc, currentDoc){
		this.done();
		console.log("test");
		alert("testing");
	}
}
*/

/*
AutoForm.hooks({
  addContactsForm: {
  	onSubmit: function (insertDoc, updateDoc, currentDoc) {
	  this.done();
	  console.log("test");
	  alert("testing");
    }	  
  }
});
*/