/**
 * Created by weishuwen on 2015/1/28.
 */
define(function (require, exprots, module) {

    var $ = require("$");
    require('./resize.js');
    require('../../../js/lib/cmp/smartmenu');
    var Dnd = require('../../../js/lib/util/dom/dnd');
    var Context = require('./menu');

    var template = '<li class="comp-resize comp-rotate drag" title="按住鼠标进行拖动，点击鼠标进行编辑">\
                        <div class="element-box">\
                            <div class="element-box-contents">\
                                <img src="../css/image/dog.jpeg" alt=""/>\
                            </div>\
                        </div>\
                        <div class="bar bar-rotate bar-radius bar-touch" data-type="1"></div>\
                        <div class="bar bar-line"></div>\
                        <div class="bar bar-n bar-touch" data-type="2"></div>\
                        <div class="bar bar-s bar-touch" data-type="3"></div>\
                        <div class="bar bar-e bar-touch" data-type="4"></div>\
                        <div class="bar bar-w bar-touch" data-type="5"></div>\
                        <div class="bar bar-ne bar-radius bar-touch" data-type="6"></div>\
                        <div class="bar bar-nw bar-radius bar-touch" data-type="7"></div>\
                        <div class="bar bar-se bar-radius bar-touch" data-type="8"></div>\
                        <div class="bar bar-sw bar-radius bar-touch" data-type="9"></div>\
                        <!--line: 上：2，下：3，右：4，左：5  point：7 6 8 9-->\
                    </li>';

    var CompImg = function(opt) {

        var Default = {
            container: ".container", //
            id: "",  //图片的id
            width: 110, //图片的宽度
            height: 110, //图片的高度
            src: "",   //图片的地址
            top: 0,    //
            left: 0,    //
            dataId: null, //
            // style and animation 上的数据  也是默认的
            background: "rgb(255,0,0)",
            opacity: 100,
            borderWidth: 0,
            borderRadius: 0,
            borderType: 0,
            borderColor: "rgb(0,0,0)",
            transform: 0,
            shadowSize: 0,
            shadowOffset: 0,
            shadowColor: "rgb(0,0,0)",
            animateType: "",
            animateTime: 0,
            animateDelay: 0,
            animateTimes: 0,
            animateInfinite: false
        };
        Default = $.extend({}, Default, opt);
        this.init(Default);
    };

    CompImg.prototype = {
        init: function(opt) {
            this.id = opt.id;
            this.$ct = $(opt.container);
            this.$elemet = $(template);
            this.$elemet.attr('id', this.id);
            this.$ct.append(this.$elemet);
            // 样式初始化
            this.$elemet.css({
                width: opt.width+'px',
                height: opt.height+'px',
                top: opt.top + 'px',
                left: opt.left + 'px',
                transform: "rotateZ("+opt.transform+"deg)",
                background: opt.background,
                "border-style": opt.borderType || "solid",
                "border-radius": (opt.borderRadius || 0) + '%',
                "border-width:" : (opt.borderWidth || 0) + 'px',
                "zIndex": opt.zIndex,
                "box-shadow": opt.shadowSize + "px " + opt.shadowOffset + 'px ' + opt.shadowColor,
                "animation-duration": opt.animateTime + 's',
                "animation-delay": opt.animateDelay + 's',
                "animation-iteration-count": (opt.animateInfinite ? "infinite" : ""+opt.animateTimes)
                // 字符串的
                // "animation-iteration-count": "8"
            }).find('img').attr('src', opt.src);

            // 动画类型
            this.$elemet.attr('data-animation', opt.animateType).addClass('animated '+opt.animateType);

            // 内容
            this.$elemet.find('.element-box').css({"boder-radius": (opt.borderRadius || 0) + '%'});
            //
            if (opt.dataId) {
                this.$elemet.attr('data-id', opt.dataId);
            }

            this.bindElementEvent(opt.container);
            this.bindClickEvent();
        },
        bindElementEvent: function(ct) {
            this.$elemet.find('div.bar').bindResize({container: ct});

            new Dnd({
                element: ct + ' .drag',
                container: ct,
                except: ".bar",
                parentIsRelative: true
            });

            this.$elemet.smartMenu(Context.contextMenu, {name: this.id});
        },
        bindClickEvent: function() {
            this.$elemet.on('mousedown', function() {
                $(this).find('div.bar').show();
                $(this).siblings().find('div.bar').hide();
            });

        }
    };

    module.exports = CompImg;
});