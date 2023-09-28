
        if (new URLSearchParams(window.location.search).has("comparePlansModal")) {
            if (document.querySelectorAll("div.SubscriptionTiersModal").length < 1) {
                let modalHTML= document.querySelector("script#comparePlansModal");
                if (modalHTML) {
                    document.body.innerHTML += modalHTML.innerHTML;
                }
            }
        }
    