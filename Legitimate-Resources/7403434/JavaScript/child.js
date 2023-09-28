jQuery(document).ready(function($) {
    "use strict";
    // Comments Toggle
    $("#zox-comments-button").on('click', function(){
        $("#comments").show();
        $("#disqus_thread").show();
        $("#zox-comments-button").hide();
    });
});