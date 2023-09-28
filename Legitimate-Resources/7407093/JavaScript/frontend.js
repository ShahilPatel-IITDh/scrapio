window.addEventListener( 'load', () => {
	const editorPlusAnimationElements = document.querySelectorAll(
		'[class^="edplus_anim"], [class*=" edplus_anim"]'
	);

	editorPlusAnimationElements.forEach( ( animationElem ) => {
		const [ animationClass = '' ] = animationElem.className.match(
			/edplus_anim\-\S+/g
		);

		// Removing class.
		animationElem.style.visibility = 'hidden';
		animationElem.classList.remove( animationClass );

		const observer = new IntersectionObserver(
			( entries, observer ) => {
				const [ entry = null ] = entries;

				if ( entry && entry.intersectionRatio !== 0 ) {
					animationElem.style.visibility = 'visible';
					entry.target.classList.add( animationClass );
					observer.disconnect();
				}
			},
			{
				rootMargin: '0px',
				threshold: 0.25,
			}
		);

		observer.observe( animationElem );
	} );
} );
