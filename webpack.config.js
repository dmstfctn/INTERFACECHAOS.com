module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "./assets/js/main.js"
  },
  optimization: {
		minimize: true
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
  watch: false
}