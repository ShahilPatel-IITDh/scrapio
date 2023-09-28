P.when("jQuery").execute(function($) {
		var bbop = $("#bbop");
		
		// BBOP Pop-over
		P.when('A', 'a-popover', 'ready').execute(function(A, popover) {
			var bbop = $("#bbop"),
			popoverContent = bbop.find("#primePopoverContent");

			popover.create(bbop.find("a.prime-details"), {
				hoverHideDelay: 200,
				hoverShowDelay: 200,
				inlineContent: popoverContent.html(),
				activate: "onmouseover",
				position: "triggerLeft",
				showCloseButton: true,
				header: "&nbsp;",
				width: 460,
				onHide: function() {
					try {
					    P.when('ClientEventLogger').execute("ClientEventLogger", function($) {
							ClientEventLogger.logActionCode("ac1");
						});
					} catch (e) {}
				}
			});
		});

        //WLP Injectable
        P.when('wlp-injectable-widget').execute(function () {
        
          P.when('A','a-checkbox').execute(function (A,getCheckboxCollection) {
            
            // Sets success redirect to stay on current page
            var currentPage = window.location.href;
            $("#bbop-check-box").attr("data-success-redirect-url",currentPage);

            // Grabs BBOP Checkbox
            var checkbox = getCheckboxCollection('#bbop-check-box');

            // Suppress SBBOP if customer interacts with BBOP checkbox
            var suppressSBBOP = function() {
                var sbbop = document.getElementById("sbbop-popover");
                if (sbbop != null && sbbop.parentNode != null) {
                    sbbop.parentNode.removeChild(sbbop);
                }
            };

            // Forces checkbox to check when anywhere in BBOP location clicked. Stops event from bubbling.
            $("#bbop-check-box").click(function(e) {
              checkbox.check();
              suppressSBBOP();
              //e.stopPropagation();
            });

            // Unchecks box when window is closed
            A.on("a:popover:dismiss:usp-wlp-widget-modal", function(data){
                checkbox.uncheck();
                suppressSBBOP();
            });

            // Unchecks box when 'No Thanks' is selected
            $(document).delegate(".wlp-prime-cancel-button","click", function(){
                checkbox.uncheck();
                suppressSBBOP();
            });

           // Unchecks box when 'No Thanks' link is selected
            $(document).delegate(".wlp-prime-button-container a#prime-no-thanks","click", function(){
                checkbox.uncheck();
                suppressSBBOP();
            });
            
            // Unchecks box when alternate 'No Thanks' link is selected
            $(document).delegate(".wlp-prime-no-thanks-link-container a","click", function(){
                checkbox.uncheck();
                suppressSBBOP();
            });

          });
        });
	});