/**
 * Created by weishuwen on 2015/3/6.
 */

define(function(require, exports, module) {

    var $ = require('$');
    require('./transit'); // jquery css3动画插件

    var touchStart = false;  //触摸开始
    var moving = false;  // 页面是否正在动画
    var container = null;
    var index = 0; //当前显示页面索引
    var size = 0; // 页面的数量
    var docHeight = $(document.body).height();  //
    var distanceY = 0, distanceX = 0;  // 滑动的距离
    var startX = 0, startY = 0;
    var zIndex = 10;

    var Slider = function(ct) {
        this.open(ct);
    };

    module.exports = Slider;

    Slider.prototype.open = function(ct) {
        container = $(ct);
        size = container.size();
        $(document).on(eventList.toString(), handlerOriginEvent);
    };

    Slider.prototype.off = function() {
        $(document).off(eventList.toString(), handlerOriginEvent);
    };

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

    var preCssObj = {
        "transform": 'translate3d(0,-100%,0)',
        "z-index": zIndex-1
    };
    var nextCssObj = {
        "transform": 'translate3d(0,100%,0)',
        "z-index": zIndex-1
    };
    var curCssObj = {
        'transform': 'translate3d(0,0,0)'
    };

    function getMoveCssObj(y) {
        return {
            'transform': 'translate3d(0,'+y+'px,0)',
            'zIndex': zIndex
        };
    }

    function handlerOriginEvent(e) {
        var pageX = e.pageX || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageX);
        var pageY = e.pageY || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageY);

        if (moving) {
            return false;
        }
        switch (e.type) {
            case eventList.TOUCH_START:
            case eventList.MOUSE_DOWN:
                // 记录当前点下去的那个点
                startX = pageX;
                startY = pageY;

                touchStart = true;
                break;
            case eventList.TOUCH_MOVE:
            case eventList.MOUSE_MOVE:
                if (touchStart) {
                    var moveX = pageX;
                    var moveY = pageY;

                    distanceX = moveX - startX;
                    distanceY = moveY - startY;

                    if (distanceY <= 0) {
                        pageMove("up", distanceY)
                    } else {
                        pageMove("down", distanceY);
                    }
                }
                break;
            case eventList.TOUCH_END:
            case eventList.MOUSE_UP:
                if (distanceY <= -30) {
                    chagePageNext();
                } else if (distanceY >= 30) {
                    chagePagePre();
                } else {
                    pageNotChange();
                }
                touchStart = false;
                distanceY = 0;
                break;
        }
        return false;
    }

    /**
     *  页面没有切换
     */
    function pageNotChange() {
        if (index > 0 && index < size-1) {
            container.eq(index-1).css(preCssObj);
            container.eq(index+1).css(nextCssObj);
        } else if (index == 0) {
            container.eq(index+1).css(preCssObj);
        } else if (index == size-1) {
            container.eq(index-1).css(nextCssObj);
        }
    }
    /**
     * 切换下一张页面
     */
    function chagePageNext() {
        if (index < size-1) {
            moving = true;
            container.eq(++index).transition(curCssObj, 300, 'linear', function() {
                container.eq(index-1).css(preCssObj).hide();
                setTimeout(function() {
                    moving = false;
                }, 500);
            }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
        }
    }

    /**
     * 切换前一张页面
     */
    function chagePagePre() {
        // 当前index必须在第二页的情况下
        if (index > 0) {
            moving = true;
            container.eq(--index).transition(curCssObj, 300, 'linear', function() {
                container.eq(index+1).css(nextCssObj).hide();
                setTimeout(function() {
                    moving = false;
                }, 500);
            }).show().css('z-index', zIndex-1).siblings().css('z-index', 0);
        }
    }

    /**
     * 页面移动状态
     * @param type string "up","down"
     * @param disY
     */
    function pageMove(type, disY) {
        switch (type) {
            case "up":
                if (index < size-1) {
                    container.eq(index+1).show().css(getMoveCssObj(docHeight+disY));
                }
                break;
            case "down":
                if (index > 0) {
                    container.eq(index-1).show().css(getMoveCssObj(-docHeight+disY));
                }
                break;
            default :
                break;
        }
    }

});