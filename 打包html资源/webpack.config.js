


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        //html-webpack-plugin
        //功能： 默认创建一个空的html文件
        //需求：需要有结构的
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',

}