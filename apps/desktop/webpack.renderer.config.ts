import type {Configuration} from 'webpack'

import {rules} from './webpack.rules'
import {plugins} from './webpack.plugins'

export const rendererConfig: Configuration = {
  target: 'electron-renderer',
  module: {
    rules
  },
  // node: {
  //   __dirname: false
  // },
  // Doesn't seem like we need this, but suggested here: https://stackoverflow.com/questions/70530563/electron-native-nodejs-module-with-webpack
  externals: {
    llm: 'llm'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
}
