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
/*
 * jQuery FlexSlider v2.5.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);

              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { 
                slide.attr( 'data-thumb-alt', '' ); 
              }
              
              item = $( '<a></a>' ).attr( 'href', '#' ).text( j );
              if ( slider.vars.controlNav === "thumbnails" ) {
                item = $( '<img/>' ).attr( 'src', slide.attr( 'data-thumb' ) );
              }
              
              if ( '' !== slide.attr( 'data-thumb-alt' ) ) {
                item.attr( 'alt', slide.attr( 'data-thumb-alt' ) );
              }

              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { 
                  var caption = $('<span></span>' ).addClass( namespace + 'caption' ).text( captn );
                  item.append( caption );
                }
              }
              
              var liElement = $( '<li>' );
              item.appendTo( liElement );
              liElement.append( '</li>' );

              slider.controlNavScaffold.append(liElement);
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);
;
/**
 * Flexslider for galleries
 */

( function( $ ) {
	$(window).on( 'load post-load', function() {
		$('.flexslider').flexslider({
			animation: "slide",
			itemWidth: 982,
			itemMargin: 0,
			directionNav: false
		});
	});
} )( jQuery );
;
/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function() {
	var container, button, menu, links, subMenus;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	// Fix child menus for touch devices.
	function fixMenuTouchTaps( container ) {
		var touchStartFn,
		    parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for( var i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( var i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false )
			}
		}
	}

	fixMenuTouchTaps( container );
} )();
;
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
;
!function(){"use strict";var e,t={noop:function(){},texturize:function(e){return(e=(e=(e=(e+="").replace(/'/g,"&#8217;").replace(/&#039;/g,"&#8217;")).replace(/"/g,"&#8221;").replace(/&#034;/g,"&#8221;").replace(/&quot;/g,"&#8221;").replace(/[\u201D]/g,"&#8221;")).replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g,'$1="$2"')).trim()},applyReplacements:function(e,t){if(e)return t?e.replace(/{(\d+)}/g,(function(e,r){return void 0!==t[r]?t[r]:e})):e},getBackgroundImage:function(e){var t=document.createElement("canvas"),r=t.getContext&&t.getContext("2d");if(e){r.filter="blur(20px) ",r.drawImage(e,0,0);var o=t.toDataURL("image/png");return t=null,o}}},r=function(){function e(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function r(e,t,r,o){if(!e)return o();e.style.removeProperty("display"),e.style.opacity=t,e.style.transition="opacity 0.2s",e.style.pointerEvents="none";var a=function(t){t.target===e&&"opacity"===t.propertyName&&(e.style.removeProperty("transition"),e.style.removeProperty("opacity"),e.style.removeProperty("pointer-events"),e.removeEventListener("transitionend",a),e.removeEventListener("transitioncancel",a),o())};requestAnimationFrame((function(){requestAnimationFrame((function(){e.addEventListener("transitionend",a),e.addEventListener("transitioncancel",a),e.style.opacity=r}))}))}return{closest:function(t,r){if(t.closest)return t.closest(r);var o=t;do{if(e(o,r))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null},matches:e,hide:function(e){e&&(e.style.display="none")},show:function(e){e&&(e.style.display="block")},fadeIn:function(e,o){r(e,"0","1",o=o||t.noop)},fadeOut:function(e,o){o=o||t.noop,r(e,"1","0",(function(){e&&(e.style.display="none"),o()}))},scrollToElement:function(e,t,r){if(!e||!t)return r?r():void 0;var o=t.querySelector(".jp-carousel-info-extra");o&&(o.style.minHeight=window.innerHeight-64+"px");var a=!0,i=Date.now(),n=t.scrollTop,l=Math.max(0,e.offsetTop-Math.max(0,window.innerHeight-function(e){var t=e.querySelector(".jp-carousel-info-footer"),r=e.querySelector(".jp-carousel-info-extra"),o=e.querySelector(".jp-carousel-info-content-wrapper");if(t&&r&&o){var a=window.getComputedStyle(r),i=parseInt(a.paddingTop,10)+parseInt(a.paddingBottom,10);return i=isNaN(i)?0:i,o.offsetHeight+t.offsetHeight+i}return 0}(t)))-t.scrollTop;function s(){a=!1}l=Math.min(l,t.scrollHeight-window.innerHeight),t.addEventListener("wheel",s),function e(){var c,u=Date.now(),d=(c=(u-i)/300)<.5?2*c*c:1-Math.pow(-2*c+2,2)/2,p=(d=d>1?1:d)*l;if(t.scrollTop=n+p,u<=i+300&&a)return requestAnimationFrame(e);r&&r(),o&&(o.style.minHeight=""),a=!1,t.removeEventListener("wheel",s)}()},getJSONAttribute:function(e,t){if(e&&e.hasAttribute(t))try{return JSON.parse(e.getAttribute(t))}catch(e){return}},convertToPlainText:function(e){var t=document.createElement("div");return t.textContent=e,t.innerHTML},stripHTML:function(e){return e.replace(/<[^>]*>?/gm,"")},emitEvent:function(e,t,r){var o;try{o=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:r||null})}catch(e){(o=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,r||null)}e.dispatchEvent(o)},isTouch:function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}}}();function o(){var o,a,i,n,l="",s=!1,c="div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, figure.wp-block-gallery.has-nested-images, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery",u=".gallery-item, .tiled-gallery-item, .blocks-gallery-item,  .tiled-gallery__item",d=u+", .wp-block-image",p={},m="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.stat?wpcom.carousel.stat:t.noop,g="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.pageview?wpcom.carousel.pageview:t.noop;function h(t){if(!s)switch(t.which){case 38:t.preventDefault(),p.overlay.scrollTop-=100;break;case 40:t.preventDefault(),p.overlay.scrollTop+=100;break;case 39:t.preventDefault(),e.slideNext();break;case 37:case 8:t.preventDefault(),e.slidePrev();break;case 27:t.preventDefault(),b()}}function f(){s=!0}function v(){s=!1}function y(){p.overlay||(p.overlay=document.querySelector(".jp-carousel-overlay"),p.container=p.overlay.querySelector(".jp-carousel-wrap"),p.gallery=p.container.querySelector(".jp-carousel"),p.info=p.overlay.querySelector(".jp-carousel-info"),p.caption=p.info.querySelector(".jp-carousel-caption"),p.commentField=p.overlay.querySelector("#jp-carousel-comment-form-comment-field"),p.emailField=p.overlay.querySelector("#jp-carousel-comment-form-email-field"),p.authorField=p.overlay.querySelector("#jp-carousel-comment-form-author-field"),p.urlField=p.overlay.querySelector("#jp-carousel-comment-form-url-field"),window.innerWidth<=760&&Math.round(window.innerWidth/760*110)<40&&r.isTouch(),[p.commentField,p.emailField,p.authorField,p.urlField].forEach((function(e){e&&(e.addEventListener("focus",f),e.addEventListener("blur",v))})),p.overlay.addEventListener("click",(function(e){var t,o,a=e.target,i=!!r.closest(a,".jp-carousel-close-hint"),n=!!window.matchMedia("(max-device-width: 760px)").matches;if(a===p.overlay){if(n)return;b()}else if(i)b();else if(a.classList.contains("jp-carousel-image-download"))m("download_original_click");else if(a.classList.contains("jp-carousel-comment-login"))t=p.currentSlide,o=t?t.attrs.attachmentId:"0",window.location.href=jetpackCarouselStrings.login_url+"%23jp-carousel-"+o;else if(r.closest(a,"#jp-carousel-comment-form-container"))!function(e){var t=e.target,o=r.getJSONAttribute(p.container,"data-carousel-extra")||{},a=p.currentSlide.attrs.attachmentId,i=document.querySelector("#jp-carousel-comment-form-submit-and-info-wrapper"),n=document.querySelector("#jp-carousel-comment-form-spinner"),l=document.querySelector("#jp-carousel-comment-form-button-submit"),s=document.querySelector("#jp-carousel-comment-form");if(p.commentField&&p.commentField.getAttribute("id")===t.getAttribute("id"))f(),r.show(i);else if(r.matches(t,'input[type="submit"]')){e.preventDefault(),e.stopPropagation(),r.show(n),s.classList.add("jp-carousel-is-disabled");var c={action:"post_attachment_comment",nonce:jetpackCarouselStrings.nonce,blog_id:o.blog_id,id:a,comment:p.commentField.value};if(!c.comment.length)return void w(jetpackCarouselStrings.no_comment_text,!1);if(1!==Number(jetpackCarouselStrings.is_logged_in)&&(c.email=p.emailField.value,c.author=p.authorField.value,c.url=p.urlField.value,1===Number(jetpackCarouselStrings.require_name_email))){if(!c.email.length||!c.email.match("@"))return void w(jetpackCarouselStrings.no_comment_email,!1);if(!c.author.length)return void w(jetpackCarouselStrings.no_comment_author,!1)}var u=new XMLHttpRequest;u.open("POST",jetpackCarouselStrings.ajaxurl,!0),u.setRequestHeader("X-Requested-With","XMLHttpRequest"),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),u.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&this.status>=200&&this.status<300){var e;try{e=JSON.parse(this.response)}catch(e){return void w(jetpackCarouselStrings.comment_post_error,!1)}"approved"===e.comment_status?w(jetpackCarouselStrings.comment_approved,!0):"unapproved"===e.comment_status?w(jetpackCarouselStrings.comment_unapproved,!0):w(jetpackCarouselStrings.comment_post_error,!1),E(),q(a),l.value=jetpackCarouselStrings.post_comment,r.hide(n),s.classList.remove("jp-carousel-is-disabled")}else w(jetpackCarouselStrings.comment_post_error,!1)};var d=[];for(var m in c)if(m){var g=encodeURIComponent(m)+"="+encodeURIComponent(c[m]);d.push(g.replace(/%20/g,"+"))}var h=d.join("&");u.send(h)}}(e);else if(r.closest(a,".jp-carousel-photo-icons-container")||a.classList.contains("jp-carousel-photo-title"))!function(e){e.preventDefault();var t=e.target,o=p.info.querySelector(".jp-carousel-info-extra"),a=p.info.querySelector(".jp-carousel-image-meta"),i=p.info.querySelector(".jp-carousel-comments-wrapper"),n=p.info.querySelector(".jp-carousel-icon-info"),l=p.info.querySelector(".jp-carousel-icon-comments");function s(){l&&l.classList.remove("jp-carousel-selected"),n.classList.toggle("jp-carousel-selected"),i&&i.classList.remove("jp-carousel-show"),a&&(a.classList.toggle("jp-carousel-show"),a.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}function c(){n&&n.classList.remove("jp-carousel-selected"),l.classList.toggle("jp-carousel-selected"),a&&a.classList.remove("jp-carousel-show"),i&&(i.classList.toggle("jp-carousel-show"),i.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}(r.closest(t,".jp-carousel-icon-info")||t.classList.contains("jp-carousel-photo-title"))&&(a&&a.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,s):(s(),r.scrollToElement(p.info,p.overlay))),r.closest(t,".jp-carousel-icon-comments")&&(i&&i.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,c):(c(),r.scrollToElement(p.info,p.overlay)))}(e);else if(!r.closest(a,".jp-carousel-info"))return})),window.addEventListener("keydown",h),p.overlay.addEventListener("jp_carousel.afterOpen",(function(){v(),p.slides.length<=1||(p.slides.length<=5?r.show(p.info.querySelector(".jp-swiper-pagination")):r.show(p.info.querySelector(".jp-carousel-pagination")))})),p.overlay.addEventListener("jp_carousel.beforeClose",(function(){f(),document.documentElement.style.removeProperty("height"),e&&e.enable(),r.hide(p.info.querySelector(".jp-swiper-pagination")),r.hide(p.info.querySelector(".jp-carousel-pagination"))})),p.overlay.addEventListener("jp_carousel.afterClose",(function(){window.history.pushState?history.pushState("",document.title,window.location.pathname+window.location.search):window.location.href="",l="",p.isOpen=!1})),p.overlay.addEventListener("touchstart",(function(e){e.touches.length>1&&e.preventDefault()})))}function w(e,t){var o=p.overlay.querySelector("#jp-carousel-comment-post-results"),a="jp-carousel-comment-post-"+(t?"success":"error");o.innerHTML='<span class="'+a+'">'+e+"</span>",r.hide(p.overlay.querySelector("#jp-carousel-comment-form-spinner")),p.overlay.querySelector("#jp-carousel-comment-form").classList.remove("jp-carousel-is-disabled"),r.show(o)}function j(){var e=document.querySelectorAll("a img[data-attachment-id]");Array.prototype.forEach.call(e,(function(e){var t=e.parentElement,o=t.parentElement;if(!o.classList.contains("gallery-icon")&&!r.closest(o,u)&&t.hasAttribute("href")){var a=!1;t.getAttribute("href").split("?")[0]===e.getAttribute("data-orig-file").split("?")[0]&&1===Number(jetpackCarouselStrings.single_image_gallery_media_file)&&(a=!0),t.getAttribute("href")===e.getAttribute("data-permalink")&&(a=!0),a&&(t.classList.add("single-image-gallery"),t.setAttribute("data-carousel-extra",JSON.stringify({blog_id:Number(jetpackCarouselStrings.blog_id)})))}}))}function S(o){(!o||o<0||o>p.slides.length)&&(o=0),p.currentSlide=p.slides[o];var a,i,n=p.currentSlide,s=n.attrs.attachmentId;!function(e){var t=e.el,r=e.attrs,o=t.querySelector("img");if(!o.hasAttribute("data-loaded")){var a=!!r.previewImage,i=r.thumbSize;!a||i&&t.offsetWidth>i.width?o.src=r.src:o.src=r.previewImage,o.setAttribute("itemprop","image"),o.setAttribute("data-loaded",1)}}(p.slides[o]),1!==Number(jetpackCarouselStrings.display_background_image)||p.slides[o].backgroundImage||function(t){var r=t.el;e&&e.slides&&(r=e.slides[e.activeIndex]);var o=t.attrs.originalElement;o.complete&&0!==o.naturalHeight?A(t,r,o):o.onload=function(){A(t,r,o)}}(p.slides[o]),r.hide(p.caption),function(e){var t,o,a,i,n="",l="",s="";if(t=p.overlay.querySelector(".jp-carousel-photo-caption"),o=p.overlay.querySelector(".jp-carousel-caption"),a=p.overlay.querySelector(".jp-carousel-photo-title"),i=p.overlay.querySelector(".jp-carousel-photo-description"),r.hide(t),r.hide(o),r.hide(a),r.hide(i),n=k(e.caption)||"",l=k(e.title)||"",s=k(e.desc)||"",(n||l||s)&&(n&&(t.innerHTML=n,o.innerHTML=n,r.show(t),r.show(o)),r.stripHTML(n)===r.stripHTML(l)&&(l=""),r.stripHTML(n)===r.stripHTML(s)&&(s=""),r.stripHTML(l)===r.stripHTML(s)&&(s=""),s&&(i.innerHTML=s,r.show(i),l||n||(t.innerHTML=r.stripHTML(s),r.show(t))),l)){var c=r.stripHTML(l);a.innerHTML=c,n||(t.innerHTML=c,o.innerHTML=c,r.show(t)),r.show(a)}}({caption:n.attrs.caption,title:n.attrs.title,desc:n.attrs.desc}),function(e){if(!e||1!==Number(jetpackCarouselStrings.display_exif))return!1;var t=p.info.querySelector(".jp-carousel-image-meta ul.jp-carousel-image-exif"),r="";for(var o in e){var a=e[o],i=jetpackCarouselStrings.meta_data||[];if(0!==parseFloat(a)&&a.length&&-1!==i.indexOf(o)){switch(o){case"focal_length":a+="mm";break;case"shutter_speed":a=x(a);break;case"aperture":a="f/"+a}r+="<li><h5>"+jetpackCarouselStrings[o]+"</h5>"+a+"</li>"}}t.innerHTML=r,t.style.removeProperty("display")}(p.slides[o].attrs.imageMeta),function(e){if(!e)return!1;var r,o=[e.attrs.origWidth,e.attrs.origHeight],a=document.createElement("a");a.href=e.attrs.src.replace(/\?.+$/,""),r=null!==a.hostname.match(/^i[\d]{1}\.wp\.com$/i)?a.href:e.attrs.origFile.replace(/\?.+$/,"");var i=p.info.querySelector(".jp-carousel-download-text"),n=p.info.querySelector(".jp-carousel-image-download");i.innerHTML=t.applyReplacements(jetpackCarouselStrings.download_original,o),n.setAttribute("href",r),n.style.removeProperty("display")}(n),1===Number(jetpackCarouselStrings.display_comments)&&(a=p.slides[o].attrs.commentsOpened,i=p.container.querySelector(".jp-carousel-comment-form-container"),1===parseInt(a,10)?r.fadeIn(i):r.fadeOut(i),q(s),r.hide(p.info.querySelector("#jp-carousel-comment-post-results")));var c=p.info.querySelector(".jp-carousel-pagination");if(c&&p.slides.length>5){var u=o+1;c.innerHTML="<span>"+u+" / "+p.slides.length+"</span>"}jetpackCarouselStrings.stats&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?"+jetpackCarouselStrings.stats+"&post="+encodeURIComponent(s)+"&rand="+Math.random()),g(s),window.location.hash=l="#jp-carousel-"+s}function b(){document.body.style.overflow=a,document.documentElement.style.overflow=i,E(),f(),r.emitEvent(p.overlay,"jp_carousel.beforeClose"),window.scrollTo(window.scrollX||window.pageXOffset||0,n||0),e.destroy(),p.isOpen=!1,p.slides=[],p.currentSlide=void 0,p.gallery.innerHTML="",r.fadeOut(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterClose")}))}function L(e,t,r){var o=r?e.replace(/.*=([\d]+%2C[\d]+).*$/,"$1"):e.replace(/.*-([\d]+x[\d]+)\..+$/,"$1"),a=o!==e?r?o.split("%2C"):o.split("x"):[t,0];return"9999"===a[0]&&(a[0]="0"),"9999"===a[1]&&(a[1]="0"),a}function x(e){return e>=1?Math.round(10*e)/10+"s":"1/"+Math.round(1/e)+"s"}function k(e){return!e.match(" ")&&e.match("_")?"":e}function q(e,t){var a=void 0===t,i=p.info.querySelector(".jp-carousel-icon-comments .jp-carousel-has-comments-indicator");if(i.classList.remove("jp-carousel-show"),clearInterval(o),e){(!t||t<1)&&(t=0);var n=p.info.querySelector(".jp-carousel-comments"),l=p.info.querySelector("#jp-carousel-comments-loading");r.show(l),a&&(r.hide(n),n.innerHTML="");var s=new XMLHttpRequest,c=jetpackCarouselStrings.ajaxurl+"?action=get_attachment_comments&nonce="+jetpackCarouselStrings.nonce+"&id="+e+"&offset="+t;s.open("GET",c),s.setRequestHeader("X-Requested-With","XMLHttpRequest");var u=function(){r.fadeIn(n),r.fadeOut(l)};s.onload=function(){if(p.currentSlide&&p.currentSlide.attrs.attachmentId===e){var c,d=s.status>=200&&s.status<300;try{c=JSON.parse(s.responseText)}catch(e){}if(!d||!c||!Array.isArray(c))return u();a&&(n.innerHTML="");for(var m=0;m<c.length;m++){var g=c[m],h=document.createElement("div");h.classList.add("jp-carousel-comment"),h.setAttribute("id","jp-carousel-comment-"+g.id),h.innerHTML='<div class="comment-gravatar">'+g.gravatar_markup+'</div><div class="comment-content"><div class="comment-author">'+g.author_markup+'</div><div class="comment-date">'+g.date_gmt+"</div>"+g.content+"</div>",n.appendChild(h),clearInterval(o),o=setInterval((function(){p.container.scrollTop+150>window.innerHeight&&(q(e,t+10),clearInterval(o))}),300)}c.length>0&&(r.show(n),i.innerText=c.length,i.classList.add("jp-carousel-show")),r.hide(l)}},s.onerror=u,s.send()}}function A(e,r,o){var a=t.getBackgroundImage(o);e.backgroundImage=a,r.style.backgroundImage="url("+a+")",r.style.backgroundSize="cover"}function E(){p.commentField&&(p.commentField.value="")}function H(e,o){p.slides=[];var a={width:window.innerWidth,height:window.innerHeight-64};0!==o&&((new Image).src=e[o].getAttribute("data-gallery-src"));var i=!!r.closest(e[0],".tiled-gallery.type-rectangular");Array.prototype.forEach.call(e,(function(e,o){var n=r.closest(e,"a"),l=e.getAttribute("data-orig-file")||e.getAttribute("src-orig"),s=e.getAttribute("data-attachment-id")||e.getAttribute("data-id")||"0",c=document.querySelector('img[data-attachment-id="'+s+'"] + figcaption');c=c?c.innerHTML:e.getAttribute("data-image-caption");var u={originalElement:e,attachmentId:s,commentsOpened:e.getAttribute("data-comments-opened")||"0",imageMeta:r.getJSONAttribute(e,"data-image-meta")||{},title:e.getAttribute("data-image-title")||"",desc:e.getAttribute("data-image-description")||"",mediumFile:e.getAttribute("data-medium-file")||"",largeFile:e.getAttribute("data-large-file")||"",origFile:l||"",thumbSize:{width:e.naturalWidth,height:e.naturalHeight},caption:c||"",permalink:n&&n.getAttribute("href"),src:l||e.getAttribute("src")||""},d=r.closest(e,".tiled-gallery-item"),m=d&&d.querySelector(".tiled-gallery-caption"),g=m&&m.innerHTML;g&&(u.caption=g);var h=function(e){var t=e.getAttribute("data-orig-size")||"";if(t){var r=t.split(",");return{width:parseInt(r[0],10),height:parseInt(r[1],10)}}return{width:e.getAttribute("data-original-width")||e.getAttribute("width")||void 0,height:e.getAttribute("data-original-height")||e.getAttribute("height")||void 0}}(e);if(u.origWidth=h.width||u.thumbSize.width,u.origHeight=h.height||u.thumbSize.height,"undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.generateImgSrc?u.src=wpcom.carousel.generateImgSrc(e,a):u.src=function(e){if("object"!=typeof e&&(e={}),void 0===e.origFile)return"";if(void 0===e.origWidth||void 0===e.maxWidth)return e.origFile;if(void 0===e.mediumFile||void 0===e.largeFile)return e.origFile;var t=document.createElement("a");t.href=e.largeFile;var r=/^i[0-2]\.wp\.com$/i.test(t.hostname),o=L(e.mediumFile,e.origWidth,r),a=L(e.largeFile,e.origWidth,r),i=parseInt(a[0],10),n=parseInt(a[1],10),l=parseInt(o[0],10),s=parseInt(o[1],10);if(e.origMaxWidth=e.maxWidth,e.origMaxHeight=e.maxHeight,void 0!==window.devicePixelRatio&&window.devicePixelRatio>1&&(e.maxWidth=e.maxWidth*window.devicePixelRatio,e.maxHeight=e.maxHeight*window.devicePixelRatio),i>=e.maxWidth||n>=e.maxHeight)return e.largeFile;if(l>=e.maxWidth||s>=e.maxHeight)return e.mediumFile;if(r){var c=e.largeFile.lastIndexOf("?"),u=e.largeFile;return-1!==c&&(u=e.largeFile.substring(0,c),(e.origWidth>e.maxWidth||e.origHeight>e.maxHeight)&&(e.origMaxWidth=2*e.maxWidth,e.origMaxHeight=2*e.maxHeight,u+="?fit="+e.origMaxWidth+"%2C"+e.origMaxHeight)),u}return e.origFile}({origFile:u.src,origWidth:u.origWidth,origHeight:u.origHeight,maxWidth:a.width,maxHeight:a.height,mediumFile:u.mediumFile,largeFile:u.largeFile}),e.setAttribute("data-gallery-src",u.src),"0"!==u.attachmentId){u.title=t.texturize(u.title),u.desc=t.texturize(u.desc),u.caption=t.texturize(u.caption);var f=new Image;f.src=u.src;var v=document.createElement("div");v.classList.add("swiper-slide"),v.setAttribute("itemprop","associatedMedia"),v.setAttribute("itemscope",""),v.setAttribute("itemtype","https://schema.org/ImageObject");var y=document.createElement("div");y.classList.add("swiper-zoom-container"),p.gallery.appendChild(v),v.appendChild(y),y.appendChild(f),v.setAttribute("data-attachment-id",u.attachmentId),v.setAttribute("data-permalink",u.permalink),v.setAttribute("data-orig-file",u.origFile),i&&(u.previewImage=u.src);var w={el:v,attrs:u,index:o};p.slides.push(w)}}))}function T(e,t){if(!window.Swiper670){var o=document.querySelector("#jp-carousel-loading-overlay");r.show(o);var a=document.createElement("script");return a.id="jetpack-carousel-swiper-js",a.src=window.jetpackSwiperLibraryPath.url,a.async=!0,a.onload=function(){r.hide(o),C(e,t)},a.onerror=function(){r.hide(o)},void document.head.appendChild(a)}C(e,t)}function C(t,o){var l,s={imgSelector:".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]",startIndex:0},c=r.getJSONAttribute(t,"data-carousel-extra");if(c&&(y(),!p.isOpen)){for(var u in p.isOpen=!0,a=getComputedStyle(document.body).overflow,document.body.style.overflow="hidden",i=getComputedStyle(document.documentElement).overflow,document.documentElement.style.overflow="hidden",n=window.scrollY||window.pageYOffset||0,p.container.setAttribute("data-carousel-extra",JSON.stringify(c)),m(["open","view_image"]),o||{})s[u]=o[u];-1===s.startIndex&&(s.startIndex=0),r.emitEvent(p.overlay,"jp_carousel.beforeOpen"),p.gallery.innerHTML="",p.overlay.style.opacity=1,p.overlay.style.display="block",H(t.querySelectorAll(s.imgSelector),s.startIndex),(e=new window.Swiper670(".jp-carousel-swiper-container",{centeredSlides:!0,zoom:!0,loop:p.slides.length>1,enabled:p.slides.length>1,pagination:{el:".jp-swiper-pagination",clickable:!0},navigation:{nextEl:".jp-swiper-button-next",prevEl:".jp-swiper-button-prev"},initialSlide:s.startIndex,on:{init:function(){S(s.startIndex)}},preventClicks:!1,preventClicksPropagation:!1,preventInteractionOnTransition:!r.isTouch(),threshold:5})).on("slideChange",(function(e){S(0===e.activeIndex?p.slides.length-1:e.activeIndex===p.slides.length+1?0:e.activeIndex-1),p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("zoomChange",(function(e,t){t>1&&p.overlay.classList.add("jp-carousel-hide-controls"),1===t&&p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("doubleTap",(function(e){if(clearTimeout(l),1===e.zoom.scale)var t=setTimeout((function(){p.overlay.classList.remove("jp-carousel-hide-controls"),clearTimeout(t)}),150)})),e.on("tap",(function(){e.zoom.scale>1&&(l=setTimeout((function(){p.overlay.classList.toggle("jp-carousel-hide-controls")}),150))})),r.fadeIn(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterOpen")}))}}document.body.addEventListener("click",(function(e){if(window.CSS&&window.CSS.supports&&window.CSS.supports("display","grid")){var t,o=e.target,a=r.closest(o,c);if(a){if(!(t=a)||!t.getAttribute("data-carousel-extra"))return;var i=o.parentElement,n=i.parentElement,l=null;if(n&&n.classList.contains("wp-block-image")?l=i.getAttribute("href"):i&&i.classList.contains("wp-block-image")&&i.querySelector(":scope > a")&&(l=i.querySelector(":scope > a").getAttribute("href")),l&&l.split("?")[0]!==o.getAttribute("data-orig-file").split("?")[0]&&l!==o.getAttribute("data-permalink"))return;if(i.classList.contains("gallery-caption"))return;if(r.matches(i,"figcaption"))return;document.documentElement.style.height="auto",e.preventDefault(),e.stopPropagation();var s=r.closest(o,d),u=Array.prototype.indexOf.call(a.querySelectorAll(d),s);T(a,{startIndex:u})}}})),1===Number(jetpackCarouselStrings.single_image_gallery)&&(j(),document.body.addEventListener("is.post-load",(function(){j()}))),window.addEventListener("hashchange",(function(){var t=/jp-carousel-(\d+)/;if(window.location.hash&&t.test(window.location.hash)){if(window.location.hash!==l||!p.isOpen)if(window.location.hash&&p.gallery&&!p.isOpen&&history.back)history.back();else{l=window.location.hash;for(var r,o,a=window.location.hash.match(t),i=parseInt(a[1],10),n=document.querySelectorAll(c),s=0;s<n.length;s++){for(var u,d=n[s],m=d.querySelectorAll("img"),g=0;g<m.length;g++)if(parseInt(m[g].getAttribute("data-attachment-id"),10)===i||parseInt(m[g].getAttribute("data-id"),10)===i){u=g;break}if(void 0!==u){r=d,o=u,p.isOpen?(S(o),e.slideTo(o+1)):T(r,{startIndex:o});break}}}}else p.isOpen&&b()})),window.location.hash&&r.emitEvent(window,"hashchange")}"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)}();;
