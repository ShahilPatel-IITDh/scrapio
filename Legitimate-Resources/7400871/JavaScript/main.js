jQuery(document).ready(function ($) {


    JMULTISCROLL = {
            msfunc: function () {


                if ($(window).width() > 767) {

                    var nav = false;
                    if (splitslider_settings.nav == '1') {
                        nav = true;
                    }

                    if ($('.multi-scroll').length > 0) {

                        $('.multi-scroll').splitslider({

                            verticalCentered: true,
                            scrollingSpeed: 700,
                            easing: 'easeInQuart',
                            menu: false,
                            sectionsColor: [],
                            navigation: nav,
                            navigationPosition: 'right',
                            navigationColor: '#fff',
                            navigationTooltips: [],
                            loopBottom: true,
                            loopTop: true,
                            css3: false,
                            paddingTop: 0,
                            paddingBottom: 0,
                            normalScrollElements: '#disable-splitslider,#disable-splitslider2',
                            keyboardScrolling: true,
                            touchSensitivity: 5,

                            // Custom selectors
                            sectionSelector: '.scrollable',
                            leftSelector: '.left-part',
                            rightSelector: '.right-part',


                            //events
                            onLeave: function (index, nextIndex, direction) {

                                if ($(window).width() > 800) {

                                    $('.ms-table .wpb_animate_when_almost_visible').removeClass("wpb_start_animation");
                                    $('.ms-table .wpb_animate_when_almost_visible').removeClass("animated");

                                }

                            },
                            afterLoad: function (anchorLink, index) {

                                if ($(window).width() > 800) {


                                    $('.ms-table .wpb_animate_when_almost_visible').addClass("wpb_start_animation");
                                    $('.ms-table .wpb_animate_when_almost_visible').addClass("animated");


                                }

                            },

                            afterRender: function (anchorLink, index) {},



                            afterResize: function () {
                                //$.fn.splitslider.destroy();
                                $('.multi-scroll').addClass("multi-scroll-resize");
                                //$('#splitslider-nav').hide();
                            },




                        });




                        var autoPlay = $('.multi-scroll').data('auto-play');
                        var autoInterval = $('.multi-scroll').data('auto-interval');




                        function autosplit() {
                            $.fn.splitslider.moveSectionDown();
                        }




                        if (autoPlay) {

                            setInterval(autosplit, autoInterval);

                        }







                    }

                } 
                
                
                
                else {




                    var winMH = $(window).height();
                    var winMW = $(window).width();
                    var scrollableCount = $('.scrollable').size();
                    var winMHscrollable = winMH * scrollableCount;
                    var MHscrollable = winMHscrollable / scrollableCount;


                    $(".multi-scroll").css("height", winMHscrollable);

                    var _scrollable_index = 0;
                    $(".left-part  .scrollable").each(function () {
                        $(this).addClass('scrollable-left-' + _scrollable_index);
                        $(this).css('top', MHscrollable * _scrollable_index++);
                        _scrollable_index++;
                    })


                    var _scrollable_index = 1;
                    $(".right-part  .scrollable").each(function () {
                        $(this).addClass('scrollable-right-' + _scrollable_index);
                        $(this).css('top', MHscrollable * _scrollable_index++);
                        _scrollable_index++;
                    })



                }



            }
        }
        //function call
    JMULTISCROLL.msfunc();
    
    
    var beforeResizeWidth = $(window).width() ;

  
    $(window).resize(function () {
        
        
        var id;
        clearTimeout(id);
        id = setTimeout(doneResizing, 800); 

    });

    function doneResizing() {
        
             
    var doneResizingwidth = $(document).width();
        
   // location.reload(); 
        
    }




});