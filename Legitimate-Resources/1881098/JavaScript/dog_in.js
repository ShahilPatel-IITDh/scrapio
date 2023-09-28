/**
 * 
 */

// trigger the function on load AND on resize
$(window).on('resize',langbarSize);

function langbarSize(){
	// reset classes, for resize
	$('.hidden').removeClass('hidden');
	$('.showit').removeClass('showit');
	// get the size of the parent
	var parentWidth = $('.uvtl-lang').width();
	var parentHeight = $('.uvtl-lang').height();
	// for each list item...
	$('.uvtl-lang > li').each(function () {
		// get it's width and position
		var position = $(this).position();
		var width = $(this).width();
		var height = $(this).height();
		// combine them
		var visibilityX = position.left + width + 5;
		var visibilityY = position.top + height;
		// if the width + position / height + position is more than the width of height of the parent, the item is hidden. For each on:
		if ( visibilityX > parentWidth || visibilityY > parentHeight ){
			// get it's class
			var hideme = $(this).attr('class');
			// find it's counterpart in the 'more' menu and give the counterpart the 'showit' class
			$('.uvtl-sublang li.' + hideme).addClass('showit');
			// and add the 'hidden' class to the original
			$(this).addClass('hidden');
		} else {
			// do nothing
		}
	});
}

$(document).ready(function() {
    /* Top Bar JS */
    $('.uvtl-lang-enhanced').show().css('display', 'table');
    $('.uvtl-more').show();

    langbarSize();
});
