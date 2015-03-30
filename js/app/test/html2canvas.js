/**
 * Created by weishuwen on 2015/3/25.
 */
define(function(require, exports, module) {
    require('../../lib/cmp/html2canvas/html2canvas');

    html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
    });

    console.log(html2canvas)
});