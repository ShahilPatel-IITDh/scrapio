(function() {
    // Tabs-Panels
    swiper_panels = new Swiper('.dsg_o_tabs__panels', {
        slidesPerView: 1,
        slideActiveClass: 'is-active',
        centeredSlides: true,
        allowTouchMove: false
    });

    // Tab-bar
    var swiper_tabs = new Swiper('.dsg_o_tabs__tab-bar', {
        slidesPerView: "auto",
        slideActiveClass: 'is-active',
        slideToClickedSlide: false,
        centeredSlides: false,
        allowTouchMove: false,
        init: false,
        // Responsive breakpoints
        breakpoints: {
            // when window width is <= 768px
            767: {
                slidesPerView: 1.8,
                centeredSlides: true,
                slideToClickedSlide: true,
                allowTouchMove: true
            }
        }
    });
    
    if(swiper_tabs.length) {
        swiper_tabs.forEach(function(st, index) {
            // console.log(index, st, swiper_panels[index]);
            initComponent(st, swiper_panels[index])
        });
    } else {
        if(swiper_tabs.wrapperEl) initComponent(swiper_tabs, swiper_panels);
    }

    function initComponent(st, sp) {
        // console.log("initComponent",st, sp);
        var tabs = st.wrapperEl.querySelectorAll(".dsg_o_tabs__tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", function (event) {
                event.preventDefault();
                var tab = event.target;
                while(!tab.classList.contains('dsg_o_tabs__tab')) tab = tab.parentElement;
                var active = tab.parentNode.querySelectorAll('.is-active');
                for (var j = 0; j < active.length; j++) {
                    active[j].classList.remove("is-active");
                }
                tab.classList.add("is-active");
                var index = 0;
                for (var j = 0; j < tab.parentElement.children.length; j++) {
                    if (tab.parentElement.children[j] === tab) index = j;
                }
                sp.slideTo(index, 1000);
                update_indicator(st.wrapperEl);
            });
        }

        st.on('slideChange', function () {
            sp.slideTo(this.activeIndex, 1000);
        });
    
        st.on('resize', function () {
            update_indicator(st.wrapperEl);
        });
    
        st.on('init', function () {
            update_indicator(st.wrapperEl);
        });

        st.init();
    }

    function update_indicator(container) {
        var indicators = container.parentElement.parentElement.querySelectorAll('.dsg_o_tabs__indicator');
        var active_tab = container.parentElement.parentElement.querySelectorAll('.dsg_o_tabs__tab.is-active');
        try {
            for (var i = 0; i < indicators.length; i++) {
                if (window.innerWidth >= 768) {
                    var margin = window.getComputedStyle(active_tab[i]).marginLeft.replace('px', '') || 0;
                    indicators[i].style.left  = (active_tab[i].offsetLeft + active_tab[i].parentNode.offsetLeft) - margin + "px";
                    indicators[i].style.width = active_tab[i].offsetWidth + (margin * 2) + "px";
                } else {
                    indicators[i].style.left  = (active_tab[i].parentNode.offsetWidth - active_tab[i].offsetWidth) / 2 + "px";
                    indicators[i].style.width = active_tab[i].offsetWidth + "px";
                }
            }
        } catch(e) {
            console.log(e);
        }
    }
})();