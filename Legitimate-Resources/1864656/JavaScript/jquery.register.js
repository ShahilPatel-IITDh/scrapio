var typingTimer;
var doneTypingInterval = 1000;
var register_step1_safetycallonce = true;

function register_step1_typeready()
{
	if(register_step1_safetycallonce)
	{
		//make sure this function is not called twice
		register_step1_safetycallonce = false;
		setTimeout('register_step1_safetycallonce = true;',1000);
		
		//set habbo image
		var habboload = $('<img src="http://www.habbox.com/wave/' + $('#register_habboname').val() + '">');
		$(habboload).load(function(){
		$('#register-habbo-character').html(habboload);
		});
		
		//fade next button
		$('.next-submit-button').fadeIn();
		
		//set all instances from here on out to their habbo name where applicable
		$('.user_habboname').html($('#register_habboname').val());
	}
}

function register_step1_keyup()
{
	typingTimer = setTimeout('register_step1_typeready();',doneTypingInterval);
}

function register_step1_keydown()
{
	clearTimeout(typingTimer);
}
