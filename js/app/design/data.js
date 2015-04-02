/**
 * Created by weishuwen on 2015/2/3.
 *
 * 目前数据全是同步操作，要改成ajax，可以统一改成callback方式进行异步
 */
define(function(require, exports, module) {
    var Data = {};

    var sceneId = 0;
    var pageId = 0;
    var elementId = 0;
    var number = 1;

    var blankScene = [{
        "id": pageId++,
        "sceneId": sceneId,
        "num": number++,
        "name": "第1页",
        "elements": [],
        "scene": {
            "id": sceneId,
            "name": "2222",
            "createUser": "4a2d8aae4b14dcd7014b294902a64c24",
            "createTime": 1422327309000,
            "image": {
                "background": "white"
            }
        }
    }];

    Data = {
        loadFirstData: function() {
            var scene = JSON.parse(localStorage.getItem('scene'));
            if (scene) {
                number = scene.length+1;
                for (var i = 0; i < scene.length; i++) {
                    pageId = Math.max(pageId, scene[i].id);
                }
                pageId += 1;
                return scene;
            } else {
                localStorage.setItem('scene', JSON.stringify(blankScene));
                return blankScene;
            }
        },
        newPageContent: function() {
            var scene = JSON.parse(localStorage.getItem('scene'));

            var item = {
                "id": pageId++,
                "sceneId": sceneId,
                "num": number,
                "name": "第"+(number++)+"页",
                "elements": [],
                "scene": {
                    "id": sceneId,
                    "name": "2222",
                    "createUser": "4a2d8aae4b14dcd7014b294902a64c24",
                    "createTime": 1422327309000,
                    "image": {
                        "background": "white"
                    }
                }
            };
            scene.push(item);
            localStorage.setItem('scene', JSON.stringify(scene));
            return item;
        },
        savePageContent: function(page) {
            console.log(page);
            var scene = JSON.parse(localStorage.getItem('scene'));
            for (var i = 0; i < scene.length; i++) {
                if (scene[i].id == page.id) {
                   scene[i] = page;
                }
            }
            localStorage.setItem('scene', JSON.stringify(scene));
        },
        findPageByPageId: function(id) {
            var scene = JSON.parse(localStorage.getItem('scene'));
            for (var i = 0; i < scene.length; i++) {
                if (scene[i].id == id) {
                    console.log(scene[i]);
                    return scene[i];
                }
            }
        },
        deletePageByPageId: function(id) {
            var scene = JSON.parse(localStorage.getItem('scene'));
            var newScene = [];
            var index = 1;
            for (var i = 0; i < scene.length; i++) {
                if (scene[i].id != id) {
                    scene[i].num = index++;
                    newScene.push(scene[i]);
                }
            }
            number--;
            localStorage.setItem('scene', JSON.stringify(newScene));
            return newScene;
        },
        clonePageByPageId: function(id) {

            var scene = JSON.parse(localStorage.getItem('scene'));
            var index = 1;
            for (var i = 0, l = scene.length; i < l; i++) {
                scene[i].num = index++;
                if (scene[i].id == id) {
                    var page = Data.cloneObj(scene[i]);
                    page.num = number++;
                    page.id = pageId++;
                    page.zIndex++;
                    scene.push(page);
                }
            }
            var str = "";
            for (i = 0, l = scene.length; i < l; i++) {
                str += " " + scene[i].num;
            }
            localStorage.setItem('scene', JSON.stringify(scene));
            return scene;
        },
        cloneObj: function(obj) {
            var o;
            switch(typeof obj){
                case 'undefined': break;
                case 'string'   : o = obj + '';break;
                case 'number'   : o = obj - 0;break;
                case 'boolean'  : o = obj;break;
                case 'object'   :
                    if(obj === null){
                        o = null;
                    }else{
                        if(obj instanceof Array){
                            o = [];
                            for(var i = 0, len = obj.length; i < len; i++){
                                o.push(this.cloneObj(obj[i]));
                            }
                        }else{
                            o = {};
                            for(var k in obj){
                                if (obj.hasOwnProperty(k)) {
                                    o[k] = this.cloneObj(obj[k]);
                                }
                            }
                        }
                    }
                    break;
                default:
                    o = obj;break;
            }
            return o;
        },
        saveTemplate: function(page) {
            var template = JSON.parse(localStorage.getItem('template'));

            if (template && template.length > 0) {
                page.id = template.length+1;
                template.push(page);
            } else {
                page.id = 1;
                template = [page];
            }

            localStorage.setItem('template', JSON.stringify(template));
        },
        getTemplate: function() {
            var template = JSON.parse(localStorage.getItem('template'));

            if (template && template.length > 0) {
                return template;
            } else {
                return [];
            }
        },
        getTemplateById: function(id) {
            var template = JSON.parse(localStorage.getItem('template'));

            for (var i = 0; i < template.length; i++) {
                if (id == template[i].id) {
                    return template[i];
                }
            }
            return ;
        },
        getImages: function() {
            var images = [];
            images.push("../css/image/dog.jpeg");
            images.push("../css/image/bg.jpg");

            return images;
        },
        getBackground: function() {
            var images = [];
            images.push("../css/image/bg.jpg");

            return images;
        }
    };

    module.exports = Data;
});