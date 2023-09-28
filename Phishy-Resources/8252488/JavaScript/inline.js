
        $(document).ready(function(){
            $("#register_now").click(function(){
                window.location.href ="/Login/register.html";
            });
         
            $("#login_show_password").click(function(){
                if($("#password").attr("type") == "password") {
                    $("#password").attr("type", "text");
                }else{
                    $("#password").attr("type", "password");
                }
            });
            $(".coming_soon").click(function() {
                layer.msg("Coming Soon",{icon : 4 });
            });
        });
        
        function validateEmail(enname) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(enname);
        }
        
        $(".login-button").click(function(){
            var password = $("#password").val();
            //var verify = $("#verify").val();
            var form;
            var email = $("#email").val();
                
            if (email == "" || email == null) {
                layer.tips('Please enter username', '#email', { tips: 3 });
                trans_lock = 0;
                return false;
            }
            
            if(/^[a-zA-Z0-9- ]*$/.test(email) == false) {
                layer.tips('Your username have special characters', '#email', { tips: 3 });
                trans_lock = 0;
                return false;
            }
            
            if (password == "" || password == null) {
                layer.tips('Please enter your password', '#password', { tips: 3 });
                trans_lock = 0;
                return false;
            }
            
            /*if (verify == "" || verify == null) {
    			layer.tips('Please input captcha', '#verify', { tips: 3 });
    			return false;
    		}*/
    		form = {email: email, password: password};
        
            $.post("/index/login/uplogin.html", form, function(data) {
                trans_lock = 0;
                if (data.status == 1) {
                    layer.msg(data.info, { icon: 1,time: 2000,end:function(){
                        window.location.href ="/User/index.html";
                    }});
                } else {
                    //$("#verify").val('');
                    //$("#captcha").click();
                    layer.msg(data.info, { icon: 2 });
                    if (data.url) {
                        window.location.href = data.url;
                    }
                }
            }, "json");
        });
    