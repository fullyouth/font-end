#! /usr/bin/env node

const path = require('path');
const program = require('commander');
const staticServer = require('../src/index');
const defaultConfig = require('./config'); // 提取公共配置 TODO
const { logger } = require('../utils');
const userConfigPath = path.resolve(process.cwd(), '.server.config.js')

let userConfig = {}
try{
  userConfig = require(userConfigPath)
} catch(e) {

}
console.log(userConfig)

program.version('0.0.1');
for(let key in defaultConfig) {
  let item = defaultConfig[key]
  program.option(item.option, item.descriptor, item.default)
}
program.parse(process.argv);

let config = {}
for(let key in defaultConfig) {
  console.log(program[key])
  config[key] = program[key] || userConfig[key] || defaultConfig[key].default
}

new staticServer(config).start(config.port, function () {
  logger.green(`start on http://localhost:${config.port}`)
})