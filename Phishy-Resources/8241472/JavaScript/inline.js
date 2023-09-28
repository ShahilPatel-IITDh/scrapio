
            document.addEventListener('DOMContentLoaded', function(){
                const Http = new XMLHttpRequest();
                const url= '/publishedWebsite/createRestrictionHrefValue/s0ulbf';
                Http.open("POST", url);
                Http.send();
                Http.onload = (e) => {
                    document.querySelector('a.link-to-page').setAttribute("href", Http.responseText);
                }
            });
        