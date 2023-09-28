<!--
function layerHide(layerId)
{
 document.getElementById(layerId).style.visibility = "hidden";
}

function layerShow(layerId)
{
 document.getElementById(layerId).style.visibility = "visible";
}

function getCookie(name){ 
    var nameOfCookie = name + "="; 
    var x = 0; 
    while(x<= document.cookie.length){ 
        var y = (x+nameOfCookie.length); 
        if(document.cookie.substring( x, y ) == nameOfCookie){ 
            if((endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length; 
            return unescape( document.cookie.substring( y, endOfCookie)); 
        } 
        x = document.cookie.indexOf( " ", x ) + 1; 
        if(x==0)break; 
    } 
    return ""; 
}

function showPopup() 
{ 
 var eventCookie=getCookie("mydomainPopCookie");  // 사이트에 따라 변경될 부분(사이트명 팝업설정 쿠키변수)
 
 if (eventCookie != "no"){
  layerShow('layer01');
 }else{
  layerHide('layer01');
 }
} 
showPopup();
//-->
