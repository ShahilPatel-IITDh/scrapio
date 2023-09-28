(() => {
        const script = document
            .createElement("script");
        script.src = "https://cdn.autoketing.org/sdk-cdn/popup-fullsize/dist/popup-fullsize-embed.js?t=" + new Date().toISOString().slice(0,13) + window.Shopify?.shop || "no-shop";
        document.head.appendChild(script)
    }
)()
