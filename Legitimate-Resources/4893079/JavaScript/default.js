(function ($) {
	$(function () {

        $('#menuSidebarCollapse').on('click', function () {
            $('#menu_sidebar').toggleClass('active');
        });

        $("span.timeago").timeago();

        $(".chosen").chosen();

        $(".chosen-dropdown").chosen({
            //disable_search_threshold: 10,
            //no_results_text: "Oops, nothing found!",
            width: "100%"
        });

        $('.datepicker').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true
        });

        $('select.has-alt-field').change(function(){
            var parent_container = $(this).parent();
            var alt_field = parent_container.find('.alt-field');
            if($(this).val() == '0')
            {
                alt_field.show();
            }
            else
            {
                alt_field.hide();
            }
        }).trigger('change');

        function reposition() {
            var modal = $(this), dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');

            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
        }

        // Reposition when a modal is shown
        $('.modal').on('show.bs.modal', reposition);

        // Reposition when the window is resized
        $(window).on('resize', function() {
            $('.modal:visible').each(reposition);
        });

        var header = $("#header_top");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 100 && $(this).width() > 769) {
                header.addClass("navbar-fixed-top");
            } else {
                header.removeClass('navbar-fixed-top');
            }
        });

        $("#feedback-tab > .feedback-tab-container > header").click(function(){
            $("#feedback-tab").toggleClass("open");
        });

    });
})(jQuery);