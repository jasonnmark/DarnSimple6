Template.contactSearchResults.helpers({
  
 	contacts: function() {
// 		var searchString = "jas"; 	
		var someCursor = Contacts.find({ firstName: searchString });
		if(someCursor.count() == 0)
		{
		    // expose entire collection
		    var tempCursor = Contacts.find({ }, { firstName: true });
		    // find most similar string
		    var bestWord = mostSimilarString(tempCursor, "firstName", searchString, -1, false);
		    var someCursor = Contacts.find({ firstName: mostSimilarString });
			console.log(bestWord);
		} else {
		return someCursor;
		console.log(someCursor.firstName);
		}
	console.log(someCursor);
	return Contacts.find({firstName: bestWord});
 
/*
	console.log(searchString);
	console.log('testing');
*/
	}
  
});