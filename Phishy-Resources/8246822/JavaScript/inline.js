
            (() => {
                const e = history.pushState,
                    t = history.replaceState,
                    a = history.back,
                    r = history.forward;
                function n() {
                    window.postMessage({_custom_type_: "CUSTOM_ON_URL_CHANGED"})
                }
                history.pushState = function () {
                    e.apply(history, arguments),
                    n()
                },
                history.replaceState = function () {
                    t.apply(history, arguments),
                    n()
                },
                history.back = function () {
                    a.apply(history, arguments),
                    n()
                },
                history.forward = function () {
                    r.apply(history, arguments),
                    n()
                }
            })()
        