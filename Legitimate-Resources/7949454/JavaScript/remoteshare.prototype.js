/**
 * Name         : remoteshare.prototype.js
 * Version      : v1.0
 * Description  : Js functions for simple share pages.
 * Author       : hosung.seo
 * Copyright 2016 Samsung Electronics All rights reserved
 */

if (typeof String.prototype.contains !== 'function') {
    String.prototype.contains = function (str) {
        return this.indexOf(str) !== -1; 
    };
}
if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) === str;
    };
}
if (typeof String.prototype.equalsIgnoreCase !== 'function') {
    String.prototype.equalsIgnoreCase = function (str) {
        return this.toUpperCase() === str.toUpperCase();
    };
}
if (typeof String.prototype.replaceAll !== 'function') {
    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };
}
if (typeof String.prototype.replaceNumberToArabicIndic !== 'function') {
    String.prototype.toIndiaDigits= function() {
        var arabicIndicDigit = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
            return this.replace(/[0-9]/g, function(w) {
                return arabicIndicDigit[+w];
        });
    };
}
