
//<![CDATA[

window.orig_onload = window.onload;
window.onload = function() {
var cpost=document.location.hash.substring(1);var cpost2='';if(cpost && (typeof fetch_object != 'undefined')){ var ispost=cpost.substring(0,4)=='post';if(ispost)cpost2='post_'+cpost.substring(4);if((cobj = fetch_object(cpost))||(cobj = fetch_object(cpost2))){cobj.scrollIntoView(true);}else if(ispost){cpostno = cpost.substring(4,cpost.length);if(parseInt(cpostno)>0){location.replace('http://www.5jle.com/vb/showthread.php?p='+cpostno);};} }

if(typeof window.orig_onload == "function") window.orig_onload();
}

//]]>
