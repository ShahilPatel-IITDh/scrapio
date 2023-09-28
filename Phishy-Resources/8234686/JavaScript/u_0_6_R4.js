
            (function (a) {
                a.__updateOrientation = function () {
                    var b = !!a.orientation && a.orientation !== 180,
                        c = document.body;
                    c && (c.className = c.className.replace(/(^|\s)(landscape|portrait)(\s|$)/g, " ") + " " + (b ? "landscape" : "portrait"));
                    return b;
                };
            })(window);
        