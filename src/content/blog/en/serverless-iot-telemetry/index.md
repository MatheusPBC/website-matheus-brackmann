---
title: "How I think about serverless architecture for IoT telemetry"
description: "Notes on Lambda, DynamoDB, AppSync, cost, fan-out, and operations when volume stops being small."
date: "May 15 2026"
---

IoT telemetry looks simple at first: a device sends a measurement, an API receives it, a database stores it, and someone sees it on a screen.

The problem appears when this becomes real scale. The volume stops being isolated events and becomes a continuous stream of readings, states, timestamps, alerts, aggregations, and connected users expecting near real-time updates.

In that scenario, my main concern is not only which service to use. It is understanding where each event starts, how many times it will be read, who actually needs it, how much it costs to propagate it, and how to investigate failures.

## The mental model

A good serverless telemetry architecture usually separates four responsibilities:

- event ingestion;
- validation and normalization;
- queryable persistence;
- distribution to interested consumers.

AWS Lambda works well when processing is event-driven. DynamoDB works well when access patterns are predictable and keys are designed from real queries. AppSync and GraphQL help when clients need structured data and, in some cases, relevant updates through subscriptions.

The common mistake is treating real time as infinite broadcast. If every new event is pushed to everyone, cost grows with noise. That is why I think about interest management: who is looking at this device? who needs this event now? can the data be aggregated? is there enough state to avoid unnecessary fan-out?

Serverless does not remove architecture. It moves complexity into events, limits, retries, permissions, observability, and data modeling.
