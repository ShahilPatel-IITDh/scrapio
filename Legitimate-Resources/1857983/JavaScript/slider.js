$(document).ready(function () {
    $(".show-youtube-overlay-btn").click(function () {
        $("#youtube-video-overlay-view").empty();
        var $this = $(this);
        var $iframe = $("<iframe>").attr("src", $this.data("link")).addClass("youtube-video-iframe");
        $("<iframe>").attr("allow", "autoplay");
        var $title = $("<h1>").text($this.data("title"));

        $("#youtube-video-overlay-view").html($title);
        //$("#youtube-video-overlay-view").append('<a href="#" class="close-youtube-video">&#10006;</a>');
        $("#youtube-video-overlay-view").append('<svg class="close-youtube-video"><circle cx="12" cy="12" r="11" stroke="black" stroke-width="2" fill="white" /><path stroke="black" stroke-width="4" fill="none" d="M6.25,6.25,17.75,17.75" /><path stroke="black" stroke-width="4" fill="none" d="M6.25,17.75,17.75,6.25" /></svg>');
        $("#youtube-video-overlay-view").append($iframe);
        $(".youtube-video-iframe, .close-youtube-video").wrapAll("<div class='custom-youtube-video-wrapper'>");

        //body.append("<span class='youtube-close-btn'>X</span>");
        document.getElementById("youtube-video-overlay-view").style.display = "block";
    });

    $("#youtube-video-overlay-view").on("click", ".close-youtube-video", function (e) {
        e.preventDefault();
        $("#youtube-video-overlay-view").empty();
        document.getElementById("youtube-video-overlay-view").style.display = "none";
    });

    $(".show-mp4-overlay-btn").click(function () {
        var video = $("#video-mp4")[0];
        var mp4Source = $(".show-mp4-overlay-btn").data("videomp4source");
        $("#video-mp4-source").attr("src", mp4Source);
        video.load();
        video.play();

        document.getElementById("slider-mp4-overlay-video").style.width = 720;
        document.getElementById("slider-mp4-overlay-video").style.height = 500;

        document.getElementById("slider-mp4-overlay-video").style.display = "block";
    });

    $(".close-mp4-video").on("click", function () {
        document.getElementById("slider-mp4-overlay-video").style.display = "none"; 
    });

});