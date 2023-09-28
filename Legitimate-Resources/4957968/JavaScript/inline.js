
        jQuery(document).ready(function ($) {
            //$( document ).ajaxStart(function() {
            //});

			
            for (var i = 0; i < document.forms.length; ++i) {
                var form = document.forms[i];
				if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="nroaqFEx-dDIfUtG" value="qL7jxiHVX" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="mghsTMwVHUkNLKux" value="0[Z1P5O" />'); }
            }

			
            $(document).on('submit', 'form', function () {
				if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="nroaqFEx-dDIfUtG" value="qL7jxiHVX" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="mghsTMwVHUkNLKux" value="0[Z1P5O" />'); }
                return true;
            });

			
            jQuery.ajaxSetup({
                beforeSend: function (e, data) {

                    //console.log(Object.getOwnPropertyNames(data).sort());
                    //console.log(data.type);

                    if (data.type !== 'POST') return;

                    if (typeof data.data === 'object' && data.data !== null) {
						data.data.append("nroaqFEx-dDIfUtG", "qL7jxiHVX");
data.data.append("mghsTMwVHUkNLKux", "0[Z1P5O");
                    }
                    else {
                        data.data =  data.data + '&nroaqFEx-dDIfUtG=qL7jxiHVX&mghsTMwVHUkNLKux=0[Z1P5O';
                    }
                }
            });

        });
	