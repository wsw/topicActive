/**
 * Created by weishuwen on 2015/1/30.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var StyleAnimation = require('./styleobj');
    var MenuFunc = require('./menufunc');

    var $container = $(".design");

    var contextMenu = [
        [
            {
                text: "编辑",
                func: function() {
                    MenuFunc.edit(this);
                }
            },
            {
                text: "样式",
                func: function () {
                    new StyleAnimation(this, "style", (new MenuFunc.style(this)).getStyle());
                }
            },
            {
                text: "动画",
                func: function () {
                    new StyleAnimation(this, "animation", (new MenuFunc.style(this)).getStyle());
                }
            },
            {
                text: "复制",
                func: function () {
                    window.cloneNode = new MenuFunc.style(this).getStyle();
                }
            },
            {
                text: "删除",
                func: function () {
                    $(this).remove();
                }
            }
        ]
    ];

    module.exports = {
        contextMenu: contextMenu
    }

});
