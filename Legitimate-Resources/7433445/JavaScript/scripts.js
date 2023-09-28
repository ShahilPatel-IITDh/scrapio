jQuery(function($) {
	function isInfogramInViewport(el){
		const rect = el[0].getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}

	function proccesInfograms(){
		const $infogram_containers = $('.js-infogram-embed');
		if( $infogram_containers.length > 0){
			$infogram_containers.each(function() {

				if(
					!$( this ).hasClass( 'infogram-embed' ) &&
					isInfogramInViewport( $( this ) )
				){
					$( this ).addClass( "infogram-embed" );

					if( window.InfogramEmbeds && window.InfogramEmbeds.initialized ){
						if( window.InfogramEmbeds.process ){
							window.InfogramEmbeds.process();
						}
					}else{
						let $scriptTags = $('script')
						let $infogramScript = document.createElement("script");

						$infogramScript.setAttribute('async', 1);
						$infogramScript.setAttribute('id', 'infogram-async');
						$infogramScript.setAttribute('src', 'https://e.infogram.com/js/dist/embed-loader-min.js');
						$infogramScript.setAttribute('type', 'text/javascript');

						$scriptTags.first().prepend($infogramScript);
					}
				}
			});
		}

		const $infogram_containers_v2 = $('.js-infogram-embed-v2');
		if( $infogram_containers_v2.length > 0){
			$infogram_containers_v2.each(function() {

				if(
					!$( this ).hasClass( 'infogram-embed-v2' ) &&
					isInfogramInViewport( $( this ) )
				){
					$( this ).addClass( "infogram-embed-v2" );

					let $id = $( this ).attr('data-id')
					let $scriptTags = $('script')
					let $infogramScript = document.createElement("script");

					$infogramScript.setAttribute('id', $id);
					$infogramScript.setAttribute('src', 'https://e.infogram.com/js/dist/embed.js?LQf');
					$infogramScript.setAttribute('type', 'text/javascript');

					$( this ).append($infogramScript);
				}
			});
		}
	}

	document.addEventListener("load", proccesInfograms, false);
	document.addEventListener("scroll", proccesInfograms, false);
});