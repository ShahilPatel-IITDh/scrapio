$(document).ready(function() {	

	$(document).keydown(function (e) {
		if (e.which == 13) {
			var login = $("#LoginAreaUtenti").val(), pwd = $("#PasswordAreaUtenti").val();
			if(login !== "" && pwd !== "") {
				$('#formLoginUtenti').submit();
			}
		}
	});

	$("#submitFormCustomerArea").click(function() {
		$('#formLoginUtenti').submit();
	});

	$('#formLoginUtenti').submit(function() {
		$("#pnlMsgAlert").hide();
		$("#LoginAreaUtenti").removeClass("inputTextError");
		$("#PasswordAreaUtenti").removeClass("inputTextError");

		var login = $("#LoginAreaUtenti").val(), pwd = $("#PasswordAreaUtenti").val();
		var success = true;
		var isLogged = true;
		$.ajax({
		  url: "https://managehosting.aruba.it/in/checkPasswordExpired.asp",
		  type: "POST",
		  async: false,
		  data: { login:login, password:pwd,checkPassword:true},
		  dataType: "html"
		}).done(function (res, statusText, xhr) {
			if (xhr.status == 200) {
			  var responseArray = res.split("|");
			  if(responseArray.length < 1){
				success = false;
			  }
			  else {
				success = (responseArray[0].toUpperCase()==="TRUE");
			  }
			  
			  if(responseArray.length == 4){
				isLogged = (responseArray[3].toUpperCase()==="TRUE");
			  }
			  
			  if(!isLogged)
			  {
				  if (!success) {
					  $('#wrongLoginMsg').hide();
					  $('#changePassMsg').show();
				  } else {
					  $('#wrongLoginMsg').show();
					  $('#changePassMsg').hide();
				  }
				$("#pnlMsgAlert").show();
				$("#LoginAreaUtenti").addClass("inputTextError");
				$("#PasswordAreaUtenti").addClass("inputTextError");
			  }
			  
			  if(!success){
				var pwdSugg = $("#txtPasswordSuggestion");
				pwdSugg.text(pwdSugg.text().replace("{0}", login));
				$("#ChangePasswordSuggestedModal").show();
				$("#ChangePasswordForcedLogin").val(responseArray[1]);
				$("#ChangePasswordForcedToken").val(responseArray[2]);
			  }
			}
		});
		return success && isLogged;
	});

	$(document).on("click",".closeAlertMsg", function() { closeAlertMsg(this); });
});