
function open_popup(class_name, html) {
	$('#popup').addClass(class_name);
	$('#popup').html(html);
	if(parseInt(_is_mobile) == 1) {
		$('#popup').parent().removeClass('dn');
		$('.core').addClass('dn');
		$('.core_portal').addClass('dn');
		window.scrollTo(0,0);
		$("body").addClass('white_bg');
	}
	else {
		$("#popup_open").trigger('click');
		$.fancybox.update();
	}
}

function close_popup() {
	if(parseInt(_is_mobile) == 1) {
		$('#popup').parent().addClass('dn');
		$('.core').removeClass('dn');
		$('.core_portal').removeClass('dn');
		$("body").removeClass('white_bg');
	}

	$.fancybox.close();
}

function get_login() {	
	$.fancybox.showLoading();

	url = _self;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: 'ajax_call=1&get_login=1&shop_id=' + _shop_id,
		success: function(msg) {
			var response = JSON.parse(msg);

			// show popup
			if (response.popup != undefined) {
                $("#popup_open").fancybox({
                    fitToView: false,
                    width: '80%',
                    maxWidth: '940px',
                    height: 'auto',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none',
                    padding: 20,
                    margin: 20,
                    modal: false,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                });
                open_popup('products_msg', response.popup);
            }

			$.fancybox.hideLoading();
		}
	});
}

function get_registration_complete() {	
	$.fancybox.showLoading();
	
	url = _self;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: 'ajax_call=1&get_registration_complete=1&shop_id=' + _shop_id,
		success: function(msg) {
			var response = JSON.parse(msg);

			// show popup
			if (response.popup != undefined) {
				open_popup('products_msg', response.popup);
			}

			$.fancybox.hideLoading();
		}
	});
}

function get_unsubscribe_info() {	
	$.fancybox.showLoading();
	
	url = _self;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: 'ajax_call=1&get_unsubscribe_info=1&shop_id=' + _shop_id,
		success: function(msg) {
			var response = JSON.parse(msg);

			// show popup
			if (response.popup != undefined) {
				open_popup('products_msg', response.popup);
			}

			$.fancybox.hideLoading();
		}
	});
}

function get_tell_a_friend() {	
	$.fancybox.showLoading();
	
	url = _self;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: 'ajax_call=1&get_tell_a_friend=1&shop_id=' + _shop_id,
		success: function(msg) {
			var response = JSON.parse(msg);

			// show popup
			if (response.popup != undefined) {
				open_popup('products_msg', response.popup);
			}

			$.fancybox.hideLoading();
		}
	});
}


function tell_a_friend()
{
	$.fancybox.showLoading();
	
	var url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=tell_a_friend'
		+ '&' + $("#tell_a_friend_form").serialize()
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.error_str) {
				$('#error_text3').html(response.error_str);
			}
			else if(response.success) {
				$('#tell_a_friend_form').addClass('dn');
				$('#tell_friend_popup_text').removeClass('dn');
			}
			
			$.fancybox.update();
			
			$.fancybox.hideLoading();
		}
	});
}

function get_registration() {	
	$.fancybox.showLoading();

	url = _self;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: 'ajax_call=1&get_registration=1&shop_id=' + _shop_id,
		success: function(msg) {
			var response = JSON.parse(msg);

			// show popup
			if (response.popup != undefined) {
				open_popup('products_msg', response.popup);
			}

			$.fancybox.hideLoading();
		}
	});
}

function open_login() {
	$('#login_popup_open').trigger('click');
}

function show_remind() {
	clear_post();
	
	$('#login_con').addClass('dn');
	$('#remind_con').removeClass('dn');
	
	$.fancybox.update();
}

function show_login() {
	clear_post();
	
	$('#remind_con').addClass('dn');
	$('#login_con').removeClass('dn');
	
	$.fancybox.update();
}

function clear_post() {
	$('.response_text').html('');
	$('.log_inputs').removeClass('error');
	$('.radio_label').removeClass('error_str');
}

function remind() {
	$.fancybox.showLoading();
	
	clear_post();
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&remind=1'
		+ '&email=' + $('#remind_email').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('.log_inputs').val('');
				$('#success_text').html(response.success);
			}
			else {
				$('#remind_email').addClass('error');
				$('#error_text').html(response.error);
			}
			
			$.fancybox.update();
			
			$.fancybox.hideLoading();
		}
	});
}

function login(link)
{
	$.fancybox.showLoading();
	
	clear_post();
	
	if($('#autologin').is(':checked')) {
		var autologin = 1;
	}
	else {
		var autologin = 0;
	}
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&login=1'
		+ '&email=' + $('#login_email').val() 
		+ '&password=' + $('#login_password').val()
		+ '&password=' + $('#login_password').val()
		+ '&autologin=' + autologin
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.logged) {
				if(link) {
					location.href=link;
				}
				else {
					window.location.reload();
				}
				
			}
			else {
				$('#login_email').addClass('error');
				$('#login_password').addClass('error');
				$('#error_text').html(response.error);
				
				$.fancybox.update();
				$.fancybox.hideLoading();
			}
		}
	});
}

function logout()
{
	$.fancybox.showLoading();
	
	clear_post();
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&logout=1'
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			window.location.reload();			
		}
	});
}

function user_register()
{
	$.fancybox.showLoading();
	
	clear_post();
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&user_register=1'
		+ '&name=' + $('#reg_name').val() 
		+ '&surname=' + $('#reg_surname').val() 
		+ '&email=' + $('#reg_email').val() 
		+ '&password=' + $('#reg_password').val() 
		+ '&password2=' + $('#reg_password2').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('.log_inputs').val('');
				$('#success_text2').html(response.success);
			}
			else {
				if(response.error_name) {
					$('#reg_name').addClass('error');
				}
				if(response.error_email) {
					$('#reg_email').addClass('error');
				}
				if(response.error_password) {
					$('#reg_password').addClass('error');
				}
				if(response.error_password2) {
					$('#reg_password2').addClass('error');
				}
				
				$('#error_text2').html(response.error);
			}
			
			$.fancybox.update();
			
			$.fancybox.hideLoading();
		}
	});
}

