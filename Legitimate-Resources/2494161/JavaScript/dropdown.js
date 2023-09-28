$(document).ready(function()
{	
	$(".dropdown .menu").accessibleDropDown();
});

$.fn.accessibleDropDown = function ()
{
	var el = $(this);
	
	/* Setup dropdown menus for IE 6 */
	
	$("li", el).mouseover(function() {
		$(this).addClass("hover");
	}).mouseout(function() {
		$(this).removeClass("hover");
	});
	
	/* Make dropdown menus keyboard accessible */
	
	$("a", el).focus(function() {
		$(this).parents("li").addClass("hover");
	}).blur(function() {
		$(this).parents("li").removeClass("hover");
	});
}