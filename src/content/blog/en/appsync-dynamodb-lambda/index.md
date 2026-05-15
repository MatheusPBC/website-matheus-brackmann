---
title: "AppSync, DynamoDB, and Lambda: when it makes sense"
description: "A practical view on when I use serverless GraphQL, when I avoid it, and which trade-offs show up in production."
date: "May 14 2026"
---

AppSync, DynamoDB, and Lambda are a powerful combination when the domain fits data-oriented APIs, events, and cloud-native integrations.

But this stack is not an automatic answer for everything. It shines when access patterns are understood, when the system needs to scale without server management, and when the operational cost of maintaining custom infrastructure is not worth it.

## Where it fits

I like this design when I need:

- a GraphQL API with a clear contract for frontend or mobile clients;
- Lambda integrations for business rules;
- DynamoDB for predictable low-latency reads;
- subscriptions for relevant change notifications;
- fine-grained permissions and resolvers;
- incremental evolution without a large monolithic backend.

## Where it breaks

The weak point is usually modeling. DynamoDB does not forgive improvised queries. If tables are designed like relational SQL and later queried in arbitrary ways, the architecture becomes expensive and hard to maintain.

Another risk is putting too much logic in resolvers, too many Lambdas in synchronous paths, or mixing heavy reads with real-time publishing. That increases latency, coupling, and cost.

A good AppSync architecture is not the one that uses every AWS feature. It is the one where each part has a reason to exist.
