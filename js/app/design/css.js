/**
 * Created by weishuwen on 2015/2/10.
 */

define(function(require, exports, module) {

    var $ = require('$');

    var css = function(node) {
        this.node = node;
    };

    css.prototype = {
        constructOr: css,
        getStyle: function() {
            var element = this.node;

            var reg = /\-?[0-9]+\.?[0-9]*/g;
            var bw = element.style.borderWidth && element.style.borderWidth.match(reg);
            var br = element.style.borderRadius && element.style.borderRadius.match(reg);
            var at = element.style.webkitAnimationDuration.match(reg);
            var ad = element.style.webkitAnimationDelay.match(reg);
            var ats = element.style.webkitAnimationIterationCount.match(reg);
            var tf = element.style.transform.match(reg);
            var sh = element.style.boxShadow.match(reg);

            return {
                //
                width: $(element).width(),
                height: $(element).height(),
                left: $(element).position().left,
                top: $(element).position().top,
                src: $(element).find('img').attr('src'),

                background: element.style.backgroundColor,
                opacity: element.style.opacity,
                borderWidth: bw && bw[0] || 0,
                borderRadius: br && br[0] || 0,
                borderType: element.style.borderStyle || "solid",
                borderColor: element.style.borderColor || "rgb(255,255,255)",
                transform: tf && tf[0] || 0,
                shadowSize: sh && sh[4],
                shadowOffset: sh && sh[3],
                shadowColor: sh && "rgb("+sh[0]+","+sh[1]+","+sh[2]+")",
                animateType: element.getAttribute('data-animation'),
                animateTime: at && at[0] || 0,
                animateDelay: ad && ad[0] || 0,
                animateTimes: ats && ats[0] || 0,
                animateInfinite: element.style.webkitAnimationIterationCount == "infinite"
            };
        }
    };

    module.exports = css;
});