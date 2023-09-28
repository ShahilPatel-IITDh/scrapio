/**
 *  2016 ModuleFactory.co
 *
 *  @author    ModuleFactory.co <info@modulefactory.co>
 *  @copyright 2016 ModuleFactory.co
 *  @license   ModuleFactory.co Commercial License
 */

var FSOG = FSOG || { };

$(document).ready(function(){
    $('#fsopengraph-social-buttons').appendTo('body');

    $('#fsopengraph-social-buttons a').on('click', function(){
        var type = $(this).data('type');
        if (type.length) {
            switch(type) {
                case 'facebook':
                    window.open('http://www.facebook.com/sharer.php?u=' + FSOG.ogUrl, 'sharer', 'toolbar=0,status=0,width=550,height=445');
                    break;
                case 'google':
                    window.open('https://plus.google.com/share?url=' + FSOG.ogUrl, 'sharer', 'toolbar=0,status=0,width=500,height=445');
                    break;
                case 'twitter':
                    window.open('https://twitter.com/intent/tweet?text=' + FSOG.ogTitle + ' ' + encodeURIComponent(FSOG.ogUrl), 'sharertwt', 'toolbar=0,status=0,width=640,height=445');
                    break;
                case 'pinterest':
                    window.open('http://www.pinterest.com/pin/create/button/?media=' + FSOG.ogImage + '&url=' + FSOG.ogUrl, 'sharerpinterest', 'toolbar=0,status=0,width=660,height=445');
                    break;
                case 'linkedin':
                    window.open('https://www.linkedin.com/cws/share?url=' + FSOG.ogUrl, 'sharelinkedid', 'toolbar=0,status=0,width=600,height=417');
                    break;
            }
        }
        return false;
    });

    if (FSOG.hasOwnProperty('scrape_url')) {
        FSOG.scrapeURL(FSOG.scrape_url);
    }
});

FSOG.scrapeURL = function(url) {
    try {
        $.ajax({
            url: 'https://graph.facebook.com',
            type: 'POST',
            data: {
                id: url,
                scrape: true
            },
            async: true,
            dataType: 'json',
            cache: false,
            success: function(data) { }
        });
    } catch(e) { }
};
