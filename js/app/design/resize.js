/**
 * Created by weishuwen on 2015/1/28.
 */

define(function(require, exports, module) {

    var $ = require('$');

    function bindResize(el, opt){
        //初始化参数,改变的是 parent 对象的
        var $pel = $(el.parentNode);
        //鼠标按下时的X和Y轴坐标
        var x = 0, y = 0;
        // position
        var px = 0, py = 0;
        // 宽高
        var width = 0, height = 0;
        // type
        var type = el.getAttribute('data-type');
        //container
        var $ct = $(opt.container);

        var ctX = 0;
        var ctY = 0;
        var ctXX = 0;
        var ctYY = 0;


        $(el).bind('mousedown', function(e){

            ctX = $ct.offset().left;
            ctY = $ct.offset().top;
            ctXX = ctX +$ct.width();
            ctYY = ctY + $ct.height();

            //按下元素后，当前的坐标
            x = e.clientX;
            y = e.clientY;

            width = $pel.width();
            height = $pel.height();

            px = $pel.offset().left;
            py = $pel.offset().top;

            //在支持 setCapture 做些东东
            el.setCapture ? (
                //捕捉焦点
                el.setCapture(),
                    //设置事件
                    el.onmousemove = function(ev){
                        mouseMove(ev || event)
                    },
                    el.onmouseup = mouseUp
                ) : (
                //绑定事件
                $(document).bind("mousemove",mouseMove).bind("mouseup",mouseUp)
                );
            //防止默认事件发生
            e.preventDefault();
        });
        //移动事件
        function mouseMove(e){
            //运算中...
            //line: 上：2，下：3，右：4，左：5  point：7 6 8 9

            var minWidth = 40;   //最小的宽度
            var minHeight = 20;   //最新的高度
            var mx = e.clientX;
            var my = e.clientY;   //当前移动点的 x y 坐标

            var newWidth = 0;    // 新的宽度
            var newHeight =0;    // 新的高度

            var pl;  // 移动时刻的 left
            var pt;  // 移动时刻的 top

            switch (type) {
                case "1" :

                    var arcX = mx - x;
                    var arcY = my - y;
                    var arc = 0;

                    var rotate = $pel.rotationDegrees();

                    if (arcY >= 0 && arcX >= 0) {  // 偏移量都是为正的
                        arc = Math.atan(arcY/arcX) * 180 / Math.PI;
                    } else if (arcX < 0 && arcY > 0) {
                        arc = Math.atan(-arcX/arcY) * 180 / Math.PI;
                    } else if (arcX < 0 && arcY < 0) {
                        arc = Math.atan(arcY/arcX) * 180 / Math.PI;
                    } else if (arcX >= 0 && arcY < 0) {
                        arc = Math.atan(-arcX/arcY) * 180 / Math.PI;
                    }

                    arc /= 30;
                    arc = arc % 90;
                    rotate = rotate % 270;

                    $pel.css({transform: "rotateZ("+(arc+rotate)+"deg)"});

                    break;
                case "2" :
                    newHeight = height - my + y;

                    pt = my;

                    (pt < ctY) ? (newHeight = py + height - ctY, pt = ctY) : "";

                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    $pel.height(newHeight);
                    $pel.css({top: (pt-ctY)+'px'});
                    break;
                case "3" :
                    newHeight = height + my - y;

                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    (newHeight + py > ctYY) ? (newHeight = ctYY - py) : "";

                    $pel.height(newHeight);
                    break;
                case "4" :
                    newWidth = width + mx - x;

                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";

                    (newWidth + px > ctXX) ? (newWidth = ctXX - px) : "";

                    $pel.width(newWidth);
                    break;
                case "5" :
                    newWidth = width - mx + x;

                    pl = mx;

                    (pl < ctX) ? (newWidth = px + width - ctX, pl = ctX) : "";

                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";

                    $pel.width(newWidth);
                    $pel.css({left: (pl-ctX)+'px'});
                    break;
                case "6" :
                    newWidth = width + mx - x;
                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";
                    (newWidth + px > ctXX) ? (newWidth = ctXX - px) : "";

                    newHeight = height - my + y;
                    pt = my;
                    (pt < ctY) ? (newHeight = py + height - ctY, pt = ctY) : "";
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    $pel.css({top: (pt-ctY)+'px'});
                    break;
                case "7" :   // 左上角圆点事件
                    newWidth = width - mx + x;  // 新的宽度为：本身的宽度+本身最初左上角x点坐标-当前移动到x点坐标
                    newHeight = height - my + y;  // 新的高度为：本身的高度+本身最初左上角y点坐标-当前移动到y点坐标

                    pl = mx;   // 当前div的left即为当前移动的x点坐标
                    pt = my;   // 当前div的top即为当前移动的y点坐标

                    // 当前div的left 超出当前容器左上角x点坐标时， 当前div的left就设为容器左上角的x点坐标，
                    // 新的宽度就为：本身的宽度+本身最初左上角x点坐标-容器左上角x点坐标
                    (pl < ctX) ? (newWidth = px + width - ctX, pl = ctX) : "";
                    // 当前div的top 超出当前容器左上角y点坐标时， 当前div的top就设为容器左上角的y点坐标，
                    // 新的宽度就为：本身的宽度+本身最初左上角x点坐标-容器左上角y点坐标
                    (pt < ctY) ? (newHeight = py + height - ctY, pt = ctY) : "";

                    // 若新的宽度小于最小的宽度时，设新的宽度为最小的宽度，div的left固定不变，即为本身最初左上角x点坐标+固定变化的宽度
                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    $pel.css({left: (pl-ctX)+'px', top: (pt-ctY)+'px'});
                    break;
                case "8" : // 右下角圆点事件
                    newWidth = width + mx - x;  // 新的宽度为：本身的宽度+移动点与最初点的变化宽度
                    newHeight = height + my - y;

                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    (newWidth + px > ctXX) ? (newWidth = ctXX - px) : "";
                    (newHeight + py > ctYY) ? (newHeight = ctYY - py) : "";

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    break;
                case "9" :
                    newWidth = width - mx + x;
                    pl = mx;
                    (pl < ctX) ? (newWidth = px + width - ctX, pl = ctX) : "";
                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";

                    newHeight = height + my - y;
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";
                    (newHeight + py > ctYY) ? (newHeight = ctYY - py) : "";

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    $pel.css({left: (pl-ctX)+'px'});
                    break;
            }
        }
        //停止事件
        function mouseUp(){
            //在支持 releaseCapture 做些东东
            el.releaseCapture ? (
                //释放焦点
                el.releaseCapture(),
                    //移除事件
                    el.onmousemove = el.onmouseup = null
                ) : (
                //卸载事件
                $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
                )
        }
    }

    $.fn.bindResize = function(opt) {

        var def = {
            container: ".container"
        };

        def = $.extend({}, def, opt);

        $(this).each(function() {
            bindResize(this, def);
        });
    };

    $.fn.rotationDegrees = function () {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform") ||
            this.css("-ms-transform")  ||
            this.css("-o-transform")  ||
            this.css("transform");
        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return angle;
    };
});
