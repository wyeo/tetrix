const { resolve } = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './src/client/app.js',
  output: {
    path: resolve(__dirname, 'bin'),
    filename: 'app.output.js',
    publicPath: '/bin/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css-loader'],
      },
    ],
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ],
}
