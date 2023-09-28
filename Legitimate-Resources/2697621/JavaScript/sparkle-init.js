
                        window.Sparkle.cmd.push(function(){
                            var lang = document.documentElement.lang || "en";
                            var options = {"networkCode":"5262","breakpoints":{"mobile":0,"tablet":768,"small_desktop":1088,"large_desktop":1300},"adBlockerShouldBeBlocked":true,"pageTargeting":{"page":"quote-bazaar"}}
                            window.Sparkle.init({ ...options, adBlockerShouldBeBlocked: lang !== "ja" });
                        });
                    