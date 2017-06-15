const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDORS = [
	'react', 'react-router-dom', 'scream', 'd3-selection', 'react-dom', 'script-loader!jquery/dist/jquery.min.js', 'script-loader!foundation-sites/dist/js/foundation.min.js', 'node-uuid']

module.exports = {
	entry: {
		bundle: './src/index.jsx',
		vendor: VENDORS
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		modules: [path.resolve(__dirname, "./src"), "node_modules", path.resolve(__dirname, "./src/components")],
		alias: {
			applicationStyles: path.resolve(__dirname, "./src/styles/main.scss")
		},
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env', 'stage-0']
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
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new CleanWebpackPlugin(['public'], {
			root: path.resolve(__dirname),
			verbose: true,
			dry: false,
			exclude: ['fonts', 'favicon.ico']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: true,
		// 	compress: {
		// 		warnings: false, // Suppress uglification warnings
		// 		pure_getters: true,
		// 		unsafe: true,
		// 		unsafe_comps: true,
		// 		screw_ie8: true
		// 	},
		// 	output: {
		// 		comments: false,
		// 	},
		// 	exclude: [/\.min\.js$/gi] // skip pre-minified libs
		// })
	]
};
