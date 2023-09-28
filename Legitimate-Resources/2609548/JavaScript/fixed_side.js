
$(function(){
   var windowHeight
   ,topValue
   ,scrollTop
   ,asidNavTopValue = $(".pagebox").children().eq(1).offset().top
   ,bottomNavHeight = $(".pagebox").children().eq(1).height()
   ,asidNavHeight
   ,asidNav = $(".pagebox").children().eq(1);//.eq(0)
 	 console.log(asidNav.height());
  $(window).on("scroll",function(){
  	 windowHeight  = $("body").height();
    asidNavHeight =  $(".type01").height();
    scrollTop =  $(window).scrollTop();
    topValue = windowHeight - bottomNavHeight - asidNavHeight;
    if(scrollTop >= asidNavTopValue+5 && scrollTop < topValue-185){
      //asidNav.css({"position":"fixed","top":"0px","left":"0%"});//,"background":"rgba(255,255,255,1)"
      asidNav.addClass("backs");
    }else if(scrollTop >= topValue -185){
      //asidNav.css({"position":"fixed","top":topValue,"left":"auto"});//,"background":"rgba(255,255,255,0)"
    }else{
       //asidNav.css({"top":asidNavTopValue,"background":"rgba(255,255,255,0)"});
      asidNav.removeClass("backs");
      //"position":"absolute",
    }
  });
});
/*
*/










/*$(function(){
   var windowHeight
   ,topValue
   ,scrollTop
   ,asidNavTopValue = $(".fixed_side").offset().top
   ,bottomNavHeight = $(".fixed_side").height()
   ,asidNavHeight
   ,asidNav = $(".fixed_side");
 	 console.log(asidNav.height());
  $(window).on("scroll",function(){
  	 windowHeight  = $("body").height();
    asidNavHeight =  $(".type01").height();
    scrollTop =  $(window).scrollTop();
    topValue = windowHeight - bottomNavHeight - asidNavHeight;
    if(scrollTop >= asidNavTopValue-85 && scrollTop < topValue-85){
      asidNav.css({"position":"fixed","top":"85px","left":"auto"});
    }else if(scrollTop >= topValue -85){
      asidNav.css({"position":"fixed","top":topValue,"left":"auto"});
    }else{
       asidNav.css({"position":"absolute","top":asidNavTopValue,"left":"auto"});
    }
  });
});*/


/*
$(function(){
   var windowHeight
   ,topValue
   ,scrollTop
   ,asidNavTopValue = $(".c_product_category-02001").offset().top
   ,bottomNavHeight = $("#w_bbox-1517567533848").height()
   ,asidNavHeight
   ,asidNav = $(".c_product_category-02001");
 	 console.log(asidNav.height());
  $(window).on("scroll",function(){
  	 windowHeight  = $("body").height();
    asidNavHeight =  $(".c_product_category-02001").height();
    scrollTop =  $(window).scrollTop();
    topValue = windowHeight - bottomNavHeight - asidNavHeight;
    if(scrollTop >= asidNavTopValue-20 && scrollTop < topValue-20){
      asidNav.css({"position":"fixed","top":"20px","left":"auto"});
    }else if(scrollTop >= topValue -20){
      asidNav.css({"position":"absolute","top":topValue,"left":"auto"});
    }else{
       asidNav.css({"position":"absolute","top":asidNavTopValue,"left":"auto"});
    }
  });
});
*/


