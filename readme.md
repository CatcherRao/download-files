## A download file tool for nodeJs



### Install

```
npm install node-get-files
```

### how to  use?

```
const download = require('node-get-files');
const path = require('path');

const fileURL = 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJIY5YZHpyKaJicDeRO87WLhqblFXlU6eeaIfSpQ7Pf9F9jv7fFgfqXibhib8Hdxj0Ah3hFsrFx8ej4Q/132';

// get download process
download(fileURL, null, (process) => {
  if (process === 100) {
    console.log('download success~');
  }
})

// return promise
download('https://npm.taobao.org/mirrors/node/v14.8.0/node-v14.8.0-x64.msi').then((res) => {
  if (res === true) {
    console.log('download success~');
  }
});

// set output dir
download('https://npm.taobao.org/mirrors/node/v14.8.0/node-v14.8.0-x64.msi', path.resolve(__dirname, './download'))
  .then((res) => {
    if (res === true) {
      console.log('download success~');
    }
  })
```