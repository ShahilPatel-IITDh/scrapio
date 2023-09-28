/* Java for Drop-Down Menu */

function Drop_Menu(){ 
 if(navigator.appVersion.indexOf("MSIE")==-1){return;}
 var i,k,g,lg,r=/\s*d6hvr/,nn='',c,cs='d6hvr',bv='d6menubar';
 for(i=0;i<10;i++){g=document.getElementById(bv+nn);if(g){
 lg=g.getElementsByTagName("LI");if(lg){for(k=0;k<lg.length;k++){
 lg[k].onmouseover=function(){c=this.className;cl=(c)?c+' '+cs:cs;
 this.className=cl;};lg[k].onmouseout=function(){c=this.className;
 this.className=(c)?c.replace(r,''):'';};}}}nn=i+1;}
}

function Drop_Menu5(){ 
 if(navigator.appVersion.indexOf("MSIE")==-1){return;}
 var i,k,g,lg,r=/\s*d5hvr/,nn='',c,cs='d5hvr',bv='d5menubar';
 for(i=0;i<10;i++){g=document.getElementById(bv+nn);if(g){
 lg=g.getElementsByTagName("LI");if(lg){for(k=0;k<lg.length;k++){
 lg[k].onmouseover=function(){c=this.className;cl=(c)?c+' '+cs:cs;
 this.className=cl;};lg[k].onmouseout=function(){c=this.className;
 this.className=(c)?c.replace(r,''):'';};}}}nn=i+1;}
}

function Drop_Menu4(){ 
 if(navigator.appVersion.indexOf("MSIE")==-1){return;}
 var i,k,g,lg,r=/\s*d4hvr/,nn='',c,cs='d4hvr',bv='d4menubar';
 for(i=0;i<10;i++){g=document.getElementById(bv+nn);if(g){
 lg=g.getElementsByTagName("LI");if(lg){for(k=0;k<lg.length;k++){
 lg[k].onmouseover=function(){c=this.className;cl=(c)?c+' '+cs:cs;
 this.className=cl;};lg[k].onmouseout=function(){c=this.className;
 this.className=(c)?c.replace(r,''):'';};}}}nn=i+1;}
}
