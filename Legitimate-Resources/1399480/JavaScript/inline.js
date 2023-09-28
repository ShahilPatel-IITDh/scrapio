


  <!--
  (function ($) {
  $(document).ready(function() {
  Cufon.now();

  $('.post-grid.archive .galleryimg,.accordion-gallery .galleryimg').append('<div class="hoverimg" style="height:100%">');  
  $('.post-grid.archive .galleryvid,.accordion-gallery .galleryvid').append('<div class="hovervid" style="height:100%">');  
  $('.archiveimg-wrap .galleryimg').append('<div class="hoverimg" style="height:100%">');   
  $('.archiveimg-wrap .galleryvid').append('<div class="hovervid" style="height:100%">');   
  $('.container .galleryimg').append('<div class="hoverimg" style="height:inherit">');      
  $('.container .galleryvid').append('<div class="hovervid" style="height:inherit">');      

                        $("a[rel^='prettyPhoto'],p.description a").prettyPhoto({
                        keyboard_shortcuts: false,
                        social_tools:false,
                        theme: 'light_rounded'
                        });

  $("img.reflect").reflect({height:35,opacity:0.2});
  if(navigator.appName != "Microsoft Internet Explorer") {
  $("#item-body img.avatar, #item-header-avatar img.avatar, .avatar-block img.avatar").not('#member-list img.avatar').reflect({height:35,opacity:0.2});
  }

  $('.target_blank a').each(function() {
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
  });

  });


  })(jQuery);
  //-->
  