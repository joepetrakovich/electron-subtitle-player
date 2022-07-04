const { contextBridge } = require('electron')
const { parse, filter } = require('subtitle')
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  parseSrt: (filePath, onComplete, onError) => {
    var cues = [];
    fs.createReadStream(filePath)
      .pipe(parse())
      .pipe(filter(node => node.type === 'cue'))
      .on('data', cue => {
        console.log('parsed cue:', cue)
        cues.push(cue);
      })
      .on('error', (error) => {
        console.error(error);
        if (typeof onError === 'function') onError(error);
      })
      .on('finish', () => {
        console.log('parser has finished')
        onComplete(cues);
      })
  }
})

