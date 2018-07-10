# webpack4-html-demo

> npm install
加载依赖

> npm run start
运行项目

> npm run build
打包项目

###一个普通html项目的打包方案

>适合普通html多页面打包

    src为工作目录
      assets放需编译资源
      static放无需编译资源
      commons放公共资源
      views放页面，必须遵循name/name.js,name.css,name.html格式
      main.js用来引入公共资源
