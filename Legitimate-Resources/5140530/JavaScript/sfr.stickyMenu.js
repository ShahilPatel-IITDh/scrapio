
	// STICKY MENU
	/*
	 * 
	 * 
	 <div id="sfrOasisOverlayMenu">
		<div class="wrap">
			<a href="#" class="toggle"></a>
			<a href="#" class="recall"></a>
			<a href="#" class="chat"></a>
			<a href="#" class="callme"></a>
		</div>
	</div>
	
	
	    $sfr("#sfrOasisOverlayMenu").stickyMenu({"offset":-83,"button":$("#sfrOasisOverlayMenu a.toggle")}) ;
	    $sfr("#sfrOasisOverlayMenu .wrap a:not(.toggle)").click(function(){
	        oasis.openContent(true, "/") ;
	        return false ;
	    });
	 */

	;(function($) {
	    $.fn.stickyMenu = function(options) {
	        
	        /***************************************************************
	        * DEFAULT 
	        ***************************************************************/
	        var settings = $.extend( {
	            offset : 60,
	            button : null
	        }, options);
	        return this.each(function() {
	            var sticky = {

	                $e : null,
	                $c : settings.button,
	                offset : settings.offset,
	                menuVisible : true,

	                hide : function() {
	                    if (sticky.menuVisible){
	                        sticky.$e.removeClass("visible");
	                        sticky.$e.stop().animate({  right: sticky.offset },200);
	                        sticky.menuVisible = false ;
	                    }
	                },
	                show : function() {
	                    if (!sticky.menuVisible){
	                        sticky.$e.addClass("visible");
	                        sticky.$e.stop().animate({ right: 0 },200);
	                        sticky.menuVisible = true ;
	                    }
	                },
	                _init : function(elt) {

	                    sticky.$e = $(elt) ;

	                    sticky.$c.click( function () {


	                        if (sticky.menuVisible) {
	                            sticky.hide() ;
	                        }else{
	                            sticky.show() ;
	                        };
	                        return false ;

	                    }) ;
	                }


	            } ;

	            sticky._init(this);
	            return sticky;
	        });
	    };
	})($sfr);