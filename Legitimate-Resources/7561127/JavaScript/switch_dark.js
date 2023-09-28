;(function() {
    let mode = localStorage.getItem('modeDark') ? localStorage.getItem(
        'modeDark') : false;
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let bodys = jQuery('body');
    let switchDark = jQuery('#switch-dark');
    if (mode) {
        if (mode === 'dark') {
            bodys.addClass('dark');
            switchDark.prop('checked', true);
        }
    }
    else {
        if (media.matches) {
            bodys.addClass('dark');
            switchDark.prop('checked', true);
            localStorage.setItem('modeDark', 'dark');
        }
        else {
            localStorage.setItem('modeDark', 'light');
        }
    }

    function addListenerDark(item) {
        if (item.matches) {
            bodys.addClass('dark');
            switchDark.prop('checked', true);
            localStorage.setItem('modeDark', 'dark');
        }
        else {
            bodys.removeClass('dark');
            switchDark.prop('checked', false);
            localStorage.setItem('modeDark', 'light');
        }
    }

    if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', addListenerDark.bind(null, media));
    }
    else if (typeof media.addListener === 'function') {
        media.addListener(addListenerDark.bind(null, media));
    }
    switchDark.on('change',
        function() {
            if (switchDark.prop('checked')) {
                addListenerDark({
                    matches: true,
                });
            }
            else {
                addListenerDark({
                    matches: false,
                });
            }
        });
})();