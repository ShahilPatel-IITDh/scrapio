
jQuery('a,input').bind('focus', function() {
    if(!jQuery(this).closest(".menu-item").length && ( jQuery(window).width() <= 992) ) {
    jQuery('.navbar-collapse').removeClass('show');
}})
