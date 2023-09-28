/* Minification failed. Returning unminified contents.
(2583,54-55): run-time error JS1195: Expected expression: >
(2583,86-87): run-time error JS1004: Expected ';': )
 */
; window.onerror = function (message, source, lineno, colno, error) {
    if (!phe.config.logJavascriptErrors)
        return;

    try {
        if (message.indexOf('Script error') > -1) {
            return;
        }
    }
    catch (e) {
        //continue without adding additional errors to log
    }
   
    var request = new XMLHttpRequest();
    request.open('POST', '/debug/handlejavascripterror');
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
    var data = {
        message: message,
        source: source,
        lineNumber: lineno,
        columnNumber: colno,
        errorMessage: error ? error.stack : '',
        url: window.location.href,
        referrer: document.referrer
    };
    request.send(JSON.stringify(data));

};
;
var phe = phe || {};

phe.analytics = (function () {
    function send(data) {
        var request = new XMLHttpRequest();
        request.open('POST', '/analytics/write', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('RequestVerificationToken', phe.config.antiForgeryToken);
        request.send('data=' + JSON.stringify(data));
    }

    return {
        log: function (event, data) {
            send({
                event: event,
                data: data
            });
        }
    }
})();
;
var util = util || {};

util.waitFor = function waitFor(thing, callback) {
    var intervalId = setInterval(function () {
        var things = thing.split(',');
        var passed = true;

        for (var i = 0; i < things.length; i++) {
            if (things[i].indexOf('.') > -1) {
                if (!compoundWait(things[i])) {
                    passed = false;
                    break;
                }
            } else {
                if (!simpleWait(things[i])) {
                    passed = false;
                    break;
                }
            }
        }

        if (passed) {
            clearInterval(intervalId);
            callback();
        }
    }, 10);
    function simpleWait(thing) {
        if (thing && typeof (thing) === "string" && thing["charAt"] && typeof (thing.charAt === "function") && thing.charAt(0) === "#") {
            return !!document.getElementById(thing.substring(1));
        }
        if (window[thing] == undefined) {
            return false;
        }
        return true;
    }
    function compoundWait(thing) {
        var awaited = thing.split('.');
        if (window[awaited[0]] == undefined) {
            return false;
        } else {
            var next = window[awaited[0]];
            for (var i = 1; i < awaited.length; i++) {
                if (next[awaited[i]] == undefined) {
                    return false;
                } else {
                    next = next[awaited[i]];
                }          
            }
        }
        return true;
    }
};
/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
//!function (e) { "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : e() }(function () { var a = "undefined" != typeof window ? window : this, e = a.Glider = function (e, t) { var o = this; if (e._glider) return e._glider; if (o.ele = e, o.ele.classList.add("glider"), (o.ele._glider = o).opt = Object.assign({}, { slidesToScroll: 1, slidesToShow: 1, resizeLock: !0, duration: .5, easing: function (e, t, o, i, r) { return i * (t /= r) * t + o } }, t), o.animate_id = o.page = o.slide = 0, o.arrows = {}, o._opt = o.opt, o.opt.skipTrack) o.track = o.ele.children[0]; else for (o.track = document.createElement("div"), o.ele.appendChild(o.track); 1 !== o.ele.children.length;)o.track.appendChild(o.ele.children[0]); o.track.classList.add("glider-track"), o.init(), o.resize = o.init.bind(o, !0), o.event(o.ele, "add", { scroll: o.updateControls.bind(o) }), o.event(a, "add", { resize: o.resize }) }, t = e.prototype; return t.init = function (e, t) { var o, i = this, r = 0, s = 0, l = (i.slides = i.track.children, [].forEach.call(i.slides, function (e, t) { e.classList.add("glider-slide"), e.setAttribute("data-gslide", t) }), i.containerWidth = i.ele.clientWidth, i.settingsBreakpoint()); t = t || l, "auto" !== i.opt.slidesToShow && void 0 === i.opt._autoSlide || (o = i.containerWidth / i.opt.itemWidth, i.opt._autoSlide = i.opt.slidesToShow = i.opt.exactWidth ? o : Math.max(1, Math.floor(o))), "auto" === i.opt.slidesToScroll && (i.opt.slidesToScroll = Math.floor(i.opt.slidesToShow)), i.itemWidth = i.opt.exactWidth ? i.opt.itemWidth : i.containerWidth / i.opt.slidesToShow, [].forEach.call(i.slides, function (e) { e.style.height = "auto", e.style.width = i.itemWidth + "px", r += i.itemWidth, s = Math.max(e.offsetHeight, s) }), i.track.style.width = r + "px", i.trackWidth = r, i.isDrag = !1, i.preventClick = !1, i.move = !1, i.opt.resizeLock && i.scrollTo(i.slide * i.itemWidth, 0), (l || t) && (i.bindArrows(), i.buildDots(), i.bindDrag()), i.updateControls(), i.emit(e ? "refresh" : "loaded") }, t.bindDrag = function () { function e() { t.mouseDown = void 0, t.ele.classList.remove("drag"), t.isDrag && (t.preventClick = !0), t.isDrag = !1 } var t = this; t.mouse = t.mouse || t.handleMouse.bind(t); function o() { t.move = !0 } var i = { mouseup: e, mouseleave: e, mousedown: function (e) { e.preventDefault(), e.stopPropagation(), t.mouseDown = e.clientX, t.ele.classList.add("drag"), t.move = !1, setTimeout(o, 300) }, touchstart: function (e) { t.ele.classList.add("drag"), t.move = !1, setTimeout(o, 300) }, mousemove: t.mouse, click: function (e) { t.preventClick && t.move && (e.preventDefault(), e.stopPropagation()), t.preventClick = !1, t.move = !1 } }; t.ele.classList.toggle("draggable", !0 === t.opt.draggable), t.event(t.ele, "remove", i), t.opt.draggable && t.event(t.ele, "add", i) }, t.buildDots = function () { var e = this; if (e.opt.dots) { if ("string" == typeof e.opt.dots ? e.dots = document.querySelector(e.opt.dots) : e.dots = e.opt.dots, e.dots) { e.dots.innerHTML = "", e.dots.setAttribute("role", "tablist"), e.dots.classList.add("glider-dots"); for (var t = 0; t < Math.ceil(e.slides.length / e.opt.slidesToShow); ++t) { var o = document.createElement("button"); o.dataset.index = t, o.setAttribute("aria-label", "Page " + (t + 1)), o.setAttribute("role", "tab"), o.className = "glider-dot " + (t ? "" : "active"), e.event(o, "add", { click: e.scrollItem.bind(e, t, !0) }), e.dots.appendChild(o) } } } else e.dots && (e.dots.innerHTML = "") }, t.bindArrows = function () { var o = this; o.opt.arrows ? ["prev", "next"].forEach(function (e) { var t = o.opt.arrows[e]; (t = t && ("string" == typeof t ? document.querySelector(t) : t)) && (t._func = t._func || o.scrollItem.bind(o, e), o.event(t, "remove", { click: t._func }), o.event(t, "add", { click: t._func }), o.arrows[e] = t) }) : Object.keys(o.arrows).forEach(function (e) { e = o.arrows[e]; o.event(e, "remove", { click: e._func }) }) }, t.updateControls = function (e) { var n = this, t = (e && !n.opt.scrollPropagate && e.stopPropagation(), n.containerWidth >= n.trackWidth), a = (n.opt.rewind || (n.arrows.prev && (n.arrows.prev.classList.toggle("disabled", n.ele.scrollLeft <= 0 || t), n.arrows.prev.setAttribute("aria-disabled", n.arrows.prev.classList.contains("disabled"))), n.arrows.next && (n.arrows.next.classList.toggle("disabled", Math.ceil(n.ele.scrollLeft + n.containerWidth) >= Math.floor(n.trackWidth) || t), n.arrows.next.setAttribute("aria-disabled", n.arrows.next.classList.contains("disabled")))), n.slide = Math.round(n.ele.scrollLeft / n.itemWidth), n.page = Math.round(n.ele.scrollLeft / n.containerWidth), n.slide + Math.floor(Math.floor(n.opt.slidesToShow) / 2)), d = Math.floor(n.opt.slidesToShow) % 2 ? 0 : a + 1; 1 === Math.floor(n.opt.slidesToShow) && (d = 0), n.ele.scrollLeft + n.containerWidth >= Math.floor(n.trackWidth) && (n.page = n.dots ? n.dots.children.length - 1 : 0), [].forEach.call(n.slides, function (e, t) { var o = e.classList, e = o.contains("visible"), i = n.ele.scrollLeft, r = n.ele.scrollLeft + n.containerWidth, s = n.itemWidth * t, l = s + n.itemWidth, s = ([].forEach.call(o, function (e) { /^left|right/.test(e) && o.remove(e) }), o.toggle("active", n.slide === t), a === t || d && d === t ? o.add("center") : (o.remove("center"), o.add([t < a ? "left" : "right", Math.abs(t - (!(t < a) && d || a))].join("-"))), Math.ceil(s) >= Math.floor(i) && Math.floor(l) <= Math.ceil(r)); o.toggle("visible", s), s !== e && n.emit("slide-" + (s ? "visible" : "hidden"), { slide: t }) }), n.dots && [].forEach.call(n.dots.children, function (e, t) { e.classList.toggle("active", n.page === t) }), e && n.opt.scrollLock && (clearTimeout(n.scrollLock), n.scrollLock = setTimeout(function () { clearTimeout(n.scrollLock), .02 < Math.abs(n.ele.scrollLeft / n.itemWidth - n.slide) && (n.mouseDown || n.trackWidth > n.containerWidth + n.ele.scrollLeft && n.scrollItem(n.getCurrentSlide())) }, n.opt.scrollLockDelay || 250)) }, t.getCurrentSlide = function () { return this.round(this.ele.scrollLeft / this.itemWidth) }, t.scrollItem = function (e, t, o) { o && o.preventDefault(); var i, r = this, s = e, o = (++r.animate_id, r.slide), l = !0 === t ? (e = Math.round(e * r.containerWidth / r.itemWidth)) * r.itemWidth : ("string" == typeof e && (l = "prev" === e, e = r.opt.slidesToScroll % 1 || r.opt.slidesToShow % 1 ? r.getCurrentSlide() : r.slide, l ? e -= r.opt.slidesToScroll : e += r.opt.slidesToScroll, r.opt.rewind && (i = r.ele.scrollLeft, e = l && !i ? r.slides.length : !l && i + r.containerWidth >= Math.floor(r.trackWidth) ? 0 : e)), e = Math.max(Math.min(e, r.slides.length), 0), r.slide = e, r.itemWidth * e); return r.emit("scroll-item", { prevSlide: o, slide: e }), r.scrollTo(l, r.opt.duration * Math.abs(r.ele.scrollLeft - l), function () { r.updateControls(), r.emit("animated", { value: s, type: "string" == typeof s ? "arrow" : t ? "dot" : "slide" }) }), !1 }, t.settingsBreakpoint = function () { var e = this, t = e._opt.responsive; if (t) { t.sort(function (e, t) { return t.breakpoint - e.breakpoint }); for (var o = 0; o < t.length; ++o) { var i = t[o]; if (a.innerWidth >= i.breakpoint) return e.breakpoint !== i.breakpoint && (e.opt = Object.assign({}, e._opt, i.settings), e.breakpoint = i.breakpoint, !0) } } var r = 0 !== e.breakpoint; return e.opt = Object.assign({}, e._opt), e.breakpoint = 0, r }, t.scrollTo = function (t, o, i) { var r = this, s = (new Date).getTime(), l = r.animate_id, n = function () { var e = (new Date).getTime() - s; r.ele.scrollLeft = r.ele.scrollLeft + (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, o), e < o && l === r.animate_id ? a.requestAnimationFrame(n) : (r.ele.scrollLeft = t, i && i.call(r)) }; a.requestAnimationFrame(n) }, t.removeItem = function (e) { var t = this; t.slides.length && (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove")) }, t.addItem = function (e) { this.track.appendChild(e), this.refresh(!0), this.emit("add") }, t.handleMouse = function (e) { var t = this; t.mouseDown && (t.isDrag = !0, t.ele.scrollLeft += (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3), t.mouseDown = e.clientX) }, t.round = function (e) { var t = 1 / (this.opt.slidesToScroll % 1 || 1); return Math.round(e * t) / t }, t.refresh = function (e) { this.init(!0, e) }, t.setOption = function (t, e) { var o = this; o.breakpoint && !e ? o._opt.responsive.forEach(function (e) { e.breakpoint === o.breakpoint && (e.settings = Object.assign({}, e.settings, t)) }) : o._opt = Object.assign({}, o._opt, t), o.breakpoint = 0, o.settingsBreakpoint() }, t.destroy = function () { function e(t) { t.removeAttribute("style"), [].forEach.call(t.classList, function (e) { /^glider/.test(e) && t.classList.remove(e) }) } var t = this, o = t.ele.cloneNode(!0); t.opt.skipTrack || (o.children[0].outerHTML = o.children[0].innerHTML), e(o), [].forEach.call(o.getElementsByTagName("*"), e), t.ele.parentNode.replaceChild(o, t.ele), t.event(a, "remove", { resize: t.resize }), t.emit("destroy") }, t.emit = function (e, t) { e = new a.CustomEvent("glider-" + e, { bubbles: !this.opt.eventPropagate, detail: t }); this.ele.dispatchEvent(e) }, t.event = function (e, t, o) { var i = e[t + "EventListener"].bind(e); Object.keys(o).forEach(function (e) { i(e, o[e]) }) }, e });
/* global define */

(function (factory) {
    typeof define === 'function' && define.amd
        ? define(factory)
        : typeof exports === 'object'
            ? (module.exports = factory())
            : factory()
})(function () {
    ('use strict') // eslint-disable-line no-unused-expressions

    /* globals window:true */
    var _window = typeof window !== 'undefined' ? window : this

    var Glider = (_window.Glider = function (element, settings) {
        var _ = this

        if (element._glider) return element._glider

        _.ele = element
        _.ele.classList.add('glider')

        // expose glider object to its DOM element
        _.ele._glider = _

        // merge user setting with defaults
        _.opt = Object.assign(
            {},
            {
                slidesToScroll: 1,
                slidesToShow: 1,
                resizeLock: true,
                duration: 0.5,
                // easeInQuad
                easing: function (x, t, b, c, d) {
                    return c * (t /= d) * t + b
                }
            },
            settings
        )

        // set defaults
        _.animate_id = _.page = _.slide = 0
        _.arrows = {}

        // preserve original options to
        // extend breakpoint settings
        _._opt = _.opt

        if (_.opt.skipTrack) {
            // first and only child is the track
            _.track = _.ele.children[0]
        } else {
            // create track and wrap slides
            _.track = document.createElement('div')
            _.ele.appendChild(_.track)
            while (_.ele.children.length !== 1) {
                _.track.appendChild(_.ele.children[0])
            }
        }

        _.track.classList.add('glider-track')

        // start glider
        _.init()

        // set events
        _.resize = _.init.bind(_, true)
        _.event(_.ele, 'add', {
            scroll: _.updateControls.bind(_)
        })
        _.event(_window, 'add', {
            resize: _.resize
        })
    })

    var gliderPrototype = Glider.prototype
    gliderPrototype.init = function (refresh, paging) {
        var _ = this

        var width = 0

        var height = 0

        _.slides = _.track.children;

        [].forEach.call(_.slides, function (_, i) {
            _.classList.add('glider-slide')
            _.setAttribute('data-gslide', i)
        })

        _.containerWidth = _.ele.clientWidth

        var breakpointChanged = _.settingsBreakpoint()
        if (!paging) paging = breakpointChanged

        if (
            _.opt.slidesToShow === 'auto' ||
            typeof _.opt._autoSlide !== 'undefined'
        ) {
            
          
            _.opt.itemWidth = _.opt.itemWidth ? _.opt.itemWidth : _.slides[0].clientWidth;
            var slideCount = _.containerWidth / _.opt.itemWidth

            _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth
                ? slideCount
                : Math.max(1, Math.floor(slideCount))
        }
        if (_.opt.slidesToScroll === 'auto') {
            _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow)
        }

        _.itemWidth = _.opt.exactWidth
            ? _.opt.itemWidth
            : _.containerWidth / _.opt.slidesToShow;

        // set slide dimensions
        [].forEach.call(_.slides, function (__) {
            __.style.height = 'auto'
            __.style.width = _.itemWidth + 'px'
            width += _.itemWidth
            height = Math.max(__.offsetHeight, height)
        })

        _.track.style.width = width + 'px'
        _.trackWidth = width
        _.isDrag = false
        _.preventClick = false
        _.move = false

        _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0)

        if (breakpointChanged || paging) {
            _.bindArrows()
            _.buildDots()
            _.bindDrag()
        }

        _.updateControls()

        _.emit(refresh ? 'refresh' : 'loaded')
    }

    gliderPrototype.bindDrag = function () {
        var _ = this
        _.mouse = _.mouse || _.handleMouse.bind(_)

        var mouseup = function () {
            _.mouseDown = undefined
            _.ele.classList.remove('drag')
            if (_.isDrag) {
                _.preventClick = true
            }
            _.isDrag = false
        }

        const move = function () {
            _.move = true
        }

        var events = {
            mouseup: mouseup,
            mouseleave: mouseup,
            mousedown: function (e) {
                e.preventDefault()
                e.stopPropagation()
                _.mouseDown = e.clientX
                _.ele.classList.add('drag')
                _.move = false
                setTimeout(move, 300)
            },
            touchstart: function (e) {
                _.ele.classList.add('drag')
                _.move = false
                setTimeout(move, 300)
            },
            mousemove: _.mouse,
            click: function (e) {
                if (_.preventClick && _.move) {
                    e.preventDefault()
                    e.stopPropagation()
                }
                _.preventClick = false
                _.move = false
            }
        }

        _.ele.classList.toggle('draggable', _.opt.draggable === true)
        _.event(_.ele, 'remove', events)
        if (_.opt.draggable) _.event(_.ele, 'add', events)
    }

    gliderPrototype.buildDots = function () {
        var _ = this

        if (!_.opt.dots) {
            if (_.dots) _.dots.innerHTML = ''
            return
        }

        if (typeof _.opt.dots === 'string') {
            _.dots = document.querySelector(_.opt.dots)
        } else _.dots = _.opt.dots
        if (!_.dots) return

        _.dots.innerHTML = ''
        _.dots.setAttribute('role', 'tablist')
        _.dots.classList.add('glider-dots')

        for (var i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
            var dot = document.createElement('button')
            dot.dataset.index = i
            dot.setAttribute('aria-label', 'Page ' + (i + 1))
            dot.setAttribute('role', 'tab')
            dot.className = 'glider-dot ' + (i ? '' : 'active')
            _.event(dot, 'add', {
                click: _.scrollItem.bind(_, i, true)
            })
            _.dots.appendChild(dot)
        }
    }

    gliderPrototype.bindArrows = function () {
        var _ = this
        if (!_.opt.arrows) {
            Object.keys(_.arrows).forEach(function (direction) {
                var element = _.arrows[direction]
                _.event(element, 'remove', { click: element._func })
            })
            return
        }
        ['prev', 'next'].forEach(function (direction) {
            var arrow = _.opt.arrows[direction]
            if (arrow) {
                if (typeof arrow === 'string') arrow = document.querySelector(arrow)
                if (arrow) {
                    arrow._func = arrow._func || _.scrollItem.bind(_, direction)
                    _.event(arrow, 'remove', {
                        click: arrow._func
                    })
                    _.event(arrow, 'add', {
                        click: arrow._func
                    })
                    _.arrows[direction] = arrow
                }
            }
        })
    }

    gliderPrototype.updateControls = function (event) {
        var _ = this

        if (event && !_.opt.scrollPropagate) {
            event.stopPropagation()
        }

        var disableArrows = _.containerWidth >= _.trackWidth

        if (!_.opt.rewind) {
            if (_.arrows.prev) {
                _.arrows.prev.classList.toggle(
                    'disabled',
                    _.ele.scrollLeft <= 0 || disableArrows
                )

                _.arrows.prev.setAttribute(
                    'aria-disabled',
                    _.arrows.prev.classList.contains('disabled')
                )
            }
            if (_.arrows.next) {
                _.arrows.next.classList.toggle(
                    'disabled',
                    Math.ceil(_.ele.scrollLeft + _.containerWidth) >=
                    Math.floor(_.trackWidth) || disableArrows
                )

                _.arrows.next.setAttribute(
                    'aria-disabled',
                    _.arrows.next.classList.contains('disabled')
                )
            }
        }

        _.slide = Math.round(_.ele.scrollLeft / _.itemWidth)
        _.page = Math.round(_.ele.scrollLeft / _.containerWidth)

        var middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2)

        var extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1
        if (Math.floor(_.opt.slidesToShow) === 1) {
            extraMiddle = 0
        }

        // the last page may be less than one half of a normal page width so
        // the page is rounded down. when at the end, force the page to turn
        if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
            _.page = _.dots ? _.dots.children.length - 1 : 0
        }

        [].forEach.call(_.slides, function (slide, index) {
            var slideClasses = slide.classList

            var wasVisible = slideClasses.contains('visible')

            var start = _.ele.scrollLeft

            var end = _.ele.scrollLeft + _.containerWidth

            var itemStart = _.itemWidth * index

            var itemEnd = itemStart + _.itemWidth;

            [].forEach.call(slideClasses, function (className) {
                /^left|right/.test(className) && slideClasses.remove(className)
            })
            slideClasses.toggle('active', _.slide === index)
            if (middle === index || (extraMiddle && extraMiddle === index)) {
                slideClasses.add('center')
            } else {
                slideClasses.remove('center')
                slideClasses.add(
                    [
                        index < middle ? 'left' : 'right',
                        Math.abs(index - (index < middle ? middle : extraMiddle || middle))
                    ].join('-')
                )
            }

            var isVisible =
                Math.ceil(itemStart) >= Math.floor(start) &&
                Math.floor(itemEnd) <= Math.ceil(end)
            slideClasses.toggle('visible', isVisible)
            if (isVisible !== wasVisible) {
                _.emit('slide-' + (isVisible ? 'visible' : 'hidden'), {
                    slide: index
                })
            }
        })
        if (_.dots) {
            [].forEach.call(_.dots.children, function (dot, index) {
                dot.classList.toggle('active', _.page === index)
            })
        }

        if (event && _.opt.scrollLock) {
            clearTimeout(_.scrollLock)
            _.scrollLock = setTimeout(function () {
                clearTimeout(_.scrollLock)
                // dont attempt to scroll less than a pixel fraction - causes looping
                if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
                    if (!_.mouseDown) {
                        // Only scroll if not at the end (#94)
                        if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
                            _.scrollItem(_.getCurrentSlide())
                        }
                    }
                }
            }, _.opt.scrollLockDelay || 250)
        }
    }

    gliderPrototype.getCurrentSlide = function () {
        var _ = this
        return _.round(_.ele.scrollLeft / _.itemWidth)
    }

    gliderPrototype.scrollItem = function (slide, dot, e) {
        if (e) e.preventDefault()

        var _ = this

        var originalSlide = slide
        ++_.animate_id

        var prevSlide = _.slide
        var position

        if (dot === true) {
            slide = Math.round((slide * _.containerWidth) / _.itemWidth)
            position = slide * _.itemWidth
        } else {
            if (typeof slide === 'string') {
                var backwards = slide === 'prev'

                // use precise location if fractional slides are on
                if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
                    slide = _.getCurrentSlide()
                } else {
                    slide = _.slide
                }

                if (backwards) slide -= _.opt.slidesToScroll
                else slide += _.opt.slidesToScroll

                if (_.opt.rewind) {
                    var scrollLeft = _.ele.scrollLeft
                    slide =
                        backwards && !scrollLeft
                            ? _.slides.length
                            : !backwards &&
                                scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)
                                ? 0
                                : slide
                }
            }

            slide = Math.max(Math.min(slide, _.slides.length), 0)

            _.slide = slide
            position = _.itemWidth * slide
        }

        _.emit('scroll-item', {
            value: prevSlide,
            type: slide
        })

        _.scrollTo(
            position,
            _.opt.duration * Math.abs(_.ele.scrollLeft - position),
            function () {
                _.updateControls()
                _.emit('animated', {
                    value: originalSlide,
                    type:
                        typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
                })
            }
        )

        return false
    }

    gliderPrototype.settingsBreakpoint = function () {
        var _ = this

        var resp = _._opt.responsive

        if (resp) {
            // Sort the breakpoints in mobile first order
            resp.sort(function (a, b) {
                return b.breakpoint - a.breakpoint
            })

            for (var i = 0; i < resp.length; ++i) {
                var size = resp[i]
                if (_window.innerWidth >= size.breakpoint) {
                    if (_.breakpoint !== size.breakpoint) {

                        _.opt = Object.assign({}, _._opt, size.settings)
                        _.breakpoint = size.breakpoint
                        return true
                    }
                    return false
                }
            }
        }
        // set back to defaults in case they were overriden
        var breakpointChanged = _.breakpoint !== 0
        _.opt = Object.assign({}, _._opt)
        _.breakpoint = 0
        return breakpointChanged
    }

    gliderPrototype.scrollTo = function (scrollTarget, scrollDuration, callback) {
        var _ = this

        var start = new Date().getTime()

        var animateIndex = _.animate_id

        var animate = function () {
            var now = new Date().getTime() - start
            _.ele.scrollLeft =
                _.ele.scrollLeft +
                (scrollTarget - _.ele.scrollLeft) *
                _.opt.easing(0, now, 0, 1, scrollDuration)
            if (now < scrollDuration && animateIndex === _.animate_id) {
                _window.requestAnimationFrame(animate)
            } else {
                _.ele.scrollLeft = scrollTarget
                callback && callback.call(_)
            }
        }

        _window.requestAnimationFrame(animate)
    }

    gliderPrototype.removeItem = function (index) {
        var _ = this

        if (_.slides.length) {
            _.track.removeChild(_.slides[index])
            _.refresh(true)
            _.emit('remove')
        }
    }

    gliderPrototype.addItem = function (ele) {
        var _ = this

        _.track.appendChild(ele)
        _.refresh(true)
        _.emit('add')
    }

    gliderPrototype.handleMouse = function (e) {
        var _ = this
        if (_.mouseDown) {
            _.isDrag = true
            _.ele.scrollLeft +=
                (_.mouseDown - e.clientX) * (_.opt.dragVelocity || 3.3)
            _.mouseDown = e.clientX
        }
    }

    // used to round to the nearest 0.XX fraction
    gliderPrototype.round = function (double) {
        var _ = this
        var step = _.opt.slidesToScroll % 1 || 1
        var inv = 1.0 / step
        return Math.round(double * inv) / inv
    }

    gliderPrototype.refresh = function (paging) {
        var _ = this
        _.init(true, paging)
    }

    gliderPrototype.setOption = function (opt, global) {
        var _ = this
        debugger;
        if (_.breakpoint && !global) {
            _._opt.responsive.forEach(function (v) {
                if (v.breakpoint === _.breakpoint) {
                    v.settings = Object.assign({}, v.settings, opt)
                }
            })
        } else {
            _._opt = Object.assign({}, _._opt, opt)
        }

        _.breakpoint = 0
        _.settingsBreakpoint()
    }

    gliderPrototype.destroy = function () {
        var _ = this

        var replace = _.ele.cloneNode(true)

        var clear = function (ele) {
            ele.removeAttribute('style');
            [].forEach.call(ele.classList, function (className) {
                /^glider/.test(className) && ele.classList.remove(className)
            })
        }
        // remove track if it was created by glider
        if (!_.opt.skipTrack) {
            replace.children[0].outerHTML = replace.children[0].innerHTML
        }
        clear(replace);
        [].forEach.call(replace.getElementsByTagName('*'), clear)
        _.ele.parentNode.replaceChild(replace, _.ele)
        _.event(_window, 'remove', {
            resize: _.resize
        })
        _.emit('destroy')
    }

    gliderPrototype.emit = function (name, arg) {
        var _ = this

        var e = new _window.CustomEvent('glider-' + name, {
            bubbles: !_.opt.eventPropagate,
            detail: arg
        })
        _.ele.dispatchEvent(e)
    }

    gliderPrototype.event = function (ele, type, args) {
        var eventHandler = ele[type + 'EventListener'].bind(ele)
        Object.keys(args).forEach(function (k) {
            eventHandler(k, args[k])
        })
    }

    return Glider
})


function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }

    return out;
}



function setupGlider(el) {

    var defaults = {
        enableMouseEvents: false,
        arrows: {
            prev: el != null && el.closest('.glider-contain') && el.closest('.glider-contain').querySelector('.glider-prev'),
            next: el != null && el.closest('.glider-contain') && el.closest('.glider-contain').querySelector('.glider-next')
        },
        slidesToScroll: 1,
        slidesToShow: 'auto',
        exactWidth: true,
        draggable: true,
        rewind: false,
        scrollLock: true
    };

    if (el === null || el === undefined || el.nodeName === "INPUT") {
        return false;
    }


    if (el.classList.contains('rewind') || el.dataset.rewind) {
        defaults.rewind = true;
    }
    if (el.dataset.slidesToScroll) {
        defaults.slidesToScroll = parseInt(el.dataset.slidesToScroll);
    }
    if (el.dataset.slidesToShow) {
        defaults.slidesToShow = el.dataset.slidesToShow;
    } if (el.dataset.itemWidth) {
        defaults.itemWidth = parseInt(el.dataset.itemWidth);
    }
    if (el.dataset.scrollLock) {
        defaults.scrollLock = el.dataset.scrollLock;
    }
    if (el.classList.contains('responsive-scroller')) {
        defaults.responsive = [
            {
                // screens greater than >= 350px
                breakpoint: 350,
                settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            },
            {
                // screens greater than >= 450px
                breakpoint: 450,
                settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 'auto',
                    slidesToScroll: 1
                }
            },
            {
                // screens greater than >= 775px
                breakpoint: 775,
                settings: {

                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: {
                        prev: defaults.arrows.prev,
                        next: defaults.arrows.next
                    }
                }
            }, {
                // screens greater than >= 1024px
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1, 
                    arrows: {
                        prev: defaults.arrows.prev,
                        next: defaults.arrows.next
                    }
                }
            }
        ];
    }
    if (!defaults.itemWidth && el.querySelector('.slide')) {
        defaults.itemWidth = el.querySelectorAll('.slide')[0].clientWidth;;
    }
    var glider = new Glider(el, defaults);
    return glider;
}
function setupGliders() {
    [].slice.call(document.querySelectorAll('.glider')).map(function (el) {
        if (!el.classList.contains('delay')) {
            var interval = setInterval(function () {
                clearInterval(interval);
                setupGlider(el);
            }, 200);
        }
    });
}

window.setupGlider = setupGlider;
document.addEventListener('DOMContentLoaded', function () {
    setupGliders();
});
document.addEventListener('turbo:load', setupGliders);

