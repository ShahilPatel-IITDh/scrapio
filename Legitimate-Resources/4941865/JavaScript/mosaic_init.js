// ngg_mosaic_methods does not use any jQuery so it can begin loading gallery images before
// jQuery's init / window.ready is fired
var ngg_mosaic_methods = {

    high_dpi: false,

    init: function() {
        this.high_dpi = this.getDPIRatio() > 1;

        _.each(document.getElementsByClassName('ngg-pro-mosaic-container'), function(self) {
            var gallery_id = self.getAttribute('data-ngg-pro-mosaic-id');
            var gallery = ngg_mosaic_methods.get_gallery(gallery_id);

            // Images in the template are deferred from loading until here
            if (ngg_mosaic_methods.get_setting(gallery_id, 'lazy_load_enable', false, 'bool')) {
                var initial_load = ngg_mosaic_methods.get_setting(gallery.ID, 'lazy_load_initial', 35, 'int');
                gallery.mosaic_loaded = [];
                _.each(
                    gallery.images_list,
                    function(image, index) {
                        if (index < initial_load) {
                            gallery.mosaic_loaded.push(image.image_id);
                            self.appendChild(ngg_mosaic_methods.create_image(gallery, image));
                        }
                    }
                );
            } else {
                _.each(
                    gallery.images_list,
                    function(image) {
                        self.appendChild(ngg_mosaic_methods.create_image(gallery, image));
                    }
                );
            }
        });
    },

    getDPIRatio: function() {
        var ratio = 1;

        // To account for zoom, change to use deviceXDPI instead of systemXDPI
        if (window.screen.systemXDPI !== undefined
            &&  window.screen.logicalXDPI !== undefined
            &&  window.screen.systemXDPI > window.screen.logicalXDPI) {
            // Only allow for values > 1
            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
        } else if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }

        return ratio;
    },

    get_gallery: function (gallery_id) {
        var result = null;

        if ('undefined' == typeof window.galleries) {
            return result;
        }

        return _.find(galleries, function(gallery) {
            return (gallery.ID == gallery_id);
        });
    },

    get_setting: function(gallery_id, name, def, type) {
        type = type || 'bool';
        var gallery = this.get_gallery(gallery_id);

        if (gallery && typeof gallery.display_settings[name] != 'undefined')
            def = gallery.display_settings[name];

        if (type == 'bool') {
            if (def == 1 || def == '1')
                def = true;
            if (def == 0 || def == '0')
                def = false;
        } else if (type == 'int') {
            def = parseInt(def);
        } else if (type == 'string') {
            // don't need to do anything, for now
        }

        return def;
    },

    create_image: function(gallery, image, onload) {
        var self = this;

        var div = document.createElement('div');
        div.setAttribute('class', 'ngg-pro-mosaic-item');

        var img = document.createElement('img');
        var url = image.image;
        if (self.high_dpi && image.use_hdpi) {
            url = image.srcsets.hdpi;
        }

        img.setAttribute('title', image.title);
        img.setAttribute('alt',   image.title);
        img.setAttribute('src',   url);
        img.setAttribute('width', image.width);
        img.setAttribute('height', image.height);

        // Yes, it's messy, but it's a decently clean way to inject our effect code text into the element
        var anchor = document.createElement('a');
        var clauses = gallery.mosaic_effect_code.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/ig);
        if (clauses) {
            for (var i = 0; i < clauses.length; i++) {
                var claus = clauses[i].match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/i);
                anchor.setAttribute(claus[1], claus[2]);
            }
        }

        anchor.setAttribute('href',             image.full_image);
        anchor.setAttribute('title',            image.description);
        anchor.setAttribute('data-image-id',    image.image_id);
        anchor.setAttribute('data-src',         image.image);
        anchor.setAttribute('data-thumbnail',   image.thumb);
        anchor.setAttribute('data-title',       image.title);
        anchor.setAttribute('data-description', image.description);
        anchor.setAttribute('data-ngg-captions-nostylecopy', '1');
        if (typeof onload != 'undefined') {
            anchor.setAttribute('onload', onload);
        }

        anchor.appendChild(img);
        div.appendChild(anchor);

        return div;
    }
};

ngg_mosaic_methods.init();

