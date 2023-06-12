import commonjs from "@rollup/plugin-commonjs";
import vueplugin from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
// import {terser} from "@rollup/plugin-terser";

// const commonjs = require("@rollup/plugin-commonjs");
// const vueplugin = require("rollup-plugin-vue");
// const babel = require("@rollup/plugin-babel");
// // import {terser} from "@rollup/plugin-terser";
// module.exports =
export default {
  input: "index.js",
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  format: "es",
  output: [
    {
      file: "dist/bundle.js",
      // format: "es",
      name: "MyLib",
    },
  ],
  plugins: [
    vueplugin({
      // css: true,
      // compileTemplate: true,
    }),
    // resolve({
    //   browser: true,
    //   preferBuiltins: false,
    // }),
    commonjs(),

    babel({
      babelHelpers: "bundled", // 编译输出使用 bundler 工具自己提供的 helper 函数
      exclude: "node_modules/**", // 排除 node_modules 文件夹
    }),
  ],
  external: ["vue"], // 外部依赖
};
