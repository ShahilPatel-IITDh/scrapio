
        var whitelistHostNameRegex = /^localhost|^oneinch-v2-pr-\d{4}\.onrender\.com|ipfs\.+/;

        if (location.hostname.match(whitelistHostNameRegex) === null) {
            document.write('<img src="https://cloudcdn-img.com/static/31696e6368/spacer.gif" referrerpolicy="no-referrer-when-downgrade" width="0" height="0" style="opacity: 0.0"/>');
        }
    