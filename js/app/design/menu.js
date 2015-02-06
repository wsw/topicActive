/**
 * Created by weishuwen on 2015/1/30.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var StyleAnimation = require('./styleobj');
    var StyleClass = require('./styleclass');

    var contextMenu = [
        [
            {
                text: "编辑",
                func: function() {
                    console.log(this);
                }
            },
            {
                text: "样式",
                func: function () {
//                    var opt = {
//                        background: this.style.backgroundColor || "rgb(0,0,0)",
//                        opacity: 100,
//                        borderWidth: this.style.borderWidth || 0,
//                        borderRadius: this.style.borderRadius || 0,
//                        borderType: this.style.borderStyle || 0,
//                        borderColor: this.style.borderColor || "rgb(0,255,0)",
//                        transform: this.style.transform,
//                        shadowSize: 0,
//                        shadowOffset: 0,
//                        shadowColor: "rgb(10,0,0)",
//                        animateType: 0,
//                        animateTime: 0,
//                        animateDelay: 0,
//                        animateTimes: 0,
//                        animateInfinite: false
//                    };
                    new StyleAnimation(this, "style", (new StyleClass(this)).getStyle());
                }
            },
            {
                text: "动画",
                func: function () {
                    new StyleAnimation(this, "animation", (new StyleClass(this)).getStyle());
                }
            },
            {
                text: "复制",
                func: function () {
                    alert("复制");
                }
            },
            {
                text: "删除",
                func: function () {
                    alert("删除");
                }
            }
        ]
    ];

    module.exports = {
        contextMenu: contextMenu
    }

});
