
   // $('.apps-icon a').click(function () {
//     dataLayer.push({
//         'event': 'footer',
//         'action': 'download app',
//         'label': $(this).attr('attr-appStore')
//     });
//     console.log('   --- *** Google Analytics Event: Download App | ' + $(this).attr('attr-appStore') + ' | ' + '');
// });

setTimeout(function () {
    document.querySelector('.main-button a').addEventListener('click', (e) => {
        dataLayer.push({
            'event': 'CTA_click',
            'action': e.target.getAttribute('attr-ctatext'),
            'label': ''
        });
    })


   document.querySelectorAll('.new-steps .offer-text-container span').forEach(function(item){
      item.addEventListener("click", function(e){
        dataLayer.push({
            'event': 'CTA_click',
            'action': 'join now',
            'label': ''
        });  
       });
   });





    if (document.querySelector('.acq-header-btn a')) {
        document.querySelector('.acq-header-btn a').addEventListener('click', (e) => {
            dataLayer.push({
                'event': 'Navigation',
                'action': 'ACQ Header CTA',
                'label': e.target.getAttribute('attr-ctatext') + '_Click'
            });
        })
    }

    if(document.querySelector(".why-us-icon") && document.querySelector(".why-us-popup-wrapper")) { 
           window.showWhyUsPopup('.why-us-icon', '.why-us-popup-wrapper', '.why-us-close') 
    }

    if(document.querySelector(".why-us-icon-mobile") && document.querySelector(".why-us-popup-wrapper")) { 
        window.showWhyUsPopup('.why-us-icon-mobile', '.why-us-popup-wrapper', '.why-us-close')
 }
}, 1000)


window.addEventListener('load', () => {
    // GA Events Steps - Numbers
    if (document.querySelector('.new-step-icon') != null) {
        document.querySelectorAll('.new-step-icon').forEach((item, index) => {
            item.parentNode.addEventListener('click', function(){
                dataLayer.push({
                    'event': "B2C_GENERIC_EVENT",
                    'CGP_EventCategory': "onboarding",
                    'CGP_EventAction': "CTAClick",
                    'CGP_EventLabel': String(index + 1)
                });  
            });
        });
    }
    // GA Events Steps - Arrows Mobile
    if (document.querySelector('.arrow.arrmobile') != null) {
        document.querySelectorAll('.arrow.arrmobile').forEach((item, index) => {
            item.parentNode.addEventListener('click', function(){
                dataLayer.push({
                    'event': "B2C_GENERIC_EVENT",
                    'CGP_EventCategory': "onboarding",
                    'CGP_EventAction': "CTAClick",
                    'CGP_EventLabel': String('arrow' + (index + 1))
                });  
            });
        });
    }
    // GA Events Steps - Arrows PC
    if (document.querySelector('#arrow1') != null) {
        document.querySelector('#arrow1').parentNode.addEventListener('click', function(){
            dataLayer.push({
                'event': "B2C_GENERIC_EVENT",
                'CGP_EventCategory': "onboarding",
                'CGP_EventAction': "CTAClick",
                'CGP_EventLabel': "arrow1"
            });  
        });
        document.querySelector('#arrow2').parentNode.addEventListener('click', function(){
            dataLayer.push({
                'event': "B2C_GENERIC_EVENT",
                'CGP_EventCategory': "onboarding",
                'CGP_EventAction': "CTAClick",
                'CGP_EventLabel': "arrow2"
            });  
        });
    }
});


/**************************************************************************** END - ACQ Pages Google Analytics ****************************************************************************/
// Removing the expandable T&Cs title when there are no expandable T&Cs content
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.toggle-link') != null) {
        if (document.querySelector('.toggle-container').children.length < 1) {
            document.querySelector('.toggle-link').style.display = 'none';
        }
    }
});

