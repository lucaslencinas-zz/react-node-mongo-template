const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'whatwg-fetch',
    './src/Playground.js'
  ],

  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        __DEVELOPMENT__: true
      }
    })
  ],

  resolve: {
    root: rootPath,
    extensions: ['', '.js'],
    fallback: path.join(rootPath, 'node_modules')
  },

  resolveLoader: {
    fallback: path.join(rootPath, 'node_modules')
  },

  externals: {
    config: '__CONFIG__'
  },

  module: {
    loaders: [
      // js
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(rootPath, 'src')
      },
      // CSS
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]&camelCase!postcss-loader'
        ],
        include: path.join(rootPath, 'src')
      }
    ]
  },

  postcss: [
    /* Autoprefix for different browser vendors */
    // eslint-disable-next-line global-require
    require('autoprefixer'),
    /* Enable css @imports like Sass/Less */
    // eslint-disable-next-line global-require
    require('postcss-import'),
    /* Enable nested css selectors like Sass/Less */
    // eslint-disable-next-line global-require
    require('postcss-nested'),
    /* Enable extending placeholder selectors like Sass */
    // eslint-disable-next-line global-require
    require('postcss-simple-extend'),
    /* Enable Sass-like variables */
    // eslint-disable-next-line global-require
    require('postcss-simple-vars')
  ]
};
