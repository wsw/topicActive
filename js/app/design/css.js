/**
 * Created by weishuwen on 2015/2/10.
 */

define(function(require, exports, module) {

    var $ = require('$');
    var Browser = require('../../lib/util/bom/browser');

    var css = function(node) {
        this.node = node;
    };
    /**
     * css对象主要获取当前节点的样式值，和设置样式值
     */
    css.prototype = {
        constructOr: css,
        /**
         * 根据当前的创建的节点元素，获取该元素所有样式属性值
         */
        getStyle: function() {
            var element = this.node;
            var box = element.getElementsByTagName('div')[0];

            var reg = /\-?[0-9]+\.?[0-9]*/g;
            var bw = box.style.borderWidth && box.style.borderWidth.match(reg);
            var br = box.style.borderRadius && box.style.borderRadius.match(reg);
            var tf = element.style.transform.match(reg);
            var sh = box.style.boxShadow.match(reg);

            //
            if (Browser.firefox) {
                var tp = sh.splice(0);
                sh[0] = tp[3], sh[1] = tp[4], sh[2] = tp[5];
                sh[3] = tp[0], sh[4] = tp[1], sh[5] = tp[2];
            }

            var elStyle = box.style;
            var at = (elStyle.webkitAnimationDuration || elStyle.mozAnimationDuration || elStyle.animationDuration).match(reg);
            var ad = (elStyle.webkitAnimationDelay || elStyle.mozAnimationDelay || elStyle.animationDelay).match(reg);
            var ats = (elStyle.webkitAnimationIterationCount || elStyle.mozAnimationIterationCount || elStyle.animationIterationCount).match(reg);

            return {
                //元素的基本样式
                width: $(element).width(),
                height: $(element).height(),
                /**
                 *  当存在角度的时候，用jq获取left，right不是想要的
                 */
                left: element.offsetWidth,
                top: element.offsetTop,
                src: $(element).find('img').attr('src'),

                // 样式和动画 对话框上的值信息
                background: box.backgroundColor,
                opacity: window.parseInt($(element).css('opacity')*100),
                borderWidth: bw && bw[0] || 0,
                borderRadius: br && br[0] || 0,
                borderType: box.style.borderStyle || "solid",
                borderColor: box.style.borderColor || "rgb(255,255,255)",
                transform: tf && tf[0] || 0,
                shadowSize: sh && sh[4],
                shadowOffset: sh && sh[5],
                shadowColor: sh && "rgb("+sh[0]+","+sh[1]+","+sh[2]+")",
                animateType: box.getAttribute('data-animation'),
                animateTime: at && at[0] || 0,
                animateDelay: ad && ad[0] || 0,
                animateTimes: ats && ats[0] || 0,
                animateInfinite: (elStyle.webkitAnimationIterationCount || elStyle.mozAnimationIterationCount || elStyle.animationIterationCount) == "infinite"
            };
        },
        /**
         * 根据type类型判断当前的设置是那个值
         * @param type "size", "color", "offset"
         * @param value 当前要设置的值
         */
        setShadow: function(type, value) {
            var element = this.node;
            var box = element.getElementsByTagName('div')[0];
            var reg = /\-?[0-9]+\.?[0-9]*/g;
            var sh = box.style.boxShadow.match(reg);

            if (Browser.firefox) {
                var tp = sh.splice(0);
                sh[0] = tp[3], sh[1] = tp[4], sh[2] = tp[5];
                sh[3] = tp[0], sh[4] = tp[1], sh[5] = tp[2];
            }

            if (type === "size") {
                $(box).css('box-shadow', value+'px ' + value+'px ' + sh[5] + 'px ' + "rgb("+sh[0]+","+sh[1]+","+sh[2]+")");
            } else if (type === "color") {
                $(box).css('box-shadow', sh[4]+'px ' + sh[4]+'px ' + sh[5] + 'px ' +value);
            } else if (type === "offset") {
                $(box).css('box-shadow', sh[4]+'px ' + sh[4]+'px ' + value + 'px ' + "rgb("+sh[0]+","+sh[1]+","+sh[2]+")");
            }
        },
        /**
         * 根据样式值对象设置当前元素的样式值
         * @param cssObj
         */
        setAllStyle: function(cssObj) {
            var element = this.node;
            var cssText = "";
            cssText = cssText + "width:" + (cssObj['width'] || 0) + "px;";
            cssText = cssText + "height:" + (cssObj['height'] || 0) + "px;";
            cssText = cssText + "left:" + (cssObj['left'] || 0) + "px;";
            cssText = cssText + "top:" + (cssObj['top'] || 0) + "px;";
            cssText = cssText + "background:" + (cssObj['background'] || "white")+";";
            cssText = cssText + "opacity:" + (cssObj['opacity'] || 1)+";";
            cssText = cssText + "border-radius:" + (cssObj['borderRadius'] || 0)+"px;";
            cssText = cssText + "border:" + cssObj['borderWidth'] + 'px ' + cssObj['borderType'] + " "+cssObj['borderColor'] + ";";
            cssText = cssText + "box-shadow:" + cssObj['shadowSize'] + 'px ' + cssObj['shadowSize'] + 'px ' +
                cssObj['shadowOffset'] + 'px ' + cssObj['shadowColor'] + ";";
            /*webkit*/
            cssText = cssText + "-webkit-transform: rotate(" + cssObj['transform'] + "deg);";
            cssText = cssText + "-webkit-animation-duration:"+cssObj['animateTime']+'s;';
            cssText = cssText + "-webkit-animation-delay:"+cssObj['animateDelay']+'s;';
            cssText = cssText + "-webkit-animation-iteration-count:"+cssObj['animateTimes']+";";
            cssText = cssText + "-webkit-animation-iteration-count:"+(cssObj['animateInfinite'] == "infinite");
            /*moz*/
            cssText = cssText + "-moz-transform: rotate(" + cssObj['transform'] + "deg);";
            cssText = cssText + "-moz-animation-duration:"+cssObj['animateTime']+'s;';
            cssText = cssText + "-moz-animation-delay:"+cssObj['animateDelay']+'s;';
            cssText = cssText + "-moz-animation-iteration-count:"+cssObj['animateTimes']+";";
            cssText = cssText + "-moz-animation-iteration-count:"+(cssObj['animateInfinite'] == "infinite");

            cssText = cssText + "transform: rotate(" + cssObj['transform'] + "deg);";
            cssText = cssText + "animation-duration:"+cssObj['animateTime']+'s;';
            cssText = cssText + "animation-delay:"+cssObj['animateDelay']+'s;';
            cssText = cssText + "animation-iteration-count:"+cssObj['animateTimes']+";";
            cssText = cssText + "animation-iteration-count:"+(cssObj['animateInfinite'] == "infinite");

            element.style.cssText = cssText;
        }
    };

    module.exports = css;
});