function AutoHidePrevNextGlider() {
    [].slice.call(document.querySelectorAll('.glider .glider-track')).map(function (el) {
        var frameWidth = el.clientWidth;
        var slideWidth = el.querySelectorAll('.slide').length * el.querySelector('.slide').clientWidth;
        if (el.querySelector('.prev')) {
            if (frameWidth >= (slideWidth - 30)) {
                el.querySelector('.prev').classList.add('hide');
                el.querySelector('.next').classList.add('hide');
            } else {
                el.querySelector('.prev').classList.remove('hide');
                el.querySelector('.next').classList.remove('hide');
            }
        }
    });
}
;
!function (d, a) { if ("object" == typeof exports && "object" == typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else { var b = a(); for (var c in b) ("object" == typeof exports ? exports : d)[c] = b[c] } }("undefined" != typeof self ? self : this, function () { return function (b) { var e, f, g, h, i = window.webpackHotUpdate; window.webpackHotUpdate = function (a, b) { y(a, b), i && i(a, b) }; var j = !0, k = "dc511a77c8af76e8067a", l = {}, m = [], n = []; function c(f) { var g = d[f]; if (!g) return a; var c = function (b) { return g.hot.active ? (d[b] ? 0 > d[b].parents.indexOf(f) && d[b].parents.push(f) : (m = [f], e = b), 0 > g.children.indexOf(b) && g.children.push(b)) : (console.warn("[HMR] unexpected require(" + b + ") from disposed module " + f), m = []), a(b) }, h = function (b) { return { configurable: !0, enumerable: !0, get: function () { return a[b] }, set: function (c) { a[b] = c } } }; for (var b in a) Object.prototype.hasOwnProperty.call(a, b) && "e" !== b && Object.defineProperty(c, b, h(b)); return c.e = function (b) { return "ready" === p && q("prepare"), s++, a.e(b).then(c, function (a) { throw c(), a }); function c() { s--, "prepare" === p && (t[b] || z(b), 0 === s && 0 === r && A()) } }, c } var o = [], p = "idle"; function q(b) { p = b; for (var a = 0; a < o.length; a++)o[a].call(null, b) } var r = 0, s = 0, t = {}, u = {}, v = {}; function w(a) { return +a + "" === a ? +a : a } function x(c) { var b; if ("idle" !== p) throw new Error("check() is only allowed in idle status"); return j = c, q("check"), (b = b = 1e4, new Promise(function (g, d) { if ("undefined" == typeof XMLHttpRequest) return d(new Error("No browser support")); try { var c = new XMLHttpRequest, e = a.p + "" + k + ".hot-update.json"; c.open("GET", e, !0), c.timeout = b, c.send(null) } catch (f) { return d(f) } c.onreadystatechange = function () { if (4 === c.readyState) { if (0 === c.status) d(new Error("Manifest request to " + e + " timed out.")); else if (404 === c.status) g(); else if (200 !== c.status && 304 !== c.status) d(new Error("Manifest request to " + e + " failed.")); else { try { var a = JSON.parse(c.responseText) } catch (b) { d(b); return } g(a) } } } })).then(function (a) { if (!a) return q("idle"), null; u = {}, t = {}, v = a.c, h = a.h, q("prepare"); var b = new Promise(function (a, b) { f = { resolve: a, reject: b } }); return g = {}, z(1), "prepare" === p && 0 === s && 0 === r && A(), b }) } function y(a, b) { if (v[a] && u[a]) { for (var c in u[a] = !1, b) Object.prototype.hasOwnProperty.call(b, c) && (g[c] = b[c]); 0 == --r && 0 === s && A() } } function z(c) { if (v[c]) { var d, e, b; u[c] = !0, r++, d = c, e = document.getElementsByTagName("head")[0], b = document.createElement("script"), b.type = "text/javascript", b.charset = "utf-8", b.src = a.p + "" + d + "." + k + ".hot-update.js", e.appendChild(b) } else t[c] = !0 } function A() { q("ready"); var a = f; if (f = null, a) { if (j) Promise.resolve().then(function () { return B(j) }).then(function (b) { a.resolve(b) }, function (b) { a.reject(b) }); else { var b = []; for (var c in g) Object.prototype.hasOwnProperty.call(g, c) && b.push(w(c)); a.resolve(b) } } } function B(e) { if ("ready" !== p) throw new Error("apply() is only allowed in ready status"); function Q(j) { for (var e = [j], c = {}, g = e.slice().map(function (a) { return { chain: [a], id: a } }); g.length > 0;) { var k = g.pop(), b = k.id, f = k.chain; if ((o = d[b]) && !o.hot._selfAccepted) { if (o.hot._selfDeclined) return { type: "self-declined", chain: f, moduleId: b }; if (o.hot._main) return { type: "unaccepted", chain: f, moduleId: b }; for (var h = 0; h < o.parents.length; h++) { var a = o.parents[h], i = d[a]; if (i) { if (i.hot._declinedDependencies[b]) return { type: "declined", chain: f.concat([a]), moduleId: b, parentId: a }; if (!(e.indexOf(a) >= 0)) { if (i.hot._acceptedDependencies[b]) { c[a] || (c[a] = []), F(c[a], [b]); continue } delete c[a], e.push(a), g.push({ chain: f.concat([a]), id: a }) } } } } } return { type: "accepted", moduleId: j, outdatedModules: e, outdatedDependencies: c } } function F(b, c) { for (var a = 0; a < c.length; a++) { var d = c[a]; 0 > b.indexOf(d) && b.push(d) } } e = e || {}; var A, B, s, n = {}, x = [], y = {}; for (var C in g) if (Object.prototype.hasOwnProperty.call(g, C)) { c = w(C), i = g[C] ? Q(c) : { type: "disposed", moduleId: C }; var t, f, j, o, c, i, z = !1, J = !1, K = !1, D = ""; switch (i.chain && (D = "\nUpdate propagation: " + i.chain.join(" -> ")), i.type) { case "self-declined": e.onDeclined && e.onDeclined(i), e.ignoreDeclined || (z = new Error("Aborted because of self decline: " + i.moduleId + D)); break; case "declined": e.onDeclined && e.onDeclined(i), e.ignoreDeclined || (z = new Error("Aborted because of declined dependency: " + i.moduleId + " in " + i.parentId + D)); break; case "unaccepted": e.onUnaccepted && e.onUnaccepted(i), e.ignoreUnaccepted || (z = new Error("Aborted because " + c + " is not accepted" + D)); break; case "accepted": e.onAccepted && e.onAccepted(i), J = !0; break; case "disposed": e.onDisposed && e.onDisposed(i), K = !0; break; default: throw new Error("Unexception type " + i.type) }if (z) return q("abort"), Promise.reject(z); if (J) for (c in y[c] = g[c], F(x, i.outdatedModules), i.outdatedDependencies) Object.prototype.hasOwnProperty.call(i.outdatedDependencies, c) && (n[c] || (n[c] = []), F(n[c], i.outdatedDependencies[c])); K && (F(x, [i.moduleId]), y[c] = function () { console.warn("[HMR] unexpected require(" + i.moduleId + ") to disposed module") }) } var G = []; for (f = 0; f < x.length; f++)d[c = x[f]] && d[c].hot._selfAccepted && G.push({ module: c, errorHandler: d[c].hot._selfAccepted }); q("dispose"), Object.keys(v).forEach(function (a) { if (!1 === v[a]) { var b; b = a, delete installedChunks[b] } }); for (var L = x.slice(); L.length > 0;)if (o = d[c = L.pop()]) { var M = {}, N = o.hot._disposeHandlers; for (j = 0; j < N.length; j++)(t = N[j])(M); for (l[c] = M, o.hot.active = !1, delete d[c], delete n[c], j = 0; j < o.children.length; j++) { var H = d[o.children[j]]; H && (A = H.parents.indexOf(c)) >= 0 && H.parents.splice(A, 1) } } for (c in n) if (Object.prototype.hasOwnProperty.call(n, c) && (o = d[c])) for (j = 0, s = n[c]; j < s.length; j++)B = s[j], (A = o.children.indexOf(B)) >= 0 && o.children.splice(A, 1); for (c in q("apply"), k = h, y) Object.prototype.hasOwnProperty.call(y, c) && (b[c] = y[c]); var r = null; for (c in n) if (Object.prototype.hasOwnProperty.call(n, c) && (o = d[c])) { s = n[c]; var E = []; for (f = 0; f < s.length; f++)if (B = s[f], t = o.hot._acceptedDependencies[B]) { if (E.indexOf(t) >= 0) continue; E.push(t) } for (f = 0; f < E.length; f++) { t = E[f]; try { t(s) } catch (O) { e.onErrored && e.onErrored({ type: "accept-errored", moduleId: c, dependencyId: s[f], error: O }), e.ignoreErrored || r || (r = O) } } } for (f = 0; f < G.length; f++) { var I = G[f]; m = [c = I.module]; try { a(c) } catch (u) { if ("function" == typeof I.errorHandler) try { I.errorHandler(u) } catch (P) { e.onErrored && e.onErrored({ type: "self-accept-error-handler-errored", moduleId: c, error: P, orginalError: u, originalError: u }), e.ignoreErrored || r || (r = P), r || (r = u) } else e.onErrored && e.onErrored({ type: "self-accept-errored", moduleId: c, error: u }), e.ignoreErrored || r || (r = u) } } return r ? (q("fail"), Promise.reject(r)) : (q("idle"), new Promise(function (a) { a(x) })) } var d = {}; function a(a) { if (d[a]) return d[a].exports; var g, h, f = d[a] = { i: a, l: !1, exports: {}, hot: (h = { _acceptedDependencies: {}, _declinedDependencies: {}, _selfAccepted: !1, _selfDeclined: !1, _disposeHandlers: [], _main: e !== (g = a), active: !0, accept: function (a, c) { if (void 0 === a) h._selfAccepted = !0; else if ("function" == typeof a) h._selfAccepted = a; else if ("object" == typeof a) for (var b = 0; b < a.length; b++)h._acceptedDependencies[a[b]] = c || function () { }; else h._acceptedDependencies[a] = c || function () { } }, decline: function (a) { if (void 0 === a) h._selfDeclined = !0; else if ("object" == typeof a) for (var b = 0; b < a.length; b++)h._declinedDependencies[a[b]] = !0; else h._declinedDependencies[a] = !0 }, dispose: function (a) { h._disposeHandlers.push(a) }, addDisposeHandler: function (a) { h._disposeHandlers.push(a) }, removeDisposeHandler: function (b) { var a = h._disposeHandlers.indexOf(b); a >= 0 && h._disposeHandlers.splice(a, 1) }, check: x, apply: B, status: function (a) { if (!a) return p; o.push(a) }, addStatusHandler: function (a) { o.push(a) }, removeStatusHandler: function (b) { var a = o.indexOf(b); a >= 0 && o.splice(a, 1) }, data: l[g] }, e = void 0, h), parents: (n = m, m = [], n), children: [] }; return b[a].call(f.exports, f, f.exports, c(a)), f.l = !0, f.exports } return a.m = b, a.c = d, a.d = function (b, c, d) { a.o(b, c) || Object.defineProperty(b, c, { configurable: !1, enumerable: !0, get: d }) }, a.n = function (c) { var b = c && c.__esModule ? function () { return c.default } : function () { return c }; return a.d(b, "a", b), b }, a.o = function (a, b) { return Object.prototype.hasOwnProperty.call(a, b) }, a.p = "", a.h = function () { return k }, c(41)(a.s = 41) }({ 1: function (module, exports) { var g; g = function () { return this }(); try { g = g || Function("return this")() || (0, eval)("this") } catch (e) { "object" == typeof window && (g = window) } module.exports = g }, 15: function (g, b, a) { "use strict"; Object.defineProperty(b, "__esModule", { value: !0 }); var h = Object.assign || function (d) { for (var a = 1; a < arguments.length; a++) { var b = arguments[a]; for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (d[c] = b[c]) } return d }; b.lory = function (a, f) { var g = void 0, m = void 0, o = void 0, p = void 0, q = void 0, r = void 0, s = void 0, t = void 0, u = void 0, v = void 0, w = 0, x = {}, y = !!(0, j.default)() && { passive: !0 }; function z(a, b) { var c = x.classNameActiveSlide; a.forEach(function (a, b) { a.classList.contains(c) && a.classList.remove(c) }), a[b].classList.add(c) } function A(b, c, d) { (0, k.default)(a, b + ".lory." + c, d) } function B(b, c, d) { var a = r && r.style; x.vertical && (a[u.transition + "TimingFunction"] = d, a[u.transition + "Duration"] = c + "ms", a[u.transform] = "translateY(" + b + "px)"), a && !x.vertical && (a[u.transition + "TimingFunction"] = d, a[u.transition + "Duration"] = c + "ms", a[u.transform] = "translateX(" + b + "px)") } function C(a) { return a.getBoundingClientRect().width || a.offsetWidth } function D(b, d) { var c = x, C = c.slideSpeed, k = c.slidesToScroll, a = c.infinite, e = c.rewind, l = c.rewindPrev, q = c.rewindSpeed, D = c.ease, E = c.classNameActiveSlide, r = c.classNameDisabledNextCtrl, f = void 0 === r ? "disabled" : r, u = c.classNameDisabledPrevCtrl, y = void 0 === u ? "disabled" : u, h = C, i = Math.round(m - o); A("before", "slide", { index: w, nextSlide: d ? w + 1 : w - 1 }), s && s.classList.remove(y), t && t.classList.remove(f), "number" != typeof b && (b = d ? a && w + 2 * a !== p.length ? w + (a - w % a) : w + k : a && w % a != 0 ? w - w % a : w - k), b = Math.min(Math.max(b, 0), p.length - 1), a && void 0 === d && (b += a), l && 0 === Math.abs(g.x) && !1 === d && (b = p.length - 1, h = q); var j = Math.min(Math.max(-1 * p[b][x.vertical ? "offsetTop" : "offsetLeft"], -1 * i), 0); e && Math.abs(g.x) === i && d && (j = 0, b = 0, h = q), B(j, h, D), g.x = j, p[b].offsetLeft <= i && (w = b), a && (b === p.length - a || b === p.length - p.length % a || 0 === b) && (d && (w = a), d || (w = p.length - 2 * a), g.x = -1 * p[w].offsetLeft, v = function () { B(-1 * p[w].offsetLeft, 0, void 0) }), E && z(n.call(p), w), !s || a || l || 0 !== b || s.classList.add(y), !t || a || e || b + 1 !== p.length || t.classList.add(f), t && !a && !e && x.vertical && b + x.verticalSlidesToShow === p.length && t.classList.add(f), A("after", "slide", { currentSlide: w }) } function b() { A("before", "init"), u = (0, i.default)(); var b = x = h({}, l.default, f), m = b.classNameFrame, o = b.classNameSlideContainer, v = b.classNamePrevCtrl, B = b.classNameNextCtrl, j = b.classNameDisabledNextCtrl, k = b.classNameDisabledPrevCtrl, C = b.enableMouseEvents, D = b.classNameActiveSlide, E = b.initialIndex; w = E, r = (q = a.getElementsByClassName(m)[0]).getElementsByClassName(o)[0], s = a.getElementsByClassName(v)[0], t = a.getElementsByClassName(B)[0], g = { x: r.offsetLeft, y: r.offsetTop }, x.infinite ? p = function (a) { var b = x.infinite; if (x.prerendered) return r.addEventListener(u.transitionEnd, H), n.call(r.children); var c = a.slice(0, b), d = a.slice(a.length - b, a.length); return c.forEach(function (a) { var b = a.cloneNode(!0); r.appendChild(b) }), d.reverse().forEach(function (a) { var b = a.cloneNode(!0); r.insertBefore(b, r.firstChild) }), r.addEventListener(u.transitionEnd, H), n.call(r.children) }(n.call(r.children)) : (p = n.call(r.children), s && !x.rewindPrev && s.classList.add(void 0 === k ? "disabled" : k), t && 1 === p.length && !x.rewind && t.classList.add(void 0 === j ? "disabled" : j)), c(), D && z(p, w), s && t && (s.addEventListener("click", d), t.addEventListener("click", e)), q.addEventListener("touchstart", I, y), C && (q.addEventListener("mousedown", I), q.addEventListener("click", L)), x.window.addEventListener("resize", M), x.vertical && void 0 !== x.verticalSlidesToShow && (r.style.height = r.querySelector(".js_slide").clientHeight * x.verticalSlidesToShow + (x.verticalSlidesToShow - 1) * 20 + "px"), A("after", "init") } function c() { var a = x, b = a.infinite, c = a.ease, d = a.rewindSpeed, e = a.rewindOnResize, f = a.classNameActiveSlide, h = a.initialIndex; m = C(r), o = C(q), o === m && (m = p.reduce(function (a, b) { return a + C(b) }, 0)), e ? w = h : (c = null, d = 0), b ? (B(-1 * p[w + b].offsetLeft, 0, null), w += b, g.x = -1 * p[w].offsetLeft) : (B(-1 * p[w].offsetLeft, d, c), g.x = -1 * p[w].offsetLeft), f && z(n.call(p), w) } function d() { D(!1, !1) } function e() { D(!1, !0) } "undefined" != typeof jQuery && a instanceof jQuery && (a = a[0]); var E = void 0, F = void 0, G = void 0; function H() { v && (v(), v = void 0) } function I(a) { var c = x.enableMouseEvents, b = a.touches ? a.touches[0] : a; c && (q.addEventListener("mousemove", J), q.addEventListener("mouseup", K), q.addEventListener("mouseleave", K)), q.addEventListener("touchmove", J, y), q.addEventListener("touchend", K); var d = b.pageX, e = b.pageY; E = { x: d, y: e, time: Date.now() }, G = void 0, F = {}, A("on", "touchstart", { event: a }) } function J(a) { var b = a.touches ? a.touches[0] : a, c = b.pageX, d = b.pageY; F = { x: c - E.x, y: d - E.y }, void 0 === G && (G = !!(G || Math.abs(F.x) < Math.abs(F.y))), !G && E && B(g.x + F.x, 0, null), A("on", "touchmove", { event: a }) } function K(a) { var b = 300 > Number(E ? Date.now() - E.time : void 0) && Math.abs(F.x) > 25 || Math.abs(F.x) > o / 3, c = !w && F.x > 0 || w === p.length - 1 && F.x < 0, d = F.x < 0; G || (b && !c ? D(!1, d) : B(g.x, x.snapBackSpeed)), E = void 0, q.removeEventListener("touchmove", J), q.removeEventListener("touchend", K), q.removeEventListener("mousemove", J), q.removeEventListener("mouseup", K), q.removeEventListener("mouseleave", K), A("on", "touchend", { event: a }) } function L(a) { F.x && a.preventDefault() } function M(a) { o !== C(q) && (c(), A("on", "resize", { event: a })) } return b(), { setup: b, reset: c, slideTo: function (a) { D(a) }, returnIndex: function () { return w - x.infinite || 0 }, prev: d, next: e, destroy: function () { A("before", "destroy"), q.removeEventListener(u.transitionEnd, H), q.removeEventListener("touchstart", I, y), q.removeEventListener("touchmove", J, y), q.removeEventListener("touchend", K), q.removeEventListener("mousemove", J), q.removeEventListener("mousedown", I), q.removeEventListener("mouseup", K), q.removeEventListener("mouseleave", K), q.removeEventListener("click", L), x.window.removeEventListener("resize", M), s && s.removeEventListener("click", d), t && t.removeEventListener("click", e), x.infinite && Array.apply(null, Array(x.infinite)).forEach(function () { r.removeChild(r.firstChild), r.removeChild(r.lastChild) }), A("after", "destroy") } } }; var c = a(16), i = m(c), d = a(17), j = m(d), e = a(18), k = m(e), f = a(20), l = m(f); function m(a) { return a && a.__esModule ? a : { default: a } } var n = Array.prototype.slice }, 16: function (b, a, c) { "use strict"; Object.defineProperty(a, "__esModule", { value: !0 }), a.default = function () { var d, b, a, c = void 0, e = void 0, f = void 0; return b = (d = document.createElement("_")).style, a = void 0, "" === b[a = "webkitTransition"] && (f = "webkitTransitionEnd", e = a), "" === b[a = "transition"] && (f = "transitionend", e = a), "" === b[a = "webkitTransform"] && (c = a), "" === b[a = "msTransform"] && (c = a), "" === b[a = "transform"] && (c = a), document.body.insertBefore(d, null), b[c] = "translateX(0)", document.body.removeChild(d), { transform: c, transition: e, transitionEnd: f } } }, 17: function (b, a, c) { "use strict"; Object.defineProperty(a, "__esModule", { value: !0 }), a.default = function () { var b = !1; try { var a = Object.defineProperty({}, "passive", { get: function () { b = !0 } }); window.addEventListener("testPassive", null, a), window.removeEventListener("testPassive", null, a) } catch (c) { } return b } }, 18: function (d, b, c) { "use strict"; Object.defineProperty(b, "__esModule", { value: !0 }), b.default = function (a, b, c) { var d = new e.default(b, { bubbles: !0, cancelable: !0, detail: c }); a.dispatchEvent(d) }; var a, e = (a = c(19)) && a.__esModule ? a : { default: a } }, 19: function (c, a, b) { (function (a) { var b = a.CustomEvent; c.exports = !function () { try { var a = new b("cat", { detail: { foo: "bar" } }); return "cat" === a.type && "bar" === a.detail.foo } catch (c) { } return !1 }() ? "undefined" != typeof document && "function" == typeof document.createEvent ? function (c, a) { var b = document.createEvent("CustomEvent"); return a ? b.initCustomEvent(c, a.bubbles, a.cancelable, a.detail) : b.initCustomEvent(c, !1, !1, void 0), b } : function (c, b) { var a = document.createEventObject(); return a.type = c, b ? (a.bubbles = Boolean(b.bubbles), a.cancelable = Boolean(b.cancelable), a.detail = b.detail) : (a.bubbles = !1, a.cancelable = !1, a.detail = void 0), a } : b }).call(a, b(1)) }, 20: function (b, a, c) { "use strict"; Object.defineProperty(a, "__esModule", { value: !0 }), a.default = { slidesToScroll: 1, slideSpeed: 300, rewindSpeed: 600, snapBackSpeed: 200, ease: "ease", rewind: !1, infinite: !1, initialIndex: 0, classNameFrame: "js_frame", classNameSlideContainer: "js_slides", classNamePrevCtrl: "js_prev", classNameNextCtrl: "js_next", classNameActiveSlide: "active", enableMouseEvents: !1, window: "undefined" != typeof window ? window : null, rewindOnResize: !0 } }, 41: function (a, c, b) { a.exports = b(15) } }) })



function isSliderReadyForSetup(el) {
    var image = el.querySelector('img');
    var isImageLoaded = image != null && typeof image !== "undefined" && image.complete && image.naturalHeight !== 0;
    return el.querySelectorAll('img[data-src], [data-module-loaded="false"]').length === 0 || isImageLoaded;
}

function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }

    return out;
}

function getActiveConfig(element, defaults) {
    var result = {};

    if (element.matches('.category-product-list') && !element.matches('.hawk-recommendation-list.slider')) {
        result = getCategoryProductListConfig(defaults);
    } else {
        if (element.sliderOptions) {
            result = extend({}, defaults, element.sliderOptions);
        } else {
            result = JSON.parse(JSON.stringify(defaults))
        }
    }

    if (!result.responsiveConfig) {
        if (element.classList.contains('dots')) {
            result.dots = true;
        }

        if (element.classList.contains('navigation')) {
            result.arrows = true;
            result.dots = true;
        }

        return result;
    }

    result.responsiveConfig.sort(function (a, b) {
        return b.breakpoint - a.breakpoint;
    })

    for (var ruleIndex = 0; ruleIndex < result.responsiveConfig.length; ruleIndex++) {
        var rule = result.responsiveConfig[ruleIndex];

        if (window.innerWidth >= rule.breakpoint) {
            result = extend({}, result, rule.settings);
            result.currentBreakpoint = rule.breakpoint;
            break;
        }
    }

    return result;
}

function setupSlider(el) {
    var defaults = {
        enableMouseEvents: true,
        classNameFrame: 'frame',
        classNameSlideContainer: 'slides',
        classNamePrevCtrl: 'prev',
        classNameNextCtrl: 'next',
        slidesToScroll: 1,
        slideCount: el.lorySlideCount,
        autoRotate: false,
        rewind: false,
        infinite: 1,
        autoRotateSpeed: 6000,
        dots: false,
        arrows: true,
        vertical: false
    };
    
    if (el === null || el === undefined || el.nodeName === "INPUT") {
        return false;
    }
   
    var dotsCount = slideCount = el.querySelectorAll('.slide').length;
    if (el.querySelectorAll('.js_slide').length > 0)
        slideCount = el.querySelectorAll('.js_slide').length;
    if (slideCount === 0) {
        return false;
    }
    if (slideCount === 1) {
        el.classList.remove('navigation');
        defaults.arrows = false;
    }
    var prerendered = Boolean(false);
    if (el.dataset.prerendered) {
        prerendered = (el.dataset.prerendered.toLowerCase() == "true")
        if (prerendered) {
            dotsCount = dotsCount - 2;
        }
    }

    var automaticSlide = true;
    var forceAutomaticSlide = false;
    var automaticInterval = 6000;
    var dotSlideStepSize = 1; // increase this to have dots scroll to correct index
    var slider = null;

    var options = {
        enableMouseEvents: el.classList.contains('no-mouse') ? false : true,
        classNameFrame: 'frame',
        classNameSlideContainer: 'slides',
        classNamePrevCtrl: 'prev',
        classNameNextCtrl: 'next'
    };

    if (el.classList.contains('category-product-list') && !el.classList.contains('hawk-recommendation')) {
        options['rewind'] = true;
        dotSlideStepSize = 2;
        if (window.innerWidth > 749) {
            dotSlideStepSize = 4;
        } else if (window.innerWidth > 549) {
            dotSlideStepSize = 3;
        } else if (window.innerWidth > 449) {
            dotSlideStepSize = 2;
        }
        if (el.getAttribute("data-slides")) {
            var found = parseInt(el.getAttribute("data-slides"));
            if (isNaN(found)) {
                var vals = JSON.parse(el.getAttribute("data-slides"));
                found = vals.filter(function (el) { return window.innerWidth >= el.res }).sort(function (a, b) { return b.count - a.count });
                if (found && found.length>0)
                    dotSlideStepSize = found[0].count;
            }
            else 
                dotSlideStepSize = found;
        }
        var slideWidth = (el.querySelector('.frame').clientWidth / dotSlideStepSize) - 3;
        [].slice.call(el.querySelectorAll('.slides .slide')).map(function (el) {
            el.style.width = slideWidth +"px";
        });
        dotsCount = slideCount / dotSlideStepSize;

        automaticSlide = false;
        el.classList.remove('lory-loaded');
    } else {
        options['infinite'] = 1;
    }
    
    if (el.classList.contains('responsive-scroller')) {
        var responsiveOptions = getActiveConfig(el, defaults);
        dotSlideStepSize = responsiveOptions.slidesToShow;
        options['slidesToScroll'] = responsiveOptions.slidesToScroll;
        
        var slideWidth = (el.querySelector('.frame').clientWidth / responsiveOptions.slidesToShow);
        [].slice.call(el.querySelectorAll('.slides .slide')).map(function (el) {
            el.style.width = slideWidth + "px";
        });
        
        dotsCount = slideCount / responsiveOptions.slidesToShow;
        automaticSlide = false;
        options['infinite'] = responsiveOptions.infinite ? 1 : false;
        options['rewind'] = responsiveOptions.rewind;
        options['slideSpeed'] = responsiveOptions.slideSpeed;
        
        if (responsiveOptions.dots) {
            el.classList.add('dots');
        } else {
            el.classList.remove('dots');
        }

        if (responsiveOptions.arrows) {
            el.classList.add('navigation');
        } else {
            el.classList.remove('navigation');
        }

        if (responsiveOptions.infinite) {
            options['rewind'] = false;
            options['infinite'] = responsiveOptions.slidesToScroll;
        }
        
        if (responsiveOptions.autoRotate) {
            automaticSlide = true;
            forceAutomaticSlide = true;
            automaticInterval = responsiveOptions.autoRotateSpeed;
        }
    }

    if (slideCount === 1) {
        el.classList.add('hide-next-prev');
        options['slidesToScroll'] = 0;
        automaticSlide = false;
        options['infinite'] = false;
    }

    if (el.classList.contains('no-infinite')) {
        options['infinite'] = false;
        options['rewind'] = true;
    }
    if (el.classList.contains('vertical-slider')) {
        options['infinite'] = false;
        options['vertical'] = true;
        options['rewind'] = false;
        options['verticalSlidesToShow'] = typeof el.dataset.verticalslidestoshow !== 'undefined' ? parseInt(el.dataset.verticalslidestoshow) : 4;
        options['enableMouseEvents'] = false;
    }
    if (el.classList.contains('ae-product-carousel__thumbs') && !el.classList.contains('vertical-slider') && slideCount > 1) {
        options['infinite'] = false;
        options['rewind'] = false;
    }
  
    if (el.dataset.slidestoscroll && parseInt(el.dataset.slidestoscroll) > 0) {
        options['slidesToScroll'] = parseInt(el.dataset.slidestoscroll);
       
    } 
     if (el.dataset.diablemouseevents) {
         options['enableMouseEvents'] = false;
    }
    if (el.dataset.slidestoshow) {
        var slideWidth = (el.querySelector('.frame').clientWidth / parseInt(el.dataset.slidestoshow));
        [].slice.call(el.querySelectorAll('.slides .slide')).map(function (el) {
            el.style.width = slideWidth + "px";
        });
    }

    if (phe.config.isWebPageTest) {
        automaticSlide = false;
    }
    
    // This event has to be here because not everything is triggered with a bubble. 
    el.addEventListener('switch.lory.slide', function (e) {
        e.stopPropagation();
        e.target.lory_slider.slideTo(e.detail.id);
    });

    // setup navigation
    if (slideCount > 1 && (el.classList.contains('navigation') && !el.classList.contains('no-navigation') && el.querySelector('.frame .owl-nav') === null)) {
        var nav = document.createElement('div');
        nav.classList.add('owl-nav');

        var btnPre = document.createElement('button');
        btnPre.setAttribute('type', 'button');
        btnPre.classList.add('owl-prev');
        btnPre.classList.add('prev');
        btnPre.setAttribute('aria-label', 'Previous');
        var spnPre = document.createElement('span');
        spnPre.classList.add('icon-chevron-left');
        btnPre.appendChild(spnPre);
        nav.appendChild(btnPre);

        var btnNext = document.createElement('button');
        btnNext.setAttribute('type', 'button');
        btnNext.classList.add('owl-next');
        btnNext.classList.add('next');
        btnNext.setAttribute('aria-label', 'Next');
        var spnNext = document.createElement('span');
        spnNext.classList.add('icon-chevron-right');
        btnNext.appendChild(spnNext);
        nav.appendChild(btnNext);


        el.querySelector('.frame').appendChild(nav);
    }


    // setup dots
    if (slideCount > 1 && !el.classList.contains('lory-loaded')
      && ((el.classList.contains('dots') && el.querySelector('.frame .dots') === null)
        || el.querySelector('.dots'))) {

        var dot_container = el.querySelector('.dots') ? el.querySelector('.dots') : document.createElement('ul');
        
        dot_container.innerHTML = '';
        dot_container.classList.add('js_dots');
        dot_container.classList.add('dots');
        el.querySelector('.frame').appendChild(dot_container);

        var dot_template = document.createElement('li');
        var data_slide_index = 0;

        //account for infinite scroll here
        for (var i = 0; i < dotsCount; i++) {
            var node = dot_template.cloneNode();
            node.setAttribute('data-slide-index', data_slide_index);
            node.setAttribute('aria-label', i + 1);

            node.addEventListener('click', function (e) {
                slider.slideTo(parseInt(e.target.getAttribute('data-slide-index')));
            });

            dot_container.appendChild(node);
            data_slide_index += dotSlideStepSize;
        }

        dot_container.childNodes[0].classList.add('active');

        var event = new CustomEvent('after.slider.image.dots', { detail: { slideIndex: slideCount } });
        el.dispatchEvent(event);
    }
    
    if (el.lory_slider) {
        el.lory_slider.destroy();
    }


    options.prerendered = prerendered;

    slider = lory(el, options);
    slider.tracked = [];
    slider.tracked.push(0);
    slider.targetid = el.id;
    el.lory_slider = slider;
    el.classList.add('lory-loaded');

    if (automaticSlide && el.classList.contains('auto') || forceAutomaticSlide) {
        setInterval(function () {
            slider.next();
        }, automaticInterval);
    } 
    AutoHidePrevNextLory();
}

function setupSliders() {
    [].slice.call(document.querySelectorAll('.slider:not(.multirange), .scroller')).map(function (el) {
        if (!el.classList.contains('delay')) {
            var interval = setInterval(function () {
                if (isSliderReadyForSetup(el)) {
                    clearInterval(interval);
                    setupSlider(el);
                    AutoHidePrevNextLory();
                }
            }, 200);
        }
    });
}

window.setupSlider = setupSlider;
document.addEventListener('DOMContentLoaded', function () {
    setupSliders();
});
document.addEventListener('turbo:load', setupSliders);

