/**
 * Created by weishuwen on 2015/3/9.
 */

define(function(require, exports, module) {

    var count = 1;

    function add() {
        count++;
        console.log(count);
    }

    exports.add = add;

});