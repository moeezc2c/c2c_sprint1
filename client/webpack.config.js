const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const port = process.env.PORT || 5000;

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "index.js"), //'./src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        // publicPath: "/dist"
    },    
    // resolve: {
        // extensions: [".js", ".json", ".ts"],
        // alias: {
        //     react: path.resolve(__dirname, './node_modules/react'),
        // },
    // },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".ts"],
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
    // devtool: false, // 'inline-source-map'
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                  }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",

            },
            {
                test: /\.css$/,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader"]
                // loader: "css-loader",
                // options: {
                //     modules: true,
                //     importLoaders: 1
                // }

			},
			{
                test: /\.s[ac]ss$/i,
                //exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                    },
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]                  
              },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                // use: [
                //   {
                //     loader: 'file-loader',
                //     options: {
                //           name: 'img/[name].[ext]',
                //           outputPath: '/img',
                //           publicPath: '/img'
                //       },
                //   }
                // ]
                //type: 'asset/resource',
                
                // use: ['file-loader']

                // loader: 'file-loader',
                // options: {
                //     name: 'img/[name].[ext]',
                //     publicPath: '/'
                // },
            },
              {
                test: /\.xml$/i,
                use: ['xml-loader'],
              },
              {
                test: /\.html$/,
                loader: 'html-loader'
            },
		],
	},
    ignoreWarnings: [/Failed to parse source map/],
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            // template: 'public/index.html',
            // favicon: 'public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
          filename: "src/styles/style.css",
          // filename: 'css/[name][contenthash].css',
        }),
        // new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        host: 'localhost',
        port: port,
        compress: true,
        //contentBase: path.join(__dirname, 'build'),
        static: {
          directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        open: true,        
        //contentBase: './build',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        hot: true,
        liveReload: false,
    }
};