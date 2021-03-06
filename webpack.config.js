const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
const copyWebpackPlugin = require("copy-webpack-plugin"); //通过 npm 安装
const webpack = require("webpack"); //访问内置的插件
const path = require("path");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// 自动读取views目录
var srcDir = path.resolve("./src/views/**/*.html");
var pathArray = glob.sync(srcDir);

function generateFile(data) {
  var fileArray = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i].split("/");
    fileArray.push(item[item.length - 2]);
  }
  return fileArray;
}
var resourceArray = generateFile(pathArray);

// const resourceArray = ["index", "about"];

// 自动生成入口
function generateEntry(data) {
  var entryObject = {};
  for (var i = 0; i < data.length; i++) {
    entryObject[data[i]] = [
      "./src/main.js",
      "./src/views/" + data[i] + "/" + data[i] + ".css",
      "./src/views/" + data[i] + "/" + data[i] + ".js"
    ];
  }
  return entryObject;
}

// 自动生成html
function generateHtml(data) {
  var htmlArray = [];
  for (var i = 0; i < data.length; i++) {
    htmlArray.push(
      new HtmlWebpackPlugin({
        filename: "" + data[i] + ".html",
        template: "./src/views/" + data[i] + "/" + data[i] + ".html",
        hash: true,
        chunks: ["bundle", "commons", "vendor", "" + data[i] + ""],
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      })
    );
  }
  return htmlArray;
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
    ...generateHtml(resourceArray),
    /* new HtmlWebpackPlugin({
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
    }), */
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
      name: "bundle"
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
          test: /node_modules/,
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
