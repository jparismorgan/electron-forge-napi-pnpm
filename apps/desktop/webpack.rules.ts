import type {ModuleOptions} from 'webpack'
import * as path from 'path'

export const rules: Required<ModuleOptions>['rules'] = [
  // Add support for native node modules. This works, or you can use the native-ext-loader below instead.
  // This will put the llm.node file in .webpack/renderer/native_modules/
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    // test: /native_modules\/.+\.node$/,
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    // test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: {amd: false},
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  // You can also use this instead of node-loader + @vercel/webpack-asset-relocator-loader. 
  // It will put the llm.node file in .webpack/renderer/
  // {
  //   test: /\.node$/,
  //   loader: 'native-ext-loader',
  //   options: {
  //     rewritePath: path.resolve(__dirname, '.webpack/renderer/native_modules')
  //   }
  // },
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
  // {
  //   // We're specifying native_modules in the test because the asset
  //   // relocator loader generates a "fake" .node file which is really
  //   // a cjs file.
  //   test: /native_modules\/.+\.node$/,
  //   use: 'node-loader'
  // },
  // {
  //   test: /\.(m?js|node)$/,
  //   parser: {amd: false},
  //   use: {
  //     loader: '@vercel/webpack-asset-relocator-loader',
  //     options: {
  //       outputAssetBase: 'native_modules'
  //     }
  //   }
  // }
]
// {
//   test: /\.node$/,
//   loader: 'node-addon-loader'
//   // options: [
//   //   basePath: resolve(__dirname),
//   // ]
// }
// {
//   test: /\.node$/,
//   use: 'node-loader'
// }
