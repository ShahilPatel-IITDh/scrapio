
    $('#header').attr('force-active', true);
    $('#banner-slider').slick({
        slidesToShow: 1,
        dots: true,
        dotsClass: 'banner-slick-paginator',
        appendDots: document.getElementById('banner-slick-dots'),
        customPaging : function(slider, i) {
            return ((i+1) + "").padStart(2, 0);
        },
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 12000,
    });
    $('#brands-slider').slick({
        slidesToShow: 4,
        swipeToSlide: true,
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 5000,
        centerMode: false,
        centerPadding: '60px',
        prevArrow: '<button id="prevBtn" class="btn btn-secondary rounded-circle position-absolute" style="left: 0px;top: 50%;transform: translate(0, -50%);width: 2.5rem; opacity: 0.35;"> <i class="align-middle ion-ios-arrow-left"></i> </button>',
        nextArrow: '<button id="nextBtn" class="btn btn-secondary rounded-circle position-absolute" style="right: 0px;top: 50%;transform: translate(0, -50%);width: 2.5rem; opacity: 0.35;"> <i class="align-middle ion-ios-arrow-right"></i> </button>',
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, },
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1, },
            },
        ]
    });
    $('#why-lionic-slider').slick({
        slidesToShow: 1,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    });
    $('#solutions-tab').VerticalTab();
    var solution_sliders = new Swiper('.swiper-container.solutions', {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        observer: true,
        observeParents: true,
    });
    var licensing_swiper = new Swiper('#licensing-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        breakpoints: {
            576:  { slidesPerView: 2, spaceBetween: 16 },
            992:  { slidesPerView: 3, spaceBetween: 16 },
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    var news_swiper = new Swiper('#news-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        breakpoints: {
            300:  { slidesPerView: 1, spaceBetween: 16 },
            576:  { slidesPerView: 2, spaceBetween: 16 },
            992:  { slidesPerView: 3, spaceBetween: 16 },
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    
