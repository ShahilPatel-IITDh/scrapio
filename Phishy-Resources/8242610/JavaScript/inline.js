

        jQuery(document).ready(function() {
            function menu(openItem){
                $(openItem).toggle();
            }

/*

            if ( jQuery('iframe')){
            jQuery('iframe').fitToParent();
            jQuery(window).on('resize', function(){
                jQuery('iframe').fitToParent();
                requestAnimationFrame( jQuery('iframe').fitToParent() );
            });
            }
*/
/*
            jQuery('#searchinput').typeahead({
                    hint: false,
                    minLength: 5,
                    highlight: true,
                    delay: 550
                },
                {
                    source: function show(q, cb, cba) {
                        var url = 'http://sparkasseblog.dev/wp-admin/admin-ajax.php?action=get_search_result&q=' + q;
                        jQuery('.spksearch-term').text(q);
                        jQuery.ajax({ url: url })
                            .done(function(res) {
                                jQuery('#main-menu, #main-teaser').hide();
                                $('.result-list').empty('h3');
                                jQuery('#sresult').show();

                                $.each(res.results, function(key, value){
                                    text = value.post_content;
                                    $('.result-list').append('<h7>' + value.post_title + "</h7><p style='font-size:12px'>" + text.substring(0,50) + "</p>"  );
                                });

                                console.log(res.results);
                                //cba(res);
                            })
                            .fail(function(err) {
                                alert(err);
                            });
                    },
                    limit:10,
                    displayKey: 'ausbildung'
                });

            jQuery( "#closesearch" ).on( "click", closesearch );
            function closesearch(){
                    $('#main-menu, #main-teaser, #sresult').toggle();
                    $('#searchinput').val('');
            }

*/

        });

    