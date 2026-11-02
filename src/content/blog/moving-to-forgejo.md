---
title: "Moving my repositories to Forgejo"
description: "GitHub mirrors, GitLab leftovers and a forge of my own on the home cluster"
pubDate: 2026-11-02
---

This October, GitLab patched not one but two critical CVEs with a CVSS score of 10.0, ten days apart: [CVE-2026-97229](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) and [CVE-2026-110264](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/). Both let an unauthenticated attacker run code on the server through a crafted regular expression, and the first one ended up in CISA's list of actively exploited vulnerabilities. Reading about them, I remembered that I still had a couple of repos there. Most of my code is on GitHub, but the older projects stayed on GitLab, along with a GitLab runner on my home cluster to build them. Each repo built and deployed a little differently depending on where it happened to be born.

I had wanted to move to a self-hosted forge for some time anyway, and GitHub has made that easier to justify lately by becoming almost unbearable to use. I'm not sure whether AI agents are to blame, but their uptime seems to be closer to 98% than to anything you would put in an SLA these days.

So at the end of October I finally did something about it and set up [Forgejo](https://forgejo.org/) at [forge.aarnihalinen.fi](https://forge.aarnihalinen.fi/). Today it hosts the repositories and the web UI you land on at that address, runs CI on a single runner of its own, and its package registry has replaced the container registry I used to run at `registry.aarnihalinen.fi`.

## Proxmox or Kubernetes?

I had two places to run it: a container on my Proxmox host, or my home Kubernetes cluster. I tried Proxmox first, since the [community helper scripts](https://community-scripts.github.io/ProxmoxVE/) have one for Forgejo and it promised a working instance with one command. The install itself was quick. Everything around it was not: the database and the networking were mine to sort out, and I would have been building both from scratch for a single service.

The cluster already had all of that. I had a Postgres database running there with its volumes mounted on my NAS, which has daily backups and a proven track record, and exposing a service is one more route on the Gateway. Adding a new service to the cluster turned out to be the simpler choice in the end.

## Running it on the cluster

Forgejo runs on the cluster like everything else, as an Argo CD application using the official [Helm chart](https://code.forgejo.org/forgejo-helm/forgejo-helm). The setup is in my [kube repository](https://github.com/Arskah/kube). The interesting parts:

- **Database.** PostgreSQL instead of the default SQLite. Repositories sit on a 50Gi NFS volume from the NAS.
- **HTTP.** An `HTTPRoute` on the Cilium Gateway, with the request timeout disabled. Pushing large container image layers takes longer than the default timeout allows.
- **SSH.** This one did not go through the Gateway; Cilium in host network mode does not support TCP listeners. A NodePort gets around that: the router forwards the public SSH port straight to it.
- **Configuration.** One thing to know about the chart: it merges values into the existing `app.ini`, so removing a key keeps its old value. If you want a default back, set it explicitly.
- **Backups.** The NAS backs up both volumes daily, and a CronJob dumps the database nightly. A Postgres volume restored on its own might not match the repository files, so the dump gives a consistent copy.

## Migrating the repositories

For now, the GitLab repos were migrated and the GitHub repos are mirrored. Migration itself proved to be very easy, thanks to Forgejo's built-in import tooling. Basically, just a couple of clicks in the UI and then pointing local repos at the new address.

GitHub stays the origin for the mirrored repositories: they are public anyway, and contributions (mostly Renovate, let's be honest) keep happening on GitHub. Argo CD also still reads `kube`, `homepage` and `music-library` from GitHub.

Forgejo can't ever really be my only hosting platform, either: the very thing it runs on is defined in my `kube` repo. If the cluster goes down, I need that repo to bring it back. I think it should always be at least mirrored to a highly available Git SaaS.

## New container registry and runner

All images now live in Forgejo's container registry under `forge.aarnihalinen.fi/public/`, including the image that serves this page. Forgejo decides package visibility per owner, not per package, so there are two organizations: `public`, which anyone can pull from without logging in, and `private`, for anything I need to keep safe from spying eyes. Bot users added in the UI handle the pushes and pulls.

Forgejo Actions needs a runner of its own, and this was the trickiest part of the whole move.

The first version was a proof of concept modelled on the examples: the runner next to a root `docker:dind` sidecar, privileged, registered for the whole instance. A review of the setup then found plenty to fix:

- Any job that reached the root, privileged daemon was effectively root on the node.
- The runner and the daemon started in parallel, so the runner crashlooped until the daemon was up.
- No resource requests or limits, on 2-vCPU nodes shared with Forgejo and its database.
- An image store with no size limit and no pruning, already at 2.7 GB.
- Every redeploy killed running jobs after the default 30-second grace period.

### Hardening the runner

The first goal was to "make it rootless". That turned out to be the wrong framing. The runner runs my own Node CI and `docker build`s, and the real concern is lateral movement: a compromised job (for example, a malicious npm package) must not get any further than the runner's namespace. Rootless alone does not stop that, since a rootless job can still talk to every Service, the API server, the kubelet, the NAS and the router. A network policy alone means little if the job can step onto the host. It takes both.

### Has nobody solved this already?

Surely others run Forgejo runners on Kubernetes without handing every job the node? I could not find anyone who does:

- The official Forgejo [Kubernetes example](https://code.forgejo.org/forgejo/runner/src/branch/main/examples/kubernetes) runs a privileged root `dind`.
- The [runner chart](https://code.forgejo.org/forgejo-helm/forgejo-runner) in forgejo-helm is privileged by default and not published yet.
- Gitea's [rootless example](https://gitea.com/gitea/act_runner/src/branch/main/examples/kubernetes/rootless-docker.yaml) uses `dind-rootless`, but is still privileged.
- The [forum discussion](https://codeberg.org/forgejo/discussions/issues/200) "rootless runner in kubernetes?" has been open since 2024 without an answer.
- The [forge-runner-k8s-chart](https://git.aquila-consortium.org/guilhem_lavaux/forge-runner-k8s-chart), a single-maintainer project, creates a pod per job and builds with BuildKit. It is the closest in spirit, but it needs RBAC to create pods (a new way out of the namespace) and a shared volume between jobs.

The alternatives each had a price. User namespaces, turned on per pod with `hostUsers: false` in the pod spec, give two real layers, but break NFS mounts. Daemonless builds with buildah or a kaniko fork mean rewriting the workflows. gVisor and Kata are a Talos extension to carry through every upgrade, and Kata is far too heavy for 2-vCPU nodes. A separate Proxmox VM isolates best, but is not GitOps and is one more machine to patch.

### What I settled on

So I followed the official example and changed what mattered. The daemon is `dind-rootless`: still a privileged container, since rootlesskit needs that, but `dockerd` runs as UID 1000, so breaking out to the node needs a local root exploit on top. That is one real layer, which I accept for CI that runs only my own repositories. (Talos ships with `user.max_user_namespaces=0`, so even this needs one sysctl on the nodes.)

The main fence is a default-deny `CiliumNetworkPolicy`: nothing can connect to the runner pod, and it can only reach DNS, Forgejo and public IP addresses, with every private range excluded. The rootless daemon sends the traffic of job containers through slirp4netns inside the pod, so the policy covers the jobs too. The policy now blocks access to the API server, kubelet, Talos API, NAS and database.

The rest came from the example or close to it: TLS between the runner and the daemon, a non-root, read-only runner container with no capabilities and no ServiceAccount token, a fixed runner registration instead of a new one on every start, a 12Gi scratch volume with BuildKit garbage collection, and a 30-minute shutdown timeout so redeploys let running jobs finish.

### And then the database fell over

Right after the rollout, I got a reminder that Kubernetes is still a bit overkill for my setup: Forgejo's Postgres kept dropping out of its Service. It turned out I had never set proper CPU requests on my workloads, and the worker node was running out of CPU.

The runner was the only pod on the node with a real CPU request. Almost every workload ran on that one 2-vCPU node, most of them with no requests at all, and under contention the kernel shares CPU by requests. A CI build got nearly all of it, and the database's readiness probe missed its one-second timeout over a hundred times in a day! Lesson learned: a well-specified workload among unspecified neighbours wins every CPU fight.

The immediate fix was to give Forgejo, its database and Cilium proper requests, cut the daemon's request to 100m so CI only gets what the services leave, raise the probe timeout, and give the node 4 vCPUs from my Proxmox.

I also set up [kube-linter](https://github.com/stackrox/kube-linter) to make sure my workloads define their resources in the future: every container needs CPU and memory requests and a memory limit, checked on every pull request. Linting the Argo CD resources was not as straightforward as I had hoped, though. Most of my apps are Helm charts that Argo CD renders with values kept inside the Application manifests, so kube-linter never sees the actual workloads. They first need to be rendered into plain Kubernetes manifests. For now, a small script renders the charts before the linter runs, and the ones that do not follow the rule yet sit on an ignore list. I am also trying out [argocd-diff-preview](https://github.com/dag-andersen/argocd-diff-preview): it renders both branches with a real Argo CD in a throwaway cluster and posts the diff as a PR comment. Its rendered manifests could replace the script, though it only renders the Applications that a PR changes ([draft PR](https://github.com/Arskah/kube/pull/365)).

### Still open

The CI job holds a registry push credential, and Argo CD Image Updater deploys whatever gets pushed. That is a supply-chain path that needs image signing, so that only signed digests get deployed. And if the runner ever runs code that is not mine, the two-layer `hostUsers: false` variant is the next step.

However, the current setup will probably suit my needs for a while.
