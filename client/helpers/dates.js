/*
throwError = function(message) {
  Errors.insert({message: message});
};
*/

// SOURCE: http://stackoverflow.com/questions/27323791/round-a-timestamp-to-the-nearest-date

formatDate = function() {
	console.log("formatDate being called");
// 	console.log(this);
// 	console.log(this.getDate().toString);
	
/*
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
   var utcSeconds = 1417903843000,
    	d = new Date(0);
	d.setUTCSeconds(Math.round( utcSeconds / 1000.0));
    
    var myTime = (function(){
        var theTime = moment(d.formatDate(), 'YYYYMMDD').startOf('day').fromNow();
        if(theTime.match('hours ago')){
            return 'Today';
        }
        return theTime;
    })();
*/
    
};

/*

Date.prototype.formatDate = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
  };

var utcSeconds = 1417903843000,
    d = new Date(0);

d.setUTCSeconds(Math.round( utcSeconds / 1000.0));

var myTime = (function(){
        var theTime = moment(d.formatDate(), 'YYYYMMDD').startOf('day').fromNow();
        if(theTime.match('hours ago')){
            return 'Today';
        }
        return theTime;
    })();

alert( myTime );
*/