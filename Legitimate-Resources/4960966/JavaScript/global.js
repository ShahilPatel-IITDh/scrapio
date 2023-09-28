/*
Powered by ueeshop.com		http://www.ueeshop.com
å¹¿å·èéç½ç»ç§ææéå¬å¸		020-83226791
*/

//åå§åç»è®¡å½æ°
var analytics_click_statistics=function(obj){};
//åç«¯æ¾ç¤ºæ¹å¼(0:èªéåº 1:çªå± 2:å®½å±)
$.fn.webDisplay=function(type){
	if(type==0){
		if($(window).width()>=1280){$('body').addClass('w_1200');}
		if($(window).width()>=1500){$('body').addClass('w_1440');}
		if($(window).width()>=1700){$('body').addClass('w_1680');}
		$(window).resize(function(){
			if($(window).width()>=1280){
				$('body').addClass('w_1200');
			}else{
				$('body').removeClass('w_1200');
			}
			if($(window).width()>=1500){
				$('body').addClass('w_1440');
			}else{
				$('body').removeClass('w_1440');
			}
			if($(window).width()>=1700){
				$('body').addClass('w_1680');
			}else{
				$('body').removeClass('w_1680');
			}
		});
	}else if(type==2){
		$('body').addClass('w_1200');
	}
}

//loadingå è½½ææ
$.fn.loading=function(e){
	e=$.extend({opacity:.5,size:"big"},e);
	$(this).each(function(){
		if($(this).hasClass("masked")) return;
		var obj=$(this);
		var l=$('<div class="loading"></div>').css("opacity", 0);
		obj.addClass("masked").append(l);
		//var lb=$('<div class="loading_msg loading_big"></div>').appendTo(obj);
		var lb=$('<div class="loading_msg loading_'+e.size+'"></div>').appendTo(obj);
		lb.css({
			top: obj.height() / 2 - (lb.height() + parseInt(lb.css("padding-top")) + parseInt(lb.css("padding-bottom"))) / 2,
			left: obj.width() / 2 - (lb.width() + parseInt(lb.css("padding-left")) + parseInt(lb.css("padding-right"))) / 2
		});
	});
	return this;
}
//åæ¶loadingå è½½ææ
$.fn.unloading=function(){
	$(this).each(function(){
		$(this).find(".loading_msg, .loading").remove();
		$(this).removeClass("masked");
	});
}

