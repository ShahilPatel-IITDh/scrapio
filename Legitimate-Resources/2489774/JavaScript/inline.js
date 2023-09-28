
                        (function (h, o, t, j, a, r) {
                            var hjid = 0;
                            if (h.location.hostname.toLowerCase().indexOf("primescratchcards.co.uk") !== -1)
                                hjid = 2046964;
                            else if (h.location.hostname.toLowerCase().indexOf("primescratchcards.com") !== -1)
                                hjid = 45481;
                
                            if (hjid !== 0) {
                                h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
                                h._hjSettings = { hjid: hjid, hjsv: 6 };
                                a = o.getElementsByTagName('head')[0];
                                r = o.createElement('script'); r.async = 1;
                                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                                a.appendChild(r);
                            }
                        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');