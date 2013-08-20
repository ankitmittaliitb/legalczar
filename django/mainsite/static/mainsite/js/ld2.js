function fn_open_video_window() {
    $("#opentok_ready").remove(), $("#lawer_incoming_call").remove(), $("#video_window").show(), $("#tokbox_player").show(), window.videoChatTimers.initialize(), connect()
}! 

function (e) {
    var t = 5;
    e.widget("ui.slider", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var i, n, a = this.options,
                s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                r = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                o = [];
            for (this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (a.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), a.range && (a.range === !0 && (a.values || (a.values = [this._valueMin(), this._valueMin()]), a.values.length && 2 !== a.values.length && (a.values = [a.values[0], a.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === a.range || "max" === a.range ? " ui-slider-range-" + a.range : ""))), n = a.values && a.values.length || 1, i = s.length; n > i; i++) o.push(r);
            this.handles = s.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (e) {
                e.preventDefault()
            }).mouseenter(function () {
                a.disabled || e(this).addClass("ui-state-hover")
            }).mouseleave(function () {
                e(this).removeClass("ui-state-hover")
            }).focus(function () {
                a.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
            }).blur(function () {
                e(this).removeClass("ui-state-focus")
            }), this.handles.each(function (t) {
                e(this).data("ui-slider-handle-index", t)
            }), this._on(this.handles, {
                keydown: function (i) {
                    var n, a, s, r, o = e(i.target).data("ui-slider-handle-index");
                    switch (i.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, e(i.target).addClass("ui-state-active"), n = this._start(i, o), n === !1)) return
                    }
                    switch (r = this.options.step, a = s = this.options.values && this.options.values.length ? this.values(o) : this.value(), i.keyCode) {
                    case e.ui.keyCode.HOME:
                        s = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        s = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        s = this._trimAlignValue(a + (this._valueMax() - this._valueMin()) / t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        s = this._trimAlignValue(a - (this._valueMax() - this._valueMin()) / t);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (a === this._valueMax()) return;
                        s = this._trimAlignValue(a + r);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (a === this._valueMin()) return;
                        s = this._trimAlignValue(a - r)
                    }
                    this._slide(i, o, s)
                },
                keyup: function (t) {
                    var i = e(t.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
                }
            }), this._refreshValue(), this._animateOff = !1
        },
        _destroy: function () {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (t) {
            var i, n, a, s, r, o, l, c, u = this,
                h = this.options;
            return h.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: t.pageX,
                y: t.pageY
            }, n = this._normValueFromMouse(i), a = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) {
                var i = Math.abs(n - u.values(t));
                a > i && (a = i, s = e(this), r = t)
            }), h.range === !0 && this.values(1) === h.min && (r += 1, s = e(this.handles[r])), o = this._start(t, r), o === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = r, s.addClass("ui-state-active").focus(), l = s.offset(), c = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - l.left - s.width() / 2,
                top: t.pageY - l.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, r, n), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (e) {
            var t = {
                x: e.pageX,
                y: e.pageY
            }, i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function (e) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (e) {
            var t, i, n, a, s;
            return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / t, n > 1 && (n = 1), 0 > n && (n = 0), "vertical" === this.orientation && (n = 1 - n), a = this._valueMax() - this._valueMin(), s = this._valueMin() + n * a, this._trimAlignValue(s)
        },
        _start: function (e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
        },
        _slide: function (e, t, i) {
            var n, a, s;
            this.options.values && this.options.values.length ? (n = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > n || 1 === t && n > i) && (i = n), i !== this.values(t) && (a = this.values(), a[t] = i, s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: a
            }), n = this.values(t ? 0 : 1), s !== !1 && this.values(t, i, !0))) : i !== this.value() && (s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i
            }), s !== !1 && this.value(i))
        },
        _stop: function (e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function (e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("change", e, i)
            }
        },
        value: function (e) {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function (t, i) {
            var n, a, s;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (n = this.options.values, a = arguments[0], s = 0; s < n.length; s += 1) n[s] = this._trimAlignValue(a[s]), this._change(null, s);
            this._refreshValue()
        },
        _setOption: function (t, i) {
            var n, a = 0;
            switch (e.isArray(this.options.values) && (a = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments), t) {
            case "disabled":
                i ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
                break;
            case "orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                break;
            case "value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0, this._refreshValue(), n = 0; a > n; n += 1) this._change(null, n);
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0, this._refreshValue(), this._animateOff = !1
            }
        },
        _value: function () {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function (e) {
            var t, i, n;
            if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t);
            for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
            return i
        },
        _trimAlignValue: function (e) {
            if (e <= this._valueMin()) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                n = e - i;
            return 2 * Math.abs(i) >= t && (n += i > 0 ? t : -t), parseFloat(n.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var t, i, n, a, s, r = this.options.range,
                o = this.options,
                l = this,
                c = this._animateOff ? !1 : o.animate,
                u = {};
            this.options.values && this.options.values.length ? this.handles.each(function (n) {
                i = 100 * ((l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[c ? "animate" : "css"](u, o.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({
                    left: i + "%"
                }, o.animate), 1 === n && l.range[c ? "animate" : "css"]({
                    width: i - t + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                })) : (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({
                    bottom: i + "%"
                }, o.animate), 1 === n && l.range[c ? "animate" : "css"]({
                    height: i - t + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }))), t = i
            }) : (n = this.value(), a = this._valueMin(), s = this._valueMax(), i = s !== a ? 100 * ((n - a) / (s - a)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[c ? "animate" : "css"](u, o.animate), "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({
                width: i + "%"
            }, o.animate), "max" === r && "horizontal" === this.orientation && this.range[c ? "animate" : "css"]({
                width: 100 - i + "%"
            }, {
                queue: !1,
                duration: o.animate
            }), "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({
                height: i + "%"
            }, o.animate), "max" === r && "vertical" === this.orientation && this.range[c ? "animate" : "css"]({
                height: 100 - i + "%"
            }, {
                queue: !1,
                duration: o.animate
            }))
        }
    })
}(jQuery),
function (e, t) {
    function i() {
        return ++a
    }

    function n(e) {
        return e.hash.length > 1 && e.href.replace(s, "") === location.href.replace(s, "").replace(/\s/g, "%20")
    }
    var a = 0,
        s = /#.*$/;
    e.widget("ui.tabs", {
        version: "1.9.2",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var t = this,
                i = this.options,
                n = i.active,
                a = location.hash.substring(1);
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (t) {
                e(this).is(".ui-state-disabled") && t.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                e(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), null === n && (a && this.tabs.each(function (t, i) {
                return e(i).attr("aria-controls") === a ? (n = t, !1) : void 0
            }), null === n && (n = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === n || -1 === n) && (n = this.tabs.length ? 0 : !1)), n !== !1 && (n = this.tabs.index(this.tabs.eq(n)), -1 === n && (n = i.collapsible ? !1 : 0)), i.active = n, !i.collapsible && i.active === !1 && this.anchors.length && (i.active = 0), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function (e) {
                return t.tabs.index(e)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(this.options.active) : e(), this._refresh(), this.active.length && this.load(i.active)
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : e()
            }
        },
        _tabKeydown: function (t) {
            var i = e(this.document[0].activeElement).closest("li"),
                n = this.tabs.index(i),
                a = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                case e.ui.keyCode.RIGHT:
                case e.ui.keyCode.DOWN:
                    n++;
                    break;
                case e.ui.keyCode.UP:
                case e.ui.keyCode.LEFT:
                    a = !1, n--;
                    break;
                case e.ui.keyCode.END:
                    n = this.anchors.length - 1;
                    break;
                case e.ui.keyCode.HOME:
                    n = 0;
                    break;
                case e.ui.keyCode.SPACE:
                    return t.preventDefault(), clearTimeout(this.activating), this._activate(n), void 0;
                case e.ui.keyCode.ENTER:
                    return t.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), void 0;
                default:
                    return
                }
                t.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, a), t.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", n)
                }, this.delay))
            }
        },
        _panelKeydown: function (t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (t) {
            return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function (t, i) {
            function n() {
                return t > a && (t = 0), 0 > t && (t = a), t
            }
            for (var a = this.tabs.length - 1; - 1 !== e.inArray(n(), this.options.disabled);) t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function (e, t) {
            return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
        },
        _setOption: function (e, t) {
            return "active" === e ? (this._activate(t), void 0) : "disabled" === e ? (this._setupDisabled(t), void 0) : (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)), "event" === e && this._setupEvents(t), "heightStyle" === e && this._setupHeightStyle(t), void 0)
        },
        _tabId: function (e) {
            return e.attr("aria-controls") || "ui-tabs-" + i()
        },
        _sanitizeSelector: function (e) {
            return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = e.map(i.filter(".ui-state-disabled"), function (e) {
                return i.index(e)
            }), this._processTabs(), t.active !== !1 && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var t = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return e("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = e(), this.anchors.each(function (i, a) {
                var s, r, o, l = e(a).uniqueId().attr("id"),
                    c = e(a).closest("li"),
                    u = c.attr("aria-controls");
                n(a) ? (s = a.hash, r = t.element.find(t._sanitizeSelector(s))) : (o = t._tabId(c), s = "#" + o, r = t.element.find(s), r.length || (r = t._createPanel(o), r.insertAfter(t.panels[i - 1] || t.tablist)), r.attr("aria-live", "polite")), r.length && (t.panels = t.panels.add(r)), u && c.data("ui-tabs-aria-controls", u), c.attr({
                    "aria-controls": s.substring(1),
                    "aria-labelledby": l
                }), r.attr("aria-labelledby", l)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (t) {
            return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (t) {
            e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
            for (var i, n = 0; i = this.tabs[n]; n++) t === !0 || -1 !== e.inArray(n, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = t
        },
        _setupEvents: function (t) {
            var i = {
                click: function (e) {
                    e.preventDefault()
                }
            };
            t && e.each(t.split(" "), function (e, t) {
                i[t] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (t) {
            var i, n, a = this.element.parent();
            "fill" === t ? (e.support.minHeight || (n = a.css("overflow"), a.css("overflow", "hidden")), i = a.height(), this.element.siblings(":visible").each(function () {
                var t = e(this),
                    n = t.css("position");
                "absolute" !== n && "fixed" !== n && (i -= t.outerHeight(!0))
            }), n && a.css("overflow", n), this.element.children().not(this.panels).each(function () {
                i -= e(this).outerHeight(!0)
            }), this.panels.each(function () {
                e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()))
            }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function () {
                i = Math.max(i, e(this).height("").height())
            }).height(i))
        },
        _eventHandler: function (t) {
            var i = this.options,
                n = this.active,
                a = e(t.currentTarget),
                s = a.closest("li"),
                r = s[0] === n[0],
                o = r && i.collapsible,
                l = o ? e() : this._getPanelForTab(s),
                c = n.length ? this._getPanelForTab(n) : e(),
                u = {
                    oldTab: n,
                    oldPanel: c,
                    newTab: o ? e() : s,
                    newPanel: l
                };
            t.preventDefault(), s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || this._trigger("beforeActivate", t, u) === !1 || (i.active = o ? !1 : this.tabs.index(s), this.active = r ? e() : s, this.xhr && this.xhr.abort(), c.length || l.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(s), t), this._toggle(t, u))
        },
        _toggle: function (t, i) {
            function n() {
                s.running = !1, s._trigger("activate", t, i)
            }

            function a() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && s.options.show ? s._show(r, s.options.show, n) : (r.show(), n())
            }
            var s = this,
                r = i.newPanel,
                o = i.oldPanel;
            this.running = !0, o.length && this.options.hide ? this._hide(o, this.options.hide, function () {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o.hide(), a()), o.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), i.oldTab.attr("aria-selected", "false"), r.length && o.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function () {
                return 0 === e(this).attr("tabIndex")
            }).attr("tabIndex", -1), r.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function (t) {
            var i, n = this._findActive(t);
            n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: e.noop
            }))
        },
        _findActive: function (t) {
            return t === !1 ? e() : this.tabs.eq(t)
        },
        _getIndex: function (e) {
            return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(), this.tabs.add(this.panels).each(function () {
                e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var t = e(this),
                    i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i) : t.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (i) {
            var n = this.options.disabled;
            n !== !1 && (i === t ? n = !1 : (i = this._getIndex(i), n = e.isArray(n) ? e.map(n, function (e) {
                return e !== i ? e : null
            }) : e.map(this.tabs, function (e, t) {
                return t !== i ? t : null
            })), this._setupDisabled(n))
        },
        disable: function (i) {
            var n = this.options.disabled;
            if (n !== !0) {
                if (i === t) n = !0;
                else {
                    if (i = this._getIndex(i), -1 !== e.inArray(i, n)) return;
                    n = e.isArray(n) ? e.merge([i], n).sort() : [i]
                }
                this._setupDisabled(n)
            }
        },
        load: function (t, i) {
            t = this._getIndex(t);
            var a = this,
                s = this.tabs.eq(t),
                r = s.find(".ui-tabs-anchor"),
                o = this._getPanelForTab(s),
                l = {
                    tab: s,
                    panel: o
                };
            n(r[0]) || (this.xhr = e.ajax(this._ajaxSettings(r, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.success(function (e) {
                setTimeout(function () {
                    o.html(e), a._trigger("load", i, l)
                }, 1)
            }).complete(function (e, t) {
                setTimeout(function () {
                    "abort" === t && a.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), o.removeAttr("aria-busy"), e === a.xhr && delete a.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function (t, i, n) {
            var a = this;
            return {
                url: t.attr("href"),
                beforeSend: function (t, s) {
                    return a._trigger("beforeLoad", i, e.extend({
                        jqXHR: t,
                        ajaxSettings: s
                    }, n))
                }
            }
        },
        _getPanelForTab: function (t) {
            var i = e(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    }), e.uiBackCompat !== !1 && (e.ui.tabs.prototype._ui = function (e, t) {
        return {
            tab: e,
            panel: t,
            index: this.anchors.index(e)
        }
    }, e.widget("ui.tabs", e.ui.tabs, {
        url: function (e, t) {
            this.anchors.eq(e).attr("href", t)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            ajaxOptions: null,
            cache: !1
        },
        _create: function () {
            this._super();
            var t = this;
            this._on({
                tabsbeforeload: function (i, n) {
                    return e.data(n.tab[0], "cache.tabs") ? (i.preventDefault(), void 0) : (n.jqXHR.success(function () {
                        t.options.cache && e.data(n.tab[0], "cache.tabs", !0)
                    }), void 0)
                }
            })
        },
        _ajaxSettings: function (t, i, n) {
            var a = this.options.ajaxOptions;
            return e.extend({}, a, {
                error: function (e, t) {
                    try {
                        a.error(e, t, n.tab.closest("li").index(), n.tab[0])
                    } catch (i) {}
                }
            }, this._superApply(arguments))
        },
        _setOption: function (e, t) {
            "cache" === e && t === !1 && this.anchors.removeData("cache.tabs"), this._super(e, t)
        },
        _destroy: function () {
            this.anchors.removeData("cache.tabs"), this._super()
        },
        url: function (e) {
            this.anchors.eq(e).removeData("cache.tabs"), this._superApply(arguments)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        abort: function () {
            this.xhr && this.xhr.abort()
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            spinner: "<em>Loading&#8230;</em>"
        },
        _create: function () {
            this._super(), this._on({
                tabsbeforeload: function (e, t) {
                    if (e.target === this.element[0] && this.options.spinner) {
                        var i = t.tab.find("span"),
                            n = i.html();
                        i.html(this.options.spinner), t.jqXHR.complete(function () {
                            i.html(n)
                        })
                    }
                }
            })
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            enable: null,
            disable: null
        },
        enable: function (t) {
            var i, n = this.options;
            (t && n.disabled === !0 || e.isArray(n.disabled) && -1 !== e.inArray(t, n.disabled)) && (i = !0), this._superApply(arguments), i && this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t]))
        },
        disable: function (t) {
            var i, n = this.options;
            (t && n.disabled === !1 || e.isArray(n.disabled) && -1 === e.inArray(t, n.disabled)) && (i = !0), this._superApply(arguments), i && this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            add: null,
            remove: null,
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        add: function (i, n, a) {
            a === t && (a = this.anchors.length);
            var s, r, o = this.options,
                l = e(o.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, n)),
                c = i.indexOf("#") ? this._tabId(l) : i.replace("#", "");
            return l.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0), l.attr("aria-controls", c), s = a >= this.tabs.length, r = this.element.find("#" + c), r.length || (r = this._createPanel(c), s ? a > 0 ? r.insertAfter(this.panels.eq(-1)) : r.appendTo(this.element) : r.insertBefore(this.panels[a])), r.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(), s ? l.appendTo(this.tablist) : l.insertBefore(this.tabs[a]), o.disabled = e.map(o.disabled, function (e) {
                return e >= a ? ++e : e
            }), this.refresh(), 1 === this.tabs.length && o.active === !1 && this.option("active", 0), this._trigger("add", null, this._ui(this.anchors[a], this.panels[a])), this
        },
        remove: function (t) {
            t = this._getIndex(t);
            var i = this.options,
                n = this.tabs.eq(t).remove(),
                a = this._getPanelForTab(n).remove();
            return n.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(t + (t + 1 < this.anchors.length ? 1 : -1)), i.disabled = e.map(e.grep(i.disabled, function (e) {
                return e !== t
            }), function (e) {
                return e >= t ? --e : e
            }), this.refresh(), this._trigger("remove", null, this._ui(n.find("a")[0], a[0])), this
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        length: function () {
            return this.anchors.length
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            idPrefix: "ui-tabs-"
        },
        _tabId: function (t) {
            var n = t.is("li") ? t.find("a[href]") : t;
            return n = n[0], e(n).closest("li").attr("aria-controls") || n.title && n.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF\-]/g, "") || this.options.idPrefix + i()
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            panelTemplate: "<div></div>"
        },
        _createPanel: function (t) {
            return e(this.options.panelTemplate).attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        _create: function () {
            var e = this.options;
            null === e.active && e.selected !== t && (e.active = -1 === e.selected ? !1 : e.selected), this._super(), e.selected = e.active, e.selected === !1 && (e.selected = -1)
        },
        _setOption: function (e, t) {
            if ("selected" !== e) return this._super(e, t);
            var i = this.options;
            this._super("active", -1 === t ? !1 : t), i.selected = i.active, i.selected === !1 && (i.selected = -1)
        },
        _eventHandler: function () {
            this._superApply(arguments), this.options.selected = this.options.active, this.options.selected === !1 && (this.options.selected = -1)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            show: null,
            select: null
        },
        _create: function () {
            this._super(), this.options.active !== !1 && this._trigger("show", null, this._ui(this.active.find(".ui-tabs-anchor")[0], this._getPanelForTab(this.active)[0]))
        },
        _trigger: function (e, t, i) {
            var n, a, s = this._superApply(arguments);
            return s ? ("beforeActivate" === e ? (n = i.newTab.length ? i.newTab : i.oldTab, a = i.newPanel.length ? i.newPanel : i.oldPanel, s = this._super("select", t, {
                tab: n.find(".ui-tabs-anchor")[0],
                panel: a[0],
                index: n.closest("li").index()
            })) : "activate" === e && i.newTab.length && (s = this._super("show", t, {
                tab: i.newTab.find(".ui-tabs-anchor")[0],
                panel: i.newPanel[0],
                index: i.newTab.closest("li").index()
            })), s) : !1
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        select: function (e) {
            if (e = this._getIndex(e), -1 === e) {
                if (!this.options.collapsible || -1 === this.options.selected) return;
                e = this.options.selected
            }
            this.anchors.eq(e).trigger(this.options.event + this.eventNamespace)
        }
    }), function () {
        var t = 0;
        e.widget("ui.tabs", e.ui.tabs, {
            options: {
                cookie: null
            },
            _create: function () {
                var e, t = this.options;
                null == t.active && t.cookie && (e = parseInt(this._cookie(), 10), -1 === e && (e = !1), t.active = e), this._super()
            },
            _cookie: function (i) {
                var n = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++t)];
                return arguments.length && (n.push(i === !1 ? -1 : i), n.push(this.options.cookie)), e.cookie.apply(null, n)
            },
            _refresh: function () {
                this._super(), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _eventHandler: function () {
                this._superApply(arguments), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _destroy: function () {
                this._super(), this.options.cookie && this._cookie(null, this.options.cookie)
            }
        })
    }(), e.widget("ui.tabs", e.ui.tabs, {
        _trigger: function (t, i, n) {
            var a = e.extend({}, n);
            return "load" === t && (a.panel = a.panel[0], a.tab = a.tab.find(".ui-tabs-anchor")[0]), this._super(t, i, a)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            fx: null
        },
        _getFx: function () {
            var t, i, n = this.options.fx;
            return n && (e.isArray(n) ? (t = n[0], i = n[1]) : t = i = n), n ? {
                show: i,
                hide: t
            } : null
        },
        _toggle: function (e, t) {
            function i() {
                a.running = !1, a._trigger("activate", e, t)
            }

            function n() {
                t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), s.length && o.show ? s.animate(o.show, o.show.duration, function () {
                    i()
                }) : (s.show(), i())
            }
            var a = this,
                s = t.newPanel,
                r = t.oldPanel,
                o = this._getFx();
            return o ? (a.running = !0, r.length && o.hide ? r.animate(o.hide, o.hide.duration, function () {
                t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
            }) : (t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), void 0) : this._super(e, t)
        }
    }))
}(jQuery),
function (e) {
    function t(t, n, a) {
        var s = this;
        return this.on("click.pjax", t, function (t) {
            var r = e.extend({}, d(n, a));
            r.container || (r.container = e(this).attr("data-pjax") || s), i(t, r)
        })
    }

    function i(t, i, n) {
        n = d(i, n);
        var s = t.currentTarget;
        if ("A" !== s.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== s.protocol || location.hostname !== s.hostname || s.hash && s.href.replace(s.hash, "") === location.href.replace(location.hash, "") || s.href === location.href + "#")) {
            var r = {
                url: s.href,
                container: e(s).attr("data-pjax"),
                target: s,
                fragment: null
            }, o = e.extend({}, r, n),
                l = e.Event("pjax:click");
            e(s).trigger(l, [o]), l.isDefaultPrevented() || (a(o), t.preventDefault())
        }
    }

    function n(t, i, n) {
        n = d(i, n);
        var s = t.currentTarget;
        if ("FORM" !== s.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
        var r = {
            type: s.method.toUpperCase(),
            url: s.action,
            data: e(s).serializeArray(),
            container: e(s).attr("data-pjax"),
            target: s,
            fragment: null
        };
        a(e.extend({}, r, n)), t.preventDefault()
    }

    function a(t) {
        function i(t, i) {
            var a = e.Event(t, {
                relatedTarget: n
            });
            return o.trigger(a, i), !a.isDefaultPrevented()
        }
        t = e.extend(!0, {}, e.ajaxSettings, a.defaults, t), e.isFunction(t.url) && (t.url = t.url());
        var n = t.target,
            s = h(t.url).hash,
            o = t.context = p(t.container);
        t.data || (t.data = {}), t.data._pjax = o.selector;
        var l;
        t.beforeSend = function (e, n) {
            return "GET" !== n.type && (n.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", o.selector), i("pjax:beforeSend", [e, n]) ? (n.timeout > 0 && (l = setTimeout(function () {
                i("pjax:timeout", [e, t]) && e.abort("timeout")
            }, n.timeout), n.timeout = 0), t.requestUrl = h(n.url).href, void 0) : !1
        }, t.complete = function (e, n) {
            l && clearTimeout(l), i("pjax:complete", [e, n, t]), i("pjax:end", [e, t])
        }, t.error = function (e, n, a) {
            var s = _("", e, t),
                o = i("pjax:error", [e, n, a, t]);
            "GET" == t.type && "abort" !== n && o && r(s.url)
        }, t.success = function (n, l, u) {
            var d = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version,
                p = u.getResponseHeader("X-PJAX-Version"),
                f = _(n, u, t);
            if (d && p && d !== p) return r(f.url), void 0;
            if (!f.contents) return r(f.url), void 0;
            if (a.state = {
                id: t.id || c(),
                url: f.url,
                title: f.title,
                container: o.selector,
                fragment: t.fragment,
                timeout: t.timeout
            }, (t.push || t.replace) && window.history.replaceState(a.state, f.title, f.url), f.title && (document.title = f.title), o.html(f.contents), g(f.scripts), "number" == typeof t.scrollTo && e(window).scrollTop(t.scrollTo), "" !== s) {
                var m = h(f.url);
                m.hash = s, a.state.url = m.href, window.history.replaceState(a.state, f.title, m.href);
                var v = e(m.hash);
                v.length && e(window).scrollTop(v.offset().top)
            }
            i("pjax:success", [n, l, u, t])
        }, a.state || (a.state = {
            id: c(),
            url: window.location.href,
            title: document.title,
            container: o.selector,
            fragment: t.fragment,
            timeout: t.timeout
        }, window.history.replaceState(a.state, document.title));
        var d = a.xhr;
        d && d.readyState < 4 && (d.onreadystatechange = e.noop, d.abort()), a.options = t;
        var d = a.xhr = e.ajax(t);
        return d.readyState > 0 && (t.push && !t.replace && (v(a.state.id, o.clone().contents()), window.history.pushState(null, "", u(t.requestUrl))), i("pjax:start", [d, t]), i("pjax:send", [d, t])), a.xhr
    }

    function s(t, i) {
        var n = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return a(e.extend(n, d(t, i)))
    }

    function r(e) {
        window.history.replaceState(null, "", "#"), window.location.replace(e)
    }

    function o(t) {
        var i = t.state;
        if (i && i.container) {
            if (k && $ == i.url) return;
            var n = e(i.container);
            if (n.length) {
                var s, o = S[i.id];
                a.state && (s = a.state.id < i.id ? "forward" : "back", y(s, a.state.id, n.clone().contents()));
                var l = e.Event("pjax:popstate", {
                    state: i,
                    direction: s
                });
                n.trigger(l);
                var c = {
                    id: i.id,
                    url: i.url,
                    container: n,
                    push: !1,
                    fragment: i.fragment,
                    timeout: i.timeout,
                    scrollTo: !1
                };
                o ? (n.trigger("pjax:start", [null, c]), i.title && (document.title = i.title), n.html(o), a.state = i, n.trigger("pjax:end", [null, c])) : a(c), n[0].offsetHeight
            } else r(location.href)
        }
        k = !1
    }

    function l(t) {
        var i = e.isFunction(t.url) ? t.url() : t.url,
            n = t.type ? t.type.toUpperCase() : "GET",
            a = e("<form>", {
                method: "GET" === n ? "GET" : "POST",
                action: i,
                style: "display:none"
            });
        "GET" !== n && "POST" !== n && a.append(e("<input>", {
            type: "hidden",
            name: "_method",
            value: n.toLowerCase()
        }));
        var s = t.data;
        if ("string" == typeof s) e.each(s.split("&"), function (t, i) {
            var n = i.split("=");
            a.append(e("<input>", {
                type: "hidden",
                name: n[0],
                value: n[1]
            }))
        });
        else if ("object" == typeof s)
            for (key in s) a.append(e("<input>", {
                type: "hidden",
                name: key,
                value: s[key]
            }));
        e(document.body).append(a), a.submit()
    }

    function c() {
        return (new Date).getTime()
    }

    function u(e) {
        return e.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }

    function h(e) {
        var t = document.createElement("a");
        return t.href = e, t
    }

    function d(t, i) {
        return t && i ? i.container = t : i = e.isPlainObject(t) ? t : {
            container: t
        }, i.container && (i.container = p(i.container)), i
    }

    function p(t) {
        if (t = e(t), t.length) {
            if ("" !== t.selector && t.context === document) return t;
            if (t.attr("id")) return e("#" + t.attr("id"));
            throw "cant get selector for pjax container!"
        }
        throw "no pjax container for " + t.selector
    }

    function f(e, t) {
        return e.filter(t).add(e.find(t))
    }

    function m(t) {
        return e.parseHTML(t, document, !0)
    }

    function _(t, i, n) {
        var a = {};
        if (a.url = u(i.getResponseHeader("X-PJAX-URL") || n.requestUrl), /<html/i.test(t)) var s = e(m(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),
        r = e(m(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        else var s = r = e(m(t)); if (0 === r.length) return a;
        if (a.title = f(s, "title").last().text(), n.fragment) {
            if ("body" === n.fragment) var o = r;
            else var o = f(r, n.fragment).first();
            o.length && (a.contents = o.contents(), a.title || (a.title = o.attr("title") || o.data("title")))
        } else /<html/i.test(t) || (a.contents = r);
        return a.contents && (a.contents = a.contents.not(function () {
            return e(this).is("title")
        }), a.contents.find("title").remove(), a.scripts = f(a.contents, "script[src]").remove(), a.contents = a.contents.not(a.scripts)), a.title && (a.title = e.trim(a.title)), a
    }

    function g(t) {
        if (t) {
            var i = e("script[src]");
            t.each(function () {
                var t = this.src,
                    n = i.filter(function () {
                        return this.src === t
                    });
                if (!n.length) {
                    var a = document.createElement("script");
                    a.type = e(this).attr("type"), a.src = e(this).attr("src"), document.head.appendChild(a)
                }
            })
        }
    }

    function v(e, t) {
        for (S[e] = t, A.push(e); T.length;) delete S[T.shift()];
        for (; A.length > a.defaults.maxCacheLength;) delete S[A.shift()]
    }

    function y(e, t, i) {
        var n, a;
        S[t] = i, "forward" === e ? (n = A, a = T) : (n = T, a = A), n.push(t), (t = a.pop()) && delete S[t]
    }

    function b() {
        return e("meta").filter(function () {
            var t = e(this).attr("http-equiv");
            return t && "X-PJAX-VERSION" === t.toUpperCase()
        }).attr("content")
    }

    function w() {
        e.fn.pjax = t, e.pjax = a, e.pjax.enable = e.noop, e.pjax.disable = x, e.pjax.click = i, e.pjax.submit = n, e.pjax.reload = s, e.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: b
        }, e(window).bind("popstate.pjax", o)
    }

    function x() {
        e.fn.pjax = function () {
            return this
        }, e.pjax = l, e.pjax.enable = w, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function () {
            window.location.reload()
        }, e(window).unbind("popstate.pjax", o)
    }
    var k = !0,
        $ = window.location.href,
        C = window.history.state;
    C && C.container && (a.state = C), "state" in window.history && (k = !1);
    var S = {}, T = [],
        A = [];
    e.inArray("state", e.event.props) < 0 && e.event.props.push("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/), e.support.pjax ? w() : x()
}(jQuery),
function (e, t, i, n) {
    "use strict";
    var a = i(e),
        s = i(t),
        r = i.fancybox = function () {
            r.open.apply(this, arguments)
        }, o = navigator.userAgent.match(/msie/i),
        l = null,
        c = t.createTouch !== n,
        u = function (e) {
            return e && e.hasOwnProperty && e instanceof i
        }, h = function (e) {
            return e && "string" === i.type(e)
        }, d = function (e) {
            return h(e) && e.indexOf("%") > 0
        }, p = function (e) {
            return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight)
        }, f = function (e, t) {
            var i = parseInt(e, 10) || 0;
            return t && d(e) && (i = r.getViewport()[t] / 100 * i), Math.ceil(i)
        }, m = function (e, t) {
            return f(e, t) + "px"
        };
    i.extend(r, {
        version: "2.1.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (o ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (e, t) {
            return e && (i.isPlainObject(t) || (t = {}), !1 !== r.close(!0)) ? (i.isArray(e) || (e = u(e) ? i(e).get() : [e]), i.each(e, function (a, s) {
                var o, l, c, d, p, f, m, _ = {};
                "object" === i.type(s) && (s.nodeType && (s = i(s)), u(s) ? (_ = {
                    href: s.data("fancybox-href") || s.attr("href"),
                    title: s.data("fancybox-title") || s.attr("title"),
                    isDom: !0,
                    element: s
                }, i.metadata && i.extend(!0, _, s.metadata())) : _ = s), o = t.href || _.href || (h(s) ? s : null), l = t.title !== n ? t.title : _.title || "", c = t.content || _.content, d = c ? "html" : t.type || _.type, !d && _.isDom && (d = s.data("fancybox-type"), d || (p = s.prop("class").match(/fancybox\.(\w+)/), d = p ? p[1] : null)), h(o) && (d || (r.isImage(o) ? d = "image" : r.isSWF(o) ? d = "swf" : "#" === o.charAt(0) ? d = "inline" : h(s) && (d = "html", c = s)), "ajax" === d && (f = o.split(/\s+/, 2), o = f.shift(), m = f.shift())), c || ("inline" === d ? o ? c = i(h(o) ? o.replace(/.*(?=#[^\s]+$)/, "") : o) : _.isDom && (c = s) : "html" === d ? c = o : d || o || !_.isDom || (d = "inline", c = s)), i.extend(_, {
                    href: o,
                    type: d,
                    content: c,
                    title: l,
                    selector: m
                }), e[a] = _
            }), r.opts = i.extend(!0, {}, r.defaults, t), t.keys !== n && (r.opts.keys = t.keys ? i.extend({}, r.defaults.keys, t.keys) : !1), r.group = e, r._start(r.opts.index)) : void 0
        },
        cancel: function () {
            var e = r.coming;
            e && !1 !== r.trigger("onCancel") && (r.hideLoading(), r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(e))
        },
        close: function (e) {
            r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && e !== !0 ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
        },
        play: function (e) {
            var t = function () {
                clearTimeout(r.player.timer)
            }, i = function () {
                    t(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                }, n = function () {
                    t(), s.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                }, a = function () {
                    r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, s.bind({
                        "onCancel.player beforeClose.player": n,
                        "onUpdate.player": i,
                        "beforeLoad.player": t
                    }), i(), r.trigger("onPlayStart"))
                };
            e === !0 || !r.player.isActive && e !== !1 ? a() : n()
        },
        next: function (e) {
            var t = r.current;
            t && (h(e) || (e = t.direction.next), r.jumpto(t.index + 1, e, "next"))
        },
        prev: function (e) {
            var t = r.current;
            t && (h(e) || (e = t.direction.prev), r.jumpto(t.index - 1, e, "prev"))
        },
        jumpto: function (e, t, i) {
            var a = r.current;
            a && (e = f(e), r.direction = t || a.direction[e >= a.index ? "next" : "prev"], r.router = i || "jumpto", a.loop && (0 > e && (e = a.group.length + e % a.group.length), e %= a.group.length), a.group[e] !== n && (r.cancel(), r._start(e)))
        },
        reposition: function (e, t) {
            var n, a = r.current,
                s = a ? a.wrap : null;
            s && (n = r._getPosition(t), e && "scroll" === e.type ? (delete n.position, s.stop(!0, !0).animate(n, 200)) : (s.css(n), a.pos = i.extend({}, a.dim, n)))
        },
        update: function (e) {
            var t = e && e.type,
                i = !t || "orientationchange" === t;
            i && (clearTimeout(l), l = null), r.isOpen && !l && (l = setTimeout(function () {
                var n = r.current;
                n && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === t || "resize" === t && n.autoResize) && r._setDimension(), "scroll" === t && n.canShrink || r.reposition(e), r.trigger("onUpdate"), l = null)
            }, i && !c ? 0 : 300))
        },
        toggle: function (e) {
            r.isOpen && (r.current.fitToView = "boolean" === i.type(e) ? e : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
        },
        hideLoading: function () {
            s.unbind(".loading"), i("#fancybox-loading").remove()
        },
        showLoading: function () {
            var e, t;
            r.hideLoading(), e = i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"), s.bind("keydown.loading", function (e) {
                27 === (e.which || e.keyCode) && (e.preventDefault(), r.cancel())
            }), r.defaults.fixed || (t = r.getViewport(), e.css({
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }))
        },
        getViewport: function () {
            var t = r.current && r.current.locked || !1,
                i = {
                    x: a.scrollLeft(),
                    y: a.scrollTop()
                };
            return t ? (i.w = t[0].clientWidth, i.h = t[0].clientHeight) : (i.w = c && e.innerWidth ? e.innerWidth : a.width(), i.h = c && e.innerHeight ? e.innerHeight : a.height()), i
        },
        unbindEvents: function () {
            r.wrap && u(r.wrap) && r.wrap.unbind(".fb"), s.unbind(".fb"), a.unbind(".fb")
        },
        bindEvents: function () {
            var e, t = r.current;
            t && (a.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), r.update), e = t.keys, e && s.bind("keydown.fb", function (a) {
                var s = a.which || a.keyCode,
                    o = a.target || a.srcElement;
                return 27 === s && r.coming ? !1 : (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || o && (o.type || i(o).is("[contenteditable]")) || i.each(e, function (e, o) {
                    return t.group.length > 1 && o[s] !== n ? (r[e](o[s]), a.preventDefault(), !1) : i.inArray(s, o) > -1 ? (r[e](), a.preventDefault(), !1) : void 0
                }), void 0)
            }), i.fn.mousewheel && t.mouseWheel && r.wrap.bind("mousewheel.fb", function (e, n, a, s) {
                for (var o = e.target || null, l = i(o), c = !1; l.length && !(c || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) c = p(l[0]), l = i(l).parent();
                0 === n || c || r.group.length > 1 && !t.canShrink && (s > 0 || a > 0 ? r.prev(s > 0 ? "down" : "left") : (0 > s || 0 > a) && r.next(0 > s ? "up" : "right"), e.preventDefault())
            }))
        },
        trigger: function (e, t) {
            var n, a = t || r.coming || r.current;
            if (a) {
                if (i.isFunction(a[e]) && (n = a[e].apply(a, Array.prototype.slice.call(arguments, 1))), n === !1) return !1;
                a.helpers && i.each(a.helpers, function (t, n) {
                    n && r.helpers[t] && i.isFunction(r.helpers[t][e]) && (n = i.extend(!0, {}, r.helpers[t].defaults, n), r.helpers[t][e](n, a))
                }), s.trigger(e)
            }
        },
        isImage: function (e) {
            return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
        },
        isSWF: function (e) {
            return h(e) && e.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (e) {
            var t, n, a, s, o, l = {};
            if (e = f(e), t = r.group[e] || null, !t) return !1;
            if (l = i.extend(!0, {}, r.opts, t), s = l.margin, o = l.padding, "number" === i.type(s) && (l.margin = [s, s, s, s]), "number" === i.type(o) && (l.padding = [o, o, o, o]), l.modal && i.extend(!0, l, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = r.group, l.index = e, r.coming = l, !1 === r.trigger("beforeLoad")) return r.coming = null, void 0;
            if (a = l.type, n = l.href, !a) return r.coming = null, r.current && r.router && "jumpto" !== r.router ? (r.current.index = e, r[r.router](r.direction)) : !1;
            if (r.isActive = !0, ("image" === a || "swf" === a) && (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === a && (l.aspectRatio = !0), "iframe" === a && c && (l.scrolling = "scroll"), l.wrap = i(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + a + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), i.extend(l, {
                skin: i(".fancybox-skin", l.wrap),
                outer: i(".fancybox-outer", l.wrap),
                inner: i(".fancybox-inner", l.wrap)
            }), i.each(["Top", "Right", "Bottom", "Left"], function (e, t) {
                l.skin.css("padding" + t, m(l.padding[e]))
            }), r.trigger("onReady"), "inline" === a || "html" === a) {
                if (!l.content || !l.content.length) return r._error("content")
            } else if (!n) return r._error("href");
            "image" === a ? r._loadImage() : "ajax" === a ? r._loadAjax() : "iframe" === a ? r._loadIframe() : r._afterLoad()
        },
        _error: function (e) {
            i.extend(r.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: r.coming.tpl.error
            }), r._afterLoad()
        },
        _loadImage: function () {
            var e = r.imgPreload = new Image;
            e.onload = function () {
                this.onload = this.onerror = null, r.coming.width = this.width, r.coming.height = this.height, r._afterLoad()
            }, e.onerror = function () {
                this.onload = this.onerror = null, r._error("image")
            }, e.src = r.coming.href, e.complete !== !0 && r.showLoading()
        },
        _loadAjax: function () {
            var e = r.coming;
            r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
                url: e.href,
                error: function (e, t) {
                    r.coming && "abort" !== t ? r._error("ajax", e) : r.hideLoading()
                },
                success: function (t, i) {
                    "success" === i && (e.content = t, r._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var e = r.coming,
                t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : e.iframe.scrolling).attr("src", e.href);
            i(e.wrap).bind("onReset", function () {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (e) {}
            }), e.iframe.preload && (r.showLoading(), t.one("load", function () {
                i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
            })), e.content = t.appendTo(e.inner), e.iframe.preload || r._afterLoad()
        },
        _preloadImages: function () {
            var e, t, i = r.group,
                n = r.current,
                a = i.length,
                s = n.preload ? Math.min(n.preload, a - 1) : 0;
            for (t = 1; s >= t; t += 1) e = i[(n.index + t) % a], "image" === e.type && e.href && ((new Image).src = e.href)
        },
        _afterLoad: function () {
            var e, t, n, a, s, o, l = r.coming,
                c = r.current,
                h = "fancybox-placeholder";
            if (r.hideLoading(), l && r.isActive !== !1) {
                if (!1 === r.trigger("afterLoad", l, c)) return l.wrap.stop(!0).trigger("onReset").remove(), r.coming = null, void 0;
                switch (c && (r.trigger("beforeChange", c), c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), e = l, t = l.content, n = l.type, a = l.scrolling, i.extend(r, {
                    wrap: e.wrap,
                    skin: e.skin,
                    outer: e.outer,
                    inner: e.inner,
                    current: e,
                    previous: c
                }), s = e.href, n) {
                case "inline":
                case "ajax":
                case "html":
                    e.selector ? t = i("<div>").html(t).find(e.selector) : u(t) && (t.data(h) || t.data(h, i('<div class="' + h + '"></div>').insertAfter(t).hide()), t = t.show().detach(), e.wrap.bind("onReset", function () {
                        i(this).find(t).length && t.hide().replaceAll(t.data(h)).data(h, !1)
                    }));
                    break;
                case "image":
                    t = e.tpl.image.replace("{href}", s);
                    break;
                case "swf":
                    t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + s + '"></param>', o = "", i.each(e.swf, function (e, i) {
                        t += '<param name="' + e + '" value="' + i + '"></param>', o += " " + e + '="' + i + '"'
                    }), t += '<embed src="' + s + '" type="application/x-shockwave-flash" width="100%" height="100%"' + o + "></embed></object>"
                }
                u(t) && t.parent().is(e.inner) || e.inner.append(t), r.trigger("beforeShow"), e.inner.css("overflow", "yes" === a ? "scroll" : "no" === a ? "hidden" : a), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? c.prevMethod && r.transitions[c.prevMethod]() : i(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? e.nextMethod : e.openMethod](), r._preloadImages()
            }
        },
        _setDimension: function () {
            var e, t, n, a, s, o, l, c, u, h, p, _, g, v, y, b = r.getViewport(),
                w = 0,
                x = !1,
                k = !1,
                $ = r.wrap,
                C = r.skin,
                S = r.inner,
                T = r.current,
                A = T.width,
                z = T.height,
                E = T.minWidth,
                P = T.minHeight,
                j = T.maxWidth,
                N = T.maxHeight,
                L = T.scrolling,
                D = T.scrollOutside ? T.scrollbarWidth : 0,
                I = T.margin,
                M = f(I[1] + I[3]),
                O = f(I[0] + I[2]);
            if ($.add(C).add(S).width("auto").height("auto").removeClass("fancybox-tmp"), e = f(C.outerWidth(!0) - C.width()), t = f(C.outerHeight(!0) - C.height()), n = M + e, a = O + t, s = d(A) ? (b.w - n) * f(A) / 100 : A, o = d(z) ? (b.h - a) * f(z) / 100 : z, "iframe" === T.type) {
                if (v = T.content, T.autoHeight && 1 === v.data("ready")) try {
                    v[0].contentWindow.document.location && (S.width(s).height(9999), y = v.contents().find("body"), D && y.css("overflow-x", "hidden"), o = y.height())
                } catch (F) {}
            } else(T.autoWidth || T.autoHeight) && (S.addClass("fancybox-tmp"), T.autoWidth || S.width(s), T.autoHeight || S.height(o), T.autoWidth && (s = S.width()), T.autoHeight && (o = S.height()), S.removeClass("fancybox-tmp")); if (A = f(s), z = f(o), u = s / o, E = f(d(E) ? f(E, "w") - n : E), j = f(d(j) ? f(j, "w") - n : j), P = f(d(P) ? f(P, "h") - a : P), N = f(d(N) ? f(N, "h") - a : N), l = j, c = N, T.fitToView && (j = Math.min(b.w - n, j), N = Math.min(b.h - a, N)), _ = b.w - M, g = b.h - O, T.aspectRatio ? (A > j && (A = j, z = f(A / u)), z > N && (z = N, A = f(z * u)), E > A && (A = E, z = f(A / u)), P > z && (z = P, A = f(z * u))) : (A = Math.max(E, Math.min(A, j)), T.autoHeight && "iframe" !== T.type && (S.width(A), z = S.height()), z = Math.max(P, Math.min(z, N))), T.fitToView)
                if (S.width(A).height(z), $.width(A + e), h = $.width(), p = $.height(), T.aspectRatio)
                    for (;
                        (h > _ || p > g) && A > E && z > P && !(w++ > 19);) z = Math.max(P, Math.min(N, z - 10)), A = f(z * u), E > A && (A = E, z = f(A / u)), A > j && (A = j, z = f(A / u)), S.width(A).height(z), $.width(A + e), h = $.width(), p = $.height();
                else A = Math.max(E, Math.min(A, A - (h - _))), z = Math.max(P, Math.min(z, z - (p - g)));
            D && "auto" === L && o > z && _ > A + e + D && (A += D), S.width(A).height(z), $.width(A + e), h = $.width(), p = $.height(), x = (h > _ || p > g) && A > E && z > P, k = T.aspectRatio ? l > A && c > z && s > A && o > z : (l > A || c > z) && (s > A || o > z), i.extend(T, {
                dim: {
                    width: m(h),
                    height: m(p)
                },
                origWidth: s,
                origHeight: o,
                canShrink: x,
                canExpand: k,
                wPadding: e,
                hPadding: t,
                wrapSpace: p - C.outerHeight(!0),
                skinSpace: C.height() - z
            }), !v && T.autoHeight && z > P && N > z && !k && S.height("auto")
        },
        _getPosition: function (e) {
            var t = r.current,
                i = r.getViewport(),
                n = t.margin,
                a = r.wrap.width() + n[1] + n[3],
                s = r.wrap.height() + n[0] + n[2],
                o = {
                    position: "absolute",
                    top: n[0],
                    left: n[3]
                };
            return t.autoCenter && t.fixed && !e && s <= i.h && a <= i.w ? o.position = "fixed" : t.locked || (o.top += i.y, o.left += i.x), o.top = m(Math.max(o.top, o.top + (i.h - s) * t.topRatio)), o.left = m(Math.max(o.left, o.left + (i.w - a) * t.leftRatio)), o
        },
        _afterZoomIn: function () {
            var e = r.current;
            e && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened"), r.update(), (e.closeClick || e.nextClick && r.group.length > 1) && r.inner.css("cursor", "pointer").bind("click.fb", function (t) {
                i(t.target).is("a") || i(t.target).parent().is("a") || (t.preventDefault(), r[e.closeClick ? "close" : "next"]())
            }), e.closeBtn && i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function (e) {
                e.preventDefault(), r.close()
            }), e.arrows && r.group.length > 1 && ((e.loop || e.index > 0) && i(e.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (e.loop || e.index < r.group.length - 1) && i(e.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play()) : r.play(!1))
        },
        _afterZoomOut: function (e) {
            e = e || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), r.trigger("afterClose", e)
        }
    }), r.transitions = {
        getOrigPosition: function () {
            var e = r.current,
                t = e.element,
                i = e.orig,
                n = {}, a = 50,
                s = 50,
                o = e.hPadding,
                l = e.wPadding,
                c = r.getViewport();
            return !i && e.isDom && t.is(":visible") && (i = t.find("img:first"), i.length || (i = t)), u(i) ? (n = i.offset(), i.is("img") && (a = i.outerWidth(), s = i.outerHeight())) : (n.top = c.y + (c.h - s) * e.topRatio, n.left = c.x + (c.w - a) * e.leftRatio), ("fixed" === r.wrap.css("position") || e.locked) && (n.top -= c.y, n.left -= c.x), n = {
                top: m(n.top - o * e.topRatio),
                left: m(n.left - l * e.leftRatio),
                width: m(a + l),
                height: m(s + o)
            }
        },
        step: function (e, t) {
            var i, n, a, s = t.prop,
                o = r.current,
                l = o.wrapSpace,
                c = o.skinSpace;
            ("width" === s || "height" === s) && (i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), r.isClosing && (i = 1 - i), n = "width" === s ? o.wPadding : o.hPadding, a = e - n, r.skin[s](f("width" === s ? a : a - l * i)), r.inner[s](f("width" === s ? a : a - l * i - c * i)))
        },
        zoomIn: function () {
            var e = r.current,
                t = e.pos,
                n = e.openEffect,
                a = "elastic" === n,
                s = i.extend({
                    opacity: 1
                }, t);
            delete s.position, a ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === n && (t.opacity = .1), r.wrap.css(t).animate(s, {
                duration: "none" === n ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: a ? this.step : null,
                complete: r._afterZoomIn
            })
        },
        zoomOut: function () {
            var e = r.current,
                t = e.closeEffect,
                i = "elastic" === t,
                n = {
                    opacity: .1
                };
            i && (n = this.getOrigPosition(), e.closeOpacity && (n.opacity = .1)), r.wrap.animate(n, {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: i ? this.step : null,
                complete: r._afterZoomOut
            })
        },
        changeIn: function () {
            var e, t = r.current,
                i = t.nextEffect,
                n = t.pos,
                a = {
                    opacity: 1
                }, s = r.direction,
                o = 200;
            n.opacity = .1, "elastic" === i && (e = "down" === s || "up" === s ? "top" : "left", "down" === s || "right" === s ? (n[e] = m(f(n[e]) - o), a[e] = "+=" + o + "px") : (n[e] = m(f(n[e]) + o), a[e] = "-=" + o + "px")), "none" === i ? r._afterZoomIn() : r.wrap.css(n).animate(a, {
                duration: t.nextSpeed,
                easing: t.nextEasing,
                complete: r._afterZoomIn
            })
        },
        changeOut: function () {
            var e = r.previous,
                t = e.prevEffect,
                n = {
                    opacity: .1
                }, a = r.direction,
                s = 200;
            "elastic" === t && (n["down" === a || "up" === a ? "top" : "left"] = ("up" === a || "left" === a ? "-" : "+") + "=" + s + "px"), e.wrap.animate(n, {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function () {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    }, r.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        create: function (e) {
            e = i.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo("body"), this.fixed = !1, e.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (e) {
            var t = this;
            e = i.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (a.bind("resize.overlay", i.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function (e) {
                i(e.target).hasClass("fancybox-overlay") && (r.isActive ? r.close() : t.close())
            }), this.overlay.css(e.css).show()
        },
        close: function () {
            i(".fancybox-overlay").remove(), a.unbind("resize.overlay"), this.overlay = null, this.margin !== !1 && (i("body").css("margin-right", this.margin), this.margin = !1), this.el && this.el.removeClass("fancybox-lock")
        },
        update: function () {
            var e, i = "100%";
            this.overlay.width(i).height("100%"), o ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), s.width() > e && (i = s.width())) : s.width() > a.width() && (i = s.width()), this.overlay.width(i).height(s.height())
        },
        onReady: function (e, n) {
            i(".fancybox-overlay").stop(!0, !0), this.overlay || (this.margin = s.height() > a.height() || "scroll" === i("body").css("overflow-y") ? i("body").css("margin-right") : !1, this.el = t.all && !t.querySelector ? i("html") : i("body"), this.create(e)), e.locked && this.fixed && (n.locked = this.overlay.append(n.wrap), n.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (e, t) {
            t.locked && (this.el.addClass("fancybox-lock"), this.margin !== !1 && i("body").css("margin-right", f(this.margin) + t.scrollbarWidth)), this.open(e)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (e) {
            this.overlay && !r.isActive && this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
        }
    }, r.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function (e) {
            var t, n, a = r.current,
                s = a.title,
                l = e.type;
            if (i.isFunction(s) && (s = s.call(a.element, a)), h(s) && "" !== i.trim(s)) {
                switch (t = i('<div class="fancybox-title fancybox-title-' + l + '-wrap">' + s + "</div>"), l) {
                case "inside":
                    n = r.skin;
                    break;
                case "outside":
                    n = r.wrap;
                    break;
                case "over":
                    n = r.inner;
                    break;
                default:
                    n = r.skin, t.appendTo("body"), o && t.width(t.width()), t.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(f(t.css("margin-bottom")))
                }
                t["top" === e.position ? "prependTo" : "appendTo"](n)
            }
        }
    }, i.fn.fancybox = function (e) {
        var t, n = i(this),
            a = this.selector || "",
            o = function (s) {
                var o, l, c = i(this).blur(),
                    u = t;
                s.ctrlKey || s.altKey || s.shiftKey || s.metaKey || c.is(".fancybox-wrap") || (o = e.groupAttr || "data-fancybox-group", l = c.attr(o), l || (o = "rel", l = c.get(0)[o]), l && "" !== l && "nofollow" !== l && (c = a.length ? i(a) : n, c = c.filter("[" + o + '="' + l + '"]'), u = c.index(this)), e.index = u, r.open(c, e) !== !1 && s.preventDefault())
            };
        return e = e || {}, t = e.index || 0, a && e.live !== !1 ? s.undelegate(a, "click.fb-start").delegate(a + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) : n.unbind("click.fb-start").bind("click.fb-start", o), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, s.ready(function () {
        i.scrollbarWidth === n && (i.scrollbarWidth = function () {
            var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                t = e.children(),
                n = t.innerWidth() - t.height(99).innerWidth();
            return e.remove(), n
        }), i.support.fixedPosition === n && (i.support.fixedPosition = function () {
            var e = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
            return e.remove(), t
        }()), i.extend(r.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        })
    })
}(window, document, jQuery);
try {
    var swfobject = function () {
        function e() {
            if (!B) {
                try {
                    var e = I.getElementsByTagName("body")[0].appendChild(_("span"));
                    e.parentNode.removeChild(e)
                } catch (t) {
                    return
                }
                B = !0;
                for (var i = F.length, n = 0; i > n; n++) F[n]()
            }
        }

        function t(e) {
            B ? e() : F[F.length] = e
        }

        function i(e) {
            if (typeof D.addEventListener != A) D.addEventListener("load", e, !1);
            else if (typeof I.addEventListener != A) I.addEventListener("load", e, !1);
            else if (typeof D.attachEvent != A) g(D, "onload", e);
            else if ("function" == typeof D.onload) {
                var t = D.onload;
                D.onload = function () {
                    t(), e()
                }
            } else D.onload = e
        }

        function n() {
            O ? a() : s()
        }

        function a() {
            var e = I.getElementsByTagName("body")[0],
                t = _(z);
            t.setAttribute("type", j);
            var i = e.appendChild(t);
            if (i) {
                var n = 0;
                ! function () {
                    if (typeof i.GetVariable != A) {
                        var a = i.GetVariable("$version");
                        a && (a = a.split(" ")[1].split(","), V.pv = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)])
                    } else if (10 > n) return n++, setTimeout(arguments.callee, 10), void 0;
                    e.removeChild(t), i = null, s()
                }()
            } else s()
        }

        function s() {
            var e = H.length;
            if (e > 0)
                for (var t = 0; e > t; t++) {
                    var i = H[t].id,
                        n = H[t].callbackFn,
                        a = {
                            success: !1,
                            id: i
                        };
                    if (V.pv[0] > 0) {
                        var s = m(i);
                        if (s)
                            if (!v(H[t].swfVersion) || V.wk && V.wk < 312)
                                if (H[t].expressInstall && o()) {
                                    var u = {};
                                    u.data = H[t].expressInstall, u.width = s.getAttribute("width") || "0", u.height = s.getAttribute("height") || "0", s.getAttribute("class") && (u.styleclass = s.getAttribute("class")), s.getAttribute("align") && (u.align = s.getAttribute("align"));
                                    for (var h = {}, d = s.getElementsByTagName("param"), p = d.length, f = 0; p > f; f++) "movie" != d[f].getAttribute("name").toLowerCase() && (h[d[f].getAttribute("name")] = d[f].getAttribute("value"));
                                    l(u, h, i, n)
                                } else c(s), n && n(a);
                                else b(i, !0), n && (a.success = !0, a.ref = r(i), n(a))
                    } else if (b(i, !0), n) {
                        var _ = r(i);
                        _ && typeof _.SetVariable != A && (a.success = !0, a.ref = _), n(a)
                    }
                }
        }

        function r(e) {
            var t = null,
                i = m(e);
            if (i && "OBJECT" == i.nodeName)
                if (typeof i.SetVariable != A) t = i;
                else {
                    var n = i.getElementsByTagName(z)[0];
                    n && (t = n)
                }
            return t
        }

        function o() {
            return !W && v("6.0.65") && (V.win || V.mac) && !(V.wk && V.wk < 312)
        }

        function l(e, t, i, n) {
            W = !0, $ = n || null, C = {
                success: !1,
                id: i
            };
            var a = m(i);
            if (a) {
                "OBJECT" == a.nodeName ? (x = u(a), k = null) : (x = a, k = i), e.id = N, (typeof e.width == A || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == A || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), I.title = I.title.slice(0, 47) + " - Flash Player Installation";
                var s = V.ie && V.win ? "ActiveX" : "PlugIn",
                    r = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g, "%26") + "&MMplayerType=" + s + "&MMdoctitle=" + I.title;
                if (typeof t.flashvars != A ? t.flashvars += "&" + r : t.flashvars = r, V.ie && V.win && 4 != a.readyState) {
                    var o = _("div");
                    i += "SWFObjectNew", o.setAttribute("id", i), a.parentNode.insertBefore(o, a), a.style.display = "none",
                    function () {
                        4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                    }()
                }
                h(e, t, i)
            }
        }

        function c(e) {
            if (V.ie && V.win && 4 != e.readyState) {
                var t = _("div");
                e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(u(e), t), e.style.display = "none",
                function () {
                    4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
            } else e.parentNode.replaceChild(u(e), e)
        }

        function u(e) {
            var t = _("div");
            if (V.win && V.ie) t.innerHTML = e.innerHTML;
            else {
                var i = e.getElementsByTagName(z)[0];
                if (i) {
                    var n = i.childNodes;
                    if (n)
                        for (var a = n.length, s = 0; a > s; s++)(1 != n[s].nodeType || "PARAM" != n[s].nodeName) && 8 != n[s].nodeType && t.appendChild(n[s].cloneNode(!0))
                }
            }
            return t
        }

        function h(e, t, i) {
            var n, a = m(i);
            if (V.wk && V.wk < 312) return n;
            if (a)
                if (typeof e.id == A && (e.id = i), V.ie && V.win) {
                    var s = "";
                    for (var r in e) e[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? t.movie = e[r] : "styleclass" == r.toLowerCase() ? s += ' class="' + e[r] + '"' : "classid" != r.toLowerCase() && (s += " " + r + '="' + e[r] + '"'));
                    var o = "";
                    for (var l in t) t[l] != Object.prototype[l] && (o += '<param name="' + l + '" value="' + t[l] + '" />');
                    a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + s + ">" + o + "</object>", q[q.length] = e.id, n = m(e.id)
                } else {
                    var c = _(z);
                    c.setAttribute("type", j);
                    for (var u in e) e[u] != Object.prototype[u] && ("styleclass" == u.toLowerCase() ? c.setAttribute("class", e[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, e[u]));
                    for (var h in t) t[h] != Object.prototype[h] && "movie" != h.toLowerCase() && d(c, h, t[h]);
                    a.parentNode.replaceChild(c, a), n = c
                }
            return n
        }

        function d(e, t, i) {
            var n = _("param");
            n.setAttribute("name", t), n.setAttribute("value", i), e.appendChild(n)
        }

        function p(e) {
            var t = m(e);
            t && "OBJECT" == t.nodeName && (V.ie && V.win ? (t.style.display = "none", function () {
                4 == t.readyState ? f(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        }

        function f(e) {
            var t = m(e);
            if (t) {
                for (var i in t) "function" == typeof t[i] && (t[i] = null);
                t.parentNode.removeChild(t)
            }
        }

        function m(e) {
            var t = null;
            try {
                t = I.getElementById(e)
            } catch (i) {}
            return t
        }

        function _(e) {
            return I.createElement(e)
        }

        function g(e, t, i) {
            e.attachEvent(t, i), R[R.length] = [e, t, i]
        }

        function v(e) {
            var t = V.pv,
                i = e.split(".");
            return i[0] = parseInt(i[0], 10), i[1] = parseInt(i[1], 10) || 0, i[2] = parseInt(i[2], 10) || 0, t[0] > i[0] || t[0] == i[0] && t[1] > i[1] || t[0] == i[0] && t[1] == i[1] && t[2] >= i[2] ? !0 : !1
        }

        function y(e, t, i, n) {
            if (!V.ie || !V.mac) {
                var a = I.getElementsByTagName("head")[0];
                if (a) {
                    var s = i && "string" == typeof i ? i : "screen";
                    if (n && (S = null, T = null), !S || T != s) {
                        var r = _("style");
                        r.setAttribute("type", "text/css"), r.setAttribute("media", s), S = a.appendChild(r), V.ie && V.win && typeof I.styleSheets != A && I.styleSheets.length > 0 && (S = I.styleSheets[I.styleSheets.length - 1]), T = s
                    }
                    V.ie && V.win ? S && typeof S.addRule == z && S.addRule(e, t) : S && typeof I.createTextNode != A && S.appendChild(I.createTextNode(e + " {" + t + "}"))
                }
            }
        }

        function b(e, t) {
            if (Q) {
                var i = t ? "visible" : "hidden";
                B && m(e) ? m(e).style.visibility = i : y("#" + e, "visibility:" + i)
            }
        }

        function w(e) {
            var t = /[\\\"<>\.;]/,
                i = null != t.exec(e);
            return i && typeof encodeURIComponent != A ? encodeURIComponent(e) : e
        }
        var x, k, $, C, S, T, A = "undefined",
            z = "object",
            E = "Shockwave Flash",
            P = "ShockwaveFlash.ShockwaveFlash",
            j = "application/x-shockwave-flash",
            N = "SWFObjectExprInst",
            L = "onreadystatechange",
            D = window,
            I = document,
            M = navigator,
            O = !1,
            F = [n],
            H = [],
            q = [],
            R = [],
            B = !1,
            W = !1,
            Q = !0,
            V = function () {
                var e = typeof I.getElementById != A && typeof I.getElementsByTagName != A && typeof I.createElement != A,
                    t = M.userAgent.toLowerCase(),
                    i = M.platform.toLowerCase(),
                    n = i ? /win/.test(i) : /win/.test(t),
                    a = i ? /mac/.test(i) : /mac/.test(t),
                    s = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    r = !1,
                    o = [0, 0, 0],
                    l = null;
                if (typeof M.plugins != A && typeof M.plugins[E] == z) l = M.plugins[E].description, l && (typeof M.mimeTypes == A || !M.mimeTypes[j] || !! M.mimeTypes[j].enabledPlugin) && (O = !0, r = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), o[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), o[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), o[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (typeof D.ActiveXObject != A) try {
                    var c = new ActiveXObject(P);
                    c && (l = c.GetVariable("$version"), l && (r = !0, l = l.split(" ")[1].split(","), o = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)]))
                } catch (u) {}
                return {
                    w3: e,
                    pv: o,
                    wk: s,
                    ie: r,
                    win: n,
                    mac: a
                }
            }();
        return function () {
            V.w3 && ((typeof I.readyState != A && "complete" == I.readyState || typeof I.readyState == A && (I.getElementsByTagName("body")[0] || I.body)) && e(), B || (typeof I.addEventListener != A && I.addEventListener("DOMContentLoaded", e, !1), V.ie && V.win && (I.attachEvent(L, function () {
                "complete" == I.readyState && (I.detachEvent(L, arguments.callee), e())
            }), D == top && function () {
                if (!B) {
                    try {
                        I.documentElement.doScroll("left")
                    } catch (t) {
                        return setTimeout(arguments.callee, 0), void 0
                    }
                    e()
                }
            }()), V.wk && function () {
                return B ? void 0 : /loaded|complete/.test(I.readyState) ? (e(), void 0) : (setTimeout(arguments.callee, 0), void 0)
            }(), i(e)))
        }(),
        function () {
            V.ie && V.win && window.attachEvent("onunload", function () {
                for (var e = R.length, t = 0; e > t; t++) R[t][0].detachEvent(R[t][1], R[t][2]);
                for (var i = q.length, n = 0; i > n; n++) p(q[n]);
                for (var a in V) V[a] = null;
                V = null;
                for (var s in swfobject) swfobject[s] = null;
                swfobject = null
            })
        }(), {
            registerObject: function (e, t, i, n) {
                if (V.w3 && e && t) {
                    var a = {};
                    a.id = e, a.swfVersion = t, a.expressInstall = i, a.callbackFn = n, H[H.length] = a, b(e, !1)
                } else n && n({
                    success: !1,
                    id: e
                })
            },
            getObjectById: function (e) {
                return V.w3 ? r(e) : void 0
            },
            embedSWF: function (e, i, n, a, s, r, c, u, d, p) {
                var f = {
                    success: !1,
                    id: i
                };
                V.w3 && !(V.wk && V.wk < 312) && e && i && n && a && s ? (b(i, !1), t(function () {
                    n += "", a += "";
                    var t = {};
                    if (d && typeof d === z)
                        for (var m in d) t[m] = d[m];
                    t.data = e, t.width = n, t.height = a;
                    var _ = {};
                    if (u && typeof u === z)
                        for (var g in u) _[g] = u[g];
                    if (c && typeof c === z)
                        for (var y in c) typeof _.flashvars != A ? _.flashvars += "&" + y + "=" + c[y] : _.flashvars = y + "=" + c[y];
                    if (v(s)) {
                        var w = h(t, _, i);
                        t.id == i && b(i, !0), f.success = !0, f.ref = w
                    } else {
                        if (r && o()) return t.data = r, l(t, _, i, p), void 0;
                        b(i, !0)
                    }
                    p && p(f)
                })) : p && p(f)
            },
            switchOffAutoHideShow: function () {
                Q = !1
            },
            ua: V,
            getFlashPlayerVersion: function () {
                return {
                    major: V.pv[0],
                    minor: V.pv[1],
                    release: V.pv[2]
                }
            },
            hasFlashPlayerVersion: v,
            createSWF: function (e, t, i) {
                return V.w3 ? h(e, t, i) : void 0
            },
            showExpressInstall: function (e, t, i, n) {
                V.w3 && o() && l(e, t, i, n)
            },
            removeSWF: function (e) {
                V.w3 && p(e)
            },
            createCSS: function (e, t, i, n) {
                V.w3 && y(e, t, i, n)
            },
            addDomLoadEvent: t,
            addLoadEvent: i,
            getQueryParamValue: function (e) {
                var t = I.location.search || I.location.hash;
                if (t) {
                    if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return w(t);
                    for (var i = t.split("&"), n = 0; n < i.length; n++)
                        if (i[n].substring(0, i[n].indexOf("=")) == e) return w(i[n].substring(i[n].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function () {
                if (W) {
                    var e = m(N);
                    e && x && (e.parentNode.replaceChild(x, e), k && (b(k, !0), V.ie && V.win && (x.style.display = "block")), $ && $(C)), W = !1
                }
            }
        }
    }();
    ! function () {
        var e, t, i, n;
        window.TBD || (window.TBD = {}), i = !1, n = !1, t = {}, e = {}, window.TBD.runTests = function (a) {
            return n = !0, e = a, i ? t.startTests() : void 0
        }, window.addEventListener("load", function () {
            var e, t, i;
            return e = document.createElement("div"), e.setAttribute("id", "diagnostic_swf"), document.body.appendChild(e), i = Math.round((new Date).getTime() / 1e3), t = {}, t.allowscriptaccess = "always", swfobject.embedSWF("http://static.opentok.com/opentok/assets/flash/user-diagnostic/Diagnostic.swf?" + i, "diagnostic_swf", "1", "1", "8", null, null, t, null)
        }), window.loadedSwf = function () {
            return i = !0, t = swfobject.getObjectById("diagnostic_swf"), n ? t.startTests() : void 0
        }, window.testsCompleted = function (t) {
            return t = JSON.parse(t), e ? e.call(TBD, t) : void 0
        }
    }.call(this)
} catch (e) {
    var msg = e.message;
    try {
        console.log(msg)
    } catch (err) {}
}
if (function () {
    var e, t = Array.prototype.slice;
    e = function () {
        function e(t, i) {
            var n, a, s;
            this.elem = $(t), a = $.extend({}, e.defaults, i);
            for (n in a) s = a[n], this[n] = s;
            this.elem.data(this.dataName, this), this.wrapCheckboxWithDivs(), this.attachEvents(), this.disableTextSelection(), this.resizeHandle && this.optionallyResize("handle"), this.resizeContainer && this.optionallyResize("container"), this.initialPosition()
        }
        return e.prototype.isDisabled = function () {
            return this.elem.is(":disabled")
        }, e.prototype.wrapCheckboxWithDivs = function () {
            return this.elem.wrap("<div class='" + this.containerClass + "' />"), this.container = this.elem.parent(), this.offLabel = $("<label class='" + this.labelOffClass + "'>\n  <span>" + this.uncheckedLabel + "</span>\n</label>").appendTo(this.container), this.offSpan = this.offLabel.children("span"), this.onLabel = $("<label class='" + this.labelOnClass + "'>\n  <span>" + this.checkedLabel + "</span>\n</label>").appendTo(this.container), this.onSpan = this.onLabel.children("span"), this.handle = $("<div class='" + this.handleClass + "'>\n  <div class='" + this.handleRightClass + "'>\n    <div class='" + this.handleCenterClass + "' />\n  </div>\n</div>").appendTo(this.container)
        }, e.prototype.disableTextSelection = function () {
            return $.browser.msie ? $([this.handle, this.offLabel, this.onLabel, this.container]).attr("unselectable", "on") : void 0
        }, e.prototype._getDimension = function (e, t) {
            return null != $.fn.actual ? e.actual(t) : e[t]()
        }, e.prototype.optionallyResize = function (e) {
            var t, i, n;
            return n = this._getDimension(this.onLabel, "width"), i = this._getDimension(this.offLabel, "width"), "container" === e ? (t = n > i ? n : i, t += this._getDimension(this.handle, "width") + this.handleMargin, this.container.css({
                width: t
            })) : (t = n > i ? n : i, this.handle.css({
                width: t
            }))
        }, e.prototype.onMouseDown = function (t) {
            var i;
            return t.preventDefault(), this.isDisabled() ? void 0 : (i = t.pageX || t.originalEvent.changedTouches[0].pageX, e.currentlyClicking = this.handle, e.dragStartPosition = i, e.handleLeftOffset = parseInt(this.handle.css("left"), 10) || 0)
        }, e.prototype.onDragMove = function (t, i) {
            var n, a;
            if (e.currentlyClicking === this.handle) return a = (i + e.handleLeftOffset - e.dragStartPosition) / this.rightSide, 0 > a && (a = 0), a > 1 && (a = 1), n = a * this.rightSide, this.handle.css({
                left: n
            }), this.onLabel.css({
                width: n + this.handleRadius
            }), this.offSpan.css({
                marginRight: -n
            }), this.onSpan.css({
                marginLeft: -(1 - a) * this.rightSide
            })
        }, e.prototype.onDragEnd = function (t, i) {
            var n;
            if (e.currentlyClicking === this.handle && !this.isDisabled()) return e.dragging ? (n = (i - e.dragStartPosition) / this.rightSide, this.elem.prop("checked", n >= .5)) : this.elem.prop("checked", !this.elem.prop("checked")), e.currentlyClicking = null, e.dragging = null, this.didChange()
        }, e.prototype.refresh = function () {
            return this.didChange()
        }, e.prototype.didChange = function () {
            var e;
            return "function" == typeof this.onChange && this.onChange(this.elem, this.elem.prop("checked")), this.isDisabled() ? (this.container.addClass(this.disabledClass), !1) : (this.container.removeClass(this.disabledClass), e = this.elem.prop("checked") ? this.rightSide : 0, this.handle.animate({
                left: e
            }, this.duration), this.onLabel.animate({
                width: e + this.handleRadius
            }, this.duration), this.offSpan.animate({
                marginRight: -e
            }, this.duration), this.onSpan.animate({
                marginLeft: e - this.rightSide
            }, this.duration))
        }, e.prototype.attachEvents = function () {
            var e, t, i;
            return i = this, e = function () {
                return i.onGlobalMove.apply(i, arguments)
            }, t = function () {
                return i.onGlobalUp.apply(i, arguments), $(document).unbind("mousemove touchmove", e), $(document).unbind("mouseup touchend", t)
            }, this.elem.change(function () {
                return i.refresh()
            }), this.container.bind("mousedown touchstart", function () {
                return i.onMouseDown.apply(i, arguments), $(document).bind("mousemove touchmove", e), $(document).bind("mouseup touchend", t)
            })
        }, e.prototype.initialPosition = function () {
            var e, t;
            return e = this._getDimension(this.container, "width"), this.offLabel.css({
                width: e - this.containerRadius
            }), t = this.containerRadius + 1, $.browser.msie && $.browser.version < 7 && (t -= 3), this.rightSide = e - this._getDimension(this.handle, "width") - t, this.elem.is(":checked") ? (this.handle.css({
                left: this.rightSide
            }), this.onLabel.css({
                width: this.rightSide + this.handleRadius
            }), this.offSpan.css({
                marginRight: -this.rightSide
            })) : (this.onLabel.css({
                width: 0
            }), this.onSpan.css({
                marginLeft: -this.rightSide
            })), this.isDisabled() ? this.container.addClass(this.disabledClass) : void 0
        }, e.prototype.onGlobalMove = function (t) {
            var i;
            if (!this.isDisabled() && e.currentlyClicking) return t.preventDefault(), i = t.pageX || t.originalEvent.changedTouches[0].pageX, !e.dragging && Math.abs(e.dragStartPosition - i) > this.dragThreshold && (e.dragging = !0), this.onDragMove(t, i)
        }, e.prototype.onGlobalUp = function (t) {
            var i;
            if (e.currentlyClicking) return t.preventDefault(), i = t.pageX || t.originalEvent.changedTouches[0].pageX, this.onDragEnd(t, i), !1
        }, e.defaults = {
            duration: 200,
            checkedLabel: "ON",
            uncheckedLabel: "OFF",
            resizeHandle: !0,
            resizeContainer: !0,
            disabledClass: "iPhoneCheckDisabled",
            containerClass: "iPhoneCheckContainer",
            labelOnClass: "iPhoneCheckLabelOn",
            labelOffClass: "iPhoneCheckLabelOff",
            handleClass: "iPhoneCheckHandle",
            handleCenterClass: "iPhoneCheckHandleCenter",
            handleRightClass: "iPhoneCheckHandleRight",
            dragThreshold: 5,
            handleMargin: 15,
            handleRadius: 4,
            containerRadius: 5,
            dataName: "iphoneStyle",
            onChange: function () {}
        }, e
    }(), $.iphoneStyle = this.iOSCheckbox = e, $.fn.iphoneStyle = function () {
        var i, n, a, s, r, o, l, c, u, h, d, p;
        for (i = 1 <= arguments.length ? t.call(arguments, 0) : [], a = null != (u = null != (h = i[0]) ? h.dataName : void 0) ? u : e.defaults.dataName, d = this.filter(":checkbox"), l = 0, c = d.length; c > l; l++) n = d[l], s = $(n).data(a), null != s ? (r = i[0], o = 2 <= i.length ? t.call(i, 1) : [], null != (p = s[r]) && p.apply(s, o)) : new e(n, i[0]);
        return this
    }, $.fn.iOSCheckbox = function (e) {
        var t;
        return null == e && (e = {}), t = $.extend({}, e, {
            resizeHandle: !1,
            disabledClass: "iOSCheckDisabled",
            containerClass: "iOSCheckContainer",
            labelOnClass: "iOSCheckLabelOn",
            labelOffClass: "iOSCheckLabelOff",
            handleClass: "iOSCheckHandle",
            handleCenterClass: "iOSCheckHandleCenter",
            handleRightClass: "iOSCheckHandleRight",
            dataName: "iOSCheckbox"
        }), this.iphoneStyle(t)
    }
}.call(this), function (e) {
    e.prompt = function (t, i) {
        i = e.extend({}, e.prompt.defaults, i), e.prompt.currentPrefix = i.prefix;
        var n = e.browser.msie && e.browser.version < 7,
            a = e(document.body),
            s = e(window);
        i.classes = e.trim(i.classes), "" != i.classes && (i.classes = " " + i.classes);
        var r = '<div class="' + i.prefix + "box" + i.classes + '" id="' + i.prefix + 'box">';
        i.useiframe && (e("object, applet").length > 0 || n) ? r += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="' + i.prefix + 'fade" id="' + i.prefix + 'fade"></iframe>' : (n && e("select").css("visibility", "hidden"), r += '<div class="' + i.prefix + 'fade" id="' + i.prefix + 'fade"></div>'), r += '<div class="' + i.prefix + '" id="' + i.prefix + '"><div class="' + i.prefix + 'container"><div class="', r += i.prefix + 'close">X</div><div id="' + i.prefix + 'states"></div>', r += "</div></div></div>";
        var o = e(r).appendTo(a),
            l = o.children("#" + i.prefix),
            c = o.children("#" + i.prefix + "fade");
        t.constructor == String && (t = {
            state0: {
                html: t,
                buttons: i.buttons,
                focus: i.focus,
                submit: i.submit
            }
        });
        var u = "";
        e.each(t, function (n, a) {
            a = e.extend({}, e.prompt.defaults.state, a), t[n] = a, u += '<div id="' + i.prefix + "_state_" + n + '" class="' + i.prefix + '_state" style="display:none;"><div class="' + i.prefix + 'message">' + a.html + '</div><div class="' + i.prefix + 'buttons">', e.each(a.buttons, function (e, t) {
                u += "object" == typeof t ? '<button name="' + i.prefix + "_" + n + "_button" + t.title.replace(/[^a-z0-9]+/gi, "") + '" id="' + i.prefix + "_" + n + "_button" + t.title.replace(/[^a-z0-9]+/gi, "") + '" value="' + t.value + '">' + t.title + "</button>" : '<button name="' + i.prefix + "_" + n + "_button" + e + '" id="' + i.prefix + "_" + n + "_button" + e + '" value="' + t + '">' + e + "</button>"
            }), u += "</div></div>"
        }), l.find("#" + i.prefix + "states").html(u).children("." + i.prefix + "_state:first").css("display", "block"), l.find("." + i.prefix + "buttons:empty").css("display", "none"), e.each(t, function (t, n) {
            var a = l.find("#" + i.prefix + "_state_" + t);
            a.children("." + i.prefix + "buttons").children("button").click(function () {
                var t = a.children("." + i.prefix + "message"),
                    s = n.buttons[e(this).text()];
                if (void 0 == s)
                    for (var r in n.buttons) n.buttons[r].title == e(this).text() && (s = n.buttons[r].value);
                "object" == typeof s && (s = s.value);
                var o = {};
                e.each(l.find("#" + i.prefix + "states :input").serializeArray(), function (e, t) {
                    void 0 === o[t.name] ? o[t.name] = t.value : typeof o[t.name] == Array || "object" == typeof o[t.name] ? o[t.name].push(t.value) : o[t.name] = [o[t.name], t.value]
                });
                var c = n.submit(s, t, o);
                (void 0 === c || c) && m(!0, s, t, o)
            }), a.find("." + i.prefix + "buttons button:eq(" + n.focus + ")").addClass(i.prefix + "defaultbutton")
        });
        var h = function () {
            if (i.persistent) {
                var t = i.top.toString().indexOf("%") >= 0 ? s.height() * (parseInt(i.top, 10) / 100) : parseInt(i.top, 10),
                    n = parseInt(l.css("top").replace("px", ""), 10) - t;
                e("html,body").animate({
                    scrollTop: n
                }, "fast", function () {
                    var e = 0;
                    o.addClass(i.prefix + "warning");
                    var t = setInterval(function () {
                        o.toggleClass(i.prefix + "warning"), e++ > 1 && (clearInterval(t), o.removeClass(i.prefix + "warning"))
                    }, 100)
                })
            } else m()
        }, d = function (t) {
                var i = window.event ? event.keyCode : t.keyCode;
                if (27 == i && h(), 9 == i) {
                    var n = e(":input:enabled:visible", o),
                        a = !t.shiftKey && t.target == n[n.length - 1],
                        s = t.shiftKey && t.target == n[0];
                    if (a || s) return setTimeout(function () {
                        if (n) {
                            var e = n[s === !0 ? n.length - 1 : 0];
                            e && e.focus()
                        }
                    }, 10), !1
                }
            }, p = function () {
                var t = a.outerHeight(!0),
                    n = s.height(),
                    r = e(document).height(),
                    u = t > n ? t : n,
                    h = parseInt(s.scrollTop(), 10) + (i.top.toString().indexOf("%") >= 0 ? n * (parseInt(i.top, 10) / 100) : parseInt(i.top, 10));
                u = u > r ? u : r, o.css({
                    position: "absolute",
                    height: u,
                    width: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }), c.css({
                    position: "absolute",
                    height: u,
                    width: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }), l.css({
                    position: "absolute",
                    top: h,
                    left: "50%",
                    marginLeft: -1 * (l.outerWidth() / 2)
                })
            }, f = function () {
                c.css({
                    zIndex: i.zIndex,
                    display: "none",
                    opacity: i.opacity
                }), l.css({
                    zIndex: i.zIndex + 1,
                    display: "none"
                }), o.css({
                    zIndex: i.zIndex
                })
            }, m = function (t, a, r, u) {
                l.remove(), s.unbind("resize", p), c.fadeOut(i.overlayspeed, function () {
                    c.unbind("click", h), c.remove(), t && i.callback(a, r, u), o.unbind("keypress", d), o.remove(), n && !i.useiframe && e("select").css("visibility", "visible")
                })
            };
        return p(), f(), c.click(h), s.resize(p), o.bind("keydown keypress", d), l.find("." + i.prefix + "close").click(m), c.fadeIn(i.overlayspeed), l[i.show](i.promptspeed, i.loaded), l.find("#" + i.prefix + "states ." + i.prefix + "_state:first ." + i.prefix + "defaultbutton").focus(), i.timeout > 0 && setTimeout(e.prompt.close, i.timeout), o
    }, e.prompt.defaults = {
        prefix: "jqi",
        classes: "",
        buttons: {
            Ok: !0
        },
        loaded: function () {},
        submit: function () {
            return !0
        },
        callback: function () {},
        opacity: .6,
        zIndex: 999,
        overlayspeed: "slow",
        promptspeed: "fast",
        show: "promptDropIn",
        focus: 0,
        useiframe: !1,
        top: "15%",
        persistent: !0,
        timeout: 0,
        state: {
            html: "",
            buttons: {
                Ok: !0
            },
            focus: 0,
            submit: function () {
                return !0
            }
        }
    }, e.prompt.currentPrefix = e.prompt.defaults.prefix, e.prompt.setDefaults = function (t) {
        e.prompt.defaults = e.extend({}, e.prompt.defaults, t)
    }, e.prompt.setStateDefaults = function (t) {
        e.prompt.defaults.state = e.extend({}, e.prompt.defaults.state, t)
    }, e.prompt.getStateContent = function (t) {
        return e("#" + e.prompt.currentPrefix + "_state_" + t)
    }, e.prompt.getCurrentState = function () {
        return e("." + e.prompt.currentPrefix + "_state:visible")
    }, e.prompt.getCurrentStateName = function () {
        var t = e.prompt.getCurrentState().attr("id");
        return t.replace(e.prompt.currentPrefix + "_state_", "")
    }, e.prompt.goToState = function (t, i) {
        e("." + e.prompt.currentPrefix + "_state").slideUp("slow"), e("#" + e.prompt.currentPrefix + "_state_" + t).slideDown("slow", function () {
            e(this).find("." + e.prompt.currentPrefix + "defaultbutton").focus(), "function" == typeof i && i()
        })
    }, e.prompt.nextState = function (t) {
        var i = e("." + e.prompt.currentPrefix + "_state:visible").next();
        e("." + e.prompt.currentPrefix + "_state").slideUp("slow"), i.slideDown("slow", function () {
            i.find("." + e.prompt.currentPrefix + "defaultbutton").focus(), "function" == typeof t && t()
        })
    }, e.prompt.prevState = function (t) {
        var i = e("." + e.prompt.currentPrefix + "_state:visible").prev();
        e("." + e.prompt.currentPrefix + "_state").slideUp("slow"), i.slideDown("slow", function () {
            i.find("." + e.prompt.currentPrefix + "defaultbutton").focus(), "function" == typeof t && t()
        })
    }, e.prompt.close = function () {
        e("#" + e.prompt.currentPrefix + "box").fadeOut("fast", function () {
            e(this).remove()
        })
    }, e.fn.extend({
        prompt: function (t) {
            void 0 == t && (t = {}), void 0 == t.withDataAndEvents && (t.withDataAndEvents = !1), e.prompt(e(this).clone(t.withDataAndEvents).html(), t)
        },
        promptDropIn: function (t, i) {
            var n = e(this);
            if ("none" == n.css("display")) {
                var a = n.css("top");
                n.css({
                    top: e(window).scrollTop(),
                    display: "block"
                }).animate({
                    top: a
                }, t, "swing", i)
            }
        }
    })
}(jQuery), function (e) {
    var t, i = {
            className: "autosizejs",
            append: "",
            callback: !1,
            resizeDelay: 10
        }, n = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
        a = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        s = e(n).data("autosize", !0)[0];
    s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && a.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function (n) {
        return n = e.extend({}, i, n || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function () {
            function i() {
                var i, r = {};
                if (t = h, s.className = n.className, l = parseInt(d.css("maxHeight"), 10), e.each(a, function (e, t) {
                    r[t] = d.css(t)
                }), e(s).css(r), "oninput" in h) {
                    var o = h.style.width;
                    h.style.width = "0px", i = h.offsetWidth, h.style.width = o
                }
            }

            function r() {
                var a, r, o, u;
                t !== h && i(), s.value = h.value + n.append, s.style.overflowY = h.style.overflowY, r = parseInt(h.style.height, 10), "getComputedStyle" in window ? (u = window.getComputedStyle(h), o = h.getBoundingClientRect().width, e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, t) {
                    o -= parseInt(u[t], 10)
                }), s.style.width = o + "px") : s.style.width = Math.max(d.width(), 0) + "px", s.scrollTop = 0, s.scrollTop = 9e4, a = s.scrollTop, l && a > l ? (h.style.overflowY = "scroll", a = l) : (h.style.overflowY = "hidden", c > a && (a = c)), a += p, r !== a && (h.style.height = a + "px", f && n.callback.call(h, h))
            }

            function o() {
                clearTimeout(u), u = setTimeout(function () {
                    d.width() !== _ && r()
                }, parseInt(n.resizeDelay, 10))
            }
            var l, c, u, h = this,
                d = e(h),
                p = 0,
                f = e.isFunction(n.callback),
                m = {
                    height: h.style.height,
                    overflow: h.style.overflow,
                    overflowY: h.style.overflowY,
                    wordWrap: h.style.wordWrap,
                    resize: h.style.resize
                }, _ = d.width();
            d.data("autosize") || (d.data("autosize", !0), ("border-box" === d.css("box-sizing") || "border-box" === d.css("-moz-box-sizing") || "border-box" === d.css("-webkit-box-sizing")) && (p = d.outerHeight() - d.height()), c = Math.max(parseInt(d.css("minHeight"), 10) - p || 0, d.height()), d.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word",
                resize: "none" === d.css("resize") || "vertical" === d.css("resize") ? "none" : "horizontal"
            }), "onpropertychange" in h ? "oninput" in h ? d.on("input.autosize keyup.autosize", r) : d.on("propertychange.autosize", function () {
                "value" === event.propertyName && r()
            }) : d.on("input.autosize", r), n.resizeDelay !== !1 && e(window).on("resize.autosize", o), d.on("autosize.resize", r), d.on("autosize.resizeIncludeStyle", function () {
                t = null, r()
            }), d.on("autosize.destroy", function () {
                t = null, clearTimeout(u), e(window).off("resize", o), d.off("autosize").off(".autosize").css(m).removeData("autosize")
            }), r())
        })
    }
}(window.jQuery || window.Zepto), function (e) {
    e.fn.bxSlider = function (t) {
        function i() {
            n(t.startingSlide), "horizontal" == t.mode ? (k.wrap('<div class="' + t.wrapperClass + '" style="width:' + E + 'px; position:relative;"></div>').wrap('<div class="bx-window" style="position:relative; overflow:hidden; width:' + E + 'px;"></div>').css({
                width: "999999px",
                position: "relative",
                left: "-" + B + "px"
            }), k.children().css({
                width: A,
                "float": "left",
                listStyle: "none"
            }), S = k.parent().parent(), C.addClass("pager")) : "vertical" == t.mode ? (k.wrap('<div class="' + t.wrapperClass + '" style="width:' + H + 'px; position:relative;"></div>').wrap('<div class="bx-window" style="width:' + H + "px; height:" + P + 'px; position:relative; overflow:hidden;"></div>').css({
                height: "999999px",
                position: "relative",
                top: "-" + W + "px"
            }), k.children().css({
                listStyle: "none",
                height: q
            }), S = k.parent().parent(), C.addClass("pager")) : "fade" == t.mode && (k.wrap('<div class="' + t.wrapperClass + '" style="width:' + H + 'px; position:relative;"></div>').wrap('<div class="bx-window" style="height:' + q + "px; width:" + H + 'px; position:relative; overflow:hidden;"></div>'), k.children().css({
                listStyle: "none",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 98
            }), S = k.parent().parent(), C.not(":eq(" + R + ")").fadeTo(0, 0), C.eq(R).css("zIndex", 99)), t.captions && null == t.captionsSelector && S.append('<div class="bx-captions"></div>')
        }

        function n() {
            if ("horizontal" == t.mode || "vertical" == t.mode) {
                var i = b(C, 0, t.moveSlideQty, "backward");
                e.each(i, function () {
                    k.prepend(e(this))
                });
                var n = C.length + t.moveSlideQty - 1,
                    a = C.length - t.displaySlideQty,
                    s = n - a,
                    r = b(C, 0, s, "forward");
                t.infiniteLoop && e.each(r, function () {
                    k.append(e(this))
                })
            }
        }

        function a() {
            "" != t.nextImage ? (nextContent = t.nextImage, nextType = "image") : (nextContent = t.nextText, nextType = "text"), "" != t.prevImage ? (prevContent = t.prevImage, prevType = "image") : (prevContent = t.prevText, prevType = "text"), d(nextType, nextContent, prevType, prevContent)
        }

        function s() {
            t.auto ? t.infiniteLoop ? "next" == t.autoDirection ? N = setInterval(function () {
                x.goToNextSlide(!1)
            }, t.pause) : "prev" == t.autoDirection && (N = setInterval(function () {
                x.goToPreviousSlide(!1)
            }, t.pause)) : "next" == t.autoDirection ? N = setInterval(function () {
                R += t.moveSlideQty, R > G && (R %= C.length), x.goToSlide(R, !1)
            }, t.pause) : "prev" == t.autoDirection && (N = setInterval(function () {
                R -= t.moveSlideQty, 0 > R && (negativeOffset = R % C.length, R = 0 == negativeOffset ? 0 : C.length + negativeOffset), x.goToSlide(R, !1)
            }, t.pause)) : t.ticker && (t.tickerSpeed *= 10, e(".pager", S).each(function () {
                Q += e(this).width(), V += e(this).height()
            }), "prev" == t.tickerDirection && "horizontal" == t.mode ? k.css("left", "-" + (Q + B) + "px") : "prev" == t.tickerDirection && "vertical" == t.mode && k.css("top", "-" + (V + W) + "px"), "horizontal" == t.mode ? (U = parseInt(k.css("left")), r(U, Q, t.tickerSpeed)) : "vertical" == t.mode && (X = parseInt(k.css("top")), r(X, V, t.tickerSpeed)), t.tickerHover && c())
        }

        function r(e, i, n) {
            "horizontal" == t.mode ? "next" == t.tickerDirection ? k.animate({
                left: "-=" + i + "px"
            }, n, "linear", function () {
                k.css("left", e), r(e, Q, t.tickerSpeed)
            }) : "prev" == t.tickerDirection && k.animate({
                left: "+=" + i + "px"
            }, n, "linear", function () {
                k.css("left", e), r(e, Q, t.tickerSpeed)
            }) : "vertical" == t.mode && ("next" == t.tickerDirection ? k.animate({
                top: "-=" + i + "px"
            }, n, "linear", function () {
                k.css("top", e), r(e, V, t.tickerSpeed)
            }) : "prev" == t.tickerDirection && k.animate({
                top: "+=" + i + "px"
            }, n, "linear", function () {
                k.css("top", e), r(e, V, t.tickerSpeed)
            }))
        }

        function o() {
            "" != t.startImage ? (startContent = t.startImage, startType = "image") : (startContent = t.startText, startType = "text"), "" != t.stopImage ? (stopContent = t.stopImage, stopType = "image") : (stopContent = t.stopText, stopType = "text"), m(startType, startContent, stopType, stopContent)
        }

        function l() {
            S.find(".bx-window").hover(function () {
                O && x.stopShow(!1)
            }, function () {
                O && x.startShow(!1)
            })
        }

        function c() {
            k.hover(function () {
                O && x.stopTicker(!1)
            }, function () {
                O && x.startTicker(!1)
            })
        }

        function u() {
            C.not(":eq(" + R + ")").fadeTo(t.speed, 0).css("zIndex", 98), C.eq(R).css("zIndex", 99).fadeTo(t.speed, 1, function () {
                Y = !1, jQuery.browser.msie && C.eq(R).get(0).style.removeAttribute("filter"), t.onAfterSlide(R, C.length, C.eq(R))
            })
        }

        function h(i) {
            "full" == t.pagerType && t.pager ? (e("a", j).removeClass(t.pagerActiveClass), e("a", j).eq(i).addClass(t.pagerActiveClass)) : "short" == t.pagerType && t.pager && e(".bx-pager-current", j).html(R + 1)
        }

        function d(i, n, a, s) {
            var r = e('<a href="" class="bx-next"></a>'),
                o = e('<a href="" class="bx-prev"></a>');
            "text" == i ? r.html(n) : r.html('<img src="' + n + '" />'), "text" == a ? o.html(s) : o.html('<img src="' + s + '" />'), t.prevSelector ? e(t.prevSelector).append(o) : S.append(o), t.nextSelector ? e(t.nextSelector).append(r) : S.append(r), r.click(function () {
                return x.goToNextSlide(), !1
            }), o.click(function () {
                return x.goToPreviousSlide(), !1
            })
        }

        function p(i) {
            var n = C.length;
            t.moveSlideQty > 1 && (n = 0 != C.length % t.moveSlideQty ? Math.ceil(C.length / t.moveSlideQty) : C.length / t.moveSlideQty);
            var a = "";
            if (t.buildPager)
                for (var s = 0; n > s; s++) a += t.buildPager(s, C.eq(s * t.moveSlideQty));
            else if ("full" == i)
                for (var s = 1; n >= s; s++) a += '<a href="" class="pager-link pager-' + s + '">' + s + "</a>";
            else "short" == i && (a = '<span class="bx-pager-current">' + (t.startingSlide + 1) + "</span> " + t.pagerShortSeparator + ' <span class="bx-pager-total">' + C.length + "</span>"); if (t.pagerSelector) e(t.pagerSelector).append(a), j = e(t.pagerSelector);
            else {
                var r = e('<div class="bx-pager"></div>');
                r.append(a), "top" == t.pagerLocation ? S.prepend(r) : "bottom" == t.pagerLocation && S.append(r), j = e(".bx-pager", S)
            }
            j.children().click(function () {
                if ("full" == t.pagerType) {
                    var e = j.children().index(this);
                    t.moveSlideQty > 1 && (e *= t.moveSlideQty), x.goToSlide(e)
                }
                return !1
            })
        }

        function f() {
            var i = e("img", C.eq(R)).attr("title");
            "" != i ? t.captionsSelector ? e(t.captionsSelector).html(i) : e(".bx-captions", S).html(i) : t.captionsSelector ? e(t.captionsSelector).html("&nbsp;") : e(".bx-captions", S).html("&nbsp;")
        }

        function m(i, n, a, s) {
            L = e('<a href="" class="bx-start"></a>'), I = "text" == i ? n : '<img src="' + n + '" />', M = "text" == a ? s : '<img src="' + s + '" />', t.autoControlsSelector ? e(t.autoControlsSelector).append(L) : (S.append('<div class="bx-auto"></div>'), e(".bx-auto", S).html(L)), L.click(function () {
                return t.ticker ? e(this).hasClass("stop") ? x.stopTicker() : e(this).hasClass("start") && x.startTicker() : e(this).hasClass("stop") ? x.stopShow(!0) : e(this).hasClass("start") && x.startShow(!0), !1
            })
        }

        function _() {
            !t.infiniteLoop && t.hideControlOnEnd && (R == K ? e(".bx-prev", S).hide() : e(".bx-prev", S).show(), R == G ? e(".bx-next", S).hide() : e(".bx-next", S).show())
        }

        function g(t, i) {
            if ("left" == i) var n = e(".pager", S).eq(t).position().left;
            else if ("top" == i) var n = e(".pager", S).eq(t).position().top;
            return n
        }

        function v() {
            var e = T.outerWidth() * t.displaySlideQty;
            return e
        }

        function y() {
            var e = T.outerHeight() * t.displaySlideQty;
            return e
        }

        function b(t, i, n, a) {
            var s = [],
                r = n,
                o = !1;
            for ("backward" == a && (t = e.makeArray(t), t.reverse()); r > 0;) e.each(t, function (t) {
                return r > 0 ? (o ? (s.push(e(this).clone()), r--) : t == i && (o = !0, s.push(e(this).clone()), r--), void 0) : !1
            });
            return s
        }
        var w = {
            mode: "horizontal",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            controls: !0,
            speed: 500,
            easing: "swing",
            pager: !1,
            pagerSelector: null,
            pagerType: "full",
            pagerLocation: "bottom",
            pagerShortSeparator: "/",
            pagerActiveClass: "pager-active",
            nextText: "next",
            nextImage: "",
            nextSelector: null,
            prevText: "prev",
            prevImage: "",
            prevSelector: null,
            captions: !1,
            captionsSelector: null,
            auto: !1,
            autoDirection: "next",
            autoControls: !1,
            autoControlsSelector: null,
            autoStart: !0,
            autoHover: !1,
            autoDelay: 0,
            pause: 3e3,
            startText: "",
            startImage: "",
            stopText: "",
            stopImage: "",
            ticker: !1,
            tickerSpeed: 5e3,
            tickerDirection: "next",
            tickerHover: !1,
            wrapperClass: "bx-wrapper",
            startingSlide: 0,
            displaySlideQty: 1,
            moveSlideQty: 1,
            randomStart: !1,
            onBeforeSlide: function () {},
            onAfterSlide: function () {},
            onLastSlide: function () {},
            onFirstSlide: function () {},
            onNextSlide: function () {},
            onPrevSlide: function () {},
            buildPager: null
        }, t = e.extend(w, t),
            x = this,
            k = "",
            $ = "",
            C = "",
            S = "",
            T = "",
            A = "",
            z = "",
            E = "",
            P = "",
            j = "",
            N = "",
            L = "",
            D = "",
            I = "",
            M = "",
            O = !0,
            F = !1,
            H = 0,
            q = 0,
            R = 0,
            B = 0,
            W = 0,
            Q = 0,
            V = 0,
            U = 0,
            X = 0,
            Y = !1,
            K = 0,
            G = C.length - 1;
        return this.goToSlide = function (e, i) {
            if (!Y) {
                if (Y = !0, R = e, t.onBeforeSlide(R, C.length, C.eq(R)), "undefined" == typeof i) var i = !0;
                i && t.auto && x.stopShow(!0), slide = e, slide == K && t.onFirstSlide(R, C.length, C.eq(R)), slide == G && t.onLastSlide(R, C.length, C.eq(R)), "horizontal" == t.mode ? k.animate({
                    left: "-" + g(slide, "left") + "px"
                }, t.speed, t.easing, function () {
                    Y = !1, t.onAfterSlide(R, C.length, C.eq(R))
                }) : "vertical" == t.mode ? k.animate({
                    top: "-" + g(slide, "top") + "px"
                }, t.speed, t.easing, function () {
                    Y = !1, t.onAfterSlide(R, C.length, C.eq(R))
                }) : "fade" == t.mode && u(), _(), t.moveSlideQty > 1 && (e = Math.floor(e / t.moveSlideQty)), h(e), f()
            }
        }, this.goToNextSlide = function (e) {
            if ("undefined" == typeof e) var e = !0;
            if (e && t.auto && x.stopShow(!0), t.infiniteLoop) {
                if (!Y) {
                    Y = !0;
                    var i = !1;
                    if (R += t.moveSlideQty, R > G && (R %= C.length, i = !0), t.onNextSlide(R, C.length, C.eq(R)), t.onBeforeSlide(R, C.length, C.eq(R)), "horizontal" == t.mode) {
                        var n = t.moveSlideQty * z;
                        k.animate({
                            left: "-=" + n + "px"
                        }, t.speed, t.easing, function () {
                            Y = !1, i && k.css("left", "-" + g(R, "left") + "px"), t.onAfterSlide(R, C.length, C.eq(R))
                        })
                    } else if ("vertical" == t.mode) {
                        var a = t.moveSlideQty * q;
                        k.animate({
                            top: "-=" + a + "px"
                        }, t.speed, t.easing, function () {
                            Y = !1, i && k.css("top", "-" + g(R, "top") + "px"), t.onAfterSlide(R, C.length, C.eq(R))
                        })
                    } else "fade" == t.mode && u();
                    t.moveSlideQty > 1 ? h(Math.ceil(R / t.moveSlideQty)) : h(R), f()
                }
            } else if (!Y) {
                var i = !1;
                R += t.moveSlideQty, G >= R ? (_(), t.onNextSlide(R, C.length, C.eq(R)), x.goToSlide(R)) : R -= t.moveSlideQty
            }
        }, this.goToPreviousSlide = function (i) {
            if ("undefined" == typeof i) var i = !0;
            if (i && t.auto && x.stopShow(!0), t.infiniteLoop) {
                if (!Y) {
                    Y = !0;
                    var n = !1;
                    if (R -= t.moveSlideQty, 0 > R && (negativeOffset = R % C.length, R = 0 == negativeOffset ? 0 : C.length + negativeOffset, n = !0), t.onPrevSlide(R, C.length, C.eq(R)), t.onBeforeSlide(R, C.length, C.eq(R)), "horizontal" == t.mode) {
                        var a = t.moveSlideQty * z;
                        k.animate({
                            left: "+=" + a + "px"
                        }, t.speed, t.easing, function () {
                            Y = !1, n && k.css("left", "-" + g(R, "left") + "px"), t.onAfterSlide(R, C.length, C.eq(R))
                        })
                    } else if ("vertical" == t.mode) {
                        var s = t.moveSlideQty * q;
                        k.animate({
                            top: "+=" + s + "px"
                        }, t.speed, t.easing, function () {
                            Y = !1, n && k.css("top", "-" + g(R, "top") + "px"), t.onAfterSlide(R, C.length, C.eq(R))
                        })
                    } else "fade" == t.mode && u();
                    t.moveSlideQty > 1 ? h(Math.ceil(R / t.moveSlideQty)) : h(R), f()
                }
            } else if (!Y) {
                var n = !1;
                R -= t.moveSlideQty, 0 > R && (R = 0, t.hideControlOnEnd && e(".bx-prev", S).hide()), _(), t.onPrevSlide(R, C.length, C.eq(R)), x.goToSlide(R)
            }
        }, this.goToFirstSlide = function (e) {
            if ("undefined" == typeof e) var e = !0;
            x.goToSlide(K, e)
        }, this.goToLastSlide = function () {
            if ("undefined" == typeof e) var e = !0;
            x.goToSlide(G, e)
        }, this.getCurrentSlide = function () {
            return R
        }, this.getSlideCount = function () {
            return C.length
        }, this.stopShow = function (e) {
            if (clearInterval(N), "undefined" == typeof e) var e = !0;
            e && t.autoControls && (L.html(I).removeClass("stop").addClass("start"), O = !1)
        }, this.startShow = function (e) {
            if ("undefined" == typeof e) var e = !0;
            s(), e && t.autoControls && (L.html(M).removeClass("start").addClass("stop"), O = !0)
        }, this.stopTicker = function (e) {
            if (k.stop(), "undefined" == typeof e) var e = !0;
            e && t.ticker && (L.html(I).removeClass("stop").addClass("start"), O = !1)
        }, this.startTicker = function (e) {
            if ("horizontal" == t.mode) {
                if ("next" == t.tickerDirection) var i = parseInt(k.css("left")),
                n = Q + i + C.eq(0).width();
                else if ("prev" == t.tickerDirection) var i = -parseInt(k.css("left")),
                n = i - C.eq(0).width();
                var a = n * t.tickerSpeed / Q;
                r(U, n, a)
            } else if ("vertical" == t.mode) {
                if ("next" == t.tickerDirection) var s = parseInt(k.css("top")),
                n = V + s + C.eq(0).height();
                else if ("prev" == t.tickerDirection) var s = -parseInt(k.css("top")),
                n = s - C.eq(0).height();
                var a = n * t.tickerSpeed / V;
                if (r(X, n, a), "undefined" == typeof e) var e = !0;
                e && t.ticker && (L.html(M).removeClass("start").addClass("stop"), O = !0)
            }
        }, this.initShow = function () {
            if (k = e(this), $ = k.clone(), C = k.children(), S = "", T = k.children(":first"), A = T.width(), H = 0, z = T.outerWidth(), q = 0, E = v(), P = y(), Y = !1, j = "", R = 0, B = 0, W = 0, N = "", L = "", D = "", I = "", M = "", O = !0, F = !1, Q = 0, V = 0, U = 0, X = 0, K = 0, G = C.length - 1, C.each(function () {
                e(this).outerHeight() > q && (q = e(this).outerHeight()), e(this).outerWidth() > H && (H = e(this).outerWidth())
            }), t.randomStart) {
                var n = Math.floor(Math.random() * C.length);
                R = n, B = z * (t.moveSlideQty + n), W = q * (t.moveSlideQty + n)
            } else R = t.startingSlide, B = z * (t.moveSlideQty + t.startingSlide), W = q * (t.moveSlideQty + t.startingSlide);
            i(), t.pager && !t.ticker && ("full" == t.pagerType ? p("full") : "short" == t.pagerType && p("short")), t.controls && !t.ticker && a(), (t.auto || t.ticker) && (t.autoControls && o(), t.autoStart ? setTimeout(function () {
                x.startShow(!0)
            }, t.autoDelay) : x.stopShow(!0), t.autoHover && !t.ticker && l()), t.moveSlideQty > 1 ? h(Math.ceil(R / t.moveSlideQty)) : h(R), _(), t.captions && f(), t.onAfterSlide(R, C.length, C.eq(R))
        }, this.destroyShow = function () {
            clearInterval(N), e(".bx-next, .bx-prev, .bx-pager, .bx-auto", S).remove(), k.unwrap().unwrap().removeAttr("style"), k.children().removeAttr("style").not(".pager").remove(), C.removeClass("pager")
        }, this.reloadShow = function () {
            x.destroyShow(), x.initShow()
        }, this.each(function () {
            e(this).children().length > 0 && x.initShow()
        }), this
    }, jQuery.fx.prototype.cur = function () {
        if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
        var e = parseFloat(jQuery.css(this.elem, this.prop));
        return e
    }
}(jQuery), function () {
    var e;
    e = function () {
        function e() {
            this.options_index = 0, this.parsed = []
        }
        return e.prototype.add_node = function (e) {
            return "OPTGROUP" === e.nodeName.toUpperCase() ? this.add_group(e) : this.add_option(e)
        }, e.prototype.add_group = function (e) {
            var t, i, n, a, s, r;
            for (t = this.parsed.length, this.parsed.push({
                array_index: t,
                group: !0,
                label: e.label,
                children: 0,
                disabled: e.disabled
            }), s = e.childNodes, r = [], n = 0, a = s.length; a > n; n++) i = s[n], r.push(this.add_option(i, t, e.disabled));
            return r
        }, e.prototype.add_option = function (e, t, i) {
            return "OPTION" === e.nodeName.toUpperCase() ? ("" !== e.text ? (null != t && (this.parsed[t].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: e.value,
                text: e.text,
                html: e.innerHTML,
                selected: e.selected,
                disabled: i === !0 ? i : e.disabled,
                group_array_index: t,
                classes: e.className,
                style: e.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, e
    }(), e.select_to_array = function (t) {
        var i, n, a, s, r;
        for (n = new e, r = t.childNodes, a = 0, s = r.length; s > a; a++) i = r[a], n.add_node(i);
        return n.parsed
    }, this.SelectParser = e
}.call(this), function () {
    var e, t;
    t = this, e = function () {
        function e(t, i) {
            this.form_field = t, this.options = null != i ? i : {}, e.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.finish_setup())
        }
        return e.prototype.set_default_values = function () {
            var e = this;
            return this.click_test_action = function (t) {
                return e.test_active_click(t)
            }, this.activate_action = function (t) {
                return e.activate_field(t)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.search_contains = this.options.search_contains || !1, this.choices = 0, this.single_backstroke_delete = this.options.single_backstroke_delete || !1, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1
        }, e.prototype.set_default_text = function () {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || e.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || e.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || e.default_no_result_text
        }, e.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, e.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, e.prototype.input_focus = function () {
            var e = this;
            if (this.is_multiple) {
                if (!this.active_field) return setTimeout(function () {
                    return e.container_mousedown()
                }, 50)
            } else if (!this.active_field) return this.activate_field()
        }, e.prototype.input_blur = function () {
            var e = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
                return e.blur_test()
            }, 100))
        }, e.prototype.result_add_option = function (e) {
            var t, i;
            return e.disabled ? "" : (e.dom_id = this.container_id + "_o_" + e.array_index, t = e.selected && this.is_multiple ? [] : ["active-result"], e.selected && t.push("result-selected"), null != e.group_array_index && t.push("group-option"), "" !== e.classes && t.push(e.classes), i = "" !== e.style.cssText ? ' style="' + e.style + '"' : "", '<li id="' + e.dom_id + '" class="' + t.join(" ") + '"' + i + ">" + e.html + "</li>")
        }, e.prototype.results_update_field = function () {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build()
        }, e.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, e.prototype.results_search = function () {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, e.prototype.choices_click = function (e) {
            return e.preventDefault(), this.results_showing ? void 0 : this.results_show()
        }, e.prototype.keyup_checker = function (e) {
            var t, i;
            switch (t = null != (i = e.which) ? i : e.keyCode, this.search_field_scale(), t) {
            case 8:
                if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0) return this.keydown_backstroke();
                if (!this.pending_backstroke) return this.result_clear_highlight(), this.results_search();
                break;
            case 13:
                if (e.preventDefault(), this.results_showing) return this.result_select(e);
                break;
            case 27:
                return this.results_showing && this.results_hide(), !0;
            case 9:
            case 38:
            case 40:
            case 16:
            case 91:
            case 17:
                break;
            default:
                return this.results_search()
            }
        }, e.prototype.generate_field_id = function () {
            var e;
            return e = this.generate_random_id(), this.form_field.id = e, e
        }, e.prototype.generate_random_char = function () {
            var e, t, i;
            return e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", i = Math.floor(Math.random() * e.length), t = e.substring(i, i + 1)
        }, e.prototype.container_width = function () {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, e.browser_is_supported = function () {
            var e;
            return "Microsoft Internet Explorer" === window.navigator.appName ? null !== (e = document.documentMode) && e >= 8 : !0
        }, e.default_multiple_text = "Select Some Options", e.default_single_text = "Select an Option", e.default_no_result_text = "No results match", e
    }(), t.AbstractChosen = e
}.call(this), function () {
    var e, t, i, n = {}.hasOwnProperty,
        a = function (e, t) {
            function i() {
                this.constructor = e
            }
            for (var a in t) n.call(t, a) && (e[a] = t[a]);
            return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
        };
    i = this, e = jQuery, e.fn.extend({
        chosen: function (i) {
            return AbstractChosen.browser_is_supported() ? this.each(function () {
                var n;
                return n = e(this), n.hasClass("chzn-done") ? void 0 : n.data("chosen", new t(this, i))
            }) : this
        }
    }), t = function (t) {
        function n() {
            return n.__super__.constructor.apply(this, arguments)
        }
        return a(n, t), n.prototype.setup = function () {
            return this.form_field_jq = e(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chzn-rtl")
        }, n.prototype.finish_setup = function () {
            return this.form_field_jq.addClass("chzn-done")
        }, n.prototype.set_up_html = function () {
            var t, i;
            return this.container_id = this.form_field.id.length ? this.form_field.id.replace(/[^\w]/g, "_") : this.generate_field_id(), this.container_id += "_chzn", t = ["chzn-container"], t.push("chzn-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chzn-rtl"), i = {
                id: this.container_id,
                "class": t.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.container = e("<div />", i), this.is_multiple ? this.container.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop"><ul class="chzn-results"></ul></div>') : this.container.html('<a href="javascript:void(0)" class="chzn-single chzn-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chzn-drop"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chzn-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chzn-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chzn-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chzn-search").first(), this.selected_item = this.container.find(".chzn-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("liszt:ready", {
                chosen: this
            })
        }, n.prototype.register_observers = function () {
            var e = this;
            return this.container.mousedown(function (t) {
                e.container_mousedown(t)
            }), this.container.mouseup(function (t) {
                e.container_mouseup(t)
            }), this.container.mouseenter(function (t) {
                e.mouse_enter(t)
            }), this.container.mouseleave(function (t) {
                e.mouse_leave(t)
            }), this.search_results.mouseup(function (t) {
                e.search_results_mouseup(t)
            }), this.search_results.mouseover(function (t) {
                e.search_results_mouseover(t)
            }), this.search_results.mouseout(function (t) {
                e.search_results_mouseout(t)
            }), this.search_results.bind("mousewheel DOMMouseScroll", function (t) {
                e.search_results_mousewheel(t)
            }), this.form_field_jq.bind("liszt:updated", function (t) {
                e.results_update_field(t)
            }), this.form_field_jq.bind("liszt:activate", function (t) {
                e.activate_field(t)
            }), this.form_field_jq.bind("liszt:open", function (t) {
                e.container_mousedown(t)
            }), this.search_field.blur(function (t) {
                e.input_blur(t)
            }), this.search_field.keyup(function (t) {
                e.keyup_checker(t)
            }), this.search_field.keydown(function (t) {
                e.keydown_checker(t)
            }), this.search_field.focus(function (t) {
                e.input_focus(t)
            }), this.is_multiple ? this.search_choices.click(function (t) {
                e.choices_click(t)
            }) : this.container.click(function (e) {
                e.preventDefault()
            })
        }, n.prototype.search_field_disabled = function () {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chzn-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus", this.activate_action), this.close_field()) : (this.container.removeClass("chzn-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus", this.activate_action))
        }, n.prototype.container_mousedown = function (t) {
            return this.is_disabled || (t && "mousedown" === t.type && !this.results_showing && t.preventDefault(), null != t && e(t.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !t || e(t.target)[0] !== this.selected_item[0] && !e(t.target).parents("a.chzn-single").length || (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), e(document).click(this.click_test_action), this.results_show()), this.activate_field())
        }, n.prototype.container_mouseup = function (e) {
            return "ABBR" !== e.target.nodeName || this.is_disabled ? void 0 : this.results_reset(e)
        }, n.prototype.search_results_mousewheel = function (e) {
            var t, i, n;
            return t = -(null != (i = e.originalEvent) ? i.wheelDelta : void 0) || (null != (n = e.originialEvent) ? n.detail : void 0), null != t ? (e.preventDefault(), "DOMMouseScroll" === e.type && (t = 40 * t), this.search_results.scrollTop(t + this.search_results.scrollTop())) : void 0
        }, n.prototype.blur_test = function () {
            return !this.active_field && this.container.hasClass("chzn-container-active") ? this.close_field() : void 0
        }, n.prototype.close_field = function () {
            return e(document).unbind("click", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chzn-container-active"), this.winnow_results_clear(), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, n.prototype.activate_field = function () {
            return this.container.addClass("chzn-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, n.prototype.test_active_click = function (t) {
            return e(t.target).parents("#" + this.container_id).length ? this.active_field = !0 : this.close_field()
        }, n.prototype.results_build = function () {
            var e, t, n, a, s;
            for (this.parsing = !0, this.results_data = i.SelectParser.select_to_array(this.form_field), this.is_multiple && this.choices > 0 ? (this.search_choices.find("li.search-choice").remove(), this.choices = 0) : this.is_multiple || (this.selected_item.addClass("chzn-default").find("span").text(this.default_text), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? this.container.addClass("chzn-container-single-nosearch") : this.container.removeClass("chzn-container-single-nosearch")), e = "", s = this.results_data, n = 0, a = s.length; a > n; n++) t = s[n], t.group ? e += this.result_add_group(t) : t.empty || (e += this.result_add_option(t), t.selected && this.is_multiple ? this.choice_build(t) : t.selected && !this.is_multiple && (this.selected_item.removeClass("chzn-default").find("span").text(t.text), this.allow_single_deselect && this.single_deselect_control_build()));
            return this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.search_results.html(e), this.parsing = !1
        }, n.prototype.result_add_group = function (t) {
            return t.disabled ? "" : (t.dom_id = this.container_id + "_g_" + t.array_index, '<li id="' + t.dom_id + '" class="group-result">' + e("<div />").text(t.label).html() + "</li>")
        }, n.prototype.result_do_highlight = function (e) {
            var t, i, n, a, s;
            if (e.length) {
                if (this.result_clear_highlight(), this.result_highlight = e, this.result_highlight.addClass("highlighted"), n = parseInt(this.search_results.css("maxHeight"), 10), s = this.search_results.scrollTop(), a = n + s, i = this.result_highlight.position().top + this.search_results.scrollTop(), t = i + this.result_highlight.outerHeight(), t >= a) return this.search_results.scrollTop(t - n > 0 ? t - n : 0);
                if (s > i) return this.search_results.scrollTop(i)
            }
        }, n.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, n.prototype.results_show = function () {
            if (null != this.result_single_selected) this.result_do_highlight(this.result_single_selected);
            else if (this.is_multiple && this.max_selected_options <= this.choices) return this.form_field_jq.trigger("liszt:maxselected", {
                chosen: this
            }), !1;
            return this.container.addClass("chzn-with-drop"), this.form_field_jq.trigger("liszt:showing_dropdown", {
                chosen: this
            }), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results()
        }, n.prototype.results_hide = function () {
            return this.result_clear_highlight(), this.container.removeClass("chzn-with-drop"), this.form_field_jq.trigger("liszt:hiding_dropdown", {
                chosen: this
            }), this.results_showing = !1
        }, n.prototype.set_tab_index = function () {
            var e;
            return this.form_field_jq.attr("tabindex") ? (e = this.form_field_jq.attr("tabindex"), this.form_field_jq.attr("tabindex", -1), this.search_field.attr("tabindex", e)) : void 0
        }, n.prototype.set_label_behavior = function () {
            var t = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = e("label[for=" + this.form_field.id + "]")), this.form_field_label.length > 0 ? this.form_field_label.click(function (e) {
                return t.is_multiple ? t.container_mousedown(e) : t.activate_field()
            }) : void 0
        }, n.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, n.prototype.search_results_mouseup = function (t) {
            var i;
            return i = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first(), i.length ? (this.result_highlight = i, this.result_select(t), this.search_field.focus()) : void 0
        }, n.prototype.search_results_mouseover = function (t) {
            var i;
            return i = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first(), i ? this.result_do_highlight(i) : void 0
        }, n.prototype.search_results_mouseout = function (t) {
            return e(t.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, n.prototype.choice_build = function (t) {
            var i, n, a, s = this;
            return this.is_multiple && this.max_selected_options <= this.choices ? (this.form_field_jq.trigger("liszt:maxselected", {
                chosen: this
            }), !1) : (i = this.container_id + "_c_" + t.array_index, this.choices += 1, n = t.disabled ? '<li class="search-choice search-choice-disabled" id="' + i + '"><span>' + t.html + "</span></li>" : '<li class="search-choice" id="' + i + '"><span>' + t.html + '</span><a href="javascript:void(0)" class="search-choice-close" rel="' + t.array_index + '"></a></li>', this.search_container.before(n), a = e("#" + i).find("a").first(), a.click(function (e) {
                return s.choice_destroy_link_click(e)
            }))
        }, n.prototype.choice_destroy_link_click = function (t) {
            return t.preventDefault(), t.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(e(t.target))
        }, n.prototype.choice_destroy = function (e) {
            return this.result_deselect(e.attr("rel")) ? (this.choices -= 1, this.show_search_field_default(), this.is_multiple && this.choices > 0 && this.search_field.val().length < 1 && this.results_hide(), e.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, n.prototype.results_reset = function () {
            return this.form_field.options[0].selected = !0, this.selected_item.find("span").text(this.default_text), this.is_multiple || this.selected_item.addClass("chzn-default"), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, n.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, n.prototype.result_select = function (e) {
            var t, i, n, a;
            return this.result_highlight ? (t = this.result_highlight, i = t.attr("id"), this.result_clear_highlight(), this.is_multiple ? this.result_deactivate(t) : (this.search_results.find(".result-selected").removeClass("result-selected"), this.result_single_selected = t, this.selected_item.removeClass("chzn-default")), t.addClass("result-selected"), a = i.substr(i.lastIndexOf("_") + 1), n = this.results_data[a], n.selected = !0, this.form_field.options[n.options_index].selected = !0, this.is_multiple ? this.choice_build(n) : (this.selected_item.find("span").first().text(n.text), this.allow_single_deselect && this.single_deselect_control_build()), (e.metaKey || e.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                selected: this.form_field.options[n.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale()) : void 0
        }, n.prototype.result_activate = function (e) {
            return e.addClass("active-result")
        }, n.prototype.result_deactivate = function (e) {
            return e.removeClass("active-result")
        }, n.prototype.result_deselect = function (t) {
            var i, n;
            return n = this.results_data[t], this.form_field.options[n.options_index].disabled ? !1 : (n.selected = !1, this.form_field.options[n.options_index].selected = !1, i = e("#" + this.container_id + "_o_" + t), i.removeClass("result-selected").addClass("active-result").show(), this.result_clear_highlight(), this.winnow_results(), this.form_field_jq.trigger("change", {
                deselected: this.form_field.options[n.options_index].value
            }), this.search_field_scale(), !0)
        }, n.prototype.single_deselect_control_build = function () {
            return this.allow_single_deselect && this.selected_item.find("abbr").length < 1 ? this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>') : void 0
        }, n.prototype.winnow_results = function () {
            var t, i, n, a, s, r, o, l, c, u, h, d, p, f, m, _, g, v;
            for (this.no_results_clear(), c = 0, u = this.search_field.val() === this.default_text ? "" : e("<div/>").text(e.trim(this.search_field.val())).html(), r = this.search_contains ? "" : "^", s = new RegExp(r + u.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"), p = new RegExp(u.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"), v = this.results_data, f = 0, _ = v.length; _ > f; f++)
                if (i = v[f], !i.disabled && !i.empty)
                    if (i.group) e("#" + i.dom_id).css("display", "none");
                    else if (!this.is_multiple || !i.selected) {
                if (t = !1, l = i.dom_id, o = e("#" + l), s.test(i.html)) t = !0, c += 1;
                else if (this.enable_split_word_search && (i.html.indexOf(" ") >= 0 || 0 === i.html.indexOf("[")) && (a = i.html.replace(/\[|\]/g, "").split(" "), a.length))
                    for (m = 0, g = a.length; g > m; m++) n = a[m], s.test(n) && (t = !0, c += 1);
                t ? (u.length ? (h = i.html.search(p), d = i.html.substr(0, h + u.length) + "</em>" + i.html.substr(h + u.length), d = d.substr(0, h) + "<em>" + d.substr(h)) : d = i.html, o.html(d), this.result_activate(o), null != i.group_array_index && e("#" + this.results_data[i.group_array_index].dom_id).css("display", "list-item")) : (this.result_highlight && l === this.result_highlight.attr("id") && this.result_clear_highlight(), this.result_deactivate(o))
            }
            return 1 > c && u.length ? this.no_results(u) : this.winnow_results_set_highlight()
        }, n.prototype.winnow_results_clear = function () {
            var t, i, n, a, s;
            for (this.search_field.val(""), i = this.search_results.find("li"), s = [], n = 0, a = i.length; a > n; n++) t = i[n], t = e(t), t.hasClass("group-result") ? s.push(t.css("display", "auto")) : this.is_multiple && t.hasClass("result-selected") ? s.push(void 0) : s.push(this.result_activate(t));
            return s
        }, n.prototype.winnow_results_set_highlight = function () {
            var e, t;
            return this.result_highlight || (t = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), e = t.length ? t.first() : this.search_results.find(".active-result").first(), null == e) ? void 0 : this.result_do_highlight(e)
        }, n.prototype.no_results = function (t) {
            var i;
            return i = e('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), i.find("span").first().html(t), this.search_results.append(i)
        }, n.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, n.prototype.keydown_arrow = function () {
            var t, i;
            return this.result_highlight ? this.results_showing && (i = this.result_highlight.nextAll("li.active-result").first(), i && this.result_do_highlight(i)) : (t = this.search_results.find("li.active-result").first(), t && this.result_do_highlight(e(t))), this.results_showing ? void 0 : this.results_show()
        }, n.prototype.keyup_arrow = function () {
            var e;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (e = this.result_highlight.prevAll("li.active-result"), e.length ? this.result_do_highlight(e.first()) : (this.choices > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, n.prototype.keydown_backstroke = function () {
            var e;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (e = this.search_container.siblings("li.search-choice").last(), e.length && !e.hasClass("search-choice-disabled") ? (this.pending_backstroke = e, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, n.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, n.prototype.keydown_checker = function (e) {
            var t, i;
            switch (t = null != (i = e.which) ? i : e.keyCode, this.search_field_scale(), 8 !== t && this.pending_backstroke && this.clear_backstroke(), t) {
            case 8:
                this.backstroke_length = this.search_field.val().length;
                break;
            case 9:
                this.results_showing && !this.is_multiple && this.result_select(e), this.mouse_on_container = !1;
                break;
            case 13:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(), this.keyup_arrow();
                break;
            case 40:
                this.keydown_arrow()
            }
        }, n.prototype.search_field_scale = function () {
            var t, i, n, a, s, r, o, l;
            if (this.is_multiple) {
                for (i = 0, r = 0, a = "position:absolute; left: -1000px; top: -1000px; display:none;", s = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], o = 0, l = s.length; l > o; o++) n = s[o], a += n + ":" + this.search_field.css(n) + ";";
                return t = e("<div />", {
                    style: a
                }), t.text(this.search_field.val()), e("body").append(t), r = t.width() + 25, t.remove(), this.f_width || (this.f_width = this.container.outerWidth()), r > this.f_width - 10 && (r = this.f_width - 10), this.search_field.css({
                    width: r + "px"
                })
            }
        }, n.prototype.generate_random_id = function () {
            var t;
            for (t = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char(); e("#" + t).length > 0;) t += this.generate_random_char();
            return t
        }, n
    }(AbstractChosen), i.Chosen = t
}.call(this), function (e, t, i) {
    function n(e) {
        return e
    }

    function a(e) {
        return decodeURIComponent(e.replace(s, " "))
    }
    var s = /\+/g;
    e.cookie = function (s, r, o) {
        if (r !== i && !/Object/.test(Object.prototype.toString.call(r))) {
            if (o = e.extend({}, e.cookie.defaults, o), null === r && (o.expires = -1), "number" == typeof o.expires) {
                var l = o.expires,
                    c = o.expires = new Date;
                c.setDate(c.getDate() + l)
            }
            return r = String(r), t.cookie = [encodeURIComponent(s), "=", o.raw ? r : encodeURIComponent(r), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")
        }
        o = r || e.cookie.defaults || {};
        for (var u, h = o.raw ? n : a, d = t.cookie.split("; "), p = 0; u = d[p] && d[p].split("="); p++)
            if (h(u.shift()) === s) return h(u.join("="));
        return null
    }, e.cookie.defaults = {}, e.removeCookie = function (t, i) {
        return null !== e.cookie(t, i) ? (e.cookie(t, null, i), !0) : !1
    }
}(jQuery, document), function (e) {
    function t() {
        function t(a) {
            var s = a || (new Date).getTime();
            s - n >= 1e3 && (e.countdown._updateTargets(), n = s), i(t)
        }
        this.regional = [], this.regional[""] = {
            labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
            labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
            compactLabels: ["y", "m", "w", "d"],
            whichLabels: null,
            timeSeparator: ":",
            isRTL: !1
        }, this._defaults = {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: "dHMS",
            layout: "",
            compact: !1,
            significant: 0,
            description: "",
            expiryUrl: "",
            expiryText: "",
            alwaysExpire: !1,
            onExpiry: null,
            onTick: null,
            tickInterval: 1
        }, e.extend(this._defaults, this.regional[""]), this._serverSyncs = [];
        var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
            n = 0;
        i ? (n = window.mozAnimationStartTime || (new Date).getTime(), i(t)) : setInterval(function () {
            e.countdown._updateTargets()
        }, 980)
    }

    function i(t, i) {
        e.extend(t, i);
        for (var n in i) null == i[n] && (t[n] = null);
        return t
    }
    var n = "countdown",
        a = 0,
        s = 1,
        r = 2,
        o = 3,
        l = 4,
        c = 5,
        u = 6;
    e.extend(t.prototype, {
        markerClassName: "hasCountdown",
        _timerTargets: [],
        setDefaults: function (e) {
            this._resetExtraLabels(this._defaults, e), i(this._defaults, e || {})
        },
        UTCDate: function (e, t, i, n, a, s, r, o) {
            "object" == typeof t && t.constructor == Date && (o = t.getMilliseconds(), r = t.getSeconds(), s = t.getMinutes(), a = t.getHours(), n = t.getDate(), i = t.getMonth(), t = t.getFullYear());
            var l = new Date;
            return l.setUTCFullYear(t), l.setUTCDate(1), l.setUTCMonth(i || 0), l.setUTCDate(n || 1), l.setUTCHours(a || 0), l.setUTCMinutes((s || 0) - (Math.abs(e) < 30 ? 60 * e : e)), l.setUTCSeconds(r || 0), l.setUTCMilliseconds(o || 0), l
        },
        periodsToSeconds: function (e) {
            return 31557600 * e[0] + 2629800 * e[1] + 604800 * e[2] + 86400 * e[3] + 3600 * e[4] + 60 * e[5] + e[6]
        },
        _settingsCountdown: function (t, i) {
            if (!i) return e.countdown._defaults;
            var a = e.data(t, n);
            return "all" == i ? a.options : a.options[i]
        },
        _attachCountdown: function (t, i) {
            var a = e(t);
            if (!a.hasClass(this.markerClassName)) {
                a.addClass(this.markerClassName);
                var s = {
                    options: e.extend({}, i),
                    _periods: [0, 0, 0, 0, 0, 0, 0]
                };
                e.data(t, n, s), this._changeCountdown(t)
            }
        },
        _addTarget: function (e) {
            this._hasTarget(e) || this._timerTargets.push(e)
        },
        _hasTarget: function (t) {
            return e.inArray(t, this._timerTargets) > -1
        },
        _removeTarget: function (t) {
            this._timerTargets = e.map(this._timerTargets, function (e) {
                return e == t ? null : e
            })
        },
        _updateTargets: function () {
            for (var e = this._timerTargets.length - 1; e >= 0; e--) this._updateCountdown(this._timerTargets[e])
        },
        _updateCountdown: function (t, i) {
            var a = e(t);
            if (i = i || e.data(t, n)) {
                a.html(this._generateHTML(i)), a[(this._get(i, "isRTL") ? "add" : "remove") + "Class"]("countdown_rtl");
                var s = this._get(i, "onTick");
                if (s) {
                    var r = "lap" != i._hold ? i._periods : this._calculatePeriods(i, i._show, this._get(i, "significant"), new Date),
                        o = this._get(i, "tickInterval");
                    (1 == o || 0 == this.periodsToSeconds(r) % o) && s.apply(t, [r])
                }
                var l = "pause" != i._hold && (i._since ? i._now.getTime() < i._since.getTime() : i._now.getTime() >= i._until.getTime());
                if (l && !i._expiring) {
                    if (i._expiring = !0, this._hasTarget(t) || this._get(i, "alwaysExpire")) {
                        this._removeTarget(t);
                        var c = this._get(i, "onExpiry");
                        c && c.apply(t, []);
                        var u = this._get(i, "expiryText");
                        if (u) {
                            var h = this._get(i, "layout");
                            i.options.layout = u, this._updateCountdown(t, i), i.options.layout = h
                        }
                        var d = this._get(i, "expiryUrl");
                        d && (window.location = d)
                    }
                    i._expiring = !1
                } else "pause" == i._hold && this._removeTarget(t);
                e.data(t, n, i)
            }
        },
        _changeCountdown: function (t, a, s) {
            if (a = a || {}, "string" == typeof a) {
                var r = a;
                a = {}, a[r] = s
            }
            var o = e.data(t, n);
            if (o) {
                this._resetExtraLabels(o.options, a), i(o.options, a), this._adjustSettings(t, o), e.data(t, n, o);
                var l = new Date;
                (o._since && o._since < l || o._until && o._until > l) && this._addTarget(t), this._updateCountdown(t, o)
            }
        },
        _resetExtraLabels: function (e, t) {
            var i = !1;
            for (var n in t)
                if ("whichLabels" != n && n.match(/[Ll]abels/)) {
                    i = !0;
                    break
                }
            if (i)
                for (var n in e) n.match(/[Ll]abels[0-9]/) && (e[n] = null)
        },
        _adjustSettings: function (e, t) {
            for (var i, n = this._get(t, "serverSync"), a = 0, s = null, r = 0; r < this._serverSyncs.length; r++)
                if (this._serverSyncs[r][0] == n) {
                    s = this._serverSyncs[r][1];
                    break
                }
            if (null != s) a = n ? s : 0, i = new Date;
            else {
                var o = n ? n.apply(e, []) : null;
                i = new Date, a = o ? i.getTime() - o.getTime() : 0, this._serverSyncs.push([n, a])
            }
            var l = this._get(t, "timezone");
            l = null == l ? -i.getTimezoneOffset() : l, t._since = this._get(t, "since"), null != t._since && (t._since = this.UTCDate(l, this._determineTime(t._since, null)), t._since && a && t._since.setMilliseconds(t._since.getMilliseconds() + a)), t._until = this.UTCDate(l, this._determineTime(this._get(t, "until"), i)), a && t._until.setMilliseconds(t._until.getMilliseconds() + a), t._show = this._determineShow(t)
        },
        _destroyCountdown: function (t) {
            var i = e(t);
            i.hasClass(this.markerClassName) && (this._removeTarget(t), i.removeClass(this.markerClassName).empty(), e.removeData(t, n))
        },
        _pauseCountdown: function (e) {
            this._hold(e, "pause")
        },
        _lapCountdown: function (e) {
            this._hold(e, "lap")
        },
        _resumeCountdown: function (e) {
            this._hold(e, null)
        },
        _hold: function (t, i) {
            var a = e.data(t, n);
            if (a) {
                if ("pause" == a._hold && !i) {
                    a._periods = a._savePeriods;
                    var s = a._since ? "-" : "+";
                    a[a._since ? "_since" : "_until"] = this._determineTime(s + a._periods[0] + "y" + s + a._periods[1] + "o" + s + a._periods[2] + "w" + s + a._periods[3] + "d" + s + a._periods[4] + "h" + s + a._periods[5] + "m" + s + a._periods[6] + "s"), this._addTarget(t)
                }
                a._hold = i, a._savePeriods = "pause" == i ? a._periods : null, e.data(t, n, a), this._updateCountdown(t, a)
            }
        },
        _getTimesCountdown: function (t) {
            var i = e.data(t, n);
            return i ? i._hold ? this._calculatePeriods(i, i._show, this._get(i, "significant"), new Date) : i._periods : null
        },
        _get: function (t, i) {
            return null != t.options[i] ? t.options[i] : e.countdown._defaults[i]
        },
        _determineTime: function (t, i) {
            var n = function (e) {
                var t = new Date;
                return t.setTime(t.getTime() + 1e3 * e), t
            }, a = function (t) {
                    t = t.toLowerCase();
                    for (var i = new Date, n = i.getFullYear(), a = i.getMonth(), s = i.getDate(), r = i.getHours(), o = i.getMinutes(), l = i.getSeconds(), c = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, u = c.exec(t); u;) {
                        switch (u[2] || "s") {
                        case "s":
                            l += parseInt(u[1], 10);
                            break;
                        case "m":
                            o += parseInt(u[1], 10);
                            break;
                        case "h":
                            r += parseInt(u[1], 10);
                            break;
                        case "d":
                            s += parseInt(u[1], 10);
                            break;
                        case "w":
                            s += 7 * parseInt(u[1], 10);
                            break;
                        case "o":
                            a += parseInt(u[1], 10), s = Math.min(s, e.countdown._getDaysInMonth(n, a));
                            break;
                        case "y":
                            n += parseInt(u[1], 10), s = Math.min(s, e.countdown._getDaysInMonth(n, a))
                        }
                        u = c.exec(t)
                    }
                    return new Date(n, a, s, r, o, l, 0)
                }, s = null == t ? i : "string" == typeof t ? a(t) : "number" == typeof t ? n(t) : t;
            return s && s.setMilliseconds(0), s
        },
        _getDaysInMonth: function (e, t) {
            return 32 - new Date(e, t, 32).getDate()
        },
        _normalLabels: function (e) {
            return e
        },
        _generateHTML: function (t) {
            var i = this._get(t, "significant");
            t._periods = t._hold ? t._periods : this._calculatePeriods(t, t._show, i, new Date);
            for (var n = !1, h = 0, d = i, p = e.extend({}, t._show), f = a; u >= f; f++) n |= "?" == t._show[f] && t._periods[f] > 0, p[f] = "?" != t._show[f] || n ? t._show[f] : null, h += p[f] ? 1 : 0, d -= t._periods[f] > 0 ? 1 : 0;
            for (var m = [!1, !1, !1, !1, !1, !1, !1], f = u; f >= a; f--) t._show[f] && (t._periods[f] ? m[f] = !0 : (m[f] = d > 0, d--));
            var _ = this._get(t, "compact"),
                g = this._get(t, "layout"),
                v = _ ? this._get(t, "compactLabels") : this._get(t, "labels"),
                y = this._get(t, "whichLabels") || this._normalLabels,
                b = this._get(t, "timeSeparator"),
                w = this._get(t, "description") || "",
                x = function (i) {
                    var n = e.countdown._get(t, "compactLabels" + y(t._periods[i]));
                    return p[i] ? t._periods[i] + (n ? n[i] : v[i]) + " " : ""
                }, k = function (n) {
                    var a = e.countdown._get(t, "labels" + y(t._periods[n]));
                    return !i && p[n] || i && m[n] ? '<span class="countdown_section"><span class="countdown_amount">' + t._periods[n] + "</span><br/>" + (a ? a[n] : v[n]) + "</span>" : ""
                };
            return g ? this._buildLayout(t, p, g, _, i, m) : (_ ? '<span class="countdown_row countdown_amount' + (t._hold ? " countdown_holding" : "") + '">' + x(a) + x(s) + x(r) + x(o) + (p[l] ? this._minDigits(t._periods[l], 2) : "") + (p[c] ? (p[l] ? b : "") + this._minDigits(t._periods[c], 2) : "") + (p[u] ? (p[l] || p[c] ? b : "") + this._minDigits(t._periods[u], 2) : "") : '<span class="countdown_row countdown_show' + (i || h) + (t._hold ? " countdown_holding" : "") + '">' + k(a) + k(s) + k(r) + k(o) + k(l) + k(c) + k(u)) + "</span>" + (w ? '<span class="countdown_row countdown_descr">' + w + "</span>" : "")
        },
        _buildLayout: function (t, i, n, h, d, p) {
            for (var f = this._get(t, h ? "compactLabels" : "labels"), m = this._get(t, "whichLabels") || this._normalLabels, _ = function (i) {
                    return (e.countdown._get(t, (h ? "compactLabels" : "labels") + m(t._periods[i])) || f)[i]
                }, g = function (e, t) {
                    return Math.floor(e / t) % 10
                }, v = {
                    desc: this._get(t, "description"),
                    sep: this._get(t, "timeSeparator"),
                    yl: _(a),
                    yn: t._periods[a],
                    ynn: this._minDigits(t._periods[a], 2),
                    ynnn: this._minDigits(t._periods[a], 3),
                    y1: g(t._periods[a], 1),
                    y10: g(t._periods[a], 10),
                    y100: g(t._periods[a], 100),
                    y1000: g(t._periods[a], 1e3),
                    ol: _(s),
                    on: t._periods[s],
                    onn: this._minDigits(t._periods[s], 2),
                    onnn: this._minDigits(t._periods[s], 3),
                    o1: g(t._periods[s], 1),
                    o10: g(t._periods[s], 10),
                    o100: g(t._periods[s], 100),
                    o1000: g(t._periods[s], 1e3),
                    wl: _(r),
                    wn: t._periods[r],
                    wnn: this._minDigits(t._periods[r], 2),
                    wnnn: this._minDigits(t._periods[r], 3),
                    w1: g(t._periods[r], 1),
                    w10: g(t._periods[r], 10),
                    w100: g(t._periods[r], 100),
                    w1000: g(t._periods[r], 1e3),
                    dl: _(o),
                    dn: t._periods[o],
                    dnn: this._minDigits(t._periods[o], 2),
                    dnnn: this._minDigits(t._periods[o], 3),
                    d1: g(t._periods[o], 1),
                    d10: g(t._periods[o], 10),
                    d100: g(t._periods[o], 100),
                    d1000: g(t._periods[o], 1e3),
                    hl: _(l),
                    hn: t._periods[l],
                    hnn: this._minDigits(t._periods[l], 2),
                    hnnn: this._minDigits(t._periods[l], 3),
                    h1: g(t._periods[l], 1),
                    h10: g(t._periods[l], 10),
                    h100: g(t._periods[l], 100),
                    h1000: g(t._periods[l], 1e3),
                    ml: _(c),
                    mn: t._periods[c],
                    mnn: this._minDigits(t._periods[c], 2),
                    mnnn: this._minDigits(t._periods[c], 3),
                    m1: g(t._periods[c], 1),
                    m10: g(t._periods[c], 10),
                    m100: g(t._periods[c], 100),
                    m1000: g(t._periods[c], 1e3),
                    sl: _(u),
                    sn: t._periods[u],
                    snn: this._minDigits(t._periods[u], 2),
                    snnn: this._minDigits(t._periods[u], 3),
                    s1: g(t._periods[u], 1),
                    s10: g(t._periods[u], 10),
                    s100: g(t._periods[u], 100),
                    s1000: g(t._periods[u], 1e3)
                }, y = n, b = a; u >= b; b++) {
                var w = "yowdhms".charAt(b),
                    x = new RegExp("\\{" + w + "<\\}(.*)\\{" + w + ">\\}", "g");
                y = y.replace(x, !d && i[b] || d && p[b] ? "$1" : "")
            }
            return e.each(v, function (e, t) {
                var i = new RegExp("\\{" + e + "\\}", "g");
                y = y.replace(i, t)
            }), y
        },
        _minDigits: function (e, t) {
            return e = "" + e, e.length >= t ? e : (e = "0000000000" + e, e.substr(e.length - t))
        },
        _determineShow: function (e) {
            var t = this._get(e, "format"),
                i = [];
            return i[a] = t.match("y") ? "?" : t.match("Y") ? "!" : null, i[s] = t.match("o") ? "?" : t.match("O") ? "!" : null, i[r] = t.match("w") ? "?" : t.match("W") ? "!" : null, i[o] = t.match("d") ? "?" : t.match("D") ? "!" : null, i[l] = t.match("h") ? "?" : t.match("H") ? "!" : null, i[c] = t.match("m") ? "?" : t.match("M") ? "!" : null, i[u] = t.match("s") ? "?" : t.match("S") ? "!" : null, i
        },
        _calculatePeriods: function (t, i, n, h) {
            t._now = h, t._now.setMilliseconds(0);
            var d = new Date(t._now.getTime());
            t._since ? h.getTime() < t._since.getTime() ? t._now = h = d : h = t._since : (d.setTime(t._until.getTime()), h.getTime() > t._until.getTime() && (t._now = h = d));
            var p = [0, 0, 0, 0, 0, 0, 0];
            if (i[a] || i[s]) {
                var f = e.countdown._getDaysInMonth(h.getFullYear(), h.getMonth()),
                    m = e.countdown._getDaysInMonth(d.getFullYear(), d.getMonth()),
                    _ = d.getDate() == h.getDate() || d.getDate() >= Math.min(f, m) && h.getDate() >= Math.min(f, m),
                    g = function (e) {
                        return 60 * (60 * e.getHours() + e.getMinutes()) + e.getSeconds()
                    }, v = Math.max(0, 12 * (d.getFullYear() - h.getFullYear()) + d.getMonth() - h.getMonth() + (d.getDate() < h.getDate() && !_ || _ && g(d) < g(h) ? -1 : 0));
                p[a] = i[a] ? Math.floor(v / 12) : 0, p[s] = i[s] ? v - 12 * p[a] : 0, h = new Date(h.getTime());
                var y = h.getDate() == f,
                    b = e.countdown._getDaysInMonth(h.getFullYear() + p[a], h.getMonth() + p[s]);
                h.getDate() > b && h.setDate(b), h.setFullYear(h.getFullYear() + p[a]), h.setMonth(h.getMonth() + p[s]), y && h.setDate(b)
            }
            var w = Math.floor((d.getTime() - h.getTime()) / 1e3),
                x = function (e, t) {
                    p[e] = i[e] ? Math.floor(w / t) : 0, w -= p[e] * t
                };
            if (x(r, 604800), x(o, 86400), x(l, 3600), x(c, 60), x(u, 1), w > 0 && !t._since)
                for (var k = [1, 12, 4.3482, 7, 24, 60, 60], $ = u, C = 1, S = u; S >= a; S--) i[S] && (p[$] >= C && (p[$] = 0, w = 1), w > 0 && (p[S]++, w = 0, $ = S, C = 1)), C *= k[S];
            if (n)
                for (var S = a; u >= S; S++) n && p[S] ? n-- : n || (p[S] = 0);
            return p
        }
    }), e.fn.countdown = function (t) {
        var i = Array.prototype.slice.call(arguments, 1);
        return "getTimes" == t || "settings" == t ? e.countdown["_" + t + "Countdown"].apply(e.countdown, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof t ? e.countdown["_" + t + "Countdown"].apply(e.countdown, [this].concat(i)) : e.countdown._attachCountdown(this, t)
        })
    }, e.countdown = new t
}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, i, n, a) {
        return jQuery.easing[jQuery.easing.def](e, t, i, n, a)
    },
    easeInQuad: function (e, t, i, n, a) {
        return n * (t /= a) * t + i
    },
    easeOutQuad: function (e, t, i, n, a) {
        return -n * (t /= a) * (t - 2) + i
    },
    easeInOutQuad: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t + i : -n / 2 * (--t * (t - 2) - 1) + i
    },
    easeInCubic: function (e, t, i, n, a) {
        return n * (t /= a) * t * t + i
    },
    easeOutCubic: function (e, t, i, n, a) {
        return n * ((t = t / a - 1) * t * t + 1) + i
    },
    easeInOutCubic: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t + i : n / 2 * ((t -= 2) * t * t + 2) + i
    },
    easeInQuart: function (e, t, i, n, a) {
        return n * (t /= a) * t * t * t + i
    },
    easeOutQuart: function (e, t, i, n, a) {
        return -n * ((t = t / a - 1) * t * t * t - 1) + i
    },
    easeInOutQuart: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t * t + i : -n / 2 * ((t -= 2) * t * t * t - 2) + i
    },
    easeInQuint: function (e, t, i, n, a) {
        return n * (t /= a) * t * t * t * t + i
    },
    easeOutQuint: function (e, t, i, n, a) {
        return n * ((t = t / a - 1) * t * t * t * t + 1) + i
    },
    easeInOutQuint: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t * t * t + i : n / 2 * ((t -= 2) * t * t * t * t + 2) + i
    },
    easeInSine: function (e, t, i, n, a) {
        return -n * Math.cos(t / a * (Math.PI / 2)) + n + i
    },
    easeOutSine: function (e, t, i, n, a) {
        return n * Math.sin(t / a * (Math.PI / 2)) + i
    },
    easeInOutSine: function (e, t, i, n, a) {
        return -n / 2 * (Math.cos(Math.PI * t / a) - 1) + i
    },
    easeInExpo: function (e, t, i, n, a) {
        return 0 == t ? i : n * Math.pow(2, 10 * (t / a - 1)) + i
    },
    easeOutExpo: function (e, t, i, n, a) {
        return t == a ? i + n : n * (-Math.pow(2, -10 * t / a) + 1) + i
    },
    easeInOutExpo: function (e, t, i, n, a) {
        return 0 == t ? i : t == a ? i + n : (t /= a / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + i : n / 2 * (-Math.pow(2, -10 * --t) + 2) + i
    },
    easeInCirc: function (e, t, i, n, a) {
        return -n * (Math.sqrt(1 - (t /= a) * t) - 1) + i
    },
    easeOutCirc: function (e, t, i, n, a) {
        return n * Math.sqrt(1 - (t = t / a - 1) * t) + i
    },
    easeInOutCirc: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + i : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
    },
    easeInElastic: function (e, t, i, n, a) {
        var s = 1.70158,
            r = 0,
            o = n;
        if (0 == t) return i;
        if (1 == (t /= a)) return i + n;
        if (r || (r = .3 * a), o < Math.abs(n)) {
            o = n;
            var s = r / 4
        } else var s = r / (2 * Math.PI) * Math.asin(n / o);
        return -(o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * a - s) * 2 * Math.PI / r)) + i
    },
    easeOutElastic: function (e, t, i, n, a) {
        var s = 1.70158,
            r = 0,
            o = n;
        if (0 == t) return i;
        if (1 == (t /= a)) return i + n;
        if (r || (r = .3 * a), o < Math.abs(n)) {
            o = n;
            var s = r / 4
        } else var s = r / (2 * Math.PI) * Math.asin(n / o);
        return o * Math.pow(2, -10 * t) * Math.sin((t * a - s) * 2 * Math.PI / r) + n + i
    },
    easeInOutElastic: function (e, t, i, n, a) {
        var s = 1.70158,
            r = 0,
            o = n;
        if (0 == t) return i;
        if (2 == (t /= a / 2)) return i + n;
        if (r || (r = a * .3 * 1.5), o < Math.abs(n)) {
            o = n;
            var s = r / 4
        } else var s = r / (2 * Math.PI) * Math.asin(n / o);
        return 1 > t ? -.5 * o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * a - s) * 2 * Math.PI / r) + i : .5 * o * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * a - s) * 2 * Math.PI / r) + n + i
    },
    easeInBack: function (e, t, i, n, a, s) {
        return void 0 == s && (s = 1.70158), n * (t /= a) * t * ((s + 1) * t - s) + i
    },
    easeOutBack: function (e, t, i, n, a, s) {
        return void 0 == s && (s = 1.70158), n * ((t = t / a - 1) * t * ((s + 1) * t + s) + 1) + i
    },
    easeInOutBack: function (e, t, i, n, a, s) {
        return void 0 == s && (s = 1.70158), (t /= a / 2) < 1 ? n / 2 * t * t * (((s *= 1.525) + 1) * t - s) + i : n / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + i
    },
    easeInBounce: function (e, t, i, n, a) {
        return n - jQuery.easing.easeOutBounce(e, a - t, 0, n, a) + i
    },
    easeOutBounce: function (e, t, i, n, a) {
        return (t /= a) < 1 / 2.75 ? n * 7.5625 * t * t + i : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
    },
    easeInOutBounce: function (e, t, i, n, a) {
        return a / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, a) + i : .5 * jQuery.easing.easeOutBounce(e, 2 * t - a, 0, n, a) + .5 * n + i
    }
}), function (e) {
    e.imageTick = {
        logging: !1
    }, e.fn.imageTick = function (t, i) {
        function n() {
            e.imageTick.logging && console && console.log && console.log.apply(console, arguments)
        }

        function a(e) {
            var t = e.src.split("/").pop(),
                i = o.no_tick_image_path.split("/").pop();
            return t == i
        }

        function s(t, i) {
            if (t) "radio" == i && e("." + o.image_tick_class).removeClass(o.custom_button_selected_class), e(this).toggleClass(o.custom_button_selected_class);
            else {
                if ("checkbox" == i) var n = a(this) ? o.tick_image_path : o.no_tick_image_path;
                else {
                    e("." + o.image_tick_class).attr("src", o.no_tick_image_path);
                    var n = o.tick_image_path
                }
                this.src = n
            }
        }
        var r = {
            tick_image_path: "",
            no_tick_image_path: "",
            image_tick_class: "ticks_" + Math.floor(999999 * Math.random()),
            img_html: '<img src="%s1" alt="no_tick" class="%s2" id="tick_img_%s3" />',
            custom_button: !1,
            custom_button_selected_class: "selected"
        }, o = e.extend({}, r, t);
        if (o._tick_img_id_format = "tick_img_%s", o._valid_types = ["checkbox", "radio"], "disabled" === t) {
            if (-1 == this.selector.indexOf("#")) return n('COULD NOT DISABLE "' + this.selector + '": You need to specify the id of the <input> when calling disabled true/false.'), void 0;
            var l = e("#" + o._tick_img_id_format.replace("%s", this[0].id));
            return i ? (e(this).attr("disabled", "disabled"), method_type = "add") : (e(this).removeAttr("disabled"), method_type = "remove"), l[method_type + "Class"]("disabled"), void 0
        }
        return this.each(function () {
            var t = e(this),
                i = t[0].type;
            if (-1 == e.inArray(i, o._valid_types)) throw new Error(i + " is not a valid input type. Must be radio or checkbox.");
            var n = t[0].id,
                a = e("#" + n),
                r = e("label[for='" + n + "']"),
                l = o._tick_img_id_format.replace("%s", n),
                c = e.isFunction(o.custom_button),
                u = "";
            u = c ? e(o.custom_button(r)).attr("id", l.replace("%s", n)).addClass(o.image_tick_class) : o.img_html.replace("%s1", o.no_tick_image_path).replace("%s2", o.image_tick_class).replace("%s3", n), t.before(u).hide();
            var h = e("#" + l);
            a[0].disabled && h.addClass("disabled"), t[0].checked && (h[0].src ? h[0].src = o.tick_image_path : h.addClass(o.custom_button_selected_class)), h.click(function () {
                a[0].disabled || (a.trigger("click"), s.call(this, c, i, a))
            }), r.length && r.click(function (e) {
                e.preventDefault(), h.trigger("click")
            })
        })
    }
}(jQuery), function (e) {
    var t = {
        vertical: !1,
        rtl: !1,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: "normal",
        easing: "swing",
        auto: 0,
        wrap: null,
        initCallback: null,
        setupCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        animationStepCallback: null,
        buttonNextHTML: "<div></div>",
        buttonPrevHTML: "<div></div>",
        buttonNextEvent: "click",
        buttonPrevEvent: "click",
        buttonNextCallback: null,
        buttonPrevCallback: null,
        itemFallbackDimension: null
    }, i = !1;
    e(window).bind("load.jcarousel", function () {
        i = !0
    }), e.jcarousel = function (n, a) {
        this.options = e.extend({}, t, a || {}), this.autoStopped = this.locked = !1, this.buttonPrevState = this.buttonNextState = this.buttonPrev = this.buttonNext = this.list = this.clip = this.container = null, a && void 0 !== a.rtl || (this.options.rtl = "rtl" == (e(n).attr("dir") || e("html").attr("dir") || "").toLowerCase()), this.wh = this.options.vertical ? "height" : "width", this.lt = this.options.vertical ? "top" : this.options.rtl ? "right" : "left";
        for (var s = "", r = n.className.split(" "), o = 0; o < r.length; o++)
            if (-1 != r[o].indexOf("jcarousel-skin")) {
                e(n).removeClass(r[o]), s = r[o];
                break
            }
            "UL" == n.nodeName.toUpperCase() || "OL" == n.nodeName.toUpperCase() ? (this.list = e(n), this.clip = this.list.parents(".jcarousel-clip"), this.container = this.list.parents(".jcarousel-container")) : (this.container = e(n), this.list = this.container.find("ul,ol").eq(0), this.clip = this.container.find(".jcarousel-clip")), 0 === this.clip.size() && (this.clip = this.list.wrap("<div></div>").parent()), 0 === this.container.size() && (this.container = this.clip.wrap("<div></div>").parent()), "" !== s && -1 == this.container.parent()[0].className.indexOf("jcarousel-skin") && this.container.wrap('<div class=" ' + s + '"></div>'), this.buttonPrev = e(".jcarousel-prev", this.container), 0 === this.buttonPrev.size() && null !== this.options.buttonPrevHTML && (this.buttonPrev = e(this.options.buttonPrevHTML).appendTo(this.container)), this.buttonPrev.addClass(this.className("jcarousel-prev")), this.buttonNext = e(".jcarousel-next", this.container), 0 === this.buttonNext.size() && null !== this.options.buttonNextHTML && (this.buttonNext = e(this.options.buttonNextHTML).appendTo(this.container)), this.buttonNext.addClass(this.className("jcarousel-next")), this.clip.addClass(this.className("jcarousel-clip")).css({
            position: "relative"
        }), this.list.addClass(this.className("jcarousel-list")).css({
            overflow: "hidden",
            position: "relative",
            top: 0,
            margin: 0,
            padding: 0
        }).css(this.options.rtl ? "right" : "left", 0), this.container.addClass(this.className("jcarousel-container")).css({
            position: "relative"
        }), !this.options.vertical && this.options.rtl && this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
        var l = null !== this.options.visible ? Math.ceil(this.clipping() / this.options.visible) : null,
            s = this.list.children("li"),
            c = this;
        if (s.size() > 0) {
            var u = 0,
                h = this.options.offset;
            s.each(function () {
                c.format(this, h++), u += c.dimension(this, l)
            }), this.list.css(this.wh, u + 100 + "px"), a && void 0 !== a.size || (this.options.size = s.size())
        }
        this.container.css("display", "block"), this.buttonNext.css("display", "block"), this.buttonPrev.css("display", "block"), this.funcNext = function () {
            c.next()
        }, this.funcPrev = function () {
            c.prev()
        }, this.funcResize = function () {
            c.resizeTimer && clearTimeout(c.resizeTimer), c.resizeTimer = setTimeout(function () {
                c.reload()
            }, 100)
        }, null !== this.options.initCallback && this.options.initCallback(this, "init"), !i && e.browser.safari ? (this.buttons(!1, !1), e(window).bind("load.jcarousel", function () {
            c.setup()
        })) : this.setup()
    };
    var n = e.jcarousel;
    n.fn = n.prototype = {
        jcarousel: "0.2.8"
    }, n.fn.extend = n.extend = e.extend, n.fn.extend({
        setup: function () {
            if (this.prevLast = this.prevFirst = this.last = this.first = null, this.animating = !1, this.tail = this.resizeTimer = this.timer = null, this.inTail = !1, !this.locked) {
                this.list.css(this.lt, this.pos(this.options.offset) + "px");
                var t = this.pos(this.options.start, !0);
                this.prevFirst = this.prevLast = null, this.animate(t, !1), e(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize), null !== this.options.setupCallback && this.options.setupCallback(this)
            }
        },
        reset: function () {
            this.list.empty(), this.list.css(this.lt, "0px"), this.list.css(this.wh, "10px"), null !== this.options.initCallback && this.options.initCallback(this, "reset"), this.setup()
        },
        reload: function () {
            if (null !== this.tail && this.inTail && this.list.css(this.lt, n.intval(this.list[0].style[this.lt]) + this.tail), this.tail = null, this.inTail = !1, null !== this.options.reloadCallback && this.options.reloadCallback(this), null !== this.options.visible) {
                var e = this,
                    t = Math.ceil(this.clipping() / this.options.visible),
                    i = 0,
                    a = 0;
                this.list.children("li").each(function (n) {
                    i += e.dimension(this, t), n + 1 < e.first && (a = i)
                }), this.list.css(this.wh, i + "px"), this.list.css(this.lt, -a + "px")
            }
            this.scroll(this.first, !1)
        },
        lock: function () {
            this.locked = !0, this.buttons()
        },
        unlock: function () {
            this.locked = !1, this.buttons()
        },
        size: function (e) {
            return void 0 !== e && (this.options.size = e, this.locked || this.buttons()), this.options.size
        },
        has: function (e, t) {
            void 0 !== t && t || (t = e), null !== this.options.size && t > this.options.size && (t = this.options.size);
            for (var i = e; t >= i; i++) {
                var n = this.get(i);
                if (!n.length || n.hasClass("jcarousel-item-placeholder")) return !1
            }
            return !0
        },
        get: function (t) {
            return e(">.jcarousel-item-" + t, this.list)
        },
        add: function (t, i) {
            var a = this.get(t),
                s = 0,
                r = e(i);
            if (0 === a.length) {
                for (var o, l = n.intval(t), a = this.create(t);;)
                    if (o = this.get(--l), 0 >= l || o.length) {
                        0 >= l ? this.list.prepend(a) : o.after(a);
                        break
                    }
            } else s = this.dimension(a);
            return "LI" == r.get(0).nodeName.toUpperCase() ? (a.replaceWith(r), a = r) : a.empty().append(i), this.format(a.removeClass(this.className("jcarousel-item-placeholder")), t), r = null !== this.options.visible ? Math.ceil(this.clipping() / this.options.visible) : null, s = this.dimension(a, r) - s, t > 0 && t < this.first && this.list.css(this.lt, n.intval(this.list[0].style[this.lt]) - s + "px"), this.list.css(this.wh, n.intval(this.list.css(this.wh)) + s + "px"), a
        },
        remove: function (e) {
            var t = this.get(e);
            if (t.length && !(e >= this.first && e <= this.last)) {
                var i = this.dimension(t);
                e < this.first && this.list.css(this.lt, n.intval(this.list[0].style[this.lt]) + i + "px"), t.remove(), this.list.css(this.wh, n.intval(this.list.css(this.wh)) - i + "px")
            }
        },
        next: function () {
            null === this.tail || this.inTail ? this.scroll("both" != this.options.wrap && "last" != this.options.wrap || null === this.options.size || this.last != this.options.size ? this.first + this.options.scroll : 1) : this.scrollTail(!1)
        },
        prev: function () {
            null !== this.tail && this.inTail ? this.scrollTail(!0) : this.scroll("both" != this.options.wrap && "first" != this.options.wrap || null === this.options.size || 1 != this.first ? this.first - this.options.scroll : this.options.size)
        },
        scrollTail: function (e) {
            if (!this.locked && !this.animating && this.tail) {
                this.pauseAuto();
                var t = n.intval(this.list[0].style[this.lt]),
                    t = e ? t + this.tail : t - this.tail;
                this.inTail = !e, this.prevFirst = this.first, this.prevLast = this.last, this.animate(t)
            }
        },
        scroll: function (e, t) {
            !this.locked && !this.animating && (this.pauseAuto(), this.animate(this.pos(e), t))
        },
        pos: function (e, t) {
            var i = n.intval(this.list[0].style[this.lt]);
            if (this.locked || this.animating) return i;
            "circular" != this.options.wrap && (e = 1 > e ? 1 : this.options.size && e > this.options.size ? this.options.size : e);
            for (var a = this.first > e, s = "circular" != this.options.wrap && this.first <= 1 ? 1 : this.first, r = a ? this.get(s) : this.get(this.last), o = a ? s : s - 1, l = null, c = 0, u = !1, h = 0; a ? --o >= e : ++o < e;) l = this.get(o), u = !l.length, 0 === l.length && (l = this.create(o).addClass(this.className("jcarousel-item-placeholder")), r[a ? "before" : "after"](l), null !== this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= o || o > this.options.size)) && (r = this.get(this.index(o)), r.length && (l = this.add(o, r.clone(!0)))), r = l, h = this.dimension(l), u && (c += h), null !== this.first && ("circular" == this.options.wrap || o >= 1 && (null === this.options.size || o <= this.options.size)) && (i = a ? i + h : i - h);
            for (var s = this.clipping(), d = [], p = 0, f = 0, r = this.get(e - 1), o = e; ++p;) {
                if (l = this.get(o), u = !l.length, 0 === l.length && (l = this.create(o).addClass(this.className("jcarousel-item-placeholder")), 0 === r.length ? this.list.prepend(l) : r[a ? "before" : "after"](l), null !== this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= o || o > this.options.size) && (r = this.get(this.index(o)), r.length && (l = this.add(o, r.clone(!0))))), r = l, h = this.dimension(l), 0 === h) throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");
                if ("circular" != this.options.wrap && null !== this.options.size && o > this.options.size ? d.push(l) : u && (c += h), f += h, f >= s) break;
                o++
            }
            for (l = 0; l < d.length; l++) d[l].remove();
            if (c > 0 && (this.list.css(this.wh, this.dimension(this.list) + c + "px"), a && (i -= c, this.list.css(this.lt, n.intval(this.list[0].style[this.lt]) - c + "px"))), c = e + p - 1, "circular" != this.options.wrap && this.options.size && c > this.options.size && (c = this.options.size), o > c)
                for (p = 0, o = c, f = 0; ++p && (l = this.get(o--), l.length) && (f += this.dimension(l), !(f >= s)););
            for (o = c - p + 1, "circular" != this.options.wrap && 1 > o && (o = 1), this.inTail && a && (i += this.tail, this.inTail = !1), this.tail = null, "circular" != this.options.wrap && c == this.options.size && c - p + 1 >= 1 && (a = n.intval(this.get(c).css(this.options.vertical ? "marginBottom" : "marginRight")), f - a > s) && (this.tail = f - s - a), t && e === this.options.size && this.tail && (i -= this.tail, this.inTail = !0); e-- > o;) i += this.dimension(this.get(e));
            return this.prevFirst = this.first, this.prevLast = this.last, this.first = o, this.last = c, i
        },
        animate: function (t, i) {
            if (!this.locked && !this.animating) {
                this.animating = !0;
                var n = this,
                    a = function () {
                        if (n.animating = !1, 0 === t && n.list.css(n.lt, 0), !n.autoStopped && ("circular" == n.options.wrap || "both" == n.options.wrap || "last" == n.options.wrap || null === n.options.size || n.last < n.options.size || n.last == n.options.size && null !== n.tail && !n.inTail) && n.startAuto(), n.buttons(), n.notify("onAfterAnimation"), "circular" == n.options.wrap && null !== n.options.size)
                            for (var e = n.prevFirst; e <= n.prevLast; e++) null !== e && !(e >= n.first && e <= n.last) && (1 > e || e > n.options.size) && n.remove(e)
                    };
                if (this.notify("onBeforeAnimation"), this.options.animation && i !== !1) {
                    var s = this.options.vertical ? {
                        top: t
                    } : this.options.rtl ? {
                        right: t
                    } : {
                        left: t
                    }, a = {
                            duration: this.options.animation,
                            easing: this.options.easing,
                            complete: a
                        };
                    e.isFunction(this.options.animationStepCallback) && (a.step = this.options.animationStepCallback), this.list.animate(s, a)
                } else this.list.css(this.lt, t + "px"), a()
            }
        },
        startAuto: function (e) {
            if (void 0 !== e && (this.options.auto = e), 0 === this.options.auto) return this.stopAuto();
            if (null === this.timer) {
                this.autoStopped = !1;
                var t = this;
                this.timer = window.setTimeout(function () {
                    t.next()
                }, 1e3 * this.options.auto)
            }
        },
        stopAuto: function () {
            this.pauseAuto(), this.autoStopped = !0
        },
        pauseAuto: function () {
            null !== this.timer && (window.clearTimeout(this.timer), this.timer = null)
        },
        buttons: function (e, t) {
            null != e || (e = !this.locked && 0 !== this.options.size && (this.options.wrap && "first" != this.options.wrap || null === this.options.size || this.last < this.options.size), this.locked || this.options.wrap && "first" != this.options.wrap || null === this.options.size || !(this.last >= this.options.size)) || (e = null !== this.tail && !this.inTail), null != t || (t = !this.locked && 0 !== this.options.size && (this.options.wrap && "last" != this.options.wrap || this.first > 1), this.locked || this.options.wrap && "last" != this.options.wrap || null === this.options.size || 1 != this.first) || (t = null !== this.tail && this.inTail);
            var i = this;
            this.buttonNext.size() > 0 ? (this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), e && this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), this.buttonNext[e ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", e ? !1 : !0), null !== this.options.buttonNextCallback && this.buttonNext.data("jcarouselstate") != e && this.buttonNext.each(function () {
                i.options.buttonNextCallback(i, this, e)
            }).data("jcarouselstate", e)) : null !== this.options.buttonNextCallback && this.buttonNextState != e && this.options.buttonNextCallback(i, null, e), this.buttonPrev.size() > 0 ? (this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), t && this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), this.buttonPrev[t ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", t ? !1 : !0), null !== this.options.buttonPrevCallback && this.buttonPrev.data("jcarouselstate") != t && this.buttonPrev.each(function () {
                i.options.buttonPrevCallback(i, this, t)
            }).data("jcarouselstate", t)) : null !== this.options.buttonPrevCallback && this.buttonPrevState != t && this.options.buttonPrevCallback(i, null, t), this.buttonNextState = e, this.buttonPrevState = t
        },
        notify: function (e) {
            var t = null === this.prevFirst ? "init" : this.prevFirst < this.first ? "next" : "prev";
            this.callback("itemLoadCallback", e, t), this.prevFirst !== this.first && (this.callback("itemFirstInCallback", e, t, this.first), this.callback("itemFirstOutCallback", e, t, this.prevFirst)), this.prevLast !== this.last && (this.callback("itemLastInCallback", e, t, this.last), this.callback("itemLastOutCallback", e, t, this.prevLast)), this.callback("itemVisibleInCallback", e, t, this.first, this.last, this.prevFirst, this.prevLast), this.callback("itemVisibleOutCallback", e, t, this.prevFirst, this.prevLast, this.first, this.last)
        },
        callback: function (t, i, n, a, s, r, o) {
            if (null != this.options[t] && ("object" == typeof this.options[t] || "onAfterAnimation" == i)) {
                var l = "object" == typeof this.options[t] ? this.options[t][i] : this.options[t];
                if (e.isFunction(l)) {
                    var c = this;
                    if (void 0 === a) l(c, n, i);
                    else if (void 0 === s) this.get(a).each(function () {
                        l(c, this, a, n, i)
                    });
                    else
                        for (var t = function (e) {
                            c.get(e).each(function () {
                                l(c, this, e, n, i)
                            })
                        }, u = a; s >= u; u++) null !== u && !(u >= r && o >= u) && t(u)
                }
            }
        },
        create: function (e) {
            return this.format("<li></li>", e)
        },
        format: function (t, i) {
            for (var t = e(t), n = t.get(0).className.split(" "), a = 0; a < n.length; a++) - 1 != n[a].indexOf("jcarousel-") && t.removeClass(n[a]);
            return t.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + i)).css({
                "float": this.options.rtl ? "right" : "left",
                "list-style": "none"
            }).attr("jcarouselindex", i), t
        },
        className: function (e) {
            return e + " " + e + (this.options.vertical ? "-vertical" : "-horizontal")
        },
        dimension: function (t, i) {
            var a = e(t);
            if (null == i) return this.options.vertical ? a.outerHeight(!0) || n.intval(this.options.itemFallbackDimension) : a.outerWidth(!0) || n.intval(this.options.itemFallbackDimension);
            var s = this.options.vertical ? i - n.intval(a.css("marginTop")) - n.intval(a.css("marginBottom")) : i - n.intval(a.css("marginLeft")) - n.intval(a.css("marginRight"));
            return e(a).css(this.wh, s + "px"), this.dimension(a)
        },
        clipping: function () {
            return this.options.vertical ? this.clip[0].offsetHeight - n.intval(this.clip.css("borderTopWidth")) - n.intval(this.clip.css("borderBottomWidth")) : this.clip[0].offsetWidth - n.intval(this.clip.css("borderLeftWidth")) - n.intval(this.clip.css("borderRightWidth"))
        },
        index: function (e, t) {
            return null == t && (t = this.options.size), Math.round(((e - 1) / t - Math.floor((e - 1) / t)) * t) + 1
        }
    }), n.extend({
        defaults: function (i) {
            return e.extend(t, i || {})
        },
        intval: function (e) {
            return e = parseInt(e, 10), isNaN(e) ? 0 : e
        },
        windowLoaded: function () {
            i = !0
        }
    }), e.fn.jcarousel = function (t) {
        if ("string" == typeof t) {
            var i = e(this).data("jcarousel"),
                a = Array.prototype.slice.call(arguments, 1);
            return i[t].apply(i, a)
        }
        return this.each(function () {
            var i = e(this).data("jcarousel");
            i ? (t && e.extend(i.options, t), i.reload()) : e(this).data("jcarousel", new n(this, t))
        })
    }
}(jQuery), function (e) {
    function t() {
        var e = document.createElement("input"),
            t = "onpaste";
        return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
    }
    var i, n = t() + ".mask",
        a = navigator.userAgent,
        s = /iphone/i.test(a),
        r = /android/i.test(a);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function (e, t) {
            var i;
            return 0 === this.length || this.is(":hidden") ? void 0 : "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (i = this.createTextRange(), i.collapse(!0), i.moveEnd("character", t), i.moveStart("character", e), i.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), e = 0 - i.duplicate().moveStart("character", -1e5), t = e + i.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function () {
            return this.trigger("unmask")
        },
        mask: function (t, a) {
            var o, l, c, u, h, d;
            return !t && this.length > 0 ? (o = e(this[0]), o.data(e.mask.dataName)()) : (a = e.extend({
                placeholder: e.mask.placeholder,
                completed: null
            }, a), l = e.mask.definitions, c = [], u = d = t.length, h = null, e.each(t.split(""), function (e, t) {
                "?" == t ? (d--, u = e) : l[t] ? (c.push(RegExp(l[t])), null === h && (h = c.length - 1)) : c.push(null)
            }), this.trigger("unmask").each(function () {
                function o(e) {
                    for (; d > ++e && !c[e];);
                    return e
                }

                function p(e) {
                    for (; --e >= 0 && !c[e];);
                    return e
                }

                function f(e, t) {
                    var i, n;
                    if (!(0 > e)) {
                        for (i = e, n = o(t); d > i; i++)
                            if (c[i]) {
                                if (!(d > n && c[i].test(x[n]))) break;
                                x[i] = x[n], x[n] = a.placeholder, n = o(n)
                            }
                        y(), w.caret(Math.max(h, e))
                    }
                }

                function m(e) {
                    var t, i, n, s;
                    for (t = e, i = a.placeholder; d > t; t++)
                        if (c[t]) {
                            if (n = o(t), s = x[t], x[t] = i, !(d > n && c[n].test(s))) break;
                            i = s
                        }
                }

                function _(e) {
                    var t, i, n, a = e.which;
                    8 === a || 46 === a || s && 127 === a ? (t = w.caret(), i = t.begin, n = t.end, 0 === n - i && (i = 46 !== a ? p(i) : n = o(i - 1), n = 46 === a ? o(n) : n), v(i, n), f(i, n - 1), e.preventDefault()) : 27 == a && (w.val(k), w.caret(0, b()), e.preventDefault())
                }

                function g(t) {
                    var i, n, s, l = t.which,
                        u = w.caret();
                    t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (v(u.begin, u.end), f(u.begin, u.end - 1)), i = o(u.begin - 1), d > i && (n = String.fromCharCode(l), c[i].test(n) && (m(i), x[i] = n, y(), s = o(i), r ? setTimeout(e.proxy(e.fn.caret, w, s), 0) : w.caret(s), a.completed && s >= d && a.completed.call(w))), t.preventDefault())
                }

                function v(e, t) {
                    var i;
                    for (i = e; t > i && d > i; i++) c[i] && (x[i] = a.placeholder)
                }

                function y() {
                    w.val(x.join(""))
                }

                function b(e) {
                    var t, i, n = w.val(),
                        s = -1;
                    for (t = 0, pos = 0; d > t; t++)
                        if (c[t]) {
                            for (x[t] = a.placeholder; pos++ < n.length;)
                                if (i = n.charAt(pos - 1), c[t].test(i)) {
                                    x[t] = i, s = t;
                                    break
                                }
                            if (pos > n.length) break
                        } else x[t] === n.charAt(pos) && t !== u && (pos++, s = t);
                    return e ? y() : u > s + 1 ? (w.val(""), v(0, d)) : (y(), w.val(w.val().substring(0, s + 1))), u ? t : h
                }
                var w = e(this),
                    x = e.map(t.split(""), function (e) {
                        return "?" != e ? l[e] ? a.placeholder : e : void 0
                    }),
                    k = w.val();
                w.data(e.mask.dataName, function () {
                    return e.map(x, function (e, t) {
                        return c[t] && e != a.placeholder ? e : null
                    }).join("")
                }), w.attr("readonly") || w.one("unmask", function () {
                    w.unbind(".mask").removeData(e.mask.dataName)
                }).bind("focus.mask", function () {
                    clearTimeout(i);
                    var e;
                    k = w.val(), e = b(), i = setTimeout(function () {
                        y(), e == t.length ? w.caret(0, e) : w.caret(e)
                    }, 10)
                }).bind("blur.mask", function () {
                    b(), w.val() != k && w.change()
                }).bind("keydown.mask", _).bind("keypress.mask", g).bind(n, function () {
                    setTimeout(function () {
                        var e = b(!0);
                        w.caret(e), a.completed && e == w.val().length && a.completed.call(w)
                    }, 0)
                }), b()
            }))
        }
    })
}(jQuery), function (e) {
    e.fn.numeric = function (t, i) {
        "boolean" == typeof t && (t = {
            decimal: t
        }), t = t || {}, "undefined" == typeof t.negative && (t.negative = !0);
        var n = t.decimal === !1 ? "" : t.decimal || ".",
            a = t.negative === !0 ? !0 : !1,
            i = "function" == typeof i ? i : function () {};
        return this.data("numeric.decimal", n).data("numeric.negative", a).data("numeric.callback", i).keypress(e.fn.numeric.keypress).keyup(e.fn.numeric.keyup).blur(e.fn.numeric.blur)
    }, e.fn.numeric.keypress = function (t) {
        var i = e.data(this, "numeric.decimal"),
            n = e.data(this, "numeric.negative"),
            a = t.charCode ? t.charCode : t.keyCode ? t.keyCode : 0;
        if (13 == a && "input" == this.nodeName.toLowerCase()) return !0;
        if (13 == a) return !1;
        var s = !1;
        if (t.ctrlKey && 97 == a || t.ctrlKey && 65 == a) return !0;
        if (t.ctrlKey && 120 == a || t.ctrlKey && 88 == a) return !0;
        if (t.ctrlKey && 99 == a || t.ctrlKey && 67 == a) return !0;
        if (t.ctrlKey && 122 == a || t.ctrlKey && 90 == a) return !0;
        if (t.ctrlKey && 118 == a || t.ctrlKey && 86 == a || t.shiftKey && 45 == a) return !0;
        if (48 > a || a > 57) {
            var r = e(this).val();
            if (0 != r.indexOf("-") && n && 45 == a && (0 == r.length || 0 == e.fn.getSelectionStart(this))) return !0;
            i && a == i.charCodeAt(0) && -1 != r.indexOf(i) && (s = !1), 8 != a && 9 != a && 13 != a && 35 != a && 36 != a && 37 != a && 39 != a && 46 != a ? s = !1 : "undefined" != typeof t.charCode && (t.keyCode == t.which && 0 != t.which ? (s = !0, 46 == t.which && (s = !1)) : 0 != t.keyCode && 0 == t.charCode && 0 == t.which && (s = !0)), i && a == i.charCodeAt(0) && (s = -1 == r.indexOf(i) ? !0 : !1)
        } else s = !0;
        return s
    }, e.fn.numeric.keyup = function () {
        var t = e(this).value;
        if (t && t.length > 0) {
            var i = e.fn.getSelectionStart(this),
                n = e.data(this, "numeric.decimal"),
                a = e.data(this, "numeric.negative");
            if ("" != n) {
                var s = t.indexOf(n);
                0 == s && (this.value = "0" + t), 1 == s && "-" == t.charAt(0) && (this.value = "-0" + t.substring(1)), t = this.value
            }
            for (var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", n], o = t.length, l = o - 1; l >= 0; l--) {
                var c = t.charAt(l);
                0 != l && "-" == c ? t = t.substring(0, l) + t.substring(l + 1) : 0 != l || a || "-" != c || (t = t.substring(1));
                for (var u = !1, h = 0; h < r.length; h++)
                    if (c == r[h]) {
                        u = !0;
                        break
                    }
                u && " " != c || (t = t.substring(0, l) + t.substring(l + 1))
            }
            var d = t.indexOf(n);
            if (d > 0)
                for (var l = o - 1; l > d; l--) {
                    var c = t.charAt(l);
                    c == n && (t = t.substring(0, l) + t.substring(l + 1))
                }
            this.value = t, e.fn.setSelection(this, i)
        }
    }, e.fn.numeric.blur = function () {
        var t = e.data(this, "numeric.decimal"),
            i = e.data(this, "numeric.callback"),
            n = this.value;
        if ("" != n) {
            var a = new RegExp("^\\d+$|\\d*" + t + "\\d+");
            a.exec(n) || i.apply(this)
        }
    }, e.fn.removeNumeric = function () {
        return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", e.fn.numeric.keypress).unbind("blur", e.fn.numeric.blur)
    }, e.fn.getSelectionStart = function (e) {
        if (e.createTextRange) {
            var t = document.selection.createRange().duplicate();
            return t.moveEnd("character", e.value.length), "" == t.text ? e.value.length : e.value.lastIndexOf(t.text)
        }
        return e.selectionStart
    }, e.fn.setSelection = function (e, t) {
        if ("number" == typeof t && (t = [t, t]), t && t.constructor == Array && 2 == t.length)
            if (e.createTextRange) {
                var i = e.createTextRange();
                i.collapse(!0), i.moveStart("character", t[0]), i.moveEnd("character", t[1]), i.select()
            } else e.setSelectionRange && (e.focus(), e.setSelectionRange(t[0], t[1]))
    }
}(jQuery), function (e) {
    var t = {
        init: function (i) {
            return this.each(function () {
                var n = e.extend({}, e.fn.raty.defaults, i),
                    a = e(this).data("options", n);
                n.number > 20 ? n.number = 20 : n.number < 0 && (n.number = 0), void 0 === n.round.down && (n.round.down = e.fn.raty.defaults.round.down), void 0 === n.round.full && (n.round.full = e.fn.raty.defaults.round.full), void 0 === n.round.up && (n.round.up = e.fn.raty.defaults.round.up), "/" != n.path.substring(n.path.length - 1, n.path.length) && (n.path += "/"), "function" == typeof n.start && (n.start = n.start.call(this));
                var s = !isNaN(parseInt(n.start, 10)),
                    r = "";
                s && (r = n.start > n.number ? n.number : n.start);
                for (var o = n.starOn, l = n.space ? 4 : 0, c = "", u = 1; u <= n.number; u++) o = u > r ? n.starOff : n.starOn, c = u <= n.hintList.length && null !== n.hintList[u - 1] ? n.hintList[u - 1] : u, a.append('<img src="' + n.path + o + '" alt="' + u + '" title="' + c + '" />'), n.space && a.append(u < n.number ? "&nbsp;" : "");
                var h = e("<input/>", {
                    type: "hidden",
                    name: n.scoreName
                }).appendTo(a);
                s && (n.start > 0 && h.val(r), t.roundStar.call(a, r)), n.iconRange && t.fillStar.call(a, r), t.setTarget.call(a, r, n.targetKeep);
                var d = n.width || n.number * n.size + n.number * l;
                if (n.cancel) {
                    var p = e('<img src="' + n.path + n.cancelOff + '" alt="x" title="' + n.cancelHint + '" class="raty-cancel"/>');
                    "left" == n.cancelPlace ? a.prepend("&nbsp;").prepend(p) : a.append("&nbsp;").append(p), d += n.size + l
                }
                n.readOnly ? (t.fixHint.call(a), a.children(".raty-cancel").hide()) : (a.css("cursor", "pointer"), t.bindAction.call(a)), a.css("width", d)
            })
        },
        bindAction: function () {
            var i = this,
                n = this.data("options"),
                a = this.children("input");
            i.mouseleave(function () {
                t.initialize.call(i, a.val()), t.setTarget.call(i, a.val(), n.targetKeep)
            });
            var s = this.children("img").not(".raty-cancel"),
                r = n.half ? "mousemove" : "mouseover";
            n.cancel && i.children(".raty-cancel").mouseenter(function () {
                e(this).attr("src", n.path + n.cancelOn), s.attr("src", n.path + n.starOff), t.setTarget.call(i, null, !0)
            }).mouseleave(function () {
                e(this).attr("src", n.path + n.cancelOff), i.mouseout()
            }).click(function (e) {
                a.removeAttr("value"), n.click && n.click.call(i[0], null, e)
            }), s.bind(r, function (a) {
                var s = parseInt(this.alt, 10);
                if (n.half) {
                    var r = parseFloat((a.pageX - e(this).offset().left) / n.size),
                        o = r > .5 ? 1 : .5;
                    s = parseFloat(this.alt) - 1 + o, t.fillStar.call(i, s), n.precision && (s = s - o + r), t.showHalf.call(i, s)
                } else t.fillStar.call(i, s);
                i.data("score", s), t.setTarget.call(i, s, !0)
            }).click(function (e) {
                a.val(n.half || n.precision ? i.data("score") : this.alt), n.click && n.click.call(i[0], a.val(), e)
            })
        },
        cancel: function (i) {
            return this.each(function () {
                var n = e(this);
                return "readonly" == n.data("readonly") ? !1 : (i ? t.click.call(n, null) : t.start.call(n, null), n.mouseleave().children("input").removeAttr("value"), void 0)
            })
        },
        click: function (i) {
            return this.each(function () {
                var n = e(this);
                if ("readonly" == n.data("readonly")) return !1;
                t.initialize.call(n, i);
                var a = n.data("options");
                a.click ? a.click.call(n[0], i) : e.error('you must add the "click: function(score, evt) { }" callback.'), t.setTarget.call(n, i, !0)
            })
        },
        fillStar: function (e) {
            for (var t, i, n, a = this.data("options"), s = this.children("img").not(".raty-cancel"), r = s.length, o = 0, l = 1; r >= l; l++) t = s.eq(l - 1), a.iconRange && a.iconRange.length > o ? (i = a.iconRange[o], n = a.single ? l == e ? i.on || a.starOn : i.off || a.starOff : e >= l ? i.on || a.starOn : i.off || a.starOff, l <= i.range && t.attr("src", a.path + n), l == i.range && o++) : (n = a.single ? l == e ? a.starOn : a.starOff : e >= l ? a.starOn : a.starOff, t.attr("src", a.path + n))
        },
        fixHint: function () {
            var e = this.data("options"),
                t = this.children("input"),
                i = parseInt(t.val(), 10),
                n = e.noRatedMsg;
            !isNaN(i) && i > 0 && (n = i <= e.hintList.length && null !== e.hintList[i - 1] ? e.hintList[i - 1] : i), t.attr("readonly", "readonly"), this.css("cursor", "default").data("readonly", "readonly").attr("title", n).children("img").attr("title", n)
        },
        readOnly: function (i) {
            return this.each(function () {
                var n = e(this),
                    a = n.children(".raty-cancel");
                a.length && (i ? a.hide() : a.show()), i ? (n.unbind(), n.children("img").unbind(), t.fixHint.call(n)) : (t.bindAction.call(n), t.unfixHint.call(n))
            })
        },
        roundStar: function (e) {
            var t = this.data("options"),
                i = (e - Math.floor(e)).toFixed(2);
            if (i > t.round.down) {
                var n = t.starOn;
                i < t.round.up && t.halfShow ? n = t.starHalf : i < t.round.full && (n = t.starOff), this.children("img").not(".raty-cancel").eq(Math.ceil(e) - 1).attr("src", t.path + n)
            }
        },
        score: function () {
            var t, i = [];
            return this.each(function () {
                t = e(this).children("input").val(), t = "" == t ? null : parseFloat(t), i.push(t)
            }), i.length > 1 ? i : i[0]
        },
        setTarget: function (t, i) {
            var n = this.data("options");
            if (n.target) {
                var a = e(n.target);
                if (0 == a.length) e.error("target selector invalid or missing!");
                else {
                    var s = t;
                    null != s || n.cancel ? (s = i && "" != s ? "hint" == n.targetType ? null === s && n.cancel ? n.cancelHint : n.hintList[Math.ceil(s - 1)] : "" == s || n.precision ? parseFloat(s).toFixed(1) : parseInt(s, 10) : n.targetText, n.targetFormat.indexOf("{score}") < 0 ? e.error('template "{score}" missing!') : null !== t && (s = n.targetFormat.toString().replace("{score}", s)), a.is(":input") ? a.val(s) : a.html(s)) : e.error('you must enable the "cancel" option to set hint on target.')
                }
            }
        },
        showHalf: function (e) {
            var t = this.data("options"),
                i = (e - Math.floor(e)).toFixed(1);
            i > 0 && .6 > i && this.children("img").not(".raty-cancel").eq(Math.ceil(e) - 1).attr("src", t.path + t.starHalf)
        },
        start: function (i) {
            return this.each(function () {
                var n = e(this);
                return "readonly" == n.data("readonly") ? !1 : (t.initialize.call(n, i), n.data("options"), t.setTarget.call(n, i, !0), void 0)
            })
        },
        initialize: function (e) {
            var i = this.data("options");
            0 > e ? e = 0 : e > i.number && (e = i.number), t.fillStar.call(this, e), "" != e && (i.halfShow && t.roundStar.call(this, e), this.children("input").val(e))
        },
        unfixHint: function () {
            for (var e = this.data("options"), t = this.children("img").filter(":not(.raty-cancel)"), i = 0; i < e.number; i++) t.eq(i).attr("title", i < e.hintList.length && null !== e.hintList[i] ? e.hintList[i] : i);
            this.css("cursor", "pointer").removeData("readonly").removeAttr("title").children("input").attr("readonly", "readonly")
        }
    };
    e.fn.raty = function (i) {
        return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? (e.error("Method " + i + " does not exist!"), void 0) : t.init.apply(this, arguments)
    }, e.fn.raty.defaults = {
        cancel: !1,
        cancelHint: "cancel this rating!",
        cancelOff: "cancel-off.png",
        cancelOn: "cancel-on.png",
        cancelPlace: "left",
        click: void 0,
        half: !1,
        halfShow: !0,
        hintList: ["bad", "poor", "regular", "good", "gorgeous"],
        iconRange: void 0,
        noRatedMsg: "not rated yet",
        number: 5,
        path: "img/",
        precision: !1,
        round: {
            down: .25,
            full: .6,
            up: .76
        },
        readOnly: !1,
        scoreName: "score",
        single: !1,
        size: 16,
        space: !0,
        starHalf: "star-half.png",
        starOff: "star-off.png",
        starOn: "star-on.png",
        start: 0,
        target: void 0,
        targetFormat: "{score}",
        targetKeep: !1,
        targetText: "",
        targetType: "hint",
        width: void 0
    }
}(jQuery), function (e, t, i) {
    function n(e, i) {
        var n, a = t.createElement(e || "div");
        for (n in i) a[n] = i[n];
        return a
    }

    function a(e) {
        for (var t = 1, i = arguments.length; i > t; t++) e.appendChild(arguments[t]);
        return e
    }

    function s(e, t, i, n) {
        var a = ["opacity", t, ~~ (100 * e), i, n].join("-"),
            s = .01 + 100 * (i / n),
            r = Math.max(1 - (1 - e) / t * (100 - s), e),
            o = u.substring(0, u.indexOf("Animation")).toLowerCase(),
            l = o && "-" + o + "-" || "";
        return d[a] || (p.insertRule("@" + l + "keyframes " + a + "{" + "0%{opacity:" + r + "}" + s + "%{opacity:" + e + "}" + (s + .01) + "%{opacity:1}" + (s + t) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + r + "}" + "}", 0), d[a] = 1), a
    }

    function r(e, t) {
        var n, a, s = e.style;
        if (s[t] !== i) return t;
        for (t = t.charAt(0).toUpperCase() + t.slice(1), a = 0; a < h.length; a++)
            if (n = h[a] + t, s[n] !== i) return n
    }

    function o(e, t) {
        for (var i in t) e.style[r(e, i) || i] = t[i];
        return e
    }

    function l(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) e[a] === i && (e[a] = n[a])
        }
        return e
    }

    function c(e) {
        for (var t = {
            x: e.offsetLeft,
            y: e.offsetTop
        }; e = e.offsetParent;) t.x += e.offsetLeft, t.y += e.offsetTop;
        return t
    }
    var u, h = ["webkit", "Moz", "ms", "O"],
        d = {}, p = function () {
            var e = n("style");
            return a(t.getElementsByTagName("head")[0], e), e.sheet || e.styleSheet
        }(),
        f = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            color: "#000",
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto"
        }, m = function _(e) {
            return this.spin ? (this.opts = l(e || {}, _.defaults, f), void 0) : new _(e)
        };
    m.defaults = {}, l(m.prototype, {
        spin: function (e) {
            this.stop();
            var t, i, a = this,
                s = a.opts,
                r = a.el = o(n(0, {
                    className: s.className
                }), {
                    position: "relative",
                    zIndex: s.zIndex
                }),
                l = s.radius + s.length + s.width;
            if (e && (e.insertBefore(r, e.firstChild || null), i = c(e), t = c(r), o(r, {
                left: ("auto" == s.left ? i.x - t.x + (e.offsetWidth >> 1) : s.left + l) + "px",
                top: ("auto" == s.top ? i.y - t.y + (e.offsetHeight >> 1) : s.top + l) + "px"
            })), r.setAttribute("aria-role", "progressbar"), a.lines(r, a.opts), !u) {
                var h = 0,
                    d = s.fps,
                    p = d / s.speed,
                    f = (1 - s.opacity) / (p * s.trail / 100),
                    m = p / s.lines;
                ! function _() {
                    h++;
                    for (var e = s.lines; e; e--) {
                        var t = Math.max(1 - (h + e * m) % p * f, s.opacity);
                        a.opacity(r, s.lines - e, t, s)
                    }
                    a.timeout = a.el && setTimeout(_, ~~ (1e3 / d))
                }()
            }
            return a
        },
        stop: function () {
            var e = this.el;
            return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = i), this
        },
        lines: function (e, t) {
            function i(e, i) {
                return o(n(), {
                    position: "absolute",
                    width: t.length + t.width + "px",
                    height: t.width + "px",
                    background: e,
                    boxShadow: i,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / t.lines * l + t.rotate) + "deg) translate(" + t.radius + "px" + ",0)",
                    borderRadius: (t.width >> 1) + "px"
                })
            }
            for (var r, l = 0; l < t.lines; l++) r = o(n(), {
                position: "absolute",
                top: 1 + ~(t.width / 2) + "px",
                transform: t.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: t.opacity,
                animation: u && s(t.opacity, t.trail, l, t.lines) + " " + 1 / t.speed + "s linear infinite"
            }), t.shadow && a(r, o(i("#000", "0 0 4px #000"), {
                top: "2px"
            })), a(e, a(r, i(t.color, "0 0 1px rgba(0,0,0,.1)")));
            return e
        },
        opacity: function (e, t, i) {
            t < e.childNodes.length && (e.childNodes[t].style.opacity = i)
        }
    }), ! function () {
        function e(e, t) {
            return n("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
        }
        var t = o(n("group"), {
            behavior: "url(#default#VML)"
        });
        !r(t, "transform") && t.adj ? (p.addRule(".spin-vml", "behavior:url(#default#VML)"), m.prototype.lines = function (t, i) {
            function n() {
                return o(e("group", {
                    coordsize: c + " " + c,
                    coordorigin: -l + " " + -l
                }), {
                    width: c,
                    height: c
                })
            }

            function s(t, s, r) {
                a(h, a(o(n(), {
                    rotation: 360 / i.lines * t + "deg",
                    left: ~~s
                }), a(o(e("roundrect", {
                    arcsize: 1
                }), {
                    width: l,
                    height: i.width,
                    left: i.radius,
                    top: -i.width >> 1,
                    filter: r
                }), e("fill", {
                    color: i.color,
                    opacity: i.opacity
                }), e("stroke", {
                    opacity: 0
                }))))
            }
            var r, l = i.length + i.width,
                c = 2 * l,
                u = 2 * -(i.width + i.length) + "px",
                h = o(n(), {
                    position: "absolute",
                    top: u,
                    left: u
                });
            if (i.shadow)
                for (r = 1; r <= i.lines; r++) s(r, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (r = 1; r <= i.lines; r++) s(r);
            return a(t, h)
        }, m.prototype.opacity = function (e, t, i, n) {
            var a = e.firstChild;
            n = n.shadow && n.lines || 0, a && t + n < a.childNodes.length && (a = a.childNodes[t + n], a = a && a.firstChild, a = a && a.firstChild, a && (a.opacity = i))
        }) : u = r(t, "animation")
    }(), e.Spinner = m
}(window, document), $.fn.spin = function (e) {
    return this.each(function () {
        var t = $(this),
            i = t.data();
        i.spinner && (i.spinner.stop(), delete i.spinner), e !== !1 && (i.spinner = new Spinner($.extend({
            color: t.css("color")
        }, e)).spin(this))
    }), this
}, function ($) {
    $.timer = function (func, time, autostart) {
        return this.set = function (func, time, autostart) {
            if (this.init = !0, "object" == typeof func) {
                var paramList = ["autostart", "time"];
                for (var arg in paramList) void 0 != func[paramList[arg]] && eval(paramList[arg] + " = func[paramList[arg]]");
                func = func.action
            }
            return "function" == typeof func && (this.action = func), isNaN(time) || (this.intervalTime = time), autostart && !this.active && (this.active = !0, this.setTimer()), this
        }, this.once = function (e) {
            var t = this;
            return isNaN(e) && (e = 0), window.setTimeout(function () {
                t.action()
            }, e), this
        }, this.play = function (e) {
            return this.active || (e ? this.setTimer() : this.setTimer(this.remaining), this.active = !0), this
        }, this.pause = function () {
            return this.active && (this.active = !1, this.remaining -= new Date - this.last, this.clearTimer()), this
        }, this.stop = function () {
            return this.active = !1, this.remaining = this.intervalTime, this.clearTimer(), this
        }, this.toggle = function (e) {
            return this.active ? this.pause() : e ? this.play(!0) : this.play(), this
        }, this.reset = function () {
            return this.active = !1, this.play(!0), this
        }, this.clearTimer = function () {
            window.clearTimeout(this.timeoutObject)
        }, this.setTimer = function (e) {
            var t = this;
            "function" == typeof this.action && (isNaN(e) && (e = this.intervalTime), this.remaining = e, this.last = new Date, this.clearTimer(), this.timeoutObject = window.setTimeout(function () {
                t.go()
            }, e))
        }, this.go = function () {
            this.active && (this.action(), this.setTimer())
        }, this.init ? new $.timer(func, time, autostart) : (this.set(func, time, autostart), this)
    }
}(jQuery), function (e) {
    function t(t, i, n, a) {
        var s = {
            data: a || 0 === a || a === !1 ? a : i ? i.data : {},
            _wrap: i ? i._wrap : null,
            tmpl: null,
            parent: i || null,
            nodes: [],
            calls: c,
            nest: u,
            wrap: h,
            html: d,
            update: p
        };
        return t && e.extend(s, t, {
            nodes: [],
            parent: i
        }), n && (s.tmpl = n, s._ctnt = s._ctnt || s.tmpl(e, s), s.key = ++w, (k.length ? y : v)[w] = s), s
    }

    function i(t, a, s) {
        var r, o = s ? e.map(s, function (e) {
                return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + _ + '="' + t.key + '" $2') : e : i(e, t, e._ctnt)
            }) : t;
        return a ? o : (o = o.join(""), o.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (t, i, a, s) {
            r = e(a).get(), l(r), i && (r = n(i).concat(r)), s && (r = r.concat(n(s)))
        }), r ? r : n(o))
    }

    function n(t) {
        var i = document.createElement("div");
        return i.innerHTML = t, e.makeArray(i.childNodes)
    }

    function a(t) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (t, i, n, a, s, o, l) {
            var c, u, h, d = e.tmpl.tag[n];
            if (!d) throw "Unknown template tag: " + n;
            return c = d._default || [], o && !/\w$/.test(s) && (s += o, o = ""), s ? (s = r(s), l = l ? "," + r(l) + ")" : o ? ")" : "", u = o ? s.indexOf(".") > -1 ? s + r(o) : "(" + s + ").call($item" + l : s, h = o ? u : "(typeof(" + s + ")==='function'?(" + s + ").call($item):(" + s + "))") : h = u = c.$1 || "null", a = r(a), "');" + d[i ? "close" : "open"].split("$notnull_1").join(s ? "typeof(" + s + ")!=='undefined' && (" + s + ")!=null" : "true").split("$1a").join(h).split("$1").join(u).split("$2").join(a || c.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function s(t, n) {
        t._wrap = i(t, !0, e.isArray(n) ? n : [g.test(n) ? n : e(n).html()]).join("")
    }

    function r(e) {
        return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function o(e) {
        var t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)), t.innerHTML
    }

    function l(i) {
        function n(i) {
            function n(e) {
                e += c, r = u[e] = u[e] || t(r, v[r.parent.key + c] || r.parent)
            }
            var a, s, r, o, l = i;
            if (o = i.getAttribute(_)) {
                for (; l.parentNode && 1 === (l = l.parentNode).nodeType && !(a = l.getAttribute(_)););
                a !== o && (l = l.parentNode ? 11 === l.nodeType ? 0 : l.getAttribute(_) || 0 : 0, (r = v[o]) || (r = y[o], r = t(r, v[l] || y[l]), r.key = ++w, v[w] = r), x && n(o)), i.removeAttribute(_)
            } else x && (r = e.data(i, "tmplItem")) && (n(r.key), v[r.key] = r, l = e.data(i.parentNode, "tmplItem"), l = l ? l.key : 0); if (r) {
                for (s = r; s && s.key != l;) s.nodes.push(i), s = s.parent;
                delete r._ctnt, delete r._wrap, e.data(i, "tmplItem", r)
            }
        }
        var a, s, r, o, l, c = "_" + x,
            u = {};
        for (r = 0, o = i.length; o > r; r++)
            if (1 === (a = i[r]).nodeType) {
                for (s = a.getElementsByTagName("*"), l = s.length - 1; l >= 0; l--) n(s[l]);
                n(a)
            }
    }

    function c(e, t, i, n) {
        return e ? (k.push({
            _: e,
            tmpl: t,
            item: this,
            data: i,
            options: n
        }), void 0) : k.pop()
    }

    function u(t, i, n) {
        return e.tmpl(e.template(t), i, n, this)
    }

    function h(t, i) {
        var n = t.options || {};
        return n.wrapped = i, e.tmpl(e.template(t.tmpl), t.data, n, t.item)
    }

    function d(t, i) {
        var n = this._wrap;
        return e.map(e(e.isArray(n) ? n.join("") : n).filter(t || "*"), function (e) {
            return i ? e.innerText || e.textContent : e.outerHTML || o(e)
        })
    }

    function p() {
        var t = this.nodes;
        e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove()
    }
    var f, m = e.fn.domManip,
        _ = "_tmplitem",
        g = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        v = {}, y = {}, b = {
            key: 0,
            data: {}
        }, w = 0,
        x = 0,
        k = [];
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (t, i) {
        e.fn[t] = function (n) {
            var a, s, r, o, l = [],
                c = e(n),
                u = 1 === this.length && this[0].parentNode;
            if (f = v || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length) c[i](this[0]), l = this;
            else {
                for (s = 0, r = c.length; r > s; s++) x = s, a = (s > 0 ? this.clone(!0) : this).get(), e(c[s])[i](a), l = l.concat(a);
                x = 0, l = this.pushStack(l, t, c.selector)
            }
            return o = f, f = null, e.tmpl.complete(o), l
        }
    }), e.fn.extend({
        tmpl: function (t, i, n) {
            return e.tmpl(this[0], t, i, n)
        },
        tmplItem: function () {
            return e.tmplItem(this[0])
        },
        template: function (t) {
            return e.template(t, this[0])
        },
        domManip: function (t, i, n) {
            if (t[0] && e.isArray(t[0])) {
                for (var a, s = e.makeArray(arguments), r = t[0], o = r.length, l = 0; o > l && !(a = e.data(r[l++], "tmplItem")););
                a && x && (s[2] = function (t) {
                    e.tmpl.afterManip(this, t, n)
                }), m.apply(this, s)
            } else m.apply(this, arguments);
            return x = 0, f || e.tmpl.complete(v), this
        }
    }), e.extend({
        tmpl: function (n, a, r, o) {
            var l, c = !o;
            if (c) o = b, n = e.template[n] || e.template(null, n), y = {};
            else if (!n) return n = o.tmpl, v[o.key] = o, o.nodes = [], o.wrapped && s(o, o.wrapped), e(i(o, null, o.tmpl(e, o)));
            return n ? ("function" == typeof a && (a = a.call(o || {})), r && r.wrapped && s(r, r.wrapped), l = e.isArray(a) ? e.map(a, function (e) {
                return e ? t(r, o, n, e) : null
            }) : [t(r, o, n, a)], c ? e(i(o, null, l)) : l) : []
        },
        tmplItem: function (t) {
            var i;
            for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(i = e.data(t, "tmplItem")) && (t = t.parentNode););
            return i || b
        },
        template: function (t, i) {
            return i ? ("string" == typeof i ? i = a(i) : i instanceof e && (i = i[0] || {}), i.nodeType && (i = e.data(i, "tmpl") || e.data(i, "tmpl", a(i.innerHTML))), "string" == typeof t ? e.template[t] = i : i) : t ? "string" != typeof t ? e.template(null, t) : e.template[t] || e.template(null, g.test(t) ? t : e(t)) : null
        },
        encode: function (e) {
            return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }), e.extend(e.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function () {
            v = {}
        },
        afterManip: function (t, i, n) {
            var a = 11 === i.nodeType ? e.makeArray(i.childNodes) : 1 === i.nodeType ? [i] : [];
            n.call(t, i), l(a), x++
        }
    })
}(jQuery), function (e) {
    e.fn.visualize = function (t, i) {
        return e(this).each(function () {
            function n() {
                var t = a.colors,
                    i = a.textColors,
                    n = {
                        dataGroups: function () {
                            var n = [];
                            if ("x" == a.parseDirection) s.find("tr:gt(0)").filter(a.rowFilter).each(function (s) {
                                n[s] = {}, n[s].points = [], n[s].color = t[s], i[s] && (n[s].textColor = i[s]), e(this).find("td").filter(a.colFilter).each(function () {
                                    n[s].points.push(parseFloat(e(this).text()))
                                })
                            });
                            else
                                for (var r = s.find("tr:eq(1) td").filter(a.colFilter).size(), o = 0; r > o; o++) n[o] = {}, n[o].points = [], n[o].color = t[o], i[o] && (n[o].textColor = i[o]), s.find("tr:gt(0)").filter(a.rowFilter).each(function () {
                                    n[o].points.push(1 * e(this).find("td").filter(a.colFilter).eq(o).text())
                                });
                            return n
                        },
                        allData: function () {
                            var t = [];
                            return e(this.dataGroups()).each(function () {
                                t.push(this.points)
                            }), t
                        },
                        dataSum: function () {
                            var t = 0,
                                i = this.allData().join(",").split(",");
                            return e(i).each(function () {
                                t += parseFloat(this)
                            }), t
                        },
                        topValue: function () {
                            var t = 0,
                                i = this.allData().join(",").split(",");
                            return e(i).each(function () {
                                parseFloat(this, 10) > t && (t = parseFloat(this))
                            }), t
                        },
                        bottomValue: function () {
                            var t = 0,
                                i = this.allData().join(",").split(",");
                            return e(i).each(function () {
                                t > this && (t = parseFloat(this))
                            }), t
                        },
                        memberTotals: function () {
                            var t = [],
                                i = this.dataGroups();
                            return e(i).each(function (n) {
                                var a = 0;
                                e(i[n].points).each(function (e) {
                                    a += i[n].points[e]
                                }), t.push(a)
                            }), t
                        },
                        yTotals: function () {
                            for (var t = [], i = this.dataGroups(), n = this.xLabels().length, a = 0; n > a; a++) {
                                t[a] = [];
                                var s = 0;
                                e(i).each(function () {
                                    t[a].push(this.points[a])
                                }), t[a].join(",").split(","), e(t[a]).each(function () {
                                    s += parseFloat(this)
                                }), t[a] = s
                            }
                            return t
                        },
                        topYtotal: function () {
                            var t = 0,
                                i = this.yTotals().join(",").split(",");
                            return e(i).each(function () {
                                parseFloat(this, 10) > t && (t = parseFloat(this))
                            }), t
                        },
                        totalYRange: function () {
                            return this.topValue() - this.bottomValue()
                        },
                        xLabels: function () {
                            var t = [];
                            return "x" == a.parseDirection ? s.find("tr:eq(0) th").filter(a.colFilter).each(function () {
                                t.push(e(this).html())
                            }) : s.find("tr:gt(0) th").filter(a.rowFilter).each(function () {
                                t.push(e(this).html())
                            }), t
                        },
                        yLabels: function () {
                            var e = [];
                            e.push(m);
                            for (var t = Math.round(a.height / a.yLabelInterval), i = Math.ceil(g / t) || 1; e[e.length - 1] < f - i;) e.push(e[e.length - 1] + i);
                            return e.push(f), e
                        }
                    };
                return n
            }
            var a = e.extend({
                type: "bar",
                width: e(this).width(),
                height: e(this).height(),
                appendTitle: !0,
                title: null,
                appendKey: !0,
                rowFilter: "*",
                colFilter: "*",
                colors: ["#be1e2d", "#666699", "#92d5ea", "#ee8310", "#8d10ee", "#5a3b16", "#26a4ed", "#f45a90", "#e9e744"],
                textColors: [],
                parseDirection: "x",
                pieMargin: 20,
                pieLabelsAsPercent: !0,
                pieLabelPos: "inside",
                lineWeight: 4,
                barGroupMargin: 10,
                barMargin: 1,
                yLabelInterval: 30
            }, t);
            a.width = parseFloat(a.width), a.height = parseFloat(a.height);
            var s = e(this),
                r = {
                    pie: function () {
                        u.addClass("visualize-pie"), "outside" == a.pieLabelPos && u.addClass("visualize-pie-outside");
                        var t = Math.round(l.width() / 2),
                            i = Math.round(l.height() / 2),
                            n = i - a.pieMargin,
                            s = 0,
                            r = e('<ul class="visualize-labels"></ul>').insertAfter(l);
                        e.each(_, function (o) {
                            var l = 0 >= this || isNaN(this) ? 0 : this / p;
                            $.beginPath(), $.moveTo(t, i), $.arc(t, i, n, 2 * s * Math.PI - .5 * Math.PI, 2 * (s + l) * Math.PI - .5 * Math.PI, !1), $.lineTo(t, i), $.closePath(), $.fillStyle = d[o].color, $.fill();
                            var c = s + l / 2,
                                u = "inside" == a.pieLabelPos ? n / 1.5 : n + n / 5,
                                h = Math.round(t + Math.sin(2 * c * Math.PI) * u),
                                f = Math.round(i - Math.cos(2 * c * Math.PI) * u),
                                m = h > t ? "right" : "left",
                                _ = f > i ? "bottom" : "top",
                                g = parseFloat((100 * l).toFixed(2));
                            if (g) {
                                var v = a.pieLabelsAsPercent ? g + "%" : this,
                                    y = e('<span class="visualize-label">' + v + "</span>").css(m, 0).css(_, 0);
                                y && e('<li class="visualize-label-pos"></li>').appendTo(r).css({
                                    left: h,
                                    top: f
                                }).append(y), y.css("font-size", n / 8).css("margin-" + m, -y.width() / 2).css("margin-" + _, -y.outerHeight() / 2), d[o].textColor && y.css("color", d[o].textColor)
                            }
                            s += l
                        })
                    },
                    line: function (t) {
                        t ? u.addClass("visualize-area") : u.addClass("visualize-line");
                        var i = l.width() / (y.length - 1),
                            n = e('<ul class="visualize-labels-x"></ul>').width(l.width()).height(l.height()).insertBefore(l);
                        e.each(y, function (t) {
                            var a = e("<li><span>" + this + "</span></li>").prepend('<span class="line" />').css("left", i * t).appendTo(n),
                                s = a.find("span:not(.line)"),
                                r = s.width() / -2;
                            0 == t ? r = 0 : t == y.length - 1 && (r = -s.width()), s.css("margin-left", r).addClass("label")
                        });
                        var s = l.height() / g,
                            r = l.height() / (b.length - 1),
                            o = e('<ul class="visualize-labels-y"></ul>').width(l.width()).height(l.height()).insertBefore(l);
                        e.each(b, function (t) {
                            var i = e("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", r * t).prependTo(o),
                                n = i.find("span:not(.line)"),
                                a = n.height() / -2;
                            0 == t ? a = -n.height() : t == b.length - 1 && (a = 0), n.css("margin-top", a).addClass("label")
                        }), $.translate(0, v), e.each(d, function () {
                            $.beginPath(), $.lineWidth = a.lineWeight, $.lineJoin = "round";
                            var n = this.points,
                                r = 0;
                            $.moveTo(0, -(n[0] * s)), e.each(n, function () {
                                $.lineTo(r, -(this * s)), r += i
                            }), $.strokeStyle = this.color, $.stroke(), t ? ($.lineTo(r, 0), $.lineTo(0, 0), $.closePath(), $.fillStyle = this.color, $.globalAlpha = .3, $.fill(), $.globalAlpha = 1) : $.closePath()
                        })
                    },
                    area: function () {
                        r.line(!0)
                    },
                    bar: function () {
                        u.addClass("visualize-bar");
                        var t = l.width() / y.length,
                            i = e('<ul class="visualize-labels-x"></ul>').width(l.width()).height(l.height()).insertBefore(l);
                        e.each(y, function (n) {
                            var a = e('<li><span class="label">' + this + "</span></li>").prepend('<span class="line" />').css("left", t * n).width(t).appendTo(i),
                                s = a.find("span.label");
                            s.addClass("label")
                        });
                        var n = l.height() / g,
                            s = l.height() / (b.length - 1),
                            r = e('<ul class="visualize-labels-y"></ul>').width(l.width()).height(l.height()).insertBefore(l);
                        e.each(b, function (t) {
                            var i = e("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", s * t).prependTo(r),
                                n = i.find("span:not(.line)"),
                                a = n.height() / -2;
                            0 == t ? a = -n.height() : t == b.length - 1 && (a = 0), n.css("margin-top", a).addClass("label")
                        }), $.translate(0, v);
                        for (var o = 0; o < d.length; o++) {
                            $.beginPath();
                            var c = (t - 2 * a.barGroupMargin) / d.length,
                                h = c - 2 * a.barMargin;
                            $.lineWidth = h;
                            for (var p = d[o].points, f = 0, m = 0; m < p.length; m++) {
                                var _ = f - a.barGroupMargin + o * c + c / 2;
                                _ += 2 * a.barGroupMargin, $.moveTo(_, 0), $.lineTo(_, Math.round(-p[m] * n)), f += t
                            }
                            $.strokeStyle = d[o].color, $.stroke(), $.closePath()
                        }
                    }
                }, o = document.createElement("canvas");
            o.setAttribute("height", a.height), o.setAttribute("width", a.width);
            var l = e(o),
                c = a.title || s.find("caption").text(),
                u = (i || e('<div class="visualize" role="img" aria-label="Chart representing data from the table: ' + c + '" />')).height(a.height).width(a.width).append(l),
                h = n(),
                d = h.dataGroups();
            h.allData();
            var p = h.dataSum(),
                f = h.topValue(),
                m = h.bottomValue(),
                _ = h.memberTotals(),
                g = h.totalYRange(),
                v = a.height * (f / g),
                y = h.xLabels(),
                b = h.yLabels();
            if (a.appendTitle || a.appendKey) var w = e('<div class="visualize-info"></div>').appendTo(u);
            if (a.appendTitle && e('<div class="visualize-title">' + c + "</div>").appendTo(w), a.appendKey) {
                var x, k = e('<ul class="visualize-key"></ul>');
                x = "x" == a.parseDirection ? s.find("tr:gt(0) th").filter(a.rowFilter) : s.find("tr:eq(0) th").filter(a.colFilter), x.each(function (t) {
                    e('<li><span class="visualize-key-color" style="background: ' + d[t].color + '"></span><span class="visualize-key-label">' + e(this).text() + "</span></li>").appendTo(k)
                }), k.appendTo(w)
            }
            i || u.insertAfter(this), "undefined" != typeof G_vmlCanvasManager && (G_vmlCanvasManager.init(), G_vmlCanvasManager.initElement(l[0]));
            var $ = l[0].getContext("2d");
            r[a.type](), e(".visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line").css("border", "none"), i || u.bind("visualizeRefresh", function () {
                s.visualize(a, e(this).empty())
            })
        }).next()
    }
}(jQuery), void 0 === PAYPAL || !PAYPAL) var PAYPAL = {};
PAYPAL.apps = PAYPAL.apps || {},
function () {
    "use strict";

    function e() {
        var e, t, i, n;
        document.getElementById("paypal-button") || (e = "", t = document.createElement("style"), i = ".paypal-button", n = i + " button", e += i + " { white-space: nowrap; }", e += n + ' { white-space: nowrap; overflow: hidden; border-radius: 13px; font-family: "Arial", bold, italic; font-weight: bold; font-style: italic; border: 1px solid #ffa823; color: #0E3168; background: #ffa823; position: relative; text-shadow: 0 1px 0 rgba(255,255,255,.5); cursor: pointer; z-index: 0; }', e += n + ':before { content: " "; position: absolute; width: 100%; height: 100%; border-radius: 11px; top: 0; left: 0; background: #ffa823; background: -webkit-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: -moz-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: -ms-linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); background: linear-gradient(top, #FFAA00 0%,#FFAA00 80%,#FFF8FC 100%); z-index: -2; }', e += n + ':after { content: " "; position: absolute; width: 98%; height: 60%; border-radius: 40px 40px 38px 38px; top: 0; left: 0; background: -webkit-linear-gradient(top, #fefefe 0%, #fed994 100%); background: -moz-linear-gradient(top, #fefefe 0%, #fed994 100%); background: -ms-linear-gradient(top, #fefefe 0%, #fed994 100%); background: linear-gradient(top, #fefefe 0%, #fed994 100%); z-index: -1; -webkit-transform: translateX(1%);-moz-transform: translateX(1%); -ms-transform: translateX(1%); transform: translateX(1%); }', e += n + ".small { padding: 3px 15px; font-size: 12px; }", e += n + ".large { padding: 4px 19px; font-size: 14px; }", t.type = "text/css", t.id = "paypal-button", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(t))
    }

    function t(e, t) {
        var i, n, a, o, l, c, h, d, p = document.createElement("form"),
            f = document.createElement("button"),
            m = document.createElement("input"),
            _ = e.items;
        p.method = "post", p.action = r.replace("{env}", e.items.env.value), p.className = "paypal-button", p.target = "_top", m.type = "hidden", c = _.size && _.size.value || "large", h = _.lc && _.lc.value || "en_US", d = u[h] || u.en_US;
        for (l in _) i = _[l], i.isEditable ? (o = document.createElement("input"), o.type = "text", o.className = "paypal-input", o.name = i.key, o.value = i.value, a = document.createElement("label"), a.className = "paypal-label", a.appendChild(document.createTextNode(s.config.labels[i.key] || d[i.key])), a.appendChild(o), n = document.createElement("p"), n.className = "paypal-group", n.appendChild(a)) : (o = n = m.cloneNode(!0), o.name = i.key, o.value = i.value), p.appendChild(n);
        try {
            f.type = "submit"
        } catch (g) {
            f.setAttribute("type", "submit")
        }
        if (f.className = "paypal-button " + c, f.appendChild(document.createTextNode(d[t])), p.appendChild(f), PAYPAL.apps.MiniCart && "_cart" === e.items.cmd.value) {
            var v = PAYPAL.apps.MiniCart;
            v.UI.itemList || v.render(), v.bindForm(p)
        }
        return p
    }

    function i(e, t) {
        var i, n, a = r.replace("{env}", e.items.env.value),
            s = document.createElement("img"),
            l = a + "?",
            c = 13,
            u = e.items;
        t = t && t.value || 250;
        for (n in u) i = u[n], l += i.key + "=" + encodeURIComponent(i.value) + "&";
        return l = encodeURIComponent(l), s.src = o.replace("{env}", e.items.env.value).replace("{url}", l).replace("{pattern}", c).replace("{size}", t), s
    }

    function n(e) {
        var t, i, n, a, s, r = {};
        if (t = e.attributes)
            for (s = 0, a = t.length; a > s; s++) i = t[s], (n = /^data-([a-z0-9_]+)(-editable)?/i.exec(i.name)) && (r[n[1]] = {
                value: i.value,
                isEditable: !! n[2]
            });
        return r
    }

    function a() {
        this.items = {}, this.add = function (e, t, i) {
            this.items[e] = {
                key: e,
                value: t,
                isEditable: i
            }
        }, this.remove = function (e) {
            delete this.items[e]
        }
    }
    var s = {}, r = "https://{env}.paypal.com/cgi-bin/webscr",
        o = "https://{env}.paypal.com/webapps/ppint/qrcode?data={url}&pattern={pattern}&height={size}",
        l = "JavaScriptButton_{type}",
        c = {
            name: "item_name",
            number: "item_number",
            locale: "lc",
            currency: "currency_code",
            recurrence: "p3",
            period: "t3",
            callback: "notify_url"
        }, u = {
            da_DK: {
                buynow: "Køb nu",
                cart: "Læg i indkøbsvogn",
                donate: "Doner",
                subscribe: "Abonner",
                item_name: "Vare",
                number: "Nummer",
                amount: "Pris",
                quantity: "Antal"
            },
            de_DE: {
                buynow: "Jetzt kaufen",
                cart: "In den Warenkorb",
                donate: "Spenden",
                subscribe: "Abonnieren",
                item_name: "Artikel",
                number: "Nummer",
                amount: "Betrag",
                quantity: "Menge"
            },
            en_AU: {
                buynow: "Buy Now",
                cart: "Add to Cart",
                donate: "Donate",
                subscribe: "Subscribe",
                item_name: "Item",
                number: "Number",
                amount: "Amount",
                quantity: "Quantity"
            },
            en_GB: {
                buynow: "Buy Now",
                cart: "Add to Cart",
                donate: "Donate",
                subscribe: "Subscribe",
                item_name: "Item",
                number: "Number",
                amount: "Amount",
                quantity: "Quantity"
            },
            en_US: {
                buynow: "Buy Now",
                cart: "Add to Cart",
                donate: "Donate",
                subscribe: "Subscribe",
                item_name: "Item",
                number: "Number",
                amount: "Amount",
                quantity: "Quantity"
            },
            es_ES: {
                buynow: "Comprar ahora",
                cart: "Añadir al carro",
                donate: "Donar",
                subscribe: "Suscribirse",
                item_name: "Artículo",
                number: "Número",
                amount: "Importe",
                quantity: "Cantidad"
            },
            es_XC: {
                buynow: "Comprar ahora",
                cart: "Añadir al carrito",
                donate: "Donar",
                subscribe: "Suscribirse",
                item_name: "Artículo",
                number: "Número",
                amount: "Importe",
                quantity: "Cantidad"
            },
            fr_CA: {
                buynow: "Acheter",
                cart: "Ajouter au panier",
                donate: "Faire un don",
                subscribe: "Souscrire",
                item_name: "Objet",
                number: "Numéro",
                amount: "Montant",
                quantity: "Quantité"
            },
            fr_FR: {
                buynow: "Acheter",
                cart: "Ajouter au panier",
                donate: "Faire un don",
                subscribe: "Souscrire",
                item_name: "Objet",
                number: "Numéro",
                amount: "Montant",
                quantity: "Quantité"
            },
            fr_XC: {
                buynow: "Acheter",
                cart: "Ajouter au panier",
                donate: "Faire un don",
                subscribe: "Souscrire",
                item_name: "Objet",
                number: "Numéro",
                amount: "Montant",
                quantity: "Quantité"
            },
            he_IL: {
                buynow: "וישכע הנק",
                cart: "תוינקה לסל ףסוה",
                donate: "םורת",
                subscribe: "יונמכ ףרטצה",
                item_name: "טירפ",
                number: "רפסמ",
                amount: "םוכס",
                quantity: "מותכ"
            },
            id_ID: {
                buynow: "Beli Sekarang",
                cart: "Tambah ke Keranjang",
                donate: "Donasikan",
                subscribe: "Berlangganan",
                item_name: "Barang",
                number: "Nomor",
                amount: "Harga",
                quantity: "Kuantitas"
            },
            it_IT: {
                buynow: "Paga adesso",
                cart: "Aggiungi al carrello",
                donate: "Donazione",
                subscribe: "Iscriviti",
                item_name: "Oggetto",
                number: "Numero",
                amount: "Importo",
                quantity: "Quantità"
            },
            ja_JP: {
                buynow: "今すぐ購入",
                cart: "カートに追加",
                donate: "寄付",
                subscribe: "購読",
                item_name: "商品",
                number: "番号",
                amount: "価格",
                quantity: "数量"
            },
            nl_NL: {
                buynow: "Nu kopen",
                cart: "Aan winkelwagentje toevoegen",
                donate: "Doneren",
                subscribe: "Abonneren",
                item_name: "Item",
                number: "Nummer",
                amount: "Bedrag",
                quantity: "Hoeveelheid"
            },
            no_NO: {
                buynow: "Kjøp nå",
                cart: "Legg til i kurv",
                donate: "Doner",
                subscribe: "Abonner",
                item_name: "Vare",
                number: "Nummer",
                amount: "Beløp",
                quantity: "Antall"
            },
            pl_PL: {
                buynow: "Kup teraz",
                cart: "Dodaj do koszyka",
                donate: "Przekaż darowiznę",
                subscribe: "Subskrybuj",
                item_name: "Przedmiot",
                number: "Numer",
                amount: "Kwota",
                quantity: "Ilość"
            },
            pt_BR: {
                buynow: "Comprar agora",
                cart: "Adicionar ao carrinho",
                donate: "Doar",
                subscribe: "Assinar",
                item_name: "Produto",
                number: "Número",
                amount: "Valor",
                quantity: "Quantidade"
            },
            ru_RU: {
                buynow: "Купить сейчас",
                cart: "Добавить в корзину",
                donate: "Пожертвовать",
                subscribe: "Подписаться",
                item_name: "Товар",
                number: "Номер",
                amount: "Сумма",
                quantity: "Количество"
            },
            sv_SE: {
                buynow: "Köp nu",
                cart: "Lägg till i kundvagn",
                donate: "Donera",
                subscribe: "Abonnera",
                item_name: "Objekt",
                number: "Nummer",
                amount: "Belopp",
                quantity: "Antal"
            },
            th_TH: {
                buynow: "ซื้อทันที",
                cart: "เพิ่มลงตะกร้า",
                donate: "บริจาค",
                subscribe: "บอกรับสมาชิก",
                item_name: "ชื่อสินค้า",
                number: "รหัสสินค้า",
                amount: "ราคา",
                quantity: "จำนวน"
            },
            tr_TR: {
                buynow: "Hemen Alın",
                cart: "Sepete Ekleyin",
                donate: "Bağış Yapın",
                subscribe: "Abone Olun",
                item_name: "Ürün",
                number: "Numara",
                amount: "Tutar",
                quantity: "Miktar"
            },
            zh_CN: {
                buynow: "立即购买",
                cart: "添加到购物车",
                donate: "捐赠",
                subscribe: "租用",
                item_name: "物品",
                number: "编号",
                amount: "金额",
                quantity: "数量"
            },
            zh_HK: {
                buynow: "立即買",
                cart: "加入購物車",
                donate: "捐款",
                subscribe: "訂用",
                item_name: "項目",
                number: "號碼",
                amount: "金額",
                quantity: "數量"
            },
            zh_TW: {
                buynow: "立即購",
                cart: "加到購物車",
                donate: "捐款",
                subscribe: "訂閱",
                item_name: "商品",
                number: "商品編號",
                amount: "單價",
                quantity: "數量"
            },
            zh_XC: {
                buynow: "立即购买",
                cart: "添加到购物车",
                donate: "捐赠",
                subscribe: "租用",
                item_name: "物品",
                number: "编号",
                amount: "金额",
                quantity: "数量"
            }
        };
    if (PAYPAL.apps.ButtonFactory || (s.config = {
        labels: {}
    }, s.buttons = {
        buynow: 0,
        cart: 0,
        donate: 0,
        qr: 0,
        subscribe: 0
    }, s.create = function (n, s, r, o) {
        var u, h, d, p = new a;
        if (!n) return !1;
        for (h in s) p.add(c[h] || h, s[h].value, s[h].isEditable);
        return r = r || "buynow", d = "www", p.items.env && p.items.env.value && (d += "." + p.items.env.value), "cart" === r ? (p.add("cmd", "_cart"), p.add("add", !0)) : "donate" === r ? p.add("cmd", "_donations") : "subscribe" === r ? (p.add("cmd", "_xclick-subscriptions"), p.items.amount && !p.items.a3 && p.add("a3", p.items.amount.value)) : p.add("cmd", "_xclick"), p.add("business", n), p.add("bn", l.replace(/\{type\}/, r)), p.add("env", d), "qr" === r ? (u = i(p, p.items.size), p.remove("size")) : u = t(p, r), e(), this.buttons[r] += 1, o && o.appendChild(u), u
    }, PAYPAL.apps.ButtonFactory = s), "undefined" != typeof document) {
        var h, d, p, f, m, _, g = PAYPAL.apps.ButtonFactory,
            v = document.getElementsByTagName("script");
        for (m = 0, _ = v.length; _ > m; m++) h = v[m], h && h.src && (d = h && n(h), p = d && d.button && d.button.value, f = h.src.split("?merchant=")[1], f && (g.create(f, d, p, h.parentNode), h.parentNode.removeChild(h)))
    }
}(), "object" == typeof module && "object" == typeof module.exports && (module.exports = PAYPAL),
function () {
    var e, t, i, n, a = [].indexOf || function (e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    e = jQuery, e.fn.disableClientSideValidations = function () {
        return ClientSideValidations.disable(this)
    }, e.fn.enableClientSideValidations = function () {
        return this.filter("form[data-validate]").each(function () {
            return ClientSideValidations.enablers.form(this)
        }), this.filter(":input:not(button)").each(function () {
            return ClientSideValidations.enablers.input(this)
        })
    }, e.fn.resetClientSideValidations = function () {
        return this.filter("form[data-validate]").each(function () {
            return ClientSideValidations.reset(this)
        })
    }, e.fn.validate = function () {
        return this.filter("form[data-validate]").each(function () {
            return e(this).enableClientSideValidations()
        })
    }, e.fn.isValid = function (a) {
        var s;
        return s = e(this[0]), s.is("form") ? i(s, a) : t(s, n(this[0].name, a))
    }, n = function (e, t) {
        return e = e.replace(/_attributes\]\[\d+\]/g, "_attributes][]"), t[e] || {}
    }, i = function (t, i) {
        var n;
        return t.trigger("form:validate:before.ClientSideValidations"), n = !0, t.find(":input:enabled:visible[data-validate]").each(function () {
            return e(this).isValid(i) || (n = !1), !0
        }), n ? t.trigger("form:validate:pass.ClientSideValidations") : t.trigger("form:validate:fail.ClientSideValidations"), t.trigger("form:validate:after.ClientSideValidations"), n
    }, t = function (t, i) {
        var n, a, s, r, o, l, c;
        return t.trigger("element:validate:before.ClientSideValidations"), l = function () {
            return t.trigger("element:validate:pass.ClientSideValidations").data("valid", null)
        }, r = function (e) {
            return t.trigger("element:validate:fail.ClientSideValidations", e).data("valid", !1), !1
        }, n = function () {
            return t.trigger("element:validate:after.ClientSideValidations").data("valid") !== !1
        }, s = function (e) {
            var n, a, s, o, l, c, u, h;
            o = !0;
            for (a in e)
                if (n = e[a], i[a]) {
                    for (h = i[a], c = 0, u = h.length; u > c; c++)
                        if (l = h[c], s = n.call(e, t, l)) {
                            o = r(s);
                            break
                        }
                    if (!o) break
                }
            return o
        }, a = t.attr("name").replace(/\[([^\]]*?)\]$/, "[_destroy]"), "1" === e("input[name='" + a + "']").val() ? (l(), n()) : t.data("changed") === !1 ? n() : (t.data("changed", !1), o = ClientSideValidations.validators.local, c = ClientSideValidations.validators.remote, s(o) && s(c) && l(), n())
    }, e(function () {
        return e("form[data-validate]").validate()
    }), void 0 === window.ClientSideValidations && (window.ClientSideValidations = {}), void 0 === window.ClientSideValidations.forms && (window.ClientSideValidations.forms = {}), window.ClientSideValidations.reset = function (t) {
        var i, n;
        i = e(t), ClientSideValidations.disable(t), ClientSideValidations.disable(i.find(":input"));
        for (n in t.ClientSideValidations.settings.validators) t.ClientSideValidations.removeError(i.find("[name='" + n + "']"));
        return ClientSideValidations.enablers.form(t)
    }, window.ClientSideValidations.disable = function (t) {
        var i;
        return i = e(t), i.off(".ClientSideValidations"), i.removeData("valid"), i.removeData("changed"), i.filter(":input").each(function () {
            return e(this).removeAttr("data-validate")
        })
    }, window.ClientSideValidations.enablers = {
        form: function (t) {
            var i, n, a, s;
            i = e(t), t.ClientSideValidations = {
                settings: window.ClientSideValidations.forms[i.attr("id")],
                addError: function (e, i) {
                    return ClientSideValidations.formBuilders[t.ClientSideValidations.settings.type].add(e, t.ClientSideValidations.settings, i)
                },
                removeError: function (e) {
                    return ClientSideValidations.formBuilders[t.ClientSideValidations.settings.type].remove(e, t.ClientSideValidations.settings)
                }
            }, s = {
                "submit.ClientSideValidations": function (e) {
                    return i.isValid(t.ClientSideValidations.settings.validators) ? void 0 : (e.preventDefault(), e.stopImmediatePropagation())
                },
                "ajax:beforeSend.ClientSideValidations": function (e) {
                    return e.target === this ? i.isValid(t.ClientSideValidations.settings.validators) : void 0
                },
                "form:validate:after.ClientSideValidations": function (e) {
                    return ClientSideValidations.callbacks.form.after(i, e)
                },
                "form:validate:before.ClientSideValidations": function (e) {
                    return ClientSideValidations.callbacks.form.before(i, e)
                },
                "form:validate:fail.ClientSideValidations": function (e) {
                    return ClientSideValidations.callbacks.form.fail(i, e)
                },
                "form:validate:pass.ClientSideValidations": function (e) {
                    return ClientSideValidations.callbacks.form.pass(i, e)
                }
            };
            for (a in s) n = s[a], i.on(a, n);
            return i.find(":input").each(function () {
                return ClientSideValidations.enablers.input(this)
            })
        },
        input: function (t) {
            var i, n, a, s, r, o;
            n = e(t), r = t.form, i = e(r), o = {
                "focusout.ClientSideValidations": function () {
                    return e(this).isValid(r.ClientSideValidations.settings.validators)
                },
                "change.ClientSideValidations": function () {
                    return e(this).data("changed", !0)
                },
                "element:validate:after.ClientSideValidations": function (t) {
                    return ClientSideValidations.callbacks.element.after(e(this), t)
                },
                "element:validate:before.ClientSideValidations": function (t) {
                    return ClientSideValidations.callbacks.element.before(e(this), t)
                },
                "element:validate:fail.ClientSideValidations": function (t, i) {
                    var n;
                    return n = e(this), ClientSideValidations.callbacks.element.fail(n, i, function () {
                        return r.ClientSideValidations.addError(n, i)
                    }, t)
                },
                "element:validate:pass.ClientSideValidations": function (t) {
                    var i;
                    return i = e(this), ClientSideValidations.callbacks.element.pass(i, function () {
                        return r.ClientSideValidations.removeError(i)
                    }, t)
                }
            };
            for (s in o) a = o[s], n.filter(":enabled:not(:radio):not([id$=_confirmation]):visible:not(button)[name]").each(function () {
                return e(this).attr("data-validate", !0)
            }).on(s, a);
            return n.filter(":checkbox:visible").on("click.ClientSideValidations", function () {
                return e(this).isValid(r.ClientSideValidations.settings.validators), !0
            }), n.filter("[id$=_confirmation]:visible").each(function () {
                var t, n, o, l;
                if (t = e(this), n = i.find("#" + this.id.match(/(.+)_confirmation/)[1] + ":input"), n[0]) {
                    o = {
                        "focusout.ClientSideValidations": function () {
                            return n.data("changed", !0).isValid(r.ClientSideValidations.settings.validators)
                        },
                        "keyup.ClientSideValidations": function () {
                            return n.data("changed", !0).isValid(r.ClientSideValidations.settings.validators)
                        }
                    }, l = [];
                    for (s in o) a = o[s], l.push(e("#" + t.attr("id")).on(s, a));
                    return l
                }
            })
        }
    }, window.ClientSideValidations.validators = {
        all: function () {
            return jQuery.extend({}, ClientSideValidations.validators.local, ClientSideValidations.validators.remote)
        },
        local: {
            presence: function (e, t) {
                return /^\s*$/.test(e.val() || "") ? t.message : void 0
            },
            acceptance: function (e, t) {
                var i;
                switch (e.attr("type")) {
                case "checkbox":
                    if (!e.attr("checked")) return t.message;
                    break;
                case "text":
                    if (e.val() !== ((null != (i = t.accept) ? i.toString() : void 0) || "1")) return t.message
                }
            },
            format: function (e, t) {
                var i;
                if (i = this.presence(e, t)) {
                    if (t.allow_blank === !0) return;
                    return i
                }
                return t["with"] && !t["with"].test(e.val()) ? t.message : t.without && t.without.test(e.val()) ? t.message : void 0
            },
            numericality: function (t, i) {
                var n, a, s, r, o, l, c;
                if (c = jQuery.trim(t.val()), !ClientSideValidations.patterns.numericality.test(c)) {
                    if (i.allow_blank === !0) return;
                    return i.messages.numericality
                }
                if (i.only_integer && !/^[+-]?\d+$/.test(c)) return i.messages.only_integer;
                n = {
                    greater_than: ">",
                    greater_than_or_equal_to: ">=",
                    equal_to: "==",
                    less_than: "<",
                    less_than_or_equal_to: "<="
                }, o = e(t[0].form);
                for (a in n)
                    if (l = n[a], null != i[a]) {
                        if (!isNaN(parseFloat(i[a])) && isFinite(i[a])) s = i[a];
                        else {
                            if (1 !== o.find("[name*=" + i[a] + "]").size()) return;
                            s = o.find("[name*=" + i[a] + "]").val()
                        } if (r = new Function("return " + c + " " + l + " " + s), !r()) return i.messages[a]
                    }
                return !i.odd || parseInt(c, 10) % 2 ? i.even && parseInt(c, 10) % 2 ? i.messages.even : void 0 : i.messages.odd
            },
            length: function (e, t) {
                var i, n, a, s, r, o, l, c;
                if (c = t.js_tokenizer || "split('')", l = new Function("element", "return (element.val()." + c + " || '').length")(e), i = {
                    is: "==",
                    minimum: ">=",
                    maximum: "<="
                }, n = {}, n.message = t.is ? t.messages.is : t.minimum ? t.messages.minimum : void 0, r = this.presence(e, n)) {
                    if (t.allow_blank === !0) return;
                    return r
                }
                for (a in i)
                    if (o = i[a], t[a] && (s = new Function("return " + l + " " + o + " " + t[a]), !s())) return t.messages[a]
            },
            exclusion: function (e, t) {
                var i, n, s, r, o;
                if (n = this.presence(e, t)) {
                    if (t.allow_blank === !0) return;
                    return n
                }
                return t["in"] && (o = e.val(), a.call(function () {
                    var e, i, n, a;
                    for (n = t["in"], a = [], e = 0, i = n.length; i > e; e++) s = n[e], a.push(s.toString());
                    return a
                }(), o) >= 0) ? t.message : t.range && (i = t.range[0], r = t.range[1], e.val() >= i && e.val() <= r) ? t.message : void 0
            },
            inclusion: function (e, t) {
                var i, n, s, r, o;
                if (n = this.presence(e, t)) {
                    if (t.allow_blank === !0) return;
                    return n
                }
                if (t["in"]) {
                    if (o = e.val(), a.call(function () {
                        var e, i, n, a;
                        for (n = t["in"], a = [], e = 0, i = n.length; i > e; e++) s = n[e], a.push(s.toString());
                        return a
                    }(), o) >= 0) return;
                    return t.message
                }
                if (t.range) {
                    if (i = t.range[0], r = t.range[1], e.val() >= i && e.val() <= r) return;
                    return t.message
                }
            },
            confirmation: function (e, t) {
                return e.val() !== jQuery("#" + e.attr("id") + "_confirmation").val() ? t.message : void 0
            },
            uniqueness: function (t, i) {
                var n, a, s, r, o, l, c;
                return s = t.attr("name"), /_attributes\]\[\d/.test(s) && (a = s.match(/^(.+_attributes\])\[\d+\](.+)$/), r = a[1], o = a[2], c = t.val(), r && o && (n = t.closest("form"), l = !0, n.find(':input[name^="' + r + '"][name$="' + o + '"]').each(function () {
                    if (e(this).attr("name") !== s) {
                        if (e(this).val() === c) return l = !1, e(this).data("notLocallyUnique", !0);
                        if (e(this).data("notLocallyUnique")) return e(this).removeData("notLocallyUnique").data("changed", !0)
                    }
                }), !l)) ? i.message : void 0
            }
        },
        remote: {
            uniqueness: function (e, t) {
                var i, n, a, s, r, o, l, c;
                if (a = ClientSideValidations.validators.local.presence(e, t)) {
                    if (t.allow_blank === !0) return;
                    return a
                }
                if (i = {}, i.case_sensitive = !! t.case_sensitive, t.id && (i.id = t.id), t.scope) {
                    i.scope = {}, c = t.scope;
                    for (n in c) r = c[n], l = e.attr("name").replace(/\[\w+\]$/, "[" + n + "]"), o = jQuery("[name='" + l + "']"), jQuery("[name='" + l + "']:checkbox").each(function () {
                        return this.checked ? o = this : void 0
                    }), o[0] && o.val() !== r ? (i.scope[n] = o.val(), o.unbind("change." + e.id).bind("change." + e.id, function () {
                        return e.trigger("change.ClientSideValidations"), e.trigger("focusout.ClientSideValidations")
                    })) : i.scope[n] = r
                }
                return /_attributes\]/.test(e.attr("name")) ? (s = e.attr("name").match(/\[\w+_attributes\]/g).pop().match(/\[(\w+)_attributes\]/).pop(), s += /(\[\w+\])$/.exec(e.attr("name"))[1]) : s = e.attr("name"), t["class"] && (s = t["class"] + "[" + s.split("[")[1]), i[s] = e.val(), 200 === jQuery.ajax({
                    url: "/validators/uniqueness",
                    data: i,
                    async: !1
                }).status ? t.message : void 0
            }
        }
    }, window.ClientSideValidations.formBuilders = {
        "ActionView::Helpers::FormBuilder": {
            add: function (t, i, n) {
                var a, s, r, o;
                return a = e(t[0].form), t.data("valid") !== !1 && null == a.find("label.message[for='" + t.attr("id") + "']")[0] && (s = jQuery(i.input_tag), o = jQuery(i.label_tag), r = a.find("label[for='" + t.attr("id") + "']:not(.message)"), t.attr("autofocus") && t.attr("autofocus", !1), t.before(s), s.find("span#input_tag").replaceWith(t), s.find("label.message").attr("for", t.attr("id")), o.find("label.message").attr("for", t.attr("id")), o.insertAfter(r), o.find("label#label_tag").replaceWith(r)), a.find("label.message[for='" + t.attr("id") + "']").text(n)
            },
            remove: function (t, i) {
                var n, a, s, r, o;
                return a = e(t[0].form), n = jQuery(i.input_tag).attr("class"), s = t.closest("." + n.replace(" ", ".")), r = a.find("label[for='" + t.attr("id") + "']:not(.message)"), o = r.closest("." + n), s[0] ? (s.find("#" + t.attr("id")).detach(), s.replaceWith(t), r.detach(), o.replaceWith(r)) : void 0
            }
        }
    }, window.ClientSideValidations.patterns = {
        numericality: /^(-|\+)?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$/
    }, window.ClientSideValidations.callbacks = {
        element: {
            after: function () {},
            before: function () {},
            fail: function (e, t, i) {
                return i()
            },
            pass: function (e, t) {
                return t()
            }
        },
        form: {
            after: function () {},
            before: function () {},
            fail: function () {},
            pass: function () {}
        }
    }
}.call(this),
function () {
    var e, t;
    t = {
        lines: 13,
        length: 7,
        width: 4,
        radius: 11,
        rotate: 0,
        color: "#222",
        speed: 1,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        className: "spinner",
        zIndex: 9999,
        top: "auto",
        left: "auto"
    }, jQuery(document).ready(function () {
        return $("input#offering_fee").length && $("input#offering_fee").numeric(), $("li.offering .cancel > a").on("click", function (e) {
            var i, n, a;
            return e.preventDefault(), a = $(this).parents("li"), n = $(this).parent("div.cancel").siblings("div.controls"), i = $(this).parent("div.cancel"), a.removeClass("selected"), i.hide(), n.show(), $("div#new_offering_outer").css("opacity", .6).spin(t), $.ajax({
                url: "/users/" + a.data("user-id") + "/offerings/new",
                success: function (e) {
                    return $("div#new_offering_outer").html(e), $("div#new_offering_outer").css("opacity", 1).spin(!1)
                },
                complete: function () {
                    return $("div#new_offering_outer > h3").effect("highlight", {}, 1e3)
                }
            })
        }), $("li.offering a.edit").on("click", function (e) {
            var i, n, a;
            return e.preventDefault(), $("li.offering a.edit").parents("li").removeClass("selected").find(".controls").show(), $("li.offering a.edit").parents("li").removeClass("selected").find(".controls").next().hide(), a = $(this).parents("li"), n = $(this).parent("div.controls"), i = $(this).parent("div.controls").next(), a.addClass("selected"), n.hide(), i.show(), $("div#new_offering_outer").css("opacity", .6).spin(t), $.ajax({
                url: "/offerings/" + a.data("id") + "/edit",
                success: function (e) {
                    return $("div#new_offering_outer").html(e), $("div#new_offering_outer").css("opacity", 1).spin(!1)
                },
                complete: function () {
                    return $(".profile").find(".same_height").css("height", "auto"), equalHeight($(".profile").find(".same_height"))
                }
            })
        }), $("body.offerings.show .lawyer_tagline .read_more").on("click", function () {
            return $("body.offerings.show .lawyer_long_tagline").removeClass("hidden"), $("body.offerings.show .lawyer_tagline").hide(), !1
        })
    }), e = function () {
        function e(e) {
            this.id = e, this.div = $("#offering_" + e), this.lawyer_id = this.div.data("lawyer-id"), this.slug = this.div.data("lawyer-slug")
        }
        return e
    }(), this.Offering = e
}.call(this),
function () {
    var e, t, i;
    jQuery(function () {
        return $(".chosen-select").chosen(), $("#select_state").change(function () {
            return t()
        }), $("#types_filter li input[type='radio']").change(function () {
            var n;
            return n = $(this).parent("li"), $("input#select_type").attr("value", n.data("type")), "offering" === n.data("type") ? $("#specialities_filter").hide() : (console.log("lawyer type!"), i($("input#select_pa").val())), e(n), t()
        }), $("#specialities_filter li.practice_area input[type='radio']").live("change", function () {
            var i;
            return i = $(this).parent("li"), $("input#select_sp").attr("value", i.data("id")), e(i), t()
        }), $("#areas_filter li.practice_area input[type='radio']").change(function () {
            var n;
            return n = $(this).parent("li"), "lawyer" === $("input#select_type").val() ? i(n.data("id")) : $("#specialities_filter").hide(), $("input#select_pa").attr("value", n.data("id")), $("input#select_sp").attr("value", 0), e(n), t()
        })
    }), i = function (e) {
        return 0 !== parseInt(e) ? ($.ajax({
            url: "search/populate_specialities",
            data: "pid=" + e,
            success: function (e) {
                return $("#specialities_filter ul").html(e), $("#specialities_filter").show()
            }
        }), $("#specialities_filter").show()) : $("#specialities_filter").hide()
    }, e = function (e) {
        return e.siblings().children("input").removeAttr("checked"), e.siblings().removeClass("selected"), e.addClass("selected")
    }, t = function () {
        return $.ajax({
            url: "search/filter_results",
            data: {
                state: $("#select_state").val(),
                pa: $("input#select_pa").val(),
                sp: $("input#select_sp").val(),
                type: $("input#select_type").val()
            },
            success: function (e) {
                return $("#results").html(e)
            }
        })
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: function () {
            return this.showStars(), this.validateRating(), this.fetchYelpReviews()
        },
        fetchYelpReviews: function () {
            var e, t;
            return e = $("body.lawyers .yelp-reviews"), t = $("#lawyer_id").val(), e.length && t ? (e.spin(), $(window).on("load", function () {
                return $.ajax({
                    url: "/lawyers/" + t + "/yelp-reviews",
                    success: function (t) {
                        return e.html(t)
                    },
                    complete: function () {
                        return e.spin(!1)
                    }
                })
            })) : void 0
        },
        showStars: function () {
            return $("#rating_stars").raty({
                path: "/assets/raty",
                half: !0,
                hintList: ["", "", "", "", "", ""],
                click: function (e) {
                    return $("input#review_rating").val(e)
                }
            }), $(".answers_container .rating_stars").raty({
                path: "/assets/raty",
                half: !0,
                hintList: ["", "", "", "", "", ""],
                start: function () {
                    return $(this).data("rating")
                },
                click: function (e) {
                    return answers.rate(e, this)
                }
            }), $(".answers_container .rating_stars_readonly, .review .rating, .person_info .rating, .action .rating, #carousel_wrapper .rating").raty({
                path: "/assets/raty",
                half: !0,
                hintList: ["", "", "", "", "", ""],
                readOnly: !0,
                start: function () {
                    return $(this).data("score")
                }
            })
        },
        validateRating: function () {
            return $("form#new_review").on("submit", function (e) {
                var t;
                return t = $(this).find("input[name=score]").val(), "" === t ? (e.preventDefault(), alert("Please rate the conversation"), e.stopPropagation()) : void 0
            })
        }
    }, this.reviews = e
}.call(this);
var my_images = ["/assets/button_tooltip_border-9c46ce0bb5d4385f18431684ed07fcd0.png", "/assets/login_button_selected_bg-ec8dd815db3670bf8e1452c301e14a52.png", "/assets/tooltip_cloud-b8f2ecd52dd870a46d41e956a906bcf7.png", "/assets/call_button_bg-4498aaffe70fe26320629ffa9137ca7b.png"];
show_on_mouseenter = !1, initializeLawyersEvents = function () {
    $(".free_dropdown").live("click", function (e) {
        e.stopPropagation(), $(".button_tooltip").hide(), $(this).nextAll(".button_tooltip").show(), show_on_mouseenter = !0
    });
    var e;
    $(".offerings_item").live("hover", function () {
        $(".offerings_wrapper", $(this).parent()).fadeIn("fast"), clearTimeout(e)
    }), $(".offerings_item").live("mouseleave", function () {
        var t = $(this);
        e = setTimeout(function () {
            $(".offerings_wrapper", t).fadeOut("fast"), clearTimeout(e)
        }, 1500)
    }), $("#moretab").live("mouseleave", function () {
        e = setTimeout(closeMenu, 400)
    }), $(".free").live("mouseenter", function () {
        $(this).data("hover", 1)
    }), $(".free").live("mouseleave", function () {
        $(this).data("hover", 0);
        var e = this,
            t = show_on_mouseenter,
            i = $(e).nextAll(".button_tooltip");
        setTimeout(function () {
            i.data("hover") || $(e).data("hover") || t || i.hide()
        }, 300)
    }), $(".free").live("click", function (e) {
        return "#" == $(this).attr("href") ? (e.stopPropagation(), $(".button_tooltip").hide(), $(this).nextAll(".button_tooltip").show(), !1) : void 0
    }), $(".button_tooltip").live("mouseenter", function () {
        0 == show_on_mouseenter && $(this).data("hover", 1)
    }), $(".button_tooltip").live("mouseleave", function () {
        0 == show_on_mouseenter && ($(this).hide(), $(this).data("hover", 0))
    }), $("div.row.lawyer a, div.row.lawyer input, div.row.lawyer .view_profile_button").live("click", function (e) {
        var t = $(this).parents("div.row.lawyer"),
            i = $(".expander_container", t);
        i.length > 0 && e.stopPropagation()
    })
};
var messageString = "",
    isOverlayOpen = !1;
