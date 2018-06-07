const moment = require('moment')
const path = require('path')

class Logger {
  constructor(module) {
    if (!(this instanceof Logger)) {
      return new Logger(module)
    }
    this.module = module
  }
  info(description, data) {
    if (!data) {
      data = description
      description = ''
    }
    this.console(description, data)
  }
  debug(description, data) {
    if (!data) {
      data = description
      description = ''
    }
    let fileName = path.parse(this.module).name
    if (process.env.DEBUG === '*' || process.env.DEBUG === fileName) {
      this.console(description, data, 'debug')
    }
  }
  error(description, data) {
    if (!data) {
      data = description
      description = ''
    }
    this.console(description, data, 'error')
  }

  console(description, data, type = 'info') {
    let key = ''
    switch (type) {
      case 'debug':
      case 'error':
        key = 'error'
        break;
      default:
        key = 'log'
        break;
    }
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let typeUpper = type.toUpperCase()
    let formatDescription = this.formatDescription(description)
    if (this.isVariable(data)) {
      console[key](`${now} ${typeUpper} [${this.module}] - ${formatDescription} ${data}`)
    } else {
      console[key](`${now} ${typeUpper} [${this.module}] - ${formatDescription} %o`, data)
    }
  }

  formatDescription(description) {
    return description ? description + ':' : ''
  }

  isVariable(data) {
    return !(data instanceof Object || Array.isArray(data))
  }
}
module.exports = Logger

if (require.main == module) {
  let logger = new Logger(__filename)
  let a = { name: 'xxx' }
  let b = [1, 2, 3]
  logger.info('testing', a)
  logger.error('some thing wrong!')
  logger.debug(a)
  logger.info(a)
  logger.info(b)
}