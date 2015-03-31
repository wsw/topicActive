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
    var Template = require('./template');
    var audio = require('./tpl/audio.tpl');
    var templateTpl = require('./tpl/templateTpl.tpl');

    var index = 1;

    /**
     * 页面上各种事件的监听
     */
    $(function() {

        var designContainer = $('.design');
        var pageList = $("#pageManage .content-list");
        var bgDialog = null;   // 背景对话框
        var imgDialog = null;  // 图片对话框
        var templateDialog = null;  // 模板对话框
        var audioDialog = null; // 声音对话框
        var styleAnimation = $("#styleAnimation");
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
                imgDialog.clickType = 'create';
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
             * @param node 当前点击元素节点$对象
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
             * @param node 当前点击元素节点$对象
             */
            bgModify: function(e, node) {

                if (node.attr('src') == "") {  //判断当前为纯色还是图片
                    designContainer.css('background', node.css('backgroundColor'));
                } else {
                    designContainer.css('background', "url("+node.attr('src')+")");
                }
                bgDialog && bgDialog.hide();
            },
            /**
             * 页面管理中列表项标题修改
             * @param e
             * @param node 当前点击元素节点$对象
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
             * @param node 当前点击元素节点$对象
             */
            changeScene: function(e, node) {
                if (!node.hasClass('active')) {
                    var active = node.siblings('.active').removeClass('active');
                    Scene.changePage(active, node);
                    node.addClass('active');
                    styleAnimation.hide();
                }
            },
            /**
             * 页面管理中增加一个新的场景，多一个列表项,且场景切换到新增的列表项
             * @param e
             * @param node 当前点击元素节点$对象
             */
            addNewScene: function(e, node) {
                Scene.onePageContentCreate();
            },
            /**
             * 图片对话框中新增一个图片控件
             * @param e
             * @param node 当前点击元素节点$对象
             */
            addImgComp: function(e, node) {
                var $img = node.find('img');
                // 创建时从后台获取一个id
                if (imgDialog && imgDialog.clickType == "create") {
                    new CompImg({
                        container: ".design",
                        id: "CompImg-"+index++,
                        width: $img.width(),
                        height: $img.height(),
                        src: $img.attr('src'),
                        top: 200
                    });
                    imgDialog.hide();
                }
            },
            /**
             * 页面管理- 删除事件
             * @param e
             * @param node 当前点击元素节点$对象
             */
            pageDelete: function(e, node) {
                if (pageList.find('li').size() > 1) {
                    var element = pageList.find('li.active');
                    var index = element.index();
                    index = index < 1 ? 1: index-1;
                    Scene.deletePage(element);
                    pageList.find('li').eq(index).click();
                    element.remove();
                }
            },
            /**
             * 当前页面复制一份
             * @param e
             * @param node 当前点击元素节点$对象
             */
            pageClone: function(e, node) {
                var element = pageList.find('li.active');
                Scene.clonePage(element);
                pageList.find('li').last().click();
            },
            /**
             * 页面模板模块 tab页
             * @param e
             * @param node 当前点击元素节点$对象
             */
            templateTab: function(e, node) {
                var pNode = node.parent();
                if (!pNode.hasClass('active')) {
                    pNode.addClass('active').siblings().removeClass('active');
                    node.parents(".content-1").find('.content-list').hide()
                        .eq(pNode.index()).show();
                }
            },
            /**
             * 保存当前选中页面的内容信息
             * @param e
             * @param node
             */
            saveScene: function(e, node) {
                var element = pageList.find('li.active');
                Scene.onePageContentSave(element);
                alert('保存成功');
            },
            ulClick: function(e, node) {
                node.find('li').removeClass('selected');
                styleAnimation.hide();
            },
            liClick: function(e, node) {
                styleAnimation.show();
                node.addClass('selected').siblings().removeClass('selected');
            },
            /**
             * 选择模版 按钮
             * @param e
             * @param node
             */
            setTemplate: function(e, node) {
                console.log(Data.getTemplate())
                templateDialog = new Dialog({
                    hasMask: {
                        hideOnClick: true
                    },
                    content: templateTpl.render({templates: Data.getTemplate()}),
                    width: 560,
                    height: 360,
                    closable: false,
                    title: ""
                }).show().after('hide', function() {
                        this.destroy();
                    });
            },
            /**
             * 选择为模版 按钮
             * @param e
             * @param node
             */
            saveTemplate: function(e, node) {
                Template.save(function(base64Data) {
                    alert('保存模版成功');
                });
            },
            /**
             * 选择要替换的模版
             */
            selectTemplate: function(e, node) {
                if (window.confirm("确定替换成模版？")) {
                    Template.initTemplate(Data.getTemplateById(node.attr('data-id')));
                }
                templateDialog.hide();
            },
            createAudio: function(e, node) {
                audioDialog = new Dialog({
                    hasMask: {
                        hideOnClick: true
                    },
                    content: audio.render(),
                    width: 560,
                    height: 200,
                    closable: false,
                    title: ""
                }).show().after('hide', function() {
                        this.destroy();
                    });
            },
            audioDialogOk: function(e, node) {
                var root = node.parents('.audio-inner-content');
                var index = root.find('.btn-nav a.active').index();
                var result;

                if (index == 0) {
                    result = root.find('.content-row').eq(index).find('select').val();
                } else if (index = 1) {
                    result = root.find('.content-row').eq(index).find('input').val();
                }
                alert(result);
                audioDialog.hide();
            },
            audioDialogCancel: function() {
                audioDialog.hide();
            }
        });

        Action.listen({
            audioSelect: function(e, node) {
                console.log(node.val())
            }
        }, document, "change");

        Scene.init();

        window.onbeforeunload = function() {
            return "";
        };


        /**
         * 页面左右两块自适应
         */
        $(function() {

            var winHeight = $(window).height();
            var $left = $("#pageManage .content-list");
            var $right = $("#pageProperty");
            var $right_2 = $("#styleAnimation .content-list");

            $left.height(winHeight-50-45-60-40);
            $right.height(winHeight-50);
            $right_2.height(winHeight-50-50-60);

            $(window).bind('resize', function() {
                winHeight = $(window).height();

                if (winHeight < document.body.clientHeight) {
                    winHeight = document.body.clientHeight;
                }

                $left.height(winHeight-50-45-60-40);
                $right.height(winHeight-50);
                $right_2.height(winHeight-50-50-60);
            });

        });

        require("./template")
    });

});