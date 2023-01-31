const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
  },

  module: {
    rules: [
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    	},

			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},

			{
				test: /\.html$/i,
				loader: "html-loader",
			},

			{
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
		],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
			filename: 'index.html',
    }),

		new CleanWebpackPlugin(),
  ],
};
