/**
 * Created by weishuwen on 2015/3/6.
 */

define(function(require, exports, module) {

    var $ = require('$');
    require('./transit');

    var startX = 0,
        startY = 0;

    var touchStart = false;

    var eventList = {
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        TOUCH_CANCEL: 'touchcancel',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup',
//        CLICK: 'click',
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

    var container = $("#container .swiper-slide");
    var index = 0;
    var size = container.size();
    var docHeight = $(document.body).height();
    var distanceY = 0, distanceX = 0;

    var zIndex = 10;

    console.log(index + " " + size + " " + docHeight);


    function handlerOriginEvent(e) {
        var target = e.target;
        var pageX = e.pageX || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageX);
        var pageY = e.pageY || (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length > 0 && e.originalEvent.targetTouches[0].pageY);



        switch (e.type) {
            case eventList.TOUCH_START:
            case eventList.MOUSE_DOWN:
                // 记录当前点下去的那个点
                startX = pageX;
                startY = pageY;

                touchStart = true;

                console.log("startX:" + startX + ",startY:"+startY);

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

                    //console.log("moveX:"+ moveX + ",moveY:"+moveY);
                }


                break;
            case eventList.TOUCH_END:
            case eventList.MOUSE_UP:

                if (distanceY <= -20) {
                    chagePageNext();
                } else if (distanceY > 20) {
                    chagePagePre();
                }

                touchStart = false;
                break;

        }
    }

    $(function() {
        $(document).on(eventList.toString(), handlerOriginEvent);
    });

    function chagePageNext() {
        if (++index >=size) {
            index -=1;
            return ;
        }
        container.eq(index).transition({
            //'-webkit-transform': 'translateY(0)',
            'transform': 'translateY(0)'
        }, 500, 'linear', function() {
            container.eq(index-1).css({
                //'-webkit-transform': 'translateY(-100%)',
                'transform': 'translateY(-100%)'
            }).hide();
        }).css('zIndex', zIndex-1).siblings().css('zIndex', 0);
    }

    function chagePagePre() {

        if (--index < 0) {
            index += 1;
            return ;
        }
        container.eq(index).transition({
            //'-webkit-transform': 'translateY(0)',
            'transform': 'translateY(0)'
        }, 500, 'linear', function() {
            container.eq(index+1).css({
                //'-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            }).hide();
        }).css('z-index', zIndex-1).siblings().css('zIndex', 0);
    }

    function pageMove(type, disY) {

        console.log(index);

        switch (type) {
            case "up":
                if (index +1 >= size) {
                    return ;
                }
                container.eq(index+1).show().css({
                    //'-webkit-transform': 'translateY('+(docHeight+disY)+'px);',
                    'transform': 'translateY('+(docHeight+disY)+'px);',
                    'zIndex': zIndex
                });
                break;
            case "down":
                if (index-1 < 0) {
                    return;
                }
                container.eq(index-1).show().css({
                    //'-webkit-transform': 'translateY('+(-docHeight+disY)+'px);',
                    'transform': 'translateY('+(-docHeight+disY)+'px);',
                    'zIndex': zIndex
                });
                break;
        }
    }

});