const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const themeStyle = require("./src/styles/theme.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: ["uview-ui"],
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      alias: {
        //配置别名,修改后需要重新编译才能生效
        "@": resolve("src"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData:
          "@import 'uview-ui/theme.scss';" +
          Object.keys(themeStyle)
            .map((k) => `\$${k.replace(/_/g, "-")}: ${themeStyle[k]};`)
            .join("\n"),
      },
      scss: {
        prependData:
          "@import 'uview-ui/theme.scss';" +
          Object.keys(themeStyle)
            .map((k) => `\$${k.replace(/_/g, "-")}: ${themeStyle[k]};`)
            .join("\n"),
      },
    },
  },
});
