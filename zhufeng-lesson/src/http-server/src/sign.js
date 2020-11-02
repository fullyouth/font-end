const crypto = require('crypto');

const sign = str => {
  return crypto.createHash('md5').update(str).digest('base64');
}

module.exports = sign