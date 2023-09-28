

/* Edp_FooterController */
function Set_Cookie( name, value, expires, path, domain, secure )
{
    var today = new Date();
    today.setTime( today.getTime() );

    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }

    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name + "=" +escape( value ) +
                      (( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
                      (( path ) ? ";path=" + path : "" ) +
                      (( domain ) ? ";domain=" + domain : "" ) +
                      (( secure ) ? ";secure" : "" );
}
function on(e){
    e.src = e.src.replace(/_off./,'_on.');
}
function off(e){
    e.src = e.src.replace(/_on./,'_off.');
}
function on_id(id) {
    e = document.getElementById(id);
    e.src = e.src.replace(/_off./,'_on.');
}
function off_id(id) {
    e = document.getElementById(id);
    e.src = e.src.replace(/_on./,'_off.');
}
function setBookmark (url,str){
    if(str=='')str=url;
    if(document.all)window.external.AddFavorite(url,str);
    else alert('To add '+str+' to your bookmarks, press CTRL and D.');
}
function showHide(elementID){
    var divElement = $(elementID);
    if(divElement.style.display == "none"){
        divElement.style.display="block";
    }else{
        divElement.style.display="none";
    }
}
function imageLoader(){
    leftButtonImage = new Image();
    rightButtonImage = new Image();
    leftButtonImage.src = 'https://imga.corporateperks.com/emp_image/button_left_on.gif';
    rightButtonImage.src = 'https://imga.corporateperks.com/emp_image/button_right_on.gif';
}
function showHideDelay(divID){
    if($(divID).style.display=='none'){
        var divObj = $(divID);
        setTimeout(function(){divObj.style.display='block';},100,null,divObj);
    }else{
        $(divID).style.display='none';
    }
}
function closeBanner(){
    new Ajax.Request('/footer/shpltrclicked', {
        method:'post',
        onSuccess:function(data){
            $('shpltrLink').hide();
        }
    });
}
function activateToolTips(){
    if (window.Prototype) {
        $$('.tooltip_box').each(function(tip){
            tip.up(1).observe("mouseover", function(){ tip.show(); });
            tip.up(1).observe("mouseout", function(){ tip.hide(); });
        });
    }
}

$j(document).ready(activateToolTips);









/* paw_LoginController */
function altformCheck(){
	var username = document.login.login.value;
	var j_username = $('j_username');
	var errorMessage = $('errorMessage');
	var errorMessageCopy = $('errorMessageCopy');
	var valid = validate_email(username)
	if(!valid){
		j_username.style.backgroundColor="#ffc9c9";
		errorMessage.style.display="block";
		errorMessageCopy.innerHTML='Please enter a valid e-mail address.';

		document.login.login.focus();
		return false;
	}else{
		document.login.submit();
	}
	return false;
}


function formCheck2(){
	var username = document.login.j_username.value;
	var j_username = document.getElementById('j_username');
	var password = document.login.j_password.value;
	var j_password = document.getElementById('j_password');
	var errorMessage = document.getElementById('errorMessage');
	var errorMessageCopy = document.getElementById('errorMessageCopy');
	if(username == "" || username == null){
		//j_username.style.backgroundColor="#ffc9c9";
		if($('usernameHelpLink')) {
			$('usernameHelpLink').style.display='';
		}
		if(password == "" || password == null){
			//j_password.style.backgroundColor="#ffc9c9";
			if($('passwordHelpLink')) {
				$('passwordHelpLink').style.display='';
			}
		}
		if(document.getElementById('message')){
			document.getElementById('message').innerHTML='Please enter your login credentials.';
		}else{
			errorMessage.style.display="block";
			errorMessageCopy.innerHTML='Please enter your login credentials.';
		}
        if(typeof loginFocus == 'function'){
            loginFocus();
        }else{
		    document.login.j_username.focus();
        }
		return false;
	}else if(password == "" || password == null){
		j_username.style.backgroundColor="#ffffff";
		if($('usernameHelpLink')) {
			$('usernameHelpLink').style.display='none';
		}
		//j_password.style.backgroundColor="#ffc9c9";
		if($('passwordHelpLink')) {
			$('passwordHelpLink').style.display='';
		}
		if(document.getElementById('message')){
			document.getElementById('message').innerHTML='Please enter a password.';
		}else{
			errorMessage.style.display="block";
			errorMessageCopy.innerHTML='Please enter a password.';
		}
        if(typeof passwordFocus == 'function'){
            passwordFocus();
        }else{
            document.login.j_password.focus();
        }
		return false;
	}else{
		errorMessage.style.display="none";
		j_password.style.backgroundColor="#ffffff";
		if($('passwordHelpLink')) {
			$('passwordHelpLink').style.display='none';
		}
		j_username.style.backgroundColor="#ffffff";
		if($('usernameHelpLink')) {
			$('usernameHelpLink').style.display='none';
		}
		//rememUser();
		return true;
	}
	return false;
}

function formcheck3(){
    var username = document.login.j_username.value;
    var j_username = document.getElementById('j_username');
    var password = document.login.j_password.value;
    var j_password = document.getElementById('j_password');
    var errorMessage = document.getElementById('errorMessage');
    var errorMessageCopy = document.getElementById('errorMessageCopy');
    if(username == "" || username == null){
        //j_username.style.backgroundColor="#ffc9c9";
        if($('usernameHelpLink')) {
            $('usernameHelpLink').style.display='';
        }
        if(password == "" || password == null){
            //j_password.style.backgroundColor="#ffc9c9";
            if($('passwordHelpLink')) {
                $('passwordHelpLink').style.display='';
            }
        }
        if(document.getElementById('message')){
            document.getElementById('message').innerHTML='Please enter your login credentials.';
        }else{
            //errorMessage.style.display="block";
            errorMessageCopy.innerHTML='Please enter your login credentials.';
            showerror();
        }
        if(typeof loginFocus == 'function'){
            loginFocus();
        }else{
            j_username.focus();
        }
        return false;
    }else if(password == "" || password == null){
        j_username.style.backgroundColor="#ffffff";
        if($('usernameHelpLink')) {
            $('usernameHelpLink').style.display='none';
        }
        //j_password.style.backgroundColor="#ffc9c9";
        if($('passwordHelpLink')) {
            $('passwordHelpLink').style.display='';
        }
        if(document.getElementById('message')){
            document.getElementById('message').innerHTML='Please enter a password.';
        }else{
            //errorMessage.style.display="block";
            errorMessageCopy.innerHTML='Please enter a password.';
            showerror();
        }
        if(typeof passwordFocus == 'function'){
            passwordFocus();
        }else{
            j_password.focus();
        }
        return false;
    }else{
        //errorMessage.style.display="none";
        //hideerror();
        j_password.style.backgroundColor="#ffffff";
        if($('passwordHelpLink')) {
            $('passwordHelpLink').style.display='none';
        }
        j_username.style.backgroundColor="#ffffff";
        if($('usernameHelpLink')) {
            $('usernameHelpLink').style.display='none';
        }
        //rememUser();
        return true;
    }
    return false;
}


function rememUser()
{
	var user = document.login.j_username.value;
	var pswd = document.login.j_password.value;

	if(document.login.remember && document.login.remember.checked == true)
	{	

	}
	else
	{	

	}
}

function CreateBookmark() {
	var title = document.title; 
	var url = window.location.href;
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) { // Chrome Bookmark Ctrl+D
		alert('Press Ctrl+D to bookmark this page in Chrome.');
	} else if (agt.indexOf("safari") != -1) { // Safari Bookmark Ctrl+D
		alert('Press Ctrl+D to bookmark this page in Safari.');
	} else if (window.sidebar) { // Mozilla Firefox Bookmark Ctrl+D
		alert('Press Ctrl+D to bookmark this page in Firefox.');
	} else if( window.external ) { // IE Favorite Ctrl+D
		window.external.AddFavorite( url, title); 
	} else if(window.opera) { // Opera Hotlist Ctrl+D
		alert('Press Ctrl+D to bookmark this page in Opera.');
	} else {
		alert('Please bookmark this page through your browser.');
	}
}

