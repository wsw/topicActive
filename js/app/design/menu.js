/**
 * Created by weishuwen on 2015/1/30.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var StyleAnimation = require('./styleobj');
    var MenuFunc = require('./menufunc');

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
                    new StyleAnimation(this, "style", MenuFunc.getStyle(this) );
                }
            },
            {
                text: "动画",
                func: function () {
                    new StyleAnimation(this, "animation", MenuFunc.getStyle(this));
                }
            },
            {
                text: "复制",
                func: function () {
                    window.cloneNode = MenuFunc.getStyle(this);
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
