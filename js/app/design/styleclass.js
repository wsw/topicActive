/**
 * Created by weishuwen on 2015/2/6.
 */

define(function(require, exports, module) {

    var style = function(node) {
        this.node = node;
    };

    style.prototype = {
        constructOr: style,
        getStyle: function() {

            var element = this.node;

            var reg = /\-?[0-9]+\.?[0-9]*/g;
            var bw = element.style.borderWidth && element.style.borderWidth.match(reg);
            var br = element.style.borderRadius && element.style.borderRadius.match(reg);
            var at = element.style.webkitAnimationDuration.match(reg);
            var ad = element.style.webkitAnimationDelay.match(reg);
            var ats = element.style.webkitAnimationIterationCount.match(reg);
            var tf = element.style.transform.match(reg);

            var opt = {
                background: element.style.backgroundColor,
               // opacity: 100,
                borderWidth: bw && bw[0] || 0,
                borderRadius: br && br[0] || 0,
                borderType: element.style.borderStyle || "solid",
                borderColor: element.style.borderColor || "rgb(255,255,255)",
                transform: tf && tf[0] || 0,
//                shadowSize: 0,
//                shadowOffset: 0,
//                shadowColor: "rgb(10,0,0)",
                animateType: element.getAttribute('data-animation'),
                animateTime: at && at[0] || 0,
                animateDelay: ad && ad[0] || 0,
                animateTimes: ats && ats[0] || 0,
                animateInfinite: element.style.webkitAnimationIterationCount == "infinite"
            };

            return opt;
        }
    };


    module.exports = style;

});
