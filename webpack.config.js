var webpack = require('webpack');
var path = require('path');

module.exports = {

	context: __dirname + '/src',
	entry: ['script-loader!d3/build/d3.min.js',
		'script-loader!d3-selection-multi/build/d3-selection-multi.min.js',
		'script-loader!hammerjs/hammer.min.js',
		'script-loader!jquery/dist/jquery.min.js',
		'script-loader!foundation-sites/dist/js/foundation.min.js',
		'./index.jsx'
	],
	externals: {
		d3: 'd3',
		hammer: 'hammer'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'd3': "d3",
			'hammer': 'hammer'
		})
	],
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	resolve: {
		modules: [path.resolve(__dirname, "./src"), "node_modules", path.resolve(__dirname, "./src/components")],
		alias: {
			applicationStyles: path.resolve(__dirname, "./src/styles/main.scss")
		},
		extensions: ['.js','.jsx']
	},
	module: {
		loaders: [{
			loader: 'babel-loader',
			query: {
				presets: ['react','env', 'stage-0']
			},
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/
		},
		{
			test: /\.scss$/,
			use: [{
				loader: 'sass-loader',
				options: {
					includePaths: [path.resolve(__dirname, './node_modules/foundation-sites/scss')]
				}
			}]
		}]
	},
	devtool: 'cheap-module-eval-source-map'
};
