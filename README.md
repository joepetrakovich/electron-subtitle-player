# subkit

A basic .srt Subtitle playback app built on ElectronJS.

While learning Japanese, I often came upon native Japanese shows or movies that didn't have subtitles included.  It was relatively easy to find the raw `.srt` subtitle files to go along with the videos, so I just needed a simple way to play them.

This app opens up a transparent black bar on which you can drag and drop an .srt file and it will begin to play using it's own internal timer.  Pressing the space bar will pause the subtitles, but it's up to the user to also pause the video :D

Currently, the app steals the space bar keypress globally, so it may swallow it.  You can change that by registering the accelerator locally instead of globally.
