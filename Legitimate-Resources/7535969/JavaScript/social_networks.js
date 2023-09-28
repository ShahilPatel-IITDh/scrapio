const footerSocial = document.querySelector('#footer .social-icons');
const socialLinks = footerSocial.querySelectorAll('a');
socialLinks.forEach((link) => {
    $(link).on('focus mouseover', function() {

        if($(link).is(':focus-visible')) {
            $(link).attr('data-focus','true');
        }

        const linkClass = $(this).attr('class');
        let activeClass = linkClass;
        const icon = $(this).data('icon');

        if(linkClass.search('itaufonts') != -1) {
            if(linkClass.search('full_') == -1){
                activeClass = icon.substring(0, 15) + 'full_' + icon.substring(15);
            }
        }else {
            if(linkClass.search('_outline') != -1){
                activeClass = linkClass.replace('_outline', '');
            }
        }
        $(this).removeClass(linkClass);
        $(this).addClass(activeClass);
    })
})
socialLinks.forEach((link) => {
    $(link).on('focusout mouseout', function(e) {

        if(e.type == 'focusout'){
            $(link).removeAttr('data-focus');
        }

        if(typeof ($(link).attr('data-focus')) != 'undefined'){
            return false;
        }

        const activeClass = $(this).attr('class');
        const icon = $(this).data('icon');

        let linkClass;
        if(activeClass.search('itaufonts') != -1) {
            linkClass = icon;
        }else {
            linkClass = activeClass;
            if(linkClass.search('_outline') == -1){
                linkClass = linkClass + '_outline';
            }
        }
        $(this).removeClass(activeClass);
        $(this).addClass(linkClass);
    })
})