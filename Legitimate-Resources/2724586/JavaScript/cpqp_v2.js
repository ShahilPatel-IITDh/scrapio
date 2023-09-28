window.onload = function(){
  var updateHrefValue = function(queryParms, expectedUrls) {
    var qpKeys = Object.keys(queryParms);
    var arr = [], l = document.links;
    for(var i=0; i<l.length; i++) {
      if(l[i].href){
        var valid_url = 0;
        for (var j=0; j<expectedUrls.length; j++) {
          if((l[i].href).includes(expectedUrls[j])) {
            valid_url = 1;
          }
        }

        if(valid_url == 1) {  
          if(l[i].href.includes("#")){
            var page_hashpath = l[i].href.split('#')[1]; 
            l[i].href = l[i].href.split('#')[0];
          }

          let urlParams = new URL(l[i].href).searchParams;
          console.log(urlParams);
          if(qpKeys.length > 0) {
            for(var qp=0; qp<qpKeys.length; qp++){          
              let qpVal = urlParams.get(qpKeys[qp]);
            
              if(qpVal) {
                if(queryParms[qpKeys[qp]] !== qpVal) {
                  urlParams.set(qpKeys[qp], queryParms[qpKeys[qp]]);
                }
              } else {
                  if(l[i].href.indexOf("?") == -1){
                    l[i].href += '?';
                  } else {
                    l[i].href += '&';
                  }
                  l[i].href += qpKeys[qp]+'='+queryParms[qpKeys[qp]];
              }
            }
          }

          if(page_hashpath) {
            l[i].href += '#'+page_hashpath;
          }
        }
      }
    }
  }

  if((typeof queryParms !== 'undefined') && (typeof expectedUrls !== 'undefined')) {
    if((Object.keys(queryParms).length > 0)&&(expectedUrls.length>0)) {
      var updated = updateHrefValue(queryParms, expectedUrls);
    }
  }
};