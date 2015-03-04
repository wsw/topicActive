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

        var x0 = 0;
        var y0 = 0;

        var ratio = 0;

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

            ratio = height/width;

            /*px = $pel.offset().left;
            py = $pel.offset().top;*/

            px = ctX + $pel[0].offsetLeft;
            py = ctY + $pel[0].offsetTop;

            x0 = px + width/2;
            y0 = py + height/2;

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

            var minWidth = 50;   //最小的宽度
            var minHeight = 30;   //最新的高度
            var mx = e.clientX;
            var my = e.clientY;   //当前移动点的 x y 坐标

            var newWidth = 0;    // 新的宽度
            var newHeight =0;    // 新的高度

            var pl;  // 移动时刻的 left
            var pt;  // 移动时刻的 top

            switch (type) {
                case "1" :
                    var angle = 0;

                    if (my-y0 < 0) {
                        angle = Math.atan((mx-x0)/(y0-my))*180/Math.PI;
                    } else if (mx-x0 > 0){
                        angle = Math.atan((my-y0)/(mx-x0))*180/Math.PI + 90;
                    } else {
                        angle = Math.atan((x0-mx)/(my-y0))*180/Math.PI + 180;
                    }

                    //console.log(angle);
                    $pel.css({transform: "rotateZ("+(angle)+"deg)"});

                    break;
                case "2" :
                    newHeight = height - my + y;

                    pt = py + (my - y);

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

                    pl = px + (mx - x);

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
                    pt = py + (my - y);
                    (pt < ctY) ? (newHeight = py + height - ctY, pt = ctY) : "";
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    if (e.ctrlKey) {
                        newHeight = ratio * newWidth;
                        newWidth = newHeight / ratio;
                        pt = py - newHeight + height;
                    }

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    $pel.css({top: (pt-ctY)+'px'});
                    break;
                case "7" :   // 左上角圆点事件
                    newWidth = width - mx + x;  // 新的宽度为：本身的宽度+本身最初左上角x点坐标-当前移动到x点坐标
                    newHeight = height - my + y;  // 新的高度为：本身的高度+本身最初左上角y点坐标-当前移动到y点坐标

                    /*pl = mx;   // 当前div的left即为当前移动的x点坐标
                    pt = my;   // 当前div的top即为当前移动的y点坐标*/
                    /*修正当有旋转值是已上方法是不行的*/
                    pl = px + (mx - x);
                    pt = py + (my - y);

                    // 当前div的left 超出当前容器左上角x点坐标时， 当前div的left就设为容器左上角的x点坐标，
                    // 新的宽度就为：本身的宽度+本身最初左上角x点坐标-容器左上角x点坐标
                    (pl < ctX) ? (newWidth = px + width - ctX, pl = ctX) : "";
                    // 当前div的top 超出当前容器左上角y点坐标时， 当前div的top就设为容器左上角的y点坐标，
                    // 新的宽度就为：本身的宽度+本身最初左上角x点坐标-容器左上角y点坐标
                    (pt < ctY) ? (newHeight = py + height - ctY, pt = ctY) : "";

                    // 若新的宽度小于最小的宽度时，设新的宽度为最小的宽度，div的left固定不变，即为本身最初左上角x点坐标+固定变化的宽度
                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";

                    if (e.ctrlKey) {
                        newHeight = ratio * newWidth;
                        newWidth = newHeight / ratio;
                        pt = py - newHeight + height;
                        pl = px - newWidth + width;
                    }

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

                    if (e.ctrlKey) {
                        newHeight = ratio * newWidth;
                    }

                    $pel.width(newWidth);
                    $pel.height(newHeight);
                    break;
                case "9" :
                    newWidth = width - mx + x;
                    pl = px + (mx - x);
                    (pl < ctX) ? (newWidth = px + width - ctX, pl = ctX) : "";
                    (newWidth < minWidth) ? (newWidth = minWidth, pl = px - newWidth + width) : "";

                    newHeight = height + my - y;
                    (newHeight < minHeight) ? (newHeight = minHeight, pt = py - newHeight + height) : "";
                    (newHeight + py > ctYY) ? (newHeight = ctYY - py) : "";

                    if (e.ctrlKey) {
                        newHeight = ratio * newWidth;
                    }

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
