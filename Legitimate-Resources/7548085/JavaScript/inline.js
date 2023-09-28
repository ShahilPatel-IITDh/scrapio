
        $('form').find("input[type=text], input[type=password], textarea").each(function (ev) {
            
            //$(this).addClass("inputEmpty");
            
            $('#UID').blur(function()
                {
                    if( !$(this).val() ) {
                          $(this).removeClass("notEmpty");
                    }else {
                          $(this).addClass("notEmpty");
                          $(this).removeClass("red");
                    }
                });
            $('#PIN').blur(function()
                {
                    if( !$(this).val() ) {
                          $(this).removeClass("notEmpty");
                    }else {
                          $(this).addClass("notEmpty");
                          $(this).removeClass("red");
                    }
                });
            
        });
        
        
        var route_name = 'IBROUTEID';
        document.cookie = route_name+"="+"; path=/IB";
        

		//Fix CDSS-1479 start - loading iframe
	    $( window ).load(function() {document.getElementById('iframe1').src += '';});
	    //Fix CDSS-1479 end
    