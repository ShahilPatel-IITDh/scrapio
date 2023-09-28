$("#home_review_form").validate({
  rules: {
  	rname: "required",
  	ratings: "required",
  	
  	 
  	 remail:{
  	       required: true,
             email: true
  	      },
  
  	review:{
		required: true,
		
	}
  
  },
  
  messages: {
  	rname: "Enter your name.",
  	ratings: "Select rating.",
  	
    
  	remail:{
               required: "Enter email address.",
               email: "Enter valid email address."
            },
  	review:{
		required: "Enter review",
		
	}
  },
  
      submitHandler: function(frm) {
  		
		var formURL="ajax/add-homepage-review.php";
			var postData = $("#home_review_form").serializeArray();
			$("#review_response").html('Loading please wait.......');

	$.ajax(

	{

		url : formURL,

		type: "POST",

		data: postData,
		cache: false,
		crossDomain:true,

		success:function(data, textStatus, jqXHR) 

		{	  
			
			
			var a = data.split("###");
                          if(a[0]==1)
                          {
                            var msg =a[1]; 
							$("#review_response").html(msg);
                          }
                          else
                          {
							var msg =a[1]; 
							$("#review_response").html(msg);
							$('#review_form')[0].reset();
							
							
                          }
						  
		 

		}

	});
		
    }
  });


$(".click_link").click(function (event) {
                    event.preventDefault();
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top-50 }, 1000);
});  
