
    window.onscroll = function(){
   var top = window.pageYOffset || document.documentElement.scrollTop
   if( top > 150 ) {
       
       document.getElementById("trocar").innerHTML = ''
       
   }
   if( top < 30 ){
       
       document.getElementById("trocar").innerHTML = ''
   }
}
