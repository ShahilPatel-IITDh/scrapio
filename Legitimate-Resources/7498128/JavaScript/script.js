
    const s = document.createElement("script");
    s.src = "https://notix.io/ent/current/enot.min.js";
    s.onload = (sdk) => {
        sdk.startInstall({
            sw: {
                url: "https://elderecho.online/wp-content/plugins/notix-web-push-notifications/public/sw.enot.js"
            },
            appId: "1005ad3f2646314dc75dc0b74edad78",
            loadSettings: true
        })
    };
    document.head.append(s);
