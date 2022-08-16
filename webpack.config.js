const TsconfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackWatchedGlobEntriesPlugin = require('webpack-watched-glob-entries-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = WebpackWatchedGlobEntriesPlugin.getEntries([`${__dirname}/src/js/**/*.ts`], {
    ignore: [`${__dirname}/src/js/**/_*.ts`]
})();

const HtmlWebpackPluginGlob = (entries) => {
    return Object.keys(entries).map((key) => new HtmlWebpackPlugin({
        inject: 'body',
        filename: path.join(__dirname, `./dist/view/${key}.html`),
        template: path.join(__dirname, `./src/view/${key}.html`),
        chunks: [key]
    }));
}

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: entries,
    output: {
        path: `${__dirname}/dist/`,
        filename: "js/[name].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|png|mp3)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.ejs$/,
                use: [
                    "html-loader",
                    "ejs-plain-loader"
                ]
            },
            {
                test: /\.ts$|\.tsx$/,
                loader: "ts-loader",
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
    },
    plugins: [
        new WebpackWatchedGlobEntriesPlugin(),
        new MiniCssExtractPlugin({ filename: "css/[name].css"}),
        ...HtmlWebpackPluginGlob(entries)
    ],
    resolve: {
        plugins: [new TsconfigPathsWebpackPlugin({
            configFile: "tsconfig.json"
        })],
        extensions: [".js", ".ts", ".tsx"],
    },
}
