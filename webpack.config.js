const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "dist.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
    },
    extensions: [".js", ".json"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: true,
    }),
  ],
  mode: "development",

  // 👇 关键：允许 webpack 解析 ES Module，不然 import/export 会直接报错
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: "javascript/auto", // ←←← 关键修复点
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
