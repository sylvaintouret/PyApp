#from Cheetah.Template import Template
#extends Template

#include './data/templates/layouts/main.mako'

#def contentBlock
	<div class="flex-container" id="filters-bar">
		<div class="flex-item">
			<div class="x_title">
				
				<h1 id="page-title">DOWNTIME STATE ANALYSIS</h1>
			</div>
			<div class="x_content">
				<p style="text-align:right; margin-right:2%"> 
					TestBeds &nbsp;&nbsp;&nbsp;&nbsp;
					<select class="select-style" id="filter-tb"   onchange="filteronChange()"></select>&nbsp;&nbsp; | &nbsp;&nbsp;
					Years &nbsp;&nbsp;&nbsp;&nbsp;
					<select class="select-style" id="filter-year"  onchange="filteronChange()"></select>&nbsp;&nbsp; | &nbsp;&nbsp;
					Months &nbsp;&nbsp;&nbsp;&nbsp;
					<select class="select-style" id="filter-month"  onchange="filteronChange()"></select>&nbsp;&nbsp; | &nbsp;&nbsp;
					Days &nbsp;&nbsp;&nbsp;&nbsp;
					<select class="select-style" id="filter-day"   onchange="filteronChange()"></select> 
				</p>
			</div>
		</div>
	</div>


	<div class="flex-container" id="zone-plot">
		<div class="flex-item">
			<div class="x_title">
				<h2>ALL DATA
					<select class="select-style" id="plot-type" style="float:right;width:20%;"  onchange="changeplotType1()"></select>
				</h2>
				
			</div>
			<div class="x_content">
				<div id="myChart1"></div>
				<p> 
					<input type="checkbox" id="legend-hide" onchange="toggleLegend()" class="css-checkbox med">
					<label for="legend-hide" class="css-label med elegant">Show legend</label> 
				</p>
				
			</div>
		</div>
		<div class="flex-item">
			<div class="x_title">
				<h2>TOP ANALYSIS
				<select class="select-style" id="plot-type2" style="float:right;width:20%;"  onchange="changeplotType2()"></select>
				</h2>
			</div>
			<div class="x_content">
				<div id="myChart2"></div>
				<p>
					<input type="checkbox" id="legend-hide2" onchange="toggleLegend2()" class="css-checkbox med">
					<label for="legend-hide2" class="css-label med elegant">Show legend</label> 
					&nbsp;&nbsp;&nbsp;&nbsp; 
					<!-- <input type="checkbox" id="legend-hide2"  style="margin-top:1px;"  onchange="toggleLegend2()">&nbsp;&nbsp;&nbsp;&nbsp; -->
					Group values below &nbsp;&nbsp; 
					<input type="number" id="filter-below" class="css-input" value="1"  onchange="changeplotType2()">&nbsp;&nbsp; %
				</p>
			</div>
		</div>
	
	</div>
	
	<script type="text/javascript" src="js/DB.json"></script> <!-- Load the JSON database -->
	
	<script type="text/javascript" src="js/initPage.js"></script> 
	
	<script type="text/javascript" src="js/loadData.js"></script> 
	
	<script type="text/javascript" src="js/plotData.js"></script> <!-- Functions used for plotting -->
	
	<script type="text/javascript" src="js/loadFilters.js"></script>  <!-- Load all filters -->
#end def

#def cssBlock
	<link rel="stylesheet" href="css/checkbox.css"><!-- Checkboxes -->
	<!-- CSS -->
	<link href="./dist/c3/c3.css" rel="stylesheet">
	<link href="./dist/chosen/chosen.min.css" rel="stylesheet">
	
    <!-- Load d3.js and c3.js -->
    <script src="./dist/c3/node_modules/d3/d3.min.js" charset="utf-8"></script>
    <script src="./dist/c3/c3.min.js"></script>
	<!-- Load JQUERY -->
	<script src="./dist/jquery/dist/jquery.min.js"></script>
	<!-- Load chosen.js -->
	<script src="./dist/chosen/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/initChosen.js"></script>  <!-- Init chosen -->

#end def

#def scriptBlock
#end def
