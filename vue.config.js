const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  pages: {
    index: {
      entry: 'playground/main.js',
      // template: "public/index.html"
    },
  },
  productionSourceMap: false,
  transpileDependencies: true,
  css: {
    extract: false, // 配置打包后css文件是否独立
    loaderOptions: {
      less: {
        modifyVars: {
          // /* less 变量覆盖，用于自定义 ant design 主题 */
          // 'primary-color': '#1890FF', // 同时也是k-form-design的主题色
          // 'layout-color': '#1890FF', //k-form-design 的布局框颜色
          // 'link-color': '#1890FF',
          // 'border-radius-base': '4px',
        },
        javascriptEnabled: true, // 解决，antd less 样式引入报错问题
      },
      // sass: {
      //   data: `@import "@/styles/_variables.scss";`
      // }
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()], // @jayce:terminal warning fix: https://stackoverflow.com/a/65556946/12261182
    resolve: {
      alias: {
        '@': resolve('src'),
        '@packages': resolve('src/lib/bpmnpdv2/packages'),
        '@utils': resolve('src/lib/bpmnpdv2/utils'),
      },
    },
  },

  devServer: {
    // disableHostCheck: true,
    port: 3000,
    // client: {
    //   logging: 'log',
    // },
    proxy: {
      '/api': {
        // target: 'http://192.168.3.47:12345',
        // target: 'http://127.0.0.1:1228',
        target: 'http://192.168.3.47:1228', // 请求本地 需要jeecg-boot后台项目
        // ws: true,
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          console.log(
            '[proxy]: ' + proxyReq.getHeader('origin') + proxyReq.path,
            ' => ',
            proxyReq.getHeader('host') + proxyReq.path,
          );
        },
        pathRewrite: {
          '^/api': '/', // 这种接口配置出来     http://XX.XX.XX.XX:8083/login
        },
      },
      '/api/file': {
        // target: 'http://127.0.0.1:2456', // 请求本地 需要jeecg-boot后台项目
        target: 'http://192.168.3.47:80/file', // 请求本地 需要jeecg-boot后台项目
        // target: 'http://192.168.0.166:11180', // 请求本地 需要jeecg-boot后台项目
        changeOrigin: true,
        pathRewrite: {
          '^/file': '/', // 这种接口配置出来     http://XX.XX.XX.XX:8083/login
        },
      },
    },
  },
});