//æ»å¨æä»¶
$.fn.carousel=function(e){
	e=$.extend({itemsPerMove:2,duration:1e3,vertical:!1,specification:"",width:0,height:0,step:1,preCtrEntity:"pre_arrow",nextCtrEntity:"next_arrow"},e);
	var t=this,
		n=t.find(".viewport"),
		r=n.find(".list"),
		i,s,o,u,a,f=!1,
		l={
			init:function(){
				var oFirst=r.children(":first"),
					oLast=r.children(":last"),
					l,c,list_len=r.children().length;

				if(e.vertical){	//å¤æ­æ»å¨æ¹å¼
					l=Math.max(oFirst.outerHeight(!0), oLast.outerHeight(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerHeight(!0)-oFirst.outerHeight();
					t.addClass("vertical").css({height:e.height||i-c, width:e.width||oFirst.outerWidth(!0)});
					r.height(l*list_len);
					if(l*list_len>(e.height || i-c)){
						s={scrollTop:"-="+i};
						o={scrollTop:i};
						u={scrollTop:"-="+i*e.step};
						a={scrollTop:i*e.step};
						this.bind_event();
					}
				}else{
					l=Math.max(oFirst.outerWidth(!0), oLast.outerWidth(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerWidth(!0)-oFirst.outerWidth();
					t.addClass("horizontal").css({height:e.height||oFirst.outerHeight(!0), width:e.width||i-c});
					r.width(l*list_len);
					if(l*list_len>(e.width || i-c)){
						s={scrollLeft:"-="+i};
						o={scrollLeft:"+="+i};
						u={scrollLeft:"-="+i*e.step};
						a={scrollLeft:i*e.step};
						this.bind_event();
					}
				}
			},
			step_prev:function(t){
				if(f) return;f=!0;
				for(var o=0;o<e.itemsPerMove;o++)r.prepend(r.children(":last"));
				n[e.vertical?"scrollTop":"scrollLeft"](i).stop().animate(s,{
					duration:e.duration,
					complete:function(){
						l.current(0);
						t-=1;
						f=!1;
						t>0 && l.step_prev(t);
					}
				});
			},
			step_next:function(t){
				if(f) return;
				f=!0;
				n.stop().animate(o, {
					duration:e.duration,
					complete:function(){
						l.current(1);
						l.repeatRun(function(){
							r.children(":last").after(r.children(":first"))
						}, e.itemsPerMove);
						e.vertical?n.scrollTop(0):n.scrollLeft(0);
						t-=1;
						f=!1;
						t>0 && l.step_next(t);
					}
				})
			},
			moveSlide:function(t){
				t==="next"?this.step_next(e.step):this.step_prev(e.step)
			},
			repeatRun:function(e,t){
				for(var n=0; n<t; n++) e()
			},
			bind_event:function(){
				t.find(".btn").on("click", function(e){
					l.moveSlide($(this).hasClass("prev")?"prev":"next")
				});
			},
			current:function(t){
				var b=r.find("li.current");
				t?b.next().addClass('current').siblings().removeClass('current'):b.prev().addClass('current').siblings().removeClass('current');
				b=r.find("li.current");
				$(".detail_pic .big_box").attr("href", $('#shopbox_outer').length?'javascript:;':b.find("img").attr("mask"));
				$(".detail_pic .normal").attr("src", b.find("img").attr("normal"));

				if(b.attr('pos')=='video'){ //è§é¢
					$(".detail_pic .big_box").hide();
					$(".detail_pic .video_container").show();
				}else{ //å¾ç
					$(".detail_pic .big_box").show().attr("href", $('#shopbox_outer').length?'javascript:;':b.find("img").attr("mask"));
					$(".detail_pic .normal").attr("src", b.find("img").attr("normal"));
					$(".detail_pic .video_container").hide().find('.ytp-chrome-bottom .ytp-play-button').click();
				}
			}
		}
	l.init();
}

//åè®¡æ¶æä»¶
$.fn.genTimer=function(e){
	function u(e){
		var t=Math.floor(e/n),
			r=Math.floor((e-t*n)/36e5),
			i=Math.floor((e-t*n-r*1e3*60*60)/6e4),
			s=Math.floor((e-t*n-r*1e3*60*60-i*1e3*60)/1e3);
		return {hours:("0"+r).slice(-2), minutes:("0"+i).slice(-2), seconds:("0"+s).slice(-2), dates:t}
	}

	var t={
			beginTime:new Date,
			day_label:(ueeshop_config.lang=='zh_tw'?"å¤©":"day"),
			days_label:(ueeshop_config.lang=='zh_tw'?"å¤©":"days"),
			unitWord:{hours:":", minutes:":", seconds:""},
			day_unitWord:'',
			type:"day",
			callbackOnlyDatas:!1
		},
		n=864e5,
		r=$.extend({}, t, e),
		i=this;

	r.targetTime=r.targetTime.replace(/\-/g, "/");
	var s=new Date(r.targetTime)-new Date(r.beginTime),
	o=function(){
		if(s<0){
			r.callback.call(i, r.callbackOnlyDatas ? {hours:"00", minutes:"00", seconds:"00",dates:0}: "00"+r.unitWord.hours+"00"+r.unitWord.minutes+"00");
			clearInterval(i.interval);
		}else{
			var e=u(s);
			if(r.callbackOnlyDatas) r.callback.call(i, e);
			else if(r.type=="day") s>=n*2 ? r.callback.call(i, '<span class="day_count">'+e.dates+(r.day_unitWord?r.day_unitWord:'')+'</span><span class="day">'+r.days_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : s>=n ? r.callback.call(i, '<span class="day_count">'+e.dates+'</span><span class="day">'+r.day_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : r.callback.call(i, '<span class="seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			else if(r.type=="diffNoDay"){
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="hours">'+t+'</span><span class="miniutes">'+r.unitWord.hours+e.minutes+'</span><span class="senconds">'+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}else if(r.type=="day_separate"){
				var day_str='';
				if(s>=n*2){
					day_str=r.days_label;
				}else{
					day_str=r.day_label;
				}
				if(e.dates < 10) e.dates = '0'+e.dates;
				r.callback.call(i, (s>=n ? '<span class="day_count"><span class="d">'+String(e.dates).substr(0,1)+'</span><span class="d">'+String(e.dates).substr(1,1)+'</span>'+(e.dates>99 ? '<span class="d">'+String(e.dates).substr(2,1)+'</span>' : '')+'</span><span class="day">'+day_str+'</span>' : '' )+'<span class="day_seconds">'+'<span class="t">'+e.hours.substr(0,1)+'</span><span class="t">'+e.hours.substr(1,1)+'</span><span class="s">'+r.unitWord.hours+'</span><span class="t">'+e.minutes.substr(0,1)+'</span><span class="t">'+e.minutes.substr(1,1)+'</span><span class="s">'+r.unitWord.minutes+'</span><span class="t">'+e.seconds.substr(0,1)+'</span><span class="t">'+e.seconds.substr(1,1)+'</span><span class="s">'+r.unitWord.seconds+'</span></span>');
			}else{
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="seconds">'+t+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}
		}
		s-=1e3
	};
	i.interval=setInterval(o, 1e3);
	if (typeof(seckill_timer)=='object'){
		seckill_timer.push(i.interval);//ç§æé¡µé¢è®¡æ¶å¨IDï¼é²æ­¢æ¶é´ä¹±è·³
	}
	o();
	return this
}

//åäº«æä»¶
$.fn.shareThis=function(type, title, url){
	var image=back_url=encode_url="";
	if(url==undefined){
		url=window.location.href;
	}
	if(url.indexOf("#")>0){
		url=url.substring(0, url.indexOf("#"));
	}
	if(type=="pinterest"){
		//image=window.location.protocol+'//'+window.location.host+$(".big_box .big_pic>img").attr("src");
		//var url=$(".big_box .big_pic>img").attr("src");
		image=$(".big_box .big_pic>img").attr("src");
		//æ²¡æäº§åä¸»å¾ ç¨logoä»£æ¿
		if(!image){
			image = $('#header .logo img').attr('src');
		}
		if(image.indexOf('ueeshop.ly200-cdn.com')!=-1){
			image=$(".big_box .big_pic>img").attr("src");
		}else{
			image=window.location.protocol+'//'+window.location.host+$(".big_box .big_pic>img").attr("src");
		}
	}
	if(image!="" && image!=undefined){
		image=encodeURIComponent(image);
	}
	e_url=encodeURIComponent(url);
	title=encodeURIComponent(title);
	switch(type){
		case "delicious":
			back_url = "https://delicious.com/post?title=" + title + "&url=" + e_url;
			break;
		case "digg":
			back_url = "http://digg.com/submit?phase=2&url=" + e_url + "&title=" + title + "&bodytext=&topic=tech_deals";
			break;
		case "reddit":
			back_url = "http://reddit.com/submit?url=" + e_url + "&title=" + title;
			break;
		case "furl":
			back_url = "http://www.furl.net/savedialog.jsp?t=" + title + "&u=" + e_url;
			break;
		case "rawsugar":
			back_url = "http://www.rawsugar.com/home/extensiontagit/?turl=" + e_url + "&tttl=" + title;
			break;
		case "stumbleupon":
			back_url = "http://www.stumbleupon.com/submit?url=" + e_url + "&title=" + title;
			break;
		case "blogmarks":
			break;
		case "facebook":
			back_url = "http://www.facebook.com/share.php?src=bm&v=4&u=" + e_url + "&t=" + title;
			break;
		case "technorati":
			back_url = "http://technorati.com/faves?sub=favthis&add=" + e_url;
			break;
		case "spurl":
			back_url = "http://www.spurl.net/spurl.php?v=3&title=" + title + "&url=" + e_url;
			break;
		case "simpy":
			back_url = "http://www.simpy.com/simpy/LinkAdd.do?title=" + title + "&href=" + e_url;
			break;
		case "ask":
			break;
		case "google":
			back_url = "http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + e_url + "&title=" + title;
			break;
		case "netscape":
			back_url = "http://www.netscape.com/submit/?U=" + e_url + "&T=" + title + "&C=";
			break;
		case "slashdot":
			back_url = "http://slashdot.org/bookmark.pl?url=" + url + "&title=" + title;
			break;
		case "backflip":
			back_url = "http://www.backflip.com/add_page_pop.ihtml?title=" + title + "&url=" + e_url;
			break;
		case "bluedot":
			back_url = "http://bluedot.us/Authoring.aspx?u=" + e_url + "&t=" + title;
			break;
		case "kaboodle":
			back_url = "http://www.kaboodle.com/za/selectpage?p_pop=false&pa=url&u=" + e_url;
			break;
		case "squidoo":
			back_url = "http://www.squidoo.com/lensmaster/bookmark?" + e_url;
			break;
		case "twitter":
			back_url = "https://twitter.com/share?text=" + title + "&url=" + e_url;
			break;
		case "pinterest":
			back_url = "http://pinterest.com/pin/create/button/?url=" + e_url + "&media=" + image + "&description=" + title;
			break;
		case "vk":
			back_url = "http://vk.com/share.php?url=" + url;
			break;
		case "bluedot":
			back_url = "http://blinkbits.com/bookmarklets/save.php?v=1&source_url=" + e_url + "&title=" + title;
			break;
		case "blinkList":
			back_url = "http://blinkbits.com/bookmarklets/save.php?v=1&source_url=" + e_url + "&title=" + title;
			break;
		case "linkedin":
			back_url = "http://www.linkedin.com/cws/share?url=" + e_url + "&title=" + title;
			break;
		case "googleplus":
			back_url = "https://plus.google.com/share?url=" + e_url;
			break;
	}
	window.open(back_url, "bookmarkWindow");
}

Number.prototype.formatMoney=function(places, decimal, thousand){
	places=!isNaN(places=Math.abs(places))?places:2;
	thousand=thousand || ',';
	decimal=decimal || '.';
	var number=this,
		negative=number<0?'-':'',
		i=parseInt(number=Math.abs(+number || 0).toFixed(places), 10)+'',
		j=(j=i.length)>3?j%3:0;
	return negative+(j?i.substr(0, j)+thousand:'')+i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand)+(places?decimal+Math.abs(number-i).toFixed(places).slice(2):'');
};

$.fn.FloatPrice=function(price){ //å¤çä»·æ ¼ æ¾å¤§1000ååä¸åæ´ è¿åä¸¤ä½å°æ°
	var result=0;
	// result=(Math.floor(parseFloat(price)*1000)/1000).toFixed(2);
	result=parseFloat(parseFloat(price).toFixed(8).match(/^\d+(?:\.\d{0,2})?/));
	return parseFloat(result);
}

//å³é­äº§åè¯¦ç»å¼¹åºæ¡ï¼this:#shopbox
$.fn.shopboxHide=function(){
	var obj=$(this);
	if(obj.length){
		//obj.find('.shopbox_wrap').animate({opacity:0}, {
		obj.animate({opacity:0}, {
			duration: 250,
			easing: 'swing',
			complete: function(){
				obj.parents('body').removeClass('hidden').css('margin-right', 0);
				obj.find('.shopbox_frame').hide().attr('src', '//about:blank').end().empty();
				global_obj.div_mask(1);
				obj.remove();
			}
		});
	}
}

//æ£æ¥ç»å½ç¶æ
$.fn.checkUser=function(){
	$.post('/?do_action=user.check_user&t='+Math.random(), '', function(data){
		if(data.ret==1){
			ueeshop_config['UserId']=data.msg['UserId']; //æ´æ°ç»å½ç¶æ
		}
	}, 'json');
}

//è´­ä¹°æµç¨ï¼å¼¹åºä¼åç»å½æ¡æèè®¿å®¢ç»§ç»­ä»æ¬¾
$.fn.loginOrVisitors=function(url, type, cancelback){
	var comeback=(typeof(arguments[3])=='undefined')?'':arguments[3];//ç»å½æååæ§è¡å½æ°
	var obj=$(this);
	if(ueeshop_config['TouristsShopping']==0 && ueeshop_config['UserId']==0/* && global_obj.getCookie('loginOrVisitors')!='ok'*/){
		user_obj.set_form_sign_in('', url, type);
		user_obj.sign_in_init(cancelback);
		comeback && $('form[name=signin_form]').append('<input type="hidden" name="comeback" value="'+comeback+'" />');
		//global_obj.setCookie('loginOrVisitors', 'ok', 86400);
	}else{
		if(type==1) window.location.href=url;
		return false;
	}
}

//å®æ¶è®¢åè¯·æ±
$.fn.realTimeOrder = function(Type){
    $.post('?', {'do_action':'action.set_real_time_order', 'Type':Type}, function(data) {
        if (data.ret == 1) {
			$('#real_time_order').css('opacity', 1)
            $('#real_time_order .pro_image>img').attr('src', data.msg.Image);
            $('#real_time_order .buy_info').text(data.msg.Info);
            $('#real_time_order .title>a').text(data.msg.Title).attr('href', data.msg.Url);
            $('#real_time_order .time').text(data.msg.Time);
        } else {
            $('#real_time_order').remove();
            if (typeof($RealTimeOrder) != 'undefined' && $RealTimeOrder) clearInterval($RealTimeOrder);
        }
    }, 'json');
}

function loadImg(obj){
    var file	= obj.files[0],		//è·åæä»¶
    	reader	= new FileReader(),	//åå»ºè¯»åæä»¶çå¯¹è±¡
		imgFile = '';
	if(file){
		//å·²éæ©
		reader.onload=function(e){ //ä¸ºæä»¶è¯»åæåè®¾ç½®äºä»¶
			imgFile=e.target.result;
			window.document.getElementById('pic_show').innerHTML='<img src="'+imgFile+'" alt="" /><span></span>';
		};
		reader.readAsDataURL(file); //æ­£å¼è¯»åæä»¶
	}else{
		//åæ¶éæ©
		window.document.getElementById('pic_show').innerHTML='<img src="" alt="" /><span></span>';
	}
}

// æ°çè¯è®º start
function loadReviewImg(obj,Id){
    var file	= obj.files[0],		//è·åæä»¶
    	reader	= new FileReader(),	//åå»ºè¯»åæä»¶çå¯¹è±¡
		imgFile = '';

	if(file){
		$('#'+Id).parents('.upload_box').addClass('on');
		$('#'+Id).parents('.upload_box').find('.close').show();

		var Num=$('#review_form .inbox_popup_input .upload_box').length,
			html='',
			ImgNum=$('#review_form .inbox_popup_input .upload_box.on').length;

		html+='<div class="upload_box">';
			html+='<input class="upload_file" id="upload_file_'+Num+'" type="file" name="PicPath_'+Num+'" onchange="loadReviewImg(this,\'pic_show_'+Num+'\');" accept="image/gif,image/jpeg,image/png" />';
			html+='<div class="num_tips"><em>'+(Num+1)+'</em>/3</div>';
			html+='<div class="close" onclick="ReviewImgDel(\'pic_show_'+Num+'\',\'upload_file_'+Num+'\')">X</div>';
			html+='<label for="upload_file_'+Num+'"><div id="pic_show_'+Num+'" class="pic_box"></div></label>';
		html+='</div>';
		if(Num<3){
			$("#review_form .inbox_popup_input .upload_box:last").after(html);
		}
		$('#review_form .inbox_popup_input .upload_box').eq(ImgNum).show();

		//å·²éæ©
		reader.onload=function(e){ //ä¸ºæä»¶è¯»åæåè®¾ç½®äºä»¶
			imgFile=e.target.result;
			window.document.getElementById(Id).innerHTML='<img src="'+imgFile+'" alt="" /><span></span><input type="hidden" name="FileName[]" value="'+imgFile+'">';
		};
		reader.readAsDataURL(file); //æ­£å¼è¯»åæä»¶

	}else{
		remove_review_img(Id);
		window.document.getElementById(Id).innerHTML='<img src="" alt="" /><span></span>';
	}
}
function ReviewImgDel(Id,obj){
	var Num=$('#review_form .inbox_popup_input .upload_box').length,
		file = $("#"+obj);
	file.after(file.clone().val(""));
	file.remove();
	remove_review_img(Id);
	window.document.getElementById(Id).innerHTML='<img src="" alt="" /><span></span>';
}

function remove_review_img(Id){
	$('#'+Id).parents('.upload_box').removeClass('on');
	$('#'+Id).parents('.upload_box').find('.close').hide();
	var ImgNum=$('#review_form .inbox_popup_input .upload_box.on').length,
		index=$('#'+Id).parents('.upload_box').index();
	$('#review_form .inbox_popup_input .upload_box').hide();
	$('#review_form .inbox_popup_input .upload_box.on').show();
	if(index!=2){
		$('#review_form .inbox_popup_input .upload_box:last').after($('#'+Id).parents('.upload_box'));
	}
	sort_review_img();
	$('#review_form .inbox_popup_input .upload_box').eq(ImgNum).show();
}

function sort_review_img(){
	$('#review_form .inbox_popup_input .upload_box').each(function(){
		var Num=$(this).index();
		$(this).find('.num_tips em').text(Num+1);
	});
}
// æ°çè¯è®º end

function close_prolist_addtocart_window(){ //å³é­äº§ååè¡¨é¡µè´­ç©å¼¹çª
	$('body').delegate('#div_mask, .new_win_alert .btn_cancel, .new_win_alert .close', 'click', function(){
		if($('body').find('.new_win_alert').length){
			$('body').find('.new_win_alert').remove();
			$('body').find('#div_mask').remove();
		}
	});
}

$(document).ready(function(){
	//å¯¼èªä¸æ
	setTimeout(function(){
		$('#nav').css('overflow','visible');
	},800);
	$('.small_nav_sec').parent().css({'position':'relative','overflow':'visible'});
	$('.nav_item li, .default_nav li').hover(function(){
		$this=$(this);
		$this.find('.nav_sec').show().animate({'opacity':'1','margin-top':0},200);
		if(!$this.find('.nav_sec').hasClass('small_nav_sec')){
			$this.find('.nav_list>.clear').remove();
			$eq=parseInt(($this.find('.nav_sec_box').width()-$this.find('.nav_img').outerWidth(true))/$this.find('.nav_sec_item').outerWidth(true));
			$this.find('.nav_sec_item').each(function(index){
				if(index%$eq==($eq-1)){
					$(this).after('<div class="clear"></div>');
				}
			});
		}
	},function(){
		$this=$(this);
		$this.find('.nav_sec').animate({'opacity':'0','margin-top':'30px'},0).hide();
	});

	$(window).scroll(function(){
		var window_top = $(window).scrollTop();
		if(window_top>0){
			$('#go_top').fadeIn().css('display', 'block');
		}else{
			$('#go_top').fadeOut();
		}
	});

	$('.small_nav_sec .nav_sec_item').hover(function(){
		if(!$(this).find('.nav_thd_list').length) return false;
		var $obj=$(this).find('.nav_thd_list'),
			$w0=(($obj.width()+$obj.offset().left) > $(window).width()),
			$w1=(($obj.width()*2+$obj.offset().left) > $(window).width());
		if($obj.length && ($w0 || ($obj.find('.nav_four_item').length && $w1))){ //å¤çå°çä¸æçå®ä½
			$obj.css({'left':'auto','right':'100%'});
			$obj.find('.nav_four_item').css({'left':'auto','right':'100%'});
		}
	},function(){
		var $obj=$(this).find('.nav_thd_list');
		$obj.attr('style','').find('.nav_four_item').attr('style','');
	});
	//æµè§å¨è¯­è¨è·³è½¬
	if(navigator.userLanguage){
        CurLang=navigator.userLanguage.substring(0,2).toLowerCase();
    }else{
        CurLang=navigator.language.substring(0,2).toLowerCase();
    }

    //Cookiesåè®®
    $('#cookies_agreement .button').click(function() {
        $('#cookies_agreement').css('opacity', 0).animate(2000, function(){
            $.post('?', {'do_action':'action.set_cookies_agreement'}, function(data){
                $('#cookies_agreement').remove();
            }, 'json');
        });
    });

    //å®æ¶è®¢å
    $('#real_time_order .close').click(function() {
        $('#real_time_order').css('opacity', 0).animate(2000, function(){
            $.post('?', {'do_action':'action.set_real_time_order', 'Type':'delete'}, function(data){
                $(this).remove();
                if ($RealTimeOrder) clearInterval($RealTimeOrder);
            }, 'json');
        });
    });
    if ($('#real_time_order').length) {
        $('#real_time_order').realTimeOrder(); //åæ§è¡ä¸æ¬¡
        var $RealTimeOrderTime = 1000 * 10 * 2; //10s
        var $RealTimeOrder = setInterval(function(){
            $('#real_time_order').css('opacity', 0).animate(2000, function(){
                $('#real_time_order').realTimeOrder('add');
                $(this).css('opacity', 1);
            });
        }, $RealTimeOrderTime);
        if ($('#cookies_agreement').length) {
            //å¦æcookiesçå¼¹çªè¿æ¾ç¤ºçè¯ï¼å°±å¨cookiesçå¼¹çªä¸é¢æ¾ç¤ºï¼å¼¹çªåç1åéèªå¨æ¶å¤±
            setTimeout(function(){
                $('#real_time_order').css('opacity', 0).animate(2000, function(){
                    $(this).remove();
                });
            }, 1000 * 60);
        }
    }

	//å¤´é¨æ ç®è®¾ç½®
	$('#top_bar .crossn li').each(function(){
		var dd=$(this).find('dd.user');
        if(dd.length){
			var oWidth=($(this).width()-22);
			dd.css('width', oWidth+'px');
		}
    });
	$('#currency').text(ueeshop_config.currency);
	$('.currency_data').text(ueeshop_config.currency_symbols);
	$('html').priceShow();

	//æç´¢ä¸æ
	$('.ajax_search input[name=Keyword]').keyup(function(){
        var Keyword = $(this).val(),
         	left = parseInt($('.ajax_search').css("border-left-width")),
         	right = parseInt($('.ajax_search').css("border-right-width")),
         	top = parseInt($('.ajax_search').css("border-top-width")),
         	bottom = parseInt($('.ajax_search').css("border-bottom-width"));
        if(Keyword){
            $.post('/ajax/ajax_search.html',{'Keyword':Keyword},function(data){
                $('.ajax_search .search_content_box').remove();
            	$('.ajax_search').append(data);
                $('.ajax_search .search_content_box').css('top', $('.ajax_search form').height()+bottom+'px');
                $('.ajax_search .search_content_box').css('left', -left+'px');
                $('.ajax_search .search_content_box').css('width', $('.ajax_search form').width()-2+left+right+'px');
            });
        }
        $('.ajax_search').mouseleave(function(){
        	$('.ajax_search .search_content_box').remove();
        });
    });

	//ç§æä»·æ ¼
	var $seckillData='0';
	$('html .price_data').each(function(){
		$proid=$(this).attr('keyid');
		if($proid) $seckillData+=','+$proid;
	});
	if($seckillData!='0'){
		$.post('/', 'do_action=action.seckill&ProId='+$seckillData, function(data){
			if(data.ret==1){
				var $obj, $target;
				for(k in data.msg){
					$obj=$('.price_data[keyid='+k+']');
					$target=$obj.parents('.prod_box, .pro_item, .themes_prod');
					$obj.text(data.msg[k]);
					$target.find('.icon_seckill').show().siblings('.icon_discount, .icon_discount_foot').hide();
					$target.find('del>span').attr('data', $obj.attr('data-mall-price')).text($obj.attr('data-mall-price'));
					$target.find('.off').hide();
					$target.find('del').priceShow();
					$target.find('del').show();
				}
			}
		}, 'json');
	}

	//æ¶èåè¡¨
	var $FavData='0';
	$('.ajax_favorite').each(function(){
		$proid=$(this).attr('data');
		if($proid) $FavData+=','+$proid;
	});
	if($FavData!='0'){
		$.post('/', 'do_action=action.favorite&ProId='+$FavData, function(data){
			if(data.ret==1){
				var $obj;
				for(k in data.msg){
					$obj=$('.ajax_favorite[data='+data.msg[k]+']');
					$obj.addClass('is_in');
				}
			}
		}, 'json');
	}

	//äº§åè¯¦ç»é¡µææ£åè®¡æ¶
	$(".discount_count").find(".discount_time").each(function(){
		var time=new Date();
		$(this).genTimer({
			beginTime: ueeshop_config.date,
			targetTime: $(this).attr("endTime"),
			callback: function(e){
				this.html(e)
			}
		});
	});
	$(".prod_info_seckill, .prod_info_tuan").find(".flashsale_time").each(function(){
		var time=new Date();
		$(this).genTimer({
			beginTime: ueeshop_config.date,
			targetTime: $(this).attr("endTime"),
			callback: function(e){
				this.html(e)
			}
		});
	});

	//äº§ååè¡¨é¡µç­é
	$("#more_prop").click(function(){
		$(this).hide();
		$("#less_prop").css('display', 'inline-block');
		$('[overshow=true]').show();
	});
	$("#less_prop").click(function(){
		$(this).hide();
		$("#more_prop").css('display', 'inline-block');
		$('[overshow=true]').hide();
	});
	$('.new_narrow_by dl dt').click(function(){
		if($(this).hasClass('cur')){
			$(this).removeClass('cur');
			$(this).next('dd').stop(false,true).slideUp();
		}else{
			$(this).addClass('cur');
			$(this).next('dd').stop(false,true).slideDown();
		}
	});
	$('.new_narrow_by dl dd .view_more').click(function(){
		$(this).parent().find('a').show();
		$(this).hide();
	});
	$('.new_narrow_by dl, .new_ns_list dl').each(function(){
		if($(this).find('dd>a').size()==0){
			$(this).hide();
		}
	});

	//æç´¢æ¡
	$('#header .search form').submit(function(){if(global_obj.check_form($(this).find('*[notnull]'))){return false;}});

	//è´§å¸åæ¢
	$('#top_bar_outer .currency, #top_outer .currency, #toper .currency, #header .currency').delegate('a', 'click', function(){
		var v=$(this).attr('data');
		$.post('/', 'do_action=action.currency&currency='+v, function(data){
			if(data.ret==1){
				window.top.location.reload();
			}
		}, 'json');
	});

	//è´­ç©è½¦
	$(".header_cart, .default_shopping_cart").hover(function(){
		if(!$(this).attr('is_animate')){
			var $this=$(this),
				$lang=$this.attr('lang');
				$note=$this.find(".cart_note");

			$this.addClass("header_active");
			$note.show().css({'opacity':0, 'top':'150%'}).animate({'opacity':1, 'top':'100%'}, 200);
			//if(!$note.html()){
				$.ajax({
					url:"/ajax/shopping_cart.html",//"/?m=ajax&a=shopping_cart",
					async:false,
					type:'get',
					dataType:'html',
					success:function(result){
						if(result){
							$note.html(result);
						}
					}
				});
			//}
			$(this).attr('is_animate',1);
		}
	}, function(){
		if(!$(this).attr('status')){
			$(this).removeAttr('is_animate').removeClass("header_active").find(".cart_note").animate({'opacity':0, 'top':'150%'}, 200, function(){
				$(this).hide();
			});
		}else{
			setTimeout(function(){
				$(this).removeAttr('status').removeAttr('is_animate').removeClass("header_active").find(".cart_note").animate({'opacity':0, 'top':'150%'}, 200, function(){
					$(this).hide();
				});
			},10000);
		}
	});

	//è®¢é
	$('#newsletter_form,form[name=newsletter]').submit(function(){
		if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'), 0, 1)){return false;}
		$(this).find('input[type=submit]').attr('disabled', 'disabled');

		$.post('/', 'do_action=action.newsletter&'+$(this).serialize(), function(data){
			if (data.ret == 1) {
                //è®¢éæå
				global_obj.new_win_alert(lang_obj.newsletter.success, function(){
					$('#newsletter_form,form[name=newsletter]').find('input[name=Email]').val('');
				}, '', undefined, '');
			} else if (data.ret == 2) {
                //å·²è®¢é
                global_obj.new_win_alert('"'+data.msg+'" '+lang_obj.newsletter.exists, function(){
					$('#newsletter_form,form[name=newsletter]').find('input[name=Email]').val('');
				}, '', undefined, '');
            } else{
                //è®¢éå¤±è´¥
				global_obj.new_win_alert(lang_obj.format.email);
			}
		}, 'json');

		$(this).find('input[type=submit]').removeAttr('disabled');
		return false;
	});

	//å¨çº¿æµ®å¨å®¢æ
	$('#float_chat .chat_box>a').click(function(){
		if(!$(this).hasClass('WeChat')){
			var Url=$(this).attr('href');
			window.open(Url, 'online', 'height=400,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		}
		return false;
	});
    $('#chat_window .chat_item').mouseenter(function(){
        //é²æ­¢å¨çº¿å®¢æéé¡¹è¶åºçªå£æ¾ç¤º
        var $abs=$(this).find('.abs'),
            $height=$(window).height(),
            $scrollTop=$(window).scrollTop();
        if($abs.length){
            if($abs.offset().top + $abs.height() > $scrollTop + $height){
                $abs.css({'top':'auto', 'bottom':0});
                $abs.find('.more_box').addClass('bottom');
            }
        }
    });
	$('#go_top').click(function(){
		$("html, body").animate({"scrollTop":0}, 700);
	});

	//è®¢åç´æ­
	if($('.order_live').length){
		var $i=0,
			$box=$('.order_live .order_live_bd'),
			$bdHeight=$('.order_live .order_live_scroll').height(),
			OrderLiveFun=function(){
							$boxHeight=$box.find('li:eq(0)').outerHeight()
							if($box.scrollTop()>$boxHeight){
								$box.find('li:eq(0)').clone().appendTo('.order_live .order_live_scroll');
								$box.find('li:eq(0)').remove();
								$i=0;
							}
							$box.scrollTop(++$i);
						};

		if($bdHeight>$box.height()+50){
			var OrderLive=setInterval(OrderLiveFun, 50);

			$box.off().on("mouseenter", function(){
				clearInterval(OrderLive);
			}).on("mouseleave", function(){
				OrderLive=setInterval(OrderLiveFun, 50);
			});
		}
	}

	//é¦é¡µäº§åç¹æ
	var $effectsVal=$(".prod_list").attr("effects");
	if($effectsVal==1){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_1');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_1');
		});
	}else if($effectsVal==2){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_2');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_2');
		});
	}else if($effectsVal==3){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_3');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_3');
		});
	}else if($effectsVal==4){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_4');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_4');
		});
	}else if($effectsVal==5){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).children(".prod_box_pic").addClass("pic_enlarge");
		}).on("mouseleave", function(){
			$(this).children(".prod_box_pic").removeClass("pic_enlarge");
		});
	}else if($effectsVal==6){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			if($(this).find(".thumb_hover").length){
				$(this).find(".thumb").stop(true, true).animate({opacity:0}, 300);
				$(this).find(".thumb_hover").stop(true, true).animate({opacity:1}, 300);
			}
		}).on("mouseleave", function(){
			if($(this).find(".thumb_hover").length){
				$(this).find(".thumb").stop(true, true).animate({opacity:1}, 300);
				$(this).find(".thumb_hover").stop(true, true).animate({opacity:0}, 300);
			}
		});
	}

	//æ·»å æ¶èå¤¹
	$(document).on('click', '.add_favorite', function(){
		var $this=$(this),
			ProId=$(this).attr("data");
		if($this.hasClass('is_in')){ //åæ¶æ¶è
			$.get('/account/favorite/remove'+ProId+'.html', {isjson:1}, function(data){
				if(data.ret==1){ //æ·»å æ¶è
					$this.removeClass('is_in');
					excheckout_html='<div class="new_win_alert">';
						excheckout_html+='<div class="win_close"><button class="close"></button></div>';
						excheckout_html+='<div class="win_tips"><i class="icon_success_status"></i>'+lang_obj.user.favorite_remove+'</div>';
						excheckout_html+='<div class="win_btns">';
							excheckout_html+='<button class="btn btn_cancel">'+lang_obj.cart.return_shopping+'</button>';
						excheckout_html+='<div class="clear"></div>';
						excheckout_html+='</div>';
					excheckout_html+='</div>';
					// $('#div_mask, .new_win_alert').remove();//ä¼åæ¸ç©ºå¤ä½çå¼¹åºæ¡
					// global_obj.div_mask();
					// $('body').prepend(excheckout_html);
					// $('.new_win_alert').css({left:$(window).width()/2-200,top:'30%'});
					// $('.new_win_alert').delegate('.close, .btn_cancel', 'click', function(){
					// 	$('.new_win_alert').remove();
					// 	global_obj.div_mask(1);
					// });
				}
			}, 'json');
		}else{ //æ·»å æ¶è
			$.get('/account/favorite/add'+ProId+'.html', '', function(data){
				if(data.ret==1 || data.ret==0){
					$this.addClass('is_in');
					var tips = data.ret==1 ? lang_obj.user.favorite_success : lang_obj.user.favorite_saved,
						status = data.ret==1 ? '' : 'await',
					excheckout_html='<div class="new_win_alert">';
						excheckout_html+='<div class="win_close"><button class="close"></button></div>';
						excheckout_html+='<div class="win_tips"><i class="icon_success_status '+status+'"></i>'+tips+'</div>';
						excheckout_html+='<div class="win_btns">';
							excheckout_html+='<button class="btn btn_cancel">'+lang_obj.cart.return_shopping+'</button>';
							excheckout_html+='<a href="/account/favorite/"><button class="btn btn_sure">'+lang_obj.user.go_to_view+'</button></a>';
						excheckout_html+='<div class="clear"></div>';
						excheckout_html+='</div>';
					excheckout_html+='</div>';
					if(parseInt(ueeshop_config.FbPixelOpen)==1 && data.ret==1){//æ¶èæå
						//When a product is added to a wishlist.
						fbq('track', 'AddToWishlist', {content_ids:'['+data.msg.Num+']', content_name:data.msg.Name, currency:data.msg.Currency, value:'0.00'});
					}
					// $('#div_mask, .new_win_alert').remove();//ä¼åæ¸ç©ºå¤ä½çå¼¹åºæ¡
					// global_obj.div_mask();
					// $('body').prepend(excheckout_html);
					// $('.new_win_alert').css({left:$(window).width()/2-200,top:'30%'});
					// $('.new_win_alert').delegate('.close, .btn_cancel', 'click', function(){
					// 	$('.new_win_alert').remove();
					// 	global_obj.div_mask(1);
					// });
				}else{
					user_obj.set_form_sign_in('', '', 1);
					$('form[name=signin_form]').append('<input type="hidden" name="comeback" value="global_obj.div_mask(1);$(\'#signin_module\').remove();$(\'.add_favorite[data='+ProId+']\').click();" />');
				}
			}, 'json');
		}
	});
	$('html').on('click', '#prompt_close, #prompt_button', function(){
		if($('#prompt_box').length){
			$('#prompt_box').remove();
			global_obj.div_mask(1);
		}
	});

	//è¯­è¨åè´§å¸éæ©å¼¹åºæ¡
	$('html').on('click', '.btn_language', function(){
		var obj={
			html:'',
			source:$('#pop_lang_currency').html()
		}
		obj.html='<div id="shopbox">'+obj.source+'</div>';
		$('#shopbox').length && $('#shopbox').remove();
		var scrollRight=window.innerWidth-$(window).width();
		$('body').addClass('hidden').css('margin-right', scrollRight).prepend(obj.html);
        $('#shopbox').height($('#shopbox .shopbox_wrap').height());
		if(!$('#div_mask').length) global_obj.div_mask();
	}).on('click', '.lang_item li', function(){
		$(this).parents('.pop_skin').find('.lang_item li').removeClass('current');
		$(this).addClass('current');
	}).on('click', '.btn_currency', function(){
		var $obj=$(this).parents('.pop_currency');
		if($obj.hasClass('pop_open')){
			$obj.removeClass('pop_open');
		}else{
			$obj.addClass('pop_open');
		}

		$(document)[0].addEventListener('click', function(e){
			var $obj=$(e.target);
			if(!$obj.parent().hasClass('btn_currency') && !$obj.hasClass('btn_currency') && $('#shopbox .pop_currency').hasClass('pop_open')){
				$('#shopbox .pop_currency').removeClass('pop_open');
			}
		}, false);
	}).on('click', '.pop_currency_menu a', function(){
		$('#shopbox .btn_currency').attr('data-currency', $(this).attr('data')).html($(this).html()+'<em></em>');
	}).on('click', '.btn_save', function(){
		var $lang=$('#shopbox .lang_item li.current').attr('data-lang'),
			$code=$('#shopbox .btn_currency').attr('data-currency');
		$.post('/', 'do_action=action.change_language_currency&language='+$lang+'&currency='+$code, function(data){
			if(data.ret==1){
				window.location.href=data.msg;
			}else if((data.ret==2)){
				window.open(data.msg);
			}
		}, 'json');
	});

	//æ·»å è´­ç©è½¦
	$('html').on('click', '.add_cart', function(){
		var obj={
			html:'',
			ProId:$(this).attr("data")
		}
		if (!obj.ProId) return true;
		obj.html='<div id="shopbox" class="themes_popups">';
			obj.html+='<button class="shopbox_close"><span>Ã</span></button>';
			obj.html+='<div class="shopbox_wrap"><div class="shopbox_skin"><div class="shopbox_inner"><iframe id="shopbox_frame" name="shopbox_frame" class="shopbox_frame" frameborder="0" vspace="0" hspace="0" scrolling="0" src="/custom-products/'+obj.ProId+'.html" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div></div>';
		obj.html+='</div>';

		$('#shopbox').length && $('#shopbox').remove();
		var scrollRight=window.innerWidth-$(window).width();
		$('body').addClass('hidden').css('margin-right', scrollRight).prepend(obj.html);
		$('#shopbox').height($('#shopbox .shopbox_wrap').height());
		if(!$('#div_mask').length) global_obj.div_mask();

        if($(window).width()<1200){
            $('#shopbox').css({'margin-left':'-30.6pc'});
        }
	});

	//å±ç¨å¼¹åºæ¡çå³é­äºä»¶
	$('html').on('click', '#shopbox .shopbox_close, #shopbox .btn_cancel, #div_mask', function(){
		$('#shopbox').shopboxHide();
	});

	//åäº«å¼¹åºæ¡
	$('html').on('click', '.share_this', function(){
		var share=['facebook', 'google', 'twitter', 'vk', 'linkedin', 'googleplus', 'digg', 'reddit', 'stumbleupon', 'delicious', 'pinterest'],
			data=$.evalJSON($(this).attr("data")),
			html='';
		html='<div id="share_box">';
			html+='<button class="share_close"><span>Ã</span></button>';
			html+='<div class="share_content">';
				html+='<div class="share_hd"><span class="share_title">Share</span><span class="page_title">'+data.title+'</span><span class="page_url">'+data.url+'</span></div>';
				html+='<ul class="share_list">';
					for(k in share){
						html+='<li><button class="share_button share_'+share[k]+'" data="'+share[k]+'"></button><span class="share_label">'+share[k]+'</span></li>';
					}
				html+='</ul>';
			html+='</div>';
		html+='</div>';

		$('#share_box').length && $('#share_box').remove();
		$('body').prepend(html);
		if(!$('#div_mask').length) global_obj.div_mask();

		$('body').delegate('#share_box .share_list button', 'click', function(){
			$(this).shareThis($(this).attr('data'), data.title, data.url);
		});
	});
	$('html').on('click', '#share_box .share_close, #div_mask', function(){
		if($('#share_box').length){
			$('#share_box').remove();
			global_obj.div_mask(1);
		}
	});

	//äº§åè¯¦ç»é¡µé¢è¯¢ç
	$('.product_inquiry').on('click',function(){
		if($(this).data('user') || !$(this).data('userused')){
			global_obj.div_mask();
			var html='<div id="inbox_popup">';
					html+='<div class="inbox_popup_close">Ã</div>';
					html+='<form id="inbox_popup_form" name="inbox_popup_form" method="post" enctype="multipart/form-data">';
						html+='<div class="inbox_popup_info">';
							html+='<div class="inbox_popup_img pic_box"><img src="'+$('.big_pic img').attr('src')+'" /><span></span></div>';
							html+='<div class="inbox_popup_name">'+$('.detail_right h1').text()+'</div>';
						html+='</div>';
						html+='<div class="inbox_popup_content">';
							if($(this).data('user')){
								html+='<div class="inbox_popup_email">'+$(this).data('email')+'</div>';
							}else{
								html+='<input class="inbox_popup_form_input" name="Email" placeholder="'+lang_obj.newsletter.your_email+'" notnull format="Email" />';
							}
							html+='<textarea class="inbox_popup_form_textarea" name="Content" placeholder="'+lang_obj.newsletter.your_questions+'" notnull></textarea>';
							html+='<div class="inbox_popup_upload upload_box">';
								html+='<div class="clear"></div>';
								html+='<input class="upload_file" id="upload_file" type="file" name="PicPath" onchange="loadImg(this);" accept="image/gif,image/jpeg,image/png" />';
								html+='<div id="pic_show" class="pic_box"></div>';
							html+='</div>';
							html+='<input class="inbox_popup_form_submit" type="submit" value="'+lang_obj.user.send+'" />';
							html+='<input type="hidden" name="ProId" value="'+$(this).data('proid')+'">';
							html+='<input type="hidden" name="do_action" value="user.product_inquiry">';
						html+='</div>';
					html+='</form>';
				html+='</div>';
			$('body').prepend(html);
			$('#inbox_popup .inbox_popup_close').click(function(){
				$(this).parent().remove();
				global_obj.div_mask(1);
			});
			$('#inbox_popup form').submit(function(){
				if(global_obj.check_form($(this).find('*[notnull]'))){return false;};
				if($(this).find('input[name=Email]').size()){
					var email_obj=$(this).find('input[name=Email]');
					var reg=new RegExp(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/);
					if(!reg.test(email_obj.val())){
						global_obj.new_win_alert(lang_obj.format.email, '', '', 1);
						return false;
					}
				}
			});
		}else{
			user_obj.set_form_sign_in('', window.location.href, 1);
		}
	});

	//æ°çææ¬æ¡ ä¸´æ¶
	//$(document.body)
	$('.input_box input, .input_box textarea').on('change keyup blur force-reset', function(e){
		var n = $(e.currentTarget),
       		i = n.val(),
			o = n.closest('.input_box');
		(o.length || "force-reset" === e.type) && (i.length > 0 && "force-reset" !== e.type ? o.addClass('filled') : o.removeClass('filled'))
		/*
		if($(this).val().length>0){
			$(this).parent().addClass('filled');
		}else{
			$(this).parent().removeClass('filled');
		}
		*/
	});
	//æ°çéæ©æ¡ ä¸´æ¶
	//$(document.body)
	$('.box_select select').on('change', function(e){
		var n = $(e.currentTarget),
       		i = n.val(),
			o = n.closest('.input_box');
		(o.length || "force-reset" === e.type) && (i.length > 0 && "force-reset" !== e.type ? o.addClass('filled') : o.removeClass('filled'))
		/*
		if($(this).val().length>0){
			$(this).parent().addClass('filled');
		}else{
			$(this).parent().removeClass('filled');
		}
		*/
	});
	$('#signup .box_select select').each(function(){
		if($(this).val()!=''){
			$(this).parent('.input_box').addClass('filled');
		}
	})

	//éé¦é¡µéèäº¤æ¢é¾æ¥
	if(window.location.pathname!='/'){
		$('.global_swap_chain').hide();
	}
	//åå°ç¼è¾æ¨¡å¼
	if(window.frames.name == 'plugins_iframe_visual'){
		$('*').on('click', function(){return false;});  //åæ¶é¡µé¢è·³è½¬
		// è·³è½¬å°å½åç¼è¾æ¨¡å
		var get_id = global_obj.query_get('id');
		var get_top = global_obj.query_get('top');
		if (get_id != false || get_top != false) {
			$(window).load(function () {
				if (get_id != false) {
					var get_id_top = parseInt($('*[visualWId='+get_id+']').offset().top);
				} else {
					var get_id_top = parseInt(get_top);
				}
				$('body,html').animate({scrollTop:get_id_top+'px'});
			});
		}
	}

    //åè®®
    $('.agreement').click(function() {
        var $Type       = $(this).data('type'),
            $Title      = '',
            $Content    = '',
            $Html       = '';
        $.get(ueeshop_config.tmp_dir + 'json/agreement-' + ueeshop_config.lang + '.json', '', function(data) {
            if (data[$Type]) {
                $Title = data[$Type].Title;
                $Content = data[$Type].Content;
                $Html += '<div class="agreement_outer">';
                $Html +=    '<div class="agreement_in">';
                $Html +=        '<div class="agreement_content"><div class="title">' + $Title + '</div><div class="wrap">' + $Content + '</div></div>';
                $Html +=    '</div>';
                $Html += '</div>';
                $('.agreement_outer').remove();
                $('body').prepend($Html);
                $('.agreement_outer').click(function(e) {
                    var $obj = $(e.target);
                    if (!$obj.parents('.agreement_outer').length) {
                        $('.agreement_outer').css('opacity', 0).animate(2000, function() {
                            $(this).remove();
                        });
                    }
                });
            }
        }, 'json');
    });
	// å¨å±è¿åå¤´é¨é¾æ¥è·³è½¬
	$('html').on('click', 'a[href=#top]', function () {
		$('body,html').animate({scrollTop:0},500);
		return false;
	});
	/********************************************************* å¬å±æä»¶jså¼å§ *********************************************************/
	/****** å¯¼èªæ¾ç¤º Start ******/
	function DefaultNavShow(Type,Time){
		//Type : æ¯å¦éæ°æ£æµå¯¼èª Time : æ£æµæ¶é´é´é
		var $obj=$('.default_nav'),
			navItemWidth=0;
		if ($obj.length) {
			var navWidth= $obj[0].getBoundingClientRect().width ? $obj[0].getBoundingClientRect().width : $obj.width();
			$obj.css('overflow', 'visible').children('li').each(function(){
				var $width = $(this)[0].getBoundingClientRect().width;
				if(!$width) $width=$(this).outerWidth(true);
				navItemWidth+=$width;
				if(navItemWidth>navWidth){
					$(this).hide();
				}else{
					$(this).show();
				}
			});
			if (Type) {	//å®æ¶æ£æµå¯¼èª é²æ­¢ç¹æ®å­ä½å è½½æ¢å¯¼è´å¯¼èªæä¸æ¥
				Time = Time * 2;
				setTimeout(function(){
					DefaultNavShow(1, Time);
				}, Time);
			}
		}
	}
	DefaultNavShow(1, 250);
	$(window).resize(function(){
		DefaultNavShow();
	});
	/****** å¯¼èªæ¾ç¤º End ******/
	//è´§å¸åæ¢
	$('.default_currency .default_currency_list').delegate('a', 'click', function(){
		var v=$(this).attr('data');
		$.post('/', 'do_action=action.currency&currency='+v, function(data){
			if(data.ret==1){
				window.top.location.reload();
			}
		}, 'json');
	});

	//è¯­è¨éæ©å¼¹åºæ¡
	$('html').on('click', '.btn_default_language', function(){
		$('#default_language_box').height($('#default_language_box').outerHeight()).css('bottom', 0).fadeIn();
		if(!$('#div_mask').length) global_obj.div_mask(0, $('.default_language'));
	}).on('click', '.language_box_close,#div_mask', function(){
		$('#div_mask,#default_language_box').fadeOut(function(){
			global_obj.div_mask(1);
		});
	});

	// è¯­è¨è´§å¸éæ©å¼¹åºæ¡(ç»åæé®)
	$('html').on('click', '.btn_default_language_currency', function(){
		if (!$('body').children('#default_language_currency_box').size()) {  // æå¼¹çªæ¾å°bodyä¸ï¼é¿åå±é¨æ ·å¼å½±å
			var html = $('#default_language_currency_box').prop('outerHTML');
			$('#default_language_currency_box').remove();
			$('body').append(html);
		}
		var max_htight = $('#default_language_currency_box').outerHeight();
		if (max_htight > $(window).height()*0.7) {
			max_htight = '70vh';
		}
		$('#default_language_currency_box').height(max_htight).css('bottom', 0).fadeIn();
		if(!$('#div_mask').length) global_obj.div_mask();
	}).on('click', '#default_language_currency_box h4 i,#div_mask', function(){
		$('#div_mask,#default_language_currency_box').fadeOut(function(){
			global_obj.div_mask(1);
		});
	});
	// è¯­è¨è´§å¸éæ©ä¿å­(ç»åæé®)
	$('html').on('click', '#default_language_currency_box .default_language_currency_list a', function(){
		$(this).addClass('current').siblings().removeClass('current');
	});
	$('html').on('click', '#default_language_currency_box .default_language_currency_submit', function(){
		if ($('.default_language_item').size() && $('.default_currency_item').size()) {  // ç»åéæ©
			var lang = $('#default_language_currency_box .default_language_item a.current').data('lang');
			var currency = $('#default_language_currency_box .default_currency_item a.current').attr('data');
			$.post('/', 'do_action=action.change_language_currency&language=' + lang + '&currency=' + currency, function(data){
				if(data.ret==1){
					window.location.href=data.msg;
				}else if((data.ret==2)){
					window.open(data.msg);
				}
			}, 'json');
		} else if($('.default_language_item').size()) {  // è¯­è¨éæ©
			var lang_url = $('#default_language_currency_box .default_language_item a.current').data('url');
			window.location.href = lang_url;
		} else if ($('.default_currency_item').size()) {  // è´§å¸éæ©
			var current = $('#default_language_currency_box .default_currency_item a.current').attr('data');
			$.post('/', 'do_action=action.currency&currency=' + current, function(data){
				if(data.ret==1){
					window.top.location.reload();
				}
			}, 'json');
		}
	});

	//å¬å±æç´¢åè½
	$('.default_search').on('click', '.default_search_btn', function(){
		$('body').append($('#default_search_box'));
		$('#default_search_box').fadeIn();
	});
	$('#default_search_box i').click(function(){
		$('#default_search_box').fadeOut();
	});

	//è¯­è¨æ ãè´§å¸æ  è§¦åææ
	$('.default_currency, .default_language').hover(function(){
		$(this).find('dd').css({'opacity':0, 'top':'150%'}).animate({'opacity':1, 'top':'100%'}, 200);
	},function(){
		$(this).find('dd').animate({'opacity':0, 'top':'150%'}, 200);
	});
	//è¿è¥æ´»å¨å¬å±å¤çJs
	$('.operation_activities .oper_close').click(function(){
		var $this = $(this).parents('.operation_activities'),
			$OId = $this.attr('data-oid');
		$.post('/', 'do_action=action.operation_activities_del&OId='+$OId, function(data){});
		$this.fadeOut(500, function(){
			$this.remove();
		});
	});
	$('.operation_activities .operation_click').click(function(){ //ç»è®¡ç¹å»
		var $this = $(this).parents('.operation_activities'),
			$OId = $this.attr('data-oid');
		$.post('/', 'do_action=action.operation_activities_click&OId='+$OId, function(data){});
	});
	//è®¢é
	$('.operation_activities form').submit(function(){
		if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'), 0, 1)){return false;}
		$(this).find('input[type=submit], button').attr('disabled', 'disabled');
		var $OId = $(this).parents('.operation_activities').attr('data-oid');
		$.post('/', 'do_action=action.operation_activities&OId='+$OId+'&'+$(this).serialize(), function(data){
			if (data.ret >= 1) {
                //è®¢éæå/éå¤è®¢é  //é¢åä¼æ å¸æå/éå¤é¢å
				global_obj.new_win_alert(data.msg, function(){
					$('.operation_activities .oper_close').click();
				}, '', undefined, '');
			} else {
                //è®¢éå¤±è´¥ //é¢åä¼æ å¸å¤±è´¥
				global_obj.new_win_alert(data.msg,function(){
					$('.operation_activities form').find('input[name=Email]').val('');
				});
			}
		}, 'json');

		$(this).find('input[type=submit], button').removeAttr('disabled');
		return false;
	});
	if ($(".operation_activities .oper_time").length){
		var $this = $('.operation_activities .oper_time');
		var time=new Date();
		$('.operation_activities .oper_time').genTimer({
			beginTime: ueeshop_config.date,
			type:'day_separate',
			day_label:'d',
			days_label:'d',
			unitWord:{hours:"h <em>:</em>", minutes:"m <em>:</em>", seconds:"s"},
			targetTime: $('.operation_activities .oper_time').attr("data-endTime"),
			callback: function(e){
				this.html(e)
			}
		});
	}
	function operation_show(){
		var operation_discount_bulletin = $("*[class*='operation_discount_bulletin']");  // æ¨¡ç³æ¥è¯¢è¿è¥æ´»å¨å¬åç±»åçç±»å
		if(operation_discount_bulletin.size() && $('.themes_global_header').size()){
			var operation_height = operation_discount_bulletin.height();
			$('.header_content_height').animate({height:$('.themes_global_header').height()+operation_height});
			if ($(window).width() >= 1000) $('.header_content_height').hide();
			if ($(window).width() >= 1000 && $('.header_fix').size()) $('.header_content_height').show();
		}
	}
	operation_show();
	/********************************************************* å¬å±æä»¶jsç»æ *********************************************************/
});