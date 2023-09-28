$(function(){
	$('.top_menu_bg a')
		.css( {backgroundPosition: "8px -88px"} )
		.mouseover(function(){
			$(this).stop().animate({backgroundPosition:"(8px -12px)"}, {duration:300})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(8px 20px)"}, {duration:200, complete:function(){
				$(this).css({backgroundPosition: "8px -88px"})
			}})
		})
});


$(function(){
	$('.top_menu_bg a.curent')
		.css( {backgroundPosition: "8px -12px"} )
		.mouseover(function(){
			$(this).stop().animate({backgroundPosition:"(8px -20px)"}, {duration:300})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(8px -12px)"}, {duration:200, complete:function(){
				$(this).css({backgroundPosition: "8px -12px"})
			}})
		})
});

$(function(){
	$('.input_but input')
		.css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$(this).stop().animate({backgroundPosition:"(-80% 0)"}, {duration:500})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:200, complete:function(){
				$(this).css({backgroundPosition: "0 0"})
			}})
		})
});

$(function(){
	$('input.input_but')
		.css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$(this).stop().animate({backgroundPosition:"(-80% 0)"}, {duration:500})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:200, complete:function(){
				$(this).css({backgroundPosition: "0 0"})
			}})
		})
});