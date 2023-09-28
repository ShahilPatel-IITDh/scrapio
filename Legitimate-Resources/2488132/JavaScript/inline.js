
    $(document).ready(function () {
		$('.brand-slider').slick({
            dots: false,
            infinite: true,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            }]
        });
        
        
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
        var anim;
        var anim1 = document.getElementById('saltpepper')
        var animation = {
            container: anim1,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
            progressiveLoad: false},
            path: 'https://www.juvoplus.com/app/themes/juvo/assets/images/salt-pepper.json',
            name: 'myAnimation',
        };
        anim = lottie.loadAnimation(animation);

        var waypoints = new Waypoint({
            element: document.getElementById('saltpepper'),
            handler: function(direction) {
            if (direction === 'down') {
                anim.setSpeed(1);
                anim.goToAndPlay(1, true);
                this.destroy();
            }
            },
            offset: '90%',
        })

        var anim1;
        var anim12 = document.getElementById('title-graphic')
        var animation1 = {
            container: anim12,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
            progressiveLoad: false},
            path: 'https://www.juvoplus.com/app/themes/juvo/assets/images/data.json',
            name: 'myAnimation1',
        };
        anim1 = lottie.loadAnimation(animation1);

        var waypoints = new Waypoint({
            element: document.getElementById('title-graphic'),
            handler: function(direction) {
            if (direction === 'down') {
                anim1.setSpeed(1);
                anim1.goToAndPlay(1, true);
                this.destroy();
            }
            },
            offset: '90%',
        })
    });
