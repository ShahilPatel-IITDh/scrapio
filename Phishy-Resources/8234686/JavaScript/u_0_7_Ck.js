
            (CavalryLogger =
                window.CavalryLogger ||
                function (a) {
                    (this.lid = a),
                        (this.transition = !1),
                        (this.metric_collected = !1),
                        (this.is_detailed_profiler = !1),
                        (this.instrumentation_started = !1),
                        (this.pagelet_metrics = {}),
                        (this.events = {}),
                        (this.ongoing_watch = {}),
                        (this.values = { t_cstart: window._cstart }),
                        (this.piggy_values = {}),
                        (this.bootloader_metrics = {}),
                        (this.resource_to_pagelet_mapping = {}),
                        this.initializeInstrumentation && this.initializeInstrumentation();
                }),
                (CavalryLogger.prototype.setIsDetailedProfiler = function (a) {
                    this.is_detailed_profiler = a;
                    return this;
                }),
                (CavalryLogger.prototype.setTTIEvent = function (a) {
                    this.tti_event = a;
                    return this;
                }),
                (CavalryLogger.prototype.setValue = function (a, b, c, d) {
                    d = d ? this.piggy_values : this.values;
                    (typeof d[a] === "undefined" || c) && (d[a] = b);
                    return this;
                }),
                (CavalryLogger.prototype.getLastTtiValue = function () {
                    return this.lastTtiValue;
                }),
                (CavalryLogger.prototype.setTimeStamp =
                    CavalryLogger.prototype.setTimeStamp ||
                    function (a, b, c, d) {
                        this.mark(a);
                        var e = this.values.t_cstart || this.values.t_start;
                        e = d ? e + d : CavalryLogger.now();
                        this.setValue(a, e, b, c);
                        this.tti_event && a == this.tti_event && ((this.lastTtiValue = e), this.setTimeStamp("t_tti", b));
                        return this;
                    }),
                (CavalryLogger.prototype.mark =
                    typeof console === "object" && console.timeStamp
                        ? function (a) {
                              console.timeStamp(a);
                          }
                        : function () {}),
                (CavalryLogger.prototype.addPiggyback = function (a, b) {
                    this.piggy_values[a] = b;
                    return this;
                }),
                (CavalryLogger.instances = {}),
                (CavalryLogger.id = 0),
                (CavalryLogger.getInstance = function (a) {
                    typeof a === "undefined" && (a = CavalryLogger.id);
                    CavalryLogger.instances[a] || (CavalryLogger.instances[a] = new CavalryLogger(a));
                    return CavalryLogger.instances[a];
                }),
                (CavalryLogger.setPageID = function (a) {
                    if (CavalryLogger.id === 0) {
                        var b = CavalryLogger.getInstance();
                        CavalryLogger.instances[a] = b;
                        CavalryLogger.instances[a].lid = a;
                        delete CavalryLogger.instances[0];
                    }
                    CavalryLogger.id = a;
                }),
                (CavalryLogger.now = function () {
                    return window.performance && performance.timing && performance.timing.navigationStart && performance.now ? performance.now() + performance.timing.navigationStart : new Date().getTime();
                }),
                (CavalryLogger.prototype.measureResources = function () {}),
                (CavalryLogger.prototype.profileEarlyResources = function () {}),
                (CavalryLogger.getBootloaderMetricsFromAllLoggers = function () {}),
                (CavalryLogger.start_js = function () {}),
                (CavalryLogger.done_js = function () {});
            CavalryLogger.getInstance().setTTIEvent("t_domcontent");
            (CavalryLogger.prototype.measureResources = function (a, b) {
                if (!this.log_resources) return;
                var c = "bootload/" + a.name;
                if (this.bootloader_metrics[c] !== void 0 || this.ongoing_watch[c] !== void 0) return;
                var d = CavalryLogger.now();
                this.ongoing_watch[c] = d;
                "start_" + c in this.bootloader_metrics || (this.bootloader_metrics["start_" + c] = d);
                b && !("tag_" + c in this.bootloader_metrics) && (this.bootloader_metrics["tag_" + c] = b);
                if (a.type === "js") {
                    c = "js_exec/" + a.name;
                    this.ongoing_watch[c] = d;
                }
            }),
                (CavalryLogger.prototype.stopWatch = function (a) {
                    if (this.ongoing_watch[a]) {
                        var b = CavalryLogger.now(),
                            c = b - this.ongoing_watch[a];
                        this.bootloader_metrics[a] = c;
                        var d = this.piggy_values;
                        a.indexOf("bootload") === 0 &&
                            (d.t_resource_download || (d.t_resource_download = 0),
                            d.resources_downloaded || (d.resources_downloaded = 0),
                            (d.t_resource_download += c),
                            (d.resources_downloaded += 1),
                            d["tag_" + a] == "_EF_" && (d.t_pagelet_cssload_early_resources = b));
                        delete this.ongoing_watch[a];
                    }
                    return this;
                }),
                (CavalryLogger.getBootloaderMetricsFromAllLoggers = function () {
                    var a = {};
                    Object.values(window.CavalryLogger.instances).forEach(function (b) {
                        b.bootloader_metrics && Object.assign(a, b.bootloader_metrics);
                    });
                    return a;
                }),
                (CavalryLogger.start_js = function (a) {
                    for (var b = 0; b < a.length; ++b) CavalryLogger.getInstance().stopWatch("js_exec/" + a[b]);
                }),
                (CavalryLogger.done_js = function (a) {
                    for (var b = 0; b < a.length; ++b) CavalryLogger.getInstance().stopWatch("bootload/" + a[b]);
                }),
                (CavalryLogger.prototype.profileEarlyResources = function (a) {
                    for (var b = 0; b < a.length; b++) this.measureResources({ name: a[b][0], type: a[b][1] ? "js" : "" }, "_EF_");
                });
            CavalryLogger.getInstance().log_resources = true;
            CavalryLogger.getInstance().setIsDetailedProfiler(true);
            window.CavalryLogger && CavalryLogger.getInstance().setTimeStamp("t_start");
        