

var article_video_obj = {
    
    
    init: function(){
        console.log('article_video_obj.init');
        
        
        
        article_video_obj.articleVideoDiv = document.getElementById('articleVideoDiv');
        
        
        // do we have a articleVideoDiv
        if(typeof article_video_obj.articleVideoDiv == null  ||  article_video_obj.articleVideoDiv == undefined){
            return;
        }
        
        // do we have a articleVideoDiv
        if(typeof document.getElementById('videoPlayer') == null  ||  document.getElementById('videoPlayer') == undefined){
            return;
        }
        
        
        
        
        //article_video_obj.articleVideoBtn = document.getElementById('articleVideoBtn');
        
        
        
        article_video_obj.videoPlayer = videojs(
            '#videoPlayer',
            [], // article_video_obj.init_options
            // videoPlayer ready handler
            function(){
                console.log('----- article_video_obj videojs ready handler');
                
                if(typeof misVideoPlayList != undefined  &&  misVideoPlayList.length > 0){
                    
                    article_video_obj.has_playlist = 1;
			        // add the playlist array to the player
			        article_video_obj.videoPlayer.playlist(misVideoPlayList);
			        // amount of time between videos
			        //article_video_obj.videoPlayer.playlist.autoadvance(0);
        				           
                }
                
            } // ready
        );
        
        
        
        
    } // init
    
    
    
    
    
    
    
    
}







// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof article_video_obj != "undefined"  &&  typeof article_video_obj.init != undefined){
        article_video_obj.init();
    }else{
        //console.log('no article_video_obj init');
    }
    
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    //console.log('DOM loaded 2');
    DOMContentLoadedCallback();
} else {
    //console.log('DOM loaded 1');
    document.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
}