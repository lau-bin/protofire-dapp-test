const webpack = require('webpack');
const path = require('path');

const prod = process.env.BUILD_MODE === 'production';

const common = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  module:{
    rules:[
        {
            test: /.*(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options:{
                name: 'resources/[hash].[ext]'
            },
            exclude: /node_modules/
        },
        {
            test: /\.[jt]sx?$/,
            use: [
            {
                loader: 'ts-loader'
            }
            ],
            exclude: /node_modules/
        },
        {
          test: /\.s?[ac]ss$/i,
          use: [
            {
              loader: 'style-loader'
            },
            //Generate types to include css names in js
            "@teamsupercell/typings-for-css-modules-loader",
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[hash]'
                },
                sourceMap: !prod
              }
            },
            'sass-loader'
          ],
          exclude: /node_modules/
      }
    ]
},
resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '.css', '.sass', '.scss', '.png', '.jpg', '.jpeg', '.gif' ],
    alias: {
      resources: path.resolve(__dirname, 'resources/'),
      modules: path.resolve(__dirname, 'modules/'),
      src: path.resolve(__dirname, 'src/'),
      node_modules: path.resolve(__dirname, 'node_modules/')
    } 
  },
  plugins: [
    //Set env in webpack
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    })
  ],
watch: process.env.BUILD_MODE === 'production' ? false : true,
watchOptions: {
    ignored: ['/node_modules', '*.d.ts']
  }
}

const page =  Object.assign({}, common, {
  entry: './src/index.tsx',
  output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
  }
});

module.exports = [
  page
];