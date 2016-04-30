simpleDate = function(longDate) {
	if (longDate){		
	   var yyyy = longDate.getFullYear().toString();
	   var mm = (longDate.getMonth()+1).toString();
	   var dd  = longDate.getDate().toString();
	   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
    }
};

daysAgo = function(longDate) {
	var startingDate = simpleDate(longDate);
    if(startingDate === simpleDate(new Date()))
		{
			return 'today';
		} else {
			return moment(longDate).fromNow();
		};
};


// SOURCE: http://stackoverflow.com/questions/27323791/round-a-timestamp-to-the-nearest-date

