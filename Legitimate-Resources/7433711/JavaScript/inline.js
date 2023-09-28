
            $(document).ready(function() {
                document.getElementById("copyToClipboard").addEventListener("click", function () {
                    var input = document.getElementById("clipboardSource");
                    input.select();
                    var successful = document.execCommand("copy");
                    if (successful) {
                        alert('Copied "' + input.value + '" to your clipboard.');
                    } else {
                        throw new Error("Failed to copy text (verify caller was in the context of an event handler)");
                    }
                });

                $('li.more > a').click(function(){
                    var toToggle = $($(this).attr('data-to-toggle'));
                    if(toToggle.is(':visible')){
                        toToggle.slideUp('fast');
                        $(this).removeClass('is-active');
                        if ($('#awesomebar').find('.is-active').length < 1){
                            $('#awesomebar').removeClass('sub-active');
                        }
                    } else {
                        toToggle.slideDown('fast');
                        $(this).addClass('is-active');
                        $('#awesomebar').addClass('sub-active');
                    }
                    return false;
                });

            });
        