// webpack.config.js是在node环境下被webpack加载的，需要用module.exports
const path = require('path')
module.exports = {
  mode: "production", //设置打包的模式，"production" 或者 "development"

  // 入口文件中
  entry: "./src/index.js", //默认为./src/index.js
  //如果有多个入口文件，分为两种情况，使用数组或者使用对象，他们有所不同
  // entry: ["./src/a.js", "./src/b.js"], //此时会将两个入口文件中的文件都打包到一个指定文件中
  // entry: {a: "./src/a.js", b: "./src/b.js"}, //此时会根据键名分别打包

  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), //输出地址
    filename: "[name]-[id]-[hash]bundle.js" //输出文件名 可以用[]做很多输出文件名配置
  }
}