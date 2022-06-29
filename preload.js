const { contextBridge } = require('electron')
const { parse, filter } = require('subtitle')
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  parseSrt: (filePath, onComplete) => {
    var cues = [];
    fs.createReadStream(filePath)
      .pipe(parse())
      .pipe(filter(node => node.type === 'cue'))
      .on('data', cue => {
        console.log('parsed cue:', cue)
        cues.push(cue);
      })
      .on('error', console.error)
      .on('finish', () => {
        console.log('parser has finished')
        onComplete(cues);
      })
  }
})

