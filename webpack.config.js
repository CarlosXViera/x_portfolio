var webpack = require('webpack');
var path = require('path');

module.exports = {

  context: __dirname + '/src',
  entry: ['script-loader!d3/build/d3.min.js',
  'script-loader!d3-selection-multi/build/d3-selection-multi.min.js',
  './main.js'],
  externals : {
    d3: 'd3'
  },
  plugins: [
  		new webpack.ProvidePlugin({
  			'window.d3': "d3"
  		})
  	],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
	resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
		alias: {
      'Hexagon': path.resolve(__dirname, "./src/components/Hexagon.js"),
      'Glasses': path.resolve(__dirname, "./src/components/Glasses.js"),
      applicationStyles: path.resolve(__dirname, "./src/styles/main.scss")
    },
    extensions: ['.js']
  },
	module: {
		loaders: [{
			loader: 'babel-loader',
			query: {
				presets: ['env', 'stage-0']
			},
			test: /\.js?$/,
			exclude: /(node_modules|bower_components)/
		}]
	},
	devtool: 'cheap-module-eval-source-map'
};
