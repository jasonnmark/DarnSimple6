Template.contactSearchBox.events({
	
	'submit #contactSearch': function(e){
			e.preventDefault();
			console.log(this);
			searchString = this._id;
			console.log(searchString);

// document.getElementById("contactSearch").submit();

	}
	
/*
	function myFunction() {
document.getElementById("contactSearch").submit();
	}
	
*/
/*
	function submitform()
{
    document.forms["myform"].submit();
}
	
	
	'submit .contactSearch': function(e) {
		console.log("done"); 
// 		e.preventDefault();
		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
		searchString = this._id;
// 			Router.go('dashboard');
		}
	},
*/
	
});

