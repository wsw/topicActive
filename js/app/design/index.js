/**
 * Created by weishuwen on 2015/1/30.
 */

define(function(require, exports, module) {
    var $ = require('$');
    var CompImg = require('./compimg');
    var Action = require('../../lib/util/dom/action');
    var Dialog = require('../../lib/cmp/dialog/dialog');
    var Scene = require('./scene');
    var Data = require('./data');
    var StyleAnimation = require('./styleobj');

    var index = 0;  //容器的控件索引
    /**
     * 页面上各种事件的监听
     */
    $(function() {

        var designContainer = $('.design');
        var bgDialog = null;
        var imgDialog = null;
        var sceneId = 712959;

        Action.listen({
            /**
             * 创建图片对话框
             */
            createImg: function() {
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
            },
            /**
             * 创建背景图片对话框
             */
            createBg: function() {
                bgDialog = new Dialog({
                    hasMask: {
                        hideOnClick: true
                    },
                    content: $('#bg-dialog').html(),
                    width: 560,
                    height: 360,
                    closable: false,
                    title: "",
                    "z-index": 99999999
                }).show().after('hide', function() {
                        this.destroy();
                    });
            },
            /**
             * 对话框上按钮的点击事件
             * @param e
             * @param node
             */
            dialogTab: function(e, node) {
                if (node.hasClass('active')) {  //判断当前点击是否为以选中项
                    return ;
                }
                var index = node.addClass('active').index(); //当前的点击Tab位置
                node.siblings().removeClass('active');

                var contentList = node.parent().parent().find('.content-row');
                contentList.hide().eq(index).show();
            },
            /**
             * 背景对话框上图片的点击事件
             * @param e
             * @param node
             */
            bgModify: function(e, node) {
                if (node.attr('src') == "") {  //判断当前为纯色还是图片
                    designContainer.css('background', node.css('background'));
                } else {
                    designContainer.css('background', "url("+node.attr('src')+")");
                }
                bgDialog.hide();
            },
            /**
             * 页面管理中列表项标题修改
             * @param e
             * @param node
             */
            textModify: function(e, node) {
                var ipt = $("<input type='text' value='"+node.text()+"'/>"); //创建一个input
                node.parent().append(ipt).click();
                node.hide();
                ipt.focus().blur(function(e) {  //先触发focus事件接着绑定blur事件,
                    node.text(ipt.val()).show();
                    ipt.blur = null;
                    ipt.remove();
                });
            },
            /**
             * 页面管理中列表项点击事件，改变容器的场景
             * @param e
             * @param node
             */
            changeScene: function(e, node) {
                if (!node.hasClass('active')) {
                    Scene.pageSave(designContainer, node.siblings('active'));
                    node.addClass('active').siblings().removeClass('active');
                    var i = Math.floor(Math.random()*3);
                    i == 0 ? Scene.ctInit(Data.item2) :
                    i == 1 ? Scene.ctInit(Data.item) :
                        Scene.ctInit(Data.item3);
                }
            },
            /**
             * 页面管理中增加一个新的场景，多一个列表项,且场景切换到新增的列表项
             * @param e
             * @param node
             */
            addNewScene: function(e, node) {

                //var sceneId = sceneId;
                var pageId = window.parseInt(Math.random()*10000);

                var liHtml = '<li data-action="changeScene">' +
                    '<span class="number">1</span>' +
                    '<span class="text" data-action="textModify">第1页</span> </li>';

                var list = node.parent().parent().find('.content-list');
                var lists = list.find('li').removeClass('active');
                var $li = $(liHtml);
                $li.find('.number').text(lists.size()+1);
                $li.find('.text').text('第' + (lists.size()+1) + '页');
                $li.attr('data-scene-id', sceneId).attr('data-page-id', pageId);
                list.append($li);
                $li.click();
            },
            /**
             * 图片对话框中新增一个图片控件
             * @param e
             * @param node
             */
            addImgComp: function(e, node) {
                var $img = node.find('img');

                // 创建时从后台获取一个id
                new CompImg({
                    container: ".design",
                    id: "CompImg-"+index++,
                    width: $img.width(),
                    height: $img.height(),
                    src: $img.attr('src')
                });

                imgDialog.hide();
            }
        });
        Scene.init(Data.list);
        Scene.ctInit(Data.item);
    });


    new StyleAnimation("animation", {})

//    new CompImg({
//        container: ".design",
//        id: "CompImg-"+index++
//    });
//    new CompImg({
//        container: ".design",
//        id: "CompImg-"+index++
//    });
//
//    new CompImg({
//        container: ".design",
//        id: "CompImg-"+index++
//    });

});