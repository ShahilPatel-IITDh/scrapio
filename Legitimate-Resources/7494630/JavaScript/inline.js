

		// DO NOT REMOVE : GLOBAL FUNCTIONS!

		$(document).ready(function() {
			pageSetUp();

			var current_path = 'o/118030';

			$( "nav ul li a" ).each(function( index, element ) {
				if( $(this).attr('href') == current_path )
				{
					$(this).addClass('active');
				}

			});

		})

	