import type {ModuleOptions} from 'webpack'

export const rules: Required<ModuleOptions>['rules'] = [
  // Add support for native node modules. This works, or you can use the native-ext-loader below instead.
  // This will put the llm.node file in .webpack/renderer/native_modules/
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader'
  },
  {
    // Some code has this instead, which only pulls .node files if they are in node_modules: `test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,`
    test: /\.(m?js|node)$/,
    parser: {amd: false},
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.css$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'postcss-loader'}
    ]
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  },
]