$(function(){/*$("select").selectBoxIt({autoWidth:false});*/$("[rel='popover']").popover();$(function(){$("#search_link").click(function(b){b.preventDefault();if(!$("#search").hasClass("open")){$("div#ffmContainer").animate({top:"60px"},400);$("#search").height("60px");$("#search").slideDown();$("#search").addClass("open")}else{$("#search").slideUp();$("div#ffmContainer").animate({top:"0px"},400);$("#search").removeClass("open")}})});if($(".tm-input").length){$(".tm-input").each(function(e,f){var d=$(this);d.tagsManager({prefilled:d.val().split(","),delimiters:[9,13,44,32],blinkBGColor_1:"#FFFF9C",blinkBGColor_2:"#CDE69C",typeahead:($(this).attr("data-typeahead-source")?true:false),typeaheadAjaxPolling:($(this).attr("data-typeahead-source")?true:false),typeaheadAjaxSource:($(this).attr("data-typeahead-source")?$(this).attr("data-typeahead-source"):""),validator:function(c,a){if(d.attr("data-val")=="email"){var b=d.attr("data-val-limit")?d.attr("data-val-limit"):25;if(!c.match(/^(.+)@([^\(\);:,<>]+\.[a-zA-Z]{2,4})/)){d.parent("div.control-group").addClass("error").find("span.help-block").text("Please enter a valid email address")}else{d.parent("div.control-group").removeClass("error").find("span.help-block").text("")}if($(".tm-tag").length>=b){d.parent("div.control-group").addClass("error").find("span.help-block").text("You have already entered 25 email addresses")}return(c.match(/^(.+)@([^\(\);:,<>]+\.[a-zA-Z]{2,4})/)&&($(".tm-tag").length<b))}},})})}$(document).on("keyup keydown","textarea.char-limit",function(h){var i=$(this).attr("data-char-caption");var j=$(this).attr("data-char-limit");var g=$(this).val().length;var e=(j-g);if(g>j){$(this).val($(this).val().substring(0,j))}if($(i).length){$(i).text(((e)==1)?"1 character remaining":(e)+" characters remaining")}if((e)<=125&&(e)>50){$(this).parent("div.control-group").removeClass("warning error").addClass("warning")}else{if((e)<=50){$(this).parent("div.control-group").removeClass("warning error").addClass("error")}else{$(this).parent("div.control-group").removeClass("warning error")}}});$("body").on("hidden",".modal",function(){$(this).removeData("modal")});(function(){$.fn.jqueryLoad=$.fn.load;$.fn.load=function(l,j,i){var k=$(this);var h=$.isFunction(j)?j:i||$.noop;var g=function(b,a,c){h(b,a,c);k.trigger("loaded")};if($.isFunction(j)){j=g}else{i=g}k.jqueryLoad(l,j,i);return this}})()});


function	ff_copy_to_clipboard(str_text)
{
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(str_text).select();
	document.execCommand("copy");
	$temp.remove();
}


