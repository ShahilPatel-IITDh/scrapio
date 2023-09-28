 function loadTdDefererJs(i){
      var s = document.createElement("script");
      s.setAttribute("type", "text/javascript");
      if(i >= window.defererList.length){
        return false;
      }

      if(typeof(window.defererList[i].src) != "undefined" && window.defererList[i].src != ""){
        //console.log("Add SRC =>",window.defererList[i].src);
        s.onload = function() {
          i++;
          loadTdDefererJs(i);
        };
        s.onerror = function() {
          i++;
          loadTdDefererJs(i);
        };
        s.src = defererList[i].src;
        document.getElementsByTagName("head")[0].appendChild(s);
      }else{
        //console.log("Add TEXT =>",window.defererList[i].innerText);
        s.innerHTML = window.defererList[i].innerHTML;
        try {
          document.getElementsByTagName("head")[0].appendChild(s);
        }catch(error) {
          console.error(error);
        }
        i++;
        loadTdDefererJs(i);
      }
    }


    var defererList = document.getElementById("tddefererjs");
    var replacement = document.createElement("div");
    replacement.setAttribute("id", "tddefererdiv");
    replacement.style.display = "none";
    replacement.innerHTML = defererList.textContent;
    document.body.appendChild(replacement);
    window.defererList = document.getElementById("tddeferernodes").querySelectorAll("script");

    var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf){
      raf(function() {
        var time = 0;
        window.setTimeout( function(){ loadTdDefererJs(0) }, time);
      });
    }else{
      var time = 0;
      window.addEventListener("load", function(){loadTdDefererJs(0)} );
    }