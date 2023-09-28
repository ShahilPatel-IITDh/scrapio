
var metaslider_15638 = function($) {
            $('#metaslider_15638').nivoSlider({ 
                boxCols:7,
                boxRows:5,
                pauseTime:8000,
                effect:"fade",
                controlNav:true,
                directionNav:true,
                pauseOnHover:true,
                animSpeed:550,
                prevText:false,
                nextText:false,
                slices:15,
                manualAdvance:false
            });
            $(document).trigger('metaslider/initialized', '#metaslider_15638');
        };
        var timer_metaslider_15638 = function() {
            var slider = !window.jQuery ? window.setTimeout(timer_metaslider_15638, 100) : !jQuery.isReady ? window.setTimeout(timer_metaslider_15638, 1) : metaslider_15638(window.jQuery);
        };
        timer_metaslider_15638();
