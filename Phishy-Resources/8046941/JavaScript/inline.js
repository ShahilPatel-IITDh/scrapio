
            document.addEventListener('DOMContentLoaded', function(){
                const Http = new XMLHttpRequest();
                const url= '/publishedWebsite/createRestrictionHrefValue/b1q4a1';
                Http.open("POST", url);
                Http.send();
                Http.onload = (e) => {
                    document.querySelector('a.link-to-page').setAttribute("href", Http.responseText);
                }
            });
        