---
title: "Hello world!"
description: "My homepage is live! (finally)"
pubDate: 2026-10-13
---

![Obi-Wan Kenobi saying "Hello there."](https://media.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif)

You are now reading the first post on my homepage. Interesting times!

It took me 2.96 years and 1208 commits to _main_ to get here. That might tell you the focus of this webpage has been somewhere other than the page content. The page started from the single fact that I needed something to deploy on my home Kubernetes cluster. It served its initial purpose when I finally managed to figure out how my router, Argo CD Image Updater and Cilium gateways actually function. More about those in a later post.

## How it is built

All the answers are in the [source code](https://github.com/Arskah/homepage), really.

My original idea was to have it function as a base where I could test out different frontend techs. Astro and its ability to mix and match different frameworks felt like an obvious choice. You know, write htmx for one thing and React for another. Static sites without JS bloat were a nice bonus. I started with the [Astro blog template](https://astro.build/themes/details/blog/) and spent the first days testing out React components within Astro. Later on, I tried [Vanilla Extract](https://vanilla-extract.style/) for styles. Vanilla Extract is gone and React is down to a handful of components, so time well spent, I guess... At least there are visual regression tests with Playwright and an automated versioning and release process with release-please! At the time of writing, the styles are done with [StyleX](https://stylexjs.com/), inspired by [this blog post](https://linear.app/now/styling-linear-for-the-future-stylex) from Linear (a nice tool, can't recommend it enough), and components are mostly pure Astro.

## What next?

For this page, not sure. There's a lot more to discuss on the hosting side of things, so a post about my server and Kubernetes cluster is a viable next step. Writing code with agents instead of by hand has also saved me enough time to finally try replacing one piece of Romanian abandonware that became familiar to me through my hobbies at university. After that, who knows?
