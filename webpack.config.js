const slsw = require('serverless-webpack');
const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: slsw.lib.entries,
  mode: 'production',
  target: 'node',
  externals: [
    /aws-sdk/, // Available on AWS Lambda
  ],
  plugins: [].concat(
    // do not upload Sentry artifacts for non legacy account(temp)
    slsw.lib.options.region === 'us-east-2' && slsw.lib.options.stage === 'prod'
      ? [
        new SentryCliPlugin({
          include: Object.keys(slsw.lib.serverless.service.functions).map(
            (entryName) => `.webpack/${entryName}/`,
          ),
          ignore: ['node_modules', 'webpack.config.js', 'coverage'],
          urlPrefix: '/var/task/',
          silent: true,
          setCommits: {
            repo: 'appraisersnow/elastic-lambda',
            auto: true,
          },
        }),
      ]
      : [],
  ),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