function AutoHidePrevNextLory() {
    [].slice.call(document.querySelectorAll('.slider.category-product-list.lory-loaded,.ae-more-products__slider.lory-loaded,.slider.auto-hide-next-prev')).map(function (el) {
        var frameWidth = el.querySelector('.frame').clientWidth;
        var slideWidth = el.querySelectorAll('.slide').length * el.querySelector('.slide').clientWidth;
        if (el.querySelector('.prev')) {
            if (frameWidth >= (slideWidth - 30)) {
                el.querySelector('.prev').classList.add('hide');
                el.querySelector('.next').classList.add('hide');
            } else {
                el.querySelector('.prev').classList.remove('hide');
                el.querySelector('.next').classList.remove('hide');
            }
        }
    });
}

window.AutoHidePrevNextLory = AutoHidePrevNextLory;

window.addEventListener('resize', function () {
    //reset dots and images
    [].slice.call(document.querySelectorAll('.slider.category-product-list')).map(function (el) {
        
        if (isSliderReadyForSetup(el)) {
            setupSlider(el);
        }
    });

    AutoHidePrevNextLory();
});

document.addEventListener('after.lory.slide', function (e) {
    function isLastSlideVisible(x) {
        var slideNode = x.getBoundingClientRect();
        var containerNode = x.parentNode.parentNode.getBoundingClientRect();

        return slideNode.x + slideNode.width <= containerNode.x + containerNode.width;
    }
    
    var indexes = [];
    var dots = e.target.querySelectorAll('.dots li');

    if (dots.length) {
        [].slice.call(dots).map(function (dot) {
            dot.classList.remove('active');
            indexes.push(parseInt(dot.getAttribute('data-slide-index')));
        });

        var loryIndex = e.target.classList.contains('no-infinite') ? e.detail.currentSlide : e.detail.currentSlide - 1;
        var activeIndex = Math.max.apply(null, indexes.filter(function (v) { return v <= loryIndex } ));
        e.target.querySelector('[data-slide-index="' + activeIndex + '"]').classList.add('active');
    }

     //Fixes some active slide index issues inherent with Lory.JS
    setTimeout(function () {
        if (isLastSlideVisible(e.target.querySelector('.slide:last-of-type'))) {
            var arrow = e.target.querySelector('button.next');
            var dot = e.target.querySelector('.dots li:last-of-type');

            if (arrow) {
                arrow.classList.add('disabled');
            }
            
            if (dot) {
                [].slice.call(dots).map(function (dot) {
                    dot.classList.remove('active');
                });
                
                dot.classList.add('active');
            }
        }
    }, 600);
});

document.addEventListener('after.lory.slide', function (e) {
    var slide = e.target.querySelector('.slide.active');
    var index = slide && parseInt(slide.getAttribute('data-index'));
    var slider = e.target.lory_slider;

    if (slider.tracked.indexOf(index) === -1 && slide) {
        slider.tracked.push(index);
        var a = slide.querySelector('a');

        if (a && phe.config.isCoremetricsEnabled) { // Cookie check happens inside trackNNN function calls.
            var href = a.getAttribute('href');

            a.addEventListener('click', function (e) {
                e.preventDefault();

                if (typeof _cm !== "undefined") {
                    var k = new _cm("tid", "9");
                    trackManualLinkClickTag(href, a.getAttribute('id'), c1(k.ci));
                }

                window.location.href = href;
            });

            if (typeof CM === "undefined") return;

            var link = new CM(CP(href));
            if (link === undefined || link.cm_sp === undefined) return;

            trackManualImpressionTag(link.cm_sp);
        }
    }
});

// Fix drag and drop issue. 
document.addEventListener('mousedown', function (e) {
    // There is an apparent bug on the desktop site this aims to fix. 
    if (!e.target) {
        return;
    }
    
    var el = e.target.closest('.slide');
    
    if (el) {
        e.preventDefault();
    }
});;
// POLYFILL: includes 
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
(function () {
    if (typeof window.CustomEvent === "function") return false; //If not IE
   
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
   
})();
var _ = (function () {
    function ready(fn, onWindowLoad) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {

            fn();
        } else {
            if (onWindowLoad)
                window.addEventListener('load', fn);
            else
                document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function jsonToQueryString(json) {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }

    //_.ajax({
    //    "type": "GET",
    //    "data": "",
    //    "dataType": "jsonp",
    //    "async": "true",
    //    "contentType": "application/json; charset=utf-8",
    //    "url": url,
    //    "success": function () {
    //        // do nothing
    //    }
    //});

    function ajax(url, method, data, onSuccess, onFailure, contentType, isSync) {
        var options = url;

        if (typeof url !== 'object') {
            options = {
                url: url,
                method: method,
                data: data,
                success: onSuccess,
                failure: onFailure,
                contentType: contentType,
                async: !isSync
            }
        }

        var request = new XMLHttpRequest();
        var self = this;

        request.addEventListener('load', function () {
            if (request.status === 500 || request.status === 422) {
                options.failure.bind(self)(JSON.parse(request.response));
                return;
            }

            var parsed = request.response;

            if (options.contentType != "text/html") {
                parsed = JSON.parse(parsed);
            }

            options.success.bind(self)(parsed);
        });

        if (options.method.toUpperCase() === 'GET' && options.data != null) {
            var queryString = jsonToQueryString(options.data);
            var connector = queryString.length > 0 ? (options.url.indexOf('?') > -1 ? '&' : '?') : '';
            options.url += connector + queryString;
        }

        request.open(options.method, options.url, options.async);

        var requestData = null;

        options.contentType = options.contentType ? options.contentType : 'application/json';
        request.setRequestHeader("Content-Type", options.contentType);
        request.setRequestHeader("Accept", options.contentType);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        //to support ValidateAntiForgeryToken:
        if (options.contentType.toLowerCase() === 'application/x-www-form-urlencoded' && options.method.toUpperCase() === 'POST') {
            addSecurityToken(options.data);
            if (options.data['__RequestVerificationToken']) {
                request.setRequestHeader('RequestVerificationToken', options.data['__RequestVerificationToken']);
            }
            requestData = jsonToQueryString(options.data);
        }
        else if (options.data && options.method.toUpperCase() !== 'GET') {
            addSecurityToken(options.data);
            if (options.data['__RequestVerificationToken']) {
                request.setRequestHeader('RequestVerificationToken', options.data['__RequestVerificationToken']);
            }
            requestData = JSON.stringify(options.data);
        }
        request.send(requestData);
    }

    function jsonp(src, options) {
        options = options ? options : {};
        var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function () { },
            on_timeout = options.onTimeout || function () { },
            timeout = options.timeout || 10; // sec

        var timeout_trigger = window.setTimeout(function () {
            window[callback_name] = function () { };
            on_timeout();
        }, timeout * 1000);

        window[callback_name] = function (data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function removeClass(el, className) {
        if (!el)
            return;
        if (el.classList)
            el.classList.remove(className);
        else if (el.className)
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    function addClass(el, className) {
        if (!el)
            return;

        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    }

    function hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    function setInnerText(selector, text) {
        [].slice.call(document.querySelectorAll(selector)).map(function (el) {
            el.innerText = text;
        });
    }

    function addClassBySelector(selector, className, parent) {

        if (parent !== undefined && parent !== null) {
            [].slice.call(parent.querySelectorAll(selector)).map(function (el) {
                addClass(el, className);
            });
        } else {
            [].slice.call(document.querySelectorAll(selector)).map(function (el) {
                addClass(el, className);
            });
        }
    }

    function removeClassBySelector(selector, className, parent) {
        if (parent !== undefined && parent !== null) {
            [].slice.call(parent.querySelectorAll(selector)).map(function (el) {
                removeClass(el, className);
            });
        } else {
            [].slice.call(document.querySelectorAll(selector)).map(function (el) {
                removeClass(el, className);
            });
        }
    }

    function getCookie(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");

            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);

                if (end == -1) {
                    end = document.cookie.length;
                }

                return unescape(document.cookie.substring(start, end));
            }
        }

        return "";
    }

    function setCookie(name, value, days) {
        var today = new Date();
        var expire = new Date();

        if (days === null || days === 0) {
            days = 1;
        }

        expire.setTime(today.getTime() + 3600000 * 24 * days);
        document.cookie = name + "=" + escape(value) + ";secure;path=/;expires=" + expire.toGMTString();
    }

    function trackEvent(eventID, actionType, categoryID, attributes) {
        if (phe.config.cookies.allowPerformanceCookies) {

            ga_trackEvent(eventID, actionType, categoryID, attributes && attributes.push && attributes.length >= 7 ? attributes[6] : '');

            if (phe.config.isCoremetricsEnabled) {

                if (attributes && attributes.push) {
                    attributes = attributes.join("-_-");
                }
                if (typeof cmCreateConversionEventTag !== "undefined") {
                    cmCreateConversionEventTag(eventID, actionType, categoryID, attributes ? 0 : undefined, attributes);
                } else {
                    cmTagQueue.push(['cmCreateConversionEventTag', eventID, actionType, categoryID, attributes ? 0 : undefined, attributes]);
                }
            }

        }

    }
    function ga_trackEvent(eventID, actionType, categoryID, eventLabel) {
        if (phe.config.cookies.allowPerformanceCookies) {
            var action = '';
            if (parseInt(actionType) > 0) {
                action = '-' + (parseInt(actionType) === 1 ? 'Initiated' : parseInt(actionType) === 2 ? 'Completed' : actionType)
            }
            if (window.dataLayer) {
                dataLayer.push({
                    'event': 'EE_TrackEvent',
                    'ee_EventAction': eventID + action,
                    'ee_EventCategory': categoryID,
                    'ee_EventLabel': eventLabel || ''
                });
            }
            if (phe.config.isJsDebuggingEnabled && window.console && window.console.log) {
                console.log("ga_trackEvent(\"" + eventID + action + "\",\"" + categoryID + "\",\"" + (eventLabel || '') + "\");");
            }
        }
    }


    function trackElement(elementID, elementCategory, attributes, skipGA) {
        if (phe.config.cookies.allowPerformanceCookies) {
            if (phe.config.isCoremetricsEnabled) {
                if (attributes && attributes.push) {
                    attributes = attributes.join("-_-");
                }

                if (typeof cmCreateElementTag !== "undefined") {
                    cmCreateElementTag(elementID, elementCategory, attributes);
                } else {
                    cmTagQueue.push(['cmCreateElementTag', elementID, elementCategory, attributes]);
                }

                if (phe.config.isJsDebuggingEnabled && window.console && window.console.log) {
                    console.log("cmCreateElementTag(\"" + elementID + "\",\"" + elementCategory + "\",\"" + (attributes || '') + "\");");
                }
            }
            if (!skipGA)
                ga_trackEvent(elementID, 0, elementCategory, attributes && attributes.push && attributes.length >= 7 ? attributes[6] : '');
        }
    }


    function trackRegistrationTag(custId, email) {
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreateRegistrationTag !== "undefined") {
                cmCreateRegistrationTag(custId, email);
            } else {
                cmTagQueue.push(['cmCreateRegistrationTag', custId, email]);
            }
        }
    }

    function trackManualImpressionTag(e) {
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreateManualImpressionTag !== "undefined") {
                var k = new _cm("tid", "9");
                cmCreateManualImpressionTag(c1(k.ci), e);
            } else {
                cmTagQueue.push(['cmCreateManualImpressionTag', "", e]);
            }
        }
    }

    function trackManualLinkClickTag(b, c, a) {
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreateManualLinkClickTag !== "undefined") {
                cmCreateManualLinkClickTag(b, c, a);
            } else {
                cmTagQueue.push(['cmCreateManualLinkClickTag', b, c, a]);
            }
        }
    }

    function trackShopAction5Tag(SKU, productName, itemQuantity, itemPrice, cMCategoryID, guid) {

        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreateShopAction5Tag !== "undefined") {
                cmCreateShopAction5Tag(SKU, productName, itemQuantity, itemPrice, cMCategoryID, guid);
                cmDisplayShop5s();
            } else {
                cmTagQueue.push(['cmCreateShopAction5Tag', SKU, productName, itemQuantity, itemPrice, cMCategoryID, guid]);
                cmTagQueue.push(['cmDisplayShop5s']);
            }
        }
    }

    function trackPageElement(pageId, categoryId) {
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreatePageElementTag !== "undefined") {
                cmCreatePageElementTag(pageId, categoryId);
            } else {
                cmTagQueue.push(['cmCreatePageElementTag', pageId, categoryId]);
            }
        }
    }

    function trackPageView(pageId, categoryId, customerGuid) {
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            if (typeof cmCreatePageviewTag !== "undefined") {
                cmCreatePageviewTag(pageId, categoryId, '', '', '', customerGuid);
            } else {
                cmTagQueue.push(['cmCreatePageviewTag', pageId, categoryId, '', '', '', customerGuid]);
            }
        }
    }


    function trackProductClick(productId, categoryId, productType, anchor) {
        var href = anchor.getAttribute('href');
        var data = {
            productID: productId,
            itemType: productType,
            categoryID: categoryId
        };

        _.ajax('/cart/coremetricsaddcartitem', 'POST', data, function (res) {
            //FIRST REMOVE ONCLICK BEFORE RE-CLICKING THE ANCHOR
            anchor.removeAttribute("onclick");

            if (navigator.appName == 'Microsoft Internet Explorer') {
                //WORKS IN IE ONLY  
                setTimeout(function () {
                    try {
                        anchor.click();
                    }
                    catch (e) {
                        //catching all java script exception here since in wizard results page when the user tries to
                        //move away from the page browser would pop an message asking a user if he is sure to leave the page
                        //if user selects yes, then i would throw an exception here "breaking on jscript runtime error jquery is undefined"
                    }
                }, 100);
            }
            else {
                ////CAUSES US TO LOSE REFERRER IN IE ONLY WHICH IS NEEDED FOR BREADCRUMBS ON PRODUCT PAGE
                if (href) {
                    window.location.href = href;
                }
            }
        });
    }

    function trackElement(elementID, elementCategory, attributes) {
        if (phe.config.cookies.allowPerformanceCookies) {
            if (phe.config.isCoremetricsEnabled) {
                if (typeof cmCreateElementTag !== "undefined") {
                    cmCreateElementTag(elementID, elementCategory, attributes);
                } else {
                    cmTagQueue.push(['cmCreateElementTag', elementID, elementCategory, attributes]);
                }

                if (phe.config.isJsDebuggingEnabled && window.console && window.console.log) {
                    console.log("cmCreateElementTag(\"" + elementID + "\",\"" + elementCategory + "\",\"" + (attributes || '') + "\");");
                }
            }
            ga_trackEvent(elementID, 0, elementCategory, attributes && attributes.push && attributes.length >= 7 ? attributes[6] : '');
        }
    }

    function getUrlParameter(name, url) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(url?url:location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    function wire(selector, event, handler) {
        // should add array handler for multiple event bindings.

        [].slice.call(document.querySelectorAll(selector)).map(function (el) {
            el.addEventListener(event, handler);
        });
    }

    function on(eventName, selector, action) {
        document.addEventListener(eventName, function (e) {
            var el;

            if (!e.target.matches(selector)) {
                el = e.target.closest(selector);
            }

            if (el == null)
                return;

            action(el);
        })
    }
    function addSecurityToken(data) {
        if (phe.config.antiForgeryToken && data && !data.__RequestVerificationToken)
            data.__RequestVerificationToken = phe.config.antiForgeryToken;
        return data;
    }
    return {
        "toggleClass": function (el, className) {
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);

                el.className = classes.join(' ');
            }
        },
        "removeClass": removeClass,
        "addClass": addClass,
        "hasClass": hasClass,
        "ready": ready,
        "ajax": ajax,
        "getCookie": getCookie,
        "setCookie": setCookie,
        "trackEvent": trackEvent,
        "trackRegistrationTag": trackRegistrationTag,
        "trackProductClick": trackProductClick,
        "trackManualImpressionTag": trackManualImpressionTag,
        "getUrlParameter": getUrlParameter,
        "wire": wire,
        "trackManualLinkClickTag": trackManualLinkClickTag,
        "trackPageView": trackPageView,
        "trackElement": trackElement,
        "trackPageElement": trackPageElement,
        "trackShopAction5Tag": trackShopAction5Tag,
        "setInnerText": setInnerText,
        "addClassBySelector": addClassBySelector,
        "removeClassBySelector": removeClassBySelector,
        "on": on,
        "jsonp": jsonp,
        "attr": function (el, attribute, value) {
            if (el && typeof el !== 'undefined') {
                el.setAttribute(attribute, value);
            }
        },
        "trigger": function (eventName, data) {
            const e = new CustomEvent(eventName, { detail: data });
            document.dispatchEvent(e);
        },
        "addSecurityToken": addSecurityToken,
        "ga_trackEvent": ga_trackEvent,
        "hasAttr": function (el, attribute) {
            if (el && typeof el !== 'undefined') {
               return el.hasAttribute(attribute);
            }
            return false;
        },
        "setAttr": function (elements, attribute, value) {
            if (elements && typeof elements !== 'undefined') {
                [].slice.call(elements).map(function (el) {
                    el.setAttribute(attribute, value);
                });
               
            }
        },
        "getAttr": function (el, attribute) {
            if (el && typeof el !== 'undefined') {
                return el.getAttribute(attribute);
            }
            return false;
        },
    };
})();

//to support trackevent handler in html
trackEvent = _.trackEvent;
trackManualImpressionTag = _.trackManualImpressionTag;
trackManualLinkClickTag = _.trackManualLinkClickTag;
trackRegistrationTag = _.trackRegistrationTag;
getCookie = _.getCookie;
SetCookie = _.setCookie;
setCookie = _.setCookie;
ga_trackEvent = _.ga_trackEvent;

document.addEventListener('click', function (e) {

    if (e.target.matches('.CoremetricsCategory') || (e.target.closest('a') != null && e.target.closest('a').matches('.CoremetricsCategory'))) {

        var el = e.target.classList.contains('CoremetricsCategory') ? e.target : e.target.closest('a');
        var hrefAttr = el.getAttribute('data-href');

        if (el.getAttribute('href') === "#"
            && typeof hrefAttr !== typeof undefined
            && hrefAttr !== false) {

            el.setAttribute('href', hrefAttr);
        }
        if (phe.config.isCoremetricsEnabled) { // Cookie check happens inside trackProductClick function.

            setCoremetricsItem(el.getAttribute('data-productid'),
                el.hasAttribute('data-productcategoryid') ? el.getAttribute('data-productcategoryid') : el.getAttribute('data-category'),
                el.hasAttribute('data-cm-producttype') ? el.getAttribute('data-cm-producttype') : el.getAttribute('data-itemtype'),
                el);
        }
        if (typeof hrefAttr !== typeof undefined
            && hrefAttr !== false) {

            window.location = hrefAttr;
            return false;
        }
    }
    else if (e.target.matches('.dynamicCoremetricsCategory') || (e.target.closest('a') != null && e.target.closest('a').matches('.dynamicCoremetricsCategory'))) {

        var el = e.target.classList.contains('dynamicCoremetricsCategory') ? e.target : e.target.closest('a');
        var hrefAttr = el.getAttribute('data-href');

        if (el.getAttribute('href') === "#"
            && typeof hrefAttr !== typeof undefined
            && hrefAttr !== false) {
            el.setAttribute('href', hrefAttr);
        }
        if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
            var cookieName = 'cmDynamicViewed';
            var pid = el.getAttribute('data-productid');
            var pItemType = el.getAttribute('data-dynamicproducttype');
            if (pid != null && typeof pid !== typeof undefined && parseInt(pid) > 0
                && pItemType != null && typeof pItemType !== typeof undefined) {
                cookieValue = pid + '=' + pItemType;
                document.cookie = cookieName + "=" + cookieValue + ";secure;path=/;";
            }
        }

        if (typeof hrefAttr !== typeof undefined
            && hrefAttr !== false) {
            window.location = hrefAttr;
            return false;
        }
    }
});

function navigateToLocation(href, parent) {
    if (parent !== undefined && parent === 'true') {
        window.parent.internalLinkClicked = true;
        this.window.parent.location.href = href;
    }
    else {
        window.internalLinkClicked = true;
        this.window.location.href = href;
    }
}


function setCoremetricsItem(iPID, iCategoryID, iItemType, anchor, cancelNav,searchTerm) {
     if (!iCategoryID)
        iCategoryID = 0;

    var href = anchor && anchor.getAttribute("href");
    var cookieName = 'cmViewed';
    var cookieValue = getCookie(cookieName);
    var products = cookieValue.split('&');
    var updatedList = [];

    if (cookieValue.length > 0) {
        var index = 0;

        products.forEach(function (v) {
            if (v.split('=').length > 1) {
                var pid = v.split('=')[1].split(',')[0];
                var pItemType = v.split('=')[1].split(',')[1];
                var pCatId = v.split('=')[1].split(',')[2];
                var pSearchTerm = null;
                if (v.split('=')[1].split(',').length > 3)
                    pSearchTerm = v.split('=')[1].split(',')[3];
                if (parseInt(pid) !== parseInt(iPID)) {
                    index += 1;
                    updatedList.push('Product' + index + 'ID=' + pid + ',' + pItemType + ',' + pCatId + (pSearchTerm ? (',' + pSearchTerm): ''));
                }
            }
        });
    }

    updatedList.push('Product' + (updatedList.length + 1) + 'ID=' + iPID + ',' + iItemType + ',' + iCategoryID + (searchTerm ? (',' + decodeURI(searchTerm.toLowerCase())) : ''));
    cookieValue = updatedList.join('&');
    if (phe.config.cookies.allowPerformanceCookies) {
        document.cookie = cookieName + "=" + cookieValue + ";secure;path=/;";
    }
    if (!cancelNav) {
        //FIRST REMOVE ONCLICK BEFORE RE-CLICKING THE ANCHOR
        anchor.removeAttribute("onclick");

        if (navigator.appName == 'Microsoft Internet Explorer') {
            //WORKS IN IE ONLY  
            setTimeout(function () {
                try {
                    anchor.click();
                }
                catch (e) {
                    //catching all java script exception here since in wizard results page when the user tries to
                    //move away from the page browser would pop an message asking a user if he is sure to leave the page
                    //if user selects yes, then i would throw an exception here "breaking on jscript runtime error jquery is undefined"
                }
            }, 100);
        }
        else {
            ////CAUSES US TO LOSE REFERRER IN IE ONLY WHICH IS NEEDED FOR BREADCRUMBS ON PRODUCT PAGE
            if (href) {
                navigateToLocation(href);
            }
        }
    }
}

function a11yClick(event) {
    if (event.type === 'click') {
        return true;
    }
    else if (event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            return true;
        }
    }
    else {
        return false;
    }
}

function generateErrorMessage(e) {
    var validationError = document.createElement('div');
    validationError.classList.add('text-red');
    var validationErrorText = e.getAttribute('data-error-message');
    if (validationErrorText == null) {
        validationErrorText = e.getAttribute('title') + ' is invalid';
    }
    validationError.appendChild(document.createTextNode(validationErrorText));
    return validationError;
}

function trackGooglePromoView_Click(ele) {
    if (ele && ele.hasAttribute('href') && ele.getAttribute('href').match(/\?cm_sp/)) {
        var cm_sp_Val = GetQueryStringParams('cm_sp', ele.getAttribute('href').substring(ele.getAttribute('href').indexOf('?') + 1));
        var promoView = cm_sp_Val && cm_sp_Val.length > 0 ? cm_sp_Val.split('+').join(' ').split('-_-') : [];
        if (window.dataLayer && promoView && promoView.length > 2) {
            dataLayer.push({
                'event': 'promotionClick',
                'ecommerce': {
                    'promoClick': {
                        'promotions': [
                            {
                                'creative': promoView[0],
                                'name': promoView[1],
                                'position': promoView[2]
                            }]
                    }
                }
            });
            if (phe.config.isGA4Enabled) {

                dataLayer.push({ ecommerceGA4: null });
                dataLayer.push({
                    'event': 'select_promotion',
                    'ecommerceGA4': {
                        'creative_name': promoView[0],
                        'promotion_name': promoView[1],
                        'promotion_id': promoView[1],
                        'creative_slot': promoView[2]
                    }
                });
            }
        }
    }
}

function trackGooglePromoViews() {
    if (window.dataLayer) {
        var promoViewsHrefs = [];
        [].slice.call(document.querySelectorAll('a')).map(function (el) {
            if (el.hasAttribute('href') && el.getAttribute('href').match(/\?cm_sp/)) {
                var cm_sp_Val = GetQueryStringParams('cm_sp', el.getAttribute('href').substring(el.getAttribute('href').indexOf('?') + 1));

                var promoView = cm_sp_Val && cm_sp_Val.length > 0 ? cm_sp_Val.split('+').join(' ').split('-_-') : [];
                if (promoView != null && promoView.length > 2) {
                    if (promoViewsHrefs.indexOf(cm_sp_Val) === -1)
                        promoViewsHrefs.push(cm_sp_Val);
                    el.addEventListener('click', function () { trackGooglePromoView_Click(this); });
                }
            }
        });
        var promoViews = [];
        var promoViewsGA4 = [];
        [].slice.call(promoViewsHrefs).map(function (href) {
            var promoView = href.split('+').join(' ').split('-_-');
            if (promoView != null && promoView.length > 2) {
                promoViews.push({
                    'creative': promoView[0],
                    'name': promoView[1],
                    'position': promoView[2]
                });

                if (promoViews.length > 0) {
                    if (phe.config.isGA4Enabled) {
                        dataLayer.push({ ecommerceGA4: null });
                        dataLayer.push({
                            'event': 'view_promotion',
                            'ecommerceGA4': {
                                'creative_name': promoView[0],
                                'promotion_name': promoView[1],
                                'promotion_id': promoView[1],
                                'creative_slot': promoView[2]
                            }
                        });
                    }
                    dataLayer.push({
                        'event': 'promotionView',
                        'ecommerce': {
                            'promoView': {
                                'promotions': promoViews
                            }
                        }
                    });
                }
            }
        });

    }
}

function GetQueryStringParams(sParam, url) {
    var sPageURL = typeof url !== 'undefined' ? url : window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
_.ready(function () {
    var interval = null;
    function CanTrackGooglePromoViews() {
        if (window.dataLayer) {
            if (typeof interval !== 'undefined' && interval != null) {
                clearTimeout(interval);
            }
            trackGooglePromoViews();
        } else {
            interval = setTimeout(CanTrackGooglePromoViews, 500);
        }
    }
    CanTrackGooglePromoViews();
    countdownTimerWidgets();
 });

function countdownTimerWidgets() {

    window.countdownTimers = window.countdownTimers || [];
    [].slice.call(document.querySelectorAll('.countdownTimer')).map(function (el) {
        if (window.countdownTimers.filter(function (ele) { return ele.getAttribute('uniqueid') === el.getAttribute('uniqueid'); }).length === 0
            && el.getAttribute('reachedZero') !== '1'
            && el.offsetWidth > 0 && el.offsetHeight > 0) {

            window.countdownTimers.push(el);
            var countDownDate = new Date();

            var data = GetCounDownTimeFromCookie(el.getAttribute('id')
                , (parseInt(el.getAttribute('data-hours')) > -1 ? parseInt(el.getAttribute('data-hours')) : 0)
                , (parseInt(el.getAttribute('data-minutes')) > -1 ? parseInt(el.getAttribute('data-minutes')) : 0)
                , (parseInt(el.getAttribute('data-seconds')) > -1 ? parseInt(el.getAttribute('data-seconds')) : 0));

            countDownDate.setHours(countDownDate.getHours() + data.h);
            countDownDate.setMinutes(countDownDate.getMinutes() + data.m);
            countDownDate.setSeconds(countDownDate.getSeconds() + data.s);
            el.setAttribute('countdowndatetime', countDownDate.getTime());

            el.addEventListener('countdownTimer_update', function () {

                var he = this.querySelector('.hours .number');
                var me = this.querySelector('.minutes .number');
                var se = this.querySelector('.seconds .number');

                var now = new Date().getTime();
                var timeleft = parseInt(this.getAttribute('countdowndatetime')) - now;
                var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

                if (he && hours > -1) {
                    he.setAttribute('data-current', hours);
                    he.innerText = String(hours).padStart(2, '0');
                } if (me && minutes > -1) {
                    me.setAttribute('data-current', minutes);
                    me.innerText = String(minutes).padStart(2, '0');
                } if (se && seconds > -1) {
                    se.setAttribute('data-current', seconds);
                    se.innerText = String(seconds).padStart(2, '0');
                }

                if (hours <= 0 && minutes <= 0 && seconds <= 0 && this.getAttribute('reachedZero', '1') !== '1') {
                    this.setAttribute('reachedZero', '1');
                    var uniqueid = this.getAttribute('uniqueid');

                    window.countdownTimers = window.countdownTimers.filter(function (ele) { return ele.getAttribute('uniqueid') !== uniqueid; });
                    if (this.getAttribute('jseventoncountdowncompletion')) {
                        const event = new CustomEvent(this.getAttribute('jseventoncountdowncompletion'), { detail: { id: this.getAttribute('id'), uniqueid: this.getAttribute('uniqueid') } });
                        document.dispatchEvent(event);
                    }
                    UpdateCounDownTimeInCookie(this.getAttribute('id'), 0, 0, 0);
                } else {
                    if (seconds % (11) === 0) //update every 11 seconds
                        UpdateCounDownTimeInCookie(this.getAttribute('id'), hours, minutes, seconds);
                }
                // console.log('countdown:timeleft:' + parseInt(timeleft / 1000) + '  id:' + this.getAttribute('id') + ' uniqueid:' + this.getAttribute('uniqueid'));
            });

            function UpdateCounDownTimeInCookie(miId, h, m, s) {
                if (miId && phe.config.cookies.allowFunctionalCookies) {
                    miId = miId.replace('MI-', '');
                    var cookieName = 'lightBoxesDisplayed';
                    var v = getCookie(cookieName).split(",");
                    v = v.filter(function (c) {
                        return c.indexOf(miId) === -1;
                    });
                    v.push(miId + ':' + (h > -1 ? h : 0) + ':' + (m > -1 ? m : 0) + ':' + (s > -1 ? s : 0));

                    var now = new Date();
                    now.setTime(now.getTime() + 1000 * 36000);
                    document.cookie = cookieName + '=' + escape(v.filter(function (c) { return c && c.length > 0; }).join(",")) + ';secure;path=/;expires=' + now.toGMTString();
                    // console.log('lightBoxesDisplayed:PreviousVale:' + PV + '  UpdatedValue:' + getCookie(cookieName) + ' miId#:' + miId);
                }
            }
            function GetCounDownTimeFromCookie(miId, h, m, s) {
                if (phe.config.cookies.allowFunctionalCookies && getCookie(cookieName)) {
                    miId = miId.replace('MI-', '');
                    var cookieName = 'lightBoxesDisplayed';
                    var v = getCookie(cookieName).split(",");
                    v = v.filter(function (c) {
                        return c.indexOf(miId) > -1;
                    });
                    if (v && v.length > 0) {
                        h = v[0].split(':').length > 0 ? parseInt(v[0].split(':')[1]) : 0;
                        m = v[0].split(':').length > 2 ? parseInt(v[0].split(':')[2]) : 0;
                        s = v[0].split(':').length > 3 ? parseInt(v[0].split(':')[3]) : 0;
                        return {
                            h: h,
                            m: m,
                            s: s
                        };
                    }
                }
                return {
                    h: h,
                    m: m,
                    s: s
                };
            }
        }
    });

    if (window.countdownTimers.length > 0 && typeof countdownTimerFunction === 'undefined') {
        countdownTimerFunction = setInterval(function () {
            try {
                if (window.countdownTimers.length === 0) clearInterval(countdownTimerFunction);
                [].slice.call(window.countdownTimers).map(function (el) {
                    if (el.offsetWidth > 0 && el.offsetHeight > 0) {
                        const event = new CustomEvent('countdownTimer_update');
                        el.dispatchEvent(event);
                    }
                });
            } catch (e) { }

        }, 1000);
    }
}

function fixupNameCategory(name) {
    if (name.lastIndexOf("_Mobile") == name.length - 7) {
        name = name.substring(0, name.length - 7);
    }
    if (name.indexOf(phe.site.siteCode.toUpperCase() + "_") == 0) {
        name = name.substring(phe.site.siteCode.length + 1);
    }
    return (name);
}
var parseHTML = function (str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp; 
};
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        var parts = uri.split('#');
        var result = parts[0] + separator + key + "=" + value;

        if (parts.length === 2) {
            result += '#' + parts[1];
        }

        return result;
    }
}
function removeURLParameter(url, parameter) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}
function isInViewPort(selector) {
    if (document.querySelector(selector)) {
        var bounding = document.querySelector(selector).getBoundingClientRect();
        return bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    } else {
        return false;
    }
}
;
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

