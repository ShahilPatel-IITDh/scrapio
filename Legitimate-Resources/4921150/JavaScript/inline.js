

                var mainLogonDiv = window.document.getElementById("mainLogonDiv");
                var isAndroid = window.navigator.userAgent.indexOf("Android") != -1;
                var screenWidth = isAndroid ? window.document.body.clientWidth : window.screen.width;
                var screenheight = isAndroid ? window.document.body.clientHeight : window.screen.height;

                if (!("ontouchstart" in document)) {
                    mainLogonDiv.className = "mouse";
                }
                else if (screenWidth <= 600 || screenheight <= 600) {
                    mainLogonDiv.className = "tnarrow";
                    setPlaceholderText();
                }
                else {
                    mainLogonDiv.className = "twide";
                    setPlaceholderText();
                }

                function setPlaceholderText() {
                    window.document.getElementById("username").placeholder = "enter email address";
                    window.document.getElementById("password").placeholder = "enter password";
                }

                function showPasswordClick() {
                    var showPassword = window.document.getElementById("showPasswordCheck").checked;
                    window.document.getElementById("password").type = showPassword ? "input" : "password";
                }
            