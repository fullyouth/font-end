const chalk = require('chalk');

const log = console.log
const logger = {
  green: (...arg) => log(chalk.green(...arg)),
  red: (...arg) => log(chalk.red(...arg)),
  blue: (...arg) => log(chalk.blue(...arg)),
}

module.exports = {
  logger
}
    