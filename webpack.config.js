const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
const copyWebpackPlugin = require("copy-webpack-plugin"); //通过 npm 安装
const webpack = require("webpack"); //访问内置的插件
const path = require("path");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");

/* var srcDir = path.resolve(process.cwd(), "src");

var entries = function() {
  var jsDir = path.resolve(srcDir, "js");
  var entryFiles = glob.sync(jsDir + "/".js);
  var map = {};

  for (var i = 0; i < entryFiles.length; i++) {
    var filePath = entryFiles[i];
    var filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    map[filename] = filePath;
  }
  return map;
}; */

/* // 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(options) {
  return {
    template: `./src/views/${options.name}/index.html`,
    filename: `${options.name}.html`,
    // favicon: './favicon.ico',
    title: options.title,
    inject: true,
    hash: true, //开启hash ?[hash]
    chunks: options.chunks, //页面要引入的包
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, //去除属性引用
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }
  };
};
//配置页面
const htmlArray = [
  {
    _html: "index",
    title: "首页",
    chunks: ["index", "commons", "list", "vendor"] //页面用到的vendor模块
  },
  {
    _html: "about",
    title: "登录",
    chunks: ["about", "commons", "list", "vendor"]
  }
];
//自动生成html模板 */

const resourceArray = ["index", "about"];

function generateEntry(data) {
  var entryObject = {};
  for (var i = 0; i < data.length; i++) {
    entryObject[data[i]] = [
      "./src/views/" + data[i] + "/" + data[i] + ".css",
      "./src/views/" + data[i] + "/" + data[i] + ".js",
      "./src/main.js"
    ];
  }
  return entryObject;
}

const config = {
  mode: "production",
  /* entry: {
    index: ["./src/views/index/index.js", "./src/main.js"],
    about: "./src/views/about/about.js"
  }, */
  entry: generateEntry(resourceArray),
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    /* htmlArray.forEach(element => {
      new htmlWebpackPlugin(getHtmlConfig(element));
    }), */
    new HtmlWebpackPlugin({
      filename: "index.html",
      // template: "./src/index/index.html",
      template: path.resolve(__dirname, "src/views", "index/index.html"),
      chunks: ["index", "commons", "list", "vendor"],
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./src/views/about/about.html",
      hash: true,
      chunks: ["about", "commons", "list", "vendor"],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./src/static"),
        to: "./dist/static",
        ignore: [".*"]
      }
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: "list"
    },
    splitChunks: {
      chunks: "initial",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      name: true,
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: "initial",
          name: "commons",
          minChunks: 2,
          maxInitialRequests: 15,
          minSize: 0
        },
        //第三方组件
        vendor: {
          // test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name]-[hash:6].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};

module.exports = config;
