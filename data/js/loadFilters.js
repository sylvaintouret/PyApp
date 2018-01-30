/* Load Filters */

/*

VARIABLES

*/


// this is the main list for filters

var filters = {
	testbeds : Unique(AllData.map(function(obj){ return obj.testbeds })),
	years : Unique(AllData.map(function(obj){ return obj.years })),
	months : Unique(AllData.map(function(obj){ return obj.months })),
	days : Unique(AllData.map(function(obj){ return obj.days })),
	plots : plotTypes,
	plots2 : plotTypes2
};



/*

FUNCTIONS FOR DAY AND MONTH CONVERSION

*/


function getDayNames(d){
	var result = []
	for(i=0;i <d.length;i++){
		result.push(dayNames[d[i]]);
	}
	return result
} 

function getMonthNames(m){
	var result = []
	for(i=0;i <m.length;i++){
		result.push(monthNames[m[i]]);
	}
	return result
} 

/*

FUNCTIONS FOR INIT FILTERS

*/

// here are the update functions
function updateTBFilter(){
	var opt
	var filter = document.getElementById("filter-tb");
	for (i = 0; i < filters.testbeds.length;i++) {
		if (i == 0){
			opt = document.createElement("option");
			opt.value = 'All';
			opt.text =  'All';
			filter.add(opt);
		}
		opt = document.createElement("option");
		opt.value = filters.testbeds[i];
		opt.text =  filters.testbeds[i];

		filter.add(opt);
	}
	
	filter.selectedIndex = 0;
}

function updateYearFilter(){
	var opt
	var filter = document.getElementById("filter-year");
	for (i = 0; i < filters.years.length;i++) {
		if (i == 0){
			opt = document.createElement("option");
			opt.value = 'All';
			opt.text =  'All';
			filter.add(opt);
		}
		opt = document.createElement("option");
		opt.value = filters.years[i];
		opt.text =  filters.years[i];

		filter.add(opt);
	}
	
	//filter.selectedIndex = 0;
	filter.selectedIndex = filters.years.length;
}

function updateMonthFilter(){
	var opt
	var filter = document.getElementById("filter-month");
	for (i = 0; i < filters.months.length;i++) {
		
		if (i == 0){
			opt = document.createElement("option");
			opt.value = 'All';
			opt.text =  'All';
			filter.add(opt);
		}
		opt = document.createElement("option");
		opt.value = filters.months[i];
		opt.text =  monthNames[filters.months[i]];

		filter.add(opt);
	}
	
	filter.selectedIndex = filters.months.length;
}

function updateDayNameFilter(){
	var opt
	var filter = document.getElementById("filter-day");
	for (i = 0; i < filters.days.length;i++) {
		if (i == 0){
			opt = document.createElement("option");
			opt.value = 'All';
			opt.text =  'All';
			filter.add(opt);
			
			opt = document.createElement("option");
			opt.value = 'WeekDays';
			opt.text =  'WeekDays';
			filter.add(opt);
			
			opt = document.createElement("option");
			opt.value = 'WeekEnds';
			opt.text =  'WeekEnds';
			filter.add(opt);
			
			
		}
		opt = document.createElement("option");
		opt.value = filters.days[i];
		opt.text =  dayNames[filters.days[i]];
		filter.add(opt);
	}
	
	filter.selectedIndex = 0;
}

function updatePlotTypeFilter(){
	var opt
	var filter = document.getElementById("plot-type");
	for (i = 0; i < filters.plots.length;i++) {

		opt = document.createElement("option");
		opt.value = filters.plots[i];
		opt.text =  filters.plots[i];

		filter.add(opt);
	}
	
	filter.selectedIndex = 0;
	
	var filter = document.getElementById("plot-type2");
	for (i = 0; i < filters.plots2.length;i++) {

		opt = document.createElement("option");
		opt.value = filters.plots2[i];
		opt.text =  filters.plots2[i];

		filter.add(opt);
	}
}

/*

FUNCTION UPON CHANGE OF FILTER VALUE

*/

function filteronChange(){
	var tmp = document.getElementById('filter-tb');var tb = tmp.options[tmp.selectedIndex].innerHTML ;
	var tmp = document.getElementById('filter-year');var y = tmp.options[tmp.selectedIndex].innerHTML ;
	var tmp = document.getElementById('filter-month');var m = tmp.options[tmp.selectedIndex].innerHTML ;
	var tmp = document.getElementById('filter-day');var d = tmp.options[tmp.selectedIndex].innerHTML ;
	
	// Update filter value
	
	myFilter = {
		year : y,
		month : monthNames.indexOf(m),
		month2 : m,
		dayname: dayNames.indexOf(d),
		dayname2: d,
		testbed: tb
	};

	// Launch graph update 
	PlotAll();

	return 
}

// runan update when loading page
updateTBFilter();
updateYearFilter();
updateMonthFilter();
updateDayNameFilter();
updatePlotTypeFilter();

/*

Init window (Data plotting)

*/
var myFilter; // This is the global filter
filteronChange()








