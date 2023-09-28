

var MainMenuJs = {
    
    
    init: function(){
        console.log('MainMenuJs.init');
        
        MainMenuJs.menu_node = document.getElementById("mainMenu");
        
        
        
        MainMenuJs.initToggle();
        
        MainMenuJs.initLinkReveal();
        
    },
    
    initToggle: function(){
        
        MainMenuJs.menuIcon = document.getElementById("menuIcon");
        
        MainMenuJs.menuIcon_i = MainMenuJs.menuIcon.querySelector("i");
        
        
        
        if( MainMenuJs.menu_node == null){
            console.log('No MainMenuJs.menu_node');
        }else{
            MainMenuJs.menuIcon.onclick = function() {
                console.log('menuIcon click');
                
                
                /*
                if ( MainMenuJs.menuIcon_i.classList.contains('fa-bars') ){
                    MainMenuJs.menuIcon_i.classList.remove('fa-bars');
                    MainMenuJs.menuIcon_i.classList.add('fa-times-circle');
                }else{
                    MainMenuJs.menuIcon_i.classList.remove('fa-times-circle');
                    MainMenuJs.menuIcon_i.classList.add('fa-bars');
                }*/
                
                
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
                // https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
                
                if ( MainMenuJs.menu_node.classList.contains('show') ){
                    //MainMenuJs.menu_node.classList.remove('show');
                    MainMenuJs.close();
                }else{
                    //MainMenuJs.menu_node.classList.add('show');
                    MainMenuJs.open();
                }
                
            }
        }
        
    }, // initToggle
    
    
    open: function(){
        console.log('MainMenuJs open');
        
        MainMenuJs.menu_node.classList.add('show');
        
        MainMenuJs.menuIcon_i.classList.remove('fa-bars');
        MainMenuJs.menuIcon_i.classList.add('fa-times-circle');
    },
    
    close: function(){
        console.log('MainMenuJs close');
        
        MainMenuJs.menu_node.classList.remove('show');
        
        MainMenuJs.menuIcon_i.classList.remove('fa-times-circle');
        MainMenuJs.menuIcon_i.classList.add('fa-bars');
        
    }, // close
    
    initLinkReveal: function(){
        
        MainMenuJs.link_reveals = MainMenuJs.menu_node.querySelectorAll("ul li i");
        
        MainMenuJs.link_reveals.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                //console.log('click reveal');
                MainMenuJs.toggleCategory(evt.currentTarget);
            });
            
        });
        
    }, // initLinkReveal
    
    toggleCategory: function(node){
        console.log('click reveal', node);
        
        
        //let current = document.querySelector('.current');
        //let nextSibling = node.nextElementSibling;
        //console.log('nextSibling', nextSibling);
        
        //MainMenuJs.menuIcon.querySelector("i");
        
        
        
        let sub_cat_display = 'block';
        
        if ( node.classList.contains('fa-caret-right') ){
            node.classList.remove('fa-caret-right');
            node.classList.add('fa-caret-down');
        }else{
            node.classList.remove('fa-caret-down');
            node.classList.add('fa-caret-right');
            sub_cat_display = 'none';
        }
        
        
        node.parentElement.querySelector('ul').style.display = sub_cat_display;
        
        
    } // toggleCategory
    
}









// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof MainMenuJs != "undefined"  &&  typeof MainMenuJs.init != undefined){
        MainMenuJs.init();
    }else{
        console.log('no MainMenuJs init');
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
