const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './', //不加在打包<img />图片标签时会报错
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放上去。
                    // 'style-loader',
                    //这个loader取代style loader，作用： 提取js中的css成单独文件。
                    miniCssExtractPlugin.loader,
                    //将css文件整合到js文件中。
                    'css-loader'
                ]
            },
            {
                //打包其他资源
                //除了css/js/html资源
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            //输出的css文件重命名
            filename: 'css/main.css'
        })
    ],
    mode: 'development',
    // 自动编译，自动打开游览器，自动刷新游览器
    //特点： 无输出，
    //启动: npx webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        //启动gzip压缩
        compress: true,
        port:3000,
        open: true,
    },
}