# topicActive
微信专题活动后台制作

## 目录结构
<pre>
|-css 
|-html 
    |-design.html 当前主要的页面
|-js 源码
    |-app 业务逻辑代码
        |-design 
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
    |-lib gazira库
|-public 公共资源
    |-js 部署代码
        |-dist 部署业务逻辑代码
        |-jquery
        |-seajs
        |-config.js seajs配置文件
    |-theme 样式
|-test 测试用例
|-Gruntfile.js 
|-package.json
</pre>