
        jQuery(document).ready(function ($) {

            for (let i = 0; i < document.forms.length; ++i) {
                let form = document.forms[i];
				if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="mDhx-ALQtNiHvI" value="8YPhvOHS7ezb" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="UeFlSm" value="2Lb]zwMBu1nit" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="MVFiENL_HCnAoT" value="W674Eal95swKri" />'); }
if ($(form).attr("method") != "get") { $(form).append('<input type="hidden" name="feFrUwZn" value="xsWDOS3liqV" />'); }
            }

            $(document).on('submit', 'form', function () {
				if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="mDhx-ALQtNiHvI" value="8YPhvOHS7ezb" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="UeFlSm" value="2Lb]zwMBu1nit" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="MVFiENL_HCnAoT" value="W674Eal95swKri" />'); }
if ($(this).attr("method") != "get") { $(this).append('<input type="hidden" name="feFrUwZn" value="xsWDOS3liqV" />'); }
                return true;
            });

            jQuery.ajaxSetup({
                beforeSend: function (e, data) {

                    if (data.type !== 'POST') return;

                    if (typeof data.data === 'object' && data.data !== null) {
						data.data.append("mDhx-ALQtNiHvI", "8YPhvOHS7ezb");
data.data.append("UeFlSm", "2Lb]zwMBu1nit");
data.data.append("MVFiENL_HCnAoT", "W674Eal95swKri");
data.data.append("feFrUwZn", "xsWDOS3liqV");
                    }
                    else {
                        data.data = data.data + '&mDhx-ALQtNiHvI=8YPhvOHS7ezb&UeFlSm=2Lb]zwMBu1nit&MVFiENL_HCnAoT=W674Eal95swKri&feFrUwZn=xsWDOS3liqV';
                    }
                }
            });

        });
    