
            $(document).ready(function () {

                var ids = [];

                if (Array.isArray(disclosures) && disclosures.length) {

                    $('.footer__disclosures').show();

                    $('.footer__disclosures .footer__inner').append('<p><small>APR = Annual Percentage Rate.  APY = Annual Percentage Yield.   Dividend = Dividend Rate.  All rates current as of 07/12/2023</small></p>');

                    var i = 1;
                    $.each(disclosures, function (index, val) {

                        if (!ids.includes(val.id)) {

                            $('.rate-disclosure-' + val.id).append('<sup>' + i + '</sup>');
                            $('.footer__disclosures .footer__inner').append('<p><small><sup>' + i + '</sup>' + val.text + '</small></p>');

                            ids.push(val.id);
                            i++;
                        }
                    });
                }
            });
    