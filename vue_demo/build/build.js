'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const serverWebpackConfig = require('./webpack.server.conf');

const spinner = ora('building for production...')
spinner.start()

function buildFrontPage() {
  return new Promise((resolve, reject) => {
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
    }

    resolve('success');
  });
  });
  
}

function buildServerJs() {
  return new Promise((resolve, reject) => {
  console.log(chalk.cyan('  请稍等，将编译服务执行文件.\n'));
    
  webpack(serverWebpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  编译生成服务执行文件错误.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  编译完成.\n'));
    resolve("success");
  });

  });
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  buildFrontPage().then(() => {
  buildServerJs();
  })
  
})
