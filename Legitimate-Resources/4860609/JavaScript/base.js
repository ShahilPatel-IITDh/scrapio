jQuery.fn.exists = function() {
   return $(this).length;
}

$(document).ready( function() {
	
	// Коррекция для горизонтального меню
	$(".tmpl-mainmenu li.dropdown").bind( 'mouseover', function() {
		var li = $(this);
		var ul = li.children('ul:first');
		if ( ul.exists() ) {
			li.children('a:first').addClass('hover');
		}
	} )
	$(".tmpl-mainmenu li.dropdown").bind( 'mouseout', function() {
		var li = $(this);
		var ul = li.children('ul:first');
		li.children('a:first').removeClass('hover');
	} )
	
	// События для подуровней левого меню
	var limouseover = function() {
		var li = $(this);
		var ul = li.children('ul:first');
		var mwidth = li.width();
		if ( ul.exists() && ul.children(':first').exists() ) {
			ul.css( 'left', mwidth+16+'px' );
			li.children('a:first').addClass('hover');
		} else return;
		ul.css( 'visibility', 'visible' );
	}
	var limouseout = function() {
		var li = $(this);
		var ul = li.children('ul:first');
		ul.css( 'visibility', 'hidden' );
		li.children('a:first').removeClass('hover');
	}
	$('.tmpl-leftmenu ul > li').bind( 'mouseover', limouseover );
	$('.tmpl-leftmenu ul > li').bind( 'mouseout', limouseout );

	set_dropdown();
	$(window).resize( function() {
		set_dropdown();
	} );
	
	// Дата
	var now = new Date(), days = ['вс','пн','вт','ср','чт','пт','сб'], months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
	if (now.getDate()<10) { day = '0'+now.getDate() }else{ day = now.getDate() }
	if ((now.getMonth()+1)<10) { month = '0'+(now.getMonth()+1) }else{ month = (now.getMonth()+1) }
	$('.Day').html('<span>'+day+'.'+month+'.'+now.getFullYear()+'</span>')
	
	$('.tmpl-saveus').bind( 'click', function() { saveus(); } )
	
	// Версия для слабовидящих
	$('#check-look').bind( 'click', function() {
		if ($.cookie('disabled-people')){ $.cookie('disabled-people', null, {path:'/'}); } else { $.cookie('disabled-people', true, {expires: 7, path:'/'}); }
		location.reload(true);
	})
	
	// Выпадающее поле поиска
	$('.tmpl-mainmenu .tmpl-search').bind( 'click', function() {
		var block_width = $('.tmpl-mainmenu').width()-$('.tmpl-search').width();
		if ( $(this).hasClass('active') ) {
			$(this).next('#search').hide();
			$(this).removeClass('active');
			$(this).next('#search').css({width: "0", opacity: 0});
		} else {
			$(this).next('#search').show();
			$(this).addClass('active');
			$(this).next('#search').animate({width: block_width, opacity: 1}, 300);
			$(this).next('#search').find('input[name="text"]').css('width', block_width + 'px' );
		}
	} )
	
	// Закладки
	$('.tab-1').css( {'visibility':'visible', 'height':'auto'} );
	$('.tabs > ul > li > a').bind( 'click', function() {
		tabs = $(this).parents('.tabs:first');
		var tab = $(this).attr('rel');
		$(tabs).find('.tab').css( {'visibility':'hidden', 'height':'0'} );
		$(tabs).find(tab).css( {'visibility':'visible', 'height':'auto'} );
		$(tabs).find('ul > li > a').removeClass('active');
		$(this).addClass('active');		
	} )
	
	digitalClock();	
	
	// Фиксация горизонтального меню
	var h_hght = 218; // высота шапки
	var h_mrg = 0; // отступ когда шапка уже не видна
	if ( $('.color-panel').exists() ) {
		var correction = $('.color-panel .title').outerHeight();
		h_hght = h_hght + correction;
		h_mrg = correction;
	}
	$( function() {
		var elem = $('.tmpl-mainmenu-wrapper');
		var top = $(this).scrollTop();
		if ( top > h_hght ) {
			elem.css('top', h_mrg);
		} else {
			elem.css('top', (h_hght-top));
		}
		$(window).scroll( function() {
			top = $(this).scrollTop();
			if ( top+h_mrg < h_hght ) {
				elem.css('top', (h_hght-top));
			} else {
				elem.css('top', h_mrg);
			}
		} )
	} )
	
} )

function set_dropdown() {
	if ( $(window).width()+17 < 768 ) {
		$("li.dropdown").each( function() {
			if ( $(this).find("ul").exists() ) $(this).find('a:first').attr('data-toggle','dropdown');
		} )
	} else {
		$("li.dropdown").each( function() {
			if ( $(this).find("ul").exists() ) $(this).find('a:first').removeAttr('data-toggle');
			$(this).removeClass('open');
		} )
	}
}

// Часы
function digitalClock() {
	var tag = 'div.Time';
	var shwh = true;		//Отображать часы
	var shwm = true;		//Отображать минуты
	var shws = false;		//Отображать секунды
	var devider = ':';		//Разделитель
	
	var classdevider = '<span class="devider">'+devider+'</span>';
	
	if (shwh){ $(tag).append('<span class="hours"></span>') }
	if (shwm){ 
		if (shwh){ $(tag).append( classdevider ) }
		$(tag).append( '<span class="minutes"></span>') 
	}
	if (shws){ 
		if (shwh || shwm){ $(tag).append( classdevider ) }
		$(tag).append( '<span class="seconds"></span>' ) 
	}
	
	function time() {
		var date = new Date();
		var hou = date.getHours().toString();
		var min = date.getMinutes().toString();
		var sec = date.getSeconds().toString();
		hou = (hou<10)?0+hou:hou;
		min = (min<10)?0+min:min;
		sec = (sec<10)?0+sec:sec;
		
		$( tag+' .devider').css({opacity: 1}).each(function() {
			$(this).delay(400).animate({opacity: 0},250);
		})
		
		if (shwh) $( tag+' .hours').html(hou);
		if (shwm)$( tag+' .minutes').html(min);
		if (shws)$( tag+' .seconds').html(sec);
		setTimeout(time,1000);
	}
	time();
}

function addFav() {
	var title = document.title,
	url = document.location,
	UA = navigator.userAgent.toLowerCase(),
	isFF = UA.indexOf('firefox') != -1,
	isMac = UA.indexOf('mac') != -1,
	isWebkit = UA.indexOf('webkit') != -1,
	isIE = UA.indexOf('.net') != -1;
	//alert(UA);
	//alert(isFF+' '+isMac+' '+isWebkit+' '+isIE)
	if ((isIE || isFF) && window.external) { // IE, Firefox
		window.external.AddFavorite(url, title);
		return false;
	}
	if (isMac || isWebkit) { // Webkit (Chrome, Opera), Mac
		document.getElementById('AddFavViaSheens').innerHTML = 'Нажмите "' + (isMac ? 'Command/Cmd' : 'Ctrl') + ' + D" для добавления страницы в закладки';
		return false;
	}
}