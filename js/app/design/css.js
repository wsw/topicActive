/**
 * Created by weishuwen on 2015/2/10.
 */

define(function(require, exports, module) {

    var $ = require('$');

    var css = function(node) {
        this.node = node;
    };
    /**
     * css对象主要获取当前节点的样式值，和设置样式值
     */
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
                //元素的基本样式
                width: $(element).width(),
                height: $(element).height(),
                left: $(element).position().left,
                top: $(element).position().top,
                src: $(element).find('img').attr('src'),

                // 样式和动画 对话框上的值信息
                background: element.style.backgroundColor,
                opacity: window.parseInt($(element).css('opacity'))*100,
                borderWidth: bw && bw[0] || 0,
                borderRadius: br && br[0] || 0,
                borderType: element.style.borderStyle || "solid",
                borderColor: element.style.borderColor || "rgb(255,255,255)",
                transform: tf && tf[0] || 0,
                shadowSize: sh && sh[4],
                shadowOffset: sh && sh[5],
                shadowColor: sh && "rgb("+sh[0]+","+sh[1]+","+sh[2]+")",
                animateType: element.getAttribute('data-animation'),
                animateTime: at && at[0] || 0,
                animateDelay: ad && ad[0] || 0,
                animateTimes: ats && ats[0] || 0,
                animateInfinite: element.style.webkitAnimationIterationCount == "infinite"
            };
        },
        /**
         * 根据type类型判断当前的设置是那个值
         * @param type "size", "color", "offset"
         * @param value 当前要设置的值
         */
        setShadow: function(type, value) {
            var element = this.node;
            var reg = /\-?[0-9]+\.?[0-9]*/g;
            var sh = element.style.boxShadow.match(reg);

            if (type === "size") {
                $(element).css('box-shadow', value+'px ' + value+'px ' + sh[5] + 'px ' + "rgb("+sh[0]+","+sh[1]+","+sh[2]+")");
            } else if (type === "color") {
                $(element).css('box-shadow', sh[4]+'px ' + sh[4]+'px ' + sh[5] + 'px ' +value);
            } else if (type === "offset") {
                $(element).css('box-shadow', sh[4]+'px ' + sh[4]+'px ' + value + 'px ' + "rgb("+sh[0]+","+sh[1]+","+sh[2]+")");
            }
        }
    };

    module.exports = css;
});