function LogFromHome() {
	var From_Home_Email = document.getElementById('From_Home_Email');
	var Email_Error = document.getElementById('Email_Error');
	
	var email = From_Home_Email.value;
	var reg = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
	
	if (reg.test(email)) {
		Email_Error.innerHTML = '';
		var oldStuff = FromHomeLoading();
		var url = '/login/emailfromhome/email/'+email;
		//var url = '/login/emailfromhome/email/';
		//alert(url);
		var myAjax = new Ajax.Request(url,{method:'get',onComplete:FromHomeSuccess(oldStuff)});
		
	} else {
		Email_Error.innerHTML = 'Please enter a valid email address';
		
	}
}

function FromHomeLoading() {

	var From_Home_Popup_Form = document.getElementById('From_Home_Popup_Form');
	if (From_Home_Popup_Form != null) {
		var oldCode = From_Home_Popup_Form.innerHTML;
		From_Home_Popup_Form.innerHTML = '<p><strong>Sending email...</strong></p>';
	}
	return oldCode;
}

function FromHomeSuccess(oldHtml) {
	if ($('From_Home_Popup_Form') != null)
		$('From_Home_Popup_Form').innerHTML = '<strong>Email sent!</strong>';
	setTimeout("PopupDisappear()", 2000);
	setTimeout(function() {$('From_Home_Popup_Form').innerHTML = oldHtml;}, 2500);
}

function PopupAppear() {
	var Email_Error = document.getElementById('Email_Error');
	var From_Home_Email = document.getElementById('From_Home_Email');
	var From_Home_Popup = document.getElementById('From_Home_Popup');
	
	if (Email_Error != null && Email_Error.innerHTML.length > 0)
		Email_Error.innerHTML = '';
	if (From_Home_Email != null && From_Home_Email.value != 'your@email.com')
		From_Home_Email.value='your@email.com';
	//setTimeout("$('From_Home_Email').activate()", 500);
	
	Effect.Appear('From_Home_Popup', {duration: 0.5});
	//From_Home_Popup.style.display='block';	
}

function PopupDisappear() {
	var Email_Error = document.getElementById('Email_Error');
	var From_Home_Email = document.getElementById('From_Home_Email');
	var From_Home_Popup = document.getElementById('From_Home_Popup');
	
	if (Email_Error != null && Email_Error.innerHTML.length > 0)
		Email_Error.innerHTML = '';
	if (From_Home_Email != null && From_Home_Email.value.length > 0)
		From_Home_Email.value = '';
	Effect.Fade('From_Home_Popup', {duration: 0.5});
	//From_Home_Popup.style.display='none';
}
function send(){
var From_Home_Email = document.getElementById('From_Home_Email');
if(From_Home_Email.value=='your@email.com') From_Home_Email.value='';

LogFromHome();
}

