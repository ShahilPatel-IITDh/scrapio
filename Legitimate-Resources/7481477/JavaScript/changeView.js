;(function(w, $) {
    w.DIVIDE_VIEW_WITH_COOKIE = w.DIVIDE_VIEW_WITH_COOKIE || {};
    DIVIDE_VIEW_WITH_COOKIE = {
        $forNewUsersItem: $('.js-new-user'),
        $forExistingUsersItem: $('.js-existing-user'),
        $savingCookieCtrl: $('.js-save-cookie'),
        cookies: document.cookie,
        separateCookies: undefined,
        cookiesKey: undefined,
        originalCookie: undefined,
        originalCookiesDueDate: undefined,
        urlParams: undefined,
        existingFlag: false,
        PRIMARY_KEY: 'Rccorp',
        SECONDARY_KEY: 'Rz',

        init: function() {
            this.separateCookies = this.getSeparatedCookies(this.cookies);
            this.cookiesKey = this.getCookiesKey(this.separateCookies);
            this.urlParams = 
                this.extractParam(
                    this.getCookiesKey(
                        this.getUrlParam()
                    )
                );

            this.existingFlag = this.checkCookiesKey(this.cookiesKey, this.urlParams, this.PRIMARY_KEY, this.SECONDARY_KEY);
            this.showContentsForEachUser(this.existingFlag);

            this.$savingCookieCtrl.on('click', {self: this}, function(e) {
                var self = e.data.self;
                self.originalCookiesDueDate = self.getDueDate();
                self.saveOriginalCookie(self.originalCookiesDueDate, self.PRIMARY_KEY);
            });
        },
        getSeparatedCookies: function(cookies) {
            var cookie = cookies.split('; ');

            return cookie;
        },
        getCookiesKey: function(cookies) {
            var cookieName = [];

            for (var i = 0, len = cookies.length; i < len; i++) {
                var tmp = cookies[i].split('=');
                cookieName[i] = tmp[0];
            }

            return cookieName;
        },
        checkCookiesKey: function(keys, url, PRIMARY_KEY, SECONDARY_KEY) {
            var flag = false;

            if (url === PRIMARY_KEY) {
                this.originalCookiesDueDate = this.getDueDate();
                this.saveOriginalCookie(this.originalCookiesDueDate, PRIMARY_KEY);
                flag = true;
            }

            for (var i = 0, len = keys.length; i <= len; i++) {
                if (keys[i] === PRIMARY_KEY) {
                    flag = true;
                    break;
                } else if (keys[i] === SECONDARY_KEY) {
                    flag = true;
                    break;
                }
            }

            return flag;
        },
        showContentsForEachUser: function(bool) {
            if (bool) {
                this.$forExistingUsersItem.show();
				$("#corptop_tab li.tab02 a").addClass("selected");
				$("#corptop_tab li#tab2").css("display","list-item");			
            } else if (!bool) {
                this.$forNewUsersItem.show();
				$("#corptop_tab li.tab01 a").addClass("selected");
				$("#corptop_tab li#tab1").css("display","list-item");	
            }
        },
        getDueDate: function() {
            var today = new Date(),
                dueDate,
                TERM = 90;

            today.setTime(today.getTime() + TERM * 24 * 60 * 60 * 1000);
            dueDate = today.toGMTString();

            return dueDate;
        },
        saveOriginalCookie: function(date, subKey) {
            var cookieName = subKey + '=0';
            document.cookie = cookieName + ';expires=' + date;
        },
        getUrlParam: function() {
            var param = location.search;

            param = param.slice(1);
            param = param.replace(/\?/g, "&");
            param = param.split('&');

            return param;
        },
        extractParam: function(params) {
            var parameter = params,
                extract;

            for (var i = 0, len = parameter.length; i < len; i++) {
                if (parameter[i] === this.PRIMARY_KEY) {
                    extract = parameter[i];
                }
            }

            return extract;
        }
    };
})(window, jQuery);

jQuery(function($) {
    DIVIDE_VIEW_WITH_COOKIE.init();
});