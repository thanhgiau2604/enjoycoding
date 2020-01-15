module.exports = {
    entry: {
      homepage:'./app/components/homepage/homepage.js',
      submit: './app/components/submit/submit.js',
      rank: './app/components/rank/rank.js',
      results:'./app/components/result/result.js',
      dashboard: './app/components/admin/manage/dashboard.js',
      deadline: './app/components/admin/manage/deadline.js',
      user: './app/components/admin/manage/user.js',
      result: './app/components/admin/manage/result.js'
    },
    output: {
      path: __dirname,
      filename: './public/bundle/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      ]
    }
}