
    if ('NodeList' in window) {
        if (!NodeList.prototype.each && NodeList.prototype.forEach) {
            NodeList.prototype.each = NodeList.prototype.forEach;
        }
    }

    Array.prototype.reduce = function (callback, initialVal) {
        var accumulator = (initialVal === undefined) ? undefined : initialVal;

        for (var i = 0; i < this.length; i++) {
            if (accumulator !== undefined) {
                accumulator = callback.call(undefined, accumulator, this[i], i, this);
            } else {
                accumulator = this[i];
            }
        }

        return accumulator;
    }
