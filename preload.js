const { contextBridge, ipcRenderer } = require('electron')
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
  }, 
  onGlobalKeyPressed: (callback) => ipcRenderer.on('global-key-pressed', callback)
})

// ipcRenderer.on('global-key-pressed', (event, value) => {
//   if (value == "Space") {
//     window.playBackState = window.playBackState == "paused" ? "playing" : "paused";
//   }
// });