Number.prototype.formatMoney = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

function delayLoadImages(images) {

    images = images || [].slice.call(document.querySelectorAll('img[data-src]'));

    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('delayloadimg')) {

                    var picture = entry.target.closest('picture');
                    if (picture) {
                        [].slice.call(picture.querySelectorAll('source[data-srcset]')).map(function (el) {
                            if (!el.srcset) {
                                el.srcset = el.dataset.srcset;
                                el.removeAttribute('data-srcset');
                            }
                        });
                    }

                    var image = entry.target;
                    if (!image.src) {
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(image);
                }
            });
        });

        images.forEach(function (img) { imageObserver.observe(img) });
    } else {
        //zoom image has.delayloadimg class. should not load on document.ready

        images.map(function (item) {
            if (!_.hasClass(item, 'delayloadimg')) {
                item.setAttribute('src', item.getAttribute('data-src'));
                item.removeAttribute('data-src');
            }
        })
    }
}

var global_helpers = (function () {


    function delayLoadModuleInstances() {
        [].slice.call(document.querySelectorAll('.module-delayLoad')).map(function (el) {
            _.ajax('/module/ajaxload/' + el.getAttribute('moduleinstance-id'), 'GET', null, function (res) {
                el.innerHTML = res;
                el.setAttribute('data-module-loaded', 'true');

                var slider = el.closest('.scroller');

                if (slider && slider.lory_slider) {
                    setTimeout(function () {
                        if (slider.lory_slider)
                            slider.lory_slider.reset();
                    }, 300);
                }
            }, null, 'text/html');
        });
    }

    function trackProductImpressions() {
        _.on('click', 'a[data-impression]', function (el) {
            trackProductImpression(JSON.parse(el.getAttribute('data-impression')));
        });
    }

    function trackProductViewItems() {
        [].slice.call(document.querySelectorAll('a[data-viewitem]')).map(function (el) {
            el.addEventListener('click', function () {
                trackProductViewItem(JSON.parse(el.getAttribute('data-viewitem')));
            })
        });
    }

    function trackProductImpression(impression) {
        if (typeof dataLayer === 'undefined')
            return;
        var event = {
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {'list': impression.list},
                    'products': [{
                        'name': impression.name,
                        'id': impression.id,
                        'productId': impression.productId,
                        'price': impression.price,
                        'brand': impression.brand,
                        'category': impression.category,
                        'position': impression.position,
                        'list': impression.list
                    }]
                }
            },
        };

        dataLayer.push(event);
        _.trigger('product:click', event.ecommerce.click.products);
    }

    function trackProductViewItem(viewItem) {
        if (typeof dataLayer === 'undefined' || viewItem == 'undefined')
            return;

        var event = {
                'event': 'select_item',
            'ecommerceGA4': {
                'item_list_id': viewItem.item_list_id,
                'item_list_name': viewItem.item_list_name,
                    'items': [{
                        'item_name': viewItem.item_name,
                        'item_id': viewItem.item_id,
                        'price': Number(viewItem.price),
                        'discount': viewItem.discount,
                        'item_brand': viewItem.item_brand,
                        'item_category': viewItem.item_category,
                        'item_category2': viewItem.item_category2,
                        'item_category3': viewItem.item_category3,
                        'index': viewItem.index,
                        'item_list_id': viewItem.item_list_id,
                        'item_list_name': viewItem.item_list_name,
                        'coupon': viewItem.coupon,
                        'affiliation': viewItem.affiliation,
                        'currency': "USD",
                        'quantity': viewItem.quantity
                    }]
                },
            };



        dataLayer.push({ ecommerceGA4: null });
        dataLayer.push(event);
    }

    return {
        runDocumentReady: function () {
            delayLoadImages();
            delayLoadModuleInstances();
            if (phe.config.isGA4Enabled) {
                trackProductViewItems();
            }
            trackProductImpressions();
            hideNSFWImages();
        }
    }
})();

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    global_helpers.runDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', global_helpers.runDocumentReady);
}

// OTHER GLOBAL
_.ready(function () {
    if (["Search", "Landing", "CategoryHome", "Category", "Collection"].indexOf(phe.page.pageType) > -1) {
        _.setCookie("continueshoppingurl", phe.urls.returnUrl, 1);
    }

    _.wire('.mkt-continue-shopping', 'click', function (event) {
        event.preventDefault();
        window.location.href = phe.urls.continueShoppingUrl;
    });
});

// Only installs picturefill polyfill script for browsers where picture element is not supported.
if (!window.HTMLPictureElement || !("sizes" in document.createElement('img'))) {
    document.createElement('picture');
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = window.location.origin + "/scripts/responsive/picturefill.js";
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(s, r);
}

// SEO Link Helpers
function handleHashLink(link) {
    var href = link.getAttribute('href');
    var gotoUrl = href.replace('#', '?');

    window.location.href = gotoUrl;
}

function handleHiddenLink(link) {
    var href = link.getAttribute('data-href');

    window.location.href = href;
}

document.addEventListener('click', function (e) {
    if (window.Turbo) {
        return;
    }

    var hashed = e.target.matches('.hash-link') ? e.target : e.target.closest('.hash-link');
    var hidden = e.target.matches('.hide-link') ? e.target : e.target.closest('.hide-link');

    if (hashed) {
        e.preventDefault();
        handleHashLink(hashed);
    }

    if (hidden) {
        e.preventDefault();
        handleHiddenLink(hidden);
    }
});

function hideNSFWImages() {
    if (phe.config.hideNSFWImages) {
        document.querySelectorAll("img").forEach(el => el.style.visibility = "hidden");
        document.querySelectorAll("*").forEach(el => el.style.backgroundImage = "none");
    }
}
;
// MODAL
var active_modals = [];

HTMLElement.prototype.modal = function (method) {
    var el = this;
    var backdrop = document.querySelector('.modal-backdrop');
   
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop');
        backdrop.classList.add('fade');
        document.body.appendChild(backdrop);
    }

    if (method === 'show') {
        this.classList.add('show');
        el.classList.add('in');
        backdrop.classList.add('in');
        backdrop.classList.add('show');
        backdrop.setAttribute('aria-hidden', 'true');

        var dialog = el.getElementsByClassName('modal-dialog');
        dialog[0].setAttribute('role', 'dialog');
        dialog[0].setAttribute('aria-hidden', 'false');

        var content = el.getElementsByClassName('modal-content');
        content[0].setAttribute('tabindex', '0');
        content[0].setAttribute('role', 'document');
        trapFocus(el);
        
        document.body.classList.add('modal-open');
        
        active_modals.push(el);

        var event = new CustomEvent('shown.bs.modal')
        el.dispatchEvent(event);
    }

    if (method === 'hide') {
        this.classList.remove('in');
        this.classList.remove('show');
        active_modals.splice(active_modals.indexOf(this), 1);

        var content = el.getElementsByClassName('modal-content');
        content[0].setAttribute('tabindex', '-1');

        var event = new CustomEvent('hidden.bs.modal')
        this.dispatchEvent(event);

        if (active_modals.length === 0) {
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').classList.remove('in');
            document.querySelector('.modal-backdrop').classList.remove('show');
        }
    }

    function trapFocus(el) {

        const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = el;

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];


        document.addEventListener('keydown', function (e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
    }
}

function bodyClickCloserHandler(e) {
    if (e.target.classList.contains('modal')) {
        var active = active_modals[active_modals.length - 1];
        
        if (active && !e.target.classList.contains('static')) {
            active.modal('hide');
        }
    }
}

document.addEventListener('click', bodyClickCloserHandler);

document.addEventListener('click', function (e) {
    var closer = e.target.closest('[data-dismiss="modal"]');
    if (!closer) return;

    e.target.closest('.modal').modal('hide');
});

document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-toggle="modal"]');
    if (!opener) return;

    var target = opener.getAttribute('data-target');
    document.querySelector(target).modal('show');
});

document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-toggle="modal"]');
    if (opener) return;

    if (!e.target.closest('.modal-header .close')) return;
    e.target.closest('.modal').modal('hide');
});

document.addEventListener('keypress', function (e) {
   
    if (e.which == 27 && active_modals && active_modals.length > 0) {
        var active = active_modals[active_modals.length - 1];
        if (active) {
            active.modal('hide');
        }
    }
});

;
var header = (function () {
    var opener = null;
    var header;
    var headerHeight = 0;
    var cartPosition = 0;
    var isProductPage = false;

    function toggleMenu(el) {
        el.parentNode.classList.toggle('active');
    }

    function submitSearch(term) {
        term = term.replace(/[^a-z0-9'&\s-]/gi, '');

        if (term.length === 0)
            return;

        var url = 'https://' + window.location.hostname + '/search.aspx?st=' + encodeURIComponent(term);
        navigateToLocation(url);

    }

    function setupSearch() {
        [].slice.call(document.querySelectorAll('.site-search-form')).map(function (el) {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                submitSearch(e.target.querySelector('.site-search-text').value);

            });
        });

        var searchSubmit = document.querySelectorAll('.search-submit')[0];
        if (searchSubmit) {
            searchSubmit.addEventListener('click', function () {
              
                if ((document.querySelectorAll('.site-search-input', this.closest('form'))[0])) {
                    var searchTerm = (document.querySelectorAll('.site-search-input', this.closest('form'))[0]).value;
                    submitSearch(searchTerm);
                }
            });
        }

        var siteSearchInput = document.querySelectorAll('.site-search-input')[0];
        if (siteSearchInput) {
            siteSearchInput.addEventListener('keypress', function (e) {
                if (e.which === 13) {
                    document.querySelectorAll('.search-submit', this.parentElement)[0].click();
                }
            });
        }
    }

    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function setUpSlideOutCloseEvents() {
        [].slice.call(document.querySelectorAll('.slideout-entry-close')).map(function (x) {
            x.addEventListener('click', function () {
                document.querySelector('#country-slideout-entry').classList.remove('visible');
                if (!switching_currency) {
                    setupCmsLightboxes();
                }
            });
        });

        [].slice.call(document.querySelectorAll('.slideout-close')).map(function (x) {
            x.addEventListener('click', function () {
                document.querySelector('#country-slideout').classList.remove('visible');
                if (switching_currency) {
                    setupCmsLightboxes();
                }
            });
        });
    }

    var switching_currency = false;

    function handleInternationalEntry() {

        var ctl = document.querySelector('#country-selector-entry');
        var countrySelector = document.querySelector('#country-selector');


        if (ctl.modal) {
            ctl.addEventListener('hidden.bs.modal', function handler(e) {
                if (!switching_currency) {
                    setupCmsLightboxes();
                }

                ctl.removeEventListener('hidden.bs.modal', handler);
            });
        }
        else {
            $(ctl).on('hidden.bs.modal', function () {
                if (!switching_currency) {
                    setupCmsLightboxes();
                }
                $(ctl).off('hidden.bs.modal');
            });
        }

        if (countrySelector.modal) {
            countrySelector.addEventListener('hidden.bs.modal', function handler(e) {
                if (switching_currency) {
                    setupCmsLightboxes();
                }

                countrySelector.removeEventListener('hidden.bs.modal', handler);
            });
        }
        else {
            $(countrySelector).on('hidden.bs.modal', function () {
                if (switching_currency) {
                    setupCmsLightboxes();
                }
                $(countrySelector).off('hidden.bs.modal');
            });
        }

        if (ctl.modal)
            ctl.modal('show');
        else
            $(ctl).modal('show');


        [].slice.call(document.querySelectorAll('.int-welcome-body-footer-link')).map(function (el) {
            el.addEventListener('click', function (e) {
                var modal = e.target.closest('.modal');
                switching_currency = true;

                if (modal) {
                    doModal(modal, 'hide');
                    doModal(countrySelector, 'show');
                } else {
                    document.querySelector('#country-slideout-entry').classList.remove('visible');
                    document.querySelector('#country-slideout').classList.add('visible');
                }
            });
        });

        setUpSlideOutCloseEvents();
    }

    function doModal(ctl, action) {
        if (ctl && ctl.modal)
            ctl.modal(action);
        else if (ctl)
            $(ctl).modal(action);
    }

    function handleChangeCurrencyForInternational(el, currencies) {
        var container = el.closest('#country-slideout');

        if (!container) {
            container = el.closest('#country-selector');
        }

        var currency = el.querySelector('option:checked').getAttribute('data-default-currency');
        var select = container.querySelector('.currency');
        select.innerHTML = '';

        if (currency === 'USD') {
            // show message
            if (el.value !== 'US')
                container.querySelector('.country-message').classList.add('no-currency');
        } else {
            container.querySelector('.country-message').classList.remove('no-currency');
            var data = currencies.filter(function (x) { return x.code === currency; })[0];
            currencies.forEach(function (data) { select.appendChild(new Option(data.name, data.code)) });
            //if(data)
            //select.appendChild(new Option(data.name, data.code));
        }


        var options = select.querySelectorAll("option");
        if (![].slice.call(options).find(function (el) { return el.value === 'USD'; }))
            select.appendChild(new Option('United States Dollar', 'USD'));


        select.value = currency;
    }

    function setupInternational() {
        var countrySelector = document.querySelector('#country-selector');
        var countrySlideout = document.querySelector('#country-slideout');
        //var countrySlideoutEntry = document.querySelector('#country-slideout-entry');
        var currencies = [];

        if (!countrySelector && !countrySlideout) {
            return;
        }

        [].slice.call(document.querySelector('.currency').querySelectorAll('option')).map(function (el) {
            currencies.push({
                code: el.getAttribute('value'),
                name: el.innerText
            });
        });

        [].slice.call(document.querySelectorAll('.international-currency-opener')).map(function (el) {
            el.addEventListener('click', function (e) {

                if (typeof $ === 'undefined') {
                    countrySelector.modal('show');
                } else {
                    $(countrySelector).modal('show');
                }

            });
        });

        var selCountryCurrency = document.querySelector('.select-country-currency');
        if (selCountryCurrency) {
            selCountryCurrency.addEventListener('click', function (e) {
                countrySlideout && countrySlideout.classList.remove('visible');
            });
        }

        [].slice.call(document.querySelectorAll('select[id^="country-select-"]')).map(function (el) {
            var container = el.closest('#country-slideout');
            if (!container) {
                container = el.closest('#country-selector');
            }
            var currencyEl = container.querySelector('.currency');
            var currentSelection = currencyEl.value;
            handleChangeCurrencyForInternational(el, currencies);
            currencyEl.value = currentSelection;
            el.addEventListener('change', function (e) {
                handleChangeCurrencyForInternational(e.target, currencies);
            });
        });

        [].slice.call(document.querySelectorAll('.select-country-currency')).map(function (el) {
            el.addEventListener('click', function (e) {
                var container = e.target.closest('#country-slideout');

                if (!container) {
                    container = e.target.closest('#country-selector');
                }

                var data = {
                    countryCode: container.querySelector('[id^="country-select-"]').value,
                    currencyCode: container.querySelector(".currency").value
                }

                if (window.dataLayer) {
                    ga_trackEvent(e.target.getAttribute('data-event-name'),
                        0,
                        e.target.getAttribute('data-event-category'),
                        data.countryCode + '|' + data.currencyCode);
                }

                setTimeout(function () {
                    _.ajax('/home/selectcountrycurrency', 'POST', data, function (res) {
                        if (res.Success) {
                            _.setCookie("BrowserNewInstance", "True");
                            window.location.reload();
                        }
                    });
                }, 50);
            });
        });

        [].slice.call(document.querySelectorAll('#country-selector-entry .discreet-shipping-link,#country-selector-entry .return-policy-link,#country-selector-entry .change-country-link')).map(function (el) {
            el.addEventListener('click', function (e) {

                ga_trackEvent(e.target.getAttribute('data-event-name'),
                    0,
                    e.target.getAttribute('data-event-category'),
                    e.target.getAttribute('data-event-label'));

                if (e.target.getAttribute('data-url')) {
                    navigateToLocation(e.target.getAttribute('data-url'));
                }

            });
        });
        setUpSlideOutCloseEvents();
    }

    function setupCmsLightboxes() {
        if (phe.config.suppressLightbox) {
            return false;
        }
        if (phe.config.isEmailSignupRedesign) {
            util.waitFor('phe.emailLightBox', function () {
                if (phe.config.isEmailSignupRedesign && phe.emailLightBox) {
                    console.log('setting up light');
                    phe.emailLightBox.loadJson();
                }
            })

        }
        setupTrueLightboxModulesTest();

    }

    function setupTrueLightboxModulesTest() {
        if (phe.config.suppressLightbox) {
            return false;
        }
        var boxes = document.querySelectorAll('.lightbox-module');
        window.lightboxes = window.lightboxes || [];
        [].slice.call(boxes).map(function (el) {
            var lightboxConfig = el.dataset;

            var showLightbox = lightboxConfig && (lightboxConfig.miShowalways === "True" || getCookie('lightBoxesDisplayed').indexOf(lightboxConfig.miId) === -1);
            console.log('Lightbox:' + lightboxConfig.miId + '-' + showLightbox + '--Secondary:' + lightboxConfig.miSecondaryLightbox)

            if (phe.config.trackEmailLightboxImpressions && phe.config.cookies.allowFunctionalCookies) {

                var trackingCookie = 'tracked-lightbox-eligibility';
                if (lightboxConfig.miCmEligibilityConversionElementId !== '' && lightboxConfig.miCmEligibilityConversionCategoryId) {
                    trackEvent(lightboxConfig.miCmEligibilityConversionElementId, 1, lightboxConfig.miCmEligibilityConversionCategoryId);
                    setCookie(trackingCookie, '1');
                }
            }

            var delayTimer = 3000;
            if (lightboxConfig.miDelaytimer) {
                delayTimer = lightboxConfig.miDelaytimer * 1000;
            }
            // debugger;
            if (lightboxConfig.miDelaytimeAftersessionint && !isNaN(parseInt(lightboxConfig.miDelaytimeAftersessionint)) && parseInt(lightboxConfig.miDelaytimeAftersessionint) > 0) {
                var startDate = new Date(phe.customer.inItTime); //UTC date
                if (startDate && !isNaN(startDate.getTime()) && startDate.getTime() > 0) {

                    startDate.setMinutes(startDate.getMinutes() + parseInt(lightboxConfig.miDelaytimeAftersessionint));


                    var utc_timestamp = new Date();
                    utc_timestamp.setMinutes(utc_timestamp.getMinutes() + utc_timestamp.getTimezoneOffset());// Make it UTC date
                    if (utc_timestamp >= startDate) {
                        delayTimer = 1000;
                    } else {
                        delayTimer = startDate - utc_timestamp; // in milliseconds
                    }

                }
            }

            if (showLightbox) {
                wireApplyOfferModel(el);
                var emailSignupConfig = el.querySelector('.email-spot-config') ? el.querySelector('.email-spot-config').dataset : null;

                window.lightboxes.push({
                    lightboxModule: el,
                    delayTimer: delayTimer,
                    emailSignupConfig: emailSignupConfig,
                    lightboxConfig: lightboxConfig
                });
            }
        });

        [].slice.call(window.lightboxes).map(function (lightbox) {
            setTimeout(function () {
                if (!document.querySelector('.lightbox.modal.in')) {

                    if (lightbox.lightboxConfig.miIsAttentiveLightbox === "True") {
                        handleLightboxTracking(lightbox.emailSignupConfig, lightbox.lightboxConfig);
                        phe.customer.attentive = lightbox.lightboxConfig.miAttentiveLightboxValue;
                    }
                    else if (lightbox.lightboxModule.modal) {
                        lightbox.lightboxModule.modal('show');
                        handleLightboxTracking(lightbox.emailSignupConfig, lightbox.lightboxConfig);
                        setTimeout(countdownTimerWidgets, 500); //helpers.js
                    }
                    else if (typeof jQuery !== 'undefined' && typeof jQuery.fn !== 'undefined' && typeof jQuery.fn.modal !== 'undefined') {
                        $(lightbox.lightboxModule).modal('show');
                        handleLightboxTracking(lightbox.emailSignupConfig, lightbox.lightboxConfig);
                        setTimeout(countdownTimerWidgets, 500);
                    }
                }
            }, lightbox.delayTimer);
            window.lightboxes.pop(lightbox);
        });


        function wireApplyOfferModel(lightbox) {

            [].slice.call(lightbox.querySelectorAll('.lightbox_Offer_btn')).map(function (el) {
                el.addEventListener('click', function () {
                    var offerCode = this.getAttribute('offer_code');
                    var redirectUrl = this.getAttribute('redirectUrl') || '';
                    redirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'oc=' + offerCode;

                    if (this.innerText !== "Continue Shopping") {
                        this.innerText = "Continue Shopping";
                        var lightboxConfig = lightbox.dataset;
                        if (lightboxConfig && lightboxConfig.miCmConversionElementId && lightboxConfig.miCmConversionCategoryId)
                            trackEvent(lightboxConfig.miCmConversionElementId, 2, lightboxConfig.miCmConversionCategoryId); //conversion tag

                        [].slice.call(lightbox.querySelectorAll(this.getAttribute('hide_elements_after_click_selectors'))).map(function (el) {
                            _.addClass(el, 'hide');
                        });
                        [].slice.call(lightbox.querySelectorAll(this.getAttribute('show_elements_after_click_selectors'))).map(function (el) {
                            _.removeClass(el, 'hide');
                        });


                        if (offerCode && offerCode.length > 0) {
                            var delayTimer = parseInt(this.getAttribute('delaytime_to_hide_lightbox')) > 0 ? parseInt(this.getAttribute('delaytime_to_hide_lightbox')) * 1000 : 0;
                            setTimeout(function () { navigateToLocation(redirectUrl); }, delayTimer);
                        }

                    } else {
                        if (offerCode && offerCode.length > 0) {
                            navigateToLocation(redirectUrl);
                        }
                        this.closest('.lightbox-module') && this.closest('.lightbox-module').modal && this.closest('.lightbox-module').modal('hide');
                    }
                });

                [].slice.call(lightbox.querySelectorAll(el.getAttribute('show_elements_after_click_selectors'))).map(function (el) {
                    _.addClass(el, 'hide');
                });
            });

            [].slice.call(lightbox.querySelectorAll('.cm_element_tag')).map(function (el) {
                el.addEventListener('click', function () {

                    if (!this.getAttribute('Hasclicked') && this.getAttribute('cm_element_name') && this.getAttribute('cm_element_name').length > 0 && this.getAttribute('cm_element_category') && this.getAttribute('cm_element_category').length > 0) {
                        this.setAttribute('Hasclicked', 'true');
                        _.trackElement(this.getAttribute('cm_element_name'), this.getAttribute('cm_element_category'));
                    }
                });
            });

            [].slice.call(lightbox.querySelectorAll('.lightbox_noOffer_btn')).map(function (el) {
                el.addEventListener('click', function () {
                    this.closest('.lightbox-module') && this.closest('.lightbox-module').querySelector('.close') && this.closest('.lightbox-module').querySelector('.close').click();
                });
            });
        }
    }

    function screenWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    function setCartItemCountClass() {
        var value = 'single-digit';
        var counter = document.querySelector('#cart-header-count');

        if (phe.customer.cartCount >= 10) value = 'double-digit';
        if (phe.customer.cartCount >= 100) value = 'triple-digit';

        if (counter) counter.classList.add(value);
    }

    function updateCartItemCount() {

        var headerLink = document.querySelector('#n-cart-header-link');
        var counter = document.querySelector('#cart-header-count');

        counter.innerHTML = phe.customer.cartCount;

        if (headerLink) {
            var itemOrItems = ' items';
            if (phe.customer.cartCount == 1) {
                itemOrItems = ' item';
            }

            document.querySelector('#n-cart-header-link').removeAttribute('aria-label');
            document.querySelector('#n-cart-header-link').setAttribute('aria-label', phe.customer.cartCount + itemOrItems + ' in your cart');
        }


        setCartItemCountClass();
    }

    return {
        init: function () {
            if (window.headerInit)
                return;
            window.headerInit = true;
            header = document.querySelector('header');
            opener = document.getElementById('account-menu-opener');

            if (opener) {
                opener.addEventListener('click', function () {
                    toggleMenu(this);
                });
                document.addEventListener('click', function (e) {
                    if (e.target != opener &&
                        !opener.contains(e.target)) {
                        opener.parentNode.classList.remove('active');
                    }
                });
            }



            var counter = document.querySelector('#cart-header-count');
            if (counter) {
                document.addEventListener('cartCountChange', updateCartItemCount);
                updateCartItemCount();
            }


            if (phe.customer.cartCount > 0 && document.querySelector('#n-cart-header-link')) {
                document.querySelector('#n-cart-header-link').classList.add('red-cart');
            }

            setupSearch();
            setCartItemCountClass();

            if (phe.customer.internationalCustomer) {
                setupInternational();
            }
            if (phe.customer.internationalEntry) {
                handleInternationalEntry();
            }
            else {
                setupCmsLightboxes();
            }
        }
    }
})();

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    header.init();
} else {
    document.addEventListener('DOMContentLoaded', header.init);
}

function navigateToLocation(href, parent) {
    if (parent !== undefined && parent == 'true') {
        window.parent.internalLinkClicked = true;
        this.window.parent.location.href = href;
    }
    else {
        window.internalLinkClicked = true;
        this.window.location.href = href;
    }
}

;


(function () {
    var bodyContentElement = document.getElementById('body-content') ;
    
    var isOldDesgin = typeof(bodyContentElement) != 'undefined' && bodyContentElement != null; 
    
    function revealImages(node) {
        [].slice.call(node.querySelectorAll('[data-reveal-src]')).map(function (x) {
            x.setAttribute('src', x.getAttribute('data-reveal-src'));
            x.removeAttribute('data-reveal-src');
        });
    }
    if (phe.config.isSiteRedesign2022) {
        function isTouchDevice() {
            return 'ontouchstart' in window;
        }

        function screenWidth() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }

        var hamburger = document.getElementById('ae-hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', function () {
                trackEvent('open hamburger menu', 0, 'top+navigation');
                revealImages(document.getElementById('navbarSupportedContent'));
                document.getElementsByClassName('ae-body')[0].classList.add('no-scroll');
            });
        }

        
        document.addEventListener('click', function (e) {
            var el = e.target.closest('.ae-mobile-navigation__header button');
            
            if (!el) return;

            el.closest('.nav-section').classList.add('invisible');
            document.getElementById('nav-section-main').classList.remove('invisible');
        })
        
        // #nav-section-main
        
        // ae-mobile-navigation__card
        
        document.addEventListener('click', function (e) {
            var el = e.target.closest('.ae-mobile-navigation__card');
            
            if (!el) {
                el = e.target.closest('.reveal-sub-menu');
            }
            
            if (!el) return;
            
            document.getElementById('nav-section-main').classList.add('invisible');
            var section = el.id.replace('level-1', 'nav-section')
            
            var menu = document.getElementById(section);
            
            if (menu) {
                menu.classList.remove('invisible');
            }
        })
        
        document.addEventListener('click', function (e) {
            var el = e.target.closest('.nav-section .ae-back-chevron-button');
            
            if (!el) return;
            
            el.closest('.nav-section').classList.add('invisible');
            document.getElementById('nav-section-main').classList.remove('invisible');
        })

        function handleNav() {
            document.addEventListener('DOMContentLoaded', function() {

                /* --------------------------------------------------------------------- */
                /* Mobile Menu - Lock body when mobile menu is open */


                var hamburger = document.getElementById('ae-hamburger');
                if (hamburger) {
                    hamburger.addEventListener('click', function () {
                        if (isOldDesgin) {
                            document.getElementById('navbarSupportedContent').classList.add('show');
                        }
                    });
                }


                var closeButtons = document.getElementsByClassName('ae-btn-close');

                for (var i = 0; i < closeButtons.length; i++) {
                    var button = closeButtons[i];
                    button.onclick = function () {
                        if (isOldDesgin) {
                            document.getElementById('navbarSupportedContent').classList.remove('show');
                            document.getElementsByClassName('ae-body')[0].classList.remove('no-scroll');
                        } else {
                            document.getElementsByClassName('ae-body')[0].classList.remove('no-scroll');
                        }
                    }
                }

                /* --------------------------------------------------------------------- */
                /* Mobile Menu - Show and Hide demo screens */

                var navMainSection = document.getElementById('nav-section-main');

                function setupBackButtons() {
                    [].slice.call(document.querySelectorAll('.nav-section-back')).map(function (el) {
                        el.addEventListener('click', function () {
                            hideSubMenu(el);                           
                            showSubMenu(navMainSection);
                        });
                    });
                }

                function setupGoToButtons() {
                    [].slice.call(document.querySelectorAll('.nav-section-go-to')).map(function (el) {
                        el.addEventListener('click', function () {
                            hideSubMenu(el.closest('.nav-section'));
                            showSubMenu(el.closest('.ae-mobile-navigation').querySelector('#' + el.dataset.goto));
                        });
                    });
                }

                setupBackButtons();
                setupGoToButtons();

                function hideSubMenu(el) {
                    var navSection = el.closest('.nav-section');
                    if (!navSection.classList.contains('invisible')) {
                        navSection.classList.add('invisible')
                    }
                }

                function showSubMenu(el) {
                    var navSection = el.closest('.nav-section');
                    if (navSection.classList.contains('invisible')) {
                        navSection.classList.remove('invisible')
                    }
                }



                /* --------------------------------------------------------------------- */
                /* Desktop Mega Menu - Show and Hide mega menu on hover */

                var overlayTimeout;
                var isDirectLink = false;
                var main = document.querySelectorAll('.ae-main, .new-look-wrapper, .ae-cart-main');
                var mouseOverNav = false;
                var overlayPending = false;

                function delayOverlay() {
                    overlayPending = true;
                    overlayTimeout = setTimeout(function () {                  
                        if (main[0]) {
                            main[0].classList.add("ae-main--overlay");
                        }
                        overlayPending = false;
                    }, 200);
                }

                function clearOverlayTimeOut() {
                    overlayPending = false;
                    clearTimeout(overlayTimeout);
                }

                function removeOverlay() {
                    overlayPending = false;
                    if (main[0]) {
                        main[0].classList.remove("ae-main--overlay");
                    }
                }

                function handleOverlay() {

                    var megaNav = document.getElementsByClassName('ae-nav-links__list')[0];
                    if (megaNav) {


                        if (isTouchDevice()) {
                            megaNav.addEventListener("click", function (e) {
                                if (!isDirectLink && !overlayPending && !main[0].classList.contains("ae-main--overlay" ) && e.target.closest("li").classList.contains('ae-nav-links__link-wrapper--hover')) {
                                    delayOverlay();
                                }
                                mouseOverNav = true;
                            })
                        }
                        else {
                            megaNav.addEventListener("mouseenter", function () {
                                if (!isDirectLink) {
                                    delayOverlay();
                                }
                                mouseOverNav = true;
                            })

                            megaNav.addEventListener("mouseleave", function () {
                                clearOverlayTimeOut();
                                removeOverlay();
                                mouseOverNav = false;
                            });

                            megaNav.addEventListener("focusin", function () {
                                if (!isDirectLink && !overlayPending && !main[0].classList.contains("ae-main--overlay")) {
                                    delayOverlay();
                                }
                                mouseOverNav = true;
                            });
                        }
                    }

                }

                handleOverlay();

                var li = document.getElementsByClassName('ae-nav-links__link-wrapper');

                for (var i = 0; i < li.length; i++) {

                    var liLinks = li[i].getElementsByClassName('ae-nav-links__link');

                    if (!isTouchDevice()) {
                        li[i].addEventListener("mouseover", function () {
                            if (this.classList.contains('direct-link')) {
                                isDirectLink = true;
                                removeOverlay();
                                return;
                            }
                            else {
                                if (mouseOverNav && !main[0].classList.contains("ae-main--overlay") && !overlayPending) {
                                    delayOverlay();
                                }
                            }
                            showMenu(this);
                            revealImages(document.getElementById('navbarSupportedContent'));
                        });

                        li[i].addEventListener("mouseout", function () {
                            if (this.classList.contains('direct-link')) {
                                isDirectLink = false;
                                return;
                            }

                            hideMenu(this);
                        });

                        liLinks[0].addEventListener("focus", function () {
                            if (this.classList.contains('direct-link')) {
                                isDirectLink = true;
                                removeOverlay();
                                return;
                            }

                            closeMenus(this.closest('li'));
                            showMenu(this.closest('li'));
                        });
                    }


                    liLinks[0].addEventListener("click", function (e) {

                        if (this.closest('li').classList.contains('direct-link')) {
                            return;
                        }
                        if (isTouchDevice()) {
                            e.preventDefault();
                            if (this.closest('li').classList.contains('ae-nav-links__link-wrapper--hover')) {
                                clearOverlayTimeOut();
                                closeMenus(this.closest('li'));
                            } else {
                                clearOverlayTimeOut();
                                closeMenus(this.closest('li'));
                                showMenu(this.closest('li'));
                            }                          
                        }
                        else {
                            if (screenWidth() < 768) {
                                e.preventDefault();
                            }

                            closeMenus(this.closest('li'));
                            clearOverlayTimeOut();
                        }

                    });
                }

                function closeMenus(el) {
                    const megaMenu = document.getElementsByClassName('ae-nav-links__megamenu--show');
                    for (var j = 0; j < megaMenu.length; j++) {
                        megaMenu[j].classList.remove('ae-nav-links__megamenu--show');
                    }

                    const wrappers = document.getElementsByClassName('ae-nav-links__link-wrapper');
                    for (var h = 0; h < wrappers.length; h++) {
                        wrappers[h].classList.remove('ae-nav-links__link-wrapper--hover');
                    }

                    const buttons = document.getElementsByClassName('ae-nav-links__link');
                    
                    for (var k = 0; k < buttons.length; k++) {
                        buttons[k].setAttribute("aria-expanded", "false");
                    }
                    removeOverlay();
                    
                }

                function showMenu(el) {
                                        
                    
                    var button = el.getElementsByClassName('ae-nav-links__link');
                    if (button[0]) {
                        button[0].setAttribute("aria-expanded", "true");
                    }                    
                    el.classList.add("ae-nav-links__link-wrapper--hover");
                    var menu = el.getElementsByClassName('ae-nav-links__megamenu');
                    if (menu[0]) {
                        menu[0].classList.add("ae-nav-links__megamenu--show");
                    }
                }

                function hideMenu(el) {

                    var button = el.getElementsByClassName('ae-nav-links__link');
                    if (button[0]) {
                        button[0].setAttribute("aria-expanded", "false");
                    }
                    
                    el.classList.remove("ae-nav-links__link-wrapper--hover");
                    var menu = el.getElementsByClassName('ae-nav-links__megamenu');
                    if (menu[0]) {
                        menu[0].classList.remove("ae-nav-links__megamenu--show");
                    }
                }

                /* --------------------------------------------------------------------- */
                /* Desktop Menu - Focus/Dim colors on hover */

                var colors = document.getElementsByClassName('ae-nav-links__megamenu__colors__swatch');

                for (var i = 0; i < colors.length; i++) {
                    colors[i].addEventListener("mouseover", function () {
                        focusColor(this);
                    });

                    colors[i].addEventListener("mouseout", function () {
                        unFocusColor(this);
                    });
                }

                function focusColor(el) {
                    el.classList.add('hovered');

                    for (var i = 0; i < colors.length; i++) {
                        colors[i].classList.add('not-hovered');
                    }
                }

                function unFocusColor(el) {
                    el.classList.remove('hovered');

                    for (var i = 0; i < colors.length; i++) {
                        colors[i].classList.remove('not-hovered');
                    }
                }

                /* --------------------------------------------------------------------- */
                /* Desktop Menu - Focus/Dim menu items on hover */

                //var lists = document.getElementsByClassName('standard-list');

                //for (var i = 0; i < lists.length; i++) {

                //    var liItems = lists[0].getElementsByTagName('li')

                //    for (let index = 0; index < liItems.length; index++) {
                //        lists[i].addEventListener("mouseover", function () {
                //            focusListItem(this, liItems);
                //        });

                //        lists[i].addEventListener("mouseout", function () {
                //            unFocusListItem(this, liItems);
                //        });
                //    }
                //}

                //function focusListItem(el, list) {
                //   el.classList.add('hovered');
                //}

                //function unFocusListItem(el, list) {
                //   el.classList.remove('hovered');
                //}


            })

        }

        handleNav();

    }else {
        function isTouchDevice() {
            return 'ontouchstart' in window;
        }

        function screenWidth() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }

        function toggle() {
            _.toggleClass(document.querySelector('#site-nav'), 'open');
            _.toggleClass(document.body, 'shielded');
            _.toggleClass(document.body, 'noscroll');
        }

        function resetNavHover() {
            [].slice.call(document.querySelectorAll('#site-nav > li.active')).map(function (x) { _.removeClass(x, 'active') });
        }



        function init() {
            document.querySelector('#mobile-nav-opener').addEventListener('click', function (e) {
                trackEvent('open hamburger menu', 0, 'top+navigation');
                toggle();
                e.preventDefault();
            });

            var nav_span = document.querySelector('#mobile-nav-closer span');

            if (nav_span) {
                nav_span.addEventListener('click', function () {
                    toggle();
                });
            }


            document.querySelector('#shield').addEventListener('click', function (e) {
                document.querySelector('#site-nav').classList.remove('open');
                document.body.classList.remove('shielded');
                document.body.classList.remove('noscroll');
            });

            [].slice.call(document.querySelectorAll('#site-nav > li:not(.single-link) > a')).map(function (el) {

                ['click', 'touchend'].forEach(function (eventType) {
                    el.addEventListener(eventType, function (e) {
                        if (isTouchDevice() || screenWidth() < 750) {
                            var closed = !e.target.parentNode.classList.contains('active');
                            resetNavHover();

                            if (closed) {
                                revealImages(e.target.parentNode);
                                e.target.parentNode.classList.add('active');
                            }

                            e.preventDefault();
                        } else {
                            el.setAttribute('href', el.getAttribute('data-href'));
                        }
                    });
                });



                el.addEventListener('mouseover', function (e) {
                    if (screenWidth() < 750 || isTouchDevice())
                        return;

                    resetNavHover();
                    _.addClass(e.target.parentNode, 'active');
                    revealImages(e.target.parentNode);
                });

                el.parentNode.addEventListener('mouseout', function (e) {
                    if (screenWidth() < 750)
                        return;

                    var x = e.clientX;
                    var y = e.clientY;
                    var activeElement = document.elementFromPoint(x, y);

                    if (!el.parentNode.contains(activeElement)) {
                        resetNavHover();
                    }
                });
            });
        }

        if (document.querySelector('nav')) {
            init();
        }
    }
    })();

