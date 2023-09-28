angular.module('owlcarousel', [])
    .value('big', false)
    .value('small', false)
    .directive('owlCarousel', function(big, small, $window, GLOBALS) {
        var featureToggle = GLOBALS.featureToggles.owlCarouselInit
        var widthAutoInit = 992
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope, _, attr) {
                var isEnable = !((attr.owlEnable === 'false') || (attr.owlEnable === false))

                scope.initCarousel = function(element) {
                    if (!isEnable) {
return
}

                    var defaultOptions = {
                        autoPlay: Math.floor(Math.random() * (7000 - 3500 + 1)) + 3500,
                        items: 6,
                        singleItem: false,
                        navigation: false,
                        pagination: false,
                        itemsCustom: [[0, 3], [480, 4], [640, 5], [992, 6], [1200, 10]],
                        alwaysRun: false,
                    }
                    var customOptions = scope.$eval($(element).attr('data-options'))

                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key]
                    }

                    var owlcAlwaysRun = defaultOptions.alwaysRun

                    if (owlcAlwaysRun) {
                        $(element).owlCarousel(defaultOptions)
                    } else {
                        if ($window.innerWidth < widthAutoInit) {
                            $(element).owlCarousel(defaultOptions)
                        }
                    }
                }

                if (+featureToggle) {
                    var owl = $('.geo-members .owl-carousel')
                    owl.on('initialized.owl.carousel translate.owl.carousel', function(e) {
                    var idx = e.item.index
                        $('.owl-item.center').removeClass('center')
                        $('.owl-item.active').removeClass('active')
                        $('.owl-item').eq(idx + 1).addClass('center')
                        $('.owl-item').eq(idx + 1).addClass('active')
                        $('.thumbnail__container').removeClass('visible')
                        $('.center').find('.thumbnail__container').addClass('visible')
                    })
                }

                scope.onResizeFunction = function() {
                    if (!isEnable) {
return
}

                    if ($window.innerWidth > widthAutoInit) {
                        if (!big) {
                            if (small) {
                                $('.owl-carousel').each(function() {
                                    var customOptions = scope.$eval($(this).attr('data-options'))
                                    if (typeof customOptions === 'undefined' || (customOptions.alwaysRun !== 'undefined' && !customOptions.alwaysRun)) {
$(this).data('owlCarousel').destroy()
}
                                })
                            }
                            big = true
                            small = false
                        }
                    } else {
                        if (!small) {
                            $('.owl-carousel').each(function() {
                                scope.initCarousel($(this))
                            })
                            big = false
                            small = true
                        }
                    }


                }

                angular.element($window).bind('resize.owlcarousel', function() {
                    scope.onResizeFunction()
                    scope.$apply()
                })

                scope.$on('$destroy', function() {
                    angular.element($window).unbind('.owlcarousel')
                })
            },
        }
    })
    .directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element, attr) {
                if (scope.$last) {
scope.initCarousel(element.parent())
}
            },
        }
    }])

