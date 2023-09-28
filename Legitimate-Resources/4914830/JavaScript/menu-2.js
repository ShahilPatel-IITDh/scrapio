var colors = new Array('#4472B8', '#56439B', '#069547', '#B41E43', '#D74F2B');
var body_Color = "#1D1D1D";
var hover_Color = "#434343";

var search_color = "#1D1D1D";
var search_hover = "#515151";

var inmenu = new Boolean(false);
var slide = new Boolean(true);

var inmenuF = new Boolean(false);
var slideF = new Boolean(true);

var prevMenuCap = "";


$(window).load(function(){
/*-----------------------------------Setting Up Colors---------------------------------------------- */
	$("ul.menu").css("background-color", body_Color);
	$("ul.menu>li.login_form form").css("background-color", body_Color);
	$("ul.menu>li.dropdown>ul").css("background-color", body_Color);

	jQuery("ul.menu>li").not("ul.menu>li.search").each(function(){
		L = colors.length;
		X = $(this).index();
		for(i = 0, j = 0; i <= X; i++, j++)
		{
			if(j == L)
				j = 0;
			if(i == X)
				$(this).css("background-color", colors[j]);
		}
	})
	$("ul.menu>li.search:has(img)").css("background-color", search_color);


/*-----------------------------------Fixxnig Width Of Menus----------------------------------- */
	jQuery("ul.menu>li").not(".search").not(".login_form").each(function(){
		if($(this).width() < 70)
			$(this).css("width", String(80) + "px");
		else
			$(this).css("width", String($(this).width() + 20) + "px");
	})
	
/*-----------------------------------Position fixing of  dropdown menusDrop, loginform down----------------------------------- */

	$("ul.menu>li.dropdown").each(function(){
	
		X = jQuery(this).children("ul").width();
		
		if(X < 150){
			jQuery(this).children("ul").css("width", String(150 + 2) + "px");
		}else{
			jQuery(this).children("ul").css("width", String(X + 2) + "px");
		}
		
		jQuery(this).children("ul").children("li").children("a").each(function(){
		
			if(jQuery(this).children("img").length > 0){
				jQuery(this).children("span").css("float", "right");
			}else{
				if(jQuery(this).children("span").length == 0)
				{
					T = $(this).text();
					$(this).text("");
					$(this).prepend("<span>" + T + "</span>")
				}
				jQuery(this).children("span").css("float", "left");
			}		
		})
	})
	
	
	$("ul.menu>li.dropdown").each(function(){

		X = $(this).offset().left + $(this).width()/2 - jQuery(this).children("ul").width()/2;
		Y = $("ul.menu").offset().top + $("ul.menu").height();
	
		if(X < $("ul.menu").offset().left)
		{
			X = $("ul.menu").offset().left;
		}

		jQuery(this).children("ul").offset({top:Y,left:X})

	})
	
	
	$("ul.menu>li.login_form").each(function(){

		X = $(this).offset().left + $(this).width()/2 + 2 - jQuery(this).children("form").width()/2;
		Y = $("ul.menu").offset().top + $("ul.menu").height();
	
		jQuery(this).children("form").offset({top:Y,left:X})

	})

	
/*------------------------------ Fixing the search -----------------------------*/
	$("ul.menu>li.search").css({'border':'none', 'margin':'0px', 'padding':'0px'});
	jQuery("ul.menu>li.search:has(input)").css("height", "100%");
	
	X = jQuery("ul.menu>li.search:has(input)").children("input").height() + 10;
	Y = jQuery("ul.menu>li.search:has(input)").height();
	T = (Y - X)/2;
	jQuery("ul.menu>li.search:has(input)").children("input").css("margin-top", String(T) + "px");
		
	$("ul.menu>li.search:has(img)").css({'border':'solid 2px white', 
										'margin-top':String(T) + 'px', 'height':String(X -4)+'px', width : String(X -4)+'px',
										'margin-right':'10px'});
	jQuery("ul.menu>li.search:has(img)").children("img").css('height', String(X - 4) + 'px');

	/*------------- Other Fixing -----------------*/
	$("ul.menu>li.search:has(input)").css("cursor", "default");
	
	/*------------- Hiding Elements -----------------*/
			
	$("ul.menu>li.dropdown>img, ul.menu>li.dropdown>ul").hide();
	$("ul.menu>li.login_form>img, ul.menu>li.login_form form").hide();
	$("ul.menu>li.dropdown>img, ul.menu>li.dropdown>ul").css("opacity", "1");

	/* ------------- Events handling ------------*/
	
	$("ul.menu>li:has(a) , ul.menu>li:has(img)").not('.dropdown, .login_form, .search').mouseenter(function(){		
		$(this).css("opacity", ".5");
		$(this).animate({opacity:'1'}, "fast", 'circEaseOut', function(){});
		$(this).css("border", "solid 2px " + hover_Color);
	})

	
	$("ul.menu>li:has(a) , ul.menu>li:has(img)").not('.dropdown, .login_form, .search').mouseleave(function(){
		$(this).css("border", "solid 2px transparent");
	})
	

	$("ul.menu>li.dropdown").mouseenter(function(){
		if(prevMenuCap != $(this).children("a").text())
		{
			slide = true;
			prevMenuCap = jQuery(this).children("a").text();
			$('ul.menu>li.dropdown>img, ul.menu>li.dropdown>ul').hide();
		}
		
		
		if(slide == true)
		{
			$(this).css("opacity", ".5");
			$(this).css("border", "solid 2px " + hover_Color);
			//$(this).animate({padding:'30px'});
		$(this).animate({
			opacity:'1'
		},1000,'circEaseOut',function() {});
		
			$(this).children("ul").slideDown("fast", 'circEaseOut', function(){});
			slide = false;
		}
		inmenu = true;
	})
	
	$("ul.menu>li.dropdown").mouseleave(function(){
		$("ul.menu>li.dropdown").css("border", "solid 2px transparent");
		setTimeout(function(){
			if(inmenu == false){
				jQuery('ul.menu>li.dropdown').children('ul').slideUp("fast", 'circEaseOut', function(){});				
				inmenu = false; 
				slide= true}
				}, 300);
		inmenu = false;

	})
	

	$("ul.menu>li.dropdown>ul>li").mouseenter(function(){
		$(this).css("background-color", hover_Color);
		$(this).css("opacity", ".7");
		$(this).animate({opacity : "1"}, "fast", 'circEaseOut', function(){},'circEaseOut', function(){});
	})

	$("ul.menu>li.dropdown>ul>li").mouseleave(function(){
		$(this).css("background-color", "transparent");
	})
	
	$("ul.menu>li.search input").focus(function(){
		$(this).animate({width:"+=10px"}, "fast", 'circEaseOut', function(){});
	})

	$("ul.menu>li.search input").blur(function(){
		$(this).animate({width:"-=10px"}, "fast", 'circEaseOut', function(){});
	})	
	
	$("ul.menu>li.search:has(img)").mouseenter(function(){
		$(this).css("background-color", search_hover)
	})
	
	$("ul.menu>li.search:has(img)").mouseleave(function(){
		$(this).css("background-color", search_color)
	})

	
	$("ul.menu>li.login_form").mouseenter(function(){
		inmenuF = true;
		if(slideF == true){

			$(this).css("opacity", ".7");
			$(this).animate({opacity : "1"});
			$("ul.menu>li.login_form>img").show();
			$("ul.menu>li.login_form form").slideDown("fast", 'circEaseOut', function(){});
			slideF = false;
		}
	})
	
	$("ul.menu>li.login_form").mouseleave(function(){

		inmenuF = false;
		setTimeout(function(){
				if(inmenuF == false){
					$("ul.menu>li.login_form form").slideUp("fast", 'circEaseOut', function(){});
					$("ul.menu>li.login_form>img").hide();
					slideF = true;
				}}, 300)
	})
})