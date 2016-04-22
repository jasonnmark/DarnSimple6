Template.contactSearchResults.helpers({
 	contacts: function() {
// 		searchString = ""; 	
		var someCursor = Contacts.find({ firstName: searchString });
		if(someCursor.count() == 0)
		{
		    // expose entire collection
		    var tempCursor = Contacts.find({ }, { firstName: true });
		    // find most similar string
		    var bestWord = mostSimilarString(tempCursor, "firstName", searchString, -1, false);
// 		    var someCursor = Contacts.find({ firstName: mostSimilarString });
		    	return Contacts.find({firstName: bestWord});
			console.log(bestWord);
			console.log('fuzzy match');

		} else {
		return someCursor;
		console.log(someCursor.firstName);
		console.log('exact match');

		}
	console.log(someCursor);

 
/*
	console.log(searchString);
	console.log('testing');
*/
	}
  
});