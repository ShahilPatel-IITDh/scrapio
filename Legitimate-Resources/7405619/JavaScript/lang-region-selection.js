var Lang = (function () {

    var _SiteLocation = {
        Home_Page: 0,
        Login_Page: 1,
        EverywhereElse: 2
    }

    var Settings = {
        selectedLanguage: '',
        selectedRegion: '',
        currentLanguage: '',
        currentRegion: '',
        sub: '',
        env: '',
        domain: '',
        type: ''
    };

    var init = function () {

        // Read Selected Language and Region From Cookie
        var code = readCookie('language');
        if (code) {
            Settings.selectedLanguage = code.split("-")[0];
            Settings.selectedRegion = code.split("-")[1];
        }
        if (Settings.selectedLanguage == 'en') { Settings.selectedLanguage = ''; }


        // Current URL /Domains
        var full = window.location.host;        //window.location.host is subdomain.domain.com
        var parts = full.split('.');
        Settings.sub = parts[0];
        Settings.domain = parts[1];
        Settings.type = parts[2];

        // Discover Current Language
        if (hasNoLangauge(Settings)) {
            Settings.currentLanguage = ''
            Settings.env = Settings.sub;
        } else {
            Settings.currentLanguage = Settings.sub.split("-")[0];
            Settings.env = Settings.sub.split("-")[1]
        }

        // Discover Current Language
        var path = window.location.pathname;
        var region = path.split("/")[1]
        switch (region.toLowerCase()) {
            case 'apac':
            case 'uk':
            case 'za':
            case 'in':
                Settings.currentRegion = region;
                break;
            default:
                Settings.currentRegion = '';
                break;
        }

        // If Current Language and Region is Not the Selected then Redirect
        var doRedirect = false;
        if (Settings) {
            if (Settings.selectedLanguage) {
                //if langauge is different
                if (Settings.currentLanguage.indexOf(Settings.selectedLanguage) == -1) { doRedirect = true; }
            }
            if (Settings.selectedRegion) {
                //If region is different
                if (Settings.selectedRegion !== Settings.currentRegion) {
                    // If Root Need to redirect to proper region
                    if (window.location.pathname.split('/').length == 2) {  // Global Root
                        if ((window.location.pathname.split('/')[1]).length == 0) {
                            doRedirect = true;
                        }
                    } else if (window.location.pathname.split('/').length == 3) {   // Other Region Root
                        if ((window.location.pathname.split('/')[2]).length == 0 && Settings.currentRegion) {
                            doRedirect = true;
                        }
                    }
                }
            }
            if (doRedirect == true) { doLanguageRedirect(Settings); }
        }

        // Update page to display selected language/region code
        if (code != "") {
            $(".languageChosen").html("You have selected the following language code: " + code);
        }

    };

    function Get_Site_Location() {

        pathname = window.location.pathname;

        switch (pathname.toUpperCase()) {
            case '/JP/':
            case '/APAC/':
            case '/IN/':
            case '/ZA/':
            case '/UK/':
            case '/':
            case '':
                //we are on the home page
                //alert('switch language on home page');
                return _SiteLocation.Home_Page;
                break;

            case '/HOME.ASPX':
                // switch language on login page
                //alert('switch language on login page');
                return _SiteLocation.Login_Page;
                break;

            default:
                // switch language on other pages
                //alert('switch language on other pages (' + pathname.toUpperCase() + ' )');
                return _SiteLocation.EverywhereElse
                break;

        }
    }


    // Returns true if sub domain does NOT have a language 
    var hasNoLangauge = function () {
        return (
            (Settings.sub.indexOf('-') == -1 || Settings.sub == 'www')
            && Settings.sub != 'tr'
            && Settings.sub != 'es'
            && Settings.sub != 'fr'
            && Settings.sub != 'de'
            && Settings.sub != 'zh'
            && Settings.sub != 'zs'
            && Settings.sub != 'ja'
            && Settings.sub != 'pt');
    };

    // Redirect to Selected Language
    var doLanguageRedirect = function () {

        // If region changed redirect to home page of selected region
        if (!Settings.selectedRegion) {
            Settings.selectedRegion = '';
        }




        // switch language on home page
        // switch language on login page
        // switch language on other pages

        pathname = window.location.pathname;

        //if (Settings.currentLanguage == Settings.selectedLanguage){
        //    //the user IS NOT switching languages
        //    pathname = window.location.pathname;
        //}else{
        //    //the user IS switching languages
        //    switch (Settings.selectedLanguage) {
        //        case 'en-APAC':
        //        case 'en-IN':
        //        case 'en-ZA':
        //        case 'en-UK':
        //            switch (Get_Site_Location()) {
        //                case _SiteLocation.Home_Page:
        //                    pathname = '';
        //                    break;
        //                case _SiteLocation.Login_Page:
        //                    pathname = '';
        //                    break;
        //                case _SiteLocation.EverywhereElse:
        //                    pathname = '';
        //                    break;
        //            }
        //            break;
        //        case 'ja':
        //            pathname = window.location.pathname;
        //            //switch (Get_Site_Location()) {
        //            //    case _SiteLocation.Home_Page:
        //            //        pathname = '';
        //            //        break;
        //            //    case _SiteLocation.Login_Page:
        //            //        pathname = '';
        //            //        break;
        //            //    case _SiteLocation.EverywhereElse:
        //            //        pathname = '';
        //            //        break;
        //            //}
        //            break;
        //        default:
        //            pathname = window.location.pathname;
        //            //switch (Get_Site_Location()) {
        //            //    case _SiteLocation.Home_Page:
        //            //        pathname = '';
        //            //        break;
        //            //    case _SiteLocation.Login_Page:
        //            //        pathname = '';
        //            //        break;
        //            //    case _SiteLocation.EverywhereElse:
        //            //        pathname = '';
        //            //        break;
        //            //}
        //            break;
        //    }// end switch (Settings.selectedLanguage)
        //}

        //if (Settings.selectedRegion == Settings.currentRegion) {
        //    if (Settings.selectedLanguage == "en-APAC" || Settings.selectedLanguage == 'en-IN' || Settings.selectedLanguage == 'en-ZA' || Settings.selectedLanguage == 'en-UK') {
        //        pathname = window.location.pathname;
        //    } else {
        //        pathname = window.location.pathname;
        //    }
        //} else {
        //    if (Settings.selectedLanguage == "en-APAC" || Settings.selectedLanguage == 'en-IN' || Settings.selectedLanguage == 'en-ZA' || Settings.selectedLanguage == 'en-UK') {
        //        pathname = '/' + Settings.selectedRegion;
        //    } else {
        //        alert('clearing path');
        //        pathnanme = "";
        //    }
        //}

        //if (Settings.selectedLanguage == "ja") {
        //    if (pathname == '/')
        //        pathname = '/JP';
        //}

        // If Selected Language is "en" then set it to ""
        if (Settings.selectedLanguage == 'en') {
            Settings.selectedLanguage = '';
        }

        // Update Redirect Path
        var newPath = ''

        //alert('Settings.currentRegion: ' + Settings.currentRegion + '\nSettings.currentLanguage: ' + Settings.currentLanguage + '\n\nSettings.selectedRegion: ' + Settings.selectedRegion + '\nSettings.selectedLanguage: ' + Settings.selectedLanguage + '\n\nwindow.location.pathname: ' + window.location.pathname);


        if (Settings.selectedRegion) {
            switch (Settings.selectedRegion.toLowerCase()) {
                case 'apac':
                case 'uk':
                case 'za':
                case 'in':
                case 'ja':
                    pathname = '/' + Settings.selectedRegion;
                    break;

                default:
                    pathname = '';
                    break;
            }
        } else {
            pathname = '';
            if ((Settings.currentLanguage != Settings.selectedLanguage) && (Settings.selectedLanguage.toLowerCase() == 'ja')) {
                //we are switching TO Japanese, so switch into the JP folder
                pathname = '/JP/';
            }

        }

        newPath = getRedirectPath(pathname);
        window.location = newPath;

    };

    var getRedirectPath = function (pathname) {
        var protocol = window.location.protocol;
        //alert('Settings.env: ' + Settings.env + '\nSettings.selectedLanguage: ' + Settings.selectedLanguage + '\npathname: ' + pathname)

        if (Settings.env && Settings.selectedLanguage) {
            newPath = protocol + "//"
                + Settings.selectedLanguage + "-"
                + Settings.env + "."
                + Settings.domain + "."
                + Settings.type
                + pathname;
        } else if (Settings.env) {
            newPath = protocol + "//"
                + Settings.env + "."
                + Settings.domain + "."
                + Settings.type
                + pathname;
        } else {
            newPath = protocol + "//"
                + Settings.selectedLanguage + "."
                + Settings.domain + "."
                + Settings.type
                + pathname;
        }

        // Fix Production Subdomain.
        newPath = newPath.replace('://.confirmation', '://www.confirmation');
        newPath = newPath.replace('-www.', '.');
        return newPath;
    };

    // Select a language
    var selectLanguage = function (tElement) {
        var lang = ($(tElement).attr('id'));
        if (lang) {
            window.status = lang;
            //alert('lang=' + lang);

            createCookie('language', lang, 365);
            Settings.selectedLanguage = lang.split("-")[0];
            Settings.selectedRegion = lang.split("-")[1];

            doLanguageRedirect();
        }
    };

    // Get current language
    var getCurrentLang = function () {
        return Settings.currentLanguage;
    };

    // Create Cookie (across subdomains)
    var createCookie = function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + ";domain=.confirmation.com;path=/";
    }

    // Read Cookie (across subdomains)
    var readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    // Erase Cookie (across subdomains)
    var eraseCookie = function (name) {
        createCookie(name, "", -1);
    }

    // Return Public Functions
    return {
        init: init,
        selectLanguage: selectLanguage,
        getCurrentLang: getCurrentLang
    };

})();

