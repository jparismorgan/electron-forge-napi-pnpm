import type {ForgeConfig} from '@electron-forge/shared-types'
import {MakerDMG} from '@electron-forge/maker-dmg'
import {WebpackPlugin} from '@electron-forge/plugin-webpack'
import {MakerZIP} from '@electron-forge/maker-zip'
const ForgeExternalsPlugin = require('@timfish/forge-externals-plugin')

// import {CopyPlugin} from 'copy-webpack-plugin'

import {mainConfig} from './webpack.main.config'
import {rendererConfig} from './webpack.renderer.config'
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})

const fs = require('fs-extra')
const path = require('path')
const {spawn} = require('child_process')

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    // icon: './assets/icon',
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID!,
      appleIdPassword: process.env.APPLE_PASSWORD!,
      teamId: process.env.APPLE_TEAM_ID!
    }
  },
  rebuildConfig: {},
  makers: [
    new MakerDMG(),
    new MakerZIP({}, ['darwin'])
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      // devContentSecurityPolicy: 'connect-src \'self\' data: blob: https://www.staging.hammerai.com/api/ https://www.hammerai.com/api/ https://www.models.hammerai.com/ https://images.887334743a0ced5f7b9a214e67f59d8a.r2.cloudflarestorage.com/ http://localhost:3000',
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts'
            }
          }
        ]
      }
    }),
    // {
    //   name: '@electron-forge/plugin-auto-unpack-natives',
    //   config: {}
    // }
    // new AutoUnpackNativesPlugin({})
    // new ForgeExternalsPlugin({
    //   externals: ['llm'],
    //   includeDeps: true
    // })
  ],
  // hooks: {
  //   readPackageJson: async (forgeConfig, packageJson) => {
  //     // only copy deps if there isn't any
  //     if (Object.keys(packageJson.dependencies).length === 0) {
  //       const originalPackageJson = await fs.readJson(path.resolve(__dirname, 'package.json'))
  //       // eslint-disable-next-line global-require
  //       const webpackConfigJs = require('./webpack.renderer.config.js')
  //       Object.keys(webpackConfigJs.externals).forEach((package_: any) => {
  //         packageJson.dependencies[package_] = originalPackageJson.dependencies[package_]
  //       })
  //     }
  //     return packageJson
  //   },
  //   packageAfterPrune: (forgeConfig, buildPath) => {
  //     console.log(buildPath)
  //     return new Promise((resolve, reject) => {
  //       const npmInstall = spawn('pnpm', ['install'], {
  //         cwd: buildPath,
  //         stdio: 'inherit'
  //       })

  //       npmInstall.on('close', (code: any) => {
  //         if (code === 0) {
  //           resolve()
  //         } else {
  //           resolve()
  //           // reject(new Error(`process finished with error code ${code}`))
  //         }
  //       })

  //       npmInstall.on('error', (error: any) => {
  //         reject(error)
  //       })
  //     })
  //   }
  // },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'jparismorgan',
          name: 'electron-forge-napi-pnpm'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}

export default config
