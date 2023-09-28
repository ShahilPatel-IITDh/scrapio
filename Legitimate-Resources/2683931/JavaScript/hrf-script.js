jQuery(function($){
   $(document).ready(function(){
      
      $('.hrf-title').click(function(){
         
     // These edits were made to fix the bug which was caused when same faq article appeared multiple times on a page.
     // It happened because data-content id could have same value. Now that we are using next()
     // it will not break the toggle functionality
     
         var faqcontent = $(this).next('.hrf-content');
             faqcontent.slideToggle();
        
        
      
         $(this).toggleClass(function(){
            if( $(this).is('.close-faq')){
               return 'open-faq';
            }else{
               return 'close-faq';
            }
            
         });
      }); //.hrf-title click
   });

});