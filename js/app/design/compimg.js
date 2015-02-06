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
            transform: "none",
            dataId: null //
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

            this.$elemet.css({width: opt.width+'px', height: opt.height+'px',
            top: opt.top, left: opt.left, transform: opt.transform})
                .find('img').attr('src', opt.src);

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

            //this.$elemet.smartMenu(Context.contextMenu, {name: this.id});
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