jQuery.fn.center = function () {
    return this.css({
        position: "fixed",
        margin: "0"
    }), this.css("margin-top", -1 * (this.outerHeight() / 2) + "px"), this.css("margin-left", -1 * (this.outerWidth() / 2) + "px"), this.css("top", "50%"), this.css("left", "50%"), this
}, $(document).ready(function () {
    $("body.users.show.logged-in .dialog-window, body.clients.edit.logged-in .dialog-window").center(), $("div.load-more a").length && $(window).scroll(function () {
        if ($("div.load-more a").length) {
            var e = $("div.load-more a").offset().top,
                t = e - $(window).scrollTop();
            1e3 > t && $("div.load-more a").click()
        }
    }), $("#lawyer_is_online:checkbox").iphoneStyle({
        checkedLabel: "Available",
        uncheckedLabel: "Unavailable",
        onChange: function (e) {
            $($(e)[0]).data("unpaid") ? (alert("Only subscribed lawyers may appear available by phone and video chat."), $(e)[0].checked = !1) : $.post("/UpdateOnlineStatus", {
                op: "set_online_status",
                is_online: $(e)[0].checked
            })
        }
    }), $("#is_available_by_phone:checkbox").iphoneStyle({
        checkedLabel: "Available",
        uncheckedLabel: "Unavailable",
        onChange: function (e) {
            $($(e)[0]).data("unpaid") ? (alert("Only subscribed lawyers may appear available by phone and video chat."), $(e)[0].checked = !1) : $.post("/UpdateOnlineStatus", {
                op: "set_phone_status",
                is_available_by_phone: $(e)[0].checked
            })
        }
    }), $("form").on("submit", function () {
        $(this).find("input[type=submit]").not(".can_not_be_disabled").attr("disabled", "disabled")
    }), $(".footer_signup .sign_up_textbox").on("keyup", function () {
        $(".footer_signup .sign_up_button").removeAttr("disabled")
    })
}), String.prototype.nl2br = function () {
    return this.replace(/\n/g, "<br />")
}, String.prototype.strip_tags = function () {
    return this.replace(/<(?:.|\n)*?>/gm, "")
},
function () {
    var e, t, i, n, a = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }, s = {}.hasOwnProperty,
        r = function (e, t) {
            function i() {
                this.constructor = e
            }
            for (var n in t) s.call(t, n) && (e[n] = t[n]);
            return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
        };
    window.LawdingoMenu = function () {
        function e(e, t) {
            this.need_show_menu = a(this.need_show_menu, this), this.need_hide_menu = a(this.need_hide_menu, this), this.mouse_out = a(this.mouse_out, this), this.mouse_over = a(this.mouse_over, this), this.hide = a(this.hide, this), this.add_tab = a(this.add_tab, this);
            var i, n, s;
            for (this.timeout = 1e3, this.is_shown_menu = !1, this.parent_id = e, this.tabs = new Array, n = 0, s = t.length; s > n; n++) i = t[n], this.add_tab(i);
            "function" == typeof this.on_create && this.on_create("0")
        }
        return e.prototype.add_tab = function (e) {
            var t, i, n = this;
            return t = this.tabs.length, i = this.new_tab(e, t), this.tabs[t] = i, $(i).bind({
                got_mouse: function (e, t) {
                    return n.mouse_over(t)
                },
                got_mouse_out: function (e, t) {
                    return n.mouse_out(t)
                }
            })
        }, e.prototype.hide = function (e) {
            return e.hide_hide("0")
        }, e.prototype.mouse_over = function (e) {
            var t, i, n, a, s, r, o;
            for (this.mouse = !0, this.need_show_menu(), n = this.tabs[e], i = this, r = this.tabs, o = [], a = 0, s = r.length; s > a; a++) t = r[a], t.is_equals(n) !== !0 && o.push(i.hide(t));
            return o
        }, e.prototype.mouse_out = function () {
            return this.mouse = !1, setTimeout(this.need_hide_menu, this.timeout)
        }, e.prototype.need_hide_menu = function () {
            return "function" == typeof this.hide_menu && this.mouse !== !0 && this.is_shown_menu === !0 ? (this.hide_menu(), this.is_shown_menu = !1) : void 0
        }, e.prototype.need_show_menu = function () {
            return "function" == typeof this.show_menu && this.is_shown_menu !== !0 ? (this.show_menu(), this.is_shown_menu = !0) : void 0
        }, e
    }(), e = function (e) {
        function n() {
            return this.new_tab = a(this.new_tab, this), i = n.__super__.constructor.apply(this, arguments)
        }
        return r(n, e), n.prototype.new_tab = function (e, i) {
            return new t($("#" + this.parent_id + " #" + e.tab_id), $("#" + this.parent_id + " #" + e.dialog_id), i)
        }, n
    }(LawdingoMenu), window.LawdingoMenuElem = function () {
        function e(e, t, i) {
            this.is_equals = a(this.is_equals, this), this.hide_hide = a(this.hide_hide, this), this.on_blur = a(this.on_blur, this), this.on_focus = a(this.on_focus, this), this.hide = a(this.hide, this), this.click = a(this.click, this), this.mouse_out = a(this.mouse_out, this), this.mouse_over = a(this.mouse_over, this);
            var n;
            this.timeout = 1e3, this.timeout1 = 250, this.dialog = t, this.need_hide = !1, this.is_hidden = !0, this.has_focus = !1, this.tab_index = i, this.el = e;
            try {
                $.isEmptyObject($(e)) || this.bind_el_events($(e)), $.isEmptyObject($(t)) || this.bind_dialog_events($(t))
            } catch (s) {
                n = s, alert(n.message)
            }
            "function" == typeof this.on_create && this.on_create("0")
        }
        return e.prototype.mouse_over = function (e) {
            return this.need_hide = !1, $(this).trigger("got_mouse", [this.tab_index]), "function" == typeof this.show_elem ? this.show_elem(e) : void 0
        }, e.prototype.mouse_out = function () {
            return $(this).trigger("got_mouse_out", [this.tab_index]), this.need_hide = !0, setTimeout(this.hide, this.timeout)
        }, e.prototype.click = function () {}, e.prototype.hide = function () {
            return !this.has_focus && this.need_hide ? this.hide_hide("0") : void 0
        }, e.prototype.on_focus = function () {
            return this.has_focus = !0
        }, e.prototype.on_blur = function () {
            return this.has_focus = !1, this.need_hide = !0, setTimeout(this.hide, this.timeout1)
        }, e.prototype.hide_hide = function () {
            return "function" == typeof this.hide_elem ? this.hide_elem("0") : void 0
        }, e.prototype.is_equals = function (e) {
            var t;
            return t = !1, t = $(this.el).is($(e.el))
        }, e
    }(), t = function (e) {
        function t() {
            return this.hide_elem = a(this.hide_elem, this), this.click = a(this.click, this), this.show_elem = a(this.show_elem, this), this.bind_dialog_events = a(this.bind_dialog_events, this), this.bind_el_events = a(this.bind_el_events, this), n = t.__super__.constructor.apply(this, arguments)
        }
        return r(t, e), t.prototype.bind_el_events = function (e) {
            var t = this;
            return $(e).bind({
                mouseover: function (e) {
                    return t.mouse_over(e)
                },
                click: function (e) {
                    return t.click(e)
                },
                mouseout: function (e) {
                    return t.mouse_out(e)
                }
            })
        }, t.prototype.bind_dialog_events = function (e) {
            var t = this;
            return $(e).bind({
                mouseover: function (e) {
                    return t.mouse_over(e)
                },
                mouseout: function (e) {
                    return t.mouse_out(e)
                }
            }), $(e).find(":input").bind({
                focus: function (e) {
                    return t.on_focus(e)
                },
                blur: function (e) {
                    return t.on_blur(e)
                }
            })
        }, t.prototype.show_elem = function () {
            return $.isEmptyObject($(this.el)) || $(this.dialog).css("left", $(this.el).offset().left), $(this.dialog).removeClass("hidden"), $(this.el).addClass("selected")
        }, t.prototype.click = function () {}, t.prototype.hide_elem = function () {
            return $(this.dialog).addClass("hidden"), $(this.el).removeClass("selected")
        }, t
    }(LawdingoMenuElem)
}.call(this),
function (e) {
    return
}(this), window.ClientSideValidations.validators.local.email_format = function (e, t) {
    return /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(e.val()) ? void 0 : t.message
}, window.ClientSideValidations.validators.remote.zipcode = function (e, t) {
    return e.val().length && 404 == $.ajax({
        url: "/validators/zipcode",
        data: {
            id: e.val()
        },
        async: !1
    }).status ? t.message : void 0
},
function () {
    jQuery(function () {
        return $("section#call .talk_now > a").on("click", function (e) {
            return e.preventDefault(), $("section#call form#phone_consultation_form").trigger("submit")
        })
    })
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleHomepageParameters()
        },
        appParameterSaveButton: function () {
            return $(".app_parameters input.app_parameter_save_button")
        },
        handleHomepageParameters: function () {
            return this.appParameterSaveButton().on("click", function () {
                return $.ajax({
                    url: $(this).data("url"),
                    data: {
                        id: $(this).data("id"),
                        value: $("input#" + $(this).data("field-id")).val()
                    },
                    success: function (e) {
                        return alert(e)
                    }
                }), !1
            })
        }
    }, this.admin_app_parameters = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleEvents()
        },
        handleEvents: function () {
            var e = this;
            return $(".publish_article a").on("click", function (t) {
                var i;
                return i = "published" === $(t.target).data("status") ? {
                    "article[status]": "rejected"
                } : {
                    "article[status]": "published"
                }, e.update(t.target, i), !1
            })
        },
        update: function (e, t) {
            return $.ajax({
                url: $(e).attr("href") + ".json",
                type: "PUT",
                dataType: "json",
                data: t,
                beforeSend: function () {
                    return $(e).addClass("loading")
                },
                complete: function () {
                    return $(e).removeClass("loading")
                },
                success: function (t) {
                    return t.status ? ($(e).data("status", t.status), "published" === t.status ? $(e).text("Disapprove") : $(e).text("Approve")) : void 0
                }
            })
        }
    }, this.adminArticles = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleMetricsDateSelect()
        },
        dateFrom: function () {
            return $("#date_from #date_year").val().length && $("#date_from #date_month").val().length && $("#date_from #date_day").val().length ? "" + $("#date_from #date_year").val() + "/" + $("#date_from #date_month").val() + "/" + $("#date_from #date_day").val() : ""
        },
        dateTo: function () {
            return $("#date_to #date_year").val().length && $("#date_to #date_month").val().length && $("#date_to #date_day").val().length ? "" + $("#date_to #date_year").val() + "/" + $("#date_to #date_month").val() + "/" + $("#date_to #date_day").val() : ""
        },
        sortBy: function () {
            return $("#sort_by").val()
        },
        order: function () {
            return "asc" === $("#order").val() ? "desc" : "asc"
        },
        handleMetricsDateSelect: function () {
            var e = this;
            return $("button.clients_date_selector").on("click", function () {
                var t;
                return e.dateTo().length && e.dateFrom().length && (t = "/admin/clients/metrics?sort_by=" + e.sortBy() + "&order=" + e.order() + "&date_from=" + e.dateFrom() + "&date_to=" + e.dateTo(), window.location.href = t), !1
            })
        }
    }, this.adminClients = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleDailyStatsDateSelect()
        },
        dateFrom: function () {
            return $("#date_from #date_year").val().length && $("#date_from #date_month").val().length && $("#date_from #date_day").val().length ? "" + $("#date_from #date_year").val() + "/" + $("#date_from #date_month").val() + "/" + $("#date_from #date_day").val() : ""
        },
        dateTo: function () {
            return $("#date_to #date_year").val().length && $("#date_to #date_month").val().length && $("#date_to #date_day").val().length ? "" + $("#date_to #date_year").val() + "/" + $("#date_to #date_month").val() + "/" + $("#date_to #date_day").val() : ""
        },
        handleDailyStatsDateSelect: function () {
            var e = this;
            return $("button.daily_stats_date_selector").on("click", function () {
                var t;
                return e.dateTo().length && e.dateFrom().length && (t = "/admin/daily_stats?date_from=" + e.dateFrom() + "&date_to=" + e.dateTo(), window.location.href = t), !1
            }), $("button.daily_stats_charts_date_selector").on("click", function () {
                var t;
                return e.dateTo().length && e.dateFrom().length && (t = "/admin/daily_stats_charts?date_from=" + e.dateFrom() + "&date_to=" + e.dateTo(), window.location.href = t), !1
            })
        }
    }, this.adminDailyStats = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleMetricsDateSelect()
        },
        dateFrom: function () {
            return $("#date_from #date_year").val().length && $("#date_from #date_month").val().length && $("#date_from #date_day").val().length ? "" + $("#date_from #date_year").val() + "/" + $("#date_from #date_month").val() + "/" + $("#date_from #date_day").val() : ""
        },
        dateTo: function () {
            return $("#date_to #date_year").val().length && $("#date_to #date_month").val().length && $("#date_to #date_day").val().length ? "" + $("#date_to #date_year").val() + "/" + $("#date_to #date_month").val() + "/" + $("#date_to #date_day").val() : ""
        },
        sortBy: function () {
            return $("#sort_by").val()
        },
        order: function () {
            return "asc" === $("#order").val() ? "desc" : "asc"
        },
        handleMetricsDateSelect: function () {
            var e = this;
            return $("button.lawyers_date_selector").on("click", function () {
                var t;
                return e.dateTo().length && e.dateFrom().length && (t = "/admin/lawyers/metrics?sort_by=" + e.sortBy() + "&order=" + e.order() + "&date_from=" + e.dateFrom() + "&date_to=" + e.dateTo(), window.location.href = t), !1
            })
        }
    }, this.adminLawyers = e
}.call(this),
function () {}.call(this),
function () {
    jQuery(function () {
        return $("body.show button[name='send_inquiry']").on("click", function () {
            var e;
            return e = $(this).data("free"), $.ajax({
                url: "/admin/questions/send_inquiry",
                type: "post",
                data: {
                    is_free: e,
                    question_id: $("input#question_id").val()
                },
                success: function (e) {
                    return "sent" === e ? $(".actions > .status").show().text("Emails sent successfully") : void 0
                }
            })
        }), $(".state_specific .show-states-selector").on("click", function () {
            return $(".state_specific").addClass("hidden"), $(".state_select").removeClass("hidden")
        }), $("body.show #question_practice_area_id").on("change", function (e) {
            var t;
            return t = $("#question_practice_area_id option[value='" + $(e.target).val() + "']").text(), t.match(/\(nation\)/) ? (t = t.replace(/\(nation\)/, "").replace(/\s\*\*\*/, ""), $(".state_specific #practice_area_name").text(t), $(".state_specific").removeClass("hidden"), $(".state_select").addClass("hidden")) : (t = t.replace(/\(nation\)/, "").replace(/\s\*\*\*/, ""), $(".state_specific #practice_area_name").text(t), $(".state_specific").addClass("hidden"), $(".state_select").removeClass("hidden"))
        })
    })
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleGetACallBlock()
        },
        getCalledForm: function () {
            return $(".get_a_call_block form.new_anonymous")
        },
        getCalledButton: function () {
            return this.getCalledForm().find(".get_called_button")
        },
        getCalledSelects: function () {
            return this.getCalledForm().find("#call_state_id, #call_practice_area_id")
        },
        handleGetACallBlock: function () {
            return this.getCalledForm().on("submit", function () {
                return $(".get_a_call_block button").attr("disabled", "disabled")
            }), this.getCalledSelects().on("change", function () {
                return $(".get_a_call_block button").removeAttr("disabled"), $(".get_a_call_message").text("")
            }), this.getCalledForm().bind("ajax:success", function (e, t) {
                return t.result ? $(".get_a_call_message").text("We will try to find a lawyer who can help. If none are available, we'll text you to let you know.") : $(".get_a_call_message").text("Sorry, no lawyers like this are availble right now. Browse lawyers instead.")
            })
        }
    }, this.anonymouses = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleEvents()
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        },
        rate: function (e, t) {
            var i, n;
            return $(t).data("review_id") > 0 ? (n = "/reviews/" + $(t).data("review_id") + ".json", i = "PUT") : (n = "/reviews.json", i = "POST"), $.ajax({
                url: n,
                type: i,
                data: {
                    "review[body]": "",
                    "review[lawyer_id]": $(t).data("lawyer-id"),
                    "review[answer_id]": $(t).data("answer-id"),
                    "review[client_id]": $(t).data("client-id"),
                    "review[purpose]": "Legal Question",
                    "review[rating]": e,
                    authenticity_token: this.token()
                },
                success: function (e) {
                    return e.id ? $(t).data("review-id", e.id) : void 0
                }
            }), !1
        },
        handleEvents: function () {
            return !1
        }
    }, this.answers = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleShareMessageForm()
        },
        share_schedule_session_button: function () {
            return $("body.lawyers.share.show .schedule_session_button")
        },
        message_form: function () {
            return $("body.lawyers.share.show #message_body, body.lawyers.share.show #message_submit_button")
        },
        appointment_link: function () {
            return $("body.lawyers.share.show .appt-select")
        },
        lawyer_link: function () {
            return $("a.as_text#lawyer_link").attr("href")
        },
        handleShareMessageForm: function () {
            return this.message_form().on("click", function () {
                return window.location.href = lawyer_link
            }), this.appointment_link().on("click", function () {
                return window.location.href = lawyer_link + "/appointments"
            }), this.share_schedule_session_button().on("click", function () {
                var e;
                return e = $("input#message_lawyer_id").val(), window.location.href = "/clients/new?lawyer_path=" + e + "&notice=true"
            })
        }
    }, this.share = e
}.call(this),
function () {
    var e;
    jQuery(document).ready(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleProfileAppointmentBlock(), this.handleEvents()
        },
        block: function () {
            return $(".profile_info, section#appointment")
        },
        rightArrow: function () {
            return this.block().find("a.arrows#right_arrow")
        },
        leftArrow: function () {
            return this.block().find("a.arrows#left_arrow")
        },
        form: function () {
            return $("form.new_appointment, form.edit_appointment")
        },
        lawyer_id: function () {
            return this.form().data("id")
        },
        lawyer_name: function () {
            return this.form().data("full-name")
        },
        state_name_select: function () {
            return this.form().find("#appointment_state_id")
        },
        practice_area_select: function () {
            return this.form().find("#appointment_practice_area_id")
        },
        appointmentTime: function () {
            return this.form().find("#appointment_time")
        },
        state_name_and_practice_area_select: function () {
            return this.form().find("#appointment_state_id, #appointment_practice_area_id")
        },
        appointment_warning: function () {
            return this.form().find("#appointment_warning")
        },
        submit_button: function () {
            return this.form().find(".submit_appointment_button")
        },
        appointment_contact_number: function () {
            return this.form().find("#appointment_contact_number")
        },
        acceptAppointmentButton: function () {
            return $(".appointment_item_buttons #accept_appointment_button")
        },
        rejectAppointmentButton: function () {
            return $(".appointment_item_buttons #reject_appointment_button")
        },
        cancelAppointmentButton: function () {
            return $(".appointment_item_buttons #cancel_appointment_button")
        },
        acceptRejectButtons: function (e) {
            return $(e).find("#accept_appointment_button, #reject_appointment_button")
        },
        appointmentRadios: function () {
            return $('form#new_appointment input[name="appointment[appointment_type]"]')
        },
        appointmentPhoneFields: function () {
            return $("form#new_appointment .appointment_phone_fields")
        },
        appointmentPhoneRadio: function () {
            return $('form#new_appointment .appointment_phone_fields input[name="appointment[appointment_type]"]')
        },
        appointmentContactNumber: function () {
            return $("form#new_appointment .appointment_phone_fields #appointment_contact_number")
        },
        statusSpan: function () {
            return $(".appointment_item span.status")
        },
        handleEvents: function () {
            var e = this;
            return $('.appointment_attachment_wrapper #file_replacement, .appointment_attachment_wrapper label[for="file_replacement"]').removeClass("hidden"), $(".appointment_attachment_wrapper #appointment_attachment").css("width", "0").css("height", "0"), $(".appointment_attachment_wrapper #file_replacement").on("click", function () {
                return $(".appointment_attachment_wrapper #appointment_attachment").click()
            }), $(".appointment_attachment_wrapper #appointment_attachment").on("change", function () {
                return $(this).val().length ? $('.appointment_attachment_wrapper label[for="file_replacement"]').text(/([^\\]+)$/.exec($(this).val())[1]) : void 0
            }), $(".appointment_container div.load-more a").live("click", function (e) {
                return $(this).html("Fetching more appointments..."), $(".appointment_container div.load-more").remove(), $.ajax({
                    url: $(e.target).attr("href"),
                    beforeSend: function () {
                        return $(".appointment_container").addClass("loading")
                    },
                    complete: function () {
                        return $(".appointment_container").removeClass("loading")
                    },
                    success: function (e) {
                        return $(".appointment_container").append(e)
                    }
                }), !1
            }), this.acceptAppointmentButton().live("click", function (t) {
                return e.update(t.target, {
                    "appointment[status]": "accepted"
                }), !1
            }), this.rejectAppointmentButton().live("click", function (t) {
                return e.update(t.target, {
                    "appointment[status]": "rejected"
                }), !1
            }), this.cancelAppointmentButton().live("click", function (t) {
                return e.update(t.target, {
                    "appointment[status]": "cancelled"
                }), !1
            }), this.submit_button().on("click", function () {
                return e.appointmentTime().val().length ? (e.clear_appointment_warning(), !0) : (e.writeTimeWarning(), !1)
            }), this.appointmentRadios().on("change", function (t) {
                switch (e.enable_submit_button(), e.clear_appointment_warning(), $(t.target).val()) {
                case "phone":
                    return e.appointmentPhoneFields().show("slow"), e.appointmentContactNumber().attr("required", "required");
                default:
                    return e.appointmentPhoneFields().hide("slow"), e.appointmentContactNumber().removeAttr("required")
                }
            })
        },
        update: function (e, t) {
            var i = this;
            return t.authenticity_token = $("[name='csrf-token']").attr("content"), $.ajax({
                url: $(e).attr("href") + ".json",
                type: "PUT",
                dataType: "json",
                data: t,
                beforeSend: function () {
                    return $(e).addClass("loading")
                },
                complete: function () {
                    return $(e).removeClass("loading")
                },
                success: function (t) {
                    return t.id ? (i.acceptRejectButtons($(e).parents(".appointment_item_buttons")).removeAttr("disabled"), $(e).parents(".appointment_item, .feed_item").find("span.status").text(t.status), $(e).attr("disabled", "disabled")) : void 0
                }
            })
        },
        handleProfileAppointmentBlock: function () {
            var e = this;
            return this.fill_practice_area_state_select_from_cookie(), this.block().find("a.appointment-time").click(function (t) {
                return e.block().find("a.appointment-time").removeClass("selected"), $(t.target).addClass("selected"), e.form().find("#appointment_time").val($(t.target).attr("data-time")), e.form().find(".appointment-info").html("Appointment set at " + $(t.target).attr("data-time-formatted")), e.clear_appointment_warning(), !1
            }), this.block().find("a.more").click(function () {
                return e.block().find("a.more").parent().hide(), e.block().find("li.hidden").removeClass("hidden"), e.block().find(".main-content").addClass("expanded"), !1
            }), this.rightArrow().on("click", function () {
                return parseInt($(".available-appointments").css("left")) < -800 && e.rightArrow().addClass("hidden"), parseInt($(".available-appointments").css("left")) < 415 && e.leftArrow().removeClass("hidden"), $(".available-appointments").animate({
                    left: "-=415"
                }, 1e3)
            }), this.leftArrow().on("click", function () {
                return parseInt($(".available-appointments").css("left")) > -3400 && e.rightArrow().removeClass("hidden"), parseInt($(".available-appointments").css("left")) > -450 && e.leftArrow().addClass("hidden"), $(".available-appointments").animate({
                    left: "+=415px"
                }, 1e3)
            }), this.form().submit(function () {
                return e.isClientHasPhone() || e.appointmentPhoneRadio().is(":not(:checked)") ? !0 : !1
            }), this.appointment_contact_number().on("change", function () {
                return e.enable_submit_button(), e.clear_appointment_warning()
            })
        },
        fill_practice_area_state_select_from_cookie: function () {
            return $.cookie("state_id") && "" === this.state_name_select().val() && this.state_name_select().val($.cookie("state_id")), $.cookie("practice_area_id") && "" === this.practice_area_select().val() ? this.practice_area_select().val($.cookie("practice_area_id")) : void 0
        },
        isClientHasPhone: function () {
            return this.appointment_contact_number().val().length ? !0 : (this.disable_submit_button(), this.write_phone_warning(), !1)
        },
        disable_submit_button: function () {
            return this.submit_button().attr("disabled", "disabled")
        },
        enable_submit_button: function () {
            return this.submit_button().removeAttr("disabled")
        },
        write_phone_warning: function () {
            var e;
            return e = "Please add phone number.", this.appointment_warning().html(e)
        },
        writeTimeWarning: function () {
            var e;
            return e = "Please select appointment time.", this.appointment_warning().html(e)
        },
        clear_appointment_warning: function () {
            return this.appointment_warning().html("")
        }
    }, this.appointments = e
}.call(this),
function () {}.call(this),
function () {
    jQuery(function () {
        return $("a.practice_area_name").live("click", function () {
            return $.cookie("practice_area", $(this).data("practice-area"), {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area_id", $(this).data("id"), {
                expires: 30,
                path: "/"
            })
        }), $("a.only_for_client").live("click", function () {
            return alert("Sorry, only clients can contact lawyers; lawyers can't contact other lawyers."), !1
        }), $("a#remove_lawdingo_profile").on("click", function () {
            return confirm($(this).data("confirm")) && $.ajax({
                url: $(this).attr("href"),
                type: "PUT",
                data: {
                    "lawyer[is_approved]": 0,
                    authenticity_token: $("[name='csrf-token']").attr("content")
                },
                beforeSend: function () {
                    return $("div#container").addClass("loading")
                },
                complete: function () {
                    return $("div#container").removeClass("loading")
                },
                success: function (e) {
                    return e.result ? $("a#remove_lawdingo_profile").replaceWith("Your Lawdingo account is not active. Please email info@lawdingo.com if you would like to be listed on Lawdingo.") : void 0
                }
            }), !1
        })
    })
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleEvents()
        },
        block: function () {
            return $(".profile_info, section#appointment")
        },
        handleEvents: function () {
            var e = this;
            return $('#leveled_list_bar_ids.leveled-list input[type="checkbox"]').on("change", function (e) {
                return $(e.target).is(":checked") ? $(e.target).prev($(".destroy_checkbox")).val("false") : $(e.target).prev($(".destroy_checkbox")).val("true")
            }), $("#set_bar_ids.button").on("click", function () {
                return e.setBarIds()
            })
        },
        setBarIds: function () {
            var e, t, i, n, a;
            if (i = [], e = 0, $("#leveled_list_bar_ids input[type=checkbox]:checked").each(function () {
                var t, n, a;
                return t = $(this).nextAll("div.sub"), a = t.attr("id"), n = $(this).parents("li").attr("id"), i[a] = $(t).find("#lawyer_bar_memberships_attributes_" + n + "_bar_id").val(), e++
            }), e) {
                a = "";
                for (t in i) n = i[t] ? t + " (Bar ID: " + i[t] + ")" : t, a += "<li>" + n + "</li>";
                $("#barids_opener").addClass("hidden"), $("#barids_editor").removeClass("hidden"), $("#div_states_barids .bar_list").html(a), $("#div_states_barids").show().css("display", "inline")
            } else $("#barids_opener").removeClass("hidden"), $("#barids_editor").addClass("hidden"), $("#div_states_barids .bar_list").html("");
            return close_dialogs()
        }
    }, this.barMemberships = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.ensureCardDetails()
        },
        ensureCardDetails: function () {
            var e = this;
            return $("form#new_bid").on("submit", function () {
                return $("input[type=submit]").data("ensure-card-details") ? (e.processCard(), !1) : !0
            })
        },
        processCard: function () {
            var t;
            return t = {
                number: $("#card_number").val(),
                cvc: $("#card_code").val(),
                expMonth: $("#card_month").val(),
                expYear: $("#card_year").val()
            }, Stripe.createToken(t, e.handleStripeResponse)
        },
        handleStripeResponse: function (e, t) {
            return 200 === e ? ($("#bid_stripe_card_token").val(t.id), $("form#new_bid")[0].submit()) : $("#stripe_error").text(t.error.message)
        }
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.ensureCardDetails()
        },
        ensureCardDetails: function () {
            var e = this;
            return $("[data-card-details-form]").on("submit", function (t) {
                return t.preventDefault(), e.processCard(), !1
            }), $("#update_card_form_show_link").on("click", function () {
                return $(".update_card").toggleClass("hidden"), !1
            }), $("#update_bid_and_budget_link").on("click", function () {
                return $(".update_bid_and_budget").toggleClass("hidden"), !1
            })
        },
        processCard: function () {
            var t;
            return t = {
                number: $("#card_number").val(),
                cvc: $("#card_code").val(),
                expMonth: $("#card_month").val(),
                expYear: $("#card_year").val()
            }, Stripe.createToken(t, e.handleStripeResponse)
        },
        handleStripeResponse: function (e, t) {
            return 200 === e ? ($("input#stripe_card_token").val(t.id), $("[data-card-details-form]")[0].submit()) : $("#stripe_error").text(t.error.message)
        }
    }
}.call(this),
function () {
    jQuery(function () {
        var e;
        return e = Math.floor(6 * Math.random()), jQuery("#mini-profiles_carousel").jcarousel({
            scroll: 1,
            wrap: "circular",
            start: e,
            initCallback: function (e) {
                return e.clip.hover(function () {
                    return e.stopAuto()
                }, function () {
                    return e.startAuto()
                }), e.buttonNext.bind({
                    mouseover: function () {
                        return e.stopAuto()
                    },
                    mouseout: function () {
                        return e.startAuto()
                    }
                }), e.buttonPrev.bind({
                    mouseover: function () {
                        return e.stopAuto()
                    },
                    mouseout: function () {
                        return e.startAuto()
                    }
                })
            }
        }), jQuery("#press_items_carousel").jcarousel({
            scroll: 1,
            wrap: "circular",
            auto: 2,
            initCallback: function (e) {
                var t, i;
                return i = null, t = 100, e.clip.hover(function () {
                    return e.stopAuto()
                }, function () {
                    return e.startAuto()
                }), e.buttonNext.bind({
                    mouseover: function () {
                        return e.stopAuto(), i = setInterval(function () {
                            return e.next()
                        }, t)
                    },
                    mouseout: function () {
                        return e.startAuto(), clearInterval(i)
                    }
                }), e.buttonPrev.bind({
                    mouseover: function () {
                        return e.stopAuto(), i = setInterval(function () {
                            return e.prev()
                        }, t)
                    },
                    mouseout: function () {
                        return e.startAuto(), clearInterval(i)
                    }
                })
            }
        })
    })
}.call(this);


