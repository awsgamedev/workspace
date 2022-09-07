const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackWatchedGlobEntriesPlugin = require('webpack-watched-glob-entries-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = WebpackWatchedGlobEntriesPlugin.getEntries([`${__dirname}/src/js/**/*.ts`], {
    ignore: [`${__dirname}/src/js/**/_*.ts`]
})();

module.exports = {
    mode: 'development',
    entry: entries,
    output: {
        path: `${__dirname}/dist/`,
        filename: 'js/[name].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    devServer: {
        static: {
            directory: `${__dirname}/dist/view`
        },
        host: 'localhost',
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|png|mp3)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.ts$|\.tsx$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new WebpackWatchedGlobEntriesPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new HtmlWebpackPlugin({ inject: 'body', filename: `${__dirname}/dist/view/index.html`, template: `${__dirname}/src/view/index.html` })
    ],
    resolve: {
        plugins: [new TsconfigPathsWebpackPlugin({ configFile: 'tsconfig.json' })],
        extensions: ['.js', '.ts']
    }
}