;
var predictiveSearch = (function () {

    function resetResults(forceBackdropRemoval) {
        var hadInnerHtml = false;
        [].slice.call(document.querySelectorAll('.predictive-search .result-container')).map(function (container) {
            hadInnerHtml = hadInnerHtml || container.innerHTML !== '';
            
            container.innerHTML = '';
        });

        [].slice.call(document.querySelectorAll('.predictive-search')).map(function (el) { el.classList.add('hide') });
        
        var backdrop = document.querySelector('.modal-backdrop');
        
        if (backdrop && hadInnerHtml) {

            backdrop.classList.remove('show');
        }

        [].slice.call(document.querySelectorAll('.site-search-form')).map(function (el) {
            el.classList.remove('show');
        })
    }

    function handleResults(data, searchText) {
        resetResults();
        if (data.TotalMatches === 0) {
            return;
        }

        var hideProducts = !data.Products || data.Products.length === 0;
        var hideCategories = !data.Categories || data.Categories.length === 0;
        var hideTerms = !data.Popular || data.Popular.length === 0;
        var hideContent = !data.Content || data.Content.length === 0;

        if (hideProducts && hideCategories && hideTerms && hideContent) {
            return;
        }

        var product_template = document.querySelector('.template.search-product-template').innerHTML;
        var categories_template = document.querySelector('.template.search-category-template').innerHTML;
        var terms_template = document.querySelector('.template.search-term-template').innerHTML;
        var content_template = document.querySelector('.template.search-content-template').innerHTML;
        var products_container = document.querySelectorAll('.predictive-search-products');
        var categories_container = document.querySelectorAll('.predictive-search-categories');
        var terms_container = document.querySelectorAll('.predictive-search-terms');
        var content_container = document.querySelectorAll('.predictive-search-content');

        [].slice.call(products_container).map(function (x) { x.previousElementSibling.classList.remove('hide') });
        [].slice.call(categories_container).map(function (x) { x.previousElementSibling.classList.remove('hide') });
        [].slice.call(terms_container).map(function (x) { x.previousElementSibling.classList.remove('hide') });
        [].slice.call(content_container).map(function (x) { x.previousElementSibling.classList.remove('hide') });

        if (hideProducts)
            [].slice.call(products_container).map(function (x) { x.previousElementSibling.classList.add('hide') });
        if (hideCategories)
            [].slice.call(categories_container).map(function (x) { x.previousElementSibling.classList.add('hide') });
        if (hideTerms)
            [].slice.call(terms_container).map(function (x) { x.previousElementSibling.classList.add('hide') });
        if (hideContent)
            [].slice.call(content_container).map(function (x) { x.previousElementSibling.classList.add('hide') });

        data.Products.map(function (item) {
            var markup = product_template;
            var url = new URL(item.Url);
            url.hostname = location.hostname;

            if (markup != undefined && markup.length > 0) {
                markup = markup.replace('{{url}}', 'href="' + url.href + encodeURI('?predictive=search_autocomplete_product_' + item.ProductName).replace('&', '').replace(/'/g, '') + '"');
                var product_id = item.Id ? item.Id : item.Custom.unique_id;
                markup = markup.replace('{{id}}', product_id);
                markup = markup.replace('{{itemClass}}', 'predictive-search-item');
                markup = markup.replace('{{searchTerm}}', searchText);

                if (item.Thumb !== null) {
                    markup = markup.replace('{{img}}', item.Thumb);
                }
                else {
                    markup = markup.replace('{{img}}', '');
                }

                markup = markup.replace('{{name}}', item.ProductName);
                [].slice.call(products_container).map(function (x) { x.innerHTML = x.innerHTML + markup });
            }
        });

        data.Categories.map(function (item) {
            var markup = categories_template;

            if (markup != undefined && markup.length > 0) {
                var category_name = item.Value;
                
                if (phe.config.useHawkForPredictiveSearch) {
                    var name_parts = item.Value.split(';');
                    category_name = name_parts[name_parts.length - 1];
                }

                category_name = category_name.replace(/<b>/gi, '').replace(/<\/b>/gi, '').toLowerCase().trim();

                markup = markup.replace('{{url}}', 'href="' + item.Url + (item.Url.indexOf('?') > -1 ? "&" : "?") + encodeURI('predictive=search_autocomplete_category_' + category_name).replace('&', '').replace(/'/g, '') + '"');
                markup = markup.replace('{{id}}', item.Id);
                markup = markup.replace('{{itemClass}}', 'predictive-search-item');
                markup = markup.replace('{{searchTerm}}', searchText);

                markup = markup.replace('{{name}}', item.Value);
                [].slice.call(categories_container).map(function (x) { x.innerHTML = x.innerHTML + markup });
            }
        });

        data.Popular.map(function (item) {
            var markup = terms_template;
            var term = item.Value.replace(/<b>/gi, '').replace(/<\/b>/gi, '').toLowerCase().trim();

            if (markup != undefined && markup.length > 0) {
                markup = markup.replace('{{url}}', 'href="/search.aspx?st=' + term + '&predictive=' + encodeURI('search_autocomplete_term_' + term).replace('&', '').replace(/'/g, '') + '"');
                markup = markup.replace('{{term}}', item.Value);
                markup = markup.replace('{{itemClass}}', 'predictive-search-item');
                markup = markup.replace('{{searchTerm}}', searchText);
                [].slice.call(terms_container).map(function (x) { x.innerHTML = x.innerHTML + markup });
            }
        });

        data.Content.map(function (item) {
            var markup = content_template;
            var url = new URL(item.Url);
            url.hostname = location.hostname;

            if (markup != undefined && markup.length > 0) {
                markup = markup.replace('{{url}}', 'href="' + url.href + encodeURI('?predictive=search_autocomplete_content_' + item.Value).replace('&', '').replace(/'/g, '') + '"');
                //markup = markup.replace('{{url}}', 'href="' + url.href + '"');
                markup = markup.replace('{{name}}', item.Value);
                markup = markup.replace('{{itemClass}}', 'predictive-search-item');
                markup = markup.replace('{{searchTerm}}', searchText);
                [].slice.call(content_container).map(function (x) { x.innerHTML = x.innerHTML + markup });
            }
        });

        var results_markup = document.querySelector('.search-summary-template').innerHTML;
        var results_summary = '';

        if (data.Count > 0) {
            results_summary += data.Count + ' product(s)';
        }

        if (data.Count > 0 && data.ContentCount > 0) {
            results_summary += ', ';
        }

        if (data.ContentCount > 0) {
            if (data.ContentCount > 3) {
                data.ContentCount = 3;
            }
            
            results_summary += data.ContentCount + ' content(s)';
        }

        results_markup = results_markup.replace('{{viewallhref}}', 'href="/search.aspx?st=' + searchText + '"');
        results_markup = results_markup.replace('{{resultsSummary}}', results_summary);

        if (results_summary.length > 0) {
            [].slice.call(document.querySelectorAll('.predictive-summary-container')).map(function (x) {
                x.innerHTML = results_markup;
            });
        }

        var isRedesign = document.querySelectorAll('.ae-main').length > 0;
        
        if (isRedesign) {
            var backdrop = document.querySelector('.modal-backdrop');
            
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.classList.add('fade', 'modal-backdrop', 'show');
                document.body.appendChild(backdrop);
            } else {
                backdrop.classList.add('show');
            }
            
            [].slice.call(document.querySelectorAll('.site-search-form')).map(function (el) {
                el.classList.add('show');
            })
        }

        [].slice.call(document.querySelectorAll('.predictive-search')).map(function (x) { x.classList.remove('hide') });
        resizeResults();
    }

    function resizeResults() {
        if (!phe.config.isSiteRedesign2022) {
            [].slice.call(document.querySelectorAll('.predictive-search')).map(function (x) {
                if (x.parentNode.querySelector('.site-search-text') !== null)
                    x.setAttribute('style', 'width:' + x.parentNode.querySelector('.site-search-text').clientWidth + 'px !important;');
            });
        }
    }

    return {
        "init": function () {
            // NOTE: (BPT) Only has the b- prefix to avoid conflicts with current code
            [].slice.call(document.querySelectorAll('.b-predictive, .predictive')).map(function (p) {
                p.addEventListener('keyup', function (e) {
                    //resetResults();
                    var value = e.target.value;
                    var key = e.which;

                    if (key === 13 && typeof e.target.data !== 'undefined' && typeof e.target.data.href !== 'undefined' && e.target.data.href.length > 0) {
                        window.location.href = e.target.data.href;
                        e.stopPropagation();
                        return;
                    }

                    if (value.length < 3) {
                        resetResults(true);
                        return;
                    }

                    if (!e.target.data) {
                        e.target.data = {}
                    }

                    if (typeof e.target.data.index !== 'undefined' && key === 40 || key === 38) {
                        var moveTo = -1;

                        if (key === 40) {
                            moveTo = e.target.data.count > e.target.data.index + 1 ? e.target.data.index + 1 : 0;
                        } else {
                            moveTo = e.target.data.index > 0 ? e.target.data.index - 1 : e.target.data.count - 1;
                        }

                        e.target.data.index = moveTo;

                        var items = e.target.parentNode.querySelector('.predictive-search').querySelectorAll('.predictive-search-item');

                        [].slice.call(items).map(function (x) {
                            x.classList.remove('selected');
                        });

                        items[moveTo].classList.add('selected');
                        e.target.data.href = items[moveTo].getAttribute('href');

                        //e.target.value = e.target.data.results[e.target.data.index].ProductName;
                        e.preventDefault();
                    } else {
                        e.target.parentNode.querySelector('.predictive-search').querySelectorAll('.predictive-search-item');
                        e.target.data.index = -1;
                        e.target.data.href = '';

                        var base_url = phe.config.useHawkForPredictiveSearch ? phe.urls.hawkPredictiveSearchUrl : '/predictivesearch.aspx?st=';
                        var xhr = new XMLHttpRequest();
                      
                        xhr.open("GET", base_url + (phe.config.useHawkForPredictiveSearch ? value:value.replace(/[^a-zA-Z0-9- ]/g, "")), true);
                        xhr.onload = function () {
                            var res = xhr.responseText;
                            var data_as_string = phe.config.useHawkForPredictiveSearch ? res.substring(1).substring(0, res.length - 2) : res;
                            var data = JSON.parse(data_as_string);

                            e.target.data = {
                                results: data.Products,
                                count: data.Products.length + data.Categories.length + data.Popular.length + data.Content.length,
                                index: -1
                            };

                            handleResults(data, value);
                        };
                        xhr.send();
                    }
                });
            });

            document.body.addEventListener('click', function (el) {
                [].slice.call(document.querySelectorAll('.predictive-search')).map(resetResults);
            })

            window.addEventListener('resize', resizeResults);
            resizeResults();
        }
    }
})();

if (phe.config.isPredictiveSearchEnabled) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        predictiveSearch.init();
    } else {
        document.addEventListener('DOMContentLoaded', predictiveSearch.init);
    }
}
;
_.ready(function () {
    function trackScroll() {
        var scrolled = window.pageYOffset * 2;
        var coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    var goTopBtn = document.querySelector('#return-to-top');
    
    if (goTopBtn) {
        window.addEventListener('scroll', trackScroll);
        goTopBtn.addEventListener('click', backToTop);
    }
});;
var EmailSignUp = (function () {
    var spotUsed = '';

    function EmailSignUp() {
        this.invalidFormHandler = function () { };
        this.validFormHandler = function () { };
        this.ajaxErrorHandler = function () { };
        this.ajaxSuccessHandler = function () { };
        this.formSelector = '';
        this.fieldsBuilder = function () { return [] };
        this.listsBuilder = function () { return [] };
        this.smsBuilder = function () { return [] };
        this.pattern = /\s*[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\s*/;
    }

    EmailSignUp.prototype.init = function (setup) {
        var that = this;
        this.invalidFormHandler = setup.invalidFormHandler;
        this.validFormHandler = setup.validFormHandler;
        this.ajaxErrorHandler = setup.ajaxErrorHandler;
        this.ajaxSuccessHandler = setup.ajaxSuccessHandler;
        this.formSelector = setup.formSelector;
        this.fieldsBuilder = setup.fieldsBuilder || this.fieldsBuilder;
        this.listsBuilder = setup.listsBuilder || this.listsBuilder;
        this.smsBuilder = setup.smsBuilder || this.smsBuilder;

        function onSuccess(data) {
            if (data.Success === true) {
                if (phe.config.cookies.allowFunctionalCookies) {
                    _.setCookie('emailOnFile', true, 7);
                }
                
                if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
                    _.trackEvent(spotUsed.replace('_' + phe.customer.deviceType, ''), 2, "Email Sign Up");
                    _.trackRegistrationTag(phe.customer.customerId, data.email);
                }

                if (window.dataLayer) {
                    dataLayer.push({ "event": "emailSignup" });
                }

                that.ajaxSuccessHandler(data);
            }
            else {
                that.ajaxErrorHandler(data);
            }
        }

        document.querySelector(that.formSelector).addEventListener('submit', function (event) {
            event.preventDefault();

            var elementsInError = [];
            var textInputSelector = '.email-signup-email-address';
            var checkboxSelector = '[type=checkbox]';
            var gdprCheckboxSelector = 'gdprEmailConsent';
            var email = event.target.querySelector(textInputSelector).value;

            if (typeof (email) === 'undefined') {
                textInputSelector = 'input[type=email]';
                email = event.target.querySelector(textInputSelector).value;
            }

            var spot = event.target.querySelector('[name=spot]').value;
            spotUsed = spot;

            var req = {
                email: email,
                spot: spot,
                fields: that.fieldsBuilder(),
                lists: that.listsBuilder(),
                smsKeywords: that.smsBuilder(),
                isgdpremailconsent: (phe.customer.isValidForGDPREmailConsent
                    && event.target.querySelectorAll('[name=gdprEmailConsent]:checked').length > 0)
            };

            if (typeof (email) === 'undefined'
                || email.length < 1
                || !(that.pattern.test(email))) {

                elementsInError.push(textInputSelector);
                that.invalidFormHandler(elementsInError);
                return false;
            }
            else if (!(event.target.querySelectorAll('[name="18andover"]:checked').length > 0)) {
                elementsInError.push(checkboxSelector);
                that.invalidFormHandler(elementsInError);
            }
            else if (phe.customer.isValidForGDPREmailConsent
                && !(event.target.querySelectorAll('[name="gdprEmailConsent"]:checked').length > 0)) {
                elementsInError.push(gdprCheckboxSelector);
                that.invalidFormHandler(elementsInError);
            }
            else {
                that.validFormHandler(this);
                _.ajax('/account/emailsignup', 'POST', req, onSuccess);

                return false;
            }
        });
    }

    return EmailSignUp;
}());

if (phe.config.isEmailSignupRedesign && !phe.config.isWebPageTest) {
    var phe = phe || {};

    phe.emailLightBox = (function () {
        var using_config = "default";
        var configs = [];
        var jsonLoaded = false;
        var endTimer = (new Date()).getTime();
        var lightBoxRendered = phe.customer.hasEmail;
        var api = {
            setConfig: function (config) {
                using_config = config;
                phe.emailLightBox.render();
            },
            addConfigObject: function (configObject) {
                configs.push(configObject);
            },
            render: function () {
                var oConfig = configs.filter(function (c) {
                    return (c.name == using_config);
                })[0];
                if (typeof oConfig == 'undefined') return false;

                if (oConfig.config.thankYouResultModal) {
                    phe.emailLightBox.useThankYouModal(oConfig);
                }
                if (oConfig.name == 'thankyou') {
                    phe.emailLightBox.renderThankYouModal(oConfig);
                    return false;
                }

                if (phe.emailLightBox.returningGuest()) {
                    oConfig = configs.filter(function (c) {
                        return (c.name == phe.emailLightBox.persistVariant());
                    })[0];
                    if (typeof oConfig != 'undefined') {
                        phe.emailLightBox.renderFooter(oConfig);
                    }
                    return false;
                }
                if (typeof oConfig == 'undefined') {
                    phe.emailLightBox.setConfig("default");
                }
                if (typeof oConfig != 'undefined' && phe.emailLightBox.validateTriggers(oConfig)) {
                    lightBoxRendered = false;
                    var el = document.getElementById('emailLightBox');
                    el.setAttribute('data-mi-delayTimer', oConfig.config.delayTimer);
                    el.setAttribute('data-mi-showOnEntry', oConfig.config.showOnEntry);
                    el.setAttribute('data-mi-showAfterPageLoad', oConfig.config.showAfterPageLoad);
                    el.setAttribute('data-mi-showAlways', oConfig.config.showAlways);
                    el.setAttribute('data-mi-warningMsg', oConfig.config.warningMessage);
                    el.setAttribute('data-mi-pageUnload', oConfig.config.pageUnload);
                    el.querySelectorAll('.modal-body')[0].innerHTML = oConfig.popUpContent.copy + phe.emailLightBox.getLightBoxFormBySiteCode() + (typeof oConfig.popUpContent.tagLine != 'undefined' ? oConfig.popUpContent.tagLine : '');

                    if (oConfig.config.slideFrom != 'none') phe.emailLightBox.animate(el, oConfig);

                    if (oConfig.popUpContent.moduleInstance > 0) {
                        _.ajax('/module/ajaxload/oConfig.popUpContent.moduleInstance', 'GET', null, function (data) {
                            var modal = el.querySelector('.modal-body');
                            modal.appendChild(data);
                            modal.appendChild(phe.emailLightBox.getLightBoxFormBySiteCode());
                            phe.emailLightBox.initialize(el, oConfig);
                        });
                    } else {
                        phe.emailLightBox.initialize(el, oConfig);
                    }

                    phe.emailLightBox.styleOverrides(el, oConfig);

                    if (oConfig.config.delayTimer > 0 && phe.config.cookies.allowFunctionalCookies) {
                        var lightBoxWaitTime = _.getCookie("lightboxWait") ? _.getCookie("lightboxWait") : 0;
                        var checkForLightBox = setInterval(function () {
                            _.setCookie("lightboxWait", lightBoxWaitTime, 1);
                            
                            lightBoxWaitTime++;
                        }, 1000);
                        var waitTime = oConfig.config.delayTimer - lightBoxWaitTime > 0 ? oConfig.config.delayTimer - lightBoxWaitTime : 1;
                        setTimeout(function () {
                            if (!lightBoxRendered) {
                                phe.emailLightBox.showModal('#emailLightBox');
                                phe.emailLightBox.onComplete(oConfig.config.test);
                            }
                            clearInterval(checkForLightBox);
                        }, (waitTime) * 1000);
                    }
                    else {
                        phe.emailLightBox.showModal('#emailLightBox');
                        phe.emailLightBox.onComplete(oConfig.config.test);
                    }

                    if (oConfig.footerContent.active) {
                        if (oConfig.config.lightboxOnly) {
                            phe.emailLightBox.setFooterSignUpSpot('', oConfig.config.lightboxOnly);
                        } else {
                            phe.emailLightBox.renderFooter(oConfig);
                        }
                    }                    
                }
            },
            showModal: function (selector) {
                // Here so it is compatible across all experiences. 
                if (typeof jQuery !== 'undefined' && typeof jQuery.fn !== 'undefined' && typeof jQuery.fn.modal !== 'undefined') {
                    $(selector).modal('show');
                } else {
                    document.querySelector(selector).modal('show')
                }
            },
            renderFooter: function (c) {
                var elFoot = document.getElementById('emailSignupFormF');
                if (elFoot) {
                    if (c.footerContent.moduleInstance > 0) {
                        _.ajax('/module/ajaxload/' + c.footerContent.moduleInstance, 'GET', null, function (data) {
                            elFoot.appendChild(data);
                        });
                    } else {
                        if (document.querySelector('.footer-email-title'))
                            document.querySelector('.footer-email-title').innerHTML = c.footerContent.copyTitle;
                        if (document.querySelector('.footer-email-subtitle'))
                            document.querySelector('.footer-email-subtitle').innerHTML = c.footerContent.copyTagline;
                    }

                    elFoot.querySelector('input[name=spot]').setAttribute('value', 'Email Sign Up Footer-' + c.config.test + '_' + phe.customer.deviceType);
                    var fields = [{ name: "Signup_source", value: c.config.sourceCode }, { name: "Signup_group", value: c.config.test }, { name: "Signup_device", value: phe.customer.deviceType }, { name: "Signup Spot", value: "Footer" }]

                    if (c.config.persistFooter && !_.getCookie('hide-footer').length > 0 && phe.customer.deviceType != 'mobile') phe.emailLightBox.setPersistentFooter();

                    initEmailSignUpFooterSetUp((c.config.redirectUrl.length > 0 ? c.config.redirectUrl : ''), (c.config.sourceCode.length > 0 ? c.config.sourceCode : ''), fields);
                }
            },
            initialize: function (el, c) {
                el.querySelector('input[name=spot]').setAttribute('value', 'Email LightBox With SignUp-' + c.config.test + '_' + phe.customer.deviceType);
                var fields = [{ name: "Signup_source", value: c.config.sourceCode }, { name: "Signup_group", value: c.config.test }, { name: "Signup_device", value: phe.customer.deviceType }, { name: "Signup Spot", value: "Lightbox" }]

                initEmailSignUpLightBoxSetUp((c.config.redirectUrl.length > 0 ? c.config.redirectUrl : ''), (c.config.sourceCode.length > 0 ? c.config.sourceCode : ''), fields);
            },
            styleOverrides: function (el, c) {
                var modalStyling = 'width: ' + c.popUpContent.width + 'px; height: ' + (c.popUpContent.height > 0 ? c.popUpContent.height + 'px' : 'auto') + ';';
                el.querySelectorAll('.modal-dialog')[0].setAttribute('style', modalStyling);
                if (c.popUpContent.backgroundImage.length > 0) {
                    var setBGImage = 'background-image: url("' + c.popUpContent.backgroundImage + '"); background-position: center top; background-size: contain; background-repeat: no-repeat; height: ' + c.popUpContent.height + 'px;';
                    el.querySelectorAll('.modal-body')[0].setAttribute('style', setBGImage);
                    var adaEl = document.createElement('span');
                    adaEl.setAttribute('role', 'img');
                    adaEl.setAttribute('aria-label', 'Email Sign Up');
                    el.querySelectorAll('.modal-body')[0].appendChild(adaEl);
                };
                if (c.popUpContent.styleOverrides.length > 0) {
                    var x = document.createElement('style');
                    x.innerHTML = c.popUpContent.styleOverrides;
                    document.body.appendChild(x);
                };
            },
            animate: function (el, c) {
                el.classList.add(c.config.slideFrom);
                return false;
            },
            validateTriggers: function (c) {
                if (phe.customer.hasEmail) return false;
                if (document.location.hostname.indexOf('shopadamevestores') > -1) return false;

                for (var iP = 0; iP < c.config.triggers.hideFromPages.length; iP++) {
                    if (document.location.pathname.indexOf(c.config.triggers.hideFromPages[iP]) > -1) return false;
                }
                for (var iS = 0; iS < c.config.triggers.hideFromSourceCodes.length; iS++) {
                    if (phe.customer.orderSourceCode.indexOf(c.config.triggers.hideFromSourceCodes[iS]) > -1) return false;
                }
                for (var iQ = 0; iQ < c.config.triggers.hideFromQueryString.length; iQ++) {
                    if (document.location.search.indexOf(c.config.triggers.hideFromQueryString[iQ]) > -1) return false;
                }
                for (var iD = 0; iD < c.config.triggers.hideFromDevices.length; iD++) {
                    if (phe.customer.deviceType.indexOf(c.config.triggers.hideFromDevices[iD]) > -1) return false;
                }
                if (typeof c.config.triggers.hideFromSourceChannel != 'undefined') {
                    for (var iSC = 0; iSC < c.config.triggers.hideFromSourceChannel.length; iSC++) {
                        if (phe.customer.sourceChannel.indexOf(c.config.triggers.hideFromSourceChannel[iS]) > -1) return false;
                    }
                }
                return phe.emailLightBox.verifyTriggersFromModule();
            },
            onComplete: function (test) {
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 1000 * 36000;
                now.setTime(expireTime);
                document.cookie = 'lightBoxDisplayed="EmailSignUp_True";secure;path=/;expires=' + now.toGMTString();
                document.cookie = 'signup-variant=' + (test.length == 1 ? test.toLowerCase() : 'default') + ';secure;path=/;expires=' + now.toGMTString();
                if (phe.config.isEmailSignupTestOn || phe.config.alwaysTrackEmailSignUpInitiation) {
                    trackEvent("Email LightBox With SignUp-" + test , 1, "Email Sign Up");
                }

                if (phe.config.trackEmailLightboxImpressions && phe.config.cookies.allowFunctionalCookies) {
                    var trackingCookie = 'tracked-lightbox-eligibility';
                    var trackingValue = getCookie(trackingCookie);
                    
                    if (trackingValue.length === 0 || trackingValue === '1') {
                        trackEvent('EMAIL LIGHTBOX ELIGIBLE', 2, 'EMAIL SIGN UP ELIGIBLE');
                        setCookie(trackingCookie, '2');
                    }
                }
                
                lightBoxRendered = true;
            },
            setFooterSignUpSpot: function (defaultFooterForm, hideFooter) {
                defaultFooterForm = (typeof defaultFooterForm != 'undefined' ? defaultFooterForm : '');

                if (phe.customer.hasEmail || hideFooter) {
                    document.querySelector('#footer-content').classList.add('hidden');
                } else {
                    if (document.querySelector('#footer-content'))
                    document.querySelector('#footer-content').innerHTML = defaultFooterForm;

                    if (phe.emailLightBox.returningGuest()) {
                        phe.emailLightBox.setConfig(phe.emailLightBox.persistVariant());
                    }
                }
                return false;
            },
            persistVariant: function () {
                return (_.getCookie('signup-variant').length > 0 ? _.getCookie('signup-variant') : 'default');
            },
            returningGuest: function () {
                return (_.getCookie('lightBoxDisplayed').length > 0 && !phe.customer.hasEmail);
            },
            loadJson: function () {
                if (phe.config.isEmailSignupTestOn && configs.length > 0) return;

                util.waitFor("emailSignUpJson", function () {
                    jsonLoaded = true;
                    var thisData = emailSignUpJson;
                    var start = 0;
                    for (var v in thisData) {
                        if (typeof thisData[v].name != 'undefined') {
                            phe.emailLightBox.addConfigObject(thisData[v]);
                            if (thisData[v].config.delayTimer > start) {
                                start = thisData[v].config.delayTimer + (typeof phe.config.emailSignUpSafetyAllowance != 'undefined' ? phe.config.emailSignUpSafetyAllowance : 0);
                                endTimer = endTimer + (start * 1000) + 1000;
                            }
                        }
                    }
                    phe.emailLightBox.setFooterSignUpSpot(phe.emailLightBox.getFooterFormBySiteCode());
                    if (!phe.config.isEmailSignupTestOn) {
                        util.waitFor("setDefaultEmailSignUp", function () {
                            setDefaultEmailSignUp();
                        });
                    }
                    if (document.location.search.indexOf('tymodal=true') > -1) {
                        phe.emailLightBox.setConfig('thankyou');
                        return false;
                    }
                });
            },
            setPersistentFooter: function () {
                var footerStyles = [
                    "#footer-content {width: 100%;height: auto;bottom: 0px;left: 0px;right: 0px;margin: 0px;position: fixed;z-index: 999;padding: 0px;}",
                    "@media (min-width: 750px){.footer-email-text {width:60%;}.footer-email-actions {width: 60%;margin: 0 auto;}}"
                ];

                document.body.innerHTML += "<style>" + footerStyles.join('\n') + "</style>";

                var close = document.createElement('div');
                close.setAttribute('style', 'margin-right:15px');
                close.innerHTML = '<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="phe.emailLightBox.dismissPersistentFooter()"><span aria-hidden="true" style="line-height: 1em;">×</span></button>';
                var footerContent = document.querySelector('#footer-content');
                footerContent.parentNode.insertBefore(close, footerContent);

                document.querySelector('#footer').setAttribute('style', 'margin-bottom:' + footerContent.clientHeight + 'px !important');
                document.querySelector('#return-to-top').setAttribute('style', 'bottom:' + (footerContent.clientHeight + 20) + 'px !important');
            },
            dismissPersistentFooter: function () {
                document.querySelector('#footer-content').classList.add('hidden');
                document.querySelector('#footer').removeAttribute('style');
                document.querySelector('#return-to-top').removeAttribute('style');

                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 1000 * 36000;
                now.setTime(expireTime);
                document.cookie = "hide-footer=true;expires=" + now.toGMTString();
            },
            useThankYouModal: function (c) {
                c.config.sourceCode = '?sc=' + c.config.sourceCode + '&tymodal=true';
            },
            renderThankYouModal: function (message) {
                var ty = document.createElement('div');
                var body = '<div class="modal-dialog"><div class="modal-content lightbox-container"><div class="modal-header modal-header-basic">'
                body += '<button type= "button" class="close" data- dismiss="modal" aria- label="Close" > <span aria-hidden="true">&times;</span></button ></div > <div class="modal-body">';
                if (message.popUpContent.moduleInstance == 0) body += message.popUpContent.copy;
                body += '</div></div ></div > ';
                ty.className = 'lightbox modal fade thank-you-modal';
                ty.id = 'emailLightBox';
                ty.appendChild(body);

                if (message.popUpContent.moduleInstance > 0) {
                    _.ajax('/module/ajaxload/' + oConfig.popUpContent.moduleInstance, 'GET', null, function (res) {
                        ty.querySelector('.modal-body').innerHTML = res;
                        document.body.appendChild(ty);
                        phe.emailLightBox.showModal('.thank-you-modal');
                    });
                } else {
                    document.body.appendChild(ty);
                    phe.emailLightBox.showModal('.thank-you-modal');
                }
            },
            verifyTriggersFromModule: function (m) {
                if (document.querySelectorAll("span.module-zone[data-label='EmailLightBox-Triggers']").length && document.querySelectorAll("#emailLightBox").length) {
                    if (phe.config.trackEmailLightboxImpressions && phe.config.cookies.allowFunctionalCookies) {
                        var shouldTrackEligibility = true;
                        var trackingCookie = 'tracked-lightbox-eligibility';
                        var trackingValue = getCookie(trackingCookie);

                        if (trackingValue !== '') {
                            shouldTrackEligibility = false;
                        }
                        
                        if (shouldTrackEligibility) {
                            trackEvent('EMAIL LIGHTBOX ELIGIBLE', 1, 'EMAIL SIGN UP ELIGIBLE');
                            setCookie(trackingCookie, '1');
                        }
                    }

                    return true;
                }
                
                return false;
            },
            throwDefaultOnTestFailure: function () {
                var timer = (new Date()).getTime();
                if (phe.customer.hasEmail || !phe.config.isEmailSignupTestOn || phe.emailLightBox.returningGuest()) {
                    clearInterval(checkForDisplay);
                    return false;
                }
                if (jsonLoaded && timer > endTimer && !lightBoxRendered) {
                    phe.emailLightBox.setConfig('default');
                    clearInterval(checkForDisplay);
                }
                return false;
            },
            getLightBoxFormBySiteCode: function () {
                switch (phe.site.siteCode) {
                    case "AE":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"><input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older"><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    case "AM":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"> <input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older"><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    case "EVE":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox" > <input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older"><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    case "SII":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"> <input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older"><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    case "SWTE":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"> <input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older"><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    case "VM":
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"> <input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older" ><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                    default:
                        return '<form id="emailSignupFormL" class="email-signup-form default" action="" method="post"><input name="spot" value="EmailSignUpTest-" type="hidden"><div class="form-fields test-default"><input id="emailFieldL" class="email-field email-signup-email-address" name="15420" placeholder="Enter email address" type="text" aria-label="Enter email address to subscribe to promotional emails" title="Email signup textbox"><input id="submitEmailL" class="submit-email" name="Go" value="Submit" type="submit" title="submit email" aria-label="submit email address"></div><div class="age-checkbox"><input id="emailSignupAgeL" name="18andover" value="" class="email-signup-verify-checkbox" type="checkbox" title="verify age checkbox" aria-label="check box to verify that you are 18 years of age or older" ><div class="age-verify-red">Ages 18 and older only.</div><div class="age-verify-grey">Please check here to confirm</div><div class="gdpr-error-text text-red hidden">Please check here to confirm</div><div class="invalid-email text-red hidden">Please check your address.</div><div class="gdprEmailConsent "><input id="gdprEmailConsentL" name="gdprEmailConsent" value="" class="email-signup-verify-checkbox gdpr-checkbox" type="checkbox" ><div class="gdprEmailConsent gdpr-email-consent-text text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</div></div></form>';
                }
            },
            getFooterFormBySiteCode: function () {
                switch (phe.site.siteCode) {
                    case "AE":
                        return '<div class="md-8 xs-12 emailSignUp"><form id="emailSignupFormF" class="email-signup-form mvc-ignore default" label="email sign up form" style="background-color: #ebebeb; padding: 5px; margin: 0 auto; "><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="footer-email-title" style="font-size: 1.2em; font-weight: bold; line-height: 1em; text-align: center; color: #cf2013;">FREE Mystery Gift</div><div class="footer-email-text" style="margin: .25rem auto;"><input name="email" class="email-signup-email-address" placeholder="Enter Email Address" type="email" aria-label="enter your email address" title="enter your email address" /></div><div class="footer-email-actions"><div class="pull-right"><button class="button-gray" style="font-size: .65rem;">Sign Up</button></div><div class="pull-left"><input id="emailSignupAgeF" name="18andover" class="email-signup-verify-checkbox" type="checkbox" label="email signup checkbox" title="email signup checkbox"  aria-label="check box to verify that you are 18 years of age or older"/></div><div class="no-gutter" style="text-align: left; font-size: .65em; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Ages 18 and over only!</span><br /><span class="valid">Please check here to confirm.</span><span class="invalid-email text-red hidden">Please check your address.</span><span class="invalid-verify text-red hidden">Please check here to confirm.</span> &nbsp;<strong>We value your privacy.</strong></div></div><div class="footer-email gdprEmailConsent"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time. </span></div></div></form></div>';
                    case "AM":
                        return '<div class="email_bann default" style="float: none!important;padding-bottom: 12%!important; height:100%!important;"><form id="emailSignupFormF" style="float: right; width: 100%; height: 44px; text-align: left;" method="post" target="_blank"><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="form-fields"><input id="emailFieldF" aria-label="Email Address" class="email-field email-signup-email-address" name="15420" size="20" placeholder="Enter email address here" type="text"> <input id="submitEmailF" class="submit-email submit-email-footer" name="Go" value="SUBMIT" type="submit" style="margin-left:90%;top:35px;"></div><div class="age-checkbox" style="top:5.5rem;"><input id="emailSignupAgeF" name="18andover" value="" type="checkbox" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older"><span class="">Ages 18 and over only!</span><br /><span class="valid hidden">Please check here to confirm.</span><span class="invalid-email hidden">Please check your address.</span><span class="invalid-verify hidden">Please check here to confirm.</span>&nbsp;<strong>We value your privacy.</strong></div><div class="footer-email gdprEmailConsent" style="margin-top:0!important;padding-top:6rem;padding-left:4rem;"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</span></div></div></form></div>';
                    case "EVE":
                        return '<div class="email_bann_eve default" style="float: none!important;padding-bottom: 12%!important; height:100%!important;"><form id="emailSignupFormF" action="//email.evestoys.com/public/webform/process/" style="float: right; width: 100%; height: 44px; text-align: left;" method="post" target="_blank"><input name="fid" value="5yhurhg4n23ope84eyswqmkmeh5dk" type="hidden"> <input name="sid" value="cc0483fa5cc65d4048439bf8ec68e1ea" type="hidden"> <input name="delid" value="" type="hidden"> <input name="subid" value="" type="hidden"> <input name="td" value="" type="hidden"> <input name="formtype" value="addcontact" type="hidden"><div class="form-fields"><input id="emailFieldF" class="email-field email-signup-email-address" name="15420" size="20" placeholder="Enter email address here" type="text" aria-label="Enter email address here"> <input id="submitEmailF" class="submit-email" name="Go" value="SUBMIT" type="submit"></div><div class="age-checkbox"><input id="emailSignupAgeF" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older" name="18andover" value="" type="checkbox"> <input name="spot" value="EmailSignUpFooterTest-Control_desktop" type="hidden"><span class="">Ages 18 and over only!</span><br /><span class="valid hidden">Please check here to confirm.</span><span class="invalid-email hidden">Please check your address.</span><span class="invalid-verify hidden">Please check here to confirm.</span>&nbsp;<strong>We value your privacy.</strong></div><div class="footer-email gdprEmailConsent" style="margin-top:0!important;padding-top:6rem;padding-left:4rem;"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</span></div></div></form></div>';
                    case "SII":
                        return '<div class="email_bann default" style="float: none!important;padding-bottom: 12%!important; height:100%!important;"><form id="emailSignupFormF" style="float: right; width: 100%; height: 44px; text-align: left;" method="post" target="_blank"><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="form-fields"><input id="emailFieldF" class="email-field email-signup-email-address" name="15420" size="20" placeholder="Enter email address here" aria-label="enter your email address" type="text"> <input id="submitEmailF" class="submit-email submit-email-footer" name="Go" value="SUBMIT" type="submit" style="margin-left:90%;top:35px;"></div><div class="age-checkbox" style="top:5.5rem;"><input id="emailSignupAgeF" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older" name="18andover" value="" type="checkbox"><span class="">Ages 18 and over only!</span><br /><span class="valid hidden">Please check here to confirm.</span><span class="invalid-email hidden">Please check your address.</span><span class="invalid-verify hidden">Please check here to confirm.</span>&nbsp;<strong>We value your privacy.</strong></div><div class="footer-email gdprEmailConsent" style="margin-top:0!important;padding-top:6rem;padding-left:4rem;"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</span></div></div></form></div>';
                    case "SWTE":
                        return '<div class="email_bann default" style="float: none!important;padding-bottom: 12%!important; height:100%!important;"><form id="emailSignupFormF" style="float: right; width: 100%; height: 44px; text-align: left;" method="post" target="_blank"><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="form-fields"><input id="emailFieldF" class="email-field email-signup-email-address" name="15420" size="20" placeholder="Enter email address here" aria-label="enter your email address" type="text"> <input id="submitEmailF" class="submit-email submit-email-footer" name="Go" value="SUBMIT" type="submit" style="margin-left:90%;top:35px;"></div><div class="age-checkbox" style="top:5.5rem;"><input id="emailSignupAgeF" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older" name="18andover" value="" type="checkbox"><span class="">Ages 18 and over only!</span><br /><span class="valid hidden">Please check here to confirm.</span><span class="invalid-email hidden">Please check your address.</span><span class="invalid-verify hidden">Please check here to confirm.</span>&nbsp;<strong>We value your privacy.</strong></div><div class="footer-email gdprEmailConsent" style="margin-top:0!important;padding-top:6rem;padding-left:4rem;"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</span></div></div></form></div>';
                    case "VM":
                        return '<div class="email_bann default" style="float: none!important;padding-bottom: 12%!important; height:100%!important;"><form id="emailSignupFormF" style="float: right; width: 100%; height: 44px; text-align: left;" method="post" target="_blank"><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="form-fields"><input id="emailFieldF" class="email-field email-signup-email-address" name="15420" size="20" placeholder="Enter email address here" aria-label="enter your email address" type="text"> <input id="submitEmailF" class="submit-email submit-email-footer" name="Go" value="SUBMIT" type="submit" style="margin-left:90%;top:35px;"></div><div class="age-checkbox" style="top:4.5rem;"><input id="emailSignupAgeF" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older" name="18andover" value="" type="checkbox"><span class="">Ages 18 and over only!</span><br /><span class="valid hidden">Please check here to confirm.</span><span class="invalid-email hidden">Please check your address.</span><span class="invalid-verify hidden">Please check here to confirm.</span>&nbsp;<strong>We value your privacy.</strong></div><div class="footer-email gdprEmailConsent" style="margin-top:0!important;padding-top:6rem;padding-left:4rem;"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time.</span></div></div></form></div>';
                    default:
                        return '<div class="md-8 xs-12 emailSignUp"><form id="emailSignupFormF" class="email-signup-form mvc-ignore default" label="email sign up form" style="background-color: #ebebeb; padding: 5px; margin: 0 auto; "><input name="spot" value="Email Sign Up Footer" type="hidden" /><div class="footer-email-title" style="font-size: 1.2em; font-weight: bold; line-height: 1em; text-align: center; color: #cf2013;">FREE Mystery Gift</div><div class="footer-email-text" style="margin: .25rem auto;"><input name="email" class="email-signup-email-address" placeholder="Enter Email Address" type="email" aria-label="enter your email address" title="enter your email address" /></div><div class="footer-email-actions"><div class="pull-right"><button class="button-gray" style="font-size: .65rem;">Sign Up</button></div><div class="pull-left"><input id="emailSignupAgeF" title="email signup checkbox" aria-label="check box to verify that you are 18 years of age or older" name="18andover" class="email-signup-verify-checkbox" type="checkbox" aria-label="check box to verify that you are 18 years of age or older" /></div><div class="no-gutter" style="text-align: left; font-size: .65em; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Ages 18 and over only!</span><br /><span class="valid">Please check here to confirm.</span><span class="invalid-email text-red hidden">Please check your address.</span><span class="invalid-verify text-red hidden">Please check here to confirm.</span> &nbsp;<strong>We value your privacy.</strong></div></div><div class="footer-email gdprEmailConsent"><div class="no-gutter gdpr-error-text hidden" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Please check here to confirm</span></div><div class="pull-left"><input id="gdprEmailConsentF" name="gdprEmailConsent" class="gdpr-checkbox" type="checkbox" label="gdpr consent signup checkbox" title="gdpr consent signup checkbox" /></div><div class="no-gutter" style="text-align: left; font-size: 15px; line-height: 1.4em; padding-left: 3px;"><span class="text-red">Yes! I would like to receive updates about products & services, promotions, special offers, news & events via email. I understand I can unsubscribe at any time. </span></div></div></form></div>';
                }
            }
        };

        return api;
    })();
    var checkForDisplay = setInterval(function () { phe.emailLightBox.throwDefaultOnTestFailure(); }, 1000);
}

function initEmailSignUpLightBoxSetUp(url, source, fields, lists, sms) {
    url = (typeof url != 'undefined' ? url : '/t-email-thank-you.aspx');
    source = (typeof source != 'undefined' ? source : 'OPTIN15');
    source = (source.indexOf('?sc=') === 0 ? source : '?sc=' + source);

    var emailSignupLightbox = new EmailSignUp();
    var l_form = document.querySelector('#emailSignupFormL');

    var emailLightboxSetup = {
        invalidFormHandler: function (err) {  
            [].slice.call(l_form.querySelectorAll('.gdpr-error-text')).map(function (x) {
                x.classList.add('hidden');
            });

            if (err[0].includes('checkbox')) {
                [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.add('text-red') });
                [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('hidden') });
            }
            else if (err[0].includes('gdprEmailConsent')) {
                [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('text-red') });
                [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(l_form.querySelectorAll('.gdpr-error-text')).map(function (x) { x.classList.remove('hidden') });
            }
            else {
                [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) {
                    x.classList.remove('hidden');
                });

                [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('text-red') });
            }
        },
        validFormHandler: function () {
            [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
            [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('text-red') });
            [].slice.call(l_form.querySelectorAll('.gdpr-error-text')).map(function (x) { x.classList.add('hidden') });
        },
        ajaxErrorHandler: function () {
            [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) { x.classList.remove('hidden') });
            [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('text-red') });
        },
        ajaxSuccessHandler: function () {
            [].slice.call(document.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
            [].slice.call(document.querySelectorAll('.age-verify-grey')).map(function (x) { x.classList.remove('text-red') });
            setTimeout(function () { window.location.replace(url + source); }, 500);
        },
        formSelector: '#emailSignupFormL',
        fieldsBuilder: function () {
            return (typeof fields != 'undefined' ? fields : false);
        },
        listsBuilder: function () {
            return (typeof lists != 'undefined' ? lists : false);
        },
        smsBuilder: function () {
            return (typeof sms != 'undefined' ? sms : false);
        }
    }

    emailSignupLightbox.init(emailLightboxSetup);
}

function initEmailSignUpFooterSetUp(url, source, fields, lists, sms) {
    url = (typeof url != 'undefined' ? url : '/t-email-thank-you.aspx');
    source = (typeof source != 'undefined' ? source : 'OPTIN15');
    source = (source.indexOf('?sc=') === 0 ? source : '?sc=' + source);

    var emailSignupFooter = new EmailSignUp();
    var emailFooterSetup = {
        invalidFormHandler: function (err) {
            var f_form = document.querySelector('#emailSignupFormF');
            [].slice.call(f_form.querySelectorAll('.gdpr-error-text')).map(function (x) {
                x.classList.add('hidden');
            });

            if (err[0].includes('checkbox')) {
                [].slice.call(f_form.querySelectorAll('.valid')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-verify')).map(function (x) { x.classList.remove('hidden') });
            } else if (err[0].includes('gdprEmailConsent')) {
                [].slice.call(f_form.querySelectorAll('.valid')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-email')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-verify')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.gdpr-error-text')).map(function (x) { x.classList.remove('hidden') });
            }
            else {
                [].slice.call(f_form.querySelectorAll('.valid')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-verify')).map(function (x) { x.classList.add('hidden') });
                [].slice.call(f_form.querySelectorAll('.invalid-email')).map(function (x) { x.classList.remove('hidden') });
            }
        },
        validFormHandler: function () {
            var f_form = document.querySelector('#emailSignupFormF');
            [].slice.call(f_form.querySelectorAll('.valid')).map(function (x) { x.classList.remove('hidden') });
            [].slice.call(f_form.querySelectorAll('.invalid-verify, .invalid-email, .gdpr-error-text')).map(function (x) { x.classList.add('hidden') });
        },
        ajaxErrorHandler: function () {
            var f_form = document.querySelector('#emailSignupFormF');
            [].slice.call(f_form.querySelectorAll('.valid, .invalid-verify')).map(function (x) { x.classList.add('hidden') });
            [].slice.call(f_form.querySelectorAll('.invalid-email')).map(function (x) { x.classList.remove('hidden') });
        },
        ajaxSuccessHandler: function () {
            setTimeout(function () { window.location.replace(url + source); }, 500);
        },
        formSelector: '#emailSignupFormF',
        fieldsBuilder: function () {
            return (typeof fields != 'undefined' ? fields : false);
        },
        listsBuilder: function () {
            return (typeof lists != 'undefined' ? lists : false);
        },
        smsBuilder: function () {
            return (typeof sms != 'undefined' ? sms : false);
        }
    }

    emailSignupFooter.init(emailFooterSetup);
}
;
_.ready(wireEmailSignupForm);

function wireEmailSignupForm() {

    // if (shouldShow() && !phe.config.isEmailSignupRedesign) {
    if (shouldShow()) {

        if (!phe.customer.isValidForGDPREmailConsent) {
            [].slice.call(document.querySelectorAll('.gdprEmailConsent')).map(function (x) { x.classList.add('hidden'); });
        }

        var parents = document.querySelectorAll('.module-emailSignupForm');

        [].slice.call(parents).map(function (x) {
            var form = x.querySelector('.email-signup-form');

            if (!form) {
                return;
            }
            else {
                x.classList.remove('hidden');

            }

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var email_Form = this;
                var config_element = e.target.closest('.module-emailSignupForm').querySelector('.email-spot-config');
                var config_lightbox = e.target.closest('.lightbox-module') && e.target.closest('.lightbox-module').dataset;
                var config = {
                    spot: config_element.dataset.signupSpot,
                    sourceCode: config_element.dataset.sourceCode,
                    redirectUrl: config_element.dataset.redirectUrl,
                    test: '-' + config_element.dataset.test
                }

                var errors = [];
                var regex = /\s*[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\s*/;
                var email = e.target.querySelector('[type="email"]');
                var ageVerified = e.target.querySelector('[type="checkbox"]');
                var gdpr = e.target.querySelector('[name="gdpr"]');
                var validationEmail = e.target.querySelector('[name="email-address-validation"]');
                var validationAge = e.target.querySelector('[name="age-validation"]');
                var validationGDPR = e.target.querySelector('[name="gdpr-validation"]');
                var submit_button = e.target.querySelector('input[type="submit"]');
                validationGDPR.innerHTML = '';
                validationAge.innerHTML = '';
                validationEmail.innerHTML = '';

                if (!regex.test(email.value)) {
                    validationEmail.appendChild(generateErrorMessage(email));
                    errors.push('invalid-email');
                }

                if (!ageVerified.checked) {
                    validationAge.appendChild(generateErrorMessage(ageVerified));
                    errors.push('invalid-eighteen');
                }

                if (phe.customer.isValidForGDPREmailConsent && !gdpr.checked) {
                    validationGDPR.appendChild(generateErrorMessage(gdpr));
                    errors.push('invalid-gdpr');
                }

                if (errors.length == 0) {
                    if (submit_button)
                        submit_button.disabled = true;
                    var request = new XMLHttpRequest();
                    var fields = [
                        { name: 'Signup_source', value: config.sourceCode },
                        { name: 'Signup_device', value: phe.customer.deviceType },
                        { name: 'Signup Spot', value: config.spot },
                        { name: 'Signup_group', value: config.test }
                    ];

                    var req = {
                        email: email.value,
                        spot: config.spot,
                        fields: fields,
                        lists: [],
                        smsKeywords: [],
                        isgdpremailconsent: gdpr.checked
                    };

                    request.open('POST', '/account/emailsignup', false);

                    var contentType = 'application/json';
                    request.setRequestHeader("Content-Type", contentType);
                    request.setRequestHeader("Accept", contentType);
                   
                    if (email_Form && email_Form.querySelector('input[name="__RequestVerificationToken"]')) {
                        request.setRequestHeader('RequestVerificationToken', email_Form.querySelector('input[name="__RequestVerificationToken"]').value);
                    } else {
                        request.setRequestHeader('RequestVerificationToken', phe.config.antiForgeryToken);
                    }
                    request.onload = function () {
                        var data = JSON.parse(request.responseText);

                        if (data.Success) {

                            if (phe.config.cookies.allowFunctionalCookies) {
                                setCookie('emailOnFile', true, 7);
                            }

                                if (config.spot.toLowerCase() == "footer") {
                                    trackEvent("Email SignUp Footer" + config.test, 2, "Email Sign Up");
                                }
                                if (config_lightbox && config_lightbox.miCmConversionElementId !== '' && config_lightbox.miCmConversionCategoryId) {
                                    trackEvent(config_lightbox.miCmConversionElementId + config.test, 2, config_lightbox.miCmConversionCategoryId);
                                }
                                trackRegistrationTag(phe.customer.customerId, req.email);
                            if (window.dataLayer) {
                                dataLayer.push({ "event": "emailSignup" });
                            }

                            setTimeout(function () { navigateToLocation(config.redirectUrl + '?sc=' + config.sourceCode); }, 500);;

                        } else {
                            if (submit_button)
                                submit_button.disabled = false;
                            console.log(data);
                        }
                    };

                    request.send(JSON.stringify(req));
                }
            });
        })

    } else {
        [].slice.call(document.querySelectorAll('.emailSignupForm-hasEmail')).map(function (x) { x.classList.remove('hidden'); });
    }
};

function shouldShow() {
    //var form = document.querySelectorAll('.module-emailSignup-form');
    var form = document.querySelectorAll('.module-emailSignupForm');
    if (!phe.customer.hasEmail && !(form === null) && !(form === undefined)) {
        return true;
    } else {
        return false;
    }
}

function handleLightboxTracking(emailSignupConfig, lightboxConfig) {
    UpdateLightBoxesDisplayedCookie(lightboxConfig.miId);

    var test = emailSignupConfig != null && typeof emailSignupConfig !== 'undefined' ? '-' + emailSignupConfig.test : '';

    if (emailSignupConfig && lightboxConfig.miSecondaryLightbox !== "True" && phe.config.cookies.allowFunctionalCookies) {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        document.cookie = 'lightBoxDisplayed=EmailSignUp_True;secure;path=/;expires=' + now.toGMTString();
        document.cookie = 'signup-variant=' + (test.length == 1 ? test : 'default') + ';secure;path=/;expires=' + now.toGMTString();
    }
    //conversion tag
    if (phe.config.alwaysTrackEmailSignUpInitiation && lightboxConfig.miCmConversionElementId !== '' && lightboxConfig.miCmConversionCategoryId) {
        trackEvent(lightboxConfig.miCmConversionElementId + test, 1, lightboxConfig.miCmConversionCategoryId);
    }

    //eligibility conversion tag
    if (phe.config.trackEmailLightboxImpressions && lightboxConfig.miCmEligibilityConversionElementId !== '' && lightboxConfig.miCmEligibilityConversionCategoryId) {
        var trackingCookie = 'tracked-lightbox-eligibility';
        trackEvent(lightboxConfig.miCmEligibilityConversionElementId, 2, lightboxConfig.miCmEligibilityConversionCategoryId);
        if (phe.config.cookies.allowFunctionalCookies)
            setCookie(trackingCookie, '2');
    }
   
    //siteSpect metric event
    if (window.SS && lightboxConfig.miSitespectMetricEvent && lightboxConfig.miSitespectMetricEvent.length > 0) {
        SS.EventTrack.rp(lightboxConfig.miSitespectMetricEvent);
    }
}

function UpdateLightBoxesDisplayedCookie(miId) {
    if (phe.config.cookies.allowFunctionalCookies) {
        var cookieName = 'lightBoxesDisplayed';
        var v = getCookie(cookieName).split(",");
        v.push(miId);
        v = v.filter(function(c, index) {
            return v.indexOf(c) === index;
        });
        var now = new Date();
        now.setTime(now.getTime() + 1000 * 36000);
        document.cookie = cookieName + '=' + escape(v.filter(function (c) { return c && c.length > 0; }).join(","))+';secure;path=/;expires=' + now.toGMTString();
    }
}

function attentiveSignupCallback(signUpData) {
   
    if (!phe.config.enableAttentiveSignupCallback) {
        return false;
    }
    if (signUpData) {
        var emailSignUpData = {
            emailAddress: signUpData.emailAddress, // user's email address
            subscribeToEmail: typeof signUpData.subscribeToEmail !== 'undefined' && signUpData.subscribeToEmail ? true : false, // true/false. If true : user has subscribed to email
            phoneNumber: signUpData.phoneNumber, //user's Phone number if any 
            subscribeToPhoneNumber: typeof signUpData.subscribeToPhoneNumber !== 'undefined' && typeof signUpData.phoneNumber !== 'undefined' && signUpData.subscribeToPhoneNumber ? true : false, // true/false. If true : user has subscribed to SMS
            signUpSpot: typeof signUpData.signUpSpot !== 'undefined' ? signUpData.signUpSpot : "attentive", //Signup spot 
            sourceCode: typeof signUpData.signUpSourceCode !== 'undefined' && signUpData.signUpSourceCode.length > 0 ? signUpData.signUpSourceCode : phe.config.attentiveEmailSourceCode,//Signup sourcecode like OPTIN19 
            redirectUrl: typeof signUpData.thankYouPageUrl !== 'undefined' && signUpData.thankYouPageUrl.length > 0 ? signUpData.thankYouPageUrl : phe.config.attentiveEmailRedirectUrl, // after signup navigate to user to this url
            signUpGroup: typeof signUpData.signUpGroup !== 'undefined' ? signUpData.signUpGroup : "attentive", //signup group if any 
        }

        //below is PHE code to send email subscription data to Zetaglobal contact  and create a customer's account based on email
        // 
       
        if (phe.config.overrideAtteniveSourceCode) {
            emailSignUpData.sourceCode = phe.customer.signupsourcecode;
            emailSignUpData.redirectUrl = phe.customer.thankyoupageUrl;
        }
        var errors = [];
        var regex = /\s*[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\s*/;


        if (!emailSignUpData.phoneNumber && (!emailSignUpData.emailAddress || !regex.test(emailSignUpData.emailAddress))) {
            errors.push('invalid-email');
        }



        if (errors.length === 0 && emailSignUpData && emailSignUpData.emailAddress && emailSignUpData.emailAddress.length > 0) {
            var request = new XMLHttpRequest();
            var fields = [
                { name: 'Signup_source', value: emailSignUpData.sourceCode },
                { name: 'Signup_device', value: phe.customer.deviceType },
                { name: 'Signup Spot', value: emailSignUpData.signUpSpot },
                { name: 'Signup_group', value: emailSignUpData.signUpGroup }
            ];

            var req = {
                email: emailSignUpData.emailAddress,
                spot: emailSignUpData.signUpSpot,
                fields: fields,
                lists: [],
                smsKeywords: [],
                isgdpremailconsent: false
            };

            request.open('POST', '/account/emailsignup', false);

            var contentType = 'application/json';
            request.setRequestHeader("Content-Type", contentType);
            request.setRequestHeader("Accept", contentType);
            phe.attentive = phe.attentive || {};
            phe.attentive.sourceCode = emailSignUpData.sourceCode;
            phe.attentive.redirectUrl = emailSignUpData.redirectUrl;
            phe.attentive.emailAddress = emailSignUpData.emailAddress;

            request.setRequestHeader('RequestVerificationToken', phe.config.antiForgeryToken);
            request.onload = function () {

                var data = JSON.parse(request.responseText);

                if (data.Success) {

                    if (phe.config.cookies.allowFunctionalCookies) {
                        setCookie('emailOnFile', true, 7);
                    }

                    if (phe.config.isCoremetricsEnabled && phe.config.cookies.allowPerformanceCookies) {
                        trackRegistrationTag(phe.customer.customerId, req.email);
                    }
                    if (window.dataLayer) {
                        dataLayer.push({ "event": "emailSignup" });
                    }
                   
                    console.log('sourceCode:' + emailSignUpData.sourceCode + ',redirectUrl:' + emailSignUpData.redirectUrl);

                } else {
                    console.log(data);
                }
            };

            request.send(JSON.stringify(req));
        }
        else if (emailSignUpData && emailSignUpData.phoneNumber) {
            attentiveSMSSignupCallback(emailSignUpData);
        }
        else {
            console.log('Invalid Attentive callback data: Errors: ' + errors.join(','));
            console.log(signUpData);
        }

        invokeBrowseRecovery(signUpData.emailAddress);
    }
}

function attentiveSMSSignupCallback(signUpData) {

    if (!phe.config.enableAttentiveSMSSignupCallback) {
        return false;
    }
  
    if (signUpData && signUpData.phoneNumber) {
        _.ajax('/account/smssignup', 'POST', {
            emailAddress: phe.attentive && phe.attentive.emailAddress && phe.attentive.emailAddress.indexOf('@') > 0 ? phe.attentive.emailAddress : '',
            firstName: '',
            lastName: '',
            mobileNumber: signUpData.phoneNumber,
            IsSmsOptIn: true,
            IsAttentive: true,
            Country: 'US',
            __RequestVerificationToken: phe.config.antiForgeryToken
        }, function (res) {
                console.log(res);
        }, function (res) {  }, 'application/x-www-form-urlencoded');

    } else {
        console.log('Invalid SMS Attentive callback data: Errors: invalid-phoneNumber');
        console.log(signUpData);
    }

}

function attentiveClosedCallback() {
   
    if (!phe.config.enableAttentiveSignupCallback) {
        return false;
    }
    phe.attentive = phe.attentive || {};
   
    if (phe.attentive) {
        if (phe.attentive.sourceCode && phe.attentive.sourceCode.length > 0 && phe.attentive.redirectUrl && phe.attentive.redirectUrl.length > 0) {
            setTimeout(function () {
                var url = phe.attentive.redirectUrl + (phe.attentive.redirectUrl.indexOf(phe.attentive.sourceCode) > -1 ? '' : ((phe.attentive.redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'sc=' + phe.attentive.sourceCode));
                navigateToLocation(url);
            }, 500);
        } else {
            console.log('Invalid Attentive callback data:: ' + phe.attentive);
        }
    } 
}

function invokeBrowseRecovery(email) {
   
    if (phe.config.enableBrowseRecoveryByAttentive) {
        var regex = /\s*[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\s*/;
        if (email && regex.test(email)
            && zetaGlobal && typeof zetaGlobal.browseRecovery === 'function') {
            zetaGlobal.browseRecovery(email);
        }
    }
}

;
_.ready(function () {

    function handleSubmit(event) {

        event.preventDefault();

        var errors = [];
        var phone = event.target.querySelector('[type="tel"]');
        var optIn = event.target.querySelector('[type="checkbox"]');
        var parent = event.target.closest('.sms-signup-form');
        var keyword = parent.getAttribute('data-keyword');
        var validationOptIn = event.target.querySelector('.sms-validation-opt-in');
        validationOptIn.innerHTML = '';
        var validationPhone = event.target.querySelector('.sms-validation-phone');
        validationPhone.innerHTML = '';
      
        if (phone == undefined || phone == null || phone.value == '' || !phone.value.match(/\d/g) ||  phone.value.match(/\d/g).length !== 10) {
            validationPhone.appendChild(generateErrorMessage(phone));
            errors.push('invalid-phone');
            phone.focus();
        } else {
            phone.value = phone.value.replace(/[\)\(-]/gi, "");
        }


        if (!optIn.checked) {          
            validationOptIn.appendChild(generateErrorMessage(optIn));
            errors.push('invalid-optin');
            optIn.focus();
        }

        if (errors.length == 0){
            var request = new XMLHttpRequest();
            var req = {
                IsSMSOptIn: optIn.checked,
                Phone: phone.value,
                SMS_OptIn_ActivityLogId: 41,
                keywordId: keyword
            };
            request.open('POST', '/checkout/SMSSignup', false);
            var contentType = 'application/json';
            request.setRequestHeader("Content-Type", contentType);
            request.setRequestHeader("Accept", contentType);
            if (parent && parent.querySelector('input[name="__RequestVerificationToken"]')) {
                request.setRequestHeader('RequestVerificationToken', parent.querySelector('input[name="__RequestVerificationToken"]').value);
            } else {
                request.setRequestHeader('RequestVerificationToken', phe.config.antiForgeryToken);
            }
            request.onload = function () {
                var data = JSON.parse(request.responseText);
                if (data.Success) {

                    var cmEventId = parent.getAttribute('data-cm-event-id');
                    if (cmEventId.length == 0) {
                        cmEventId = "DEFAULT FORM";
                    }
                    trackEvent(cmEventId, 2, 'SMS SIGNUP');

                    event.target.querySelector('.sms-confirmation-container').classList.remove('hidden');
                    event.target.querySelector('.sms-signup-container').classList.add('hidden');

                }
                else {
                    validationPhone.appendChild(generateErrorMessage(phone));
                    errors.push('invalid-phone');
                    phone.focus();
                }
            };
            request.send(JSON.stringify(req));
        }

    }

    function setUpButtons() {
        [].slice.call(document.querySelectorAll(".sms-signup-form")).map(function (el) {
            if (!(el == undefined) || !(el == null)) {
                el.addEventListener('submit', handleSubmit);
            }
        });
    }

    function handleToggle(event) {
        event.preventDefault();
        [].slice.call(document.querySelector(".sms-details-text").classList.toggle('hidden'));
    }

    function handleCoremetrics() {

        var eventId = document.querySelector('.sms-signup-form').getAttribute('data-cm-event-id');
        trackEvent(eventId, 1, 'SMS SIGNUP');
    }

    function checkForSMSForm() {
        [].slice.call(document.querySelectorAll('.sms-signup-form')).map(function (el) {
            if (!(el == undefined) || !(el == null)) {
                setUpButtons();
                handleCoremetrics();
            }
        });
    }
    checkForSMSForm();
});
;
_.ready(function () {



    [].slice.call(document.querySelectorAll('#footer-menus li.heading')).map(function (menu) {
        menu.addEventListener('click', function (e) {
            e.target.parentNode.classList.toggle('in');
        });
    });

    if (phe.config.isSiteRedesign2022) {
        [].slice.call(document.querySelectorAll('.ae-footer .ae-accordion')).map(function (footerAccordion) {
            function setOpen() {
                if (window.matchMedia('(min-width: 768px)').matches == true) {
                    footerAccordion.setAttribute('open', '');
                    footerAccordion.addEventListener('click', clickHandler, false)
                } else {
                    footerAccordion.removeAttribute('open');
                    footerAccordion.removeEventListener('click', clickHandler, false)
                }
            }
            window.addEventListener('resize', function () {
                setOpen();
            })

            var clickHandler = function (event) {
                if (!event.target.matches('a')) {
                    event.preventDefault();
                }
            }
            setOpen();
        });
    }
});;
_.ready(function () {
    document.addEventListener('click', function (e) {
        var el = e.target;
        var section;

        if (el.classList.contains('expandable')) {
            section = el;
        } else {
            section = el.closest('.expandable');
        }

        if (section && !section.parentNode.matches('#more-less-section')) {
            var toggler = section.getAttribute('data-toggler');

            if (toggler && (el.nodeName !== toggler.toUpperCase() && !e.target.closest(toggler))) {
                return;
            }

            section.classList.toggle('expanded');
        }
    }, true);

    //[].slice.call(document.querySelectorAll('.expandable, .expandable .collapse-button, .expandable .expand-button')).map(function (el) {
    //    el.addEventListener('click', function (e) {
    //        var thing = e.target.closest('.expandable');
    //        thing.classList.toggle('expanded');
    //    });
    //});
    
    document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-toggle="collapse"]');
        
        if (!el) {
            return;
        }
        
        var target = document.querySelector(el.getAttribute('data-target'));
        var collapsing = target.classList.contains('in');
        var indicator = el.querySelector('.collapse-icon');
        var collapsedIndicator = el.getAttribute('data-icon-collapsed');
        var expandedIndicator = el.getAttribute('data-icon-expanded');
        
        target.classList.toggle('in');
        el.classList.toggle('collapsed');
        
        if (!indicator) {
            return;
        }
        
        if (collapsing) {
            indicator.classList.remove(expandedIndicator);
            indicator.classList.add(collapsedIndicator);
        } else {
            indicator.classList.remove(collapsedIndicator);
            indicator.classList.add(expandedIndicator);
        }
    });
});;
(function () {
    var patterns = [
        { type: "required", regex: /.+/ },
        { type: "requiredif", regex: /.+/ },
        { type: "email", regex: /\S+@\S+[.]\S+/ },
        { type: "regex", ignoreIfEmpty: true }
    ];

    var rule_template = {
        type: null,
        pattern: null,
        message: null,
        predicate: null
    }

    function forEachIn(obj, fn) {
        var index = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(obj[key], key, index++);
            }
        }
    }

    function extend() {
        var result = {};
        for (var i = 0; i < arguments.length; i++) {
            forEachIn(arguments[i],
                function (obj, key) {
                    result[key] = obj;
                });
        }
        return result;
    }

    function buildValidationRules(form) {
        if (!form.val_rules) {
            var to_store = [];
            var els = form.querySelectorAll('input, textarea, select');
            var mode = form.getAttribute('data-val-mode');
            var compatibility_mode = mode === 'compatibility' ? true : false;

            [].slice.call(els).map(function (el, index) {
                var rules_attribute = el.getAttribute('data-val');
                var parsed = [];
                var extended = [];

                if (compatibility_mode && rules_attribute === 'true') {
                    for (var i = 0; i < el.attributes.length; i++) {
                        var attr = el.attributes[i];

                        if (attr.name === 'data-val-required' ||
                            attr.name === 'data-val-regex' ||
                            attr.name === 'data-val-requiredif') {

                            if (attr.name === 'data-val-required') {
                                parsed.push({
                                    type: 'required',
                                    message: attr.value
                                });
                            }

                            if (attr.name === 'data-val-regex') {
                                parsed.push({
                                    type: 'regex',
                                    message: attr.value,
                                    pattern: el.getAttribute(attr.name + '-pattern')
                                });
                            }

                            if (attr.name === 'data-val-requiredif') {
                                var predicate = function (element) {
                                    return element
                                        .closest('form')
                                        .querySelector('[name="' + element.getAttribute('data-val-requiredif-dependentproperty') + '"]')
                                        .value === element.getAttribute('data-val-requiredif-targetvalue');
                                };

                                parsed.push({
                                    type: 'requiredif',
                                    message: attr.value,
                                    predicate: predicate
                                });
                            }
                        }
                    }
                } else {
                    el.setAttribute('data-val-index', index);

                    if (rules_attribute) {
                        parsed = JSON.parse(rules_attribute);
                    }
                }

                for (var i = 0; i < parsed.length; i++) {
                    extended.push(extend(rule_template, parsed[i]));
                }

                to_store.push(extended);
            });

            form.val_rules = to_store;
        }
    }

    function validateForm(form) {
        var els = form.querySelectorAll('input, textarea, select');
        var errors = [];

        buildValidationRules(form);
        form.manual_rules = form.manual_rules || [];
      
        [].slice.call(els).map(function (el, index) {
            var rules = form.val_rules[index];
            rules.push.apply(rules, form.manual_rules[index]);
            var sortedRules = rules.sort(function (a, b) {
                return (a.type === 'required' || a.type === 'requiredif') ? -1 : (b.type === 'required' || b.type === 'requiredif') ? 1 : 0;
            });
            rules = sortedRules;
            
            
            if (rules.length > 0) {
                el.classList.remove('error')
                var errorMessage = el.parentNode.querySelector('.error-message');
                
                if (errorMessage) {
                    errorMessage.classList.add('hidden');
                }
                
                for (var i = 0; i < rules.length; i++) {
                    if (rules[i].type === 'requiredif' && !rules[i].predicate(el)) {
                        break;
                    }

                    var pattern = patterns.filter(function (x) { return x.type === rules[i].type })[0];

                    if (pattern.type === 'regex') {
                        pattern.regex = new RegExp(rules[i].pattern);
                    }

                    if (pattern.ignoreIfEmpty && el.value.length === 0) {
                        break;
                    }
                    
                    if (!pattern.regex.test(el.value)) {
                        errors.push({ Name: el.name, Message: rules[i].message });
                        break;
                    }
                }
            }
        });

        form.classList.add('validated');

        return errors;
    }

    document.addEventListener('focus', function (e) {
        if (typeof e.target.matches != 'undefined' && e.target.matches('input')) {
            var help_text = e.target.getAttribute('data-help-text');

            if (help_text) {
                var help_text_control = e.target.previousSibling;

                if (!help_text_control || help_text_control.nodeName === '#text' || !help_text_control.matches('.help-text')) {
                    var help_text_control = document.createElement('div');
                    help_text_control.classList.add('help-text');

                    var help_text_display = document.createElement('span');
                    help_text_display.innerHTML = help_text;

                    help_text_control.appendChild(help_text_display);
                    e.target.parentNode.insertBefore(help_text_control, e.target);
                }

                help_text_control.classList.add('in');
            }
        }
    }, true);

    document.addEventListener('focus', function (e) {
        if (typeof e.target.matches != 'undefined' && e.target.matches('input')) {
            var help_text = e.target.getAttribute('data-help-text');

            if (help_text) {
                var help_text_control = e.target.previousSibling;

                if (!help_text_control || help_text_control.nodeName === '#text' || !help_text_control.matches('.help-text')) {
                    var help_text_control = document.createElement('div');
                    help_text_control.classList.add('help-text');

                    var help_text_display = document.createElement('span');
                    help_text_display.innerHTML = help_text;

                    help_text_control.appendChild(help_text_display);
                    e.target.parentNode.insertBefore(help_text_control, e.target);
                }

                help_text_control.classList.add('in');
            }
        }
    }, true);

    document.addEventListener('focusout', function (e) {
        if (typeof e.target.matches != 'undefined' && e.target.matches('input')) {
            var el = e.target.previousSibling;

            if (el
                && el.classList
                && el.classList.contains('help-text')
                && el.classList.contains('in')) {

                el.classList.remove('in');
            }
        }
    }, true);

    document.addEventListener('focusout', function (e) {
        var el = e.target.closest('.form-control.error');
        if (!el) return;
        
        validateForm(el.closest('form'));
    }, true);

    'keyup change'.split(' ').forEach(function (x) {
        document.addEventListener(x, function (e) {
            if (typeof e.target.matches != 'undefined' && e.target.matches('input')) {
                var form = e.target.closest('form');

                if (form != null && form.classList.contains('validated')) {
                    var errors = validateForm(form);
                    displayErrorsOnForm(form, errors);
                }
            }
        }, true);
    })


    document.addEventListener('submit', function (e) {
        if (typeof e.target.matches != 'undefined' && e.target.matches('form')) {
            var errors = validateForm(e.target);

            if (errors.length > 0) {
                e.preventDefault();
                displayErrorsOnForm(e.target, errors);
            } else {
                if (e.target.form_submit_handler) {
                    e.preventDefault();
                    e.target.form_submit_handler();
                } else {
                    // let the form submit normally.
                }
            }
        }
    });

     _.serializeForm = function (form) {
         var els = form.querySelectorAll('input:not([type="submit"]), textarea, select');
         var data = {};
    
         for (var i = 0; i < els.length; i++) {
             data[els[i].name] = els[i].value;
         }
    
         return data;
     }

    function displayErrorsOnForm(form, errors) {
        [].slice.call(form.querySelectorAll('.error-container')).map(function (el) {
            el.classList.remove('field-validation-error');
        });

        [].slice.call(form.querySelectorAll('.error')).map(function (el) {
            el.classList.remove('error');
        })

        errors.forEach(function (error) {
            var el = form.querySelector('[name="' + error.Name + '"]');
            el.classList.add('error');
            var error_element = el.parentNode.querySelector('.error-message');

            if (!error_element) {
                error_element = document.createElement('div');
                error_element.classList.add('error-message');
                error_element.setAttribute('role','alert');
                error_element.setAttribute('aria-live','assertive');
                error_element.setAttribute('aria-atomic','true');
                el.parentNode.insertBefore(error_element, el.nextSibling);
            }

            error_element.innerHTML = error.Message;
            error_element.classList.remove('hidden');

            // handle error container
            var error_container = error_element.closest('.error-container');

            if (error_container) {
                error_container.classList.add('field-validation-error');
            }
        });
        
        if (errors.length > 0) {
            form.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    window.validateForm = validateForm;
    _.displayErrorsOnForm = displayErrorsOnForm;
})();

function addValidationRule(element, rule) {
    if (!element) {
        return;
    }
    var form = element.closest('form');
    var index = -1;

    [].slice.call(form.querySelectorAll('input, textarea, select')).map(function (el, idx) {
        if (el === element) {
            index = idx;
        }
    });

    if (index > -1) {
        form.manual_rules = form.manual_rules || [];

        if (!form.manual_rules[index]) {
            form.manual_rules[index] = [];
        }

        form.manual_rules[index].push(rule);
    }
}

function removeMaskedCharactersFromSMS(selector) {
    var $phone = document.querySelector(selector);
    if ($phone != null) {
        $phone.value = $phone.value.split("-").join("");
    }
};
;
var parseHTML = function (str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp; //.body; // tmp.body.children;
};
function removeIllegalCharacters(itemName) {
    var pattern = /[/&'’™`!#:\/<>~;%\$^*"]/g;
    if (itemName && itemName.length > 0) {
        return itemName.replace(pattern, '');
    } else {
        return "";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    function useNewGlider(htmlWidget) {
        if (phe.config.useNewGlider) {
            if (htmlWidget.querySelector('.slider')) {


                htmlWidget.querySelector('.slider').classList.remove('category-product-list');
                htmlWidget.querySelector('.slider').classList.remove('slider');

                htmlWidget.querySelector('.frame') && htmlWidget.querySelector('.frame').classList.remove('overflow-visible');
                htmlWidget.querySelector('.frame') && htmlWidget.querySelector('.frame').classList.add('glider-contain');
                htmlWidget.querySelector('.frame') && htmlWidget.querySelector('.frame').classList.remove('frame');

                htmlWidget.querySelector('.slides') && htmlWidget.querySelector('.slides').classList.add('glider');
                htmlWidget.querySelector('.slides') && htmlWidget.querySelector('.slides').classList.remove('slides');

                htmlWidget.querySelector('.prev') && htmlWidget.querySelector('.prev').classList.add('glider-prev');
                htmlWidget.querySelector('.next') && htmlWidget.querySelector('.next').classList.add('glider-next');

                htmlWidget.querySelector('.prev .slick-sr-only') && htmlWidget.querySelector('.prev .slick-sr-only').remove('prev');
                htmlWidget.querySelector('.next .slick-sr-only') && htmlWidget.querySelector('.next .slick-sr-only').remove('prev');

            }
        }
    }
    function populateItemTypeForLegacyHawkThenCallGATags(slider, widgetName) {

        fetch('/product/getdynamicproducttype', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'RequestVerificationToken': phe.config.antiForgeryToken
            },
            body: '{"name":"' + 'Hawk Recs - ' + widgetName.toLowerCase().trim() + '"}'
        }).then(function (res) { return res.json(); })
            .then(function (res) {

                [].slice.call(slider.querySelectorAll('a[data-impression],a[data-hawkimpression]')).map(function (link, index) {

                    if (!link.hasAttribute('data-cm-producttype') || !link.getAttribute('data-cm-producttype')) {
                        link.setAttribute('data-cm-producttype', res.id);
                    }
                });

                GATags(slider, widgetName);
            });
    }
    function GATags(slider, widgetName) {

        try {

            var impressions = [].slice.call(slider.querySelectorAll('a[data-impression],a[data-hawkimpression]')).map(function (link, index) {
                var strImpression = link.getAttribute('data-impression') || link.getAttribute('data-hawkimpression');
                strImpression = strImpression.replace(/: /ig, ":").replace(/, /ig, ",");
                strImpression = strImpression.replace(/:,/ig, ":null,");
                strImpression = strImpression.replace(/(\:\')([^:]*)(\')([^:]*)(\'[,}])/ig, "$1$2\\'$4$5");

                var o = eval("(" + strImpression + ")");
                var list = 'Hawk Recs - ' + widgetName.toLowerCase().trim();
                var i2 = index + 1;
                var productId = parseInt(link.getAttribute('data-productid'));
                link.addEventListener("click", function () {
                    var event = {
                        'event': 'productClick',
                        'ecommerce': {
                            'click': {
                                'actionField': { 'list': list },
                                'products': [{
                                    'name': removeIllegalCharacters(o.name),
                                    'id': o.id,
                                    'price': o.price.toFixed(2).toString(),
                                    'brand': o.brand,
                                    'category': o.category,
                                    'position': i2,
                                    'list': list,
                                    'productId': productId,
                                    'dimension1': o.dimension1,
                                    'dimension2': o.dimension2,
                                    'dimension5': o.dimension5.toLowerCase() == "true",
                                    'dimension7': o.dimension7,
                                    'metric3': o.dimension23.toFixed(2).toString(),
                                    'metric5': o.metric5.replace("$", ""),
                                    'location': window.location.href

                                }]
                            }
                        }
                    };
                    dataLayer.push(event);


                    setCoremetricsItem(productId, 0, link.hasAttribute('data-cm-producttype') ? link.getAttribute('data-cm-producttype') : "195", link, true, widgetName.toLowerCase());
                });
                return {
                    id: o.id,
                    name: removeIllegalCharacters(o.name),
                    list: list,
                    position: index + 1,
                    productId: productId,
                    brand: o.brand,
                    category: o.category,
                    dimension1: o.dimension1,
                    dimension2: o.dimension2,
                    dimension5: o.dimension5.toLowerCase() == "true",
                    dimension7: o.dimension7,
                    metric3: o.dimension23.toFixed(2).toString(),
                    metric5: o.metric5.replace("$", ""),
                    price: o.price.toFixed(2).toString(),
                    location: window.location.href
                }

            })

            dataLayer.push({ event: 'productImpressions', ecommerce: { impressions: impressions } });
            if (phe.config.isGA4Enabled) {
                var list = 'Hawk Recs - ' + widgetName.toLowerCase().trim();
                var ga4items = [].slice.call(slider.querySelectorAll('a[data-impression],a[data-hawkimpression]')).map(function (link, index) {
                    var strImpression = link.getAttribute('data-impression') || link.getAttribute('data-hawkimpression');
                    strImpression = strImpression.replace(/: /ig, ":").replace(/, /ig, ",");
                    strImpression = strImpression.replace(/:,/ig, ":null,");
                    strImpression = strImpression.replace(/(\:\')([^:]*)(\')([^:]*)(\'[,}])/ig, "$1$2\\'$4$5");

                    var o = eval("(" + strImpression + ")");

                    var i2 = index + 1;
                    var productId = parseInt(link.getAttribute('data-productid'));
                    var category = o.category.split("/");
                    link.addEventListener("click", function () {
                        if (phe.config.isGA4Enabled) {
                            dataLayer.push({ ecommerceGA4: null });
                            var event = {
                                'event': 'select_item',
                                'ecommerceGA4': {
                                    'item_list_id': list,
                                    'item_list_name': list,
                                    'items': [{
                                        'item_name': removeIllegalCharacters(o.name),
                                        'item_id': o.id,
                                        'price': Number(o.dimension23),
                                        'discount': Number(o.price - o.dimension23),
                                        'item_brand': o.brand,
                                        'item_category': category[0] ? category[0] : "",
                                        'item_category2': category[1] ? category[1] : "",
                                        'item_category3': category[2] ? category[2] : "",
                                        'index': i2,
                                        'item_list_id': list,
                                        'item_list_name': list,
                                        'coupon': phe.customer.offerCode,
                                        'affiliation': phe.site.siteCode,
                                        'currency': "USD",
                                        'quantity': 1
                                    }]
                                },
                            };
                        }
                        dataLayer.push(event);
                    });
                    return {
                        item_name: removeIllegalCharacters(o.name),
                        item_id: o.id,
                        price: o.dimension23,
                        discount: o.price - o.dimension23,
                        item_brand: o.brand,
                        item_category: category[0] ? category[0] : "",
                        item_category2: category[1] ? category[1] : "",
                        item_category3: category[2] ? category[2] : "",
                        index: i2,
                        item_list_id: list,
                        item_list_name: list,
                        coupon: "",
                        affiliation: phe.site.siteCode,
                        currency: "USD",
                        quantity: 1
                    }



                })

                dataLayer.push({ ecommerceGA4: null });
                dataLayer.push({
                    event: 'view_item_list',
                    ecommerceGA4: {
                        item_list_id: list,
                        item_list_name: list,
                        items: ga4items
                    }
                })
            }

        } catch (e) {

            window.onerror(e.message, e.stack);
        }

    }
    function populateOriginWidgets(widgets, request) {

        request.widgets = [];

        [].slice.call(widgets).map(function (widget) {
            request.widgets.push({
                widgetGuid: widget.getAttribute('data-widgetguid'),
                templateName: widget.dataset.template,
                template: widget.querySelector('[template]') && widget.querySelector('[template]').innerHTML,
                templatecontentid: widget.dataset.templatecontentid,
                wishlisttemplatecontentid: widget.dataset.wishlisttemplatecontentid,
                itempricetemplatecontentid: widget.dataset.itempricetemplatecontentid,
                itemaddtocarttemplatecontentid: widget.dataset.itemaddtocarttemplatecontentid,
                usejcpprice: widget.dataset.usejcpprice,
                showwishlisticon: widget.dataset.showwishlisticon,
                loadseparately: widget.dataset.loadseparately || widget.hasAttribute('data-loadseparately'),
                wishlisted_skus: widget.hasAttribute('data-wishlisted_skus'),
                saveforlater_skus: widget.hasAttribute('data-saveforlater_skus'),
                itemsincart_skus: widget.hasAttribute('data-itemsincart_skus'),
            });
        });

        fetch('/product/getwidgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(request)
        })
            .then(function (res) { return res.text(); })
            .then(function (res) {
                var html = parseHTML(res);

                [].slice.call(widgets).map(function (widget) {
                    var htmlWidget = html.querySelector('[data-guid="' + widget.dataset.widgetguid + '"]');
                    if (htmlWidget) {
                        widget.appendChild(htmlWidget);
                        GATags(htmlWidget, htmlWidget.getAttribute('data-widgetname'));
                        replaceHawkRatingsAndUrlFix(widget, htmlWidget.getAttribute('data-widgetname'));

                        lazyloadImages(widget);
                        useNewGlider(htmlWidget);
                       
                        

                        if (widget.querySelector('.slider .frame')) {
                            var slider = addCarouseldataToInternalHawkRecs(widget, '.slider');
                            setupSlider(slider);
                            AutoHidePrevNextLory();
                        } else if (widget.querySelector('.glider')) {
                            var slider = addCarouseldataToInternalHawkRecs(widget, '.glider');
                           
                            setupGlider(slider);
                            AutoHidePrevNextGlider();
                        }
                    } else {
                        _.removeClass(widget, 'maintain-min-height');
                    }
                });

            })
    }
    function addCarouseldataToInternalHawkRecs(widget, classname) {
        var slider = widget.querySelector(classname);
        if (widget.dataset.carouseldata && slider) {
            var carouseldata = widget.dataset.carouseldata;
            carouseldata = carouseldata.replace(/: /ig, ":").replace(/, /ig, ",");
            carouseldata = carouseldata.replace(/:,/ig, ":null,");
            carouseldata = carouseldata.replace(/(\:\')([^:]*)(\')([^:]*)(\'[,}])/ig, "$1$2\\'$4$5");
            var carouseldata = eval("(" + carouseldata + ")");

            slider.sliderOptions = {
                autoRotate: carouseldata.autoRotate,
                slidesToShow: carouseldata.desktopSlidesToShow,
                slidesToScroll: carouseldata.desktopSlidesToScroll,
                slideSpeed: 750,
                autoRotateSpeed: 3000,
                responsiveConfig: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: carouseldata.desktopSlidesToShow,
                        slidesToScroll: carouseldata.desktopSlidesToScroll,
                        infinite: true,
                        arrows: carouseldata.desktopShowNextPrevButtons
                    }
                },
                {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: carouseldata.tabletSlidesToShow,
                        slidesToScroll: carouseldata.tabletSlidesToScroll,
                        arrows: carouseldata.desktopShowNextPrevButtons
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: carouseldata.mobileSlidesToShow,
                        slidesToScroll: carouseldata.mobileSlidesToScroll,
                        arrows: carouseldata.mobileShowNextPrevButtons
                    }
                },
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: carouseldata.mobileShowNextPrevButtons
                    }
                }],
            }
            if (slider.sliderOptions.responsiveConfig) {
                slider.sliderOptions.responsiveConfig.forEach(function (resp) {
                    resp.settings.infinite = resp.settings.slidesToScroll;
                    resp.settings.infinite = carouseldata.infinite ? resp.settings.slidesToScroll : false;
                });
            }
            if (classname === ".glider") {
                slider.sliderOptions.responsive = slider.sliderOptions.responsiveConfig;
            }
            _.addClass(slider, 'responsive-scroller');
        }
        return slider;
    }

    function populateBulkRecsWidgets(widgets, request) {
        request.ishawkBulkRequest = true;
        contextProperties = request.contextProperties;

        request.widgets = [];
        [].slice.call(widgets).map(function (widget) {
            request.widgets.push({
                widgetGuid: widget.getAttribute('data-widgetguid'),
                contextProperties: contextProperties,
                templateName: widget.dataset.template,
                template: widget.querySelector('[template]') && widget.querySelector('[template]').innerHTML,
                templatecontentid: widget.dataset.templatecontentid,
                itempricetemplatecontentid: widget.dataset.itempricetemplatecontentid,
                itemaddtocarttemplatecontentid: widget.dataset.itemaddtocarttemplatecontentid,
                usejcpprice: widget.dataset.usejcpprice,
                wishlisttemplatecontentid: widget.dataset.wishlisttemplatecontentid,
                showWishListIcon: widget.dataset.showwishlisticon,
                loadseparately: widget.dataset.loadseparately || widget.hasAttribute('data-loadseparately'),
                wishlisted_skus: widget.hasAttribute('data-wishlisted_skus'),
                saveforlater_skus: widget.hasAttribute('data-saveforlater_skus'),
                itemsincart_skus: widget.hasAttribute('data-itemsincart_skus'),
            });
        });
        request.widgetBatchSize = request.widgets.length;
        // request.contextProperties = null;

        fetch('/product/getwidgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(request)
        })
            .then(function (res) { return res.text(); })
            .then(function (res) {
                var html = parseHTML(res);

                [].slice.call(widgets).map(function (widget) {
                    var htmlWidget = html.querySelector('[data-guid="' + widget.dataset.widgetguid + '"]');
                    if (htmlWidget) {
                        replaceHawkRatingsAndUrlFix(htmlWidget, htmlWidget.getAttribute('data-widgetname'))
                        widget.appendChild(htmlWidget);
                        GATags(htmlWidget, htmlWidget.getAttribute('data-widgetname'));
                        lazyloadImages(widget);
                        useNewGlider(htmlWidget);
                        if (widget.querySelectorAll('.slide').length === 0) {
                            widget.closest('.tab-pane').classList.add('hide');
                            widget.closest('section.ae-more-products').querySelector('[data-bs-target="#' + widget.closest('.tab-pane').getAttribute('id') + '"]').classList.add('hide');
                        } else {
                            if (widget.querySelector('.slider .frame')) {
                                var slider = addCarouseldataToInternalHawkRecs(widget, '.slider');
                                window.setupSlider(slider);
                                AutoHidePrevNextLory();
                                [].slice.call(widget.closest('section.ae-more-products').querySelectorAll('.ae-tab.nav-item')).map(function (el) {
                                    el.addEventListener('click', function (e) {
                                        var interval = setInterval(function () {
                                            clearInterval(interval);
                                            window.setupSlider(widget.querySelector('.slider'));
                                            AutoHidePrevNextLory();
                                        }, 200);

                                    });
                                });
                            } else if (widget.querySelector('.glider')) {
                                var slider = addCarouseldataToInternalHawkRecs(widget, '.glider'); 
                                setupGlider(slider);
                                AutoHidePrevNextGlider();
                                [].slice.call(widget.closest('section.ae-more-products').querySelectorAll('.ae-tab.nav-item')).map(function (el) {
                                    el.addEventListener('click', function (e) {
                                        var interval = setInterval(function () {
                                            clearInterval(interval);
                                            var gl = setupGlider(widget.querySelector('.glider'));
                                            AutoHidePrevNextGlider();
                                            if (gl)
                                                gl.refresh(true);
                                        }, 200);

                                    });
                                });
                            }

                           

                        }
                    } else {
                        if (widget.querySelectorAll('.slide').length === 0) {
                            widget.closest('.tab-pane').classList.add('hide');
                            widget.closest('section.ae-more-products').querySelector('[data-bs-target="#' + widget.closest('.tab-pane').getAttribute('id') + '"]').classList.add('hide');
                        }
                        _.removeClass(widget, 'maintain-min-height');
                    }
                });

            })
    }

    function lazyloadImages(widget) {

        if (widget.hasAttribute('data-lazy-load-images')) {
            [].slice.call(widget.querySelectorAll('img')).map(function (img) {
                if (img.classList)
                    img.classList.remove('delayloadimg');
                if (img.hasAttribute('src')) {
                    var src = img.getAttribute('src');
                    img.removeAttribute('src');
                    img.setAttribute('data-src', src);

                    if (!img.closest('picture') && phe.config.WebP_Picture) {
                        var picture = document.createElement('picture');
                        img.parentElement.appendChild(picture);
                        var source = document.createElement('source');
                        picture.appendChild(source);
                        source.setAttribute('data-srcset', src.replace('jpg', 'webp'));
                        source.setAttribute('type', 'image/webp');
                        picture.appendChild(img);
                    }
                }
            });
            delayLoadImages(widget.querySelectorAll('img[data-src]'));
        }
    }

    function replaceHawkRatingsAndUrlFix(el, cmCategoryName) {
        var ratings = el.querySelectorAll('.replace-hawk-rating');
        [].slice.call(ratings).map(function (rating) {
            var value = parseFloat(rating.getAttribute('data-value'));
            var wholeStars = Math.trunc(value);
            var emptyStars = 0;
            var reviewCount = parseInt(rating.getAttribute('data-reviewcount'));
            var newElement = document.createElement('div');
            newElement.classList.add('ae-star-rating__stars');


            var reviewElement = document.createElement('span');
            reviewElement.classList.add('ratingStars');
            newElement.appendChild(reviewElement);
            if (!(value > 0)) {
                reviewElement.classList.add('hide');
            }

            var parts = value % 1;
            var partialClass = '';

            if (parts >= 0.125 && parts <= 0.375) {
                partialClass = "ratingStar-25";
            } else if (parts >= 0.375 && parts <= 0.625) {
                partialClass = "ratingStar-50";
            } else if (parts >= 0.625 && parts <= 0.875) {
                partialClass = "ratingStar-75";
            } else if (parts >= 0.875 && parts <= 1) {
                partialClass = "ratingStar-100";
            }
            for (var i = 1; i <= wholeStars; i++) {
                reviewElement.innerHTML += '<span class="ratingStar-100"></span>';
            }
            if (partialClass.length > 0)
                reviewElement.innerHTML += '<span class="' + partialClass + '"></span>';

            emptyStars = 5 - (wholeStars + (partialClass.length > 0 ? 1 : 0));
            for (var i = 0; i < emptyStars; i++) {
                reviewElement.innerHTML += '<span class="ratingStar-0"></span>';
            }
            if (reviewCount > 0) {
                var newEle = document.createElement('span');
                newEle.classList.add('ae-star-rating__text');
                newEle.innerHTML += '(' + reviewCount + ')';
                newElement.appendChild(newEle);
            }
            var newEle1 = document.createElement('span');
            newEle1.classList.add('ae-star-rating__tex');
            newEle1.classList.add('visually-hidden');
            newElement.appendChild(newEle1);

            rating.parentElement.replaceChild(newElement, rating);
        });

        // clean up the product URLs
        [].slice.call(el.querySelectorAll('a')).map(function (link) {
            var url = new URL(link.href);
            url.protocol = 'https';
            url.hostname = location.hostname;
            url.pathname = url.pathname.replace('//', '/');

            if (typeof cmCategoryName !== typeof undefined && cmCategoryName !== null && cmCategoryName.length > 0) {
                link.href = url.href;
                link.setAttribute('data-productid', link.getAttribute('data-unique-id'));
                if (!link.hasAttribute('data-dynamicproducttype'))
                    link.setAttribute('data-dynamicproducttype', cmCategoryName);

            } else {
                link.href = url.href;
            }
            if (link.getAttribute('data-impression')) {
                link.setAttribute('data-hawkimpression', link.getAttribute('data-impression'));
                link.removeAttribute('data-impression');
            }
            if (link.classList.contains('quickview-opener-link')) {
                link.href = 'javascript:void(0)';
                link.removeAttribute('data-href');
                link.setAttribute('manual_cm_re', cmCategoryName.split(' ').join('+') + "-_-control-_-" + (link.getAttribute('data-productname') && link.getAttribute('data-productname').split(' ').join('+')));
            }
        });

        // clean up the data-wishlisticon
        [].slice.call(el.querySelectorAll('[data-wishlisticon]')).map(function (item) {
            if (item.getAttribute('data-cartitemid') && parseInt(item.getAttribute('data-cartitemid')) && item.querySelector('.wishlist-icon')) {
                item.querySelector('.wishlist-icon').classList.add('wishlist-full')
            }
        });

        // clean up the template data
        if (el.closest('.hawk-recommendation'))
            [].slice.call(el.closest('.hawk-recommendation').querySelectorAll('[template]')).map(function (item) {
                if (item) {
                    item.remove();
                }
            });
    }

    var request = {
        "visitId": getCookie('hawk_visit_id'),
        "visitorId": getCookie('hawk_visitor_id'),
        "clientGuid": phe.config.hawkSearchConversionTrackingId,
        widgetUids: [],
        customProperties: {

        },
        landingPageUrl: '',
        renderHTML: true
    }

    if (phe.page.pageType === 'Product') {
        request.contextProperties = {
            uniqueid: document.querySelector('#product-id').value
        }
        if (phe.config.enableHawkRecAdditionalData) {
            request.contextProperties["sku"] = document.querySelector('#product-sku').value;
            request.contextProperties["primarycatid"] = document.querySelector('#product-primary-category-id-hawk-recommendation').value;
            request.contextProperties["primarycat"] = document.querySelector('#product-primary-category-hawk-recommendation').value;
            request.contextProperties["primarycatname"] = document.querySelector('#product-primary-category-hawk-recommendation').value;
            request.contextProperties["maxdiscountpercent"] = document.querySelector('#product-maxdiscountpercent').value + ",100";
        }
        if (typeof refinements !== 'undefined')
            refinements.forEach(function (x) {
                var name = x.QueryStringName;

                if (!request.contextProperties[name]) {
                    var filtered = refinements.filter(function (r) {
                        return r.QueryStringName === name;
                    });

                    var values = [];

                    filtered.forEach(function (r) {
                        values.push(r.Value);
                    })

                    request.contextProperties[name] = values.join('||'); // values[values.length - 1].Value;
                }
            })
    }
    if (phe.page.pageType === 'Category' || phe.page.pageType === 'CategoryHome') {
        request.contextProperties = {
            category_id: document.querySelector('#category-id').value,
            category_name: document.querySelector('#category-name').value
        }
    }
    if (phe.page.pageType === 'Search' && typeof dataLayer !== 'undefined') {
        request.contextProperties = {
            keyword: dataLayer[0].SearchTerm
        }
    }

    if (phe.page.pageType === 'ShoppingCart' && typeof dataLayer !== 'undefined' && dataLayer[0].ecommerce) {
        var carted = dataLayer[0].ecommerce.checkout.products;
        var passThem = '';

        for (var i = 0; i < carted.length; i++) {
            passThem += carted[i].productId + ',';
        }

        request.contextProperties = {
            uniqueidlist: passThem.slice(0, -1)
        }
    }
    if (phe.page.pageType === 'Wishlist') {
        request.contextProperties = {
            uniqueid: document.querySelector('#recentlyaddedwishlistitemproductid').value
        }
    }
    if (phe.page.pageType === 'TrackPackage') {
        request.contextProperties = {
            uniqueid: document.querySelector('#product-id').value
        }
    }

    request.contextProperties = request.contextProperties || {};
    if (phe.hawkVisitorTargets.redirect.length > 0) {
        request.contextProperties["redirect"] = phe.hawkVisitorTargets.redirect;
    }
    if (phe.config.enableHawkRecAdditionalData) {
        if (phe.customer.orderSourceCode && phe.customer.orderSourceCode.length > 0) {
            request.contextProperties["hawksrcode"] = phe.customer.orderSourceCode;
        }
        if (phe.customer.sourceChannel && phe.customer.sourceChannel.length > 0) {
            request.contextProperties["hawksrchnl"] = phe.customer.sourceChannel;
        }
        if (phe.hawkVisitorTargets.affiliatecode && phe.hawkVisitorTargets.affiliatecode.length > 0) {
            request.contextProperties["hawkaflcode"] = phe.hawkVisitorTargets.affiliatecode;
        }
        if (phe.hawkVisitorTargets.firsttimecustomer && phe.hawkVisitorTargets.firsttimecustomer.length > 0) {
            request.contextProperties["hawkfirsttimecust"] = phe.hawkVisitorTargets.firsttimecustomer;
        }
        if (phe.hawkVisitorTargets.emailonfile && phe.hawkVisitorTargets.emailonfile.length > 0) {
            request.contextProperties["hawkemlonfile"] = phe.hawkVisitorTargets.emailonfile;
        }
        if (phe.hawkVisitorTargets.isauthenticated && phe.hawkVisitorTargets.isauthenticated.length > 0) {
            request.contextProperties["hawkisauth"] = phe.hawkVisitorTargets.isauthenticated;
        }
        if (phe.customer.offerCode && phe.customer.offerCode.length > 0) {
            request.contextProperties["hawkofrcode"] = phe.customer.offerCode;
        }
        if (window.location.pathname.lastIndexOf("/") < window.location.pathname.length) {
            request.contextProperties["hawkurlseg"] = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
        }
        if (phe.customer.deviceType && phe.customer.deviceType.length > 0) {
            request.contextProperties["hawkcustom"] = phe.customer.deviceType;
        }
        if (phe.customer.countryCode && phe.customer.countryCode.length > 0) {
            request.contextProperties["countrycode"] = phe.customer.countryCode;
        }

        if (phe.site.siteCode && phe.site.siteCode.length > 0) {
            request.contextProperties["sitecode"] = phe.site.siteCode;
        }
    }



    var widgets = document.querySelectorAll('.hawk-recommendation:not([data-loadseparately]):not([data-origin]):not([data-hawk-bulk])');
    var originWidgets = document.querySelectorAll('.hawk-recommendation[data-origin]:not([data-hawk-bulk])');
    var originBulkWidgets = document.querySelectorAll('.hawk-recommendation[data-hawk-bulk]');

    if (originWidgets.length > 0) {
        populateOriginWidgets(originWidgets, JSON.parse(JSON.stringify(request)));
    }
    if (originBulkWidgets.length > 0) {
        populateBulkRecsWidgets(originBulkWidgets, JSON.parse(JSON.stringify(request)));
    }
    var separates = document.querySelectorAll('.hawk-recommendation[data-loadseparately]:not([data-origin]):not([data-hawk-bulk])');
    if (widgets.length + separates.length < 1) {
        return;
    }

    var wishlisted_skus = false;
    var saveforlater_skus = false;
    var itemsincart_skus = false;
    [].slice.call(document.querySelectorAll('.hawk-recommendation:not([data-origin]):not([data-hawk-bulk])')).map(function (widget) {
        wishlisted_skus = wishlisted_skus || widget.hasAttribute('data-wishlisted_skus');
        saveforlater_skus = saveforlater_skus || widget.hasAttribute('data-saveforlater_skus');
        itemsincart_skus = itemsincart_skus || widget.hasAttribute('data-itemsincart_skus');
    });

    var widgetGroups = [];
    var currentGroup = [];

    if (widgets.length > 0) {

        [].slice.call(widgets).map(function (x) {
            currentGroup.push({
                widgetGuid: x.getAttribute('data-widgetguid')
            });
        })
        widgetGroups.push(currentGroup);
    }
    if (separates.length > 0) {

        [].slice.call(separates).map(function (x) {
            widgetGroups.push([{
                widgetGuid: x.getAttribute('data-widgetguid')
            }]);
        })
    }

    if (wishlisted_skus || saveforlater_skus || itemsincart_skus) {

        var data = JSON.stringify({
            wishlisted_skus: wishlisted_skus,
            saveforlater_skus: saveforlater_skus,
            itemsincart_skus: itemsincart_skus
        });

        fetch('/product/getwishlistandcartskusforhawkrecs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'RequestVerificationToken': phe.config.antiForgeryToken
            },
            body: data
        }).then(function (res) { return res.json(); })
            .then(function (res) {

                if (wishlisted_skus) {
                    request.contextProperties["wishlisted_skus"] = res.wishlisted_skus;
                }
                if (saveforlater_skus) {
                    request.contextProperties["saveforlater_skus"] = res.saveforlater_skus;
                }
                if (itemsincart_skus) {
                    request.contextProperties["itemsincart_skus"] = res.itemsincart_skus;
                }
                hawkRecsApi(request, widgetGroups);
            });

    } else {
        hawkRecsApi(request, widgetGroups);
    }





    function hawkRecsApi(request, widgetGroups) {
        widgetGroups.forEach(function (wg) {

            var xhr = new XMLHttpRequest();
            request.widgetUids = wg;
            xhr.addEventListener('load', function () {
                var parsed = JSON.parse(xhr.response);

                if (!parsed.widgetItems) {
                    return;
                }

                parsed.widgetItems.forEach(function (x) {
                    var el = document.querySelector('.hawk-recommendation[data-widgetguid="' + x.widgetGuid + '"]');
                    var html = parseHTML(x.html);

                    if (html.querySelectorAll(".slides .slide").length == 0) {
                        el.removeAttribute('style');
                        return;
                    }

                    el.innerHTML = html.body.innerHTML; // x.html;

                    var cmCategoryName = x.widgetName || '';
                    // replace the ratings
                    replaceHawkRatingsAndUrlFix(el, cmCategoryName);

                    var sliders = el.querySelectorAll('.hawk-recommendation .scroller, .hawk-recommendation-list.slider');

                    [].slice.call(sliders).map(function (slider) {
                        var item = x;
                        var showDots = x.carouselData.showDots;
                        var config = x.carouselData.responseiveConfig && eval('(' + x.carouselData.responseiveConfig + ')');
                        slider.classList.add('responsive-scroller');
                        slider.setAttribute('data-request-id', parsed.requestId);
                        slider.setAttribute('data-widget-guid', x.widgetGuid);

                        var slides = slider.querySelectorAll('.slide');

                        if (!slides.length) {
                            return;
                        }

                        [].slice.call(slides).map(function (slide, index) {
                            slide.querySelector('a').setAttribute('data-index', index + 1);
                        });

                        slider.sliderOptions = {
                            autoRotate: x.carouselData.autoRotate,
                            autoRotateSpeed: x.carouselData.autoRotateSpeed,
                            slideSpeed: x.carouselData.animationSpeed,
                            slidesToShow: x.carouselData.nofVisible,
                            slidesToScroll: x.carouselData.scrollNumber,
                            responsiveConfig: config,
                        }
                        if (slider.sliderOptions.responsiveConfig) {
                            slider.sliderOptions.responsiveConfig.forEach(function (resp) {
                                resp.settings.infinite = resp.settings.slidesToScroll;
                                resp.settings.infinite = x.carouselData.isCircular ? resp.settings.slidesToScroll : false;
                            });
                        }

                        setupSlider(slider);
                        AutoHidePrevNextLory();
                    });
                    lazyloadImages(el);
                    populateItemTypeForLegacyHawkThenCallGATags(el, cmCategoryName);

                })
            })

            xhr.open('POST', phe.urls.hawkSearchRecommenderUrl + '/api/recommendation/v2/getwidgetitems');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(request));
        });
    }
});