window.olark || (function (c) {
    var f = window,
        d = document,
        l = f.location.protocol == "https:" ? "https:" : "http:",
        z = c.name,
        r = "load";
    var nt = function () {
        f[z] = function () {
            (a.s = a.s || []).push(arguments)
        };
        var a = f[z]._ = {}, q = c.methods.length;
        while (q--) {
            (function (n) {
                f[z][n] = function () {
                    f[z]("call", n, arguments)
                }
            })(c.methods[q])
        }
        a.l = c.loader;
        a.i = nt;
        a.p = {
            0: +new Date
        };
        a.P = function (u) {
            a.p[u] = new Date - a.p[0]
        };

        function s() {
            a.P(r);
            f[z](r)
        }
        f.addEventListener ? f.addEventListener(r, s, false) : f.attachEvent("on" + r, s);
        var ld = function () {
            function p(hd) {
                hd = "head";
                return ["<", hd, "></", hd, "><", i, ' onl' + 'oad="var d=', g, ";d.getElementsByTagName('head')[0].", j, "(d.", h, "('script')).", k, "='", l, "//", a.l, "'", '"', "></", i, ">"].join("")
            }
            var i = "body",
                m = d[i];
            if (!m) {
                return setTimeout(ld, 100)
            }
            a.P(1);
            var j = "appendChild",
                h = "createElement",
                k = "src",
                n = d[h]("div"),
                v = n[j](d[h](z)),
                b = d[h]("iframe"),
                g = "document",
                e = "domain",
                o;
            n.style.display = "none";
            m.insertBefore(n, m.firstChild).id = z;
            b.frameBorder = "0";
            b.id = z + "-loader";
            if (/MSIE[ ]+6/.test(navigator.userAgent)) {
                b.src = "javascript:false"
            }
            b.allowTransparency = "true";
            v[j](b);
            try {
                b.contentWindow[g].open()
            } catch (w) {
                c[e] = d[e];
                o = "javascript:var d=" + g + ".open();d.domain='" + d.domain + "';";
                b[k] = o + "void(0);"
            }
            try {
                var t = b.contentWindow[g];
                t.write(p());
                t.close()
            } catch (x) {
                b[k] = o + 'd.write("' + p().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
            }
            a.P(2)
        };
        ld()
    };
    nt()
})({
    loader: "static.olark.com/jsclient/loader0.js",
    name: "olark",
    methods: ["configure", "extend", "declare", "identify"]
});
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('9913-410-10-4631'); /*]]>*/