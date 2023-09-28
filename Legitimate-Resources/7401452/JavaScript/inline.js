
                    (function() {
                        function loadScript(url, attributes) {
                            var scriptTag = '<scr' + 'ipt src="' + url + '" ' + (attributes || '') + '></scr' + 'ipt>';
                            document.write(scriptTag);
                        }

                        function loadV4() {
                            if (!window.name || window.name.indexOf('xcomponent') !== 0) {
                                return;
                            }

                            var version = window.name.split('__')[2].replace(/_/g, '.');

                            if (!version.match(/^[0-9a-zA-Z.]+$/)) {
                                return;
                            }

                            if (version === '4' || version === 'latest') {
                                version = '';
                            }

                            var url = 'https://www.paypalobjects.com/api/checkout' + (version ? ('.' + version) : '') + '.js';
                            var attributes = 'data-paypal-checkout data-no-bridge';

                            loadScript(url, attributes);
                        }

                        function loadV5() {
                            var ancestor = (window.parent && window.parent !== window)
                                ? window.parent
                                : window.opener;

                            if (!ancestor || !ancestor.document) {
                                return;
                            }

                            var v5script = ancestor.document.querySelector('script[src*="/sdk/js"]');

                            if (!v5script || !v5script.src) {
                                return;
                            }

                            loadScript(v5script.src);
                        }

                        try {
                            if (window.paypal && window.paypal.version) {
                                return;
                            }

                            loadV4();
                            loadV5();
                        } catch (err) {
                            return;
                        }
                    })();
                