
jQuery(document).ready(function($){
function ds_setup_collapsible_submenus() {
var $menu = $('.et_mobile_menu'),
top_level_link = '.et_mobile_menu .menu-item-has-children > a';
$menu.find('a').each(function() {
$(this).off('click');
if ( $(this).is(top_level_link) ) {
$(this).attr('href', '#');
}
if ( ! $(this).siblings('.sub-menu').length ) {
$(this).on('click', function(event) {
$(this).parents('.mobile_nav').trigger('click');
});
} else {
$(this).on('click', function(event) {
event.preventDefault();
$(this).parent().toggleClass('visible');
});
}
});
}
$(window).load(function() {
setTimeout(function() {
ds_setup_collapsible_submenus();
}, 700);
});
});
