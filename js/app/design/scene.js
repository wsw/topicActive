/**
 * Created by weishuwen on 2015/2/3.
 */

define(function(require, exports, module) {

    var $ = require('$');
    var CompImg = require('./compimg');
    var Css = require('./css');
    require('../../lib/cmp/smartmenu');

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
        // 容器的右键粘贴初始化
        $container.smartMenu([[{text: "粘贴", func: cloneNode}]], {name: "design"});
    }

    /**
     * 复制一个对象的方法
     */
    function cloneNode() {
        // 存在复制的对象
        if (window.cloneNode) {
            var opt = window.cloneNode;
            opt.container = ".design";
            opt.top = window.parseInt(opt.top) + 30;
            new CompImg(opt);
        }
    }

    /**
     * 初始化容器各个空间
     * @param item object
     */
    function containerInit(item) {
        // 判断当前背景为图片还是纯色
        if (item.scene && item.scene.image.imgSrc && item.scene.image.imgSrc != "none") {
            $container.css({"background-image": "url("+item.scene.image.imgSrc+")"});
        } else {
            $container.css('background',item.scene.image.background);
        }
        // 当前容器内容置空，并绑定相关的id
        $container.html("").attr('data-scene-id', item.sceneId)
            .attr('data-page-id', item.id);
        // 初始化当前容器中各个控件, 目前只有图片类型的
        $.each(item.elements || [], function(index, value) {
            if (value.content) {
                new CompImg({
                    container: ".design",
                    id: "CompImg-"+value.id,
                    width: value.css.width,
                    height: value.css.height,
                    src: value.content,
                    top: value.css.top,
                    left: value.css.left,
                    dataId: value.id,
                    // css style
                    background: value.css.background,
                    opacity: value.css.opacity,
                    borderWidth: value.css.borderWidth,
                    borderRadius: value.css.borderRadius,
                    borderType: value.css.borderType,
                    borderColor: value.css.borderColor,
                    transform: value.css.transform,
                    shadowSize: value.css.shadowSize,
                    shadowOffset: value.css.shadowOffset,
                    shadowColor: value.css.shadowColor,
                    animateType: value.css.animateType,
                    animateTime: value.css.animateTime,
                    animateDelay: value.css.animateDelay,
                    animateTimes: value.css.animateTimes,
                    animateInfinite: value.css.animateInfinite
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
            parameter.css = (new Css(this)).getStyle();

            // 注意下content 目前是图片
            parameter.content = _this.find('img').attr('src');

            //id 存在为修改控件 否则为新建
            if (_this.attr('data-id')) {
                parameter.id = _this.attr('data-id');
            }

            elements.push(parameter);
        });

        // 列表上的内容
        page.name = node.find('.text').text();
        page.num = node.find('.number').text();
        page.elements = elements;

        // 容器的内容
        page.scene = {image: {}};
        var url = $container.css('background-image').trim();
        page.scene.image.imgSrc = url.replace(/url\(([^\)]+)\).*/gi,'$1');
        page.scene.image.background = $container.css('background-color');
        // @保存page内容到服务器
        console.log(page);

        // test
        return page;
    }

    /**
     * 创建一个新的场景包括当前页的内容信息
     * @param item
     */
    function onePageContentCreate(item) {
        // 列表新增一个项
        var $ul = $pageManage.find('.content-list');
        var $li = $(liHtml);
        $li.find('.number').text(item.num);
        $li.find('.text').text(item.name);
        $li.attr('data-scene-id', item.sceneId).attr('data-page-id', item.id);
        $ul.append($li);
        // 初始化容器内的内容
        $li.click();
        containerInit(item);
    }

    /**
     * 设置模版内容到设计容器里
     * @param item
     */
    function setTemplate(item) {
        containerInit(item);
    }

    /**
     * 绑定键盘快捷键Ctrl+c, Ctrl+v
     */
    $(document).bind('keydown', function(e) {
        if (e.keyCode == 67 && e.ctrlKey) {
            var $selected = $container.find('li.selected');
            if ($selected.size() > 0) {
                window.cloneNode = (new Css($selected[0])).getStyle();
            }
        } else if (e.keyCode == 86 && e.ctrlKey) {
            cloneNode();
        }

    });


    module.exports = {
        init: pageManageInit,
        ctInit: containerInit,
        pageSave: onePageContentSave,
        pageCreate: onePageContentCreate,
        setTemplate: setTemplate
    };
});