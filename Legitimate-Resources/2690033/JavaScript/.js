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
/**
 * Comment Likes - JavaScript
 *
 * This handles liking and unliking comments, as well as viewing who has
 * liked a particular comment.
 *
 * @dependency  Swipe (dynamically loaded when needed)
 *
 * @package     Comment_Likes
 * @subpackage  JavaScript
 */
(function () {
	function init() {
		let extWin;
		let extWinCheck;
		let commentLikeEvent;

		// Only run once.
		if (window.comment_likes_loaded) {
			return;
		}
		window.comment_likes_loaded = true;

		// Client-side cache of who liked a particular comment to avoid
		// having to hit the server multiple times for the same data.
		const commentLikeCache = {};

		let swipeLibPromise;

		// Load the Swipe library, if it's not already loaded.
		function swipeLibLoader() {
			if (!swipeLibPromise) {
				swipeLibPromise = new Promise((resolve, reject) => {
					if (window.Swipe) {
						resolve(window.Swipe);
					} else {
						const swipeScript = document.createElement('script');
						swipeScript.src = comment_like_text.swipeUrl;
						swipeScript.async = true;
						document.body.appendChild(swipeScript);
						swipeScript.addEventListener('load', () => resolve(window.Swipe));
						swipeScript.addEventListener('error', error => reject(error));
					}
				});
			}
			return swipeLibPromise;
		}

		/**
		 * Parse the comment ID from a comment like link.
		 */
		function getCommentId(link) {
			const commentId =
				link && link.getAttribute('href') && link.getAttribute('href').split('like_comment=');
			return commentId[1].split('&_wpnonce=')[0];
		}

		/**
		 * Handle an ajax action on the comment like link.
		 */
		function handleLinkAction(link, action, commentId, callback) {
			const nonce =
				link && link.getAttribute('href') && link.getAttribute('href').split('_wpnonce=')[1];

			fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				body: new URLSearchParams({
					action: action,
					_wpnonce: nonce,
					like_comment: commentId,
					blog_id: Number(link.dataset.blog),
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					Accept: 'application/json',
					'cache-control': 'no-cache',
					pragma: 'no-cache',
				},
			})
				.then(response => response.json())
				.then(callback);
		}

		function startPolling() {
			// Append cookie polling login iframe to this window to wait for user to finish logging in (or cancel)
			const loginIframe = document.createElement('iframe');
			loginIframe.id = 'wp-login-polling-iframe';
			loginIframe.src = 'https://wordpress.com/public.api/connect/?iframe=true';
			document.body.appendChild(loginIframe);
			loginIframe.style.display = 'none';
		}

		function stopPolling() {
			const iframe = document.querySelector('#wp-login-polling-iframe');
			if (iframe) {
				iframe.remove();
			}
		}

		function hide(el) {
			if (el && el.style) {
				el.style.display = 'none';
			}
		}

		function show(el) {
			if (el && el.style) {
				el.style.removeProperty('display');
			}
		}

		// Overlay used for displaying comment like info.
		class Overlay {
			constructor() {
				// Overlay element.
				this.el = document.createElement('div');
				this.el.classList.add('comment-likes-overlay');
				document.body.appendChild(this.el);
				hide(this.el);

				this.el.addEventListener('mouseenter', () => {
					// Don't hide the overlay if the user is mousing over it.
					overlay.cancelHide();
				});

				this.el.addEventListener('mouseleave', () => overlay.requestHide());

				// Inner contents of overlay.
				this.innerEl = null;

				// Instance of the Swipe library.
				this.swipe = null;

				// Timeout used for hiding the overlay.
				this.hideTimeout = null;
			}

			// Initialise the overlay for use, removing any old content.
			clear() {
				// Unload any previous instance of Swipe (to avoid leaking a global
				// event handler). This is done before clearing the contents of the
				// overlay because Swipe expects the slides to still be present.
				if (this.swipe) {
					this.swipe.kill();
					this.swipe = null;
				}
				this.el.innerHTML = '';
				this.innerEl = document.createElement('div');
				this.innerEl.classList.add('inner');
				this.el.appendChild(this.innerEl);
			}

			/**
			 * Construct a list (<ul>) of user (gravatar, name) details.
			 *
			 * @param  data     liker data returned from the server
			 * @param  klass    CSS class to apply to the <ul> element
			 * @param  start    index of user to start at
			 * @param  length   number of users to include in the list
			 *
			 * @return          A container element with the list
			 */
			getUserBits(data, klass, start, length) {
				start = start || 0;
				let last = start + (length || data.length);
				last = last > data.length ? data.length : last;
				const container = document.createElement('div');
				container.classList.add('liker-list');
				let html = `<ul class="${klass || ''}">`;
				for (let i = start; i < last; ++i) {
					const user = data[i];
					html += `
						<li>
							<a rel="nofollow" title="${user.display_name_esc}" href="${user.profile_url_esc}">
								<img src="${user.avatar_url_esc}" alt="${user.display_name_esc}" />
								<span class="user-name">${user.display_name_esc}</span>
							</a>
						</li>
					`;
				}
				html += '</ul>';
				container.innerHTML = html;
				return container;
			}

			/**
			 * Render the display of who has liked this comment. The type of
			 * display depends on how many people have liked the comment.
			 * If more than 10 people have liked the comment, this function
			 * renders navigation controls and sets up the Swipe library for
			 * changing between pages.
			 *
			 * @param link  the element over which the user is hovering
			 * @param data  the results retrieved from the server
			 */
			showLikes(link, data) {
				this.clear();

				link.dataset.likeCount = data.length;
				if (data.length === 0) {
					// No likers after all.
					hide(this.el);
					return;
				}

				this.innerEl.style.padding = '12px';

				if (data.length < 6) {
					// Only one column needed.
					this.innerEl.style.maxWidth = '200px';
					this.innerEl.innerHTML = '';
					this.innerEl.appendChild(this.getUserBits(data, 'single'));
					this.setPosition(link);
				} else if (data.length < 11) {
					// Two columns, but only one page.
					this.innerEl.innerHTML = '';
					this.innerEl.appendChild(this.getUserBits(data, 'double'));
					this.setPosition(link);
				} else {
					// Multiple pages.
					this.renderLikesWithPagination(data, link);
				}
			}

			/**
			 * Render multiple pages of likes with pagination controls.
			 * This function is intended to be called by `showLikes` above.
			 *
			 * @param data  the results retrieved from the server
			 */
			renderLikesWithPagination(data, link) {
				swipeLibLoader().then(() => {
					const page_count = Math.ceil(data.length / 10);
					// Swipe requires two nested containers.
					const swipe = document.createElement('div');
					swipe.classList.add('swipe');
					this.innerEl.appendChild(swipe);

					const wrap = document.createElement('div');
					wrap.classList.add('swipe-wrap');
					swipe.appendChild(wrap);

					for (let i = 0; i < page_count; ++i) {
						wrap.appendChild(this.getUserBits(data, 'double', i * 10, 10));
					}

					/**
					 * Navigation controls.
					 * This is based on the Newdash controls found in
					 *    reader/recommendations-templates.php
					 */
					const nav = document.createElement('nav');
					nav.classList.add('slider-nav');

					let navContents = `
						<a href="#" class="prev">
							<span class="noticon noticon-previous" title="Previous" alt="<"></span>
						</a>
						<span class="position">
					`;
					for (let i = 0; i < page_count; ++i) {
						navContents += `<em data-page="${i}" class="${i === 0 ? 'on' : ''}">&bull;</em>`;
					}
					navContents += `
						</span>
						<a href="#" class="next">
							<span class="noticon noticon-next" title="Next" alt=">"></span>
						</a>
					`;
					this.innerEl.appendChild(nav);
					nav.innerHTML = navContents;

					/** Set up Swipe. **/
					// Swipe cannot be set up successfully unless its container
					// is visible, so we show it now.
					show(this.el);
					this.setPosition(link);

					this.swipe = new Swipe(swipe, {
						callback: function (pos) {
							// Update the pagination indicators.
							//
							// If there are exactly two pages, Swipe has a weird
							// special case where it duplicates both pages and
							// can return index 2 and 3 even though those aren't
							// real pages (see swipe.js, line 47). To deal with
							// this, we use the expression `pos % page_count`.
							pos = pos % page_count;
							nav.querySelectorAll('em').forEach(em => {
								const page = Number(em.dataset.page);
								em.setAttribute('class', pos === page ? 'on' : '');
							});
						},
					});

					nav.querySelectorAll('em').forEach(em => {
						em.addEventListener('click', e => {
							// Go to the page corresponding to the indicator clicked.
							this.swipe.slide(Number(em.dataset.page));
							e.preventDefault();
						});
					});
					// Previous and next buttons.
					nav.querySelector('.prev').addEventListener('click', e => {
						this.swipe.prev();
						e.preventDefault();
					});
					nav.querySelector('.next').addEventListener('click', e => {
						this.swipe.next();
						e.preventDefault();
					});
				});
			}

			/**
			 * Open the overlay and show a loading message.
			 */
			showLoadingMessage(link) {
				this.clear();
				this.innerEl.textContent = comment_like_text.loading;
				this.setPosition(link);
			}

			/**
			 * Position the overlay near the current comment.
			 *
			 * @param link  element near which to position the overlay
			 */
			setPosition(link) {
				// Prepare a down arrow icon for the bottom of the overlay.
				const icon = document.createElement('span');
				this.el.appendChild(icon);
				icon.classList.add('icon', 'noticon', 'noticon-downarrow');
				icon.style.textShadow = '0px 1px 1px rgb(223, 223, 223)';

				const rect = link.getBoundingClientRect();
				const win = document.defaultView;
				const offset = {
					top: rect.top + win.scrollY,
					left: rect.left + win.scrollX,
				};

				// Take measurements with the element fully visible.
				show(this.el);
				let left = offset.left - (this.el.offsetWidth - link.offsetWidth) / 2;
				left = left < 5 ? 5 : left;
				let top = offset.top - this.el.offsetHeight + 5;
				hide(this.el);

				const adminBar = document.querySelector('#wpadminbar');

				// Check if the overlay would appear off the screen.
				if (top < win.scrollY + ((adminBar && adminBar.offsetHeight) || 0)) {
					// We'll display the overlay beneath the link instead.
					top = offset.top + link.offsetHeight;
					// Instead of using the down arrow icon, use an up arrow.
					icon.remove();
					this.el.prepend(icon);
					icon.classList.remove('noticon-downarrow');
					icon.classList.add('noticon-uparrow');
					icon.style.textShadow = '0px -1px 1px rgb(223, 223, 223)';
					icon.style.verticalAlign = 'bottom';
				}

				this.el.style.left = `${left}px`;
				this.el.style.top = `${top}px`;
				show(this.el);

				// The height of the arrow icon differs slightly between browsers,
				// so we compute the margin here to make sure it isn't disjointed
				// from the overlay.
				icon.style.marginTop = `${icon.scrollHeight - 26}px`;
				icon.style.marginBottom = `${20 - icon.scrollHeight}px`;

				// Position the arrow to be horizontally centred on the link.
				icon.style.paddingLeft = `${
					offset.left - left + (link.offsetWidth - icon.scrollWidth) / 2
				}px`;
			}

			/**
			 * Return whether the overlay is visible.
			 */
			isVisible() {
				return this.el.style.getPropertyValue('display') !== 'none';
			}

			/**
			 * Request that the overlay be hidden after a short delay.
			 */
			requestHide() {
				if (this.hideTimeout !== null) {
					return;
				}
				this.hideTimeout = setTimeout(() => {
					hide(this.el);
					this.clear();
				}, 300);
			}

			/**
			 * Cancel a request to hide the overlay.
			 */
			cancelHide() {
				if (this.hideTimeout !== null) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = null;
				}
			}
		}

		// Overlay used for displaying comment like info.
		const overlay = new Overlay();

		// The most recent comment for which the user has requested to see
		// who liked it.
		var relevantComment;

		// Precache after this timeout.
		var precacheTimeout = null;

		/**
		 * Fetch the like data for a particular comment.
		 */
		function fetchLikeData(link, commentId) {
			commentLikeCache[commentId] = null;

			const container = link && link.parentElement && link.parentElement.parentElement;
			const star = container.querySelector('a.comment-like-link');
			star &&
				handleLinkAction(star, 'view_comment_likes', commentId, data => {
					// Populate the cache.
					commentLikeCache[commentId] = data;

					// Only show the overlay if the user is interested.
					if (overlay.isVisible() && relevantComment === commentId) {
						overlay.showLikes(link, data);
					}
				});
		}

		function readCookie(c) {
			const nameEQ = c + '=';
			const cookieStrings = document.cookie.split(';');

			for (let i = 0; i < cookieStrings.length; i++) {
				let cookieString = cookieStrings[i];
				while (cookieString.charAt(0) === ' ') {
					cookieString = cookieString.substring(1, cookieString.length);
				}
				if (cookieString.indexOf(nameEQ) === 0) {
					const chunk = cookieString.substring(nameEQ.length, cookieString.length);
					const pairs = chunk.split('&');
					const cookieData = {};
					for (let num = pairs.length - 1; num >= 0; num--) {
						const pair = pairs[num].split('=');
						cookieData[pair[0]] = decodeURIComponent(pair[1]);
					}
					return cookieData;
				}
			}
			return null;
		}

		function getServiceData() {
			const data = readCookie('wpc_wpc');
			if (data === null || typeof data.access_token === 'undefined' || !data.access_token) {
				return false;
			}
			return data;
		}

		function readMessage(msg) {
			const event = msg.data;

			if (typeof event.event === 'undefined') {
				return;
			}

			if (event.event === 'login' && event.success) {
				extWinCheck = setInterval(function () {
					if (!extWin || extWin.closed) {
						clearInterval(extWinCheck);
						if (getServiceData()) {
							// Load page in an iframe to get the current comment nonce
							const nonceIframe = document.createElement('iframe');
							nonceIframe.id = 'wp-login-comment-nonce-iframe';
							nonceIframe.style.display = 'none';
							nonceIframe.src = commentLikeEvent + '';
							document.body.appendChild(nonceIframe);

							const commentLikeId = (commentLikeEvent + '')
								.split('like_comment=')[1]
								.split('&_wpnonce=')[0];
							let c;

							// Set a 5 second timeout to redirect to the comment page without doing the Like as a fallback
							const commentLikeTimeout = setTimeout(() => {
								window.location = commentLikeEvent;
							}, 5000);

							// Check for a new nonced redirect and use that if available before timing out
							const commentLikeCheck = setInterval(() => {
								const iframe = document.querySelector('#wp-login-comment-nonce-iframe');
								if (iframe) {
									c = iframe.querySelector(`#comment-like-${commentLikeId} .comment-like-link`);
								}
								if (c && typeof c.href !== 'undefined') {
									clearTimeout(commentLikeTimeout);
									clearInterval(commentLikeCheck);
									window.location = c.href;
								}
							}, 100);
						}
					}
				}, 100);

				if (extWin) {
					if (!extWin.closed) {
						extWin.close();
					}
					extWin = false;
				}

				stopPolling();
			}
		}

		if (typeof window.postMessage !== 'undefined') {
			window.addEventListener('message', e => {
				let message = e && e.data;
				if (typeof message === 'string') {
					try {
						message = JSON.parse(message);
					} catch (err) {
						return;
					}
				}

				const type = message && message.type;
				if (type === 'loginMessage') {
					readMessage(message);
				}
			});
		}

		document.body.addEventListener('click', e => {
			let target = e.target;

			// Don't do anything when clicking on the "X people" link.
			if (target.matches('p.comment-likes a.view-likers')) {
				e.preventDefault();
				return;
			}

			// Retrieve the surrounding paragraph to the star, if it hasn't been liked.
			const notLikedPar = target.closest('p.comment-not-liked');

			// Return if not clicking on star or surrounding paragraph.
			if (!target.matches('a.comment-like-link') && !notLikedPar) {
				return;
			}

			// When a comment hasn't been liked, make the text clickable, too.
			if (notLikedPar) {
				target = notLikedPar.querySelector('a.comment-like-link');
				if (!target) {
					return;
				}
			}

			if (target.classList.contains('needs-login')) {
				e.preventDefault();
				commentLikeEvent = target;
				if (extWin) {
					if (!extWin.closed) {
						extWin.close();
					}
					extWin = false;
				}

				stopPolling();

				const url = 'https://wordpress.com/public.api/connect/?action=request&service=wordpress';
				extWin = window.open(
					url,
					'likeconn',
					'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=1,height=560,width=500'
				);

				startPolling();

				return false;
			}

			// Record that the user likes or does not like this comment.
			const commentId = getCommentId(target);
			target.classList.add('loading');

			let commentEl = document.querySelector(`p#comment-like-${commentId}`);
			// Determine whether to like or unlike based on whether the comment is
			// currently liked.
			const action =
				commentEl && commentEl.dataset.liked === 'comment-liked'
					? 'unlike_comment'
					: 'like_comment';
			handleLinkAction(target, action, commentId, data => {
				// Invalidate the like cache for this comment.
				delete commentLikeCache[commentId];

				const countEl = document.querySelector(`#comment-like-count-${data.context}`);
				if (countEl) {
					countEl.innerHTML = data.display;
				}

				commentEl = document.querySelector(`p#comment-like-${data.context}`);
				if (action === 'like_comment') {
					commentEl.classList.remove('comment-not-liked');
					commentEl.classList.add('comment-liked');
					commentEl.dataset.liked = 'comment-liked';
				} else {
					commentEl.classList.remove('comment-liked');
					commentEl.classList.add('comment-not-liked');
					commentEl.dataset.liked = 'comment-not-liked';
				}

				// Prefetch new data for this comment (if there are likers left).
				const parent = target.closest('.comment-likes');
				const link = parent && parent.querySelector('a.view-likers');
				if (link) {
					fetchLikeData(link, commentId);
				}

				target.classList.remove('loading');
			});
			e.preventDefault();
			e.stopPropagation();
		});

		document.body.addEventListener(
			'mouseenter',
			function (e) {
				if (!e.target.matches('p.comment-likes a.view-likers')) {
					return;
				}
				// Show the user a list of who has liked this comment.

				const link = e.target;
				if (Number(link.dataset.likeCount || 0) === 0) {
					// No one has liked this comment.
					return;
				}

				// Don't hide the overlay.
				overlay.cancelHide();

				// Get the comment ID.
				const container = link.parentElement && link.parentElement.parentElement;
				const star = container && container.querySelector('a.comment-like-link');
				const commentId = star && getCommentId(star);
				relevantComment = commentId;

				// Check if the list of likes for this comment is already in
				// the cache.
				if (commentId in commentLikeCache) {
					const entry = commentLikeCache[commentId];
					// Only display the likes if the ajax request is
					// actually done.
					if (entry !== null) {
						overlay.showLikes(link, entry);
					} else {
						// Make sure the overlay is visible (in case
						// the user moved the mouse away while loading
						// but then came back before it finished
						// loading).
						overlay.showLoadingMessage(link);
					}
					return;
				}

				// Position the "Loading..." overlay.
				overlay.showLoadingMessage(link);

				// Fetch the data.
				fetchLikeData(link, commentId);
			},
			true
		);

		document.body.addEventListener(
			'mouseleave',
			e => {
				if (!e.target.matches('p.comment-likes a.view-likers')) {
					return;
				}
				// User has moved cursor away - hide the overlay.
				overlay.requestHide();
			},
			true
		);

		document.body.addEventListener(
			'mouseenter',
			e => {
				if (!e.target.matches('.comment') || !e.target.querySelector('a.comment-like-link')) {
					return;
				}
				// User is moving over a comment - precache the comment like data.
				if (precacheTimeout !== null) {
					clearTimeout(precacheTimeout);
					precacheTimeout = null;
				}

				const star = e.target.querySelector('a.comment-like-link');
				const parent = star.closest('.comment-likes');
				const link = parent && parent.querySelector('a.view-likers');
				if (!link || Number(link.dataset.likeCount || 0) === 0) {
					// No likes.
					return;
				}
				const commentId = getCommentId(star);
				if (commentId in commentLikeCache) {
					// Already in cache.
					return;
				}

				precacheTimeout = setTimeout(() => {
					precacheTimeout = null;
					if (commentId in commentLikeCache) {
						// Was cached in the interim.
						return;
					}
					fetchLikeData(link, commentId);
				}, 1000);
			},
			true
		);
	}

	if (document.readyState !== 'loading') {
		init();
	} else {
		document.addEventListener('DOMContentLoaded', init);
	}
})();
;
!function(e){var o={};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)n.d(t,r,function(o){return e[o]}.bind(null,r));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=273)}({273:function(e,o){!function(){"use strict";let e,o;function n(e){return new Promise((o,n)=>{const t=document.createElement("script");t.onload=()=>o(),t.onerror=e=>n(e),t.src=e,document.body.appendChild(t)})}function t(){if(e)return e;const o=window.wpcom_coblocks_js;return e=n(o.coblocks_lightbox_js),e}function r(){if(o)return o;window.wpcomJQueryUsageLoggerDisabled=!0;const e=window.wpcom_coblocks_js,t=window.jQuery?Promise.resolve():n(e.jquery_core_js).then(()=>n(e.jquery_migrate_js)),r=t.then(()=>window.imagesLoaded?Promise.resolve():n(e.imagesloaded_js)),c=t.then(()=>window.Masonry?Promise.resolve():n(e.masonry_js)),u=Promise.all([t,r,c]).then(()=>n(e.coblocks_masonry_js));return o=u,o}function c(){document.querySelector(".wp-block-coblocks-gallery-masonry")&&r(),document.querySelector(".has-lightbox")&&t(),document.body.classList.contains("block-editor-page")&&(r(),t())}"loading"!==document.readyState?c():document.addEventListener("DOMContentLoaded",c)}()}});;
!function(){"use strict";var e,t={noop:function(){},texturize:function(e){return(e=(e=(e=(e+="").replace(/'/g,"&#8217;").replace(/&#039;/g,"&#8217;")).replace(/"/g,"&#8221;").replace(/&#034;/g,"&#8221;").replace(/&quot;/g,"&#8221;").replace(/[\u201D]/g,"&#8221;")).replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g,'$1="$2"')).trim()},applyReplacements:function(e,t){if(e)return t?e.replace(/{(\d+)}/g,(function(e,r){return void 0!==t[r]?t[r]:e})):e},getBackgroundImage:function(e){var t=document.createElement("canvas"),r=t.getContext&&t.getContext("2d");if(e){r.filter="blur(20px) ",r.drawImage(e,0,0);var o=t.toDataURL("image/png");return t=null,o}}},r=function(){function e(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function r(e,t,r,o){if(!e)return o();e.style.removeProperty("display"),e.style.opacity=t,e.style.transition="opacity 0.2s",e.style.pointerEvents="none";var a=function(t){t.target===e&&"opacity"===t.propertyName&&(e.style.removeProperty("transition"),e.style.removeProperty("opacity"),e.style.removeProperty("pointer-events"),e.removeEventListener("transitionend",a),e.removeEventListener("transitioncancel",a),o())};requestAnimationFrame((function(){requestAnimationFrame((function(){e.addEventListener("transitionend",a),e.addEventListener("transitioncancel",a),e.style.opacity=r}))}))}return{closest:function(t,r){if(t.closest)return t.closest(r);var o=t;do{if(e(o,r))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null},matches:e,hide:function(e){e&&(e.style.display="none")},show:function(e){e&&(e.style.display="block")},fadeIn:function(e,o){r(e,"0","1",o=o||t.noop)},fadeOut:function(e,o){o=o||t.noop,r(e,"1","0",(function(){e&&(e.style.display="none"),o()}))},scrollToElement:function(e,t,r){if(!e||!t)return r?r():void 0;var o=t.querySelector(".jp-carousel-info-extra");o&&(o.style.minHeight=window.innerHeight-64+"px");var a=!0,i=Date.now(),n=t.scrollTop,l=Math.max(0,e.offsetTop-Math.max(0,window.innerHeight-function(e){var t=e.querySelector(".jp-carousel-info-footer"),r=e.querySelector(".jp-carousel-info-extra"),o=e.querySelector(".jp-carousel-info-content-wrapper");if(t&&r&&o){var a=window.getComputedStyle(r),i=parseInt(a.paddingTop,10)+parseInt(a.paddingBottom,10);return i=isNaN(i)?0:i,o.offsetHeight+t.offsetHeight+i}return 0}(t)))-t.scrollTop;function s(){a=!1}l=Math.min(l,t.scrollHeight-window.innerHeight),t.addEventListener("wheel",s),function e(){var c,u=Date.now(),d=(c=(u-i)/300)<.5?2*c*c:1-Math.pow(-2*c+2,2)/2,p=(d=d>1?1:d)*l;if(t.scrollTop=n+p,u<=i+300&&a)return requestAnimationFrame(e);r&&r(),o&&(o.style.minHeight=""),a=!1,t.removeEventListener("wheel",s)}()},getJSONAttribute:function(e,t){if(e&&e.hasAttribute(t))try{return JSON.parse(e.getAttribute(t))}catch(e){return}},convertToPlainText:function(e){var t=document.createElement("div");return t.textContent=e,t.innerHTML},stripHTML:function(e){return e.replace(/<[^>]*>?/gm,"")},emitEvent:function(e,t,r){var o;try{o=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:r||null})}catch(e){(o=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,r||null)}e.dispatchEvent(o)},isTouch:function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}}}();function o(){var o,a,i,n,l="",s=!1,c="div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, figure.wp-block-gallery.has-nested-images, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery",u=".gallery-item, .tiled-gallery-item, .blocks-gallery-item,  .tiled-gallery__item",d=u+", .wp-block-image",p={},m="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.stat?wpcom.carousel.stat:t.noop,g="undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.pageview?wpcom.carousel.pageview:t.noop;function h(t){if(!s)switch(t.which){case 38:t.preventDefault(),p.overlay.scrollTop-=100;break;case 40:t.preventDefault(),p.overlay.scrollTop+=100;break;case 39:t.preventDefault(),e.slideNext();break;case 37:case 8:t.preventDefault(),e.slidePrev();break;case 27:t.preventDefault(),b()}}function f(){s=!0}function v(){s=!1}function y(){p.overlay||(p.overlay=document.querySelector(".jp-carousel-overlay"),p.container=p.overlay.querySelector(".jp-carousel-wrap"),p.gallery=p.container.querySelector(".jp-carousel"),p.info=p.overlay.querySelector(".jp-carousel-info"),p.caption=p.info.querySelector(".jp-carousel-caption"),p.commentField=p.overlay.querySelector("#jp-carousel-comment-form-comment-field"),p.emailField=p.overlay.querySelector("#jp-carousel-comment-form-email-field"),p.authorField=p.overlay.querySelector("#jp-carousel-comment-form-author-field"),p.urlField=p.overlay.querySelector("#jp-carousel-comment-form-url-field"),window.innerWidth<=760&&Math.round(window.innerWidth/760*110)<40&&r.isTouch(),[p.commentField,p.emailField,p.authorField,p.urlField].forEach((function(e){e&&(e.addEventListener("focus",f),e.addEventListener("blur",v))})),p.overlay.addEventListener("click",(function(e){var t,o,a=e.target,i=!!r.closest(a,".jp-carousel-close-hint"),n=!!window.matchMedia("(max-device-width: 760px)").matches;if(a===p.overlay){if(n)return;b()}else if(i)b();else if(a.classList.contains("jp-carousel-image-download"))m("download_original_click");else if(a.classList.contains("jp-carousel-comment-login"))t=p.currentSlide,o=t?t.attrs.attachmentId:"0",window.location.href=jetpackCarouselStrings.login_url+"%23jp-carousel-"+o;else if(r.closest(a,"#jp-carousel-comment-form-container"))!function(e){var t=e.target,o=r.getJSONAttribute(p.container,"data-carousel-extra")||{},a=p.currentSlide.attrs.attachmentId,i=document.querySelector("#jp-carousel-comment-form-submit-and-info-wrapper"),n=document.querySelector("#jp-carousel-comment-form-spinner"),l=document.querySelector("#jp-carousel-comment-form-button-submit"),s=document.querySelector("#jp-carousel-comment-form");if(p.commentField&&p.commentField.getAttribute("id")===t.getAttribute("id"))f(),r.show(i);else if(r.matches(t,'input[type="submit"]')){e.preventDefault(),e.stopPropagation(),r.show(n),s.classList.add("jp-carousel-is-disabled");var c={action:"post_attachment_comment",nonce:jetpackCarouselStrings.nonce,blog_id:o.blog_id,id:a,comment:p.commentField.value};if(!c.comment.length)return void w(jetpackCarouselStrings.no_comment_text,!1);if(1!==Number(jetpackCarouselStrings.is_logged_in)&&(c.email=p.emailField.value,c.author=p.authorField.value,c.url=p.urlField.value,1===Number(jetpackCarouselStrings.require_name_email))){if(!c.email.length||!c.email.match("@"))return void w(jetpackCarouselStrings.no_comment_email,!1);if(!c.author.length)return void w(jetpackCarouselStrings.no_comment_author,!1)}var u=new XMLHttpRequest;u.open("POST",jetpackCarouselStrings.ajaxurl,!0),u.setRequestHeader("X-Requested-With","XMLHttpRequest"),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),u.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&this.status>=200&&this.status<300){var e;try{e=JSON.parse(this.response)}catch(e){return void w(jetpackCarouselStrings.comment_post_error,!1)}"approved"===e.comment_status?w(jetpackCarouselStrings.comment_approved,!0):"unapproved"===e.comment_status?w(jetpackCarouselStrings.comment_unapproved,!0):w(jetpackCarouselStrings.comment_post_error,!1),E(),q(a),l.value=jetpackCarouselStrings.post_comment,r.hide(n),s.classList.remove("jp-carousel-is-disabled")}else w(jetpackCarouselStrings.comment_post_error,!1)};var d=[];for(var m in c)if(m){var g=encodeURIComponent(m)+"="+encodeURIComponent(c[m]);d.push(g.replace(/%20/g,"+"))}var h=d.join("&");u.send(h)}}(e);else if(r.closest(a,".jp-carousel-photo-icons-container")||a.classList.contains("jp-carousel-photo-title"))!function(e){e.preventDefault();var t=e.target,o=p.info.querySelector(".jp-carousel-info-extra"),a=p.info.querySelector(".jp-carousel-image-meta"),i=p.info.querySelector(".jp-carousel-comments-wrapper"),n=p.info.querySelector(".jp-carousel-icon-info"),l=p.info.querySelector(".jp-carousel-icon-comments");function s(){l&&l.classList.remove("jp-carousel-selected"),n.classList.toggle("jp-carousel-selected"),i&&i.classList.remove("jp-carousel-show"),a&&(a.classList.toggle("jp-carousel-show"),a.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}function c(){n&&n.classList.remove("jp-carousel-selected"),l.classList.toggle("jp-carousel-selected"),a&&a.classList.remove("jp-carousel-show"),i&&(i.classList.toggle("jp-carousel-show"),i.classList.contains("jp-carousel-show")?o.classList.add("jp-carousel-show"):o.classList.remove("jp-carousel-show"))}(r.closest(t,".jp-carousel-icon-info")||t.classList.contains("jp-carousel-photo-title"))&&(a&&a.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,s):(s(),r.scrollToElement(p.info,p.overlay))),r.closest(t,".jp-carousel-icon-comments")&&(i&&i.classList.contains("jp-carousel-show")?r.scrollToElement(p.overlay,p.overlay,c):(c(),r.scrollToElement(p.info,p.overlay)))}(e);else if(!r.closest(a,".jp-carousel-info"))return})),window.addEventListener("keydown",h),p.overlay.addEventListener("jp_carousel.afterOpen",(function(){v(),p.slides.length<=1||(p.slides.length<=5?r.show(p.info.querySelector(".jp-swiper-pagination")):r.show(p.info.querySelector(".jp-carousel-pagination")))})),p.overlay.addEventListener("jp_carousel.beforeClose",(function(){f(),document.documentElement.style.removeProperty("height"),e&&e.enable(),r.hide(p.info.querySelector(".jp-swiper-pagination")),r.hide(p.info.querySelector(".jp-carousel-pagination"))})),p.overlay.addEventListener("jp_carousel.afterClose",(function(){window.history.pushState?history.pushState("",document.title,window.location.pathname+window.location.search):window.location.href="",l="",p.isOpen=!1})),p.overlay.addEventListener("touchstart",(function(e){e.touches.length>1&&e.preventDefault()})))}function w(e,t){var o=p.overlay.querySelector("#jp-carousel-comment-post-results"),a="jp-carousel-comment-post-"+(t?"success":"error");o.innerHTML='<span class="'+a+'">'+e+"</span>",r.hide(p.overlay.querySelector("#jp-carousel-comment-form-spinner")),p.overlay.querySelector("#jp-carousel-comment-form").classList.remove("jp-carousel-is-disabled"),r.show(o)}function j(){var e=document.querySelectorAll("a img[data-attachment-id]");Array.prototype.forEach.call(e,(function(e){var t=e.parentElement,o=t.parentElement;if(!o.classList.contains("gallery-icon")&&!r.closest(o,u)&&t.hasAttribute("href")){var a=!1;t.getAttribute("href").split("?")[0]===e.getAttribute("data-orig-file").split("?")[0]&&1===Number(jetpackCarouselStrings.single_image_gallery_media_file)&&(a=!0),t.getAttribute("href")===e.getAttribute("data-permalink")&&(a=!0),a&&(t.classList.add("single-image-gallery"),t.setAttribute("data-carousel-extra",JSON.stringify({blog_id:Number(jetpackCarouselStrings.blog_id)})))}}))}function S(o){(!o||o<0||o>p.slides.length)&&(o=0),p.currentSlide=p.slides[o];var a,i,n=p.currentSlide,s=n.attrs.attachmentId;!function(e){var t=e.el,r=e.attrs,o=t.querySelector("img");if(!o.hasAttribute("data-loaded")){var a=!!r.previewImage,i=r.thumbSize;!a||i&&t.offsetWidth>i.width?o.src=r.src:o.src=r.previewImage,o.setAttribute("itemprop","image"),o.setAttribute("data-loaded",1)}}(p.slides[o]),1!==Number(jetpackCarouselStrings.display_background_image)||p.slides[o].backgroundImage||function(t){var r=t.el;e&&e.slides&&(r=e.slides[e.activeIndex]);var o=t.attrs.originalElement;o.complete&&0!==o.naturalHeight?A(t,r,o):o.onload=function(){A(t,r,o)}}(p.slides[o]),r.hide(p.caption),function(e){var t,o,a,i,n="",l="",s="";if(t=p.overlay.querySelector(".jp-carousel-photo-caption"),o=p.overlay.querySelector(".jp-carousel-caption"),a=p.overlay.querySelector(".jp-carousel-photo-title"),i=p.overlay.querySelector(".jp-carousel-photo-description"),r.hide(t),r.hide(o),r.hide(a),r.hide(i),n=k(e.caption)||"",l=k(e.title)||"",s=k(e.desc)||"",(n||l||s)&&(n&&(t.innerHTML=n,o.innerHTML=n,r.show(t),r.show(o)),r.stripHTML(n)===r.stripHTML(l)&&(l=""),r.stripHTML(n)===r.stripHTML(s)&&(s=""),r.stripHTML(l)===r.stripHTML(s)&&(s=""),s&&(i.innerHTML=s,r.show(i),l||n||(t.innerHTML=r.stripHTML(s),r.show(t))),l)){var c=r.stripHTML(l);a.innerHTML=c,n||(t.innerHTML=c,o.innerHTML=c,r.show(t)),r.show(a)}}({caption:n.attrs.caption,title:n.attrs.title,desc:n.attrs.desc}),function(e){if(!e||1!==Number(jetpackCarouselStrings.display_exif))return!1;var t=p.info.querySelector(".jp-carousel-image-meta ul.jp-carousel-image-exif"),r="";for(var o in e){var a=e[o],i=jetpackCarouselStrings.meta_data||[];if(0!==parseFloat(a)&&a.length&&-1!==i.indexOf(o)){switch(o){case"focal_length":a+="mm";break;case"shutter_speed":a=x(a);break;case"aperture":a="f/"+a}r+="<li><h5>"+jetpackCarouselStrings[o]+"</h5>"+a+"</li>"}}t.innerHTML=r,t.style.removeProperty("display")}(p.slides[o].attrs.imageMeta),function(e){if(!e)return!1;var r,o=[e.attrs.origWidth,e.attrs.origHeight],a=document.createElement("a");a.href=e.attrs.src.replace(/\?.+$/,""),r=null!==a.hostname.match(/^i[\d]{1}\.wp\.com$/i)?a.href:e.attrs.origFile.replace(/\?.+$/,"");var i=p.info.querySelector(".jp-carousel-download-text"),n=p.info.querySelector(".jp-carousel-image-download");i.innerHTML=t.applyReplacements(jetpackCarouselStrings.download_original,o),n.setAttribute("href",r),n.style.removeProperty("display")}(n),1===Number(jetpackCarouselStrings.display_comments)&&(a=p.slides[o].attrs.commentsOpened,i=p.container.querySelector(".jp-carousel-comment-form-container"),1===parseInt(a,10)?r.fadeIn(i):r.fadeOut(i),q(s),r.hide(p.info.querySelector("#jp-carousel-comment-post-results")));var c=p.info.querySelector(".jp-carousel-pagination");if(c&&p.slides.length>5){var u=o+1;c.innerHTML="<span>"+u+" / "+p.slides.length+"</span>"}jetpackCarouselStrings.stats&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?"+jetpackCarouselStrings.stats+"&post="+encodeURIComponent(s)+"&rand="+Math.random()),g(s),window.location.hash=l="#jp-carousel-"+s}function b(){document.body.style.overflow=a,document.documentElement.style.overflow=i,E(),f(),r.emitEvent(p.overlay,"jp_carousel.beforeClose"),window.scrollTo(window.scrollX||window.pageXOffset||0,n||0),e.destroy(),p.isOpen=!1,p.slides=[],p.currentSlide=void 0,p.gallery.innerHTML="",r.fadeOut(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterClose")}))}function L(e,t,r){var o=r?e.replace(/.*=([\d]+%2C[\d]+).*$/,"$1"):e.replace(/.*-([\d]+x[\d]+)\..+$/,"$1"),a=o!==e?r?o.split("%2C"):o.split("x"):[t,0];return"9999"===a[0]&&(a[0]="0"),"9999"===a[1]&&(a[1]="0"),a}function x(e){return e>=1?Math.round(10*e)/10+"s":"1/"+Math.round(1/e)+"s"}function k(e){return!e.match(" ")&&e.match("_")?"":e}function q(e,t){var a=void 0===t,i=p.info.querySelector(".jp-carousel-icon-comments .jp-carousel-has-comments-indicator");if(i.classList.remove("jp-carousel-show"),clearInterval(o),e){(!t||t<1)&&(t=0);var n=p.info.querySelector(".jp-carousel-comments"),l=p.info.querySelector("#jp-carousel-comments-loading");r.show(l),a&&(r.hide(n),n.innerHTML="");var s=new XMLHttpRequest,c=jetpackCarouselStrings.ajaxurl+"?action=get_attachment_comments&nonce="+jetpackCarouselStrings.nonce+"&id="+e+"&offset="+t;s.open("GET",c),s.setRequestHeader("X-Requested-With","XMLHttpRequest");var u=function(){r.fadeIn(n),r.fadeOut(l)};s.onload=function(){if(p.currentSlide&&p.currentSlide.attrs.attachmentId===e){var c,d=s.status>=200&&s.status<300;try{c=JSON.parse(s.responseText)}catch(e){}if(!d||!c||!Array.isArray(c))return u();a&&(n.innerHTML="");for(var m=0;m<c.length;m++){var g=c[m],h=document.createElement("div");h.classList.add("jp-carousel-comment"),h.setAttribute("id","jp-carousel-comment-"+g.id),h.innerHTML='<div class="comment-gravatar">'+g.gravatar_markup+'</div><div class="comment-content"><div class="comment-author">'+g.author_markup+'</div><div class="comment-date">'+g.date_gmt+"</div>"+g.content+"</div>",n.appendChild(h),clearInterval(o),o=setInterval((function(){p.container.scrollTop+150>window.innerHeight&&(q(e,t+10),clearInterval(o))}),300)}c.length>0&&(r.show(n),i.innerText=c.length,i.classList.add("jp-carousel-show")),r.hide(l)}},s.onerror=u,s.send()}}function A(e,r,o){var a=t.getBackgroundImage(o);e.backgroundImage=a,r.style.backgroundImage="url("+a+")",r.style.backgroundSize="cover"}function E(){p.commentField&&(p.commentField.value="")}function H(e,o){p.slides=[];var a={width:window.innerWidth,height:window.innerHeight-64};0!==o&&((new Image).src=e[o].getAttribute("data-gallery-src"));var i=!!r.closest(e[0],".tiled-gallery.type-rectangular");Array.prototype.forEach.call(e,(function(e,o){var n=r.closest(e,"a"),l=e.getAttribute("data-orig-file")||e.getAttribute("src-orig"),s=e.getAttribute("data-attachment-id")||e.getAttribute("data-id")||"0",c=document.querySelector('img[data-attachment-id="'+s+'"] + figcaption');c=c?c.innerHTML:e.getAttribute("data-image-caption");var u={originalElement:e,attachmentId:s,commentsOpened:e.getAttribute("data-comments-opened")||"0",imageMeta:r.getJSONAttribute(e,"data-image-meta")||{},title:e.getAttribute("data-image-title")||"",desc:e.getAttribute("data-image-description")||"",mediumFile:e.getAttribute("data-medium-file")||"",largeFile:e.getAttribute("data-large-file")||"",origFile:l||"",thumbSize:{width:e.naturalWidth,height:e.naturalHeight},caption:c||"",permalink:n&&n.getAttribute("href"),src:l||e.getAttribute("src")||""},d=r.closest(e,".tiled-gallery-item"),m=d&&d.querySelector(".tiled-gallery-caption"),g=m&&m.innerHTML;g&&(u.caption=g);var h=function(e){var t=e.getAttribute("data-orig-size")||"";if(t){var r=t.split(",");return{width:parseInt(r[0],10),height:parseInt(r[1],10)}}return{width:e.getAttribute("data-original-width")||e.getAttribute("width")||void 0,height:e.getAttribute("data-original-height")||e.getAttribute("height")||void 0}}(e);if(u.origWidth=h.width||u.thumbSize.width,u.origHeight=h.height||u.thumbSize.height,"undefined"!=typeof wpcom&&wpcom.carousel&&wpcom.carousel.generateImgSrc?u.src=wpcom.carousel.generateImgSrc(e,a):u.src=function(e){if("object"!=typeof e&&(e={}),void 0===e.origFile)return"";if(void 0===e.origWidth||void 0===e.maxWidth)return e.origFile;if(void 0===e.mediumFile||void 0===e.largeFile)return e.origFile;var t=document.createElement("a");t.href=e.largeFile;var r=/^i[0-2]\.wp\.com$/i.test(t.hostname),o=L(e.mediumFile,e.origWidth,r),a=L(e.largeFile,e.origWidth,r),i=parseInt(a[0],10),n=parseInt(a[1],10),l=parseInt(o[0],10),s=parseInt(o[1],10);if(e.origMaxWidth=e.maxWidth,e.origMaxHeight=e.maxHeight,void 0!==window.devicePixelRatio&&window.devicePixelRatio>1&&(e.maxWidth=e.maxWidth*window.devicePixelRatio,e.maxHeight=e.maxHeight*window.devicePixelRatio),i>=e.maxWidth||n>=e.maxHeight)return e.largeFile;if(l>=e.maxWidth||s>=e.maxHeight)return e.mediumFile;if(r){var c=e.largeFile.lastIndexOf("?"),u=e.largeFile;return-1!==c&&(u=e.largeFile.substring(0,c),(e.origWidth>e.maxWidth||e.origHeight>e.maxHeight)&&(e.origMaxWidth=2*e.maxWidth,e.origMaxHeight=2*e.maxHeight,u+="?fit="+e.origMaxWidth+"%2C"+e.origMaxHeight)),u}return e.origFile}({origFile:u.src,origWidth:u.origWidth,origHeight:u.origHeight,maxWidth:a.width,maxHeight:a.height,mediumFile:u.mediumFile,largeFile:u.largeFile}),e.setAttribute("data-gallery-src",u.src),"0"!==u.attachmentId){u.title=t.texturize(u.title),u.desc=t.texturize(u.desc),u.caption=t.texturize(u.caption);var f=new Image;f.src=u.src;var v=document.createElement("div");v.classList.add("swiper-slide"),v.setAttribute("itemprop","associatedMedia"),v.setAttribute("itemscope",""),v.setAttribute("itemtype","https://schema.org/ImageObject");var y=document.createElement("div");y.classList.add("swiper-zoom-container"),p.gallery.appendChild(v),v.appendChild(y),y.appendChild(f),v.setAttribute("data-attachment-id",u.attachmentId),v.setAttribute("data-permalink",u.permalink),v.setAttribute("data-orig-file",u.origFile),i&&(u.previewImage=u.src);var w={el:v,attrs:u,index:o};p.slides.push(w)}}))}function T(e,t){if(!window.Swiper670){var o=document.querySelector("#jp-carousel-loading-overlay");r.show(o);var a=document.createElement("script");return a.id="jetpack-carousel-swiper-js",a.src=window.jetpackSwiperLibraryPath.url,a.async=!0,a.onload=function(){r.hide(o),C(e,t)},a.onerror=function(){r.hide(o)},void document.head.appendChild(a)}C(e,t)}function C(t,o){var l,s={imgSelector:".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]",startIndex:0},c=r.getJSONAttribute(t,"data-carousel-extra");if(c&&(y(),!p.isOpen)){for(var u in p.isOpen=!0,a=getComputedStyle(document.body).overflow,document.body.style.overflow="hidden",i=getComputedStyle(document.documentElement).overflow,document.documentElement.style.overflow="hidden",n=window.scrollY||window.pageYOffset||0,p.container.setAttribute("data-carousel-extra",JSON.stringify(c)),m(["open","view_image"]),o||{})s[u]=o[u];-1===s.startIndex&&(s.startIndex=0),r.emitEvent(p.overlay,"jp_carousel.beforeOpen"),p.gallery.innerHTML="",p.overlay.style.opacity=1,p.overlay.style.display="block",H(t.querySelectorAll(s.imgSelector),s.startIndex),(e=new window.Swiper670(".jp-carousel-swiper-container",{centeredSlides:!0,zoom:!0,loop:p.slides.length>1,enabled:p.slides.length>1,pagination:{el:".jp-swiper-pagination",clickable:!0},navigation:{nextEl:".jp-swiper-button-next",prevEl:".jp-swiper-button-prev"},initialSlide:s.startIndex,on:{init:function(){S(s.startIndex)}},preventClicks:!1,preventClicksPropagation:!1,preventInteractionOnTransition:!r.isTouch(),threshold:5})).on("slideChange",(function(e){S(0===e.activeIndex?p.slides.length-1:e.activeIndex===p.slides.length+1?0:e.activeIndex-1),p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("zoomChange",(function(e,t){t>1&&p.overlay.classList.add("jp-carousel-hide-controls"),1===t&&p.overlay.classList.remove("jp-carousel-hide-controls")})),e.on("doubleTap",(function(e){if(clearTimeout(l),1===e.zoom.scale)var t=setTimeout((function(){p.overlay.classList.remove("jp-carousel-hide-controls"),clearTimeout(t)}),150)})),e.on("tap",(function(){e.zoom.scale>1&&(l=setTimeout((function(){p.overlay.classList.toggle("jp-carousel-hide-controls")}),150))})),r.fadeIn(p.overlay,(function(){r.emitEvent(p.overlay,"jp_carousel.afterOpen")}))}}document.body.addEventListener("click",(function(e){if(window.CSS&&window.CSS.supports&&window.CSS.supports("display","grid")){var t,o=e.target,a=r.closest(o,c);if(a){if(!(t=a)||!t.getAttribute("data-carousel-extra"))return;var i=o.parentElement,n=i.parentElement,l=null;if(n&&n.classList.contains("wp-block-image")?l=i.getAttribute("href"):i&&i.classList.contains("wp-block-image")&&i.querySelector(":scope > a")&&(l=i.querySelector(":scope > a").getAttribute("href")),l&&l.split("?")[0]!==o.getAttribute("data-orig-file").split("?")[0]&&l!==o.getAttribute("data-permalink"))return;if(i.classList.contains("gallery-caption"))return;if(r.matches(i,"figcaption"))return;document.documentElement.style.height="auto",e.preventDefault(),e.stopPropagation();var s=r.closest(o,d),u=Array.prototype.indexOf.call(a.querySelectorAll(d),s);T(a,{startIndex:u})}}})),1===Number(jetpackCarouselStrings.single_image_gallery)&&(j(),document.body.addEventListener("is.post-load",(function(){j()}))),window.addEventListener("hashchange",(function(){var t=/jp-carousel-(\d+)/;if(window.location.hash&&t.test(window.location.hash)){if(window.location.hash!==l||!p.isOpen)if(window.location.hash&&p.gallery&&!p.isOpen&&history.back)history.back();else{l=window.location.hash;for(var r,o,a=window.location.hash.match(t),i=parseInt(a[1],10),n=document.querySelectorAll(c),s=0;s<n.length;s++){for(var u,d=n[s],m=d.querySelectorAll("img"),g=0;g<m.length;g++)if(parseInt(m[g].getAttribute("data-attachment-id"),10)===i||parseInt(m[g].getAttribute("data-id"),10)===i){u=g;break}if(void 0!==u){r=d,o=u,p.isOpen?(S(o),e.slideTo(o+1)):T(r,{startIndex:o});break}}}}else p.isOpen&&b()})),window.location.hash&&r.emitEvent(window,"hashchange")}"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)}();;
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
!function(){var e=document.currentScript;function t(t){var n=document.createElement("script"),o=e||document.getElementsByTagName("script")[0];n.setAttribute("async",!0),n.setAttribute("src",t),o.parentNode.insertBefore(n,o)}function n(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function o(e,t){if(e.closest)return e.closest(t);var o=e;do{if(n(o,t))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null}function i(e,t){for(var n=0;n<e.length;n++)t(e[n],n,e)}var r=".sharing-hidden .inner",s="data-sharing-more-button-id";function a(e){this.button=e,this.pane=o(e,"div").querySelector(r),this.openedBy=null,this.recentlyOpenedByHover=!1,a.instances.push(this),this.pane.setAttribute(s,a.instances.length-1),this.attachHandlers()}if(a.instances=[],a.hoverOpenDelay=200,a.recentOpenDelay=400,a.hoverCloseDelay=300,a.instantiateOrReuse=function(e){var t=o(e,"div").querySelector(r),n=t&&t.getAttribute(s),i=a.instances[n];return i||new a(e)},a.getButtonInstanceFromPane=function(e){var t=e&&e.getAttribute(s);return a.instances[t]},a.closeAll=function(){for(var e=0;e<a.instances.length;e++)a.instances[e].close()},a.prototype.open=function(){var e,t,n=[0,0];function o(e){var t=e.getBoundingClientRect();return[t.left+(window.scrollX||window.pageXOffset||0),t.top+(window.scrollY||window.pageYOffset||0)]}function i(e,t){return parseInt(getComputedStyle(e).getPropertyValue(t)||0)}for(e=o(this.button),t=this.button.offsetParent||document.documentElement;t&&(t===document.body||t===document.documentElement)&&"static"===getComputedStyle(t).getPropertyValue("position");)t=t.parentNode;t&&t!==this.button&&1===t.nodeType&&(n=[(n=o(t))[0]+i(t,"border-left-width"),n[1]+i(t,"border-top-width")]);var r,s=e[0]-n[0]-i(this.button,"margin-left"),a=e[1]-n[1]-i(this.button,"margin-top");this.pane.style.left=s+"px",this.pane.style.top=a+this.button.offsetHeight+3+"px",(r=this.pane)&&r.style.removeProperty("display")},a.prototype.close=function(){var e;(e=this.pane)&&(e.style.display="none"),this.openedBy=null},a.prototype.toggle=function(){var e;(e=this.pane)&&"none"!==e.style.display?this.close():this.open()},a.prototype.nonHoverOpen=function(){clearTimeout(this.openTimer),clearTimeout(this.closeTimer),this.recentlyOpenedByHover?(this.recentlyOpenedByHover=!1,clearTimeout(this.hoverOpenTimer),this.open()):this.toggle()},a.prototype.resetCloseTimer=function(){clearTimeout(this.closeTimer),this.closeTimer=setTimeout(this.close.bind(this),a.hoverCloseDelay)},a.prototype.attachHandlers=function(){this.buttonClick=function(e){e.preventDefault(),e.stopPropagation(),this.openedBy="click",this.nonHoverOpen()}.bind(this),this.buttonKeydown=function(e){13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),e.stopPropagation(),this.openedBy="keydown",this.nonHoverOpen())}.bind(this),this.buttonEnter=function(){this.openedBy||(this.openTimer=setTimeout(function(){this.open(),this.openedBy="hover",this.recentlyOpenedByHover=!0,this.hoverOpenTimer=setTimeout(function(){this.recentlyOpenedByHover=!1}.bind(this),a.recentOpenDelay)}.bind(this),a.hoverOpenDelay)),clearTimeout(this.closeTimer)}.bind(this),this.buttonLeave=function(){"hover"===this.openedBy&&this.resetCloseTimer(),clearTimeout(this.openTimer)}.bind(this),this.paneEnter=function(){clearTimeout(this.closeTimer)}.bind(this),this.paneLeave=function(){"hover"===this.openedBy&&this.resetCloseTimer()}.bind(this),this.documentClick=function(){this.close()}.bind(this),this.button.addEventListener("click",this.buttonClick),this.button.addEventListener("keydown",this.buttonKeydown),document.addEventListener("click",this.documentClick),void 0===document.ontouchstart&&(this.button.addEventListener("mouseenter",this.buttonEnter),this.button.addEventListener("mouseleave",this.buttonLeave),this.pane.addEventListener("mouseenter",this.paneEnter),this.pane.addEventListener("mouseleave",this.paneLeave))},window.sharing_js_options&&window.sharing_js_options.counts){var c={done_urls:[],get_counts:function(){var e,n,o,i,r;if("undefined"!=typeof WPCOM_sharing_counts)for(e in WPCOM_sharing_counts)if(o=WPCOM_sharing_counts[e],void 0===c.done_urls[o]){for(i in n={pinterest:[window.location.protocol+"//api.pinterest.com/v1/urls/count.json?callback=WPCOMSharing.update_pinterest_count&url="+encodeURIComponent(e)]})if(document.querySelector("a[data-shared=sharing-"+i+"-"+o+"]")){for(;r=n[i].pop();)t(r);window.sharing_js_options.is_stats_active&&c.bump_sharing_count_stat(i)}c.done_urls[o]=!0}},update_pinterest_count:function(e){void 0!==e.count&&1*e.count>0&&c.inject_share_count("sharing-pinterest-"+WPCOM_sharing_counts[e.url],e.count)},inject_share_count:function(e,t){i(document.querySelectorAll("a[data-shared="+e+"] > span"),(function(e){var n,o=e.querySelector(".share-count");(n=o)&&n.parentNode&&n.parentNode.removeChild(n);var i=document.createElement("span");i.className="share-count",i.textContent=c.format_count(t),e.appendChild(i)}))},format_count:function(e){return e<1e3?e:e>=1e3&&e<1e4?String(e).substring(0,1)+"K+":"10K+"},bump_sharing_count_stat:function(e){(new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?v=wpcom-no-pv&x_sharing-count-request="+e+"&r="+Math.random()}};window.WPCOMSharing=c}function u(e,t){e.setAttribute("jetpack-share-click-count",t)}function d(e){var t=e.getAttribute("jetpack-share-click-count");return null===t?0:parseInt(t,10)}function l(e,t){var n,o=new XMLHttpRequest;o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),o.setRequestHeader("x-requested-with","XMLHttpRequest"),o.send((n=t,(encodeURIComponent("email-share-nonce")+"="+encodeURIComponent(n)).replace(/%20/g,"+")))}function h(){p()}function p(){window.WPCOMSharing&&window.WPCOMSharing.get_counts(),i(document.querySelectorAll(".sharedaddy a"),(function(e){var t=e.getAttribute("href");t&&-1!==t.indexOf("share=")&&-1===t.indexOf("&nb=1")&&e.setAttribute("href",t+"&nb=1")})),i(document.querySelectorAll(".sharedaddy a.sharing-anchor"),(function(e){a.instantiateOrReuse(e)})),void 0!==document.ontouchstart&&document.body.classList.add("jp-sharing-input-touch"),i(document.querySelectorAll(".sharedaddy ul"),(function(e){"true"!==e.getAttribute("data-sharing-events-added")&&(e.setAttribute("data-sharing-events-added","true"),i(e.querySelectorAll("a.share-print"),(function(e){e.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var n=e.getAttribute("href")||"",i=function(){if(-1===n.indexOf("#print")){var e=(new Date).getTime();t=e,o=n,(i=document.createElement("iframe")).setAttribute("style","position:fixed; top:100; left:100; height:1px; width:1px; border:none;"),i.setAttribute("id","printFrame-"+t),i.setAttribute("name",i.getAttribute("id")),i.setAttribute("src",o),i.setAttribute("onload",'frames["printFrame-'+t+'"].focus();frames["printFrame-'+t+'"].print();'),document.body.appendChild(i)}else window.print();var t,o,i},s=o(e,r);if(s){var c=a.getButtonInstanceFromPane(s);c&&(c.close(),i())}else i()}))})),i(e.querySelectorAll("a.share-press-this"),(function(e){e.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var n="";if(window.getSelection?n=window.getSelection():document.getSelection?n=document.getSelection():document.selection&&(n=document.selection.createRange().text),n){var o=e.getAttribute("href");e.setAttribute("href",o+"&sel="+encodeURI(n))}window.open(e.getAttribute("href"),"t","toolbar=0,resizable=1,scrollbars=1,status=1,width=720,height=570")||(document.location.href=e.getAttribute("href"))}))})),i(e.querySelectorAll("a.share-email"),(function(t){u(t,0);var n,o,r=t.getAttribute("data-email-share-nonce"),s=t.getAttribute("data-email-share-track-url");r&&s&&(n=s,o=window.location.protocol+"//"+window.location.hostname+"/",0===String(n).indexOf(o))&&t.addEventListener("click",(function(){var n;u(n=t,d(n)+1),d(t)>2&&function(e,t){var n=t.parentElement;if(n.classList.contains("sd-content")){i(n.querySelectorAll(".share-email-error"),(function(e){e.parentElement.removeChild(e)}));var o=document.createElement("div");o.className="share-email-error";var r=document.createElement("h6");r.className="share-email-error-title",r.innerText=e.getAttribute("data-email-share-error-title"),o.appendChild(r);var s=document.createElement("p");s.className="share-email-error-text",s.innerText=e.getAttribute("data-email-share-error-text"),o.appendChild(s),n.appendChild(o)}}(t,e),l(s,r)}))})))})),i(document.querySelectorAll("li.share-email, li.share-custom a.sharing-anchor"),(function(e){e.classList.add("share-service-visible")}))}"loading"!==document.readyState?h():document.addEventListener("DOMContentLoaded",h),document.body.addEventListener("is.post-load",p)}();;
