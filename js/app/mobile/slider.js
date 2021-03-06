/**
 * Created by weishuwen on 2015/3/20.
 *
 *
 */

define(function(require, exports, module) {

    var $ = require('$');
    require('./transit'); // jquery css3动画插件

    var docHeight = $(document.body).height();
    var docWidth = $(document.body).width();
    var animateTime = 300;
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

    var cssObj = {};   // 当前激活的页面的css3样式
    var preCssObj = {};  // 当前激活页面被往前切换要得到css3样式
    var nextCssObj = {};
    var curPreCssObj = {}; // 当前激活页面被玩前切换过程的动画样式
    var curNextCssObj = {};
    var getMoveCssObj = function() {return {}};
    var getCurrCssObj = function() {return {}};

    /**
     *
     * @param options
     * options.container 元素列表
     * options.type
     *      type: 1 => 上下惯性翻页
     *      type: 2 => 上下翻页
     *      type: 3 => 左右翻页
     *      type: 4 => 左右惯性翻页
     *      type: 5 => 左右连续翻页
     */
    var Slider = function (options) {
        var attr = {
            container: "",
            type: 1,
            ratio: 1,
            delayed: 0
        };
        $.extend(attr, options);

        this._init(attr);
    };

    module.exports = Slider;

    Slider.prototype = {
        constructor: Slider,
        node: null,
        ratio: 1,  // initial-scale  大小
        delayed: 0,
        moving: false, // 判读是否正在动画
        size: 0,
        disY: 0,
        disX: 0,
        startX: 0,
        startY: 0,
        touchStart: false,
        index: 0,
        swipeType: "vertical",
        _init: function(attr) {
            this.node = $(attr.container);
            this.size = this.node.size();
            this.delayed = attr.delayed;

            setAllType(attr.type);

            docWidth = docWidth / attr.ratio;
            docHeight = docHeight / attr.ratio;

            this.swipeType = attr.type > 2 ? "horizontal" : "vertical";
            this._setTranslate();
            this.open();
        },
        _setTranslate: function() {
            if (this.swipeType === "vertical") {
                this.node.each(function(index) {
                    if (index === 0) {
                        this.style.transform = "translate3d(0,0,0)";
                    } else {
                        this.style.transform = "translate3d(0,100%,0)";
                    }
                });
            } else if (this.swipeType === "horizontal") {
                this.node.each(function(index) {
                    if (index === 0) {
                        this.style.transform = "translate3d(0,0,0)";
                    } else {
                        this.style.transform = "translate3d(100%,0,0)";
                    }
                });
            }
        },
        _handlerOriginEvent: function(e) {
            var _this = this;
            var pageX = e.pageX || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageX);
            var pageY = e.pageY || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageY);

            if (_this.moving) {
                return false;
            }
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

                        if (_this.swipeType === "vertical") {
                            if (_this.disY <= 0) {
                                _this._pageMove("up")
                            } else {
                                _this._pageMove("down");
                            }
                        } else if (_this.swipeType === "horizontal") {
                            if (_this.disX <= 0) {
                                _this._pageMove("left");
                            } else {
                                _this._pageMove("right");
                            }
                        }
                    }
                    break;
                case eventList.TOUCH_CANCEL:
                case eventList.TOUCH_END:
                case eventList.MOUSE_UP:
                    if (_this.swipeType === "vertical") {
                        if (_this.disY <= -30) {
                            _this._changePageNext();
                        } else if (_this.disY >= 30) {
                            _this._changePagePre();
                        } else {
                            _this._pageNotChange();
                        }
                    } else if (_this.swipeType === "horizontal") {
                        if (_this.disX <= -30) {
                            _this._changePageNext();
                        } else if (_this.disX >= 30) {
                            _this._changePagePre();
                        } else {
                            _this._pageNotChange();
                        }
                    }
                    _this.touchStart = false;
                    _this.disY = 0;
                    _this.disX = 0;
                    break;
            }
            return false;
        },
        open: function() {
            $(document).on(eventList.toString(), $.proxy(this._handlerOriginEvent, this));
        },
        close: function() {
            $(document).off(eventList.toString(), $.proxy(this._handlerOriginEvent, this));
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
        _changePageNext: function() {
            var _this = this;
            if (_this.index < this.size-1) {
                _this.moving = true;
                _this.node.eq(_this.index).transition(curPreCssObj, animateTime, 'linear');
                _this.node.eq(++_this.index).transition(cssObj, animateTime, 'linear', function() {
                    _this.node.eq(_this.index-1).css(preCssObj).hide();
                    if (_this.delayed > 0) {
                        setTimeout(function() {
                            _this.moving = false;
                        }, _this.delayed);
                    } else {
                        _this.moving = false;
                    }
                }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
            }
        },
        _changePagePre: function() {
            var _this = this;
            // 当前index必须在第二页的情况下
            if (_this.index > 0) {
                _this.moving = true;
                _this.node.eq(_this.index).transition(curNextCssObj, animateTime, 'linear');
                _this.node.eq(--_this.index).transition(cssObj, animateTime, 'linear', function() {
                    _this.node.eq(_this.index+1).css(nextCssObj).hide();
                    if (_this.delayed > 0) {
                        setTimeout(function() {
                            _this.moving = false;
                        }, _this.delayed);
                    } else {
                        _this.moving = false;
                    }
                }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
            }
        },
        _pageMove: function(type) {
            var _this = this;
            switch (type) {
                case "left":
                    if (_this.index < _this.size-1) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disX));
                        _this.node.eq(_this.index+1).show().css(getMoveCssObj(docWidth+_this.disX));
                    }
                    break;
                case "up":
                    if (_this.index < _this.size-1) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disY * _this.ratio));
                        _this.node.eq(_this.index+1).show().css(getMoveCssObj(docHeight+_this.disY * _this.ratio));
                    }
                    break;
                case "right":
                    if (_this.index > 0) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disX));
                        _this.node.eq(_this.index-1).show().css(getMoveCssObj(-docWidth+_this.disX));
                    }
                    break;
                case "down":
                    if (_this.index > 0) {
                        _this.node.eq(_this.index).css(getCurrCssObj(_this.disY * _this.ratio));
                        _this.node.eq(_this.index-1).show().css(getMoveCssObj(-docHeight+_this.disY * _this.ratio));
                    }
                    break;
                default :
                    break;
            }
        }
    };

    function setAllType(type) {
        // 根据不同类型设置动画样式
        switch (window.parseInt(type)) {
            case 1 :  // 上下惯性翻页
                type_1_css();
                break;
            case 2 :  // 上下翻页
                type_2_css();
                break;
            case 3 :  //左右翻页
                type_3_css();
                break;
            case 4 : // 左右惯性翻页
                type_4_css();
                break;
            case 5 :
                type_5_css();
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
        curPreCssObj = curNextCssObj = {
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
        curPreCssObj = curNextCssObj = {

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

    function type_3_css() {
        preCssObj = {
            "transform": 'translate3d(-100%,0,0)',
            "z-index": zIndex-1
        };
        nextCssObj = {
            "transform": 'translate3d(100%,0,0)',
            "z-index": zIndex-1
        };
        curPreCssObj = curNextCssObj = {

        };
        cssObj = {
            'transform': 'translate3d(0,0,0)'
        };
        getMoveCssObj = function (x) {
            return {
                'transform': 'translate3d('+x+'px,0,0)',
                'zIndex': zIndex
            };
        };
        getCurrCssObj = function(x) {
            return {};
        }
    }

    function type_4_css() {
        preCssObj = {
            "transform": 'translate3d(-100%, 0,0) scale3d(1,1,1)',
            "z-index": zIndex-1
        };
        nextCssObj = {
            "transform": 'translate3d(100%, 0,0) scale3d(1,1,1)',
            "z-index": zIndex-1
        };
        curPreCssObj = curNextCssObj = {
            'transform': 'scale3d(0, 0, 1)'
        };
        cssObj = {
            'transform': 'translate3d(0,0,0) scale3d(1,1,1)'
        };
        getMoveCssObj = function (x) {
            return {
                'transform': 'translate3d('+x+'px,0,0)',
                'zIndex': zIndex
            };
        };
        getCurrCssObj = function(x) {
            var scale = 1;
            if (x <= 0) {
                scale = 1 + x/docWidth;
                return {
                    'transform': 'scale3d('+scale+', '+scale+', 1)',
                    'transform-origin': "left center"
                }
            } else {
                scale = 1 - x/docWidth;
                return {
                    'transform': 'scale3d('+scale+', '+scale+', 1)',
                    'transform-origin': "right center"
                }
            }
        }
    }
    function type_5_css() {
        preCssObj = {
            "transform": 'translate3d(-100%, 0,0)',
            "z-index": zIndex-1
        };
        nextCssObj = {
            "transform": 'translate3d(100%, 0,0)',
            "z-index": zIndex-1
        };
        curPreCssObj = {
            'transform': 'translate3d(-100%, 0, 0)'
        };
        curNextCssObj = {
            'transform': 'translate3d(100%, 0, 0)'
        };
        cssObj = {
            'transform': 'translate3d(0,0,0)'
        };
        getMoveCssObj = function (x) {
            return {
                'transform': 'translate3d('+x+'px,0,0)',
                'zIndex': zIndex
            };
        };
        getCurrCssObj = function(x) {
            return {
                'transform': 'translate3d('+x+'px, 0, 0)'
            }
        }
    }
});