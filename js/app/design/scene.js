/**
 * Created by weishuwen on 2015/2/3.
 */

define(function(require, exports, module) {

    var $ = require('$');
    var CompImg = require('./compimg');

    var $pageManage = $("#pageManage");
    var $container = $('.design');
    var liHtml = '<li data-action="changeScene">' +
        '<span class="number">1</span>' +
        '<span class="text" data-action="textModify">第1页</span>' +
        '</li>';

    /**
     *  初始化列表项的信息
     * @param list array
     */
    function pageManageInit(list) {
        var $ul = $pageManage.find('.content-list');
        $.each(list, function(index, value) {  //初始化列表信息
            var $li = $(liHtml);
            index == 0 ? ($li.addClass('active')) : "";
            $li.find('.number').text(value.num);
            $li.find('.text').text(value.name);
            $li.attr('data-scene-id', value.sceneId).attr('data-page-id', value.id);
            $ul.append($li);
        });
    }

    /**
     * 初始化容器各个空间
     * @param item object
     */
    function containerInit(item) {
        if (item.scene.image.imgSrc) {
            $container.css('background','url('+item.scene.image.imgSrc+');');
        } else {
            $container.css('background',item.scene.image.background);
        }
        $container.html("").attr('data-scene-id', item.sceneId)
            .attr('data-page-id', item.id);;
        $.each(item.elements, function(index, value) {
            if (value.content) {
                new CompImg({
                    container: ".design",
                    id: "CompImg-"+value.id,
                    width: value.css.width,
                    height: value.css.height,
                    src: value.content,
                    top: value.css.top || 0,
                    left: value.css.left || 0,
                    transform: value.css.transform || null,
                    dataId: value.id
                });
            }
        });
    }

    /**
     * 页面管理中当前页面的容器内容保存
     * @param container $
     * @param node $
     */
    function onePageContentSave(container, node) {

        var sceneId = container.attr('data-scene-id');
        var pageId = container.attr('data-page-id');
        var elements = [];
        var page = {id: pageId, sceneId: sceneId};

        $.each(container.find('li'), function() {
            var _this = $(this);
            var parameter = { css:{} };
            parameter.css.width = _this.width();
            parameter.css.height = _this.height();
            parameter.css.top = _this.css('top') || 0;
            parameter.css.left = _this.css('left') || 0;
            // 注意下content 目前是图片
            parameter.content = _this.find('img').attr('src');

            if (_this.attr('data-id')) {          //id 存在为修改控件 否则为新建
                parameter.id = _this.attr('data-id');
            }

            elements.push(parameter);
        });

        page.name = node.find('.text').text();
        page.num = node.find('.number').text();
        page.elements = elements;

        console.log(page);
    }

    module.exports = {
        init: pageManageInit,
        ctInit: containerInit,
        pageSave: onePageContentSave
    };
});