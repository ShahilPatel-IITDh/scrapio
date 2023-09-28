
                    jQuery(document).ready(function($) {
                            $('.owl-carousel').owlCarousel({
                              loop: false,
                              margin: 10,
                              nav: true,
                              navText: [
                                "<i class='fa fa-angle-left wt-left'></i>",
                                "<i class='fa fa-angle-right wt-right'></i>"
                              ],
//                                                          autoplay: true,
                              autoplayHoverPause: true,
                              responsive: {
                                0: {
                                  items: 1                                },
                                600: {
                                  items: 2                                },
                                1000: {
                                  items: 3                                }
                              }
                            })
                    jQuery(".carousel-wrap>.owl-carousel>.owl-stage-outer>.owl-stage>.owl-item>div[class*='col-']").removeClass (function (index, css) {
                        return (css.match (/(^|\s)col-\S+/g) || []).join(' ');
                     });
                     
                    
                  });
                                                                                       
                