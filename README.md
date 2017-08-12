# gulp-webpack构建前端工作流
dreamhuan <fu_kaiqi@qq.com>  
2017-8-7  

自己随便瞎折腾了三天终于勉强吧这两货塞一起了，并且也弄明白了一些流程，特留下来<del>万一以后能用到</del>

### 环境
1. nodejs(6.10.0)/npm(3.10.10)
1. bower(1.8.0)
1. webpack(3.4.1)
1. gulp(3.9.1)

gulp控制主流程，其中js部分扔给webpack编译  
  
### 使用
1. npm i
1. bower i
1. npm start
1. localhost:3000/app/index.html
  
(谁来教我怎么吧那个app路径扔掉，但我不想html直接放在src下，太乱了。。。放在app文件夹下就不得不在url加上app了，改browser-sync的配置又会有别的问题，比如改basedir到app就找不到js文件了。。。)
  
### 开发说明
1. 开发时HTML文件放在src/app,通用文件(header,footer)可以新建个文件夹引入,支持静态引入@@include("./xxx/xxx.html")见index.html的做法
1. 保持html和对应的js,less(sass)名一致现在样式用的是less。要用sass的话`gulpfile.js`注释掉32-41行，取消44-53注释，93行`*.less`改为`*.scss`
1. 需要自己在html引入文件路径写`编译完后`的路径"../css/xxx","../js/xxx","../lib/xxx/xxx"(尤其要注意的是css！因为项目路径是style，编译后是css，。至于为什么不改成一样的，我也不知道啊。。。大概当时脑子不对。你要改的话就改一下gulpfile的styles的task)
1. 第三方库的话能用bower就用bower安装，装在src/lib下，没有bower的就下载完放到src/lib下，然后正常引入就好，注意顺序

### 解决的问题
1. js编译，可以愉快的使用es6了
1. less，sass编译，可以愉快的...
1. 引入静态文件@@include 可以共享header和footer了，或者别的想要分块写的也行(对应的css也要@import哦)

### 写在后面
有好多不完善的东西
比如第三方库采用最原始的方法，直接src转移到dist的。。。因为搞不懂webpack第三方库要怎么优雅的引入(尤其是那种bs依赖jq这样的...)有空去研究下文档    
再比如自动刷新的服务器用的是bowser-sync，据说webpack-dev-server挺好用，有空也研究一波  
再就是这里webpack就编译了下js，感觉有点鸡肋，事实上似乎所有事都可以webpack单独完成，但是那个文件引入(header,footer)就不知道怎么玩了orz  
  
最后有人看的话欢迎PR。。。能解决上面哪些问题就再好不过啦  
<del>也欢迎star</del>
