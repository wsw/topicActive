/**
 * Created by weishuwen on 2015/2/5.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var Action = require('../../lib/util/dom/action');
    var Dnd = require('../../../js/lib/util/dom/dnd');
    require('./range');
    require('./colorpicker');

    var $dialog = $("#styleAnimation");

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


    function bindEveryEvent(){
        new Dnd({                          // 创建拖拽事件
            element: '#styleAnimation',
            except: 'ul'
        });
        $dialog.find('input').bind('click', function() {    //input点击时重新获取焦点
            this.focus();
        });
        $dialog.find('.percent-select a').rangefunc({});    // slider的事件绑定
        $dialog.find(".color-select").colorpicker()         // 颜色选择器的绑定
            .on('changeColor', function(ev) {
                $(this).css('background', ev.color.toHex());
                $(this).parent().find('.ipt').val(ev.color.toHex());
            });
    }

    var obj = function(type, opt) {
        var Default = {
            background: "white",
            opacity: 1,
            borderWidth: 0,
            borderRadius: 0,
            borderType: 0,
            borderColor: "rgb(0,0,0,0)",
            transform: "none",
            shadowSize: 0,
            shadowOffset: 0,
            shadowColor: "white",
            animateType: 0,
            animateTime: 0,
            animateDelay: 0,
            animateTimes: 0,
            animateInfinite: false
        };
        Default = $.extend({}, Default, opt);
        this.init(type, Default);
    };

    obj.prototype = {
        init: function(type, opt) {
            this.showModuleByType(type);
            this.bindEveryEvent();
        },
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
        bindEveryEvent: function() {

        }
    };

    module.exports = obj;
});