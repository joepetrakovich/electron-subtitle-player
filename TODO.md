
## SUN GOALS:
-----------------------
DONE - set up a electron project
DONE - see if I can get it transparent black

## MON GOALS:
------------------------
DONE - and put on bitbucket
DONE - just parse the subtitle file. 

## TUES GOALS:
-----------------------
DONE - get access to a timer in the render loop (request anim frame?)
DONE - using current time of timer in millis and a framerate?, walk through a datastructure of cues and show/hide them (a cue?)
DONE - actually show/hide the cue text on the bar in large white letters.


## SUN GOALS
-----------------
DONE - show load instructions and status when the first sub hasn't started
DONE - adjust load instructions appearance and subtitle styles centering


## MON GOALS
-----------------
DONE - add current time indicator on hover.
- add pause


## TODO NEXT:
-----------------------
- handle when text gets super long, can it auto flow. should be pretty damn rare but just in case.
- handle pausing, 
- handle keyboard left right scrubbing
- show curr time on hover.
- show window movement bars on hover.
- handle retiming slowdown/speedup.
- visualize the queue and the timer's movement through it.


## NOTES:
-----------------------
- may make sense to have a state machine for pausing?
- probably my timing code will have to change if I end up making an extension with ability to see the videos current time
gpu_init.cc(446)] Passthrough is not supported, GL is disabled, ANGLE is
- If I can't play WebTTV with an infinite video stream, maybe I can just render the SRT file at the right times to a timer.  
Parse it and then with a timer, if curr time is in range of a parsed block, display that until it leaves range.  would have to allow for more than one box to appear (below any current box.)
- interval tree algorithm to show/hide queried current time, may not be necessary though since an SRT file is usually sorted, right? we could just have a render loop constantly checking if we are entered or exiting the next cue. tricky though if you scrub around.. scrubbing will need to find it's placement in the horizontal timespan. user scrubs video to 00:03:32, that might place us in-between cues.
- to render the little moving bubbles like language reactor, you could draw pixels width = to length in seconds * fraction of space.  then the dead space could just also be the same pixel math of empty space, and the bar would move with the master timer.
- The transparent thing isn't THAAAT important, it could still just be an "always on top" black window.  Black is easier to read subs anywayn
- maybe it has to be an extension for any web movies, then for movies you own I suppose you could use substosrs or maybe I can configure a remote app to control the other app with easy mapping.
- could record thumbnails at each subtitle so scrubbing would preview that thumbnail so you could sync. well.. curr time should also be able to be used for syncing, unless its untimed. then you could have nudging to align it.

## POTENTIAL FEATURES:
-----------------------
- be able to pin it to another window?
- I suppose if I did have an extension, I could sync it to the play pause.
- could optionally support a video if you have it, and then it would actually sync to the play/pause/scrub of the video
- map a play pause button that it listens for even if it also controlling the external video
- dictionary lookups, same as language reactor
- user styles
- auto furigana add
- user-driven timing adjustments, slow down and speed up, scrubbing, edits.