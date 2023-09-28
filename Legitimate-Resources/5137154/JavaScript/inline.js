
/*<![CDATA[*/
function resizeIframeFlex() {
                    $('.iframe-flex').each(function() {
                        if ($(this).hasClass('sixteen-nine')) {
                            $(this).css({
                                display:'block',
                                width:$(window).width()+'px',
                                height:Math.round($(window).width() * 0.4)+'px'
                            });
                        }
                    });
                }

                $(function() {
                    resizeIframeFlex();
                    $(window).on('resize', resizeIframeFlex);
                });

$('.fdatepicker').fdatepicker({
    'format':'dd/mm/yyyy'
    });
    $('.fdatepicker-year').fdatepicker({
    'format':'dd/mm/yyyy',
    'startView':'month'
    });
    $('.fdatepicker-year').fdatepicker({
    'format':'dd/mm/yyyy',
    'startView':'year'
    });
    $('.fdatepicker-decade').fdatepicker({
    'format':'dd/mm/yyyy',
    'startView':'decade'
    });
/*]]>*/
