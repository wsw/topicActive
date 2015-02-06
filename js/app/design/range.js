/**
 * jquery slider 插件
 * parent : position:relative,
 * element: position:absolute
 * Created by weishuwen on 2015/2/5.
 */

define(function(require, exports, module) {
    var $ = require('$');

    var rangeFunc = function(node, opt) {
        this.element = $(node);

        this.init(opt);
    };
    rangeFunc.prototype = {
        init: function(opt) {

            this.bindElementEvent();
        },
        bindElementEvent: function() {
            var element = this.element;
            //var percent = element.attr('data-value');
            var parent = element.parent();
            var pageX, pageY;
            var diffX, elL;

            var dragging = false;

            var width = parent.width() - element.width();

            //element.css('left', (percent*width /100)  + 'px');

            // 滑动事件绑定
            element.bind('mousedown', function(e) {
                pageX =  e.pageX;
                elL = $(this).position().left;
                dragging = true;
            });
            $(document).bind('mousemove', function(e) {
                if (dragging) {
                    var moveX = e.pageX;
                    var left = moveX - pageX + elL;

                    (left >= width) ? left = width : left < 0 ? left = 0 : "";

                    element.css('left', left+'px').attr('data-value', left*100/width);
                }
            }).bind('mouseup', function() {
                dragging = false;
            });

            // 点击事件绑定
            parent.bind('click', function(e) {
                var left = e.pageX - $(this).offset().left;
                (left >= width) ? left = width : left < 0 ? left = 0 : "";
                element.css('left', left+'px').attr('data-value', left*100/width);
            });
        }
    };

    $.fn.rangefunc = function(opt) {
        var Default = {

        };
        Default = $.extend({}, Default, opt);
        this.each(function() {
           new rangeFunc(this, opt);
        });
    }

});