
    $(document).ready(function () {
        $('body').on("click touch", "a", function (e) {
            $("a").each(function () {
                if ($(this).attr("rel")) {
                    $(this).removeAttr("rel");
                }
            });
            if ($(this).attr("href").indexOf('instantlife') != -1) {
                $('.exit-notification p:nth-child(1)').html('You are now leaving this site to access the Instant Life website.');
                $('.exit-notification p:nth-child(2)').html('The reason you are seeing this message is because the web page or website you are visiting is owned and operated by <span class="bolder-exit-text">Instant Life, a member of the Absa Group.</span><br><br> Instant Life is requesting to open a new window, if you grant access, you will leave this site and Instant Life will initiate your application.');
            }

            if ($(this).attr("href") === 'https://instantbusiness.absa.co.za/IBAO/?rm0003=') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                window.open('https://instantbusiness.absa.co.za/IBAO/?rm0003=', '_blank');
            }

            if ($(this).attr("href") === 'https://blog.absa.co.za/category/moments/') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                window.open('https://blog.absa.co.za/category/moments/', '_blank');
            }
        });
    });
