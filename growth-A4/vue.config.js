const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

let baseUrl = "./";
let outputDir="dist/build";
// let outputDir = path.resolve("S:\\workspace\\mh_server_code\\server\\public\\share\\growth-archives\\news")
let pagesTitle="";
console.log("env: " + process.env.NODE_ENV, "title: " + process.env.VUE_APP_TITLE)
if(process.env.NODE_ENV === 'development'){//开发环境
    pagesTitle="test/";
}
if(process.env.NODE_ENV === 'production'){
    switch (process.env.VUE_APP_TITLE) {
        case 'test':  //测试环境
            outputDir="dist/test";
            pagesTitle="test/";
            break
        case 'production':  //正式环境
            outputDir="dist/build";
            break
        case 'mdevHzt':  //测试环境孩子通
            // outputDir="dist/build";
            outputDir = path.resolve("S:\\workspace\\mh_server_code\\server\\public\\share\\growth-archives\\news")
            break
    }

}

module.exports = {
    // 基本路径
    baseUrl: baseUrl,
    outputDir: outputDir,
    // outputDir:outputDir,
    filenameHashing: false,
    lintOnSave: false,
    runtimeCompiler: false,
    pages: {
        index: {
            entry: './src/main.js',
            template: './public/index.html',
            title: pagesTitle,
        }
    },
    chainWebpack: config => {
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins
            .delete('prefetch')
            .delete('preload')
        // 解决 cli3 懒加载多个问题问题 热更新失效
        config.resolve
            .symlinks(true)
        config
        // 开发环境
            .when(process.env.NODE_ENV === 'development',
                // sourcemap不包含列信息
                config => config.devtool('cheap-source-map')
            )
            // 非开发环境
            .when(process.env.NODE_ENV !== 'development', config => {
                config.optimization
                    .minimizer([
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                // 移除 console
                                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                                compress: {
                                    warnings: false,
                                    drop_console: true,
                                    drop_debugger: true,
                                    pure_funcs: ['console.log']
                                }
                            }
                        })
                    ])
            })
    },
    configureWebpack: () => {
    },
    //vueLoader: {},
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    //dll: false,
    pwa: {},
// webpack-dev-server 相关配置
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        proxy: {// 设置代理
            '/': {
                target: 'http://mdev.haizitong.com',
                changeOrigin: true,
                ws: false
            }
        },
        before: app => {
        }
    },
// 第三方插件配置
    pluginOptions: {
        // ...
    }
}
