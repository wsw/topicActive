/**
 * Created by weishuwen on 2015/1/30.
 */
define(function(require, exports, module) {

    var $ = require('$');

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
                    alert("样式");
                }
            },
            {
                text: "动画",
                func: function () {
                    alert("动画");
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
