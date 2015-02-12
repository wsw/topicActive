/**
 * Created by weishuwen on 2015/2/12.
 */
define(function(require, exports, module) {

    var $ = require('$');
    var Swiper = require('../../../js/lib/cmp/swiper');
    var Data = require('../design/data');
    var Css = require('../design/css');

    var template = '<div class="swiper-slide"><ul></ul></div>';

    var $container = $('#container');

    $.each(Data.item, function(index, value) {
        var node = $(template);
        if (value.scene && value.scene.image) {
            if (value.scene.image.imgSrc) {
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

    new Swiper('.swiper-container', {
        mode: 'vertical'
    });
});