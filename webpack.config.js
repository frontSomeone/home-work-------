const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); 

module.exports = { 
entry: "./index.js", 
output: { 
filename: 'bundle.js', 
path: path.resolve(__dirname, "build"),
assetModuleFilename: "assets/[name][ext]",  
clean: true },
plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
}),
    new MiniCssExtractPlugin({
        filename: "styles.css",
    })
],
module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]',
        },
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        },
      ],
        }
    ],
  },
};