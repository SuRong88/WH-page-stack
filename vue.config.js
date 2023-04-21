const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

process.env.VUE_APP_TITLE = '运营支撑平台'

module.exports = {
	lintOnSave: false,
	publicPath: '/',
	productionSourceMap: false,
	transpileDependencies: [
		'vue-echarts',
		'resize-detector'
	],
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// config["performance"] = { //打包文件大小配置
			// 	"maxEntrypointSize": 10000000,
			// 	"maxAssetSize": 30000000
			// }
			return {
				plugins: [
					new CompressionPlugin({
						test: /\.js$|\.html$|\.css$|\.png$/,
						threshold: 10240,
						deleteOriginalAssets: false
					}),
					// new BundleAnalyzerPlugin()
				],
			}
		}
	},
	chainWebpack: config => {
		config
			.when(process.env.NODE_ENV !== 'development',
				config => {
					config
						.optimization.splitChunks({
							chunks: 'all',
							minSize: 10240,
							cacheGroups: {
								libs: {
									name: 'chunk-libs',
									test: /[\\/]node_modules[\\/]/,
									priority: 10,
									reuseExistingChunk: true,
									chunks: 'initial'
								},
								elementUI: {
									name: 'chunk-elementUI',
									priority: 20,
									test: /[\\/]node_modules[\\/]_?element-ui(.*)/
								},
								echarts: {
									name: 'chunk-echarts',
									priority: 30,
									test: /[\\/]node_modules[\\/]_?echarts(.*)/
								},
								commons: {
									name: 'chunk-commons',
									test: resolve('src/components'),
									minChunks: 1,
									priority: 5,
									reuseExistingChunk: true
								}
							}
						})
					config.optimization.runtimeChunk('single')
				}
			)
	},
	devServer: {
		host: '0.0.0.0',
		port: '8081',
		open: true,
		proxy: {
			'/hbadmin': {
				target: 'https://test-oss.yipintemian.com/oss/hbadmin',
				changeOrigin: true,
				pathRewrite: {
					'^/hbadmin': ''
				}
			}
		}
	}
}
