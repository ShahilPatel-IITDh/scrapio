

/*
  
  we have three delays in js that can be adjusted   
    
    debounce_delay: calls to debounceFunction() pass a delay which prevents scroll events from flooding the call to getMore()
    
    in_progress_delay: getMore() has a setTimeout delay before unsetting the call_in_progress flag
    
    if you want to tweak, try the getMore() delay
    
    
    ajax_sleep: ajax_process.php also has a delay designed to allow the animated gif to show so people see things are changing
    
*/

var CategoryArticleEndlessList = {
    
    parent_node: null,
    timerId: null,
    lastScrollTop: 0,
    
    debounce_delay: 50, // very short (milliseconds)
    in_progress_delay: 500, // (milliseconds)
    
    //ajax_sleep: 0.8, // seconds 
    ajax_sleep: 0, // turned off once we changed when this loads. Idealyy we are never seeing it happen
    
    reset_counter: 1, // when we come to the article page the first time, we want to reset any sesssion data counter
    
    
    num_added: 0,
    limit: 72, // pass this to the server to limit how many articles we will ever return in total
    current_total: 0,
    
    
    cat_id: 0,
    
    call_in_progress: false,
    call_again: true,
    
    
    init: function(){
        //console.log('CategoryArticleEndlessList.init');
        
        CategoryArticleEndlessList.parent_node = document.getElementById('CategoryArticleEndlessList');
        
        
        // are we on the article page with a dynamic content section
        if(typeof CategoryArticleEndlessList.parent_node != null  &&  CategoryArticleEndlessList.parent_node != undefined){
            
            // see if we have a cat id
            CategoryArticleEndlessList.cat_id = CategoryArticleEndlessList.parent_node.dataset.catid;
            if(CategoryArticleEndlessList.cat_id > 0){
                // we have a cat id, so we will continue
                CategoryArticleEndlessList.initList();
            }
            
        }
        
    }, // init
    
    
    initList: function(){
        //console.log('CategoryArticleEndlessList initList');
        
        
        
        
        window.addEventListener(
            'scroll', 
            CategoryArticleEndlessList.scroll
        );
        
        
    }, // initList
    
    
    scroll: function(){
        //console.log('CategoryArticleEndlessList.scroll called');
        
        if(CategoryArticleEndlessList.call_again != true){
            // dont make any more calls. there are no more articles to get
            // remove the listener
            
            window.removeEventListener('scroll', CategoryArticleEndlessList.scroll);
            
            return;
        }
        
        
        
        // what direction is the user scrolling
        if( window.pageYOffset < CategoryArticleEndlessList.lastScrollTop){
            // i think we want this
            CategoryArticleEndlessList.lastScrollTop = window.pageYOffset;
            // user is scrolling up, dont add anything
            return;
        }
        
        // get the DIV bottom
        let relativeBottom = CategoryArticleEndlessList.parent_node.getBoundingClientRect().bottom;
        
        // if the div bottom is off the page???
        if (relativeBottom > document.documentElement.clientHeight * 3) {
            return;
        }
        
        
        
        
        
        // save the current scroll position
        CategoryArticleEndlessList.lastScrollTop = window.pageYOffset;
        
        // call to debounce / get more
        CategoryArticleEndlessList.debounceFunction(CategoryArticleEndlessList.getMore, CategoryArticleEndlessList.debounce_delay);
    

        
        
    }, // scroll
    
    
    // https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
    debounceFunction: function(func, delay){
        //console.log('CategoryArticleEndlessList debounceFunction');
        
        // this method gets called a lot / like crazy
        // setTimeout() is called each time, but the previous call timerId get canceled first
        // this basically means, we wont run getMore() until you stop scrolling continously
        
        
        // Cancels the setTimeout method execution
        clearTimeout(CategoryArticleEndlessList.timerId);
        
        // Executes the func after delay time.
        CategoryArticleEndlessList.timerId = setTimeout(func, delay);
    },
    
    
    getMore: function(){
        //console.log('CategoryArticleEndlessList scroll getMore');
        
        
        
        if(CategoryArticleEndlessList.call_again != true){
            // dont make any more calls. there are no more articles to get
            // this is a precaution. we also remove the event listener, so should not get here anyway
            return;
        }
        
        
        // check a var to see if we are currently trying to get more
        if(CategoryArticleEndlessList.call_in_progress == true){
            //console.log('CategoryArticleEndlessList already called getMore');
            // if we are, stop this call
            return;
        }
        
        
        
        CategoryArticleEndlessList.call_in_progress = true;
        
        
        //CategoryArticleEndlessList.parent_node.insertAdjacentHTML("beforeend", `<img src="/images/ajax-loader-dna.gif" alt="loading...">`);
        CategoryArticleEndlessList.parent_node.insertAdjacentHTML("beforeend", `<div class="loading">loading...</div>`);
        
        
        
        
        // make ajax call to get more
        
        const XHR = new XMLHttpRequest();
        
        const FD = new FormData();
        
        
        FD.append('task', 'get_cat_article_endless_content');
        FD.append('catID', CategoryArticleEndlessList.cat_id);
        FD.append('ajax_sleep', CategoryArticleEndlessList.ajax_sleep);
        
        FD.append('reset_counter', CategoryArticleEndlessList.reset_counter);
        
        FD.append('limit', CategoryArticleEndlessList.limit);
        
        // we just passed the reset_counter. we dont want additional calls to reset the counter
        CategoryArticleEndlessList.reset_counter = 0;
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('CategoryArticleEndlessList event.target.responseText', event.target.responseText);
            
            
            // unset so we can make another call
            //CategoryArticleEndlessList.call_in_progress = false;
            setTimeout("CategoryArticleEndlessList.call_in_progress = false;", CategoryArticleEndlessList.in_progress_delay );
            
            
            
            
            let node = CategoryArticleEndlessList.parent_node.querySelector('div.loading');
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }

            
            
            var response = JSON.parse( event.target.responseText);
            //console.log('response', response);
            
            CategoryArticleEndlessList.current_total = response.current_total;
            
            CategoryArticleEndlessList.parent_node.insertAdjacentHTML("beforeend", response.html);
            
            
            if(response.html == null  ||  response.html == ''){
                // if we did not return anything this time, dont try anymore
                CategoryArticleEndlessList.call_again = false;
            }
            
            
            
        });
        
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", '/ajax_process.php');
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
        
        
        
        
    }
    
    
}




// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.init)
) {
    //console.log('CategoryArticleEndlessList DOM loaded 2');
    CategoryArticleEndlessList.init();
} else {
    //console.log('CategoryArticleEndlessList DOM loaded 1');
    document.addEventListener("DOMContentLoaded", CategoryArticleEndlessList.init);
}