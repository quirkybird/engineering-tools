function customLoader(content, map, meta) {
  const logger = this.getLogger();

  logger.info("[custom-loader] running...");

  logger.info("now content is ", content);

  content = `h1 {
    background-color: blue;
  }`;
  /*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */
  this.callback(null, content, map, meta);

  logger.info("[custom-loader] done...");
}

module.exports = customLoader;
