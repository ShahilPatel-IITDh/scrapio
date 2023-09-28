( function( $, _ ) {

var PrimaryNavigation = {
	menu: null,
	viewport: null,
	menuHandle: null,
	bodyHandler: null,
	header: null,
	init: function() {
		var _this = this;

		this.viewport = $( 'body > .viewport > .pane' );
		this.header = this.viewport.children( 'header' );
		this.navToggle = $( '.header-main .menu' );

		if( 0 === this.navToggle.length ) {
			return;
		}

		this.menu = $( 'nav.primary' ).on( 'click', function( e ) {
			e.stopPropagation();
		} );

		this.menuHandle = this.navToggle.on( 'click', function( e ) {
			e.preventDefault();

			if ( _this.viewport.is( '.nav-open' ) ) {
				_this.close();
			} else {
				e.stopPropagation();
				_this.open();
			}
		} );

		this.menu.find( '.menu-item-has-children > a' ).on( 'click', function( e ) {
			e.preventDefault();

			var parent = $( this ).parent();

			parent.toggleClass( 'open' );
		} ).eq( 0 ).trigger( 'click' );

		this.bodyHandler = function() {
			_this.close();
		}

		var stickyHeaderTrigger = this.menuHandle.offset().top;
		$( window ).on( 'scroll', _.debounce( function() {
			var scrollTop = Math.max( 0, $( this ).scrollTop() );

			if ( stickyHeaderTrigger < scrollTop && ! _this.header.is( '.sticky' ) &&  ! _this.header.is( '.force-static' ) ) {
				_this.stick();
			} else if ( stickyHeaderTrigger >= scrollTop ) {
				_this.unstick();
			}

			var nav = _this.menu.children( 'ul' );
			if ( parseInt( nav.css( 'top' ) ) > scrollTop ) {
				nav.animate( { top: scrollTop } );
			}
		}, 100 ) ).trigger( 'scroll' );
	},
	open: function() {
		this.viewport.addClass( 'nav-open' ).add( this.viewport.find( '.sticky' ) );
		this.viewport.on( 'click', this.bodyHandler );
		this.menu.children( 'ul' ).css( 'top', $( window ).scrollTop() );
	},
	close: function() {
		if ( this.viewport.is( '.nav-open' ) ) {
			this.viewport.removeClass( 'nav-open' ).add( this.viewport.find( '.sticky' ) );
			this.viewport.off( 'click', this.bodyHandler );
		}
	},
	stick: function() {
		this.viewport.addClass( 'header-stuck' );
		this.header.addClass( 'sticky' );
	},
	unstick: function() {
		this.viewport.removeClass( 'header-stuck' );
		this.header.removeClass( 'sticky' );
	}
}

$( function() {
	PrimaryNavigation.init();
} );

} )( jQuery, _ );
