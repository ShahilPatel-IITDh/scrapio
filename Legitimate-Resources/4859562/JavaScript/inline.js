
    window["adrum-start-time"] = new Date().getTime();
    window["adrum-config"] = {
        appKey: 'AD-AAB-AAN-GTC',
        adrumExtUrlHttp: 'https://cdn.appdynamics.com',
        adrumExtUrlHttps: 'https://cdn.appdynamics.com',
        beaconUrlHttp: 'https://pdx-col.eum-appdynamics.com',
        beaconUrlHttps: 'https://pdx-col.eum-appdynamics.com',
        xhr: {
            exclude: {
                urls: [
                    { pattern: ".*/live/web/.*", type: "regex" },
                    { pattern: ".*alert/TopSpotPoller.*", type: "regex" }]
            }
        },
        xd: { enable: true }
    };

