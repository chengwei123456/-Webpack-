/**
 * 开发环境配置
 */


const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//设置nodejs 环境变量，变成开发环境
// process.env.NODE_ENV = "development"


/**
 * optimize-css-assets-webpack-plugin 压缩css的插件
 */



module.exports = {
    entry: './src/js/index.js',
    output: {
        publicPath: './',
        filename: 'js/built.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: [
                    // 'style-loader',
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放上去。
                    // 'style-loader',
                    //这个loader取代style loader，作用： 提取js中的css成单独文件。
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    /**
                     * css 兼容性处理: postcss --> postcss-loader postcss-preset-env
                     * 帮postcss找到package.json中browserlist里面的配置，通过配置加载指定的css兼容性配置。
                     * "browserslist": {
                     *      开发环境
                            "development": [
                                "last 1 chrome version",
                                "last 1 firefox version",
                                "last 1 safari version"
                            ],
                            生产环境: 默认是看生产环境
                            "production": [
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                            ]
                        }
                     */
                    //两种写法1：使用loader的默认配置
                    //"postcss-loader",
                    //2.修改默认配置
                    {
                        loader: 'postcss-loader',
                        ident: 'postcss',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    //postcss的插件
                                    require('postcss-preset-env')()
                                ]
                            }
                        }
                            
                        
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs',
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                exclude: /\.(html|js|css|less|png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new miniCssExtractPlugin({
            //输出的css文件重命名
            filename: 'css/main.css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        open: true,
    }
}

/**
 * npx webpack-dev-server
 */