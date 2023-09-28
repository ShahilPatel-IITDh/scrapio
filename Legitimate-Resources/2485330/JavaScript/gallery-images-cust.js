var slideshowWrapowl=null;
(function ($) {

    $(document).ready(function () {
        //////// Slideshow START ////////
        window.allSlideshows = {};
        window.initSlideshow = (function (selector) {
            $(selector).each(function () {
                var $this = $(this);
                var options = {
                    items: 1,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 10000,
                    nav: true,
                    autoplayHoverPause:true,
                    navText: ['<i class="slider-arrow slider-arrow-left"></i>', '<i class="slider-arrow slider-arrow-right"></i>'],
                };

                if ($this.hasClass('autoWidth')) {
                    $.extend(options, {
                        autoWidth: true,
                        items: 4,
                        margin: 5,
                        loop: ($this.children().length > 4),
                        autoplay: ($this.children().length > 4),
                    });
                } else {
                    $.extend(options, {});
                }
                $this.owlCarousel('destroy');
                var owl = $this.owlCarousel(options);
                if($this.parent().attr('id')=='slideshowWrap'){
                    slideshowWrapowl=owl;
                }

                setTimeout(function () {
                    allSlideshows[$this.attr('id')] = owl;
                })

            });
        });
        initSlideshow(".owl-carousel");



        $('a.btn.sliderDetails').click(function () {
            //jQuery.noConflict();
            $("#sliderDetails .modal-body h5.title").html($(this).data("title"));
            $("#sliderDetails .modal-body p").html($(this).data("description"));
            if(slideshowWrapowl!=null){slideshowWrapowl.trigger('stop.owl.autoplay',);}
            window.$('#sliderDetails').appendTo("body").modal('show');
        });
        window.$("#sliderDetails").on("hidden.bs.modal", function () {
            $("#sliderDetails .modal-body h5.title").html("");
            $("#sliderDetails .modal-body p").html("");
            if(slideshowWrapowl!=null){slideshowWrapowl.trigger('play.owl.autoplay',[10000]);}
        });


        //////// Slideshow END ////////


        //////// Album START ////////
        window.initAlbum = (function(selector){
            $(selector).find('.itemLink').click(function(e){
                e.preventDefault();
                $(selector).hide();

                var albumId = $(this).data('album-id');
                $('#album_list_' + albumId).show();
            });
        });
        initAlbum('.album-list');
        //////// Album END ////////

        //////// List START ////////
        window.initListAlbum = (function (selector) {
            var listCurrentPage = 1; // For every list use
            $(selector).find('.title, .album-list ul.list li .album_title').dotdotdot();

            var updateListItem = function ($items, numPerPage) {
                $("html, body").animate({scrollTop: $items.closest(selector).offset().top - 100}, 500);
                setTimeout(function () {
                    $items.hide();
                    $items.slice(((listCurrentPage - 1) * numPerPage), (listCurrentPage * numPerPage)).show();
                }, 500)
            }
            $(selector).each(function () {
                var numPerPage = $(this).attr('data-num-per-page');
                var $items = $(this).find('.item');
                var itemCount = $items.length;
                var totalPage = (numPerPage == 0) ? 1 : Math.ceil(itemCount / numPerPage);

                if (typeof(numPerPage) == 'undefined' || itemCount == 0) {
                    return;
                }

                if (totalPage > 1) {
                    $items.slice(numPerPage).hide();
                } else {
                    $(this).find('.pagination').height(0);
                }

                $(this).find('.photo_list_pagination').twbsPagination({
                    totalPages: totalPage,
                    visiblePages: 5,
                    onPageClick: function (event, page) {
                        //console.info(page + ' (from options)');
                    },
                    paginationClass: 'photo_list_pagination',
                    first: '',
                    last: '',
                    prev: '<span><i class="fas fa-chevron-left"></i></span>',
                    next: '<span><i class="fas fa-chevron-right"></i></span>',
                    disabledClass: 'inactive',
                    hideOnlyOnePage: true
                }).on('page', function (event, page) {
                    //console.info(page + ' (from event listening)');
                    listCurrentPage = page;
                    updateListItem($items, numPerPage);
                });
            });
        });
        initListAlbum('.huge-it-list');
        //////// List END ////////


        //////// Blue-imp Gallery START ////////
        window.initBlueImp = (function () {
            var blueImpGalleryNumPerPage = 10;
            var blueImpGalleryIndicatorItemStartIndex = 0;
            var blueImpGalleryShowFullDescription = false;
            var updateIndicatorItem = function () {
                var $indicator = $('#blueimp-gallery').find('.indicator');
                var $indicatorItem = $indicator.children();
                var $indicatorControl = $('#blueimp-gallery').find('.indicatorControl');

                $indicatorItem.show();
                $indicator.find(':gt(' + (blueImpGalleryIndicatorItemStartIndex + blueImpGalleryNumPerPage - 1) + ')').hide();
                $indicator.find(':lt(' + (blueImpGalleryIndicatorItemStartIndex) + ')').hide();

                $indicatorControl.find('.leftBtn a, .rightBtn a').css('visibility', 'visible');
                if (blueImpGalleryIndicatorItemStartIndex <= 0) {
                    blueImpGalleryIndicatorItemStartIndex = 0;
                    $indicatorControl.find('.leftBtn a').css('visibility', 'hidden');
                }
                if (blueImpGalleryIndicatorItemStartIndex + blueImpGalleryNumPerPage >= $indicatorItem.length) {
                    $indicatorControl.find('.rightBtn a').css('visibility', 'hidden');
                }
            };

            $('#blueimp-gallery .showMoreDescription').click(function () {
                var $photoInfo = $('#blueimp-gallery .photoInfo');
                var $description = $('#blueimp-gallery').find('.description');

                blueImpGalleryShowFullDescription = !blueImpGalleryShowFullDescription;
                $description.trigger("destroy");
                if (blueImpGalleryShowFullDescription) {
                    $(this).html('（收起顯示…）');
                    $photoInfo.addClass('full_description').scrollTop(0);
                } else {
                    $(this).html('（顯示更多…）');
                    $photoInfo.removeClass('full_description');
                    $description.dotdotdot({
                        height: 56,
                        watch: true
                    });
                }
            });

            $('#blueimp-gallery .leftBtn a').click(function () {
                blueImpGalleryIndicatorItemStartIndex -= blueImpGalleryNumPerPage;
                updateIndicatorItem();
            });
            $('#blueimp-gallery .rightBtn a').click(function () {
                blueImpGalleryIndicatorItemStartIndex += blueImpGalleryNumPerPage;
                updateIndicatorItem();
            });

            $('#blueimp-gallery')
                .on('open', function (event) {
                    blueImpGalleryIndicatorItemStartIndex = 0;
                    $(this).find('.indicator').hide();
                    $('.huge-it-list .title').trigger("destroy");
                })
                .on('opened', function (event) {
                    updateIndicatorItem();
                    $(this).find('.indicator').show();
                })
                .on('close', function (event) {
                    $('.huge-it-list .title').dotdotdot();
                })
                .on('slide', function (event, index, slide) {
                    var $gallery = $('#blueimp-gallery').data('gallery');
                    var $item = $($gallery.list[index]);
                    var $photoInfo = $(this).find('.photoInfo');
                    var $title = $(this).find('.title');
                    var $description = $(this).find('.description');
                    var $more = $(this).find('.more');

                    // Fix see all content at first time START //
                    $photoInfo.css('visibility', 'hidden');
                    $photoInfo.removeClass('full_description');
                    // Fix see all content at first time END //

                    //// Title START ////
                    var titleHtml = $item.find('.title').html();

                    $title.html(titleHtml);
                    if (titleHtml) {
                        $title.show();
                    } else {
                        $title.hide();
                    }
                    //// Title END ////

                    //// Description START ////
                    var descriptionHtml = $item.find('.description').html();

                    $description.html(descriptionHtml);
                    if (descriptionHtml) {
                        $description.show();
                        blueImpGalleryShowFullDescription = true;
                        $(this).find('.showMoreDescription').click();
                        $(this).find('.more').hide();
                    } else {
                        $description.hide();
                    }

                    $more.hide();
                    //// Description END ////

                    //// Visible START ////
                    $photoInfo.hide();
                    if (!titleHtml && !descriptionHtml) {
                        $(this).addClass('photoOnly');
                    } else {
                        $photoInfo.show();
                        $(this).removeClass('photoOnly');
                    }
                    //// Visible END ////

                    //// Popup icon START ////
                    var $img = $(slide).find('img');
                    var $a = $(slide).find('a');
                    if ($a.length) {
                        $(this).find('.popup').attr('href', $a.attr('href'));
                    } else {
                        $(this).find('.popup').attr('href', $img.attr('src'));
                    }
                    //// Popup icon END ////

                    //// Indicator icon START ////
                    blueImpGalleryIndicatorItemStartIndex = parseInt(index / blueImpGalleryNumPerPage) * blueImpGalleryNumPerPage;
                    updateIndicatorItem();
                    //// Indicator icon END ////

                    // Fix see all content at first time START //
                    setTimeout(function () {
                        $photoInfo.css('visibility', 'visible');
                    }, 500);
                    // Fix see all content at first time END //
                }).on('slidecomplete', function (event, index, slide) {
                var $description = $(this).find('.description');
                var $more = $(this).find('.more');

                if ($description.html() && $description.height() > 36 && $description.triggerHandler("isTruncated")) {
                    $more.show();
                }
            });
        });
        initBlueImp();
        //////// Blue-imp Gallery END ////////



    });
})(jQuery);