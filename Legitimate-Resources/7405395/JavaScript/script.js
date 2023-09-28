document.addEventListener("DOMContentLoaded", function(event) {
    function switchToCyber(e){
        var bio = document.querySelector('#bio_ep');
        var cyber = document.querySelector('#tpl-exit-intent-cyberghost');
        bio.innerHTML = cyber.innerHTML;
        window.bioEp.transformDefault = 'translateX(-50%) translateY(-50%)';
        expresslinks.map(function(el){
            el.removeEventListener('click', switchToCyber, false);
        })
        var popup_links = bio.querySelectorAll('a[href*="'+redirectKey+'"]');
        document.addEventListener('DOMContentLoaded', function(){
            if (getCookie('gclid') != null && typeof getCookie('gclid') != 'undefined') {
                addParemeterToHrefInTheLinksList(popup_links, function (h) {
                    var arrUrlData = QueryStringParse(h);
                    //arrUrlData.target = arrUrlData.target + "_gg"+getCookie('yclid');
                    return Object.getOwnPropertyNames(arrUrlData).map(function(k) { return [k, arrUrlData[k]].join('=') }).join('&');
                } );
            }
            if (getCookie('yclid') != null && typeof getCookie('yclid') != 'undefined') {
                addParemeterToHrefInTheLinksList(popup_links, function (h) {
                    var arrUrlData = QueryStringParse(h);
                    //arrUrlData.target = arrUrlData.target + "_gg"+getCookie('yclid');
                    return Object.getOwnPropertyNames(arrUrlData).map(function(k) { return [k, arrUrlData[k]].join('=') }).join('&');
                } );
            }
            if (getCookie('advParams') != null && typeof getCookie('advParams') != 'undefined') {
                addParemeterToHrefInTheLinksList(popup_links, function (h) {
                    var arrUrlData = QueryStringParse(h);
                    //arrUrlData.target = arrUrlData.target + "_gg"+getCookie('advParams');
                    return Object.getOwnPropertyNames(arrUrlData).map(function(k) { return [k, arrUrlData[k]].join('=') }).join('&');
                } );
            }

            if (getCookie('FullAdvParams') != null && typeof getCookie('FullAdvParams') != 'undefined') {
                addParemeterToHrefInTheLinksList(popup_links, function (h) {
                    return h + "&"+decodeURIComponent(getCookie('FullAdvParams'));
                } );
            }

            TrackingQueryString = function () {
                // This function is anonymous, is executed immediately and
                // the return value is assigned to QueryString!
                var query_string = {};
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                        // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                    query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                }
                return query_string;
            }();

        });
        popup_links.forEach(function(val){
            setLinkClickout(val, true);
        });
    }
    var expresslinks = Array.from( document.querySelectorAll('a') )
    .filter(function(el){
        var keep = false;
        if( 
            el.hasAttribute('onclick') 
            && el.getAttribute('onclick').indexOf('ExpressVPN') !== -1 
            && el.getAttribute('href').indexOf('1cb29f090eb94b3ae18b662be0bed58c') !== -1
            && !el.parentNode.classList.contains('popup-box')
            && !el.parentNode.classList.contains('popup-bottom')
            && el.parentNode.id != 'bio_ep'

        ){
            keep = true;
            el.addEventListener('click', switchToCyber, false);
        }
    
        return keep;
    });
    // if (expresslinks.length) {
    //     console.log('switch in progress', expresslinks);
    // }
    var lazyClassObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var popUP = entry.target;
                var imgs = popUP.querySelectorAll('img');
                imgs.forEach(function(img) {
                    if (img.dataset.src) {
                        img.setAttribute('src', img.dataset.src);
                        delete img.dataset.src;

                    }
                });

                // const cyberPopup = popUP.getElementsByClassName('cyberghost-popup');
                // if (cyberPopup.length > 0 && cyberPopup[0].getAttribute('data-vendor') === 'CyberGhost VPN') {
                //     const closeBtn = document.getElementById('bio_ep_close');
                //     if (closeBtn !== null && closeBtn.parentNode !== null) {
                //         closeBtn.parentNode.removeChild(closeBtn);
                //     }
                // }

                lazyClassObserver.unobserve(popUP);


            }
        });
    });

    var bioEp = document.querySelector('#bio_ep');

    if(bioEp !== null) {
        lazyClassObserver.observe(bioEp);    
    }
    

});