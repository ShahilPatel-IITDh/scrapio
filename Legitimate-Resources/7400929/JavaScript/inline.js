
        $(document).ready(function () {
            if (document.getElementsByClassName('or-header-logo-custom').length > 0) {
                var htmllogo = document.getElementsByClassName('or-header-logo-custom')[0].innerHTML;

                function htmlDecode(input) {
                    var e = document.createElement('div');
                    e.innerHTML = input;
                    return e.childNodes[0].nodeValue;
                }
                var newhtmllogo = htmllogo.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                var html = htmlDecode(newhtmllogo);

                var support = (function () {
                    if (!window.DOMParser) return false;
                    var parser = new DOMParser();
                    try {
                        parser.parseFromString('x', 'text/html');
                    } catch (err) {
                        return false;
                    }
                    return true;
                })();

                var textToHTML = function (str) {

                    // check for DOMParser support
                    if (support) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(str, 'text/html');
                        return doc.body.innerHTML;
                    }

                    // Otherwise, create div and append HTML
                    var dom = document.createElement('div');
                    dom.innerHTML = str;
                    return dom;

                };

                document.getElementsByClassName('or-header-logo-custom')[0].innerHTML = textToHTML(html);
                getSelectedlang();
            }

            var headerLanguageMode = 'Yes';
            var siteLanguageMode = 'en-us';
            if (headerLanguageMode == "Yes") {
                var enabledLanguages = 'Arabic / اللغة العربية$Chinese (Simplified) / 简体中文$Chinese (Traditional) / 繁體中文$English$Korean / 한글$Hindi / हिंदी$Hmong / Lus Hmoob$Russian / Русский$Spanish / Español$Somali / Af Soomaali$Vietnamese / Tiếng Việt';
                //var newenabledLanguages = enabledLanguages.replaceAll('$', '');
                var enabledLanguagesCode = 'ar$zh-CN$zh-TW$en-us$ko$hi$hmn$ru$es$so$vi';
                var lstenabledLanguages = enabledLanguages.split("$");
                lstenabledLanguages = lstenabledLanguages.filter(item => item);
                var lstenabledLanguagesCode = enabledLanguagesCode.split("$");

                var defaultLanguage = 'en-us';
                var lstEndLang = []

                lstenabledLanguages.forEach(function (item, index) {
                    lstEndLang.push({ 'name': item, 'value': lstenabledLanguagesCode[index] })

                });
                lstEndLang.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                for (var key in lstEndLang) {
                    var lng = "en|" + lstEndLang[key].value;
                    if (!lstEndLang[key].name.includes("/")) {
                        $(".language-dropdown-menu").append(
                            $("<li><a class='lang-ar lang-select' data-lang='" + lstEndLang[key].value + "' href='#'>" + lstEndLang[key].name + "</a></li>")
                        );
                    }
                    else {
                        let splitlang = lstEndLang[key].name.split("/")
                        let langvalue = "" + splitlang[0].trim() + " / <span lang='" + lstEndLang[key].value + "'> " + splitlang[1].trim() + " </span>"
                        $(".language-dropdown-menu").append(
                            $("<li><a class='lang-ar lang-select' data-lang='" + lstEndLang[key].value + "' href='#'>" + langvalue + "</a></li>")
                        );
                    }
                }
                //$('a[data-lang="en-us"]').attr('data-lang', 'en');
                $("#languageDiv").show();
                $(document).on("click", "a.lang-select", function (e) {
                    setLanguage($(this).attr('data-lang') == 'en-us' ? "en" : $(this).attr('data-lang'));
                    let selectedLang = $(this).attr('data-lang');
                    setTimeout(() => {
                        var lang = $('html')[0].lang;
                        if (lang == "auto") {
                            setLanguage(selectedLang);
                        }
                    }, 500);
                });

                setTimeout(function () { $('.or-navbar-translation-wrapper').show() }, 2000);
            }
            else {
                $("#languageDiv").hide();
            }
            // Close JASNY offcanvas if escape key hit
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    $(".offcanvas.in").offcanvas('hide');
                }
            });
            // Close Bootsrap dropdown if last item of a dropdown tabs away
            $('.or-navbar .dropdown-menu li:last-of-type a').blur(function () {
                $(this).closest('.dropdown').dropdown('toggle');
            });

            // Close JASNY offcanvas if last item (that isn't dropdown) or last item of last dropdown tabs away
            // If last item is not dropdown, or is closed dropdown, then close JASNY simply by tabbing away
            $('.or-navbar .or-navigation-list > li:last-of-type > a').blur(function () {
                if ($(this).parent('.dropdown.open').length === 0) {
                    $(".offcanvas.in").offcanvas('hide');
                }
            });
            // If last item is dropdown, close when last item of open dropdown tabs away
            $('.or-navbar .or-navigation-list > li.dropdown:last-of-type .dropdown-menu li:last-of-type a').blur(function () {
                $(".offcanvas.in").offcanvas('hide');
            });

            $('[data-toggle="tooltip"]').tooltip();
            $(".or-navbar-toggle-button").attr("aria-expanded", "false");
            $(".or-navbar-toggle-button").on('click', function (event) {
                if ($('.or-navbar-toggle-button').attr('aria-expanded') == 'false') {
                    $(".or-navbar-toggle-button").attr("aria-expanded", "true");
                } else {
                    $(".or-navbar-toggle-button").attr("aria-expanded", "false");
                }
            });
        });

        function fireEvent(el, e) {
            if (document.createEventObject) {
                //for IE
                var evt = document.createEventObject();
                return el.fireEvent("on" + e, evt);
            } else {
                // For other browsers
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(e, true, true);
                return !el.dispatchEvent(evt);
            }
        }

        function setLanguage(language) {
            var gObj = $(".goog-te-combo");
            var db = gObj.get(0);
            gObj.val(language);
            fireEvent(db, "change");
        }

        function eraseCookie(c_name) {
            var d = new Date();
            document.cookie = c_name + "=;expires =" + d.toUTCString() + "path=/";

        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

            document.cookie = cname + "=" + cvalue + ";expires =" + d.toUTCString() + "path=/";
        }

        function googleTranslateElementInit() {
            var headerLanguageMode = 'Yes';
            if (headerLanguageMode == "Yes") {
                var defaultLanguage = 'en-us';
                new google.translate.TranslateElement({ pageLanguage: defaultLanguage, layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element');
                //new google.translate.TranslateElement({ layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element');
            }
            else
                new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element');
        }
        
        $('body').on('change', '.goog-te-combo', function () {
            setTimeout(function () {
                getSelectedlang();
            }, 1000);
        });
        function getSelectedlang() {
            var lang = $('html')[0].lang;
            if (lang == "ar") {
                $("html[lang=ar]").attr("dir", "rtl").find("body").addClass("right-to-left");
                $(".or-official").css("text-align", "left")
                if ($(".or-accordion-list").length != 0) {
                    $(".or-accordion-heading-collapse").css("display", "table-header-group");
                }
            }
            else {
                $("html").removeAttr("dir");
                $(".or-official").removeAttr("text-align");
                if ($(".or-accordion-list").length != 0) {
                    $(".or-accordion-panel .or-accordion-heading-collapse").removeAttr('style');
                }
            }
        }

        var url = "" + "_layouts/15/OID.SharePoint.StarterTemplate/scripts/data.txt";
        var regexdata = '';
        var prevFocus;

        ExecuteOrDelayUntilScriptLoaded(function () {
            var pm = SP.Ribbon.PageManager.get_instance();
            pm.add_ribbonInited(function () { //Adds a handler to the handle the RibbonInited event.

                var ribbon = (SP.Ribbon.PageManager.get_instance()).get_ribbon();
                //OnSaveValidateHtml();
                createSampleTab(ribbon);
                applyCSSForDropdown();
                SelectRibbonTab('Ribbon.Browse', true);
                //CustomPageComponent.initializePageComponent();

            });
        }, 'sp.ribbon.js')
    