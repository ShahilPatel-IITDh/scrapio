
		
        function showOverlay()
        {
        	$("#overlay").empty();
        	$.ajax({
        		url : '/us/overlay',
        		type : 'POST',
        		dataType : 'html',
        		success : function(html) {
        			$("#overlay").html(html);
        			$("#overlay").show();
        			$("body").css('overflow', 'hidden');
        		}
        	});
        }

                    $( document ).ready(function() {
            	showOverlay();
            });
        
        function addVisitor()
        {
        	$.post( "/us/add-visitor" );
        }

        $( document ).ready(function() {
        	addVisitor();
        });
    