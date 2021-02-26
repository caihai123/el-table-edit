const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function generateConfig(name) {
  var uglify = name.indexOf("min") > -1;

  return {
    mode: uglify ? "production" : "development",
    entry: "./index.js",
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: name + ".js",
      sourceMapFilename: name + ".map",
      libraryTarget: "umd",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: name + ".css",
      }),
    ],
  };
}

module.exports = ["el-table-edit", "el-table-edit.min"].map((key) =>
  generateConfig(key)
);