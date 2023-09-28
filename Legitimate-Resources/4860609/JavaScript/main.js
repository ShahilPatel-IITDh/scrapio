// if (window.axios) {
//     // axios is loaded
//     console.log(`axios is already loaded`);
//     widget();
// } else {
//     // axios is not loaded
//     try {
//         console.log(`pos widget requires axios. trying to load...`);
//         let jq = document.createElement('script');
//         jq.type = 'text/javascript';
//         // jq.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
//         let srcHost = document.getElementById('e329fb40').getAttribute('data-src-host');
//         jq.src = `${srcHost}/widget/js/axios.min.js`;
//         document.head.appendChild(jq);
//         jq.addEventListener('load', () => {
//             console.log(`axios ${window.axios.VERSION} has been loaded successfully`);
//             widget();
//         });
//     } catch (e) {
//         console.log(`error loading pos widget: ${e.message}`);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    widget();
}, false);

function widget() {
    // getting config
    console.log('[debug-pos-widget] loading...');
    let script = document.getElementById('e329fb40');
    let srcHost = script.getAttribute('data-src-host');
    let orgId = script.getAttribute('data-org-id');
    // let axios = window.axios;
    // axios.get(srcHost + '/widgets/load-config?orgId=' + orgId)
    //     .then(function (response) {
    fetch(srcHost + '/widgets/load-config?orgId=' + orgId)
        .then((response) => response.json())
        .then((response) => {
            // creating shadow dom
            if (customElements.get('e329fb40-widget-pos-shadow') === undefined) {
                customElements.define('e329fb40-widget-pos-shadow', class extends HTMLElement {
                    connectedCallback() {
                        const shadow = this.attachShadow({mode: 'open'});
                        shadow.innerHTML = `<div id="vueRootPosWidget" style="height: 100%"></div>`;
                    }
                });
            }

            // appending widget root node
            let widgetDom = document.getElementById('e329fb40-widget-pos');
            widgetDom.innerHTML = '<e329fb40-widget-pos-shadow></e329fb40-widget-pos-shadow>';
            let shadowRootEl = document.getElementsByTagName('e329fb40-widget-pos-shadow');
            if (shadowRootEl.length < 1) {
                throw new Error('no shadow dom element detected for pos widget');
            }

            let shadowDom = shadowRootEl[0].shadowRoot;
            let widgetRoot = shadowDom.getElementById('vueRootPosWidget');

            // applying global vars
            let widget_host_url = response.widget_host_url;
            let base_request = response.base_request;
            let modal_url = response.widget_modal_url;
            let token = response.token;
            let scriptVars = document.createElement('script');
            scriptVars.innerHTML = `const base_request = "${base_request}"; modal_url = "${modal_url}"; ` +
                `const token = "${token}"; const organisation_id = ${orgId}`;
            shadowDom.appendChild(scriptVars);

            // appending widget styles
            let widgetStyle = document.createElement('style');
            widgetStyle.textContent = '#vueRootPosWidget { all: initial; height: 100%; }';
            shadowDom.appendChild(widgetStyle);
            // let linkElement = this.document.createElement('link');
            // linkElement.setAttribute('rel', 'stylesheet');
            // linkElement.setAttribute('type', 'text/css');
            // linkElement.setAttribute('href', `${widget_host_url}/widget/css/app2.css`);
            // document.head.appendChild(linkElement);

            // appending hidden inputs
            if (response.config_requested) {
                let configRequested = document.createElement('input');
                configRequested.setAttribute('type', 'hidden');
                configRequested.setAttribute('id', 'config_requested');
                configRequested.setAttribute('value', '1');
                widgetRoot.appendChild(configRequested);

                let configInput = document.createElement('input');
                configInput.setAttribute('type', 'hidden');
                configInput.setAttribute('id', 'widget_styles');
                configInput.setAttribute('value', response.widget_styles);
                widgetRoot.appendChild(configInput);

                configInput = document.createElement('input');
                configInput.setAttribute('type', 'hidden');
                configInput.setAttribute('id', 'widget_filters');
                configInput.setAttribute('value', response.widget_filters);
                widgetRoot.appendChild(configInput);

                let showFkgsInput = document.createElement('input');
                showFkgsInput.setAttribute('type', 'hidden');
                showFkgsInput.setAttribute('id', 'show_fkgs');
                showFkgsInput.setAttribute('value', response.show_fkgs);
                widgetRoot.appendChild(showFkgsInput);
            }

            let startScreenWidget = document.createElement('start-screen-widget');
            widgetRoot.appendChild(startScreenWidget);

            // appending embed widget styles
            let shadowCssLink  = document.createElement('link');
            shadowCssLink.rel  = 'stylesheet';
            shadowCssLink.type = 'text/css';
            shadowCssLink.href = `${widget_host_url}/widget/css/widgetMix.css`;
            shadowCssLink.media = 'all';
            shadowDom.appendChild(shadowCssLink);

            // appending some media query styles
            let mainCssLink  = document.createElement('link');
            mainCssLink.rel  = 'stylesheet';
            mainCssLink.type = 'text/css';
            mainCssLink.href = `${widget_host_url}/widget/css/main.css`;
            mainCssLink.media = 'all';
            document.head.appendChild(mainCssLink);

            let jq = document.createElement('script');
            jq.type = 'text/javascript';
            jq.setAttribute('defer', '');
            jq.src = `${widget_host_url}/widget/js/app_widget.js`;
            shadowDom.appendChild(jq);
            jq.addEventListener('load', () => {
                console.log(`[debug-pos-widget] embedding done`);
            });
        })
        // .catch(function (error) {
        //     throw new Error('an error occurred: ' + error);
        // });
        .catch((error) => {
            throw new Error('an error occurred while loading pos widget: ' + error);
        });
}
