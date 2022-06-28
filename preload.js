const { contextBridge } = require('electron')
const { parse, resync, stringify } = require('subtitle')
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  parseSrt: (filePath) => {
    fs.createReadStream(filePath)
      .pipe(parse())
      .on('data', node => {
        console.log('parsed node:', node)
      })
      .on('error', console.error)
      .on('finish', () => console.log('parser has finished'))
  }
})

