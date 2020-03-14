const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterPlugin = require('./config/htmlAfterPlugin');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const { join } = require('path');
let _entry = {};
let _plugins = [];
const files = glob.sync('./src/web/views/**/*entry.js');

// [ './src/web/views/books/book-index.entry.js',
//   './src/web/views/books/book-list.entry.js' ]
for (let item of files) {
  if (/.+\/([\w]+-[\w]+)(\.entry\.js)/.test(item) == true) {
    let entryKey = RegExp.$1;
    let [dist, template] = entryKey.split('-');
    _entry[entryKey] = item;
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/${template}.html`,
        template: `src/web/views/${dist}/${template}.html`,
        inject: false,
        chunks: [entryKey]
      })
    );
    console.log('entryKey=======', entryKey);
  }
}

const webpackConfig = {
  entry: _entry,
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.?js$/,
        exclude:/(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:[
          // 'style-loader',
          {
            loader:MiniCssExtractPlugin.loader
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    ..._plugins,
    new HtmlAfterPlugin({
      ishack: true
    }),
    new MiniCssExtractPlugin({
      filename:'styles/[name].css',
      chunkFilename:'styles/[id].css'
    }),
    new CopyPlugin([
      {
        from: join(__dirname, 'src/web/views/layouts/'),
        to: '../views/layouts/'
      },
      { from: join(__dirname, 'src/web/components/'), to: '../components/' },
      { from: join(__dirname, 'src/web/css/'), to: './css/' },
    ]),
 
    // new webpack.LoaderOptionsPlugin({
    //   // test: /\.xxx$/, // may apply this only for some modules
    //   options: {
    //     wathcOptions: {
    //       aggregateTimeout: 300,
    //       poll: 1000
    //     }
    //   }
    // })
  ],
  // devServer: {
  //   contentBase: join(__dirname, "/dist"),
  //   hot: true,
  //   quiet: true,
  //   // port: "3000"
  // },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    poll: 1000 // 每秒检查一次变动
  }
};

module.exports = webpackConfig;
