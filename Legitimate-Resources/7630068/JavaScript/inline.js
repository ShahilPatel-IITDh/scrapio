
                $(document).ready(function() {
                    $('.modal').on('shown.bs.modal', function() {
                        $('.modal-backdrop').prependTo('#modal_container');
                    });
                    if (Socialfunders.Utils.getCookie('showCookieSettingsSuccess') === 'true') {
                        Socialfunders.Utils.showSuccessNotification(gettext("Successfully saved!"), "");
                        Socialfunders.Utils.removeCookie('showCookieSettingsSuccess');
                    }
                })
            