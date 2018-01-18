#from Cheetah.Template import Template
#extends Template

#include './data/templates/layouts/main.mako'

#import sqlite3

#def contentBlock
	##here we will publish a table with all the database columns
	<div id="content">
		<input type="text" id="myInput" onkeyup="filterPerTB()" placeholder="Search for testbed name.." title="Type in a name">
		## table css
		<table id="databaseviewer">
		
			## create header line 
			<tr>
			#for $desc in $db.description
				<th>$desc[0]</th>
			#end for
			</tr>

			
			## populates the entire table with query results
			#set $rows = $db.fetchall()
			#for $row in $rows
				<tr>
				#for $x in $row
					<td align="right" style="padding:1px 4px"> $x </td>
				#end for
				</tr>
			#end for

		</table>
	</div>
#end def

#def cssBlock
	<link rel="stylesheet" type="text/css" href="/css/dbviewer.css">
#end def

#def scriptBlock
	function filterPerTB() {
	  var input, filters, table, tr, td, i, tds,filter,show;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("databaseviewer");
	  tr = table.getElementsByTagName("tr");
	  for (i = 0; i < tr.length; i++) {
		found = 0;
		tds = tr[i].getElementsByTagName("td")
		td = ""				
		
		for (j =0;j<tds.length;j++){
			td += " " + tds[j].innerHTML;
		}
		
		if (td && tds.length>0) {
			filters = filter.split(" "); // get all filter requested
			show = true;
			for (j=0;j<filters.length;j++){
				show = show && (td.toUpperCase().indexOf(filters[j]) > -1)
			}
			
			// Make the decision to show or not
			if (show) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	  }
	}
#end def

