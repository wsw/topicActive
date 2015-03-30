/**
 * Created by weishuwen on 2015/3/25.
 */

define(function(require, exports, module) {
    require('../../lib/cmp/html2canvas/html2canvas');

    /**
     *
     * @param callback
     */
    function saveImageDataURL(callback) {
        html2canvas(document.getElementById('design')).then(function(canvas) {
            callback && callback(canvas.toDataURL("image/png"));
        });
    }

    exports.save = saveImageDataURL;

});