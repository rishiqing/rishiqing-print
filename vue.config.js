const webpack = require('webpack');

module.exports = {
  baseUrl: process.env.OSS_URL ? process.env.OSS_URL : '/print/',
  lintOnSave: false,
  devServer: {
    port: 3007,
  },
  chainWebpack: (config) => {
    config
      .plugin('define') // 修改 webpack.DefinePlugin 插件的配置项
      .tap((options) => {
        options[0] = Object.assign(options[0], {
          __DEV__: process.env.NODE_ENV === 'development',
        });
        return options;
      });

    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        R_URL: ['@/constants/url', 'default'],
      }]);
  },
};
