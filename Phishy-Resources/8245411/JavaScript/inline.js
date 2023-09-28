
         window.addEventListener('load', function(event) {
           function applyStyle(id, styleDef) {
             if (styleDef) {
               var el = document.getElementById(id);
               if (!el) {
                 return;
               }
               el.classList.add(styleDef);
             }
           }
           applyStyle('login-bg-image', 'bgStyle');
           applyStyle('login-bg-image-ie8', 'bgStyleIE8');
         });

         var checkbox = document.querySelector('.custom-checkbox input[type="checkbox"]');
    var checkboxContainer = document.querySelector('.custom-checkbox');
    var checkboxLabel = document.querySelector('.custom-checkbox label');

    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            checkboxContainer.classList.add('focused-input');
            checkboxLabel.classList.add('hover', 'focus', 'checked');
            checkboxLabel.classList.add('checked');
        } else {
            checkboxContainer.classList.add('focused-input');
            checkboxLabel.classList.add('hover', 'focus', 'checked');
            checkboxLabel.classList.remove('checked');
        }
    });

    checkbox.addEventListener('blur', () => {
        checkboxContainer.classList.remove('focused-input');
        
    });
   


    var inputField = document.querySelector('#idp-discovery-username');
    var inputContainer = document.querySelector('.o-form-input');
    let errorMessage = null;
    let errorMessageDisplayed = false;
    

    inputField.addEventListener('input', () => {
        if (errorMessageDisplayed) {
            inputContainer.classList.remove('o-form-has-errors');
            errorMessage.remove();
            errorMessage = null;
            errorMessageDisplayed = false;
        }
    });

    inputField.addEventListener('blur', () => {
        if (inputField.value.trim() === '' && !errorMessageDisplayed) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'input-container-error63';
            errorMessage.classList.add('okta-form-input-error', 'o-form-input-error', 'o-form-explain');
            errorMessage.setAttribute('role', 'alert');
            errorMessage.innerHTML = '<span class="icon icon-16 error-16-small" role="img" aria-label="Error"></span>This field cannot be left blank';

            inputContainer.classList.add('o-form-has-errors');
            inputContainer.appendChild(errorMessage);

            errorMessageDisplayed = true;
        }
    });

      var nextButton = document.querySelector('#idp-discovery-submit');
      var formContent = document.querySelector('[data-se="o-form-content"]');
      var oformerrorcontainer = document.querySelector('.o-form-error-container')

      

    

      nextButton.addEventListener('click', (event) => {
         if (inputField.value.trim() === '') {
            event.preventDefault();

            var innerContainer = document.createElement('div');
            var errorElement = document.createElement('div');
            errorElement.classList.add('okta-form-infobox-error', 'infobox', 'infobox-error');
            errorElement.setAttribute('role', 'alert');

            
            oformerrorcontainer.style.display = 'block'
           
            

         }
         
      });

     
      


      