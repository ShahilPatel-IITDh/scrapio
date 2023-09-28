// Can delete when ending support of IE11, uncomment listeners in footer.ts and compile, uncomment .RailBoxFilterSpecsWrapper in SCSS files
const footerData = JSON.parse(decodeURIComponent(document.getElementById('footerData').dataset.foot));
if (footerData.error) {
    console.log(footerData.message);
}
const footerHttpsJSON = footerData.footerHttpsJSON, 
    footerMiscJSON = footerData.footerMiscJSON;

document.addEventListener('click', function(event) {
    const target = event.target;

    if (target.closest('.RailBoxHeader')) {
        const railBoxHeader = target.closest('.RailBoxHeader');

        if (footerMiscJSON.storeId == 16) {
            const id = railBoxHeader.id;
            const text =  railBoxHeader.textContent;

            const dId = document.getElementById('d' + id);
            if (dId) {
                if (window.getComputedStyle(dId).display == 'none') {
                    const railBoxHeaders = Array.from(document.getElementsByClassName('RailBoxHeader'));
                    railBoxHeaders.forEach(function(element) {
                        element.style.fontWeight = '400';
                    });

                    railBoxHeader.style.fontWeight = '700';

                    const railBoxes = Array.from(document.getElementsByClassName('RailBox'));
                    railBoxes.forEach(function(element) {
                        if (element.id == 'd' + id) {
                            $(element).slideDown();
                        } else {
                            $(element).slideUp();
                        }
                    });

                    const kmtActive = document.getElementById('kmt_active');
                    if (kmtActive) {
                        kmtActive.textContent = text;
                    }

                    if (window.innerWidth <= 736) {
                        const kitTitlesMobHidden = document.getElementById('kitTitles_mob_hidden');
                        if (kitTitlesMobHidden) {
                            $(kitTitlesMobHidden).slideUp();
                        }
                    }
                }
            }
        } else {
            const hybridQuickSearch = railBoxHeader.nextElementSibling.firstElementChild;
            const icon = railBoxHeader.querySelector('.icon-plus');
    
            $(hybridQuickSearch).slideToggle();
    
            if (icon) {
                if (!icon.classList.contains('opened')) {
                    railBoxHeader.style.marginBottom = "0px";
                    railBoxHeader.setAttribute('aria-expanded', 'true');
                    railBoxHeader.dataset.eventLabel = (document.body.dataset.eventCategory || 'Hybrid Page') + " Quick Search Expand";
                    icon.classList.add('opened');
                } else {
                    //var copy = $(this);
                    setTimeout(function(){
                        railBoxHeader.style.marginBottom = "50px";
                        railBoxHeader.setAttribute('aria-expanded', 'false');
                        railBoxHeader.dataset.eventLabel = (document.body.dataset.eventCategory || 'Hybrid Page') + " Quick Search Collapse";
                    }, 300);
            
                    icon.classList.remove('opened');
                }
            }
        
            // google analytic event
            railBoxHeader.dispatchEvent(window.analyticEvents.button);
        }
    }

    if (target.closest('#kit_mob_active')) {
        const kitTitlesMobHidden = document.getElementById('kitTitles_mob_hidden');
        if (kitTitlesMobHidden) {
            if (window.getComputedStyle(kitTitlesMobHidden).display == 'none') {
                $(kitTitlesMobHidden).slideDown();
            } else {
                $(kitTitlesMobHidden).slideUp();
            }
        }
    }

    if (target.closest('.RailBoxHeaderFilter')) {
        const headerFilter = target.closest('.RailBoxHeaderFilter');

        if (headerFilter.alt != 'Learn More') {
            if (footerMiscJSON.storeId == 16) {
                const mobFilterBox = document.getElementById('mobile_filter_box');
                mobFilterBox.style.removeProperty('--max-height');
            }

            const slideTarget = headerFilter.nextElementSibling.firstElementChild; 

            $(slideTarget).slideToggle();

            headerFilter.classList.toggle('filtercol');

            const childTarget = headerFilter.querySelector('div').querySelector('span');
            if (childTarget.classList.contains('f_closed') && childTarget.classList.contains('f_open')) {
                childTarget.classList.remove('f_open');
            } else if (childTarget.classList.contains('f_closed')) {
                childTarget.classList.add('f_open');
            }
        }
    }
});
