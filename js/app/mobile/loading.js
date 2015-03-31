/**
 * Created by weishuwen on 2015/3/31.
 */
define(function(require, exports, module) {
    var $ = require('$');

    /**
     * 默认几个值
     * @type {{opacity: string, z_index: string, styleEdition: number, onbefore: onbefore}}
     */
    var defaults = {
        opacity: '0.7',
        z_index: '999999',
        styleEdition: 5,
        onbefore: function () { }
    };

    var load = function(opts) {
        this.$load = null;
        opts = $.extend({}, defaults, opts);
        this.init(opts);
    };
    load.prototype = {
        constructor: load,
        init: function (opts) {
            this.$load = $('<div id="load" class="load">' + this.setStyleEdition(opts.styleEdition) + '</div>');
            $('body').append(this.$load);
            this.setOpacity(opts.opacity);
            this.setZ_index(opts.z_index);
            opts.onbefore();
        },
        setOpacity: function(opacity){
            this.$load.css({'background-color':'rgba(0,0,0,'+ opacity +')'});
        },
        setZ_index: function(o){
            this.$load.css({'z-index': o});
        },
        setStyleEdition: function(styleEdition){
            var loadDom = '';
            switch (styleEdition){
                case 1:
                    loadDom =
                        '\
                            <div class="load1">\
                                <div class="rect1"></div>\
                                <div class="rect2"></div>\
                                <div class="rect3"></div>\
                                <div class="rect4"></div>\
                                <div class="rect5"></div>\
                            </div>\
                        ';
                    break;
                case 2:
                    loadDom =
                        '\
                            <div class="load2"></div>\
                        ';
                    break;
                case 3:
                    loadDom =
                        '\
                            <div class="load3">\
                              <div class="double-bounce1"></div>\
                              <div class="double-bounce2"></div>\
                            </div>\
                        ';
                    break;
                case 4:
                    loadDom =
                        '\
                            <div class="load4">\
                                <div class="cube1"></div>\
                                <div class="cube2"></div>\
                            </div>\
                        ';
                    break;
                case 5:
                    loadDom =
                        '\
                            <div class="load5">\
                                <div class="dot1"></div>\
                                <div class="dot2"></div>\
                            </div>\
                        ';
                    break;
                case 6:
                    loadDom =
                        '\
                            <div class="load6">\
                                <div class="bounce1"></div>\
                                <div class="bounce2"></div>\
                                <div class="bounce3"></div>\
                            </div>\
                        ';
                    break;
                case 7:
                    loadDom =
                        '\
                            <div class="load7"></div>\
                        ';
                    break;
                case 8:
                    loadDom =
                        '\
                            <div class="load8">\
                                <div class="load8-container container1">\
                                    <div class="circle1"></div>\
                                    <div class="circle2"></div>\
                                    <div class="circle3"></div>\
                                    <div class="circle4"></div>\
                                </div>\
                                <div class="load8-container container2">\
                                    <div class="circle1"></div>\
                                    <div class="circle2"></div>\
                                    <div class="circle3"></div>\
                                    <div class="circle4"></div>\
                                </div>\
                                <div class="load8-container container3">\
                                    <div class="circle1"></div>\
                                    <div class="circle2"></div>\
                                    <div class="circle3"></div>\
                                    <div class="circle4"></div>\
                                </div>\
                            </div>\
                        ';
                    break;
                default:
                    loadDom =
                        '\
                            <div class="load5">\
                                <div class="dot1"></div>\
                                <div class="dot2"></div>\
                            </div>\
                        ';
                    break;
            }
            return loadDom;
        },
        end: function() {
            var _this = this;
            _this.$load.animate({
                top:'-100%', opacity: 0
            }, 500, 'linear', function() {
                _this.$load.remove();
            });
        }
    };

    module.exports = load;
});
