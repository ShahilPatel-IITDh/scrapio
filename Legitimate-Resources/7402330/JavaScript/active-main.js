$(document).ready(function() {
	
	/*
		Aleksey Skubaev

		askubaev@gmail.com
		icq - 322253350
		Разработка шаблонов для DLE и кроссбраузерная верстка
		------------------
		Необходимые jQuery скрипты.
	
	*/
	
	$('.back1').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '0 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back2').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-36 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back3').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-72 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back4').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-108 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back5').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-144 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back6').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-180 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back7').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-216 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	$('.back8').hover(function() {
		$(this).stop().animate({ color: '#eb974e'}, 300);
		$(this).find('span').stop().animate({backgroundPosition: '-252 -184'},300);
		},function() {
		$(this).stop().animate({ color: '#34495e' }, 300);
		$(this).find('span').stop().removeAttr('style');
    });
	
	//$('.cibinews:odd').find('h2').addClass('cibinews-2');
	//$('.cibinews:nth-child(3n+3)').find('h2').addClass('cibinews-3');
	
	$('.full-news-line a, .full-news-content a').hover(function() {
		$(this).stop().animate({ color: '#0f493e'}, 300);
		},function() {
		$(this).stop().animate({ color: '#16a085' }, 300);
    });
	
	$('.arrow').click(function(){
		$('.left-panel').animate({left:0},500);
		$(this).animate({left:150},500,function(){$('.arrow').hide().css({left:0});$('.arrow2').css({left:150}).show();});
		$('.wrap').animate({marginLeft:150},500);
	});
	
	$('.arrow2').click(function(){
		$('.left-panel').animate({left:-150},500);
		$(this).animate({left:0},500,function(){$('.arrow2').hide();$('.arrow').show();});
		$('.wrap').animate({marginLeft:0},500);
	});
	
	$('.scroll-up').click(function(){
		$('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
	});
	
	$(function(){
	  $(window).scroll(function() { 
	   var top = $(document).scrollTop();
	   if (top > 200) $('.scroll-up').fadeIn(); 
	   else $('.scroll-up').fadeOut(); 
	  });
	 });
	 
	$('.top-menu-link:last').css({'border':0});

});
