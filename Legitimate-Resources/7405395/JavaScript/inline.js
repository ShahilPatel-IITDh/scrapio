
    $(document).ready(function(){
        var $allVideos = $("div.youtube-player, div.video-player"),
            $fluidEl = $("div.youtube-player").parent();

        $allVideos.each(function() {
            $(this).attr('data-aspectRatio', $(this).height() / $(this).width());
            vLoader = $(this).find("img.video-loader");

            if(vLoader.attr('data-host')=='vimeo'){
                vID = $(this).attr('data-id');
                xhr = $.ajax({
                    url: 'https://vimeo.com/api/v2/video/'+vID+'.json',
                    dataType: 'json',
                    success: function(data) {
                            if(data.length){
                                $("img.vimeo-"+vID).attr('src', data[0].thumbnail_large);
                                xhr.abort();
                            }
                        }
                });
            }
        });

        $(document).on("click", "div.video-player>img.video-loader, div.video-player>div.play", function(){
            var target = $(this).closest("div.video-player"),
                host = target.find('img.video-loader').attr('data-host'),
                link = target.find('img.video-loader').attr('data-lnk');

            if(host=='vimeo'){
                toLoad = '<iframe src="'+link+'" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
            } else if(host=='videodetective') {
                toLoad = '<iframe width="100%" height="100%" src="'+link+'" frameborder="0" scrolling="no" allowfullscreen></iframe>';
            }

            target.html(toLoad);
        });

    });
