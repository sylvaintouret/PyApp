/**
* @monthlyData() function should be used on AllData or on the Filtered version of AllData > CurData
* @dailyData() function should be used on AllData or on the Filtered version of AllData > CurData

* @overallData() should be used with the result from the two previous functions

* @ApplyFilter() function is used to filter AllData based on myFilter definition
**/

// Read all Data
// AllData is done in loaddata.js
var CurData; // CurData is the Data after the filter is applied
// myFilter is set by filteronChange()

/**
	@myFilter = {
		year : y, 							// Number of the year YYYY
		month : monthNames.indexOf(m), 		// Number of the month
		month2 : m,							// Name of the month (Filter value)
		dayname: dayNames.indexOf(d),		// Number of the day
		dayname2: d,						// Name of the day (Filter value)
		testbed: tb							// Name of the testbed
	};
**/

/**
	@AllData structure : 
			"datetimes"
			"dates"
			"years"
			"months"
			"weeks"
			"days"
			"durations"
			"testbeds"
			"status"
			"substatus"
**/

function ApplyFilter(Data,Filter){
	
	if(Data === undefined) {return [];}
	if(Filter === undefined) {return Data;}
	
	// 
	var keepIt;
	var result=[];
	for (i=0;i<Data.length;i++){
		
		keepIt = true;
		
		// Test for the testbed
		switch(Filter.testbed){
			case 'All':
				break;
			default:
				if (Data[i].testbeds != Filter.testbed) {keepIt = false;}
		}
		// Year filtering
		switch(Filter.year){
			case 'All':
				break;
			default:
				if (Data[i].years != Filter.year) {keepIt = false;}
		}
		
		// Month filtering
		
		switch(Filter.month2){
			case 'All':
				break;
			default:
				if (Data[i].months != Filter.month) {keepIt = false;}
		}
		// Day filtering
		switch(Filter.dayname2){
			case 'All':
				break;
			case 'WeekDays':
				if (Data[i].days == 0 || Data[i].days == 6) {keepIt = false;}
				break;
			case 'WeekEnds':
				if (Data[i].days != 0 && Data[i].days != 6) {keepIt = false;}
				break;
			default:
				if (Data[i].days != Filter.dayname) {keepIt = false;}
		}
		
		if (keepIt === true){result.push(Data[i]);}
	}
	
	return result;
}

/**
Function @PlotAll : this function is to update all graph (activated by filters)
**/

var chart1,chart2;

var showLegend1 = false,showLegend2 = false;



function PlotAll(currentFilter){
	// Start by applying filtering
	CurData = ApplyFilter(AllData,myFilter);
	
	// myChart1
	
	changeplotType1();
	
	// myChart2
	changeplotType2();
}

/**
Function @changeplotType are used to update the graphic for the left graph (1) and right graph (2)
**/

function changeplotType1(){
	var tmp = document.getElementById('plot-type');var plottype = tmp.options[tmp.selectedIndex].innerHTML ;
	
	var Data_vs_Day = dailyData(CurData);
	var Data_vs_Month = monthlyData(CurData);
	var Data_vs_Total = overallData(Data_vs_Day);
	
	
	if (plottype == 'Overall (Pie)'){
		chart1 = globalDonut('myChart1',Data_vs_Total,'pie',1,showLegend1);
	}
	
	if (plottype == 'Overall (Donut)'){
		chart1 = globalDonut('myChart1',Data_vs_Total,'donut',1,showLegend1);
	}
	
	if (plottype == 'Overall (Bar)'){
		chart1 = globalGraph('myChart1',Data_vs_Total,'bar',true,1,showLegend1);
	}

	if (plottype == 'Monthly (Bar)'){
		chart1 = barGraph_vs_Date('myChart1',Data_vs_Month,'bar','%Y-%m',showLegend1);
	}
	
	if (plottype == 'Daily (Bar)'){
		chart1 = barGraph_vs_Date('myChart1',Data_vs_Day,'bar','%Y-%m-%d',showLegend1);
	}
	
	if (plottype == 'Daily (Line)'){
		chart1 = barGraph_vs_Date('myChart1',Data_vs_Day,'spline','%Y-%m-%d',showLegend1);
	}
	
	if (plottype == 'Daily (Area)'){
		chart1 = barGraph_vs_Date('myChart1',Data_vs_Day,'area','%Y-%m-%d',showLegend1);
	}
}

