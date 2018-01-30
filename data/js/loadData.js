// D3 function to convert string into date time
var YMDhms = d3.time.format("%d/%m/%Y %H:%M:%S");
var HMS = d3.time.format("%H:%M:%S");
var DMY = d3.time.format("%d/%m/%Y");


/*
Function to get time stamps
*/

function DB_getTimeStamp(DB){
	var DBi = DB.tba;
	var result = [];
	
	for (var i = 0; i < DBi.length; i++) {
		result.push(YMDhms.parse(DBi[i].date + " " + DBi[i].time));
	}
	return result;
	// return AllTimes.filter((v, i, a) => a.indexOf(v) === i);
}

function DB_getDuration(DB){
	var DBi = DB.tba;
	var result = [];
	var curTime,hours;
	
	for (var i = 0; i < DBi.length; i++) {
		curTime = HMS.parse(DBi[i].duration);
		hours = curTime.getHours() + curTime.getMinutes() / 60 + curTime.getSeconds() / 3600;
		result.push(hours);
	}
	return result;
	// return AllTimes.filter((v, i, a) => a.indexOf(v) === i);
}

function DB_getTestBeds(DB){
	var DBi = DB.tba;
	var result = [];
	
	for (var i = 0; i < DBi.length; i++) {
		result.push(DBi[i].testbed);
	}
	return result;
	// return AllTimes.filter((v, i, a) => a.indexOf(v) === i);
}

function DB_getStatus(DB){
	var DBi = DB.tba;
	var result = [];
	
	for (var i = 0; i < DBi.length; i++) {
		result.push(DBi[i].downtime_state.toLowerCase());
	}
	return result;
	// return AllTimes.filter((v, i, a) => a.indexOf(v) === i);
}

function DB_getSubStatus(DB){
	var DBi = DB.tba;
	var result = [];
	
	for (var i = 0; i < DBi.length; i++) {
		result.push(DBi[i].downtime_state_add.toLowerCase());
	}
	return result;
	// return 
}

// Restructure Data (So that filtering becomes easier)
function DB_GetData(DB){
	
	// Shaping date time results
	var dt = DB_getTimeStamp(DB);
	var year=[],month=[],day=[],wn=[];

	for(i=0;i <dt.length;i++){
		year.push(dt[i].getFullYear());
		month.push(dt[i].getMonth());
		day.push(dt[i].getDay());
		wn.push(getWeekNumber(dt[i]));
	}
	
	// getting the rest
	var duration = DB_getDuration(DB);
	var testbed = DB_getTestBeds(DB);
	var status = DB_getStatus(DB);
	var substatus = DB_getSubStatus(DB);
	
	result = [];
	for(i=0;i <dt.length;i++){
		result.push({
			"datetimes":dt[i],
			"dates":DB.tba[i].date,
			"years":year[i],
			"months":month[i],
			"weeks" : wn[i],
			"days" : day[i],
			"durations" : duration[i],
			"testbeds" : testbed[i],
			"status" : status[i],
			"substatus" : substatus[i]
			})
	}

	return result
}

/**
Support functions
**/

// get week number
function getWeekNumber(d) {
  d = new Date(+d); // Copy date so don't modify original
  d.setHours(0, 0, 0, 0); // Set to nearest Thursday: current date + 4 - current day number
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Make Sunday's day number 7
  var yearStart = new Date(d.getFullYear(), 0, 1); // Get first day of year
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7) // Calculate full weeks to nearest Thursday
  return weekNo; // Return week number
}

// Get Unique values from Array
function Unique(myArray){
	if (myArray == undefined){return [];}
	//return myArray.filter((v, i, a) => a.indexOf(v) === i);
	return myArray.filter(function(v, i, a) { return a.indexOf(v) === i; });
}

/**
* @Data this is the data read from the Database JSON
It will return a result structure like : 

result = [
	{
		ds.status = 
		ds.durations = 
		ds.datetimes = 
		ds.dates = 
	},
	{
		ds.status = 
		ds.durations = 
		ds.datetimes = 
		ds.dates = 
	},
];

**/

