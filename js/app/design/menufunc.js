/**
 * Created by weishuwen on 2015/2/6.
 */

define(function(require, exports, module) {

    var $ = require('$');
    var Action = require('../../lib/util/dom/action');
    var Dialog = require('../../lib/cmp/dialog/dialog');
    var Css = require('./css');

    var imgDialog = null;
    var element = null;
    var designContainer = $('.design');

    /**
     * 获取当前对象的css属性值
     * @param node
     * @returns {*}
     */
    function getStyle(node) {
        return (new Css(node)).getStyle();
    }

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
        },
        editImg: function() {
            var node = designContainer.find('li.selected');
            EditImg(node);
        }
    });

    module.exports = {
        getStyle: getStyle,
        edit: EditImg
    };

});
