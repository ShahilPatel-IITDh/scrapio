

        $(document).ready(function () {

            $("#ContentPlaceHolder1_lbSbtTeklif2").click(function () {

                var ad = $("#ContentPlaceHolder1_txtAdSoyad").val();

                var posta = $("#ContentPlaceHolder1_txtEposta").val();
                var tel = $("#ContentPlaceHolder1_txtTel2").val();
                var tip = $("#ContentPlaceHolder1_ddlSigortaTip :selected").text();
                var kod = $("#ContentPlaceHolder1_txtGuvKod2").val();
                var metin = $("#metin").val();

                if (ad != "" && posta != "" && tel != "" && tip != "" && kod != "") {
                    $.ajax({
                        url: '/tr/Hizmetler/DigerBranslar',
                        data: { ad: ad, posta: posta, tel: tel, tip: tip,kod:kod,metin:metin },
                        dataType: 'json',
                        success: function (data) {
                            Swal.fire({
                                title: '',
                                text: data,
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3A63A9',
                                cancelButtonColor: '#fff',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.value) {
                                    location.reload();
                                }
                            })
                        }

                    })
                }
                else {


                        alert("Lütfen Tüm alanları doldurunuz..");



                    }
            })
        })

    