const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
module.exports = {
  name: "default",
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    publicPath: "lib/",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      jquery: "jquery/dist/jquery.slim.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new WorkerPlugin({
      globalObject: "self"
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      reportFiles: ["src/**/*.{ts,tsx}"]
    })
  ],
  devtool: "source-map"
};
