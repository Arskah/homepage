---
title: "Hello world!"
description: "My homepage is live! (finally)"
pubDate: 2026-10-13
---

![Obi-Wan Kenobi saying "Hello there."](https://media.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif)

You are now reading the first post on my homepage. Interesting times!

It took me 2.96 years and 1207 commits to main to get here. It might tell you that the focus of this webpage has been somewhere else than in the page content. The page started from the single fact that I needed something to deploy on my home Kubernetes cluster. It served its initial purpose when I finally managed to figure out how my router, Argo CD Image Updater and Cilium gateways actually function. More about those in a later post.

## How it is built

All answers are here really: https://github.com/Arskah/homepage

My original idea was to have it function as a base where I can test out different frontend techs. Astro and its ability to mix-and-match different frameworks felt like an obvious choice. You know, write htmx for one thing and React for another. Static sites without JS bloat were a nice bonus. I started with the <https://astro.build/themes/details/blog/> template and spent the first days testing out [React](https://react.dev/) components and [Vanilla Extract](https://vanilla-extract.style/). None of that is left here anymore so time well spent I guess... At least there are visual regression tests with Playwright and an automated versioning and release process with release-please! At the time of writing the styles are written in StyleX (inspired by this blog post https://linear.app/now/styling-linear-for-the-future-stylex (Linear is a nice tool, can't recommend it enough)) and components are pure Astro.

## What next?

For this page, not sure. There's a lot more to discuss on the hosting side of things, so a post about my server and Kubernetes cluster is a viable next step. The "agentic revolution" also encouraged me to try and replace one piece of Romanian abandonware that became familiar to me through my hobbies at university. After that, who knows?
