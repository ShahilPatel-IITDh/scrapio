jQuery(document).ready(function($) {
    $(".watchlist").click(function() {
        var id = $(this).attr("id");
        var dataString = 'id='+ id ;
        var parent = $(this);

        $(this).fadeOut(0);
        $.ajax({
            type: "POST",
            url: watchlist_url,
            data: dataString,
            cache: false,

            success: function(html) {
            parent.html(html);
            parent.fadeIn(0);
            }
        });
    });
});