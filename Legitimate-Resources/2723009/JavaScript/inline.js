
/*<![CDATA[*/
(function() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', '/api/v1/site/copyrights');
            xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xmlhttp.send();
            xmlhttp.onload = function (e) {
                try {
                        var code = JSON.parse(xmlhttp.response);
                        var wrapper = document.getElementById('seo_copyrights');
                        var range = document.createRange();
                        range.setStart(wrapper, 0);
                        wrapper.appendChild(range.createContextualFragment(code.data.copyright));
                } catch (error) {
                    console.info(error.name, error.message);
                }
            }
        })();
/*]]>*/
