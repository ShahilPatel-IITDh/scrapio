(function ($) {
  var stickyHeaderTop = $('header.normal').offset().top;

        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyHeaderTop+75 ) {
                       $('header.normal').addClass('fixed');
                       $('.container-filter-expos').addClass('fixed');
                        
                } else {
                    
                        $('header.normal').removeClass('fixed');
                        $('.container-filter-expos').removeClass('fixed');
                }
        });
   $('.not-found .thumb').each(function(){
   	 var color = $(this).data('color');
   	 $(this).find('cite, .snippet').css('color', color);
   })  

   if($('.exposed-filter-expos.ajax-anchor').length > 0){
    $('.title-group').each(function(ul, u){
      var title = $(this).data('title');
      var destination = $(this).attr('id');
      if(ul == 0){
        $('.exposed-filter-expos').append('<li class="is-active"><a href="#'+destination+'">'+title+'</a></li>')
      }else{
        $('.exposed-filter-expos').append('<li><a href="#'+destination+'">'+title+'</a></li>')

      }
    });

    if($('#view-all-expos').length > 0){
      var title = $('#view-all-expos').text();
      var destination = $('#view-all-expos').attr('href');
      $('.exposed-filter-expos').append('<li><a href="'+destination+'">'+Drupal.t('Past')+'</a></li>');
    }
   }

   let pos1, 
       pos2;

   pos1 = $('#title-current').position();
   pos2 = $('#title-upcoming').position();  

   $('.exposed-filter-expos.ajax-anchor li a').on('click', function(e){
      e.preventDefault();
      var destination = $(this).attr('href');
      if(destination.indexOf('#') == -1){
        window.location.href = destination;
      }else{
        var destinationPosition = $(destination).position();
        window.scrollTo(0, destinationPosition.top - 200);
        $('.exposed-filter-expos li').removeClass('is-active');
        $(this).parent().addClass('is-active');
      }
      
    })

   window.addEventListener('scroll', function(e){ 
      try {
        if(pos1.top < window.scrollY && pos2.top - 250 < window.scrollY){
          $('.exposed-filter-expos li').removeClass('is-active');
          $('.exposed-filter-expos li').eq(1).addClass('is-active');
        }
        if(pos2.top - 250 > window.scrollY){
          $('.exposed-filter-expos li').removeClass('is-active');
          $('.exposed-filter-expos li').eq(0).addClass('is-active');
        }
      }
      catch(e){
        
      }

   })

}(jQuery));