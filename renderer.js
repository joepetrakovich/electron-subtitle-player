document.addEventListener("dragenter", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

document.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();

  window.electron.parseSrt(e.dataTransfer.files[0].path, cues => {
    var start;
    var currentCue = null;
    var currentCueNumber = 0;
    var nextCue = cues[0];
    const cue = document.getElementById('cue');

    function renderCues() {
      if (start === undefined) {
        start = Date.now();
      }
      const elapsed = Date.now() - start;
      console.log(`elapsed: ${elapsed}`);
      if (currentCue && elapsed >= currentCue.data.end) {
        console.log(`hiding current cue.`);
        cue.innerText = '';
        currentCue = null;
      } 
      if (nextCue && elapsed >= nextCue.data.start) {
        currentCue = nextCue;
        currentCueNumber++;
        nextCue = cues.length > currentCueNumber ? cues[currentCueNumber] : null;
        console.log(currentCue.data.text);
        cue.innerText = currentCue.data.text;
      }
    }
    
    setInterval(renderCues, 30);
  });
});