(function($) {
    "use strict";

    var mosaic_methods = {
        // This image has loaded: remove it from the pending queue
        image_loaded: function(image_id) {
            this.scroll_pending = _.without(this.scroll_pending, image_id);
        },

        // Prevent the listener action from running concurrently
        scroll_action_running: null,

        // Once scroll_action() fires we don't want to run again for 300ms
        scroll_timer: null,

        // how many more images to fetch
        scroll_step: 5,

        // a queue of pending/downloading images
        scroll_pending: [],

        scroll_more_to_find: true,

        scroll_action: function(gallery_id, myself) {
            // Just bail now
            if (this.scroll_action_running == true
            ||  this.scroll_timer
            ||  !this.scroll_more_to_find
            ||  (this.scroll_pending.length >= 1)) {
                return;
            }

            this.scroll_action_running = true;
            var self = this;

            this.scroll_timer = setTimeout(function() {
                clearTimeout(self.scroll_timer);
                self.scroll_timer = false;
            }, 500);
            
            setTimeout(function() {
                var $self            = $(myself);
                var window_height    = $(window).height();
                var window_position  = $(window).scrollTop();
                var window_bottom    = window_height + window_position;
                var container_bottom = $self.height() + $self.offset().top;
                var row_height       = $self.find('.ngg-pro-mosaic-item.entry-visible').first().height();
                var last_height      = $self.find('.ngg-pro-mosaic-item.entry-visible').last().height();

                if (window_bottom <= (container_bottom - last_height - (row_height * 2))) {
                    self.scroll_action_running = false;
                    return;
                }
    
                var gallery = ngg_mosaic_methods.get_gallery(gallery_id);

                var scroll_step = ngg_mosaic_methods.get_setting(gallery_id, 'lazy_load_batch', this.scroll_step, 'int');

                // If there's no more images to find: stop checking in the future
                if ((gallery.images_list.length - gallery.mosaic_loaded.length) < scroll_step) {
                    scroll_step = gallery.images_list.length - gallery.mosaic_loaded.length;
                    self.scroll_more_to_find = false;
                }

                // Find X images not already added and append them
                for (var i = 0; i < scroll_step; i++) {
                    var image = _.find(gallery.images_list, function(image) {
                        return (_.indexOf(gallery.mosaic_loaded, image.image_id) == -1)
                    });

                    gallery.mosaic_loaded.push(image.image_id);
                    $self.append(ngg_mosaic_methods.create_image(gallery, image, self.image_loaded(image.image_id)));
                }

                // Have JustifiedGallery update *new* images only
                $self.justifiedGallery('norewind');
    
                // Allow the scroll method to be caught again
                self.scroll_action_running = false;

                // In case the user has set a very low number of images to load at startup or
                // if the available space/browser is very large; running again ensures we've
                // filled the content area without requiring the user scroll a second time
                setTimeout(function() {
                    self.scroll_action(gallery_id, myself);
                }, 800);
            }, 60);
        }
    };

    _.each($('.ngg-pro-mosaic-container'), function(self) {

        var $self = $(self);
        var gallery_id = $self.data('ngg-pro-mosaic-id');

        var jgoptions = {
            captions: false,
            cssAnimation: true,
            waitThumbnailsLoad: false,
            justifyThreshold: 0.9,
            rowHeight: ngg_mosaic_methods.get_setting(gallery_id, 'row_height', 200, 'int'),
            margins:   ngg_mosaic_methods.get_setting(gallery_id, 'margins',    15,  'int'),
            lastRow:   ngg_mosaic_methods.get_setting(gallery_id, 'last_row',   'justify', 'string')
        };

        var gallery = ngg_mosaic_methods.get_gallery(gallery_id);

        // Guarantee the container has a base size
        $self.css({
            'min-height': ngg_mosaic_methods.get_setting(gallery_id, 'row_height', 200, 'int') + 'px'
        });

        // Images in the template are deferred from loading until here
        if (ngg_mosaic_methods.get_setting(gallery_id, 'lazy_load_enable', false, 'bool')) {
            $(window).on('scroll', function() {
                mosaic_methods.scroll_action(gallery.ID, self);
            });
        }

        // wait until JG has processed images before trying to update lightboxes
        $self.on('jg.complete', function() {
            $(window).trigger('ngg.mosaic.complete', [$self]);
            $(window).trigger('resize', [$self]);

            // Our captions can't process correctly if the images haven't loaded yet
            $self.waitForImages(function() {
                $(window).trigger('refreshed');
            });
        });

        $self.justifiedGallery(jgoptions);

        // The below disableRefresh / enableRefresh commands have been altered by Imagely and are not part of
        // the standard Justified-Gallery distribution. The following prevents JG from recalculating gallery sizes
        // and thus changing the scroll position when our Pro Lightbox is active.
        $(window).on('npl_initialization_complete', function() {
            $('#npl_content').on('npl_opening', function() {
                $self.justifiedGallery('disableRefresh');
            });
            $('#npl_content').on('npl_closing', function() {
                $self.justifiedGallery('enableRefresh');
            });
        });

    });

})(jQuery);
