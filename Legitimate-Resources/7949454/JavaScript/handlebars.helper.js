/**
 * Name         : handlebars.helper.js
 * Version      : v1.0
 * Description  : Set of helper functions for handlebars.
 * Author       : hosung.seo
 * Copyright 2016 Samsung Electronics All rights reserved
 */

Handlebars.registerHelper("isVideoType", function(value, options) {
    return value.startsWith("video") ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper("incr", function(value, options) {
    return parseInt(value) + 1;
});


// {{compare unicorns ponies operator="<"}}
//  I knew it, unicorns are just low-quality ponies!
// {{/compare}}
// 
// (defaults to == if operator omitted)
//
// {{equal unicorns ponies }}
//  That's amazing, unicorns are actually undercover ponies
// {{/equal}}
// (from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/)
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;
    
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==':       function (l, r) { return l == r; },
        '===':      function (l, r) { return l === r; },
        '!=':       function (l, r) { return l != r; },
        '!==':      function (l, r) { return l !== r; },
        '<':        function (l, r) { return l < r; },
        '>':        function (l, r) { return l > r; },
        '<=':       function (l, r) { return l <= r; },
        '>=':       function (l, r) { return l >= r; },
        'or':       function (l, r) { return l || r; },
        'and':      function (l, r) { return l && r; },
        'typeof':   function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
    
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});