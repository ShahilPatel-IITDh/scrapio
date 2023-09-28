
$(document).ready(function(){
    $('ul.it_navbar li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
    });
    });

    // dropdown

    $(document).ready(function(){
      $(".filter_bar").click(function(){
        $(".filter_dropdown").slideToggle("slow");
      });
    });




   $(document).ready(function() {
      $('.show-hidden-menu').click(function() {
          let content = $(this).next('.hidden-menu');
          content.slideToggle();
    
          let icon = content.siblings('.show-hidden-menu').find('i');
    
          if($(content).hasClass("active")){
            $(content).removeClass('active')
            icon.removeClass('ri-subtract-fill')
          }else{
            $(content).addClass('active')
            icon.addClass('ri-subtract-fill')
          }
      });   
    });
   

    // dropdown

