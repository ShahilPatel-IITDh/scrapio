
    var $groupId = 360005597197; // Moniker - Chat Support

    var $onlineThemeSettings = {
        theme: '#ED6636',
        launcherText: '#ffffff',
        button: '#ED6636',
    };

    var $offlineThemeSettings = {
        theme: '#E6EDF2',
        launcherText: '#000000',
        button: '#E6EDF2',
    };

    const baseSettings = {
        webWidget: {
            color: $onlineThemeSettings,
            chat: {
                title: {
                    '*': 'Chat Support',
                },
                prechatForm: {
                    greeting: {
                        '*': 'Tell us a bit about yourself & the issue so we can connect you to a member of our team.',
                    },
                },
                departments: {
                    enabled: [$groupId],
                    select: $groupId,
                },
            },
            launcher: {
                label: {
                    '*': 'Support',
                },
                chatLabel: {
                    '*': 'Chat'
                },
            },
        }
    };

    let $onlineSettings = JSON.parse(JSON.stringify(baseSettings));
    let $offlineSettings = JSON.parse(JSON.stringify(baseSettings));

    // Use mostly the same base config as online, but change a couple of properties.
    $offlineSettings.webWidget.color = $offlineThemeSettings;
    $offlineSettings.webWidget.chat.title = {
        '*': 'Support',
    };
    $offlineSettings.webWidget.chat.prechatForm.greeting = {
        '*': 'Live Chat is offline. \r\n\r\n Tell us about the issue you are facing and we\'ll get back to you via email very soon. \r\nFor urgent issues please email help@weekendsupport.net',
    };

    $offlineSettings.webWidget.launcher.chatLabel = {
        '*': 'Leave a Message',
    };

    // Instantiate with default settings.
    window.zESettings = $onlineSettings;

    // Registers a callback to be fired when the widget successfully connects to the server.
    zE('webWidget:on', 'chat:connected', function() {

    // Fetch the department we are using and configure appropriately.
    $group = zE('webWidget:get', 'chat:department', $groupId);
        updateChatWidget($group.status)
    });

    // Register event listener to watch for when a group has active agents or not.
    zE('webWidget:on', 'chat:departmentStatus', function($group) {
        // Only react to one group.
        if ($group.id === $groupId){
            updateChatWidget($group.status)
        }
    });

    function updateChatWidget($status){
        if ($status === 'offline'){
            zE('webWidget', 'updateSettings', $offlineSettings);
        } else {
            zE('webWidget', 'updateSettings', $onlineSettings);
        }
    }
