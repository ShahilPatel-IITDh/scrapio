
       (function($){

        if(! window._is_wcfm_product_form){
                return;
        }

        var __uploaderOpen = null;

        function toggleProcessableState(ev){
            __uploadedOpen = setInterval(function(){
                if(wp.media.frame){
                    clearInterval(__uploaderOpen);
                    wp.media.frame.uploader.uploader.param('_processable_image', true);
                    wp.media.frame.on('close escape', function(){
                        wp.media.frame.uploader.uploader.param('_processable_image', false);
                    });
            }
            }, 100);
        }

            $('.wcfm-wp-fields-uploader').each(function(){
                $(this).find('img').on('click', toggleProcessableState);
            });

            $('#gallery_img').on('click', '.add_multi_input_block',function(){
                
                $('.wcfm-wp-fields-uploader').each(function(){
                    $(this).find('img').off('click', toggleProcessableState);
               });
               
               $('.wcfm-wp-fields-uploader').each(function(){
                     $(this).find('img').on('click', toggleProcessableState);
                });
            });
           
               
      
       })(jQuery);
    