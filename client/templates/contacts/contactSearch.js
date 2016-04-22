Template.contactSearch.helpers({
  
 	contacts: function() {
 
	
		var searchString = "ema"; // user typed "bear" instead of "beer"
	
		var someCursor = Contacts.find({ firstName: searchString });
		
			// "bear" is not found, so we want to find most similar word to give user suggestion (Did you mean...)
		if(someCursor.count() == 0)
		{
		    // expose entire collection
		    var tempCursor = Contacts.find({ }, { firstName: true });
		
		    // find most similar string
		    var bestWord = mostSimilarString(tempCursor, "firstName", searchString, -1, false);
		
		    // in this example, bestWord is "beer", show user a suggestion: "Did you mean beer?"
		    // ...
			console.log(bestWord);
		} else {
			console.log(someCursor.firstName)
		}

/*
	console.log(searchString);
	console.log('testing');
*/
	}
  
});