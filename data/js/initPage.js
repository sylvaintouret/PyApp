/*

In here we will init everything we need for plotting this page

*/

var colorsLight = [
	'rgba(40,195,30, 0.5)',
	'rgba(245,200,10, 0.5)',	
	'rgba(220,50,40, 0.5)',
	'rgba(60,160,185, 0.5)',
	'rgba(245,135,0, 0.5)',
	'rgba(29,103,153, 0.5)',
	'rgba(239,151,191, 0.5)',
	'rgba(156,36,29, 0.5)',	
	'rgba(175,175,175, 0.5)',	
	'rgba(246,92,142, 0.5)',	
	'rgba(60,135,60	, 0.5)',
	'rgba(175,60,185, 0.5)',	
	'rgba(74,211,203, 0.5)',	
	'rgba(206,45,113, 0.5)',	
	'rgba(46,119,140, 0.5)',	
	'rgba(127,190,160, 0.5)'
];

var colorsDark = [
	'rgba(104,194,77, 0.5)',	
	'rgba(241,199,71, 0.5)',
	'rgba(206,61,55, 0.5)',
	'rgba(47,151,175, 0.5)',
	'rgba(254,140,98, 0.5)',
	'rgba(37,97,153, 0.5)',
	'rgba(214,115,159, 0.5)',
	'rgba(140,19,19, 0.5)',
	'rgba(181,181,181, 0.5)',
	'rgba(212,87,127, 0.5)',
	'rgba(39,117,39, 0.5)',	
	'rgba(173,62,191, 0.5)',
	'rgba(70,204,197, 0.5)',
	'rgba(113,61,84, 0.5)',
	'rgba(47,124,142, 0.5)',
	'rgba(101,140,122, 0.5)'
];

var plotTypes= [ // Fist item will be default
	'Daily (Bar)',
	'Monthly (Bar)',
	'Daily (Line)',
	'Daily (Area)'
];

var plotTypes2= [ // Fist item will be default
	'Overall (Donut)',
	'Overall (Pie)',
	'Overall (Bar)',
];


var monthNames= [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

var dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

var currentFilter = {
		year : 'All',
		month : -1,
		month2 : 'All',
		dayname: -1,
		dayname2 : 'All',
		testbed: 'All'
	};


// This is the data that contains TB Activity. It will be setup by FilterOnChange function
var TBA_Data;