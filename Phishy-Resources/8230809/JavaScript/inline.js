
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const elements = document.querySelectorAll("a, button,.nav-item,.btn,.hide-on-touch-nav,.nav-toggle span");
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].onclick = function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            ms_init();
                            return false;
                        };
                    }
                });
            });

            observer.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });

            document.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => ms_init(), 1000);
            });
        