
'use strict';

var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {

	env = env || {};
	var isProd = env.NODE_ENV === 'production';

	var appMode;
	if (isProd) {
		appMode = 'production';
	}
	else {
		appMode = 'development';
	}

	// the path(s) that should be cleaned; note the *.* to remove all files 
	let pathsToClean = [
		//'dist/*.*',
		'dist/css/*.*',
		'dist/js/*.*'
	];

	// the clean options to use
	let cleanOptions = {
		root: path.join(__dirname, 'wwwroot'),
		verbose: true,
		dry: false
	};

	// Setup base config for all environments
	var config = {
		entry: {
			// We could use either js or ts files			
			main: './src/ts/main.ts'
		},

		mode: appMode,

		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: false
				})
			],

			// This will split off any common dependency into one file
			splitChunks: {
				cacheGroups: {
					common: {
						name: 'common',
						chunks: 'all',
						minChunks: 2
					}
				}
			}

		},

		output: {
			path: path.join(__dirname, 'wwwroot/dist'),
			publicPath: 'dist/',
			chunkFilename: './js/[name].[chunkhash].bundle.js',
			filename: './js/[name].[chunkhash].bundle.js'

		},

		devtool: 'source-map',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},

		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.$': 'jquery',
				'window.jQuery': 'jquery',
				Waves: 'node-waves'
			}),
			new CleanWebpackPlugin(pathsToClean, cleanOptions),
			new MiniCssExtractPlugin({
				filename: "./css/[name].[contenthash].bundle.css",
				chunkFilename: "./css/[name].[contenthash].bundle.css"
			}),
			new OptimizeCssAssetsPlugin({})
		],

		module: {
			rules: [
				{
					// For Fontawesome we are importing directing into the js
					test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)(\?|$)/,
					//use: 'url-loader?limit=100000'
					use: [{
						loader: 'url-loader?limit=100000',
						options: {
							// Combine with the css
							name: '[name].[ext]'
						}
					}]
				},
				{
					test: /\.tsx?$/,
					loader: "ts-loader"
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					]
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				}
			]
		}
	};

	// Alter config for prod environment
	if (isProd) {
		config.devtool = 'none';
	}

	return config;
};

