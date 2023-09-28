
jQuery( document ).ready(function() {
    var h1len = jQuery('h1').length;
    if(h1len > 1){
    	jQuery('.single-post header.entry-header h1').remove();
    }
});
