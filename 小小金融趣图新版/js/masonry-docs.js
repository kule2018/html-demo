(function (t) {
    "use strict";
    function e(t) {
        return RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }

    function i(t, e) {
        var i = n(t, e) ? r : o;
        i(t, e)
    }

    var n, o, r;
    "classList" in document.documentElement ? (n = function (t, e) {
        return t.classList.contains(e)
    }, o = function (t, e) {
        t.classList.add(e)
    }, r = function (t, e) {
        t.classList.remove(e)
    }) : (n = function (t, i) {
        return e(i).test(t.className)
    }, o = function (t, e) {
        n(t, e) || (t.className = t.className + " " + e)
    }, r = function (t, i) {
        t.className = t.className.replace(e(i), " ")
    });
    var s = {hasClass: n, addClass: o, removeClass: r, toggleClass: i, has: n, add: o, remove: r, toggle: i};
    "function" == typeof define && define.amd ? define(s) : t.classie = s
})(window), function (t) {
    "use strict";
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }

    var i = document.documentElement, n = function () {
    };
    i.addEventListener ? n = function (t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (n = function (t, i, n) {
        t[i + n] = n.handleEvent ? function () {
            var i = e(t);
            n.handleEvent.call(n, i)
        } : function () {
            var i = e(t);
            n.call(t, i)
        }, t.attachEvent("on" + i, t[i + n])
    });
    var o = function () {
    };
    i.removeEventListener ? o = function (t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (o = function (t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (n) {
            t[e + i] = void 0
        }
    });
    var r = {bind: n, unbind: o};
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this), function (t) {
    "use strict";
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== o.readyState;
        if (!e.isReady && !i) {
            e.isReady = !0;
            for (var n = 0, s = r.length; s > n; n++) {
                var a = r[n];
                a()
            }
        }
    }

    function n(n) {
        return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e
    }

    var o = t.document, r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define(["eventie/eventie"], n)) : t.docReady = n(t.eventie)
}(this), function (t) {
    "use strict";
    function e(t) {
        if (t) {
            if ("string" == typeof n[t])return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, o = 0, r = i.length; r > o; o++)if (e = i[o] + t, "string" == typeof n[e])return e
        }
    }

    var i = "Webkit Moz ms Ms O".split(" "), n = document.documentElement.style;
    "function" == typeof define && define.amd ? define(function () {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function () {
    "use strict";
    function t() {
    }

    function e(t, e) {
        for (var i = t.length; i--;)if (t[i].listener === e)return i;
        return -1
    }

    function i(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }

    var n = t.prototype, o = this, r = o.EventEmitter;
    n.getListeners = function (t) {
        var e, i, n = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in n)n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function (t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1)i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function (t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function (t, i) {
        var n, o = this.getListenersAsObject(t), r = "object" == typeof i;
        for (n in o)o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {listener: i, once: !1});
        return this
    }, n.on = i("addListener"), n.addOnceListener = function (t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, n.once = i("addOnceListener"), n.defineEvent = function (t) {
        return this.getListeners(t), this
    }, n.defineEvents = function (t) {
        for (var e = 0; t.length > e; e += 1)this.defineEvent(t[e]);
        return this
    }, n.removeListener = function (t, i) {
        var n, o, r = this.getListenersAsObject(t);
        for (o in r)r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function (t, e, i) {
        var n, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)for (n = i.length; n--;)r.call(this, e, i[n]); else for (n in e)e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
        return this
    }, n.removeEvent = function (t) {
        var e, i = typeof t, n = this._getEvents();
        if ("string" === i)delete n[t]; else if (t instanceof RegExp)for (e in n)n.hasOwnProperty(e) && t.test(e) && delete n[e]; else delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (t, e) {
        var i, n, o, r, s = this.getListenersAsObject(t);
        for (o in s)if (s.hasOwnProperty(o))for (n = s[o].length; n--;)i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define(function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (i, n) {
        return e(t, i, n)
    }) : "object" == typeof exports ? module.exports = e(t, require("eventEmitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
}(this, function (t, e, i) {
    "use strict";
    function n(t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }

    function o(t) {
        return "[object Array]" === d.call(t)
    }

    function r(t) {
        var e = [];
        if (o(t))e = t; else if ("number" == typeof t.length)for (var i = 0, n = t.length; n > i; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function s(t, e, i) {
        if (!(this instanceof s))return new s(t, e);
        "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), h && (this.jqDeferred = new h.Deferred);
        var o = this;
        setTimeout(function () {
            o.check()
        })
    }

    function a(t) {
        this.img = t
    }

    function u(t) {
        this.src = t, l[t] = this
    }

    var h = t.jQuery, c = t.console, p = c !== void 0, d = Object.prototype.toString;
    s.prototype = new e, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var t = 0, e = this.elements.length; e > t; t++) {
            var i = this.elements[t];
            "IMG" === i.nodeName && this.addImage(i);
            for (var n = i.querySelectorAll("img"), o = 0, r = n.length; r > o; o++) {
                var s = n[o];
                this.addImage(s)
            }
        }
    }, s.prototype.addImage = function (t) {
        var e = new a(t);
        this.images.push(e)
    }, s.prototype.check = function () {
        function t(t, o) {
            return e.options.debug && p && c.log("confirm", t, o), e.progress(t), i++, i === n && e.complete(), !0
        }

        var e = this, i = 0, n = this.images.length;
        if (this.hasAnyBroken = !1, !n)return this.complete(), void 0;
        for (var o = 0; n > o; o++) {
            var r = this.images[o];
            r.on("confirm", t), r.check()
        }
    }, s.prototype.progress = function (t) {
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
        var e = this;
        setTimeout(function () {
            e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
        })
    }, s.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var e = this;
        setTimeout(function () {
            if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                var i = e.hasAnyBroken ? "reject" : "resolve";
                e.jqDeferred[i](e)
            }
        })
    }, h && (h.fn.imagesLoaded = function (t, e) {
        var i = new s(this, t, e);
        return i.jqDeferred.promise(h(this))
    }), a.prototype = new e, a.prototype.check = function () {
        var t = l[this.img.src] || new u(this.img.src);
        if (t.isConfirmed)return this.confirm(t.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
        var e = this;
        t.on("confirm", function (t, i) {
            return e.confirm(t.isLoaded, i), !0
        }), t.check()
    }, a.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emit("confirm", this, e)
    };
    var l = {};
    return u.prototype = new e, u.prototype.check = function () {
        if (!this.isChecked) {
            var t = new Image;
            i.bind(t, "load", this), i.bind(t, "error", this), t.src = this.src, this.isChecked = !0
        }
    }, u.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, u.prototype.onload = function (t) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(t)
    }, u.prototype.onerror = function (t) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
    }, u.prototype.confirm = function (t, e) {
        this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
    }, u.prototype.unbindProxyEvents = function (t) {
        i.unbind(t.target, "load", this), i.unbind(t.target, "error", this)
    }, s
}), function (t) {
    "use strict";
    function e() {
    }

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function (e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, i) {
            t.fn[e] = function (o) {
                if ("string" == typeof o) {
                    for (var s = n.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                        var h = this[a], c = t.data(h, e);
                        if (c)if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                            var p = c[o].apply(c, s);
                            if (void 0 !== p)return p
                        } else r("no such method '" + o + "' for " + e + " instance"); else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var n = t.data(this, e);
                    n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
                })
            }
        }

        if (t) {
            var r = "undefined" == typeof console ? e : function (t) {
                console.error(t)
            };
            return t.bridget = function (t, e) {
                i(e), o(t, e)
            }, t.bridget
        }
    }

    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
}(window), function (t) {
    "use strict";
    function e(t) {
        var e = parseFloat(t), i = -1 === t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, i = s.length; i > e; e++) {
            var n = s[e];
            t[n] = 0
        }
        return t
    }

    function n(t) {
        function n(t) {
            if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var n = r(t);
                if ("none" === n.display)return i();
                var o = {};
                o.width = t.offsetWidth, o.height = t.offsetHeight;
                for (var c = o.isBorderBox = !(!h || !n[h] || "border-box" !== n[h]), p = 0, d = s.length; d > p; p++) {
                    var l = s[p], f = n[l];
                    f = a(t, f);
                    var m = parseFloat(f);
                    o[l] = isNaN(m) ? 0 : m
                }
                var y = o.paddingLeft + o.paddingRight, g = o.paddingTop + o.paddingBottom, v = o.marginLeft + o.marginRight, b = o.marginTop + o.marginBottom, E = o.borderLeftWidth + o.borderRightWidth, w = o.borderTopWidth + o.borderBottomWidth, L = c && u, S = e(n.width);
                S !== !1 && (o.width = S + (L ? 0 : y + E));
                var x = e(n.height);
                return x !== !1 && (o.height = x + (L ? 0 : g + w)), o.innerWidth = o.width - (y + E), o.innerHeight = o.height - (g + w), o.outerWidth = o.width + v, o.outerHeight = o.height + b, o
            }
        }

        function a(t, e) {
            if (o || -1 === e.indexOf("%"))return e;
            var i = t.style, n = i.left, r = t.runtimeStyle, s = r && r.left;
            return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = n, s && (r.left = s), e
        }

        var u, h = t("boxSizing");
        return function () {
            if (h) {
                var t = document.createElement("div");
                t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[h] = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(t);
                var n = r(t);
                u = 200 === e(n.width), i.removeChild(t)
            }
        }(), n
    }

    var o = t.getComputedStyle, r = o ? function (t) {
        return o(t, null)
    } : function (t) {
        return t.currentStyle
    }, s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define(["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("get-style-property")) : t.getSize = n(t.getStyleProperty)
}(window), function (t, e) {
    "use strict";
    function i(t, e) {
        return t[a](e)
    }

    function n(t) {
        if (!t.parentNode) {
            var e = document.createDocumentFragment();
            e.appendChild(t)
        }
    }

    function o(t, e) {
        n(t);
        for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++)if (i[o] === t)return !0;
        return !1
    }

    function r(t, e) {
        return n(t), i(t, e)
    }

    var s, a = function () {
        if (e.matchesSelector)return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) {
            var o = t[i], r = o + "MatchesSelector";
            if (e[r])return r
        }
    }();
    if (a) {
        var u = document.createElement("div"), h = i(u, "div");
        s = h ? i : r
    } else s = o;
    "function" == typeof define && define.amd ? define(function () {
        return s
    }) : window.matchesSelector = s
}(this, Element.prototype), function (t) {
    "use strict";
    function e(t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }

    function i(t) {
        for (var e in t)return !1;
        return e = null, !0
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    function o(t, o, r) {
        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }

        var u = r("transition"), h = r("transform"), c = u && h, p = !!r("perspective"), d = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[u], l = ["transform", "transition", "transitionDuration", "transitionProperty"], f = function () {
            for (var t = {}, e = 0, i = l.length; i > e; e++) {
                var n = l[e], o = r(n);
                o && o !== n && (t[n] = o)
            }
            return t
        }();
        e(a.prototype, t.prototype), a.prototype._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, a.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function () {
            this.size = o(this.element)
        }, a.prototype.css = function (t) {
            var e = this.element.style;
            for (var i in t) {
                var n = f[i] || i;
                e[n] = t[i]
            }
        }, a.prototype.getPosition = function () {
            var t = s(this.element), e = this.layout.options, i = e.isOriginLeft, n = e.isOriginTop, o = parseInt(t[i ? "left" : "right"], 10), r = parseInt(t[n ? "top" : "bottom"], 10);
            o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r;
            var a = this.layout.size;
            o -= i ? a.paddingLeft : a.paddingRight, r -= n ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r
        }, a.prototype.layoutPosition = function () {
            var t = this.layout.size, e = this.layout.options, i = {};
            e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
        };
        var m = p ? function (t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)"
        } : function (t, e) {
            return "translate(" + t + "px, " + e + "px)"
        };
        a.prototype._transitionTo = function (t, e) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y;
            if (this.setPosition(t, e), s && !this.isTransitioning)return this.layoutPosition(), void 0;
            var a = t - i, u = e - n, h = {}, c = this.layout.options;
            a = c.isOriginLeft ? a : -a, u = c.isOriginTop ? u : -u, h.transform = m(a, u), this.transition({
                to: h,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        }, a.prototype.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = c ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t), void 0;
            var e = this._transn;
            for (var i in t.onTransitionEnd)e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var y = h && n(h) + ",opacity";
        a.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({
                transitionProperty: y,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(d, this, !1))
        }, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function (t) {
            this.ontransitionend(t)
        };
        var g = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        a.prototype.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn, n = g[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                    var o = e.onEnd[n];
                    o.call(this), delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function (t) {
            var e = {};
            for (var i in t)e[i] = "";
            this.css(e)
        };
        var v = {transitionProperty: "", transitionDuration: ""};
        return a.prototype.removeTransitionStyles = function () {
            this.css(v)
        }, a.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, a.prototype.remove = function () {
            if (!u || !parseFloat(this.layout.options.transitionDuration))return this.removeElem(), void 0;
            var t = this;
            this.on("transitionEnd", function () {
                return t.removeElem(), !0
            }), this.hide()
        }, a.prototype.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options;
            this.transition({from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0})
        }, a.prototype.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options;
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function () {
                        this.isHidden && this.css({display: "none"})
                    }
                }
            })
        }, a.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, a
    }

    var r = t.getComputedStyle, s = r ? function (t) {
        return r(t, null)
    } : function (t) {
        return t.currentStyle
    };
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : (t.Outlayer = {}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function (t) {
    "use strict";
    function e(t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }

    function i(t) {
        return "[object Array]" === p.call(t)
    }

    function n(t) {
        var e = [];
        if (i(t))e = t; else if (t && "number" == typeof t.length)for (var n = 0, o = t.length; o > n; n++)e.push(t[n]); else e.push(t);
        return e
    }

    function o(t, e) {
        var i = l(e, t);
        -1 !== i && e.splice(i, 1)
    }

    function r(t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }

    function s(i, s, p, l, f, m) {
        function y(t, i) {
            if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t))return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
            this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
            var n = ++g;
            this.element.outlayerGUID = n, v[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var g = 0, v = {};
        return y.namespace = "outlayer", y.Item = m, y.defaults = {
            containerStyle: {position: "relative"},
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        }, e(y.prototype, p.prototype), y.prototype.option = function (t) {
            e(this.options, t)
        }, y.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, y.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, y.prototype._itemize = function (t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0, r = e.length; r > o; o++) {
                var s = e[o], a = new i(s, this);
                n.push(a)
            }
            return n
        }, y.prototype._filterFindItemElements = function (t) {
            t = n(t);
            for (var e = this.options.itemSelector, i = [], o = 0, r = t.length; r > o; o++) {
                var s = t[o];
                if (d(s))if (e) {
                    f(s, e) && i.push(s);
                    for (var a = s.querySelectorAll(e), u = 0, h = a.length; h > u; u++)i.push(a[u])
                } else i.push(s)
            }
            return i
        }, y.prototype.getItemElements = function () {
            for (var t = [], e = 0, i = this.items.length; i > e; e++)t.push(this.items[e].element);
            return t
        }, y.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function () {
            this.getSize()
        }, y.prototype.getSize = function () {
            this.size = l(this.element)
        }, y.prototype._getMeasurement = function (t, e) {
            var i, n = this.options[t];
            n ? ("string" == typeof n ? i = this.element.querySelector(n) : d(n) && (i = n), this[t] = i ? l(i)[e] : n) : this[t] = 0
        }, y.prototype.layoutItems = function (t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, y.prototype._getItemsForLayout = function (t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i];
                o.isIgnored || e.push(o)
            }
            return e
        }, y.prototype._layoutItems = function (t, e) {
            function i() {
                n.emitEvent("layoutComplete", [n, t])
            }

            var n = this;
            if (!t || !t.length)return i(), void 0;
            this._itemsOn(t, "layout", i);
            for (var o = [], r = 0, s = t.length; s > r; r++) {
                var a = t[r], u = this._getItemLayoutPosition(a);
                u.item = a, u.isInstant = e || a.isLayoutInstant, o.push(u)
            }
            this._processLayoutQueue(o)
        }, y.prototype._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, y.prototype._processLayoutQueue = function (t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, y.prototype._positionItem = function (t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, y.prototype._postLayout = function () {
            this.resizeContainer()
        }, y.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, y.prototype._getContainerSize = c, y.prototype._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, y.prototype._itemsOn = function (t, e, i) {
            function n() {
                return o++, o === r && i.call(s), !0
            }

            for (var o = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
                var h = t[a];
                h.on(e, n)
            }
        }, y.prototype.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, y.prototype.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, y.prototype.stamp = function (t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, y.prototype.unstamp = function (t) {
            if (t = this._find(t))for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                o(n, this.stamps), this.unignore(n)
            }
        }, y.prototype._find = function (t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0
        }, y.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, y.prototype._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, y.prototype._manageStamp = c, y.prototype._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(), i = this._boundingRect, n = l(t), o = {
                left: e.left - i.left - n.marginLeft,
                top: e.top - i.top - n.marginTop,
                right: i.right - e.right - n.marginRight,
                bottom: i.bottom - e.bottom - n.marginBottom
            };
            return o
        }, y.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, y.prototype.bindResize = function () {
            this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
        }, y.prototype.unbindResize = function () {
            this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
        }, y.prototype.onresize = function () {
            function t() {
                e.resize(), delete e.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, y.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, y.prototype.needsResizeLayout = function () {
            var t = l(this.element), e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, y.prototype.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, y.prototype.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, y.prototype.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, y.prototype.reveal = function (t) {
            var e = t && t.length;
            if (e)for (var i = 0; e > i; i++) {
                var n = t[i];
                n.reveal()
            }
        }, y.prototype.hide = function (t) {
            var e = t && t.length;
            if (e)for (var i = 0; e > i; i++) {
                var n = t[i];
                n.hide()
            }
        }, y.prototype.getItem = function (t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t)return n
            }
        }, y.prototype.getItems = function (t) {
            if (t && t.length) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var o = t[i], r = this.getItem(o);
                    r && e.push(r)
                }
                return e
            }
        }, y.prototype.remove = function (t) {
            t = n(t);
            var e = this.getItems(t);
            if (e && e.length) {
                this._itemsOn(e, "remove", function () {
                    this.emitEvent("removeComplete", [this, e])
                });
                for (var i = 0, r = e.length; r > i; i++) {
                    var s = e[i];
                    s.remove(), o(s, this.items)
                }
            }
        }, y.prototype.destroy = function () {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize(), delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
        }, y.data = function (t) {
            var e = t && t.outlayerGUID;
            return e && v[e]
        }, y.create = function (t, i) {
            function n() {
                y.apply(this, arguments)
            }

            return Object.create ? n.prototype = Object.create(y.prototype) : e(n.prototype, y.prototype), n.prototype.constructor = n, n.defaults = e({}, y.defaults), e(n.defaults, i), n.prototype.settings = {}, n.namespace = t, n.data = y.data, n.Item = function () {
                m.apply(this, arguments)
            }, n.Item.prototype = new m, s(function () {
                for (var e = r(t), i = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", s = 0, c = i.length; c > s; s++) {
                    var p, d = i[s], l = d.getAttribute(o);
                    try {
                        p = l && JSON.parse(l)
                    } catch (f) {
                        u && u.error("Error parsing " + o + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + f);
                        continue
                    }
                    var m = new n(d, p);
                    h && h.data(d, t, m)
                }
            }), h && h.bridget && h.bridget(t, n), n
        }, y.Item = m, y
    }

    var a = t.document, u = t.console, h = t.jQuery, c = function () {
    }, p = Object.prototype.toString, d = "object" == typeof HTMLElement ? function (t) {
        return t instanceof HTMLElement
    } : function (t) {
        return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
    }, l = Array.prototype.indexOf ? function (t, e) {
        return t.indexOf(e)
    } : function (t, e) {
        for (var i = 0, n = t.length; n > i; i++)if (t[i] === e)return i;
        return -1
    };
    "function" == typeof define && define.amd ? define(["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function (t) {
    "use strict";
    function e(t, e) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;)this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, n.prototype.getContainerWidth = function () {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element, i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth, n = e && 1 > e ? "round" : "ceil", o = Math[n](t.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var r = this._getColGroup(o), s = Math.min.apply(Math, r), a = i(r, s), u = {
                x: this.columnWidth * a,
                y: s
            }, h = s + t.size.outerHeight, c = this.cols + 1 - r.length, p = 0; c > p; p++)this.colYs[a + p] = h;
            return u
        }, n.prototype._getColGroup = function (t) {
            if (2 > t)return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, o)
            }
            return e
        }, n.prototype._manageStamp = function (t) {
            var i = e(t), n = this._getElementOffset(t), o = this.options.isOriginLeft ? n.left : n.right, r = o + i.outerWidth, s = Math.floor(o / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var u = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, h = s; a >= h; h++)this.colYs[h] = Math.max(u, this.colYs[h])
        }, n.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, n
    }

    var i = Array.prototype.indexOf ? function (t, e) {
        return t.indexOf(e)
    } : function (t, e) {
        for (var i = 0, n = t.length; n > i; i++) {
            var o = t[i];
            if (o === e)return i
        }
        return -1
    };
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
}(window), function (t) {
    "use strict";
    function e(t, e) {
        t[s] = e
    }

    var i = t.MD = {};
    i.pages = {};
    var n;
    docReady(function () {
        n = document.querySelector("#notification");
        var t = document.body.getAttribute("data-page");
        t && "function" == typeof i[t] && i[t]()
    }), i.getSomeItemElements = function () {
        for (var t = document.createDocumentFragment(), e = [], i = 0; 3 > i; i++) {
            var n = document.createElement("div"), o = Math.random(), r = o > .85 ? "w4" : o > .7 ? "w2" : "", s = Math.random(), a = s > .85 ? "h4" : s > .7 ? "h2" : "";
            n.className = "item " + r + " " + a, t.appendChild(n), e.push(n)
        }
    };
    var o, r = document.documentElement, s = void 0 !== r.textContent ? "textContent" : "innerText", a = getStyleProperty("transition"), u = a ? 1e3 : 1500;
    i.notify = function (t, r) {
        e(n, t), a && (n.style[a] = "none"), n.style.display = "block", n.style.opacity = "1", r && (o && clearTimeout(o), o = setTimeout(i.hideNotify, u))
    }, i.hideNotify = function () {
        a ? (n.style[a] = "opacity 1.0s", n.style.opacity = "0") : n.style.display = "none"
    }
}(window), function (t) {
    "use strict";
    function e() {
        var t = new Date, e = t.getMinutes();
        e = 10 > e ? "0" + e : e;
        var i = t.getSeconds();
        return i = 10 > i ? "0" + i : i, [t.getHours(), e, i].join(":")
    }

    function i(t) {
        n.notify(t + " at " + e(), !0)
    }

    var n = t.MD;
    n.events = function () {
        (function () {
            var t = document.querySelector("#layout-complete-demo .masonry"), e = new Masonry(t, {columnWidth: 60});
            e.on("layoutComplete", function (t, e) {
                i("Masonry layout completed on " + e.length + " items")
            }), eventie.bind(t, "click", function (t) {
                classie.has(t.target, "item") && (classie.toggle(t.target, "gigante"), e.layout())
            })
        })(), function () {
            var t = document.querySelector("#remove-complete-demo .masonry"), e = new Masonry(t, {columnWidth: 60});
            e.on("removeComplete", function (t, e) {
                i("Removed " + e.length + " items")
            }), eventie.bind(t, "click", function (t) {
                classie.has(t.target, "item") && e.remove(t.target)
            })
        }()
    }
}(window), function (t) {
    "use strict";
    var e = t.MD, i = getStyleProperty("transition"), n = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
    }[i];
    e.faq = function () {
        (function () {
            var t = document.querySelector("#animate-item-size .masonry"), e = new Masonry(t, {columnWidth: 60});
            eventie.bind(t, "click", function (t) {
                var i = t.target;
                if (classie.has(i, "item-content")) {
                    var n = i.parentNode;
                    classie.toggleClass(n, "is-expanded"), e.layout()
                }
            })
        })(), function () {
            var t = document.querySelector("#animate-item-size-responsive .masonry"), e = new Masonry(t, {
                columnWidth: ".grid-sizer",
                itemSelector: ".item"
            });
            eventie.bind(t, "click", function (t) {
                var o = t.target;
                if (classie.has(o, "item-content")) {
                    var r = getSize(o);
                    o.style[i] = "none", o.style.width = r.width + "px", o.style.height = r.height + "px";
                    var s = o.parentNode;
                    classie.toggleClass(s, "is-expanded");
                    var a = o.offsetWidth;
                    if (o.style[i] = "", i) {
                        var u = function () {
                            o.style.width = "", o.style.height = "", o.removeEventListener(n, u, !1)
                        };
                        o.addEventListener(n, u, !1)
                    }
                    var h = getSize(s);
                    o.style.width = h.width + "px", o.style.height = h.height + "px", a = null, e.layout()
                }
            })
        }()
    }
}(window), function (t) {
    "use strict";
    function e() {
        for (var t = [], e = document.createDocumentFragment(), r = a, s = 0, u = r.length; u > s; s++) {
            var h = i(r[s]);
            t.push(h), e.appendChild(h)
        }
        imagesLoaded(e).on("progress", function (t, e) {
            var i = e.img.parentNode.parentNode;
            n.appendChild(i), o.appended(i)
        })
    }

    function i(t) {
        var e = document.createElement("div");
        e.className = "hero-item has-example is-hidden";
        var i = document.createElement("a");
        i.href = t.url;
        var n = document.createElement("img");
        n.src = t.image;
        var o = document.createElement("p");
        return o.className = "example-title", o.textContent = t.title, i.appendChild(n), i.appendChild(o), e.appendChild(i), e
    }

    var n, o, r, s = t.MD;
    s.index = function () {
        (function () {
            var t = document.querySelector("#hero");
            n = t.querySelector(".hero-masonry"), o = new Masonry(n, {
                itemSelector: ".hero-item",
                columnWidth: ".grid-sizer"
            }), e()
        })(), r = document.querySelector("#load-more-examples")
    };
    var a = [{
        title: "Erik Johansson",
        url: "http://erikjohanssonphoto.com/work/imagecats/personal/",
        image: "http://i.imgur.com/6Lo8oun.jpg"
    }, {
        title: "Tumblr Staff: Archive",
        url: "http://staff.tumblr.com/archive",
        image: "http://i.imgur.com/igjvRa3.jpg"
    }, {
        title: "Halcyon theme",
        url: "http://halcyon-theme.tumblr.com/",
        image: "http://i.imgur.com/A1RSOhg.jpg"
    }, {
        title: "RESIZE.THATSH.IT",
        url: "http://resize.thatsh.it/",
        image: "http://i.imgur.com/00xWxLG.png"
    }, {
        title: "Vox Media",
        url: "http://www.voxmedia.com",
        image: "http://i.imgur.com/xSiTFij.jpg"
    }, {
        title: "Kristian Hammerstad",
        url: "http://www.kristianhammerstad.com/",
        image: "http://i.imgur.com/Zwd7Sch.jpg"
    }, {
        title: "Loading Effects for Grid Items | Demo 2",
        url: "http://tympanus.net/Development/GridLoadingEffects/index2.html",
        image: "http://i.imgur.com/iFBSB1t.jpg"
    }]
}(window), function (t) {
    "use strict";
    function e() {
        var t = document.createElement("div"), e = Math.random(), i = Math.random(), n = e > .92 ? "w4" : e > .8 ? "w3" : e > .6 ? "w2" : "", o = i > .85 ? "h4" : i > .6 ? "h3" : i > .35 ? "h2" : "";
        return t.className = "item " + n + " " + o, t
    }

    var i = t.MD;
    i.methods = function () {
        (function () {
            var t = document.querySelector("#appended-demo"), i = t.querySelector(".masonry"), n = t.querySelector("button"), o = new Masonry(i, {columnWidth: 60});
            eventie.bind(n, "click", function () {
                for (var t = [], n = document.createDocumentFragment(), r = 0; 3 > r; r++) {
                    var s = e();
                    n.appendChild(s), t.push(s)
                }
                i.appendChild(n), o.appended(t)
            })
        })(), function () {
            var t = document.querySelector("#destroy-demo"), e = t.querySelector(".masonry"), i = t.querySelector("button"), n = new Masonry(e, {columnWidth: 60}), o = !0;
            eventie.bind(i, "click", function () {
                o ? n.destroy() : n = new Masonry(e), o = !o
            })
        }(), function () {
            var t = document.querySelector("#layout-demo .masonry"), e = new Masonry(t, {columnWidth: 60});
            eventie.bind(t, "click", function (t) {
                classie.has(t.target, "item") && (classie.toggle(t.target, "gigante"), e.layout())
            })
        }(), function () {
            var t = document.querySelector("#prepended-demo"), i = t.querySelector(".masonry"), n = t.querySelector("button"), o = new Masonry(i, {columnWidth: 60});
            eventie.bind(n, "click", function () {
                for (var t = [], n = document.createDocumentFragment(), r = 0; 3 > r; r++) {
                    var s = e();
                    n.appendChild(s), t.push(s)
                }
                i.insertBefore(n, i.firstChild), o.prepended(t)
            })
        }(), function () {
            var t = document.querySelector("#stamp-demo"), e = t.querySelector(".stamp"), i = t.querySelector("button"), n = new Masonry(t.querySelector(".masonry"), {
                columnWidth: 60,
                itemSelector: ".item"
            }), o = !1;
            eventie.bind(i, "click", function () {
                o ? n.unstamp(e) : n.stamp(e), n.layout(), o = !o
            })
        }(), function () {
            var t = document.querySelector("#remove-demo .masonry"), e = new Masonry(t, {columnWidth: 60});
            eventie.bind(t, "click", function (t) {
                classie.has(t.target, "item") && (e.remove(t.target), e.layout())
            })
        }()
    }
}(window);