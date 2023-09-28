(function ($, Drupal) {
	Drupal.behaviors.customPlaylistBehavior = {
    	attach: function (context, settings) {
    
    
           if ($(".paragraph--type--desplegable").length>0){
               $(".paragraph--type--desplegable").each(function(){
                   $(this).children("div:last").css("display","none");
                   $(this).children("div:first").click(function(){
                        $(this).next().toggle();
                        $(this).parent().toggleClass("open");
                   });
              });
           }
            
            list_videos = [];
            var video = document.getElementById('video-expo');
            //video.play();
            var next_video = 0;
            var max_length = $('.playlist-custom-item').length;

            video.addEventListener("ended", function(){
                if(next_video < max_length){
                    var id_next = $('.playlist-custom-item').eq(next_video).find('.item-url').html();
                    video.src = id_next;
                    video.play();
                    next_video++;  
                }
            });
    		$('.playlist-custom-item').each(function(u, ul){
    			var title = $(this).find('.item-title').html();
    			var url_video = $(this).find('.item-url').html();
                var url_image = $(this).find('.item-image').html();
                var video_description = $(this).find('.item-description').html();
    			list_videos[u] = {'titol': title, 'url_video': url_video, 'url_image': url_image, 'video_description': video_description };
    		});
    		$('[data-playlist-navigation]').append('<div class="grid mt2 mxn075 vimeo"></div>');
    		for(var u = 0; u < list_videos.length; u++ ){
    			console.log(list_videos[u]['titol']);
    			$('[data-playlist-navigation]').find('.grid')
              .append('<div class="col col-12 sm-col-6"><div class="mb2 mx075"><a href="" data-video-id="'
                +list_videos[u]['url_video']+
                '" class="PlayThumb"><div class="PlayThumb-image"><img src="'
                +list_videos[u]['url_image']+
                '"></div><span class="PlayThumb-title">'+list_videos[u]['titol']+
                '</span></a><div class="PlayThumbInfo gray"><small>'+list_videos[u]['video_description']+'</small></div></div></div>');
    		}
    		$(document).on('click', '.vimeo a.PlayThumb', function(e){
    			e.preventDefault();
    			$id = $(this).data('video-id');
    			changeSource($id);
    		});

    		function changeSource(url) {
			   var video = document.getElementsByTagName('video');
			   video[0].src = url;
			   video[0].play();
               window.scrollTo(0,200);
			}

            function play_next(){
                alert('hola');
            }
            
    	}
    }	
})(jQuery, Drupal);