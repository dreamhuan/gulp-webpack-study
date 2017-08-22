var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var glob = require('glob');

var config = {
    devtool: "source-map",  //生成sourcemap,便于开发调试
    entry: getJsEntry('./src/js/*.js'),
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: extractTextPlugin.extract('style', 'css')
        }]
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),//压缩和丑化

        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),//直接定义第三方库
        //
        // new CommonsChunkPlugin({
        //     name: 'common',
        //     // (the commons chunk name)
        //
        //     filename: 'common.js',
        //     // (the filename of the commons chunk)
        //
        //     minChunks: 2,
        //     // (Modules must be shared between 2 entries)
        //
        //     chunks: ['index', 'page1', 'page2']
        //     // (Only use these entries)
        // }),//定义公共chunk
        //
        // // css抽取
        // new extractTextPlugin("[name].css"),

    ]
};

module.exports = config;

//
// var pages = Object.keys(getEntry('./dist/app/*.tpl.html'));
// //生成HTML模板并制定引入js
// pages.forEach(function (pathname) {
//     var index = pathname.lastIndexOf('\\');
//     var itemName = pathname.substring(index + 1, pathname.length - 4);
//     var conf = {
//         filename: path.resolve(__dirname, pathname.substring(0, index + 1) + itemName + '.html'), //生成的html存放路径，相对于path
//         template: path.resolve(__dirname, pathname + '.html'), //html模板路径
//         inject: true, //允许插件修改哪些内容，包括head与body
//         hash: false, //是否添加hash值
//         minify: { //压缩HTML文件
//             removeComments: true,//移除HTML中的注释
//             collapseWhitespace: false //删除空白符与换行符
//         }
//     };
//     conf.chunks = ['common', itemName];
//     config.plugins.push(new HtmlWebpackPlugin(conf));
// });
//
//
// //按文件名来获取入口文件（即需要生成的模板文件数量）
// function getEntry(globPath) {
//     var files = glob.sync(globPath);
//     var entries = {},
//         entry, dirname, basename, pathname, extname;
//
//     for (var i = 0; i < files.length; i++) {
//         entry = files[i];
//         dirname = path.dirname(entry);
//         extname = path.extname(entry);
//         basename = path.basename(entry, extname);
//         pathname = path.join(dirname, basename);
//         entries[pathname] = './' + entry;
//     }
//     return entries;
// }

//按js获取入口对象
function getJsEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[basename] = entry;
    }
    return entries;
}
