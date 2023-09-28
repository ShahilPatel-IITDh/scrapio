
        (function($,_){
            $(function(){
                // Set a random glyph

                // Random section colours
                var colour = _.sample(["blue" , "darkgreen" , "lightgreen" , "orange" , "purple"]);
                var position = _.random(1, 5);
                var selector = "apnic-sprite apnic-sprite-glyphs glyph-" + colour + "-" + position + " hidden-print";
                $('#glyph').attr('class',selector);
            });
        })(jQuery,_);
        