;

_.ready(function setUpMoreLessSection() {
    [].slice.call(document.querySelectorAll('#more-less-section')).map(function (text) {
        text.addEventListener('click', function (ele) {
            
            var copy = ele.target.closest('#more-less-section');
            if (copy && ele.target.nodeName !== 'A' && !ele.target.hasAttribute('href')) {
                copy.querySelector('.more-less-text').classList.toggle('expanded');
                copy.querySelector('.show-more-toggle').classList.toggle('hidden');
                copy.querySelector('.show-less-toggle').classList.toggle('hidden');
            }
        });
    });
    var firstParagraph = document.querySelectorAll('.more-less-text p')[0];
    var lineHeight = 22;
    var topMargin = 0;
    if (firstParagraph && document.getElementById('more-less-section') && document.getElementById('more-less-section').getAttribute("isexpandedbydefault") !== true) {

        lineHeight = parseInt(getComputedStyle(firstParagraph).lineHeight.replace("px", ""));
        topMargin = parseInt(getComputedStyle(firstParagraph).marginTop.replace("px", ""));

        var seoLines = phe.config.seoLines ? phe.config.seoLines : 3;
        var seoText = document.querySelector('.more-less-text');

        if (seoText) {
            seoText.style.maxHeight = (lineHeight * seoLines + topMargin).toString() + "px";
        }

    }
});
;
/*!
 * Credit to  https://github.com/apvarun/toastify-js
removed none used code.
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.Toastify = factory();
    }
})(this, function (global) {
    // Object initialization
    var Toastify = function (options) {
        // Returning a new init object
        return new Toastify.lib.init(options);
    },
        // Library version
        version = "1.0.0";

    // Defining the prototype of the object
    Toastify.lib = Toastify.prototype = {
        toastify: version,
        constructor: Toastify,

        // Initializing the object with required parameters
        init: function (options) {
            // Verifying and validating the input object
            if (!options) {
                options = {};
            }

            // Creating the options object
            this.options = {};

            this.toastElement = null;

            // Validating the options
            this.options.text = options.text || "Hi there!"; // Display message
            this.options.duration = options.duration === 0 ? 0 : options.duration || 3000; // Display duration
            this.options.selector = options.selector; // selector
            this.options.backgroundColor = options.backgroundColor; // toast background color
            this.options.className = options.className || ""; // additional class names for the toast
            this.options.containerNode = options.containerNode;
            this.options.displayInRight = options.displayInRight || false;
            // Returning the current object for chaining functions
            return this;
        },

        // Building the DOM element
        buildToast: function () {
            // Validating if the options are defined
            if (!this.options) {
                throw "Toastify is not initialized";
            }

            // Creating the DOM object
            var divElement = document.createElement("div");
            divElement.className = "toastify on " + this.options.className;

            if (this.options.backgroundColor) {
                divElement.style.background = this.options.backgroundColor;
            }
            if (this.options.displayInRight) {
                divElement.className += " right";
                //divElement.style.right = "5px";
                divElement.style.padding = "5px";
            }
            // Adding the toast message/node
            divElement.innerHTML = this.options.text;
            // Returning the generated element
            return divElement;
        },

        // Displaying the toast
        showToast: function () {
            // Creating the DOM object for the toast
            this.toastElement = this.buildToast();

            // Getting the root element to with the toast needs to be added
            var rootElement;
            if (this.options.containerNode) {

                //var temp = [].slice.call(document.querySelectorAll(this.options.selector + ':not([hidden])'))
                //    .filter(s =>
                //        window.getComputedStyle(s).getPropertyValue('display') != 'none'
                //    );

                rootElement = this.options.containerNode;
            }
            else if (typeof this.options.selectorId === "undefined") {
                rootElement = document.body;
            } else {
                rootElement = document.querySelector(this.options.selectorId);
            }

            // Validating if root element is present in DOM
            if (!rootElement) {
                throw "Root element is not defined";
            }
            // Adding the DOM element
            rootElement.insertBefore(this.toastElement, rootElement.firstChild);
          
            if (this.options.duration > 0) {
                this.toastElement.timeOutValue = window.setTimeout(
                    function () {
                        // Remove the toast from DOM
                        this.removeElement(this.toastElement);
                    }.bind(this),
                    this.options.duration
                ); // Binding `this` for function invocation
            }

            // Supporting function chaining
            return this;
        },

        hideToast: function () {
            if (this.toastElement.timeOutValue) {
                clearTimeout(this.toastElement.timeOutValue);
            }
            this.removeElement(this.toastElement);
        },

        // Removing the element from the DOM
        removeElement: function (toastElement) {
            // Hiding the element
            // toastElement.classList.remove("on");
            toastElement.className = toastElement.className.replace(" on", "");
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        },
    };

    // Setting up the prototype for the init object
    Toastify.lib.init.prototype = Toastify.lib;

    // Returning the Toastify function to be assigned to the window object/module
    return Toastify;
});
;

window.wishlistHandler = window.wishlistHandler || (function () {
   
    return {
        init: function () {
            setupWishlistHandler();
            if (phe.page.pageType === 'Product') {
                productPage_Swatch_Handler();
            }
            Wishlist_Update_Callback();
        },
        addWishlistByAjax: addWishlistByAjax,
        updateWishlistFromQV: updateWishlistFromQV
    };

    function setupWishlistHandler() {
        document.addEventListener('click', function (event) {
            var el = event.target.closest('[data-wishlisticon="true"]');
            if (!el)
                return;

            var productid = el.getAttribute('data-productid');
            var variantid = parseInt(el.getAttribute('data-variantid') || 0);
            if (!productid || !(parseInt(productid) > 0))
                return;

            event.stopPropagation();
            var sku = el.getAttribute('data-sku') || '';
            var cartitemid = el.getAttribute('data-cartitemid') || '0';
            var itemtype = el.getAttribute('data-itemtype') ||  9 ;
            var qty = _.hasClass(el.querySelector('.wishlist-icon'), 'wishlist-full') ? 0 : 1;
            [].slice.call(document.querySelectorAll('[data-wishlisticon="true"][data-productid="' + productid + '"][data-variantid="' + variantid + '"]')).map(function (e) {
                e.querySelector('.wishlist-icon').classList.toggle('wishlist-full');
               
               if (qty == 0) {
                   e.setAttribute('title', 'Add to Wishlist');
                   e.setAttribute('aria-label', 'Add to Wishlist');
               } else {
                   e.setAttribute('title', 'Remove from Wishlist');
                   e.setAttribute('aria-label', 'Remove from Wishlist');
               }
            });

            addWishlistByAjax(productid, variantid, cartitemid, itemtype, el);
            event.stopPropagation();
            if (qty === 1) {
                console.log("wishlist 1");
                ga_trackEvent("Add to Wishlist", 0, "Wishlist", sku);
                if (phe.config.isGA4Enabled) {
                    var viewItemAttribute = el.getAttribute('data-viewitem');

                    console.log(viewItemAttribute);
                    if (viewItemAttribute && viewItemAttribute != "null") {

                        var viewItem = JSON.parse(viewItemAttribute);
                        var event = {
                                'event': 'add_to_wishlist',
                                'ecommerceGA4': {
                                    'currency': "USD",
                                    "value": Number(viewItem.items[0].price),
                                    'items': viewItem.items
                                },
                            };

                        console.log("wishlist 2");
                        dataLayer.push({ ecommerceGA4: null });
                        dataLayer.push(event);
                    }
                }
            }
                
            return true;
        });
    }
    function addWishlistByAjax(productid, variantid, cartitemid, itemtype, node, callback) {
        _.ajax('/cart/addremovetowishlist', 'POST', {
            cartitemid: cartitemid,
            productid: parseInt(productid),
            variantid: variantid,
            specialItemType: parseInt(itemtype),
            qty: parseInt(cartitemid) > 0 ? 0 : 1
        }, function (res) {
            if (res.success) {
                [].slice.call(document.querySelectorAll('button[data-wishlisticon="true"][data-productid="' + productid + '"][data-variantid="' + variantid + '"]')).map(function (e) {
                    e.setAttribute('data-cartitemid', res.cartItemID);
                });
                window.WishlistItems = window.WishlistItems || [];
                window.WishlistItems.items = res.wishlistItems
                document.dispatchEvent(new CustomEvent('wishlist.updated', {
                    detail: {
                        wishlistItems: window.WishlistItems,
                        pageType: phe.page.pageType
                    }
                }));
                var pid = (document.querySelector('#product-id') && document.querySelector('#product-id').value && parseInt(document.querySelector('#product-id').value)) || 0;
                if (phe.page.pageType === 'Product' && pid === parseInt(productid))
                    document.dispatchEvent(new CustomEvent('variant.selected', {
                        detail: {
                            variantId: variantid,
                            context: document
                        }
                    }));

                Toastify && node && Toastify({
                    text: res.successMessage,
                    duration: phe.config.wishlistCalloutBoxTimeOutInMilliSeconds,
                    // selector: '[data-wishlisticon="true"][data-productid="' + productid + '"][data-variantid="' + variantid + '"]',
                    containerNode: _.hasClass(node, 'ae-favourite') ? node: node.parentNode && node.parentNode.parentNode,
                    className: parseInt(cartitemid) > 1 ? "removed" : "added",
                    backgroundColor: 'FFFFFF',
                    displayInRight: node.hasAttribute('displayInRight') ? true : false
                }).showToast();
                if (typeof callback !== "undefined") {
                    callback({
                        cartItemId: res.cartItemID,
                        productId: parseInt(productid),
                        variantId: variantid,
                    });
                }
            }
            else if (res.wishListAccountRequired && res.redirectUrl != null && res.redirectUrl.length > 0) {
                Toastify && node && Toastify({
                    text: "Please do login to add item in your list",
                    duration: phe.config.wishlistCalloutBoxTimeOutInMilliSeconds,
                    containerNode: node.parentNode,
                    backgroundColor: 'FFFFFF',
                }).showToast();
                window.location.href = res.redirectUrl
            }
        }, function (res) { }, 'application/x-www-form-urlencoded');
    }
    function updateWishlistFromQV(productid, variantid, cartitemid, itemtype) {
        Toastify && Toastify({
            text: "Successfully updated!",
            duration: phe.config.wishlistCalloutBoxTimeOutInMilliSeconds,
            displayInRight: true
           // backgroundColor: 'FFFFFF',
        }).showToast();
        //remove existing item by cartitemid
        addWishlistByAjax(productid, variantid, cartitemid, itemtype, null, function callbackHandler(data) {
            //add new wishlist item
            addWishlistByAjax(productid, variantid, 0, itemtype, null, function callbackHandler(data) {
                window.location.reload();
            });
        });
    }

    function productPage_Swatch_Handler() {
        //update wishlist selection based on seleted variant
        document.addEventListener('variant.selected', function (event) {
            var pid = (document.querySelector('#product-id') && document.querySelector('#product-id').value && parseInt(document.querySelector('#product-id').value)) || 0;
            if (window.WishlistItems && pid > 0 && phe.page.pageType === 'Product') {
                [].slice.call(document.querySelectorAll('[data-wishlisticon="true"][data-productid="' + pid + '"]')).map(function (e) {

                    e.setAttribute('data-variantid', event.detail.variantId);
                    e.setAttribute('data-itemtype', 9);
                    var wItem = window.WishlistItems.items.find(function (x) {
                        return x.ProductId == pid && x.CartItemId > 0;
                    });
                   
                    if (wItem) { // user has in wishlist
                        _.addClass(e.querySelector('.wishlist-icon'), 'wishlist-full');
                        e.setAttribute('title', 'Remove from Wishlist');
                        e.setAttribute('aria-label', 'Remove from Wishlist');
                        e.setAttribute('data-cartitemid', wItem.CartItemId);
                        if (e.querySelector('.wishlistText')) {
                            e.querySelector('.wishlistText').setAttribute('title', 'Remove from Wishlist');
                            e.querySelector('.wishlistText').setAttribute('aria-label', 'Remove from Wishlist');
                            e.querySelector('.wishlistText').innerHTML = 'Remove from Wishlist';
                        }
                    } else {
                        _.removeClass(e.querySelector('.wishlist-icon'), 'wishlist-full');
                        e.setAttribute('title', 'Add to Wishlist');
                        e.setAttribute('aria-label', 'Add to Wishlist');
                        e.setAttribute('data-cartitemid', 0);
                        if (e.querySelector('.wishlistText')) {
                            e.querySelector('.wishlistText').setAttribute('title', 'Add to Wishlist');
                            e.querySelector('.wishlistText').setAttribute('aria-label', 'Add to Wishlist');
                            e.querySelector('.wishlistText').innerHTML = 'Add to Wishlist';
                        }
                    }
                });
            }
        });
    }
    function Wishlist_Update_Callback() {
        //update wishlist selection based on seleted variant
        document.addEventListener('wishlist.updated', function (event) {
            var headerIcon = document.querySelector('header .wishlist-icon');
            
            if (headerIcon && event.detail.wishlistItems && event.detail.wishlistItems.items.length > 0) {
                headerIcon.classList.add('wishlist-full')
            } else if (headerIcon && event.detail.wishlistItems && event.detail.wishlistItems.items.length === 0) {
                headerIcon.classList.remove('wishlist-full')
            }

        });
    }
})();

_.ready(window.wishlistHandler.init);


;
; var zetaGlobal = (function () {

    function getMetaContentByName(name, content) {
        var content = (content == null) ? 'content' : content;
        return document.querySelector("meta[property='" + name + "']") && document.querySelector("meta[property='" + name + "']").getAttribute(content);
    }
    function viewedEvent() {
      
        if (phe.zetaGlobal && phe.zetaGlobal.isEnable && phe.zetaGlobal.enableProductViewedEvent && phe.page.pageType === "Product") {
            var intervalCount = 0;
            var intervalId = setInterval(function () {
                intervalCount++;
                if (intervalCount > 10) {
                    clearInterval(intervalId);
                }
                if (typeof bt !== "undefined") {
                    clearInterval(intervalId);
                  
                    bt('track', 'viewed', {
                        'id': document.querySelector("#product-sku") ? document.querySelector("#product-sku").getAttribute('value') : getMetaContentByName('og:url'),
                        'title': getMetaContentByName('og:title'),
                        'url': getMetaContentByName('og:url') != null && getMetaContentByName('og:url').len > 0 ? getMetaContentByName('og:url') : document.URL,
                        'type': getMetaContentByName('og:type'), //"viewed"
                        'description': getMetaContentByName('og:description'),
                        'sku': document.querySelector("#product-sku").getAttribute('value')
                    });
                }
                
            }, 300);
        }
    }

    function browseRecovery(email) {
      
        if (phe.zetaGlobal.isEnable && phe.zetaGlobal.enableBrowseRecovery && typeof bt !== "undefined" && email) {
            var personData = {
                email: email
            };
            bt('updateUser', personData);
          
            var now = new Date();
            now.setTime(now.getTime() - 1000 * 3600);
            document.cookie = 'zeta_br=;secure;path=/;expires=' + now.toGMTString();
        }
    }

    return {
        init: function () {
            viewedEvent();
        },
        browseRecovery: browseRecovery
    }
})();
window.zetaGlobal = zetaGlobal || {};
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    window.zetaGlobal.init();
} else {
    document.addEventListener('DOMContentLoaded', window.zetaGlobal.init);
};

document.addEventListener('DOMContentLoaded', function () {
    [].slice.call(document.querySelectorAll('.ae-more-products .ae-tabs--links .ae-tab')).map(function (x) {

        x.addEventListener('click', function (event) {

            var btn = event.target.closest('.ae-tab');
            if (btn && !btn.classList.contains('active')) {

                [].slice.call(event.target.closest('.ae-tabs--links').querySelectorAll('.ae-tab')).map(function (x) {
                    x.classList.remove('active');
                });
                event.target.closest('.ae-tab').classList.add('active');
                var targetId = btn.getAttribute("data-bs-target").replace("#", '');

                //tab
                [].slice.call(event.target.closest('.ae-more-products').querySelector('.tab-content').querySelectorAll('.tab-pane')).map(function (x) {
                    x.classList.remove('active');
                    x.classList.remove('show');

                    if (x.id == targetId) {
                        x.classList.add('active');
                        x.classList.add('show');
                    }
                });

            }
        });
    });
});
;
