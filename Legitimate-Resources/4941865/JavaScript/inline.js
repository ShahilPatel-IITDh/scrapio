
        document.addEventListener( 'wpcf7mailsent', function( event ) {
        if( "fb_pxl_code" in event.detail.apiResponse){
          eval(event.detail.apiResponse.fb_pxl_code);
        }
      }, false );
    