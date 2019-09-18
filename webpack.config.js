module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "./assets/js/main.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
},
  devtool: 'source-map',
  watch: true
}