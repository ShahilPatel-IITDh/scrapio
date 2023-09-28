jQuery(document).ready(function(){
  	addAriaTag();
   var listOpen=false;
 	jQuery(".listTitle").each(function(i){
        jQuery(this).click(function(){
            jQuery("#listBody"+i).toggle();
            //jQuery("#show"+i).toggle();
            if(listOpen==false){
                jQuery("#listTitle"+i).attr("aria-expanded", true);
				jQuery("#show"+i+" .more").css("display","none");
				jQuery("#show"+i+" .less").css("display","block");
                listOpen=true;
            }else{
                jQuery("#listTitle"+i).attr("aria-expanded", false); 
				jQuery("#show"+i+" .more").css("display","block");
				jQuery("#show"+i+" .less").css("display","none");				
                 listOpen=false;               
            }
        });
    });
    
    var open=false; 
    jQuery( "#slicknav" ).click(function() {
        if (!open){
            jQuery(".slicknav_nav > ul > li > a").attr("aria-expanded", true);
            jQuery(".slicknav_icon").attr("aria-hidden", false);
            jQuery(".slicknav_icon").attr("aria-expanded", true);
            open=true;    
        }else{  
            jQuery(".slicknav_nav > ul > li > a").attr("aria-expanded", false);
            jQuery(".slicknav_icon").attr("aria-hidden", true);
            jQuery(".slicknav_icon").attr("aria-expanded", false);            
            open=false;  
        }
    });
    

    var openDropdown=false;
    //focus menu with tab key
    //13:enter, 32:space bar 
    var map = {9:false, 32: false, 13: false, 40: false};


    jQuery('#sitesbutton').keydown(function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            scrollPrevent();
            e.preventDefault();

            if (map[32] || map[13]|| map[9]) {							
                if(!openDropdown){
                    jQuery('#menu2').addClass("show-block");
                    jQuery("#sitesbutton").attr("aria-expanded", true);
                    openDropdown=true;  
                    scrollPrevent();
                }else{
                    hideMenu();
                }
            }
            //38-key up 40-key down 
            if(map[40]){
                jQuery('#menu2 li:first-child a').focus();

            }
        }
    }).keyup(function(e) {     
        if (e.keyCode in map) { 
            map[e.keyCode] = false;
            scrollReset();  
        }
        return true;
    });
    

    var hideMenu=function(){
        jQuery('#menu2').removeClass("show-block");
        jQuery("#sitesbutton").attr("aria-expanded", false);
        openDropdown=false;
    }

    var scrollPrevent=function(){ 
        jQuery('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });   
    }
    var scrollReset=function(){
        jQuery('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });
    }
  
  
    //Navigation: move up and down with arrow key
    //38:up, 40:down    
    var arrows = {38: false, 40: false, 9:false};
    jQuery('.sub-menu').keydown(function(e) {
        scrollPrevent();         
        if (e.keyCode in arrows) {  
            arrows[e.keyCode] = true;
            if (arrows[40]) {
                jQuery(':focus').parent().next().children("a").focus();                
            }else if(arrows[38]){
                jQuery(':focus').parent().prev().children("a").focus(); 
            }
            if (arrows[9]&&((jQuery(':focus').parent().next().children("a").length)||(jQuery(':focus').parent().prev().children("a").length))) {            
            	jQuery("#sitesbutton").attr("aria-expanded", true);
            }
            if (arrows[9]&&(!jQuery(':focus').parent().next().children("a").length)) {
                hideMenu(); 
                scrollReset(); 
            }
            if (arrows[9]&&(!jQuery(':focus').parent().prev().children("a").length)) {
                jQuery(':focus').parent().parent().parent().focus();   
                hideMenu();
                scrollReset(); 
            }
        }
    }).keyup(function(e) {     
        if (e.keyCode in arrows) { 
            arrows[e.keyCode] = false;
        }
        scrollReset();  
    });
    
    
});
function getMenuSetting(){
    jQuery(".slicknav_nav").attr("role","navigation");  
    jQuery(".slicknav_nav > ul").attr("role","presentation");   ;
    jQuery(".slicknav_nav > ul > li > a").attr("role","button");
    jQuery(".slicknav_nav > ul > li > a").attr("aria-haspopup", "menu");  
    jQuery(".slicknav_nav > ul > li > a").attr("aria-controls", "menu_mobile");
    jQuery(".slicknav_nav > ul > li > a").attr("aria-expanded", false);     
    jQuery(".slicknav_nav > ul > li > ul").removeAttr( "aria-hidden" ); 
    jQuery(".slicknav_nav > ul > li > ul").attr("aria-labelledby", "sitesbutton_mobile");  
    jQuery(".slicknav_nav > ul > li > ul").attr("id", "menu_mobile"); 
    jQuery(".slicknav_nav > ul > li > ul > li").attr("role", "none");       
}
function addAriaTag(){   
    jQuery(".menu-primary-nav-container").attr("role", "navigation");
    jQuery(".menu-primary-nav-container").attr("aria-label", "navy federal sites");
  
  	jQuery("#menu-primary-nav").attr("role", "presentation");
  	jQuery("#menu-primary-nav a").attr("role","button");
  	//jQuery("#menu-primary-nav a").attr("href","#");
  	jQuery("#menu-primary-nav a").attr("tabindex","0");   
    jQuery("#menu-primary-nav a").attr("id","sitesbutton");
 	jQuery("#menu-primary-nav>li>a").attr("aria-expanded","false");

  	jQuery("#menu-primary-nav .sub-menu").attr("role","menu");   
  	jQuery("#menu-primary-nav .sub-menu").attr("area-labelledby","sitesbutton"); 
  	jQuery("#menu-primary-nav .sub-menu").attr("id","menu2"); 
  	jQuery("#menu-primary-nav .sub-menu li").attr("role","none"); 
  	jQuery("#menu-primary-nav .sub-menu li a").attr("role","menuitem");
          
   jQuery(".slides").attr("role","presentation"); 
   jQuery("#main").removeAttr( "role" );
   jQuery("#main").attr("role","presentation");
    
   jQuery(".showMore").attr("aria-expanded","false");
   jQuery(".showLess").attr("aria-expanded","true");    
}

function isBlur(){   
        jQuery('#menu2').removeClass("show-block");
        jQuery("#sitesbutton").attr("aria-expanded", false);
}

var existCondition = setInterval(function() {
    getMenuSetting(); 
    if (jQuery('#slicknav .slicknav_menutxt').length) {
  	jQuery("#slicknav .slicknav_icon-bar").attr("aria-hidden","true");      
    jQuery(".sf-with-ul").append('<img src="../wp-content/uploads/sites/15/2018/03/triangle.png" class="triangle" area-hidden="true" alt="">'); 
    clearInterval(existCondition);
  	jQuery(".sf-with-ul").attr("aria-haspopup","menu");
   jQuery(".sf-with-ul").attr("aria-controls","menu2");  
 }
}, 100); // check every 100ms// JavaScript Document