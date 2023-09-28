window.onload=function(){var b=function(c,g){var e=c;var h=g;var f=document.getElementsByClassName("deviceId");length=f.length;for(var d=0;d<length;d++){if(e){if(f[d].href.indexOf("?")==-1){f[d].href+="?"}else{f[d].href+="&"}f[d].href+="aimdata="+e}if(h){if(f[d].href.indexOf("?")==-1){f[d].href+="?"}else{f[d].href+="&"}f[d].href+="aimversion="+h}}};if(typeof dversion!=="undefined"||typeof devValue!=="undefined"){var a=b(devValue,dversion)}};
(function () {
/* Grab Dom links*/
var mainContentDiv = document.getElementById('outer-wrapper');
if(typeof(mainContentDiv)=='object'){
  var pageLinks = mainContentDiv.getElementsByTagName('a');
}
 
/* Calls the verifying function and updates DOM. */
var getVal = function(key){
 var mappingKeys = Object.keys(redirectToolMappingsArr);
 if((mappingKeys) && (mappingKeys instanceof Array)){ 
  for(var mapKey in mappingKeys){
   if(mappingKeys[mapKey] == key){
    return redirectToolMappingsArr[mappingKeys[mapKey]];
   }
  }  
 }
}
 
if((typeof(redirectToolMappingsArr)=='object') && (Object.keys(redirectToolMappingsArr).length>0)){
 if((pageLinks)&&(typeof(pageLinks)=='object')){
   for(var policyLink in pageLinks) {
   var returnedLink = getVal(pageLinks[policyLink].href);
    if(returnedLink){
     var updatedVal = returnedLink;
     pageLinks[policyLink].href = returnedLink;
    }
   }
 }
}
})();