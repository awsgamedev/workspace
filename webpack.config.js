const path = require('path');
const tsconfigPathsWebpack = require('tsconfig-paths-webpack-plugin');
const webpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const htmlWebpack = require('html-webpack-plugin');
const miniCssExtract = require('mini-css-extract-plugin');
const webpack = require('webpack');

const entries = webpackWatchedGlobEntries.getEntries([path.resolve(__dirname, 'src/js/**/*.ts')], {
    ignore: [path.resolve(__dirname, 'src/js/_**/*.ts')]
})();

const htmlWebpackGlob = (entries) => {
    return Object.keys(entries).map((key) => new htmlWebpack({
        inject: 'body',
        filename: path.join(__dirname, `dist/template/${key}.html`),
        template: path.join(__dirname, `src/template/${key}.html`),
        chunks: [key]
    }));
};

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/template')
        },
        compress: true,
        port: 8080,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|png|mp3)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [miniCssExtract.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            THREE: 'three'
        }),
        new webpackWatchedGlobEntries(),
        new miniCssExtract({ filename: 'css/[name].css'}),
        ...htmlWebpackGlob(entries)
    ],
    resolve: {
        plugins: [new tsconfigPathsWebpack({
            configFile: 'tsconfig.json'
        })],
        extensions: ['.js', '.ts', '.json'],
    },
    performance: {
        hints: false
    },
}
