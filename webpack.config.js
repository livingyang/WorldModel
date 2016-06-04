module.exports = {
  entry: {
    WorldModel: './entry.ts'
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    library: '[name]', // Big Defense Engine
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.csv$/, loader: 'dsv-loader' }
    ]
  }
}
