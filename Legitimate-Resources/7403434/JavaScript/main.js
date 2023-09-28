jQuery(function ($) {
    $(document).ready(function () {
        $('[data-theiaStickySidebar-sidebarSelector]').each(function () {
            var $this = $(this);
            var sidebarSelector = JSON.parse($this.attr('data-theiaStickySidebar-sidebarSelector'));
            var options = JSON.parse($this.attr('data-theiaStickySidebar-options'));

            $(sidebarSelector).theiaStickySidebar(options);
        });
    });
});