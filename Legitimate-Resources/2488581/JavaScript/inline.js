
        
            (function() {
        
                const siteJS = {"desktop":"site-desktop","tablet":"site-tablet","phone":"site-phone"};
                const sectionJS = {"desktop":"","tablet":"","phone":""};
                const pageJS = {};
                const patternJS = {"navbar":true,"video-player":true};
                const type = getStartupDeviceTypeString();
        
                /* site and section build=true */
        
                    // dev, qa, beta, k8s, prod, etc.
        
                    const siteScripts = [];
                    const scripts = [];
        
                    if (siteJS[type]) {
                        siteScripts.push('//builds.mlbstatic.com/mlb.com/builds/site-core/1684766124457/dist/scripts/'+siteJS[type]+'.min.js');
                    }
        
                    if (sectionJS[type]) {
                        scripts.push('//builds.mlbstatic.com/mlb.com/sections/forge-pagebuilder/builds/76be05d406c1336218461eb5138d01c8bdcdbbe0_1684765920/scripts/'+sectionJS[type]+'.js');
                    }
        
                    if (pageJS[type]) {
                        scripts.push('//builds.mlbstatic.com/mlb.com/sections/forge-pagebuilder/builds/76be05d406c1336218461eb5138d01c8bdcdbbe0_1684765920/scripts/'+pageJS[type]+'.js');
                    }
        
                    const loadPatternScripts = function () {
                        const patternNames = Object.keys(patternJS);
        
                        if (patternNames.length) {
                            const patternScripts = [];
        
                            patternNames.forEach(function (patternName) {
                                const patternScript = '//builds.mlbstatic.com/mlb.com/builds/site-core/1684766124457/patterns/' + patternName + '/' + patternName + '.js';
                                patternScripts.push(patternScript);
                            });
        
                            requirejs.config({
                                baseUrl: '//builds.mlbstatic.com/mlb.com/builds/site-core/1684766124457/bower_components',
                                waitSeconds: 18,
                                config: {
                                    text: {
                                        useXhr: function (url, protocol, hostname, port) {
                                            return true;
                                        }
                                    }
                                }
                            });
        
                            requirejs(patternScripts);
                        }
                    }
        
                    if (siteScripts.length) {
                        requirejs.config({
                            waitSeconds: 18,
                            paths : {
                                "bam-video-bootstrap": "//builds.mlbstatic.com/mlb.com/video/videocore/video"
                            }
                        });
        
                        requirejs(siteScripts, function(){
                            if (scripts.length) {
                                requirejs(scripts, loadPatternScripts);
                            } else {
                                loadPatternScripts();
                            }
                        });
                    }
        
        
            })();
        