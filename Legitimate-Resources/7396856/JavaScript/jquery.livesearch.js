( function( $ ) {

$.fn.livesearch = function() {
	var last_search = '';
	var self = this;
	var use_target = $( '.livesearch-target' ).length > 0;
	self.search_thread = null;

	var livesearch_clear = function() {
		if ( use_target ) {
			$( '.livesearch-target' ).html( '' );
			$( '.livesearch-entry, .livesearch-hide' ).show();
			$( '.livesearch-wrapper' ).removeHighlight();
			return;
		}
		var list = $( '.livesearch-wrapper' );
		var listItems = list.find( '.livesearch-entry' ).show().sort( function( a, b ) {
			return parseInt( $( a ).data( 'entry-idx' ) ) - parseInt( $( b ).data( 'entry-idx' ) );
		} );
		list.find( '.livesearch-entry' ).remove();
		list.append( listItems );
		$( '.livesearch-hide' ).show();
		$( '.livesearch-wrapper' ).removeHighlight();
		$( '.livesearch-wrapper .livesearch-accordion' ).hide();
		$( '.livesearch-wrapper .livesearch-title a' ).removeClass( 'active' );
		last_search = '';
		self.trigger( 'livesearch-clear' );
	}

	$( '.livesearch-clear' ).on( 'click', function() {
		self.val( '' );
		livesearch_clear();
	} );

	$( this ).on( 'keyup', function() {
		var token = $( this ).val().trim();
		if ( token.length == 0 ) {
			livesearch_clear();
			return;
		}
		if ( token == last_search ) return;

		if ( null !== self.search_thread )
			clearTimeout( self.search_thread );

		self.search_thread = setTimeout( function() { self.perform_search( token ) }, 300 );
	} );

	self.perform_search = function( token ) {
		$( '.livesearch-hide' ).hide();
		last_search = token;
		var re = new RegExp( token, 'i' );

		$( '.livesearch-used' ).removeClass( 'livsearch-used' );
		$( '.livesearch-hidden-body' ).hide();
		$( '.livesearch-wrapper, .livesearch-target' ).removeHighlight();
		if ( use_target ) $( '.livesearch-target' ).html( '' );

		// search title
		$( '.livesearch-entry' ).hide().each( function() {
			var $title = $( this ).find( '.livesearch-title' );
			if ( $title.text().match( re ) ) {
				if ( use_target ) {
					var $copy = $( this ).addClass( 'livesearch-used' ).clone();
					$copy.show().appendTo( '.livesearch-target' );
				}
				else {
					$( this ).remove().appendTo( '.livesearch-wrapper' ).show();
				}
			}
		} );
		// search body
		$( '.livesearch-entry' ).filter( ':hidden' ).each( function() {
			if ( !$( this ).hasClass( 'livsearch-used' ) && $( this ).find( '.livesearch-body' ).text().match( re ) ) {
				var body = $( this ).find( '.livesearch-body' );
				if ( body.hasClass( 'livesearch-hidden-body' ) ) body.show();
				if ( body.hasClass( 'livesearch-accordion' ) ) {
					$( body ).show().prev().find( 'a' ).addClass( 'active' );
				}
				if ( use_target ) $( this ).clone().show().appendTo( '.livesearch-target' );
				else $( this ).remove().appendTo( '.livesearch-wrapper' ).show();
			}
		} );
		$( '.livesearch-wrapper, .livesearch-target' ).highlight( token );
		search_thread = null;
		self.trigger('livesearch-complete');
	}
}

$.fn.highlight = function( pat ) {
	function innerHighlight( node, pat ) {
		var skip = 0;
		if ( node.nodeType == 3 ) {
			var pos = node.data.toUpperCase().indexOf( pat );
			if ( pos >= 0 ) {
				var spannode = document.createElement('span');
				spannode.className = 'highlight';
				var middlebit = node.splitText( pos );
				var endbit = middlebit.splitText( pat.length );
				var middleclone = middlebit.cloneNode( true );
				spannode.appendChild( middleclone );
				middlebit.parentNode.replaceChild( spannode, middlebit );
				skip = 1;
			}
		} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test( node.tagName ) ) {
			for ( var i = 0; i < node.childNodes.length; ++i ) {
				i += innerHighlight( node.childNodes[i], pat );
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each( function() {
		innerHighlight( this, pat.toUpperCase() );
	} ) : this;
}

$.fn.removeHighlight = function() {
	return this.find( "span.highlight" ).each( function() {
		this.parentNode.firstChild.nodeName;
		with ( this.parentNode ) {
			replaceChild( this.firstChild, this );
			normalize();
		}
	} ).end();
}

$( document ).on( 'ready', function() {
	$( '.livesearch' ).livesearch();
} );

} )( jQuery );