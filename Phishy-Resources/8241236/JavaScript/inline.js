
        var pmsg = 0;
        jQuery(document).ready(function(){	             
            jshallo_bro();	 	               
        });

        function jspop_slide_close(idele){
                jQuery("#idxhallo_"+idele).effect('shake',400,function(){jQuery('#idxhallo_'+idele).animate({bottom: '-500px'},1000);});		
                jQuery("#idnew_hallo").attr("me_par","0");
            }

         function jshallo_bro(){	
            
            var xj = 0;
            var vn_up = jQuery(".no_css_here").length;	
                vn_up = vn_up-1;            
            var xinterval = setInterval(function(){                
                    xj = jQuery("#idnew_hallo").attr("me_par");		
                    if(xj == 0 ){
                        // muncul
                        jQuery("#idxhallo_"+pmsg).animate({bottom: '100px',left: '40px'},500);
                        jQuery("#idnew_hallo").attr("me_par","1");				
                        setTimeout(function(){						
                            jspop_slide_close(pmsg);
                            if(pmsg==vn_up){
                                pmsg = 0;
                            }else{
                                pmsg=pmsg+1;
                            }	
                            jshallo_bro();				 
                        },6000);
                        clearInterval(xinterval);
                    }else{
                        // sembunyi
                        jspop_slide_close(pmsg);				
                        if(pmsg==vn_up){
                            pmsg = 0;
                        }else{
                            pmsg=pmsg+1;
                        }
                    }
                },20000);
            }
            
