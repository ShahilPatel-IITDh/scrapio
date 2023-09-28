const drawerAPI = await window.shimport('orbit-drawer');
                           !window.location.href.includes('/notifications') && 
                           window.bbcuser.isUKCombined().then(function(isUK) {
                            if (isUK) {
                             window.NotificationsMain.run(drawerAPI, "https://mybbc.files.bbci.co.uk/notification-ui/5.0.24/");}})