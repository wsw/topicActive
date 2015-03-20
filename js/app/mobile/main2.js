/**
 * Created by weishuwen on 2015/3/20.
 */

define(function(require, exports, module) {

    var $ = require('$');
    require('./transit'); // jquery css3动画插件

    var docHeight = $(document.body).height();
    var docWidth = $(document.body).width();
    var zIndex = 10;

    var eventList = {
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        TOUCH_CANCEL: 'touchcancel',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup',
        toString: function() {
            var str = [];
            for (var name in this) {
                if (this.hasOwnProperty(name) && name != "toString") {
                    str.push(this[name]);
                }
            }
            return str.join(" ");
        }
    };

    var cssObj = {};
    var preCssObj = {};
    var nextCssObj = {};
    var curCssObj = {};
    var getMoveCssObj = null;
    var getCurrCssObj = null;

    function setAllType(type) {
        // 根据不同类型设置动画样式
        switch (window.parseInt(type)) {
            case 1 :  // 上下惯性翻页
                type_1_css();
                break;
            case 2 :  // 上下翻页
                type_2_css();
                break;
            case 3 :
                break;
            default :
                break;
        }
    }

    function type_1_css() {
        preCssObj = {
            "transform": 'translate3d(0,-100%,0) scale3d(1,1,1)',
            "z-index": zIndex-1
        };
        nextCssObj = {
            "transform": 'translate3d(0,100%,0) scale3d(1,1,1)',
            "z-index": zIndex-1
        };
        curCssObj = {
            'transform': 'scale3d(0, 0, 1)'
        };
        cssObj = {
            'transform': 'translate3d(0,0,0) scale3d(1,1,1)'
        };
        getMoveCssObj = function (y) {
            return {
                'transform': 'translate3d(0,'+y+'px,0)',
                'zIndex': zIndex
            };
        };
        getCurrCssObj = function(y) {
            var scale = 1;
            if (y <= 0) {
                scale = 1 + y/docHeight;
                return {
                    'transform': 'scale3d('+scale+', '+scale+', 1)',
                    'transform-origin': "center top"
                }
            } else {
                scale = 1 - y/docHeight;
                return {
                    'transform': 'scale3d('+scale+', '+scale+', 1)',
                    'transform-origin': "center bottom"
                }
            }
        }
    }

    function type_2_css() {
        preCssObj = {
            "transform": 'translate3d(0,-100%,0)',
            "z-index": zIndex-1
        };
        nextCssObj = {
            "transform": 'translate3d(0,100%,0)',
            "z-index": zIndex-1
        };
        curCssObj = {

        };
        cssObj = {
            'transform': 'translate3d(0,0,0)'
        };
        getMoveCssObj = function (y) {
            return {
                'transform': 'translate3d(0,'+y+'px,0)',
                'zIndex': zIndex
            };
        };
        getCurrCssObj = function(y) {

            return {};
        }
    }


    var Slider = function (options) {
        var attr = {
            container: ""
        };
        $.extend(attr, options);
        this._init(attr);
    };

    module.exports = Slider;

    Slider.prototype = {
        constructor: Slider,
        node: null,
        size: 0,
        disY: 0,
        disX: 0,
        startX: 0,
        startY: 0,
        touchStart: false,
        index: 0,
        _init: function(attr) {
            this.node = $(attr.container);
            this.size = this.node.size();

            setAllType(attr.type);

            this.open();
        },
        _handlerOriginEvent: function(e) {
            var _this = this;
            var pageX = e.pageX || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageX);
            var pageY = e.pageY || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageY);

            /*if (moving) {
                return false;
            }*/
            switch (e.type) {
                case eventList.TOUCH_START:
                case eventList.MOUSE_DOWN:
                    // 记录当前点下去的那个点
                    _this.startX = pageX;
                    _this.startY = pageY;

                    _this.touchStart = true;
                    break;
                case eventList.TOUCH_MOVE:
                case eventList.MOUSE_MOVE:
                    if (_this.touchStart) {
                        var moveX = pageX;
                        var moveY = pageY;

                        _this.disX = moveX - _this.startX;
                        _this.disY = moveY - _this.startY;

                        if (_this.disY <= 0) {
                            _this._pageMove("up")
                        } else {
                            _this._pageMove("down");
                        }
                    }
                    break;
                case eventList.TOUCH_END:
                case eventList.MOUSE_UP:
                    if (_this.disY <= -30) {
                        _this._chagePageNext();
                    } else if (_this.disY >= 30) {
                        _this._chagePagePre();
                    } else {
                        _this._pageNotChange();
                    }
                    _this.touchStart = false;
                    _this.disY = 0;
                    break;
            }
            return false;
        },
        open: function() {
            $(document).on(eventList.toString(), this._handlerOriginEvent.bind(this));
        },
        close: function() {
            $(document).off(eventList.toString(), this._handlerOriginEvent.bind(this));
        },
        _pageNotChange: function() {
            var _this = this;
            _this.node.eq(_this.index).css(cssObj);
            if (_this.index > 0 && _this.index < _this.size - 1) {
                _this.node.eq(_this.index-1).css(preCssObj);
                _this.node.eq(_this.index+1).css(nextCssObj);
            } else if (_this.index == 0) {
                _this.node.eq(_this.index+1).css(preCssObj);
            } else if (_this.index == _this.size-1) {
                _this.node.eq(_this.index-1).css(nextCssObj);
            }
        },
        _chagePageNext: function() {
            var _this = this;
            if (_this.index < this.size-1) {
                _this.node.eq(_this.index).transition(curCssObj, 250, 'linear');
                _this.node.eq(++_this.index).transition(cssObj, 300, 'linear', function() {
                    _this.node.eq(_this.index-1).css(preCssObj).hide();
                }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
            }
        },
        _chagePagePre: function() {
            var _this = this;
            // 当前index必须在第二页的情况下
            if (_this.index > 0) {
                _this.node.eq(_this.index).transition(curCssObj, 250, 'linear');
                _this.node.eq(--_this.index).transition(cssObj, 300, 'linear', function() {
                    _this.node.eq(_this.index+1).css(nextCssObj).hide();
                }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
            }
        },
        _pageMove: function(type) {
            var _this = this;
            switch (type) {
                case "up":
                    if (_this.index < _this.size-1) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disY));
                        _this.node.eq(_this.index+1).show().css(getMoveCssObj(docHeight+_this.disY));
                    }
                    break;
                case "down":
                    if (_this.index > 0) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disY));
                        _this.node.eq(_this.index-1).show().css(getMoveCssObj(-docHeight+_this.disY));
                    }
                    break;
                default :
                    break;
            }
        }
    };

});