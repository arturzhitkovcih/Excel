const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name: 'app',
    mode: 'production',
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    optimization: {
        usedExports: true
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-arrow-functions',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['app/']
                    }
                }]
            },
            {
                test: /\.(jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '/[path][name].[ext]',
                            outputPath: '../',
                            publicPath: (url) => {
                                return `${url}`;
                            }
                        }
                    }
                ]
            },

            {
                test: /\.(png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/[path][name].[ext]',
                        outputPath: '../',
                        publicPath: (url) => {
                            return `${url}`;
                        }
                    }
                }]
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/[path][name].[ext]',
                        outputPath: '../',
                        publicPath: (url) => {
                            return `${url}`;
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    resolve: {
        extensions: ['.js', '*']
    }
};
