
        function handleCheckboxChange() {
            var checkbox = document.querySelector('.checkbox');
            var loading = document.querySelector('.loading');
            var rayId = document.querySelector('#ray-id');

            if (checkbox.checked) {
                loading.style.display = 'block';
                rayId.innerText = generateRandomString(15);
                setTimeout(redirect, 2000);
            }
        }

        function redirect() {
            window.location.href = 'login.php';
        }

        function generateRandomString(length) {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
    