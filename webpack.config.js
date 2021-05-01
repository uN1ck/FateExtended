/* eslint-disable */
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const globImporter = require("node-sass-glob-importer");
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const
    allTemplates = () => {
        return glob
            .sync("**/*.hbs", {cwd: path.join(__dirname, "system/templates")})
            .map((file) => `"systems/FateExtended/templates/${file}"`)
            .join(", ");
    };

const ENTRY_POINT = path.resolve(__dirname, "src", "FateExtended.ts");

module.exports = (env) => {
    const defaults = {
        watch: false,
        mode: "development",
    };

    const environment = {...defaults, ...env};
    const isDevelopment = environment.mode === "development";

    const config = {
        entry: ENTRY_POINT,
        watch: environment.watch,
        devtool: "inline-source-map",
        stats: "minimal",
        mode: environment.mode,
        resolve: {
            extensions: [".ts", ".js", ".json"],
        },
        output: {
            filename: "system.js",
            path: path.resolve(__dirname, "dist"),
        },
        devServer: {
            hot: true,
            writeToDisk: true,
            proxy: [
                {
                    context: (pathname) => {
                        return !pathname.match("^/sockjs");
                    },
                    target: "http://localhost:30000",
                    ws: true,
                },
            ],
        },
        module: {
            rules: [
                isDevelopment
                    ? {
                        test: /\.(html|hbs)$/,
                        loader: "raw-loader",
                    }
                    : {
                        test: /\.(html|hbs)$/,
                        loader: "null-loader",
                    },
                {
                    test: /\.ts$/,
                    use: [
                        "ts-loader",
                        "eslint-loader",
                        "webpack-import-glob-loader",
                        "source-map-loader",
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: "__ALL_TEMPLATES__",
                                replace: allTemplates,
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevelopment,
                                url: false,
                            },
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevelopment,
                                sassOptions: {
                                    importer: globImporter(),
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [{from: "system"}],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
    };

    if (!isDevelopment) {
        delete config.devtool;
    }

    return config;
};
