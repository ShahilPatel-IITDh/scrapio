
    /* PARTNER PORGRAM */
    
    /* BASKET KEY */
            $.cookie('CART_KEY', 'MTY5MTMwMTMwN2YzYjBiMDQ0YTFlMjgyYWFlZTkxMGY4YjY4OWYxNjA5', { expires: 30, path: '/' });
    
    /* refreshCartInHeader */
    const refreshCartInHeader = function () {
        $.ajax({
            url: "/koszyk/info/",
            dataType: 'html',
            success: function (data) {
                $('#headerBasketInfoContainer').html(data);
            }
        });
    };

    /* PRE highlightjs */
    hljs.highlightAll();
