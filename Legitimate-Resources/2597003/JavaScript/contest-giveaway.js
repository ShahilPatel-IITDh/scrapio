var ContestGiveawayJs = {
    
    
    
    init: function(){
        console.log('ContestGiveawayJs.init');
        
        
        let nodes;
        
        nodes = document.querySelectorAll('.contestRulesLink');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        console.log('click', evt);
                        
                        evt.preventDefault();
                        
                        //var popup_node = $("#contentRulesDiv");
						
						window.contentRulesDiv.style.position = 'absolute';
						window.contentRulesDiv.style.top = '0px';
						window.contentRulesDiv.style.right = '0px';
						window.contentRulesDiv.style.bottom = '0px';
						window.contentRulesDiv.style.left = '0px';
						
						window.contentRulesDiv.style.display = 'block';
						window.contentRulesDiv.style.position = 'absolute';
						window.contentRulesDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
						window.contentRulesDiv.style.zIndex = 99999;
						
						//window.scrollTo(0, 0);
						
						window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        
                    }, 
                    false
                );
            }
        );
        
        

        
        
    } // init
    
    
    
}


// redefining from CG - some very old links have this set / called from their inline onclick handlers
function closePopupScrollable(id) {
    console.log('closePopupScrollable', id);
    
    switch(id){
		case 'contentRulesDiv':
		    window.contentRulesDiv.style.display = 'none';
		    
			break;
	}
    
    
    return false;
}












// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof ContestGiveawayJs != "undefined"  &&  typeof ContestGiveawayJs.init != undefined){
        ContestGiveawayJs.init();
    }else{
        //console.log('no ContestGiveawayJs init');
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
