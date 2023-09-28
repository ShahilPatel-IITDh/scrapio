





var HeaderSearchJs = {
    
    search_field_id: 'search_term',
    
    init: function(){
        console.log('HeaderSearchJs.init xxx');
        
        HeaderSearchJs.main_node = document.getElementById("headerSearchFormDiv");
        HeaderSearchJs.form = document.getElementById("headerSearchForm");
        
        
        //HeaderSearchJs.adv_search_node = window.advancedSearchDiv;
        
        
        
        HeaderSearchJs.initToggle();
        
        HeaderSearchJs.initAutoComplete();
        
        
    }, // init
    
    
    initToggle: function(){
        
        HeaderSearchJs.searchIcon = document.getElementById("searchIcon");
        
        // might be null
        HeaderSearchJs.advSearchLink = document.querySelector(`#headerSearchFormDiv .advancedSearchLink`);
        
        
        
        if( HeaderSearchJs.main_node == null){
            console.log('No HeaderSearchJs.main_node');
        }else{
            
            HeaderSearchJs.searchIcon.onclick = function() {
                console.log('searchIcon click');
                
                let font = 'cancel';
                let display = 'block';
                if(HeaderSearchJs.form.style.display == 'block'){
                    font = 'search';
                    display = 'none';
                }
                
                HeaderSearchJs.form.style.display = display;
                
                HeaderSearchJs.searchIcon.textContent = font;
                
                // the minus 2 is a tweak based on the form border
                if( HeaderSearchJs.advSearchLink != null){
                    HeaderSearchJs.advSearchLink.style.top = `${HeaderSearchJs.form.offsetHeight - 2}px`;
                }
                
            }
            
            if( HeaderSearchJs.advSearchLink != null){
                HeaderSearchJs.advSearchLink.addEventListener(
                    'click', 
                    function(evt){
                        //console.log('evt.currentTarget', evt.currentTarget);
                        evt.preventDefault();
                        
                        // close the base search
                        HeaderSearchJs.searchIcon.dispatchEvent( new Event('click') );
                        HeaderSearchJs.displayAdvancedSearch();
                        
                    }
                );
            }
            
            
        }
        
    }, // initToggle
    
    
    
    initAutoComplete: function(){
        
        
        
        new autoComplete({
            data: {                              // Data src [Array, Function, Async] | (REQUIRED)
              src: async () => {
                // API key token
                const token = "this_is_the_API_token_number";
                // User search query
                const query = document.querySelector(`#${HeaderSearchJs.search_field_id}`).value;
                // Fetch External Data Source
                const source = await fetch(`/ajax_process.php?task=search_autofill&term=${query}`);
                
                
                
                // Format data into JSON
                const data = await source.json();
                // Return Fetched data
                return data.recipes;
              },
              key: ["title"],
              cache: false
            },
            query: {                               // Query Interceptor               | (Optional)
                  manipulate: (query) => {
                    return query.replace("pizza", "burger");
                  }
            },
            sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
                if (a.match < b.match) return -1;
                if (a.match > b.match) return 1;
                return 0;
            },
            placeHolder: "Enter Search...",     // Place Holder text                 | (Optional)
            selector: `#${HeaderSearchJs.search_field_id}`,           // Input field selector              | (Optional)
            threshold: 3,                        // Min. Chars length to start Engine | (Optional)
            debounce: 300,                       // Post duration for engine to start | (Optional)
            searchEngine: "strict",              // Search Engine type/mode           | (Optional)
            resultsList: {                       // Rendered results list object      | (Optional)
                render: true,
                /* if set to false, add an eventListener to the selector for event type
                   "autoComplete" to handle the result */
                container: source => {
                    source.setAttribute("id", "search_autocomplete_list");
                },
                destination: document.querySelector(`#${HeaderSearchJs.search_field_id}`),
                position: "afterend",
                element: "ul"
            },
            maxResults: 5,                         // Max. number of rendered results | (Optional)
            highlight: true,                       // Highlight matching results      | (Optional)
            resultItem: {                          // Rendered result item            | (Optional)
                content: (data, source) => {
                    source.innerHTML = data.match;
                },
                element: "li"
            },
            noResults: () => {                     // Action script on noResults      | (Optional)
                const result = document.createElement("li");
                result.setAttribute("class", "no_result");
                result.setAttribute("tabindex", "1");
                result.innerHTML = "No Results";
                document.querySelector("#search_term_list").appendChild(result);
            },
            onSelection: feedback => {             // Action script onSelection event | (Optional)
                console.log(feedback.selection.value.image_url);
            }
        });
        


        
    }, // initAutoComplete
    
    
    displayAdvancedSearch: function(){
        //console.log('displayAdvancedSearch');
        
        if(window.advancedSearchDiv == undefined){
            HeaderSearchJs.loadAdvancedSearch();
        }else{
            //console.log('LOADED displayAdvancedSearch');
            window.advancedSearchWrapper.style.display = 'block';
        }
        
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
        
    }, // displayAdvancedSearch
    
    
    loadAdvancedSearch: function(){
        //console.log('loadAdvancedSearch');
        
        // littel feedback while we load
        document.body.style.opacity = 0.3;
        
        
        fetch('/ajax_process.php?task=get_advanced_search_form')
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                //console.log(data);
                
                document.body.style.opacity = 1.0;
                
                // add raw html to BODY
                document.body.insertAdjacentHTML( 'beforeend', data );
                
                
                
                // apply js to the form
                
                let nodes = window.advancedSearchDiv.querySelectorAll(`.close`);
                nodes.forEach(
                    (node, index) => {
                        
                        node.addEventListener(
                            'click', 
                            function(evt){
                                console.log('evt.currentTarget', evt.currentTarget);
                                evt.preventDefault();
                                
                                window.advancedSearchWrapper.style.display = 'none';
                            }
                        );
                    }
                );
                
                
                
                // get elements that have a checkbox UI
                nodes = window.advancedSearchDiv.querySelectorAll(".searchSectionContent ul li, .searchSectionContent .image_search");
                nodes.forEach(
                    (node, index) => {
                        
                        //node.setAttribute('class', `index${index}`);
                        
                        node.addEventListener(
                            'click', 
                            function(evt){
                                console.log('evt.currentTarget', evt.currentTarget);
                                evt.preventDefault();
                                
                                let li_node = evt.currentTarget;
                                let box = li_node.querySelector(`input`);
                                
                                if(li_node.classList.contains('checked')){
                                    li_node.classList.remove('checked');
                                    box.checked = false;
                                }else{
                                    li_node.classList.add('checked');
                                    box.checked = true;
                                }
                                
                            }
                        );
                    }
                );
                
                
            })
            .catch(
                function(error) {
                    // If there is any error you will catch them here
                    console.log('exception', error);
                }
            );
    
    }
}










// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof HeaderSearchJs != "undefined"  &&  typeof HeaderSearchJs.init != undefined){
        HeaderSearchJs.init();
    }else{
        console.log('no HeaderSearchJs init');
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
