// from here: http://stackoverflow.com/questions/15797804/how-do-i-pass-the-text-or-value-of-a-span-to-a-function-onclick-without-using

clickHashtag = function(elementText){
// 	console.log (elementText);
// 	alert (elementText + " put a search function here");
	window.location.href = "/notes/:" + elementText;
	
};


