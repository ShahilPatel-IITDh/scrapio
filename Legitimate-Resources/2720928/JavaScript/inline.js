
        window.addEventListener('load', function () {
            
            var cookieconsent = initCookieConsent();
    
            cookieconsent.run({
                autorun: true,
                current_lang: 'en',
                theme_css: 'https://www.kjus.cz/components/com_w7cookies/assets/css/cookieconsent.css',
                autoclear_cookies: true,
                page_scripts: true,
                remove_cookie_tables: false,
                delay: 0,
                force_consent: false,
                gui_options: {
                    consent_modal: {
                        layout: 'cloud',
                        position: 'bottom center',
                        transition: 'slide',
                        swap_buttons: false
                    },
                    settings_modal: {
                        layout: 'box',
                        position: 'left',
                        transition: 'zoom'
                    }
                },
    
                onFirstAction: function(user_preferences, cookie){
                    
                    log.logConsent(cookie);
                },
    
                onAccept: function (cookie) {
                    
                },
    
                onChange: function (cookie, changed_preferences) {
                    
                    log.logConsent(cookie);
                },
    
                languages: {
                    en: {
                        consent_modal: {
                            title: 'Tento web využívá cookies',
                            description: 'Dobrý den, tyto webové stránky používají základní soubory cookie k zajištění svého správného fungování a sledovací soubory cookie k pochopení toho, jak s webem pracujete. Ty se nastavují pouze po schválení.',
                            primary_btn: {
                                text: 'Souhlasím',
                                role: 'accept_all'
                            },
                            secondary_btn: {
                                text: 'Nastavení',
                                role: 'settings'
                            }
                        },
                        settings_modal: {
                            title: 'Nastavení cookies',
                            save_settings_btn: 'Uložit nastavení',
                            accept_all_btn: 'Přijmout vše',
                            reject_all_btn: 'Odmítnout vše',
                            cookie_table_headers: [
                                {col1: 'Název'},
                                {col2: 'Doména'},
                                {col3: 'Expirace'},
                                {col4: 'Popis'},
                                {col5: 'Druh'}
                            ],
                            blocks: [
                                {
                                    title: 'Využití cookies',
                                    description: 'Soubory cookie používáme k zajištění základních funkcí webových stránek a ke zlepšení vašeho online zážitku. U každé kategorie si můžete zvolit, zda se chcete přihlásit nebo odhlásit, kdykoli budete chtít.'
                                }, 
                                {
                                    title: 'Nezbytně nutné cookies',
                                    description: 'Tyto soubory cookie jsou nezbytné pro správné fungování webových stránek. Bez těchto cookie souborů by webové stránky nefungovaly správně.',
                                    toggle: {
                                        value: 'necessary',
                                        enabled: true,
                                        readonly: true
                                    }
                                }, 
                                {
title: 'Statistické cookies',
description: 'Tyto soubory cookies nám umožňují počítat návštěvy a provoz, abychom měli přehled o tom, které stránky jsou nejoblíbenější a jak se na našem webu návštěvníci pohybují. Veškeré informace, které tyto soubory cookies shromažďují, jsou agregované, a tedy anonymní.',
toggle: {
value: 'analytics',
enabled:false,
readonly:false,
},
cookie_table: [
{
col1: '_ga',
col2: 'google.com',
col3: '2 years',
col4: 'Used to distinguish users.',
col5: 'persistent',
},
{
col1: '_gid',
col2: 'google.com',
col3: 'Session',
col4: 'Used to distinguish users.',
col5: 'session',
},
{
col1: '_gat',
col2: 'google.com',
col3: '1 minute	',
col4: 'Used to throttle request rate. If Google Analytics is deployed via Google Tag Manager, this cookie will be named _dc_gtm_<property- id>.',
col5: 'persistent',
},
{
col1: '_gcl_au',
col2: 'google.com',
col3: '2 years',
col4: 'Used to store and track conversions.',
col5: 'persistent',
},
{
col1: '__utma',
col2: 'google.com',
col3: '2 years from set/update',
col4: 'Used to distinguish users and sessions. The cookie is created when the javascript library executes and no existing __utma cookies exists. The cookie is updated every time data is sent to Google Analytics.',
col5: 'persistent',
},
{
col1: '__utmb',
col2: 'google.com',
col3: '30 mins from set/update',
col4: 'Used to determine new sessions/visits. The cookie is created when the javascript library executes and no existing __utmb cookies exists. The cookie is updated every time data is sent to Google Analytics.',
col5: 'persistent',
},
{
col1: '__utmc',
col2: 'google.com',
col3: 'End of browser session',
col4: 'Not used in ga.js. Set for interoperability with urchin.js. Historically, this cookie operated in conjunction with the __utmb cookie to determine whether the user was in a new session/visit.',
col5: 'persistent',
},
{
col1: '__utmv',
col2: 'google.com',
col3: '2 years from set/update',
col4: 'Used to store visitor-level custom variable data. This cookie is created when a developer uses the _setCustomVar method with a visitor level custom variable. This cookie was also used for the deprecated _setVar method. The cookie is updated every time data is sent to Google Analytics.',
col5: 'persistent',
},
{
col1: '__utmz',
col2: 'google.com',
col3: '6 months from set/update',
col4: 'Stores the traffic source or campaign that explains how the user reached your site. The cookie is created when the javascript library executes and is updated every time data is sent to Google Analytics.',
col5: 'persistent',
},
{
col1: '__utm.gif',
col2: 'google.com',
col3: 'Session',
col4: 'Used to store browser details.',
col5: 'session',
},
{
col1: 'rur',
col2: 'instagram.com',
col3: 'Session',
col4: 'This is an Instagram cookie that ensures functionality on Instagram.',
col5: 'session',
},
{
col1: 'urlgen',
col2: 'instagram.com',
col3: 'Session',
col4: 'This cookie is for Instagram’s marketing purposes.',
col5: 'session',
},
]
},
                                {
                                    title: 'Více informací',
                                    description: '<p>V případě jakýchkoli dotazů týkajících se našich zásad ohledně souborů cookie a Vašich voleb nás prosím kontaktujte.</p>',
                                }
                            ]
                        }
                    }
                }
            });
        });
        