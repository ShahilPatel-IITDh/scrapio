/**
 * Module/plugin para carregamento lento
 * @author Eduardo <eduardo.ferreira@tray.com.br>
 */
(function($) {

    $(document).ready(function() {
        var lazyBackgrounds = [].slice.call(document.querySelectorAll(".pag"));

        if ("IntersectionObserver" in window) {
            let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("pag-lazy");
                        lazyBackgroundObserver.unobserve(entry.target);
                    }
                });
            });

            lazyBackgrounds.forEach(function (lazyBackground) {
                lazyBackgroundObserver.observe(lazyBackground);
            });
        }
    });

})(jQuery);
