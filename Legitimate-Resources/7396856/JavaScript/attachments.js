( function( $ ) {

var ReadItLater = {
	printFrame: null,
	hasTabs: false,
	init: function() {
		var obj = this;

		this.hasTabs = $( '#content ul.tabs' ).length > 0;

		// if this is a multi-tab report, use custom print handling
		$( '.print' ).on( 'click', function( e ) {
			if ( obj.hasTabs ) {
				e.preventDefault();
				obj.print();
			}
		} );
	},
	print: function() {
		var obj = this;

		if ( this.printFrame ) {
			this.printFrame.get( 0 ).contentWindow.focus();
			this.printFrame.get( 0 ).contentWindow.print();
		} else {
			this.printFrame = $( '<iframe>' ).attr(
				'src',
				window.location.protocol + '//' + window.location.hostname + window.location.pathname + 'view/print/'
			).css( { height: 0, width: '100%' } );

			this.printFrame.load( function() {
				var printWindow = obj.printFrame.get( 0 ).contentWindow;
				printWindow.focus();
				printWindow.print();
			} );

			$( document.body ).append( this.printFrame );
		}
	}
}

$( function() {
	ReadItLater.init();
} );

} )( jQuery );
