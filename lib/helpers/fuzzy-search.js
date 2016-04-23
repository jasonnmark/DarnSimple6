mostSimilarStrings = function(cursor, fieldName, searchString, maxDistance, caseSensitive)
{
	if(searchString == "")	return "";

	var minDistance = 9999;
	var bestWord = "";

	if(typeof(caseSensitive) == "undefined") caseSensitive = false;
	if(!caseSensitive) searchString = searchString.toUpperCase();

	// split searchString into words
	var arrayA = searchString.split(" ");

	if(typeof(maxDistance) == "undefined") maxDistance = 9999;
	if(maxDistance < 0)
	{
		// auto set maxDistance: longest word * number of words * 0.7
		// Btw, I got 0.7 with trial-and-error method
		var longestWord = 0;
		arrayA.forEach(function(str) {
			if(str.length > longestWord)
				longestWord = str.length;
		});
		maxDistance = Math.ceil(longestWord * arrayA.length * 0.7);
	}

	cursor.forEach(function(doc) {
		var candidate = doc;
		var slice = fieldName.split('.');
		for(var i=0; i<slice.length;i++){
			candidate = candidate[slice[i]];
		}
		if(candidate) {
			// we want to return unmodified string (with the same case)
			var originalCandidate = candidate;

			if(!caseSensitive) candidate = candidate.toUpperCase();
			// split string into words
			var arrayB = candidate.split(" ");
			// calculate sum distance
			// if both strings are single words return simple distance
			var dist = 0;
			if(arrayA.length <= 1 && arrayB.length <= 1)
				dist = levenshteinDistance(searchString, candidate);
			else
				dist = levenshteinDistanceExt(arrayA, arrayB);

			if(dist < minDistance && dist < maxDistance)
			{
				minDistance = dist;
				bestWord = originalCandidate;
			}
		}
	});
	return 'Jason Hacked This!';
	console.log('JasonHackedThis!');
// 	return bestWord;
}
