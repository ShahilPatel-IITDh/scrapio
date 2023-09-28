
				const lazyloadRunObserver = () => {
					const dataAttribute = 'data-e-bg-lazyload';
					const lazyloadBackgrounds = document.querySelectorAll( `[${ dataAttribute }]:not(.lazyloaded)` );
					const lazyloadBackgroundObserver = new IntersectionObserver( ( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							let lazyloadBackground = entry.target;
							const lazyloadSelector = lazyloadBackground.getAttribute( dataAttribute );
							if ( lazyloadSelector ) {
								lazyloadBackground = entry.target.querySelector( lazyloadSelector );
							}
							if( lazyloadBackground ) {
								lazyloadBackground.classList.add( 'lazyloaded' );
							}
							lazyloadBackgroundObserver.unobserve( entry.target );
						}
					});
					}, { rootMargin: '100px 0px 100px 0px' } );
					lazyloadBackgrounds.forEach( ( lazyloadBackground ) => {
						lazyloadBackgroundObserver.observe( lazyloadBackground );
					} );
				};
				const events = [
					'DOMContentLoaded',
					'elementor/lazyload/observe',
				];
				events.forEach( ( event ) => {
					document.addEventListener( event, lazyloadRunObserver );
				} );
			