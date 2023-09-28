
$(function() {
	
	var c_img = 0;
	
	$("#select-photos li").each( function(){
		c_img += 1;
	});
	
	
	if( c_img >= 2 ) {
	
		$('#select-photos').MySlider(7000,"#select-photos");
	
	}
	
  $(".rev").each(function(){

		var t = $(this).text().replace("|","@");
		
		
		var href = t.split("").reverse().join("");
		$(this).attr( "href", 'mailto:' + href );
		$(this).text(href);
		
	});
	
	$(".sub").hover( function(){
		$("#sub", this).stop().css({'display':'block'}).fadeIn(3000);
	}, function(){
		$("#sub", this).stop().css({'display':'hidden'}).fadeOut('fast');
	});
	
	$(".subsub").hover( function(){
		$("#subsub", this).stop().css({'display':'block'}).fadeIn(3000);
	}, function(){
		$("#subsub", this).stop().css({'display':'hidden'}).fadeOut('fast');
	});
	
	var w = $(window).width();
	var h = $(window).height();
	
	$("#select-photos li").css({'width':w,'height':h});
	
	//
	
	
	$(".open").click(function(){
		
		$(this).fadeOut();
		
		$(".menuapp").animate({'right':0},function(){
			$(".close").show();
		});
		
	});
	

	$(".menuapp .menu_parent a").click(function(){
		
		var id = $(this).attr("rel");
		
		$("#sub_" + id ).fadeIn();
		
		$(".menuapp .menu_parent").animate({'left':"-350px"});
		$(".menuapp .sub").animate({'left':0});
		
	});
	
	$(".menuapp .sub a.link_sub").click(function(){
		
		var id = $(this).attr("rel");
		
		$("#subsub_" + id ).fadeIn();
		
		$(".menuapp .sub").fadeOut('fast');
		$(".menuapp .subsub").animate({'left':0});
		
	});
	
	$(".back_sub").click(function()
	{	
		$(this).parent().fadeOut();
		$(".menuapp .menu_parent").animate({'left':0});
		$(this).parent().animate({'left': '350px'})
	});

	$(".back_subsub").click(function()
	{
		$(this).parent().fadeOut();
		$(".menuapp .sub").show().animate({'left': '0'})
		$(this).parent().animate({'left': '350px'})
	});
	
	$(".menuapp .close").click(function(){
		
		$(this).fadeOut();
		$(".open").show();
		$(".menuapp").animate({'right': '-350px'});
		
	});
	

});

$(window).resize(function(){
	
	var h = $(window).height();
	
		console.log( h );
		
		if( h > 680 )
		{
			
			$(".copyright").css({'opacity':1});
		
		} else {
			
			$(".copyright").css({'opacity':0.3});
		}
	
});
