$(function (){
	
	$("#submit").click(function(e){
		
		e.preventDefault();
		
	
		var name = $("#name").val();
		var email = $("#email").val();
		var subject = $("#subject").val();
		var msg = $("#message").val();
		
		
		
		
		$.ajax({
            timeout: 10000,
            url: "../contact-form.php",
            type: "post",
            dataType: 'json',
            data: {firstName:name, userEmail:email, subject:subject, userMessage:msg}, //this could be name, phone, domain, email, etc..
            tryCount : 0,
            retryLimit : 3,
            success:function(resp)
            {
	           
				
					if(resp.type=="error"){
						
						$("#response").html("<span style='color:red;'>"+resp.text+"</span>");
					}
					else{
						
						$("#response").html(resp.text);
					}
					
            },
           
	            
	                      

            error:function(xhr, textStatus, errorThrown)
            {
	            
                if (textStatus == 'timeout')
                {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit)
                    {
                        $.ajax(this);
                        return;
                    }
                }
               $("#response").html("<span style='color:red;'>There has been an error, please contact 504-355-0081 for further assistance</span>" + resp.text);

            }


            
            
          })
            
            
       })
            
 	});