$(function()
{
	$('#home-header-form-field-password-show').on('click', function(evt)
	{
//		if ($('#home-header-form-field-password-show').is(':hidden'))
		if ($('#home-header-form-field-password #newPassword').attr('type') == 'password')
		{
			$('#home-header-form-field-password-show').hide();
			$('#home-header-form-field-password-hide').show();
			$('#home-header-form-field-password #newPassword').attr('type', 'text');
		}
	});
	$('#home-header-form-field-password-hide').on('click', function(evt)
	{
		if ($('#home-header-form-field-password #newPassword').attr('type') == 'text')
		{
			$('#home-header-form-field-password-hide').hide();
			$('#home-header-form-field-password-show').show();
			$('#home-header-form-field-password #newPassword').attr('type', 'password');
		}
	});

	$('#forgot-form-field-password-show').on('click', function(evt)
	{
//		if ($('#forgot-form-field-password-show').is(':hidden'))
		if ($('#newPassword').attr('type') == 'password')
		{
			$('#forgot-form-field-password-show').hide();
			$('#forgot-form-field-password-hide').show();
			$('#newPassword').attr('type', 'text');
		}
	});
	$('#forgot-form-field-password-hide').on('click', function(evt)
	{
		if ($('#newPassword').attr('type') == 'text')
		{
			$('#forgot-form-field-password-hide').hide();
			$('#forgot-form-field-password-show').show();
			$('#newPassword').attr('type', 'password');
		}
	});

	$('#signin-form-field-password-show').on('click', function(evt)
	{
//		if ($('#signin-form-field-password-show').is(':hidden'))
		if ($('#loginPassword').attr('type') == 'password')
		{
			$('#signin-form-field-password-show').hide();
			$('#signin-form-field-password-hide').show();
			$('#loginPassword').attr('type', 'text');
		}
	});
	$('#signin-form-field-password-hide').on('click', function(evt)
	{
		if ($('#loginPassword').attr('type') == 'text')
		{
			$('#signin-form-field-password-hide').hide();
			$('#signin-form-field-password-show').show();
			$('#loginPassword').attr('type', 'password');
		}
	});

	$('#signup-form-field-password-show').on('click', function(evt)
	{
		if ($('#newPassword').attr('type') == 'password')
		{
			$('#signup-form-field-password-show').hide();
			$('#signup-form-field-password-hide').show();
			$('#newPassword').attr('type', 'text');
		}
	});
	$('#signup-form-field-password-hide').on('click', function(evt)
	{
		if ($('#newPassword').attr('type') == 'text')
		{
			$('#signup-form-field-password-hide').hide();
			$('#signup-form-field-password-show').show();
			$('#newPassword').attr('type', 'password');
		}
	});

	$('#account-form-field-password-show').on('click', function(evt)
	{
		if ($('#settingsPassword').attr('type') == 'password')
		{
			$('#account-form-field-password-show').hide();
			$('#account-form-field-password-hide').show();
			$('#settingsPassword').attr('type', 'text');
		}
	});
	$('#account-form-field-password-hide').on('click', function(evt)
	{
		if ($('#settingsPassword').attr('type') == 'text')
		{
			$('#account-form-field-password-hide').hide();
			$('#account-form-field-password-show').show();
			$('#settingsPassword').attr('type', 'password');
		}
	});

	$('#account-form-field-password2-show').on('click', function(evt)
	{
		if ($('#passwordConfirm').attr('type') == 'password')
		{
			$('#account-form-field-password2-show').hide();
			$('#account-form-field-password2-hide').show();
			$('#passwordConfirm').attr('type', 'text');
		}
	});
	$('#account-form-field-password2-hide').on('click', function(evt)
	{
		if ($('#passwordConfirm').attr('type') == 'text')
		{
			$('#account-form-field-password2-hide').hide();
			$('#account-form-field-password2-show').show();
			$('#passwordConfirm').attr('type', 'password');
		}
	});

	$('#setpwd-form-field-password-show').on('click', function(evt)
	{
//		if ($('#setpwd-form-field-password-show').is(':hidden'))
		if ($('#newPassword').attr('type') == 'password')
		{
			$('#setpwd-form-field-password-show').hide();
			$('#setpwd-form-field-password-hide').show();
			$('#newPassword').attr('type', 'text');
		}
	});
	$('#setpwd-form-field-password-hide').on('click', function(evt)
	{
		if ($('#newPassword').attr('type') == 'text')
		{
			$('#setpwd-form-field-password-hide').hide();
			$('#setpwd-form-field-password-show').show();
			$('#newPassword').attr('type', 'password');
		}
	});

	$(window).scroll(function(evt)
	{
		if ($(window).scrollTop() > 0)
		{
			if ($('#anon_header'))
			{
				$('#anon_header').addClass('header-scrolled');
			}
			if ($('#header'))
			{
				$('#header').addClass('header-scrolled');
			}
		}
		else
		{
			if ($('#anon_header'))
			{
				$('#anon_header').removeClass('header-scrolled');
			}
			if ($('#header'))
			{
				$('#header').removeClass('header-scrolled');
			}
		}
	});

	$(window).trigger('scroll');


	$('select').each(function()
	{
		if (!$(this).val())
		{
			$(this).addClass('placeholder');
		}
	});

	$(document).on('focus', 'select', function(evt)
	{
		if ($(this).hasClass('placeholder'))
		{
			$(this).removeClass('placeholder');
		}
	});

	$(document).on('blur', 'select', function(evt)
	{
//		$(this).trigger('change');
	});

	$(document).on('change blur', 'select', function(evt)
	{
		if ($(this).val())
		{
			if ($(this).hasClass('placeholder'))
			{
				$(this).removeClass('placeholder');
			}
		}
		else
		{
			if (!$(this).hasClass('placeholder'))
			{
				$(this).addClass('placeholder');
			}
		}
	});


});