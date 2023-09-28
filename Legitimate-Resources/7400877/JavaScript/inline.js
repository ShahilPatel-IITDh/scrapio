		
var url = window.location.search.substring(1).split("&"); 
var gets = {};
for(var i=0; i<url.length; i++) { 
var getVar = url[i].split("="); 
gets[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
} 
var params = [];
for(var key in gets) { 
var value = gets[key]; 
if (key == 'utm_source') params.push('?utm_source='+value);
if (key == 'utm_medium') params.push('&utm_medium='+value);
if (key == 'utm_campaign') params.push('&utm_campaign='+value);
};
var paramsStr = '';
if (params.length > 0) paramsStr = params.join('');
// parse links
var elems = document.getElementsByTagName('a');
for(var i=0; i<elems.length; i++) {
elems[i].setAttribute('href', elems[i].getAttribute('href')+paramsStr);
/*
$(".redir1").on("click", function(){
location.href='https://clidend-evarbor.icu/click';
});
*/
}
