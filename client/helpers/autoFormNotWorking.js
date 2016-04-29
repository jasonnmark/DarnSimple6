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