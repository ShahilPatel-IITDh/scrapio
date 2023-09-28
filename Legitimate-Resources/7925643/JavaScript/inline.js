
	$(document).ready(function(){

		/* Funktionen zum anzeigen und Schließen der Rechtstexte in Modalfenster */
		$(".overlayClose").click(function(){
			$('.overlay,.overlayBox,.overlay-background').removeClass('visible');
		});
		$(".overlay-background").click(function(){
			$('.overlay,.overlayBox,.overlay-background').removeClass('visible');
		});
		$('.overlayLink').click(function(){
			if( $(this).hasClass('showSponsor') == false ){
				var id = $(this).attr('id');
				$('.overlay,.overlay-background,#overlayBox'+id).addClass('visible');	
			}
		});
	});
