const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  // core
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  entry: path.resolve(__dirname, "src", "index.jsx"), //arquivo principal
  output: {
    // o arquivo q vai ser gerado
    path: path.resolve(__dirname, "dist"), // diretorio
    filename: "bundle.js", // o arquivo
  },
  resolve: {
    extensions: [".js", ".jsx"], // identificar extensions
  },
  // !!!!!!! warning I did a little change
  devServer: {
    static: {
      // hot: true,
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    port: 8080,
  },
  // !!!!!!! https://webpack.js.org/configuration/dev-server/
  // peguei esse exemplo
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx$/, // ele verifica se o arquivo 'e js
        exclude: /node_modules/, // remove
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        } // integração entre o babel e o webpack
      },
      {
        test: /\.scss$/, // ele verifica se o arquivo 'e js
        exclude: /node_modules/, // remove
        use: ['style-loader', 'css-loader', 'sass-loader'], // integração entre o babel e o webpack
      },
    ],
  },
};
