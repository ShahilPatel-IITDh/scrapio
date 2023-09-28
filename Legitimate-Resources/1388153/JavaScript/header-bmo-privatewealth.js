(function() {
    /**
     *  Chinese toggle injection for Private Wealth pages.
     */
    const injectChineseLangToggles = function() {
        let { pathname } = window.location;
        
        console.log('injecting chinese language toggle');
        document.querySelectorAll('.language-toggle__nav > ul').forEach((languageToggleContainer) => {
            // Create <li>
            const li = document.createElement('li');
            li.setAttribute('class', 'language-toggle__country');
            // Create <span> for icon
            const spanIcon = document.createElement('span');
            Object.assign(spanIcon, {
                className: 'language-toggle__region-image',
                ariaHidden: true
            });
            // Create <span> for text
            const spanText = document.createElement('span');
            Object.assign(spanText, {
                className: 'size-text language-toggle__heading language-toggle__heading--region font-size-small',
                textContent: 'China'
            });
            // Create <img>
            const img = document.createElement('img');
            Object.entries({
                src: '/dist/images/flag/thumbnail/china.png',
                alt: 'China',
                'data-meta': 'mega-menu--primary-header--language-toggle-region-2--image'
            }).forEach(([key, value]) => {
                img.setAttribute(key, value);
            });
            // Add img to icon
            spanIcon.replaceChildren(img);
            // Append icon to <li>
            li.appendChild(spanIcon);
            // Append text to <li>
            li.appendChild(spanText);
            // Create <ul> for language toggle
            const ul = document.createElement('ul');
            Object.entries({
                class: 'no-bullet language-toggle__languages',
                'data-country': 'china'
            }).forEach(([key, value]) => {
                ul.setAttribute(key, value);
            });
            // Append <ul> to <li>
            li.appendChild(ul);
            // Append <li> to language toggle container
            languageToggleContainer.appendChild(li);
        });
        
        document.querySelectorAll('[data-country="china"]').forEach((chineseToggleContainer, index) => {
            // Create <a>
            const simplifyChineseLink = document.createElement('a');
            const traditionalChineseLink = document.createElement('a');
            
            // Handling French page
            if (document.documentElement.lang === 'fr') {
                pathname = (document.querySelector('link[hreflang="en"]') || document.querySelector('link[hreflang="en-CA" i]')).getAttribute('href');
            }

            // Initiate <a> properties
            Object.assign(simplifyChineseLink, {
                href: `https://www.zs.bmo.com${pathname}`,
                className: 'font-size--14',
                target: '_blank',
                hreflang: 'zh-hans',
                ariaLabel: document.documentElement.lang === 'en' ? 'simplify chinese language toggle, opens in a new tab' : 'simplifier le basculement de la langue chinoise, s\'ouvre dans un nouvel onglet',
                innerText: '简体中文'
            })
            simplifyChineseLink.setAttribute('data-meta', `mega-menu--primary-header--language-toggle-region-${index + 1}-toggle-1--link`)
            
            Object.assign(traditionalChineseLink, {
                href: `https://www.zh.bmo.com${pathname}`,
                className: 'font-size--14',
                target: '_blank',
                hreflang: 'zh-hant',
                ariaLabel: document.documentElement.lang === 'en' ? 'traditional chinese language toggle, opens in a new tab' : 'bascule de langue chinoise traditionnelle, s\'ouvre dans un nouvel onglet',
                innerText: '繁體中文'
            })
            traditionalChineseLink.setAttribute('data-meta', `mega-menu--primary-header--language-toggle-region-${index + 1}-toggle-2--link`)
            
            // Create <li>
            const simplifyChineseList = document.createElement('li')
            const traditionalChineseList = document.createElement('li')
            simplifyChineseList.classList.add('language-toggle__button', 'small-only-margin-bottom--half')
            traditionalChineseList.classList.add('language-toggle__button')

            // Append <a> to <li>
            simplifyChineseList.appendChild(simplifyChineseLink)
            traditionalChineseList.appendChild(traditionalChineseLink)

            // Replace <ul> children with <li>
            chineseToggleContainer.replaceChildren(simplifyChineseList, traditionalChineseList);
        });
    };

    const motionPointLangToggles = function() {
        /**
         * Note: Our header.js language toggling logic breaks on MotionPoint's pages. This is to address that.
         */
        const lang = document.documentElement.lang.toLowerCase();
        const isAbsoluteURL = new RegExp('^(?:[a-z]+:)?//', 'i'); // Regular expression to test absolute vs relative URLs.

        if (lang === 'zh-hant' || lang === 'zh-hans') {
            window.alternatePages.forEach(page =>{
                document.querySelectorAll(`a[hreflang="${page.lang.toLowerCase()}"]`).forEach(a => {
                    a.href = isAbsoluteURL.test(page.url) ? page.url : `https://www.bmo.com${page.url}`;
                });
            });

            // Remove English toggle active state since you are on a Chinese page.
            document.querySelector('[data-country="canada"] .language-toggle__button_active').classList.add('language-toggle__button');
            document.querySelector('[data-country="canada"] .language-toggle__button_active').classList.remove('language-toggle__button_active');
        
            // Apply active state to the appropriate Chinese language button
            document.querySelectorAll(`a[hreflang="${lang}"]`).forEach(a => {
                a.parentNode.classList.add('language-toggle__button_active')
            });

            // Get rid off zs and zh in the English toggle URL.
            document.querySelectorAll(`a[hreflang="en-ca"]`).forEach(a => {
                a.href = a.href.replace(/.zs.|.zh./g, '.');
            });
        }

        // Change prop14 language property (analytic)
        try {
            window.BMOINFO.language = (lang === 'zh-hant' ? 'zh' : 'zs');
        } catch(e) {
            console.log(e);
        }
    }
    window.addEventListener("load", injectChineseLangToggles);
    window.addEventListener("load", motionPointLangToggles);
})();