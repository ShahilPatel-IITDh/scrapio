            (function (win, doc, src) {
    win.Wpm = win.Wpm || function (name, param) {
        win.Wpm.queue = win.Wpm.queue || [];
        const { queue } = win.Wpm;
        queue.push([name, param]);
    };
    const script = doc.createElement('script');
    script.src = src;
    script.async = 1;
    const [elem] = doc.getElementsByTagName('script');
    elem.parentNode.insertBefore(script, elem);
})(window, document, 'https://t1.kakaocdn.net/malibu_prod/wpm.js');
            const APP_KEY = 'd3cda7e82e6e4144bdc998b8e25f125d';
            Wpm('appKey', APP_KEY);