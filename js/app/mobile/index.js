/**
 * Created by weishuwen on 2015/2/12.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var Data = require('./data');
    var Css = require('../design/css');
    var Slider = require('./slider');
    var Load = require('./loading');
    require('../../../css/loading.css');

    var scale = document.body.clientWidth/320;

    // 根据屏幕宽度动态设置viewport， 其中width固定320，initialscale按比例进行设置
    document.getElementById('viewport').content = "width=320,initial-scale="+scale+",user-scalable=no";

    var load = new Load({
        opacity: 1,
        z_index: 999999,
        styleEdition: 3
    });

    window.onload = function() {
        load.end();
    };

    var template = '<div class="swiper-slide"><ul></ul></div>';

    var $container = $('#container');

    $.each(Data.item, function(index, value) {
        var node = $(template);
        if (value.scene && value.scene.image) {
            if (value.scene.image.imgSrc && value.scene.image.imgSrc != "none") {
                node.css('background', "url("+value.scene.image.imgSrc+")");
            } else {
                node.css('background', value.scene.image.background);
            }
            $.each(value.elements, function(index, value) {
                var li = document.createElement('li');
                var img = $('<img alt="" src="'+value.content+'">');
                (new Css(li)).setAllStyle(value.css);
                li.appendChild(img[0]);
                li.className += " animated "+value.css.animateType;
                node.find('ul').append(li);
            });
            $container.append(node);
        }
    });

    /*音乐部分*/

    var audio = $("#media")[0];

    $("#music").bind('touchstart', function() {
        if ($(this).hasClass('on')) {
            audio.pause();
            $(this).removeClass('on');
        } else {
            audio.play();
            $(this).addClass('on');
        }
    });

    $(document).on('touchstart', function() {
        //audio.play();
    });


    var swipeType = 4;

    /**
     * type number 滑动类型目前有5种
     * ratio number initial-scale
     * delayed number 滑动每帧间隔延时
     * @type {Slider}
     */
    var slider = new Slider({
        container: "#container .swiper-slide",
        type: swipeType,
        ratio: scale,
        delayed: 1000
    });

    if (swipeType > 2) {
        $(".arrow").addClass('horizontal');
    } else {
        $(".arrow").addClass('vertical');
    }

    /*setTimeout(function() {
       slider.close();
    }, 5000)*/
});