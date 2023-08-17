import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
const CopyPlugin = require('copy-webpack-plugin')
const relocateLoader = require('@vercel/webpack-asset-relocator-loader');

const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

console.log('__dirname', __dirname)

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure'
  }),
  // new CopyWebpackPlugin([{
  //   from: 'foo/',
  //   to: path.join('..', 'images')
  // }])
  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: '/Users/parismorgan/repo/electron-forge-napi-pnpm/apps/desktop/src/lib/llm.node',
  //       to: 'native_modules'
  //     },
  //     {
  //       from: '/Users/parismorgan/repo/electron-forge-napi-pnpm/apps/desktop/src/lib/llm.node',
  //       to: ''
  //     }
  //   ]
  // })
  // We don't see to need this, but others did.
  // const relocateLoader = require('@vercel/webpack-asset-relocator-loader')
  // https://github.com/electron/forge/issues/2412#issuecomment-1062106849
  // https://github.com/electron-forge/electron-forge-docs/pull/76/files
  // {
  //   apply(compiler: any) {
  //     compiler.hooks.compilation.tap('webpack-asset-relocator-loader', (compilation: any) => {
  //       relocateLoader.initAssetCache(compilation, 'native_modules')
  //     })
  //   }
  // }
]
