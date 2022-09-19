const fs = require('fs');

const isExistsDir = function (dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  } else {
    return false;
  }
}

const makeDir = function (dirPath) {
  if (!this.isExistsDir(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}


module.exports = {
  isExistsDir,
  makeDir
}
