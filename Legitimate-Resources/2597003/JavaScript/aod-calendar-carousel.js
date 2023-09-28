

var AodCalendarCarouselJs = {
    
    prev_next_nodes: null,
    
    init: function(){
        console.log('AodCalendarCarouselJs.init');
        
        
        if(window.videoRecipeCalendar == undefined) return;
        
        
        
        
        AodCalendarCarouselJs.article_links = window.videoRecipeCalendar.querySelectorAll('.calendarDiv .article a');
        
        AodCalendarCarouselJs.article_links.forEach(
            (node, index) => {
                //console.log(node);
                
                node.addEventListener(
                    'click', 
                    (evt) => {
                        //console.log('click', evt.currentTarget.dataset.aid);
                        
                        evt.preventDefault();
                        
                        // hide the current, and show the aID clicked
                        AodCalendarCarouselJs.changeSlide(null, evt.currentTarget.dataset.aid);
                        
                        // go to top to see the slide
                        //window.scrollTo(0, 0);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                        
                    }
                );
            }
        );
        
        
        
        
        
        AodCalendarCarouselJs.carousel_node = window.videoRecipeCalendar.querySelector('.carousel-inner');
        AodCalendarCarouselJs.slides = AodCalendarCarouselJs.carousel_node.querySelectorAll('.item');
        
        AodCalendarCarouselJs.prev_next_nodes = window.videoRecipeCalendar.querySelectorAll('.carousel-control');
        
        AodCalendarCarouselJs.prev_next_nodes.forEach(
            (node, index) => {
                console.log(node);
                
                
                node.addEventListener(
                    'click', 
                    (evt) => {
                        console.log('click', evt.currentTarget.dataset.slide);
                        
                        evt.preventDefault();
                        
                        
                        
                        AodCalendarCarouselJs.changeSlide(evt.currentTarget.dataset.slide, null);
                        
                        
                        
                        return;
                        
                        
                        AodCalendarCarouselJs.current_slide_idx = -1;
                        AodCalendarCarouselJs.next_slide_idx = 0;
                        
                        AodCalendarCarouselJs.slides.forEach(
                            (node, index) => {
                                
                                if( node.classList.contains("active") ){
                                    console.log('slide', index);
                                    AodCalendarCarouselJs.current_slide_idx = index;
                                }else{
                                    // reposition to the right, out of the frame
                                    node.left = `${ ( AodCalendarCarouselJs.carousel_node.offsetWidth + 100 ) }px`;
                                }
                                
                            }
                        );
                        
                        console.log('AodCalendarCarouselJs.current_slide_idx', AodCalendarCarouselJs.current_slide_idx);
                        
                        
                        // assuming "next"
                        AodCalendarCarouselJs.next_slide_idx = AodCalendarCarouselJs.current_slide_idx + 1;
                        
                        //let new_left = AodCalendarCarouselJs.carousel_node.offsetWidth;
                        if( evt.currentTarget.dataset.slide == 'prev' ){
                            //new_left = 0 - new_left;
                            AodCalendarCarouselJs.next_slide_idx = AodCalendarCarouselJs.current_slide_idx - 1;
                        }
                        
                        // array range check
                        if(AodCalendarCarouselJs.next_slide_idx < 0){
                            AodCalendarCarouselJs.next_slide_idx = ( AodCalendarCarouselJs.slides.length - 1 );
                        }else if(AodCalendarCarouselJs.next_slide_idx >= AodCalendarCarouselJs.slides.length){
                            AodCalendarCarouselJs.next_slide_idx = 0;
                        }
                        
                        
                        
                        console.log('AodCalendarCarouselJs.next_slide_idx', AodCalendarCarouselJs.next_slide_idx);
                        
                        console.log('current slide', AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx]);
                        
                        
                        
                        // for now
                        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx].classList.remove("active");
                        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.next_slide_idx].classList.add("active");
                        
                        
                        return;
                        
                        console.log('new_left', new_left);
                        
                        
                        
                        
                        
                        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx].style.left = `${new_left}px`;
                        //AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx].classList.remove("active");
                        window.setTimeout( "AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx].classList.remove('active')", 3000 );
                        
                        
                        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.next_slide_idx].classList.add("active");
                        //window.setTimeout( "AodCalendarCarouselJs.slides[AodCalendarCarouselJs.next_slide_idx].left = `100px`;", 1500 );
                        
                        
                    } 
                );
                
                
            }
        );
        
        

    }, // init
    
    
    
    changeSlide: function(dir=null, aID=null){
        console.log('changeSlide', dir, aID);
        
        
        AodCalendarCarouselJs.current_slide_idx = -1;
        AodCalendarCarouselJs.next_slide_idx = 0;
        
        // loop to get the index
        AodCalendarCarouselJs.slides.forEach(
            (node, index) => {
                
                // find the currently active slide
                if( node.classList.contains("active") ){
                    console.log('active slide index', index);
                    AodCalendarCarouselJs.current_slide_idx = index;
                }else{
                    // reposition to the right, out of the frame
// NOT SURE I NEED / LIKE THIS
                    node.left = `${ ( AodCalendarCarouselJs.carousel_node.offsetWidth + 100 ) }px`;
                }
                
            }
        );
        
        console.log('AodCalendarCarouselJs.current_slide_idx', AodCalendarCarouselJs.current_slide_idx);
        
        
        // we can pass a direction or an article id
        if( aID != null  &&  aID >= 0){
            // specific aid passed in
            
            AodCalendarCarouselJs.slides.forEach(
                (node, index) => {
                    
                    if(aID == node.dataset.aid){
                        AodCalendarCarouselJs.next_slide_idx = index;
                    }
                    
                }
            );
            
            
        }else{
            // no aid passed
            // user is browsing the slides
            
            // assuming "next"
            AodCalendarCarouselJs.next_slide_idx = AodCalendarCarouselJs.current_slide_idx + 1;
                        
            if( dir == 'prev' ){
                AodCalendarCarouselJs.next_slide_idx = AodCalendarCarouselJs.current_slide_idx - 1;
            }
        }
        
        
        
        // array range check
        if(AodCalendarCarouselJs.next_slide_idx < 0){
            AodCalendarCarouselJs.next_slide_idx = ( AodCalendarCarouselJs.slides.length - 1 );
        }else if(AodCalendarCarouselJs.next_slide_idx >= (AodCalendarCarouselJs.slides.length)){
            AodCalendarCarouselJs.next_slide_idx = 0;
        }
        
        console.log('AodCalendarCarouselJs.next_slide_idx', AodCalendarCarouselJs.next_slide_idx);
        
        
        // for now
        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.current_slide_idx].classList.remove("active");
        AodCalendarCarouselJs.slides[AodCalendarCarouselJs.next_slide_idx].classList.add("active");
                        
                        
        
        
    } // changeSlide
    
    
}





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof AodCalendarCarouselJs != "undefined"  &&  typeof AodCalendarCarouselJs.init != undefined){
        AodCalendarCarouselJs.init();
    }else{
        //console.log('no AodCalendarCarouselJs init');
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