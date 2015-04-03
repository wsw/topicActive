# topicActive
微信专题活动后台制作和移动端滑动框架

## 目录结构
<pre>
|-css 
|-html 
    |-design.html 当前主要的页面
    |-mobile.html 手机端页面
|-js 源码
    |-app 业务逻辑代码
        |-design 
            |-tpl 模板预编译相关的 介绍文章（http://caolvchong.github.io/2013/08/23/javascript%E4%B8%AD%E7%9A%84%E6%A8%A1%E7%89%88/）
            |-css.js  操作样式值的类
            |-colorpicker.js 颜色取色器
            |-menu.js 上下文菜单模块
            |-range.js 滑动模块写成jq插件
            |-resize.js div的四个角以及旋转的代码
            |-menufunc.js 上下文菜单执行的函数代码
            |-scene.js 场景对象的各种操作
            |-index.js 入口执行方法，包括界面上面事件的监听
            |-compimg.js 图片控件对象
            |-data.js 模拟的数据
            |-styleobj.js 样式和动画对话框模块的处理
            |-template.js 场景模板相关的操作
        |-mobile
            |-index.js 手机端内容初始化,包括动画类型的选择
            |-main.js 页面切换效果代码
            |-slider.js 页面切换框架，包括几种不同切换的效果
            |-loading.js 页面内容加载时动画过程
            |-transit.js jquery的css3动画框架，网上找的
    |-lib gazira库 git地址 https://github.com/caolvchong/gazira.git (可以查看各个类库对应demo)
        |-cmp
            |-dialog  弹出框
            |-smartmenu.js 上下文菜单（这个网站找的，直接封装成seajs模块了）
        |-util
            |-dom
                |-action.js 事件监听
                |-dnd.js 拖拽 (我增加了一种情况:parentIsRelative, 以及当前元素有角度时left，top修正)
|-public 公共资源
    |-js 部署代码
        |-dist 部署业务逻辑代码
            |-design index.js 
            |-mobile index.js 
        |-jquery
        |-seajs
        |-config.js seajs配置文件（切换开发与部署环境）
    |-theme 样式
|-test 测试用例
|-Gruntfile.js 
|-package.json
</pre>