---
title: "VPS deploys without romance: build, Nginx, and rollback"
description: "The minimum I like to guarantee before putting a site online on a VPS."
date: "May 12 2026"
---

Deploying a site to a VPS can look like copying files to `/var/www` and pointing Nginx to them. For a quick test, that works. For something you want to maintain, I prefer a few guardrails.

The first one is separating build from publication. The build should generate a clear artifact, usually a `dist` directory. Publication should replace what is in production in a predictable way.

## A healthy minimum

- local or server-side build with a reproducible command;
- release folder or simple backup of the previous version;
- Nginx serving only final files;
- accessible logs;
- HTTP test after the switch;
- rollback known before deployment.

## Why it matters

The problem is not deploying when everything works. The problem is knowing what to do when the page is blank, the certificate fails, Nginx does not reload, or the build generated the wrong paths.

A good deploy is boring: you know the command, the artifact, where logs are, and how to go back.

When a domain enters the picture, HTTPS and DNS become part of the flow. Until then, testing through the IP and validating the application first is usually the simplest decision.
