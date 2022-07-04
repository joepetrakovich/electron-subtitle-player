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

  window.electron.parseSrt(e.dataTransfer.files[0].path, onSubtitleParsingComplete, onSubtitleParsingError);
});

window.electron.onGlobalKeyPressed((_event, value) => {
  if (value == "Space") {
    if (playbackTimer?.state == 0) {
      playbackTimer.play();
      console.log("playing");
    } else {
      playbackTimer?.pause();
      console.log("paused");
    }
  }
})

class PlaybackTimer {
  
  #lastStepStartTime = 0;

  constructor(callback, fps) {
    this.callback = callback;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.deltaTime = 0;
    this.fps = fps;
    this.state = 0;
    this.#lastStepStartTime = 0;
  }

  play() {
    this.state = 1;
    this.startTime = Date.now();
    this.#lastStepStartTime = Date.now();
    this.timer = setInterval(this.#step.bind(this), this.fps);
  }

  pause() {
    this.state = 0;
    clearInterval(this.timer);
  }

  #step() {
    var now = Date.now();
    this.deltaTime = now - this.#lastStepStartTime;
    this.#lastStepStartTime = now;
    console.log(`delta: ${this.deltaTime}`);
    this.elapsedTime += this.deltaTime;
    console.log(this.elapsedTime)
    this.callback();
  };
}

const playbackTimer = new PlaybackTimer(renderCues, 30);

var start;
var cues = null;
var currentCue = null;
var currentCueNumber = 0;

const cue = document.getElementById('cue');
const bar = document.getElementById("bar");
const timeIndicator = document.getElementById("time");

function onSubtitleParsingComplete(parsedCues) {
  cues = parsedCues;
  currentCue == null;
  nextCue = cues[0];
  window.playbackTime = 0;

  bar.classList.remove("dropzone");
  cue.innerText = "All set, the first subtitle is on its way now..."

  playbackTimer.play();
}

function renderCues() {
  elapsed = playbackTimer.elapsedTime;
  timeIndicator.innerText = convertMillisecondsToHumanReadableTime(elapsed);
  
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
    cue.innerHTML = currentCue.data.text;
  }
}

function onSubtitleParsingError(error) {
  console.log(error);
}

function convertMillisecondsToHumanReadableTime(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

  const time = hours == 0 ? [minutes.toString(), seconds.toString().padStart(2, "0")]
                        : [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0")];

  return time.join(":");
}
