/*
 * Powered by ueeshop.com		http://www.ueeshop.com
 * å¹¿å·èéç½ç»ç§ææéå¬å¸		020-83226791
 */

function GoogleSignIn(googleUser) {
	//Useful data for your client-side scripts:
	var profile=googleUser.getBasicProfile();
	//console.log("ID: " + profile.getId()); //Don't send this directly to your server!
	//console.log('Full Name: ' + profile.getName());
	//console.log('Given Name: ' + profile.getGivenName());
	//console.log('Family Name: ' + profile.getFamilyName());
	//console.log("Image URL: " + profile.getImageUrl());
	//console.log("Email: " + profile.getEmail());
	var Data={
		'ID':profile.getId(),
		'GivenName':profile.getGivenName(),
		'FamilyName':profile.getFamilyName(),
		'ImageUrl':profile.getImageUrl(),
		'Email':profile.getEmail(),
	};
	//The ID token you need to pass to your backend:
	var id_token=googleUser.getAuthResponse().id_token;
	//console.log("ID Token: " + id_token);
	
	if(!global_obj.getCookie('GoogleLogin')){
		var Time=24*60*60*1000;
		global_obj.setCookie('GoogleLogin', 1, Time);
		GoogleAction(Data);
	}else{
		$('#google_btn').click(function(){
			GoogleAction(Data);
		});
	}
}

function GoogleAction(Data){
	$.get('/?do_action=user.user_oauth&Type=Google', Data, function(result){
		global_obj.div_mask(1);
		global_obj.data_posting(false);
		if(result.ret==1){
			if(typeof result.msg==='string'){
				window.location=result.msg;
			}else{
				window.location=result.msg[0];
			}
		}else{
			$.get(result.msg[0]+'?module=1', '', function(result){
				$('body').prepend(result);
				$('body').find('#binding_module').css({left:$(window).width()/2-220});
				global_obj.div_mask();
				user_obj.user_login_binding();
				global_obj.delCookie('GoogleLogin', -1);
			});
		}
	}, 'json');
}