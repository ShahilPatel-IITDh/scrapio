
        (function(names) {
            if (!customElements) {
                return;
            }
            for (const name of names) {
                customElements.define(name, class CustomElement extends HTMLElement {});
            }
        })(["next-route-announcer"])
    