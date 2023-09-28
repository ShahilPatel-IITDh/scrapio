/*
Powered by ueeshop.com		http://www.ueeshop.com
å¹¿å·èéç½ç»ç§ææéå¬å¸		020-83226791
*/

$(document).ready(function(){
	/****** å¯¼èªåç±»ä¸æ start ******/
	if($('#nav').attr('page')!='index'){
		$('#nav').delegate('.nav_menu', 'mouseover', function(){$(this).find('.nav_categories').fadeIn(400);});
		$('#nav').delegate('.nav_menu', 'mouseleave', function(){$(this).find('.nav_categories').fadeOut(400);});
	}else{
		$('#nav_outer .nav_categories').show();
		var obj=$('#nav .nav_categories>ul>li');
		for(i=12; i<obj.length; i++){obj.eq(i).remove();}
		var index_category=function(obj){
			if($('body').hasClass('w_1200')){
				$('#nav .nav_categories').css('height', '478px');
				obj.css('display', '');
			}else{
				$('#nav .nav_categories').css('height', '363px');
				obj.eq(10).css('display', 'none');
				obj.eq(11).css('display', 'none');
			}
		}
		
		jQuery(window).resize(function(){index_category(obj)});
		index_category(obj)
	}
	$('#nav').delegate('.nav_categories>ul>li', 'mouseover', function(){
		$(this).find('h2>a').addClass('FontColor').next('em').addClass('NavArrowHoverColor');
		var json=$.evalJSON($(this).attr('data'));
		if(json.length){
			var index=$(this).addClass('hover').index();
			if(!$(this).find('.nav_subcate').length){
				var html='<div class="nav_subcate">';
				for(i=0; i<json.length; i++){
					html=html+'<dl'+(i>=3?' class="tline"':'')+'><dt><a href="'+json[i].url+'" title="'+json[i].text+'">'+json[i].text+'</a></dt>';
					if(json[i].children){
						var jsonchild=json[i].children;
						html=html+'<dd>';
						for(j=0; j<jsonchild.length; j++){
							html=html+'<a href="'+jsonchild[j].url+'" title="'+jsonchild[j].text+'">'+jsonchild[j].text+'</a>';
						}
						html=html+'</dd>';
					}
					html=html+'</dl>';
					if((i+1)%3==0){html=html+'<div class="blank12"></div>';}
				}
				html=html+"</div>";
				$(this).append(html);
			}
			if(index<=11){
				$(this).find('.nav_subcate').css('top',(-index*40-8)+'px');
			}else{
				$(this).find('.nav_subcate').css('bottom',-40+'px');
			}
		}
		$(this).find('em').css('border-color', 'transparent transparent transparent '+$('.CategoryBgColor').css('background-color'));
	});
	$('#nav').delegate('.nav_categories>ul>li', 'mouseleave', function(){$(this).removeClass('hover').find('h2>a').removeClass('FontColor').next('em').css('border-color', 'transparent transparent transparent #ccc').parent().parent().find('.nav_subcate').remove();});
	$('#nav .nav_item li').addClass('NavBorderColor2').children('a').addClass('NavBorderColor1 NavHoverBgColor');
	/****** å¯¼èªåç±»ä¸æ end ******/
	
	/****** å¯¼èªæ¾ç¤º Start ******/
	function navShow(){
		var $obj=$('.nav_item'),
			navItemWidth=0,
			navWidth=$obj.width();
		$obj.css('overflow', 'visible').children('li').each(function(){
			navItemWidth+=$(this).outerWidth();
			if(navItemWidth>navWidth){
				$(this).hide();
			}else{
				$(this).show();
			}
		});
	}
	navShow();
	$(window).resize(function(){ navShow(); });
	/****** å¯¼èªæ¾ç¤º End ******/
});


