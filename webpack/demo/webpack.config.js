// webpack.config.js是在node环境下被webpack加载的，需要用module.exports
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development", //设置打包的模式，"production" 或者 "development"

  // 入口文件中
  entry: "./src/index.js", //默认为./src/index.js
  //如果有多个入口文件，分为两种情况，使用数组或者使用对象，他们有所不同
  // entry: ["./src/a.js", "./src/b.js"], //此时会将两个入口文件中的文件都打包到一个指定文件中
  // entry: {a: "./src/a.js", b: "./src/b.js"}, //此时会根据键名分别打包

  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), //输出地址
    filename: "[name]-[id]-[hash]bundle.js", //输出文件名 可以用[]做很多输出文件名配置
  },

  // webpack本身只能理解JavaScript文件和JSON文件，使用loader识别更多类型文件
  // 需要注意的是，使用这些loader之前，先安装对应的依赖包
  module: {
    rules: [
      // 特别注意：loader执行顺序是从后向前的(不一定)
      { test: /\.css$/, use: ["style-loader", "css-loader", "custom-loader"] },
      // 当需要加载的文件是一些静态资源时，不使用use，使用type
      { test: /\.jpg|svg|png$/, type: "asset/resource" },

      // babel 解决兼容性问题，本身也是一个loader
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // 插件
  // 生成一个html文件的插件
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
  ],

  // `custom-loader`
  resolveLoader: {
    alias: {
      "custom-loader": path.resolve(__dirname, "./custom-loader/index.js"),
    },
  },
};
