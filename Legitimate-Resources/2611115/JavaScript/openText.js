window.onload = function(){
    if($('.opentext').length) {
        $('.opentext').each(function() {
            var $parent = $(this).children().children().children().children().parent();
            var show;
            
            $('.opentext-headline h1').replaceWith(function() {
                return '<h3>' + $(this).text() + '</h3>';
            });
            
            $('.opentext-headline h2').replaceWith(function() {
                return '<h3>' + $(this).text() + '</h3>';
            });
            
            $('.opentext-headline h4').replaceWith(function() {
                return '<h3>' + $(this).text() + '</h3>';
            });
            
            var $openText = $parent.parent().parent().parent().find('.opentext-text');
            var $height = $openText.height();
            
            $openText.css('height', '0px');
            
            $parent.parent().parent().parent().find('.opentext-headline h3').click(function() {
                if($openText.hasClass('show'))
                    show = false;
                else show = true;
                
                $('.opentext').each(function() {
                    var $hideParent = $(this).children().children().children().children().parent();
                    var $hideOpenText = $hideParent.parent().parent().parent().find('.opentext-text');
                    
                    if($hideOpenText.hasClass('show')){
                        $hideOpenText.removeClass('show');
                        $hideOpenText.css('height', '0px');
                    }
                });
                
                if(show === true){
                    $openText.addClass('show');
                    $openText.css('height', $height + 'px');
                    
                    window.setTimeout(function(){
                        $('html, body').animate({
                            scrollTop: $openText.offset().top - 163
                        }, 500);
                    }, 500);
                }
            });
        });
    }
};