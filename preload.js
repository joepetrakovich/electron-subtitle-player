const { contextBridge } = require('electron')
const { parse, filter, resync, stringify } = require('subtitle')
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  parseSrt: (filePath) => {
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
        
        // in your event loop, determine the current time
        // if it is larger than the end time of the current subtitle, unpost it
        // if it is larger than the start of the first subtitle in the list, post it and remove it from the list.

        var start;
        var currentCue = null;
        var currentCueNumber = 0;
        var nextCue = cues[0];

        function intervalFunc() {
          if (start === undefined) {
            start = Date.now();
          }
          const elapsed = Date.now() - start;
          //console.log(`elapsed: ${elapsed}`);
          if (currentCue && elapsed >= currentCue.data.end) {
            //console.log(`hiding current cue.`);
            currentCue = null;
          } 
          if (nextCue && elapsed >= nextCue.data.start) {
            currentCue = nextCue;
            currentCueNumber++;
            nextCue = cues.length > currentCueNumber ? cues[currentCueNumber] : null;
            console.log(currentCue.data.text);
          }
        }
        
        setInterval(intervalFunc, 30);
      })
  }
})

