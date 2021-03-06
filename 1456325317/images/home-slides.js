/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function(jQuery) {
    function sc_setScroll(a, b, c) {
        return "transition" == c.transition && "swing" == b && (b = "ease"),
        {
            anims: [],
            duration: a,
            orgDuration: a,
            easing: b,
            startTime: getTime()
        }
    }
    function sc_startScroll(a, b) {
        for (var c = 0,
        d = a.anims.length; d > c; c++) {
            var e = a.anims[c];
            e && e[0][b.transition](e[1], a.duration, a.easing, e[2])
        }
    }
    function sc_stopScroll(a, b) {
        is_boolean(b) || (b = !0),
        is_object(a.pre) && sc_stopScroll(a.pre, b);
        for (var c = 0,
        d = a.anims.length; d > c; c++) {
            var e = a.anims[c];
            e[0].stop(!0),
            b && (e[0].css(e[1]), is_function(e[2]) && e[2]())
        }
        is_object(a.post) && sc_stopScroll(a.post, b)
    }
    function sc_afterScroll(a, b, c) {
        switch (b && b.remove(), c.fx) {
        case "fade":
        case "crossfade":
        case "cover-fade":
        case "uncover-fade":
            a.css("opacity", 1),
            a.css("filter", "")
        }
    }
    function sc_fireCallbacks(a, b, c, d, e) {
        if (b[c] && b[c].call(a, d), e[c].length) for (var f = 0,
        g = e[c].length; g > f; f++) e[c][f].call(a, d);
        return []
    }
    function sc_fireQueue(a, b, c) {
        return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()),
        b
    }
    function sc_hideHiddenItems(a) {
        a.each(function() {
            var a = jQuery(this);
            a.data("_cfs_isHidden", a.is(":hidden")).hide()
        })
    }
    function sc_showHiddenItems(a) {
        a && a.each(function() {
            var a = jQuery(this);
            a.data("_cfs_isHidden") || a.show()
        })
    }
    function sc_clearTimers(a) {
        return a.auto && clearTimeout(a.auto),
        a.progress && clearInterval(a.progress),
        a
    }
    function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
        return {
            width: g.width,
            height: g.height,
            items: {
                old: a,
                skipped: b,
                visible: c
            },
            scroll: {
                items: d,
                direction: e,
                duration: f
            }
        }
    }
    function sc_getDuration(a, b, c, d) {
        var e = a.duration;
        return "none" == a.fx ? 0 : ("auto" == e ? e = b.scroll.duration / b.scroll.items * c: 10 > e && (e = d / e), 1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e)))
    }
    function nv_showNavi(a, b, c) {
        var d = is_number(a.items.minimum) ? a.items.minimum: a.items.visible + 1;
        if ("show" == b || "hide" == b) var e = b;
        else if (d > b) {
            debug(c, "Not enough items (" + b + " total, " + d + " needed): Hiding navigation.");
            var e = "hide"
        } else var e = "show";
        var f = "show" == e ? "removeClass": "addClass",
        g = cf_c("hidden", c);
        a.auto.button && a.auto.button[e]()[f](g),
        a.prev.button && a.prev.button[e]()[f](g),
        a.next.button && a.next.button[e]()[f](g),
        a.pagination.container && a.pagination.container[e]()[f](g)
    }
    function nv_enableNavi(a, b, c) {
        if (!a.circular && !a.infinite) {
            var d = "removeClass" == b || "addClass" == b ? b: !1,
            e = cf_c("disabled", c);
            if (a.auto.button && d && a.auto.button[d](e), a.prev.button) {
                var f = d || 0 == b ? "addClass": "removeClass";
                a.prev.button[f](e)
            }
            if (a.next.button) {
                var f = d || b == a.items.visible ? "addClass": "removeClass";
                a.next.button[f](e)
            }
        }
    }
    function go_getObject(a, b) {
        return is_function(b) ? b = b.call(a) : is_undefined(b) && (b = {}),
        b
    }
    function go_getItemsObject(a, b) {
        return b = go_getObject(a, b),
        is_number(b) ? b = {
            visible: b
        }: "variable" == b ? b = {
            visible: b,
            width: b,
            height: b
        }: is_object(b) || (b = {}),
        b
    }
    function go_getScrollObject(a, b) {
        return b = go_getObject(a, b),
        is_number(b) ? b = 50 >= b ? {
            items: b
        }: {
            duration: b
        }: is_string(b) ? b = {
            easing: b
        }: is_object(b) || (b = {}),
        b
    }
    function go_getNaviObject(a, b) {
        if (b = go_getObject(a, b), is_string(b)) {
            var c = cf_getKeyCode(b);
            b = -1 == c ? jQuery(b) : c
        }
        return b
    }
    function go_getAutoObject(a, b) {
        return b = go_getNaviObject(a, b),
        is_jquery(b) ? b = {
            button: b
        }: is_boolean(b) ? b = {
            play: b
        }: is_number(b) && (b = {
            timeoutDuration: b
        }),
        b.progress && (is_string(b.progress) || is_jquery(b.progress)) && (b.progress = {
            bar: b.progress
        }),
        b
    }
    function go_complementAutoObject(a, b) {
        return is_function(b.button) && (b.button = b.button.call(a)),
        is_string(b.button) && (b.button = jQuery(b.button)),
        is_boolean(b.play) || (b.play = !0),
        is_number(b.delay) || (b.delay = 0),
        is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0),
        is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0),
        is_number(b.timeoutDuration) || (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration),
        b.progress && (is_function(b.progress.bar) && (b.progress.bar = b.progress.bar.call(a)), is_string(b.progress.bar) && (b.progress.bar = jQuery(b.progress.bar)), b.progress.bar ? (is_function(b.progress.updater) || (b.progress.updater = jQuery.fn.carouFredSel.progressbarUpdater), is_number(b.progress.interval) || (b.progress.interval = 50)) : b.progress = !1),
        b
    }
    function go_getPrevNextObject(a, b) {
        return b = go_getNaviObject(a, b),
        is_jquery(b) ? b = {
            button: b
        }: is_number(b) && (b = {
            key: b
        }),
        b
    }
    function go_complementPrevNextObject(a, b) {
        return is_function(b.button) && (b.button = b.button.call(a)),
        is_string(b.button) && (b.button = jQuery(b.button)),
        is_string(b.key) && (b.key = cf_getKeyCode(b.key)),
        b
    }
    function go_getPaginationObject(a, b) {
        return b = go_getNaviObject(a, b),
        is_jquery(b) ? b = {
            container: b
        }: is_boolean(b) && (b = {
            keys: b
        }),
        b
    }
    function go_complementPaginationObject(a, b) {
        return is_function(b.container) && (b.container = b.container.call(a)),
        is_string(b.container) && (b.container = jQuery(b.container)),
        is_number(b.items) || (b.items = !1),
        is_boolean(b.keys) || (b.keys = !1),
        is_function(b.anchorBuilder) || is_false(b.anchorBuilder) || (b.anchorBuilder = jQuery.fn.carouFredSel.pageAnchorBuilder),
        is_number(b.deviation) || (b.deviation = 0),
        b
    }
    function go_getSwipeObject(a, b) {
        return is_function(b) && (b = b.call(a)),
        is_undefined(b) && (b = {
            onTouch: !1
        }),
        is_true(b) ? b = {
            onTouch: b
        }: is_number(b) && (b = {
            items: b
        }),
        b
    }
    function go_complementSwipeObject(a, b) {
        return is_boolean(b.onTouch) || (b.onTouch = !0),
        is_boolean(b.onMouse) || (b.onMouse = !1),
        is_object(b.options) || (b.options = {}),
        is_boolean(b.options.triggerOnTouchEnd) || (b.options.triggerOnTouchEnd = !1),
        b
    }
    function go_getMousewheelObject(a, b) {
        return is_function(b) && (b = b.call(a)),
        is_true(b) ? b = {}: is_number(b) ? b = {
            items: b
        }: is_undefined(b) && (b = !1),
        b
    }
    function go_complementMousewheelObject(a, b) {
        return b
    }
    function gn_getItemIndex(a, b, c, d, e) {
        if (is_string(a) && (a = jQuery(a, e)), is_object(a) && (a = jQuery(a, e)), is_jquery(a) ? (a = e.children().index(a), is_boolean(c) || (c = !1)) : is_boolean(c) || (c = !0), is_number(a) || (a = 0), is_number(b) || (b = 0), c && (a += d.first), a += b, d.total > 0) {
            for (; a >= d.total;) a -= d.total;
            for (; 0 > a;) a += d.total
        }
        return a
    }
    function gn_getVisibleItemsPrev(a, b, c) {
        for (var d = 0,
        e = 0,
        f = c; f >= 0; f--) {
            var g = a.eq(f);
            if (d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
            0 == f && (f = a.length),
            e++
        }
    }
    function gn_getVisibleItemsPrevFilter(a, b, c) {
        return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c)
    }
    function gn_getScrollItemsPrevFilter(a, b, c, d) {
        return gn_getItemsPrevFilter(a, b.items.filter, d, c)
    }
    function gn_getItemsPrevFilter(a, b, c, d) {
        for (var e = 0,
        f = 0,
        g = d,
        h = a.length; g >= 0; g--) {
            if (f++, f == h) return f;
            var i = a.eq(g);
            if (i.is(b) && (e++, e == c)) return f;
            0 == g && (g = h)
        }
    }
    function gn_getVisibleOrg(a, b) {
        return b.items.visibleConf.org || a.children().slice(0, b.items.visible).filter(b.items.filter).length
    }
    function gn_getVisibleItemsNext(a, b, c) {
        for (var d = 0,
        e = 0,
        f = c,
        g = a.length - 1; g >= f; f++) {
            var h = a.eq(f);
            if (d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
            if (e++, e == g + 1) return e;
            f == g && (f = -1)
        }
    }
    function gn_getVisibleItemsNextTestCircular(a, b, c, d) {
        var e = gn_getVisibleItemsNext(a, b, c);
        return b.circular || c + e > d && (e = d - c),
        e
    }
    function gn_getVisibleItemsNextFilter(a, b, c) {
        return gn_getItemsNextFilter(a, b.items.filter, b.items.visibleConf.org, c, b.circular)
    }
    function gn_getScrollItemsNextFilter(a, b, c, d) {
        return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1
    }
    function gn_getItemsNextFilter(a, b, c, d) {
        for (var f = 0,
        g = 0,
        h = d,
        i = a.length - 1; i >= h; h++) {
            if (g++, g >= i) return g;
            var j = a.eq(h);
            if (j.is(b) && (f++, f == c)) return g;
            h == i && (h = -1)
        }
    }
    function gi_getCurrentItems(a, b) {
        return a.slice(0, b.items.visible)
    }
    function gi_getOldItemsPrev(a, b, c) {
        return a.slice(c, b.items.visibleConf.old + c)
    }
    function gi_getNewItemsPrev(a, b) {
        return a.slice(0, b.items.visible)
    }
    function gi_getOldItemsNext(a, b) {
        return a.slice(0, b.items.visibleConf.old)
    }
    function gi_getNewItemsNext(a, b, c) {
        return a.slice(c, b.items.visible + c)
    }
    function sz_storeMargin(a, b, c) {
        b.usePadding && (is_string(c) || (c = "_cfs_origCssMargin"), a.each(function() {
            var a = jQuery(this),
            d = parseInt(a.css(b.d.marginRight), 10);
            is_number(d) || (d = 0),
            a.data(c, d)
        }))
    }
    function sz_resetMargin(a, b, c) {
        if (b.usePadding) {
            var d = is_boolean(c) ? c: !1;
            is_number(c) || (c = 0),
            sz_storeMargin(a, b, "_cfs_tempCssMargin"),
            a.each(function() {
                var a = jQuery(this);
                a.css(b.d.marginRight, d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin"))
            })
        }
    }
    function sz_storeOrigCss(a) {
        a.each(function() {
            var a = jQuery(this);
            a.data("_cfs_origCss", a.attr("style") || "")
        })
    }
    function sz_restoreOrigCss(a) {
        a.each(function() {
            var a = jQuery(this);
            a.attr("style", a.data("_cfs_origCss") || "")
        })
    }
    function sz_setResponsiveSizes(a, b) {
        var d = (a.items.visible, a.items[a.d.width]),
        e = a[a.d.height],
        f = is_percentage(e);
        b.each(function() {
            var b = jQuery(this),
            c = d - ms_getPaddingBorderMargin(b, a, "Width");
            b[a.d.width](c),
            f && b[a.d.height](ms_getPercentage(c, e))
        })
    }
    function sz_setSizes(a, b) {
        var c = a.parent(),
        d = a.children(),
        e = gi_getCurrentItems(d, b),
        f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1);
        if (c.css(f), b.usePadding) {
            var g = b.padding,
            h = g[b.d[1]];
            b.align && 0 > h && (h = 0);
            var i = e.last();
            i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h),
            a.css(b.d.top, g[b.d[0]]),
            a.css(b.d.left, g[b.d[3]])
        }
        return a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")),
        a.css(b.d.height, ms_getLargestSize(d, b, "height")),
        f
    }
    function ms_getSizes(a, b, c) {
        return [ms_getTotalSize(a, b, "width", c), ms_getLargestSize(a, b, "height", c)]
    }
    function ms_getLargestSize(a, b, c, d) {
        return is_boolean(d) || (d = !1),
        is_number(b[b.d[c]]) && d ? b[b.d[c]] : is_number(b.items[b.d[c]]) ? b.items[b.d[c]] : (c = c.toLowerCase().indexOf("width") > -1 ? "outerWidth": "outerHeight", ms_getTrueLargestSize(a, b, c))
    }
    function ms_getTrueLargestSize(a, b, c) {
        for (var d = 0,
        e = 0,
        f = a.length; f > e; e++) {
            var g = a.eq(e),
            h = g.is(":visible") ? g[b.d[c]](!0) : 0;
            h > d && (d = h)
        }
        return d
    }
    function ms_getTotalSize(a, b, c, d) {
        if (is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d) return b[b.d[c]];
        if (is_number(b.items[b.d[c]])) return b.items[b.d[c]] * a.length;
        for (var e = c.toLowerCase().indexOf("width") > -1 ? "outerWidth": "outerHeight", f = 0, g = 0, h = a.length; h > g; g++) {
            var i = a.eq(g);
            f += i.is(":visible") ? i[b.d[e]](!0) : 0
        }
        return f
    }
    function ms_getParentSize(a, b, c) {
        var d = a.is(":visible");
        d && a.hide();
        var e = a.parent()[b.d[c]]();
        return d && a.show(),
        e
    }
    function ms_getMaxDimension(a, b) {
        return is_number(a[a.d.width]) ? a[a.d.width] : b
    }
    function ms_hasVariableSizes(a, b, c) {
        for (var d = !1,
        e = !1,
        f = 0,
        g = a.length; g > f; f++) {
            var h = a.eq(f),
            i = h.is(":visible") ? h[b.d[c]](!0) : 0;
            d === !1 ? d = i: d != i && (e = !0),
            0 == d && (e = !0)
        }
        return e
    }
    function ms_getPaddingBorderMargin(a, b, c) {
        return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]()
    }
    function ms_getPercentage(a, b) {
        if (is_percentage(b)) {
            if (b = parseInt(b.slice(0, -1), 10), !is_number(b)) return a;
            a *= b / 100
        }
        return a
    }
    function cf_e(a, b, c, d, e) {
        return is_boolean(c) || (c = !0),
        is_boolean(d) || (d = !0),
        is_boolean(e) || (e = !1),
        c && (a = b.events.prefix + a),
        d && (a = a + "." + b.events.namespace),
        d && e && (a += b.serialNumber),
        a
    }
    function cf_c(a, b) {
        return is_string(b.classnames[a]) ? b.classnames[a] : a
    }
    function cf_mapWrapperSizes(a, b, c) {
        is_boolean(c) || (c = !0);
        var d = b.usePadding && c ? b.padding: [0, 0, 0, 0],
        e = {};
        return e[b.d.width] = a[0] + d[1] + d[3],
        e[b.d.height] = a[1] + d[0] + d[2],
        e
    }
    function cf_sortParams(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++) for (var f = 0,
        g = b.length; g > f; f++) if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) {
            c[f] = a[d];
            break
        }
        return c
    }
    function cf_getPadding(a) {
        if (is_undefined(a)) return [0, 0, 0, 0];
        if (is_number(a)) return [a, a, a, a];
        if (is_string(a) && (a = a.split("px").join("").split("em").join("").split(" ")), !is_array(a)) return [0, 0, 0, 0];
        for (var b = 0; 4 > b; b++) a[b] = parseInt(a[b], 10);
        switch (a.length) {
        case 0:
            return [0, 0, 0, 0];
        case 1:
            return [a[0], a[0], a[0], a[0]];
        case 2:
            return [a[0], a[1], a[0], a[1]];
        case 3:
            return [a[0], a[1], a[2], a[1]];
        default:
            return [a[0], a[1], a[2], a[3]]
        }
    }
    function cf_getAlignPadding(a, b) {
        var c = is_number(b[b.d.width]) ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width")) : 0;
        switch (b.align) {
        case "left":
            return [0, c];
        case "right":
            return [c, 0];
        case "center":
        default:
            return [Math.ceil(c / 2), Math.floor(c / 2)]
        }
    }
    function cf_getDimensions(a) {
        for (var b = [["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3], ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]], c = b[0].length, d = "right" == a.direction || "left" == a.direction ? 0 : 1, e = {},
        f = 0; c > f; f++) e[b[0][f]] = b[d][f];
        return e
    }
    function cf_getAdjust(a, b, c, d) {
        var e = a;
        if (is_function(c)) e = c.call(d, e);
        else if (is_string(c)) {
            var f = c.split("+"),
            g = c.split("-");
            if (g.length > f.length) var h = !0,
            i = g[0],
            j = g[1];
            else var h = !1,
            i = f[0],
            j = f[1];
            switch (i) {
            case "even":
                e = 1 == a % 2 ? a - 1 : a;
                break;
            case "odd":
                e = 0 == a % 2 ? a - 1 : a;
                break;
            default:
                e = a
            }
            j = parseInt(j, 10),
            is_number(j) && (h && (j = -j), e += j)
        }
        return (!is_number(e) || 1 > e) && (e = 1),
        e
    }
    function cf_getItemsAdjust(a, b, c, d) {
        return cf_getItemAdjustMinMax(cf_getAdjust(a, b, c, d), b.items.visibleConf)
    }
    function cf_getItemAdjustMinMax(a, b) {
        return is_number(b.min) && b.min > a && (a = b.min),
        is_number(b.max) && a > b.max && (a = b.max),
        1 > a && (a = 1),
        a
    }
    function cf_getSynchArr(a) {
        is_array(a) || (a = [[a]]),
        is_array(a[0]) || (a = [a]);
        for (var b = 0,
        c = a.length; c > b; b++) is_string(a[b][0]) && (a[b][0] = jQuery(a[b][0])),
        is_boolean(a[b][1]) || (a[b][1] = !0),
        is_boolean(a[b][2]) || (a[b][2] = !0),
        is_number(a[b][3]) || (a[b][3] = 0);
        return a
    }
    function cf_getKeyCode(a) {
        return "right" == a ? 39 : "left" == a ? 37 : "up" == a ? 38 : "down" == a ? 40 : -1
    }
    function cf_setCookie(a, b, c) {
        if (a) {
            var d = b.triggerHandler(cf_e("currentPosition", c));
            jQuery.fn.carouFredSel.cookie.set(a, d)
        }
    }
    function cf_getCookie(a) {
        var b = jQuery.fn.carouFredSel.cookie.get(a);
        return "" == b ? 0 : b
    }
    function in_mapCss(a, b) {
        for (var c = {},
        d = 0,
        e = b.length; e > d; d++) c[b[d]] = a.css(b[d]);
        return c
    }
    function in_complementItems(a, b, c, d) {
        return is_object(a.visibleConf) || (a.visibleConf = {}),
        is_object(a.sizesConf) || (a.sizesConf = {}),
        0 == a.start && is_number(d) && (a.start = d),
        is_object(a.visible) ? (a.visibleConf.min = a.visible.min, a.visibleConf.max = a.visible.max, a.visible = !1) : is_string(a.visible) ? ("variable" == a.visible ? a.visibleConf.variable = !0 : a.visibleConf.adjust = a.visible, a.visible = !1) : is_function(a.visible) && (a.visibleConf.adjust = a.visible, a.visible = !1),
        is_string(a.filter) || (a.filter = c.filter(":hidden").length > 0 ? ":visible": "*"),
        a[b.d.width] || (b.responsive ? (debug(!0, "Set a " + b.d.width + " for the items!"), a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")) : a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth") ? "variable": c[b.d.outerWidth](!0)),
        a[b.d.height] || (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight") ? "variable": c[b.d.outerHeight](!0)),
        a.sizesConf.width = a.width,
        a.sizesConf.height = a.height,
        a
    }
    function in_complementVisibleItems(a, b) {
        return "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0),
        a.items.visibleConf.variable || (is_number(a[a.d.width]) ? a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]) : (a.items.visible = Math.floor(b / a.items[a.d.width]), a[a.d.width] = a.items.visible * a.items[a.d.width], a.items.visibleConf.adjust || (a.align = !1)), ("Infinity" == a.items.visible || 1 > a.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), a.items.visibleConf.variable = !0)),
        a
    }
    function in_complementPrimarySize(a, b, c) {
        return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")),
        a
    }
    function in_complementSecondarySize(a, b, c) {
        return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")),
        a || (a = b.items[b.d.height]),
        a
    }
    function in_getAlignPadding(a, b) {
        var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a);
        return a.padding[a.d[1]] = c[1],
        a.padding[a.d[3]] = c[0],
        a
    }
    function in_getResponsiveValues(a, b) {
        var d = cf_getItemAdjustMinMax(Math.ceil(a[a.d.width] / a.items[a.d.width]), a.items.visibleConf);
        d > b.length && (d = b.length);
        var e = Math.floor(a[a.d.width] / d);
        return a.items.visible = d,
        a.items[a.d.width] = e,
        a[a.d.width] = d * e,
        a
    }
    function bt_pauseOnHoverConfig(a) {
        if (is_string(a)) var b = a.indexOf("immediate") > -1 ? !0 : !1,
        c = a.indexOf("resume") > -1 ? !0 : !1;
        else var b = c = !1;
        return [b, c]
    }
    function bt_mousesheelNumber(a) {
        return is_number(a) ? a: null
    }
    function is_null(a) {
        return null === a
    }
    function is_undefined(a) {
        return is_null(a) || a === void 0 || "" === a || "undefined" === a
    }
    function is_array(a) {
        return a instanceof Array
    }
    function is_jquery(a) {
        return a instanceof jQuery
    }
    function is_object(a) {
        return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a)
    }
    function is_number(a) {
        return (a instanceof Number || "number" == typeof a) && !isNaN(a)
    }
    function is_string(a) {
        return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a)
    }
    function is_function(a) {
        return a instanceof Function || "function" == typeof a
    }
    function is_boolean(a) {
        return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
    }
    function is_true(a) {
        return a === !0 || "true" === a
    }
    function is_false(a) {
        return a === !1 || "false" === a
    }
    function is_percentage(a) {
        return is_string(a) && "%" == a.slice( - 1)
    }
    function getTime() {
        return (new Date).getTime()
    }
    function deprecated(a, b) {
        debug(!0, a + " is DEPRECATED, support for it will be removed. Use " + b + " instead.")
    }
    function debug(a, b) {
        if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
            if (is_object(a)) {
                var c = " (" + a.selector + ")";
                a = a.debug
            } else var c = "";
            if (!a) return ! 1;
            b = is_string(b) ? "carouFredSel" + c + ": " + b: ["carouFredSel" + c + ":", b],
            window.console.log(b)
        }
        return ! 1
    }
    jQuery.fn.carouFredSel || (jQuery.fn.caroufredsel = jQuery.fn.carouFredSel = function(options, configs) {
        if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'),
        this;
        if (this.length > 1) return this.each(function() {
            jQuery(this).carouFredSel(options, configs)
        });
        var jQuerycfs = this,
        jQuerytt0 = this[0],
        starting_position = !1;
        jQuerycfs.data("_cfs_isCarousel") && (starting_position = jQuerycfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), jQuerycfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        FN._init = function(a, b, c) {
            a = go_getObject(jQuerytt0, a),
            a.items = go_getItemsObject(jQuerytt0, a.items),
            a.scroll = go_getScrollObject(jQuerytt0, a.scroll),
            a.auto = go_getAutoObject(jQuerytt0, a.auto),
            a.prev = go_getPrevNextObject(jQuerytt0, a.prev),
            a.next = go_getPrevNextObject(jQuerytt0, a.next),
            a.pagination = go_getPaginationObject(jQuerytt0, a.pagination),
            a.swipe = go_getSwipeObject(jQuerytt0, a.swipe),
            a.mousewheel = go_getMousewheelObject(jQuerytt0, a.mousewheel),
            b && (opts_orig = jQuery.extend(!0, {},
            jQuery.fn.carouFredSel.defaults, a)),
            opts = jQuery.extend(!0, {},
            jQuery.fn.carouFredSel.defaults, a),
            opts.d = cf_getDimensions(opts),
            crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next": "prev";
            var d = jQuerycfs.children(),
            e = ms_getParentSize(jQuerywrp, opts, "width");
            if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, e), opts.items = in_complementItems(opts.items, opts, d, c), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, d), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, d), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(e, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, e)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center": !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, jQuerytt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible),
            opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible),
            opts = in_getResponsiveValues(opts, d, e);
            else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left": "bottom" == opts.align && (opts.align = "right"), opts.align) {
            case "center":
            case "left":
            case "right":
                "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, d), opts.usePadding = !0);
                break;
            default:
                opts.align = !1,
                opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0
            }
            is_number(opts.scroll.duration) || (opts.scroll.duration = 500),
            is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible": opts.items.visible),
            opts.auto = jQuery.extend(!0, {},
            opts.scroll, opts.auto),
            opts.prev = jQuery.extend(!0, {},
            opts.scroll, opts.prev),
            opts.next = jQuery.extend(!0, {},
            opts.scroll, opts.next),
            opts.pagination = jQuery.extend(!0, {},
            opts.scroll, opts.pagination),
            opts.auto = go_complementAutoObject(jQuerytt0, opts.auto),
            opts.prev = go_complementPrevNextObject(jQuerytt0, opts.prev),
            opts.next = go_complementPrevNextObject(jQuerytt0, opts.next),
            opts.pagination = go_complementPaginationObject(jQuerytt0, opts.pagination),
            opts.swipe = go_complementSwipeObject(jQuerytt0, opts.swipe),
            opts.mousewheel = go_complementMousewheelObject(jQuerytt0, opts.mousewheel),
            opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)),
            opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")),
            opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")),
            opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")),
            opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
        },
        FN._build = function() {
            jQuerycfs.data("_cfs_isCarousel", !0);
            var a = jQuerycfs.children(),
            b = in_mapCss(jQuerycfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
            c = "relative";
            switch (b.position) {
            case "absolute":
            case "fixed":
                c = b.position
            }
            "parent" == conf.wrapper ? sz_storeOrigCss(jQuerywrp) : jQuerywrp.css(b),
            jQuerywrp.css({
                overflow: "hidden",
                position: c
            }),
            sz_storeOrigCss(jQuerycfs),
            jQuerycfs.data("_cfs_origCssZindex", b.zIndex),
            jQuerycfs.css({
                textAlign: "left",
                "float": "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }),
            sz_storeMargin(a, opts),
            sz_storeOrigCss(a),
            opts.responsive && sz_setResponsiveSizes(opts, a)
        },
        FN._bind_events = function() {
            FN._unbind_events(),
            jQuerycfs.bind(cf_e("stop", conf),
            function(a, b) {
                return a.stopPropagation(),
                crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)),
                crsl.isStopped = !0,
                opts.auto.play && (opts.auto.play = !1, jQuerycfs.trigger(cf_e("pause", conf), b)),
                !0
            }),
            jQuerycfs.bind(cf_e("finish", conf),
            function(a) {
                return a.stopPropagation(),
                crsl.isScrolling && sc_stopScroll(scrl),
                !0
            }),
            jQuerycfs.bind(cf_e("pause", conf),
            function(a, b, c) {
                if (a.stopPropagation(), tmrs = sc_clearTimers(tmrs), b && crsl.isScrolling) {
                    scrl.isStopped = !0;
                    var d = getTime() - scrl.startTime;
                    scrl.duration -= d,
                    scrl.pre && (scrl.pre.duration -= d),
                    scrl.post && (scrl.post.duration -= d),
                    sc_stopScroll(scrl, !1)
                }
                if (crsl.isPaused || crsl.isScrolling || c && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                    var e = opts.auto.timeoutDuration - tmrs.timePassed,
                    f = 100 - Math.ceil(100 * e / opts.auto.timeoutDuration);
                    opts.auto.onTimeoutPause.call(jQuerytt0, f, e)
                }
                return ! 0
            }),
            jQuerycfs.bind(cf_e("play", conf),
            function(a, b, c, d) {
                a.stopPropagation(),
                tmrs = sc_clearTimers(tmrs);
                var e = [b, c, d],
                f = ["string", "number", "boolean"],
                g = cf_sortParams(e, f);
                if (b = g[0], c = g[1], d = g[2], "prev" != b && "next" != b && (b = crsl.direction), is_number(c) || (c = 0), is_boolean(d) || (d = !1), d && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return a.stopImmediatePropagation(),
                debug(conf, "Carousel stopped: Not scrolling.");
                crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))),
                crsl.isPaused = !1,
                tmrs.startTime = getTime();
                var h = opts.auto.timeoutDuration + c;
                return dur2 = h - tmrs.timePassed,
                perc = 100 - Math.ceil(100 * dur2 / h),
                opts.auto.progress && (tmrs.progress = setInterval(function() {
                    var a = getTime() - tmrs.startTime + tmrs.timePassed,
                    b = Math.ceil(100 * a / h);
                    opts.auto.progress.updater.call(opts.auto.progress.bar[0], b)
                },
                opts.auto.progress.interval)),
                tmrs.auto = setTimeout(function() {
                    opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100),
                    opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call(jQuerytt0, perc, dur2),
                    crsl.isScrolling ? jQuerycfs.trigger(cf_e("play", conf), b) : jQuerycfs.trigger(cf_e(b, conf), opts.auto)
                },
                dur2),
                opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call(jQuerytt0, perc, dur2),
                !0
            }),
            jQuerycfs.bind(cf_e("resume", conf),
            function(a) {
                return a.stopPropagation(),
                scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : jQuerycfs.trigger(cf_e("play", conf)),
                !0
            }),
            jQuerycfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf),
            function(a, b, c, d, e) {
                if (a.stopPropagation(), crsl.isStopped || jQuerycfs.is(":hidden")) return a.stopImmediatePropagation(),
                debug(conf, "Carousel stopped or hidden: Not scrolling.");
                var f = is_number(opts.items.minimum) ? opts.items.minimum: opts.items.visible + 1;
                if (f > itms.total) return a.stopImmediatePropagation(),
                debug(conf, "Not enough items (" + itms.total + " total, " + f + " needed): Not scrolling.");
                var g = [b, c, d, e],
                h = ["object", "number/string", "function", "boolean"],
                i = cf_sortParams(g, h);
                b = i[0],
                c = i[1],
                d = i[2],
                e = i[3];
                var j = a.type.slice(conf.events.prefix.length);
                if (is_object(b) || (b = {}), is_function(d) && (b.onAfter = d), is_boolean(e) && (b.queue = e), b = jQuery.extend(!0, {},
                opts[j], b), b.conditions && !b.conditions.call(jQuerytt0, j)) return a.stopImmediatePropagation(),
                debug(conf, 'Callback "conditions" returned false.');
                if (!is_number(c)) {
                    if ("*" != opts.items.filter) c = "visible";
                    else for (var k = [c, b.items, opts[j].items], i = 0, l = k.length; l > i; i++) if (is_number(k[i]) || "page" == k[i] || "visible" == k[i]) {
                        c = k[i];
                        break
                    }
                    switch (c) {
                    case "page":
                        return a.stopImmediatePropagation(),
                        jQuerycfs.triggerHandler(cf_e(j + "Page", conf), [b, d]);
                    case "visible":
                        opts.items.visibleConf.variable || "*" != opts.items.filter || (c = opts.items.visible)
                    }
                }
                if (scrl.isStopped) return jQuerycfs.trigger(cf_e("resume", conf)),
                jQuerycfs.trigger(cf_e("queue", conf), [j, [b, c, d]]),
                a.stopImmediatePropagation(),
                debug(conf, "Carousel resumed scrolling.");
                if (b.duration > 0 && crsl.isScrolling) return b.queue && ("last" == b.queue && (queu = []), ("first" != b.queue || 0 == queu.length) && jQuerycfs.trigger(cf_e("queue", conf), [j, [b, c, d]])),
                a.stopImmediatePropagation(),
                debug(conf, "Carousel currently scrolling.");
                if (tmrs.timePassed = 0, jQuerycfs.trigger(cf_e("slide_" + j, conf), [b, c]), opts.synchronise) for (var m = opts.synchronise,
                n = [b, c], o = 0, l = m.length; l > o; o++) {
                    var p = j;
                    m[o][2] || (p = "prev" == p ? "next": "prev"),
                    m[o][1] || (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", ["configuration", p])),
                    n[1] = c + m[o][3],
                    m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n])
                }
                return ! 0
            }),
            jQuerycfs.bind(cf_e("slide_prev", conf),
            function(a, b, c) {
                a.stopPropagation();
                var d = jQuerycfs.children();
                if (!opts.circular && 0 == itms.first) return opts.infinite && jQuerycfs.trigger(cf_e("next", conf), itms.total - 1),
                a.stopImmediatePropagation();
                if (sz_resetMargin(d, opts), !is_number(c)) {
                    if (opts.items.visibleConf.variable) c = gn_getVisibleItemsPrev(d, opts, itms.total - 1);
                    else if ("*" != opts.items.filter) {
                        var e = is_number(b.items) ? b.items: gn_getVisibleOrg(jQuerycfs, opts);
                        c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e)
                    } else c = opts.items.visible;
                    c = cf_getAdjust(c, opts, b.items, jQuerytt0)
                }
                if (opts.circular || itms.total - c < itms.first && (c = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    var f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, jQuerytt0);
                    f >= opts.items.visible + c && itms.total > c && (c++, f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, jQuerytt0)),
                    opts.items.visible = f
                } else if ("*" != opts.items.filter) {
                    var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
                    opts.items.visible = cf_getItemsAdjust(f, opts, opts.items.visibleConf.adjust, jQuerytt0)
                }
                if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(),
                debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + c + " items backward."), itms.first += c; itms.first >= itms.total;) itms.first -= itms.total;
                opts.circular || (0 == itms.first && b.onEnd && b.onEnd.call(jQuerytt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)),

				
               
				
					 jQuerycfs.children().slice(itms.total - c, itms.total).prependTo(jQuerycfs),
				setTimeout(function(){jQuerycfs.children().removeClass('active').slice(1,2).addClass("active")},jQuery.fn.carouFredSel.defaults.scroll.duration-80)
                itms.total < opts.items.visible + c && jQuerycfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo(jQuerycfs);
				
                var d = jQuerycfs.children(),
                g = gi_getOldItemsPrev(d, opts, c),
                h = gi_getNewItemsPrev(d, opts),
                i = d.eq(c - 1),
                j = g.last(),
                k = h.last();
                sz_resetMargin(d, opts);
                var l = 0,
                m = 0;
                if (opts.align) {
                    var n = cf_getAlignPadding(h, opts);
                    l = n[0],
                    m = n[1]
                }
                var o = 0 > l ? opts.padding[opts.d[3]] : 0,
                p = !1,
                q = jQuery();
                if (c > opts.items.visible && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
                    var r = opts.items[opts.d.width];
                    p = q,
                    i = k,
                    sc_hideHiddenItems(p),
                    opts.items[opts.d.width] = "variable"
                }
                var s = !1,
                t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                u = cf_mapWrapperSizes(ms_getSizes(h, opts, !0), opts, !opts.usePadding),
                v = 0,
                w = {},
                x = {},
                y = {},
                z = {},
                A = {},
                B = {},
                C = {},
                D = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                case "cover":
                case "cover-fade":
                    v = ms_getTotalSize(d.slice(0, opts.items.visible), opts, "width")
                }
                p && (opts.items[opts.d.width] = r),
                sz_resetMargin(d, opts, !0),
                m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]),
                l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]),
                opts.align && (opts.padding[opts.d[1]] = m, opts.padding[opts.d[3]] = l),
                B[opts.d.left] = -(t - o),
                C[opts.d.left] = -(v - o),
                x[opts.d.left] = u[opts.d.width];
                var E = function() {},
                F = function() {},
                G = function() {},
                H = function() {},
                I = function() {},
                J = function() {},
                K = function() {},
                L = function() {},
                M = function() {},
                N = function() {},
                O = function() {};
                switch (b.fx) {
                case "crossfade":
                case "cover":
                case "cover-fade":
                case "uncover":
                case "uncover-fade":
                    s = jQuerycfs.clone(!0).appendTo(jQuerywrp)
                }
                switch (b.fx) {
                case "crossfade":
                case "uncover":
                case "uncover-fade":
                    s.children().slice(0, c).remove(),
                    s.children().slice(opts.items.visibleConf.old).remove();
                    break;
                case "cover":
                case "cover-fade":
                    s.children().slice(opts.items.visible).remove(),
                    s.css(C)
                }
                if (jQuerycfs.css(B), scrl = sc_setScroll(D, b.easing, conf), w[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (E = function() {
                    jQuerywrp.css(u)
                },
                F = function() {
                    scrl.anims.push([jQuerywrp, u])
                }), opts.usePadding) {
                    switch (k.not(i).length && (y[opts.d.marginRight] = i.data("_cfs_origCssMargin"), 0 > l ? i.css(y) : (K = function() {
                        i.css(y)
                    },
                    L = function() {
                        scrl.anims.push([i, y])
                    })), b.fx) {
                    case "cover":
                    case "cover-fade":
                        s.children().eq(c - 1).css(y)
                    }
                    k.not(j).length && (z[opts.d.marginRight] = j.data("_cfs_origCssMargin"), G = function() {
                        j.css(z)
                    },
                    H = function() {
                        scrl.anims.push([j, z])
                    }),
                    m >= 0 && (A[opts.d.marginRight] = k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], I = function() {
                        k.css(A)
                    },
                    J = function() {
                        scrl.anims.push([k, A])
                    })
                }
                O = function() {
                    jQuerycfs.css(w)
                };
                var P = opts.items.visible + c - itms.total;
                N = function() {
                    if (P > 0 && (jQuerycfs.children().slice(itms.total).remove(), g = jQuery(jQuerycfs.children().slice(itms.total - (opts.items.visible - P)).get().concat(jQuerycfs.children().slice(0, P).get()))), sc_showHiddenItems(p), opts.usePadding) {
                        var a = jQuerycfs.children().eq(opts.items.visible + c - 1);
                        a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
                    }
                };
                var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u);
                switch (M = function() {
                    sc_afterScroll(jQuerycfs, s, b),
                    crsl.isScrolling = !1,
                    clbk.onAfter = sc_fireCallbacks(jQuerytt0, b, "onAfter", Q, clbk),
                    queu = sc_fireQueue(jQuerycfs, queu, conf),
                    crsl.isPaused || jQuerycfs.trigger(cf_e("play", conf))
                },
                crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks(jQuerytt0, b, "onBefore", Q, clbk), b.fx) {
                case "none":
                    jQuerycfs.css(w),
                    E(),
                    G(),
                    I(),
                    K(),
                    O(),
                    N(),
                    M();
                    break;
                case "fade":
                    scrl.anims.push([jQuerycfs, {
                        opacity: 0
                    },
                    function() {
                        E(),
                        G(),
                        I(),
                        K(),
                        O(),
                        N(),
                        scrl = sc_setScroll(D, b.easing, conf),
                        scrl.anims.push([jQuerycfs, {
                            opacity: 1
                        },
                        M]),
                        sc_startScroll(scrl, conf)
                    }]);
                    break;
                case "crossfade":
                    jQuerycfs.css({
                        opacity:
                        0
                    }),
                    scrl.anims.push([s, {
                        opacity: 0
                    }]),
                    scrl.anims.push([jQuerycfs, {
                        opacity: 1
                    },
                    M]),
                    F(),
                    G(),
                    I(),
                    K(),
                    O(),
                    N();
                    break;
                case "cover":
                    scrl.anims.push([s, w,
                    function() {
                        G(),
                        I(),
                        K(),
                        O(),
                        N(),
                        M()
                    }]),
                    F();
                    break;
                case "cover-fade":
                    scrl.anims.push([jQuerycfs, {
                        opacity: 0
                    }]),
                    scrl.anims.push([s, w,
                    function() {
                        G(),
                        I(),
                        K(),
                        O(),
                        N(),
                        M()
                    }]),
                    F();
                    break;
                case "uncover":
                    scrl.anims.push([s, x, M]),
                    F(),
                    G(),
                    I(),
                    K(),
                    O(),
                    N();
                    break;
                case "uncover-fade":
                    jQuerycfs.css({
                        opacity:
                        0
                    }),
                    scrl.anims.push([jQuerycfs, {
                        opacity: 1
                    }]),
                    scrl.anims.push([s, x, M]),
                    F(),
                    G(),
                    I(),
                    K(),
                    O(),
                    N();
                    break;
                default:
                    scrl.anims.push([jQuerycfs, w,
                    function() {
                        N(),
                        M()
                    }]),
                    F(),
                    H(),
                    J(),
                    L()
                }
                return sc_startScroll(scrl, conf),
                cf_setCookie(opts.cookie, jQuerycfs, conf),
                jQuerycfs.trigger(cf_e("updatePageStatus", conf), [!1, u]),
                !0
            }),
            jQuerycfs.bind(cf_e("slide_next", conf),
            function(a, b, c) {
                a.stopPropagation();
                var d = jQuerycfs.children();
                if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && jQuerycfs.trigger(cf_e("prev", conf), itms.total - 1),
                a.stopImmediatePropagation();
                if (sz_resetMargin(d, opts), !is_number(c)) {
                    if ("*" != opts.items.filter) {
                        var e = is_number(b.items) ? b.items: gn_getVisibleOrg(jQuerycfs, opts);
                        c = gn_getScrollItemsNextFilter(d, opts, 0, e)
                    } else c = opts.items.visible;
                    c = cf_getAdjust(c, opts, b.items, jQuerytt0)
                }
                var f = 0 == itms.first ? itms.total: itms.first;
                if (!opts.circular) {
                    if (opts.items.visibleConf.variable) var g = gn_getVisibleItemsNext(d, opts, c),
                    e = gn_getVisibleItemsPrev(d, opts, f - 1);
                    else var g = opts.items.visible,
                    e = opts.items.visible;
                    c + g > f && (c = f - e)
                }
                if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    for (var g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, jQuerytt0); opts.items.visible - c >= g && itms.total > c;) c++,
                    g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, jQuerytt0);
                    opts.items.visible = g
                } else if ("*" != opts.items.filter) {
                    var g = gn_getVisibleItemsNextFilter(d, opts, c);
                    opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, jQuerytt0)
                }
                if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(),
                debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + c + " items forward."), itms.first -= c; 0 > itms.first;) itms.first += itms.total;
                opts.circular || (itms.first == opts.items.visible && b.onEnd && b.onEnd.call(jQuerytt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)),
				
					
				setTimeout(function(){jQuerycfs.children().removeClass('active').slice(2,3).addClass("active")},jQuery.fn.carouFredSel.defaults.scroll.duration-80)
                
                itms.total < opts.items.visible + c && jQuerycfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo(jQuerycfs);
                var d = jQuerycfs.children(),
                h = gi_getOldItemsNext(d, opts),
                i = gi_getNewItemsNext(d, opts, c),
                j = d.eq(c - 1),
                k = h.last(),
                l = i.last();
                sz_resetMargin(d, opts);
                var m = 0,
                n = 0;
                if (opts.align) {
                    var o = cf_getAlignPadding(i, opts);
                    m = o[0],
                    n = o[1]
                }
                var p = !1,
                q = jQuery();
                if (c > opts.items.visibleConf.old && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
                    var r = opts.items[opts.d.width];
                    p = q,
                    j = k,
                    sc_hideHiddenItems(p),
                    opts.items[opts.d.width] = "variable"
                }
                var s = !1,
                t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                u = cf_mapWrapperSizes(ms_getSizes(i, opts, !0), opts, !opts.usePadding),
                v = 0,
                w = {},
                x = {},
                y = {},
                z = {},
                A = {},
                B = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                case "uncover":
                case "uncover-fade":
                    v = ms_getTotalSize(d.slice(0, opts.items.visibleConf.old), opts, "width")
                }
                p && (opts.items[opts.d.width] = r),
                opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0),
                sz_resetMargin(d, opts, !0),
                sz_resetMargin(k, opts, opts.padding[opts.d[1]]),
                opts.align && (opts.padding[opts.d[1]] = n, opts.padding[opts.d[3]] = m),
                A[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                var C = function() {},
                D = function() {},
                E = function() {},
                F = function() {},
                G = function() {},
                H = function() {},
                I = function() {},
                J = function() {},
                K = function() {};
                switch (b.fx) {
                case "crossfade":
                case "cover":
                case "cover-fade":
                case "uncover":
                case "uncover-fade":
                    s = jQuerycfs.clone(!0).appendTo(jQuerywrp),
                    s.children().slice(opts.items.visibleConf.old).remove()
                }
                switch (b.fx) {
                case "crossfade":
                case "cover":
                case "cover-fade":
                    jQuerycfs.css("zIndex", 1),
                    s.css("zIndex", 0)
                }
                if (scrl = sc_setScroll(B, b.easing, conf), w[opts.d.left] = -t, x[opts.d.left] = -v, 0 > m && (w[opts.d.left] += m), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (C = function() {
                    jQuerywrp.css(u)
                },
                D = function() {
                    scrl.anims.push([jQuerywrp, u])
                }), opts.usePadding) {
                    var L = l.data("_cfs_origCssMargin");
                    n >= 0 && (L += opts.padding[opts.d[1]]),
                    l.css(opts.d.marginRight, L),
                    j.not(k).length && (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")),
                    E = function() {
                        k.css(z)
                    },
                    F = function() {
                        scrl.anims.push([k, z])
                    };
                    var M = j.data("_cfs_origCssMargin");
                    m > 0 && (M += opts.padding[opts.d[3]]),
                    y[opts.d.marginRight] = M,
                    G = function() {
                        j.css(y)
                    },
                    H = function() {
                        scrl.anims.push([j, y])
                    }
                }
                K = function() {
                    jQuerycfs.css(A)
                };
                var N = opts.items.visible + c - itms.total;
                J = function() {
                    N > 0 && jQuerycfs.children().slice(itms.total).remove();
                    var a = jQuerycfs.children().slice(0, c).appendTo(jQuerycfs).last();
                    if (N > 0 && (i = gi_getCurrentItems(d, opts)), sc_showHiddenItems(p), opts.usePadding) {
                        if (itms.total < opts.items.visible + c) {
                            var b = jQuerycfs.children().eq(opts.items.visible - 1);
                            b.css(opts.d.marginRight, b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                        }
                        a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
                    }
                };
                var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u);
                switch (I = function() {
                    jQuerycfs.css("zIndex", jQuerycfs.data("_cfs_origCssZindex")),
                    sc_afterScroll(jQuerycfs, s, b),
                    crsl.isScrolling = !1,
                    clbk.onAfter = sc_fireCallbacks(jQuerytt0, b, "onAfter", O, clbk),
                    queu = sc_fireQueue(jQuerycfs, queu, conf),
                    crsl.isPaused || jQuerycfs.trigger(cf_e("play", conf))
                },
                crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks(jQuerytt0, b, "onBefore", O, clbk), b.fx) {
                case "none":
                    jQuerycfs.css(w),
                    C(),
                    E(),
                    G(),
                    K(),
                    J(),
                    I();
                    break;
                case "fade":
                    scrl.anims.push([jQuerycfs, {
                        opacity: 0
                    },
                    function() {
                        C(),
                        E(),
                        G(),
                        K(),
                        J(),
                        scrl = sc_setScroll(B, b.easing, conf),
                        scrl.anims.push([jQuerycfs, {
                            opacity: 1
                        },
                        I]),
                        sc_startScroll(scrl, conf)
                    }]);
                    break;
                case "crossfade":
                    jQuerycfs.css({
                        opacity:
                        0
                    }),
                    scrl.anims.push([s, {
                        opacity: 0
                    }]),
                    scrl.anims.push([jQuerycfs, {
                        opacity: 1
                    },
                    I]),
                    D(),
                    E(),
                    G(),
                    K(),
                    J();
                    break;
                case "cover":
                    jQuerycfs.css(opts.d.left, jQuerywrp[opts.d.width]()),
                    scrl.anims.push([jQuerycfs, A, I]),
                    D(),
                    E(),
                    G(),
                    J();
                    break;
                case "cover-fade":
                    jQuerycfs.css(opts.d.left, jQuerywrp[opts.d.width]()),
                    scrl.anims.push([s, {
                        opacity: 0
                    }]),
                    scrl.anims.push([jQuerycfs, A, I]),
                    D(),
                    E(),
                    G(),
                    J();
                    break;
                case "uncover":
                    scrl.anims.push([s, x, I]),
                    D(),
                    E(),
                    G(),
                    K(),
                    J();
                    break;
                case "uncover-fade":
                    jQuerycfs.css({
                        opacity:
                        0
                    }),
                    scrl.anims.push([jQuerycfs, {
                        opacity: 1
                    }]),
                    scrl.anims.push([s, x, I]),
                    D(),
                    E(),
                    G(),
                    K(),
                    J();
                    break;
                default:
                    scrl.anims.push([jQuerycfs, w,
                    function() {
                        K(),
                        J(),
                        I()
                    }]),
                    D(),
                    F(),
                    H()
                }
                return sc_startScroll(scrl, conf),
                cf_setCookie(opts.cookie, jQuerycfs, conf),
                jQuerycfs.trigger(cf_e("updatePageStatus", conf), [!1, u]),
                !0
            }),
            jQuerycfs.bind(cf_e("slideTo", conf),
            function(a, b, c, d, e, f, g) {
                a.stopPropagation();
                var h = [b, c, d, e, f, g],
                i = ["string/number/object", "number", "boolean", "object", "string", "function"],
                j = cf_sortParams(h, i);
                return e = j[3],
                f = j[4],
                g = j[5],
                b = gn_getItemIndex(j[0], j[1], j[2], itms, jQuerycfs),
                0 == b ? !1 : (is_object(e) || (e = !1), "prev" != f && "next" != f && (f = opts.circular ? itms.total / 2 >= b ? "next": "prev": 0 == itms.first || itms.first > b ? "next": "prev"), "prev" == f && (b = itms.total - b), jQuerycfs.trigger(cf_e(f, conf), [e, b, g]), !0)
            }),
            jQuerycfs.bind(cf_e("prevPage", conf),
            function(a, b, c) {
                a.stopPropagation();
                var d = jQuerycfs.triggerHandler(cf_e("currentPage", conf));
                return jQuerycfs.triggerHandler(cf_e("slideToPage", conf), [d - 1, b, "prev", c])
            }),
            jQuerycfs.bind(cf_e("nextPage", conf),
            function(a, b, c) {
                a.stopPropagation();
                var d = jQuerycfs.triggerHandler(cf_e("currentPage", conf));
                return jQuerycfs.triggerHandler(cf_e("slideToPage", conf), [d + 1, b, "next", c])
            }),
            jQuerycfs.bind(cf_e("slideToPage", conf),
            function(a, b, c, d, e) {
                a.stopPropagation(),
                is_number(b) || (b = jQuerycfs.triggerHandler(cf_e("currentPage", conf)));
                var f = opts.pagination.items || opts.items.visible,
                g = Math.ceil(itms.total / f) - 1;
                return 0 > b && (b = g),
                b > g && (b = 0),
                jQuerycfs.triggerHandler(cf_e("slideTo", conf), [b * f, 0, !0, c, d, e])
            }),
            jQuerycfs.bind(cf_e("jumpToStart", conf),
            function(a, b) {
                if (a.stopPropagation(), b = b ? gn_getItemIndex(b, 0, !0, itms, jQuerycfs) : 0, b += itms.first, 0 != b) {
                    if (itms.total > 0) for (; b > itms.total;) b -= itms.total;
                    jQuerycfs.prepend(jQuerycfs.children().slice(b, itms.total))
                }
                return ! 0
            }),
            jQuerycfs.bind(cf_e("synchronise", conf),
            function(a, b) {
                if (a.stopPropagation(), b) b = cf_getSynchArr(b);
                else {
                    if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                    b = opts.synchronise
                }
                for (var c = jQuerycfs.triggerHandler(cf_e("currentPosition", conf)), d = !0, e = 0, f = b.length; f > e; e++) b[e][0].triggerHandler(cf_e("slideTo", conf), [c, b[e][3], !0]) || (d = !1);
                return d
            }),
            jQuerycfs.bind(cf_e("queue", conf),
            function(a, b, c) {
                return a.stopPropagation(),
                is_function(b) ? b.call(jQuerytt0, queu) : is_array(b) ? queu = b: is_undefined(b) || queu.push([b, c]),
                queu
            }),
            jQuerycfs.bind(cf_e("insertItem", conf),
            function(a, b, c, d, e) {
                a.stopPropagation();
                var f = [b, c, d, e],
                g = ["string/object", "string/number/object", "boolean", "number"],
                h = cf_sortParams(f, g);
                if (b = h[0], c = h[1], d = h[2], e = h[3], is_object(b) && !is_jquery(b) ? b = jQuery(b) : is_string(b) && (b = jQuery(b)), !is_jquery(b) || 0 == b.length) return debug(conf, "Not a valid object.");
                is_undefined(c) && (c = "end"),
                sz_storeMargin(b, opts),
                sz_storeOrigCss(b);
                var i = c,
                j = "before";
                "end" == c ? d ? (0 == itms.first ? (c = itms.total - 1, j = "after") : (c = itms.first, itms.first += b.length), 0 > c && (c = 0)) : (c = itms.total - 1, j = "after") : c = gn_getItemIndex(c, e, d, itms, jQuerycfs);
                var k = jQuerycfs.children().eq(c);
                return k.length ? k[j](b) : (debug(conf, "Correct insert-position not found! Appending item to the end."), jQuerycfs.append(b)),
                "end" == i || d || itms.first > c && (itms.first += b.length),
                itms.total = jQuerycfs.children().length,
                itms.first >= itms.total && (itms.first -= itms.total),
                jQuerycfs.trigger(cf_e("updateSizes", conf)),
                jQuerycfs.trigger(cf_e("linkAnchors", conf)),
                !0
            }),
            jQuerycfs.bind(cf_e("removeItem", conf),
            function(a, b, c, d) {
                a.stopPropagation();
                var e = [b, c, d],
                f = ["string/number/object", "boolean", "number"],
                g = cf_sortParams(e, f);
                if (b = g[0], c = g[1], d = g[2], b instanceof jQuery && b.length > 1) return i = jQuery(),
                b.each(function() {
                    var e = jQuerycfs.trigger(cf_e("removeItem", conf), [jQuery(this), c, d]);
                    e && (i = i.add(e))
                }),
                i;
                if (is_undefined(b) || "end" == b) i = jQuerycfs.children().last();
                else {
                    b = gn_getItemIndex(b, d, c, itms, jQuerycfs);
                    var i = jQuerycfs.children().eq(b);
                    i.length && itms.first > b && (itms.first -= i.length)
                }
                return i && i.length && (i.detach(), itms.total = jQuerycfs.children().length, jQuerycfs.trigger(cf_e("updateSizes", conf))),
                i
            }),
            jQuerycfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf),
            function(a, b) {
                a.stopPropagation();
                var c = a.type.slice(conf.events.prefix.length);
                return is_array(b) && (clbk[c] = b),
                is_function(b) && clbk[c].push(b),
                clbk[c]
            }),
            jQuerycfs.bind(cf_e("currentPosition", conf),
            function(a, b) {
                if (a.stopPropagation(), 0 == itms.first) var c = 0;
                else var c = itms.total - itms.first;
                return is_function(b) && b.call(jQuerytt0, c),
                c
            }),
            jQuerycfs.bind(cf_e("currentPage", conf),
            function(a, b) {
                a.stopPropagation();
                var e, c = opts.pagination.items || opts.items.visible,
                d = Math.ceil(itms.total / c - 1);
                return e = 0 == itms.first ? 0 : itms.first < itms.total % c ? 0 : itms.first != c || opts.circular ? Math.round((itms.total - itms.first) / c) : d,
                0 > e && (e = 0),
                e > d && (e = d),
                is_function(b) && b.call(jQuerytt0, e),
                e
            }),
            jQuerycfs.bind(cf_e("currentVisible", conf),
            function(a, b) {
                a.stopPropagation();
                var c = gi_getCurrentItems(jQuerycfs.children(), opts);
                return is_function(b) && b.call(jQuerytt0, c),
                c
            }),
            jQuerycfs.bind(cf_e("slice", conf),
            function(a, b, c, d) {
                if (a.stopPropagation(), 0 == itms.total) return ! 1;
                var e = [b, c, d],
                f = ["number", "number", "function"],
                g = cf_sortParams(e, f);
                if (b = is_number(g[0]) ? g[0] : 0, c = is_number(g[1]) ? g[1] : itms.total, d = g[2], b += itms.first, c += itms.first, items.total > 0) {
                    for (; b > itms.total;) b -= itms.total;
                    for (; c > itms.total;) c -= itms.total;
                    for (; 0 > b;) b += itms.total;
                    for (; 0 > c;) c += itms.total
                }
                var i, h = jQuerycfs.children();
                return i = c > b ? h.slice(b, c) : jQuery(h.slice(b, itms.total).get().concat(h.slice(0, c).get())),
                is_function(d) && d.call(jQuerytt0, i),
                i
            }),
            jQuerycfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf),
            function(a, b) {
                a.stopPropagation();
                var c = a.type.slice(conf.events.prefix.length),
                d = crsl[c];
                return is_function(b) && b.call(jQuerytt0, d),
                d
            }),
            jQuerycfs.bind(cf_e("configuration", conf),
            function(e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call(jQuerytt0, opts);
                else if (is_object(a)) opts_orig = jQuery.extend(!0, {},
                opts_orig, a),
                b !== !1 ? reInit = !0 : opts = jQuery.extend(!0, {},
                opts, a);
                else if (!is_undefined(a)) if (is_function(b)) {
                    var val = eval("opts." + a);
                    is_undefined(val) && (val = ""),
                    b.call(jQuerytt0, val)
                } else {
                    if (is_undefined(b)) return eval("opts." + a);
                    "boolean" != typeof c && (c = !0),
                    eval("opts_orig." + a + " = b"),
                    c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                }
                if (reInit) {
                    sz_resetMargin(jQuerycfs.children(), opts),
                    FN._init(opts_orig),
                    FN._bind_buttons();
                    var sz = sz_setSizes(jQuerycfs, opts);
                    jQuerycfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                }
                return opts
            }),
            jQuerycfs.bind(cf_e("linkAnchors", conf),
            function(a, b, c) {
                return a.stopPropagation(),
                is_undefined(b) ? b = jQuery("body") : is_string(b) && (b = jQuery(b)),
                is_jquery(b) && 0 != b.length ? (is_string(c) || (c = "a.caroufredsel"), b.find(c).each(function() {
                    var a = this.hash || "";
                    a.length > 0 && -1 != jQuerycfs.children().index(jQuery(a)) && jQuery(this).unbind("click").click(function(b) {
                        b.preventDefault(),
                        jQuerycfs.trigger(cf_e("slideTo", conf), a)
                    })
                }), !0) : debug(conf, "Not a valid object.")
            }),
            jQuerycfs.bind(cf_e("updatePageStatus", conf),
            function(a, b) {
                if (a.stopPropagation(), opts.pagination.container) {
                    var d = opts.pagination.items || opts.items.visible,
                    e = Math.ceil(itms.total / d);
                    b && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                        for (var a = 0; e > a; a++) {
                            var b = jQuerycfs.children().eq(gn_getItemIndex(a * d, 0, !0, itms, jQuerycfs));
                            jQuery(this).append(opts.pagination.anchorBuilder.call(b[0], a + 1))
							
                        }
                    })), opts.pagination.container.each(function() {
                        jQuery(this).children().unbind(opts.pagination.event).each(function(a) {
                            jQuery(this).bind(opts.pagination.event,
                            function(b) {
                                b.preventDefault(),
                                jQuerycfs.trigger(cf_e("slideTo", conf), [a * d, -opts.pagination.deviation, !0, opts.pagination])
                            })
                        })
                    }));
                    var f = jQuerycfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                    return f >= e && (f = 0),
                    0 > f && (f = e - 1),
                    opts.pagination.container.each(function() {
                        jQuery(this).children().removeClass(cf_c("selected", conf)).eq(f).addClass(cf_c("selected", conf));
					
						
							
                    }),
                    !0
                }
            }),
            jQuerycfs.bind(cf_e("updateSizes", conf),
            function() {
                var b = opts.items.visible,
                c = jQuerycfs.children(),
                d = ms_getParentSize(jQuerywrp, opts, "width");
                if (itms.total = c.length, crsl.primarySizePercentage ? (opts.maxDimension = d, opts[opts.d.width] = ms_getPercentage(d, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, d), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, c, d), b = opts.items.visible, sz_setResponsiveSizes(opts, c)) : opts.items.visibleConf.variable ? b = gn_getVisibleItemsNext(c, opts, 0) : "*" != opts.items.filter && (b = gn_getVisibleItemsNextFilter(c, opts, 0)), !opts.circular && 0 != itms.first && b > itms.first) {
                    if (opts.items.visibleConf.variable) var e = gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first;
                    else if ("*" != opts.items.filter) var e = gn_getVisibleItemsPrevFilter(c, opts, itms.first) - itms.first;
                    else var e = opts.items.visible - itms.first;
                    debug(conf, "Preventing non-circular: sliding " + e + " items backward."),
                    jQuerycfs.trigger(cf_e("prev", conf), e)
                }
                opts.items.visible = cf_getItemsAdjust(b, opts, opts.items.visibleConf.adjust, jQuerytt0),
                opts.items.visibleConf.old = opts.items.visible,
                opts = in_getAlignPadding(opts, c);
                var f = sz_setSizes(jQuerycfs, opts);
                return jQuerycfs.trigger(cf_e("updatePageStatus", conf), [!0, f]),
                nv_showNavi(opts, itms.total, conf),
                nv_enableNavi(opts, itms.first, conf),
                f
            }),
            jQuerycfs.bind(cf_e("destroy", conf),
            function(a, b) {
                return a.stopPropagation(),
                tmrs = sc_clearTimers(tmrs),
                jQuerycfs.data("_cfs_isCarousel", !1),
                jQuerycfs.trigger(cf_e("finish", conf)),
                b && jQuerycfs.trigger(cf_e("jumpToStart", conf)),
                sz_restoreOrigCss(jQuerycfs.children()),
                sz_restoreOrigCss(jQuerycfs),
                FN._unbind_events(),
                FN._unbind_buttons(),
                "parent" == conf.wrapper ? sz_restoreOrigCss(jQuerywrp) : jQuerywrp.replaceWith(jQuerycfs),
                !0
            }),
            jQuerycfs.bind(cf_e("debug", conf),
            function() {
                return debug(conf, "Carousel width: " + opts.width),
                debug(conf, "Carousel height: " + opts.height),
                debug(conf, "Item widths: " + opts.items.width),
                debug(conf, "Item heights: " + opts.items.height),
                debug(conf, "Number of items visible: " + opts.items.visible),
                opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items),
                opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items),
                opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items),
                conf.debug
            }),
            jQuerycfs.bind("_cfs_triggerEvent",
            function(a, b, c) {
                return a.stopPropagation(),
                jQuerycfs.triggerHandler(cf_e(b, conf), c)
            })
        },
        FN._unbind_events = function() {
            jQuerycfs.unbind(cf_e("", conf)),
            jQuerycfs.unbind(cf_e("", conf, !1)),
            jQuerycfs.unbind("_cfs_triggerEvent")
        },
        FN._bind_buttons = function() {
            if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                jQuerywrp.bind(cf_e("mouseenter", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1),
            function(a) {
                a.preventDefault();
                var b = !1,
                c = null;
                crsl.isPaused ? b = "play": opts.auto.pauseOnEvent && (b = "pause", c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),
                b && jQuerycfs.trigger(cf_e(b, conf), c)
            }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1),
            function(a) {
                a.preventDefault(),
                jQuerycfs.trigger(cf_e("prev", conf))
            }), opts.prev.pauseOnHover)) {
                var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                opts.prev.button.bind(cf_e("mouseenter", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1),
            function(a) {
                a.preventDefault(),
                jQuerycfs.trigger(cf_e("next", conf))
            }), opts.next.pauseOnHover)) {
                var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                opts.next.button.bind(cf_e("mouseenter", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
                var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                opts.pagination.container.bind(cf_e("mouseenter", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1),
                function() {
                    jQuerycfs.trigger(cf_e("resume", conf))
                })
            }
            if ((opts.prev.key || opts.next.key) && jQuery(document).bind(cf_e("keyup", conf, !1, !0, !0),
            function(a) {
                var b = a.keyCode;
                b == opts.next.key && (a.preventDefault(), jQuerycfs.trigger(cf_e("next", conf))),
                b == opts.prev.key && (a.preventDefault(), jQuerycfs.trigger(cf_e("prev", conf)))
            }), opts.pagination.keys && jQuery(document).bind(cf_e("keyup", conf, !1, !0, !0),
            function(a) {
                var b = a.keyCode;
                b >= 49 && 58 > b && (b = (b - 49) * opts.items.visible, itms.total >= b && (a.preventDefault(), jQuerycfs.trigger(cf_e("slideTo", conf), [b, 0, !0, opts.pagination])))
            }), jQuery.fn.swipe) {
                var b = "ontouchstart" in window;
                if (b && opts.swipe.onTouch || !b && opts.swipe.onMouse) {
                    var c = jQuery.extend(!0, {},
                    opts.prev, opts.swipe),
                    d = jQuery.extend(!0, {},
                    opts.next, opts.swipe),
                    e = function() {
                        jQuerycfs.trigger(cf_e("prev", conf), [c])
                    },
                    f = function() {
                        jQuerycfs.trigger(cf_e("next", conf), [d])
                    };
                    switch (opts.direction) {
                    case "up":
                    case "down":
                        opts.swipe.options.swipeUp = f,
                        opts.swipe.options.swipeDown = e;
                        break;
                    default:
                        opts.swipe.options.swipeLeft = f,
                        opts.swipe.options.swipeRight = e
                    }
                    crsl.swipe && jQuerycfs.swipe("destroy"),
                    jQuerywrp.swipe(opts.swipe.options),
                    jQuerywrp.css("cursor", "move"),
                    crsl.swipe = !0
                }
            }
            if (jQuery.fn.mousewheel && opts.mousewheel) {
                var g = jQuery.extend(!0, {},
                opts.prev, opts.mousewheel),
                h = jQuery.extend(!0, {},
                opts.next, opts.mousewheel);
                crsl.mousewheel && jQuerywrp.unbind(cf_e("mousewheel", conf, !1)),
                jQuerywrp.bind(cf_e("mousewheel", conf, !1),
                function(a, b) {
                    a.preventDefault(),
                    b > 0 ? jQuerycfs.trigger(cf_e("prev", conf), [g]) : jQuerycfs.trigger(cf_e("next", conf), [h])
                }),
                crsl.mousewheel = !0
            }
            if (opts.auto.play && jQuerycfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                var i = function() {
                    jQuerycfs.trigger(cf_e("finish", conf)),
                    opts.auto.pauseOnResize && !crsl.isPaused && jQuerycfs.trigger(cf_e("play", conf)),
                    sz_resetMargin(jQuerycfs.children(), opts),
                    jQuerycfs.trigger(cf_e("updateSizes", conf))
                },
                j = jQuery(window),
                k = null;
                if (jQuery.debounce && "debounce" == conf.onWindowResize) k = jQuery.debounce(200, i);
                else if (jQuery.throttle && "throttle" == conf.onWindowResize) k = jQuery.throttle(300, i);
                else {
                    var l = 0,
                    m = 0;
                    k = function() {
                        var a = j.width(),
                        b = j.height(); (a != l || b != m) && (i(), l = a, m = b)
                    }
                }
                j.bind(cf_e("resize", conf, !1, !0, !0), k)
            }
        },
        FN._unbind_buttons = function() {
            var b = (cf_e("", conf), cf_e("", conf, !1));
            ns3 = cf_e("", conf, !1, !0, !0),
            jQuery(document).unbind(ns3),
            jQuery(window).unbind(ns3),
            jQuerywrp.unbind(b),
            opts.auto.button && opts.auto.button.unbind(b),
            opts.prev.button && opts.prev.button.unbind(b),
            opts.next.button && opts.next.button.unbind(b),
            opts.pagination.container && (opts.pagination.container.unbind(b), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()),
            crsl.swipe && (jQuerycfs.swipe("destroy"), jQuerywrp.css("cursor", "default"), crsl.swipe = !1),
            crsl.mousewheel && (crsl.mousewheel = !1),
            nv_showNavi(opts, "hide", conf),
            nv_enableNavi(opts, "removeClass", conf)
        },
        is_boolean(configs) && (configs = {
            debug: configs
        });
        var crsl = {
            direction: "next",
            isPaused: !0,
            isScrolling: !1,
            isStopped: !1,
            mousewheel: !1,
            swipe: !1
        },
        itms = {
            total: jQuerycfs.children().length,
            first: 0
        },
        tmrs = {
            auto: null,
            progress: null,
            startTime: getTime(),
            timePassed: 0
        },
        scrl = {
            isStopped: !1,
            duration: 0,
            startTime: 0,
            easing: "",
            anims: []
        },
        clbk = {
            onBefore: [],
            onAfter: []
        },
        queu = [],
        conf = jQuery.extend(!0, {},
        jQuery.fn.carouFredSel.configs, configs),
        opts = {},
        opts_orig = jQuery.extend(!0, {},
        options),
        jQuerywrp = "parent" == conf.wrapper ? jQuerycfs.parent() : jQuerycfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        if (conf.selector = jQuerycfs.selector, conf.serialNumber = jQuery.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && jQuery.fn.transition ? "transition": "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
        else {
            var start_arr = [];
            0 != opts.items.start && start_arr.push(opts.items.start)
        }
        if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0) for (var a = 0,
        l = start_arr.length; l > a; a++) {
            var s = start_arr[a];
            if (0 != s) {
                if (s === !0) {
                    if (s = window.location.hash, 1 > s.length) continue
                } else "random" === s && (s = Math.floor(Math.random() * itms.total));
                if (jQuerycfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                    fx: "none"
                }])) break
            }
        }
        var siz = sz_setSizes(jQuerycfs, opts),
        itm = gi_getCurrentItems(jQuerycfs.children(), opts);
        return opts.onCreate && opts.onCreate.call(jQuerytt0, {
            width: siz.width,
            height: siz.height,
            items: itm
        }),
        jQuerycfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]),
        jQuerycfs.trigger(cf_e("linkAnchors", conf)),
        conf.debug && jQuerycfs.trigger(cf_e("debug", conf)),
        jQuerycfs
    },
    jQuery.fn.carouFredSel.serialNumber = 1, jQuery.fn.carouFredSel.defaults = {
        synchronise: !1,
        infinite: !0,
        circular: !0,
        responsive: !1,
        direction: "left",
        items: {
            start: 0
        },
        scroll: {
            easing: "swing",
            duration: 500,
            pauseOnHover: !1,
            event: "click",
            queue: !1
        }
    },
    jQuery.fn.carouFredSel.configs = {
        debug: !1,
        transition: !1,
        onWindowResize: "throttle",
        events: {
            prefix: "",
            namespace: "cfs"
        },
        wrapper: {
            element: "div",
            classname: "caroufredsel_wrapper"
        },
        classnames: {}
    },
    jQuery.fn.carouFredSel.pageAnchorBuilder = function(a) {
        return '<a href="javascript:void(null)"><span>' + a + "</span></a>"
    },
    jQuery.fn.carouFredSel.progressbarUpdater = function(a) {
        jQuery(this).css("width", a + "%")
    },
    jQuery.fn.carouFredSel.cookie = {
        get: function(a) {
            a += "=";
            for (var b = document.cookie.split(";"), c = 0, d = b.length; d > c; c++) {
                for (var e = b[c];
                " " == e.charAt(0);) e = e.slice(1);
                if (0 == e.indexOf(a)) return e.slice(a.length)
            }
            return 0
        },
        set: function(a, b, c) {
            var d = "";
            if (c) {
                var e = new Date;
                e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c),
                d = "; expires=" + e.toGMTString()
            }
            document.cookie = a + "=" + b + d + "; path=/"
        },
        remove: function(a) {
            jQuery.fn.carouFredSel.cookie.set(a, "", -1)
        }
    },
    jQuery.extend(jQuery.easing, {
        quadratic: function(a) {
            var b = a * a;
            return a * ( - b * a + 4 * b - 6 * a + 4)
        },
        cubic: function(a) {
            return a * (4 * a * a - 9 * a + 6)
        },
        elastic: function(a) {
            var b = a * a;
            return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15)
        }
    }))
})(jQuery);