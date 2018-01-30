
<!DOCTYPE html>
<html lang="eng">
    <head>
        <meta charset="utf-8">
		<title>$title</title>
		<link rel="stylesheet" type="text/css" href="/css/navigation.css">
		<link rel="stylesheet" href="css/theme.css"><!-- Theme used for page -->
		$cssBlock()
	</head>
	
	<body>
		<div id="navigation">
			<ul class="horizontal gray">
			#for $nav_item in $nav_menu
				#if $nav_activeitem == $nav_item['cpyref']
					<li><a href="$nav_item['cpyref']" class="active">$nav_item['name']</a></li>
				#else
					<li><a href="$nav_item['cpyref']" class="inactive">$nav_item['name']</a></li>
				#end if
			#end for
			</ul>
		</div>
		

		$contentBlock()
		
		<script>
			$scriptBlock()
		</script>
	</body>

</html>

