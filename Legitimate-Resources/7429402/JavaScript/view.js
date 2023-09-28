YP.View = Backbone.View.extend({
    // Classes that are to be subclassed and that require initialization
    // must define a constructor.
    //
    // All constructors must accept the options Object
    constructor : function (options) {
        _.bindAll(this, 'ready');
        this.children  = [];
        this.mixins    = {}; // namespace for mixin instance variables
        this._readyDfd = $.Deferred();
        YP.View.__super__.constructor.call(this, options);
    },

    promise : function () {
        return this._readyDfd.promise();
    },

    // You can chain more .done() calls off of this.ready() which will execute
    // once all children are ready().
    ready : function () {
        return $.when
            .apply(jQuery, _.map(this.children, function (c) { return c._readyDfd; }))
            .done(this._readyDfd.resolve);
    },

    addChild : function (view) {
        view.parent = this;
        this.children.push(view);
        return view;
    },

    removeChild : function (view) {
        view.parent = undefined; // break circular reference
        return this.children.splice(_.indexOf(this.children, view), 1)[0].remove();
    },

    // A View that attaches another View to the DOM must invoke the other View's
    // 'attached' method.
    attached : function () {
      this.onAttached();
      for (var i = 0; i < this.children.length; i++)
        this.children[i].attached();
      this.onBubble();
    },

    // A hook for code you want to run once the View has been attached to the DOM.
    // If you need code to run after all children's onAttached handlers are run
    // then put it in onBubble.
    onAttached : function () {},
    onBubble : function () {},

    height : function () {
        if (this.$el.css('box-sizing') == 'border-box') {
            return this.$el.outerHeight();
        } else {
            return this.$el.height();
        }
    },

    wait : function (callback) {
        if (_.isUndefined(this._wait) || this._wait.state() != 'pending') {
            this._wait = $.Deferred();
            callback(this._wait);
        }
        return this._wait.promise();
    }
});

// https://gist.github.com/3652964
YP.View.mixin = function (view, mixin, custom) {
    var source = _.defaults(view.prototype || view, mixin);

    // TODO: handle cases where source.events or mixin.events are funcitons
    if (mixin.events) {
        if (source.events) {
            _.defaults(source.events, mixin.events);
        } else {
            source.events = mixin.events;
        }
    }

    if (mixin.initialize !== undefined) {
        var oldInitialize = source.initialize;
        source.initialize = function () {
            mixin.initialize.apply(this, arguments);
            oldInitialize.apply(this, arguments);
        };
    }
};
