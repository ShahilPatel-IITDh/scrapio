
var HeaderScrollJs = {
    
    header: null,
    main: null,
    timerId: null,
    scrollPosition: 0,
    
    init: function(){
        
        //console.log('HeaderScrollJs.init');
        
        HeaderScrollJs.header = document.querySelector('body > header');
        
        
        HeaderScrollJs.main = document.getElementById('mainSection');
        
        
        
        
        /*
        // 2021-01-12
        // we changed position from absolute to sticky and don't seem to need these anymore
        
        
        // when the window size changes, see if the header height changed
        //window.addEventListener("resize", HeaderScrollJs.windowResize);
        // we are using debouncing to prevent css updates from happening too many times
        window.addEventListener(
            "resize", 
            function(){
                HeaderScrollJs.debounceFunction(HeaderScrollJs.windowResize, 200);
            }
        );
        
        window.addEventListener(
            "orientationchange",
            function(){
                console.log('orientationchange');
                HeaderScrollJs.debounceFunction(HeaderScrollJs.windowResize, 200);
            }
        );
        */
        
        
        // i am adding this class via js, rather than css file, so that all the fixed stuff only occurs when js runs
        HeaderScrollJs.header.classList.add("sticky");
        
        
        // explicitly call resize to start the page and set the main content margin
        // but wait a small amount of time so the header logo image is loaded
        //setTimeout(HeaderScrollJs.windowResize, 200);
        
        
        
        
        
        if(document.querySelector('body') !== null){
            
            window.addEventListener(
                "scroll", 
                function(){
                    HeaderScrollJs.debounceFunction(HeaderScrollJs.scroll, 200);
                }
            );
        }
        
        
        
        
    },
    
    // https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
    debounceFunction: function(func, delay){
        //console.log('debounceFunction');
        
        // Cancels the setTimeout method execution
        clearTimeout(HeaderScrollJs.timerId);
        
        // Executes the func after delay time.
        HeaderScrollJs.timerId = setTimeout(func, delay);
    },
    
    windowResize: function(){
        console.log('--- windowResize ---');
        
        // 2021-01-12
        // we changed position from absolute to sticky and don't seem to need these anymore
        // set the max width of the header
        //HeaderScrollJs.header.style.maxWidth = HeaderScrollJs.main.offsetWidth + 'px'
        
        // set the top margin of the main content
        //HeaderScrollJs.main.style.marginTop = HeaderScrollJs.header.offsetHeight + 'px';
    },
    
    
    scroll: function(){
        //console.log('scroll');
        
        //HeaderScrollJs.scrollPosition = Math.round(window.scrollY);
        //console.log('HeaderScrollJs.scrollPosition', HeaderScrollJs.scrollPosition);
        
        if(window.scrollY > 50){
            HeaderScrollJs.header.classList.add("scrolled");
        }else{
            HeaderScrollJs.header.classList.remove("scrolled");
        }
        
        
        /*
        // 2021-01-12
        // we changed position from absolute to sticky and don't seem to need these anymore
        
        // if we are under a certain scroll limit, call resize
        // there was an issue seeing an ad directly under the header
        // but once we scroll past the ad, I dont care
        if(window.scrollY < 10){
            // CALL windowResize
            // WE POTENTIALLY CHANGED THE HEIGHT OF THE HEADER
            HeaderScrollJs.debounceFunction(HeaderScrollJs.windowResize, 500);
        }else{
            //console.log('window.scrollY', window.scrollY);
        }
        */
        
        
    }
    
}



// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof HeaderScrollJs != "undefined"  &&  typeof HeaderScrollJs.init != undefined){
        HeaderScrollJs.init();
    }else{
        console.log('no HeaderScrollJs init');
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






