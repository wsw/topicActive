/**
 * Created by weishuwen on 2015/3/5.
 */

define(function(require, exports, module) {

    var item =  [{"id":"11","sceneId":"0","name":"第9页","num":"1","elements":[{"css":{"width":192,"height":217,"left":18.90826416015625,"top":25.850311279296875,"src":"../css/image/dog.jpeg","background":"rgb(255, 0, 0)","opacity":99,"borderWidth":0,"borderRadius":"0","borderType":"solid","borderColor":"rgb(255,255,255)","transform":"-12.3902750962164","shadowSize":"0","shadowOffset":"0","shadowColor":"rgb(0,0,0)","animateType":"fadeIn","animateTime":"5","animateDelay":"0","animateTimes":"1","animateInfinite":false},"content":"../css/image/dog.jpeg"}],"scene":{"image":{"imgSrc":"none","background":"rgb(241, 240, 62)"}}},{"id":"12","sceneId":"0","name":"第2页","num":"2","elements":[{"css":{"width":67,"height":106,"left":-124.046875,"top":82,"src":"../css/image/bg.jpg","background":"rgb(255, 0, 0)","opacity":100,"borderWidth":0,"borderRadius":"0","borderType":"solid","borderColor":"rgb(255,255,255)","transform":"0","shadowSize":"0","shadowOffset":"0","shadowColor":"rgb(0,0,0)","animateType":"slideInLeft","animateTime":"1","animateDelay":"1","animateTimes":"1","animateInfinite":false},"content":"../css/image/bg.jpg"},{"css":{"width":106,"height":79,"left":459.015625,"top":119,"src":"../css/image/dog.jpeg","background":"rgb(255, 0, 0)","opacity":100,"borderWidth":0,"borderRadius":"0","borderType":"solid","borderColor":"rgb(255,255,255)","transform":"0","shadowSize":"0","shadowOffset":"0","shadowColor":"rgb(0,0,0)","animateType":"slideInRight","animateTime":"2","animateDelay":"1","animateTimes":"1","animateInfinite":false},"content":"../css/image/dog.jpeg"},{"css":{"width":106,"height":79,"left":104,"top":93,"src":"../css/image/dog.jpeg","background":"rgb(255, 0, 0)","opacity":100,"borderWidth":0,"borderRadius":"0","borderType":"solid","borderColor":"rgb(255,255,255)","transform":"0","shadowSize":"0","shadowOffset":"0","shadowColor":"rgb(0,0,0)","animateType":"slideInLeft","animateTime":"2","animateDelay":"0","animateTimes":"1","animateInfinite":false},"content":"../css/image/dog.jpeg"}],"scene":{"image":{"imgSrc":"none","background":"rgb(41, 161, 214)"}}},{"id":"13","sceneId":"0","name":"第3页","num":"3","elements":[{"css":{"width":106,"height":79,"left":224,"top":172,"src":"../css/image/dog.jpeg","background":"rgb(255, 0, 0)","opacity":100,"borderWidth":0,"borderRadius":"0","borderType":"solid","borderColor":"rgb(255,255,255)","transform":"0","shadowSize":"0","shadowOffset":"0","shadowColor":"rgb(0,0,0)","animateType":"slideInRight","animateTime":"1","animateDelay":"0","animateTimes":"1","animateInfinite":false},"content":"../css/image/dog.jpeg"}],"scene":{"image":{"imgSrc":"none","background":"rgb(252, 240, 142)"}}}]

    //;console.log(localStorage.getItem('scene'));

    //var item = JSON.parse(localStorage.getItem('scene')) || [];

    module.exports = {
        item: item
    }

});