function get_prize(prize_id) {
	$.fancybox.showLoading();
	
	clear_post();
	
	var gender = '';
	if ($('#info_gender1').is(":checked")) {
		gender = 1;
	}
	else if ($('#info_gender2').is(":checked")) {
		gender = 2;
	}
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&get_prize=1'
		+ '&prize_id=' + prize_id 
		+ '&gender=' + gender 
		+ '&name=' + $('#info_name').val() 
		+ '&surname=' + $('#info_surname').val() 
		+ '&email=' + $('#info_email').val() 
		+ '&phone_prefix=' + $('#info_phone_prefix').val() 
		+ '&phone=' + $('#info_phone').val() 
		+ '&street=' + $('#info_street').val() 
		+ '&house_nr=' + $('#info_house_nr').val() 
		+ '&city=' + $('#info_city').val() 
		+ '&zip=' + $('#info_zip').val() 
		+ '&shipping_comment=' + $('#info_shipping_comment').val() 
		+ '&company=' + $('#info_company').val() 
		+ '&department=' + $('#info_department').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('#success_text3').html(response.success);
				$('#fields_con').addClass('dn');
			}
			else {
				if(response.error_gender) {
					$('.gender_label').addClass('error_str');
				}
				if(response.error_name) {
					$('#info_name').addClass('error');
				}
				if(response.error_email) {
					$('#info_email').addClass('error');
				}
				if(response.error_password) {
					$('#info_password').addClass('error');
				}
				if(response.error_password2) {
					$('#info_password2').addClass('error');
				}
				if(response.error_phone_prefix) {
					$('#info_phone_prefix').addClass('error');
				}
				if(response.error_phone) {
					$('#info_phone').addClass('error');
				}
				if(response.error_street) {
					$('#info_street').addClass('error');
				}
				if(response.error_house_nr) {
					$('#info_house_nr').addClass('error');
				}
				if(response.error_city) {
					$('#info_city').addClass('error');
				}
				if(response.error_zip) {
					$('#info_zip').addClass('error');
				}
				
				$('#error_text3').html(response.error);
			}
			
			$.fancybox.hideLoading();
		}
	});
}

function user_update() {
	$.fancybox.showLoading();
	
	clear_post();
	
	var gender = '';
	if ($('#info_gender1').is(":checked")) {
		gender = 1;
	}
	else if ($('#info_gender2').is(":checked")) {
		gender = 2;
	}
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&user_update=1'
		+ '&gender=' + gender 
		+ '&name=' + $('#info_name').val() 
		+ '&surname=' + $('#info_surname').val() 
		+ '&email=' + $('#info_email').val() 
		+ '&password=' + $('#info_password').val() 
		+ '&password2=' + $('#info_password2').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('#success_text3').html(response.success);
			}
			else {
				if(response.error_gender) {
					$('.gender_label').addClass('error_str');
				}
				if(response.error_name) {
					$('#info_name').addClass('error');
				}
				if(response.error_email) {
					$('#info_email').addClass('error');
				}
				if(response.error_password) {
					$('#info_password').addClass('error');
				}
				if(response.error_password2) {
					$('#info_password2').addClass('error');
				}
				
				$('#error_text3').html(response.error);
			}
			
			$.fancybox.hideLoading();
		}
	});
}

function update_address()
{
	$.fancybox.showLoading();
	
	clear_post();
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&update_address=1'
		+ '&phone_prefix=' + $('#info_phone_prefix').val() 
		+ '&phone=' + $('#info_phone').val() 
		+ '&order_comment=' + $('#info_order_comment').val() 
		+ '&street=' + $('#info_street').val() 
		+ '&house_nr=' + $('#info_house_nr').val() 
		+ '&city=' + $('#info_city').val() 
		+ '&zip=' + $('#info_zip').val() 
		+ '&shipping_comment=' + $('#info_shipping_comment').val() 
		+ '&company=' + $('#info_company').val() 
		+ '&department=' + $('#info_department').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('#success_text3').html(response.success);
			}
			else {
				if(response.error_phone_prefix) {
					$('#info_phone_prefix').addClass('error');
				}
				if(response.error_phone) {
					$('#info_phone').addClass('error');
				}
				if(response.error_street) {
					$('#info_street').addClass('error');
				}
				if(response.error_house_nr) {
					$('#info_house_nr').addClass('error');
				}
				if(response.error_city) {
					$('#info_city').addClass('error');
				}
				if(response.error_zip) {
					$('#info_zip').addClass('error');
				}
				
				$('#error_text3').html(response.error);
			}
			
			$.fancybox.hideLoading();
		}
	});
}

function update_settings()
{
	$.fancybox.showLoading();
	
	var newsletters = 0;
	if ($('#info_newsletters').is(":checked")) {
		newsletters = 1;
	}
	
	clear_post();
	
	url = _webroot;
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'html',
		data : 'portal_ajax_call=1&update_settings=1'
		+ '&newsletters=' + newsletters 
		+ '&notify_about_new_shops=' + $('#notify_about_new_shops').val() 
		,
		success : function(msg) {
			var response = $.parseJSON(msg);
			
			if(response.success) {
				$('.log_inputs').removeClass('error');
				$('#success_text3').html(response.success);
			}
			else {
				$('#error_text3').html(response.error);
			}
			
			$.fancybox.hideLoading();
		}
	});
}

