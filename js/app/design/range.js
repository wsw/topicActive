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
            this.dragging = false;
            this.bindElementEvent();
        },
        bindElementEvent: function() {
            var element = this.element;
            var _this = this;
            //var percent = element.attr('data-value');
            var parent = element.parent();
            var pageX, pageY;
            var diffX, elL;

            var width = parent.width() - element.width();

            //element.css('left', (percent*width /100)  + 'px');

            // 滑动事件绑定
            element.on('mousedown', function(e) {
                pageX =  e.pageX;
                elL = $(this).position().left;
                if (!_this.dragging) {
                    _this.dragging = true;
                }
            });
            $(document).on('mousemove', function(e) {
                if (_this.dragging) {
                    var moveX = e.pageX;
                    var left = moveX - pageX + elL;
                    // 左右边界的限制
                    (left >= width) ? left = width : left < 0 ? left = 0 : "";
                    // 滑动时点移动位置
                    element.css('left', left+'px').attr('data-value', left*100/width);
                    // 输入框的值改变
                    parent.parent().find('input').val(parseInt(left/width * parseInt(parent.parent().find('input').attr('data-max'))))
                        .trigger('input');
                }
            }).on('mouseup', function() {
                if (_this.dragging) {
                    _this.dragging = false;
                }
            });

            // 点击事件绑定
            parent.bind('click', function(e) {
                var left = e.pageX - $(this).offset().left;
                (left >= width) ? left = width : left < 0 ? left = 0 : "";
                element.css('left', left+'px').attr('data-value', left*100/width);
                // 输入框的值改变
                parent.parent().find('input').val(parseInt(left/width * parseInt(parent.parent().find('input').attr('data-max'))))
                    .trigger('input');
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