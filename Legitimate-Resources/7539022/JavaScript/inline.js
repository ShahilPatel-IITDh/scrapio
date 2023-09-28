
                $(document).ready(function() {
                
                $(window).scroll(function(){
                	$('.personal-details-content').each(function( index ) {
        				var threshold = 135;
        				var topOffset = $( this ).offset().top;
        				if( topOffset - $(window).scrollTop() < threshold){
            				$( this ).addClass('active');
       					}else{
           					$( this ).removeClass('active');
        				}
    				});
    			});
                
                var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)accepted\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    if (myCookie != "yes") {
                        $('#cookie-consent').show();
                        $('#cookie-space').show();
                        $('#accept').click(function() {
                            document.cookie = "accepted=yes; expires=Thu, 18 Dec 2025 12:00:00 GMT; path=/";
                            $('#cookie-space').hide();
                            $('#cookie-consent').hide();
                        });
                        $('#accept1').click(function() {
                            document.cookie = "accepted=yes; expires=Thu, 18 Dec 2025 12:00:00 GMT; path=/";
                            $('#cookie-space').hide();
                            $('#cookie-consent').hide();
                        });
                    }
                    /*setTimeout(function(){
    					$('#accept').click();
					}, 5000);*/
                });        
            