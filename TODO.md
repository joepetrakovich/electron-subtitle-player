
## SUN GOALS:
-----------------------
DONE - set up a electron project
DONE - see if I can get it transparent black

## MON GOALS:
------------------------
DONE - and put on bitbucket
DONE - just parse the subtitle file. 

## TODO NEXT:
-----------------------
- get access to a timer in the render loop (request anim frame?)
- using current time of timer in millis and a framerate?, walk through a datastructure of cues and show/hide them (a cue?)
- handle pausing, scrubbing
- handle retiming slowdown/speedup.
- visualize the queue and the timer's movement through it.

## NOTES:
-----------------------
- If I can't play WebTTV with an infinite video stream, maybe I can just render the SRT file at the right times to a timer.  
Parse it and then with a timer, if curr time is in range of a parsed block, display that until it leaves range.  would have to allow for more than one box to appear (below any current box.)
- interval tree algorithm to show/hide queried current time, may not be necessary though since an SRT file is usually sorted, right? we could just have a render loop constantly checking if we are entered or exiting the next cue. tricky though if you scrub around.. scrubbing will need to find it's placement in the horizontal timespan. user scrubs video to 00:03:32, that might place us in-between cues.
- to render the little moving bubbles like language reactor, you could draw pixels width = to length in seconds * fraction of space.  then the dead space could just also be the same pixel math of empty space, and the bar would move with the master timer.

- The transparent thing isn't THAAAT important, it could still just be an "always on top" black window.  Black is easier to read subs anywayn

## POTENTIAL FEATURES:
-----------------------
- be able to pin it to another window?
- could optionally support a video if you have it, and then it would actually sync to the play/pause/scrub of the video
- map a play pause button that it listens for even if it also controlling the external video
- dictionary lookups, same as language reactor
- user styles
- auto furigana add
- user-driven timing adjustments, slow down and speed up, scrubbing, edits.