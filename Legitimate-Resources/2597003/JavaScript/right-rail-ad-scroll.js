
/*
    
    
    if we want to throttle
    https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event    
    
    
    once we are fixed, we jump a bit left because the RR width is changing
    
    
*/






var RightRailAdScroll = {
    
    //ad_nodes: [],
    
    right_rail_height: 0,
    
    
    test_mode: false,
    
    timerId: null,
    
    
    init: function(){
        //console.log('RightRailAdScroll.init');
        
        
        
        
        RightRailAdScroll.right_rail_node = document.getElementById('PrimeRightRailAds');
        if(typeof RightRailAdScroll.right_rail_node == null  ||  RightRailAdScroll.right_rail_node == undefined){
            // make sure the page has this content
            return;
        }
        
        
        
        // is the rail displayed. the right rail might be hidden
        if( getComputedStyle(RightRailAdScroll.right_rail_node).display != 'block' ){
            return;
        }
        


        // couple of tests to see that we are on the article page
        // is this an article page
        if(typeof document.querySelector('body.internalPage') == null  ||  document.querySelector('body.internalPage') == undefined){
            return;
        }
        
        
        /**
        // does the page have the articleDiv
        RightRailAdScroll.articleDiv_node = document.querySelector('.articleDiv');
        if(typeof RightRailAdScroll.articleDiv_node == null  ||  RightRailAdScroll.articleDiv_node == undefined){
            // we are not on an article page / missing article div
            return;
        }
        */
        
        
        
        
        
        
        
        
        // we made it
        
        
        
        
        
        RightRailAdScroll.right_rail_inner_node = RightRailAdScroll.right_rail_node.querySelector('.inner');
        
        
        
        
        RightRailAdScroll.ad_slots = RightRailAdScroll.right_rail_node.querySelectorAll('.slot');
        
        
        // do we have ads
        if(typeof RightRailAdScroll.ad_slots == null  ||  RightRailAdScroll.ad_slots == undefined){
            return;
        }
        
        
        
        
        
        
        RightRailAdScroll.header = document.querySelector('body > header');
        RightRailAdScroll.subHeader_node = document.getElementById('subHeader');
        RightRailAdScroll.breadcrumb = document.getElementById('breadcrumb');
        
        RightRailAdScroll.mainSection_node = document.getElementById('mainSection');
        
        
        
        // a rare, non-scrolling css style
        // we found some pages that were too short to work with ad scroll
        // and we chose to set the min here, because we only need the height IF we are scrolling
        // no need to set a min height on the rail otherwise (even though, as of today, the rail only exists to scroll)
        RightRailAdScroll.right_rail_node.style.minHeight = '3000px';
        
        
        
        if( RightRailAdScroll.test_mode == true){
            
            
            RightRailAdScroll.right_rail_node.style.border = '4px solid black';
            RightRailAdScroll.right_rail_node.style.backgroundColor = 'aqua';
            
            RightRailAdScroll.right_rail_inner_node.style.border = '4px dashed red';
            RightRailAdScroll.right_rail_inner_node.style.backgroundColor = 'grey';
            
            
            RightRailAdScroll.ad_slots.forEach(
                (node, index, arr) => {
                    
                    // slot css
                    //node.style.minWidth = '315px';
                    node.style.border = '4px solid blue';
                    node.style.backgroundColor = 'lightgrey';
                    
                    
                    // spacer css
                    node.children[0].style.minHeight = '555px';
                    
                    //body.articlePage #PrimeRightRailAds .spacer > div > div {
                      
                    //RightRailAdScroll.ad_slots[0].children[0].children[0]
                    
                    node.children[0].children[0].children[0].style.backgroundColor = 'yellow';
        
                }
            )
            
        }
        
        
        
        
        
        
        /*
                
        // when the window size changes, see if the header height changed
        //window.addEventListener("resize", RightRailAdScroll.windowResize);
        // we are using debouncing to prevent css updates from happening too many times
        window.addEventListener(
            "resize", 
            function(){
                //console.log('RightRailAdScroll resize');
                
                
                //RightRailAdScroll.debounceFunction(RightRailAdScroll.windowResize, 200);
            }
        );
        
        window.addEventListener(
            "orientationchange",
            function(){
                //console.log('RightRailAdScroll orientationchange');
                
                //RightRailAdScroll.debounceFunction(RightRailAdScroll.windowResize, 200);
            }
        );
        */
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
        window.addEventListener(
            "scroll", 
            function(){
                
                //console.log('RightRailAdScroll scroll');
                
                
                // GO RIGHT AT MOVING THE RIGHT RAIL INNER DIV (which contains the slots)
                
                RightRailAdScroll.scrollRightRail();
                
                
                // REMOVE THIS
                //RightRailAdScroll.debounceFunction(RightRailAdScroll.scroll, 200);
            }
        );
        
        
    }, // init
    
    
    
    
    // https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
    debounceFunction: function(func, delay){
        //console.log('RightRailAdScroll debounceFunction');
        
        // Cancels the setTimeout method execution
        clearTimeout(RightRailAdScroll.timerId);
        
        // Executes the func after delay time.
        RightRailAdScroll.timerId = setTimeout(func, delay);
    },
    
    
    
    windowResize: function(){
        //console.log('RightRailAdScroll --- windowResize ---');
        
        
    },
    
    
    
    
    
    
    scrollRightRail: function(){
        //console.log('RightRailAdScroll scrollRightRail');
        
        
        //console.log('header btm', RightRailAdScroll.header.getBoundingClientRect().bottom );
        
        
        //console.log('inner top', RightRailAdScroll.right_rail_inner_node.getBoundingClientRect().top );
        
        let header_btm = RightRailAdScroll.header.getBoundingClientRect().bottom;
        let subHeader_btm = RightRailAdScroll.subHeader_node.getBoundingClientRect().bottom;
        
        
        let right_rail_top = RightRailAdScroll.right_rail_node.getBoundingClientRect().top;
        let right_rail_btm = RightRailAdScroll.right_rail_node.getBoundingClientRect().bottom;
        
        let inner_top = RightRailAdScroll.right_rail_inner_node.getBoundingClientRect().top;
        let inner_btm = RightRailAdScroll.right_rail_inner_node.getBoundingClientRect().bottom;
        
        
        
        // SET A VALUE THAT IS THE AMOUNT OF ROOM WE NEED TO FIX THE RIGHT RAIL INNER WHILE ALLOWING HEADER/SUB HEADER TO SHOW
        let top_gap = header_btm; //default
        
        // SEE IF THE subHeader_node IS SHOWING BELOW THE HEADER
        if(subHeader_btm > header_btm){
            top_gap = subHeader_btm;
        }
        
        
        
        
        if( right_rail_top >= inner_top){
            // is the right rail top lower/greater than the inner top
            // this removes pos:fix and retuns the inner to normal flow, allowing the right rail top to control the inner top
            console.log('======= SET TO REL');
            
            
            // remove fixed
            RightRailAdScroll.right_rail_inner_node.style.position = 'relative';
            RightRailAdScroll.right_rail_inner_node.style.top = 'unset';
            
            if( RightRailAdScroll.test_mode == true){
                RightRailAdScroll.right_rail_inner_node.style.borderColor = 'orange';
            }
            
            
        }else if( (RightRailAdScroll.right_rail_inner_node.style.position != 'fixed')  &&  inner_top <= top_gap){
            // if the INNER is not currently fixed
            // AND the INNER div is within X pixels of the bottom of the HEADER/subHeader content
            

            
            console.log('------- SET TO FIX');
            
            // set the inner to fixed
            RightRailAdScroll.right_rail_inner_node.style.position = 'fixed';
            RightRailAdScroll.right_rail_inner_node.style.top = `${header_btm + 10}px`;
            
            if( RightRailAdScroll.test_mode == true){
                RightRailAdScroll.right_rail_inner_node.style.borderColor = 'yellow';
            }
            
            
        }else if( right_rail_btm <= inner_btm){
            
            // this assumes the right rail IS fixed (which might be a bad assumption??)
            
            // THIS COULD BE CHANGED TO INCLUDE A BUFFER
            // IF THE INNER GETS WITHIN 200 PIXELS, MAKE THIS CHANGE
            // INITIAL TEST (right_rail_btm - 200) I DID NOT LIKE
            
            
            
            // is the bottom of the right rail higher on the page than the inner
            // or, to put it differently
            // is the inner sticking out past the bottom of the right rail
            
            
            let new_top = inner_top - ( Math.abs(right_rail_btm - inner_btm) );
            
            //console.log('------- INNER BTM TOO FAR DOWN new_top', new_top);
            
            
            RightRailAdScroll.right_rail_inner_node.style.top = `${new_top}px`;
            
            
        }else{
            
            // NO NEED FOR A SWITCH. MAKE A ELSE/IF
            
            // do stuff related to ad slot positioning
            switch(RightRailAdScroll.right_rail_inner_node.style.position){
                case 'fixed':
                
                

                
                    // get the current height of the right rail
                    RightRailAdScroll.right_rail_height = RightRailAdScroll.right_rail_node.getBoundingClientRect().height;
                    
                    // decide which ad to look at / fix to the top of the page
                    let index = 0;
                    
                    // are we scrolled past X% of the RR height
                    if( window.scrollY > ( RightRailAdScroll.right_rail_height * 0.65 ) ){
                        
                        index = 2;
                        
                    }else if( window.scrollY > ( RightRailAdScroll.right_rail_height * 0.35 ) ){
                        
                        index = 1;
                    }
                    
                    
                    //console.log('----- MOVE ADS WITHIN INNER index', index);
                    
                    let new_top = inner_top - RightRailAdScroll.ad_slots[index].getBoundingClientRect().top + header_btm;
                    
                    
                    
                    
                    // make the change
                    RightRailAdScroll.right_rail_inner_node.style.top = `${new_top}px`;
                    
                    
                    
// THIS STILL IS NOT THE BEST
// ULTIMATELY, WE ARE CHANGING THE LAYOUT, AND THIS CONDITION/ACTION CAN RESULT IN THE INNER DIV GOING PAS THE BOTTOM OF THE RR DIV
// I WOULD PREFER SOMETHING THAT CHECKED WHAT THE CHANGE WILL LOOK LIKE BEFORE MAKING THE CHANGE
// BUT IT WAS HARD, AND THE PAGE KEEPS CHANGING ANYWAY, LIKE ADS CHANGING AND ENDLESS ARTICLES.
// SO THIS CALL THE checkLastSlotBottom() KINDA NEEDS TO EXIST ANYWAY (HE RATIONALIZED)
                    
                    // if we are on the last ad
                    if( index == (RightRailAdScroll.ad_slots.length - 1) ){
                        // moving the inner top can push the bottom ad too far down, past the RR btm
                        // recursive-ish? call to the this function to check this condition
                        //console.log('----- CHECK LAST AD POSTIION');
                        // give the page a bit of time to redraw / settle. then call checkLastSlotBottom()
                        RightRailAdScroll.debounceFunction(RightRailAdScroll.checkLastSlotBottom, 1500);
                    }
                    
                    
                    
                    break;
                default:
                    //console.log('xxxxxxx DO NOTHING');
                    break;
            }
            
            
            
            
        }
            
        //console.log('position', RightRailAdScroll.right_rail_inner_node.style.position);
            
    }, // scrollRightRail
    
    
    checkLastSlotBottom: function(){
        //console.log('----- checkLastSlotBottom');
        //console.log('----- INNER btm', RightRailAdScroll.right_rail_inner_node.getBoundingClientRect().bottom);
        //console.log('----- RR btm', RightRailAdScroll.right_rail_node.getBoundingClientRect().bottom);
        
        if(RightRailAdScroll.right_rail_inner_node.getBoundingClientRect().bottom > RightRailAdScroll.right_rail_node.getBoundingClientRect().bottom){
            // the inner is too far down. call scrollRightRail
            RightRailAdScroll.scrollRightRail();
        }
        
        
    }
    
    
}







// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof RightRailAdScroll != "undefined"  &&  typeof RightRailAdScroll.init != undefined){
        RightRailAdScroll.init();
    }else{
        //console.log('no RightRailAdScroll init');
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