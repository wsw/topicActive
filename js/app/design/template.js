/**
 * Created by weishuwen on 2015/3/25.
 */

define(function(require, exports, module) {
    require('../../lib/cmp/html2canvas/html2canvas');
    var $ = require('$');
    var Css = require('./css');
    var CompImg = require('./compimg');
    var Data = require('./data');

    /**
     * 把div片段内容保存为png格式的图片
     * @param callback
     */
    function saveImageDataURL(callback) {
        html2canvas(document.getElementById('design')).then(function(canvas) {
            var page = readDesignContent();

            page.screenshot = canvas.toDataURL("image/png");
            Data.saveTemplate(page);

            callback && callback(canvas.toDataURL("image/png"));
        });
    }

    function readDesignContent() {
        var container = $("#design");
        var elements = [];
        var page = {type: "tpl"};

        $.each(container.find('li'), function() {
            var _this = $(this);
            var parameter = { css:{} };
            parameter.css = (new Css(this)).getStyle();
            // 注意下content 目前是图片
            parameter.content = _this.find('img').attr('src');

            elements.push(parameter);
        });
        page.elements = elements;
        console.log(container);
        // 容器的内容
        page.scene = {image: {}};
        var url = container.css('background-image').trim();
        page.scene.image.imgSrc = url.replace(/url\(([^\)]+)\).*/gi,'$1');
        page.scene.image.background = container.css('background-color');

        return page;
    }

    function writeDesignContent(item) {
        var $container = $("#design");

        // 判断当前背景为图片还是纯色
        if (item.scene && item.scene.image.imgSrc && item.scene.image.imgSrc != "none") {
            $container.css({"background-image": "url("+item.scene.image.imgSrc+")"});
        } else {
            $container.css('background',item.scene.image.background);
        }
        $container.html("");

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

    exports.save = saveImageDataURL;
    exports.initTemplate = writeDesignContent;

});