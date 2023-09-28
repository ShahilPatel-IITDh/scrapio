/*
 Created by Brahmaiah
 */

var GlobalFooter = {};

try {
    $.ajaxPrefilter('script', function (options) {
        options.async = true;
        options.cache = true
    })
}

catch (e) {}

GlobalFooter = (function () {
    var settings, defaults = {
            footerUrl: 'https://www.bt.com/content/bt/storefront/en/global/footer.html',
            btStaticAssetsHost: 'https://www.bt.com',
            static_resources_uri: 'https://www.bt.com',
            width: 1154,
        };

    var methods = {
        addGlobalFooter: function (footer) {
			var updatedFooter = footer;
			$(updatedFooter).find('img').each(function () {
			    $(this).attr('src', settings.btStaticAssetsHost + $(this).attr('src'));
			});
            $('.aem-global-footer').append(updatedFooter.children());
        }
    };
    return {
        init: function (options) {
            settings = $.extend(defaults, options);
            $.ajax({
                url: settings.footerUrl,
                type: 'GET',
                cache: true,
                dataType: 'HTML',
                error: function (xhr, status, error) {
                    console.log(status + '::' + error)
                },
                success: function (data) {
                    var xmlString = data,
                        parser = new DOMParser(),
                        doc = parser.parseFromString(xmlString, 'text/html');
                    var htmlContents = $(doc).find('.aem-global-footer');
                    GlobalFooter.loadGlobalFooter(htmlContents);
                },
            }).done(function() {
			  $('.aem-global-footer').after('<script src="' + settings.static_resources_uri + '/etc.clientlibs/global/clientlibs.min.js">')
			});

            if (!$("link[href*='" + settings.static_resources_uri + "/etc.clientlibs/global/clientlibs.min.css']").length) {
                $('head').append('<link rel="stylesheet" href="' + settings.static_resources_uri + '/etc.clientlibs/global/clientlibs.min.css" type="text/css">')
            }        
        },

        loadGlobalFooter: function (data) {
            settings = $.extend(settings, data.config);
            GlobalFooter.settings = settings;
            methods.addGlobalFooter(data);
        }
    }
})();
