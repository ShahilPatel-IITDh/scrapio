
        jQuery(document).ready(function ($) {
            //$( document ).ajaxStart(function() {
            //});

			
            for (var i = 0; i < document.forms.length; ++i) {
                var form = document.forms[i];
				if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="YBSuADFNbPpjm" value="A0o]Y[XktDu@" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="xdpctVZLWsYh" value="R@KkpO" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="-eHbmStcnDFurT" value="5LUDVbmBZJM" />'); }
            }

			
            $(document).on('submit', 'form', function () {
				if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="YBSuADFNbPpjm" value="A0o]Y[XktDu@" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="xdpctVZLWsYh" value="R@KkpO" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="-eHbmStcnDFurT" value="5LUDVbmBZJM" />'); }
                return true;
            });

			
            jQuery.ajaxSetup({
                beforeSend: function (e, data) {

                    //console.log(Object.getOwnPropertyNames(data).sort());
                    //console.log(data.type);

                    if (data.type !== 'POST') return;

                    if (typeof data.data === 'object' && data.data !== null) {
						data.data.append("YBSuADFNbPpjm", "A0o]Y[XktDu@");
data.data.append("xdpctVZLWsYh", "R@KkpO");
data.data.append("-eHbmStcnDFurT", "5LUDVbmBZJM");
                    }
                    else {
                        data.data =  data.data + '&YBSuADFNbPpjm=A0o]Y[XktDu@&xdpctVZLWsYh=R@KkpO&-eHbmStcnDFurT=5LUDVbmBZJM';
                    }
                }
            });

        });
	