function changeplotType2(){
	var tmp = document.getElementById('plot-type2');var plottype = tmp.options[tmp.selectedIndex].innerHTML ;
	
	// Options
	var tmp = document.getElementById('filter-below');var filter_below = Number(tmp.value) ;
	if (filter_below === undefined ) {tmp.Value = 1;filter_below=1;}
	
	var Data_vs_Day = dailyData(CurData);
	var Data_vs_Month = monthlyData(CurData);
	var Data_vs_Total = overallData(Data_vs_Day);
	
	if (plottype == 'Overall (Pie)'){
		chart2 = globalDonut('myChart2',Data_vs_Total,'pie',filter_below,showLegend2);
	}
	
	if (plottype == 'Overall (Donut)'){
		chart2 = globalDonut('myChart2',Data_vs_Total,'donut',filter_below,showLegend2);
	}
	
	if (plottype == 'Overall (Bar)'){
		chart2 = globalGraph('myChart2',Data_vs_Total,'bar',true,filter_below,showLegend2);
	}

	if (plottype == 'Monthly (Bar)'){
		chart2 = barGraph_vs_Date('myChart2',Data_vs_Month,'bar','%Y-%m',showLegend2);
	}
	
	if (plottype == 'Daily (Bar)'){
		chart2 = barGraph_vs_Date('myChart2',Data_vs_Day,'bar','%Y-%m-%d',showLegend2);
	}
	
	if (plottype == 'Daily (Line)'){
		chart2 = barGraph_vs_Date('myChart2',Data_vs_Day,'spline','%Y-%m-%d',showLegend2);
	}
	
	if (plottype == 'Daily (Area)'){
		chart2 = barGraph_vs_Date('myChart2',Data_vs_Day,'area','%Y-%m-%d',showLegend2);
	}
}

/**
 @globalDonut, @globalGraph and @barGraph_vs_Date are example functions used to plot data.
**/

function globalDonut(divName,Data,myType,groupValuesBelow,showLegend){
	
	if(myType === undefined) {myType = 'bar';}
	if(groupValuesBelow === undefined) {groupValuesBelow = 2;} // group any value that is smaller than 2%
	if(showLegend === undefined) {showLegend = false;}
	
	// Load all the data
	var Y = [];
	var G = [];
	var O = ['others',0]; // Used for plotting values below threshold groupValuesBelow
	
	/*
	
	Calculating the total
	
	*/
	var Total = 0;
	for (i=0;i<Data.length;i++){
		Total += Data[i].durations;
	}
	/*
	
	BUILD THE Ys
	
	*/
	var pos;
	var COLS = [];
	var NAMES = {};
	for (i=0;i<Data.length;i++){
		
		// Update the grouping (if we want them all stacked together or not)
		
		Y = ['data'+i.toString()];
		Y.push(Data[i].durations);
		
		if ( (Y[1] / Total * 100) < groupValuesBelow ) {
			O[1] +=Y[1];
		}
		else{
			COLS.push(Y) ;
			NAMES[Y[0]] = Data[i].status;
		}
		
	}
	
	if (O.length > 0 ) {
		COLS.push(O);
		NAMES['Others'] = O[0];
		}
	
	/*
	
	PLOTTING
	
	*/
	
	var chart = c3.generate({
		bindto: "#" + divName,
		data: 
		{
			columns: COLS,
			names: NAMES,
			groups: [G],
			type: myType,
		},
		color: {
			pattern: colorsLight
		},
		legend: {
			show: showLegend,
			position: 'bottom'
		},
		donut: {
		  label: {
			show: true
		  }
		}
	});
	
	return chart;
}

function globalGraph(divName,Data,myType,isHorizontal,groupValuesBelow,showLegend){
	if(isHorizontal === undefined) {isHorizontal = false;}
	if(myType === undefined) {myType = 'bar';}
	if(groupValuesBelow === undefined) {groupValuesBelow = 2;}
	if(showLegend === undefined) {showLegend = false;}
	
	showMax = Data.length;
	
	
	// We have the data so now we sort it and plot it
	Data.sort(function(a, b) {
		return ((a.durations < b.durations) ? 1 : ((a.durations == b.durations) ? 0 : -1));
	});
	
	/*
	
	Calculating the total
	
	*/
	var Total = 0;
	for (i=0;i<Data.length;i++){
		Total += Data[i].durations;
	}
	
	
	/*
	
	BUILDING X an Y
	
	*/
	var Y = [];
	var X = [];
	var G = [];
	var O = 0;
	
	var COLS = [];
	var CAT = [];
	var NAMES = {};
	
	//Y = Array.apply(null, Array(X.length)).map(Number.prototype.valueOf,0);
	
	for (i=0;i<showMax;i++){

		//Y = new Array(showMax + 1).fill(null)
		Y = Array.apply(null, { length: (showMax + 1) }).map(function () { return null; });
		//Y = Array.apply(null, Array(showMax + 1)).map(Number.prototype.valueOf,null);
		Y[0] = 'data' + i.toString();
		Y[i+1] = Data[i].durations;
		
		if ( (Y[i+1] / Total * 100) < groupValuesBelow ) {
			O +=Y[i+1];
		}
		else{
			COLS.push(Y) ;
			NAMES[Y[0]] = Data[i].status;//.substring(0, 20);
			G.push(Y[0]);
			CAT.push(NAMES[Y[0]]);
		}
	}
	
	
	
	
	for (i=0;i < COLS.length;i++){
		
		if (O > 0 ) {
			COLS[i].length = COLS.length+2;
		}
		else
		{
			COLS[i].length = COLS.length+1;
		}
	}
	
	// Add the others category
	if (O > 0 ) {
		
		//var aO = new Array(COLS[0].length).fill(null); // Used for plotting values below threshold groupValuesBelow
		var aO = Array.apply(null, { length: COLS[0].length }).map(function () { return null; });
		
		aO[0] = 'others';
		aO[aO.length-1] = O;
		
		COLS.push(aO);
		G.push(aO[0]);
		NAMES[aO[0]] = 'Others';
		CAT.push('Others');
		}
	

	/*
	
	PLOTTING
	
	*/
	
	var chart = c3.generate({
		bindto: "#" + divName,
		data: {
			//xs: XS,
			columns: COLS,
			names: NAMES,
			groups: [G],
			type: myType,
			labels: { format:function (v, id, i, j) { 
					if (v > 0) {return (Math.round(v*100)/100); }
					else {return ;}
				},
			},
			line: {
				connectNull: true,
			},
		},
		bar: {
			width: {
					ratio: 0.7 // this makes bar width 70% of length between ticks
				}
		},
		axis: {
			rotated: isHorizontal,
			x: {
				type: 'category',
				categories: CAT,
				tick: {
					multiline: false,
					rotate: 60
					}
				},
			y : {
				tick: {
					format: function(a){return (Math.round(a*100)/100);}
				},
			}
		},
		color: {
			pattern: colorsLight
		},
		legend: {
			show: showLegend,
			position: 'bottom',
		},
		tooltip: {
			show: true
		}
	});
	
	return chart;
}

