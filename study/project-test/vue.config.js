const path = require("path");
// const pkg = require("./package.json");
module.exports = {
    // baseUrl: './',
    assetsDir: "static",
    productionSourceMap: false,
    chainWebpack: (chain) => {
        chain.module
            .rule("svg")
            .include.add(path.resolve(__dirname, "./src/icons"));
        chain.module.rule("svg").uses.delete("file-loader");
        chain.module
            .rule("svg")
            .test(/\.(svg)(\?.*)?$/)
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            });
    },
    devServer: {
        proxy: {
            "/mock": {
                target: "http://10.32.86.47:8300", // 域名
                changOrigin: true,
            },
            "/citymanagement": {
                // target: "http://195.195.9.166:8084", // 域名
                target: "http://192.168.31.117:8084",
                changOrigin: true,
            },
        },
    },
    // configureWebpack: {
    //     externals: {
    //       AMap: "AMap" // 高德地图配置
    //     }
    // },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        requireModuleExtension: true,
        // css预设器配置项
        loaderOptions: {
            scss: {
                additionalData: `
                    $env: ${process.env.NODE_ENV};
                    @import "~@/styles/variables.scss";
                `,
            },
        },
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false,
    },
};
