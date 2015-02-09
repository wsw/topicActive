/**
 * Created by weishuwen on 2015/2/6.
 */

define(function(require, exports, module) {

    var $ = require('$');
    var Action = require('../../lib/util/dom/action');
    var Dialog = require('../../lib/cmp/dialog/dialog');

    var imgDialog = null;
    var element = null;

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
            var sh = element.style.boxShadow.match(reg);

            var opt = {
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
            return opt;
        }
    };

    /**
     * 编辑对象时传入当前node节点
     * @param node
     * @constructor
     */
    function EditImg(node) {
        element = node;
        imgDialog = new Dialog({
            hasMask: {
                hideOnClick: true
            },
            content: $('#img-dialog').html(),
            width: 560,
            height: 360,
            closable: false,
            title: ""
        }).show().after('hide', function() {
                this.destroy();
            });
        imgDialog.clickType = 'modify';
    }



    Action.listen({
        addImgComp: function(e, node) {
            if (imgDialog && imgDialog.clickType == 'modify') {
                var $img = node.find('img');
                $(element).find('img').attr('src', $img.attr('src'));
                imgDialog.hide();
            }
        }
    });


    module.exports = {
        style: style,
        edit: EditImg
    };

});