function barGraph_vs_Date(divName,Data,myType,dateFormatX,showLegend){
	
	if(myType === undefined) {myType = 'bar';}
	if(dateFormatX === undefined) {dateFormatX = '%Y-%m-%d';}
	if(showLegend === undefined) {showLegend = false;}
	
	// Load all the data
	var Y = [];
	var X = [];
	var G = [];
	
	/*
	
	BUILDING THE X
	
	*/
	
	// getting all the dates
	X = [];
	for (i=0;i<Data.length;i++){
		X = X.concat(Data[i].dates);
	}
	
	// sort the dates
	X.sort(function(a,b){
	  // Turn your strings into dates, and then subtract them
	  // to get a value that is either negative, positive, or zero.
	  var aDate = DMY.parse(a);
	  var bDate = DMY.parse(b);
	  return ((aDate < bDate) ? -1 : ((aDate == bDate) ? 0 : 1));
	});
	
	// Reduce and prepare for plotting
	X = Unique(X);
	X = ['x0'].concat(X);
	
	/*
	
	BUILD THE Ys
	
	*/
	var pos;
	var COLS = [X];
	var NAMES = {};
	for (i=0;i<Data.length;i++){
		// copy X for the size
		//Y = new Array(X.length).fill(null);
		Y = Array.apply(null, { length: X.length }).map(function () { return null; });
		// Change the name
		Y[0] = 'data'+i.toString();
		
		// Calculate X ['data'+i.toString()];and Y
		for (j=0;j<Data[i].dates.length;j++){
			pos = X.indexOf(Data[i].dates[j]);
			Y[pos] = Data[i].durations[j];
		}
		
		// Update the grouping (if we want them all stacked together or not)
		G.push(Y[0]);
		COLS.push(Y);
		NAMES[Y[0]] = Data[i].status;
	}

	/*
	
	PLOTTING
	
	*/

	chart = c3.generate({
	  bindto: "#" + divName,
	  data: {
		x: X[0],
		xFormat: '%d/%m/%Y',
		columns: COLS ,
		groups: [G],
		type: myType,
		names: NAMES,
		line: {
			connectNull: true,
		},
	},
	axis: {
		x: {
			type: "timeseries",
			tick: {
				format: dateFormatX,
				rotate: 30
			}
		}
	},
	zoom: {
		enabled: true,
		rescale: true
	},
	color: {
			pattern: colorsLight
	},
	legend: {
		show: showLegend,
		position: 'bottom'
	},
	tooltip: {
        format: {
            value: function (value, ratio, id) {
                return Math.round(value*100)/100 + "h";
            }
        }
    }
	});
	
	return chart;

}

function toggleLegend(){
	var tmp = document.getElementById('legend-hide');
	
	if (tmp.checked == true){
		chart1.legend.show();
	}
	else{
		chart1.legend.hide();
	}
	showLegend1 = tmp.checked
}

function toggleLegend2(){
	var tmp = document.getElementById('legend-hide2');
	
	if (tmp.checked == true){
		chart2.legend.show();
	}
	else{
		chart2.legend.hide();
	}
	
	showLegend2 = tmp.checked
}

















