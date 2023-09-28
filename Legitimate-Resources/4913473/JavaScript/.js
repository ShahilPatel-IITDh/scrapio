/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
        clientHintSupport: {
                gravatar: false,
                files: false,
                photon: false,
                mshots: false,
                staticAssets: false,
                latex: false,
                imgpress: false,
        },
	useHints: false,
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

        hintsFor: function( service ) {
                if ( this.useHints === false ) {
                        return false;
                }
                if ( this.hints() === false ) {
                        return false;
                }
                if ( typeof this.clientHintSupport[service] === "undefined" ) {
                        return false;
                }
                if ( this.clientHintSupport[service] === true ) {
                        return true;
                }
                return false;
        },

	hints: function() {
		try {
			var chrome = window.navigator.userAgent.match(/\sChrome\/([0-9]+)\.[.0-9]+\s/)
			if (chrome !== null) {
				var version = parseInt(chrome[1], 10)
				if (isNaN(version) === false && version >= 46) {
					return true
				}
			}
		} catch (e) {
			return false
		}
		return false
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// Skip images that have srcset attributes.
			if ( imgs[i].hasAttribute('srcset') ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

                var isFiles = false;
                var isLatex = false;
                var isPhoton = false;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Skip CoBlocks Lightbox images
		if ( img.parentNode.className.match(/coblocks-lightbox__image/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
                        if ( this.hintsFor( "gravatar" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
                        if ( this.hintsFor( "mshots" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
                        if ( this.hintsFor( "imgpress" ) === true ) {
                                return false; 
                        }
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale files.wordpress.com, LaTeX, or Photon images (i#.wp.com)
		else if (
			( isFiles = img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/) ) ||
			( isLatex = img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) ||
			( isPhoton = img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/) )
		) {
                        if ( false !== isFiles && this.hintsFor( "files" ) === true ) {
                                return false
                        }
                        if ( false !== isLatex && this.hintsFor( "latex" ) === true ) {
                                return false
                        }
                        if ( false !== isPhoton && this.hintsFor( "photon" ) === true ) {
                                return false
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /([?&]w=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.width );
				}

				url_var = newSrc.match( /([?&]h=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
                        if ( this.hintsFor( "staticAssets" ) === true ) {
                                return false; 
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/* global wpcom_reblog */

var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

// Due to performance problems on pages with a large number of widget iframes that need to be loaded,
// we are limiting the processing at any instant to unloaded widgets that are currently in viewport,
// plus this constant that will allow processing of widgets above and bellow the current fold.
// This aim of it is to improve the UX and hide the transition from unloaded to loaded state from users.
var jetpackLikesLookAhead = 2000; // pixels

// Keeps track of loaded comment likes widget so we can unload them when they are scrolled out of view.
var jetpackCommentLikesLoadedWidgets = [];

var jetpackLikesDocReadyPromise = new Promise( resolve => {
	if ( document.readyState !== 'loading' ) {
		resolve();
	} else {
		window.addEventListener( 'DOMContentLoaded', () => resolve() );
	}
} );

function JetpackLikesPostMessage( message, target ) {
	if ( typeof message === 'string' ) {
		try {
			message = JSON.parse( message );
		} catch ( e ) {
			return;
		}
	}

	if ( target && typeof target.postMessage === 'function' ) {
		try {
			target.postMessage(
				JSON.stringify( {
					type: 'likesMessage',
					data: message,
				} ),
				'*'
			);
		} catch ( e ) {
			return;
		}
	}
}

function JetpackLikesBatchHandler() {
	const requests = [];
	document.querySelectorAll( 'div.jetpack-likes-widget-unloaded' ).forEach( widget => {
		if ( jetpackLikesWidgetBatch.indexOf( widget.id ) > -1 ) {
			return;
		}

		if ( ! jetpackIsScrolledIntoView( widget ) ) {
			return;
		}

		jetpackLikesWidgetBatch.push( widget.id );

		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( widget.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[ 2 ],
			width: widget.width,
		};

		if ( 'post' === match[ 1 ] ) {
			info.post_id = match[ 3 ];
		} else if ( 'comment' === match[ 1 ] ) {
			info.comment_id = match[ 3 ];
		}

		info.obj_id = match[ 4 ];

		requests.push( info );
	} );

	if ( requests.length > 0 ) {
		JetpackLikesPostMessage(
			{ event: 'initialBatch', requests: requests },
			window.frames[ 'likes-master' ]
		);
	}
}

function JetpackLikesMessageListener( event ) {
	let message = event && event.data;
	if ( typeof message === 'string' ) {
		try {
			message = JSON.parse( message );
		} catch ( err ) {
			return;
		}
	}

	const type = message && message.type;
	const data = message && message.data;

	if ( type !== 'likesMessage' || typeof data.event === 'undefined' ) {
		return;
	}

	// We only allow messages from one origin
	const allowedOrigin = 'https://widgets.wp.com';
	if ( allowedOrigin !== event.origin ) {
		return;
	}

	switch ( data.event ) {
		case 'masterReady':
			jetpackLikesDocReadyPromise.then( () => {
				jetpackLikesMasterReady = true;

				const stylesData = {
					event: 'injectStyles',
				};
				const sdTextColor = document.querySelector( '.sd-text-color' );
				const sdLinkColor = document.querySelector( '.sd-link-color' );
				const sdTextColorStyles = ( sdTextColor && getComputedStyle( sdTextColor ) ) || {};
				const sdLinkColorStyles = ( sdLinkColor && getComputedStyle( sdLinkColor ) ) || {};

				if ( document.querySelectorAll( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
					JetpackLikesPostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

					const bgSource = document.querySelector(
						'#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a'
					);

					const wpAdminBar = document.querySelector( '#wpadminbar' );

					stylesData.adminBarStyles = {
						background: bgSource && getComputedStyle( bgSource ).background,
						isRtl: wpAdminBar && getComputedStyle( wpAdminBar ).direction === 'rtl',
					};
				}

				// enable reblogs if they are enabled for the page
				if ( document.body.classList.contains( 'jetpack-reblog-enabled' ) ) {
					JetpackLikesPostMessage( { event: 'reblogsEnabled' }, window.frames[ 'likes-master' ] );
				}

				stylesData.textStyles = {
					color: sdTextColorStyles[ 'color' ],
					fontFamily: sdTextColorStyles[ 'font-family' ],
					fontSize: sdTextColorStyles[ 'font-size' ],
					direction: sdTextColorStyles[ 'direction' ],
					fontWeight: sdTextColorStyles[ 'font-weight' ],
					fontStyle: sdTextColorStyles[ 'font-style' ],
					textDecoration: sdTextColorStyles[ 'text-decoration' ],
				};

				stylesData.linkStyles = {
					color: sdLinkColorStyles[ 'color' ],
					fontFamily: sdLinkColorStyles[ 'font-family' ],
					fontSize: sdLinkColorStyles[ 'font-size' ],
					textDecoration: sdLinkColorStyles[ 'text-decoration' ],
					fontWeight: sdLinkColorStyles[ 'font-weight' ],
					fontStyle: sdLinkColorStyles[ 'font-style' ],
				};

				JetpackLikesPostMessage( stylesData, window.frames[ 'likes-master' ] );

				JetpackLikesBatchHandler();
			} );

			break;

		case 'showLikeWidget': {
			const placeholder = document.querySelector( `#${ data.id } .likes-widget-placeholder` );
			if ( placeholder ) {
				placeholder.style.display = 'none';
			}
			break;
		}

		case 'showCommentLikeWidget': {
			const placeholder = document.querySelector( `#${ data.id } .likes-widget-placeholder` );
			if ( placeholder ) {
				placeholder.style.display = 'none';
			}
			break;
		}

		case 'killCommentLikes':
			// If kill switch for comment likes is enabled remove all widgets wrappers and `Loading...` placeholders.
			document
				.querySelectorAll( '.jetpack-comment-likes-widget-wrapper' )
				.forEach( wrapper => wrapper.remove() );
			break;

		case 'clickReblogFlair':
			if ( wpcom_reblog && typeof wpcom_reblog.toggle_reblog_box_flair === 'function' ) {
				wpcom_reblog.toggle_reblog_box_flair( data.obj_id, data.post_id );
			}
			break;

		case 'showOtherGravatars': {
			const container = document.querySelector( '#likes-other-gravatars' );
			if ( ! container ) {
				break;
			}

			const list = container.querySelector( 'ul' );

			container.style.display = 'none';
			list.innerHTML = '';

			container
				.querySelectorAll( '.likes-text span' )
				.forEach( item => ( item.textContent = data.total ) );

			( data.likers || [] ).forEach( async liker => {
				if ( liker.profile_URL.substr( 0, 4 ) !== 'http' ) {
					// We only display gravatars with http or https schema
					return;
				}

				try {
					const response = await fetch( liker.avatar_URL, { method: 'HEAD' } );
					if ( !response.ok ) {
						// Image doesn't exist, don't create the element
						return;
					}
					} catch ( error ) {
						// Error occurred while checking image existence, don't create the element
					return;
				}

				const element = document.createElement( 'li' );
				element.innerHTML = `
					<a href="${ encodeURI( liker.profile_URL ) }" rel="nofollow" target="_parent" class="wpl-liker">
						<img src="${ encodeURI( liker.avatar_URL ) }"
							alt=""
							style="width: 30px; height: 30px; padding-right: 3px;" />
					</a>
				`;

				list.append( element );

				// Add some extra attributes through native methods, to ensure strings are sanitized.
				element.classList.add( liker.css_class );
				element.querySelector( 'img' ).alt = liker.name;
			} );

			const el = document.querySelector( `*[name='${ data.parent }']` );
			const rect = el.getBoundingClientRect();
			const win = el.ownerDocument.defaultView;
			const offset = {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset,
			};

			container.style.left = offset.left + data.position.left - 10 + 'px';
			container.style.top = offset.top + data.position.top - 33 + 'px';

			// Container width - padding
			const initContainerWidth = data.width - 20;
			const rowLength = Math.floor( initContainerWidth / 37 );
			// # of rows + (avatar + avatar padding) + text above + container padding
			let height = Math.ceil( data.likers.length / rowLength ) * 37 + 17 + 22;
			if ( height > 204 ) {
				height = 204;
			}

			// Avatars + padding
			const containerWidth = rowLength * 37 + 13;
			container.style.height = height + 'px';
			container.style.width = containerWidth + 'px';

			const listWidth = rowLength * 37;
			list.style.width = listWidth + 'px';

			container.style.display = 'block';
		}
	}
}

window.addEventListener( 'message', JetpackLikesMessageListener );

document.addEventListener( 'click', e => {
	const container = document.querySelector( '#likes-other-gravatars' );

	if ( container && ! container.contains( e.target ) ) {
		container.style.display = 'none';
	}
} );

function JetpackLikesWidgetQueueHandler() {
	var wrapperID;

	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	// Restore widgets to initial unloaded state when they are scrolled out of view.
	jetpackUnloadScrolledOutWidgets();

	var unloadedWidgetsInView = jetpackGetUnloadedWidgetsInView();

	if ( unloadedWidgetsInView.length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();
	}

	for ( var i = 0, length = unloadedWidgetsInView.length; i <= length - 1; i++ ) {
		wrapperID = unloadedWidgetsInView[ i ].id;

		if ( ! wrapperID ) {
			continue;
		}

		jetpackLoadLikeWidgetIframe( wrapperID );
	}
}

function jetpackLoadLikeWidgetIframe( wrapperID ) {
	if ( typeof wrapperID === 'undefined' ) {
		return;
	}

	const wrapper = document.querySelector( '#' + wrapperID );
	wrapper.querySelectorAll( 'iframe' ).forEach( iFrame => iFrame.remove() );

	const placeholder = wrapper.querySelector( '.likes-widget-placeholder' );

	// Post like iframe
	if ( placeholder && placeholder.classList.contains( 'post-likes-widget-placeholder' ) ) {
		const postLikesFrame = document.createElement( 'iframe' );

		postLikesFrame.classList.add( 'post-likes-widget', 'jetpack-likes-widget' );
		postLikesFrame.name = wrapper.dataset.name;
		postLikesFrame.src = wrapper.dataset.src;
		postLikesFrame.height = '55px';
		postLikesFrame.width = '100%';
		postLikesFrame.frameBorder = '0';
		postLikesFrame.scrolling = 'no';
		postLikesFrame.title = wrapper.dataset.title;

		placeholder.after( postLikesFrame );
	}

	// Comment like iframe
	if ( placeholder.classList.contains( 'comment-likes-widget-placeholder' ) ) {
		const commentLikesFrame = document.createElement( 'iframe' );

		commentLikesFrame.class = 'comment-likes-widget-frame jetpack-likes-widget-frame';
		commentLikesFrame.name = wrapper.dataset.name;
		commentLikesFrame.src = wrapper.dataset.src;
		commentLikesFrame.height = '18px';
		commentLikesFrame.width = '100%';
		commentLikesFrame.frameBorder = '0';
		commentLikesFrame.scrolling = 'no';

		wrapper.querySelector( '.comment-like-feedback' ).after( commentLikesFrame );

		jetpackCommentLikesLoadedWidgets.push( commentLikesFrame );
	}

	wrapper.classList.remove( 'jetpack-likes-widget-unloaded' );
	wrapper.classList.add( 'jetpack-likes-widget-loading' );

	wrapper.querySelector( 'iframe' ).addEventListener( 'load', e => {
		JetpackLikesPostMessage(
			{ event: 'loadLikeWidget', name: e.target.name, width: e.target.width },
			window.frames[ 'likes-master' ]
		);

		wrapper.classList.remove( 'jetpack-likes-widget-loading' );
		wrapper.classList.add( 'jetpack-likes-widget-loaded' );
	} );
}

function jetpackGetUnloadedWidgetsInView() {
	const unloadedWidgets = document.querySelectorAll( 'div.jetpack-likes-widget-unloaded' );

	return [ ...unloadedWidgets ].filter( item => jetpackIsScrolledIntoView( item ) );
}

function jetpackIsScrolledIntoView( element ) {
	const top = element.getBoundingClientRect().top;
	const bottom = element.getBoundingClientRect().bottom;

	// Allow some slack above and bellow the fold with jetpackLikesLookAhead,
	// with the aim of hiding the transition from unloaded to loaded widget from users.
	return top + jetpackLikesLookAhead >= 0 && bottom <= window.innerHeight + jetpackLikesLookAhead;
}

function jetpackUnloadScrolledOutWidgets() {
	for ( let i = jetpackCommentLikesLoadedWidgets.length - 1; i >= 0; i-- ) {
		const currentWidgetIframe = jetpackCommentLikesLoadedWidgets[ i ];

		if ( ! jetpackIsScrolledIntoView( currentWidgetIframe ) ) {
			const widgetWrapper =
				currentWidgetIframe &&
				currentWidgetIframe.parentElement &&
				currentWidgetIframe.parentElement.parentElement;

			// Restore parent class to 'unloaded' so this widget can be picked up by queue manager again if needed.
			widgetWrapper.classList.remove( 'jetpack-likes-widget-loaded' );
			widgetWrapper.classList.remove( 'jetpack-likes-widget-loading' );
			widgetWrapper.classList.add( 'jetpack-likes-widget-unloaded' );

			// Bring back the loading placeholder into view.
			widgetWrapper
				.querySelectorAll( '.comment-likes-widget-placeholder' )
				.forEach( item => ( item.style.display = 'block' ) );

			// Remove it from the list of loaded widgets.
			jetpackCommentLikesLoadedWidgets.splice( i, 1 );

			// Remove comment like widget iFrame.
			currentWidgetIframe.remove();
		}
	}
}

var jetpackWidgetsDelayedExec = function ( after, fn ) {
	var timer;
	return function () {
		clearTimeout( timer );
		timer = setTimeout( fn, after );
	};
};

var jetpackOnScrollStopped = jetpackWidgetsDelayedExec( 250, JetpackLikesWidgetQueueHandler );

// Load initial batch of widgets, prior to any scrolling events.
JetpackLikesWidgetQueueHandler();

// Add event listener to execute queue handler after scroll.
window.addEventListener( 'scroll', jetpackOnScrollStopped, true );
;
(()=>{var __webpack_exports__={};(function(){var Scroller,ajaxurl,stats,type,text,totop,loading_text,isIE=-1!=navigator.userAgent.search("MSIE");if(isIE){var IEVersion=navigator.userAgent.match(/MSIE\s?(\d+)\.?\d*;/);IEVersion=parseInt(IEVersion[1])}function fullscreenState(){return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?1:0}"https:"==document.location.protocol&&(infiniteScroll.settings.ajaxurl=infiniteScroll.settings.ajaxurl.replace("http://","https://")),Scroller=function(e){var t=this;this.id=e.id,this.body=document.body,this.window=window,this.element=document.getElementById(e.id),this.wrapperClass=e.wrapper_class,this.ready=!0,this.disabled=!1,this.page=1,this.offset=e.offset,this.currentday=e.currentday,this.order=e.order,this.throttle=!1,this.click_handle=e.click_handle,this.google_analytics=e.google_analytics,this.history=e.history,this.origURL=window.location.href,this.handle=document.createElement("div"),this.handle.setAttribute("id","infinite-handle"),this.handle.innerHTML="<span><button>"+text.replace("\\","")+"</button></span>",this.footer={el:document.getElementById("infinite-footer"),wrap:e.footer},this.checkViewportOnLoadBound=t.checkViewportOnLoad.bind(this),this.wpMediaelement=null,"scroll"==type?(this.window.addEventListener("scroll",(function(){t.throttle=!0})),t.gotop(),setInterval((function(){t.throttle&&(t.throttle=!1,t.thefooter(),t.refresh(),t.determineURL())}),250),t.ensureFilledViewport(),this.body.addEventListener("is.post-load",t.checkViewportOnLoadBound)):"click"==type&&(this.click_handle&&this.element.appendChild(this.handle),this.handle.addEventListener("click",(function(){t.click_handle&&t.handle.parentNode.removeChild(t.handle),t.refresh()}))),this.body.addEventListener("is.post-load",t.initializeMejs)},Scroller.prototype.getScrollTop=function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},Scroller.prototype.extend=function(e){e=e||{};for(var t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},Scroller.prototype.check=function(){return this.measure(this.element,[this.wrapperClass]).bottom<2*this.window.innerHeight},Scroller.prototype.render=function(e){var t=Array.prototype.slice.call(e.fragment.childNodes);for(this.body.classList.add("infinity-success");t.length>0;){var n=t.shift();this.element.appendChild(n)}this.trigger(this.body,"is.post-load",{jqueryEventName:"post-load",data:e}),this.ready=!0},Scroller.prototype.query=function(){return{page:this.page+this.offset,currentday:this.currentday,order:this.order,scripts:window.infiniteScroll.settings.scripts,styles:window.infiniteScroll.settings.styles,query_args:window.infiniteScroll.settings.query_args,query_before:window.infiniteScroll.settings.query_before,last_post_date:window.infiniteScroll.settings.last_post_date}},Scroller.prototype.animate=function(e,t){var n=performance.now();requestAnimationFrame((function i(o){var r=Math.min(1,(o-n)/t);e(r),r<1&&requestAnimationFrame(i)}))},Scroller.prototype.gotop=function(){var e=document.getElementById("infinity-blog-title"),t=this;e&&(e.setAttribute("title",totop),e.addEventListener("click",(function(e){var n=t.window.pageYOffset;e.preventDefault(),t.animate((function(e){var t=n-n*e;document.documentElement.scrollTop=document.body.scrollTop=t}),200)})))},Scroller.prototype.thefooter=function(){var e,t,n,i,o=this;if(this.footer&&this.footer.el){if("string"==typeof this.footer.wrap){try{t=(t=document.getElementById(this.footer.wrap).getBoundingClientRect()).width}catch(e){t=0}t>479&&(e=this.footer.el.querySelector(".container"))&&(e.style.width=t+"px")}n=parseInt(o.footer.el.style.bottom||-50,10),i=this.window.pageYOffset>=350?0:-50,n!==i&&o.animate((function(e){var t=n+(i-n)*e;o.footer.el.style.bottom=t+"px",1===e&&(n=i)}),200)}},Scroller.prototype.urlEncodeJSON=function(e,t){var n,i,o=[];for(var r in e)n=encodeURIComponent(r),i=t?t+"["+n+"]":n,"object"==typeof e[r]?!Array.isArray(e[r])||e[r].length>0?o.push(this.urlEncodeJSON(e[r],i)):o.push(i+"[]="):o.push(i+"="+encodeURIComponent(e[r]));return o.join("&")},Scroller.prototype.refresh=function(){var self=this,query,xhr,loader,customized;if(!this.disabled&&this.ready&&this.check())return this.ready=!1,this.click_handle&&(loader||(document.getElementById("infinite-aria").textContent=loading_text,loader=document.createElement("div"),loader.classList.add("infinite-loader"),loader.setAttribute("role","progress"),loader.innerHTML='<div class="spinner"><div class="spinner-inner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'),this.element.appendChild(loader)),query=self.extend({action:"infinite_scroll"},this.query()),"undefined"!=typeof wp&&wp.customize&&wp.customize.settings.theme&&(customized={},query.wp_customize="on",query.theme=wp.customize.settings.theme.stylesheet,wp.customize.each((function(e){e._dirty&&(customized[e.id]=e())})),query.customized=JSON.stringify(customized),query.nonce=wp.customize.settings.nonce.preview),xhr=new XMLHttpRequest,xhr.open("POST",infiniteScroll.settings.ajaxurl,!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),xhr.send(self.urlEncodeJSON(query)),xhr.onerror=function(){self.click_handle&&loader.parentNode&&loader.parentNode.removeChild(loader),self.ready=!0},xhr.onload=function(){var response=JSON.parse(xhr.responseText),httpCheck=xhr.status>=200&&xhr.status<300,responseCheck=void 0!==response.html;if(response&&httpCheck&&responseCheck){if(self.click_handle&&loader.parentNode&&loader.parentNode.removeChild(loader),response.scripts&&Array.isArray(response.scripts)&&response.scripts.forEach((function(e){var t=e.footer?"body":"head";window.infiniteScroll.settings.scripts.push(e.handle),e.extra_data&&self.appendInlineScript(e.extra_data,t),e.before_handle&&self.appendInlineScript(e.before_handle,t);var n=document.createElement("script");n.type="text/javascript",n.src=e.src,n.id=e.handle,n.async=!1,e.after_handle&&(n.onload=function(){self.appendInlineScript(e.after_handle,t)}),"wp-mediaelement"===e.handle&&self.body.removeEventListener("is.post-load",self.initializeMejs),"wp-mediaelement"===e.handle&&"undefined"==typeof mejs?(self.wpMediaelement={},self.wpMediaelement.tag=n,self.wpMediaelement.element=t,setTimeout(self.maybeLoadMejs.bind(self),250)):document.getElementsByTagName(t)[0].appendChild(n)})),response.styles&&Array.isArray(response.styles)&&response.styles.forEach((function(item){window.infiniteScroll.settings.styles.push(item.handle);var style=document.createElement("link");style.rel="stylesheet",style.href=item.src,style.id=item.handle+"-css",!item.conditional||isIE&&eval(item.conditional.replace(/%ver/g,IEVersion))||(style=!1),style&&document.getElementsByTagName("head")[0].appendChild(style)})),response.fragment=document.createElement("div"),response.fragment.innerHTML=response.html,self.page++,stats&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?"+stats+"&post=0&baba="+Math.random()),"object"==typeof response.postflair&&"object"==typeof WPCOM_sharing_counts&&(WPCOM_sharing_counts=self.extend(WPCOM_sharing_counts,response.postflair)),self.render.call(self,response),"click"==type?(infiniteScroll.settings.wrapper&&document.querySelector("#infinite-view-"+(self.page+self.offset-1)+" a:first-of-type").focus({preventScroll:!0}),response.lastbatch?self.click_handle?(self.body.classList.add("infinity-end"),self.body.classList.remove("infinity-success")):self.trigger(this.body,"infinite-scroll-posts-end"):self.click_handle?self.element.appendChild(self.handle):self.trigger(this.body,"infinite-scroll-posts-more")):response.lastbatch&&(self.disabled=!0,self.body.classList.add("infinity-end"),self.body.classList.remove("infinity-success")),response.currentday&&(self.currentday=response.currentday),self.google_analytics){var ga_url=self.history.path.replace(/%d/,self.page);"object"==typeof _gaq&&_gaq.push(["_trackPageview",ga_url]),"function"==typeof ga&&ga("send","pageview",ga_url)}}else self.click_handle&&loader.parentNode&&loader.parentNode.removeChild(loader)},xhr},Scroller.prototype.appendInlineScript=function(e,t){var n=document.createElement("script"),i=document.createTextNode("//<![CDATA[ \n"+e+"\n//]]>");n.type="text/javascript",n.appendChild(i),document.getElementsByTagName(t)[0].appendChild(n)},Scroller.prototype.maybeLoadMejs=function(){null!==this.wpMediaelement&&("undefined"==typeof mejs?setTimeout(this.maybeLoadMejs.bind(this),250):(document.getElementsByTagName(this.wpMediaelement.element)[0].appendChild(this.wpMediaelement.tag),this.wpMediaelement=null,this.body.addEventListener("is.post-load",this.initializeMejs)))},Scroller.prototype.initializeMejs=function(e){if(e.detail&&e.detail.html&&(-1!==e.detail.html.indexOf("wp-audio-shortcode")||-1!==e.detail.html.indexOf("wp-video-shortcode"))&&"undefined"!=typeof mejs){var t,n={};"undefined"!=typeof _wpmejsSettings&&(n.pluginPath=_wpmejsSettings.pluginPath),n.success=function(e){var t=e.attributes.autoplay&&"false"!==e.attributes.autoplay;"flash"===e.pluginType&&t&&e.addEventListener("canplay",(function(){e.play()}),!1)},t=document.querySelectorAll(".wp-audio-shortcode, .wp-video-shortcode"),t=(t=Array.prototype.slice.call(t)).filter((function(e){for(;e.parentNode;){if(e.classList.contains("mejs-container"))return!1;e=e.parentNode}return!0}));for(var i=0;i<t.length;i++)new MediaElementPlayer(t[i],n)}},Scroller.prototype.measure=function(e,t){t=t||[];for(var n,i,o,r=Array.prototype.slice.call(e.children),s=Number.MAX_VALUE,l=0;r.length>0;){for(n=r.shift(),o=0;o<t.length;o++)if(n.classList.contains(t[o])){r=r.concat(Array.prototype.slice.call(n.children));break}i=n.getBoundingClientRect(),s=Math.min(s,i.top),l=Math.max(l,i.bottom)}var a=Math.round(window.innerHeight/2),d=s<=a&&l>=a;return{top:s,bottom:l,height:l-s,factor:(Math.min(l,a)-Math.max(s,0))/a,isActive:d}},Scroller.prototype.ensureFilledViewport=function(){var e=this,t=e.window.innerHeight,n=e.measure(e.element,[e.wrapperClass]);e.body.removeEventListener("is.post-load",e.checkViewportOnLoadBound),0!==n.bottom&&n.bottom<t&&(e.ready=!0,e.refresh())},Scroller.prototype.checkViewportOnLoad=function(){this.ensureFilledViewport()};var previousFullScrenState=fullscreenState();Scroller.prototype.determineURL=function(){var e,t=this,n=-1,i=fullscreenState(),o=0;if(previousFullScrenState^i)previousFullScrenState=i;else{previousFullScrenState=i,e=document.querySelectorAll("."+t.wrapperClass);for(var r=0;r<e.length;r++){var s=t.measure(e[r]);if(s.isActive){n=parseInt(e[r].dataset.pageNum,10);break}s.factor>o&&(n=parseInt(e[r].dataset.pageNum,10),o=s.factor)}t.updateURL(n)}},Scroller.prototype.updateURL=function(e){if(window.history.pushState){var t=this,n=t.origURL;-1!==e&&(n=window.location.protocol+"//"+t.history.host+t.history.path.replace(/%d/,e)+t.history.parameters),window.location.href!=n&&history.pushState(null,null,n)}},Scroller.prototype.pause=function(){this.disabled=!0},Scroller.prototype.resume=function(){this.disabled=!1},Scroller.prototype.trigger=function(e,t,n){var i;(n=n||{}).jqueryEventName&&"undefined"!=typeof jQuery&&jQuery(e).trigger(n.jqueryEventName,n.data||null);try{i=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:n.data||null})}catch(e){(i=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,n.data||null)}e.dispatchEvent(i)};var jetpackInfinityModule=function(){var e=infiniteScroll.settings.body_class.split(" ");if("object"==typeof infiniteScroll&&(e.forEach((function(e){e&&document.body.classList.add(e)})),ajaxurl=infiniteScroll.settings.ajaxurl,stats=infiniteScroll.settings.stats,type=infiniteScroll.settings.type,text=infiniteScroll.settings.text,totop=infiniteScroll.settings.totop,loading_text=infiniteScroll.settings.loading_text,infiniteScroll.scroller=new Scroller(infiniteScroll.settings),"click"==type)){var t=null;window.addEventListener("scroll",(function(){t||(t=setTimeout((function(){infiniteScroll.scroller.determineURL(),t=null}),250))}))}};"interactive"===document.readyState||"complete"===document.readyState?jetpackInfinityModule():document.addEventListener("DOMContentLoaded",jetpackInfinityModule)})()})();;
/**
 * Theme functions file.
 */

( function( $ ) {
	// Closure variables.
	var $window = $( window );
	var $body   = $( document.body );

	// Fades the post cover metadata and master logo.
	$( '#post-cover-image' ).each( function( i, node ) {
		var $cover = $( node );
		var $meta  = $( '.cover-meta', node );

		var updateScroll = function() {
			$meta.stop().css( 'opacity', 1 - ( $window.scrollTop() / $cover.outerHeight() ) );
		}

		$window
			.resize( updateScroll )
			.scroll( updateScroll )
			.trigger( 'scroll' );
	} );

	// Relocate #secondary into footer on mobile.
	$( '#secondary' ).each( function( i, node ) {
		var footer        = $( '#colophon' );
		var sidebar       = $( node );
		var sidebarParent = sidebar.parent();

		$window.resize( function(  ) {
			if ( $window.outerWidth() < 992 ) {
				if ( ! sidebar.parent().is( footer ) ) {
					sidebar
						.removeAttr( 'id' )
						.prependTo( footer );
				}
			} else {
				if ( sidebar.parent().is( footer ) ) {
					sidebar
						.attr( 'id', 'secondary' )
						.appendTo( sidebarParent );
				}
			}
		} ).trigger( 'resize' );
	} );

	// Fix focus outline from wp-image links.
	$( 'img[class*="wp-image-"]', '.entry-content' ).parent().addClass( 'fix-link-focus' );

	// Remove extra margin added by empty geo post elements.
	$( '.entry-content > .geo-post:not(:visible):last-child' ).prev().css( 'margin-bottom', '0' );
} )( jQuery );;
/**
 * slide-navigation.js
 *
 * Handles toggling the slide navigation menu.
 */
( function( $ ) {
	var $body, button, proxyButton, container, firstMenuItem;

	button = $( '#slide-menu-toggle' );

	if ( ! button.length ) {
		return;
	}

	$body         = $( document.body );
	container     = $( '#slide-menu' );
	proxyButton   = container.find( '.menu-toggle' );
	firstMenuItem = container.find( '.main-slide-navigation > .menu > li:first-child > a' );

	button.bind( {
		// Focus navigation on button's blur event.
		'keydown.independent-publisher': function( e ) {
			if ( 9 === e.keyCode && ! e.shiftKey ) {
				if ( 'true' === button.attr( 'aria-expanded' ) ) {
					firstMenuItem.focus();
					e.preventDefault();
				}
			} else if ( 32 === e.keyCode ) {
				button.trigger( 'click.independent-publisher' );
				e.preventDefault();
			}
		},

		// Expand slide menu on click event.
		'click.independent-publisher': function( e ) {
			$body.toggleClass( 'slide-menu-expanded' );
			if ( 'false' === button.attr( 'aria-expanded' ) ) {
				button
					.add( container )
					.add( proxyButton )
					.attr( 'aria-expanded', 'true' );
			} else {
				button
					.add( container )
					.add( proxyButton )
					.attr( 'aria-expanded', 'false' );

			}
			e.preventDefault();

			// Prevents Customizer from reloading when button is clicked
			e.stopPropagation();
		}
	} );

	// Focus button on SHIFT + Tab when focusing first menu item.
	firstMenuItem.bind( 'keydown.independent-publisher', function( e ) {
		if ( 9 === e.keyCode && e.shiftKey ) {
			button.focus();
			e.preventDefault();
		}
	} );

	// Forward click event of proxy button to real button.
	proxyButton.bind( 'click.independent-publisher', function( e ) {
		button.trigger( 'click.independent-publisher' );
		e.preventDefault();
	} );
} )( jQuery );;
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
} )();
;
/**
 * script-wpcom.js
 *
 * Handles toggling of body class name to help WordPress.com custom colors target color changes at different window sizes.
 * The Custom Colors plugin does not support media queries.
 */

 ( function( $ ) {
	function checkWidth( init ) {
		// If browser is resized, check width again
		if ( $( window ).width() > 992 ) {
			$( 'body' ).addClass( 'tablet-desktop' );
		}
		else {
			if ( ! init ) {
				$( 'body' ).removeClass( 'tablet-desktop' );
			}
		}
	}

	$( document ).ready( function() {
		checkWidth( true );

		$( window ).resize( function() {
			checkWidth( false );
		});
	});
} )( jQuery );;
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
!function(){"use strict";var e,t={noop:function(){},texturize:function(e){return(e=(e=(e=(e+="").replace(/'/g,"&#8217;").replace(/&#039;/g,"&#8217;")).replace(/"/g,"&#8221;").replace(/&#034;/g,"&#8221;").replace(/&quot;/g,"&#8221;").replace(/[\u201D]/g,"&#8221;")).replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g,'$1="$2"')).trim()},applyReplacements:function(e,t){if(e)return t?e.replace(/{(\d+)}/g,(function(e,r){return void 0!==t[r]?t[r]:e})):e},getBackgroundImage:function(e){var t=document.createElement("canvas"),r=t.getContext&&t.getContext("2d");if(e){r.filter="blur(20px) ",r.drawImage(e,0,0);var o=t.toDataURL("image/png");return t=null,o}}},r=function(){function e(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function r(e,t,r,o){if(!e)return o();e.style.removeProperty("display"),e.style.opacity=t,e.style.transition="opacity 0.2s",e.style.pointerEvents="none";var a=function(t){t.target===e&&"opacity"===t.propertyName&&(e.style.removeProperty("transition"),e.style.removeProperty("opacity"),e.style.removeProperty("pointer-events"),e.removeEventListener("transitionend",a),e.removeEventListener("transitioncancel",a),o())};requestAnimationFrame((function(){requestAnimationFrame((function(){e.addEventListener("transitionend",a),e.addEventListener("transitioncancel",a),e.style.opacity=r}))}))}return{closest:function(t,r){if(t.closest)return t.closest(r);var o=t;do{if(e(o,r))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null},matches:e,hide:function(e){e&&(e.style.display="none")},show:function(e){e&&(e.style.display="block")},fadeIn:function(e,o){r(e,"0","1",o=o||t.noop)},fadeOut:function(e,o){o=o||t.noop,r(e,"1","0",(function(){e&&(e.style.display="none"),o()}))},scrollToElement:function(e,t,r){if(!e||!t)return r?r():void 0;var o=t.querySelector(".jp-carousel-info-extra");o&&(o.style.minHeight=window.innerHeight-64+"px");var a=!0,i=Date.now(),n=t.scrollTop,l=Math.max(0,e.offsetTop-Math.max(0,window.innerHeight-function(e){var t=e.querySelector(".jp-carousel-info-footer"),r=e.querySelector(".jp-carousel-info-extra"),o=e.querySelector(".jp-carousel-info-content-wrapper");if(t&&r&&o){var a=window.getComputedStyle(r),i=parseInt(a.paddingTop,10)+parseInt(a.paddingBottom,10);return i=isNaN(i)?0:i,o.offsetHeight+t.offsetHeight+i}return 0}(t)))-t.scrollTop;function s(){a=!1}l=Math.min(l,t.scrollHeight-window.innerHeight),t.addEventListener("wheel",s),function e(){var c,u=Date.now(),d=(c=(u-i)/300)<.5?2*c*c:1-Math.pow(-2*c+2,2)/2,p=(d=d>1?1:d)*l;if(t.scrollTop=n+p,u<=i+300&&a)return requestAnimationFrame(e);r&&r(),o&&(o.style.minHeight=""),a=!1,t.removeEventListener("wheel",s)}()},getJSONAttribute:function(e,t){if(e&&e.hasAttribute(t))try{return JSON.parse(e.getAttribute(t))}catch(e){return}},convertToPlainText:function(e){var t=document.createElement("div");return t.textContent=e,t.innerHTML},stripHTML:function(e){return e.replace(/<[^>]*>?/gm,"")},emitEvent:function(e,t,r){var o;try{o=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:r||null})}catch(e){(o=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,r||null)}e.dispatchEvent(o)},isTouch:function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}}}();function o(){var o,a,i,n,l="",s=!1,c="div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, figure.wp-block-gallery.has-nested-images, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery",u=".gallery-item, .tiled-gallery-item, .blocks-gallery-item,  .tiled-gallery__item",d=u+", .wp-block-image",p={},m="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.stat?wpcom.carousel.stat:t.noop,g="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.pageview?wpcom.carousel.pageview:t.noop;function h(t){if(!s)switch(t.which){case 38:t.preventDefault(),p.overlay.scrollTop-=100;break;case 40:t.preventDefault(),p.overlay.scrollTop+=100;break;case 39:t.preventDefault(),e.slideNext();break;case 37:case 8:t.preventDefault(),e.slidePrev();break;case 27:t.preventDefault(),b()}}function f(){s=!0}function v(){s=!1}function y(){p.overlay||(p.overlay=document.querySelector(".jp-carousel-overlay"),p.container=p.overlay.querySelector(".jp-carousel-wrap"),p.gallery=p.container.querySelector(".jp-carousel"),p.info=p.overlay.querySelector(".jp-carousel-info"),p.caption=p.info.querySelector(".jp-carousel-caption"),p.commentField=p.overlay.querySelector("#jp-carousel-comment-form-comment-field"),p.emailField=p.overlay.querySelector("#jp-carousel-comment-form-email-field"),p.authorField=p.overlay.querySelector("#jp-carousel-comment-form-author-field"),p.urlField=p.overlay.querySelector("#jp-carousel-comment-form-url-field"),window.innerWidth<=760&&Math.round(window.innerWidth/760*110)<40&&r.isTouch(),[p.commentField,p.emailField,p.authorField,p.urlField].forEach((function(e){e&&(e.addEventListener("focus",f),e.addEventListener("blur",v))})),p.overlay.addEventListener("click",(function(e){var t,o,a=e.target,i=!!r.closest(a,".jp-carousel-close-hint"),n=!!window.matchMedia("(max-device-width: 760px)").matches;if(a===p.overlay){if(n)return;b()}else if(i)b();else if(a.classList.contains("jp-carousel-image-download"))m("download_original_click");else if(a.classList.contains("jp-carousel-comment-login"))t=p.currentSlide,o=t?t.attrs.attachmentId:"0",window.location.href=jetpackCarouselStrings.login_url+"%23jp-carousel-"+o;else if(r.closest(a,"#jp-carousel-comment-form-container"))!function(e){var t=e.target,o=r.getJSONAttribute(p.container,"data-carousel-extra")||{},a=p.currentSlide.attrs.attachmentId,i=document.querySelector("#jp-carousel-comment-form-submit-and-info-wrapper"),n=document.querySelector("#jp-carousel-comment-form-spinner"),l=document.querySelector("#jp-carousel-comment-form-button-submit"),s=document.querySelector("#jp-carousel-comment-form");if(p.commentField&&p.commentField.getAttribute("id")===t.getAttribute("id"))f(),r.show(i);else if(r.matches(t,'input[type="submit"]')){e.preventDefault(),e.stopPropagation(),r.show(n),s.classList.add("jp-carousel-is-disabled");var c={action:"post_attachment_comment",nonce:jetpackCarouselStrings.nonce,blog_id:o.blog_id,id:a,comment:p.commentField.value};if(!c.comment.length)return void w(jetpackCarouselStrings.no_comment_text,!1);if(1!==Number(jetpackCarouselStrings.is_logged_in)&&(c.email=p.emailField.value,c.author=p.authorField.value,c.url=p.urlField.value,1===Number(jetpackCarouselStrings.require_name_email))){if(!c.email.length||!c.email.match("@"))return void w(jetpackCarouselStrings.no_comment_email,!1);if(!c.author.length)return void w(jetpackCarouselStrings.no_comment_author,!1)}var u=new XMLHttpRequest;u.open("POST",jetpackCarouselStrings.ajaxurl,!0),u.setRequestHeader("X-Requested-With","XMLHttpRequest"),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),u.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&this.status>=200&&this.status<300){var e;try{e=JSON.parse(this.response)}catch(e){return void w(jetpackCarouselStrings.comment_post_error,!1)}"approved"===e.comment_status?w(jetpackCarouselStrings.comment_approved,!0):"unapproved"===e.comment_status?w(jetpackCarouselStrings.comment_unapproved,!0):w(jetpackCarouselStrings.comment_post_error,!1),E(),q(a),l.value=jetpackCarouselStrings.post_comment,r.hide(n),s.classList.remove("jp-carousel-is-disabled")}else w(jetpackCarouselStrings.comment_post_error,!1)};var d=[];for(var m in c)if(m){var g=encodeURIComponent(m)+"="+encodeURIComponent(c[m]);d.push(g.replace(/%20/g,"+"))}var h=d.join("&");u.send(h)}}(e);else if(r.closest(a,".jp-carousel-photo-icons-container")||a.classList.contains("jp-carousel-photo-title"))!function(e){e.preventDefault();var t=e.target,o=p.info.querySelector(".jp-carousel-info-extra"),a=p.info.querySelector(".jp-carousel-image-meta"),i=p.info.querySelector(".jp-carousel-comments-wrapper"),n=p.info.querySelector(".jp-carousel-icon-info"),l=p.info.querySelector(".jp-carousel-icon-comments");function s(){l&&l.classList.remove("jp-carousel-selected"),n.classList.toggle("jp-carousel-selected"),i&&i.classList.remove("jp-carousel-show"),a&&(a.classList.toggle("jp-carousel-show"),a.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}function c(){n&&n.classList.remove("jp-carousel-selected"),l.classList.toggle("jp-carousel-selected"),a&&a.classList.remove("jp-carousel-show"),i&&(i.classList.toggle("jp-carousel-show"),i.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}(r.closest(t,".jp-carousel-icon-info")||t.classList.contains("jp-carousel-photo-title"))&&(a&&a.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,s):(s(),r.scrollToElement(p.info,p.overlay))),r.closest(t,".jp-carousel-icon-comments")&&(i&&i.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,c):(c(),r.scrollToElement(p.info,p.overlay)))}(e);else if(!r.closest(a,".jp-carousel-info"))return})),window.addEventListener("keydown",h),p.overlay.addEventListener("jp_carousel.afterOpen",(function(){v(),p.slides.length<=1||(p.slides.length<=5?r.show(p.info.querySelector(".jp-swiper-pagination")):r.show(p.info.querySelector(".jp-carousel-pagination")))})),p.overlay.addEventListener("jp_carousel.beforeClose",(function(){f(),document.documentElement.style.removeProperty("height"),e&&e.enable(),r.hide(p.info.querySelector(".jp-swiper-pagination")),r.hide(p.info.querySelector(".jp-carousel-pagination"))})),p.overlay.addEventListener("jp_carousel.afterClose",(function(){window.history.pushState?history.pushState("",document.title,window.location.pathname+window.location.search):window.location.href="",l="",p.isOpen=!1})),p.overlay.addEventListener("touchstart",(function(e){e.touches.length>1&&e.preventDefault()})))}function w(e,t){var o=p.overlay.querySelector("#jp-carousel-comment-post-results"),a="jp-carousel-comment-post-"+(t?"success":"error");o.innerHTML='<span class="'+a+'">'+e+"</span>",r.hide(p.overlay.querySelector("#jp-carousel-comment-form-spinner")),p.overlay.querySelector("#jp-carousel-comment-form").classList.remove("jp-carousel-is-disabled"),r.show(o)}function j(){var e=document.querySelectorAll("a img[data-attachment-id]");Array.prototype.forEach.call(e,(function(e){var t=e.parentElement,o=t.parentElement;if(!o.classList.contains("gallery-icon")&&!r.closest(o,u)&&t.hasAttribute("href")){var a=!1;t.getAttribute("href").split("?")[0]===e.getAttribute("data-orig-file").split("?")[0]&&1===Number(jetpackCarouselStrings.single_image_gallery_media_file)&&(a=!0),t.getAttribute("href")===e.getAttribute("data-permalink")&&(a=!0),a&&(t.classList.add("single-image-gallery"),t.setAttribute("data-carousel-extra",JSON.stringify({blog_id:Number(jetpackCarouselStrings.blog_id)})))}}))}function S(o){(!o||o<0||o>p.slides.length)&&(o=0),p.currentSlide=p.slides[o];var a,i,n=p.currentSlide,s=n.attrs.attachmentId;!function(e){var t=e.el,r=e.attrs,o=t.querySelector("img");if(!o.hasAttribute("data-loaded")){var a=!!r.previewImage,i=r.thumbSize;!a||i&&t.offsetWidth>i.width?o.src=r.src:o.src=r.previewImage,o.setAttribute("itemprop","image"),o.setAttribute("data-loaded",1)}}(p.slides[o]),1!==Number(jetpackCarouselStrings.display_background_image)||p.slides[o].backgroundImage||function(t){var r=t.el;e&&e.slides&&(r=e.slides[e.activeIndex]);var o=t.attrs.originalElement;o.complete&&0!==o.naturalHeight?A(t,r,o):o.onload=function(){A(t,r,o)}}(p.slides[o]),r.hide(p.caption),function(e){var t,o,a,i,n="",l="",s="";if(t=p.overlay.querySelector(".jp-carousel-photo-caption"),o=p.overlay.querySelector(".jp-carousel-caption"),a=p.overlay.querySelector(".jp-carousel-photo-title"),i=p.overlay.querySelector(".jp-carousel-photo-description"),r.hide(t),r.hide(o),r.hide(a),r.hide(i),n=k(e.caption)||"",l=k(e.title)||"",s=k(e.desc)||"",(n||l||s)&&(n&&(t.innerHTML=n,o.innerHTML=n,r.show(t),r.show(o)),r.stripHTML(n)===r.stripHTML(l)&&(l=""),r.stripHTML(n)===r.stripHTML(s)&&(s=""),r.stripHTML(l)===r.stripHTML(s)&&(s=""),s&&(i.innerHTML=s,r.show(i),l||n||(t.innerHTML=r.stripHTML(s),r.show(t))),l)){var c=r.stripHTML(l);a.innerHTML=c,n||(t.innerHTML=c,o.innerHTML=c,r.show(t)),r.show(a)}}({caption:n.attrs.caption,title:n.attrs.title,desc:n.attrs.desc}),function(e){if(!e||1!==Number(jetpackCarouselStrings.display_exif))return!1;var t=p.info.querySelector(".jp-carousel-image-meta ul.jp-carousel-image-exif"),r="";for(var o in e){var a=e[o],i=jetpackCarouselStrings.meta_data||[];if(0!==parseFloat(a)&&a.length&&-1!==i.indexOf(o)){switch(o){case"focal_length":a+="mm";break;case"shutter_speed":a=x(a);break;case"aperture":a="f/"+a}r+="<li><h5>"+jetpackCarouselStrings[o]+"</h5>"+a+"</li>"}}t.innerHTML=r,t.style.removeProperty("display")}(p.slides[o].attrs.imageMeta),function(e){if(!e)return!1;var r,o=[e.attrs.origWidth,e.attrs.origHeight],a=document.createElement("a");a.href=e.attrs.src.replace(/\?.+$/,""),r=null!==a.hostname.match(/^i[\d]{1}\.wp\.com$/i)?a.href:e.attrs.origFile.replace(/\?.+$/,"");var i=p.info.querySelector(".jp-carousel-download-text"),n=p.info.querySelector(".jp-carousel-image-download");i.innerHTML=t.applyReplacements(jetpackCarouselStrings.download_original,o),n.setAttribute("href",r),n.style.removeProperty("display")}(n),1===Number(jetpackCarouselStrings.display_comments)&&(a=p.slides[o].attrs.commentsOpened,i=p.container.querySelector(".jp-carousel-comment-form-container"),1===parseInt(a,10)?r.fadeIn(i):r.fadeOut(i),q(s),r.hide(p.info.querySelector("#jp-carousel-comment-post-results")));var c=p.info.querySelector(".jp-carousel-pagination");if(c&&p.slides.length>5){var u=o+1;c.innerHTML="<span>"+u+" / "+p.slides.length+"</span>"}jetpackCarouselStrings.stats&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?"+jetpackCarouselStrings.stats+"&post="+encodeURIComponent(s)+"&rand="+Math.random()),g(s),window.location.hash=l="#jp-carousel-"+s}function b(){document.body.style.overflow=a,document.documentElement.style.overflow=i,E(),f(),r.emitEvent(p.overlay,"jp_carousel.beforeClose"),window.scrollTo(window.scrollX||window.pageXOffset||0,n||0),e.destroy(),p.isOpen=!1,p.slides=[],p.currentSlide=void 0,p.gallery.innerHTML="",r.fadeOut(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterClose")}))}function L(e,t,r){var o=r?e.replace(/.*=([\d]+%2C[\d]+).*$/,"$1"):e.replace(/.*-([\d]+x[\d]+)\..+$/,"$1"),a=o!==e?r?o.split("%2C"):o.split("x"):[t,0];return"9999"===a[0]&&(a[0]="0"),"9999"===a[1]&&(a[1]="0"),a}function x(e){return e>=1?Math.round(10*e)/10+"s":"1/"+Math.round(1/e)+"s"}function k(e){return!e.match(" ")&&e.match("_")?"":e}function q(e,t){var a=void 0===t,i=p.info.querySelector(".jp-carousel-icon-comments .jp-carousel-has-comments-indicator");if(i.classList.remove("jp-carousel-show"),clearInterval(o),e){(!t||t<1)&&(t=0);var n=p.info.querySelector(".jp-carousel-comments"),l=p.info.querySelector("#jp-carousel-comments-loading");r.show(l),a&&(r.hide(n),n.innerHTML="");var s=new XMLHttpRequest,c=jetpackCarouselStrings.ajaxurl+"?action=get_attachment_comments&nonce="+jetpackCarouselStrings.nonce+"&id="+e+"&offset="+t;s.open("GET",c),s.setRequestHeader("X-Requested-With","XMLHttpRequest");var u=function(){r.fadeIn(n),r.fadeOut(l)};s.onload=function(){if(p.currentSlide&&p.currentSlide.attrs.attachmentId===e){var c,d=s.status>=200&&s.status<300;try{c=JSON.parse(s.responseText)}catch(e){}if(!d||!c||!Array.isArray(c))return u();a&&(n.innerHTML="");for(var m=0;m<c.length;m++){var g=c[m],h=document.createElement("div");h.classList.add("jp-carousel-comment"),h.setAttribute("id","jp-carousel-comment-"+g.id),h.innerHTML='<div class="comment-gravatar">'+g.gravatar_markup+'</div><div class="comment-content"><div class="comment-author">'+g.author_markup+'</div><div class="comment-date">'+g.date_gmt+"</div>"+g.content+"</div>",n.appendChild(h),clearInterval(o),o=setInterval((function(){p.container.scrollTop+150>window.innerHeight&&(q(e,t+10),clearInterval(o))}),300)}c.length>0&&(r.show(n),i.innerText=c.length,i.classList.add("jp-carousel-show")),r.hide(l)}},s.onerror=u,s.send()}}function A(e,r,o){var a=t.getBackgroundImage(o);e.backgroundImage=a,r.style.backgroundImage="url("+a+")",r.style.backgroundSize="cover"}function E(){p.commentField&&(p.commentField.value="")}function H(e,o){p.slides=[];var a={width:window.innerWidth,height:window.innerHeight-64};0!==o&&((new Image).src=e[o].getAttribute("data-gallery-src"));var i=!!r.closest(e[0],".tiled-gallery.type-rectangular");Array.prototype.forEach.call(e,(function(e,o){var n=r.closest(e,"a"),l=e.getAttribute("data-orig-file")||e.getAttribute("src-orig"),s=e.getAttribute("data-attachment-id")||e.getAttribute("data-id")||"0",c=document.querySelector('img[data-attachment-id="'+s+'"] + figcaption');c=c?c.innerHTML:e.getAttribute("data-image-caption");var u={originalElement:e,attachmentId:s,commentsOpened:e.getAttribute("data-comments-opened")||"0",imageMeta:r.getJSONAttribute(e,"data-image-meta")||{},title:e.getAttribute("data-image-title")||"",desc:e.getAttribute("data-image-description")||"",mediumFile:e.getAttribute("data-medium-file")||"",largeFile:e.getAttribute("data-large-file")||"",origFile:l||"",thumbSize:{width:e.naturalWidth,height:e.naturalHeight},caption:c||"",permalink:n&&n.getAttribute("href"),src:l||e.getAttribute("src")||""},d=r.closest(e,".tiled-gallery-item"),m=d&&d.querySelector(".tiled-gallery-caption"),g=m&&m.innerHTML;g&&(u.caption=g);var h=function(e){var t=e.getAttribute("data-orig-size")||"";if(t){var r=t.split(",");return{width:parseInt(r[0],10),height:parseInt(r[1],10)}}return{width:e.getAttribute("data-original-width")||e.getAttribute("width")||void 0,height:e.getAttribute("data-original-height")||e.getAttribute("height")||void 0}}(e);if(u.origWidth=h.width||u.thumbSize.width,u.origHeight=h.height||u.thumbSize.height,"undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.generateImgSrc?u.src=wpcom.carousel.generateImgSrc(e,a):u.src=function(e){if("object"!=typeof e&&(e={}),void 0===e.origFile)return"";if(void 0===e.origWidth||void 0===e.maxWidth)return e.origFile;if(void 0===e.mediumFile||void 0===e.largeFile)return e.origFile;var t=document.createElement("a");t.href=e.largeFile;var r=/^i[0-2]\.wp\.com$/i.test(t.hostname),o=L(e.mediumFile,e.origWidth,r),a=L(e.largeFile,e.origWidth,r),i=parseInt(a[0],10),n=parseInt(a[1],10),l=parseInt(o[0],10),s=parseInt(o[1],10);if(e.origMaxWidth=e.maxWidth,e.origMaxHeight=e.maxHeight,void 0!==window.devicePixelRatio&&window.devicePixelRatio>1&&(e.maxWidth=e.maxWidth*window.devicePixelRatio,e.maxHeight=e.maxHeight*window.devicePixelRatio),i>=e.maxWidth||n>=e.maxHeight)return e.largeFile;if(l>=e.maxWidth||s>=e.maxHeight)return e.mediumFile;if(r){var c=e.largeFile.lastIndexOf("?"),u=e.largeFile;return-1!==c&&(u=e.largeFile.substring(0,c),(e.origWidth>e.maxWidth||e.origHeight>e.maxHeight)&&(e.origMaxWidth=2*e.maxWidth,e.origMaxHeight=2*e.maxHeight,u+="?fit="+e.origMaxWidth+"%2C"+e.origMaxHeight)),u}return e.origFile}({origFile:u.src,origWidth:u.origWidth,origHeight:u.origHeight,maxWidth:a.width,maxHeight:a.height,mediumFile:u.mediumFile,largeFile:u.largeFile}),e.setAttribute("data-gallery-src",u.src),"0"!==u.attachmentId){u.title=t.texturize(u.title),u.desc=t.texturize(u.desc),u.caption=t.texturize(u.caption);var f=new Image;f.src=u.src;var v=document.createElement("div");v.classList.add("swiper-slide"),v.setAttribute("itemprop","associatedMedia"),v.setAttribute("itemscope",""),v.setAttribute("itemtype","https://schema.org/ImageObject");var y=document.createElement("div");y.classList.add("swiper-zoom-container"),p.gallery.appendChild(v),v.appendChild(y),y.appendChild(f),v.setAttribute("data-attachment-id",u.attachmentId),v.setAttribute("data-permalink",u.permalink),v.setAttribute("data-orig-file",u.origFile),i&&(u.previewImage=u.src);var w={el:v,attrs:u,index:o};p.slides.push(w)}}))}function T(e,t){if(!window.Swiper670){var o=document.querySelector("#jp-carousel-loading-overlay");r.show(o);var a=document.createElement("script");return a.id="jetpack-carousel-swiper-js",a.src=window.jetpackSwiperLibraryPath.url,a.async=!0,a.onload=function(){r.hide(o),C(e,t)},a.onerror=function(){r.hide(o)},void document.head.appendChild(a)}C(e,t)}function C(t,o){var l,s={imgSelector:".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]",startIndex:0},c=r.getJSONAttribute(t,"data-carousel-extra");if(c&&(y(),!p.isOpen)){for(var u in p.isOpen=!0,a=getComputedStyle(document.body).overflow,document.body.style.overflow="hidden",i=getComputedStyle(document.documentElement).overflow,document.documentElement.style.overflow="hidden",n=window.scrollY||window.pageYOffset||0,p.container.setAttribute("data-carousel-extra",JSON.stringify(c)),m(["open","view_image"]),o||{})s[u]=o[u];-1===s.startIndex&&(s.startIndex=0),r.emitEvent(p.overlay,"jp_carousel.beforeOpen"),p.gallery.innerHTML="",p.overlay.style.opacity=1,p.overlay.style.display="block",H(t.querySelectorAll(s.imgSelector),s.startIndex),(e=new window.Swiper670(".jp-carousel-swiper-container",{centeredSlides:!0,zoom:!0,loop:p.slides.length>1,enabled:p.slides.length>1,pagination:{el:".jp-swiper-pagination",clickable:!0},navigation:{nextEl:".jp-swiper-button-next",prevEl:".jp-swiper-button-prev"},initialSlide:s.startIndex,on:{init:function(){S(s.startIndex)}},preventClicks:!1,preventClicksPropagation:!1,preventInteractionOnTransition:!r.isTouch(),threshold:5})).on("slideChange",(function(e){S(0===e.activeIndex?p.slides.length-1:e.activeIndex===p.slides.length+1?0:e.activeIndex-1),p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("zoomChange",(function(e,t){t>1&&p.overlay.classList.add("jp-carousel-hide-controls"),1===t&&p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("doubleTap",(function(e){if(clearTimeout(l),1===e.zoom.scale)var t=setTimeout((function(){p.overlay.classList.remove("jp-carousel-hide-controls"),clearTimeout(t)}),150)})),e.on("tap",(function(){e.zoom.scale>1&&(l=setTimeout((function(){p.overlay.classList.toggle("jp-carousel-hide-controls")}),150))})),r.fadeIn(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterOpen")}))}}document.body.addEventListener("click",(function(e){if(window.CSS&&window.CSS.supports&&window.CSS.supports("display","grid")){var t,o=e.target,a=r.closest(o,c);if(a){if(!(t=a)||!t.getAttribute("data-carousel-extra"))return;var i=o.parentElement,n=i.parentElement,l=null;if(n&&n.classList.contains("wp-block-image")?l=i.getAttribute("href"):i&&i.classList.contains("wp-block-image")&&i.querySelector(":scope > a")&&(l=i.querySelector(":scope > a").getAttribute("href")),l&&l.split("?")[0]!==o.getAttribute("data-orig-file").split("?")[0]&&l!==o.getAttribute("data-permalink"))return;if(i.classList.contains("gallery-caption"))return;if(r.matches(i,"figcaption"))return;document.documentElement.style.height="auto",e.preventDefault(),e.stopPropagation();var s=r.closest(o,d),u=Array.prototype.indexOf.call(a.querySelectorAll(d),s);T(a,{startIndex:u})}}})),1===Number(jetpackCarouselStrings.single_image_gallery)&&(j(),document.body.addEventListener("is.post-load",(function(){j()}))),window.addEventListener("hashchange",(function(){var t=/jp-carousel-(\d+)/;if(window.location.hash&&t.test(window.location.hash)){if(window.location.hash!==l||!p.isOpen)if(window.location.hash&&p.gallery&&!p.isOpen&&history.back)history.back();else{l=window.location.hash;for(var r,o,a=window.location.hash.match(t),i=parseInt(a[1],10),n=document.querySelectorAll(c),s=0;s<n.length;s++){for(var u,d=n[s],m=d.querySelectorAll("img"),g=0;g<m.length;g++)if(parseInt(m[g].getAttribute("data-attachment-id"),10)===i||parseInt(m[g].getAttribute("data-id"),10)===i){u=g;break}if(void 0!==u){r=d,o=u,p.isOpen?(S(o),e.slideTo(o+1)):T(r,{startIndex:o});break}}}}else p.isOpen&&b()})),window.location.hash&&r.emitEvent(window,"hashchange")}"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)}();;
!function(){function e(){this.galleries=[],this.findAndSetupNewGalleries()}function t(e){this.gallery=e,this.addCaptionEvents(),this.resize(),this.gallery.classList.remove("tiled-gallery-unresized")}e.prototype.findAndSetupNewGalleries=function(){var e=this,r=document.querySelectorAll(".tiled-gallery.tiled-gallery-unresized");Array.prototype.forEach.call(r,(function(r){e.galleries.push(new t(r))}))},e.prototype.resizeAll=function(){Array.prototype.forEach.call(this.galleries,(function(e){e.resize()}))},t.prototype.resizeableElementsSelector=".gallery-row, .gallery-group, .tiled-gallery-item img",t.prototype.addCaptionEvents=function(){var e=this.gallery.querySelectorAll(".tiled-gallery-caption");Array.prototype.forEach.call(e,(function(e){e.style.display="none"}));var t=function(e){var t=e.target.closest(".tiled-gallery-item"),r="mouseover"===e.type?"block":"none";if(t){var i=t.querySelector(".tiled-gallery-caption");i&&(i.style.display=r)}};this.gallery.addEventListener("mouseover",t),this.gallery.addEventListener("mouseout",t)},t.prototype.getExtraDimension=function(e,t,r){if("horizontal"===r){var i="border"===t?"borderLeftWidth":t+"Left",n="border"===t?"borderRightWidth":t+"Right";return(parseInt(e.style[i],10)||0)+(parseInt(e.style[n],10)||0)}if("vertical"===r){var o="border"===t?"borderTopWidth":t+"Top",a="border"===t?"borderBottomWidth":t+"Bottom";return(parseInt(e.style[o],10)||0)+(parseInt(e.style[a],10)||0)}return 0},t.prototype.resize=function(){var e=parseInt(this.gallery.dataset.originalWidth,10),t=parseFloat(getComputedStyle(this.gallery.parentNode,null).width.replace("px","")),r=Math.min(1,t/e),i=this,n=this.gallery.querySelectorAll(this.resizeableElementsSelector);Array.prototype.forEach.call(n,(function(e){var t=i.getExtraDimension(e,"margin","horizontal"),n=i.getExtraDimension(e,"margin","vertical"),o=i.getExtraDimension(e,"padding","horizontal"),a=i.getExtraDimension(e,"padding","vertical"),l=i.getExtraDimension(e,"border","horizontal"),s=i.getExtraDimension(e,"border","vertical"),d=parseInt(e.dataset.originalWidth,10)+o+l+t,c=parseInt(e.dataset.originalHeight,10)+a+s+n;e.style.width=Math.floor(r*d)-t+"px",e.style.height=Math.floor(r*c)-n+"px"}))};var r,i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;r=function(){var t=new e;document.body.addEventListener("is.post-load",(function(){t.findAndSetupNewGalleries()})),window.chrome&&i?function(e){var t=!1,r=null;function n(){e.resizeAll(),t&&i(n)}window.addEventListener("resize",(function(){clearTimeout(r),t||i(n),t=!0,r=setTimeout((function(){t=!1}),15)}))}(t):function(e){window.addEventListener("resize",(function(){e.resizeAll()}))}(t),"undefined"!=typeof wp&&wp.customize&&wp.customize.selectiveRefresh&&wp.customize.selectiveRefresh.bind("partial-content-rendered",(function(e){wp.isJetpackWidgetPlaced(e,"gallery")&&t.findAndSetupNewGalleries()}))},"loading"!==document.readyState?r():document.addEventListener("DOMContentLoaded",r)}();;
( function () {
	'use strict';

	if ( typeof window.wpcom === 'undefined' ) {
		window.wpcom = {};
	}

	if ( window.wpcom.carousel ) {
		return;
	}

	var prebuilt_widths = jetpackCarouselStrings.widths;
	var pageviews_stats_args = jetpackCarouselStrings.stats_query_args;

	var findFirstLargeEnoughWidth = function ( original_w, original_h, dest_w, dest_h ) {
		var inverse_ratio = original_h / original_w;

		for ( var i = 0; i < prebuilt_widths.length; ++i ) {
			if ( prebuilt_widths[ i ] >= dest_w || prebuilt_widths[ i ] * inverse_ratio >= dest_h ) {
				return prebuilt_widths[ i ];
			}
		}

		return original_w;
	};

	var removeResizeFromImageURL = function ( url ) {
		return removeArgFromURL( url, 'resize' );
	};

	var removeArgFromURL = function ( url, arg ) {
		var re = new RegExp( '[\\?&]' + arg + '(=[^?&]+)?' );
		if ( url.match( re ) ) {
			return url.replace( re, '' );
		}
		return url;
	};

	var addWidthToImageURL = function ( url, width ) {
		width = parseInt( width, 10 );
		// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
		if ( 'undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1 ) {
			width = Math.round( width * window.devicePixelRatio );
		}
		url = addArgToURL( url, 'w', width );
		url = addArgToURL( url, 'h', '' );
		return url;
	};

	var addArgToURL = function ( url, arg, value ) {
		var re = new RegExp( arg + '=[^?&]+' );
		if ( url.match( re ) ) {
			return url.replace( re, arg + '=' + value );
		} else {
			var divider = url.indexOf( '?' ) !== -1 ? '&' : '?';
			return url + divider + arg + '=' + value;
		}
	};

	var stat = function ( names ) {
		if ( typeof names !== 'string' ) {
			names = names.join( ',' );
		}

		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?v=wpcom-no-pv' +
			'&x_carousel=' + names +
			'&baba=' + Math.random();
	};

	var pageview = function ( post_id ) {
		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?host=' + encodeURIComponent( window.location.host ) +
			'&ref=' + encodeURIComponent( document.referrer ) +
			'&rand=' + Math.random() +
			'&' + pageviews_stats_args +
			'&post=' + encodeURIComponent( post_id );
	};

	var generateImgSrc = function ( srcItem, max ) {
		var origSize = srcItem.getAttribute( 'data-orig-size' ) || '';

		var src = srcItem.getAttribute( 'src' ) || srcItem.getAttribute( 'original' ) || srcItem.getAttribute( 'data-original' ) || srcItem.getAttribute( 'data-lazy-src' );
		if ( src.indexOf( 'imgpress' ) !== -1 ) {
			src = srcItem.getAttribute( 'data-orig-file' );
		}
		// Square/Circle galleries use a resize param that needs to be removed.
		src = removeResizeFromImageURL( src );
		src = addWidthToImageURL(
			src,
			findFirstLargeEnoughWidth( origSize.width, origSize.height, max.width, max.height )
		);

		return src;
	};

	window.wpcom.carousel = {
		findFirstLargeEnoughWidth: findFirstLargeEnoughWidth,
		removeResizeFromImageURL: removeResizeFromImageURL,
		addWidthToImageURL: addWidthToImageURL,
		stat: stat,
		pageview: pageview,
		generateImgSrc: generateImgSrc
	};

} )();
;
