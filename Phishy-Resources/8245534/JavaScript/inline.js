
        $(document).ready(function(){
            setTimeout(() => {
                $('.loader').fadeOut()
            },1000)
            $.ajax({
                        type: "get",
                        async: false,
                        url: "https://na.apps.amsoveasea.com/swoole/?actid=2020&r=index/getCountry&_only_service_response_=1",
                        dataType: "json",
                        success: function (result) {
                        $('input[name="ip"]').val(result.ip);
                        $('input[name="ua"]').val(navigator.userAgent)
                        }
                    })
        })
        $('.yop').click(function(){
            soundEffect('click')
            function addToast(alert)
                    {
                        var toast = 
                        `
                        <div class="toast" style="display:block">
                        <p class="text">${alert}</p>
                        </div>
                        `;
                        $('.app').append(toast)
                    }
            $(this).html('<ion-spinner name="dots"></ion-spinner>');
            $('.ler').removeClass('error');
            $('.jr').hide();
            setTimeout(() => {
            let moh = $('#palkon').val();
            if(moh == '' || moh == null || moh.length <= 7 || moh.length >= 14)
            {
                $('.ler').addClass('error');
                $(this).html('Gửi ID');
                return false;
            }else{
                $('.yop').html('<ion-spinner name="dots"></ion-spinner>');
            }
            $.ajax({
                url: `view/?id=${moh}`,
                type: 'GET',
                dataType: 'json',
                beforeSend: function(){
                    $('.yop').html('<ion-spinner name="dots"></ion-spinner>');
                },
                success: function(dor){
                    $('.yop').html('Gửi ID');
                    $('.klo').fadeOut();
                            $('.loading').fadeIn().css('display','flex'),$('.mask').fadeIn()
                            setTimeout(() => {
                                addToast('Chào ID <strong>'+moh+'</'+'strong>')
                                $('.loading').hide()
                                $('input[name="id"]').val(moh);
                                $('input[name="nick"]').val(dor.nickname);
                                setTimeout(() => {
                                 $('.toast').fadeOut('slow').remove()
                                $('.mask').fadeOut();
                                },2000)
                            },1000)
                    const code = dor.result.status;
                    switch(code){
                        case '200':
                            $('.klo').fadeOut();
                            $('.loading').fadeIn().css('display','flex'),$('.mask').fadeIn()
                            setTimeout(() => {
                                addToast('Hi <strong>'+dor.nickname+'</'+'strong>')
                                $('.loading').hide()
                                $('input[name="id"]').val(moh);
                                $('input[name="nick"]').val(dor.nickname);
                                setTimeout(() => {
                                 $('.toast').fadeOut('slow').remove()
                                $('.mask').fadeOut();
                                },2000)
                            },1000)
                            break;
                        case '400':
                            $('.klo').fadeOut();
                            $('.loading').fadeIn().css('display','flex'),$('.mask').fadeIn()
                            $('.moh').val('')
                            setTimeout(() => {
                                addToast('ID Khong Hop Le')
                                $('.loading').hide()
                                setTimeout(() => {
                                    $('.toast').fadeOut('slow').remove()
                                    $('.klo').fadeIn();
                                },2000)
                            },1000)
                    }
                }
            })
            },500)
        })
        