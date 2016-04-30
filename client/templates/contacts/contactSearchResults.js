Template.contactSearchResults.helpers({
 	contactSearchResults: function() {
		searchString = "not"; 
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
		}
/*
	console.log(searchString);
	console.log('testing');
*/
	}
});


/*
Example of filter from : http://stackoverflow.com/questions/22028735/filtering-a-collection-in-meteor-js-by-a-date-range-or-word-filter
Posts.find({
  category: category,
  time: {$gte: date1, $lte: date2},
  text: new RegExp(searchTerm)
});
*/