
	// STICKY BAR
	/*
	 * 
	<div id="sfrOasisOverlayBar">
		<div class="singleSide">
			<div class="baseline">
				Vous souhaitez vous abonner à la box de SFR ?
			</div>
			<div class="clickToTest">
				<a href="#">
					Tester votre ligne
				</a>
			</div>
		</div>
	</div>
	
	
	    $sfr("#sfrOasisOverlayBar").stickyStuff() ;
	
	 */
	 ;(function($) {
        $.fn.stickyStuff = function(options) {
            
            /***************************************************************
            * DEFAULT 
            ***************************************************************/
            var settings = $.extend( {
                extendindTool : null,
            }, options);
            return this.each(function() {
                var sticky = {

                    $e : null,
                    $w : null,
                    offset : 200,
                    menuVisible : false,
                    disabled : false,
                    hide : function() {
                        if (sticky.menuVisible){
                            sticky.$e.stop().animate({  bottom: -70 },200);
                            sticky.menuVisible = false ;
                        }
                    },
                    show : function() {
                        if (!sticky.menuVisible){
                            sticky.$e.stop().animate({ bottom: 0 },200);
                            sticky.menuVisible = true ;
                        }
                    },
                    _init : function(elt) {

                        sticky.$e = $(elt) ;
                        sticky.$w = $(window) ;
                        sticky.$w.scroll(function () {
                            if (!sticky.disabled){
                                if (sticky.$w.scrollTop() > sticky.offset) {
                                    sticky.show() ;
                                } else {
                                    sticky.hide() ;
                                }
                            }
                        });
                        
                        if (settings.extendindTool !=null) {
                            window[settings.extendindTool] = sticky ;
                        }
                    }


                }

                sticky._init(this);
            });
        };
    })($sfr);