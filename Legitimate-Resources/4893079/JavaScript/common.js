(function ($) {
	$(function () {

        $('.check-all').click(function(){
            var isChecked = $(this).is(':checked');

            if(isChecked)
            {
                $('.check-item').prop('checked', true);
            }
            else
            {
                $('.check-item').prop('checked', false);
            }

            $('.check-item').trigger('change');

        });

        $('.check-item').click(function(){
            var isChecked = $(this).is(':checked');

            if( ! isChecked)
            {
                $('.check-all').prop('checked', false);
            }
        });

        $('.check-item').change(function(){
            update_selected_items_count();
        });

        function update_selected_items_count()
        {
            var count = $('.check-item:checked').length;

            if($( ".selected-item-count" ).length)
                $( ".selected-item-count" ).html(count);
        }

        $('input.list-item-filter').on('keyup click input', function() {
            var filter_text = this.value;
            if (this.value.length > 0)
            {
                $('.search-list li').show().filter(function(){
                    return ($(this).find('.recipient-name').text().toLowerCase().indexOf(filter_text.toLowerCase()) == -1
                    && $(this).find('.recipient-email').text().toLowerCase().indexOf(filter_text.toLowerCase()) == -1);
                }).hide();
            }
            else
            {
                $('.search-list li').show();
            }
        });
		
		// Confirmation
		$('a.confirm').click(function(e){
			e.preventDefault();

			var href		= $(this).attr('href'),
				removemsg	= $(this).attr('title');

			if (confirm(removemsg || 'Are you sure you want to delete.'))
			{
				window.location.replace(href);
			}
		});

        $('.datepickerwidget').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true
        });

        try
        {

            $('.advanced_ckeditor').ckeditor({
                toolbarGroups: [
                    { name: 'document',	   groups: [ 'mode', 'document' ] },
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'links' },
                    { name: 'insert' },
                    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    { name: 'styles' },
                    { name: 'colors' }
                ],
                extraPlugins: 'image'
            });

            $('.simple_ckeditor').ckeditor({
                toolbarGroups: [
                    { name: 'document',	   groups: [ 'mode', 'document' ] },
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    { name: 'links' },
                ]
            });
        }
        catch(err)
        {
            console.log(err.message);
        }

        $(".chosen").chosen();

        $(".chosen-dropdown").chosen({
            //disable_search_threshold: 10,
            //no_results_text: "Oops, nothing found!",
            //width: "100%"
        });

        $(".modal-box").colorbox({width: '55%'});

        $(".modal-box-sm").colorbox({width: '40%'});

        String.prototype.format = function () {
            var a = this;
            for (var k in arguments) {
                a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
            }
            return a
        }

    });
})(jQuery);