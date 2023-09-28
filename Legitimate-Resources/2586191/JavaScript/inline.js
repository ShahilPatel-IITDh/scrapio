
            var freestar = freestar || {};
            freestar.queue = freestar.queue || [];
            freestar.config = freestar.config || {};
            freestar.config.enabled_slots = [];
            freestar.initCallback = function () {
                freestar.config.enabled_slots.length === 0 ? (freestar.initCallbackCalled = false) : freestar.newAdSlots(freestar.config.enabled_slots);
            };
        