$(document).ready(function () {
    Lang.init();


    //this block of code creates a startsWith function because as of IE 11 microsoft deprecated that function - it is only used inside this ready block.
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //                           REWRITE VARIOUS ITEMS ON SITE START                                //
    //  This block of code rewrites various items on the site since Umbraco appears to be double    //
    //  encoding the characters.                                                                    //
    //////////////////////////////////////////////////////////////////////////////////////////////////

    //alert(window.location.pathname.toUpperCase());
    if (window.location.pathname.toUpperCase().startsWith("/JP/")) {

        ////header   Settings/Partial Views/umbTopNavigation
        //document.getElementById("lnk_Login").innerHTML = "ログイン";
        //document.getElementById("lnk_Signup").innerHTML = "ご登録";
        //document.getElementById("lnk_SelectLanguage").innerHTML = "地域/表示言語";


        ////footer  Settings/Partial Views/umbFooter
        //document.getElementById("div_news_scroller_caption").innerHTML = "ニュース";
        //document.getElementById("div_stay_in_touch").innerHTML = "メール配信登録";
        //document.getElementById("p_receive_emails_about_new_third").innerHTML = "新しい第三者の確認回答者や製品などに関する情報をEメールでお知らせします。";
        //document.getElementById("emailRegister").placeholder = "Eメールアドレス";
        //document.getElementById("btn_stay_in_touch_submit").value = "送信";

        ////very bottom of all pages     Settings/Templates/Layout
        //document.getElementById("lnk_footer_user_agreement").innerHTML = "ご利用規約";
        //document.getElementById("lnk_footer_privacy_policy").innerHTML = "プライバシーポリシー";
        //document.getElementById("lnk_footer_language_selector").innerHTML = "地域 / 言語";

        ////How-to Resources    Settings/Templates/Layout/News Overview
        //document.getElementById("div_how_to_resources_most_popular_articles").innerHTML = "よく読まれている記事";
        //document.getElementById("div_how_to_resources_how_to_resources").innerHTML = "よくあるご質問と回答";

        ////How-to Resources    Settings/Partial Views/div_genericPageRightColumn
        //document.getElementById("div_genericPageRightColumn_STAY_IN_TOUCH").innerHTML = "メール配信登録";
        //document.getElementById("emailRegisterRightColumn").placeholder = "Eメールアドレス";
        //document.getElementById("btn_genericPageRightColumn_submit").value = "送信";

        ////How-to Resources    Settings/Partial Views/latestOnTwitter
        //document.getElementById("div_Partial_Views_latestOnTwitter").innerHTML = "Twitterの最新ツイート";
        //document.getElementById("lnk_Partial_Views_latestOnTwitter_twittertag").innerHTML = "確認";

        //// Settings/Templates/Layout/News Overview
        //document.getElementById("lnk_templates_layout_news_overview_read_more").innerHTML = "続きを読む";


        //document.getElementById("div_content_global_about_chris_schellhorn_view_profile").innerHTML = "プロフィールを見る";
        //document.getElementById("div_content_global_about_chris_schellhorn_close_profile").innerHTML = "プロフィールを閉じる";







        //header   Settings/Partial Views/umbTopNavigation
        set_control_innerHTML("lnk_Login", "ログイン");
        set_control_innerHTML("lnk_Signup", "ご登録");
        set_control_innerHTML("lnk_SelectLanguage", "地域/表示言語");


        //footer  Settings/Partial Views/umbFooter
        set_control_innerHTML("div_news_scroller_caption", "ニュース");
        set_control_innerHTML("div_stay_in_touch", "メール配信登録");
        set_control_innerHTML("p_receive_emails_about_new_third", "新しい第三者の確認回答者や製品などに関する情報をEメールでお知らせします。");
        set_control_placeholder("emailRegister", "Eメールアドレス");
        set_control_value("btn_stay_in_touch_submit", "送信");
        set_control_innerHTML("btn_stay_in_touch_submit", "送信");

        //very bottom of all pages     Settings/Templates/Layout
        set_control_innerHTML("lnk_footer_user_agreement", "ご利用規約");
        set_control_innerHTML("lnk_footer_privacy_policy", "プライバシーポリシー");
        set_control_innerHTML("lnk_footer_language_selector", "地域 / 言語");

        //How-to Resources    Settings/Templates/Layout/News Overview
        set_control_innerHTML("div_how_to_resources_most_popular_articles", "よく読まれている記事");
        set_control_innerHTML("div_how_to_resources_how_to_resources", "よくあるご質問と回答");

        //How-to Resources    Settings/Partial Views/div_genericPageRightColumn
        set_control_innerHTML("div_genericPageRightColumn_STAY_IN_TOUCH", "メール配信登録");
        set_control_placeholder("emailRegisterRightColumn", "Eメールアドレス");
        set_control_value("btn_genericPageRightColumn_submit", "送信");

        //How-to Resources    Settings/Partial Views/latestOnTwitter
        set_control_innerHTML("div_Partial_Views_latestOnTwitter", "Twitterの最新ツイート");
        set_control_innerHTML("lnk_Partial_Views_latestOnTwitter_twittertag", "確認");

        // Settings/Templates/Layout/News Overview
        set_control_innerHTML("lnk_templates_layout_news_overview_read_more", "続きを読む");


        set_control_innerHTML("div_content_global_about_chris_schellhorn_view_profile", "プロフィールを見る");
        set_control_innerHTML("div_content_global_about_chris_schellhorn_close_profile", "プロフィールを閉じる");



        // there are some pages that have an iFrame on them that point to index.aspx
        // since we have framebreaker scripts this causes a non-stop reload problem
        // by placing any other value in the src field the framebreaker won't force the reload

        //if (window.location.pathname.toUpperCase().startsWith("/JP/%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88/INDEX.ASPX")) { //<"/JP/サポート/INDEX.ASPX")) {

        try {
            var src = document.getElementById("videoModal").childNodes[1].childNodes[1].childNodes[1].childNodes[1].attributes[0];
            if (src != undefined) {
                if (src.value = "index.aspx")
                    src.value = "favicon.png"; //i could use any existing file except index.aspx
            }

        } catch (err) {
            //don't do anything with it because if it fails, it didn't find anything
            //and we do not want to ruin the end user experience
        }

        //}



        try {
            var i;
            for (i = 0; i < 50; i++) {
                if ($(".profileToggle")[i].innerHTML == "VIEW PROFILE")
                    $(".profileToggle")[i].innerHTML = "プロフィールを見る";

                if ($(".profileToggle")[i].innerHTML == "CLOSE PROFILE")
                    $(".profileToggle")[i].innerHTML = "プロフィールを閉じる";
            }

        } catch (err) {
            //don't do anything with it
        }
        try {

            for (i = 0; i < 50; i++) {
                if ($(".readMoreLink")[i].innerHTML == "Read more...")
                    $(".readMoreLink")[i].innerHTML = "続きを読む...";
            }
        } catch (err) {
            //don't do anything with it
        }


    }

    function set_control_placeholder(id, placeholder) {
        try {
            document.getElementById(id).placeholder = placeholder;
        }
        catch (err) {
            //don't do anything since we may not be on the page that has this
        }
    }

    function set_control_value(id, value) {
        try {
            document.getElementById(id).value = value;
        }
        catch (err) {
            //don't do anything since we may not be on the page that has this
        }
    }

    function set_control_innerHTML(id, innerHTML) {
        try {
            document.getElementById(id).innerHTML = innerHTML;
        }
        catch (err) {
            //don't do anything since we may not be on the page that has this
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //                           REWRITE VARIOUS ITEMS ON SITE END                                  //
    //////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////////
    //                                  MENU REWRITE START                                          //
    //  This block of code rewrites the language menu because for some unknown reason, the umbraco  //
    //  code is double encoding the unicode characters.                                             //
    //////////////////////////////////////////////////////////////////////////////////////////////////
    function rewrite_menu(id, oldvalue_startwith, newvalue) {
        var obj;

        try {
            obj = document.getElementById(id);
            obj.innerHTML = newvalue;
            if (obj != "undefined") {
                if (obj.id.substring(0, length(oldvalue_startwith)) == oldvalue_startwith) {
                    obj.innerHTML = newvalue;
                }
            }
        }
        catch (err) {
            //don't do anything with it
        }


    }

    rewrite_menu("fr", "Global/French (F", "Global/French (Français)");
    rewrite_menu("fr", "Global/French (Canada)(", "Global/French (Canada)(Français)");
    rewrite_menu("de", "Global/German (Deutsche)", "Global/German (Deutsche)");
    rewrite_menu("es", "Global/Spanish (Español)", "Global/Spanish (Español)");
    rewrite_menu("zs", "Global/Chinese (Simplified) (", "Global/Chinese (Simplified) (简体中文)");
    rewrite_menu("zh", "Global/Chinese (Traditional) (", "Global/Chinese (Traditional) (繁體中文)");
    rewrite_menu("ja", "Global/Japanese (", "Japan/Japanese (日本語)");
    rewrite_menu("pt", "Global/Portuguese (", "Global/Portuguese (Português)");

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //                                  MENU REWRITE END                                            //
    //////////////////////////////////////////////////////////////////////////////////////////////////


});