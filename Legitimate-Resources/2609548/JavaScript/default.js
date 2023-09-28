(function(){
$(".k_fix_url").each(function(i,e){
 var ksrc = $(e).attr("src");
 if(ksrc.indexOf("/")!==0){
  $(e).attr("src","/"+ksrc);
 }
});
})();
(function(){
 $(".p_breadcrumbCurrent>.font>span").each(function(){
  var text=$(this).text();
   if(text.length>10){
     text = text.substr(0,10);
     console.log(text);
     $(this).text(text+"...");
   }
 });
})();
(function(){
 $(".k_sm_c_btn").on("click",function(e){
  e.preventDefault();
  e.stopPropagation();
  $(this).parent(".k_sm_cate_menu_btn").next(".k_sm_cate_menu").find(".k_sm_cate_content").toggleClass("k_active");
 });
})();

(function(){
 new WOW().init();
 $('a[href-data="top"]').on('click',function(){
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
 });
})();

