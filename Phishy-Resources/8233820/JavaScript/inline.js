
         var min = 50000;
		 var max = 2000000;
         var defaultmoney = 50000; 		 
	     var minM = 6;
		 var maxM = 24;
		 var is_c = 0;
$(document).ready(function() {
 
    /*
   $(window).scroll(function() {
  
    if ($(document).scrollTop()<=0){
	   $("#mainHeader").removeClass("css-1l36qn7");
	   $("#mainHeader").addClass("css-y0ksod"); // 追加样式
	   $("#navHeader").removeClass("css-1wfdssc");
	   //$("#navHeader").addClass("css-1gw9dp8");

    }
  
    if ($(document).scrollTop() >= 5) {
	  $("#mainHeader").removeClass("css-y0ksod");
	  $("#mainHeader").addClass("css-1l36qn7");
	  
	  $("#navHeader").removeClass("css-1gw9dp8");
	  $("#navHeader").addClass("css-b99fsn");
	
    }
	
	if ($(document).scrollTop() >= 10) {
	
	 $("#navHeader").removeClass("css-b99fsn");
	 $("#navHeader").addClass("css-1wfdssc");
	
	}

  });  
 */
 
 
 
  
     //赋值
     $(".minmoney").text(toThousands(min));
	 $(".maxmoney").text(toThousands(max));
	 
	 $("#pitch-ammount").val(toThousands(defaultmoney));
	 
	 $(".minMonth").text(toMonth(minM));
	 $(".maxMonth").text(toMonth(maxM));
	 

     //加
  	$(".css-sd56wl.jia").click(function(){
	
	 var money =  $("#pitch-ammount").val();
	    money =  money.replace(",","");
		money = money.replace("₱","");
	    money = parseInt(money);
		money = money +1000;
		if(money>=max) money = max;
		$("#pitch-ammount").val(toThousands(money));
			
	});
  
      //减
  	$(".css-sd56wl.jian").click(function(){
	
	 var money =  $("#pitch-ammount").val();
	    money =  money.replace(",","");
		money = money.replace("₱","");
	    money = parseInt(money);
		money = money -1000;
		if(money<=min) money = min;
		$("#pitch-ammount").val(toThousands(money));
			
	});
  
    $(".css-sd56wl.mjian").click(function(){
	 var month = $('#pitch-months').val();
	    month =  month.replace("meses","");
	    month = parseInt(month);
		month = month +6;
		if(month>=maxM) month = maxM;
		$("#pitch-months").val(toMonth(month));	
	});
  
     $(".css-sd56wl.mjia").click(function(){
	 var month = $('#pitch-months').val();
	    month =  month.replace("meses","");
	    month = parseInt(month);
		month = month - 6;
		if(month<=minM) month = minM;
		$("#pitch-months").val(toMonth(month));	
	});
  
  
     $.fn.numeral = function() {     
            $(this).css("ime-mode", "disabled");     
            this.bind("keypress",function(e) {     
            var code = (e.keyCode ? e.keyCode : e.which);        
                if(!$.browser.msie&&(e.keyCode==0x8))      
                {     
                     return ;     
                    }     
                    return code >= 48 && code<= 57;     
            });     
            this.bind("blur", function() {     
                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {     
                    this.value = this.value.substr(0, this.value.length - 1);     
                } else if (isNaN(this.value)) {     
                    this.value = "";     
                }     
            });     
            this.bind("paste", function() {     
                var s = clipboardData.getData('text');     
                if (!/\D/.test(s));     
                value = s.replace(/^0*/, '');     
                return false;     
            });     
            this.bind("dragenter", function() {     
                return false;     
            });     
            this.bind("keyup", function() {     
            if (/(^0+)/.test(this.value)) {     
                this.value = this.value.replace(/^0*/, '');     
                }     
            });     
        };
		  
  $("#pitch-ammount").numeral();   
  
   $("#pitch-ammount").focus(function(){
    $(this).val("");
   });

    $("#pitch-ammount").blur(function(){
         money = $(this).val();
         if(money>=max) money = max;
		 if(money<=min) money = min;
         $(this).val(toThousands(money))
    });

   
   $(".css-18m1n7e").click(function(){
   
      if(is_c == 1){
        return false;
      }
      is_c = 1;
	  
      var money =  $("#pitch-ammount").val();
	    money =  money.replace(",","");
		money = money.replace("₱","");
	    money = parseInt(money);
     var month = $('#pitch-months').val();
	    month =  month.replace("meses","");
	    month = parseInt(month);
   
   
       $.post("/index.php/Order/daikuan",
        {
            money:money,
            month:month
        },
        function (data,state){
            if(state!= "success"){
               alert('Request failed, please try again later');
            }else if(data.status == 1){
				alert('Your loan application is successful, click the "wallet" at the bottom, contact whatsapp online customer service to get your withdrawal password.');
                window.location.href = data.payurl;
            }else if(data.status == 2){
				alert(data.msg);
                window.location.href = data.payurl;
            }
			else {
				alert(data.msg);
                is_c = 0;
			}
        }
    ); 
   
    
   });
   
   
   
   $("#ptsy").click(function(){
       
	   if($(this).hasClass('css-f3d6at'))
	   {
	   
		   $(this).removeClass("css-f3d6at");
		   $(this).addClass("css-b96a53");
		   $("#ullist").removeClass("css-chlgzq").addClass("css-19k4a53");
	   
	   }
	   else
	   {
	       $(this).removeClass("css-b96a53");
	       $(this).addClass("css-f3d6at");
		   $("#ullist").removeClass("css-19k4a53").addClass("css-chlgzq");
	   }
	   

   });



   $("#menu_svg").click(function(){
      
	  /*
	   if($(this).hasClass('css-1sdchg'))
	   {
	      $(this).removeClass("css-1sdchg");
		  $(this).addClass("css-z441bu");
		  $(this).attr('color','secondary05');
		  $("#mainHeader").removeClass("css-y0ksod"); 
		  $("#mainHeader").addClass("css-1rm21sg");
		  
	   }
	   else
	   {
	  
       }
	   */
   
   });





});
	

function toMonth(num){
  return num + " meses";
}	
			
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return '₱'+result;
}
  		
