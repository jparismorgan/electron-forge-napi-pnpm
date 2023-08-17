# electron-forge-napi-pnpm

This repo is to build a simple Electron app using:
- electron-forge: https://www.electronforge.io/
- node-addon-api: https://github.com/nodejs/node-addon-api
- pnpm

## Running Locally
Setup:
- brew install nvm
- nvm install v18.16.0
- nvm use v18.16.0

Running locally:
- ~/repo/electron-forge-napi-pnpm pnpm i
- ~/repo/electron-forge-napi-pnpm pnpm dev

Packaging app:
- ~/repo/electron-forge-napi-pnpm pnpm build