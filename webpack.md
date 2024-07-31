首先看一下webpack主要有什么作用

- 模块打包（基本能力）

可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

- 编译兼容（loader）

在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

- 能力扩展（plugin）

通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

常见问题：

说一下模块打包原理？

1. 读取`webpack`的配置参数
2. 启动`webpack`，创建`Compiler`对象并开始解析项目
3. 从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树
4. 对不同的文件类型的依赖模块文件使用对应的`Loader`进行编译，最终会转为JS文件
5. 整个过程中`webpack`会通过发布订阅模式，向外抛出一些`hooks`,而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务而达到干预输出结果的目的

在整个构建过程中有两个对象起到了关键作用，分别是`compiler`和`compilation`,`compilation`对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次`热更新`和`重新构建`，`compiler`都会重新生成一个新的`compilation`对象，负责此次更新的构建过程

每个模块间的依赖关系基于`AST`语法树,使用`acorn`生成模块代码的`AST`语法树

最终，写了最简单的几段代码，我们在开启`mode: "development"`后，构建出下面的IIFE执行函数

```js
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./day.js":
/*!****************!*\
  !*** ./day.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   day: () => (/* binding */ day)\n/* harmony export */ });\nvar day = {\n  date: \"2024/3/4\",\n  weather: \"cloud\",\n  getEmotion: function getEmotion() {\n    return \"good\";\n  }\n};\n\n//# sourceURL=webpack://webpack_demo/./day.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _day_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./day.js */ \"./day.js\");\n\nconsole.log(\"webpack打包后的文件\");\nvar user = {\n  name: \"quirkybird\",\n  height: \"175\"\n};\nconsole.log(\"\".concat(_day_js__WEBPACK_IMPORTED_MODULE_0__.day.date, \", \").concat(user.name, \"'s mood is \").concat(_day_js__WEBPACK_IMPORTED_MODULE_0__.day.getEmotion()));\n\n//# sourceURL=webpack://webpack_demo/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
```

观察发现主要有三个模块：`__webpack_module_cache__`、`__webpack_require__`、`__webpack_modules__`,
分别是模块缓存、webpack来兼容CommonJS、ES Module，统一的webpack导入导出方式、编译后的JS文件

你知道sourceMap是什么吗？

它是一类技术的称呼，即将编译、压缩、打包后的代码映射回源代码的技术，浏览器支持的功能，有一份映射文件，在mode为"development"文件尾部自动添加
`//# sourceURL=/path/to/file.js.map`，来开启对sourceMap的支持

是否写过Loader？简单描述一下编写loader的思路？

`loader`存在于webpack编译代码过程中，将其它不能理解的文件变为JS文件  
注意：有关于loader的执行顺序：  
[你了解webpack中配置的loader的执行顺序吗？](https://juejin.cn/post/7058652098174386213)  
[webpack loader 真的是从左向右执行吗？为什么？](https://juejin.cn/post/7342400998857031695)

简单说明一下：  
在pitching阶段，loader上的pitch方法，`post loader` -> `inline loader` -> `normal loader` -> `pre loader`

在normal阶段：`pre loader` -> `normal loader` -> `inline loader` -> `post loader`

pre、post通过`enforce`参数设置,`inline loader`可以是不在配置文件中加入，而是像是下面这样在导入文件之前使用

```
import Styles from 'style-loader!css-loader?modules!./styles.css';
```
有一个点，如果在loader在pitch方法中有返回值，则马上终止pitch阶段，转向当前pitch上一个对应的normal阶段，称为熔断效果

写loader的主要思路是遵循一些规范，需要按照顺序，在统一规则中，上一个loader的callback内容将为成为下一个loader的入参，所以返回内容必须是JavaScript字符串



是否写过Plugin？简单描述一下编写Plugin的思路？
`Plugin` 的实现基于webpack的发布订阅模式，他的实现是基于 `Tapable`,是一个webpack团队打造的发布订阅实现模式（可参考:  [webpack核心模块tapable模块用法解析](https://dennisgo.cn/Articles/Engineering/tapable-usage.html)， 源码：[tapable
](https://github.com/webpack/tapable))，compiler和compilation暴露了Webpack生命周期相关的hooks

开发pulugin需要注意下面几点： 

- 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问compiler实例；
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件;
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住;

> 参考文章：  
> [当面试官问Webpack的时候他想知道什么](https://juejin.cn/post/6943468761575849992)
> [打包工具 rollup.js 入门教程](https://www.ruanyifeng.com/blog/2022/05/rollup.html)