function monthlyData(Data){
	
	if(Data === undefined) {return [];}
	
	// We need all this for plotting
	var allStatus = Data.map(function(obj){ return obj.status });
	var ustatus = Unique(allStatus);
	var tmpData;
	
	var result = [];
	var tmpResult;
	for(i=0;i< ustatus.length;i++){
	
		// Use filter to get the right elements (Now we have only one status data)
		tmpData = Data.filter(function(dat) { return dat.status===ustatus[i]; });
		
		// Sort based on date value to get the result
		tmpData.sort(function(a, b) {
			return ((a.datetimes < b.datetimes) ? -1 : ((a.datetimes == b.datetimes) ? 0 : 1));
		});
		
		// Get the values per dates
				
		var m = tmpData[0].months
		var y = tmpData[0].years
		
		
		var aDurations = [];
		var aDates = [];
		var aDateTimes = [];

		var oDuration = tmpData[0].durations;
		var oDates = "01" + "/" + ("0" + (m + 1)).slice(-2)+ "/" + y.toString();
		var oDateTimes = DMY.parse(oDates);
		
		for (j=1;j<tmpData.length;j++) {
			

			if (tmpData[j].months == m && tmpData[j].years == y) {
				
				oDuration += tmpData[j].durations
			}
			else { 
				// start new month
				aDurations.push(oDuration);
				aDates.push(oDates);
				aDateTimes.push(oDateTimes);
				
				// Restart
				m = tmpData[j].months;
				y = tmpData[j].years;
				
				oDuration = tmpData[j].durations;
				oDates = "01" + "/" + ("0" + (m + 1)).slice(-2) + "/" + y.toString();
				oDateTimes = DMY.parse(oDates);
			}
			
			if (j==tmpData.length-1) {
				aDurations.push(oDuration);
				aDates.push(oDates);
				aDateTimes.push(oDateTimes);
			}

		}
		// Storing result
		tmpResult = new Object();
		
		tmpResult.status = ustatus[i]
		tmpResult.datetimes = aDateTimes;
		tmpResult.dates = aDates;
		tmpResult.durations = aDurations;
		
		result.push(tmpResult);
	}

	return result;
	
}

function dailyData(Data){
	
	if(Data === undefined) {return [];}
	
	// We need all this for plotting
	/*
	var allDates = Data.map(function(obj){ return obj.dates });
	
	var allDurations= Data.map(function(obj){ return obj.durations });
	*/
	var allStatus = Data.map(function(obj){ return obj.status });
	var ustatus = Unique(allStatus);
	var tmpData;
	
	var result = [];
	var tmpResult;
	for(i=0;i< ustatus.length;i++){
	
		// Use filter to get the right elements (Now we have only one status data)
		tmpData = Data.filter(function(dat) { return dat.status===ustatus[i]; });
		
		// Sort based on date value to get the result
		tmpData.sort(function(a, b) {
			return ((a.datetimes < b.datetimes) ? -1 : ((a.datetimes == b.datetimes) ? 0 : 1));
		});
		
		// Get the values per dates
		//tmpData = groupArray(tmpData,"dates",sumDuration)
		var today = tmpData[0].dates
		
		var aDurations = [];
		var aDates = [];
		var aDateTimes = [];

		var oDuration = tmpData[0].durations;
		var oDateTimes = DMY.parse(today);
		
		for (j=1;j<tmpData.length;j++) {

			if (tmpData[j].dates == today) {
				
				oDuration += tmpData[j].durations
			}
			else { 
				// start new month
				aDurations.push(oDuration);
				aDates.push(today);
				aDateTimes.push(oDateTimes);
				
				// Restart
				today = tmpData[j].dates;
				
				oDuration = tmpData[j].durations;
				oDateTimes = DMY.parse(today);
			}
			
			if (j==tmpData.length-1) {
				aDurations.push(oDuration);
				aDates.push(today);
				aDateTimes.push(oDateTimes);
			}

		}
		
		// Storing result
		tmpResult = new Object();
		
		tmpResult.status = ustatus[i]
		tmpResult.datetimes = aDateTimes;
		tmpResult.dates = aDates;
		tmpResult.durations = aDurations;
		
		result.push(tmpResult);

	}

	return result;
	
}

/**
Now the input comes from the function timebasedData
* @Data = [
	{
		ds.status = 
		ds.durations = 
		ds.datetimes = 
		ds.dates = 
	},
	{
		ds.status = 
		ds.durations = 
		ds.datetimes = 
		ds.dates = 
	},
];

And it returns the sum for each element ready for plotting
**/

function overallData(Data){
	
	// Here we use data which is structured by timebasedData function
	if(Data === undefined) {return [];}
	
	var result = [];
	var tmpResult;
	for (i=0;i< Data.length;i++){
		
		tmpResult = new Object();
		tmpResult.status = Data[i].status
		tmpResult.durations = Data[i].durations.reduce(add, 0);
		result.push(tmpResult);
	}
	return result;
}

function add(a, b) {
    return a + b;
}

var AllData = DB_GetData(DB);





