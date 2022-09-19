const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const progressStream = require('progress-stream');
const util = require('./util');


function downloadFile(url, outputDir, cb) {
  if (!url) throw  new Error('please give a url');
  if (!outputDir) outputDir = path.join(__dirname, 'download-files');
  try {
    util.makeDir(outputDir);
  } catch (e) {
    console.log(e);
  }
  const basename = path.basename(url);
  let fileName = basename.slice(0, basename.lastIndexOf('.'));
  let fileExtension = basename.slice(basename.lastIndexOf('.') + 1);
  let savePath = outputDir + '/' + fileName + '.' + fileExtension;
  const tmpFileSavePath = outputDir + '/' + fileName + '.download.catch';

  // createWriteStream
  const fileStream = fs.createWriteStream(tmpFileSavePath)
    .on('error', (e) => {
      console.log(e);
    })
    .on('finish', function () {
      fs.renameSync(tmpFileSavePath, savePath);
    });

  // fetch
  return new Promise((resolve, reject) => {
    fetch(url,
      {
        method: 'get',
        headers: {'Content-Type': 'application/octet-stream'},
      })
      .then(res => {
        const fileSize = res.headers.get("content-length");
        const contentType = res.headers.get("content-type");
        const fileType = contentType ? contentType.split('/')[1] : null;
        // file type
        if (fileType && fileType === 'octet-stream') {
          savePath = outputDir + '/' + fileName + '.' + fileExtension;
        } else {
          savePath = outputDir + '/' + fileName + '.' + fileType;
        }

        const stream = progressStream({
          length: fileSize,
          time: 100
        });

        res.body.pipe(stream).pipe(fileStream);

        stream.on('progress', function (progressData) {
          setTimeout(() => {
            if (cb && typeof cb === 'function') {
              cb(progressData.percentage);
            } else {
              if (progressData.percentage === 100) {
                resolve(true);
              }
            }
          }, 0);
        });
      })
      .catch(e => {
        reject(e);
      });
  })
}

module.exports = downloadFile;