/* duplication from new_cgp_plugins_shell_init */
/*add sCut to href for external link*/
function addScutToHref(element) {
    let hash = "";
    let elHref = element.getAttribute('href')

    if (elHref.indexOf('#') != -1) {
        hash = elHref.substring(elHref.indexOf('#'));
        element.setAttribute('href', elHref.substring(0, elHref.indexOf('#')))
    }

    let finalHref = ((elHref.indexOf('sr=') == -1) ? elHref + '?' + sCut.queryStringEncoded() : elHref);
    element.setAttribute('href', finalHref + hash)
}

setTimeout(function () {
    // Display awards-logo only for .com
    if ((window.location.href.indexOf("888casino.com") !== -1 || (window.location.href.indexOf("ar.") !== -1 && window.location.href.indexOf("888") !== -1) || (window.location.href.indexOf("ru.") !== -1 && window.location.href.indexOf("888") !== -1)) && document.querySelector('.awards-img')) {
        document.querySelector('.awards-img').style.display = "inline-block";
    }

    // add class for large co branded logos to edit ofr mobile
    if (document.querySelector(".affiliate-logo img")) {
        var coBrandedLogo = document.querySelector(".affiliate-logo img");
        var logoWidth = coBrandedLogo.offsetWidth;
        logoWidth > 190 ? coBrandedLogo.classList.add("logo-large") : "";
    }
}, 1000);

function checkIfBrandIsEligible() {
    return window.subBrandID == 113 ||
        window.subBrandID == 46 ||
        window.subBrandID == 129 ||
        window.subBrandID == 137 ||
        window.subBrandID == 125 ||
        window.subBrandID == 141 ||
        window.subBrandID == 82 ||
        (window.subBrandID == 0 || window.subBrandID == 111) &&
        (rlCountry == "gbr" || rlCountry == "irl") &&
        rlLang == 'en' ?
        true :
        false
}

window.addEventListener('load', () => {
    if (document.querySelectorAll('.disclaimer')) {
        document.querySelectorAll('.disclaimer').forEach((item) => {
            checkIfBrandIsEligible() ? item.style.display = 'block' : ''
        })
    }
})

setTimeout(function() {
    if((document.querySelector(".why-us-icon")) || (document.querySelector(".why-us-icon-mobile"))){
        let ctaLabel = document.querySelector(".why-us-cta a").getAttribute('attr-ctatext');

        document.querySelector(".why-us-icon").addEventListener("click", function() {
              dataLayer.push({
               'event': 'B2C_GENERIC_EVENT',
                'CGP_EventCategory': 'Why_Us_Icon',
                'CGP_EventAction': "Show",
                'CGP_EventLabel': ctaLabel 
              });
        })

        document.querySelector(".why-us-icon-mobile").addEventListener("click", function() {
            dataLayer.push({
             'event': 'B2C_GENERIC_EVENT',
              'CGP_EventCategory': 'Why_Us_Icon',
              'CGP_EventAction': "Show",
              'CGP_EventLabel': ctaLabel 
            });
      })

        document.querySelector(".why-us-cta a").addEventListener("click", function() {
              dataLayer.push({
               'event': 'B2C_GENERIC_EVENT',
                'CGP_EventCategory': 'Why_Us_Icon',
                'CGP_EventAction': "Click",
                'CGP_EventLabel': ctaLabel 
              });
         })
    }



    if(typeof window.initButtons == 'function') window.initButtons()
}, 1000)

window.addEventListener('load', function() {
    if(typeof window.initButtons == 'function') window.initButtons()
})

window.addEventListener('load', function() {
    window.setTimeout(function () {
        if ( document.querySelector('.offer-text-container') != null ) {
            document.querySelectorAll('.offer-text-container').forEach(function(item){
                if ( item.id != '' ) {
                 if ( item.children.length == 3 ) {
                     item.getElementsByTagName('a')[1].style.bottom = 'auto';
                 }
                }
             })
        }
    },2000)
})
