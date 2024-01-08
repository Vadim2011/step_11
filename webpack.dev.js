const configDev = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    vendor: './src/js/vendor.js',
    js404: './src/js/js404.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"]
        },
      }
    ],
  },
  devtool: 'source-map',
};

export default configDev;
