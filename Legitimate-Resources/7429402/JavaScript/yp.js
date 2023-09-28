// Setup the global application namespace
window.YP = _.extend(window.YP || {}, {
    bus : _.clone(Backbone.Events)
});
