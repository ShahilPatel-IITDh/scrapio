
          // Define function so that we can call it again later if we need to reset it
          // This executes reCAPTCHA and then calls our callback.
          function executeRecaptchaForNewUser() {
            grecaptcha.ready(function() {
              grecaptcha.execute('6LfRo0khAAAAADhbwuirLwB6ZlDI36_d-RmBPltJ', {action: 'new_user'}).then(function(token) {
                setInputWithRecaptchaResponseTokenForNewUser('g-recaptcha-response-data-new-user', token)
              });
            });
          };
          // Invoke immediately
          executeRecaptchaForNewUser()

          // Async variant so you can await this function from another async function (no need for
          // an explicit callback function then!)
          // Returns a Promise that resolves with the response token.
          async function executeRecaptchaForNewUserAsync() {
            return new Promise((resolve, reject) => {
             grecaptcha.ready(async function() {
                resolve(await grecaptcha.execute('6LfRo0khAAAAADhbwuirLwB6ZlDI36_d-RmBPltJ', {action: 'new_user'}))
              });
            })
          };

                    var setInputWithRecaptchaResponseTokenForNewUser = function(id, token) {
            var element = document.getElementById(id);
            element.value = token;
          }

        