
        var features = function()
        {
            var htmlTag = document.getElementsByTagName('html')[0];
            var classList = [];
            // Populate with current classes
            classList = htmlTag.className.split(' ');
            // JS is supported
            var js = classList.indexOf('js--off');
            if (js !== -1)
            {
                classList[js] = 'js--on';
            }
            else
            {
                classList.push('js--on');
            }
            // Internet Explorer ?
            var isIE = /MSIE|Trident\//.test(window.navigator.userAgent)
            isIE ? classList.push('ie') : ''
            // Add classes to the element
            htmlTag.className = classList.join(' ');
        }();
    