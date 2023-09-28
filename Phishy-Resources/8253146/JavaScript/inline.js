
            $('.fancybox').each(function() {
            $(this).attr('href', $(this).parents('.p-a-card').find('.p-a-img img').attr('src'));
                });
            $('.fancybox').fancybox();
        