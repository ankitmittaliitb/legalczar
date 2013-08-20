function CloseCall() {
    closecall()
}

function equalHeight(e) {
    tallest = 0, e.each(function () {
        thisHeight = $(this).height(), thisHeight > tallest && (tallest = thisHeight)
    }), e.height(tallest)
}

function notifyUser(e) {
    e.search("ErrorMessage") || $.prompt(e)
}

function showFlash() {
    $("#outer_div").css({
        position: "absolute",
        top: "62px",
        left: "50%",
        width: "960px",
        height: "800px",
        "margin-left": "-480px"
    })
}

function updateFlash() {
    var e = swfobject.getObjectById("mySwf");
    e.startPaidSession()
}

function cancelPaidSession() {
    var e = swfobject.getObjectById("mySwf");
    e.cancelPaidSession()
}

function openPaymentDialog(e, t) {
    formatMessage(t, e), $(".dialog-window").show(), $("#dialog-overlay").show();
    var i = $('<div class="dialog-close"></div>');
    i.click(postponePayment), $(".dialog-window").append(i)
}

function postponePayment() {
    close_dialogs(), cancelPaidSession()
}

function formatMessage(e, t) {
    messageString = 1 == parseInt(e) ? "To start a paid session, you will need to have payment information on file" : "Attorney " + t + " is requesting a paid session. To confirm this, you will need to have payment info on file", $(".paid_model_header").html(messageString), isOverlayOpen = !0
}

function closecall() {
    $("#outer_div").css({
        left: "-2000px"
    })
}

function setPracticeAreas() {
    var e = practice_area_string = "",
        t = [],
        i = 0;
    $("#leveled-list_practice_areas input.parent-area[type=checkbox]:checked").each(function () {
        practice_area_string = $(this).data("name"), t = [], $(this).nextAll("div.sub").find("input[type=checkbox]:checked").each(function () {
            t.push($(this).data("name"))
        }), t.length > 0 && (practice_area_string += " (" + t.join(", ") + ")"), practice_area_string = "<li>" + practice_area_string + "</li>", e += practice_area_string, i++
    }), i ? ($("#practice_areas_opener").addClass("hidden"), $("#practice_areas_editor").removeClass("hidden"), $("#div_practice_areas .pa_list").html(e), $("#div_practice_areas").show().css("display", "inline")) : ($("#practice_areas_opener").removeClass("hidden"), $("#practice_areas_editor").addClass("hidden"), $("#div_practice_areas .pa_list").html("")), close_dialogs()
}

function close_dialogs() {
    $(".dialog-window").hide(), $("#dialog-overlay").hide()
}

function post_to_url(e, t, i) {
    i = i || "post";
    var n = $(document.createElement("form")).attr({
        method: i,
        action: e
    });
    $.each(t, function (e, t) {
        $.each(t instanceof Array ? t : [t], function (t, i) {
            $(document.createElement("input")).attr({
                type: "hidden",
                name: e,
                value: i
            }).appendTo(n)
        })
    }), n.appendTo(document.body).submit()
}

function stripeResponseHandler(e, t) {
    if (t.error) $("#stripe_errors").html(t.error.message), $(".submit-button").removeAttr("disabled");
    else {
        var i = $("#payment-form"),
            n = t.id;
        $("#stripe_card_token").val(n);
        var a = $("#form_type").val();
        "html" == a ? i.get(0).submit() : $.ajax({
            url: "/updatePaymentInfo",
            type: "post",
            data: i.serialize(),
            success: function () {}
        })
    }
}

function checkTBSystemRequirements() {
    TBD.runTests(function (e) {
        "Fail" == e.cat_software.flash_version["Flash Version"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_software.local_shared_object["Local Shared Object"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_software.user_agent["User Agent"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_software.operating_system["Operating System"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_hardware.camera_count.count.result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_hardware.microphone_count.Count.result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_network.uri_access["http://static.opentok.com"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_network.uri_access["http://hlg.tokbox.com"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_network.uri_access["http://api.opentok.com"].result ? window.checkTBSystemRequirementsResult = !1 : "Fail" == e.cat_network.port_access["1935"].result && (window.checkTBSystemRequirementsResult = !1)
    })
}

function connect() {
    $("#subscribers").show(), session.connect(apiKey, token), $("#connectLink").attr("disabled", !0), $(".end_session").show(), $(".start_session").hide()
}

function disconnect() {
    session.disconnect(), endConnection(), hide("disconnectLink"), hide("publishLink"), hide("unpublishLink"), $("#connectLink").attr("disabled", !1), $(".end_session").hide(), $(".start_session").show()
}

function startPublishing() {
    if (!publisher) {
        var e = document.getElementById("myCamera"),
            t = document.createElement("div");
        t.setAttribute("id", "opentok_publisher"), e.appendChild(t), publisher = TB.initPublisher(apiKey, t.id, {
            width: 220,
            height: 145
        }), session.publish(publisher), show("unpublishLink"), hide("publishLink")
    }
}

function stopPublishing() {
    publisher && session.unpublish(publisher), publisher = null, show("publishLink"), hide("unpublishLink")
}

function sessionConnectedHandler(e) {
    for (var t = 0; t < e.streams.length; t++) addStream(e.streams[t]);
    startPublishing(), show("disconnectLink"), show("publishLink"), hide("connectLink")
}

function streamCreatedHandler(e) {
    for (var t = 0; t < e.streams.length; t++) addStream(e.streams[t])
}

function streamDestroyedHandler() {
    endConnection()
}

function sessionDisconnectedHandler() {
    publisher = null, show("connectLink"), hide("disconnectLink"), hide("publishLink"), hide("unpublishLink")
}

function connectionDestroyedHandler() {
    endConnection()
}

function connectionCreatedHandler() {}

function exceptionHandler(e) {
    alert("Exception: " + e.code + "::" + e.message)
}

function addStream(e) {
    e.connection.connectionId != session.connection.connectionId && ($("#subscribers").append('<div id="' + e.streamId + '"></div>'), subscribers[e.streamId] = session.subscribe(e, e.streamId, {
        width: 640,
        height: 480
    }))
}

function show(e) {
    $("#" + e).show()
}

function hide(e) {
    $("#" + e).hide()
}

function endConnection() {
    is_lawyer ? window.location.href = "/lawyers/" + lawyer_id + "/conversations" : $.ajax({
        url: "/UpdateOnlineStatus",
        type: "post",
        cache: !1,
        data: "op=end_video_chat&lawyer_id=" + lawyer_id + "&conversation_id=" + g_conversation_id,
        success: function () {
            window.location.href = "/conversations/" + g_conversation_id + "/summary"
        },
        error: function () {
            window.location.href = "/conversations/" + g_conversation_id + "/summary"
        }
    })
}

function fn_invite_check() {
    return "undefined" == typeof fn_play_ring ? !0 : (fn_play_ring(), is_lawyer || ($("#opentok_resume").hide(), invite_checker = function () {
        $(".spinner").hide(), xhr && xhr.abort(), xhr = $.ajax({
            url: "/UpdateOnlineStatus",
            type: "post",
            cache: !1,
            data: "op=get_call_status&lawyer_id=" + lawyer_id,
            success: function (e) {
                switch (e) {
                case "accept":
                    $.ajax({
                        url: "/UpdateOnlineStatus",
                        type: "post",
                        cache: !1,
                        data: "op=call&lawyer_id=" + lawyer_id + "&call_mode=",
                        success: function () {}
                    }), fn_cancel_lawyer(), fn_open_video_window(), clearInterval(g_invite_interval);
                    break;
                case "decline":
                    fn_cancel_lawyer(), clearInterval(g_invite_interval), alert("Your invitation has been declined.")
                }
            },
            error: function () {}
        })
    }, window.g_invite_interval = setInterval(invite_checker, 7e3)), void 0)
}

function fn_cancel_lawyer() {
    fn_stop_ring(), $("#opentok_cancel").hide(), $.ajax({
        url: "/UpdateOnlineStatus",
        type: "post",
        cache: !1,
        data: "op=call&lawyer_id=" + lawyer_id + "&call_mode=",
        success: function (e) {
            "success" == e && $("#opentok_resume").show()
        }
    })
}

function fn_accept_invite() {
    fn_stop_ring(), $.ajax({
        url: "/UpdateOnlineStatus",
        type: "post",
        cache: !1,
        data: "op=call&lawyer_id=" + lawyer_id + "&call_mode=accept",
        success: function () {
            fn_open_video_window()
        }
    }), window.videoChatTimers.initialize(), $("#tokbox_player").show()
}

function fn_stop_ring() {
    $("#dewplayer_wrapper").html('<div id="dewplayer_content"></div>')
}

function fn_decline_invite() {
    $.ajax({
        url: "/UpdateOnlineStatus",
        type: "post",
        cache: !1,
        data: "op=call&lawyer_id=" + lawyer_id + "&call_mode=decline",
        success: function (e) {
            "success" == e && history.back()
        }
    })
}

function fn_open_video_window() {
    $("#opentok_ready").remove(), $("#lawer_incoming_call").remove(), $("#video_window").show(), $("#tokbox_player").show(), window.videoChatTimers.initialize(), connect()
}! function (e, t) {
    function i(e) {
        var t = ft[e] = {};
        return Z.each(e.split(tt), function (e, i) {
            t[i] = !0
        }), t
    }

    function n(e, i, n) {
        if (n === t && 1 === e.nodeType) {
            var a = "data-" + i.replace(_t, "-$1").toLowerCase();
            if (n = e.getAttribute(a), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : mt.test(n) ? Z.parseJSON(n) : n
                } catch (s) {}
                Z.data(e, i, n)
            } else n = t
        }
        return n
    }

    function a(e) {
        var t;
        for (t in e)
            if (("data" !== t || !Z.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function s() {
        return !1
    }

    function r() {
        return !0
    }

    function o(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }

    function l(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function c(e, t, i) {
        if (t = t || 0, Z.isFunction(t)) return Z.grep(e, function (e, n) {
            var a = !! t.call(e, n, e);
            return a === i
        });
        if (t.nodeType) return Z.grep(e, function (e) {
            return e === t === i
        });
        if ("string" == typeof t) {
            var n = Z.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (It.test(t)) return Z.filter(t, n, !i);
            t = Z.filter(t, n)
        }
        return Z.grep(e, function (e) {
            return Z.inArray(e, t) >= 0 === i
        })
    }

    function u(e) {
        var t = Ft.split("|"),
            i = e.createDocumentFragment();
        if (i.createElement)
            for (; t.length;) i.createElement(t.pop());
        return i
    }

    function h(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function d(e, t) {
        if (1 === t.nodeType && Z.hasData(e)) {
            var i, n, a, s = Z._data(e),
                r = Z._data(t, s),
                o = s.events;
            if (o) {
                delete r.handle, r.events = {};
                for (i in o)
                    for (n = 0, a = o[i].length; a > n; n++) Z.event.add(t, i, o[i][n])
            }
            r.data && (r.data = Z.extend({}, r.data))
        }
    }

    function p(e, t) {
        var i;
        1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), i = t.nodeName.toLowerCase(), "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), Z.support.html5Clone && e.innerHTML && !Z.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && Yt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.selected = e.defaultSelected : "input" === i || "textarea" === i ? t.defaultValue = e.defaultValue : "script" === i && t.text !== e.text && (t.text = e.text), t.removeAttribute(Z.expando))
    }

    function f(e) {
        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
    }

    function m(e) {
        Yt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function _(e, t) {
        if (t in e) return t;
        for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, a = gi.length; a--;)
            if (t = gi[a] + i, t in e) return t;
        return n
    }

    function g(e, t) {
        return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
    }

    function v(e, t) {
        for (var i, n, a = [], s = 0, r = e.length; r > s; s++) i = e[s], i.style && (a[s] = Z._data(i, "olddisplay"), t ? (a[s] || "none" !== i.style.display || (i.style.display = ""), "" === i.style.display && g(i) && (a[s] = Z._data(i, "olddisplay", x(i.nodeName)))) : (n = ii(i, "display"), a[s] || "none" === n || Z._data(i, "olddisplay", n)));
        for (s = 0; r > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[s] || "" : "none"));
        return e
    }

    function y(e, t, i) {
        var n = ui.exec(t);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
    }

    function b(e, t, i, n) {
        for (var a = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > a; a += 2) "margin" === i && (s += Z.css(e, i + _i[a], !0)), n ? ("content" === i && (s -= parseFloat(ii(e, "padding" + _i[a])) || 0), "margin" !== i && (s -= parseFloat(ii(e, "border" + _i[a] + "Width")) || 0)) : (s += parseFloat(ii(e, "padding" + _i[a])) || 0, "padding" !== i && (s += parseFloat(ii(e, "border" + _i[a] + "Width")) || 0));
        return s
    }

    function w(e, t, i) {
        var n = "width" === t ? e.offsetWidth : e.offsetHeight,
            a = !0,
            s = Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing");
        if (0 >= n || null == n) {
            if (n = ii(e, t), (0 > n || null == n) && (n = e.style[t]), hi.test(n)) return n;
            a = s && (Z.support.boxSizingReliable || n === e.style[t]), n = parseFloat(n) || 0
        }
        return n + b(e, t, i || (s ? "border" : "content"), a) + "px"
    }

    function x(e) {
        if (pi[e]) return pi[e];
        var t = Z("<" + e + ">").appendTo(q.body),
            i = t.css("display");
        return t.remove(), ("none" === i || "" === i) && (ni = q.body.appendChild(ni || Z.extend(q.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), ai && ni.createElement || (ai = (ni.contentWindow || ni.contentDocument).document, ai.write("<!doctype html><html><body>"), ai.close()), t = ai.body.appendChild(ai.createElement(e)), i = ii(t, "display"), q.body.removeChild(ni)), pi[e] = i, i
    }

    function k(e, t, i, n) {
        var a;
        if (Z.isArray(t)) Z.each(t, function (t, a) {
            i || bi.test(e) ? n(e, a) : k(e + "[" + ("object" == typeof a ? t : "") + "]", a, i, n)
        });
        else if (i || "object" !== Z.type(t)) n(e, t);
        else
            for (a in t) k(e + "[" + a + "]", t[a], i, n)
    }

    function $(e) {
        return function (t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, a, s, r = t.toLowerCase().split(tt),
                o = 0,
                l = r.length;
            if (Z.isFunction(i))
                for (; l > o; o++) n = r[o], s = /^\+/.test(n), s && (n = n.substr(1) || "*"), a = e[n] = e[n] || [], a[s ? "unshift" : "push"](i)
        }
    }

    function C(e, i, n, a, s, r) {
        s = s || i.dataTypes[0], r = r || {}, r[s] = !0;
        for (var o, l = e[s], c = 0, u = l ? l.length : 0, h = e === Ii; u > c && (h || !o); c++) o = l[c](i, n, a), "string" == typeof o && (!h || r[o] ? o = t : (i.dataTypes.unshift(o), o = C(e, i, n, a, o, r)));
        return !h && o || r["*"] || (o = C(e, i, n, a, "*", r)), o
    }

    function S(e, i) {
        var n, a, s = Z.ajaxSettings.flatOptions || {};
        for (n in i) i[n] !== t && ((s[n] ? e : a || (a = {}))[n] = i[n]);
        a && Z.extend(!0, e, a)
    }

    function T(e, i, n) {
        var a, s, r, o, l = e.contents,
            c = e.dataTypes,
            u = e.responseFields;
        for (s in u) s in n && (i[u[s]] = n[s]);
        for (;
            "*" === c[0];) c.shift(), a === t && (a = e.mimeType || i.getResponseHeader("content-type"));
        if (a)
            for (s in l)
                if (l[s] && l[s].test(a)) {
                    c.unshift(s);
                    break
                }
        if (c[0] in n) r = c[0];
        else {
            for (s in n) {
                if (!c[0] || e.converters[s + " " + c[0]]) {
                    r = s;
                    break
                }
                o || (o = s)
            }
            r = r || o
        }
        return r ? (r !== c[0] && c.unshift(r), n[r]) : void 0
    }

    function A(e, t) {
        var i, n, a, s, r = e.dataTypes.slice(),
            o = r[0],
            l = {}, c = 0;
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), r[1])
            for (i in e.converters) l[i.toLowerCase()] = e.converters[i];
        for (; a = r[++c];)
            if ("*" !== a) {
                if ("*" !== o && o !== a) {
                    if (i = l[o + " " + a] || l["* " + a], !i)
                        for (n in l)
                            if (s = n.split(" "), s[1] === a && (i = l[o + " " + s[0]] || l["* " + s[0]])) {
                                i === !0 ? i = l[n] : l[n] !== !0 && (a = s[0], r.splice(c--, 0, a));
                                break
                            }
                    if (i !== !0)
                        if (i && e["throws"]) t = i(t);
                        else try {
                            t = i(t)
                        } catch (u) {
                            return {
                                state: "parsererror",
                                error: i ? u : "No conversion from " + o + " to " + a
                            }
                        }
                }
                o = a
            }
        return {
            state: "success",
            data: t
        }
    }

    function z() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function E() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function P() {
        return setTimeout(function () {
            Ui = t
        }, 0), Ui = Z.now()
    }

    function j(e, t) {
        Z.each(t, function (t, i) {
            for (var n = (Ji[t] || []).concat(Ji["*"]), a = 0, s = n.length; s > a; a++)
                if (n[a].call(e, t, i)) return
        })
    }

    function N(e, t, i) {
        var n, a = 0,
            s = Zi.length,
            r = Z.Deferred().always(function () {
                delete o.elem
            }),
            o = function () {
                for (var t = Ui || P(), i = Math.max(0, l.startTime + l.duration - t), n = i / l.duration || 0, a = 1 - n, s = 0, o = l.tweens.length; o > s; s++) l.tweens[s].run(a);
                return r.notifyWith(e, [l, a, i]), 1 > a && o ? i : (r.resolveWith(e, [l]), !1)
            }, l = r.promise({
                elem: e,
                props: Z.extend({}, t),
                opts: Z.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: Ui || P(),
                duration: i.duration,
                tweens: [],
                createTween: function (t, i) {
                    var n = Z.Tween(e, l.opts, t, i, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function (t) {
                    for (var i = 0, n = t ? l.tweens.length : 0; n > i; i++) l.tweens[i].run(1);
                    return t ? r.resolveWith(e, [l, t]) : r.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (L(c, l.opts.specialEasing); s > a; a++)
            if (n = Zi[a].call(l, e, c, l.opts)) return n;
        return j(l, c), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(o, {
            anim: l,
            queue: l.opts.queue,
            elem: e
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function L(e, t) {
        var i, n, a, s, r;
        for (i in e)
            if (n = Z.camelCase(i), a = t[n], s = e[i], Z.isArray(s) && (a = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), r = Z.cssHooks[n], r && "expand" in r) {
                s = r.expand(s), delete e[n];
                for (i in s) i in e || (e[i] = s[i], t[i] = a)
            } else t[n] = a
    }

    function D(e, t, i) {
        var n, a, s, r, o, l, c, u, h, d = this,
            p = e.style,
            f = {}, m = [],
            _ = e.nodeType && g(e);
        i.queue || (u = Z._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, h = u.empty.fire, u.empty.fire = function () {
            u.unqueued || h()
        }), u.unqueued++, d.always(function () {
            d.always(function () {
                u.unqueued--, Z.queue(e, "fx").length || u.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === Z.css(e, "display") && "none" === Z.css(e, "float") && (Z.support.inlineBlockNeedsLayout && "inline" !== x(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", Z.support.shrinkWrapBlocks || d.done(function () {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
        }));
        for (n in t)
            if (s = t[n], Yi.exec(s)) {
                if (delete t[n], l = l || "toggle" === s, s === (_ ? "hide" : "show")) continue;
                m.push(n)
            }
        if (r = m.length) {
            o = Z._data(e, "fxshow") || Z._data(e, "fxshow", {}), "hidden" in o && (_ = o.hidden), l && (o.hidden = !_), _ ? Z(e).show() : d.done(function () {
                Z(e).hide()
            }), d.done(function () {
                var t;
                Z.removeData(e, "fxshow", !0);
                for (t in f) Z.style(e, t, f[t])
            });
            for (n = 0; r > n; n++) a = m[n], c = d.createTween(a, _ ? o[a] : 0), f[a] = o[a] || Z.style(e, a), a in o || (o[a] = c.start, _ && (c.end = c.start, c.start = "width" === a || "height" === a ? 1 : 0))
        }
    }

    function I(e, t, i, n, a) {
        return new I.prototype.init(e, t, i, n, a)
    }

    function M(e, t) {
        var i, n = {
                height: e
            }, a = 0;
        for (t = t ? 1 : 0; 4 > a; a += 2 - t) i = _i[a], n["margin" + i] = n["padding" + i] = e;
        return t && (n.opacity = n.width = e), n
    }

    function O(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var F, H, q = e.document,
        R = e.location,
        B = e.navigator,
        W = e.jQuery,
        Q = e.$,
        V = Array.prototype.push,
        U = Array.prototype.slice,
        X = Array.prototype.indexOf,
        Y = Object.prototype.toString,
        K = Object.prototype.hasOwnProperty,
        G = String.prototype.trim,
        Z = function (e, t) {
            return new Z.fn.init(e, t, F)
        }, J = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        et = /\S/,
        tt = /\s+/,
        it = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        nt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        st = /^[\],:{}\s]*$/,
        rt = /(?:^|:|,)(?:\s*\[)+/g,
        ot = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        ct = /^-ms-/,
        ut = /-([\da-z])/gi,
        ht = function (e, t) {
            return (t + "").toUpperCase()
        }, dt = function () {
            q.addEventListener ? (q.removeEventListener("DOMContentLoaded", dt, !1), Z.ready()) : "complete" === q.readyState && (q.detachEvent("onreadystatechange", dt), Z.ready())
        }, pt = {};
    Z.fn = Z.prototype = {
        constructor: Z,
        init: function (e, i, n) {
            var a, s, r;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if ("string" == typeof e) {
                if (a = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : nt.exec(e), !a || !a[1] && i) return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e);
                if (a[1]) return i = i instanceof Z ? i[0] : i, r = i && i.nodeType ? i.ownerDocument || i : q, e = Z.parseHTML(a[1], r, !0), at.test(a[1]) && Z.isPlainObject(i) && this.attr.call(e, i, !0), Z.merge(this, e);
                if (s = q.getElementById(a[2]), s && s.parentNode) {
                    if (s.id !== a[2]) return n.find(e);
                    this.length = 1, this[0] = s
                }
                return this.context = q, this.selector = e, this
            }
            return Z.isFunction(e) ? n.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return U.call(this)
        },
        get: function (e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function (e, t, i) {
            var n = Z.merge(this.constructor(), e);
            return n.prevObject = this, n.context = this.context, "find" === t ? n.selector = this.selector + (this.selector ? " " : "") + i : t && (n.selector = this.selector + "." + t + "(" + i + ")"), n
        },
        each: function (e, t) {
            return Z.each(this, e, t)
        },
        ready: function (e) {
            return Z.ready.promise().done(e), this
        },
        eq: function (e) {
            return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        slice: function () {
            return this.pushStack(U.apply(this, arguments), "slice", U.call(arguments).join(","))
        },
        map: function (e) {
            return this.pushStack(Z.map(this, function (t, i) {
                return e.call(t, i, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: V,
        sort: [].sort,
        splice: [].splice
    }, Z.fn.init.prototype = Z.fn, Z.extend = Z.fn.extend = function () {
        var e, i, n, a, s, r, o = arguments[0] || {}, l = 1,
            c = arguments.length,
            u = !1;
        for ("boolean" == typeof o && (u = o, o = arguments[1] || {}, l = 2), "object" == typeof o || Z.isFunction(o) || (o = {}), c === l && (o = this, --l); c > l; l++)
            if (null != (e = arguments[l]))
                for (i in e) n = o[i], a = e[i], o !== a && (u && a && (Z.isPlainObject(a) || (s = Z.isArray(a))) ? (s ? (s = !1, r = n && Z.isArray(n) ? n : []) : r = n && Z.isPlainObject(n) ? n : {}, o[i] = Z.extend(u, r, a)) : a !== t && (o[i] = a));
        return o
    }, Z.extend({
        noConflict: function (t) {
            return e.$ === Z && (e.$ = Q), t && e.jQuery === Z && (e.jQuery = W), Z
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? Z.readyWait++ : Z.ready(!0)
        },
        ready: function (e) {
            if (e === !0 ? !--Z.readyWait : !Z.isReady) {
                if (!q.body) return setTimeout(Z.ready, 1);
                Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (H.resolveWith(q, [Z]), Z.fn.trigger && Z(q).trigger("ready").off("ready"))
            }
        },
        isFunction: function (e) {
            return "function" === Z.type(e)
        },
        isArray: Array.isArray || function (e) {
            return "array" === Z.type(e)
        },
        isWindow: function (e) {
            return null != e && e == e.window
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function (e) {
            return null == e ? String(e) : pt[Y.call(e)] || "object"
        },
        isPlainObject: function (e) {
            if (!e || "object" !== Z.type(e) || e.nodeType || Z.isWindow(e)) return !1;
            try {
                if (e.constructor && !K.call(e, "constructor") && !K.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            var n;
            for (n in e);
            return n === t || K.call(e, n)
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function (e) {
            throw new Error(e)
        },
        parseHTML: function (e, t, i) {
            var n;
            return e && "string" == typeof e ? ("boolean" == typeof t && (i = t, t = 0), t = t || q, (n = at.exec(e)) ? [t.createElement(n[1])] : (n = Z.buildFragment([e], t, i ? null : []), Z.merge([], (n.cacheable ? Z.clone(n.fragment) : n.fragment).childNodes))) : null
        },
        parseJSON: function (t) {
            return t && "string" == typeof t ? (t = Z.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : st.test(t.replace(ot, "@").replace(lt, "]").replace(rt, "")) ? new Function("return " + t)() : (Z.error("Invalid JSON: " + t), void 0)) : null
        },
        parseXML: function (i) {
            var n, a;
            if (!i || "string" != typeof i) return null;
            try {
                e.DOMParser ? (a = new DOMParser, n = a.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
            } catch (s) {
                n = t
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || Z.error("Invalid XML: " + i), n
        },
        noop: function () {},
        globalEval: function (t) {
            t && et.test(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function (e) {
            return e.replace(ct, "ms-").replace(ut, ht)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, i, n) {
            var a, s = 0,
                r = e.length,
                o = r === t || Z.isFunction(e);
            if (n)
                if (o) {
                    for (a in e)
                        if (i.apply(e[a], n) === !1) break
                } else
                    for (; r > s && i.apply(e[s++], n) !== !1;);
                else if (o) {
                for (a in e)
                    if (i.call(e[a], a, e[a]) === !1) break
            } else
                for (; r > s && i.call(e[s], s, e[s++]) !== !1;);
            return e
        },
        trim: G && !G.call("﻿ ") ? function (e) {
            return null == e ? "" : G.call(e)
        } : function (e) {
            return null == e ? "" : (e + "").replace(it, "")
        },
        makeArray: function (e, t) {
            var i, n = t || [];
            return null != e && (i = Z.type(e), null == e.length || "string" === i || "function" === i || "regexp" === i || Z.isWindow(e) ? V.call(n, e) : Z.merge(n, e)), n
        },
        inArray: function (e, t, i) {
            var n;
            if (t) {
                if (X) return X.call(t, e, i);
                for (n = t.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in t && t[i] === e) return i
            }
            return -1
        },
        merge: function (e, i) {
            var n = i.length,
                a = e.length,
                s = 0;
            if ("number" == typeof n)
                for (; n > s; s++) e[a++] = i[s];
            else
                for (; i[s] !== t;) e[a++] = i[s++];
            return e.length = a, e
        },
        grep: function (e, t, i) {
            var n, a = [],
                s = 0,
                r = e.length;
            for (i = !! i; r > s; s++) n = !! t(e[s], s), i !== n && a.push(e[s]);
            return a
        },
        map: function (e, i, n) {
            var a, s, r = [],
                o = 0,
                l = e.length,
                c = e instanceof Z || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Z.isArray(e));
            if (c)
                for (; l > o; o++) a = i(e[o], o, n), null != a && (r[r.length] = a);
            else
                for (s in e) a = i(e[s], s, n), null != a && (r[r.length] = a);
            return r.concat.apply([], r)
        },
        guid: 1,
        proxy: function (e, i) {
            var n, a, s;
            return "string" == typeof i && (n = e[i], i = e, e = n), Z.isFunction(e) ? (a = U.call(arguments, 2), s = function () {
                return e.apply(i, a.concat(U.call(arguments)))
            }, s.guid = e.guid = e.guid || Z.guid++, s) : t
        },
        access: function (e, i, n, a, s, r, o) {
            var l, c = null == n,
                u = 0,
                h = e.length;
            if (n && "object" == typeof n) {
                for (u in n) Z.access(e, i, u, n[u], 1, r, a);
                s = 1
            } else if (a !== t) {
                if (l = o === t && Z.isFunction(a), c && (l ? (l = i, i = function (e, t, i) {
                    return l.call(Z(e), i)
                }) : (i.call(e, a), i = null)), i)
                    for (; h > u; u++) i(e[u], n, l ? a.call(e[u], u, i(e[u], n)) : a, o);
                s = 1
            }
            return s ? e : c ? i.call(e) : h ? i(e[0], n) : r
        },
        now: function () {
            return (new Date).getTime()
        }
    }), Z.ready.promise = function (t) {
        if (!H)
            if (H = Z.Deferred(), "complete" === q.readyState) setTimeout(Z.ready, 1);
            else if (q.addEventListener) q.addEventListener("DOMContentLoaded", dt, !1), e.addEventListener("load", Z.ready, !1);
        else {
            q.attachEvent("onreadystatechange", dt), e.attachEvent("onload", Z.ready);
            var i = !1;
            try {
                i = null == e.frameElement && q.documentElement
            } catch (n) {}
            i && i.doScroll && function a() {
                if (!Z.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (e) {
                        return setTimeout(a, 50)
                    }
                    Z.ready()
                }
            }()
        }
        return H.promise(t)
    }, Z.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
        pt["[object " + t + "]"] = t.toLowerCase()
    }), F = Z(q);
    var ft = {};
    Z.Callbacks = function (e) {
        e = "string" == typeof e ? ft[e] || i(e) : Z.extend({}, e);
        var n, a, s, r, o, l, c = [],
            u = !e.once && [],
            h = function (t) {
                for (n = e.memory && t, a = !0, l = r || 0, r = 0, o = c.length, s = !0; c && o > l; l++)
                    if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                s = !1, c && (u ? u.length && h(u.shift()) : n ? c = [] : d.disable())
            }, d = {
                add: function () {
                    if (c) {
                        var t = c.length;
                        ! function i(t) {
                            Z.each(t, function (t, n) {
                                var a = Z.type(n);
                                "function" === a ? e.unique && d.has(n) || c.push(n) : n && n.length && "string" !== a && i(n)
                            })
                        }(arguments), s ? o = c.length : n && (r = t, h(n))
                    }
                    return this
                },
                remove: function () {
                    return c && Z.each(arguments, function (e, t) {
                        for (var i;
                            (i = Z.inArray(t, c, i)) > -1;) c.splice(i, 1), s && (o >= i && o--, l >= i && l--)
                    }), this
                },
                has: function (e) {
                    return Z.inArray(e, c) > -1
                },
                empty: function () {
                    return c = [], this
                },
                disable: function () {
                    return c = u = n = t, this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    return u = t, n || d.disable(), this
                },
                locked: function () {
                    return !u
                },
                fireWith: function (e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], !c || a && !u || (s ? u.push(t) : h(t)), this
                },
                fire: function () {
                    return d.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!a
                }
            };
        return d
    }, Z.extend({
        Deferred: function (e) {
            var t = [
                ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                ["notify", "progress", Z.Callbacks("memory")]
            ],
                i = "pending",
                n = {
                    state: function () {
                        return i
                    },
                    always: function () {
                        return a.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var e = arguments;
                        return Z.Deferred(function (i) {
                            Z.each(t, function (t, n) {
                                var s = n[0],
                                    r = e[t];
                                a[n[1]](Z.isFunction(r) ? function () {
                                    var e = r.apply(this, arguments);
                                    e && Z.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s + "With"](this === a ? i : this, [e])
                                } : i[s])
                            }), e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? Z.extend(e, n) : n
                    }
                }, a = {};
            return n.pipe = n.then, Z.each(t, function (e, s) {
                var r = s[2],
                    o = s[3];
                n[s[1]] = r.add, o && r.add(function () {
                    i = o
                }, t[1 ^ e][2].disable, t[2][2].lock), a[s[0]] = r.fire, a[s[0] + "With"] = r.fireWith
            }), n.promise(a), e && e.call(a, a), a
        },
        when: function (e) {
            var t, i, n, a = 0,
                s = U.call(arguments),
                r = s.length,
                o = 1 !== r || e && Z.isFunction(e.promise) ? r : 0,
                l = 1 === o ? e : Z.Deferred(),
                c = function (e, i, n) {
                    return function (a) {
                        i[e] = this, n[e] = arguments.length > 1 ? U.call(arguments) : a, n === t ? l.notifyWith(i, n) : --o || l.resolveWith(i, n)
                    }
                };
            if (r > 1)
                for (t = new Array(r), i = new Array(r), n = new Array(r); r > a; a++) s[a] && Z.isFunction(s[a].promise) ? s[a].promise().done(c(a, n, s)).fail(l.reject).progress(c(a, i, t)) : --o;
            return o || l.resolveWith(n, s), l.promise()
        }
    }), Z.support = function () {
        var t, i, n, a, s, r, o, l, c, u, h, d = q.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = d.getElementsByTagName("*"), n = d.getElementsByTagName("a")[0], !i || !n || !i.length) return {};
        a = q.createElement("select"), s = a.appendChild(q.createElement("option")), r = d.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", t = {
            leadingWhitespace: 3 === d.firstChild.nodeType,
            tbody: !d.getElementsByTagName("tbody").length,
            htmlSerialize: !! d.getElementsByTagName("link").length,
            style: /top/.test(n.getAttribute("style")),
            hrefNormalized: "/a" === n.getAttribute("href"),
            opacity: /^0.5/.test(n.style.opacity),
            cssFloat: !! n.style.cssFloat,
            checkOn: "on" === r.value,
            optSelected: s.selected,
            getSetAttribute: "t" !== d.className,
            enctype: !! q.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== q.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === q.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, a.disabled = !0, t.optDisabled = !s.disabled;
        try {
            delete d.test
        } catch (p) {
            t.deleteExpando = !1
        }
        if (!d.addEventListener && d.attachEvent && d.fireEvent && (d.attachEvent("onclick", h = function () {
            t.noCloneEvent = !1
        }), d.cloneNode(!0).fireEvent("onclick"), d.detachEvent("onclick", h)), r = q.createElement("input"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "checked"), r.setAttribute("name", "t"), d.appendChild(r), o = q.createDocumentFragment(), o.appendChild(d.lastChild), t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = r.checked, o.removeChild(r), o.appendChild(d), d.attachEvent)
            for (c in {
                submit: !0,
                change: !0,
                focusin: !0
            }) l = "on" + c, u = l in d, u || (d.setAttribute(l, "return;"), u = "function" == typeof d[l]), t[c + "Bubbles"] = u;
        return Z(function () {
            var i, n, a, s, r = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                o = q.getElementsByTagName("body")[0];
            o && (i = q.createElement("div"), i.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", o.insertBefore(i, o.firstChild), n = q.createElement("div"), i.appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = n.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = u && 0 === a[0].offsetHeight, n.innerHTML = "", n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === n.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== o.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(n, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(n, null) || {
                width: "4px"
            }).width, s = q.createElement("div"), s.style.cssText = n.style.cssText = r, s.style.marginRight = s.style.width = "0", n.style.width = "1px", n.appendChild(s), t.reliableMarginRight = !parseFloat((e.getComputedStyle(s, null) || {}).marginRight)), "undefined" != typeof n.style.zoom && (n.innerHTML = "", n.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === n.offsetWidth, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== n.offsetWidth, i.style.zoom = 1), o.removeChild(i), i = n = a = s = null)
        }), o.removeChild(d), i = n = a = s = r = o = d = null, t
    }();
    var mt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        _t = /([A-Z])/g;
    Z.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (Z.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return e = e.nodeType ? Z.cache[e[Z.expando]] : e[Z.expando], !! e && !a(e)
        },
        data: function (e, i, n, a) {
            if (Z.acceptData(e)) {
                var s, r, o = Z.expando,
                    l = "string" == typeof i,
                    c = e.nodeType,
                    u = c ? Z.cache : e,
                    h = c ? e[o] : e[o] && o;
                if (h && u[h] && (a || u[h].data) || !l || n !== t) return h || (c ? e[o] = h = Z.deletedIds.pop() || Z.guid++ : h = o), u[h] || (u[h] = {}, c || (u[h].toJSON = Z.noop)), ("object" == typeof i || "function" == typeof i) && (a ? u[h] = Z.extend(u[h], i) : u[h].data = Z.extend(u[h].data, i)), s = u[h], a || (s.data || (s.data = {}), s = s.data), n !== t && (s[Z.camelCase(i)] = n), l ? (r = s[i], null == r && (r = s[Z.camelCase(i)])) : r = s, r
            }
        },
        removeData: function (e, t, i) {
            if (Z.acceptData(e)) {
                var n, s, r, o = e.nodeType,
                    l = o ? Z.cache : e,
                    c = o ? e[Z.expando] : Z.expando;
                if (l[c]) {
                    if (t && (n = i ? l[c] : l[c].data)) {
                        Z.isArray(t) || (t in n ? t = [t] : (t = Z.camelCase(t), t = t in n ? [t] : t.split(" ")));
                        for (s = 0, r = t.length; r > s; s++) delete n[t[s]];
                        if (!(i ? a : Z.isEmptyObject)(n)) return
                    }(i || (delete l[c].data, a(l[c]))) && (o ? Z.cleanData([e], !0) : Z.support.deleteExpando || l != l.window ? delete l[c] : l[c] = null)
                }
            }
        },
        _data: function (e, t, i) {
            return Z.data(e, t, i, !0)
        },
        acceptData: function (e) {
            var t = e.nodeName && Z.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), Z.fn.extend({
        data: function (e, i) {
            var a, s, r, o, l, c = this[0],
                u = 0,
                h = null;
            if (e === t) {
                if (this.length && (h = Z.data(c), 1 === c.nodeType && !Z._data(c, "parsedAttrs"))) {
                    for (r = c.attributes, l = r.length; l > u; u++) o = r[u].name, o.indexOf("data-") || (o = Z.camelCase(o.substring(5)), n(c, o, h[o]));
                    Z._data(c, "parsedAttrs", !0)
                }
                return h
            }
            return "object" == typeof e ? this.each(function () {
                Z.data(this, e)
            }) : (a = e.split(".", 2), a[1] = a[1] ? "." + a[1] : "", s = a[1] + "!", Z.access(this, function (i) {
                return i === t ? (h = this.triggerHandler("getData" + s, [a[0]]), h === t && c && (h = Z.data(c, e), h = n(c, e, h)), h === t && a[1] ? this.data(a[0]) : h) : (a[1] = i, this.each(function () {
                    var t = Z(this);
                    t.triggerHandler("setData" + s, a), Z.data(this, e, i), t.triggerHandler("changeData" + s, a)
                }), void 0)
            }, null, i, arguments.length > 1, null, !1))
        },
        removeData: function (e) {
            return this.each(function () {
                Z.removeData(this, e)
            })
        }
    }), Z.extend({
        queue: function (e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = Z._data(e, t), i && (!n || Z.isArray(i) ? n = Z._data(e, t, Z.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var i = Z.queue(e, t),
                n = i.length,
                a = i.shift(),
                s = Z._queueHooks(e, t),
                r = function () {
                    Z.dequeue(e, t)
                };
            "inprogress" === a && (a = i.shift(), n--), a && ("fx" === t && i.unshift("inprogress"), delete s.stop, a.call(e, r, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function (e, t) {
            var i = t + "queueHooks";
            return Z._data(e, i) || Z._data(e, i, {
                empty: Z.Callbacks("once memory").add(function () {
                    Z.removeData(e, t + "queue", !0), Z.removeData(e, i, !0)
                })
            })
        }
    }), Z.fn.extend({
        queue: function (e, i) {
            var n = 2;
            return "string" != typeof e && (i = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : i === t ? this : this.each(function () {
                var t = Z.queue(this, e, i);
                Z._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && Z.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                Z.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, i) {
                var n = setTimeout(t, e);
                i.stop = function () {
                    clearTimeout(n)
                }
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, i) {
            var n, a = 1,
                s = Z.Deferred(),
                r = this,
                o = this.length,
                l = function () {
                    --a || s.resolveWith(r, [r])
                };
            for ("string" != typeof e && (i = e, e = t), e = e || "fx"; o--;) n = Z._data(r[o], e + "queueHooks"), n && n.empty && (a++, n.empty.add(l));
            return l(), s.promise(i)
        }
    });
    var gt, vt, yt, bt = /[\t\r\n]/g,
        wt = /\r/g,
        xt = /^(?:button|input)$/i,
        kt = /^(?:button|input|object|select|textarea)$/i,
        $t = /^a(?:rea|)$/i,
        Ct = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        St = Z.support.getSetAttribute;
    Z.fn.extend({
        attr: function (e, t) {
            return Z.access(this, Z.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                Z.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return Z.access(this, Z.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = Z.propFix[e] || e, this.each(function () {
                try {
                    this[e] = t, delete this[e]
                } catch (i) {}
            })
        },
        addClass: function (e) {
            var t, i, n, a, s, r, o;
            if (Z.isFunction(e)) return this.each(function (t) {
                Z(this).addClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e)
                for (t = e.split(tt), i = 0, n = this.length; n > i; i++)
                    if (a = this[i], 1 === a.nodeType)
                        if (a.className || 1 !== t.length) {
                            for (s = " " + a.className + " ", r = 0, o = t.length; o > r; r++) s.indexOf(" " + t[r] + " ") < 0 && (s += t[r] + " ");
                            a.className = Z.trim(s)
                        } else a.className = e;
            return this
        },
        removeClass: function (e) {
            var i, n, a, s, r, o, l;
            if (Z.isFunction(e)) return this.each(function (t) {
                Z(this).removeClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e || e === t)
                for (i = (e || "").split(tt), o = 0, l = this.length; l > o; o++)
                    if (a = this[o], 1 === a.nodeType && a.className) {
                        for (n = (" " + a.className + " ").replace(bt, " "), s = 0, r = i.length; r > s; s++)
                            for (; n.indexOf(" " + i[s] + " ") >= 0;) n = n.replace(" " + i[s] + " ", " ");
                        a.className = e ? Z.trim(n) : ""
                    }
            return this
        },
        toggleClass: function (e, t) {
            var i = typeof e,
                n = "boolean" == typeof t;
            return Z.isFunction(e) ? this.each(function (i) {
                Z(this).toggleClass(e.call(this, i, this.className, t), t)
            }) : this.each(function () {
                if ("string" === i)
                    for (var a, s = 0, r = Z(this), o = t, l = e.split(tt); a = l[s++];) o = n ? o : !r.hasClass(a), r[o ? "addClass" : "removeClass"](a);
                else("undefined" === i || "boolean" === i) && (this.className && Z._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : Z._data(this, "__className__") || "")
            })
        },
        hasClass: function (e) {
            for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(bt, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function (e) {
            var i, n, a, s = this[0]; {
                if (arguments.length) return a = Z.isFunction(e), this.each(function (n) {
                    var s, r = Z(this);
                    1 === this.nodeType && (s = a ? e.call(this, n, r.val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : Z.isArray(s) && (s = Z.map(s, function (e) {
                        return null == e ? "" : e + ""
                    })), i = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, s, "value") !== t || (this.value = s))
                });
                if (s) return i = Z.valHooks[s.type] || Z.valHooks[s.nodeName.toLowerCase()], i && "get" in i && (n = i.get(s, "value")) !== t ? n : (n = s.value, "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)
            }
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    for (var t, i, n = e.options, a = e.selectedIndex, s = "select-one" === e.type || 0 > a, r = s ? null : [], o = s ? a + 1 : n.length, l = 0 > a ? o : s ? a : 0; o > l; l++)
                        if (i = n[l], !(!i.selected && l !== a || (Z.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && Z.nodeName(i.parentNode, "optgroup"))) {
                            if (t = Z(i).val(), s) return t;
                            r.push(t)
                        }
                    return r
                },
                set: function (e, t) {
                    var i = Z.makeArray(t);
                    return Z(e).find("option").each(function () {
                        this.selected = Z.inArray(Z(this).val(), i) >= 0
                    }), i.length || (e.selectedIndex = -1), i
                }
            }
        },
        attrFn: {},
        attr: function (e, i, n, a) {
            var s, r, o, l = e.nodeType;
            if (e && 3 !== l && 8 !== l && 2 !== l) return a && Z.isFunction(Z.fn[i]) ? Z(e)[i](n) : "undefined" == typeof e.getAttribute ? Z.prop(e, i, n) : (o = 1 !== l || !Z.isXMLDoc(e), o && (i = i.toLowerCase(), r = Z.attrHooks[i] || (Ct.test(i) ? vt : gt)), n !== t ? null === n ? (Z.removeAttr(e, i), void 0) : r && "set" in r && o && (s = r.set(e, n, i)) !== t ? s : (e.setAttribute(i, n + ""), n) : r && "get" in r && o && null !== (s = r.get(e, i)) ? s : (s = e.getAttribute(i), null === s ? t : s))
        },
        removeAttr: function (e, t) {
            var i, n, a, s, r = 0;
            if (t && 1 === e.nodeType)
                for (n = t.split(tt); r < n.length; r++) a = n[r], a && (i = Z.propFix[a] || a, s = Ct.test(a), s || Z.attr(e, a, ""), e.removeAttribute(St ? a : i), s && i in e && (e[i] = !1))
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (xt.test(e.nodeName) && e.parentNode) Z.error("type property can't be changed");
                    else if (!Z.support.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            },
            value: {
                get: function (e, t) {
                    return gt && Z.nodeName(e, "button") ? gt.get(e, t) : t in e ? e.value : null
                },
                set: function (e, t, i) {
                    return gt && Z.nodeName(e, "button") ? gt.set(e, t, i) : (e.value = t, void 0)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, i, n) {
            var a, s, r, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return r = 1 !== o || !Z.isXMLDoc(e), r && (i = Z.propFix[i] || i, s = Z.propHooks[i]), n !== t ? s && "set" in s && (a = s.set(e, n, i)) !== t ? a : e[i] = n : s && "get" in s && null !== (a = s.get(e, i)) ? a : e[i]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var i = e.getAttributeNode("tabindex");
                    return i && i.specified ? parseInt(i.value, 10) : kt.test(e.nodeName) || $t.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), vt = {
        get: function (e, i) {
            var n, a = Z.prop(e, i);
            return a === !0 || "boolean" != typeof a && (n = e.getAttributeNode(i)) && n.nodeValue !== !1 ? i.toLowerCase() : t
        },
        set: function (e, t, i) {
            var n;
            return t === !1 ? Z.removeAttr(e, i) : (n = Z.propFix[i] || i, n in e && (e[n] = !0), e.setAttribute(i, i.toLowerCase())), i
        }
    }, St || (yt = {
        name: !0,
        id: !0,
        coords: !0
    }, gt = Z.valHooks.button = {
        get: function (e, i) {
            var n;
            return n = e.getAttributeNode(i), n && (yt[i] ? "" !== n.value : n.specified) ? n.value : t
        },
        set: function (e, t, i) {
            var n = e.getAttributeNode(i);
            return n || (n = q.createAttribute(i), e.setAttributeNode(n)), n.value = t + ""
        }
    }, Z.each(["width", "height"], function (e, t) {
        Z.attrHooks[t] = Z.extend(Z.attrHooks[t], {
            set: function (e, i) {
                return "" === i ? (e.setAttribute(t, "auto"), i) : void 0
            }
        })
    }), Z.attrHooks.contenteditable = {
        get: gt.get,
        set: function (e, t, i) {
            "" === t && (t = "false"), gt.set(e, t, i)
        }
    }), Z.support.hrefNormalized || Z.each(["href", "src", "width", "height"], function (e, i) {
        Z.attrHooks[i] = Z.extend(Z.attrHooks[i], {
            get: function (e) {
                var n = e.getAttribute(i, 2);
                return null === n ? t : n
            }
        })
    }), Z.support.style || (Z.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function (e, t) {
            return e.style.cssText = t + ""
        }
    }), Z.support.optSelected || (Z.propHooks.selected = Z.extend(Z.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), Z.support.enctype || (Z.propFix.enctype = "encoding"), Z.support.checkOn || Z.each(["radio", "checkbox"], function () {
        Z.valHooks[this] = {
            get: function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), Z.each(["radio", "checkbox"], function () {
        Z.valHooks[this] = Z.extend(Z.valHooks[this], {
            set: function (e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
            }
        })
    });
    var Tt = /^(?:textarea|input|select)$/i,
        At = /^([^\.]*|)(?:\.(.+)|)$/,
        zt = /(?:^|\s)hover(\.\S+|)\b/,
        Et = /^key/,
        Pt = /^(?:mouse|contextmenu)|click/,
        jt = /^(?:focusinfocus|focusoutblur)$/,
        Nt = function (e) {
            return Z.event.special.hover ? e : e.replace(zt, "mouseenter$1 mouseleave$1")
        };
    Z.event = {
        add: function (e, i, n, a, s) {
            var r, o, l, c, u, h, d, p, f, m, _;
            if (3 !== e.nodeType && 8 !== e.nodeType && i && n && (r = Z._data(e))) {
                for (n.handler && (f = n, n = f.handler, s = f.selector), n.guid || (n.guid = Z.guid++), l = r.events, l || (r.events = l = {}), o = r.handle, o || (r.handle = o = function (e) {
                    return "undefined" == typeof Z || e && Z.event.triggered === e.type ? t : Z.event.dispatch.apply(o.elem, arguments)
                }, o.elem = e), i = Z.trim(Nt(i)).split(" "), c = 0; c < i.length; c++) u = At.exec(i[c]) || [], h = u[1], d = (u[2] || "").split(".").sort(), _ = Z.event.special[h] || {}, h = (s ? _.delegateType : _.bindType) || h, _ = Z.event.special[h] || {}, p = Z.extend({
                    type: h,
                    origType: u[1],
                    data: a,
                    handler: n,
                    guid: n.guid,
                    selector: s,
                    needsContext: s && Z.expr.match.needsContext.test(s),
                    namespace: d.join(".")
                }, f), m = l[h], m || (m = l[h] = [], m.delegateCount = 0, _.setup && _.setup.call(e, a, d, o) !== !1 || (e.addEventListener ? e.addEventListener(h, o, !1) : e.attachEvent && e.attachEvent("on" + h, o))), _.add && (_.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), Z.event.global[h] = !0;
                e = null
            }
        },
        global: {},
        remove: function (e, t, i, n, a) {
            var s, r, o, l, c, u, h, d, p, f, m, _ = Z.hasData(e) && Z._data(e);
            if (_ && (d = _.events)) {
                for (t = Z.trim(Nt(t || "")).split(" "), s = 0; s < t.length; s++)
                    if (r = At.exec(t[s]) || [], o = l = r[1], c = r[2], o) {
                        for (p = Z.event.special[o] || {}, o = (n ? p.delegateType : p.bindType) || o, f = d[o] || [], u = f.length, c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = 0; h < f.length; h++) m = f[h], !a && l !== m.origType || i && i.guid !== m.guid || c && !c.test(m.namespace) || n && n !== m.selector && ("**" !== n || !m.selector) || (f.splice(h--, 1), m.selector && f.delegateCount--, p.remove && p.remove.call(e, m));
                        0 === f.length && u !== f.length && (p.teardown && p.teardown.call(e, c, _.handle) !== !1 || Z.removeEvent(e, o, _.handle), delete d[o])
                    } else
                        for (o in d) Z.event.remove(e, o + t[s], i, n, !0);
                Z.isEmptyObject(d) && (delete _.handle, Z.removeData(e, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (i, n, a, s) {
            if (!a || 3 !== a.nodeType && 8 !== a.nodeType) {
                var r, o, l, c, u, h, d, p, f, m, _ = i.type || i,
                    g = [];
                if (!jt.test(_ + Z.event.triggered) && (_.indexOf("!") >= 0 && (_ = _.slice(0, -1), o = !0), _.indexOf(".") >= 0 && (g = _.split("."), _ = g.shift(), g.sort()), a && !Z.event.customEvent[_] || Z.event.global[_]))
                    if (i = "object" == typeof i ? i[Z.expando] ? i : new Z.Event(_, i) : new Z.Event(_), i.type = _, i.isTrigger = !0, i.exclusive = o, i.namespace = g.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = _.indexOf(":") < 0 ? "on" + _ : "", a) {
                        if (i.result = t, i.target || (i.target = a), n = null != n ? Z.makeArray(n) : [], n.unshift(i), d = Z.event.special[_] || {}, !d.trigger || d.trigger.apply(a, n) !== !1) {
                            if (f = [
                                [a, d.bindType || _]
                            ], !s && !d.noBubble && !Z.isWindow(a)) {
                                for (m = d.delegateType || _, c = jt.test(m + _) ? a : a.parentNode, u = a; c; c = c.parentNode) f.push([c, m]), u = c;
                                u === (a.ownerDocument || q) && f.push([u.defaultView || u.parentWindow || e, m])
                            }
                            for (l = 0; l < f.length && !i.isPropagationStopped(); l++) c = f[l][0], i.type = f[l][1], p = (Z._data(c, "events") || {})[i.type] && Z._data(c, "handle"), p && p.apply(c, n), p = h && c[h], p && Z.acceptData(c) && p.apply && p.apply(c, n) === !1 && i.preventDefault();
                            return i.type = _, s || i.isDefaultPrevented() || d._default && d._default.apply(a.ownerDocument, n) !== !1 || "click" === _ && Z.nodeName(a, "a") || !Z.acceptData(a) || h && a[_] && ("focus" !== _ && "blur" !== _ || 0 !== i.target.offsetWidth) && !Z.isWindow(a) && (u = a[h], u && (a[h] = null), Z.event.triggered = _, a[_](), Z.event.triggered = t, u && (a[h] = u)), i.result
                        }
                    } else {
                        r = Z.cache;
                        for (l in r) r[l].events && r[l].events[_] && Z.event.trigger(i, n, r[l].handle.elem, !0)
                    }
            }
        },
        dispatch: function (i) {
            i = Z.event.fix(i || e.event);
            var n, a, s, r, o, l, c, u, h, d = (Z._data(this, "events") || {})[i.type] || [],
                p = d.delegateCount,
                f = U.call(arguments),
                m = !i.exclusive && !i.namespace,
                _ = Z.event.special[i.type] || {}, g = [];
            if (f[0] = i, i.delegateTarget = this, !_.preDispatch || _.preDispatch.call(this, i) !== !1) {
                if (p && (!i.button || "click" !== i.type))
                    for (s = i.target; s != this; s = s.parentNode || this)
                        if (s.disabled !== !0 || "click" !== i.type) {
                            for (o = {}, c = [], n = 0; p > n; n++) u = d[n], h = u.selector, o[h] === t && (o[h] = u.needsContext ? Z(h, this).index(s) >= 0 : Z.find(h, this, null, [s]).length), o[h] && c.push(u);
                            c.length && g.push({
                                elem: s,
                                matches: c
                            })
                        }
                for (d.length > p && g.push({
                    elem: this,
                    matches: d.slice(p)
                }), n = 0; n < g.length && !i.isPropagationStopped(); n++)
                    for (l = g[n], i.currentTarget = l.elem, a = 0; a < l.matches.length && !i.isImmediatePropagationStopped(); a++) u = l.matches[a], (m || !i.namespace && !u.namespace || i.namespace_re && i.namespace_re.test(u.namespace)) && (i.data = u.data, i.handleObj = u, r = ((Z.event.special[u.origType] || {}).handle || u.handler).apply(l.elem, f), r !== t && (i.result = r, r === !1 && (i.preventDefault(), i.stopPropagation())));
                return _.postDispatch && _.postDispatch.call(this, i), i.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, i) {
                var n, a, s, r = i.button,
                    o = i.fromElement;
                return null == e.pageX && null != i.clientX && (n = e.target.ownerDocument || q, a = n.documentElement, s = n.body, e.pageX = i.clientX + (a && a.scrollLeft || s && s.scrollLeft || 0) - (a && a.clientLeft || s && s.clientLeft || 0), e.pageY = i.clientY + (a && a.scrollTop || s && s.scrollTop || 0) - (a && a.clientTop || s && s.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? i.toElement : o), e.which || r === t || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[Z.expando]) return e;
            var t, i, n = e,
                a = Z.event.fixHooks[e.type] || {}, s = a.props ? this.props.concat(a.props) : this.props;
            for (e = Z.Event(n), t = s.length; t;) i = s[--t], e[i] = n[i];
            return e.target || (e.target = n.srcElement || q), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, a.filter ? a.filter(e, n) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (e, t, i) {
                    Z.isWindow(this) && (this.onbeforeunload = i)
                },
                teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (e, t, i, n) {
            var a = Z.extend(new Z.Event, i, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? Z.event.trigger(a, null, t) : Z.event.dispatch.call(t, a), a.isDefaultPrevented() && i.preventDefault()
        }
    }, Z.event.handle = Z.event.dispatch, Z.removeEvent = q.removeEventListener ? function (e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i, !1)
    } : function (e, t, i) {
        var n = "on" + t;
        e.detachEvent && ("undefined" == typeof e[n] && (e[n] = null), e.detachEvent(n, i))
    }, Z.Event = function (e, t) {
        return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? r : s) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), this[Z.expando] = !0, void 0) : new Z.Event(e, t)
    }, Z.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = r;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = r;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = r, this.stopPropagation()
        },
        isDefaultPrevented: s,
        isPropagationStopped: s,
        isImmediatePropagationStopped: s
    }, Z.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        Z.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
                var i, n = this,
                    a = e.relatedTarget,
                    s = e.handleObj;
                return s.selector, (!a || a !== n && !Z.contains(n, a)) && (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
            }
        }
    }), Z.support.submitBubbles || (Z.event.special.submit = {
        setup: function () {
            return Z.nodeName(this, "form") ? !1 : (Z.event.add(this, "click._submit keypress._submit", function (e) {
                var i = e.target,
                    n = Z.nodeName(i, "input") || Z.nodeName(i, "button") ? i.form : t;
                n && !Z._data(n, "_submit_attached") && (Z.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), Z._data(n, "_submit_attached", !0))
            }), void 0)
        },
        postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && Z.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function () {
            return Z.nodeName(this, "form") ? !1 : (Z.event.remove(this, "._submit"), void 0)
        }
    }), Z.support.changeBubbles || (Z.event.special.change = {
        setup: function () {
            return Tt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (Z.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), Z.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), Z.event.simulate("change", this, e, !0)
            })), !1) : (Z.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Tt.test(t.nodeName) && !Z._data(t, "_change_attached") && (Z.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || Z.event.simulate("change", this.parentNode, e, !0)
                }), Z._data(t, "_change_attached", !0))
            }), void 0)
        },
        handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function () {
            return Z.event.remove(this, "._change"), !Tt.test(this.nodeName)
        }
    }), Z.support.focusinBubbles || Z.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var i = 0,
            n = function (e) {
                Z.event.simulate(t, e.target, Z.event.fix(e), !0)
            };
        Z.event.special[t] = {
            setup: function () {
                0 === i++ && q.addEventListener(e, n, !0)
            },
            teardown: function () {
                0 === --i && q.removeEventListener(e, n, !0)
            }
        }
    }), Z.fn.extend({
        on: function (e, i, n, a, r) {
            var o, l;
            if ("object" == typeof e) {
                "string" != typeof i && (n = n || i, i = t);
                for (l in e) this.on(l, i, n, e[l], r);
                return this
            }
            if (null == n && null == a ? (a = i, n = i = t) : null == a && ("string" == typeof i ? (a = n, n = t) : (a = n, n = i, i = t)), a === !1) a = s;
            else if (!a) return this;
            return 1 === r && (o = a, a = function (e) {
                return Z().off(e), o.apply(this, arguments)
            }, a.guid = o.guid || (o.guid = Z.guid++)), this.each(function () {
                Z.event.add(this, e, a, n, i)
            })
        },
        one: function (e, t, i, n) {
            return this.on(e, t, i, n, 1)
        },
        off: function (e, i, n) {
            var a, r;
            if (e && e.preventDefault && e.handleObj) return a = e.handleObj, Z(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, i, e[r]);
                return this
            }
            return (i === !1 || "function" == typeof i) && (n = i, i = t), n === !1 && (n = s), this.each(function () {
                Z.event.remove(this, e, n, i)
            })
        },
        bind: function (e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        live: function (e, t, i) {
            return Z(this.context).on(e, this.selector, t, i), this
        },
        die: function (e, t) {
            return Z(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function (e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function (e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        },
        trigger: function (e, t) {
            return this.each(function () {
                Z.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            return this[0] ? Z.event.trigger(e, t, this[0], !0) : void 0
        },
        toggle: function (e) {
            var t = arguments,
                i = e.guid || Z.guid++,
                n = 0,
                a = function (i) {
                    var a = (Z._data(this, "lastToggle" + e.guid) || 0) % n;
                    return Z._data(this, "lastToggle" + e.guid, a + 1), i.preventDefault(), t[a].apply(this, arguments) || !1
                };
            for (a.guid = i; n < t.length;) t[n++].guid = i;
            return this.click(a)
        },
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        Z.fn[t] = function (e, i) {
            return null == i && (i = e, e = null), arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
        }, Et.test(t) && (Z.event.fixHooks[t] = Z.event.keyHooks), Pt.test(t) && (Z.event.fixHooks[t] = Z.event.mouseHooks)
    }),
    function (e, t) {
        function i(e, t, i, n) {
            i = i || [], t = t || P;
            var a, s, r, o, l = t.nodeType;
            if (!e || "string" != typeof e) return i;
            if (1 !== l && 9 !== l) return [];
            if (r = w(t), !r && !n && (a = it.exec(e)))
                if (o = a[1]) {
                    if (9 === l) {
                        if (s = t.getElementById(o), !s || !s.parentNode) return i;
                        if (s.id === o) return i.push(s), i
                    } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && x(t, s) && s.id === o) return i.push(s), i
                } else {
                    if (a[2]) return I.apply(i, M.call(t.getElementsByTagName(e), 0)), i;
                    if ((o = a[3]) && dt && t.getElementsByClassName) return I.apply(i, M.call(t.getElementsByClassName(o), 0)), i
                }
            return m(e.replace(G, "$1"), t, i, n, r)
        }

        function n(e) {
            return function (t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === e
            }
        }

        function a(e) {
            return function (t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        }

        function s(e) {
            return F(function (t) {
                return t = +t, F(function (i, n) {
                    for (var a, s = e([], i.length, t), r = s.length; r--;) i[a = s[r]] && (i[a] = !(n[a] = i[a]))
                })
            })
        }

        function r(e, t, i) {
            if (e === t) return i;
            for (var n = e.nextSibling; n;) {
                if (n === t) return -1;
                n = n.nextSibling
            }
            return 1
        }

        function o(e, t) {
            var n, a, s, r, o, l, c, u = R[z][e + " "];
            if (u) return t ? 0 : u.slice(0);
            for (o = e, l = [], c = y.preFilter; o;) {
                (!n || (a = J.exec(o))) && (a && (o = o.slice(a[0].length) || o), l.push(s = [])), n = !1, (a = et.exec(o)) && (s.push(n = new E(a.shift())), o = o.slice(n.length), n.type = a[0].replace(G, " "));
                for (r in y.filter)!(a = ot[r].exec(o)) || c[r] && !(a = c[r](a)) || (s.push(n = new E(a.shift())), o = o.slice(n.length), n.type = r, n.matches = a);
                if (!n) break
            }
            return t ? o.length : o ? i.error(e) : R(e, l).slice(0)
        }

        function l(e, t, i) {
            var n = t.dir,
                a = i && "parentNode" === t.dir,
                s = L++;
            return t.first ? function (t, i, s) {
                for (; t = t[n];)
                    if (a || 1 === t.nodeType) return e(t, i, s)
            } : function (t, i, r) {
                if (r) {
                    for (; t = t[n];)
                        if ((a || 1 === t.nodeType) && e(t, i, r)) return t
                } else
                    for (var o, l = N + " " + s + " ", c = l + g; t = t[n];)
                        if (a || 1 === t.nodeType) {
                            if ((o = t[z]) === c) return t.sizset;
                            if ("string" == typeof o && 0 === o.indexOf(l)) {
                                if (t.sizset) return t
                            } else {
                                if (t[z] = c, e(t, i, r)) return t.sizset = !0, t;
                                t.sizset = !1
                            }
                        }
            }
        }

        function c(e) {
            return e.length > 1 ? function (t, i, n) {
                for (var a = e.length; a--;)
                    if (!e[a](t, i, n)) return !1;
                return !0
            } : e[0]
        }

        function u(e, t, i, n, a) {
            for (var s, r = [], o = 0, l = e.length, c = null != t; l > o; o++)(s = e[o]) && (!i || i(s, n, a)) && (r.push(s), c && t.push(o));
            return r
        }

        function h(e, t, i, n, a, s) {
            return n && !n[z] && (n = h(n)), a && !a[z] && (a = h(a, s)), F(function (s, r, o, l) {
                var c, h, d, p = [],
                    m = [],
                    _ = r.length,
                    g = s || f(t || "*", o.nodeType ? [o] : o, []),
                    v = !e || !s && t ? g : u(g, p, e, o, l),
                    y = i ? a || (s ? e : _ || n) ? [] : r : v;
                if (i && i(v, y, o, l), n)
                    for (c = u(y, m), n(c, [], o, l), h = c.length; h--;)(d = c[h]) && (y[m[h]] = !(v[m[h]] = d));
                if (s) {
                    if (a || e) {
                        if (a) {
                            for (c = [], h = y.length; h--;)(d = y[h]) && c.push(v[h] = d);
                            a(null, y = [], c, l)
                        }
                        for (h = y.length; h--;)(d = y[h]) && (c = a ? O.call(s, d) : p[h]) > -1 && (s[c] = !(r[c] = d))
                    }
                } else y = u(y === r ? y.splice(_, y.length) : y), a ? a(null, r, y, l) : I.apply(r, y)
            })
        }

        function d(e) {
            for (var t, i, n, a = e.length, s = y.relative[e[0].type], r = s || y.relative[" "], o = s ? 1 : 0, u = l(function (e) {
                    return e === t
                }, r, !0), p = l(function (e) {
                    return O.call(t, e) > -1
                }, r, !0), f = [
                    function (e, i, n) {
                        return !s && (n || i !== S) || ((t = i).nodeType ? u(e, i, n) : p(e, i, n))
                    }
                ]; a > o; o++)
                if (i = y.relative[e[o].type]) f = [l(c(f), i)];
                else {
                    if (i = y.filter[e[o].type].apply(null, e[o].matches), i[z]) {
                        for (n = ++o; a > n && !y.relative[e[n].type]; n++);
                        return h(o > 1 && c(f), o > 1 && e.slice(0, o - 1).join("").replace(G, "$1"), i, n > o && d(e.slice(o, n)), a > n && d(e = e.slice(n)), a > n && e.join(""))
                    }
                    f.push(i)
                }
            return c(f)
        }

        function p(e, t) {
            var n = t.length > 0,
                a = e.length > 0,
                s = function (r, o, l, c, h) {
                    var d, p, f, m = [],
                        _ = 0,
                        v = "0",
                        b = r && [],
                        w = null != h,
                        x = S,
                        k = r || a && y.find.TAG("*", h && o.parentNode || o),
                        $ = N += null == x ? 1 : Math.E;
                    for (w && (S = o !== P && o, g = s.el); null != (d = k[v]); v++) {
                        if (a && d) {
                            for (p = 0; f = e[p]; p++)
                                if (f(d, o, l)) {
                                    c.push(d);
                                    break
                                }
                            w && (N = $, g = ++s.el)
                        }
                        n && ((d = !f && d) && _--, r && b.push(d))
                    }
                    if (_ += v, n && v !== _) {
                        for (p = 0; f = t[p]; p++) f(b, m, o, l);
                        if (r) {
                            if (_ > 0)
                                for (; v--;) b[v] || m[v] || (m[v] = D.call(c));
                            m = u(m)
                        }
                        I.apply(c, m), w && !r && m.length > 0 && _ + t.length > 1 && i.uniqueSort(c)
                    }
                    return w && (N = $, S = x), b
                };
            return s.el = 0, n ? F(s) : s
        }

        function f(e, t, n) {
            for (var a = 0, s = t.length; s > a; a++) i(e, t[a], n);
            return n
        }

        function m(e, t, i, n, a) {
            var s, r, l, c, u, h = o(e);
            if (h.length, !n && 1 === h.length) {
                if (r = h[0] = h[0].slice(0), r.length > 2 && "ID" === (l = r[0]).type && 9 === t.nodeType && !a && y.relative[r[1].type]) {
                    if (t = y.find.ID(l.matches[0].replace(rt, ""), t, a)[0], !t) return i;
                    e = e.slice(r.shift().length)
                }
                for (s = ot.POS.test(e) ? -1 : r.length - 1; s >= 0 && (l = r[s], !y.relative[c = l.type]); s--)
                    if ((u = y.find[c]) && (n = u(l.matches[0].replace(rt, ""), nt.test(r[0].type) && t.parentNode || t, a))) {
                        if (r.splice(s, 1), e = n.length && r.join(""), !e) return I.apply(i, M.call(n, 0)), i;
                        break
                    }
            }
            return k(e, h)(n, t, a, i, nt.test(e)), i
        }

        function _() {}
        var g, v, y, b, w, x, k, $, C, S, T = !0,
            A = "undefined",
            z = ("sizcache" + Math.random()).replace(".", ""),
            E = String,
            P = e.document,
            j = P.documentElement,
            N = 0,
            L = 0,
            D = [].pop,
            I = [].push,
            M = [].slice,
            O = [].indexOf || function (e) {
                for (var t = 0, i = this.length; i > t; t++)
                    if (this[t] === e) return t;
                return -1
            }, F = function (e, t) {
                return e[z] = null == t || t, e
            }, H = function () {
                var e = {}, t = [];
                return F(function (i, n) {
                    return t.push(i) > y.cacheLength && delete e[t.shift()], e[i + " "] = n
                }, e)
            }, q = H(),
            R = H(),
            B = H(),
            W = "[\\x20\\t\\r\\n\\f]",
            Q = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            V = Q.replace("w", "w#"),
            U = "([*^$|!~]?=)",
            X = "\\[" + W + "*(" + Q + ")" + W + "*(?:" + U + W + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + V + ")|)|)" + W + "*\\]",
            Y = ":(" + Q + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + X + ")|[^:]|\\\\.)*|.*))\\)|)",
            K = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + W + "*((?:-\\d)?\\d*)" + W + "*\\)|)(?=[^-]|$)",
            G = new RegExp("^" + W + "+|((?:^|[^\\\\])(?:\\\\.)*)" + W + "+$", "g"),
            J = new RegExp("^" + W + "*," + W + "*"),
            et = new RegExp("^" + W + "*([\\x20\\t\\r\\n\\f>+~])" + W + "*"),
            tt = new RegExp(Y),
            it = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            nt = /[\x20\t\r\n\f]*[+~]/,
            at = /h\d/i,
            st = /input|select|textarea|button/i,
            rt = /\\(?!\\)/g,
            ot = {
                ID: new RegExp("^#(" + Q + ")"),
                CLASS: new RegExp("^\\.(" + Q + ")"),
                NAME: new RegExp("^\\[name=['\"]?(" + Q + ")['\"]?\\]"),
                TAG: new RegExp("^(" + Q.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + X),
                PSEUDO: new RegExp("^" + Y),
                POS: new RegExp(K, "i"),
                CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + W + "*(even|odd|(([+-]|)(\\d*)n|)" + W + "*(?:([+-]|)" + W + "*(\\d+)|))" + W + "*\\)|)", "i"),
                needsContext: new RegExp("^" + W + "*[>+~]|" + K, "i")
            }, lt = function (e) {
                var t = P.createElement("div");
                try {
                    return e(t)
                } catch (i) {
                    return !1
                } finally {
                    t = null
                }
            }, ct = lt(function (e) {
                return e.appendChild(P.createComment("")), !e.getElementsByTagName("*").length
            }),
            ut = lt(function (e) {
                return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href")
            }),
            ht = lt(function (e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t
            }),
            dt = lt(function (e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
            }),
            pt = lt(function (e) {
                e.id = z + 0, e.innerHTML = "<a name='" + z + "'></a><div name='" + z + "'></div>", j.insertBefore(e, j.firstChild);
                var t = P.getElementsByName && P.getElementsByName(z).length === 2 + P.getElementsByName(z + 0).length;
                return v = !P.getElementById(z), j.removeChild(e), t
            });
        try {
            M.call(j.childNodes, 0)[0].nodeType
        } catch (ft) {
            M = function (e) {
                for (var t, i = []; t = this[e]; e++) i.push(t);
                return i
            }
        }
        i.matches = function (e, t) {
            return i(e, null, null, t)
        }, i.matchesSelector = function (e, t) {
            return i(t, null, null, [e]).length > 0
        }, b = i.getText = function (e) {
            var t, i = "",
                n = 0,
                a = e.nodeType;
            if (a) {
                if (1 === a || 9 === a || 11 === a) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += b(e)
                } else if (3 === a || 4 === a) return e.nodeValue
            } else
                for (; t = e[n]; n++) i += b(t);
            return i
        }, w = i.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, x = i.contains = j.contains ? function (e, t) {
            var i = 9 === e.nodeType ? e.documentElement : e,
                n = t && t.parentNode;
            return e === n || !! (n && 1 === n.nodeType && i.contains && i.contains(n))
        } : j.compareDocumentPosition ? function (e, t) {
            return t && !! (16 & e.compareDocumentPosition(t))
        } : function (e, t) {
            for (; t = t.parentNode;)
                if (t === e) return !0;
            return !1
        }, i.attr = function (e, t) {
            var i, n = w(e);
            return n || (t = t.toLowerCase()), (i = y.attrHandle[t]) ? i(e) : n || ht ? e.getAttribute(t) : (i = e.getAttributeNode(t), i ? "boolean" == typeof e[t] ? e[t] ? t : null : i.specified ? i.value : null : null)
        }, y = i.selectors = {
            cacheLength: 50,
            createPseudo: F,
            match: ot,
            attrHandle: ut ? {} : {
                href: function (e) {
                    return e.getAttribute("href", 2)
                },
                type: function (e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: v ? function (e, t, i) {
                    if (typeof t.getElementById !== A && !i) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                } : function (e, i, n) {
                    if (typeof i.getElementById !== A && !n) {
                        var a = i.getElementById(e);
                        return a ? a.id === e || typeof a.getAttributeNode !== A && a.getAttributeNode("id").value === e ? [a] : t : []
                    }
                },
                TAG: ct ? function (e, t) {
                    return typeof t.getElementsByTagName !== A ? t.getElementsByTagName(e) : void 0
                } : function (e, t) {
                    var i = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (var n, a = [], s = 0; n = i[s]; s++) 1 === n.nodeType && a.push(n);
                        return a
                    }
                    return i
                },
                NAME: pt && function (e, t) {
                    return typeof t.getElementsByName !== A ? t.getElementsByName(name) : void 0
                },
                CLASS: dt && function (e, t, i) {
                    return typeof t.getElementsByClassName === A || i ? void 0 : t.getElementsByClassName(e)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(rt, ""), e[3] = (e[4] || e[5] || "").replace(rt, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || i.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && i.error(e[0]), e
                },
                PSEUDO: function (e) {
                    var t, i;
                    return ot.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (tt.test(t) && (i = o(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (t = t.slice(0, i), e[0] = e[0].slice(0, i)), e[2] = t), e.slice(0, 3))
                }
            },
            filter: {
                ID: v ? function (e) {
                    return e = e.replace(rt, ""),
                    function (t) {
                        return t.getAttribute("id") === e
                    }
                } : function (e) {
                    return e = e.replace(rt, ""),
                    function (t) {
                        var i = typeof t.getAttributeNode !== A && t.getAttributeNode("id");
                        return i && i.value === e
                    }
                },
                TAG: function (e) {
                    return "*" === e ? function () {
                        return !0
                    } : (e = e.replace(rt, "").toLowerCase(), function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function (e) {
                    var t = q[z][e + " "];
                    return t || (t = new RegExp("(^|" + W + ")" + e + "(" + W + "|$)")) && q(e, function (e) {
                        return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "")
                    })
                },
                ATTR: function (e, t, n) {
                    return function (a) {
                        var s = i.attr(a, e);
                        return null == s ? "!=" === t : t ? (s += "", "=" === t ? s === n : "!=" === t ? s !== n : "^=" === t ? n && 0 === s.indexOf(n) : "*=" === t ? n && s.indexOf(n) > -1 : "$=" === t ? n && s.substr(s.length - n.length) === n : "~=" === t ? (" " + s + " ").indexOf(n) > -1 : "|=" === t ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function (e, t, i, n) {
                    return "nth" === e ? function (e) {
                        var t, a, s = e.parentNode;
                        if (1 === i && 0 === n) return !0;
                        if (s)
                            for (a = 0, t = s.firstChild; t && (1 !== t.nodeType || (a++, e !== t)); t = t.nextSibling);
                        return a -= n, a === i || 0 === a % i && a / i >= 0
                    } : function (t) {
                        var i = t;
                        switch (e) {
                        case "only":
                        case "first":
                            for (; i = i.previousSibling;)
                                if (1 === i.nodeType) return !1;
                            if ("first" === e) return !0;
                            i = t;
                        case "last":
                            for (; i = i.nextSibling;)
                                if (1 === i.nodeType) return !1;
                            return !0
                        }
                    }
                },
                PSEUDO: function (e, t) {
                    var n, a = y.pseudos[e] || y.setFilters[e.toLowerCase()] || i.error("unsupported pseudo: " + e);
                    return a[z] ? a(t) : a.length > 1 ? (n = [e, e, "", t], y.setFilters.hasOwnProperty(e.toLowerCase()) ? F(function (e, i) {
                        for (var n, s = a(e, t), r = s.length; r--;) n = O.call(e, s[r]), e[n] = !(i[n] = s[r])
                    }) : function (e) {
                        return a(e, 0, n)
                    }) : a
                }
            },
            pseudos: {
                not: F(function (e) {
                    var t = [],
                        i = [],
                        n = k(e.replace(G, "$1"));
                    return n[z] ? F(function (e, t, i, a) {
                        for (var s, r = n(e, null, a, []), o = e.length; o--;)(s = r[o]) && (e[o] = !(t[o] = s))
                    }) : function (e, a, s) {
                        return t[0] = e, n(t, null, s, i), !i.pop()
                    }
                }),
                has: F(function (e) {
                    return function (t) {
                        return i(e, t).length > 0
                    }
                }),
                contains: F(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
                    }
                }),
                enabled: function (e) {
                    return e.disabled === !1
                },
                disabled: function (e) {
                    return e.disabled === !0
                },
                checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !! e.checked || "option" === t && !! e.selected
                },
                selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                parent: function (e) {
                    return !y.pseudos.empty(e)
                },
                empty: function (e) {
                    var t;
                    for (e = e.firstChild; e;) {
                        if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
                        e = e.nextSibling
                    }
                    return !0
                },
                header: function (e) {
                    return at.test(e.nodeName)
                },
                text: function (e) {
                    var t, i;
                    return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (i = e.getAttribute("type")) || i.toLowerCase() === t)
                },
                radio: n("radio"),
                checkbox: n("checkbox"),
                file: n("file"),
                password: n("password"),
                image: n("image"),
                submit: a("submit"),
                reset: a("reset"),
                button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                input: function (e) {
                    return st.test(e.nodeName)
                },
                focus: function (e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                active: function (e) {
                    return e === e.ownerDocument.activeElement
                },
                first: s(function () {
                    return [0]
                }),
                last: s(function (e, t) {
                    return [t - 1]
                }),
                eq: s(function (e, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: s(function (e, t) {
                    for (var i = 0; t > i; i += 2) e.push(i);
                    return e
                }),
                odd: s(function (e, t) {
                    for (var i = 1; t > i; i += 2) e.push(i);
                    return e
                }),
                lt: s(function (e, t, i) {
                    for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
                    return e
                }),
                gt: s(function (e, t, i) {
                    for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
                    return e
                })
            }
        }, $ = j.compareDocumentPosition ? function (e, t) {
            return e === t ? (C = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
        } : function (e, t) {
            if (e === t) return C = !0, 0;
            if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
            var i, n, a = [],
                s = [],
                o = e.parentNode,
                l = t.parentNode,
                c = o;
            if (o === l) return r(e, t);
            if (!o) return -1;
            if (!l) return 1;
            for (; c;) a.unshift(c), c = c.parentNode;
            for (c = l; c;) s.unshift(c), c = c.parentNode;
            i = a.length, n = s.length;
            for (var u = 0; i > u && n > u; u++)
                if (a[u] !== s[u]) return r(a[u], s[u]);
            return u === i ? r(e, s[u], -1) : r(a[u], t, 1)
        }, [0, 0].sort($), T = !C, i.uniqueSort = function (e) {
            var t, i = [],
                n = 1,
                a = 0;
            if (C = T, e.sort($), C) {
                for (; t = e[n]; n++) t === e[n - 1] && (a = i.push(n));
                for (; a--;) e.splice(i[a], 1)
            }
            return e
        }, i.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, k = i.compile = function (e, t) {
            var i, n = [],
                a = [],
                s = B[z][e + " "];
            if (!s) {
                for (t || (t = o(e)), i = t.length; i--;) s = d(t[i]), s[z] ? n.push(s) : a.push(s);
                s = B(e, p(a, n))
            }
            return s
        }, P.querySelectorAll && function () {
            var e, t = m,
                n = /'|\\/g,
                a = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                s = [":focus"],
                r = [":active"],
                l = j.matchesSelector || j.mozMatchesSelector || j.webkitMatchesSelector || j.oMatchesSelector || j.msMatchesSelector;
            lt(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || s.push("\\[" + W + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || s.push(":checked")
            }), lt(function (e) {
                e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && s.push("[*^$]=" + W + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || s.push(":enabled", ":disabled")
            }), s = new RegExp(s.join("|")), m = function (e, i, a, r, l) {
                if (!r && !l && !s.test(e)) {
                    var c, u, h = !0,
                        d = z,
                        p = i,
                        f = 9 === i.nodeType && e;
                    if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                        for (c = o(e), (h = i.getAttribute("id")) ? d = h.replace(n, "\\$&") : i.setAttribute("id", d), d = "[id='" + d + "'] ", u = c.length; u--;) c[u] = d + c[u].join("");
                        p = nt.test(e) && i.parentNode || i, f = c.join(",")
                    }
                    if (f) try {
                        return I.apply(a, M.call(p.querySelectorAll(f), 0)), a
                    } catch (m) {} finally {
                        h || i.removeAttribute("id")
                    }
                }
                return t(e, i, a, r, l)
            }, l && (lt(function (t) {
                e = l.call(t, "div");
                try {
                    l.call(t, "[test!='']:sizzle"), r.push("!=", Y)
                } catch (i) {}
            }), r = new RegExp(r.join("|")), i.matchesSelector = function (t, n) {
                if (n = n.replace(a, "='$1']"), !w(t) && !r.test(n) && !s.test(n)) try {
                    var o = l.call(t, n);
                    if (o || e || t.document && 11 !== t.document.nodeType) return o
                } catch (c) {}
                return i(n, null, null, [t]).length > 0
            })
        }(), y.pseudos.nth = y.pseudos.eq, y.filters = _.prototype = y.pseudos, y.setFilters = new _, i.attr = Z.attr, Z.find = i, Z.expr = i.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = i.uniqueSort, Z.text = i.getText, Z.isXMLDoc = i.isXML, Z.contains = i.contains
    }(e);
    var Lt = /Until$/,
        Dt = /^(?:parents|prev(?:Until|All))/,
        It = /^.[^:#\[\.,]*$/,
        Mt = Z.expr.match.needsContext,
        Ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Z.fn.extend({
        find: function (e) {
            var t, i, n, a, s, r, o = this;
            if ("string" != typeof e) return Z(e).filter(function () {
                for (t = 0, i = o.length; i > t; t++)
                    if (Z.contains(o[t], this)) return !0
            });
            for (r = this.pushStack("", "find", e), t = 0, i = this.length; i > t; t++)
                if (n = r.length, Z.find(e, this[t], r), t > 0)
                    for (a = n; a < r.length; a++)
                        for (s = 0; n > s; s++)
                            if (r[s] === r[a]) {
                                r.splice(a--, 1);
                                break
                            }
            return r
        },
        has: function (e) {
            var t, i = Z(e, this),
                n = i.length;
            return this.filter(function () {
                for (t = 0; n > t; t++)
                    if (Z.contains(this, i[t])) return !0
            })
        },
        not: function (e) {
            return this.pushStack(c(this, e, !1), "not", e)
        },
        filter: function (e) {
            return this.pushStack(c(this, e, !0), "filter", e)
        },
        is: function (e) {
            return !!e && ("string" == typeof e ? Mt.test(e) ? Z(e, this.context).index(this[0]) >= 0 : Z.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, t) {
            for (var i, n = 0, a = this.length, s = [], r = Mt.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; a > n; n++)
                for (i = this[n]; i && i.ownerDocument && i !== t && 11 !== i.nodeType;) {
                    if (r ? r.index(i) > -1 : Z.find.matchesSelector(i, e)) {
                        s.push(i);
                        break
                    }
                    i = i.parentNode
                }
            return s = s.length > 1 ? Z.unique(s) : s, this.pushStack(s, "closest", e)
        },
        index: function (e) {
            return e ? "string" == typeof e ? Z.inArray(this[0], Z(e)) : Z.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (e, t) {
            var i = "string" == typeof e ? Z(e, t) : Z.makeArray(e && e.nodeType ? [e] : e),
                n = Z.merge(this.get(), i);
            return this.pushStack(o(i[0]) || o(n[0]) ? n : Z.unique(n))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), Z.fn.andSelf = Z.fn.addBack, Z.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return Z.dir(e, "parentNode")
        },
        parentsUntil: function (e, t, i) {
            return Z.dir(e, "parentNode", i)
        },
        next: function (e) {
            return l(e, "nextSibling")
        },
        prev: function (e) {
            return l(e, "previousSibling")
        },
        nextAll: function (e) {
            return Z.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return Z.dir(e, "previousSibling")
        },
        nextUntil: function (e, t, i) {
            return Z.dir(e, "nextSibling", i)
        },
        prevUntil: function (e, t, i) {
            return Z.dir(e, "previousSibling", i)
        },
        siblings: function (e) {
            return Z.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return Z.sibling(e.firstChild)
        },
        contents: function (e) {
            return Z.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Z.merge([], e.childNodes)
        }
    }, function (e, t) {
        Z.fn[e] = function (i, n) {
            var a = Z.map(this, t, i);
            return Lt.test(e) || (n = i), n && "string" == typeof n && (a = Z.filter(n, a)), a = this.length > 1 && !Ot[e] ? Z.unique(a) : a, this.length > 1 && Dt.test(e) && (a = a.reverse()), this.pushStack(a, e, U.call(arguments).join(","))
        }
    }), Z.extend({
        filter: function (e, t, i) {
            return i && (e = ":not(" + e + ")"), 1 === t.length ? Z.find.matchesSelector(t[0], e) ? [t[0]] : [] : Z.find.matches(e, t)
        },
        dir: function (e, i, n) {
            for (var a = [], s = e[i]; s && 9 !== s.nodeType && (n === t || 1 !== s.nodeType || !Z(s).is(n));) 1 === s.nodeType && a.push(s), s = s[i];
            return a
        },
        sibling: function (e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        }
    });
    var Ft = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ht = / jQuery\d+="(?:null|\d+)"/g,
        qt = /^\s+/,
        Rt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Bt = /<([\w:]+)/,
        Wt = /<tbody/i,
        Qt = /<|&#?\w+;/,
        Vt = /<(?:script|style|link)/i,
        Ut = /<(?:script|object|embed|option|style)/i,
        Xt = new RegExp("<(?:" + Ft + ")[\\s/>]", "i"),
        Yt = /^(?:checkbox|radio)$/,
        Kt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Gt = /\/(java|ecma)script/i,
        Zt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Jt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, ei = u(q),
        ti = ei.appendChild(q.createElement("div"));
    Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td, Z.support.htmlSerialize || (Jt._default = [1, "X<div>", "</div>"]), Z.fn.extend({
        text: function (e) {
            return Z.access(this, function (e) {
                return e === t ? Z.text(this) : this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function (e) {
            if (Z.isFunction(e)) return this.each(function (t) {
                Z(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = Z(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            return Z.isFunction(e) ? this.each(function (t) {
                Z(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = Z(this),
                    i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = Z.isFunction(e);
            return this.each(function (i) {
                Z(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function () {
            if (!o(this[0])) return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(e, this), "before", this.selector)
            }
        },
        after: function () {
            if (!o(this[0])) return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(this, e), "after", this.selector)
            }
        },
        remove: function (e, t) {
            for (var i, n = 0; null != (i = this[n]); n++)(!e || Z.filter(e, [i]).length) && (t || 1 !== i.nodeType || (Z.cleanData(i.getElementsByTagName("*")), Z.cleanData([i])), i.parentNode && i.parentNode.removeChild(i));
            return this
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++)
                for (1 === e.nodeType && Z.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
            return this
        },
        clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return Z.clone(this, e, t)
            })
        },
        html: function (e) {
            return Z.access(this, function (e) {
                var i = this[0] || {}, n = 0,
                    a = this.length;
                if (e === t) return 1 === i.nodeType ? i.innerHTML.replace(Ht, "") : t;
                if (!("string" != typeof e || Vt.test(e) || !Z.support.htmlSerialize && Xt.test(e) || !Z.support.leadingWhitespace && qt.test(e) || Jt[(Bt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Rt, "<$1></$2>");
                    try {
                        for (; a > n; n++) i = this[n] || {}, 1 === i.nodeType && (Z.cleanData(i.getElementsByTagName("*")), i.innerHTML = e);
                        i = 0
                    } catch (s) {}
                }
                i && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function (e) {
            return o(this[0]) ? this.length ? this.pushStack(Z(Z.isFunction(e) ? e() : e), "replaceWith", e) : this : Z.isFunction(e) ? this.each(function (t) {
                var i = Z(this),
                    n = i.html();
                i.replaceWith(e.call(this, t, n))
            }) : ("string" != typeof e && (e = Z(e).detach()), this.each(function () {
                var t = this.nextSibling,
                    i = this.parentNode;
                Z(this).remove(), t ? Z(t).before(e) : Z(i).append(e)
            }))
        },
        detach: function (e) {
            return this.remove(e, !0)
        },
        domManip: function (e, i, n) {
            e = [].concat.apply([], e);
            var a, s, r, o, l = 0,
                c = e[0],
                u = [],
                d = this.length;
            if (!Z.support.checkClone && d > 1 && "string" == typeof c && Kt.test(c)) return this.each(function () {
                Z(this).domManip(e, i, n)
            });
            if (Z.isFunction(c)) return this.each(function (a) {
                var s = Z(this);
                e[0] = c.call(this, a, i ? s.html() : t), s.domManip(e, i, n)
            });
            if (this[0]) {
                if (a = Z.buildFragment(e, this, u), r = a.fragment, s = r.firstChild, 1 === r.childNodes.length && (r = s), s)
                    for (i = i && Z.nodeName(s, "tr"), o = a.cacheable || d - 1; d > l; l++) n.call(i && Z.nodeName(this[l], "table") ? h(this[l], "tbody") : this[l], l === o ? r : Z.clone(r, !0, !0));
                r = s = null, u.length && Z.each(u, function (e, t) {
                    t.src ? Z.ajax ? Z.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : Z.error("no ajax") : Z.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Zt, "")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), Z.buildFragment = function (e, i, n) {
        var a, s, r, o = e[0];
        return i = i || q, i = !i.nodeType && i[0] || i, i = i.ownerDocument || i, !(1 === e.length && "string" == typeof o && o.length < 512 && i === q && "<" === o.charAt(0)) || Ut.test(o) || !Z.support.checkClone && Kt.test(o) || !Z.support.html5Clone && Xt.test(o) || (s = !0, a = Z.fragments[o], r = a !== t), a || (a = i.createDocumentFragment(), Z.clean(e, i, a, n), s && (Z.fragments[o] = r && a)), {
            fragment: a,
            cacheable: s
        }
    }, Z.fragments = {}, Z.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        Z.fn[e] = function (i) {
            var n, a = 0,
                s = [],
                r = Z(i),
                o = r.length,
                l = 1 === this.length && this[0].parentNode;
            if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === o) return r[t](this[0]), this;
            for (; o > a; a++) n = (a > 0 ? this.clone(!0) : this).get(), Z(r[a])[t](n), s = s.concat(n);
            return this.pushStack(s, e, r.selector)
        }
    }), Z.extend({
        clone: function (e, t, i) {
            var n, a, s, r;
            if (Z.support.html5Clone || Z.isXMLDoc(e) || !Xt.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (ti.innerHTML = e.outerHTML, ti.removeChild(r = ti.firstChild)), !(Z.support.noCloneEvent && Z.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                for (p(e, r), n = f(e), a = f(r), s = 0; n[s]; ++s) a[s] && p(n[s], a[s]);
            if (t && (d(e, r), i))
                for (n = f(e), a = f(r), s = 0; n[s]; ++s) d(n[s], a[s]);
            return n = a = null, r
        },
        clean: function (e, t, i, n) {
            var a, s, r, o, l, c, h, d, p, f, _, g = t === q && ei,
                v = [];
            for (t && "undefined" != typeof t.createDocumentFragment || (t = q), a = 0; null != (r = e[a]); a++)
                if ("number" == typeof r && (r += ""), r) {
                    if ("string" == typeof r)
                        if (Qt.test(r)) {
                            for (g = g || u(t), h = t.createElement("div"), g.appendChild(h), r = r.replace(Rt, "<$1></$2>"), o = (Bt.exec(r) || ["", ""])[1].toLowerCase(), l = Jt[o] || Jt._default, c = l[0], h.innerHTML = l[1] + r + l[2]; c--;) h = h.lastChild;
                            if (!Z.support.tbody)
                                for (d = Wt.test(r), p = "table" !== o || d ? "<table>" !== l[1] || d ? [] : h.childNodes : h.firstChild && h.firstChild.childNodes, s = p.length - 1; s >= 0; --s) Z.nodeName(p[s], "tbody") && !p[s].childNodes.length && p[s].parentNode.removeChild(p[s]);
                            !Z.support.leadingWhitespace && qt.test(r) && h.insertBefore(t.createTextNode(qt.exec(r)[0]), h.firstChild), r = h.childNodes, h.parentNode.removeChild(h)
                        } else r = t.createTextNode(r);
                    r.nodeType ? v.push(r) : Z.merge(v, r)
                }
            if (h && (r = h = g = null), !Z.support.appendChecked)
                for (a = 0; null != (r = v[a]); a++) Z.nodeName(r, "input") ? m(r) : "undefined" != typeof r.getElementsByTagName && Z.grep(r.getElementsByTagName("input"), m);
            if (i)
                for (f = function (e) {
                    return !e.type || Gt.test(e.type) ? n ? n.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : void 0
                }, a = 0; null != (r = v[a]); a++) Z.nodeName(r, "script") && f(r) || (i.appendChild(r), "undefined" != typeof r.getElementsByTagName && (_ = Z.grep(Z.merge([], r.getElementsByTagName("script")), f), v.splice.apply(v, [a + 1, 0].concat(_)), a += _.length));
            return v
        },
        cleanData: function (e, t) {
            for (var i, n, a, s, r = 0, o = Z.expando, l = Z.cache, c = Z.support.deleteExpando, u = Z.event.special; null != (a = e[r]); r++)
                if ((t || Z.acceptData(a)) && (n = a[o], i = n && l[n])) {
                    if (i.events)
                        for (s in i.events) u[s] ? Z.event.remove(a, s) : Z.removeEvent(a, s, i.handle);
                    l[n] && (delete l[n], c ? delete a[o] : a.removeAttribute ? a.removeAttribute(o) : a[o] = null, Z.deletedIds.push(n))
                }
        }
    }),
    function () {
        var e, t;
        Z.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }, e = Z.uaMatch(B.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), Z.browser = t, Z.sub = function () {
            function e(t, i) {
                return new e.fn.init(t, i)
            }
            Z.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (i, n) {
                return n && n instanceof Z && !(n instanceof e) && (n = e(n)), Z.fn.init.call(this, i, n, t)
            }, e.fn.init.prototype = e.fn;
            var t = e(q);
            return e
        }
    }();
    var ii, ni, ai, si = /alpha\([^)]*\)/i,
        ri = /opacity=([^)]*)/,
        oi = /^(top|right|bottom|left)$/,
        li = /^(none|table(?!-c[ea]).+)/,
        ci = /^margin/,
        ui = new RegExp("^(" + J + ")(.*)$", "i"),
        hi = new RegExp("^(" + J + ")(?!px)[a-z%]+$", "i"),
        di = new RegExp("^([-+])=(" + J + ")", "i"),
        pi = {
            BODY: "block"
        }, fi = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, mi = {
            letterSpacing: 0,
            fontWeight: 400
        }, _i = ["Top", "Right", "Bottom", "Left"],
        gi = ["Webkit", "O", "Moz", "ms"],
        vi = Z.fn.toggle;
    Z.fn.extend({
        css: function (e, i) {
            return Z.access(this, function (e, i, n) {
                return n !== t ? Z.style(e, i, n) : Z.css(e, i)
            }, e, i, arguments.length > 1)
        },
        show: function () {
            return v(this, !0)
        },
        hide: function () {
            return v(this)
        },
        toggle: function (e, t) {
            var i = "boolean" == typeof e;
            return Z.isFunction(e) && Z.isFunction(t) ? vi.apply(this, arguments) : this.each(function () {
                (i ? e : g(this)) ? Z(this).show() : Z(this).hide()
            })
        }
    }), Z.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var i = ii(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": Z.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, i, n, a) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var s, r, o, l = Z.camelCase(i),
                    c = e.style;
                if (i = Z.cssProps[l] || (Z.cssProps[l] = _(c, l)), o = Z.cssHooks[i] || Z.cssHooks[l], n === t) return o && "get" in o && (s = o.get(e, !1, a)) !== t ? s : c[i];
                if (r = typeof n, "string" === r && (s = di.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(Z.css(e, i)), r = "number"), !(null == n || "number" === r && isNaN(n) || ("number" !== r || Z.cssNumber[l] || (n += "px"), o && "set" in o && (n = o.set(e, n, a)) === t))) try {
                    c[i] = n
                } catch (u) {}
            }
        },
        css: function (e, i, n, a) {
            var s, r, o, l = Z.camelCase(i);
            return i = Z.cssProps[l] || (Z.cssProps[l] = _(e.style, l)), o = Z.cssHooks[i] || Z.cssHooks[l], o && "get" in o && (s = o.get(e, !0, a)), s === t && (s = ii(e, i)), "normal" === s && i in mi && (s = mi[i]), n || a !== t ? (r = parseFloat(s), n || Z.isNumeric(r) ? r || 0 : s) : s
        },
        swap: function (e, t, i) {
            var n, a, s = {};
            for (a in t) s[a] = e.style[a], e.style[a] = t[a];
            n = i.call(e);
            for (a in t) e.style[a] = s[a];
            return n
        }
    }), e.getComputedStyle ? ii = function (t, i) {
        var n, a, s, r, o = e.getComputedStyle(t, null),
            l = t.style;
        return o && (n = o.getPropertyValue(i) || o[i], "" !== n || Z.contains(t.ownerDocument, t) || (n = Z.style(t, i)), hi.test(n) && ci.test(i) && (a = l.width, s = l.minWidth, r = l.maxWidth, l.minWidth = l.maxWidth = l.width = n, n = o.width, l.width = a, l.minWidth = s, l.maxWidth = r)), n
    } : q.documentElement.currentStyle && (ii = function (e, t) {
        var i, n, a = e.currentStyle && e.currentStyle[t],
            s = e.style;
        return null == a && s && s[t] && (a = s[t]), hi.test(a) && !oi.test(t) && (i = s.left, n = e.runtimeStyle && e.runtimeStyle.left, n && (e.runtimeStyle.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, n && (e.runtimeStyle.left = n)), "" === a ? "auto" : a
    }), Z.each(["height", "width"], function (e, t) {
        Z.cssHooks[t] = {
            get: function (e, i, n) {
                return i ? 0 === e.offsetWidth && li.test(ii(e, "display")) ? Z.swap(e, fi, function () {
                    return w(e, t, n)
                }) : w(e, t, n) : void 0
            },
            set: function (e, i, n) {
                return y(e, i, n ? b(e, t, n, Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing")) : 0)
            }
        }
    }), Z.support.opacity || (Z.cssHooks.opacity = {
        get: function (e, t) {
            return ri.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var i = e.style,
                n = e.currentStyle,
                a = Z.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                s = n && n.filter || i.filter || "";
            i.zoom = 1, t >= 1 && "" === Z.trim(s.replace(si, "")) && i.removeAttribute && (i.removeAttribute("filter"), n && !n.filter) || (i.filter = si.test(s) ? s.replace(si, a) : s + " " + a)
        }
    }), Z(function () {
        Z.support.reliableMarginRight || (Z.cssHooks.marginRight = {
            get: function (e, t) {
                return Z.swap(e, {
                    display: "inline-block"
                }, function () {
                    return t ? ii(e, "marginRight") : void 0
                })
            }
        }), !Z.support.pixelPosition && Z.fn.position && Z.each(["top", "left"], function (e, t) {
            Z.cssHooks[t] = {
                get: function (e, i) {
                    if (i) {
                        var n = ii(e, t);
                        return hi.test(n) ? Z(e).position()[t] + "px" : n
                    }
                }
            }
        })
    }), Z.expr && Z.expr.filters && (Z.expr.filters.hidden = function (e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !Z.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ii(e, "display"))
    }, Z.expr.filters.visible = function (e) {
        return !Z.expr.filters.hidden(e)
    }), Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        Z.cssHooks[e + t] = {
            expand: function (i) {
                var n, a = "string" == typeof i ? i.split(" ") : [i],
                    s = {};
                for (n = 0; 4 > n; n++) s[e + _i[n] + t] = a[n] || a[n - 2] || a[0];
                return s
            }
        }, ci.test(e) || (Z.cssHooks[e + t].set = y)
    });
    var yi = /%20/g,
        bi = /\[\]$/,
        wi = /\r?\n/g,
        xi = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        ki = /^(?:select|textarea)/i;
    Z.fn.extend({
        serialize: function () {
            return Z.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? Z.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || ki.test(this.nodeName) || xi.test(this.type))
            }).map(function (e, t) {
                var i = Z(this).val();
                return null == i ? null : Z.isArray(i) ? Z.map(i, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(wi, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(wi, "\r\n")
                }
            }).get()
        }
    }), Z.param = function (e, i) {
        var n, a = [],
            s = function (e, t) {
                t = Z.isFunction(t) ? t() : null == t ? "" : t, a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (i === t && (i = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function () {
            s(this.name, this.value)
        });
        else
            for (n in e) k(n, e[n], i, s);
        return a.join("&").replace(yi, "+")
    };
    var $i, Ci, Si = /#.*$/,
        Ti = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ai = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        zi = /^(?:GET|HEAD)$/,
        Ei = /^\/\//,
        Pi = /\?/,
        ji = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ni = /([?&])_=[^&]*/,
        Li = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Di = Z.fn.load,
        Ii = {}, Mi = {}, Oi = ["*/"] + ["*"];
    try {
        Ci = R.href
    } catch (Fi) {
        Ci = q.createElement("a"), Ci.href = "", Ci = Ci.href
    }
    $i = Li.exec(Ci.toLowerCase()) || [], Z.fn.load = function (e, i, n) {
        if ("string" != typeof e && Di) return Di.apply(this, arguments);
        if (!this.length) return this;
        var a, s, r, o = this,
            l = e.indexOf(" ");
        return l >= 0 && (a = e.slice(l, e.length), e = e.slice(0, l)), Z.isFunction(i) ? (n = i, i = t) : i && "object" == typeof i && (s = "POST"), Z.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: i,
            complete: function (e, t) {
                n && o.each(n, r || [e.responseText, t, e])
            }
        }).done(function (e) {
            r = arguments, o.html(a ? Z("<div>").append(e.replace(ji, "")).find(a) : e)
        }), this
    }, Z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        Z.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), Z.each(["get", "post"], function (e, i) {
        Z[i] = function (e, n, a, s) {
            return Z.isFunction(n) && (s = s || a, a = n, n = t), Z.ajax({
                type: i,
                url: e,
                data: n,
                success: a,
                dataType: s
            })
        }
    }), Z.extend({
        getScript: function (e, i) {
            return Z.get(e, t, i, "script")
        },
        getJSON: function (e, t, i) {
            return Z.get(e, t, i, "json")
        },
        ajaxSetup: function (e, t) {
            return t ? S(e, Z.ajaxSettings) : (t = e, e = Z.ajaxSettings), S(e, t), e
        },
        ajaxSettings: {
            url: Ci,
            isLocal: Ai.test($i[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Oi
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: $(Ii),
        ajaxTransport: $(Mi),
        ajax: function (e, i) {
            function n(e, i, n, r) {
                var c, h, v, y, w, k = i;
                2 !== b && (b = 2, l && clearTimeout(l), o = t, s = r || "", x.readyState = e > 0 ? 4 : 0, n && (y = T(d, x, n)), e >= 200 && 300 > e || 304 === e ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Z.lastModified[a] = w), w = x.getResponseHeader("Etag"), w && (Z.etag[a] = w)), 304 === e ? (k = "notmodified", c = !0) : (c = A(d, y), k = c.state, h = c.data, v = c.error, c = !v)) : (v = k, (!k || e) && (k = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (i || k) + "", c ? m.resolveWith(p, [h, k, x]) : m.rejectWith(p, [x, k, v]), x.statusCode(g), g = t, u && f.trigger("ajax" + (c ? "Success" : "Error"), [x, d, c ? h : v]), _.fireWith(p, [x, k]), u && (f.trigger("ajaxComplete", [x, d]), --Z.active || Z.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (i = e, e = t), i = i || {};
            var a, s, r, o, l, c, u, h, d = Z.ajaxSetup({}, i),
                p = d.context || d,
                f = p !== d && (p.nodeType || p instanceof Z) ? Z(p) : Z.event,
                m = Z.Deferred(),
                _ = Z.Callbacks("once memory"),
                g = d.statusCode || {}, v = {}, y = {}, b = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function (e, t) {
                        if (!b) {
                            var i = e.toLowerCase();
                            e = y[i] = y[i] || e, v[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return 2 === b ? s : null
                    },
                    getResponseHeader: function (e) {
                        var i;
                        if (2 === b) {
                            if (!r)
                                for (r = {}; i = Ti.exec(s);) r[i[1].toLowerCase()] = i[2];
                            i = r[e.toLowerCase()]
                        }
                        return i === t ? null : i
                    },
                    overrideMimeType: function (e) {
                        return b || (d.mimeType = e), this
                    },
                    abort: function (e) {
                        return e = e || w, o && o.abort(e), n(0, e), this
                    }
                };
            if (m.promise(x), x.success = x.done, x.error = x.fail, x.complete = _.add, x.statusCode = function (e) {
                if (e) {
                    var t;
                    if (2 > b)
                        for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status], x.always(t)
                }
                return this
            }, d.url = ((e || d.url) + "").replace(Si, "").replace(Ei, $i[1] + "//"), d.dataTypes = Z.trim(d.dataType || "*").toLowerCase().split(tt), null == d.crossDomain && (c = Li.exec(d.url.toLowerCase()), d.crossDomain = !(!c || c[1] === $i[1] && c[2] === $i[2] && (c[3] || ("http:" === c[1] ? 80 : 443)) == ($i[3] || ("http:" === $i[1] ? 80 : 443)))), d.data && d.processData && "string" != typeof d.data && (d.data = Z.param(d.data, d.traditional)), C(Ii, d, i, x), 2 === b) return x;
            if (u = d.global, d.type = d.type.toUpperCase(), d.hasContent = !zi.test(d.type), u && 0 === Z.active++ && Z.event.trigger("ajaxStart"), !d.hasContent && (d.data && (d.url += (Pi.test(d.url) ? "&" : "?") + d.data, delete d.data), a = d.url, d.cache === !1)) {
                var k = Z.now(),
                    $ = d.url.replace(Ni, "$1_=" + k);
                d.url = $ + ($ === d.url ? (Pi.test(d.url) ? "&" : "?") + "_=" + k : "")
            }(d.data && d.hasContent && d.contentType !== !1 || i.contentType) && x.setRequestHeader("Content-Type", d.contentType), d.ifModified && (a = a || d.url, Z.lastModified[a] && x.setRequestHeader("If-Modified-Since", Z.lastModified[a]), Z.etag[a] && x.setRequestHeader("If-None-Match", Z.etag[a])), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Oi + "; q=0.01" : "") : d.accepts["*"]);
            for (h in d.headers) x.setRequestHeader(h, d.headers[h]);
            if (d.beforeSend && (d.beforeSend.call(p, x, d) === !1 || 2 === b)) return x.abort();
            w = "abort";
            for (h in {
                success: 1,
                error: 1,
                complete: 1
            }) x[h](d[h]);
            if (o = C(Mi, d, i, x)) {
                x.readyState = 1, u && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (l = setTimeout(function () {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, o.send(v, n)
                } catch (S) {
                    if (!(2 > b)) throw S;
                    n(-1, S)
                }
            } else n(-1, "No Transport");
            return x
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Hi = [],
        qi = /\?/,
        Ri = /(=)\?(?=&|$)|\?\?/,
        Bi = Z.now();
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Hi.pop() || Z.expando + "_" + Bi++;
            return this[e] = !0, e
        }
    }), Z.ajaxPrefilter("json jsonp", function (i, n, a) {
        var s, r, o, l = i.data,
            c = i.url,
            u = i.jsonp !== !1,
            h = u && Ri.test(c),
            d = u && !h && "string" == typeof l && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Ri.test(l);
        return "jsonp" === i.dataTypes[0] || h || d ? (s = i.jsonpCallback = Z.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, r = e[s], h ? i.url = c.replace(Ri, "$1" + s) : d ? i.data = l.replace(Ri, "$1" + s) : u && (i.url += (qi.test(c) ? "&" : "?") + i.jsonp + "=" + s), i.converters["script json"] = function () {
            return o || Z.error(s + " was not called"), o[0]
        }, i.dataTypes[0] = "json", e[s] = function () {
            o = arguments
        }, a.always(function () {
            e[s] = r, i[s] && (i.jsonpCallback = n.jsonpCallback, Hi.push(s)), o && Z.isFunction(r) && r(o[0]), o = r = t
        }), "script") : void 0
    }), Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                return Z.globalEval(e), e
            }
        }
    }), Z.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), Z.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var i, n = q.head || q.getElementsByTagName("head")[0] || q.documentElement;
            return {
                send: function (a, s) {
                    i = q.createElement("script"), i.async = "async", e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function (e, a) {
                        (a || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, n && i.parentNode && n.removeChild(i), i = t, a || s(200, "success"))
                    }, n.insertBefore(i, n.firstChild)
                },
                abort: function () {
                    i && i.onload(0, 1)
                }
            }
        }
    });
    var Wi, Qi = e.ActiveXObject ? function () {
            for (var e in Wi) Wi[e](0, 1)
        } : !1,
        Vi = 0;
    Z.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && z() || E()
    } : z,
    function (e) {
        Z.extend(Z.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        })
    }(Z.ajaxSettings.xhr()), Z.support.ajax && Z.ajaxTransport(function (i) {
        if (!i.crossDomain || Z.support.cors) {
            var n;
            return {
                send: function (a, s) {
                    var r, o, l = i.xhr();
                    if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                        for (o in i.xhrFields) l[o] = i.xhrFields[o];
                    i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || a["X-Requested-With"] || (a["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (o in a) l.setRequestHeader(o, a[o])
                    } catch (c) {}
                    l.send(i.hasContent && i.data || null), n = function (e, a) {
                        var o, c, u, h, d;
                        try {
                            if (n && (a || 4 === l.readyState))
                                if (n = t, r && (l.onreadystatechange = Z.noop, Qi && delete Wi[r]), a) 4 !== l.readyState && l.abort();
                                else {
                                    o = l.status, u = l.getAllResponseHeaders(), h = {}, d = l.responseXML, d && d.documentElement && (h.xml = d);
                                    try {
                                        h.text = l.responseText
                                    } catch (p) {}
                                    try {
                                        c = l.statusText
                                    } catch (p) {
                                        c = ""
                                    }
                                    o || !i.isLocal || i.crossDomain ? 1223 === o && (o = 204) : o = h.text ? 200 : 404
                                }
                        } catch (f) {
                            a || s(-1, f)
                        }
                        h && s(o, c, h, u)
                    }, i.async ? 4 === l.readyState ? setTimeout(n, 0) : (r = ++Vi, Qi && (Wi || (Wi = {}, Z(e).unload(Qi)), Wi[r] = n), l.onreadystatechange = n) : n()
                },
                abort: function () {
                    n && n(0, 1)
                }
            }
        }
    });
    var Ui, Xi, Yi = /^(?:toggle|show|hide)$/,
        Ki = new RegExp("^(?:([-+])=|)(" + J + ")([a-z%]*)$", "i"),
        Gi = /queueHooks$/,
        Zi = [D],
        Ji = {
            "*": [
                function (e, t) {
                    var i, n, a = this.createTween(e, t),
                        s = Ki.exec(t),
                        r = a.cur(),
                        o = +r || 0,
                        l = 1,
                        c = 20;
                    if (s) {
                        if (i = +s[2], n = s[3] || (Z.cssNumber[e] ? "" : "px"), "px" !== n && o) {
                            o = Z.css(a.elem, e, !0) || i || 1;
                            do l = l || ".5", o /= l, Z.style(a.elem, e, o + n); while (l !== (l = a.cur() / r) && 1 !== l && --c)
                        }
                        a.unit = n, a.start = o, a.end = s[1] ? o + (s[1] + 1) * i : i
                    }
                    return a
                }
            ]
        };
    Z.Animation = Z.extend(N, {
        tweener: function (e, t) {
            Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var i, n = 0, a = e.length; a > n; n++) i = e[n], Ji[i] = Ji[i] || [], Ji[i].unshift(t)
        },
        prefilter: function (e, t) {
            t ? Zi.unshift(e) : Zi.push(e)
        }
    }), Z.Tween = I, I.prototype = {
        constructor: I,
        init: function (e, t, i, n, a, s) {
            this.elem = e, this.prop = i, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (Z.cssNumber[i] ? "" : "px")
        },
        cur: function () {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function (e) {
            var t, i = I.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function (e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, Z.each(["toggle", "show", "hide"], function (e, t) {
        var i = Z.fn[t];
        Z.fn[t] = function (n, a, s) {
            return null == n || "boolean" == typeof n || !e && Z.isFunction(n) && Z.isFunction(a) ? i.apply(this, arguments) : this.animate(M(t, !0), n, a, s)
        }
    }), Z.fn.extend({
        fadeTo: function (e, t, i, n) {
            return this.filter(g).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function (e, t, i, n) {
            var a = Z.isEmptyObject(e),
                s = Z.speed(t, i, n),
                r = function () {
                    var t = N(this, Z.extend({}, e), s);
                    a && t.stop(!0)
                };
            return a || s.queue === !1 ? this.each(r) : this.queue(s.queue, r)
        },
        stop: function (e, i, n) {
            var a = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = i, i = e, e = t), i && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    s = Z.timers,
                    r = Z._data(this);
                if (i) r[i] && r[i].stop && a(r[i]);
                else
                    for (i in r) r[i] && r[i].stop && Gi.test(i) && a(r[i]);
                for (i = s.length; i--;) s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                (t || !n) && Z.dequeue(this, e)
            })
        }
    }), Z.each({
        slideDown: M("show"),
        slideUp: M("hide"),
        slideToggle: M("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        Z.fn[e] = function (e, i, n) {
            return this.animate(t, e, i, n)
        }
    }), Z.speed = function (e, t, i) {
        var n = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: i || !i && t || Z.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !Z.isFunction(t) && t
        };
        return n.duration = Z.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in Z.fx.speeds ? Z.fx.speeds[n.duration] : Z.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function () {
            Z.isFunction(n.old) && n.old.call(this), n.queue && Z.dequeue(this, n.queue)
        }, n
    }, Z.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, Z.timers = [], Z.fx = I.prototype.init, Z.fx.tick = function () {
        var e, i = Z.timers,
            n = 0;
        for (Ui = Z.now(); n < i.length; n++) e = i[n], e() || i[n] !== e || i.splice(n--, 1);
        i.length || Z.fx.stop(), Ui = t
    }, Z.fx.timer = function (e) {
        e() && Z.timers.push(e) && !Xi && (Xi = setInterval(Z.fx.tick, Z.fx.interval))
    }, Z.fx.interval = 13, Z.fx.stop = function () {
        clearInterval(Xi), Xi = null
    }, Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Z.fx.step = {}, Z.expr && Z.expr.filters && (Z.expr.filters.animated = function (e) {
        return Z.grep(Z.timers, function (t) {
            return e === t.elem
        }).length
    });
    var en = /^(?:body|html)$/i;
    Z.fn.offset = function (e) {
        if (arguments.length) return e === t ? this : this.each(function (t) {
            Z.offset.setOffset(this, e, t)
        });
        var i, n, a, s, r, o, l, c = {
                top: 0,
                left: 0
            }, u = this[0],
            h = u && u.ownerDocument;
        if (h) return (n = h.body) === u ? Z.offset.bodyOffset(u) : (i = h.documentElement, Z.contains(i, u) ? ("undefined" != typeof u.getBoundingClientRect && (c = u.getBoundingClientRect()), a = O(h), s = i.clientTop || n.clientTop || 0, r = i.clientLeft || n.clientLeft || 0, o = a.pageYOffset || i.scrollTop, l = a.pageXOffset || i.scrollLeft, {
            top: c.top + o - s,
            left: c.left + l - r
        }) : c)
    }, Z.offset = {
        bodyOffset: function (e) {
            var t = e.offsetTop,
                i = e.offsetLeft;
            return Z.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Z.css(e, "marginTop")) || 0, i += parseFloat(Z.css(e, "marginLeft")) || 0), {
                top: t,
                left: i
            }
        },
        setOffset: function (e, t, i) {
            var n = Z.css(e, "position");
            "static" === n && (e.style.position = "relative");
            var a, s, r = Z(e),
                o = r.offset(),
                l = Z.css(e, "top"),
                c = Z.css(e, "left"),
                u = ("absolute" === n || "fixed" === n) && Z.inArray("auto", [l, c]) > -1,
                h = {}, d = {};
            u ? (d = r.position(), a = d.top, s = d.left) : (a = parseFloat(l) || 0, s = parseFloat(c) || 0), Z.isFunction(t) && (t = t.call(e, i, o)), null != t.top && (h.top = t.top - o.top + a), null != t.left && (h.left = t.left - o.left + s), "using" in t ? t.using.call(e, h) : r.css(h)
        }
    }, Z.fn.extend({
        position: function () {
            if (this[0]) {
                var e = this[0],
                    t = this.offsetParent(),
                    i = this.offset(),
                    n = en.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return i.top -= parseFloat(Z.css(e, "marginTop")) || 0, i.left -= parseFloat(Z.css(e, "marginLeft")) || 0, n.top += parseFloat(Z.css(t[0], "borderTopWidth")) || 0, n.left += parseFloat(Z.css(t[0], "borderLeftWidth")) || 0, {
                    top: i.top - n.top,
                    left: i.left - n.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || q.body; e && !en.test(e.nodeName) && "static" === Z.css(e, "position");) e = e.offsetParent;
                return e || q.body
            })
        }
    }), Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, i) {
        var n = /Y/.test(i);
        Z.fn[e] = function (a) {
            return Z.access(this, function (e, a, s) {
                var r = O(e);
                return s === t ? r ? i in r ? r[i] : r.document.documentElement[a] : e[a] : (r ? r.scrollTo(n ? Z(r).scrollLeft() : s, n ? s : Z(r).scrollTop()) : e[a] = s, void 0)
            }, e, a, arguments.length, null)
        }
    }), Z.each({
        Height: "height",
        Width: "width"
    }, function (e, i) {
        Z.each({
            padding: "inner" + e,
            content: i,
            "": "outer" + e
        }, function (n, a) {
            Z.fn[a] = function (a, s) {
                var r = arguments.length && (n || "boolean" != typeof a),
                    o = n || (a === !0 || s === !0 ? "margin" : "border");
                return Z.access(this, function (i, n, a) {
                    var s;
                    return Z.isWindow(i) ? i.document.documentElement["client" + e] : 9 === i.nodeType ? (s = i.documentElement, Math.max(i.body["scroll" + e], s["scroll" + e], i.body["offset" + e], s["offset" + e], s["client" + e])) : a === t ? Z.css(i, n, a, o) : Z.style(i, n, a, o)
                }, i, r ? a : t, r, null)
            }
        })
    }), e.jQuery = e.$ = Z, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return Z
    })
}(window),
function (e, t) {
    var i = function () {
        var t = e._data(document, "events");
        return t && t.click && e.grep(t.click, function (e) {
            return "rails" === e.namespace
        }).length
    };
    i() && e.error("jquery-ujs has already been loaded!");
    var n;
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input:file",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function (t) {
            var i = e('meta[name="csrf-token"]').attr("content");
            i && t.setRequestHeader("X-CSRF-Token", i)
        },
        fire: function (t, i, n) {
            var a = e.Event(i);
            return t.trigger(a, n), a.result !== !1
        },
        confirm: function (e) {
            return confirm(e)
        },
        ajax: function (t) {
            return e.ajax(t)
        },
        href: function (e) {
            return e.attr("href")
        },
        handleRemote: function (i) {
            var a, s, r, o, l, c, u, h;
            if (n.fire(i, "ajax:before")) {
                if (o = i.data("cross-domain"), l = o === t ? null : o, c = i.data("with-credentials") || null, u = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
                    a = i.attr("method"), s = i.attr("action"), r = i.serializeArray();
                    var d = i.data("ujs:submit-button");
                    d && (r.push(d), i.data("ujs:submit-button", null))
                } else i.is(n.inputChangeSelector) ? (a = i.data("method"), s = i.data("url"), r = i.serialize(), i.data("params") && (r = r + "&" + i.data("params"))) : (a = i.data("method"), s = n.href(i), r = i.data("params") || null);
                h = {
                    type: a || "GET",
                    data: r,
                    dataType: u,
                    beforeSend: function (e, a) {
                        return a.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + a.accepts.script), n.fire(i, "ajax:beforeSend", [e, a])
                    },
                    success: function (e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function (e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function (e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    xhrFields: {
                        withCredentials: c
                    },
                    crossDomain: l
                }, s && (h.url = s);
                var p = n.ajax(h);
                return i.trigger("ajax:send", p), p
            }
            return !1
        },
        handleMethod: function (i) {
            var a = n.href(i),
                s = i.data("method"),
                r = i.attr("target"),
                o = e("meta[name=csrf-token]").attr("content"),
                l = e("meta[name=csrf-param]").attr("content"),
                c = e('<form method="post" action="' + a + '"></form>'),
                u = '<input name="_method" value="' + s + '" type="hidden" />';
            l !== t && o !== t && (u += '<input name="' + l + '" value="' + o + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(u).appendTo("body"), c.submit()
        },
        disableFormElements: function (t) {
            t.find(n.disableSelector).each(function () {
                var t = e(this),
                    i = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with", t[i]()), t[i](t.data("disable-with")), t.prop("disabled", !0)
            })
        },
        enableFormElements: function (t) {
            t.find(n.enableSelector).each(function () {
                var t = e(this),
                    i = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") && t[i](t.data("ujs:enable-with")), t.prop("disabled", !1)
            })
        },
        allowAction: function (e) {
            var t, i = e.data("confirm"),
                a = !1;
            return i ? (n.fire(e, "confirm") && (a = n.confirm(i), t = n.fire(e, "confirm:complete", [a])), a && t) : !0
        },
        blankInputs: function (t, i, n) {
            var a, s, r = e(),
                o = i || "input,textarea",
                l = t.find(o);
            return l.each(function () {
                if (a = e(this), s = a.is(":checkbox,:radio") ? a.is(":checked") : a.val(), !s == !n) {
                    if (a.is(":radio") && l.filter('input:radio:checked[name="' + a.attr("name") + '"]').length) return !0;
                    r = r.add(a)
                }
            }), r.length ? r : !1
        },
        nonBlankInputs: function (e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function (t) {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
        },
        callFormSubmitBindings: function (i, n) {
            var a = i.data("events"),
                s = !0;
            return a !== t && a.submit !== t && e.each(a.submit, function (e, t) {
                return "function" == typeof t.handler ? s = t.handler(n) : void 0
            }), s
        },
        disableElement: function (e) {
            e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
                return n.stopEverything(e)
            })
        },
        enableElement: function (e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)), e.unbind("click.railsDisable")
        }
    }, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function (e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function () {
        n.enableElement(e(this))
    }), e(document).delegate(n.linkClickSelector, "click.rails", function (i) {
        var a = e(this),
            s = a.data("method"),
            r = a.data("params");
        if (!n.allowAction(a)) return n.stopEverything(i);
        if (a.is(n.linkDisableSelector) && n.disableElement(a), a.data("remote") !== t) {
            if (!(!i.metaKey && !i.ctrlKey || s && "GET" !== s || r)) return !0;
            var o = n.handleRemote(a);
            return o === !1 ? n.enableElement(a) : o.error(function () {
                n.enableElement(a)
            }), !1
        }
        return a.data("method") ? (n.handleMethod(a), !1) : void 0
    }), e(document).delegate(n.inputChangeSelector, "change.rails", function (t) {
        var i = e(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
    }), e(document).delegate(n.formSubmitSelector, "submit.rails", function (i) {
        var a = e(this),
            s = a.data("remote") !== t,
            r = n.blankInputs(a, n.requiredInputSelector),
            o = n.nonBlankInputs(a, n.fileInputSelector);
        if (!n.allowAction(a)) return n.stopEverything(i);
        if (r && a.attr("novalidate") == t && n.fire(a, "ajax:aborted:required", [r])) return n.stopEverything(i);
        if (s) {
            if (o) {
                setTimeout(function () {
                    n.disableFormElements(a)
                }, 13);
                var l = n.fire(a, "ajax:aborted:file", [o]);
                return l || setTimeout(function () {
                    n.enableFormElements(a)
                }, 13), l
            }
            return !e.support.submitBubbles && e().jquery < "1.7" && n.callFormSubmitBindings(a, i) === !1 ? n.stopEverything(i) : (n.handleRemote(a), !1)
        }
        setTimeout(function () {
            n.disableFormElements(a)
        }, 13)
    }), e(document).delegate(n.formInputClickSelector, "click.rails", function (t) {
        var i = e(this);
        if (!n.allowAction(i)) return n.stopEverything(t);
        var a = i.attr("name"),
            s = a ? {
                name: a,
                value: i.val()
            } : null;
        i.closest("form").data("ujs:submit-button", s)
    }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
        this == t.target && n.disableFormElements(e(this))
    }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function (t) {
        this == t.target && n.enableFormElements(e(this))
    }), e(function () {
        csrf_token = e("meta[name=csrf-token]").attr("content"), csrf_param = e("meta[name=csrf-param]").attr("content"), e('form input[name="' + csrf_param + '"]').val(csrf_token)
    }))
}(jQuery),
function () {
    var e, t, i, n, a, s, r, o, l, c, u, h, d, p, f, m, _, g, v, y, b, w, x, k, $, C, S, T, A, z, E, P, j, N, L, D, I, M, O, F, H, q, R, B, W, Q = {}.hasOwnProperty,
        V = [].indexOf || function (e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    r = 10, h = null, E = null, w = null, C = {}, c = null, M = (null != (W = document.cookie.match(/request_method=(\w+)/)) ? W[1].toUpperCase() : void 0) || "", B = null, _ = function (e) {
        var t;
        return q("page:fetch"), t = D(e), null != B && B.abort(), B = new XMLHttpRequest, B.open("GET", t, !0), B.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"), B.setRequestHeader("X-XHR-Referer", E), B.onload = function () {
            var t;
            return q("page:receive"), (t = A()) ? (P(e), o.apply(null, f(t)), j(), document.location.hash ? document.location.href = document.location.href : F(), q("page:load")) : document.location.href = e
        }, B.onloadend = function () {
            return B = null
        }, B.onabort = function () {
            return L()
        }, B.onerror = function () {
            return document.location.href = e
        }, B.send()
    }, m = function (e) {
        var t;
        return s(), t = C[e], null != B && B.abort(), o(t.title, t.body), z(t), q("page:restore")
    }, s = function () {
        return C[h.position] = {
            url: document.location.href,
            body: document.body,
            title: document.title,
            positionY: window.pageYOffset,
            positionX: window.pageXOffset
        }, l(r)
    }, T = function (e) {
        return null == e && (e = r), /^[\d]+$/.test(e) ? r = parseInt(e) : void 0
    }, l = function (e) {
        var t, i;
        for (t in C) Q.call(C, t) && (i = C[t], t <= h.position - e && (C[t] = null))
    }, o = function (t, i, n, a) {
        return document.title = t, document.documentElement.replaceChild(i, document.body), null != n && e.update(n), I(), a && d(), h = window.history.state, q("page:change")
    }, d = function () {
        var e, t, i, n, a, s, r, o, l, c, u, h;
        for (s = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')), r = 0, l = s.length; l > r; r++)
            if (a = s[r], "" === (u = a.type) || "text/javascript" === u) {
                for (t = document.createElement("script"), h = a.attributes, o = 0, c = h.length; c > o; o++) e = h[o], t.setAttribute(e.name, e.value);
                t.appendChild(document.createTextNode(a.innerHTML)), n = a.parentNode, i = a.nextSibling, n.removeChild(a), n.insertBefore(t, i)
            }
    }, I = function () {
        var e, t, i, n;
        for (t = Array.prototype.slice.call(document.body.getElementsByTagName("noscript")), i = 0, n = t.length; n > i; i++) e = t[i], e.parentNode.removeChild(e)
    }, P = function (e) {
        return e !== E ? window.history.pushState({
            turbolinks: !0,
            position: h.position + 1
        }, "", e) : void 0
    }, j = function () {
        var e, t;
        return (e = B.getResponseHeader("X-XHR-Redirected-To")) ? (t = D(e) === e ? document.location.hash : "", window.history.replaceState(h, "", e + t)) : void 0
    }, L = function () {
        return window.history.replaceState({
            turbolinks: !0,
            position: Date.now()
        }, "", document.location.href)
    }, N = function () {
        return h = window.history.state
    }, z = function (e) {
        return window.scrollTo(e.positionX, e.positionY)
    }, F = function () {
        return window.scrollTo(0, 0)
    }, D = function (e) {
        var t;
        return t = e, null == e.href && (t = document.createElement("A"), t.href = e), t.href.replace(t.hash, "")
    }, q = function (e) {
        var t;
        return t = document.createEvent("Events"), t.initEvent(e, !0, !0), document.dispatchEvent(t)
    }, S = function () {
        return !q("page:before-change")
    }, A = function () {
        var e, t, i, n, a, s;
        return t = function () {
            var e;
            return 400 <= (e = B.status) && 600 > e
        }, s = function () {
            return B.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
        }, n = function (e) {
            var t, i, n, a, s;
            for (a = e.head.childNodes, s = [], i = 0, n = a.length; n > i; i++) t = a[i], null != ("function" == typeof t.getAttribute ? t.getAttribute("data-turbolinks-track") : void 0) && s.push(t.src || t.href);
            return s
        }, e = function (e) {
            var t;
            return w || (w = n(document)), t = n(e), t.length !== w.length || a(t, w).length !== w.length
        }, a = function (e, t) {
            var i, n, a, s, r;
            for (e.length > t.length && (s = [t, e], e = s[0], t = s[1]), r = [], n = 0, a = e.length; a > n; n++) i = e[n], V.call(t, i) >= 0 && r.push(i);
            return r
        }, !t() && s() && (i = c(B.responseText), i && !e(i)) ? i : void 0
    }, f = function (t) {
        var i;
        return i = t.querySelector("title"), [null != i ? i.textContent : void 0, t.body, e.get(t).token, "runScripts"]
    }, e = {
        get: function (e) {
            var t;
            return null == e && (e = document), {
                node: t = e.querySelector('meta[name="csrf-token"]'),
                token: null != t ? "function" == typeof t.getAttribute ? t.getAttribute("content") : void 0 : void 0
            }
        },
        update: function (e) {
            var t;
            return t = this.get(), null != t.token && null != e && t.token !== e ? t.node.setAttribute("content", e) : void 0
        }
    }, i = function () {
        var e, t, i, n, a, s;
        t = function (e) {
            return (new DOMParser).parseFromString(e, "text/html")
        }, e = function (e) {
            var t;
            return t = document.implementation.createHTMLDocument(""), t.documentElement.innerHTML = e, t
        }, i = function (e) {
            var t;
            return t = document.implementation.createHTMLDocument(""), t.open("replace"), t.write(e), t.close(), t
        };
        try {
            if (window.DOMParser) return a = t("<html><body><p>test"), t
        } catch (r) {
            return n = r, a = e("<html><body><p>test"), e
        } finally {
            if (1 !== (null != a ? null != (s = a.body) ? s.childNodes.length : void 0 : void 0)) return i
        }
    }, b = function (e) {
        return e.defaultPrevented ? void 0 : (document.removeEventListener("click", g, !1), document.addEventListener("click", g, !1))
    }, g = function (e) {
        var t;
        return e.defaultPrevented || (t = p(e), "A" !== t.nodeName || v(e, t)) ? void 0 : (S() || R(t.href), e.preventDefault())
    }, p = function (e) {
        var t;
        for (t = e.target; t.parentNode && "A" !== t.nodeName;) t = t.parentNode;
        return t
    }, u = function (e) {
        return location.protocol !== e.protocol || location.host !== e.host
    }, t = function (e) {
        return (e.hash && D(e)) === D(location) || e.href === location.href + "#"
    }, k = function (e) {
        var t;
        return t = D(e), t.match(/\.[a-z]+(\?.*)?$/g) && !t.match(/\.html?(\?.*)?$/g)
    }, x = function (e) {
        for (var t; !t && e !== document;) t = null != e.getAttribute("data-no-turbolink"), e = e.parentNode;
        return t
    }, H = function (e) {
        return 0 !== e.target.length
    }, $ = function (e) {
        return e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    }, v = function (e, i) {
        return u(i) || t(i) || k(i) || x(i) || H(i) || $(e)
    }, y = function () {
        return L(), N(), c = i(), document.addEventListener("click", b, !0), window.addEventListener("popstate", function (e) {
            var t;
            return t = e.state, (null != t ? t.turbolinks : void 0) ? C[t.position] ? m(t.position) : R(e.target.location.href) : void 0
        }, !1)
    }, a = window.history && window.history.pushState && window.history.replaceState && void 0 !== window.history.state, n = !navigator.userAgent.match(/CriOS\//), O = "GET" === M || "" === M, a && n && O ? (R = function (e) {
        return E = document.location.href, s(), _(e)
    }, y()) : R = function (e) {
        return document.location.href = e
    }, this.Turbolinks = {
        visit: R,
        pagesCached: T
    }
}.call(this),
function (e, t) {
    function i(t, i) {
        var a, s, r, o = t.nodeName.toLowerCase();
        return "area" === o ? (a = t.parentNode, s = a.name, t.href && s && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + s + "]")[0], !! r && n(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && n(t)
    }

    function n(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function () {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var a = 0,
        s = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.ui.version || (e.extend(e.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        _focus: e.fn.focus,
        focus: function (t, i) {
            return "number" == typeof t ? this.each(function () {
                var n = this;
                setTimeout(function () {
                    e(n).focus(), i && i.call(n)
                }, t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function () {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function (i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var n, a, s = e(this[0]); s.length && s[0] !== document;) {
                    if (n = s.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (a = parseInt(s.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a;
                    s = s.parent()
                }
            return 0
        },
        uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++a)
            })
        },
        removeUniqueId: function () {
            return this.each(function () {
                s.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
            return function (i) {
                return !!e.data(i, t)
            }
        }) : function (t, i, n) {
            return !!e.data(t, n[3])
        },
        focusable: function (t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function (t) {
            var n = e.attr(t, "tabindex"),
                a = isNaN(n);
            return (a || n >= 0) && i(t, !a)
        }
    }), e(function () {
        var t = document.body,
            i = t.appendChild(i = document.createElement("div"));
        i.offsetHeight, e.extend(i.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), e.support.minHeight = 100 === i.offsetHeight, e.support.selectstart = "onselectstart" in i, t.removeChild(i).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (i, n) {
        function a(t, i, n, a) {
            return e.each(s, function () {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var s = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            r = n.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + n] = function (i) {
            return i === t ? o["inner" + n].call(this) : this.each(function () {
                e(this).css(r, a(this, i) + "px")
            })
        }, e.fn["outer" + n] = function (t, i) {
            return "number" != typeof t ? o["outer" + n].call(this, t) : this.each(function () {
                e(this).css(r, a(this, t, !0, i) + "px")
            })
        }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
        return function (i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), function () {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = 6 === parseFloat(t[1], 10)
    }(), e.fn.extend({
        disableSelection: function () {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                e.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function (t, i, n) {
                var a, s = e.ui[t].prototype;
                for (a in n) s.plugins[a] = s.plugins[a] || [], s.plugins[a].push([i, n[a]])
            },
            call: function (e, t, i) {
                var n, a = e.plugins[t];
                if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (n = 0; n < a.length; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
            }
        },
        contains: e.contains,
        hasScroll: function (t, i) {
            if ("hidden" === e(t).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                a = !1;
            return t[n] > 0 ? !0 : (t[n] = 1, a = t[n] > 0, t[n] = 0, a)
        },
        isOverAxis: function (e, t, i) {
            return e > t && t + i > e
        },
        isOver: function (t, i, n, a, s, r) {
            return e.ui.isOverAxis(t, n, s) && e.ui.isOverAxis(i, a, r)
        }
    }))
}(jQuery),
function (e, t) {
    var i = 0,
        n = Array.prototype.slice,
        a = e.cleanData;
    e.cleanData = function (t) {
        for (var i, n = 0; null != (i = t[n]); n++) try {
            e(i).triggerHandler("remove")
        } catch (s) {}
        a(t)
    }, e.widget = function (t, i, n) {
        var a, s, r, o, l = t.split(".")[0];
        t = t.split(".")[1], a = l + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][a.toLowerCase()] = function (t) {
            return !!e.data(t, a)
        }, e[l] = e[l] || {}, s = e[l][t], r = e[l][t] = function (e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new r(e, t)
        }, e.extend(r, s, {
            version: n.version,
            _proto: e.extend({}, n),
            _childConstructors: []
        }), o = new i, o.options = e.widget.extend({}, o.options), e.each(n, function (t, a) {
            e.isFunction(a) && (n[t] = function () {
                var e = function () {
                    return i.prototype[t].apply(this, arguments)
                }, n = function (e) {
                        return i.prototype[t].apply(this, e)
                    };
                return function () {
                    var t, i = this._super,
                        s = this._superApply;
                    return this._super = e, this._superApply = n, t = a.apply(this, arguments), this._super = i, this._superApply = s, t
                }
            }())
        }), r.prototype = e.widget.extend(o, {
            widgetEventPrefix: s ? o.widgetEventPrefix : t
        }, n, {
            constructor: r,
            namespace: l,
            widgetName: t,
            widgetBaseClass: a,
            widgetFullName: a
        }), s ? (e.each(s._childConstructors, function (t, i) {
            var n = i.prototype;
            e.widget(n.namespace + "." + n.widgetName, r, i._proto)
        }), delete s._childConstructors) : i._childConstructors.push(r), e.widget.bridge(t, r)
    }, e.widget.extend = function (i) {
        for (var a, s, r = n.call(arguments, 1), o = 0, l = r.length; l > o; o++)
            for (a in r[o]) s = r[o][a], r[o].hasOwnProperty(a) && s !== t && (i[a] = e.isPlainObject(s) ? e.isPlainObject(i[a]) ? e.widget.extend({}, i[a], s) : e.widget.extend({}, s) : s);
        return i
    }, e.widget.bridge = function (i, a) {
        var s = a.prototype.widgetFullName || i;
        e.fn[i] = function (r) {
            var o = "string" == typeof r,
                l = n.call(arguments, 1),
                c = this;
            return r = !o && l.length ? e.widget.extend.apply(null, [r].concat(l)) : r, o ? this.each(function () {
                var n, a = e.data(this, s);
                return a ? e.isFunction(a[r]) && "_" !== r.charAt(0) ? (n = a[r].apply(a, l), n !== a && n !== t ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : void 0) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'")
            }) : this.each(function () {
                var t = e.data(this, s);
                t ? t.option(r || {})._init() : e.data(this, s, new a(r, this))
            }), c
        }
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (t, n) {
            n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetName, this), e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === n && this.destroy()
                }
            }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (i, n) {
            var a, s, r, o = i;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, a = i.split("."), i = a.shift(), a.length) {
                    for (s = o[i] = e.widget.extend({}, this.options[i]), r = 0; r < a.length - 1; r++) s[a[r]] = s[a[r]] || {}, s = s[a[r]];
                    if (i = a.pop(), n === t) return s[i] === t ? null : s[i];
                    s[i] = n
                } else {
                    if (n === t) return this.options[i] === t ? null : this.options[i];
                    o[i] = n
                }
            return this._setOptions(o), this
        },
        _setOptions: function (e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (t, i, n) {
            var a, s = this;
            "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = a = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, a = this.widget()), e.each(n, function (n, r) {
                function o() {
                    return t || s.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? s[r] : r).apply(s, arguments) : void 0
                }
                "string" != typeof r && (o.guid = r.guid = r.guid || o.guid || e.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/),
                    c = l[1] + s.eventNamespace,
                    u = l[2];
                u ? a.delegate(u, c, o) : i.bind(c, o)
            })
        },
        _off: function (e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function (e, t) {
            function i() {
                return ("string" == typeof e ? n[e] : e).apply(n, arguments)
            }
            var n = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, n) {
            var a, s, r = this.options[t];
            if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], s = i.originalEvent)
                for (a in s) a in i || (i[a] = s[a]);
            return this.element.trigger(i, n), !(e.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (t, i) {
        e.Widget.prototype["_" + t] = function (n, a, s) {
            "string" == typeof a && (a = {
                effect: a
            });
            var r, o = a ? a === !0 || "number" == typeof a ? i : a.effect || i : t;
            a = a || {}, "number" == typeof a && (a = {
                duration: a
            }), r = !e.isEmptyObject(a), a.complete = s, a.delay && n.delay(a.delay), r && e.effects && (e.effects.effect[o] || e.uiBackCompat !== !1 && e.effects[o]) ? n[t](a) : o !== t && n[o] ? n[o](a.duration, a.easing, s) : n.queue(function (i) {
                e(this)[t](), s && s.call(n[0]), i()
            })
        }
    }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function () {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
}(jQuery),
function (e) {
    var t = !1;
    e(document).mouseup(function () {
        t = !1
    }), e.widget("ui.mouse", {
        version: "1.9.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function (e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function (i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var n = this,
                    a = 1 === i.which,
                    s = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                return a && !s && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    n.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                    return n._mouseMove(e)
                }, this._mouseUpDelegate = function (e) {
                    return n._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0
            }
        },
        _mouseMove: function (t) {
            return !e.ui.ie || document.documentMode >= 9 || t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function (t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function (e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    })
}(jQuery),
function (e, t) {
    function i(e, t, i) {
        return [parseInt(e[0], 10) * (d.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (d.test(e[1]) ? i / 100 : 1)]
    }

    function n(t, i) {
        return parseInt(e.css(t, i), 10) || 0
    }
    e.ui = e.ui || {};
    var a, s = Math.max,
        r = Math.abs,
        o = Math.round,
        l = /left|center|right/,
        c = /top|center|bottom/,
        u = /[\+\-]\d+%?/,
        h = /^\w+/,
        d = /%$/,
        p = e.fn.position;
    e.position = {
        scrollbarWidth: function () {
            if (a !== t) return a;
            var i, n, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                r = s.children()[0];
            return e("body").append(s), i = r.offsetWidth, s.css("overflow", "scroll"), n = r.offsetWidth, i === n && (n = s[0].clientWidth), s.remove(), a = i - n
        },
        getScrollInfo: function (t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x"),
                n = t.isWindow ? "" : t.element.css("overflow-y"),
                a = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                s = "scroll" === n || "auto" === n && t.height < t.element[0].scrollHeight;
            return {
                width: a ? e.position.scrollbarWidth() : 0,
                height: s ? e.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function (t) {
            var i = e(t || window),
                n = e.isWindow(i[0]);
            return {
                element: i,
                isWindow: n,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: n ? i.width() : i.outerWidth(),
                height: n ? i.height() : i.outerHeight()
            }
        }
    }, e.fn.position = function (t) {
        if (!t || !t.of) return p.apply(this, arguments);
        t = e.extend({}, t);
        var a, d, f, m, _, g = e(t.of),
            v = e.position.getWithinInfo(t.within),
            y = e.position.getScrollInfo(v),
            b = g[0],
            w = (t.collision || "flip").split(" "),
            x = {};
        return 9 === b.nodeType ? (d = g.width(), f = g.height(), m = {
            top: 0,
            left: 0
        }) : e.isWindow(b) ? (d = g.width(), f = g.height(), m = {
            top: g.scrollTop(),
            left: g.scrollLeft()
        }) : b.preventDefault ? (t.at = "left top", d = f = 0, m = {
            top: b.pageY,
            left: b.pageX
        }) : (d = g.outerWidth(), f = g.outerHeight(), m = g.offset()), _ = e.extend({}, m), e.each(["my", "at"], function () {
            var e, i, n = (t[this] || "").split(" ");
            1 === n.length && (n = l.test(n[0]) ? n.concat(["center"]) : c.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = l.test(n[0]) ? n[0] : "center", n[1] = c.test(n[1]) ? n[1] : "center", e = u.exec(n[0]), i = u.exec(n[1]), x[this] = [e ? e[0] : 0, i ? i[0] : 0], t[this] = [h.exec(n[0])[0], h.exec(n[1])[0]]
        }), 1 === w.length && (w[1] = w[0]), "right" === t.at[0] ? _.left += d : "center" === t.at[0] && (_.left += d / 2), "bottom" === t.at[1] ? _.top += f : "center" === t.at[1] && (_.top += f / 2), a = i(x.at, d, f), _.left += a[0], _.top += a[1], this.each(function () {
            var l, c, u = e(this),
                h = u.outerWidth(),
                p = u.outerHeight(),
                b = n(this, "marginLeft"),
                k = n(this, "marginTop"),
                $ = h + b + n(this, "marginRight") + y.width,
                C = p + k + n(this, "marginBottom") + y.height,
                S = e.extend({}, _),
                T = i(x.my, u.outerWidth(), u.outerHeight());
            "right" === t.my[0] ? S.left -= h : "center" === t.my[0] && (S.left -= h / 2), "bottom" === t.my[1] ? S.top -= p : "center" === t.my[1] && (S.top -= p / 2), S.left += T[0], S.top += T[1], e.support.offsetFractions || (S.left = o(S.left), S.top = o(S.top)), l = {
                marginLeft: b,
                marginTop: k
            }, e.each(["left", "top"], function (i, n) {
                e.ui.position[w[i]] && e.ui.position[w[i]][n](S, {
                    targetWidth: d,
                    targetHeight: f,
                    elemWidth: h,
                    elemHeight: p,
                    collisionPosition: l,
                    collisionWidth: $,
                    collisionHeight: C,
                    offset: [a[0] + T[0], a[1] + T[1]],
                    my: t.my,
                    at: t.at,
                    within: v,
                    elem: u
                })
            }), e.fn.bgiframe && u.bgiframe(), t.using && (c = function (e) {
                var i = m.left - S.left,
                    n = i + d - h,
                    a = m.top - S.top,
                    o = a + f - p,
                    l = {
                        target: {
                            element: g,
                            left: m.left,
                            top: m.top,
                            width: d,
                            height: f
                        },
                        element: {
                            element: u,
                            left: S.left,
                            top: S.top,
                            width: h,
                            height: p
                        },
                        horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                        vertical: 0 > o ? "top" : a > 0 ? "bottom" : "middle"
                    };
                h > d && r(i + n) < d && (l.horizontal = "center"), p > f && r(a + o) < f && (l.vertical = "middle"), l.important = s(r(i), r(n)) > s(r(a), r(o)) ? "horizontal" : "vertical", t.using.call(this, e, l)
            }), u.offset(e.extend(S, {
                using: c
            }))
        })
    }, e.ui.position = {
        fit: {
            left: function (e, t) {
                var i, n = t.within,
                    a = n.isWindow ? n.scrollLeft : n.offset.left,
                    r = n.width,
                    o = e.left - t.collisionPosition.marginLeft,
                    l = a - o,
                    c = o + t.collisionWidth - r - a;
                t.collisionWidth > r ? l > 0 && 0 >= c ? (i = e.left + l + t.collisionWidth - r - a, e.left += l - i) : e.left = c > 0 && 0 >= l ? a : l > c ? a + r - t.collisionWidth : a : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = s(e.left - o, e.left)
            },
            top: function (e, t) {
                var i, n = t.within,
                    a = n.isWindow ? n.scrollTop : n.offset.top,
                    r = t.within.height,
                    o = e.top - t.collisionPosition.marginTop,
                    l = a - o,
                    c = o + t.collisionHeight - r - a;
                t.collisionHeight > r ? l > 0 && 0 >= c ? (i = e.top + l + t.collisionHeight - r - a, e.top += l - i) : e.top = c > 0 && 0 >= l ? a : l > c ? a + r - t.collisionHeight : a : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = s(e.top - o, e.top)
            }
        },
        flip: {
            left: function (e, t) {
                var i, n, a = t.within,
                    s = a.offset.left + a.scrollLeft,
                    o = a.width,
                    l = a.isWindow ? a.scrollLeft : a.offset.left,
                    c = e.left - t.collisionPosition.marginLeft,
                    u = c - l,
                    h = c + t.collisionWidth - o - l,
                    d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                    p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                    f = -2 * t.offset[0];
                0 > u ? (i = e.left + d + p + f + t.collisionWidth - o - s, (0 > i || i < r(u)) && (e.left += d + p + f)) : h > 0 && (n = e.left - t.collisionPosition.marginLeft + d + p + f - l, (n > 0 || r(n) < h) && (e.left += d + p + f))
            },
            top: function (e, t) {
                var i, n, a = t.within,
                    s = a.offset.top + a.scrollTop,
                    o = a.height,
                    l = a.isWindow ? a.scrollTop : a.offset.top,
                    c = e.top - t.collisionPosition.marginTop,
                    u = c - l,
                    h = c + t.collisionHeight - o - l,
                    d = "top" === t.my[1],
                    p = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                    f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                    m = -2 * t.offset[1];
                0 > u ? (n = e.top + p + f + m + t.collisionHeight - o - s, e.top + p + f + m > u && (0 > n || n < r(u)) && (e.top += p + f + m)) : h > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - l, e.top + p + f + m > h && (i > 0 || r(i) < h) && (e.top += p + f + m))
            }
        },
        flipfit: {
            left: function () {
                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
            },
            top: function () {
                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function () {
        var t, i, n, a, s, r = document.getElementsByTagName("body")[0],
            o = document.createElement("div");
        t = document.createElement(r ? "div" : "body"), n = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, r && e.extend(n, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (s in n) t.style[s] = n[s];
        t.appendChild(o), i = r || document.documentElement, i.insertBefore(t, i.firstChild), o.style.cssText = "position: absolute; left: 10.7432222px;", a = e(o).offset().left, e.support.offsetFractions = a > 10 && 11 > a, t.innerHTML = "", i.removeChild(t)
    }(), e.uiBackCompat !== !1 && function (e) {
        var i = e.fn.position;
        e.fn.position = function (n) {
            if (!n || !n.offset) return i.call(this, n);
            var a = n.offset.split(" "),
                s = n.at.split(" ");
            return 1 === a.length && (a[1] = a[0]), /^\d/.test(a[0]) && (a[0] = "+" + a[0]), /^\d/.test(a[1]) && (a[1] = "+" + a[1]), 1 === s.length && (/left|center|right/.test(s[0]) ? s[1] = "center" : (s[1] = s[0], s[0] = "center")), i.call(this, e.extend(n, {
                at: s[0] + a[0] + " " + s[1] + a[1],
                offset: t
            }))
        }
    }(jQuery)
}(jQuery),
function (e) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function () {
            "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function (t) {
            var i = this.options;
            return this.helper || i.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () {
                e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function (t) {
            var i = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function (t, i) {
            if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var n = this._uiHash();
                if (this._trigger("drag", t, n) === !1) return this._mouseUp({}), !1;
                this.position = n.position
            }
            return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function (t) {
            var i = !1;
            e.ui.ddmanager && !this.options.dropBehaviour && (i = e.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1);
            for (var n = this.element[0], a = !1; n && (n = n.parentNode);) n == document && (a = !0);
            if (!a && "original" === this.options.helper) return !1;
            if ("invalid" == this.options.revert && !i || "valid" == this.options.revert && i || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, i)) {
                var s = this;
                e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    s._trigger("stop", t) !== !1 && s._clear()
                })
            } else this._trigger("stop", t) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function (t) {
            return e("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (t) {
            var i = this.options.handle && e(this.options.handle, this.element).length ? !1 : !0;
            return e(this.options.handle, this.element).find("*").andSelf().each(function () {
                this == t.target && (i = !0)
            }), i
        },
        _createHelper: function (t) {
            var i = this.options,
                n = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" == i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" == i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] == this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _adjustOffsetFromHelper: function (t) {
            "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" == this.cssPosition) {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var t = this.options;
            if ("parent" == t.containment && (t.containment = this.helper[0].parentNode), ("document" == t.containment || "window" == t.containment) && (this.containment = ["document" == t.containment ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == t.containment ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == t.containment ? 0 : e(window).scrollLeft()) + e("document" == t.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == t.containment ? 0 : e(window).scrollTop()) + (e("document" == t.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(t.containment) || t.containment.constructor == Array) t.containment.constructor == Array && (this.containment = t.containment);
            else {
                var i = e(t.containment),
                    n = i[0];
                if (!n) return;
                i.offset();
                var a = "hidden" != e(n).css("overflow");
                this.containment = [(parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0), (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0), (a ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (a ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i
            }
        },
        _convertPositionTo: function (t, i) {
            i || (i = this.position);
            var n = "absolute" == t ? 1 : -1,
                a = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                s = /(html|body)/i.test(a[0].tagName);
            return {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : a.scrollTop()) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : a.scrollLeft()) * n
            }
        },
        _generatePosition: function (t) {
            var i = this.options,
                n = "absolute" != this.cssPosition || this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = /(html|body)/i.test(n[0].tagName),
                s = t.pageX,
                r = t.pageY;
            if (this.originalPosition) {
                var o;
                if (this.containment) {
                    if (this.relative_container) {
                        var l = this.relative_container.offset();
                        o = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top]
                    } else o = this.containment;
                    t.pageX - this.offset.click.left < o[0] && (s = o[0] + this.offset.click.left), t.pageY - this.offset.click.top < o[1] && (r = o[1] + this.offset.click.top), t.pageX - this.offset.click.left > o[2] && (s = o[2] + this.offset.click.left), t.pageY - this.offset.click.top > o[3] && (r = o[3] + this.offset.click.top)
                }
                if (i.grid) {
                    var c = i.grid[1] ? this.originalPageY + Math.round((r - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY;
                    r = o ? c - this.offset.click.top < o[1] || c - this.offset.click.top > o[3] ? c - this.offset.click.top < o[1] ? c + i.grid[1] : c - i.grid[1] : c : c;
                    var u = i.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX;
                    s = o ? u - this.offset.click.left < o[0] || u - this.offset.click.left > o[2] ? u - this.offset.click.left < o[0] ? u + i.grid[0] : u - i.grid[0] : u : u
                }
            }
            return {
                top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (t, i, n) {
            return n = n || this._uiHash(), e.ui.plugin.call(this, t, [i, n]), "drag" == t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, n)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, i) {
            var n = e(this).data("draggable"),
                a = n.options,
                s = e.extend({}, i, {
                    item: n.element
                });
            n.sortables = [], e(a.connectToSortable).each(function () {
                var i = e.data(this, "sortable");
                i && !i.options.disabled && (n.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", t, s))
            })
        },
        stop: function (t, i) {
            var n = e(this).data("draggable"),
                a = e.extend({}, i, {
                    item: n.element
                });
            e.each(n.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" == n.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, a))
            })
        },
        drag: function (t, i) {
            var n = e(this).data("draggable"),
                a = this;
            e.each(n.sortables, function () {
                var s = !1,
                    r = this;
                this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (s = !0, e.each(n.sortables, function () {
                    return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this != r && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(r.instance.element[0], this.instance.element[0]) && (s = !1), s
                })), s ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(a).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return i.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", t), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", t), n.dropped = !1)
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var t = e("body"),
                i = e(this).data("draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor")), t.css("cursor", i.cursor)
        },
        stop: function () {
            var t = e(this).data("draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function (t, i) {
            var n = e(i.helper),
                a = e(this).data("draggable").options;
            n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity)
        },
        stop: function (t, i) {
            var n = e(this).data("draggable").options;
            n._opacity && e(i.helper).css("opacity", n._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var t = e(this).data("draggable");
            t.scrollParent[0] != document && "HTML" != t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function (t) {
            var i = e(this).data("draggable"),
                n = i.options,
                a = !1;
            i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (n.axis && "x" == n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = a = i.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = a = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" == n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = a = i.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = a = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" == n.axis || (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? a = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (a = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed))), n.axis && "y" == n.axis || (t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? a = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (a = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function () {
            var t = e(this).data("draggable"),
                i = t.options;
            t.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
                var i = e(this),
                    n = i.offset();
                this != t.element[0] && t.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        },
        drag: function (t, i) {
            for (var n = e(this).data("draggable"), a = n.options, s = a.snapTolerance, r = i.offset.left, o = r + n.helperProportions.width, l = i.offset.top, c = l + n.helperProportions.height, u = n.snapElements.length - 1; u >= 0; u--) {
                var h = n.snapElements[u].left,
                    d = h + n.snapElements[u].width,
                    p = n.snapElements[u].top,
                    f = p + n.snapElements[u].height;
                if (r > h - s && d + s > r && l > p - s && f + s > l || r > h - s && d + s > r && c > p - s && f + s > c || o > h - s && d + s > o && l > p - s && f + s > l || o > h - s && d + s > o && c > p - s && f + s > c) {
                    if ("inner" != a.snapMode) {
                        var m = Math.abs(p - c) <= s,
                            _ = Math.abs(f - l) <= s,
                            g = Math.abs(h - o) <= s,
                            v = Math.abs(d - r) <= s;
                        m && (i.position.top = n._convertPositionTo("relative", {
                            top: p - n.helperProportions.height,
                            left: 0
                        }).top - n.margins.top), _ && (i.position.top = n._convertPositionTo("relative", {
                            top: f,
                            left: 0
                        }).top - n.margins.top), g && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h - n.helperProportions.width
                        }).left - n.margins.left), v && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: d
                        }).left - n.margins.left)
                    }
                    var y = m || _ || g || v;
                    if ("outer" != a.snapMode) {
                        var m = Math.abs(p - l) <= s,
                            _ = Math.abs(f - c) <= s,
                            g = Math.abs(h - r) <= s,
                            v = Math.abs(d - o) <= s;
                        m && (i.position.top = n._convertPositionTo("relative", {
                            top: p,
                            left: 0
                        }).top - n.margins.top), _ && (i.position.top = n._convertPositionTo("relative", {
                            top: f - n.helperProportions.height,
                            left: 0
                        }).top - n.margins.top), g && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h
                        }).left - n.margins.left), v && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: d - n.helperProportions.width
                        }).left - n.margins.left)
                    }!n.snapElements[u].snapping && (m || _ || g || v || y) && n.options.snap.snap && n.options.snap.snap.call(n.element, t, e.extend(n._uiHash(), {
                        snapItem: n.snapElements[u].item
                    })), n.snapElements[u].snapping = m || _ || g || v || y
                } else n.snapElements[u].snapping && n.options.snap.release && n.options.snap.release.call(n.element, t, e.extend(n._uiHash(), {
                    snapItem: n.snapElements[u].item
                })), n.snapElements[u].snapping = !1
            }
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function () {
            var t = e(this).data("draggable").options,
                i = e.makeArray(e(t.stack)).sort(function (t, i) {
                    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
                });
            if (i.length) {
                var n = parseInt(i[0].style.zIndex) || 0;
                e(i).each(function (e) {
                    this.style.zIndex = n + e
                }), this[0].style.zIndex = n + i.length
            }
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function (t, i) {
            var n = e(i.helper),
                a = e(this).data("draggable").options;
            n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex)
        },
        stop: function (t, i) {
            var n = e(this).data("draggable").options;
            n._zIndex && e(i.helper).css("zIndex", n._zIndex)
        }
    })
}(jQuery),
function (e) {
    e.widget("ui.resizable", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function () {
            var t = this,
                i = this.options;
            if (this.element.addClass("ui-resizable"), e.extend(this, {
                _aspectRatio: !! i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = i.handles || (e(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this.handles.constructor == String) {
                "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var n = this.handles.split(",");
                this.handles = {};
                for (var a = 0; a < n.length; a++) {
                    var s = e.trim(n[a]),
                        r = "ui-resizable-" + s,
                        o = e('<div class="ui-resizable-handle ' + r + '"></div>');
                    o.css({
                        zIndex: i.zIndex
                    }), "se" == s && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(o)
                }
            }
            this._renderAxis = function (t) {
                t = t || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor == String && (this.handles[i] = e(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var n = e(this.handles[i], this.element),
                            a = 0;
                        a = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth();
                        var s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        t.css(s, a), this._proportionallyResize()
                    }
                    e(this.handles[i]).length
                }
            }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                if (!t.resizing) {
                    if (this.className) var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    t.axis = e && e[1] ? e[1] : "se"
                }
            }), i.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                i.disabled || (e(this).removeClass("ui-resizable-autohide"), t._handles.show())
            }).mouseleave(function () {
                i.disabled || t.resizing || (e(this).addClass("ui-resizable-autohide"), t._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var t = function (t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                t(this.element);
                var i = this.element;
                this.originalElement.css({
                    position: i.css("position"),
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: i.css("top"),
                    left: i.css("left")
                }).insertAfter(i), i.remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
        },
        _mouseCapture: function (t) {
            var i = !1;
            for (var n in this.handles) e(this.handles[n])[0] == t.target && (i = !0);
            return !this.options.disabled && i
        },
        _mouseStart: function (i) {
            var n = this.options,
                a = this.element.position(),
                s = this.element;
            this.resizing = !0, this.documentScroll = {
                top: e(document).scrollTop(),
                left: e(document).scrollLeft()
            }, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({
                position: "absolute",
                top: a.top,
                left: a.left
            }), this._renderProxy();
            var r = t(this.helper.css("left")),
                o = t(this.helper.css("top"));
            n.containment && (r += e(n.containment).scrollLeft() || 0, o += e(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: r,
                top: o
            }, this.size = this._helper ? {
                width: s.outerWidth(),
                height: s.outerHeight()
            } : {
                width: s.width(),
                height: s.height()
            }, this.originalSize = this._helper ? {
                width: s.outerWidth(),
                height: s.outerHeight()
            } : {
                width: s.width(),
                height: s.height()
            }, this.originalPosition = {
                left: r,
                top: o
            }, this.sizeDiff = {
                width: s.outerWidth() - s.width(),
                height: s.outerHeight() - s.height()
            }, this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            }, this.aspectRatio = "number" == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var l = e(".ui-resizable-" + this.axis).css("cursor");
            return e("body").css("cursor", "auto" == l ? this.axis + "-resize" : l), s.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        },
        _mouseDrag: function (e) {
            var t = this.helper,
                i = (this.options, this.originalMousePosition),
                n = this.axis,
                a = e.pageX - i.left || 0,
                s = e.pageY - i.top || 0,
                r = this._change[n];
            if (!r) return !1;
            var o = r.apply(this, [e, a, s]);
            return this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (o = this._updateRatio(o, e)), o = this._respectSize(o, e), this._propagate("resize", e), t.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(o), this._trigger("resize", e, this.ui()), !1
        },
        _mouseStop: function (t) {
            this.resizing = !1;
            var i = this.options,
                n = this;
            if (this._helper) {
                var a = this._proportionallyResizeElements,
                    s = a.length && /textarea/i.test(a[0].nodeName),
                    r = s && e.ui.hasScroll(a[0], "left") ? 0 : n.sizeDiff.height,
                    o = s ? 0 : n.sizeDiff.width,
                    l = {
                        width: n.helper.width() - o,
                        height: n.helper.height() - r
                    }, c = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null,
                    u = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
                i.animate || this.element.css(e.extend(l, {
                    top: u,
                    left: c
                })), n.helper.height(n.size.height), n.helper.width(n.size.width), this._helper && !i.animate && this._proportionallyResize()
            }
            return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function (e) {
            var t, n, a, s, r, o = this.options;
            r = {
                minWidth: i(o.minWidth) ? o.minWidth : 0,
                maxWidth: i(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: i(o.minHeight) ? o.minHeight : 0,
                maxHeight: i(o.maxHeight) ? o.maxHeight : 1 / 0
            }, (this._aspectRatio || e) && (t = r.minHeight * this.aspectRatio, a = r.minWidth / this.aspectRatio, n = r.maxHeight * this.aspectRatio, s = r.maxWidth / this.aspectRatio, t > r.minWidth && (r.minWidth = t), a > r.minHeight && (r.minHeight = a), n < r.maxWidth && (r.maxWidth = n), s < r.maxHeight && (r.maxHeight = s)), this._vBoundaries = r
        },
        _updateCache: function (e) {
            this.options, this.offset = this.helper.offset(), i(e.left) && (this.position.left = e.left), i(e.top) && (this.position.top = e.top), i(e.height) && (this.size.height = e.height), i(e.width) && (this.size.width = e.width)
        },
        _updateRatio: function (e) {
            var t = (this.options, this.position),
                n = this.size,
                a = this.axis;
            return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio), "sw" == a && (e.left = t.left + (n.width - e.width), e.top = null), "nw" == a && (e.top = t.top + (n.height - e.height), e.left = t.left + (n.width - e.width)), e
        },
        _respectSize: function (e, t) {
            var n = (this.helper, this._vBoundaries),
                a = (this._aspectRatio || t.shiftKey, this.axis),
                s = i(e.width) && n.maxWidth && n.maxWidth < e.width,
                r = i(e.height) && n.maxHeight && n.maxHeight < e.height,
                o = i(e.width) && n.minWidth && n.minWidth > e.width,
                l = i(e.height) && n.minHeight && n.minHeight > e.height;
            o && (e.width = n.minWidth), l && (e.height = n.minHeight), s && (e.width = n.maxWidth), r && (e.height = n.maxHeight);
            var c = this.originalPosition.left + this.originalSize.width,
                u = this.position.top + this.size.height,
                h = /sw|nw|w/.test(a),
                d = /nw|ne|n/.test(a);
            o && h && (e.left = c - n.minWidth), s && h && (e.left = c - n.maxWidth), l && d && (e.top = u - n.minHeight), r && d && (e.top = u - n.maxHeight);
            var p = !e.width && !e.height;
            return p && !e.left && e.top ? e.top = null : p && !e.top && e.left && (e.left = null), e
        },
        _proportionallyResize: function () {
            if (this.options, this._proportionallyResizeElements.length)
                for (var t = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                    var n = this._proportionallyResizeElements[i];
                    if (!this.borderDif) {
                        var a = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")],
                            s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")];
                        this.borderDif = e.map(a, function (e, t) {
                            var i = parseInt(e, 10) || 0,
                                n = parseInt(s[t], 10) || 0;
                            return i + n
                        })
                    }
                    n.css({
                        height: t.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: t.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function () {
            var t = this.element,
                i = this.options;
            if (this.elementOffset = t.offset(), this._helper) {
                this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                var n = e.ui.ie6 ? 1 : 0,
                    a = e.ui.ie6 ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + a,
                    height: this.element.outerHeight() + a,
                    position: "absolute",
                    left: this.elementOffset.left - n + "px",
                    top: this.elementOffset.top - n + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (e, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function (e, t) {
                var i = (this.options, this.originalSize),
                    n = this.originalPosition;
                return {
                    left: n.left + t,
                    width: i.width - t
                }
            },
            n: function (e, t, i) {
                var n = (this.options, this.originalSize),
                    a = this.originalPosition;
                return {
                    top: a.top + i,
                    height: n.height - i
                }
            },
            s: function (e, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function (t, i, n) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
            },
            sw: function (t, i, n) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
            },
            ne: function (t, i, n) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
            },
            nw: function (t, i, n) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
            }
        },
        _propagate: function (t, i) {
            e.ui.plugin.call(this, t, [i, this.ui()]), "resize" != t && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), e.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var t = e(this).data("resizable"),
                i = t.options,
                n = function (t) {
                    e(t).each(function () {
                        var t = e(this);
                        t.data("resizable-alsoresize", {
                            width: parseInt(t.width(), 10),
                            height: parseInt(t.height(), 10),
                            left: parseInt(t.css("left"), 10),
                            top: parseInt(t.css("top"), 10)
                        })
                    })
                };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : e.each(i.alsoResize, function (e) {
                n(e)
            })
        },
        resize: function (t, i) {
            var n = e(this).data("resizable"),
                a = n.options,
                s = n.originalSize,
                r = n.originalPosition,
                o = {
                    height: n.size.height - s.height || 0,
                    width: n.size.width - s.width || 0,
                    top: n.position.top - r.top || 0,
                    left: n.position.left - r.left || 0
                }, l = function (t, n) {
                    e(t).each(function () {
                        var t = e(this),
                            a = e(this).data("resizable-alsoresize"),
                            s = {}, r = n && n.length ? n : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        e.each(r, function (e, t) {
                            var i = (a[t] || 0) + (o[t] || 0);
                            i && i >= 0 && (s[t] = i || null)
                        }), t.css(s)
                    })
                };
            "object" != typeof a.alsoResize || a.alsoResize.nodeType ? l(a.alsoResize) : e.each(a.alsoResize, function (e, t) {
                l(e, t)
            })
        },
        stop: function () {
            e(this).removeData("resizable-alsoresize")
        }
    }), e.ui.plugin.add("resizable", "animate", {
        stop: function (t) {
            var i = e(this).data("resizable"),
                n = i.options,
                a = i._proportionallyResizeElements,
                s = a.length && /textarea/i.test(a[0].nodeName),
                r = s && e.ui.hasScroll(a[0], "left") ? 0 : i.sizeDiff.height,
                o = s ? 0 : i.sizeDiff.width,
                l = {
                    width: i.size.width - o,
                    height: i.size.height - r
                }, c = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(e.extend(l, u && c ? {
                top: u,
                left: c
            } : {}), {
                duration: n.animateDuration,
                easing: n.animateEasing,
                step: function () {
                    var n = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    a && a.length && e(a[0]).css({
                        width: n.width,
                        height: n.height
                    }), i._updateCache(n), i._propagate("resize", t)
                }
            })
        }
    }), e.ui.plugin.add("resizable", "containment", {
        start: function () {
            var i = e(this).data("resizable"),
                n = i.options,
                a = i.element,
                s = n.containment,
                r = s instanceof e ? s.get(0) : /parent/.test(s) ? a.parent().get(0) : s;
            if (r)
                if (i.containerElement = e(r), /document/.test(s) || s == document) i.containerOffset = {
                    left: 0,
                    top: 0
                }, i.containerPosition = {
                    left: 0,
                    top: 0
                }, i.parentData = {
                    element: e(document),
                    left: 0,
                    top: 0,
                    width: e(document).width(),
                    height: e(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var o = e(r),
                        l = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function (e, i) {
                        l[e] = t(o.css("padding" + i))
                    }), i.containerOffset = o.offset(), i.containerPosition = o.position(), i.containerSize = {
                        height: o.innerHeight() - l[3],
                        width: o.innerWidth() - l[1]
                    };
                    var c = i.containerOffset,
                        u = i.containerSize.height,
                        h = i.containerSize.width,
                        d = e.ui.hasScroll(r, "left") ? r.scrollWidth : h,
                        p = e.ui.hasScroll(r) ? r.scrollHeight : u;
                    i.parentData = {
                        element: r,
                        left: c.left,
                        top: c.top,
                        width: d,
                        height: p
                    }
                }
        },
        resize: function (t) {
            var i = e(this).data("resizable"),
                n = i.options,
                a = (i.containerSize, i.containerOffset),
                s = (i.size, i.position),
                r = i._aspectRatio || t.shiftKey,
                o = {
                    top: 0,
                    left: 0
                }, l = i.containerElement;
            l[0] != document && /static/.test(l.css("position")) && (o = a), s.left < (i._helper ? a.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - a.left : i.position.left - o.left), r && (i.size.height = i.size.width / i.aspectRatio), i.position.left = n.helper ? a.left : 0), s.top < (i._helper ? a.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - a.top : i.position.top), r && (i.size.width = i.size.height * i.aspectRatio), i.position.top = i._helper ? a.top : 0), i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top;
            var c = Math.abs((i._helper ? i.offset.left - o.left : i.offset.left - o.left) + i.sizeDiff.width),
                u = Math.abs((i._helper ? i.offset.top - o.top : i.offset.top - a.top) + i.sizeDiff.height),
                h = i.containerElement.get(0) == i.element.parent().get(0),
                d = /relative|absolute/.test(i.containerElement.css("position"));
            h && d && (c -= i.parentData.left), c + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - c, r && (i.size.height = i.size.width / i.aspectRatio)), u + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - u, r && (i.size.width = i.size.height * i.aspectRatio))
        },
        stop: function () {
            var t = e(this).data("resizable"),
                i = t.options,
                n = (t.position, t.containerOffset),
                a = t.containerPosition,
                s = t.containerElement,
                r = e(t.helper),
                o = r.offset(),
                l = r.outerWidth() - t.sizeDiff.width,
                c = r.outerHeight() - t.sizeDiff.height;
            t._helper && !i.animate && /relative/.test(s.css("position")) && e(this).css({
                left: o.left - a.left - n.left,
                width: l,
                height: c
            }), t._helper && !i.animate && /static/.test(s.css("position")) && e(this).css({
                left: o.left - a.left - n.left,
                width: l,
                height: c
            })
        }
    }), e.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var t = e(this).data("resizable"),
                i = t.options,
                n = t.size;
            t.ghost = t.originalElement.clone(), t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: n.height,
                width: n.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
        },
        resize: function () {
            var t = e(this).data("resizable");
            t.options, t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function () {
            var t = e(this).data("resizable");
            t.options, t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    }), e.ui.plugin.add("resizable", "grid", {
        resize: function (t) {
            var i = e(this).data("resizable"),
                n = i.options,
                a = i.size,
                s = i.originalSize,
                r = i.originalPosition,
                o = i.axis;
            n._aspectRatio || t.shiftKey, n.grid = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid;
            var l = Math.round((a.width - s.width) / (n.grid[0] || 1)) * (n.grid[0] || 1),
                c = Math.round((a.height - s.height) / (n.grid[1] || 1)) * (n.grid[1] || 1);
            /^(se|s|e)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + c) : /^(ne)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + c, i.position.top = r.top - c) : /^(sw)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + c, i.position.left = r.left - l) : (i.size.width = s.width + l, i.size.height = s.height + c, i.position.top = r.top - c, i.position.left = r.left - l)
        }
    });
    var t = function (e) {
        return parseInt(e, 10) || 0
    }, i = function (e) {
            return !isNaN(parseInt(e, 10))
        }
}(jQuery),
function (e) {
    var t = 0;
    e.widget("ui.autocomplete", {
        version: "1.9.2",
        defaultElement: "<input>",
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function () {
            var t, i, n;
            this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (a) {
                    if (this.element.prop("readOnly")) return t = !0, n = !0, i = !0, void 0;
                    t = !1, n = !1, i = !1;
                    var s = e.ui.keyCode;
                    switch (a.keyCode) {
                    case s.PAGE_UP:
                        t = !0, this._move("previousPage", a);
                        break;
                    case s.PAGE_DOWN:
                        t = !0, this._move("nextPage", a);
                        break;
                    case s.UP:
                        t = !0, this._keyEvent("previous", a);
                        break;
                    case s.DOWN:
                        t = !0, this._keyEvent("next", a);
                        break;
                    case s.ENTER:
                    case s.NUMPAD_ENTER:
                        this.menu.active && (t = !0, a.preventDefault(), this.menu.select(a));
                        break;
                    case s.TAB:
                        this.menu.active && this.menu.select(a);
                        break;
                    case s.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term), this.close(a), a.preventDefault());
                        break;
                    default:
                        i = !0, this._searchTimeout(a)
                    }
                },
                keypress: function (n) {
                    if (t) return t = !1, n.preventDefault(), void 0;
                    if (!i) {
                        var a = e.ui.keyCode;
                        switch (n.keyCode) {
                        case a.PAGE_UP:
                            this._move("previousPage", n);
                            break;
                        case a.PAGE_DOWN:
                            this._move("nextPage", n);
                            break;
                        case a.UP:
                            this._keyEvent("previous", n);
                            break;
                        case a.DOWN:
                            this._keyEvent("next", n)
                        }
                    }
                },
                input: function (e) {
                    return n ? (n = !1, e.preventDefault(), void 0) : (this._searchTimeout(e), void 0)
                },
                focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function (e) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(e), this._change(e), void 0)
                }
            }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
                input: e(),
                role: null
            }).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {
                mousedown: function (t) {
                    t.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    e(t.target).closest(".ui-menu-item").length || this._delay(function () {
                        var t = this;
                        this.document.one("mousedown", function (n) {
                            n.target === t.element[0] || n.target === i || e.contains(i, n.target) || t.close()
                        })
                    })
                },
                menufocus: function (t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function () {
                        e(t.target).trigger(t.originalEvent)
                    }), void 0;
                    var n = i.item.data("ui-autocomplete-item") || i.item.data("item.autocomplete");
                    !1 !== this._trigger("focus", t, {
                        item: n
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value) : this.liveRegion.text(n.value)
                },
                menuselect: function (e, t) {
                    var i = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"),
                        n = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function () {
                        this.previous = n, this.selectedItem = i
                    })), !1 !== this._trigger("select", e, {
                        item: i
                    }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                }
            }), this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), e.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (e, t) {
            this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this.document.find(t || "body")[0]), "disabled" === e && t && this.xhr && this.xhr.abort()
        },
        _isMultiLine: function () {
            return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
        },
        _initSource: function () {
            var t, i, n = this;
            e.isArray(this.options.source) ? (t = this.options.source, this.source = function (i, n) {
                n(e.ui.autocomplete.filter(t, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (t, a) {
                n.xhr && n.xhr.abort(), n.xhr = e.ajax({
                    url: i,
                    data: t,
                    dataType: "json",
                    success: function (e) {
                        a(e)
                    },
                    error: function () {
                        a([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (e) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
            }, this.options.delay)
        },
        search: function (e, t) {
            return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
        },
        _search: function (e) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: e
            }, this._response())
        },
        _response: function () {
            var e = this,
                i = ++t;
            return function (n) {
                i === t && e.__response(n), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function (e) {
            e && (e = this._normalize(e)), this._trigger("response", null, {
                content: e
            }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
        },
        close: function (e) {
            this.cancelSearch = !0, this._close(e)
        },
        _close: function (e) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
        },
        _change: function (e) {
            this.previous !== this._value() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function (t) {
            return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function (t) {
            var i = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(i, t), this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (t, i) {
            var n = this;
            e.each(i, function (e, i) {
                n._renderItemData(t, i)
            })
        },
        _renderItemData: function (e, t) {
            return this._renderItem(e, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function (t, i) {
            return e("<li>").append(e("<a>").text(i.label)).appendTo(t)
        },
        _move: function (e, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[e](t), void 0) : (this.search(null, t), void 0)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (e, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
        }
    }), e.extend(e.ui.autocomplete, {
        escapeRegex: function (e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (t, i) {
            var n = new RegExp(e.ui.autocomplete.escapeRegex(i), "i");
            return e.grep(t, function (e) {
                return n.test(e.label || e.value || e)
            })
        }
    }), e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (e) {
                    return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (e) {
            var t;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (t = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
}(jQuery),
function (e) {
    var t, i, n, a, s = "ui-button ui-widget ui-state-default ui-corner-all",
        r = "ui-state-hover ui-state-active ",
        o = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        l = function () {
            var t = e(this).find(":ui-button");
            setTimeout(function () {
                t.button("refresh")
            }, 1)
        }, c = function (t) {
            var i = t.name,
                n = t.form,
                a = e([]);
            return i && (a = n ? e(n).find("[name='" + i + "']") : e("[name='" + i + "']", t.ownerDocument).filter(function () {
                return !this.form
            })), a
        };
    e.widget("ui.button", {
        version: "1.9.2",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, l), "boolean" != typeof this.options.disabled ? this.options.disabled = !! this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
            var r = this,
                o = this.options,
                u = "checkbox" === this.type || "radio" === this.type,
                h = u ? "" : "ui-state-active",
                d = "ui-state-focus";
            null === o.label && (o.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(s).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                o.disabled || this === t && e(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                o.disabled || e(this).removeClass(h)
            }).bind("click" + this.eventNamespace, function (e) {
                o.disabled && (e.preventDefault(), e.stopImmediatePropagation())
            }), this.element.bind("focus" + this.eventNamespace, function () {
                r.buttonElement.addClass(d)
            }).bind("blur" + this.eventNamespace, function () {
                r.buttonElement.removeClass(d)
            }), u && (this.element.bind("change" + this.eventNamespace, function () {
                a || r.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (e) {
                o.disabled || (a = !1, i = e.pageX, n = e.pageY)
            }).bind("mouseup" + this.eventNamespace, function (e) {
                o.disabled || (i !== e.pageX || n !== e.pageY) && (a = !0)
            })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return o.disabled || a ? !1 : (e(this).toggleClass("ui-state-active"), r.buttonElement.attr("aria-pressed", r.element[0].checked), void 0)
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (o.disabled || a) return !1;
                e(this).addClass("ui-state-active"), r.buttonElement.attr("aria-pressed", "true");
                var t = r.element[0];
                c(t).not(t).map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return o.disabled ? !1 : (e(this).addClass("ui-state-active"), t = this, r.document.one("mouseup", function () {
                    t = null
                }), void 0)
            }).bind("mouseup" + this.eventNamespace, function () {
                return o.disabled ? !1 : (e(this).removeClass("ui-state-active"), void 0)
            }).bind("keydown" + this.eventNamespace, function (t) {
                return o.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), void 0)
            }).bind("keyup" + this.eventNamespace, function () {
                e(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
                t.keyCode === e.ui.keyCode.SPACE && e(this).click()
            })), this._setOption("disabled", o.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var e, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(s + " " + r + " " + o).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (e, t) {
            return this._super(e, t), "disabled" === e ? (t ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), void 0) : (this._resetButton(), void 0)
        },
        refresh: function () {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? c(this.element[0]).each(function () {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
            var t = this.buttonElement.removeClass(o),
                i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                n = this.options.icons,
                a = n.primary && n.secondary,
                s = [];
            n.primary || n.secondary ? (this.options.text && s.push("ui-button-text-icon" + (a ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (s.push(a ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : s.push("ui-button-text-only"), t.addClass(s.join(" "))
        }
    }), e.widget("ui.buttonset", {
        version: "1.9.2",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (e, t) {
            "disabled" === e && this.buttons.button("option", e, t), this._super(e, t)
        },
        refresh: function () {
            var t = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function (e, t) {
    var i = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        n = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        }, a = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    e.widget("ui.dialog", {
        version: "1.9.2",
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (t) {
                    var i = e(this).css(t).offset().top;
                    0 > i && e(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1e3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.oldPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.options.title = this.options.title || this.originalTitle;
            var t, n, a, s, r, o = this,
                l = this.options,
                c = l.title || "&#160;";
            t = (this.uiDialog = e("<div>")).addClass(i + l.dialogClass).css({
                display: "none",
                outline: 0,
                zIndex: l.zIndex
            }).attr("tabIndex", -1).keydown(function (t) {
                l.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE && (o.close(t), t.preventDefault())
            }).mousedown(function (e) {
                o.moveToTop(!1, e)
            }).appendTo("body"), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(t), n = (this.uiDialogTitlebar = e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown", function () {
                t.focus()
            }).prependTo(t), a = e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function (e) {
                e.preventDefault(), o.close(e)
            }).appendTo(n), (this.uiDialogTitlebarCloseText = e("<span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(a), s = e("<span>").uniqueId().addClass("ui-dialog-title").html(c).prependTo(n), r = (this.uiDialogButtonPane = e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), (this.uiButtonSet = e("<div>")).addClass("ui-dialog-buttonset").appendTo(r), t.attr({
                role: "dialog",
                "aria-labelledby": s.attr("id")
            }), n.find("*").add(n).disableSelection(), this._hoverable(a), this._focusable(a), l.draggable && e.fn.draggable && this._makeDraggable(), l.resizable && e.fn.resizable && this._makeResizable(), this._createButtons(l.buttons), this._isOpen = !1, e.fn.bgiframe && t.bgiframe(), this._on(t, {
                keydown: function (i) {
                    if (l.modal && i.keyCode === e.ui.keyCode.TAB) {
                        var n = e(":tabbable", t),
                            a = n.filter(":first"),
                            s = n.filter(":last");
                        return i.target !== s[0] || i.shiftKey ? i.target === a[0] && i.shiftKey ? (s.focus(1), !1) : void 0 : (a.focus(1), !1)
                    }
                }
            })
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _destroy: function () {
            var e, t = this.oldPosition;
            this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (t) {
            var i, n, a = this;
            if (this._isOpen && !1 !== this._trigger("beforeClose", t)) return this._isOpen = !1, this.overlay && this.overlay.destroy(), this.options.hide ? this._hide(this.uiDialog, this.options.hide, function () {
                a._trigger("close", t)
            }) : (this.uiDialog.hide(), this._trigger("close", t)), e.ui.dialog.overlay.resize(), this.options.modal && (i = 0, e(".ui-dialog").each(function () {
                this !== a.uiDialog[0] && (n = e(this).css("z-index"), isNaN(n) || (i = Math.max(i, n)))
            }), e.ui.dialog.maxZ = i), this
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (t, i) {
            var n, a = this.options;
            return a.modal && !t || !a.stack && !a.modal ? this._trigger("focus", i) : (a.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = a.zIndex), this.overlay && (e.ui.dialog.maxZ += 1, e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ, this.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ)), n = {
                scrollTop: this.element.scrollTop(),
                scrollLeft: this.element.scrollLeft()
            }, e.ui.dialog.maxZ += 1, this.uiDialog.css("z-index", e.ui.dialog.maxZ), this.element.attr(n), this._trigger("focus", i), this)
        },
        open: function () {
            if (!this._isOpen) {
                var t, i = this.options,
                    n = this.uiDialog;
                return this._size(), this._position(i.position), n.show(i.show), this.overlay = i.modal ? new e.ui.dialog.overlay(this) : null, this.moveToTop(!0), t = this.element.find(":tabbable"), t.length || (t = this.uiDialogButtonPane.find(":tabbable"), t.length || (t = n)), t.eq(0).focus(), this._isOpen = !0, this._trigger("open"), this
            }
        },
        _createButtons: function (t) {
            var i = this,
                n = !1;
            this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), "object" == typeof t && null !== t && e.each(t, function () {
                return !(n = !0)
            }), n ? (e.each(t, function (t, n) {
                var a, s;
                n = e.isFunction(n) ? {
                    click: n,
                    text: t
                } : n, n = e.extend({
                    type: "button"
                }, n), s = n.click, n.click = function () {
                    s.apply(i.element[0], arguments)
                }, a = e("<button></button>", n).appendTo(i.uiButtonSet), e.fn.button && a.button()
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)) : this.uiDialog.removeClass("ui-dialog-buttons")
        },
        _makeDraggable: function () {
            function t(e) {
                return {
                    position: e.position,
                    offset: e.offset
                }
            }
            var i = this,
                n = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (n, a) {
                    e(this).addClass("ui-dialog-dragging"), i._trigger("dragStart", n, t(a))
                },
                drag: function (e, n) {
                    i._trigger("drag", e, t(n))
                },
                stop: function (a, s) {
                    n.position = [s.position.left - i.document.scrollLeft(), s.position.top - i.document.scrollTop()], e(this).removeClass("ui-dialog-dragging"), i._trigger("dragStop", a, t(s)), e.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (i) {
            function n(e) {
                return {
                    originalPosition: e.originalPosition,
                    originalSize: e.originalSize,
                    position: e.position,
                    size: e.size
                }
            }
            i = i === t ? this.options.resizable : i;
            var a = this,
                s = this.options,
                r = this.uiDialog.css("position"),
                o = "string" == typeof i ? i : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: o,
                start: function (t, i) {
                    e(this).addClass("ui-dialog-resizing"), a._trigger("resizeStart", t, n(i))
                },
                resize: function (e, t) {
                    a._trigger("resize", e, n(t))
                },
                stop: function (t, i) {
                    e(this).removeClass("ui-dialog-resizing"), s.height = e(this).height(), s.width = e(this).width(), a._trigger("resizeStop", t, n(i)), e.ui.dialog.overlay.resize()
                }
            }).css("position", r).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var e = this.options;
            return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
        },
        _position: function (t) {
            var i, n = [],
                a = [0, 0];
            t ? (("string" == typeof t || "object" == typeof t && "0" in t) && (n = t.split ? t.split(" ") : [t[0], t[1]], 1 === n.length && (n[1] = n[0]), e.each(["left", "top"], function (e, t) {
                +n[e] === n[e] && (a[e] = n[e], n[e] = t)
            }), t = {
                my: n[0] + (a[0] < 0 ? a[0] : "+" + a[0]) + " " + n[1] + (a[1] < 0 ? a[1] : "+" + a[1]),
                at: n.join(" ")
            }), t = e.extend({}, e.ui.dialog.prototype.options.position, t)) : t = e.ui.dialog.prototype.options.position, i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.position(t), i || this.uiDialog.hide()
        },
        _setOptions: function (t) {
            var i = this,
                s = {}, r = !1;
            e.each(t, function (e, t) {
                i._setOption(e, t), e in n && (r = !0), e in a && (s[e] = t)
            }), r && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
        },
        _setOption: function (t, n) {
            var a, s, r = this.uiDialog;
            switch (t) {
            case "buttons":
                this._createButtons(n);
                break;
            case "closeText":
                this.uiDialogTitlebarCloseText.text("" + n);
                break;
            case "dialogClass":
                r.removeClass(this.options.dialogClass).addClass(i + n);
                break;
            case "disabled":
                n ? r.addClass("ui-dialog-disabled") : r.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                a = r.is(":data(draggable)"), a && !n && r.draggable("destroy"), !a && n && this._makeDraggable();
                break;
            case "position":
                this._position(n);
                break;
            case "resizable":
                s = r.is(":data(resizable)"), s && !n && r.resizable("destroy"), s && "string" == typeof n && r.resizable("option", "handles", n), s || n === !1 || this._makeResizable(n);
                break;
            case "title":
                e(".ui-dialog-title", this.uiDialogTitlebar).html("" + (n || "&#160;"))
            }
            this._super(t, n)
        },
        _size: function () {
            var t, i, n, a = this.options,
                s = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            }), a.minWidth > a.width && (a.width = a.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: a.width
            }).outerHeight(), i = Math.max(0, a.minHeight - t), "auto" === a.height ? e.support.minHeight ? this.element.css({
                minHeight: i,
                height: "auto"
            }) : (this.uiDialog.show(), n = this.element.css("height", "auto").height(), s || this.uiDialog.hide(), this.element.height(Math.max(n, i))) : this.element.height(Math.max(a.height - t, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), e.extend(e.ui.dialog, {
        uuid: 0,
        maxZ: 0,
        getTitleId: function (e) {
            var t = e.attr("id");
            return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
        },
        overlay: function (t) {
            this.$el = e.ui.dialog.overlay.create(t)
        }
    }), e.extend(e.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (e) {
            return e + ".dialog-overlay"
        }).join(" "),
        create: function (t) {
            0 === this.instances.length && (setTimeout(function () {
                e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
                    return e(t.target).zIndex() < e.ui.dialog.overlay.maxZ ? !1 : void 0
                })
            }, 1), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
            var i = this.oldInstances.pop() || e("<div>").addClass("ui-widget-overlay");
            return e(document).bind("keydown.dialog-overlay", function (n) {
                var a = e.ui.dialog.overlay.instances;
                0 !== a.length && a[a.length - 1] === i && t.options.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
            }), i.appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            }), e.fn.bgiframe && i.bgiframe(), this.instances.push(i), i
        },
        destroy: function (t) {
            var i = e.inArray(t, this.instances),
                n = 0; - 1 !== i && this.oldInstances.push(this.instances.splice(i, 1)[0]), 0 === this.instances.length && e([document, window]).unbind(".dialog-overlay"), t.height(0).width(0).remove(), e.each(this.instances, function () {
                    n = Math.max(n, this.css("z-index"))
                }), this.maxZ = n
        },
        height: function () {
            var t, i;
            return e.ui.ie ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), i = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), i > t ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
        },
        width: function () {
            var t, i;
            return e.ui.ie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), i = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), i > t ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
        },
        resize: function () {
            var t = e([]);
            e.each(e.ui.dialog.overlay.instances, function () {
                t = t.add(this)
            }), t.css({
                width: 0,
                height: 0
            }).css({
                width: e.ui.dialog.overlay.width(),
                height: e.ui.dialog.overlay.height()
            })
        }
    }), e.extend(e.ui.dialog.overlay.prototype, {
        destroy: function () {
            e.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery),
function (e) {
    var t = !1;
    e.widget("ui.menu", {
        version: "1.9.2",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, e.proxy(function (e) {
                this.options.disabled && e.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function (e) {
                    e.preventDefault()
                },
                "click .ui-state-disabled > a": function (e) {
                    e.preventDefault()
                },
                "click .ui-menu-item:has(a)": function (i) {
                    var n = e(i.target).closest(".ui-menu-item");
                    !t && n.not(".ui-state-disabled").length && (t = !0, this.select(i), n.has(".ui-menu").length ? this.expand(i) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function (t) {
                    var i = e(t.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (e, t) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(e, i)
                },
                blur: function (t) {
                    this._delay(function () {
                        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (i) {
                    e(i.target).closest(".ui-menu").length || this.collapseAll(i), t = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var t = e(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (t) {
            function i(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var n, a, s, r, o, l = !0;
            switch (t.keyCode) {
            case e.ui.keyCode.PAGE_UP:
                this.previousPage(t);
                break;
            case e.ui.keyCode.PAGE_DOWN:
                this.nextPage(t);
                break;
            case e.ui.keyCode.HOME:
                this._move("first", "first", t);
                break;
            case e.ui.keyCode.END:
                this._move("last", "last", t);
                break;
            case e.ui.keyCode.UP:
                this.previous(t);
                break;
            case e.ui.keyCode.DOWN:
                this.next(t);
                break;
            case e.ui.keyCode.LEFT:
                this.collapse(t);
                break;
            case e.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                break;
            case e.ui.keyCode.ENTER:
            case e.ui.keyCode.SPACE:
                this._activate(t);
                break;
            case e.ui.keyCode.ESCAPE:
                this.collapse(t);
                break;
            default:
                l = !1, a = this.previousFilter || "", s = String.fromCharCode(t.keyCode), r = !1, clearTimeout(this.filterTimer), s === a ? r = !0 : s = a + s, o = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return o.test(e(this).children("a").text())
                }), n = r && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n, n.length || (s = String.fromCharCode(t.keyCode), o = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return o.test(e(this).children("a").text())
                })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = s, this.filterTimer = this._delay(function () {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            l && t.preventDefault()
        },
        _activate: function (e) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
        },
        refresh: function () {
            var t, i = this.options.icons.submenu,
                n = this.element.find(this.options.menus);
            n.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var t = e(this),
                    n = t.prev("a"),
                    a = e("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                n.attr("aria-haspopup", "true").prepend(a), t.attr("aria-labelledby", n.attr("id"))
            }), t = n.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), t.children(":not(.ui-menu-item)").each(function () {
                var t = e(this);
                /[^\-—–\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        focus: function (e, t) {
            var i, n;
            this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), n = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), i = t.children(".ui-menu"), i.length && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {
                item: t
            })
        },
        _scrollIntoView: function (t) {
            var i, n, a, s, r, o;
            this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, a = t.offset().top - this.activeMenu.offset().top - i - n, s = this.activeMenu.scrollTop(), r = this.activeMenu.height(), o = t.height(), 0 > a ? this.activeMenu.scrollTop(s + a) : a + o > r && this.activeMenu.scrollTop(s + a - r + o))
        },
        blur: function (e, t) {
            t || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
                item: this.active
            }))
        },
        _startOpening: function (e) {
            clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(e)
            }, this.delay))
        },
        _open: function (t) {
            var i = e.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function (t, i) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var n = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                n.length || (n = this.element), this._close(n), this.blur(t), this.activeMenu = n
            }, this.delay)
        },
        _close: function (e) {
            e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function (e) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(e, t))
        },
        expand: function (e) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function () {
                this.focus(e, t)
            }))
        },
        next: function (e) {
            this._move("next", "first", e)
        },
        previous: function (e) {
            this._move("prev", "last", e)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (e, t, i) {
            var n;
            this.active && (n = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.children(".ui-menu-item")[t]()), this.focus(i, n)
        },
        nextPage: function (t) {
            var i, n, a;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, a = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return i = e(this), i.offset().top - n - a < 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
        },
        previousPage: function (t) {
            var i, n, a;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, a = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return i = e(this), i.offset().top - n + a > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(t), void 0)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (t) {
            this.active = this.active || e(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
        }
    })
}(jQuery),
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
}, $(document).ready(function () {
    if ($(".testimonials_slider").bxSlider({
        auto: !0,
        pause: 3e3
    }), $(window).height() > 779) {
        var e = "msie" == $.browser && $.browser.version < 7;
        if (i = document.getElementById("filters"), i && !e) {
            var t = $("#filters").offset().top + 40 - parseFloat($("#filters").css("margin-top").replace(/auto/, 0));
            $(window).scroll(function () {
                var e = $(this).scrollTop();
                e >= t ? $("#filters").addClass("fixed") : $("#filters").removeClass("fixed")
            })
        }
    }
    var e = "msie" == $.browser && $.browser.version < 7,
        i = document.getElementById("interact_with_lawyer_tabs"),
        n = document.getElementById("filters");
    if (i && n && !e) {
        var t = $("#interact_with_lawyer_tabs_container").offset().top - parseFloat($("#filters").css("margin-top").replace(/auto/, 0));
        $(window).scroll(function () {
            var e = $(this).scrollTop();
            e >= t ? ($("#interact_with_lawyer_tabs_container").addClass("fixed_question"), $("#service_type_tabs").addClass("fixed_question_margin")) : ($("#interact_with_lawyer_tabs_container").removeClass("fixed_question"), $("#service_type_tabs").removeClass("fixed_question_margin"))
        })
    }
    $(".profile_info .client-reviews .review").first().addClass("first"), $(".profile_info .client-reviews .review").last().addClass("last"), $(my_images).each(function () {
        var e = $("<img />").attr("src", this).hide();
        $("body").append(e), e.remove()
    }), $(".avatar img, .image-carousel img").each(function () {
        var e = $(this).attr("src");
        e.width, $(this).live("error", function () {
            $(this).attr("src", "/profile_m.png")
        })
    }), $(".cvv-info").live("mouseenter", function () {
        $(".tooltip.cvv").show()
    }), $(".cvv-info").live("mouseleave", function () {
        $(".tooltip.cvv").hide()
    }), $("input[name='practice_area_lawyer'], input[name='practice_area_offering'], input[name='service_type'], input[name='service_proposal[offering_attributes][service_type]']").imageTick({
        tick_image_path: "/assets/radio_selected-5890e16e0229821836bc90e6506fd66c.png",
        no_tick_image_path: "/assets/radio-bda8dbf6e16e24d4fcb772b64db2b0ff.png",
        image_tick_class: "radios"
    }), $("html").click(function () {
        $(".button_tooltip").hide(), show_on_mouseenter = !1
    }), initializeLawyersEvents(), $("#slider-range-min").slider({
        range: "min",
        value: 37,
        min: 1,
        max: 700,
        slide: function (e, t) {
            $("#amount").val("$" + t.value)
        }
    }), $("#free_minutes_slider").slider({
        range: "min",
        value: 1,
        min: 1,
        max: 8,
        slide: function (e, t) {
            $("#minutes").val("$" + t.value)
        }
    }), $("#minutes").val("$" + $("#free_minutes_slider").slider("value")), $("#minimum_client_rating").slider({
        range: "min",
        value: 2,
        min: 1,
        max: 5,
        slide: function (e, t) {
            $("#client_rating").val("$" + t.value)
        }
    }), $("#client_rating").val("$" + $("#minimum_client_rating").slider("value")), $("#hourly_rate").slider({
        range: !0,
        values: [1, 4],
        min: 1,
        max: 4,
        slide: function (e, t) {
            $("#hourly_rate_in").val("$" + t.value)
        }
    }), $("#hourly_rate_in").val("$" + $("#hourly_rate").slider("value")), $("#law_school_quality").slider({
        range: "min",
        value: 2,
        min: 1,
        max: 4,
        slide: function (e, t) {
            $("#law_school").val("$" + t.value)
        }
    }), $("#law_school").val("$" + $("#law_school_quality").slider("value")), $("body.lawyers.show .main_content .profile_info .main-content .video-block"), $("body.lawyers.show .main_content .profile_info .main-content .main-info")
}), $("#outer_div").css({
    border: "solid #000 2px",
    padding: "2px"
});
var messageString = "",
    isOverlayOpen = !1;
$(document).ready(function () {
    $(".dialog-close").click(function () {
        close_dialogs()
    }), $(function () {
        $.fn.lawdingo_dialog = function () {
            var e = $($(this).attr("href")),
                t = $('<div class="dialog-close"></div>');
            t.click(close_dialogs), e.append(t), $("#dialog-overlay").on("click", function () {
                $(".dialog-window").hide(), $(this).hide(), isOverlayOpen && postponePayment()
            }), this.live("click", function () {
                $("#dialog-overlay").show(), $($(this).attr("href")).show(), void 0 != $(this).attr("data-l-id") && ($("div#schedule_session span.lawyer_name").html($(this).attr("data-fullname")), $(".current_selected_lawyer").val($(this).attr("data-l-id")), conversations.clear_schedule_session_warning(), conversations.enable_submit_message_button())
            })
        }, $.fn.leveled_list = function () {
            this.children().each(function () {
                var e = $(this);
                e.children(".sub").hide(), e.children(".sub.filled").show(), e.children("input[type=checkbox]").click(function () {
                    "checked" == $(this).attr("checked") ? e.children(".sub").show() : e.children(".sub").hide()
                })
            })
        },
        function (e) {
            e.browser.opera && e.browser.version < 10.5
        }(jQuery), $(".button").bind("mousedown", function () {
            $(this).addClass("pressed")
        }).bind("mouseup", function () {
            $(this).removeClass("pressed")
        }).bind("mouseout", function () {
            $(this).removeClass("pressed")
        }), $(".dialog-opener").lawdingo_dialog(), $(".leveled-list").leveled_list(), $(document).keyup(function (e) {
            27 == e.keyCode && close_dialogs()
        }), $(function () {
            $(".phone_mask").mask("(999) 999-9999")
        })
    })
}), jQuery.fn.center = function () {
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
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return is_client ? this.handleStateAndPracticeArea() : void 0
        },
        practiceAreaSelects: function () {
            return $(".question_area_bot #practice_area, .schedule_session_area_bot #message_practice_area_id, .state_and_practice_area_validation_area_bot #practice_area")
        },
        stateSelects: function () {
            return $(".question_state_bot #state_name, .schedule_session_state_bot #message_state_id, .state_and_practice_area_validation_state_bot #state_name, #question_state #question_state_id")
        },
        practiceAreaLinks: function () {
            return $(".left-bar .practice_area_name")
        },
        handleStateAndPracticeArea: function () {
            var e = this;
            return this.practiceAreaSelects().on("change", function (t) {
                return $(t.target).val() > 0 ? e.updatePracticeArea(client_id, $(t.target).val()) : void 0
            }), this.stateSelects().on("change", function (t) {
                return $(t.target).val() > 0 ? e.updateState(client_id, $(t.target).val()) : void 0
            }), this.practiceAreaLinks().on("click", function (t) {
                return $(t.target).data("id").length ? e.updatePracticeArea(client_id, $(t.target).data("id")) : void 0
            })
        },
        updatePracticeArea: function (e, t) {
            return this.update(e, {
                "client[practice_area_id]": t
            })
        },
        updateState: function (e, t) {
            return this.update(e, {
                "client[state_id]": t
            })
        },
        update: function (e, t) {
            return t.authenticity_token = $("[name='csrf-token']").attr("content"), $.ajax({
                url: "/clients/" + e + ".json",
                type: "PUT",
                data: t
            })
        }
    }, this.clients = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleMessageForm()
        },
        state_name_select: function () {
            return $("#schedule_session #message_state_id")
        },
        practice_area_select: function () {
            return $("#schedule_session #message_practice_area_id")
        },
        fill_practice_area_state_select_from_cookie: function () {
            return $.cookie("state_id") && "" === this.state_name_select().val() && this.state_name_select().val($.cookie("state_id")), $.cookie("practice_area_id") && "" === this.practice_area_select().val() ? this.practice_area_select().val($.cookie("practice_area_id")) : void 0
        },
        update_practice_area_state_select_from_cookie: function () {
            return $.cookie("state_id") && this.state_name_select().val($.cookie("state_id")), $.cookie("practice_area_id") ? this.practice_area_select().val($.cookie("practice_area_id")) : void 0
        },
        submitMessageButton: function () {
            return $("body.conversations.summary input#no_answer_message_submit, #schedule_session #send_message_button")
        },
        handleMessageForm: function () {
            var t, i, n;
            return this.fill_practice_area_state_select_from_cookie(), n = $("#schedule_session #message_state_id"), t = $("#schedule_session #message_practice_area_id"), i = $("#schedule_session #message_state_id, #schedule_session #message_practice_area_id"), this.submitMessageButton().on("click", function () {
                var a;
                return e.checkLawyersStateAndPracticeArea(n, t, i) && (a = $("input#lawyer_id").val(), $("#schedule_session form#new_message #message_to_id").val(a), "" !== $("#schedule_session textarea#message_body").val() ? (close_dialogs(), $("#schedule_session #message_attachment").val().length ? $("#schedule_session form#new_message").attr("action", "/messages/send_message/" + a) : $("#schedule_session form#new_message").attr("action", "/messages/send_message/" + a + ".json"), $("#schedule_session form#new_message").submit()) : alert("You can not send blank message.")), !1
            }), $("#schedule_session form#new_message").on("ajaxSuccess", function (e, t, i) {
                var n;
                return /send_message/i.test(i.url) ? (n = jQuery.parseJSON(t.responseText), n.result ? alert("Your message has been sent.") : window.location.href = "/clients/new") : void 0
            }), i.on("change", function () {
                return e.checkLawyersStateAndPracticeArea(n, t, i)
            })
        },
        checkLawyersStateAndPracticeArea: function (t, i, n, a) {
            var s, r, o, l, c;
            return o = t.val(), l = $("#schedule_session #message_state_id option[value='" + o + "']").text(), s = i.val(), r = $("#schedule_session #message_practice_area_id option[value='" + s + "']").text(), c = $("input#lawyer_id").val(), a = $("#schedule_session span.lawyer_name").text(), e.isLawyersState(o, c) && e.isLawyersPracticeArea(s, c) ? (e.enable_submit_message_button, e.clear_schedule_session_warning(), $.cookie("state_id", o, {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area_id", s, {
                expires: 30,
                path: "/"
            }), $.cookie("state", this.state_name_for_url(l), {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area", this.practice_area_name_for_url(r), {
                expires: 30,
                path: "/"
            }), !0) : e.isStateSelected() || e.isPracticeAreaSelected() ? e.isPracticeAreaSelected() ? e.isStateSelected() || e.isPracticeAreaNational() ? !e.isLawyersState(o, c) && e.isLawyersPracticeArea(s, c) ? (e.disable_submit_message_button, e.write_schedule_session_state_warning(l, a), !1) : e.isLawyersState(o, c) && !e.isLawyersPracticeArea(s, c) ? (e.disable_submit_message_button, e.write_schedule_session_practice_area_warning(r, a), !1) : (e.disable_submit_message_button, e.write_schedule_session_state_and_practice_area_warning(l, r, a), !1) : (e.disable_submit_message_button, e.write_schedule_session_state_missing_warning(), !1) : (e.disable_submit_message_button, e.write_schedule_session_practice_area_missing_warning(), !1) : (e.disable_submit_message_button, e.write_schedule_session_state_and_practice_area_missing_warning(), !1)
        },
        schedule_session_warning: function () {
            return $("#schedule_session_warning")
        },
        isStateSelected: function () {
            return parseInt(e.state_name_select().val()) > 0
        },
        isPracticeAreaSelected: function () {
            return parseInt(e.practice_area_select().val()) > 0
        },
        isStateAndPracticeAreaSelected: function () {
            return e.isStateSelected() && e.isPracticeAreaSelected()
        },
        isLawyersPracticeArea: function (t, i) {
            var n;
            return "" === t ? !1 : (n = [], $.ajax({
                url: "/lawyers/" + i + "/practice_areas.json",
                async: !1,
                dataType: "json",
                success: function (e) {
                    return e.practice_areas.length ? $.each(e.practice_areas, function (e, t) {
                        return n.push(t)
                    }) : void 0
                }
            }), e.inArray(t, n))
        },
        write_schedule_session_state_and_practice_area_warning: function (t, i, n) {
            var a, s, r;
            return e.isStateSelected(), s = e.state_name_for_url(t), a = e.practice_area_name_for_url(i), r = "" + n + " isn't licensed in " + t + " and doesn't advise on " + i + ", and thus can't help you. Find <a href='/lawyers/Legal-Advice/" + s + "/" + a + "'>" + t + " lawyers advising on " + i + " law.</a>", e.schedule_session_warning().html(r)
        },
        write_schedule_session_practice_area_warning: function (t, i) {
            var n, a;
            return n = e.practice_area_name_for_url(t), a = "" + i + " doesn't advise on " + t + ", and thus can't help you. Find <a href='/lawyers/Legal-Advice/All-States/" + n + "'>Lawyers advising on " + t + " law.</a>", e.schedule_session_warning().html(a)
        },
        write_schedule_session_state_warning: function (t, i) {
            var n, a;
            return n = e.state_name_for_url(t), a = "" + i + " isn't licensed in " + t + " and, thus can't help you. Find <a href='/lawyers/Legal-Advice/" + n + "'>" + t + " lawyers</a>", e.schedule_session_warning().html(a)
        },
        write_schedule_session_state_and_practice_area_missing_warning: function () {
            var t;
            return t = "Please select state and type of law.", e.schedule_session_warning().html(t)
        },
        write_schedule_session_state_missing_warning: function () {
            var t;
            return t = "Please select state.", e.schedule_session_warning().html(t)
        },
        write_schedule_session_practice_area_missing_warning: function () {
            var t;
            return t = "Please select type of law.", e.schedule_session_warning().html(t)
        },
        practice_area_name_for_url: function (e) {
            return e.replace(/\s+/g, "-")
        },
        state_name_for_url: function (e) {
            return "" + e.replace(/\s+/g, "_") + "-lawyers"
        },
        clear_schedule_session_warning: function () {
            var e;
            return e = $("#schedule_session_warning"), e.html("")
        },
        isPracticeAreaNational: function () {
            var e, t;
            return e = this.practice_area_select().val(), t = this.practice_area_select().find("option[value='" + e + "']").attr("is_national"), "true" === t
        },
        isLawyersState: function (t, i) {
            var n;
            return this.isPracticeAreaNational() ? !0 : "" === t ? !1 : (n = [], $.ajax({
                url: "/lawyers/" + i + "/states.json",
                async: !1,
                dataType: "json",
                success: function (e) {
                    return e.states.length ? $.each(e.states, function (e, t) {
                        return n.push(t)
                    }) : void 0
                }
            }), e.inArray(t, n))
        },
        inArray: function (e, t) {
            var i;
            return i = !1, $.each(t, function (t, n) {
                return e === n.id.toString() ? i = !0 : void 0
            }), i
        },
        disable_submit_message_button: function () {
            return this.submitMessageButton().attr("disabled", "disabled")
        },
        enable_submit_message_button: function () {
            return this.submitMessageButton().removeAttr("disabled")
        }
    }, this.conversations = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleEvents(), this.handleJurisdictionsCountiesDialogWindow()
        },
        dialog_overlay: function () {
            return $("#dialog-overlay")
        },
        dialog_close: function () {
            return $(".dialog-close")
        },
        dialog_overlay_and_close: function () {
            return $("#dialog-overlay, .dialog-close, button.close")
        },
        dialog_div: function () {
            return $("div#jurisdictions_counties")
        },
        dialog_window: function () {
            return $("#jurisdictions_counties.dialog-window")
        },
        close: function () {
            return $('<div class="dialog-close"></div>')
        },
        dialog_opener: function () {
            return $(".jurisdictions_states a")
        },
        countiesStateSpan: function () {
            return $("#counties_state_span")
        },
        handleEvents: function () {
            var e = this;
            return this.dialog_opener().on("click", function (t) {
                return e.countiesStateSpan().text($(t.target).text()), $(".county_states").hide(), $("#county_state_" + $(t.target).data("state-id")).show(), e.dialog_window().center().show(), e.dialog_overlay().show(), !1
            }), $('#select_all[type="checkbox"]').on("click", function (e) {
                return $(e.target).parents("ul").find('[type="checkbox"]').attr("checked", $(e.target).is(":checked"))
            })
        },
        handleJurisdictionsCountiesDialogWindow: function () {
            var e = this;
            return this.dialog_div().append(this.close()), this.dialog_overlay_and_close().live("click", function () {
                return e.dialog_window().hide(), e.close().hide(), e.dialog_overlay().hide(), e.showSelectedCounties()
            })
        },
        showSelectedCounties: function () {
            return this.dialog_div().find("ul").each(function () {
                return e = [], $(this).find('[type="checkbox"][value]:checked').each(function () {
                    return e.push($(this).next("label").text())
                }), e.length ? $(".jurisdictions_states .selected_counties." + $(this).attr("id")).text("(" + e.join(", ") + ")") : $(".jurisdictions_states .selected_counties." + $(this).attr("id")).text("")
            })
        }
    }, this.counties = e
}.call(this),
function () {
    var e, t = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
    jQuery(function () {
        var t;
        return t = new e("form#lawyer_daily_hours")
    }), e = function () {
        function e(e) {
            this.handle_monday_changes = t(this.handle_monday_changes, this), this.save_state_pair = t(this.save_state_pair, this), this.remember_state = t(this.remember_state, this), this.set_pair = t(this.set_pair, this), this.set_values = t(this.set_values, this), this.reset_to_old_values_action = t(this.reset_to_old_values_action, this), this.apply_to_weekdays_action = t(this.apply_to_weekdays_action, this), this.apply_to_all_action = t(this.apply_to_all_action, this), this.apply_checkbox_checked = t(this.apply_checkbox_checked, this), this.set_events = t(this.set_events, this), this.form = $(e), this.selects = this.form.find("select"), this.start_time = this.form.find('[name="daily_hours[1][start_time]"]'), this.end_time = this.form.find('[name="daily_hours[1][end_time]"]'), this.apply_to_all_control = this.form.find("#all_days"), this.apply_to_weekdays_control = this.form.find("#week_days"), this.states = {}, this.remember_state(), this.set_events()
        }
        return e.prototype.set_events = function () {
            var e = this;
            return $(this.selects).change(function (t) {
                var i;
                return e.states[$(t.target).attr("name")] = $(t.target).val(), "-1" === $(t.target).val() ? (i = $(t.target).parent().find("select"), i.val("-1"), e.states[i.attr("name")] = i.val()) : void 0
            }), this.apply_to_all_control.change(function (t) {
                return e.apply_checkbox_checked(t, e.apply_to_weekdays_control, e.apply_to_all_action)
            }), this.apply_to_weekdays_control.change(function (t) {
                return e.apply_checkbox_checked(t, e.apply_to_all_control, e.apply_to_weekdays_action)
            }), $(this.start_time).change(function () {
                return e.handle_monday_changes()
            }), $(this.end_time).change(function () {
                return e.handle_monday_changes()
            })
        }, e.prototype.apply_checkbox_checked = function (e, t, i) {
            return $(t).attr("checked", !1), $(e.target).is(":checked") ? i() : this.reset_to_old_values_action()
        }, e.prototype.apply_to_all_action = function () {
            var e, t;
            return e = this.start_time.val(), t = this.end_time.val(), this.set_values(e, t, [0, 2, 3, 4, 5, 6])
        }, e.prototype.apply_to_weekdays_action = function () {
            var e, t;
            return e = this.start_time.val(), t = this.end_time.val(), this.set_values(e, t, [2, 3, 4, 5]), this.set_values("-1", "-1", [0, 6])
        }, e.prototype.reset_to_old_values_action = function () {
            var e, t, i, n;
            i = this.states, n = [];
            for (e in i) t = i[e], n.push(this.form.find('[name="' + e + '"]').val(t));
            return n
        }, e.prototype.set_values = function (e, t, i) {
            var n, a, s, r;
            for (r = [], a = 0, s = i.length; s > a; a++) n = i[a], r.push(this.set_pair(n, e, t));
            return r
        }, e.prototype.set_pair = function (e, t, i) {
            return this.form.find('[name="daily_hours[' + e + '][start_time]"]').val(t), this.form.find('[name="daily_hours[' + e + '][end_time]"]').val(i)
        }, e.prototype.remember_state = function () {
            var e, t, i, n, a;
            for (n = [0, 2, 3, 4, 5, 6], a = [], t = 0, i = n.length; i > t; t++) e = n[t], a.push(this.save_state_pair(e));
            return a
        }, e.prototype.save_state_pair = function (e) {
            return this.states["daily_hours[" + e + "][start_time]"] = this.form.find('[name="daily_hours[' + e + '][start_time]"]').val(), this.states["daily_hours[" + e + "][end_time]"] = this.form.find('[name="daily_hours[' + e + '][end_time]"]').val()
        }, e.prototype.handle_monday_changes = function () {
            return $(this.apply_to_all_control).is(":checked") && this.apply_to_all_action(), $(this.apply_to_weekdays_control).is(":checked") ? this.apply_to_weekdays_action() : void 0
        }, e
    }()
}.call(this),
function () {
    jQuery(function () {
        return $(".dialog-window").draggable()
    })
}.call(this),
function () {}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: function () {
            return this.handleCheckboxes()
        },
        toggleCheckbox: function (e, t) {
            var i;
            return i = $(e), "disabled" === t ? i.prop("disabled", !0) : i.prop("disabled", !1)
        },
        handleCheckboxes: function () {
            var e = this;
            return $("ul.notification-events input[type=checkbox]").on("change", function (t) {
                return $("form#event_notifications_update").submit(), e.toggleCheckbox(t.target, "enabled"), Flash.showMessage($(t.target).parent(), "Saved", "-52px", "200px")
            })
        }
    }, window.events = e
}.call(this),
function () {
    var e;
    e = function () {
        function e() {}
        return e.prototype.showMessage = function (e, t, i, n) {
            return null == t && (t = "Saved"), null == i && (i = "-20px"), null == n && (n = "10px"), $(".flash_message").length && $(".flash_message").remove(), $(e).length ? ($(e).after("<span class='flash_message'>" + t + "</span>"), $(".flash_message").parent().css("position", "relative"), $(".flash_message").css("top", i).css("left", n), $(".flash_message").fadeOut(3e3)) : void 0
        }, e
    }(), this.Flash = new e
}.call(this),
function () {
    var e, t, i, n;
    t = "1094773163732.apps.googleusercontent.com", e = "AIzaSyCqAU95Ur3R2zGpYK_b6s5nfCQQYW7l1pE", n = "https://www.googleapis.com/auth/calendar", i = !1, this.handleClientLoad = function () {
        return is_lawyer ? (gapi.client.setApiKey(e), $(".authorize-button").live("click", function () {
            return checkAuth(handleAuthResult), !1
        }), $("#diconnect-button").live("click", function () {
            return checkAuth(handleCalendarDiconnect), !1
        })) : void 0
    }, this.checkAuth = function (e) {
        return gapi.auth.authorize({
            client_id: t,
            scope: n,
            immediate: i
        }, e)
    }, this.handleAuthResult = function (e) {
        var t;
        return t = $(".authorize-button"), e && !e.error ? ($("#authorized_text_span").addClass("hidden"), $("#unauthorized_text_span").removeClass("hidden"), i = !0, gapi.client.load("calendar", "v3", function () {
            return getCalendarsList("#gcalendar_ul")
        })) : ($("#authorized_text_span").removeClass("hidden"), $("#unauthorized_text_span").addClass("hidden"))
    }, this.getCalendarsList = function (e) {
        var t;
        return t = gapi.client.calendar.calendarList.list(), t.execute(function (t) {
            var i, n, a, s, r, o;
            for (a = "", i = 0, o = t.items, s = 0, r = o.length; r > s; s++) n = o[s], i++, a += $(e).data("checked") !== t.items[s].id ? "<li><input id='gcalendar_email_" + t.items[s].id + "' name='gcalendar_email' type='radio' value='" + t.items[s].id + "'> <label for='gcalendar_email_" + t.items[s].id + "'>" + t.items[s].id + "</label></li>" : "<li><input id='gcalendar_email_" + t.items[s].id + "' name='gcalendar_email' type='radio' value='" + t.items[s].id + "' checked> <label for='gcalendar_email_" + t.items[s].id + "'>" + t.items[s].id + "</label></li>";
            return $(e).html(a), handleCalendarRadios(), $(e).data("checked") || (i > 1 ? ($("#google_calendars_popup.dialog-window").center().show(), $("#dialog-overlay").show()) : $('#gcalendar_ul li input[type="radio"]').click()), handleCalendarPopup()
        })
    }, this.createEvent = function (e, t) {
        var i;
        return t || (t = {
            summary: "Appointment",
            location: "Somewhere",
            start: {
                dateTime: "2013-02-02T10:00:00.000-07:00"
            },
            end: {
                dateTime: "2013-02-02T10:25:00.000-07:00"
            }
        }), i = gapi.client.calendar.events.insert({
            calendarId: e,
            resource: t
        }), i.execute(writeResponse)
    }, this.handleCalendarPopup = function () {
        return $("#google_calendars_popup").append('<div class="dialog-close"></div>'), $("#dialog-overlay, .dialog-close, button.close").live("click", function () {
            return $("#google_calendars_popup.dialog-window, .dialog-close, #dialog-overlay").hide()
        })
    }, this.handleCalendarRadios = function () {
        return $('#gcalendar_ul li input[type="radio"]').live("change", function () {
            return $(this).val().length ? makeItWritable($(this).val()) : void 0
        })
    }, this.handleCalendarDiconnect = function () {
        return $("#gcalendar_ul").data("checked").length && diconnectCalendar($("#gcalendar_ul").data("checked")), !1
    }, this.diconnectCalendar = function (e) {
        var t;
        return t = "", gapi.client.load("calendar", "v3", function () {
            var t;
            return t = gapi.client.calendar.acl["delete"]({
                calendarId: e,
                ruleId: "user:robot@lawdingo.com"
            }), t.execute(function () {
                return diconnectCalendarSuccess()
            })
        })
    }, this.diconnectCalendarSuccess = function () {
        return saveSelectedCalendar(), $("#authorized_text_span").removeClass("hidden"), $("#unauthorized_text_span").addClass("hidden")
    }, this.makeItWritable = function (e) {
        var t, i;
        return i = {
            role: "writer",
            scope: {
                type: "user",
                value: "robot@lawdingo.com"
            }
        }, t = gapi.client.calendar.acl.insert({
            calendarId: e,
            resource: i
        }), t.execute(function (t) {
            return t.result ? saveSelectedCalendar(e) : void 0
        })
    }, this.saveSelectedCalendar = function (e) {
        return null == e && (e = null), lawyer_id ? $.ajax({
            url: "/lawyers/" + lawyer_id + ".json",
            type: "PUT",
            data: {
                "lawyer[gcalendar_email]": e,
                authenticity_token: $("[name='csrf-token']").attr("content")
            },
            success: function (t) {
                return t.result ? $("#gcalendar_ul").data("checked", e) : void 0
            }
        }) : void 0
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return "undefined" != typeof _gaq ? (this.handleClientSignUpForm(), this.handleLawyerSignUpForm(), this.handleLawyerSortBySelect()) : void 0
        },
        clientSignUpForm: function () {
            return $("body.clients.new form#new_client, body.users.new form#new_client")
        },
        lawyerSignUpForm: function () {
            return $("body.lawyers.new form#new_lawyer")
        },
        lawyerSortBySelect: function () {
            return $("body.users.home select#sort_by")
        },
        handleClientSignUpForm: function () {
            return this.clientSignUpForm().live("submit", function () {
                return _gaq.push(["_trackEvent", "Sign Up", "Client sign up", "Client just submited sign up form."])
            })
        },
        handleLawyerSignUpForm: function () {
            return this.lawyerSignUpForm().live("submit", function () {
                var e;
                return _gaq.push(["_trackEvent", "Sign Up", "Lawyer sign up", "Lawyer just submited sign up form."]), e = new TrackTiming("Lawyers", "Sign Up", "One step"), e.startTime($("body.lawyers.new form#new_lawyer").data("tracking-start-time")), e.endTime().send()
            })
        },
        handleLawyerSortBySelect: function () {
            return this.lawyerSortBySelect().on("change", function () {
                return _gaq.push(["_trackEvent", "Filters", "Sort By", "Sort By filter is applied"])
            })
        }
    }, this.googleAnalytics = e
}.call(this),
function () {
    $(document).pjax("a[data-pjax-link]", "[data-pjax-container]"), $(document).on("pjax:send", function () {
        return $(".how_it_works .profile_header").spin()
    }), $(document).on("pjax:complete", function () {
        return $(".how_it_works .profile_header").spin(!1)
    })
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.init()
    }), e = {
        init: function () {
            return $("form#new_lawyer *[rel='twipsy']").each(function () {
                var e;
                return e = $(this), e.twipsy({
                    animate: !1,
                    placement: "below",
                    trigger: "focus"
                }), e.bind("blur", function () {
                    return console.log("hidden"), e.twipsy("hide")
                })
            })
        }
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.startCountdown(), this.verifyBidAmount()
        },
        startCountdown: function () {
            var e, t;
            return e = $("body.inquiries.show .countdown"), t = new Date(Date.UTC(e.data("expiration-year"), e.data("expiration-month"), e.data("expiration-day"), e.data("expiration-hours"), e.data("expiration-minutes"), e.data("expiration-seconds"))), e.length ? e.countdown({
                compact: !0,
                description: "",
                until: t
            }) : void 0
        },
        verifyBidAmount: function () {
            return $("form#new_bid").on("submit", function () {
                var e, t;
                return e = $("input#bid_amount"), t = e.data("minimum-bid"), parseInt(e.val()) < parseInt(t) ? (alert("Minimum bid for this inquiry is $" + t + ".00."), !1) : !0
            })
        }
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: function () {
            return this.bindUIActions()
        },
        callback: function () {
            return $("form#new_invitation .button").removeAttr("disabled"), $("form#new_invitation .callback-message").text("Sent successfully!").delay(3e3).fadeOut()
        },
        bindUIActions: function () {
            var e = this;
            return $("form#new_invitation").on("ajax:success", function () {
                return e.callback()
            })
        }
    }
}.call(this),
function () {
    var e;
    e = function () {
        function e(e) {
            this.id = e
        }
        return e
    }(), this.Lawyer = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: window.ClientSideValidations.callbacks.form.fail = function (e) {
            return e && "new_lawyer" === e.attr("id") ? $(window).scrollTop(90) : void 0
        }
    }
}.call(this),
function () {
    var e;
    jQuery(document).ready(function () {
        return e.initialize()
    }), e = {
        massCallsToLawyerEstimatedTimerCount: 180,
        initialize: function () {
            return this.handleEvents(), this.massCallsToLawyerEstimatedTimer.set({
                time: 1e3,
                autostart: !1
            }), this.redirectToCurrentCallOrNoLawyersAvailableTimer.set({
                time: 5e3,
                autostart: !1
            })
        },
        callCancelButton: function () {
            return $(".call-container #call_cancel_button")
        },
        testPhoneButton: function () {
            return $(".edit_lawyer #test_phone_button")
        },
        lawyerPhone: function () {
            return $(".edit_lawyer #lawyer_phone")
        },
        handleEvents: function () {
            var e = this;
            return this.callCancelButton().on("click", function () {
                return e.redirectToReviewOrNoAnswer(), !1
            }), this.testPhoneButton().on("click", function (t) {
                return e.testPhone(t.target), !1
            }), this.lawyerPhone().on("change", function () {
                return $(".edit_lawyer #test_phone_check").addClass("hidden"), $(".edit_lawyer #test_phone_button").removeAttr("disabled"), $(".edit_lawyer .test_phone").removeClass("hidden"), $(".edit_lawyer #lawyer_phone_verified").val("0")
            })
        },
        testPhone: function (e) {
            return $(e).attr("disabled", "disabled"), $(".edit_lawyer #lawyer_phone").val().length ? $.ajax({
                url: $(e).data("url"),
                type: "POST",
                data: {
                    "lawyer[phone]": $(".edit_lawyer #lawyer_phone").val(),
                    authenticity_token: $("[name='csrf-token']").attr("content")
                },
                beforeSend: function () {
                    return $(e).addClass("loading"), $(".test_phone_message").text("We are calling your phone. Please answer and press 1.")
                },
                complete: function () {
                    return $(e).removeClass("loading")
                },
                success: function (e) {
                    return e.phone_verified ? ($(".edit_lawyer #test_phone_check").removeClass("hidden"), $(".edit_lawyer .test_phone").addClass("hidden"), $(".edit_lawyer #lawyer_phone_verified").val("1"), $(".test_phone_message").text("Success. Your phone has been confirmed.")) : $(".test_phone_message").text("Sorry, we were unable to confirm your phone number. Please ensure that you are using a phone that does not have an automated answer.")
                }
            }) : void 0
        },
        redirectToReviewOrNoAnswer: function () {
            return $.ajax({
                url: "/calls/hangup_all.json",
                async: !1,
                data: {
                    authenticity_token: $("[name='csrf-token']").attr("content")
                },
                success: function (e) {
                    return window.location.href = e.conversation ? e.conversation.duration_in_minutes > 2 ? "/conversations/" + e.conversation.id + "/summary/review?call_type=phonecall" : "/conversations/" + e.conversation.id + "/no_answer?call_type=phonecall" : "/lawyers"
                }
            })
        },
        massCallsToLawyerEstimatedTimer: $.timer(function () {
            var t, i, n, a;
            return --e.massCallsToLawyerEstimatedTimerCount, e.massCallsToLawyerEstimatedTimerCount <= 0 && (e.massCallsToLawyerEstimatedTimer.pause(), e.redirectToReviewOrNoAnswer()), n = e.massCallsToLawyerEstimatedTimerCount % 60, t = parseInt(e.massCallsToLawyerEstimatedTimerCount / 60), a = n.toString().length > 1 ? n.toString() : "0" + n.toString(), i = t.toString().length > 1 ? t.toString() : "0" + t.toString(), $("#time_estimated").html("" + i + ":" + a)
        }),
        redirectToCurrentCallOrNoLawyersAvailableTimer: $.timer(function () {
            return e.redirectToCurrentCallOrNoLawyersAvailable()
        }),
        redirectToCurrentCallOrNoLawyersAvailable: function () {
            return $.ajax({
                url: "/calls/current.json",
                success: function (t) {
                    return t ? t.conversation_id ? (e.redirectToCurrentCallOrNoLawyersAvailableTimer.stop(), post_to_url("/lawyers/" + t.lawyer_id + "/call", {
                        authenticity_token: $("[name='csrf-token']").attr("content"),
                        call_id: t.id,
                        client_number: t.from
                    })) : void 0 : (e.redirectToCurrentCallOrNoLawyersAvailableTimer.stop(), questions.flash("Sorry, no lawyers were available."), window.location.href = "/lawyers")
                }
            })
        }
    }, this.call = e
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
            return $(".feed_container div.load-more a").live("click", function (e) {
                return $(this).html("Fetching more client contacts..."), $(".feed_container div.load-more").remove(), $.ajax({
                    url: $(e.target).attr("href"),
                    beforeSend: function () {
                        return $(".feed_container").addClass("loading")
                    },
                    complete: function () {
                        return $(".feed_container").removeClass("loading")
                    },
                    success: function (e) {
                        return $(".feed_container").append(e)
                    }
                }), !1
            })
        }
    }, this.feed = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: function () {
            return this.bindUIActions()
        },
        bindUIActions: function () {
            var e = this;
            return $("button#next_step").on("click", function (t) {
                return t.preventDefault(), e.toggleSteps()
            })
        },
        toggleSteps: function () {
            var e, t, i, n, a;
            return t = $(".process-header.secondary .first-step"), a = $(".process-header.secondary .second-step"), e = $("table.first-step"), n = $("table.second-step"), i = $(".apply-form .linkedin-signup"), t.hasClass("active") ? ($(".process-header.secondary .steps").removeClass("active"), a.addClass("active"), e.hide(), n.show("slow"), i.hide()) : ($(".process-header.secondary .steps").removeClass("active"), t.addClass("active"), n.hide(), e.show("slow"), i.show("slow"))
        }
    }, this.lawyersForm = e
}.call(this),
function () {
    var e;
    e = function () {
        function e() {}
        return e.prototype.initialize = function (e) {
            return this.lawyer = new Lawyer(e)
        }, e
    }(), this.LawyersShow = new e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup("body.home")
    }), e = {
        defaults: {
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
        },
        setup: function (t, i) {
            return null == i && (i = {}), i = $.extend(e.defaults, i), $(t).on({
                ajaxStart: function () {
                    var e;
                    return e = {
                        top: $(window).height() / 2 + $(window).scrollTop(),
                        left: $(window).width() / 2 + $(window).scrollLeft()
                    }, $("body").spin($.extend(i, e))
                },
                ajaxStop: function () {
                    return $("body").spin(!1)
                }
            })
        }
    }, window.loadingSpin = e
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
            return $('.message_attachment_wrapper #file_replacement, .message_attachment_wrapper label[for="file_replacement"]').removeClass("hidden"), $(".message_attachment_wrapper #message_attachment").css("width", "0").css("height", "0"), $(".message_attachment_wrapper #file_replacement").on("click", function () {
                return $(".message_attachment_wrapper #message_attachment").click()
            }), $(".message_attachment_wrapper #message_attachment").on("change", function () {
                return $(this).val().length ? $('.message_attachment_wrapper label[for="file_replacement"]').text(/([^\\]+)$/.exec($(this).val())[1]) : void 0
            }), $(".messages_container .message_item").live("click", function () {
                return $(this).data("url").length ? window.location = $(this).data("url") : void 0
            }), $(".messages_container div.load-more a").live("click", function (e) {
                return $(this).html("Fetching more messages..."), $(".messages_container div.load-more").remove(), $.ajax({
                    url: $(e.target).attr("href"),
                    beforeSend: function () {
                        return $(".messages_container").addClass("loading")
                    },
                    complete: function () {
                        return $(".messages_container").removeClass("loading")
                    },
                    success: function (e) {
                        return $(".messages_container").append(e)
                    }
                }), !1
            })
        }
    }, this.messages = e
}.call(this), $(document).ready(function () {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr("content")), $("#payment-form").submit(function () {
        $(".submit-button").attr("disabled", "disabled");
        var e;
        return e = {
            number: $("#card_detail_card_number").val(),
            exp_month: $("#card_month").val(),
            exp_year: $("#card_year").val(),
            cvc: $("#card_detail_card_verification").val()
        }, Stripe.createToken(e, stripeResponseHandler), !1
    })
}),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleEvents()
        },
        handleEvents: function () {
            return $("body.stripes.buy_offering #paypal_button").on("click", function () {
                return post_to_url("https://www.paypal.com/cgi-bin/webscr", {
                    cmd: "_s-xclick",
                    hosted_button_id: "NTGMGT2T6BDX6",
                    on0: "plan",
                    os0: 145,
                    currency_code: "USD"
                }), !1
            })
        }
    }, this.paypal = e
}.call(this),
function () {
    var e, t = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }, i = {}.hasOwnProperty,
        n = function (e, t) {
            function n() {
                this.constructor = e
            }
            for (var a in t) i.call(t, a) && (e[a] = t[a]);
            return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
        };
    jQuery($(function () {
        var e;
        return jQuery.support.placeholder = !1, e = document.createElement("input"), "placeholder" in e ? jQuery.support.placeholder = !0 : void 0
    }), $(function () {
        return $.support.placeholder ? void 0 : ($(":text").each(function () {
            var e;
            return e = new input_with_placeholder(this), e.on_blur()
        }), $(":password").each(function () {
            var e;
            return e = new input_password_with_placeholder(this), e.on_blur()
        }), window.ClientSideValidations.callbacks.element.before = function (e) {
            return $(e).attr("placeholder") && $(e).attr("placeholder") === $(e).val() ? $(e).val("") : void 0
        })
    })), window.input_with_placeholder = function () {
        function e(e) {
            this.on_change = t(this.on_change, this), this.on_blur = t(this.on_blur, this), this.on_focus = t(this.on_focus, this), this.show_placeholder = t(this.show_placeholder, this), this.hide_placeholder = t(this.hide_placeholder, this), this.need_show_placeholder = t(this.need_show_placeholder, this), this.need_hide_placeholder = t(this.need_hide_placeholder, this), this.bind_events = t(this.bind_events, this), this.elem = e, this.bind_events(), this.changed = !1, this.form = $(this.elem).closest("form"), $(this.elem).enableClientSideValidations()
        }
        return e.prototype.bind_events = function () {
            var e = this;
            return $(this.elem).bind({
                focus: function (t) {
                    return e.on_focus(t)
                },
                blur: function (t) {
                    return e.on_blur(t)
                },
                change: function (t) {
                    return e.on_change(t)
                },
                before_submit: function () {
                    return e.need_hide_placeholder() ? $(e.elem).val("") : void 0
                }
            })
        }, e.prototype.need_hide_placeholder = function () {
            return $(this.elem).val() === $(this.elem).attr("placeholder") && this.changed === !1
        }, e.prototype.need_show_placeholder = function () {
            return "" !== $(this.elem).attr("placeholder") && "" === $(this.elem).val()
        }, e.prototype.hide_placeholder = function () {
            return $(this.elem).val("").removeClass("hasPlaceholder")
        }, e.prototype.show_placeholder = function () {
            return $(this.elem).val($(this.elem).attr("placeholder")).addClass("hasPlaceholder")
        }, e.prototype.on_focus = function () {
            return this.need_hide_placeholder() === !0 ? this.hide_placeholder() : void 0
        }, e.prototype.on_blur = function () {
            return this.need_show_placeholder() === !0 ? this.show_placeholder() : void 0
        }, e.prototype.on_change = function () {
            return this.changed = "" !== $(this.elem).val() ? !0 : !1
        }, e
    }(), window.input_password_with_placeholder = function (i) {
        function a() {
            return this.change_type = t(this.change_type, this), this.show_placeholder = t(this.show_placeholder, this), this.hide_placeholder = t(this.hide_placeholder, this), e = a.__super__.constructor.apply(this, arguments)
        }
        return n(a, i), a.prototype.hide_placeholder = function () {
            return this.change_type("password"), a.__super__.hide_placeholder.call(this), $(this.elem).select().focus()
        }, a.prototype.show_placeholder = function () {
            return this.change_type("text"), a.__super__.show_placeholder.call(this)
        }, a.prototype.change_type = function (e) {
            var t, i, n, a, s;
            for ($(this.elem).unbind("blur"), i = $("<input type='" + e + "' >"), s = $(this.elem).prop("attributes"), n = 0, a = s.length; a > n; n++) t = s[n], "type" !== t.name && i.attr(t.name, t.value);
            return $(this.elem).replaceWith(i), this.elem = i, this.bind_events()
        }, a
    }(input_with_placeholder)
}.call(this),
function () {
    var e, t;
    jQuery(function () {
        return t.initialize(), e.setup()
    }), e = {
        setup: function () {
            return this.bindUIActions(), this.hideNonSelected()
        },
        c: function () {
            return $("body.home form.filters .practice-areas")
        },
        bindUIActions: function () {
            return this.c().find("input[type=radio]").on("click", function () {
                return e.hideAllExcept($(this))
            }), $(document).ready(function () {
                return $("#practice_areas.legal_domain").trigger("mouseleave")
            }), $("#practice_areas.legal_domain").mouseleave(function (e) {
                return $(e.target).find("#practice_area_lawyer_All").is(":checked") && !$(".search_wrapper #search_query").val().length && $("#practice_areas.legal_domain .practice-areas.expandeble").is(":visible") ? $("#practice_areas.legal_domain .practice-areas.expandeble").hide("slow") : void 0
            }), $("#practice_areas.legal_domain").mouseenter(function () {
                return $("#practice_areas.legal_domain .practice-areas.expandeble").is(":hidden") ? $("#practice_areas.legal_domain .practice-areas.expandeble").show("slow") : void 0
            })
        },
        hideNonSelected: function () {
            var e;
            return this.c().length ? (e = this.c().find("input[type=radio]").filter(":checked:first"), this.hideAllExcept(e)) : void 0
        },
        hideAllExcept: function (t) {
            var i, n;
            return n = t, i = e.c().find(".default-practice-area"), n.parent().hasClass("default-practice-area") ? (n.parent().siblings().show(), i.find("> label").text("All")) : (n.data("parent") ? (n.parents(".children.practice-areas").removeClass("hidden"), n.parents(".children.practice-areas").prev().siblings("p.practice-area").hide()) : n.parent().siblings("p.practice-area").hide(), i.show().find("> label").text("Other"))
        }
    }, t = {
        initialize: function () {
            return this.handleNewOfferingForm()
        },
        practice_area_select: function () {
            return $("form#offering_form select#offering_practice_area_id")
        },
        child_practice_area_select: function () {
            return $("form#offering_form select#offering_child_practice_area_id")
        },
        child_practice_area_field: function () {
            return $("form#offering_form .child_practice_area_field")
        },
        handleNewOfferingForm: function () {
            var e = this;
            return $("form#offering_form").live("submit", function () {
                return parseInt(e.child_practice_area_select().val()) > 0 ? e.child_practice_area_select().attr("name", "offering[practice_area_id]") : e.child_practice_area_select().removeAttr("name")
            }), this.practice_area_select().live("change", function () {
                var t, i;
                return i = e.practice_area_select().val(), t = "<option value>Select Service Type</option>", $.ajax({
                    url: "/practice_areas/" + i + "/children.json",
                    async: !1,
                    dataType: "json",
                    success: function (e) {
                        return e.practice_areas.length ? $.each(e.practice_areas, function (e, i) {
                            return t += "<option value='" + i.id + "'>" + i.name + "</option>"
                        }) : void 0
                    }
                }), e.child_practice_area_select().html(t), e.child_practice_area_field().removeClass("hidden"), $(".profile").find(".same_height").css("height", "auto"), equalHeight($(".profile").find(".same_height"))
            })
        }
    }, this.practice_areas = t, this.practiceAreaFilter = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleQuestionForm(), this.handleEvents(), this.bindUIActions(), this.fillMessageAndAppoinmentsModalsWithQuestion(), this.autosizeQuestionBody()
        },
        autosizeQuestionBody: function () {
            return $("form#new_question textarea#question_body").autosize()
        },
        new_question: function () {
            return $(".top_autoselect #new_question, #autoselect_landing_wraper #new_question")
        },
        question_body: function () {
            return $(".top_autoselect #question_body")
        },
        question_state: function () {
            return $(".top_autoselect #question_state")
        },
        question_area: function () {
            return $(".top_autoselect #question_area")
        },
        landingQuestionBody: function () {
            return $("body.welcome.index #autoselect_landing_wraper #question_body")
        },
        landingAskQuestionStateSelect: function () {
            return $("body.welcome.index #autoselect_landing_wraper select#question_state_id")
        },
        autoselectQuestionSubmitButton: function () {
            return this.new_question().find("#autoselect_question_submit_button, #second_autoselect_question_submit_button")
        },
        stateNameSelect: function () {
            return $("#state_and_practice_area_validation.autoselect .state_and_practice_area_validation_state_bot #state_name")
        },
        landingAutoselectQuestionSubmitButton: function () {
            return $("body.welcome.index #autoselect_landing_wraper #autoselect_question_submit_button, body.welcome.index #autoselect_landing_wraper #second_autoselect_question_submit_button")
        },
        animateQuestionBody: function (e) {
            var t, i;
            return t = $("form#new_question"), i = t.find("textarea#question_body"), t.hasClass("expanded") && 0 === i.val().length ? (t.find("#question_attachment_wrapper").addClass("hidden"), t.removeClass("expanded"), i.animate({
                width: "" + e + "px"
            }, 400)) : (t.addClass("expanded"), i.animate({
                width: "" + (e + 70) + "px"
            }, 400))
        },
        bindUIActions: function () {
            var e, t, i, n, a = this;
            return t = $("form#new_question textarea#question_body"), e = $("form#new_question #question_attachment_wrapper"), n = t.width(), i = t.height(), t.on("focusin", function () {
                return a.animateQuestionBody(n, i), e.removeClass("hidden")
            }), t.on("focusout", function () {
                return t.val().length ? void 0 : (a.animateQuestionBody(n, i), e.addClass("hidden"))
            }), e.find("#file_replacement").on("click", function () {
                return e.find("#question_attachment").removeClass("hidden").css("width", "0").css("height", "0").trigger("click")
            }), e.find("#question_attachment").on("change", function () {
                return $(this).val() ? e.find("label[for=file_replacement]").text(/([^\\]+)$/.exec($(this).val())[1]) : void 0
            })
        },
        handleEvents: function () {
            return $(".question.question-container #question_body").on("click", function () {
                return $(".question.question-container").hasClass("expanded") ? void 0 : $(".question.question-container").addClass("expanded")
            }), $(".questions_container .question_item").live("click", function () {
                return $(this).data("url").length ? window.location = $(this).data("url") : void 0
            }), $(".questions_container div.load-more a").live("click", function (e) {
                return $(this).html("Fetching more questions..."), $(".questions_container div.load-more").remove(), $.ajax({
                    url: $(e.target).attr("href"),
                    beforeSend: function () {
                        return $(".questions_container").addClass("loading")
                    },
                    complete: function () {
                        return $(".questions_container").removeClass("loading")
                    },
                    success: function (e) {
                        return $(".questions_container").append(e)
                    }
                }), !1
            }), $("body.welcome.index #autoselect_landing_wraper #question_body, #autoselect_question #question_body").on("blur", function () {
                return $(this).val().length ? $.cookie("question_text", $(this).val(), {
                    expires: 1,
                    path: "/"
                }) : void 0
            })
        },
        fillMessageAndAppoinmentsModalsWithQuestion: function () {
            return $.cookie("question_text") ? $("#schedule_session #message_body, .new_appointment #appointment_message").val($.cookie("question_text")) : void 0
        },
        handleQuestionForm: function () {
            var e = this;
            return e = this, this.question_body().on("blur", function () {
                var t;
                return e.new_question().length && (t = e.question_body().val(), t.length) ? e.question_body().val(t.strip_tags()) : void 0
            }), this.landingQuestionBody().on("click", function () {
                return e.state_id ? void 0 : e.getState()
            }), this.landingAutoselectQuestionSubmitButton().on("click", function () {
                return e.state_id ? void 0 : e.getState()
            }), this.autoselectQuestionSubmitButton().on("click", function () {
                return $("#new_question #question_body").val() ? e.state_id || e.question_state().find("#question_state_id").val() > 0 ? !0 : ($("#dialog-overlay, #state_and_practice_area_validation").show(), $("#state_and_practice_area_validation").addClass("autoselect"), e.checkStatePresence(), !1) : (alert("You can not send blank question."), !1)
            }), $("#state_and_practice_area_validation #autoselect_continue_button").on("click", function () {
                return e.new_question().submit()
            }), $("#state_and_practice_area_validation #state_name").on("change", function () {
                return $("#state_and_practice_area_validation").hasClass("autoselect") ? e.checkStatePresence() : void 0
            })
        },
        checkStatePresence: function () {
            return $(".state_and_practice_area_validation_state_bot #state_name").val() > 0 ? ($(".question_state #question_state_id").val($(".state_and_practice_area_validation_state_bot #state_name").val()), $("#autoselect_continue_button").removeAttr("disabled")) : $("#autoselect_continue_button").attr("disabled", "disabled")
        },
        getState: function () {
            var e = this;
            return $.ajax("/auto-detect/detect-state?autodetect=need", {
                success: function () {
                    return e.selectQuestionState()
                },
                dataType: "script"
            })
        },
        selectQuestionState: function () {
            return "undefined" != typeof detect_state_id && "" !== detect_state_id ? (this.state_id = detect_state_id, this.landingAskQuestionStateSelect().val(this.state_id)) : void 0
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        },
        flash: function (e, t) {
            return null == t && (t = "notice"), $.ajax({
                url: "/flash/" + t,
                type: "POST",
                async: !1,
                data: {
                    message: e,
                    token: this.token()
                }
            })
        }
    }, this.questions = e
}.call(this),
function () {
    var e, t, i;
    t = i = 0, e = function () {
        function e() {}
        return e.prototype.initialize = function () {
            return this.updateOnlineStatus()
        }, e.prototype.updateOnlineStatus = function () {
            return 0 === t && "undefined" != typeof lawyer_id ? t = setInterval(function () {
                return window.location !== "/users/" + lawyer_id + "/chat_session" ? i = $.ajax({
                    url: "/UpdateOnlineStatus",
                    type: "post",
                    cache: !1,
                    data: "op=get_call_status&lawyer_id=" + lawyer_id + "&call_mode=",
                    success: function (e) {
                        return window.location !== "/users/" + lawyer_id + "/chat_session" && is_lawyer && "invite_video_chat" === e ? window.location = "/users/" + lawyer_id + "/chat_session" : void 0
                    }
                }) : void 0
            }, 1e4) : void 0
        }, e
    }(), this.RealtimeChecker = new e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleAnswerResponseForm()
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        },
        response_link: function () {
            return $(".response_container .response_link")
        },
        answerResponseFormContainer: function () {
            return $(".response_container .response_form")
        },
        answerResponseForm: function () {
            return this.answerResponseFormContainer().find("form.new_response")
        },
        equalHeight: function () {
            return $(".profile").find(".same_height").css("height", "auto"), equalHeight($(".profile").find(".same_height"))
        },
        handleAnswerResponseForm: function () {
            return this.response_link().on("click", function () {
                return e.answerResponseFormContainer().addClass("hidden"), $(this).parents(".response_container").find(".response_form").toggleClass("hidden"), e.equalHeight()
            }), this.answerResponseForm().on("submit", function () {
                var t, i = this;
                return t = $(this).serialize(), t.authenticity_token = e.token(), $.ajax({
                    url: "/responses.json",
                    type: "POST",
                    data: t,
                    beforeSend: function () {
                        return $(i).parents(".response_container").addClass("loading")
                    },
                    complete: function () {
                        return $(i).parents(".response_container").removeClass("loading")
                    },
                    success: function (t) {
                        return t.id ? ($(i).parents(".response_container").find(".response_link").text("Your response has been sent."), $(i).parents(".response_container").find(".response_form").addClass("hidden"), e.loadResponse(t.id, $(i).parents(".answer_container").find(".answer_responses"))) : void 0
                    }
                }), !1
            })
        },
        loadResponse: function (e, t) {
            return $.ajax({
                url: "/responses/" + e + ".html",
                type: "GET",
                dataType: "html",
                success: function (e) {
                    return $(t).prepend(e)
                }
            })
        }
    }, this.responses = e
}.call(this),
function () {}.call(this),
function () {
    var e = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    jQuery($(function () {
        return !$.browser.webkit & !$.browser.safari ? $("select.select_medium, select.select_small, select.customstyle").each(function () {
            return new SelectControl(this)
        }) : void 0
    })), window.SelectControl = function () {
        function t(t) {
            this.get_css_value = e(this.get_css_value, this), this.set_span_css_values = e(this.set_span_css_values, this), this.on_change = e(this.on_change, this), this.bind_events = e(this.bind_events, this), this.align = e(this.align, this), this.set_wrapper_size = e(this.set_wrapper_size, this), this.setup_elements = e(this.setup_elements, this), this.elem = $(t), this.title = "" !== $("option:selected", this.elem).val() ? $("option:selected", this.elem).text() : this.elem.attr("prompt"), void 0 === this.title && (this.title = $("option:first", this.elem).text()), this.elem.wrap('<div class="custom_style_select_wrapper"></div>'), this.wrap = this.elem.parents(".custom_style_select_wrapper"), this.elem.after('<span class="select_formatting">' + this.title + "</span>"), this.span = this.elem.next(), this.flag = !1, "fix" === this.elem.attr("ff_padding") && ($.browser.mozilla && (this.flag = !0), $.browser.msie && 9 === parseInt($.browser.version) && (this.flag = !0)), this.setup_elements(), this.bind_events()
        }
        return t.prototype.setup_elements = function () {
            return this.set_wrapper_size(), this.set_span_css_values(["margin", "margin-top", "margin-left", "margin-right", "margin-bottom", "float"], this.elem, this.wrap), this.elem.css("margin", "0px 0px 0px 0px"), this.elem.css("float", "none"), this.flag === !0 ? this.span.css("margin-top", "-" + (this.elem.innerHeight() - this.get_css_value("padding-top", this.elem) - this.get_css_value("padding-bottom", this.elem)) + "px") : this.span.css("margin-top", "-" + this.elem.innerHeight() + "px"), this.set_span_css_values(["padding", "padding-top", "padding-bottom", "padding-left", "padding-right", "color", "font-size", "line-height"], this.elem, this.span), this.set_span_css_values(["background", "background-image", "border-radius"], this.elem, this.wrap), this.span.css("z-index", 1), this.elem.css("z-index", 100), this.elem.css("position", "relative"), this.elem.fadeTo(0, 0)
        }, t.prototype.set_wrapper_size = function () {
            return this.flag === !0 ? (this.wrap.css("width", this.elem.innerWidth() - this.get_css_value("padding-left", this.elem) - this.get_css_value("padding-right", this.elem) + "px"), this.wrap.css("height", this.elem.innerHeight() - this.get_css_value("padding-top", this.elem) - this.get_css_value("padding-bottom", this.elem) + "px")) : (this.wrap.css("width", this.elem.innerWidth() + "px"), this.wrap.css("height", this.elem.innerHeight() + "px"))
        }, t.prototype.align = function () {
            return this.elem.css("margin", ""), this.set_span_css_values(["margin", "margin-top", "margin-left", "margin-right", "margin-bottom"], this.elem, this.wrap), this.elem.css("margin", "0 0")
        }, t.prototype.bind_events = function () {
            var e = this;
            return this.elem.bind({
                change: function () {
                    return e.on_change()
                },
                align: function () {
                    return e.align()
                },
                add_class: function (t, i) {
                    return $(e.wrap).addClass(i)
                },
                remove_class: function (t, i) {
                    return $(e.wrap).removeClass(i)
                }
            })
        }, t.prototype.on_change = function () {
            return $(this.span).text($("option:selected", this.elem).text())
        }, t.prototype.set_span_css_values = function (e, t, i) {
            var n, a, s, r;
            for (r = [], a = 0, s = e.length; s > a; a++) n = e[a], null !== t.css(n) && r.push($(i).css(n, t.css(n)));
            return r
        }, t.prototype.get_css_value = function (e, t) {
            var i, n;
            return n = 0, i = /([\d, -]+)px/i.exec($(t).css(e)), null !== i && null !== i[1] && (n = parseInt(i[1], 10)), n
        }, t
    }()
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.setup()
    }), e = {
        setup: function () {
            return this.bindUIActions()
        },
        selectedOption: function () {
            return $("select#service_proposal_offering_id").find(":selected")
        },
        updateFeeValue: function () {
            return $("input#service_proposal_fee").val(this.selectedOption().data("default-fee"))
        },
        toggleNameField: function () {
            var e;
            return e = $("input#service_proposal_offering_attributes_name").parents(".input").length > 0 ? $("input#service_proposal_offering_attributes_name").parents(".input") : $("input#service_proposal_offering_attributes_name"), this.selectedOption().val() ? e.hide() : e.show()
        },
        updateClientId: function (e) {
            return $("input#service_proposal_client_id").val(e)
        },
        updateOfferingId: function () {
            return $("input#service_proposal_offering_attributes_id").val(this.selectedOption().val())
        },
        callback: function () {
            return $("form#new_service_proposal .button").removeAttr("disabled"), $("form#new_service_proposal .callback-message").text("Sent successfully!").delay(3e3).fadeOut()
        },
        changeOfferingType: function () {
            return this.changeLabels($('input[name="service_proposal[offering_attributes][service_type]"]:checked').val())
        },
        changeLabels: function (e) {
            switch (e) {
            case "flat_fee":
                return $('label[for="service_proposal_offering_attributes_name"] :first').text("Name of service:"), $('label[for="service_proposal_fee"] :first').text("Price of service:"), $('label[for="service_proposal_message"]').text("Description:"), $("select#service_proposal_duration").parents(".input").addClass("hidden");
            case "consultation":
                return $('label[for="service_proposal_offering_attributes_name"] :first').text("Purpose of consultation:"), $('label[for="service_proposal_fee"] :first').text("Price for consultation:"), $('label[for="service_proposal_message"]').text("Instructions on how to prepare for consultation:"), $("select#service_proposal_duration").parents(".input").removeClass("hidden")
            }
        },
        bindUIActions: function () {
            var e = this;
            return $("select#service_proposal_offering_id").on("change", function () {
                return e.updateFeeValue(), e.toggleNameField(), e.updateOfferingId()
            }), $('form#new_service_proposal input[name="service_proposal[offering_attributes][service_type]"]').on("change", function () {
                return e.changeOfferingType()
            }), $("a[href=#service_proposal]").on("click", function (t) {
                return e.updateClientId($(t.target).closest(".feed_item").data("client-id"))
            })
        }
    }, this.serviceProposals = e
}.call(this),
function () {}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.practice_areas = [], this.states = [], this.handleStateAndPracticeAreaDialogWindow(), this.handleStateAndPracticeAreaValidation(), this.handleStateAndPracticeAreaValidationForm()
        },
        online_icons: function () {
            return $(".online_icons span.video.online a, .online_icons span.voice.online a")
        },
        dialog_overlay: function () {
            return $("#dialog-overlay")
        },
        dialog_close: function () {
            return $(".dialog-close")
        },
        dialog_overlay_and_close: function () {
            return $("#dialog-overlay, .dialog-close")
        },
        dialog_div: function () {
            return $("#state_and_practice_area_validation")
        },
        dialog_window: function () {
            return $(".dialog-window").draggable()
        },
        close: function () {
            return $('<div class="dialog-close"></div>')
        },
        dialog_opener: function () {
            return $(".state-and-practice-area-validation-dialog-opener")
        },
        continue_button: function () {
            return $("#state_and_practice_area_validation #continue_button")
        },
        fill_practice_area_state_select_from_cookie: function () {
            return $.cookie("state_id") && this.state_name_select().val($.cookie("state_id")), $.cookie("practice_area_id") ? this.practice_area_select().val($.cookie("practice_area_id")) : void 0
        },
        update_practice_area_state_select_from_cookie: function () {
            return $.cookie("state_id") && this.state_name_select().val($.cookie("state_id")), $.cookie("practice_area_id") ? this.practice_area_select().val($.cookie("practice_area_id")) : void 0
        },
        handleStateAndPracticeAreaDialogWindow: function () {
            var e = this;
            return this.dialog_div().append(this.close()), this.dialog_overlay_and_close().live("click", function () {
                return e.dialog_window().hide(), e.close().hide(), e.dialog_overlay().hide()
            })
        },
        handleStateAndPracticeAreaValidation: function () {
            var e;
            return e = this, this.dialog_opener().live("click", function () {
                if ($("#state_and_practice_area_validation").removeClass("autoselect"), e.practice_areas = [], e.states = [], void 0 !== $(this).attr("data-l-id")) {
                    if ($(".current_selected_lawyer").val($(this).attr("data-l-id")), $("div#state_and_practice_area_validation span.lawyer_name").html($(this).attr("data-fullname")), e.url = $(this).attr("href"), e.checkLawyersStateAndPracticeArea()) return !0;
                    e.dialog_overlay().show(), e.dialog_div().show()
                }
                return !1
            })
        },
        handleStateAndPracticeAreaValidationForm: function () {
            var e = this;
            return this.fill_practice_area_state_select_from_cookie(), this.state_name_and_practice_area_select().on("change", function () {
                return $("#state_and_practice_area_validation").hasClass("autoselect") ? void 0 : e.checkLawyersStateAndPracticeArea()
            }), this.continue_button().live("click", function () {
                return e.checkLawyersStateAndPracticeArea() ? window.location.href = e.url : void 0
            })
        },
        checkLawyersStateAndPracticeArea: function () {
            var e, t, i, n, a, s;
            return i = this.state_name_select().val(), n = this.state_name_select().find("option[value='" + i + "']").text(), e = this.practice_area_select().val(), t = this.practice_area_select().find("option[value='" + e + "']").text(), a = $("input#lawyer_id").val(), s = $("#state_and_practice_area_validation span.lawyer_name").text(), this.isLawyersState(i, a) && this.isLawyersPracticeArea(e, a) ? (this.enable_submit_message_button(), this.clear_state_and_practice_area_validation_warning(), $.cookie("state_id", i, {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area_id", e, {
                expires: 30,
                path: "/"
            }), $.cookie("state", this.state_name_for_url(n), {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area", this.practice_area_name_for_url(t), {
                expires: 30,
                path: "/"
            }), !0) : this.isStateSelected() || this.isPracticeAreaSelected() ? this.isPracticeAreaSelected() ? this.isStateSelected() || this.isPracticeAreaNational() ? this.isLawyersState(i, a) && !this.isLawyersPracticeArea(e, a) ? (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_practice_area_warning(t, s), !1) : !this.isLawyersState(i, a) && this.isLawyersPracticeArea(e, a) ? (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_state_warning(n, s), !1) : (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_state_and_practice_area_warning(n, t, s), !1) : (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_state_missing_warning(), !1) : (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_practice_area_missing_warning(), !1) : (this.disable_submit_message_button(), this.write_state_and_practice_area_validation_state_and_practice_area_missing_warning(), !1)
        },
        state_name_select: function () {
            return $("#state_and_practice_area_validation #state_name")
        },
        practice_area_select: function () {
            return $("#state_and_practice_area_validation #practice_area")
        },
        state_name_and_practice_area_select: function () {
            return $("#state_and_practice_area_validation #state_name, #state_and_practice_area_validation #practice_area")
        },
        state_and_practice_area_validation_warning: function () {
            return $("#state_and_practice_area_validation #state_and_practice_area_validation_warning")
        },
        isStateSelected: function () {
            return parseInt(this.state_name_select().val()) > 0
        },
        isPracticeAreaSelected: function () {
            return parseInt(this.practice_area_select().val()) > 0
        },
        isStateAndPracticeAreaSelected: function () {
            return this.isStateSelected() && this.isPracticeAreaSelected()
        },
        isPracticeAreaNational: function () {
            var e, t;
            return e = this.practice_area_select().val(), t = this.practice_area_select().find("option[value='" + e + "']").attr("is_national"), "true" === t
        },
        isLawyersPracticeArea: function (e, t) {
            var i = this;
            return "" === e ? !1 : (this.practice_areas.length || $.ajax({
                url: "/lawyers/" + t + "/practice_areas.json",
                async: !1,
                dataType: "json",
                success: function (e) {
                    return e.practice_areas.length ? $.each(e.practice_areas, function (e, t) {
                        return i.practice_areas.push(t)
                    }) : void 0
                }
            }), this.inArray(e, this.practice_areas))
        },
        write_state_and_practice_area_validation_state_and_practice_area_warning: function (e, t, i) {
            var n, a, s;
            return this.isStateSelected(), a = this.state_name_for_url(e), n = this.practice_area_name_for_url(t), s = "" + i + " isn't licensed in " + e + " and doesn't advise on " + t + " and thus can't help you. Find <a href='/lawyers/Legal-Advice/" + a + "/" + n + "'>" + e + " lawyers advising on " + t + "</a>", this.state_and_practice_area_validation_warning().html(s)
        },
        write_state_and_practice_area_validation_practice_area_warning: function (e, t) {
            var i, n;
            return i = this.practice_area_name_for_url(e), n = "" + t + " doesn't advise on " + e + " and thus can't help you. Find <a href='/lawyers/Legal-Advice/All-States/" + i + "'>Lawyers advising on " + e + "</a>", this.state_and_practice_area_validation_warning().html(n)
        },
        write_state_and_practice_area_validation_state_warning: function (e, t) {
            var i, n;
            return i = this.state_name_for_url(e), n = "" + t + " isn't licensed in " + e + " and thus can't help you. Find <a href='/lawyers/Legal-Advice/" + i + "'>" + e + " lawyers</a>", this.state_and_practice_area_validation_warning().html(n)
        },
        write_state_and_practice_area_validation_state_and_practice_area_missing_warning: function () {
            var e;
            return e = "Please select state and type of law.", this.state_and_practice_area_validation_warning().html(e)
        },
        write_state_and_practice_area_validation_state_missing_warning: function () {
            var e;
            return e = "Please select state.", this.state_and_practice_area_validation_warning().html(e)
        },
        write_state_and_practice_area_validation_practice_area_missing_warning: function () {
            var e;
            return e = "Please select type of law.", this.state_and_practice_area_validation_warning().html(e)
        },
        practice_area_name_for_url: function (e) {
            return e.replace(/\s+/g, "-")
        },
        state_name_for_url: function (e) {
            return "" + e.replace(/\s+/g, "_") + "-lawyers"
        },
        clear_state_and_practice_area_validation_warning: function () {
            return this.state_and_practice_area_validation_warning().html("")
        },
        isLawyersState: function (e, t) {
            var i = this;
            return this.isPracticeAreaNational() ? !0 : "" === e ? !1 : (this.states.length || $.ajax({
                url: "/lawyers/" + t + "/states.json",
                async: !1,
                dataType: "json",
                success: function (e) {
                    return e.states.length ? $.each(e.states, function (e, t) {
                        return i.states.push(t)
                    }) : void 0
                }
            }), this.inArray(e, this.states))
        },
        inArray: function (e, t) {
            var i;
            return i = !1, $.each(t, function (t, n) {
                return e === n.id.toString() ? i = !0 : void 0
            }), i
        },
        disable_submit_message_button: function () {
            return this.continue_button().attr("disabled", "disabled")
        },
        enable_submit_message_button: function () {
            return this.continue_button().removeAttr("disabled")
        }
    }, this.state_and_practice_area_validation = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleBrowseLawyersStateChosen(), this.handleCallStateChosen()
        },
        handleBrowseLawyersStateChosen: function () {
            var e = this;
            return $('#state_id_chzn .chzn-search input[type="text"]').on("keyup", function (t) {
                return 2 === $(t.target).val().length ? e.searchBrowseLawyersStateByAbbreviation($(t.target).val()) : void 0
            })
        },
        searchBrowseLawyersStateByAbbreviation: function (e) {
            var t = this;
            return 2 === e.length ? $.ajax({
                url: "/states/search.json",
                type: "POST",
                dataType: "json",
                data: {
                    abbreviation: e,
                    authenticity_token: this.token()
                },
                success: function (e) {
                    return e.result ? t.selectBrowseLawyersStateChosen(e.state) : void 0
                }
            }) : void 0
        },
        selectBrowseLawyersStateChosen: function (e) {
            var t;
            return t = $("select#state_id.chosen-select option[value='" + e.id + "'], select#state_id.chosen-select option[data-id='" + e.id + "']").index("select#state_id.chosen-select option"), t > -1 ? ($("#state_id_chzn .chzn-results li:eq(" + t + ")").addClass("active-result"), $("#state_id_chzn .chzn-results .no-results").hide()) : void 0
        },
        handleCallStateChosen: function () {
            var e = this;
            return $('#call_state_id_chzn .chzn-search input[type="text"]').on("keyup", function (t) {
                return 2 === $(t.target).val().length ? e.searchCallStateByAbbreviation($(t.target).val()) : void 0
            })
        },
        searchCallStateByAbbreviation: function (e) {
            var t = this;
            return 2 === e.length ? $.ajax({
                url: "/states/search.json",
                type: "POST",
                dataType: "json",
                data: {
                    abbreviation: e,
                    authenticity_token: this.token()
                },
                success: function (e) {
                    return e.result ? t.selectCallStateChosen(e.state) : void 0
                }
            }) : void 0
        },
        selectCallStateChosen: function (e) {
            var t;
            return t = $("select#call_state_id.chosen-select option[value='" + e.id + "']").index("select#call_state_id.chosen-select option"), t > -1 ? ($("#call_state_id_chzn .chzn-results li:eq(" + t + ")").addClass("active-result"), $("#call_state_id_chzn .chzn-results .no-results").hide()) : void 0
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        }
    }
}.call(this),
function () {
    var e, t;
    jQuery(function () {
        return Stripe.setPublishableKey($('meta[name="stripe-key"]').attr("content")), t.setupForm(), e.setupForm()
    }), e = {
        setupForm: function () {
            return $("#new_callpayment").submit(function () {
                return $("input[type=submit]").attr("disabled", !0), $("#card_number").length ? (e.processCard(), !1) : !0
            })
        },
        processCard: function () {
            var t;
            return t = {
                number: $("#card_number").val(),
                cvc: $("#card_cvc").val(),
                expMonth: $("#card_month").val(),
                expYear: $("#card_year").val()
            }, Stripe.createToken(t, e.handleStripeResponse)
        },
        handleStripeResponse: function (e, t) {
            return 200 === e ? ($("#client_stripe_card_token").val(t.id), $("#new_callpayment")[0].submit()) : ($("#stripe_error").text(t.error.message), $("input[type=submit]").attr("disabled", !1))
        }
    }, t = {
        form: function () {
            return $("#new_subscription, #payment-form, #new_client.with_card_details, .update_card form.edit_lawyer, .update_card form.edit_client")
        },
        setupForm: function () {
            return this.form().submit(function () {
                return $("input[type=submit]").attr("disabled", !0), $("#card_number").length ? (t.processCard(), !1) : !0
            }), $("#apply_coupon_button").click(function () {
                var e, i, n;
                return i = $("[name='csrf-token']").attr("content"), e = $("input#coupon"), n = this, $.ajax({
                    url: $(this).attr("href"),
                    type: "POST",
                    data: {
                        coupon: e.val(),
                        authenticity_token: i
                    },
                    beforeSend: function () {
                        return $(n).find(".gray_button").text("Checking...")
                    },
                    complete: function () {
                        return $(n).find(".gray_button").text("Apply")
                    },
                    success: function (i) {
                        return i.result ? (e.removeClass("invalid"), e.addClass("valid"), t.prepareApplyCouponMessage(i.coupon)) : (e.removeClass("valid"), e.addClass("invalid"))
                    }
                }), !1
            })
        },
        prepareApplyCouponMessage: function (e) {
            var t, i;
            switch (t = $("input#stripe_plan_amount").val(), i = "", e.percent_off ? i += "$" + parseFloat(t - .01 * t * e.percent_off).toFixed(2) : e.amount_off && .01 * e.amount_off >= t ? i += "$0" : e.amount_off && .01 * e.amount_off < t && (i += "$" + parseFloat(t - .01 * e.amount_off).toFixed(2)), e.duration) {
            case "forever":
                i += " forever.";
                break;
            case "repeating":
                i += "/month for the first " + e.duration_in_months + " month, $" + t + " thereafter.";
                break;
            case "once":
                i += "/month for the first one month, $" + t + " thereafter."
            }
            return $("span#subscription_price").text(i)
        },
        processCard: function () {
            var e;
            return e = {
                number: $("#card_number").val(),
                cvc: $("#card_cvc").val(),
                expMonth: $("#card_month").val(),
                expYear: $("#card_year").val()
            }, Stripe.createToken(e, t.handleStripeResponse)
        },
        handleStripeResponse: function (e, t) {
            return 200 !== e ? ($("#stripe_error").text(t.error.message), $("input[type=submit]").attr("disabled", !1)) : ($("#new_subscription").length && ($("#lawyer_stripe_card_token").val(t.id), $("#new_subscription")[0].submit()), $("#payment-form").length && ($("#client_stripe_card_token").val(t.id), $("#payment-form")[0].submit()), $("#new_client.with_card_details").length && ($("#client_stripe_card_token").val(t.id), $("#new_client.with_card_details")[0].submit()), $(".update_card form.edit_lawyer").length && ($("#lawyer_stripe_card_token").val(t.id), $(".update_card form.edit_lawyer")[0].submit()), $(".update_card form.edit_client").length ? ($("#client_stripe_card_token").val(t.id), $(".update_card form.edit_client")[0].submit()) : void 0)
        },
        subscribeClientWithStripeCheckoutPopup: function () {
            return $("form#new_client").on("submit", function () {
                return t.stripeCheckoutForm()
            })
        },
        stripeCheckoutData: function (e) {
            return $("#stripeCheckout").data(e)
        },
        stripeCheckoutForm: function () {
            var e;
            return $("#stripeCheckout").length ? (e = function (e) {
                return t.subscribeClient(e.id)
            }, StripeCheckout.open({
                key: this.stripeCheckoutData("key"),
                address: this.stripeCheckoutData("address"),
                amount: this.stripeCheckoutData("amount"),
                name: this.stripeCheckoutData("name"),
                description: this.stripeCheckoutData("description"),
                panelLabel: this.stripeCheckoutData("panellabel"),
                image: this.stripeCheckoutData("image"),
                token: e
            }), t.interval = setInterval("subscription.goToLawyersPageOnStripeCheckoutClose()", 1e3), !0) : void 0
        },
        goToLawyersPageOnStripeCheckoutClose: function () {
            return t.checkStripeCheckoutClosed() ? ($("div#container").addClass("loading"), clearInterval(t.interval), window.location.href = "/lawyers") : void 0
        },
        checkStripeCheckoutClosed: function () {
            return 0 === $(".stripe-app:visible").length
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        },
        subscribeClient: function (e) {
            return $.ajax({
                url: "/stripe/subscribe_client_create.json",
                type: "POST",
                dataType: "json",
                data: {
                    stripe_card_token: e,
                    authenticity_token: t.token()
                },
                complete: function () {
                    return $("div#container").removeClass("loading")
                },
                beforeSend: function () {
                    return $("div#container").addClass("loading")
                },
                success: function () {
                    return window.location.href = "/lawyers"
                }
            })
        }
    }, this.subscription = t
}.call(this);
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
                r = "MMredirectURL=" + D.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + s + "&MMdoctitle=" + I.title;
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
                    for (var a = n.length, s = 0; a > s; s++) 1 == n[s].nodeType && "PARAM" == n[s].nodeName || 8 == n[s].nodeType || t.appendChild(n[s].cloneNode(!0))
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
            if (typeof M.plugins != A && typeof M.plugins[E] == z) l = M.plugins[E].description, !l || typeof M.mimeTypes != A && M.mimeTypes[j] && !M.mimeTypes[j].enabledPlugin || (O = !0, r = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), o[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), o[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), o[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
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
    var e;
    jQuery(function () {
        return e.askQuestionBody().attr("autocomplete", "off")
    }), jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleAskQuestionForm(), this.handleBrowseLawyersPracticeAreaChosen(), this.handleCallPracticeAreaChosen(), this.handleSearchForm()
        },
        browseLawyersPracticeAreaChosenInput: function () {
            return $('.browse_lawyers_block #practice_area_id_chzn .chzn-search input[type="text"]')
        },
        handleBrowseLawyersPracticeAreaChosen: function () {
            var e = this;
            return this.browseLawyersPracticeAreaChosenInput().attr("placeholder", "Keyword or category"), this.browseLawyersPracticeAreaChosenInput().on("keyup", function (t) {
                return $(t.target).val().length ? (e.searchTermForBrowseLawyersPracticeAreaChosen($(t.target).val()), $(".browse_lawyers_block #practice_area_id_chzn .chzn-results li.active-result.child").each(function () {
                    return $(this).prevAll(".parent").first().addClass("active-result")
                })) : void 0
            }), $(".browse_lawyers_block #practice_area_id").on("change", function () {
                return $(".browse_lawyers_block a#browse_lawyers_button").trigger("click")
            })
        },
        searchTermForBrowseLawyersPracticeAreaChosen: function (e) {
            var t = this;
            return this.parentPracticeArea = null, this.childPracticeArea = null, e.length ? $.ajax({
                url: "/terms/search/like.json",
                type: "POST",
                dataType: "json",
                data: {
                    name: e,
                    authenticity_token: this.token()
                },
                success: function (e) {
                    if (e.result) {
                        if (e.childPracticeArea) return t.selectBrowseLawyersPracticeAreaChosen(e.childPracticeArea, e.term.name);
                        if (e.parentPracticeArea) return t.selectBrowseLawyersPracticeAreaChosen(e.parentPracticeArea, e.term.name)
                    }
                }
            }) : void 0
        },
        selectBrowseLawyersPracticeAreaChosen: function (e, t) {
            var i, n;
            return i = $(".browse_lawyers_block select#practice_area_id option[value='" + e.id + "']").index(".browse_lawyers_block select#practice_area_id option"), i > -1 ? (n = $(".browse_lawyers_block #practice_area_id_chzn .chzn-results li:eq(" + i + ")"), /matched/i.test(n.text()) || n.text("" + $(n).text() + " (matched: " + t + ")"), n.addClass("active-result"), $(".browse_lawyers_block #practice_area_id_chzn .chzn-results .no-results").hide(), $(".browse_lawyers_block #practice_area_id_chzn .chzn-results li.active-result.child").each(function () {
                return $(this).prevAll(".parent").first().addClass("active-result")
            })) : void 0
        },
        callPracticeAreaChosenInput: function () {
            return $('.get_a_call_block #call_practice_area_id_chzn .chzn-search input[type="text"]')
        },
        handleCallPracticeAreaChosen: function () {
            var e = this;
            return this.callPracticeAreaChosenInput().attr("placeholder", "Keyword or category"), this.callPracticeAreaChosenInput().on("keyup", function (t) {
                return $(t.target).val().length ? (e.searchTermForCallPracticeAreaChosen($(t.target).val()), $(".get_a_call_block #call_practice_area_id_chzn .chzn-results li.active-result.child").each(function () {
                    return $(this).prevAll(".parent").first().addClass("active-result")
                })) : void 0
            }), $(".get_a_call_block #set_state_anyway").on("click", function () {
                return $(".get_a_call_block #call_state_id_chzn.hidden").removeClass("hidden"), $(".get_a_call_block .not_state_specific").addClass("hidden"), $(".get_a_call_block select#call_state_id").attr("name", "state_id"), !1
            }), $(".get_a_call_block select#call_practice_area_id").on("change", function () {
                var e;
                return $(this).val() ? (e = $(this).find("option[value='" + $(this).val() + "']"), e.data("is-national") ? ($(".get_a_call_block #call_state_id_chzn").addClass("hidden"), $(".get_a_call_block .not_state_specific .practice_area_name").text(e.text()), $(".get_a_call_block .not_state_specific.hidden").removeClass("hidden"), $(".get_a_call_block select#call_state_id").attr("name", "")) : ($(".get_a_call_block #call_state_id_chzn.hidden").removeClass("hidden"), $(".get_a_call_block .not_state_specific").addClass("hidden"), $(".get_a_call_block select#call_state_id").attr("name", "state_id"))) : void 0
            })
        },
        searchTermForCallPracticeAreaChosen: function (e) {
            var t = this;
            return this.parentPracticeArea = null, this.childPracticeArea = null, e.length ? $.ajax({
                url: "/terms/search/like.json",
                type: "POST",
                dataType: "json",
                data: {
                    name: e,
                    authenticity_token: this.token()
                },
                success: function (e) {
                    if (e.result) {
                        if (e.childPracticeArea) return t.selectCallPracticeAreaChosen(e.childPracticeArea, e.term.name);
                        if (e.parentPracticeArea) return t.selectCallPracticeAreaChosen(e.parentPracticeArea, e.term.name)
                    }
                }
            }) : void 0
        },
        selectCallPracticeAreaChosen: function (e, t) {
            var i, n;
            return i = $(".get_a_call_block select#call_practice_area_id option[value='" + e.id + "']").index(".get_a_call_block select#call_practice_area_id option"), i > -1 ? (n = $(".get_a_call_block #call_practice_area_id_chzn .chzn-results li:eq(" + i + ")"), /matched/i.test(n.text()) || n.text("" + $(n).text() + " (matched: " + t + ")"), n.addClass("active-result"), $(".get_a_call_block #call_practice_area_id_chzn .chzn-results .no-results").hide(), $(".get_a_call_block #call_practice_area_id_chzn .chzn-results li.active-result.child").each(function () {
                return $(this).prevAll(".parent").first().addClass("active-result")
            })) : void 0
        },
        searchForm: function () {
            return $(".terms_search .search_wrapper")
        },
        searchFormBody: function () {
            return this.searchForm().find("#search_query")
        },
        searchTalkLi: function () {
            return this.searchForm().find("li.talk_li")
        },
        searchAskLi: function () {
            return this.searchForm().find("li.ask_li")
        },
        handleSearchForm: function () {
            var e = this;
            return this.searchFormBody().on("click", function (t) {
                return $(t.target).val().length > 2 ? (e.getTermsForSearchField($(t.target).val()), e.getLawyersForSearchField($(t.target).val())) : void 0
            }), this.searchFormBody().on("keyup", function (t) {
                return $(t.target).val().length > 2 ? (e.getTermsForSearchField($(t.target).val()), e.getLawyersForSearchField($(t.target).val())) : void 0
            })
        },
        practiceAreaNameForUrl: function () {
            return $('.sticky_filters #practice_areas input[name="practice_area_lawyer"]:checked').val()
        },
        stateNameForUrl: function () {
            return $(".sticky_filters .state_wrapper #state_id").val()
        },
        getTermsForSearchField: function (e) {
            var t = this;
            return this.terms = [], $.ajax({
                url: "/terms/autocomplete.json",
                type: "POST",
                dataType: "json",
                data: {
                    name: e,
                    authenticity_token: this.token()
                },
                success: function (i) {
                    return i.terms.length ? (t.terms = i.terms, t.tmpl(e)) : void 0
                }
            }), this.terms.slice(0, 4)
        },
        getLawyersForSearchField: function (e) {
            var t = this;
            return this.lawyers = [], $.ajax({
                url: "/lawyers/Legal-Advice/" + this.stateNameForUrl() + "/" + this.practiceAreaNameForUrl() + "/sort_by/availability/with_photos.json?search_query=" + e,
                type: "POST",
                data: {
                    authenticity_token: this.token()
                },
                dataType: "json",
                success: function (i) {
                    return i.lawyers.length ? (t.lawyers = i.lawyers, t.tmpl(e)) : void 0
                }
            }), this.lawyers.slice(0, 4)
        },
        tmpl: function () {
            var e;
            return this.terms || (this.terms = []), this.lawyers || (this.lawyers = []), e = {
                searchBody: this.searchFormBody().val()
            }, e.terms = this.terms, e.lawyers = this.lawyers, e.stateNameForUrl = this.stateNameForUrl(), $("#search_terms_list").replaceWith($("#searchTemplate").tmpl(e))
        },
        askQuestionForm: function () {
            return $("#autoselect_question form#new_question")
        },
        askQuestionBody: function () {
            return this.askQuestionForm().find("textarea#question_body")
        },
        askQuestionStateSelect: function () {
            return this.askQuestionForm().find("select#question_state_id")
        },
        token: function () {
            return $("[name='csrf-token']").attr("content")
        },
        askQuestionTemplate: function (e) {
            var t;
            return t = {
                questionBody: $(e).val()
            }, this.parentPracticeArea && (t.parentPracticeArea = this.parentPracticeArea), this.childPracticeArea && (t.childPracticeArea = this.childPracticeArea), t.state = this.state ? this.state : !1, $("#askQuestionTemplate").tmpl(t)
        },
        askQuestionTermsList: function () {
            return $(".ask_question_terms_list")
        },
        askLi: function () {
            return this.askQuestionTermsList().find("li.ask_li")
        },
        talkLi: function () {
            return this.askQuestionTermsList().find("li.talk_li")
        },
        handleAskQuestionForm: function () {
            var e = this;
            return $(document).on("click", function () {
                return e.askQuestionTermsList().length ? e.askQuestionTermsList().remove() : void 0
            }), this.askQuestionTermsList().live("click", function (e) {
                return e.stopPropagation()
            }), this.askLi().live("click", function () {
                return e.askQuestionForm().submit()
            }), this.talkLi().live("click", function () {
                var t;
                return t = e.get_lawyers(), t.length ? (e.redirect_to_call_or_clients_new_path(t[0]), !1) : (alert("Sorry, no such lawyers are available right now."), !1)
            }), this.askQuestionBody().on("click", function (t) {
                return e.askQuestionTermsList().length || e.searchTerm(e.askQuestionBody()), t.stopPropagation()
            }), this.askQuestionBody().on("keyup", function () {
                return e.askQuestionTermsList().fadeOut(3e3).slice(1).remove(), e.searchTerm(e.askQuestionBody())
            })
        },
        searchTerm: function (e) {
            var t, i = this;
            return t = $(e).val(), this.parentPracticeArea = null, this.childPracticeArea = null, t.length > 3 ? $.ajax({
                url: "/terms/search.json",
                type: "POST",
                dataType: "json",
                data: {
                    name: t,
                    authenticity_token: this.token()
                },
                success: function (t) {
                    return t.result ? (t.parentPracticeArea && (i.parentPracticeArea = t.parentPracticeArea, i.questionPracticeAreaId().val(t.parentPracticeArea.id)), t.childPracticeArea && (i.childPracticeArea = t.childPracticeArea, i.questionPracticeAreaId().val(t.childPracticeArea.id)), t.state && (i.state = t.state, i.askQuestionStateSelect().val(i.state.id)), $(e).after(i.askQuestionTemplate(e))) : void 0
                }
            }) : void 0
        },
        questionPracticeAreaId: function () {
            return $("#autoselect_question #question_practice_area_id")
        },
        get_lawyers: function () {
            var e, t, i, n;
            return t = this.childPracticeArea ? this.childPracticeArea.id : this.parentPracticeArea ? this.parentPracticeArea.id : "All", this.state && (i = this.state.name_for_url), i || (i = "All-States"), n = "/lawyers/Legal-Advice/" + i + "/" + t + ".json", e = [], $.ajax({
                url: n,
                type: "POST",
                async: !1,
                data: {
                    authenticity_token: this.token()
                },
                dataType: "json",
                success: function (t) {
                    return t.lawyers.length ? e = t.lawyers : void 0
                }
            }), e
        },
        is_logged_in: function () {
            return this.askQuestionForm().find("#question_client_id").val().length > 0
        },
        phone_url: function () {
            var e;
            return e = "/lawyers/call", this.state && (e += "/state/" + this.state.id), this.childPracticeArea && (e += "/practice_area/" + this.childPracticeArea.id), this.parentPracticeArea && !this.childPracticeArea && (e += "/practice_area/" + this.parentPracticeArea.id), e
        },
        redirect_to_call_or_clients_new_path: function () {
            var e;
            return this.is_logged_in() ? window.location.href = this.phone_url() : (e = encodeURI(this.phone_url()), window.location.href = "/clients/new?notice=true&return_path=" + e)
        }
    }, this.terms = e
}.call(this);
var session, publisher, subscribers = {};
$(document).ready(function () {
    "undefined" == typeof TB || $("body").hasClass("videos") || $("body").hasClass("show") || (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS ? alert("You don't have the minimum requirements to run this application.Please upgrade to the latest version of Flash.") : (session = TB.initSession($("#session_id").val()), session.addEventListener("sessionConnected", sessionConnectedHandler), session.addEventListener("sessionDisconnected", sessionDisconnectedHandler), session.addEventListener("connectionCreated", connectionCreatedHandler), session.addEventListener("connectionDestroyed", connectionDestroyedHandler), session.addEventListener("streamCreated", streamCreatedHandler), session.addEventListener("streamDestroyed", streamDestroyedHandler)), checkTBSystemRequirements())
}), window.checkTBSystemRequirementsResult = !0, window.g_invite_interval = 0;
var xhr = 0;
$(window).load(function () {
    fn_invite_check()
}),
function () {
    var e;
    e = function () {
        function e(e, t, i) {
            this.category = e, this.variable = t, this.label = i
        }
        return e.prototype.startTime = function (e) {
            return this.startTime = null != e ? e : (new Date).getTime(), this
        }, e.prototype.endTime = function () {
            return this.endTime = (new Date).getTime(), this
        }, e.prototype.send = function () {
            var e;
            return e = this.endTime - this.startTime, _gaq.push(["_trackTiming", this.category, this.variable, e, this.label, 100]), this
        }, e
    }(), this.TrackTiming = e
}.call(this), ! function (e) {
    "use strict";

    function t(e, t, i) {
        return "function" == typeof e ? e.apply(t, i) : e
    }
    var i;
    e(document).ready(function () {
        e.support.transition = function () {
            var e = document.body || document.documentElement,
                t = e.style,
                i = void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition;
            return i
        }(), e.support.transition && (i = "TransitionEnd", e.browser.webkit ? i = "webkitTransitionEnd" : e.browser.mozilla ? i = "transitionend" : e.browser.opera && (i = "oTransitionEnd"))
    });
    var n = function (t, i) {
        this.$element = e(t), this.options = i, this.enabled = !0, this.fixTitle()
    };
    n.prototype = {
        show: function () {
            var i, n, a, s, r, o;
            if (this.hasContent() && this.enabled) {
                switch (r = this.tip(), this.setContent(), this.options.animate && r.addClass("fade"), r.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).prependTo(document.body), i = e.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }), n = r[0].offsetWidth, a = r[0].offsetHeight, s = t(this.options.placement, this, [r[0], this.$element[0]])) {
                case "below":
                    o = {
                        top: i.top + i.height + this.options.offset,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "above":
                    o = {
                        top: i.top - a - this.options.offset,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "left":
                    o = {
                        top: i.top + i.height / 2 - a / 2,
                        left: i.left - n - this.options.offset
                    };
                    break;
                case "right":
                    o = {
                        top: i.top + i.height / 2 - a / 2,
                        left: i.left + i.width + this.options.offset
                    }
                }
                r.css(o).addClass(s).addClass("in")
            }
        },
        setContent: function () {
            var e = this.tip();
            e.find(".twipsy-inner")[this.options.html ? "html" : "text"](this.getTitle()), e[0].className = "twipsy"
        },
        hide: function () {
            function t() {
                n.remove()
            }
            var n = this.tip();
            n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? n.bind(i, t) : t()
        },
        fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function () {
            return this.getTitle()
        },
        getTitle: function () {
            var e, t = this.$element,
                i = this.options;
            return this.fixTitle(), "string" == typeof i.title ? e = t.attr("title" == i.title ? "data-original-title" : i.title) : "function" == typeof i.title && (e = i.title.call(t[0])), e = ("" + e).replace(/(^\s*|\s*$)/, ""), e || i.fallback
        },
        tip: function () {
            return this.$tip = this.$tip || e('<div class="twipsy" />').html(this.options.template)
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        },
        toggle: function () {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.twipsy = function (t) {
        return e.fn.twipsy.initWith.call(this, t, n, "twipsy"), this
    }, e.fn.twipsy.initWith = function (t, i, n) {
        function a(a) {
            var s = e.data(a, n);
            return s || (s = new i(a, e.fn.twipsy.elementOptions(a, t)), e.data(a, n, s)), s
        }

        function s() {
            var e = a(this);
            e.hoverState = "in", 0 == t.delayIn ? e.show() : (e.fixTitle(), setTimeout(function () {
                "in" == e.hoverState && e.show()
            }, t.delayIn))
        }

        function r() {
            var e = a(this);
            e.hoverState = "out", 0 == t.delayOut ? e.hide() : setTimeout(function () {
                "out" == e.hoverState && e.hide()
            }, t.delayOut)
        }
        var o, l, c, u;
        return t === !0 ? this.data(n) : "string" == typeof t ? (o = this.data(n), o && o[t](), this) : (t = e.extend({}, e.fn[n].defaults, t), t.live || this.each(function () {
            a(this)
        }), "manual" != t.trigger && (l = t.live ? "live" : "bind", c = "hover" == t.trigger ? "mouseenter" : "focus", u = "hover" == t.trigger ? "mouseleave" : "blur", this[l](c, s)[l](u, r)), this)
    }, e.fn.twipsy.Twipsy = n, e.fn.twipsy.defaults = {
        animate: !0,
        delayIn: 0,
        delayOut: 0,
        fallback: "",
        placement: "above",
        html: !1,
        live: !1,
        offset: 0,
        title: "title",
        trigger: "hover",
        template: '<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>'
    }, e.fn.twipsy.rejectAttrOptions = ["title"], e.fn.twipsy.elementOptions = function (t, i) {
        for (var n = e(t).data(), a = e.fn.twipsy.rejectAttrOptions, s = a.length; s--;) delete n[a[s]];
        return e.extend({}, i, n)
    }
}(window.jQuery || window.ender),
function () {
    var e, t, i, n, a, s, r, o = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }, l = [].indexOf || function (e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        }, c = {}.hasOwnProperty,
        u = function (e, t) {
            function i() {
                this.constructor = e
            }
            for (var n in t) c.call(t, n) && (e[n] = t[n]);
            return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
        };
    e = function () {
        function e() {
            this.scrollSticky = o(this.scrollSticky, this)
        }
        var t, i;
        return e.prototype.stickyHeight = 600, e.prototype.sticky_padding = 5, e.prototype.sticky_topOffset = 110, e.prototype.sticky_footerHeight = 110, e.prototype.initialize = function () {
            return this.sticky_offset = $(".sticky_filters").prev().innerHeight() + $(".sticky_filters").prev().offset().top, this.sticky_top_offset = 5, this.sticky_bottom_offset = 26, this.add_event_listeners(), document.my_flag_search = !1, e.h = {}, e.h[198] = 90, e.h[169] = 60, e.h[141] = 30, e.h[113] = 20, e.h[84] = 15, e.h[56] = 10, e.h[28] = 5, e.h[0] = 2, e.r = {}, e.r[198] = 5, e.r[148] = 4, e.r[99] = 3, e.r[49] = 2, e.r[0] = 1, e.v = {}, e.v[198] = 6, e.v[131] = 4, e.v[65] = 2, e.v[0] = 0, e.s = {}, e.s[198] = 1, e.s[131] = 2, e.s[65] = 3, e.s[0] = 4, this.redirect_to_last_practice_area_state_select_from_cookie(), "" !== document.location.hash ? (this.set_defaults(default_state), this.read_hash(), this.clear_results(), this.submit()) : (this.set_defaults(default_state), this.add_appointment_forms(), this.search_defaults())
        }, e.prototype.clear_results = function () {
            return $("div.results").html(""), this.page = 1
        }, e.prototype.get_bottom_point = function () {
            return $("#inline-wrapper").offset().top + $("#inline-wrapper").innerHeight()
        }, e.prototype.scrollSticky = function () {
            var e;
            if (e = $(".sticky_filters"), e.length) {
                if (!($(window).scrollTop() > this.sticky_offset - this.sticky_top_offset)) return e.removeClass("positioned"), e.removeClass("positioned_bottom"), e.removeClass("normal"), e.css("bottom", ""), e.css("top", "");
                if (e.offset().top + e.innerHeight() + this.sticky_bottom_offset < this.get_bottom_point() ? (e.css("top", this.sticky_top_offset + "px"), e.removeClass("positioned_bottom"), e.removeClass("normal"), e.addClass("positioned")) : e.hasClass("positioned") || e.hasClass("positioned_bottom") || e.addClass("normal"), !e.hasClass("normal") && (e.hasClass("positioned") && e.offset().top + e.innerHeight() + this.sticky_bottom_offset > this.get_bottom_point() && (e.css("top", this.get_bottom_point() - e.innerHeight() - this.sticky_bottom_offset + "px"), e.removeClass("positioned"), e.addClass("positioned_bottom")), e.hasClass("positioned_bottom") && $(window).scrollTop() - e.offset().top - this.sticky_top_offset < 0)) return e.css("top", this.sticky_top_offset + "px"), e.removeClass("positioned_bottom"), e.addClass("positioned")
            }
        }, e.prototype.search_defaults = function () {
            var e;
            return e = i().search_query, e ? ($("#search #input_search_bg_img").hide(), $("#search #input_close_sea_img").show()) : void 0
        }, e.prototype.redirect_to_last_practice_area_state_select_from_cookie = function () {
            return $.inArray(document.location.pathname, ["/lawyers", "/lawyers/"]) > -1 && $.cookie("practice_area") && $.cookie("state") && $.cookie("sort_by") ? (this.set_state_fields_val($.cookie("state")), this.set_practice_area_fields_val($.cookie("practice_area")), this.set_sort_by_val($.cookie("sort_by")), this.submit()) : void 0
        }, e.prototype.state_name = function () {
            return this.state_fields().find("[value='" + this.state_fields().val() + "']").text()
        }, e.prototype.practice_area_name = function () {
            return this.practice_area.replace(/-/g, " ")
        }, e.prototype.sortByWord = function () {
            switch (this.sort_by) {
            case "price_low_to_high":
                return "Cheap";
            case "price_high_to_low":
                return "Pricey";
            case "free_time":
                return "Generous";
            case "practicing":
                return "Experienced";
            case "school_rank":
                return "Brainy";
            default:
                return "Available"
            }
        }, t = function (e) {
            var t;
            return t = 0, e.each(function () {
                var e;
                return e = $(this).height(), e > t ? t = e : void 0
            }), e.height(t)
        }, e.prototype.paginate = function (e) {
            return this.page = e, this.submit(), this.page = null
        }, e.prototype.ajaxPort = !1, e.prototype.submit = function () {
            var e, t = this;
            return this.ajaxPort && this.ajaxPort.abort(), this.ajaxPort = $.ajax(this.current_search_url(), {
                complete: function () {
                    return t.add_appointment_forms(), t.add_pagination(), t.handle_selected_tab(), t.handle_selected_practice_area(), window.conversations.update_practice_area_state_select_from_cookie(), window.state_and_practice_area_validation.update_practice_area_state_select_from_cookie(), t.scrollSticky()
                },
                success: function () {},
                dataType: "script"
            }), document.location.hash = this.current_hash(), document.location.hash = document.location.hash.replace(/\?\?/, "?"), document.title = this.current_title().replace(/-lawyers/, ""), e = document.createElement("meta"), e.name = "Current", e.content = this.current_meta(), document.getElementsByTagName("head")[0].appendChild(e), $(".chosen-select").trigger("liszt:updated")
        }, e.prototype.add_event_listeners = function () {
            var e, t, i = this;
            return this.form().submit(function () {
                return i.submit(), !1
            }), this.sort_by_select().on("change", function () {
                return i.set_sort_by_val(i.sort_by_select().val()), $.cookie("sort_by", i.sort_by_select().val(), {
                    expires: 30,
                    path: "/"
                }), i.clear_results(), i.submit()
            }), $("#search #input_close_sea_img").click(function () {
                return $("#search #search_query").val(""), i.set_defaults(default_state), i.set_defaults_s(), $("#search #input_close_sea_img").hide(), $("#search #input_search_bg_img").show(), $("#search .ask_question_terms_list").hide(), i.submit(), !1
            }), $("#search #input_search_bg_img").click(function () {
                return i.set_state_fields_val("All-States"), i.set_practice_area_fields_val("All"), i.markSelected($("#practice_area_All").parent("p")), $("#search #input_search_bg_img").hide(), $("#search #input_close_sea_img").show(), i.submit(), !1
            }), $("#search #search_query").keypress(function (e) {
                return 13 === e.keyCode ? (!document.my_flag_search && $("#search #search_query").val() && (document.my_flag_search = !0, $("#search #input_search_bg_img").hide(), $("#search #input_close_sea_img").show(), $("#search #search_query").submit()), i.set_state_fields_val("All-States"), i.set_practice_area_fields_val("All"), i.markSelected($("#practice_area_All").parent("p")), i.submit(), !1) : void 0
            }), t = this, $(window).scroll(function () {
                return t.scrollSticky()
            }), e = function (e) {
                var t, i;
                return t = e.parents(".lawyer"), t.hasClass("expanded") ? (t.removeClass("expanded"), i = function () {
                    var e;
                    return e = parseInt($(".middle", t).height()), parseInt($(".left", t).height()) > e && (e = parseInt($(".left", t).height())), $(".right", t).css("height", e + "px"), $(".middle", t).css("height", e + "px")
                }, "undefined" != typeof $("p.lawyer_tagline", t).html() ? $("p.lawyer_tagline", t).html().length !== $("p.lawyer_long_tagline", t).html().length ? ($("p.lawyer_long_tagline", t).hide("fast"), $("p.lawyer_tagline", t).show("slow", function () {
                    return $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                        return i()
                    }) : i()
                })) : $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                    return i()
                }) : i() : $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                    return i()
                }) : i(), e.html("+")) : (t.css("height", "auto"), $(".middle", t).css("height", "auto"), t.addClass("expanded"), "undefined" != typeof $("p.lawyer_tagline", t).html() ? $("p.lawyer_tagline", t).html().length !== $("p.lawyer_long_tagline", t).html().length ? ($("p.lawyer_tagline", t).hide(), $("p.lawyer_long_tagline", t).hide(), $("p.lawyer_long_tagline", t).removeClass("hidden"), $("p.lawyer_long_tagline", t).show("slow", function () {
                    return $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                        return $(".right", t).css("height", $(".middle", t).height())
                    }) : $(".right", t).css("height", $(".middle", t).height())
                })) : $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                    return $(".right", t).css("height", $(".middle", t).height())
                }) : $(".right", t).css("height", $(".middle", t).height()) : $("li.offerings_item.law_school", t).length > 0 ? $("li.offerings_item.law_school", t).show("slow", function () {
                    return $(".right", t).css("height", $(".middle", t).height())
                }) : $(".right", t).css("height", $(".middle", t).height()), e.html("-"))
            }, $("div.row.lawyer").live("click", function (t) {
                return e($(".expander_container", $(this))), t.stopPropagation(), !1
            }), $(".users.home .lawyer_tagline .read_more a").live("click", function (t) {
                return e($(".expander_container", $(t.target).parents("div.row.lawyer"))), t.stopPropagation(), !1
            }), $(".expander_container, .expander_container a").live("click", function (t) {
                return e($(t.target)), t.stopPropagation(), !1
            }), this.hire_service_type_tabs().click(function () {
                return i.set_practice_area_fields_val("All")
            }), this.service_type_tabs().click(function (e) {
                return i.set_service_type_tabs_val($(e.target).attr("data-val")), i.submit(), !1
            }), this.practice_area_fields().click(function (e) {
                return i.clear_results(), i.set_practice_area_fields_val($(e.target).val()), "Legal-Services" !== i.service_type && ($.cookie("practice_area", $(e.target).val(), {
                    expires: 30,
                    path: "/"
                }), $.cookie("practice_area_id", $(e.target).data("id"), {
                    expires: 30,
                    path: "/"
                }), is_client && clients.updatePracticeArea(client_id, $(e.target).data("id"))), i.submit()
            }), this.state_fields().change(function (e) {
                return i.set_state_fields_val($(e.target).val()), $.cookie("state", $(e.target).val(), {
                    expires: 30,
                    path: "/"
                }), $.cookie("state_id", $(e.target).find("option:selected").data("id"), {
                    expires: 30,
                    path: "/"
                }), is_client && clients.updateState(client_id, $(e.target).find("option:selected").data("id")), i.submit()
            }), this.add_pagination(), $(".sticky_filters .local_lawyers").on("click", function () {
                return $(".sticky_filters #local_lawyers_only").click()
            }), $(".sticky_filters #local_lawyers_only").on("click", function (e) {
                return e.stopPropagation()
            }), $(".sticky_filters #local_lawyers_only").on("change", function (e) {
                return $(e.target).is(":checked") ? ($(".sticky_filters #state label").text("Location:"), $(".sticky_filters .location, .sticky_filters .state_wrapper").toggleClass("hidden"), i.set_sort_by_val("distance"), i.local = !0, i.clear_results(), i.submit()) : ($(".sticky_filters #state label").text("Relevant state:"), $(".sticky_filters .location, .sticky_filters .zipcode_text_box").addClass("hidden"), $(".sticky_filters .state_wrapper").removeClass("hidden"), i.set_sort_by_val("availability"), i.zipcode = null, i.local = !1, i.clear_results(), i.submit())
            }), this.changeZipcodeZipLink().on("click", function () {
                return $("#state .label").text("Zip Code (US Only):"), $(".sticky_filters .location, .sticky_filters .zipcode_text_box").toggleClass("hidden")
            }), $(".sticky_filters #zipcode_zip").on("change", function (e) {
                return i.zipcode = $(e.target).val(), is_client && i.zipcode.length && clients.update(client_id, {
                    "client[zipcode_zip]": i.zipcode
                }), i.clear_results(), i.submit()
            }), $(".sticky_filters #zipcode_zip").keypress(function (e) {
                return 13 === e.keyCode ? (i.zipcode = $(e.target).val(), is_client && i.zipcode.length && clients.update(client_id, {
                    "client[practice_area_id]": i.zipcode
                }), i.clear_results(), i.submit(), !1) : void 0
            }), this.handlePracticeAreaSearchForm(), $(".sticky_filters #practice_area_lawyer_All").on("click", function () {
                return $(".sticky_filters .parent_label").each(function () {
                    return $(this).text().match(/^\+/) ? void 0 : $(this).text("+" + $(this).text())
                })
            }), $('.sticky_filters input[name="practice_area_lawyer"][data-parent="false"]').on("click", function (e) {
                return $(".sticky_filters .parent_label").each(function () {
                    return $(this).text().match(/^\+/) ? void 0 : $(this).text("+" + $(this).text())
                }), $(e.target).next("label").text($(e.target).next("label").text().replace(/^\+/, ""))
            })
        }, e.prototype.practiceAreaSearchInput = function () {
            return $("#practice_area_search #search_query")
        }, e.prototype.handlePracticeAreaSearchForm = function () {
            var e, t = this;
            return this.practiceAreaSearchInput().attr("placeholder", "Keyword or category"), e = {}, this.practiceAreaSearchInput().autocomplete({
                minLength: 2,
                source: function (i, n) {
                    var a;
                    return a = i.term, l.call(e, a) >= 0 ? (n(e[a]), void 0) : $.ajax({
                        url: "/terms/autocomplete.json",
                        dataType: "json",
                        type: "POST",
                        data: {
                            name: i.term,
                            authenticity_token: t.token()
                        },
                        success: function (t) {
                            var i;
                            return t.result ? (i = $.map(t.terms, function (e) {
                                return {
                                    id: e.practice_area_id,
                                    label: e.name,
                                    value: e.name
                                }
                            }), e[a] = i, n(i)) : void 0
                        }
                    })
                },
                select: function (e, i) {
                    var n;
                    return n = t.practice_area_fields().filter("[data-id=" + i.item.id + "]"), t.practice_area = n.val(), n.parent().show(), n.data("parent") ? n.parents(".children.practice-areas").prev().show() : n.parent().find(".children").show(), t.set_practice_area_fields_val(t.practice_area), practiceAreaFilter.hideAllExcept(n), t.submit()
                }
            })
        }, e.prototype.changeZipcodeZipLink = function () {
            return $(".sticky_filters a#change_zipcode_zip")
        }, e.prototype.markSelected = function (e) {
            return e.siblings().children("input").removeAttr("checked"), e.siblings().removeClass("selected"), e.siblings().children("img.radios").attr("src", "/assets/radio-bda8dbf6e16e24d4fcb772b64db2b0ff.png"), e.addClass("selected"), e.children("img.radios").attr("src", "/assets/radio_selected-5890e16e0229821836bc90e6506fd66c.png")
        }, e.prototype.add_appointment_forms = function () {
            var e = this;
            return this.lawyers = [], this.offerings = [], $(".lawyer").each(function (t, i) {
                var n;
                return n = $(i).attr("data-lawyer-id"), parseInt(n) > 0 ? e.lawyers.push(new Lawyer(n)) : void 0
            }), $(".offering").each(function (t, i) {
                var n;
                return n = $(i).attr("data-offering-id"), parseInt(n) > 0 ? e.offerings.push(new Offering(n)) : void 0
            })
        }, e.prototype.add_pagination = function () {
            var e = this;
            return $("div.load-more a").click(function (t) {
                return e.paginate($(t.target).attr("data-page")), $(t.target).html("Ushering in more lawyers...").unbind(), !1
            })
        }, e.prototype.current_search_url = function () {
            var e, t;
            return e = "", $("#search #search_query").trigger("before_submit"), $("#search #search_query").val() && (e += "?search_query=" + $("#search #search_query").val()), this.service_type || (this.service_type = "Legal-Advice"), this.state || (this.state = "All-States"), this.practice_area || (this.practice_area = "All"), this.sort_by || (this.sort_by = "availability"), t = "/lawyers/" + this.service_type + "/" + this.state + "/" + this.practice_area, "availability" !== this.sort_by && (t += "/sort_by/" + this.sort_by), this.local && (t += "/local"), this.page > 1 && (t += "/page/" + this.page), this.zipcode && (e += e.length ? "zipcode=" + this.zipcode : "?zipcode=" + this.zipcode), t + e
        }, e.prototype.current_hash = function () {
            return "!" + this.current_search_url()
        }, e.prototype.current_title = function () {
            var e, t, i;
            return this.service_type || (this.service_type = "Legal-Advice"), this.state || (this.state = "All-States"), this.practice_area || (this.practice_area = "All"), t = this.service_type.replace(/-/g, " "), i = this.state.replace(/-/, " "), e = this.practice_area_name(), t = t.replace(/\+/g, " "), i = i.replace(/\slawyers/, "").replace(/\+/g, " "), e = e.replace(/\+/, " "), i.length && e.length && "All States" !== i && "All" !== e ? "Lawdingo | " + this.sortByWord() + " " + i + " " + e + " Lawyers." : "Lawdingo | Browse Lawyers on Lawdingo"
        }, e.prototype.current_meta = function () {
            var e, t, i;
            return t = this.service_type.replace(/-/, " "), i = this.state.replace(/-/, " "), e = this.practice_area.replace(/-/, " "), t = t.replace(/\+/, " "), i = i.replace(/_/, " "), e = e.replace(/\+/, " "), "Ask a " + i + " " + e + " lawyer for " + t + " online now on Lawdingo."
        }, e.prototype.read_hash = function () {
            var e, t, n;
            return t = document.location.hash.replace("#!/lawyers/", ""), e = i().search_query, e && ($("#search #search_query").val(e), $("#search #input_search_bg_img").hide(), $("#search #input_close_sea_img").show(), t = t.replace("?search_query=", ""), t = t.replace(e, "")), t = t.split("/"), this.set_service_type_tabs_val(t[0]), this.set_state_fields_val(t[1]), t[2] ? (n = t[2], n = n.replace(/\+/, " "), n = n.replace(/\+/, " "), n = n.replace(/\+/, " "), n = n.replace(/\?/, ""), this.set_practice_area_fields_val(n).parent().find("img").trigger("click")) : this.set_practice_area_fields_val("All").parent().find("img").trigger("click"), t[3] && t[4] && "sort_by" === t[3] ? this.set_sort_by_val(t[4]) : this.set_sort_by_val("availability"), t[5] && t[6] && "page" === t[5] ? this.page = t[6] : t[3] && t[4] && "page" === t[3] ? this.page = t[4] : void 0
        }, e.prototype.set_defaults_s = function () {
            return $("#free_minutes_slider").slider({
                value: 1
            }), $("#hourly_rate").slider({
                values: [1, 4],
                slide: function (e, t) {
                    return $("#hourly_rate_in").val("$" + t.value)
                }
            }), $("#freetimeval").val(""), $("#hourlyratestart").val(""), $("#hourlyrateend").val("")
        }, e.prototype.set_defaults = function (e) {
            return this.set_service_type_tabs_val(this.service_type_tabs().filter("[data-default=1]").attr("data-val")), "" === e ? this.set_state_fields_val(this.state_fields().find("option[data-default=1]").val()) : (this.set_state_fields_val(e + "-lawyers"), this.set_practice_area_fields_val(this.practice_area_fields().filter("[data-default=1]").val()).parent().markSelected()), this.set_sort_by_val(this.sort_by_select().val())
        }, e.prototype.tabs = function () {
            return $("div#service_type")
        }, e.prototype.service_type_tabs = function () {
            return this.tabs().find('input[name="service_type"]')
        }, e.prototype.service_type_selected_tabs = function () {
            return this.service_type_tabs().filter("[checked='checked']")
        }, e.prototype.hire_service_type_tabs = function () {
            return this.tabs().find(".service.service_type")
        }, e.prototype.unselect_service_type_tabs = function () {
            return this.service_type_tabs().parent().find("img").attr("src", "/assets/radio-bda8dbf6e16e24d4fcb772b64db2b0ff.png")
        }, e.prototype.handle_selected_tab = function () {
            switch (this.service_type) {
            case "Legal-Services":
                $("div.legal_domain").addClass("hidden"), $("div.legal_domain.service").removeClass("hidden"), $("select#sort_by").attr("disabled", "disabled");
                break;
            default:
                $("div.legal_domain").addClass("hidden"), $("div.legal_domain.lawyer").removeClass("hidden"), $("select#sort_by").removeAttr("disabled")
            }
            return this.unselect_service_type_tabs(), this.service_type_selected_tabs().parent().find("img").attr("src", "/assets/radio_selected-5890e16e0229821836bc90e6506fd66c.png")
        }, e.prototype.set_service_type_tabs_val = function (e) {
            var t;
            return this.service_type = e, this.service_type_tabs().filter("[data-val='" + e + "']").attr("checked", "checked"), this.handle_selected_tab(), t = this.practice_area_fields().filter("[checked='checked']"), t.parents(".practice-areas").show(), t.parent().find(".children").show("slow")
        }, e.prototype.form = function () {
            return $("form.filters")
        }, e.prototype.state_fields = function () {
            return this.form().find("div#state select")
        }, e.prototype.set_state_fields_val = function (e) {
            return this.state = e, this.state_fields().val(e)
        }, e.prototype.practice_area_selected = function () {
            switch (this.service_type) {
            case "Legal-Services":
                return this.form().find("div#practice_areas.service input:radio").filter("[checked='checked']");
            default:
                return this.form().find("div#practice_areas.lawyer input:radio").filter("[checked='checked']")
            }
        }, e.prototype.unselect_practice_areas = function () {
            return this.practice_area_fields().parent().find("img").attr("src", "/assets/radio-bda8dbf6e16e24d4fcb772b64db2b0ff.png")
        }, e.prototype.handle_selected_practice_area = function () {
            return this.unselect_practice_areas(), this.practice_area_selected().parent().find("img").attr("src", "/assets/radio_selected-5890e16e0229821836bc90e6506fd66c.png")
        }, e.prototype.set_sort_by_val = function (e) {
            var t;
            if (this.sort_by = e, this.sort_by_select().val(e), "bid" === e) {
                this.sort_by_label().hide(), $(this.sort_by_select()).removeClass("labeled");
                try {
                    return this.sort_by_select().trigger("align"), this.sort_by_select().trigger("remove_class", "labeled")
                } catch (i) {
                    t = i
                }
            } else {
                this.sort_by_label().show(), $(this.sort_by_select()).addClass("labeled");
                try {
                    return this.sort_by_select().trigger("align"), this.sort_by_select().trigger("add_class", "labeled")
                } catch (i) {
                    t = i
                }
            }
        }, e.prototype.set_practice_area_fields_val = function (e) {
            var t, i, n, a, s, r = this;
            return this.practice_area = e, this.form().find(".children").hide(), t = function () {
                switch (this.service_type) {
                case "Legal-Services":
                    return this.form().find("div#practice_areas.service input:radio").filter("[value='" + e + "']");
                default:
                    return this.form().find("div#practice_areas.lawyer input:radio").filter("[value='" + e + "']")
                }
            }.call(this), t.attr("checked", !0), this.handle_selected_practice_area(), n = t.data("is-national"), i = $(this.form).find(".national-area-notice"), n ? (this.set_state_fields_val(this.state_fields().find("option[data-default=1]").val()), $(this.state_fields()).trigger("add_class", "hidden"), this.form().find("div#state .chzn-container").addClass("hidden"), a = '<span class="state">' + t.val() + "</span> is not state specific.", i.show().find("p").html(a), s = i.find("a.show-states-selector"), s.live("click", function (e) {
                return e.preventDefault(), $(r.state_fields()).trigger("remove_class", "hidden"), r.form().find("div#state .chzn-container").removeClass("hidden"), i.hide()
            })) : ($(this.state_fields()).trigger("remove_class", "hidden"), this.form().find("div#state .chzn-container").removeClass("hidden"), i.hide()), t.parents(".practice-areas").show(), t.parent().next().hide().removeClass("hidden").show("slow"), t
        }, e.prototype.practice_area_fields = function () {
            return this.form().find("div#practice_areas input:radio")
        }, e.prototype.sort_by_select = function () {
            return $("select#sort_by")
        }, e.prototype.sort_by_label = function () {
            return $("label[for='sort_by']")
        }, i = function () {
            var e, t, i, n;
            for (n = [], e = void 0, i = 0, t = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"); i < t.length;) e = t[i].split("="), n.push(e[0]), n[e[0]] = e[1], i++;
            return n
        }, e.prototype.token = function () {
            return $("[name='csrf-token']").attr("content")
        }, e
    }(), this.Home = new e, window.LawyerStatus = function (e) {
        function i() {
            return this.new_tab = o(this.new_tab, this), this.on_create = o(this.on_create, this), t = i.__super__.constructor.apply(this, arguments)
        }
        return u(i, e), i.prototype.on_create = function () {
            return this.timeout = 200
        }, i.prototype.new_tab = function (e, t) {
            return new LawyerTooltipsDominantElem($("#" + e.tab_id), $("#" + this.parent_id + " " + e.dialog_class), t)
        }, i
    }(LawdingoMenu), window.LawyerTooltips = function (e) {
        function t() {
            return this.hide_menu = o(this.hide_menu, this), this.show_menu = o(this.show_menu, this), this.new_tab = o(this.new_tab, this), this.on_create = o(this.on_create, this), i = t.__super__.constructor.apply(this, arguments)
        }
        return u(t, e), t.prototype.on_create = function () {
            return this.timeout = 200
        }, t.prototype.new_tab = function (e, t) {
            return new LawyerTooltipsElem($("#" + this.parent_id + " " + e.tab_class), $("#" + this.parent_id + " " + e.dialog_class), t)
        }, t.prototype.show_menu = function () {}, t.prototype.hide_menu = function () {
            return $("#" + this.parent_id).find(".tooltips .tooltip.dominant").css("opacity", 1)
        }, t
    }(LawdingoMenu), window.LawyerTooltips_profile = function (e) {
        function t() {
            return this.new_tab = o(this.new_tab, this), this.on_create = o(this.on_create, this), n = t.__super__.constructor.apply(this, arguments)
        }
        return u(t, e), t.prototype.on_create = function () {
            return this.timeout = 200
        }, t.prototype.new_tab = function (e, t) {
            return new LawyerTooltipsElem_profile($("." + this.parent_id).find(e.tab_class), $("." + this.parent_id).find(e.dialog_class), t)
        }, t
    }(LawdingoMenu), window.LawyerTooltipsDominantElem = function (e) {
        function t() {
            return this.align = o(this.align, this), this.hide_elem = o(this.hide_elem, this), this.show_elem = o(this.show_elem, this), this.bind_dialog_events = o(this.bind_dialog_events, this), this.bind_el_events = o(this.bind_el_events, this), this.on_create = o(this.on_create, this), a = t.__super__.constructor.apply(this, arguments)
        }
        return u(t, e), t.prototype.on_create = function () {
            var e, t, i, n, a;
            for (this.timeout = 150, n = $(this.el).find(".online_icons span"), a = [], e = 0, i = n.length; i > e; e++) t = n[e], "" !== $(t).attr("tooltip") && $(this.el).find(".online_icons .tooltips").find("." + $(t).attr("tooltip")).hasClass("dominant") && a.push(this.align_el = $(t));
            return a
        }, t.prototype.bind_el_events = function (e) {
            var t = this;
            return $(e).bind({
                mouseover: function (e) {
                    return t.mouse_over(e)
                },
                mouseout: function (e) {
                    return t.mouse_out(e)
                }
            })
        }, t.prototype.bind_dialog_events = function () {}, t.prototype.show_elem = function () {
            return this.align_el && this.align(this.align_el, this.dialog), $.isEmptyObject($(this.dialog)) ? void 0 : $(this.dialog).show()
        }, t.prototype.hide_elem = function () {
            return $.isEmptyObject($(this.dialog)) ? void 0 : $(this.dialog).hide()
        }, t.prototype.align = function (e, t) {
            return $(t).css("top", $(e).offset().top - $(e).offsetParent().offset().top - $(t).height() + "px"), $(t).css("left", $(e).offset().left - $(e).offsetParent().offset().left + ($(e).width() - $(t).width()) / 2 + "px")
        }, t
    }(LawdingoMenuElem), window.LawyerTooltipsElem_profile = function (e) {
        function t() {
            return this.on_create = o(this.on_create, this), s = t.__super__.constructor.apply(this, arguments)
        }
        return u(t, e), t.prototype.on_create = function () {
            return this.timeout = 150, this.align_el = this.el
        }, t
    }(LawyerTooltipsDominantElem), window.LawyerTooltipsElem = function (e) {
        function t() {
            return this.hide_elem = o(this.hide_elem, this), this.show_elem = o(this.show_elem, this), this.on_create = o(this.on_create, this), r = t.__super__.constructor.apply(this, arguments)
        }
        return u(t, e), t.prototype.on_create = function () {
            return this.timeout = 150, this.align_el = this.el
        }, t.prototype.show_elem = function (e) {
            return $(this.dialog).hasClass("dominant") ? 1 !== $(this.dialog).css("opacity") ? $(this.dialog).css("opacity", 1) : void 0 : t.__super__.show_elem.call(this, e)
        }, t.prototype.hide_elem = function (e) {
            return $(this.dialog).hasClass("dominant") ? 0 !== $(this.dialog).css("opacity") ? $(this.dialog).css("opacity", 0) : void 0 : t.__super__.hide_elem.call(this, e)
        }, t
    }(LawyerTooltipsDominantElem)
}.call(this),
function () {
    var e;
    jQuery(function () {
        return $("#leveled-list_practice_areas input.parent-area").bind("change", function () {
            var e, t, i, n;
            return i = $(this), n = i.data("id"), e = i.is(":checked"), t = i.parent().find("[data-parent-id='" + n + "'] input"), t.each(function (t, i) {
                return $(i).attr("checked", e)
            })
        }), $("a#close_notice").bind("click", function (e) {
            return $(e.target).parents(".notice").hide(), $(e.target).parents(".notice_wrapper").hide()
        }), $("a#barids_opener").bind("click", function () {
            return $("div#bar_membership").center()
        }), $("a#practice_areas_opener").bind("click", function () {
            return $("div#practices").center()
        }), $("a.schedule_session_button, div.description form.new_message").live("click", function () {
            var e;
            return e = $(this).data("fullname"), $("div#schedule_session").center(), $("div#schedule_session span.lawyer_name").html(e), conversations.clear_schedule_session_warning(), conversations.enable_submit_message_button()
        }), $("input#lawyer_photo").bind("change", function () {
            var e, t;
            return t = $("span.file_select_value"), e = $(this).val(), e.length > 0 ? t.html(e.split(/\\/).pop()) : void 0
        }), e.initialize()
    }), e = {
        initialize: function () {
            return this.setLawyerRate(), this.setNoChargeState(), this.bindUIActions()
        },
        noCharge: function () {
            return $("#no_charge")
        },
        lawyer_hourly_rate: function () {
            return $("#lawyer_hourly_rate")
        },
        lawyer_free_consultation_duration: function () {
            return $("#lawyer_free_consultation_duration")
        },
        rate_hint: function () {
            return $("span.rate_hint")
        },
        charge_related: function () {
            return $(".charge_related")
        },
        dialog_overlay: function () {
            return $("#dialog-overlay")
        },
        dialog_close: function () {
            return $(".dialog-close")
        },
        dialog_overlay_and_close: function () {
            return $("#dialog-overlay, .dialog-close")
        },
        dialog_div: function () {
            return $("#only_for_paid_lawyer")
        },
        dialog_window: function () {
            return $(".dialog-window")
        },
        close: function () {
            return $('<div class="dialog-close"></div>')
        },
        dialog_opener: function () {
            return $(".only_for_paid_lawyer_dialog_opener")
        },
        bindUIActions: function () {
            var e = this;
            return this.noCharge().on("change", function () {
                return e.setNoChargeState(), e.noCharge().is(":checked") ? e.lawyer_hourly_rate().focus() : void 0
            }), this.lawyer_hourly_rate().on("keyup", function () {
                return e.setLawyerRate()
            }), this.dialog_opener().live("click", function () {
                return e.dialog_overlay().show(), e.dialog_div().show(), !1
            }), this.dialog_div().append(this.close()), this.dialog_overlay_and_close().live("click", function () {
                return e.dialog_window().hide(), e.close().hide(), e.dialog_overlay().hide(), !1
            })
        },
        setNoChargeState: function () {
            return this.noCharge().is(":checked") ? (this.charge_related().show("slow"), this.lawyer_hourly_rate().prop("disabled", !1), this.lawyer_free_consultation_duration().prop("disabled", !1), this.setLawyerRate()) : (this.charge_related().hide("slow"), this.lawyer_hourly_rate().val("").prop("disabled", "disabled"), this.lawyer_free_consultation_duration().prop("disabled", "disabled"), this.rate_hint().html("No charge for consultations"))
        },
        setLawyerRate: function () {
            var e, t;
            return this.lawyer_hourly_rate().length && this.lawyer_hourly_rate().val().length ? (this.lawyer_hourly_rate().numeric(), e = this.lawyer_hourly_rate().val().match(/\d+/)[0], t = (e / 10).toFixed(2), "" === this.lawyer_hourly_rate().val() ? $("span.rate_hint").html("Will be quoted per 0.1 hour") : $("span.rate_hint").html("Quoted as $" + t + " per 6 mins")) : void 0
        }
    }, this.users = e
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleFormSubmit()
        },
        handleFormSubmit: function () {
            return $(document).on("click", "button#submit_lawyer_request", function () {
                return $.ajax({
                    url: "/lawyers/looking_for",
                    type: "post",
                    data: {
                        request_body: $("textarea#lawyer_request_body").val()
                    },
                    success: function () {
                        return alert("Thanks for letting us know.")
                    }
                })
            })
        }
    }
}.call(this),
function () {
    var e;
    jQuery(document).ready(function () {
        var t;
        return e.initialize(), t = {
            timeElapsedCounter: 0,
            paidTimeCounter: 0,
            freeTimeCounter: 600,
            initialize: function () {
                return this.conversationId = $("#video_chat").data("conversation-id"), this.lawyersWatching = $("#video_chat").data("lawyers-watching"), this.freeTimeCounter = 60 * parseInt($("#video_chat").data("free-consultation-duration")), this.timeElapsed.set({
                    time: 1e3,
                    autostart: !0
                }), this.freeTimeRemaining.set({
                    time: 1e3,
                    autostart: !1
                }), this.paidTimeElapsed.set({
                    time: 1e3,
                    autostart: !1
                }), consultation_paid ? this.freeTimeRemaining.play() : $("#free_time_remaining_wrapper").hide(), $(".video-chat-timers").show()
            },
            timeElapsed: $.timer(function () {
                var e, i, n, a;
                return ++t.timeElapsedCounter, n = t.timeElapsedCounter % 60, e = parseInt(t.timeElapsedCounter / 60), a = n.toString().length > 1 ? n.toString() : "0" + n.toString(), i = e.toString().length > 1 ? e.toString() : "0" + e.toString(), $("#time_elapsed").html("" + i + ":" + a)
            }),
            freeTimeRemaining: $.timer(function () {
                var e, i, n, a;
                return --t.freeTimeCounter, t.freeTimeCounter <= 0 ? (t.freeTimeRemaining.pause(), t.paidTimeElapsed.play(), $("#free_time_remaining_wrapper").hide(), $("#paid_time_elapsed_wrapper").show()) : (n = t.freeTimeCounter % 60, a = n.toString().length > 1 ? n.toString() : "0" + n.toString(), e = parseInt(t.freeTimeCounter / 60), i = e.toString().length > 1 ? e.toString() : "0" + e.toString(), $("#free_time_remaining").html("" + i + ":" + a))
            }),
            paidTimeElapsed: $.timer(function () {
                var e, i, n;
                return ++t.paidTimeCounter, i = t.paidTimeCounter % 60, e = parseInt(t.paidTimeCounter / 60), e = 0 === i ? e : e + 1, n = e.toString(), n += e > 1 ? " minutes" : " minute", $("#paid_time_elapsed").html(n)
            })
        }, window.videoChatTimers = t
    }), e = {
        initialize: function () {
            return this.handleEvents()
        },
        handleEvents: function () {
            return $("a.check_tb_requirements").live("click", function (e) {
                return window.checkTBSystemRequirementsResult ? void 0 : (alert("You don't have the minimum requirements to run this application."), e.stopPropagation(), !1)
            })
        }
    }, this.videoChat = e
}.call(this),
function () {
    var e, t;
    jQuery(function () {
        return $("#video_recorder").length > 0 && t.setup(), $("#video_player").length > 0 ? e.setup() : void 0
    }), e = {
        setup: function () {
            return this.apiKey = $("#video_player").data("api-key"), this.token = $("#video_player").data("token"), this.archiveId = $("#video_player").data("archive-id"), this.playerId = "player_" + this.archiveId, this.createRecorderManager(), this.displayPlayer()
        },
        createRecorderManager: function () {
            return this.recorderManager = TB.initRecorderManager(this.apiKey)
        },
        displayPlayer: function () {
            return this.playerContainer = $("#video_player"), this.playerContainer.append($("<div>").attr("id", this.playerId)), this.player = this.recorderManager.displayPlayer(this.archiveId, this.token, this.playerId, {
                width: 560,
                height: 472
            })
        }
    }, t = {
        setup: function () {
            return this.apiKey = $("#video_recorder").data("api-key"), this.token = $("#video_recorder").data("token"), this.authorId = $("#video_recorder").data("author-id"), this.recorderId = "recorder_" + (new Date).getTime().toString(), this.createRecorderManager(), this.displayRecorder(), this.bindEventHandlers()
        },
        createRecorderManager: function () {
            return this.recorderManager = TB.initRecorderManager(this.apiKey)
        },
        displayRecorder: function () {
            return this.recorderContainer = $("#video_recorder"), this.recorderContainer.append($("<div>").attr("id", this.recorderId)), this.recorder = this.recorderManager.displayRecorder(this.token, this.recorderId, {
                width: 560,
                height: 472,
                style: {
                    showRecordButton: !0,
                    showControlBar: !0
                }
            })
        },
        bindEventHandlers: function () {
            return this.recorder.addEventListener("archiveSaved", t.archiveSavedHandler)
        },
        archiveSavedHandler: function (e) {
            return t.recorderManager.removeRecorder(t.recorder), t.archiveId = e.archives[0].archiveId, t.saveVideo()
        },
        saveVideo: function () {
            return $.ajax({
                url: "/lawyers/" + this.authorId + "/videos",
                async: !1,
                type: "POST",
                dataType: "json",
                data: {
                    video: {
                        author_id: this.authorId,
                        tokbox_archive_id: this.archiveId
                    }
                }
            }).done(function (e) {
                return window.location.href = "/lawyers/" + e.author_id + "/videos"
            })
        }
    }, window.videoRecorder = t, window.videoPlayer = e
}.call(this),
function () {
    var e, t, i, n, a = [].indexOf || function (e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    jQuery(function () {
        return i.setup(), n.setup(), e.setup(), t.setup(), $("#central-tabs").tabs({
            hide: {
                duration: 200
            },
            show: {
                duration: 1e3
            },
            create: function (e) {
                return $(e.target).addClass("appearing"), $(e.target).removeClass("invisible")
            }
        })
    }), t = {
        setup: function () {
            return this.handleEvents()
        },
        changeZipcodeZipLink: function () {
            return $(".browse_lawyers_block a#change_zipcode_zip")
        },
        handleEvents: function () {
            var e;
            return $(".browse_lawyers_block .local_lawyers").on("click", function () {
                return $(".browse_lawyers_block #local_lawyers_only").click()
            }), $(".browse_lawyers_block #local_lawyers_only").on("click", function (e) {
                return e.stopPropagation()
            }), $(".browse_lawyers_block #local_lawyers_only").on("change", function (e) {
                return $(e.target).is(":checked") ? ($(".state .label").text("Location:"), $(".browse_lawyers_block .location, .browse_lawyers_block #state_id_chzn").toggleClass("hidden")) : ($(".state .label").text("Relevant state:"), $(".browse_lawyers_block .location, .browse_lawyers_block .zipcode_text_box").addClass("hidden"), $(".browse_lawyers_block #state_id_chzn").removeClass("hidden"))
            }), this.changeZipcodeZipLink().on("click", function () {
                return $(".browse_lawyers_block .location, .browse_lawyers_block .zipcode_text_box").toggleClass("hidden")
            }), e = {}, $(".browse_lawyers_block #zipcode_zip, .sticky_filters #zipcode_zip").autocomplete({
                minLength: 2,
                source: function (t, i) {
                    var n;
                    return n = t.term, a.call(e, n) >= 0 ? (i(e[n]), void 0) : $.getJSON("/zipcodes/search", t, function (t) {
                        return e[n] = t, i(t)
                    })
                }
            })
        }
    }, i = {
        setup: function () {
            return this.selectDefault("carousel"), this.fancyBox(), this.bindUIActions()
        },
        selectDefault: function (e) {
            return $(".video-and-carousel-wrapper > .tabs li[data-block-id=" + e + "]").addClass("selected"), $(".video-and-carousel-wrapper .tab-content#" + e).show()
        },
        fancyBox: function () {
            return $(".tab-content#intro > a").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: !1,
                width: "70%",
                height: "70%",
                autoSize: !1,
                closeClick: !1,
                openEffect: "none",
                closeEffect: "none",
                overlay: {
                    showEarly: !0
                }
            })
        },
        bindUIActions: function () {
            return $(".video-and-carousel-wrapper > .tabs li").on("click", function (e) {
                var t;
                return t = $(e.target).data("block-id"), $(".video-and-carousel-wrapper .tab-content").hide(), $(".video-and-carousel-wrapper .tabs li").removeClass("selected"), $(e.target).addClass("selected"), $("#" + t).show()
            })
        }
    }, n = {
        setup: function () {
            return this.addDetectedUsersStateToTop()
        },
        addDetectedUsersStateToTop: function () {
            var e = this;
            return $.ajax("/auto-detect/detect-state?autodetect=need", {
                success: function () {
                    return e.addStateToTop(), e.selectDetectedUsersStateInBrowseSelect()
                },
                dataType: "script"
            })
        },
        addStateToTop: function () {
            return "undefined" != typeof detect_state_name && "" !== detect_state_name && ($(".find_lawyer_by ul.states li:contains(" + detect_state_name + ")").remove(), $(".find_lawyer_by ul.states").prepend("<li><a href='/lawyers/Legal-Advice/" + this.state_name_for_url + "' title='" + detect_state_name + " lawyers'>" + detect_state_name + "</a></li>"), $(".find_lawyer_by ul.states li").length > 10) ? $(".find_lawyer_by ul.states li:eq(8)").remove() : void 0
        },
        selectDetectedUsersStateInBrowseSelect: function () {
            return "undefined" != typeof detect_state_id && "" !== detect_state_id ? ($(".browse_lawyers_block #state_id").val(detect_state_id), $(".chosen-select").trigger("liszt:updated")) : void 0
        }
    }, e = {
        setup: function () {
            return this.browseLawyersButtonAction()
        },
        browseLawyersButtonAction: function () {
            var e = this;
            return $(".browse_lawyers_block a#browse_lawyers_button").on("click", function () {
                return e.saveCookies(), window.location.href = $(".browse_lawyers_block #local_lawyers_only").is(":checked") ? e.zipcode().length ? "/lawyers/Legal-Advice/All-States/" + e.practiceAreaNameForUrl() + "/sort_by/distance/local?zipcode=" + e.zipcode() : "/lawyers/Legal-Advice/All-States/" + e.practiceAreaNameForUrl() + "/sort_by/distance/local" : "/lawyers/Legal-Advice/" + e.stateNameForUrl() + "/" + e.practiceAreaNameForUrl(), !1
            })
        },
        saveCookies: function () {
            return this.stateId() && ($.cookie("state_id", this.stateId(), {
                expires: 30,
                path: "/"
            }), $.cookie("state", this.stateNameForUrl(), {
                expires: 30,
                path: "/"
            })), this.practiceAreaId() ? ($.cookie("practice_area_id", this.practiceAreaId(), {
                expires: 30,
                path: "/"
            }), $.cookie("practice_area", this.practiceAreaNameForUrl(), {
                expires: 30,
                path: "/"
            })) : void 0
        },
        stateId: function () {
            return $(".browse_lawyers_block #state_id").val()
        },
        stateName: function () {
            return $(".browse_lawyers_block #state_id option[value='" + this.stateId() + "']").text()
        },
        stateNameForUrl: function () {
            return this.stateId() ? "" + this.stateName().replace(/\s+/g, "_") + "-lawyers" : "All-States"
        },
        practiceAreaId: function () {
            return $(".browse_lawyers_block #practice_area_id").val()
        },
        practiceAreaName: function () {
            return $(".browse_lawyers_block #practice_area_id option[value='" + this.practiceAreaId() + "']").text()
        },
        zipcode: function () {
            return $(".browse_lawyers_block #zipcode_zip").val()
        },
        practiceAreaNameForUrl: function () {
            return this.practiceAreaId() ? $(".browse_lawyers_block #practice_area_id option[value='" + this.practiceAreaId() + "']").attr("name_for_url") : "All"
        }
    }
}.call(this),
function () {
    var e;
    jQuery(function () {
        return e.initialize()
    }), e = {
        initialize: function () {
            return this.handleNewClientForm(), this.handleNewLawyerForm()
        },
        newClientForm: function () {
            return $("form#new_client")
        },
        changeZipcodeZipLink: function () {
            return this.newClientForm().find("a#change_zipcode_zip")
        },
        zipcode_zip_field: function () {
            return this.newClientForm().find("#client_zipcode_zip")
        },
        zipcode_zip_row_show: function () {
            return this.zipcode_zip_field().parents("tr.hidden").removeClass("hidden")
        },
        zipcode_zip_row_hide: function () {
            return this.zipcode_zip_field().parents("tr").addClass("hidden")
        },
        location_row: function () {
            return this.newClientForm().find("tr.location")
        },
        location_row_hide: function () {
            return this.location_row().addClass("hidden")
        },
        handleNewClientForm: function () {
            var e = this;
            return this.changeZipcodeZipLink().on("click", function () {
                return e.zipcode_zip_row_show(), e.location_row_hide(), !1
            })
        },
        newLawyerForm: function () {
            return $("form#new_lawyer, form.edit_lawyer")
        },
        changeLawyerZipcodeZipLink: function () {
            return this.newLawyerForm().find("a#change_zipcode_zip")
        },
        lawyerZipcodeZipField: function () {
            return this.newLawyerForm().find("#lawyer_zipcode_zip")
        },
        lawyerZipcodeZipRowShow: function () {
            return this.lawyerZipcodeZipField().parents("tr.hidden").removeClass("hidden")
        },
        lawyerZipcodeZipRowHide: function () {
            return this.lawyerZipcodeZipField().parents("tr").addClass("hidden")
        },
        lawyerLocationRow: function () {
            return this.newLawyerForm().find("tr.location")
        },
        lawyerLocationRowHide: function () {
            return this.lawyerLocationRow().addClass("hidden")
        },
        handleNewLawyerForm: function () {
            var e = this;
            return this.changeLawyerZipcodeZipLink().on("click", function () {
                return e.lawyerZipcodeZipRowShow(), e.lawyerLocationRowHide(), !1
            })
        }
    }, this.zipcodes = e
}.call(this);