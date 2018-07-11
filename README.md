# webpack4-html-demo

> npm install
> 请先运行此命令加载依赖

> npm run start
> 运行项目

> npm run build
> 打包项目

###一个普通 html 项目的打包方案

> 适合普通 html 多页面打包

    src为工作目录
      assets放需编译资源
      static放无需编译资源
      commons放公共资源
      views放页面，必须遵循name/name.js,name.css,name.html格式
      main.js用来引入公共资源

> 此打包方案会自动读取src/views/下的目录，并将目录下的css,js打包进目录下的html，无需在html里link、srcipt显式引入！
> 注意main.js会被打包进所有页面，main.js引用的依赖自然也会打包进所有页面
