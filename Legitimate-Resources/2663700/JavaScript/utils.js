$( document ).ready(function() {
	$( "#show_dialog" ).click(function( clicks ) {
		clicks.preventDefault();
		$( "#dialog_overlay" ).fadeIn( "slow" );
		$( "#dialog_box" ).fadeIn( "slow" );
	});
	$("#dialog_overlay, #dialog_box").click(function() {
		$( "#dialog_overlay" ).fadeOut( "slow" );
		$( "#dialog_box" ).fadeOut( "slow" );
	});

	$( "#show_dialog_mac" ).click(function( clicks ) {
		clicks.preventDefault();
		$( "#dialog_overlay_mac" ).fadeIn( "slow" );
		$( "#dialog_box_mac" ).fadeIn( "slow" );
	});
	$("#dialog_overlay_mac, #dialog_box_mac").click(function() {
		$( "#dialog_overlay_mac" ).fadeOut( "slow" );
		$( "#dialog_box_mac" ).fadeOut( "slow" );
	});
});