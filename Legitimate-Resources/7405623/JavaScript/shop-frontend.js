(function( $maz ) {
    'use strict';
    //click event

        $maz(document).on( 'mouseover', '.wcvaswatchinput',
          function( event ){
              event.preventDefault();
              
              var hoverimage    = $maz(this).attr('data-o-src');
              var parent        = $maz(this).closest('li');
              var parentdiv     = $maz(this).closest('div.shopswatchinput');
              

               if (hoverimage) {
                 $maz(this).closest('.product').find("img.attachment-woocommerce_thumbnail").attr("src",hoverimage);
                 $maz(this).closest('.product').find("img.attachment-woocommerce_thumbnail").attr("srcset",hoverimage);
                 
               }

               

               return false;
        }
            



         );

      
        if (wcva_shop.hover_swap == "yes") {
          $maz(document).on("mouseleave", '.wcvaswatchinput',function(event) {

              event.preventDefault();
              var parent         = $maz(this).closest('li');
              var parentdiv      = $maz(this).closest('div.shopswatchinput');
              var default_value  = $maz(parentdiv).attr("prod-img");

              $maz(this).closest('.product').find("img.attachment-woocommerce_thumbnail").attr("src",default_value);
              $maz(this).closest('.product').find("img.attachment-woocommerce_thumbnail").attr("srcset",default_value);
           
              return false;
          }); 
        }

         

        var slider_count = parseInt(wcva_shop.slider_no);

        jQuery(document).ready(function($maz) {

          if (wcva_shop.enable_slider == "yes") {

            

             $maz('.wcva-multiple-items').each(function(){

            

              var swatch_count = $maz(this).attr("swatch-count");
              
              
              if (swatch_count > slider_count) {
                jQuery(this).slick({
                
                  slidesToShow: slider_count,
                  slidesToScroll: slider_count,
                  nextArrow: '<img src="'+wcva_shop.right_icon+'" class="nextArrowBtn">',
                  prevArrow: '<img src="'+wcva_shop.left_icon+'" class="nextArrowBtn">',
              
                }); 
              }
               
            });

            $maz('.wcva-multiple-items').show();

          }

        });
})(jQuery);