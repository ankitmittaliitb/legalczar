jQuery(document).ready(function() {

var e = Math.floor(6 * Math.random());
        jQuery("#mini-profiles_carousel").jcarousel({
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
        })


jQuery("#press_items_carousel").jcarousel({
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
});
