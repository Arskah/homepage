---
title: "RadiodioDJ: replacing RadioDJ"
description: "Why I am writing playout software for a student radio, and how years of RadioDJ decided the feature list."
pubDate: 2026-10-13
---

<!-- TODO: set pubDate when publishing, and drop the leading underscore from the file name -->

The [first post](/blog/hello-world/) mentioned a piece of Romanian abandonware that I am trying to replace. Its name is [RadioDJ](https://www.radiodj.ro/), and the replacement is [RadiodioDJ](https://radiodiodj.org): desktop playout software for radio stations, for macOS, Windows and Linux. The source is in [Arskah/radiodiodj](https://github.com/Arskah/radiodiodj).

## Radiodiodi and RadioDJ

[Radiodiodi](https://radiodiodi.fi) is a student radio. Playout software is the program in the studio that actually puts sound on air: it holds the music library, plays the queue, and drops in the jingles and commercials. At Radiodiodi that program has been RadioDJ since 2017 or 2018.

<!-- TODO: confirm the year, and add a sentence on what Radiodiodi is (who runs it, when it broadcasts) and what your role there was -->

RadioDJ is free, it runs on Windows only and it keeps its library in a MySQL database that has to be installed and looked after next to it.

<!-- TODO: check the two claims above against how you remember the setup, and say when RadioDJ last got a release -->

## A feature list written by pain points

Almost every feature of RadiodioDJ is there because of how we used RadioDJ, or because of something that hurt in it.

<!-- TODO: the pain points are yours to tell. The list below is what the repository suggests; keep, fix or replace each one. -->

- **Three libraries.** Music, commercials and jingles live in separate folders. This was in the repository on the first day.
- **AUTO and MANUAL.** The station runs itself through the night, and a host drives every transition by hand during a show.
- **Interleaving.** A jingle every four tracks and a commercial every eight, without anyone building that into a playlist.
- **Rotation rules.** The same track, or the same artist, does not come back inside a set window.
- **A library on a network share.** Tracks are read whole into memory and fetched ahead of the playlist, so a share that stalls in the middle of a show does not stall the output.
- **No database server.** The library is one SQLite file.
- **Tracks keep their identity.** Moving or renaming files does not lose cue points or play counts.

## Half a year in the commit log

The first commit is from 26 April 2026. That day's log ends with a packaged Electron app and release 0.2.0. It also has a `CLAUDE.md`, which says a lot about how the project is written: as I said in the first post, the time saved with agents is the reason this exists at all.

Some turns since then:

- **27 April:** the interface is rewritten in Svelte 5.
- **5 May:** the app is ported from Electron to Tauri 2, with an audio engine written in Rust. Playing audio through Chromium, with ffmpeg transcoding what it could not play, was not going to carry a radio station. The cue deck, for listening to a track on headphones before it goes on air, arrives the same day.
- **Summer:** quiet. Nothing in June, and a handful of commits in August.
- **31 July:** the app gets its name, RadiodioDJ, and a designed interface.
- **September:** the busiest month, with over a hundred commits. Every deck now plays into a program bus, so two tracks can overlap. Tracks get five cue points each, and later the app works them out by itself. Levels are evened out with ReplayGain. The project gets a GPLv3 license, and the macOS build is signed and notarized.
- **October:** [radiodiodj.org](https://radiodiodj.org) goes up, the app starts updating itself, and saved playlists land. Work starts on a shared music library, in [music-library](https://github.com/Arskah/music-library).

At the time of writing the repository has 567 commits, and the latest release is 0.32.2.

<!-- TODO: has it been on air yet? If not, when is the first real test? -->

## What next?

<!-- TODO: the first broadcast with it, the shared library, 1.0? -->
