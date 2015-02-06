/**
 * Created by weishuwen on 2015/2/5.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var Action = require('../../lib/util/dom/action');
    var Dnd = require('../../../js/lib/util/dom/dnd');
    require('./range');
    require('./colorpicker');

    var element = null; // 当前处理的对象

    var $dialog = $("#styleAnimation");
    var $background = $dialog.find("#background");
    var $opacity = $dialog.find("#opacity");
    var $borderWidth = $dialog.find("#borderWidth");
    var $borderRadius = $dialog.find("#borderRadius");
    var $borderColor = $dialog.find("#borderColor");
    var $borderType = $dialog.find("#borderType");
    var $transform = $dialog.find("#transform");
    var $shadowSize = $dialog.find("#shadowSize");
    var $shadowOffset = $dialog.find("#shadowOffset");
    var $shadowColor = $dialog.find("#shadowColor");
    var $animateType = $dialog.find("#animateType");
    var $animateDelay = $dialog.find("#animateDelay");
    var $animateTime = $dialog.find("#animateTime");
    var $animateTimes = $dialog.find("#animateTimes");
    var $animateInfinite = $dialog.find("#animateInfinite");

    Action.listen({
        styleAnimationChange: function(e, node) {
            var $parent = node.parent();
            if (!$parent.hasClass('active')) {
                $parent.addClass('active').siblings().removeClass('active');
                $dialog.find('.content-list').hide().eq($parent.index()).show();
            }
        },
        styleAnimationLiTab: function(e, node) {
            node.find('.li-content').show();
            node.siblings().find('.li-content').hide();
        },
        styleAnimationClose: function() {
            $dialog.hide();
        }
    });


    bindEveryEvent(); //绑定各种事件
    interfaceContentChange();


    function bindEveryEvent(){
//        new Dnd({                          // 创建拖拽事件
//            element: '#styleAnimation',
//            except: 'ul'
//        });
        $dialog.find('input').bind('click', function() {    //input点击时重新获取焦点
            this.focus();
        });
        $dialog.find('.percent-select a').rangefunc({});    // slider的事件绑定
        $dialog.find(".color-select").colorpicker()         // 颜色选择器的绑定
            .on('changeColor', function(ev) {
                $(this).css('background', ev.color.toString('rgb'));
                $(this).parent().find('.ipt').val(ev.color.toString('rgb'));
            });
        $animateType.change(function() {
            if ($(this).val() == "" || $(this).val() == "none") {
                $dialog.find('.animate-panel').hide();
            } else {
                $dialog.find('.animate-panel').show();
            }
        });
    }

    function interfaceContentChange() {
        $dialog.on('input', function(e) {
            console.log(e.target)
            if (e.target.tagName.toLowerCase() === "input") {
                var $target = $(e.target);
                var max = window.parseInt($target.attr('data-max'));
                var value = window.parseInt($target.val());
                // 当前输入值的最大最小值做限制
                value >= max ? ($target.val(max), value=max): (value < 0 ? ($target.val(0), value=0) : "");
                // 实时的改变滑动条
                var $slide = $target.parent().find('a');
                var percent = (value / max) * 100;
                $slide.attr('data-value', percent).css('left', (percent*($slide.parent().width()-$slide.width())/100) + 'px');
            }
        });

    }


    var obj = function(element, type, opt) {
        var Default = {
            background: "rgb(255,0,0)",
            opacity: 100,
            borderWidth: 0,
            borderRadius: 0,
            borderType: 0,
            borderColor: "rgb(0,0,0)",
            transform: 350,
            shadowSize: 0,
            shadowOffset: 0,
            shadowColor: "rgb(0,0,0)",
            animateType: 0,
            animateTime: 0,
            animateDelay: 0,
            animateTimes: 0,
            animateInfinite: false
        };
        console.log(opt);
        Default = $.extend({}, Default, opt);
        console.log(Default);
        this.init(element, type, Default);
    };

    obj.prototype = {
        init: function(el, type, opt) {
            element = el;
            this.showModuleByType(type);
            this.initInterfaceData(opt);
        },
        /**
         * 通过类型判断当前的焦点是样式还是动画
         * @param type
         */
        showModuleByType: function(type) {
            if (type == "style") {
                $dialog.find('.content-nav li').removeClass('active').eq(0).addClass('active');
                $dialog.find('.content-list').show().eq(1).hide();
            } else if (type == "animation") {
                $dialog.find('.content-nav li').removeClass('active').eq(1).addClass('active');
                $dialog.find('.content-list').show().eq(0).hide();
            }
            $dialog.show();
        },
        /**
         * 界面上数据的绑定
         * @param opt
         */
        initInterfaceData: function(opt) {

            $background.val(opt.background);
            $opacity.val(opt.opacity).trigger('input');
            $borderWidth.val(opt.borderWidth).trigger('input');
            $borderRadius.val(opt.borderRadius).trigger('input');
            $borderColor.val(opt.borderColor);
            $transform.val(opt.transform).trigger('input');
            $shadowSize.val(opt.shadowSize).trigger('input');
            $shadowColor.val(opt.shadowColor);
            $shadowOffset.val(opt.shadowOffset).trigger('input');
            $animateDelay.val(opt.animateDelay).trigger('input');
            $animateTimes.val(opt.animateTimes).trigger('input');
            $animateTime.val(opt.animateTime).trigger('input');
            $animateTime.val(opt.animateTime).trigger('input');

            // 选择颜色框的背景色
            $background.parent().find('span').css({'background-color': opt.background});
            $borderColor.parent().find('span').css({'background-color': opt.borderColor});
            $shadowColor.parent().find('span').css({'background-color': opt.shadowColor});
            // 动画的类型情况
            if (opt.animateType || opt.animateType == "none") {
                $dialog.find('.animate-panel').hide();
            } else {
                $animateType.find('option').each(function() {
                    console.log(this.getAttribute('value') + " " +opt.animateType)
                    if (this.getAttribute('value') == opt.animateType) {
                        $(this).select();
                    }
                });
                $dialog.find('.animate-panel').show();
            }
        }
    };

    module.exports = obj;
});