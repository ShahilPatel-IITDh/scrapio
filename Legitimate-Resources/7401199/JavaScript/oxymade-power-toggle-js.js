jQuery(document).ready(function($) {
	 var title = $('.oxy-toggle');
	 title.click(function(e) {
		  e.stopPropagation();
	 var  titleId = $(this).attr('id'),
			titleFullId = '#'+titleId,
			icon = $(titleFullId + ' .oxy-expand-collapse-icon'),
			expanded = $(titleFullId).attr('data-oxy-toggle-active-class'),
			allExpanded = $('.oxy-toggle').attr('data-oxy-toggle-active-class'),
		  content = $('.oxy-toggle').next();
		  if($(this).parent(".oxy-tab").length){
			$(this).parent(".oxy-tab").click(); 
		  }
		  content.not($(this).next(content)).slideUp(200);
		  $(this).next(content).slideToggle(200);
		  icon.not($(this).find(icon)).addClass('oxy-eci-collapsed');
		  $(this).find(icon).toggleClass('oxy-eci-collapsed');
		  title.not($(this)).removeClass(expanded);
		  title.not($(this)).removeClass(allExpanded);
		  $(titleFullId).toggleClass(expanded);
	 });
});