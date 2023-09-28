/*
Powered by ueeshop.com		http://www.ueeshop.com
å¹¿å·èéç½ç»ç§ææéå¬å¸		020-83226791
*/
var address_perfect=0;

var user_obj={
	/******************* ç»å½ææ³¨å Start *******************/
	sign_in_init:function(){
		var cancelback=(typeof(arguments[0])=='undefined')?'':arguments[0];//åæ¶è¿åå½æ°
		
		$('body').off().on('click', '.SignInButton', function(){ //ç¹å»ç»å½é¾æ¥ï¼æ¾ç¤ºç»å½æ¡
			user_obj.set_form_sign_in('', '', 1);
		})
		.on('click', '#signin_close, #div_mask', function(){ //å³é­ç»å½
			cancelback && cancelback();
			if($('#signin_module').length && $('#signin_close').length && !ueeshop_config['_login']){
				$('#signin_module').remove();
				global_obj.div_mask(1);
			}
			return false;
		})
		.on('submit', '.global_signin_module form[name=signin_form]', function(){ //ä¼åç»å½
			if(global_obj.check_form($(this).find('*[notnull]'))){return false;};
			var Email=$.trim($(this).find('input[name=Email]').val());
			var r=/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/;
			if(!r.test(Email)){
				alert(lang_obj.format.email);
				return false;
			}
			$(this).find('button:submit').attr('disabled', true);
			
			$.post('/', $(this).serialize(), function(data){
				$('.global_signin_module form[name=signin_form] button:submit').removeAttr('disabled');
				if(data.ret!=1){
					$('#error_login_box').html(data.msg[0]).show();
				}else{
					if($('input[name=comeback]').length){
						var $callback=$('input[name=comeback]').val();
						$callback && eval($callback);
						$('html').checkUser();
					}else window.location=data.msg[0];
				}
			}, 'json');
			
			return false;
		})
		.on('submit', '#login form[name=signin_form]', function(){ //ä¼åç»å½
			if(global_obj.check_form($(this).find('*[notnull]'))){return false;};
			var Email=$.trim($(this).find('input[name=Email]').val());
			var r=/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/;
			if(!r.test(Email)){
				alert(lang_obj.format.email);
				return false;
			}
			$(this).find('button:submit').attr('disabled', true);
			
			$.post('/', $(this).serialize(), function(data){
				$('#login form[name=signin_form] button:submit').removeAttr('disabled');
				if(data.ret!=1){
					global_obj.new_win_alert(data.msg[0]);
				}else{
					if($('input[name=comeback]').length){
						var $callback=$('input[name=comeback]').val();
						$callback && eval($callback);
						$('html').checkUser();
					}else window.location=data.msg[0];
				}
			}, 'json');
			
			return false;
		})
	},
	
	set_form_sign_in:function(type){//çæç»å½æ¡
		var Url=(typeof(arguments[1])=='undefined')?'':arguments[1];
		var Model=(typeof(arguments[2])=='undefined')?0:arguments[2];
		var addStr='',
			obj=$('body'),
			w=$(window),
			regUrl='/account/sign-up.html';
			
		if(type=='parent'){//ç¶æ¡æ¶åç´ 
			obj=$(window.parent.document).find('body');
			w=$(window.parent.window);
		}
		
		if(obj.find('#attr_hide').val()){
			addStr=obj.find('#attr_hide').serialize()?obj.find('#attr_hide').serialize():obj.find('#attr_hide').val();
			addStr=Object(addStr);
		}
		var signin_html='<div id="signin_module" class="global_signin_module">';
			signin_html=signin_html+'<div class="box_bg"></div>'+(Model?'<a class="noCtrTrack" id="signin_close">Ã</a>':'');
			signin_html=signin_html+'<div id="lb-wrapper" class="themes_popups"><form name="signin_form" class="login" method="POST">';
				signin_html=signin_html+'<h3>'+lang_obj.signIn.title+'</h3>';
				signin_html=signin_html+'<div id="error_login_box" class="error_note_box">'+lang_obj.signIn.error_note+'</div>';
				signin_html=signin_html+'<div class="row"><label for="Email">'+lang_obj.signIn.email+'</label><input name="Email" class="lib_txt" type="text" maxlength="100" format="Email" notnull /></div>';
				signin_html=signin_html+'<div class="row"><label for="Password">'+lang_obj.signIn.password+'</label><input name="Password" class="lib_txt" type="password" autocomplete="off" notnull /></div>';
				signin_html=signin_html+'<div class="row">'+lang_obj.signIn.forgot+'</div>';
				signin_html=signin_html+'<div class="row protect"><input class="ckb" type="checkbox" name="IsStay" value="1" checked="checked" /> '+lang_obj.signIn.stay_note+'</div>';
				signin_html=signin_html+'<div class="row"><button class="signbtn signin FontBgColor FontBorderColor" type="submit">'+lang_obj.signIn.sign_in+'</button>'+(!obj.find('form.register').length?('<a href="/account/sign-up.html" class="signbtn signup">'+lang_obj.signIn.join_fee+'</a>'):'')+'</div>';
			signin_html=signin_html+'<input type="hidden" name="do_action" value="user.login" />';
			if(obj.find('input[name=jumpUrl]').length) signin_html=signin_html+'<input type="hidden" name="jumpUrl" value="'+$('input[name=jumpUrl]').serialize().replace('jumpUrl=', '')+'" />';
			if(Url) signin_html=signin_html+'<input type="hidden" name="jumpUrl" value="'+Url+'" />';
			signin_html=signin_html+'</form></div>';
		signin_html=signin_html+'</div>';
		
		obj.find('#signin_module').length && obj.find('#signin_module').remove();
		obj.prepend(signin_html);
		obj.find('#signin_module').css({left:w.width()/2-220,top:'20%'});
		global_obj.div_mask();
	},
	
	sign_up_init:function(){
		var frm_register=$('#signup form.register');
		frm_register.find('input[name=Birthday]').attr('readonly', 'readonly');
		frm_register.submit(function(){return false;});
		frm_register.find('button:submit').click(function(){
			var status=0;
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status+=1;
			}else status+=0;
			
			if(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/.test($.trim($('#Email').val()))==false){
				$('#Email').next().show();
				status+=1;
			}else{
				$('#Email').next().hide();
				status+=0;
			}
			
			if($.trim($('#Password').val())!=$.trim($('#Password2').val())){
				$('#Password2').next().show();
				status+=1;
			}else{
				$('#Password2').next().hide();
				status+=0;
			}
			if(status) return false;
			$(this).attr('disabled', true);
			
			$.post('/', frm_register.serialize(), function(data){
				frm_register.find('button:submit').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
					$("body, html").animate({scrollTop:$("#error_register_box").offset().top}, 500);
					if($('#Code').length){ //æéªè¯ç å¾ç
						$('#Code').next().click();
					}
				}else{
					//When a sign up is completed, such as signup for trial.
					if(parseInt(ueeshop_config.FbPixelOpen)==1){
						fbq("track", "Lead");
						fbq('track', 'CompleteRegistration', {
							value: '0.00',
							currency: 'USD'
						});
					}
					setTimeout(function(){window.location=data.msg[0]}, 1000);
				}
			}, 'json');
		});
		
		$('.amount').keydown(function(e){
			var value=$(this).val();
			var key=window.event?e.keyCode:e.which;
			if((key>95 && key<106) || (key>47 && key<60) || (key==109 && value.indexOf("-")<0) || (key==110 && value.indexOf(".")<0) || (key==190 && value.indexOf(".")<0)){
			}else if(key!=8){
				if(window.event){//IE
					e.returnValue=false;
				}else{//Firefox
					e.preventDefault();
				}
				return false;
			}
		});
		
		$('#send_email_btn').on('click', function(){
			$email=$.trim($(this).attr('email'));
			$uid=$(this).attr('uid');
			$.post('/', 'do_action=action.verification_mail&Email='+$email+'&UserId='+$uid, function(data){
				if(data.ret==1){
					alert(lang_obj.user.send_email_ture);
				}else{
					alert(lang_obj.user.send_email_false);
				}
			}, 'json');
		});
		
		frm_register.find('.verification_button').on('click', function() {
			$('.register_page').fadeIn('fast');
			if ($('#vcode_box').hasClass('use_vecode')) {
				imgver(1);
			} else {
				imgver();
			}
			var sxbtn = document.querySelector(".minbtn button");
			sxbtn.onclick = function(){
				imgver(1);
			}
		});
		$('.vcode_form').submit(function(){return false;});
		$('.register_page .vcode_box i').on('click', function(){
			$(this).parent().parent().fadeOut('fast');	
		});
	}, 
	
	user_login_binding:function(){
		$('body').off().on('click', '#binding_close, #btn_cannel, #div_mask', function(){ //å³é­
			if($('#binding_module').length && $('#binding_close').length){
				$('#binding_module').remove();
				global_obj.div_mask(1);
			}
		});
		
		var frm_binding=$('#binding_module form.login');
		frm_binding.submit(function(){return false;});
		frm_binding.find('button:submit').click(function(){
			if(global_obj.check_form(frm_binding.find('*[notnull]'), frm_binding.find('*[format]'), 0, 1)){return false;}
			$(this).attr('disabled', true);
			$.post('/', frm_binding.serialize()+'&do_action=user.user_oauth_binding', function(data){
				frm_binding.find('button:submit').attr('disabled', false);
				if(data.ret!=1){
					$('#error_login_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg;
				}
			}, 'json');
		});
	},
	
	forgot_init:function (){
		var frm_register=$('#signup form.register');
		frm_register.submit(function(){return false;});
		frm_register.find('.fotgotbtn').click(function(){//åéå¿è®°å¯ç é®ä»¶
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status=1;
			}else status=0;
			
			if(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/.test($('#Email').val())==false){
				$('#Email').next().show();
				status=1;
			}else{
				$('#Email').next().hide();
				status=0;
			}
			
			if(status==1) return false;
			$(this).attr('disabled', true);
			
			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.fotgotbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});
		
		frm_register.find('.resetbtn').click(function(){//åéå¿è®°å¯ç é®ä»¶
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status=1;
			}else status=0;
			
			if($('#Password').val() && $('#Password2').val()){
				if($('#Password').val()!=$('#Password2').val()){
					$('#Password2').next().show();
					status=1;
				}else{
					$('#Password2').next().hide();
					status=0;
				}
			}else{
				status=1;
			}
			
			if(status==1) return false;
			$(this).attr('disabled', true);
			
			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.resetbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});
	},
	/******************* ç»å½ææ³¨å End *******************/
	
	/******************* ä¼åé¦é¡µ Start *******************/
	user_index_init:function(){
		user_obj.edit_pay_init();
		$('.order_table .see_more').click(function(){
			if($(this).hasClass('cur')){
				$(this).removeClass('cur').parent().parent().parent().parent().find('.hide').hide();
			}else{
				$(this).addClass('cur').parent().parent().parent().parent().find('.hide').show();
			}
		});
		$('.user_ind_ptype a').click(function(){
			var ind = $(this).index('.user_ind_ptype a');
			$('.user_ind_ptype a').removeClass('cur').eq(ind).addClass('cur');
			$(this).parent().next('.user_page_pro').find('.pro_list').hide().eq(ind).show();
		});
		
		$('.user_get_coupons .get_it').click(function(){
			var	_this = $(this), 
				CId = _this.attr('data-cid');
			$.post('/', 'do_action=user.get_user_coupons&CId='+CId, function(data){
				if(data.ret==1){
					global_obj.new_win_alert(data.msg,function(){
						_this.parent().remove();
					}, '', undefined, '', lang_obj.global.ok);
				}else{
					global_obj.new_win_alert(data.msg);
				}
			}, 'json');
		});

		$('.remove_newsletter').click(function(){
			var $email=$(this).attr('email');
			global_obj.new_win_alert(lang_obj.global.del_confirm, function(){
				$.post('/', 'do_action=user.cancel_newsletter&Email='+$email, function(data){
					if(data.ret==1){
						window.location.reload();
					}else{
						global_obj.new_win_alert(data.msg);
					}
				}, 'json');
			}, 'confirm');
		});
	},
	/******************* ä¼åé¦é¡µ End *******************/
	
	order_init:function(){
		
		user_obj.edit_pay_init();
		$('.order_table .see_more').click(function(){
			if($(this).hasClass('cur')){
				$(this).removeClass('cur').parent().parent().parent().parent().find('.hide').hide();
			}else{
				$(this).addClass('cur').parent().parent().parent().parent().find('.hide').show();
			}
		});
		

		$('#cancelForm').submit(function(){
			if(global_obj.check_form($(this).find('*[notnull]'))){
				return false;
			}else{
				var result=window.confirm(lang_obj.user.order_cancel);
				if(result){
					$.post('/?do_action=user.cancel_order', $('#cancelForm').serialize(), function(data){
						window.location.href='/account/orders/';
					});
				}
			}
			return false;
		});

		$('.confirm_receiving').click(function(){
			var _this = $(this);
			global_obj.new_win_alert(lang_obj.user.sure,function(){
				$.post('/?do_action=user.confirm_receiving', {OId:_this.attr('oid')}, function(data){
					window.location.reload();
				});
			},'confirm');
			return false;
		});
		/*
		$('.payment2btn').click(function(){
			if($('form[name=paypal_checkout_form]').length){ //Paypalæ¯ä»æ¹å¼
				$('#paypal_checkout_button').click();
			}else{
				window.open($(this).attr('href'));
			}
			return false;
		});
		*/
		if ($('#reply_form').length){
			$('#reply_form').submit(function(){
				if(global_obj.check_form($('#reply_form').find('*[notnull]'))){return false};
			});
			$('#lib_user_products .item .light_box_pic').lightBox();
			document.getElementById('View').scrollIntoView();
		}
	},
	
	coupon_init:function(){
		var maxWidth=0,
			coupon_item_size=function(){
			$('.cou_list .item').each(function(){
				$(this).find('.itl').width()>maxWidth && (maxWidth=$(this).find('.itl').width());
			});
			$('.cou_list .item').each(function(){
				$(this).find('.itl').css('width', maxWidth);
				$(this).find('.itr').css('width', $(this).outerWidth(true)-maxWidth-17-10);
			});
		}
		$(window).resize(function(){
			coupon_item_size();
		});
		coupon_item_size();
	},
	
	user_address:function(){
		$('.chzn-container-single .chzn-search').css('height', $('.chzn-container-single .chzn-search input').height());
		!address_perfect && user_obj.set_default_address(0);
		$('a.chzn-single').off().on('click', function(){
			$(this).parent().next('p.errorInfo').text('');
			if($(this).hasClass('chzn-single-with-drop')){
				$(this).blur().removeClass('chzn-single-with-drop').next().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').css('z-index', '0').find('li.result-selected').removeClass('highlighted');
			}else{
				$(this).blur().addClass('chzn-single-with-drop').next().css({'left':'0', 'top':'41px'}).parent().addClass('chzn-container-active').css('z-index', '11').find('li.result-selected').addClass('highlighted');
				if(!$('#country_chzn li.group-result:eq(0)').next('li.group-option').length) $('#country_chzn li.group-result').hide();
			}
		});
		$('.chzn-results').delegate('li.group-option', 'mouseover', function(){
			$(this).parent().find('li').removeClass('highlighted');
			$(this).addClass('highlighted');
		}).delegate('li.group-option', 'mouseout', function(){
			$(this).removeClass('highlighted');
		});
		$('#country_chzn li.group-option').click(function(){	//Select Country
			var obj		= $('#country_chzn li.group-option').removeClass('result-selected').index($(this));
			var s_cid	= $('select[name=country_id]').val();
			$(this).addClass('result-selected').parent().parent().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text()).parent().parent().prev().find('option').eq(obj+1).attr('selected', 'selected');
			var cid = $('select[name=country_id]').val(),
				stateJson = $('select[name=country_id]').data('state'),
				countryCodeJson = $('select[name=country_id]').data('code');
			(s_cid!=cid) && user_obj.get_state_from_country(cid, stateJson, countryCodeJson);	//change country
		});
		$('#zoneId').delegate('li.group-option', 'click', function(){
			var obj=$('#zoneId li.group-option').removeClass('result-selected').index($(this));
			$(this).addClass('result-selected').parent().parent().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text()).parent().parent().prev().find('option').eq(obj+1).attr('selected', 'selected');
		});
		$(document).click(function(e){ 
			e	= window.event || e; // å¼å®¹IE7
			obj	= $(e.srcElement || e.target);
			if(!$(obj).is("#country_chzn, #country_chzn *")){ 
				$('#country_chzn').removeClass('chzn-container-active').css('z-index', '0').children('a').blur().removeClass('chzn-single-with-drop').end().children('.chzn-drop').css({'left':'-9000px'}).find('input').val('').parent().next().find('.group-option').addClass('active-result');
			} 
			if(!$(obj).is("#zoneId .chzn-container, #zoneId .chzn-container *")){ 
				$('#zoneId .chzn-container').removeClass('chzn-container-active').css('z-index', '0').children('a').blur().removeClass('chzn-single-with-drop').end().children('.chzn-drop').css({'left':'-9000px'}).find('input').val('').parent().next().find('.group-option').addClass('active-result');
			} 
		});
		jQuery.expr[':'].Contains=function(a,i,m){
			return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
		};
		function filterList(input, list){ 
			$(input)
			.change(function(){
				var filter=$(this).val();
				if(filter){
					$matches=$(list).find('li:Contains(' + filter + ')');
					$('li', list).not($matches).removeClass('active-result');
					$matches.addClass('active-result');
				}else{
					$(list).find("li").addClass('active-result');
				}
				return false;
			})
			.keyup(function(){
				$(this).change();
			});
		}
		filterList("#country_chzn .chzn-search input", $("#country_chzn .chzn-results"));
		filterList("#zoneId .chzn-search input", $("#zoneId .chzn-results"));
		
		/*
		$('#save_address').on('click', function(){ //æäº¤ä¼åå°åèµæ
			if(!check_form_address()){ return false; }
			$(this).attr('disabled', 'disabled');
			var obj=$('.user_address_form');
			var typeAddr=parseInt(obj.find('input[name=typeAddr]').val())==1?1:0;
			if(typeAddr==1){
				cart_obj.checkout_no_login();
			}else{
				$.post('/', obj.serialize()+'&do_action=user.addressbook_mod', function(data){
					if(data.ret==1){
						var $location=window.location.href;
						if($location.indexOf('/account/address/add.html')>0){
							window.top.location='/account/address/';
						}else{
							window.top.location.reload();
						}
					}
				}, 'json');
			}
			$(this).removeAttr('disabled');
			return false;
		});
		*/
		var address_rq_mark=true;
		$('.user_address_form').submit(function(){ return false; });
		$('#save_address').on('click', function(){
			if(address_rq_mark && !$('#save_address').hasClass('disabled')){
				var $notnull=$('.user_address_form input[notnull], .user_address_form select[notnull]'),
					$TypeAddr=parseInt($('.user_address_form input[name=typeAddr]').val())==1?1:0,
					$errorObj=new Object;
				$('#save_address').addClass('disabled');
				address_rq_mark=false;
				setTimeout(function(){
					var status=0;
					$notnull.each(function(){
						$errorObj=($(this).attr('name')=='PhoneNumber'?$(this).parent().parent().next('p.error'):$(this).parent().next('p.error'));
						if($.trim($(this).val())==''){
							$(this).addClass('null');
							$errorObj.text(lang_obj.user.address_tips.PleaseEnter.replace('%field%', $(this).attr('placeholder'))).show();
							status++;
							if(status==1){
								$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
							}
						}else{
							$(this).removeClass('null');
							$errorObj.hide();
						}
					});
					$('.user_address_form input[format][notnull]').each(function(){
						$errorObj=$(this).parent().next('p.error');
						$format=$(this).attr('format').split('|');
						if($format[0]=='Length' && $.trim($(this).val()).length<parseInt($format[1])){
							$(this).addClass('null');
							$errorObj.text(lang_obj.format.length.replace('%num%', $format[1])).show();
							status++;
							if(status==1){
								$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
							}
						}else{
							$(this).removeClass('null');
							$errorObj.hide();
						}
					});
					if(status){ //æ£æ¥è¡¨å
						address_rq_mark=true;
						$('#save_address').removeClass('disabled');
						return false;
					}
					$.post('/', $('.user_address_form').serialize()+'&do_action=user.addressbook_mod', function(data){
						if(data.ret==1){
							var $location=window.location.href;
							if($location.indexOf('/account/address/add.html')>0){
								window.top.location='/account/address/';
							}else{
								window.top.location.reload();
							}
						}
					}, 'json');
					address_rq_mark=true;
					$('#save_address').removeClass('disabled');
				}, 100);
			}
			return false;
		});
		
		function set_tax_code_value(obj, v){
			maxlen=obj.val()==1?11:14;
			obj.next('input[name=tax_code_value]').attr('maxlength', maxlen);
			v==1 && obj.next('input[name=tax_code_value]').val('');
		}
		$('select[name=tax_code_type]').change(function(){set_tax_code_value($(this), 1);});
		set_tax_code_value($('select[name=tax_code_type]').not(':disabled'));
		
		$('select[name=country_id]').change(function(){ //ä½¿ç¨è°·æ­æµè§å¨çèªå¨è¡¨åå¡«ååè½ï¼åºç°country_idèªå¨éæ©ï¼ç¸å³èææä¸è½èªå¨å®ç°
			var name=$('select[name=country_id] option:selected').text(),
				cid=$('select[name=country_id]').val(),
				stateJson = $('select[name=country_id]').data('state'),
				countryCodeJson = $('select[name=country_id]').data('code');
			$('#country_chzn li.group-option').each(function(){
				if($(this).text()==name){
					$(this).click();
					user_obj.get_state_from_country(cid, stateJson, countryCodeJson); //å·²ç»èªå¨éæ©å½å®¶éé¡¹ï¼éè¦æ§è¡å è½½çä»½
				}
			});
		});
	},

	get_state_from_country:function(CId, stateJson, countryCodeJson){
		// åå§å
		stateJson = stateJson == undefined ? [] : stateJson;
		countryCodeJson = countryCodeJson == undefined ? [] : countryCodeJson;

		// è·åçä»½ä¿¡æ¯åå½å®¶ä»£ç 
		var d = stateJson[CId] ? stateJson[CId] : -1,
		code = countryCodeJson[CId] ? countryCodeJson[CId] : '';

		if(d==-1){
			$('#zoneId').css({'display':'none'}).find('select').attr('disabled', 'disabled').removeAttr('notnull');
			$('#state').css({'display':'block'}).find('input').removeAttr('disabled');
		}else{
			$('#zoneId').css({'display':'block'}).find('select').removeAttr('disabled').attr('notnull', '');
			$('#state').css({'display':'none'}).find('input').attr('disabled', 'disabled');
			str='';
			var vselect='<option value=""></option>';
			var vli='';
			for(i=0; i<d.length; i++){
				vselect+='<option value="'+d[i]['SId']+'">'+d[i]['States']+'</option>';
				vli+='<li class="group-option active-result">'+d[i]['States']+'</li>';
			}
			$('#zoneId select').html(vselect);
			$('#zoneId ul').html(vli);
			$('#zoneId .chzn-container a span').text(lang_obj.global.selected+'---');
		}
		$('#countryCode').val('+'+code);
		$('#phoneSample span').text(code);
		if(CId==30){
			$('#taxCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
			$('#taxCode').find('input').attr('notnull', 'notnull');
			$('#tariffCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#tariffCode').find('input').removeAttr('notnull');
		}else if(CId==211){
			$('#tariffCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
			$('#tariffCode').find('input').attr('notnull', 'notnull');
			$('#taxCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#taxCode').find('input').removeAttr('notnull');
		}else{
			$('#taxCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#tariffCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#taxCode, #tariffCode').find('input').removeAttr('notnull');
		}
	},
	
	set_default_address:function(AId){
		$.ajax({
			url:"/",
			async:false,
			type:'post',
			data:{'do_action':'user.get_addressbook', 'AId':AId},
			dataType:'json',
			success:function(data){
				let stateJson = $('select[name=country_id]').data('state'),
					countryCodeJson = $('select[name=country_id]').data('code');
				if(data.ret==1){
					$('input[name=edit_address_id]').val(data.msg.address.AId);
					$('input[name=FirstName]').val(data.msg.address.FirstName);
					$('input[name=LastName]').val(data.msg.address.LastName);
					$('input[name=AddressLine1]').val(data.msg.address.AddressLine1);
					$('input[name=AddressLine2]').val(data.msg.address.AddressLine2);
					$('input[name=City]').val(data.msg.address.City);
					
					var index=$('select[name=country_id]').find('option[value='+data.msg.address.CId+']').eq(0).attr('selected', 'selected').index();
					$('#country_chzn a span').text(data.msg.country.Country);
					$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
					user_obj.get_state_from_country(data.msg.address.CId, stateJson, countryCodeJson);
					if(data.msg.address.CId==30||data.msg.address.CId==211){
						$('select[name=tax_code_type]').find('option[value='+data.msg.address.CodeOption+']').attr('selected', 'selected');
						$('input[name=tax_code_value]').attr('maxlength', (data.msg.address.CodeOption==1?11:14)).val(data.msg.address.TaxCode);
					}
					
					if(data.msg.country.HasState==1){
						$('#zoneId div a span').text(data.msg.address.StateName);
						var sindex=$('select[name=Province]').find('option[value='+data.msg.address.SId+']').attr('selected', 'selected').index();
						$('#zoneId ul.chzn-results li.group-option').eq(sindex-1).addClass('result-selected');
					}else{
						$('input[name=State]').val(data.msg.address.State);
					}
					
					$('input[name=ZipCode]').val(data.msg.address.ZipCode);
					$('input[name=CountryCode]').val('+'+data.msg.address.CountryCode);
					$('input[name=PhoneNumber]').val(data.msg.address.PhoneNumber);
					
				}else if(data.ret==2){
					$('input[name=edit_address_id], input[name=FirstName], input[name=LastName], input[name=AddressLine1], input[name=AddressLine2], input[name=City], input[name=tax_code_value], input[name=State], input[name=ZipCode], input[name=CountryCode], input[name=PhoneNumber]').val('');

					var index=$('select[name=country_id]').find('option[value='+data.msg.country.CId+']').eq(0).attr('selected', 'selected').index();
					$('#country_chzn a span').text(data.msg.country.Country);
					$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
					user_obj.get_state_from_country(data.msg.country.CId, stateJson, countryCodeJson);
				}else{
					global_obj.new_win_alert(data.msg.error);
				}
				
				$('.user_address_form .input_box_txt').each(function(){
					if($.trim($(this).val())!=''){
						$(this).parent().addClass('filled');
					}else{
						$(this).parent().removeClass('filled');
					}
				});
			}
		});
	},
	
	address_init:function(){
		$('.address_menu .menu_title li').click(function(){
			if(!$(this).hasClass('add') && $('#addressForm').css('display')=='none'){
				$('.address_menu .menu_title li a').removeClass('current').removeClass('FontBorderColor');
				$(this).find('a').addClass('current').addClass('FontBorderColor');
				$('.address_menu .menu_content .menu').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
				if($(this).hasClass('shipping')){
					$(this).parent().find('.add').show();
				}else{
					$(this).parent().find('.add').hide();
				}
			}	
		});	
		$('#cancel_address').click(function(){
			$('#addressForm').slideUp('fast', function(){
				$('.address_menu .menu_content').slideDown('fast');
			});
			return false;
		});
		$('.address_list .options a[name=edit]').click(function(){
			var addrId=$(this).data('addrid');
			$('#addressForm .errorInfo').html('');
			user_obj.set_default_address(addrId);
			$('.address_menu .menu_content').slideUp('fast',function(){
				$('#addressForm').slideDown('fast');	
			});
			return false;
		});
		$('.address_list .options a[name=del]').click(function(){
			return window.confirm(lang_obj.user.delete_shipping);
		});
		$('.address_menu .menu_title li.add').click(function(){
			$('#addressForm .errorInfo').html('');
			user_obj.set_default_address(0);
			$('.address_menu .menu_content').slideUp('fast',function(){
				$('#addressForm').slideDown('fast');	
			});
			return false;
		});
		$('.address_list .options a[name=default]').click(function(){
			$.post('/account/', 'do_action=user.addressbook_selected&AId='+$(this).data('addrid'), function(data){
				if(data.ret==1){
					window.location.reload();
				}
			}, 'json');
		});
	},
	
	inbox_init:function(){
		//é»è®¤è§¦å
		user_obj.inbox_products_list();
		
		$('body').on('click', '.inbox_full', function(){
			//æ¶ä»¶ç®±äºä»¶
			var $Obj=$('.inbox_full');
			if($Obj.find('.unread_message').is(':visible')){
				$Obj.find('.unread_message').hide();
				$Obj.find('.message_dialogue, .message_bottom').show();
				$Obj.find('.message_dialogue_list').html(''); //æ¸ç©ºå¯¹è¯æ 
				$('.menu_products_list .item:eq(0)').click();
			}
		}).on('click', '.menu_products_list .item', function(){
			//å³ä¾§æ ç®
			var $This=$(this),
				$Obj=$('.inbox_left'),
				$MId=$This.attr('data-id'),
				$UserId=$This.attr('data-user-id');
			$This.addClass('current').siblings().removeClass('current');
			if($Obj.find('.unread_message').is(':visible')){
				$Obj.find('.unread_message').hide();
				$Obj.find('.message_dialogue, .message_bottom').show();
			}
			$Obj.find('.message_dialogue_list').html(''); //æ¸ç©ºå¯¹è¯æ 
			$.post('?', {'do_action':'user.inbox_view', 'MId':$MId, 'UserId':$UserId}, function(data){
				if(data.ret==1){
					var $Html='';
					for(k in data.msg.Reply){
						if((k==0 && data.msg.Reply[k].Type==1) || data.msg.Reply[k].UserId==0){ //ç®¡çååç­
							$Html+=	'<div class="dialogue_box dialogue_box_left clean">';
							$Html+=		'<div class="time">Manager&nbsp;&nbsp;&nbsp;'+data.msg.Reply[k].Time+'</div>';
							$Html+=		'<div class="message">'+data.msg.Reply[k].Content.replace(/\r\n/g, '<br />')+'</div>';
							if(data.msg.Reply[k].PicPath){
							$Html+=		'<div class="picture"><a href="'+data.msg.Reply[k].PicPath+'" target="_blank" class="pic_box"><img src="'+data.msg.Reply[k].PicPath+'" /><span></span></a></div>';
							}
							$Html+=	'</div>';
							$Html+=	'<div class="clear"></div>';
						}else{ //ä¼åæé®
							$Html+=	'<div class="dialogue_box dialogue_box_right clean">';
							$Html+=		'<div class="time">'+data.msg.Reply[k].Time+'</div>';
							$Html+=		'<div class="message">'+data.msg.Reply[k].Content.replace(/\r\n/g, '<br />')+'</div>';
							if(data.msg.Reply[k].PicPath){
							$Html+=		'<div class="picture"><a href="'+data.msg.Reply[k].PicPath+'" target="_blank" class="pic_box"><img src="'+data.msg.Reply[k].PicPath+'" /><span></span></a></div>';
							}
							$Html+=	'</div>';
							$Html+=	'<div class="clear"></div>';
						}
					}
					$Obj.find('.message_dialogue_list').append($Html);
					$Obj.find('.message_dialogue_list .dialogue_box').size() && $Obj.find('.message_dialogue').animate({scrollTop:$Obj.find('.message_dialogue_list .dialogue_box:last').offset().top}, 10); //èªå¨æ»å¨å°æåä¸ä¸ªæ¶æ¯
					$Obj.find('input[name=MId]').val(data.msg.MId);
					$This.find('i').hide();
					if(data.msg.NotRead>0){ //æ´æ¿æªè¯»æ¶æ¯çæ»æ°
						$('.message_list .sys_bg_button:eq(1)>span').html(data.msg.NotRead);
					}else{
						$('.message_list .sys_bg_button:eq(1)>span').hide();
					}
				}
			}, 'json');
			return false;
		}).on('click', '.menu_products_list .btn_more', function(){
			//å è½½æ´å¤
			user_obj.inbox_products_list();
		}).on('submit', '#reply_form', function(){
			//ç«åä¿¡æ¶æ¯æäº¤åå¤
			var $Stop=0;
			$('#reply_form *[notnull]').each(function(){
				if($.trim($(this).val())==''){
					$(this).addClass('null');
					$Stop+=1;
				}else{
					$(this).removeClass('null');
				}
			});
			if($Stop>0){
				return false;
			}
		});
	},
	
	inbox_products_list:function(){
		var $Page=parseInt($('.menu_products_list').attr('data-page'));
		$.post('?', {'do_action':'user.inbox_view_list', 'Page':$Page}, function(data){
			var $Html='';
			$('.menu_products_list .more').remove();
			if(data.ret==1){
				if(data.msg.Message){
					$Html+=	'<li class="item hide" data-id="'+data.msg.Message.MId+'" data-user-id="'+data.msg.Message.UserId+'">';
					$Html+=		'<div class="img"><img src="'+data.msg.Message.PicPath+'" /></div>';
					$Html+=		'<div class="name" title="'+data.msg.Message.Name+'">'+data.msg.Message.Name+'</div>';
					$Html+=	'</li>';
				}
				if(data.msg.Products){ //æäº§åä¿¡æ¯
					for(k in data.msg.Products){
						$Html+=	'<li class="item" data-id="'+data.msg.Products[k].MId+'" data-user-id="'+data.msg.Products[k].UserId+'">';
						if(data.msg.Products[k].IsReply>0){
						$Html+=		'<i>1</i>';
						}
						$Html+=		'<div class="img"><img src="'+data.msg.Products[k].PicPath+'" /></div>';
						$Html+=		'<div class="name" title="'+data.msg.Products[k].Name+'">'+data.msg.Products[k].Name+'</div>';
						$Html+=	'</li>';
					}
					if(data.msg.Over>0){
						$Html+=	'<li class="more"><a href="javascript:;" class="btn_global btn_more">More</a></li>';
					}
				}
				$('.menu_products_list').append($Html).attr('data-page', $Page+1);
				if($('#lib_user_inbox').attr('data-type')=='Inbox'){
					$('.inbox_full').click();
				}
			}
		}, 'json');
	},
    
	edit_pay_init:function(){
		//ç¼è¾æ¯ä»æ¹å¼
		$('.edit_pay_btn').click(function(){
			if($(this).attr('disabled')) return false;
			$(this).blur().attr('disabled', 'disabled');
			var $OId=$(this).attr('oid');
			$.ajax({
				type: "POST",
				url: "/?do_action=cart.get_payment_methods",
				dataType: "json",
				data:{'OId':$OId},
				success: function(data){
					if (data.ret == 1) {
						var c = data.msg.info,
							defaultPId = 0,
							payment_list = '',
							pay_content = '',
							feePrice = 0,
							total = data.msg.total_price,
							//PId = parseInt($('.edit_pay_btn').attr('pid')),
                            PId = data.msg.PId,
							total = parseFloat(total.replace(data.msg.currency_symbols, '', total)),
                            isShippingInfo = parseInt(data.msg.IsShippingInfo);
						for(i = 0; i < c.length; i++){
							if (PId == c[i].PId) defaultPId = c[i].PId;
							var s = defaultPId == c[i].PId ? 'checked="checked"' : '';
							var i_feePrice = $('html').FloatPrice(total * (c[i].AdditionalFee / 100) + parseFloat(c[i].AffixPrice));
							var w = defaultPId == c[i].PId ? '' : 'style="display:none;"';
							defaultPId == c[i].PId && (feePrice=$('html').FloatPrice(total*(c[i].AdditionalFee/100)+parseFloat(c[i].AffixPrice)));	//ä»æ¬¾æç»­è´¹
							payment_list +='<div class="item">';
								payment_list +='<div class="item_info">';		
									payment_list +='<input type="radio" name="PId" value="'+c[i].PId+'" fee="'+c[i].AdditionalFee+'" affix="'+c[i].AffixPrice+'" method="'+c[i].Method+'" data-showtype="'+c[i].ShowType+'" '+s+' />';
									if(c[i].ShowType==1 && data.msg.CreditCardNum==1){  //éå¤æ¡ä¿¡ç¨å¡
										payment_list +='<span class="txt_box">'+c[i].Name+'</span>';
									}else{
										payment_list +='<span class="pic_box"><img src="'+c[i].LogoPath+'" /><span></span></span>';
									}
									if (i_feePrice > 0) payment_list += ' ( +'+data.msg.currency_symbols+$('html').currencyFormat(i_feePrice, data.msg.currency)+' )';
									if(c[i].ShowType==1){  //ä¿¡ç¨å¡
										payment_list +='<div class="img_table"><div class="img_box">';
										for(var key in c[i].Card){
											payment_list +='<img src="/static/manage/images/set/payment/icon_'+c[i].Card[key]+'.png" />';
										}
										payment_list +='</div></div>';
									}
									payment_list +='<div class="clear"></div>';
								payment_list +='</div>';
								if(c[i].ShowType==1 && data.msg.CreditCardNum==1 && data.msg.CreditCardType == 0){  //éå¤æ¡ä¿¡ç¨å¡
									var PaymentPId=c[i].PId;
									payment_list +='<div id="item_desc_'+PaymentPId+'" class="item_desc" '+w+'></div>';
									$.post('/?do_action=cart.get_credit_card_info', {PId:PaymentPId}, function(card_data){
										$('#item_desc_'+PaymentPId).html(card_data);
									});
								}else if(c[i].ShowType==2){  //æ¬å°
									payment_list +='<div class="item_desc">'+c[i].Description+'</div>';
								}
							payment_list +='</div>';
							
							
						}
						var pay_html='<div id="alert_choose" class="alert_choose">';
						pay_html += '<div class="box_bg themes_popups"></div><a class="noCtrTrack BuyNowBgColor" id="choose_close">Ã</a>';
						pay_html += '<div class="choose_content themes_popups"><form name="pay_edit_form" method="POST" action="">';
						pay_html +=     '<h2>'+lang_obj.cart.checkout+'</h2>';
						pay_html +=		'<div class="payment_list">';
						pay_html +=     	'<h3>'+lang_obj.cart.payment+': </h3>';
						pay_html +=			payment_list;
						pay_html +=		'</div>';
						pay_html +=     '<p class="footRegion">';
						pay_html +=         '<input class="btn BuyNowBgColor" id="pay_button" type="submit" value="'+lang_obj.cart.pay_now+'" />';
						pay_html +=         '<span id="paypal_button_container"></span>';
						pay_html +=         '<span class="choose_price">'+lang_obj.orders.order_total+': <span>'+data.msg.currency_symbols+$('html').currencyFormat($('html').FloatPrice(total+feePrice), data.msg.currency)+'</span></span>';
						pay_html +=     '</p>';
                        pay_html +=     '<input type="hidden" name="TotalPrice" value="'+total+'" />';
                        pay_html +=     '<input type="hidden" name="Symbols" value="'+data.msg.currency_symbols+'" />';
                        pay_html +=     '<input type="hidden" name="Currency" value="'+data.msg.currency+'" />';
                        pay_html +=     '<input type="hidden" name="FeePrice" value="'+data.msg.fee_price+'" />';
                        pay_html +=     '<input type="hidden" name="OldPId" value="'+data.msg.PId+'" />';
                        pay_html +=     '<input type="hidden" name="OId" value="'+$OId+'" /></form></div>';
						pay_html += '</div>';
						
						$('#alert_choose').length && $('#alert_choose').remove();
						$('body').prepend(pay_html);
						$('#alert_choose').css({left:$(window).width()/2-280, top:'20%'});
						global_obj.div_mask();
						
						//æäº¤ç¼è¾æ¯ä»æ¹å¼
						$('form[name=pay_edit_form]').submit(function(){ return false; });
						$('#pay_button').click(function(){
							var obj 	= $('form[name=pay_edit_form]'),
								OId		= $('input[name=OId]').val();
								$this	= $(this);
							$this.attr('disabled', 'disabled').blur();
							if($('form[name=pay_edit_form] input[name=PId]:radio:checked').data('showtype')==1 && typeof(check_creditcard_info) === "function"){  //æ£æ¥ä¿¡ç¨å¡æ¯ä»å¹¶ä¸å­å¨ä¿¡ç¨å¡æ£æµå½æ°
								$tips=check_creditcard_info();
								if($tips){  //æéè¯¯ä¿¡æ¯
									alert($tips);
									$this.attr('disabled', false).blur();
									return false;
								}
							}
							$.post('/?do_action=cart.orders_payment_update', obj.serialize(), function(data){
								if (data.msg == 1) {
									window.location.href = '/cart/complete/'+OId+'/checkout.html';
								} else {
									window.location.href = '/cart/complete/'+OId+'.html';
								}
							}, 'json');
							return false;
						});
						
                        //æ°çPaypalæ¯ä»
						if (data.msg.NewFunVersion >= 4) {
                            isShippingInfo == 1 && user_obj.paypal_init($OId); //å½å¦æä¸¢å¤±å¿«éä¿¡æ¯ï¼éè¦è·³è½¬å°completeé¡µé¢éæ°ç¡®è®¤å¿«éæ¹å¼
						}

						//éæ°è§¦åä¸æ¬¡ç¹å»ææï¼ä¸»è¦æ¯ä¸ºäºæ¾ç¤ºPaypalæé®
						$('form[name=pay_edit_form] input[name=PId]:checked').change();
					}else{
						global_obj.new_win_alert(lang_obj.products.sign_in, function(){window.top.location='/account/login.html';});
					}
				}
			});
			return false;
		});
		
		//å³é­ç¼è¾æ¯ä»æ¹å¼
		$('body').on('click', '#choose_close, #div_mask, #exback_button', function(){
			if($('#alert_choose').length){
				$('#alert_choose').remove();
				global_obj.div_mask(1);
				$('.edit_pay_btn').removeAttr('disabled');
			}
		});

		//éæ©æ¯ä»æ¹å¼
		$('body').on('click', 'form[name=pay_edit_form] .payment_list .item', function(e){
			var radio = $(this).find('input[name=PId]');
            if ($(e.target).attr('type') == 'radio' && $(e.target).attr('name') == 'PId') {
                //ç¹å»åéæé®
			} else {
                //ç¹å»ä»æ¬¾éé¡¹
			    if (radio.attr('checked') == 'checked') return false;
			    radio.attr('checked', true).trigger('change');
            }
		});
		$('body').on('change', 'form[name=pay_edit_form] input[name=PId]', function(){
			var PId=$(this).val(),
				Fee=parseFloat($(this).attr('fee')),
				Affix=parseFloat($(this).attr('affix')),
				Method=$(this).attr('method'),
				currency=$('form[name=pay_edit_form] input[name=Currency]').val();
				total_price=parseFloat($('form[name=pay_edit_form] input[name=TotalPrice]').val());
                OldPId=$('form[name=pay_edit_form] input[name=OldPId]').val();
                fee=$('form[name=pay_edit_form] input[name=FeePrice]').val();
				feePrice=$('html').FloatPrice(total_price*(Fee/100)+Affix);	//ä»æ¬¾æç»­è´¹
			
            if(OldPId==PId){
                //ä»æ¬¾æ¹å¼æ²¡åï¼åºå®æç»­è´¹
                feePrice=$('html').FloatPrice(fee);
            }
			$('.choose_price>span').text($('form[name=pay_edit_form] input[name=Symbols]').val()+$('html').currencyFormat($('html').FloatPrice(total_price+feePrice), currency));
			
			//è¯¦ç»ä¿¡æ¯æ¾ç¤ºä¸å¼å¸¸
			$('form[name=pay_edit_form] .item_desc').slideUp();
			$('form[name=pay_edit_form] input[name=PId]:radio:checked').parent().next('.item_desc').slideDown();
			
			//ä»æ¬¾æé®æ¾ç¤ºå¤æ­
            if (Method == 'Paypal' && $('#paypal_button_container').hasClass('NewFunVersion')) {
                //æ¾ç¤ºPaypalæé®
                $('#paypal_button_container').show();
                $('#pay_button').hide();
            } else {
                //éè
                $('#pay_button').show();
                $('#paypal_button_container').hide();
            }
		});
	},
    
    paypal_init:function(OId){
		if (typeof(paypal) === 'undefined' || typeof(paypal.FUNDING) === 'undefined') return false;
        $('#paypal_button_container').addClass('NewFunVersion').loading();
        $('.loading_msg').css('top', 5);
		//Orders API v2
		$('#paypal_button_container').unloading();
		ueeshop_config.Funding = '';
		if (ueeshop_config.currency == 'EUR' && ueeshop_config.PaypalLoaclPayment) {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT,' + ueeshop_config.PaypalLoaclPayment + ']')};
		} else {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT]')};
		}
		paypal.Buttons({
			env: ueeshop_config.PaypalENV, //sandbox | production
			commit: true,
			//locale: ueeshop_config.PaypalLang,
			style: { layout:'horizontal', size:'medium', shape:'rect', tagline:false },
			funding: ueeshop_config.Funding,
			createOrder: function(data, actions) {   
				return fetch('/?do_action=cart.paypal_payment_create_log&OId=' + OId, {
					method: 'POST',
					credentials: 'include'
				}).then(function(res) {
					//æ£æµå¼¹çªç¶æ
					return res.json();
				}).then(function(data) {
					//è¿åä¿¡æ¯
					if (data.name && data.message) {
						//è¿åæ¥é
						let $message = data.message;
						if (data.details) {
							// ææ´è¯¦ç»çéè¯¯ä¿¡æ¯
							$message = "";
							for (k in data.details) {
								$message += data.details[k].description + "<br />";
							}
						}
						global_obj.new_win_alert($message, function(){
							$('#paypal_button_container').find('.paypal-button').show();
							$('#paypal_button_container').unloading();
						}, 'alert', 0);
						$('.new_win_alert').css('z-index', 100001);
						return false;
					} else {
						return data.id;
					}
				});
			},
			onApprove: function(data, actions) {
				return fetch('/?do_action=cart.paypal_payment_execute_log&orderID=' + data.orderID + '&payerID=' + data.payerID + '&paymentID=' + data.paymentID, {
					method:'GET',
					credentials: 'include'
				}).then(function(res) {
					return res.json();
				}).then(function(data) {
					window.top.location = data.Url;
				});
			},
			onCancel: function (data) {
				// Show a cancel page, or return to cart
				$.post('/?do_action=cart.paypal_payment_cancel_log&orderID=' + data.orderID + '&paymentID=' + data.paymentID + '&OId=' + OId, data);
			},
			onError: function (err) {
				// Show an error page here, when an error occurs
				$.post('/?do_action=cart.paypal_payment_error_log', {OId:OId, Error:err.message});
			}
		}).render('#paypal_button_container');
    }
};
