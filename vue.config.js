'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = 'Users';

const port = process.env.VUE_APP_PORT || process.env.VUE_APP_PORT || 3000;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: port,
    disableHostCheck: false,
    https: false,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  configureWebpack: {
    name: name,
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    resolve: {
      extensions: ['*', '.vue', '.js', '.scss', '.sass', '.css', '.json'],
      modules: ['node_modules'],
      alias: {
        '@': resolve('./src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: /\.index\.vue$/,
        },
        {
          test: /\.less$/,
          loader: 'less-loader',
        },
      ],
    },
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    extract: {
      filename: '[name].css',
    },
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== 'production' ? true : false,
        localsConvention: 'camelCaseOnly',
      },
    },
  },

  parallel: require('os').cpus().length > 1,

  chainWebpack(config) {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'));

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: -10,
            chunks: 'all',
          },
        },
      });
      config.optimization.runtimeChunk('single');
      config.performance.maxEntrypointSize(700000).maxAssetSize(400000);
    });
  },
};
