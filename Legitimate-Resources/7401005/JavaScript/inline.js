




$(".login").click(function(e) {
	$.post('ajax/login.php', $("#modal1").serialize(), 
	function(data){
		
		var userName = encodeURIComponent($("#txtUserName").val ());
		var userPass = encodeURIComponent($("#txtUserPwd").val ());
		if (data.code == "1") {
			//alert ("login successful");
			window.location  = "user-page-domain.php";
		} else if (data.code == "2") {
			//alert ("2fa");
			window.location  ="2fa.php?u=" + userName + "&p=" + userPass;
		} else {
			M.toast({html: data.msg});
		} 
		
		document.getElementById('modal1').reset();
		
	}, "json").fail(function() {
        alert( "Posting failed." );
	});
});

$(".register").click (function (e) {
	var userName = $("#userName").val ();
	var userPass1 = $("#userPwd").val ();
	var userPass2 = $("#userPwd1").val ();
	var userEmail = $("#userEmail").val ();
	
	
	if (userName == "") {
		M.toast({html: "请填写用户名"});
		$("#userName").focus ();
	} else if (userName.length < 3 || userName.length > 20) {
		M.toast({html: "用户名必须大于3个字符且小于20个字符"});
		$("#userName").focus ();
	} else if (userPass1 == "") {
		M.toast({html: "请填写密码"});
		$("#userPwd").focus ();
	} else if (userPass2 == "") {
		M.toast({html: "请填写重复密码"});
		$("#userPwd1").focus ();
	} else if (userPass1 != userPass2) {
		M.toast({html: "密码不一样"});
	} else if (emailValidation(userEmail) == false) {
		M.toast({html: "请输入有效的电子邮件地址"});
		$("#userEmail").focus ();
	} else {
		$.post('ajax/register.php', $("#modal2").serialize(), 
		function(data){
			if (data.code == "1") {
				alert (data.msg);
				window.location  ="user-page-domain.php";
			} else {
				M.toast({html: data.msg});
			} 
			
			
		}, "json").fail(function() {
			alert( "Posting failed." );
		});
	}
	
});

$(".submit-search").click (function (evt) {
	evt.preventDefault();
	$(".searchform").submit ();
});

