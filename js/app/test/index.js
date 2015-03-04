/**
 * User: caolvchong@gmail.com
 * Date: 6/26/13
 * Time: 4:38 PM
 */
define(function(require, exports, module) {
    var $ = require('$');

    console.log($("#div").position());
    console.log($("#div").offset());
    console.log($("#div")[0].offsetTop + " " + $("#div")[0].offsetLeft);
    console.log("width:"+$("#div").width());


//    当存在rotate存在时,position()对象内容与原生不一样

    $("#div").css({"left": "200px", "top": "150px"})
    console.log($("#div").position());
    console.log($("#div").offset());
    console.log($("#div")[0].offsetTop + " " + $("#div")[0].offsetLeft);
    console.log("width:"+$("#div").width());

});