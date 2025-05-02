// eslint-disable-next-line import/no-extraneous-dependencies
//
// vue.config.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
	productionSourceMap: false,
	publicPath: "/central-tiket/",
	transpileDependencies: [
		"vuetify",
	],
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				// node_modules: path.resolve(__dirname, "./node_modules"),
				// src: path.resolve(__dirname, "./src"),
				assets: path.resolve(__dirname, "./src/assets"),
				components: path.resolve(__dirname, "./src/components"),
				layouts: path.resolve(__dirname, "./src/layouts"),
				model: path.resolve(__dirname, "./src/model"),
				main: path.resolve(__dirname, "./src/main.js"),
				routes: path.resolve(__dirname, "./src/routes"),
				services: path.resolve(__dirname, "./src/services"),
				store: path.resolve(__dirname, "./src/store"),
				styles: path.resolve(__dirname, "./src/styles"),
				templates: path.resolve(__dirname, "./src/templates"),
				util: path.resolve(__dirname, "./src/util"),
				views: path.resolve(__dirname, "./src/views"),
				profiles: path.resolve(__dirname, "./src/profiles"),
			},
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jquery: "jquery",
				"window.jQuery": "jquery",
				jQuery: "jquery",
			}),
		],
	},
};
