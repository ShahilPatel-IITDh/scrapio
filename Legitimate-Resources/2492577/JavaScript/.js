( function () {
	/* global sas */
	/* global wa_smart */

	sas.cmd.push( function () {
		sas.setup( {
			networkid: wa_smart.network_id,
			domain: 'https://www15.smartadserver.com',
			async: true,
		} );
	} );

	sas.cmd.push( function () {
		sas.call( 'onecall', {
			siteId: wa_smart.site_id,
			pageId: wa_smart.page_id,
			formats: wa_smart.formats,
			content_source_id: wa_smart.blog_id,
			target: wa_smart.target,
		} );
	} );

	sas.cmd.push( function () {
		sas.events.on( 'noad', function ( data ) {
			var el = document.getElementById( data.tagId );

			if ( ! el ) {
				return;
			}

			var target = el.closest( '.wordads-ad-wrapper' );
			var slotType = el.classList.contains( 'wordads-ad-inline' ) ? 'inline' : 'belowpost';

			wordads.insertFallbackAd( target, slotType );
		} );
	} );

	sas.cmd.push( function () {
		sas.events.on( 'load', function ( data ) {
			var el = document.getElementById( data.tagId );

			if ( ! el ) {
				return;
			}

			el.closest( '.wordads-ad-wrapper' ).style.display = 'inherit';
		} );
	} );

	// Process commands.
	wa_smart.cmd.forEach( ( cmd ) => {
		sas.cmd.push( cmd );
	} );

	wa_smart.cmd = {
		push: function ( cmd ) {
			sas.cmd.push( cmd );
		},
	};

	var wordads = wordads || {};

	wordads.trackStat = function ( stat ) {
		window._stq = window._stq || [];
		window._stq.push( [
			'extra',
			{
				x_wordads_smart: stat,
			},
		] );
	};

	wordads.createInlineAdSnippet = function ( tagId ) {
		var wrapper = document.createElement( 'div' );
		var ad = document.createElement( 'div' );
		var title = document.createElement( 'div' );
		var content = document.createElement( 'div' );
		var controls = document.createElement( 'div' );

		wrapper.classList.add( 'wordads-ad-wrapper' );
		ad.classList.add( 'wordads-ad' );
		title.classList.add( 'wordads-ad-title' );
		content.classList.add( 'wordads-ad-content' );
		content.classList.add( 'wordads-ad-inline' );
		controls.classList.add( 'wordads-ad-controls' );

		title.innerText = wa_smart.inline.title;
		content.id = tagId;
		controls.innerHTML = wa_smart.inline.gdpr;

		ad.appendChild( title );
		ad.appendChild( content );
		ad.appendChild( controls );

		wrapper.appendChild( ad );

		return wrapper;
	};

	wordads.insertInlineAdBefore = function ( element ) {
		var tagId = 'wordads-ad-' + parseInt( Math.random() * 1000000 );
		var snippet = wordads.createInlineAdSnippet( tagId );
		element.insertAdjacentElement( 'beforebegin', snippet );
		sas.cmd.push( function () {
			sas.call( 'std', {
				siteId: wa_smart.site_id,
				pageId: wa_smart.page_id,
				formatId: wa_smart.inline.format_id,
				tagId: tagId,
				content_source_id: wa_smart.blog_id,
				target: wa_smart.target,
			} );
		} );
	};

	wordads.insertFallbackAd = function ( target, slotType ) {
		var sas_fallback = window.sas_fallback || [];
		var slot_fallback = sas_fallback.filter( function ( fallback ) {
			return fallback.type === slotType;
		} );

		if ( slot_fallback.length === 0 ) {
			target.remove();
			return;
		}

		// Replace the macro to have a div with a unique id.
		var slot_fallback_tag = slot_fallback[ 0 ].tag.replaceAll(
			'{{unique_id}}',
			parseInt( Math.random() * 1000000 )
		);

		// Unescape the tag markup.
		var e = document.createElement( 'div' );
		e.innerHTML = slot_fallback_tag;
		slot_fallback_tag = e.childNodes[ 0 ].nodeValue;

		// Insert the fallback tag into a parent for helping to find the script tags.
		var parent = document.createElement( 'div' );
		parent.innerHTML = slot_fallback_tag;

		// Make our ad visible. Needed by IPONWEB to calculate the width of the container.
		target.style.display = 'inherit';

		// Inserting into target.
		target.innerHTML = parent.innerHTML;

		// Process any scripts in the tag.
		var scripts = parent.querySelectorAll( 'script' );
		scripts.forEach( function ( script ) {
			script.parentNode.removeChild( script );

			var scriptTag = document.createElement( 'script' );

			if ( script.src ) {
				scriptTag.src = script.src;
			} else if ( script.textContent ) {
				scriptTag.textContent = script.textContent;
			} else if ( script.innerText ) {
				scriptTag.innerText = script.innerText;
			}

			document.body.appendChild( scriptTag );
		} );
	};

	wordads.getChildrenByTag = function ( el, tag ) {
		var children = [];

		el.childNodes.forEach( ( child ) => {
			if ( child.nodeName === tag.toUpperCase() ) {
				children.push( child );
			}
		} );

		return children;
	};

	wordads.getFloatingElements = function ( el ) {
		var floating = [];

		// Get child nodes recursive.
		var children = el.getElementsByTagName( '*' );

		for ( var i = 0; i < children.length; i++ ) {
			var child = children[ i ];

			var computed = getComputedStyle( child );
			var position = computed.getPropertyValue( 'position' );
			var float = computed.getPropertyValue( 'float' );

			if ( position === 'relative' || position === 'absolute' || float !== 'none' ) {
				floating.push( child );
			}
		}

		return floating;
	};

	wordads.getElementGlobalPosition = function ( el ) {
		var rect = el.getBoundingClientRect();

		return {
			top: rect.top + window.scrollY,
			left: rect.left + window.scrollX,
			bottom: rect.top + window.scrollY + rect.height,
			right: rect.left + window.scrollX + rect.width,
		};
	};

	wordads.collidesWithElements = function ( target, elements ) {
		var targetRect = wordads.getElementGlobalPosition( target );

		var collides = false;

		elements.forEach( ( el ) => {
			var collideRect = wordads.getElementGlobalPosition( el );

			if (
				! (
					targetRect.bottom < collideRect.top ||
					targetRect.top > collideRect.bottom ||
					targetRect.right < collideRect.left ||
					targetRect.left > collideRect.left
				)
			) {
				collides = true;
			}
		} );

		return collides;
	};

	wordads.initializeInlineAds = function () {
		// Check if feature is enabled.
		if ( ! wa_smart.inline.enabled ) {
			return;
		}

		// Check for inline ads marker.
		var marker = document.getElementById( 'wordads-inline-marker' );

		// Stop if no marker is found.
		if ( ! marker ) {
			wordads.trackStat( 'inline_no_marker' );
			return;
		}

		// Get the post content area element based on marker position.
		var post = marker.parentElement;

		// Remove marker, we don't need it anymore.
		marker.remove();

		// Set threshold for maximum slots.
		var maxSlots = wa_smart.inline.max_slots;
		var maxBlazeSlots = wa_smart.inline.max_blaze_slots;
		var slotCount = 0;

		// Calculate insertion intervals based on ratio of viewport height.
		var viewportHeight = window.innerHeight;

		var initialViewportRatio = 1.35;
		var initialInsertionInterval = Math.ceil( viewportHeight * initialViewportRatio );

		var viewportRatio = 1.35;
		var insertionInterval = Math.ceil( viewportHeight * viewportRatio );

		// Calculate initial threshold.
		var postOffset = post.getBoundingClientRect().top + window.scrollY;
		var minThreshold = postOffset + initialInsertionInterval;

		// Loop through content to find slots to insert.
		var paras = wordads.getChildrenByTag( post, 'p' );

		// Get floating elements.
		var floating = wordads.getFloatingElements( post );

		paras.forEach( ( p ) => {
			var offset = p.getBoundingClientRect().top + window.scrollY;
			var previous = p.previousElementSibling;

			if (
				offset > minThreshold &&
				slotCount < maxSlots &&
				previous.nodeName === 'P' &&
				! wordads.collidesWithElements( p, floating )
			) {
				if ( maxBlazeSlots > slotCount ) {
					wordads.insertInlineAdBefore( p );
					wordads.trackStat( 'render_inline' );
				} else {
					// Need to wrap first.
					var target = document.createElement( 'div' );
					target.className = 'wordads-ad-wrapper';
					p.insertAdjacentElement( 'beforebegin', target );

					wordads.insertFallbackAd( target, 'inline' );
					wordads.trackStat( 'render_inline_fallback' );
				}

				minThreshold = offset + insertionInterval;
				slotCount++;
			}
		} );

		if ( slotCount === 0 ) {
			wordads.trackStat( 'inline_no_insert' );
		}
	};

	document.addEventListener( 'DOMContentLoaded', function () {
		wordads.initializeInlineAds();
	} );
} )();
;
( function() {
	var cookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)eucookielaw\s*\=\s*([^;]*).*$)|^.*$/, '$1' );
	var overlay = document.querySelector( '#eu-cookie-law' );
	var container = document.querySelector( '.widget_eu_cookie_law_widget' );
	var initialScrollPosition, scrollFunction;

	function remove( el ) {
		return el && el.parentElement && el.parentElement.removeChild( el );
	}

	function triggerDismissEvent() {
		try {
			const dismissEvent = new Event( 'eucookielaw-dismissed' );
			document.dispatchEvent( dismissEvent );
		} catch ( err ) { }
	}

	function removeOverlay() {
		remove( overlay );
		triggerDismissEvent();
	}

	function fade( el, type, fn ) {
		var duration = 400;

		el.style.display = 'block';
		el.style.transitionProperty = 'opacity';
		el.style.transitionDuration = duration + 'ms';
		el.style.opacity = type === 'in' ? 0 : 1;

		// Double rAF to ensure styles are applied cross-browser.
		requestAnimationFrame( function () {
			requestAnimationFrame( function() {
				el.style.opacity = type === 'in' ? 1 : 0;
				// Wait for animation.
				setTimeout( function () {
					// Clean up.
					el.style.removeProperty( 'opacity' );
					el.style.removeProperty( 'transition-property' );
					el.style.removeProperty( 'transition-duration' );

					if ( type === 'out' ) {
						el.style.display = 'none';
					}

					if ( typeof fn === 'function' ) {
						fn();
					}
				}, duration + 50 );
			} );
		} );
	}

	function appendWidget() {
		document.body.appendChild( container );
		overlay.style.display = 'block';
		fade( container, 'in' );
	}

	if ( typeof wp !== 'undefined' && !! wp.customize ) {
		appendWidget();
		return;
	}

	if ( ! overlay || ! container ) {
		return;
	}

	if ( overlay.classList.contains( 'ads-active' ) ) {
		var adsCookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)personalized-ads-consent\s*\=\s*([^;]*).*$)|^.*$/, '$1' );
		if ( cookieValue !== '' && adsCookieValue !== '' ) {
			removeOverlay();
		}
	} else if ( cookieValue !== '' ) {
		removeOverlay();
	}

	appendWidget();

	overlay.querySelector( 'form' ).addEventListener( 'submit', accept );

	if ( overlay.classList.contains( 'hide-on-scroll' ) ) {
		initialScrollPosition = window.pageYOffset;

		scrollFunction = function() {
			if ( Math.abs( window.pageYOffset - initialScrollPosition ) > 50 ) {
				accept();
			}
		};

		window.addEventListener( 'scroll', scrollFunction );
	} else if ( overlay.classList.contains( 'hide-on-time' ) ) {
		var timeout = parseInt( overlay.getAttribute( 'data-hide-timeout' ), 10 ) || 0;
		setTimeout( accept, timeout * 1000 );
	}

	var accepted = false;
	function accept( event ) {
		if ( accepted ) {
			return;
		}
		accepted = true;

		if ( event && event.preventDefault ) {
			event.preventDefault();
		}

		if ( overlay.classList.contains( 'hide-on-scroll' ) ) {
			window.removeEventListener( 'scroll', scrollFunction );
		}

		var expireTime = new Date();
		var consentExpiration = parseInt( overlay.getAttribute( 'data-consent-expiration' ), 10 ) || 0;
		expireTime.setTime( expireTime.getTime() + ( consentExpiration * 24 * 60 * 60 * 1000 ) );

		document.cookie = 'eucookielaw=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		if ( overlay.classList.contains( 'ads-active' ) && overlay.classList.contains( 'hide-on-button' ) ) {
			document.cookie = 'personalized-ads-consent=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		}

		fade( overlay, 'out', function() {
			removeOverlay();
			remove( container );
		} );
	}
} )();
;
