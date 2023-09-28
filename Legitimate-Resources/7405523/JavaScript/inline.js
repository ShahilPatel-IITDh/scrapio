

    if (/data=/.test(window.location.href)) {
       var url_string = window.location.href; 
        var url = new URL(url_string);
        var d = url.searchParams.get("data");
       $sfr('.customdata').text(d + 'Go');
       _stats_pagename="Web/Red/Boutique/Info Clients/Evolution Data "+ d + "Go";
    }

    else {
          _stats_pagename="Web/Red/Boutique/Info Clients/Evolution Data ";	
    };
  
     if (/line=/.test(window.location.href)) {
       var url_string = window.location.href; 
        var url = new URL(url_string);
        var c = url.searchParams.get("line");
        var formatedNum = c.toString().match(/.{2}/g).join(' ');
       $sfr('.line').text('POUR VOTRE LIGNE ' + formatedNum)
    }
    
    
