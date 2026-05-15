---
title: "RAG, MCP, and agents in engineering workflows"
description: "How I see applied AI for understanding codebases, investigating bugs, writing documentation, and accelerating maintenance without losing control."
date: "May 13 2026"
---

Applied AI in software development should not be only about asking a model to write code. The biggest value, for me, is reducing discovery time and improving the quality of technical decisions.

In real codebases, the problem is rarely writing one isolated function. The problem is understanding flow, impact, contracts, related tests, existing patterns, and regression risk.

## Where RAG helps

RAG helps when the model needs to answer from evidence. Instead of relying only on conversation context, the tool retrieves relevant snippets, confirms files, and synthesizes a traceable answer.

That is useful for questions like:

- where does this feature start and end?
- which tests cover this handler?
- what is the impact of changing this contract?
- is there another similar flow?

## Where MCP fits

MCP connects agents to real tools: repository, local database, Docker, logs, GitHub, documentation, and other systems. The agent becomes less about text and more about evidence.

The important part is control. A good agent is not one that does everything blindly. It asks, confirms, limits scope, and shows where each conclusion came from.

Speed without discipline creates technical debt faster. Good AI needs process.
