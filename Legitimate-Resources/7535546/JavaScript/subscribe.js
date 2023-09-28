var email = document.getElementById('user_email');
            function add_email_list()
            {
                $.ajax({
                    url: "/common/ajax/addtoemail/emailname/" + email.value,
                    type: 'GET',
                    success: function(info) {
                        if (info == 1) {
                            alert('Successfully!');
                        } else {
                            alert('lost!');
                        }
                    }
                });
            }