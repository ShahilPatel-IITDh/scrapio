/**
 * Main.
 *
 * @package SimpleShareButtonsAdder
 */

/* exported Main */
var Main = ( function( $, FB ) {
	'use strict';

	return {
		/**
		 * Holds data.
		 */
		data: {},

		/**
		 * Boot plugin.
		 *
		 * @param data
		 */
		boot: function( data ) {
			this.data = data;

			$( document ).ready(
				function() {
					this.init();
				}.bind( this )
			);
		},

		/**
		 * Initialize plugin.
		 */
		init: function() {
			this.listen();
			this.removeP();
		},

		/**
		 * Listener event.
		 */
		listen: function() {
			var self = this;

			// Upon clicking a share button.
			$( 'body' ).on(
				'click',
				'.ssbp-wrap a',
				function( event ) {

					// Don't go the the href yet.
					event.preventDefault();
					self.engageShareButton( this );
				}
			);
		},

		/**
		 * Share button popup
		 *
		 * @param event
		 */
		engageShareButton: function( event ) {

			// If it's facebook mobile.
			if ( 'mobile' === $( event ).data( 'facebook' ) ) {
				FB.ui(
					{
						method: 'share',
						mobile_iframe: true,
						href: $( event ).data( 'href' )
					},
					function( response ) {}
				);
			} else {
				// These share options don't need to have a popup.
				if ( 'copy' === $( event ).data( 'site' ) || 'email' === $( event ).data( 'site' ) || 'print' === $( event ).data( 'site' ) || 'pinterest' === $( event ).data( 'site' ) ) {
					if ( 'copy' === $( event ).data( 'site' ) ) {
						const copybutton = document.querySelector( '[data-site="copy"]' );

						navigator.clipboard.writeText(copybutton.getAttribute('href'));

						if ( copybutton ) {
							const copymessage = document.createElement( 'span' )
							copymessage.innerText = 'URL Copied!';
							copymessage.className = 'copy-notify';
							copymessage.style.opacity = '1';
							copymessage.style.width = '100px';
							copymessage.style.fontSize = '12px';
							copymessage.style.transition = 'all .6s';
							copymessage.style.position = 'absolute';
							copymessage.style.top = '-24px';
							copymessage.style.left = '-24px';
							copybutton.append( copymessage );

							setTimeout( () => {
								copymessage.style.opacity = '0';
								copymessage.style.minWidth = '0';
								copymessage.style.width = '0';
								copymessage.style.padding = '0';
								copymessage.style.overflow = 'hidden';

								setTimeout( () => {
									copymessage.remove();
								}, 1000 );
							}, 1500 );
						}
					} else {
						// Just redirect.
						window.location.href = $( event ).attr( 'href' );
					}
				} else {

					// Prepare popup window.
					var width  = 575,
						height = 520,
						left   = ( $( window ).width() - width ) / 2,
						top    = ( $( window ).height() - height ) / 2,
						opts   = 'status=1' +
								',width=' + width +
								',height=' + height +
								',top=' + top +
								',left=' + left;

					// Open the share url in a smaller window.
					window.open( $( event ).attr( 'href' ), 'share', opts );
				}
			}
		},

		/**
		 * Remove generated p tag from facebook save button.
		 */
		removeP: function() {
		}
	};
} )( window.jQuery, window.FB );
