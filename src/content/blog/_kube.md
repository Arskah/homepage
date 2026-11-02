---
title: "Three clusters later"
description: "From a thesis testbed on MicroK8s to Talos, Cilium and Argo CD: how my home Kubernetes cluster got here."
pubDate: 2026-10-13
---

<!-- TODO: set pubDate when publishing, and drop the leading underscore from the file name -->

In the [first post](/blog/hello-world/) I promised to write about the hosting side of things. This is that post: the history of the cluster this page is served from. The configuration lives in [Arskah/kube](https://github.com/Arskah/kube), and most of what follows is read straight from its commit log.

## It started with a thesis

The cluster is a follow-up to my [master's thesis](https://github.com/Arskah/dippa), which was about Kubernetes sidecars and Zero Trust.

<!-- TODO: one sentence on what the thesis actually found, in your own words -->

Most of the [experiments](https://github.com/Arskah/k8s-sidecar-security) ran on minikube on my laptop. For the final tests I wanted something closer to a real cluster, so I installed MicroK8s on my old Ubuntu server. The thesis was done at the end of 2023. The server, and the habit of running Kubernetes on it, stayed.

<!-- TODO: was Calico the MicroK8s default CNI here, or something you chose? Say a word about why you wanted to leave it. -->

## Take two: kubeadm and GitOps

The repository starts on 9 October 2024 with a commit named "Initialize declarative ArgoCD". By then MicroK8s had been replaced by a single-node kubeadm cluster, and Calico by Cilium: `kubeadm init` was already run with `--skip-phases=addon/kube-proxy`, so that Cilium could take over from kube-proxy.

The first four days hold 60 commits, and the cluster got most of its present shape in them:

- Argo CD managing itself and everything else through an app-of-apps
- Sealed Secrets, cert-manager, a private Docker registry, ingress-nginx and a monitoring stack
- the first real workloads: Caddy, Icecast and a hobby web app
- Argo CD Image Updater annotations, so that new images would roll out by themselves

Half of those 60 commits start with `fix:`. Declarative setups are nice once they work.

## The week Cilium won

In June 2025 I decided that Cilium could also replace ingress-nginx and hand out the load balancer addresses. The log from 17 to 24 June has 69 commits. It includes "fix: rewrite Cilium configs based on a blog post", five consecutive commits named "fix: try to solve deployment issue", and finally "revert: all cilium LB testing".

ingress-nginx stayed.

<!-- TODO: what was the actual blocker? Home router, L2 announcements, hostNetwork? This is the "how my router actually functions" part teased in the first post. -->

## Proxmox and Talos

In November 2025 the cluster moved to [Talos Linux](https://www.talos.dev/). The Ubuntu installation gave way to Proxmox, and the cluster became two Talos virtual machines: one control plane node and one worker. A month later storage moved from local-path volumes to NFS on a NAS, and the sealed secrets were sealed again for the new cluster.

<!-- TODO: why Proxmox and Talos? What did kubeadm on Ubuntu make painful? Did Proxmox come at the same time as Talos (the log only shows Talos, 20 November 2025)? -->

The README kept describing the kubeadm setup for almost a year after that.

## Four days in October

The latest burst is from this month. It starts with "docs: add AGENTS.md" on 8 October 2026, and the following four days have 38 commits, two thirds of them pull requests instead of pushes to `main`:

<!-- TODO: confirm this was the work done with coding agents, and say how it felt compared to June 2025 -->

- the README finally describes Talos, and there is a disaster recovery runbook
- the migration to Gateway API: Cilium's Gateway took over from ingress-nginx, one application at a time, in about ten pull requests on a single day. In 2025 the same idea took a week and ended in a revert.
- dynamic DNS for the apex records, mail alerts, and an alert for certificates that fail to renew
- Talos 1.14 and Kubernetes 1.36, with [tuppr](https://github.com/home-operations/tuppr) to keep them upgraded

## In numbers

At the time of writing the repository has 453 commits. 233 of them are by Renovate and 220 by me, so the most active contributor to my home lab is a bot.

## What next?

<!-- TODO: backups? More nodes? Moving the registry? -->
