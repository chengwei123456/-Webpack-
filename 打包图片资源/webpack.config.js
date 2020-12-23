const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './', //不加在打包<img />图片标签时会报错
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //加载图片
                //缺点: 处理不了html中的<img>
                test: /\.(jpg|png|gif|svg)$/,
                //下载url-loader file-loader
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    //图片命名
                    //取hash的前10位，保持原来的扩展名
                    name: '[hash:10].[ext]'
                }

            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // ignoreCustomFragments: [],
                        // root: path.resolve(__dirname, 'src'),
                        // attrs: ['img:src']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}