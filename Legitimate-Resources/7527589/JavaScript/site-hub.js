function FixWorkspace() {
    var heightWorkspace = $(window).height() - $("#ms-designer-ribbon").height();
    var widthWorkspace = $(window).width();
 
   	$("#page-subsidiaries").height(heightWorkspace);
}

$(document).ready(function(){

	var $window = $(window);
	var $body = $('body');
	var $ribbon = $('#ms-designer-ribbon');
	var $modalribbon = $('.ms-cui-menu');
	
	$(window).on('scroll', function(){
		if( $window.scrollTop() > 0 ){
			$modalribbon.css({position: 'fixed !important', top: 0, left: 0, right: 0, zIndex: 11000});
			$ribbon.css({position: 'fixed', top: 0, left: 0, right: 0, zIndex: 11100});
			$body.css('padding-top', $ribbon.outerHeight());
		} else {
			$ribbon.css({position: 'static'});
			$body.css('padding-top', 0);
		}
	});
	
	FixWorkspace();

	var $page = $('#page');
	var $pageSubsidiaries = $('#page-subsidiaries');
	var $pageSubsidiariesItems = $pageSubsidiaries.children();
	var $pageBackground = $('#page-background');
	var delay = 0;
	
	
	// Masquage des elements et décallage des titres
	$pageSubsidiariesItems.css('opacity', 0);
    $pageSubsidiariesItems.find('.sub-title').css('margin-bottom', '20px');
    
    $pageSubsidiariesItems.each(function() {
        var $li = $(this);
        $li.queue('fade', function(next) {
        	$li.find('.sub-title').delay(delay).animate({
        		'margin-bottom': '5px'
        	}, 1000, next);
        	
            $li.delay(delay).animate({
            	opacity: 1
            }, next);
        }).dequeue('fade');
        
        delay += 400;
    });

	
	// Masquage du logo et affichage du fond foncé
	$pageSubsidiaries.on('mouseenter', function(){
		$page.addClass('is-hover');
	}).on('mouseleave', function(){
		$page.removeClass('is-hover');
	});
	
	
	// Changement d'arriere-plan au hover
	var $prevTarget = $pageBackground.find('[data-id=particuliers]');
	$pageSubsidiariesItems.on('mouseenter', function(){
		$prevTarget.removeClass('is-current');
	
		var id = $(this).data('id');
		var $target = $pageBackground.find('[data-id='+id+']');
		$target.addClass('is-current');
		
		$prevTarget = $target;
	});
	
	
	// Acces a une langue specifique d'un univers
	$('[data-href]').on('click', function(){
		$(this).parents('a').attr('href', $(this).data('href'));
	});

});

$(window).resize(function () {
    FixWorkspace();
});