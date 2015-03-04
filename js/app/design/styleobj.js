/**
 * Created by weishuwen on 2015/2/5.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var Action = require('../../lib/util/dom/action');
    var Dnd = require('../../lib/util/dom/dnd');
    var Css = require('./css');
    require('./drag');

    require('./range');
    require('./colorpicker');

    var element = null; // 当前处理的对象

    var animation = "";   // 当前的动画类型
    var animateInfinite = false;

    //
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
        /**
         * 样式 与 动画 的切换
         * @param e
         * @param node
         */
        styleAnimationChange: function(e, node) {
            var $parent = node.parent();
            if (!$parent.hasClass('active')) {
                $parent.addClass('active').siblings().removeClass('active');
                $dialog.find('.content-list').hide().eq($parent.index()).show();
            }
        },
        /**
         * 对话框上tab切换
         * @param e
         * @param node
         */
        styleAnimationLiTab: function(e, node) {
            node.find('.li-content').show();
            node.siblings().find('.li-content').hide();
        },
        /**
         * 对话框关闭
         */
        styleAnimationClose: function() {
            $dialog.hide();
        },
        /**
         * 切换控件时，改变样式动画对话框的值对象
         * @param e
         * @param node
         */
        liClick: function(e, node) {
            if ($dialog.css('display') != "none") {
                new obj(node[0], "", (new Css(node[0])).getStyle());
            }
        },
        /**
         * 清楚所有样式的
         */
        clearAllStyle: function() {
            $opacity.val(100).trigger('input');
            $borderWidth.val(0).trigger('input');
            $borderRadius.val(0).trigger('input');
            $transform.val(0).trigger('input');
            $shadowSize.val(0).trigger('input');
            $shadowOffset.val(0).trigger('input');
            $borderType.val("solid");

            $background.val('rgb(255,255,255)');
            $borderColor.val('rgb(255,255,255)');
            $shadowColor.val('rgb(255,255,255)');
        }
    });


    bindEveryEvent(); //绑定各种事件
    interfaceContentChange(); // 绑定界面上实时变化的值

    /**
     * 对话框的拖拽，滑动条，颜色选择器，选择框的变化
     */
    function bindEveryEvent(){
        /*new Dnd({                          // 创建拖拽事件
            element: '#styleAnimation',
            handler: 'h5'
        });*/

        $dialog.find('h5').drag('options', {
            "handle": '.style-animation',
            "drag": '.style-animation'
        });

        $dialog.find('input').bind('click', function() {    //input点击时重新获取焦点
            this.focus();
        });
        $dialog.find('.percent-select i').rangefunc({});    // slider的事件绑定
        $dialog.find(".color-select").colorpicker()         // 颜色选择器的绑定
            .on('changeColor', function(ev) {
                $(this).css('background', ev.color.toString('rgb'));
                $(this).parent().find('.ipt').val(ev.color.toString('rgb')).trigger('input');
                return false;
            });
        $animateType.change(function() {
            if ($(this).val() == "" || $(this).val() == "none") {
                $dialog.find('.animate-panel').hide();
            } else {
                $dialog.find('.animate-panel').show();
            }
        });
    }

    /**
     * 样式和动画的对话框上，值实时变化事件
     */
    function interfaceContentChange() {
        // 输入框值变化时
        $dialog.on('input', function(e) {
            if (e.target.tagName.toLowerCase() === "input") {
                var $target = $(e.target);
                var type = $target.attr('data-type');
                // 除去输入框为颜色的
                if (type != "borderColor" && type != "background" && type != "shadowColor") {

                    var max = window.parseInt($target.attr('data-max'));
                    var value = window.parseInt($target.val());
                    // 当前输入值的最大最小值做限制
                    value >= max ? ($target.val(max), value=max): (value < 0 ? ($target.val(0), value=0) : "");
                    // 实时的改变滑动条
                    var $slide = $target.parent().find('i');
                    var percent = (value / max) * 100;
                    $slide.attr('data-value', percent).css('left', (percent*($slide.parent().width()-$slide.width())/100) + 'px');
                    // 当前输入框的类型进行对应的变化
                    switch (type) {
                        case "opacity":
                            $(element).css('opacity', value/100);
                            break;
                        case "borderWidth":
                            $(element).css('border-width', value+'px');
                            break;
                        case "borderRadius":
                            $(element).css('border-radius', value+'%').find('.element-box').css('border-radius', value+'%');
                            break;
                        case "transform":
                            $(element).css('transform', "rotateZ("+value+"deg)");
                            break;
                        case "shadowSize":
                            (new Css(element)).setShadow("size", value);
                            break;
                        case "shadowOffset":
                            (new Css(element)).setShadow("offset", value);
                            break;
                        case "animateTime":
                            $(element).css({'-webkit-animation-duration': value+'s','-moz-animation-duration':value+'s','animation-duration':value+'s'});
                            break;
                        case "animateDelay":
                            $(element).css({'-webkit-animation-delay':value+'s','-moz-animation-delay':value+'s','animation-delay':value+'s'});
                            break;
                        case "animateTimes":
                            $(element).css({'-webkit-animation-iteration-count':value+"",'-moz-animation-iteration-count': value+"",'animation-iteration-count':value+""});
                            break;
                    }
                } else {
                    value = $target.val();
                    // 对输入框的值进行限制的。
                    if (type == "borderColor") {
                        $(element).css('border-color', value);
                    } else if (type == "background") {
                        $(element).css('background', value);
                    } else if (type == "shadowColor") {
                        (new Css(element)).setShadow("color", value);
                    }
                }
            }
        })
            // 选择框值变化时
            .on('change', function(e) {
                // 类型
                var type = e.target.getAttribute('data-type');
                if (type == "borderType") {
                    $(element).css('border-style', $(e.target).val());
                } else if (type == "animateType") {
                    $(element).removeClass(animation).addClass($(e.target).val());
                    animation = $(e.target).val();
                    $(element).attr('data-animation', animation);
                }
            });
        // 循环播放框变化
        $animateInfinite.on('click', function() {
           if (animateInfinite) {
               animateInfinite = false;
               $(element).css('animation-iteration-count', $animateTimes.val());
           } else {
               animateInfinite = true;
               $(element).css('animation-iteration-count', 'infinite');
           }
        });
    }

    /**
     * 当前节点对象所对应的值内容
     * @param element node
     * @param type string "animation","style",""
     * @param opt object
     */
    var obj = function(element, type, opt) {
        var Default = {
            background: "rgb(255,0,0)",
            opacity: 100,
            borderWidth: 0,
            borderRadius: 0,
            borderType: "solid",
            borderColor: "rgb(0,0,0)",
            transform: 350,
            shadowSize: 0,
            shadowOffset: 0,
            shadowColor: "rgb(0,0,0)",
            animateType: "",
            animateTime: 2,
            animateDelay: 0,
            animateTimes: 2,
            animateInfinite: false
        };

        Default = $.extend({}, Default, opt);

        this.init(element, type, Default);
    };

    obj.prototype = {
        constructor: obj,
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
            if (!opt.animateType || opt.animateType == "none") {
                $animateType.val("");
                $dialog.find('.animate-panel').hide();
            } else {
                $animateType.find('option').each(function() {
                    if (this.getAttribute('value') == opt.animateType) {
                        $animateType.val(opt.animateType);
                    }
                });
                $dialog.find('.animate-panel').show();

                animation = opt.animateType;
            }
            // 边框类型
            $borderType.val(opt.borderType);
            // 循环播放
            opt.animateInfinite ? $animateInfinite.attr('checked', true) : $animateInfinite.attr('checked', false);
            animateInfinite = opt.animateInfinite;
        }
    };

    module.exports = obj;
});