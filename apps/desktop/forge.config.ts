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
    // NOTE(paris): Commented out to make it easier for others to build and not have to set up a .env file. Comment back in if you also add an .env file.
    // osxSign: {},
    // osxNotarize: {
    //   tool: 'notarytool',
    //   appleId: process.env.APPLE_ID!,
    //   appleIdPassword: process.env.APPLE_PASSWORD!,
    //   teamId: process.env.APPLE_TEAM_ID!
    // }
  },
  rebuildConfig: {},
  makers: [
    new MakerDMG(),
    new MakerZIP({}, ['darwin'])
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
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
  ],
  // NOTE(paris): Commented out to make it easier for others to build and not have to set up a .env file. Comment back in if you also add an .env file.
  // publishers: [
  //   {
  //     name: '@electron-forge/publisher-github',
  //     config: {
  //       repository: {
  //         owner: 'jparismorgan',
  //         name: 'electron-forge-napi-pnpm'
  //       },
  //       prerelease: false,
  //       draft: true
  //     }
  //   }
  // ]
}

export default config
