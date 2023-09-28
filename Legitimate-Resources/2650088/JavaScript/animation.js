$(window).scroll(function(){
    
    //Zoom-in
    $('.zoom-in').each(function(){        
        var zoomIn = 1, zoomOut = 0;
        
        if(isScrolledIntoView($(this))){        
            $(this).css({
                '-webkit-transform': 'scale(' + zoomIn + ')',
                'transform': 'scale(' + zoomIn + ')'
            });
        }
        
        else{
            $(this).css({
                '-webkit-transform': 'scale(' + zoomOut + ')',
                'transform': 'scale(' + zoomOut + ')'
            });
        }
    });

    //Zoom-out
    $('.zoom-out').each(function(){        
        var zoomIn = 1, zoomOut = 1.8;
        
        if(isScrolledIntoView($(this))){        
            $(this).css({
                'opacity':'1',
                'visibility':'visible',
                '-webkit-transform': 'scale(' + zoomIn + ')',
                'transform': 'scale(' + zoomIn + ')'
            });
        }
        
        else{
            $(this).css({
                'opacity':'0',
                'visibility':'hidden',
                '-webkit-transform': 'scale(' + zoomOut + ')',
                'transform': 'scale(' + zoomOut + ')'
            });
        }
    });

    //Fade-in
    $('.fade-in').each(function(){        
        
        if(isScrolledIntoView($(this))){        
            $(this).css({
                'opacity':1,
                'visibility':'visible'
            });
        }
        
        else{
            $(this).css({
                'opacity':0,
                'visibility':'hidden'
            });
        }

        //Fade-in-right
        $('.fade-in-right').each(function(){        
            var point = "0px", side = "50px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'translateX(' + point + ')',
                    'transform': 'translateX(' + point + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'translateX(' + side + ')',
                    'transform': 'translateX(' + side + ')'                    
                });
            }
        });

        //Fade-in-left
        $('.fade-in-left').each(function(){        
            var point = "0px", move = "-50px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'translateX(' + point + ')',
                    'transform': 'translateX(' + point + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'translateX(' + move + ')',
                    'transform': 'translateX(' + move + ')'                    
                });
            }
        });

        //Fade-in-up
        $('.fade-in-up').each(function(){        
            var point = "0px", move = "50px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'translateY(' + point + ')',
                    'transform': 'translateY(' + point + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'translateY(' + move + ')',
                    'transform': 'translateY(' + move + ')'                    
                });
            }
        });

        //Fade-in-down
        $('.fade-in-down').each(function(){        
            var point = "0px", move = "-50px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'translateY(' + point + ')',
                    'transform': 'translateY(' + point + ')'                   
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'translateY(' + move + ')',
                    'transform': 'translateY(' + move + ')'                    
                });
            }
        });

        //Rotate
        $('.rotate').each(function(){        
            var zero = "0deg", angle = "360deg";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'rotate(' + zero + ')',
                    'transform': 'rotate(' + zero + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'rotate(' + angle + ')',
                    'transform': 'rotate(' + angle + ')'                    
                });
            }
        });

        //Rotate Zoom in
        $('.rotate-zoom-in').each(function(){        
            var zero = "0deg", angle = "720deg", zoomIn = 1, zoomOut = 0;
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',                    
                    '-webkit-transform': 'rotate('+zero+') scale(' + zoomIn + ')',
                    'transform': 'rotate('+zero+') scale(' + zoomIn + ')'
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',                    
                    '-webkit-transform': 'rotate('+angle+') scale(' + zoomOut + ')',
                    'transform': 'rotate('+angle+') scale(' + zoomOut + ')'
                });
            }
        });

        //Rotate Zoom out
        $('.rotate-zoom-out').each(function(){        
            var zero = "0deg", angle = "720deg", zoomIn = 2, zoomOut = 1;
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',                    
                    '-webkit-transform': 'rotate('+zero+') scale(' + zoomOut + ')',
                    'transform': 'rotate('+zero+') scale(' + zoomOut + ')'
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',                    
                    '-webkit-transform': 'rotate('+angle+') scale(' + zoomIn + ')',
                    'transform': 'rotate('+angle+') scale(' + zoomIn + ')'
                });
            }
        });

        //Flip Up
        $('.flip-up').each(function(){        
            var zero = "0deg", angle = "180deg";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'rotateX(' + zero + ')',
                    'transform': 'rotateX('+zero+')'
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'rotateX(' + angle + ')',
                    'transform': 'rotateX('+angle+')'
                });
            }
        });

        //Flip In Right
        $('.flip-in-right').each(function(){        
            var zero = "0deg", angle = "360deg", point = 0, move = "300px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'rotateX('+angle+')translateX(' + point + ')',
                    'transform': 'rotateX('+angle+') translateX(' + point + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'rotateX('+zero+')translateX(' + point + ')',
                    'transform': 'rotateX('+zero+') translateX(' + move + ')'
                });
            }
        });

        //Flip In Left
        $('.flip-in-left').each(function(){        
            var zero = "0deg", angle = "360deg", point = 0, move = "-300px";
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-transform': 'rotateX('+angle+')translateX(' + point + ')',
                    'transform': 'rotateX('+angle+') translateX(' + point + ')'                    
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-transform': 'rotateX('+zero+')translateX(' + point + ')',
                    'transform': 'rotateX('+zero+') translateX(' + move + ')'
                });
            }
        });

        //Flip Down Right
        $('.flip-down-right').each(function(){        
            var atime = "1.3s", x = "10s"
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-animation': 'down-right '+atime+'',
                    'animation': 'down-right '+atime+''
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-animation': 'reset-down-right '+atime+'',
                    'animation': 'reset-down-right '+atime+''
                });
            }
        });

        //Flip Down Left
        $('.flip-down-left').each(function(){        
            var atime = "1.3s", x = "10s"
            
            if(isScrolledIntoView($(this))){        
                $(this).css({
                    'opacity':1,
                    'visibility':'visible',
                    '-webkit-animation': 'down-left '+atime+'',
                    'animation': 'down-left '+atime+''
                });
            }
            
            else{
                $(this).css({
                    'opacity':0,
                    'visibility':'hidden',
                    '-webkit-animation': 'reset-down-left '+atime+'',
                    'animation': 'reset-down-left '+atime+''
                });
            }
        });

        //Drop Bounce
        $('.drop-bounce').each(function(){        
            var dropTime = ".3s", x = "1s", y = ".35s";
            
            if(isScrolledIntoView($(this))){
                $(this).css({
                    'animation':'drop'+dropTime+' forwards, bounce ' +x+ ' ' +y+ ''
                });
            }
            
            else{
                $(this).css({
                    'animation': 'goTop '+x+''
                });
            }
        });

    });
});
  
function isScrolledIntoView(elem){
    var $elem = $(elem);
    var $window = $(window);
  
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
  
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
  
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}




// var $animation_elements = $('.animation-element');
    // var $window = $(window);
    
    // function check_if_in_view() {
    // var window_height = $window.height();
    // var window_top_position = $window.scrollTop();
    // var window_bottom_position = (window_top_position + window_height);
    
    // $.each($animation_elements, function() {
    // var $element = $(this);
    // var element_height = $element.outerHeight();
    // var element_top_position = $element.offset().top;
    // var element_bottom_position = (element_top_position + element_height);
    
    // if ((element_bottom_position >= window_top_position) &&
    // (element_top_position <= window_bottom_position)) {
    // $element.addClass('in-view');
    // } else {
    // $element.removeClass('in-view');
    // }
    // });
    // }
    
    // $window.on('scroll resize', check_if_in_view);
    // $window.trigger('scroll');