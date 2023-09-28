
            function envFlush(a) {
                function b(b) {
                    for (var c in a) b[c] = a[c];
                }
                window.requireLazy ? window.requireLazy(["Env"], b) : ((window.Env = window.Env || {}), b(window.Env));
            }
            envFlush({
                stratcom_event_profiler_hook: "1",
                timeslice_heartbeat_config: {
                    pollIntervalMs: 33,
                    idleGapThresholdMs: 60,
                    ignoredTimesliceNames: { requestAnimationFrame: true, "Event listenHandler mousemove": true, "Event listenHandler mouseover": true, "Event listenHandler mouseout": true, "Event listenHandler scroll": true },
                    isHeartbeatEnabled: true,
                    isArtilleryOn: false,
                },
                shouldLogCounters: true,
                timeslice_categories: { react_render: true, reflow: true },
                sample_continuation_stacktraces: true,
                dom_mutation_flag: true,
            });
        