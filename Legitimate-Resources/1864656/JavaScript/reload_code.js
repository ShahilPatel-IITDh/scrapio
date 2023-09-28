function AAPL_reload_code() {
//This file is generated from the admin panel - dont edit here! 
//wikitogglefunction();
//twittertogglefunction();
//eventstogglefunction();
//iNettuts.init();
//textareagrow();
//register();
jQuery.getScript('/wp-content/themes/habboxv7/js/fontgen.js');
lettersOnly('#fontgen-textvalue');
}

function AAPL_click_code(thiss) {
//This file is generated from the admin panel - dont edit here! 
// highlight the current menu item
jQuery('ul.menu li').each(function() {
	jQuery(thiss).removeClass('current-menu-item');
});
jQuery(thiss).parents('li').addClass('current-menu-item');
}

function AAPL_data_code(dataa) {
//This file is generated from the admin panel - dont edit here! 

}