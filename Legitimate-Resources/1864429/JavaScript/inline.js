
            jQuery(document).ready(function() {
                // revolution slider
                jQuery("#revolution-slider").revolution({
                    sliderType: "standard",
                    sliderLayout: "fullwidth",
                    delay: 5000,
                    navigation: {
                        arrows: {
                            enable: true
                        }
                    },
                    parallax: {
                        type: "mouse",
                        origo: "slidercenter",
                        speed: 2000,
                        levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
                    },
                    spinner: "off",
                    gridwidth: 1140,
                    gridheight: 600,
                    disableProgressBar: "on"
                });
            });
        