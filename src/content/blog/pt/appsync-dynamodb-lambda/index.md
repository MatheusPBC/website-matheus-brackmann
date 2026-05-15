---
title: "AppSync, DynamoDB e Lambda: quando faz sentido"
description: "Um guia pratico sobre quando uso GraphQL serverless, quando evitar e quais trade-offs aparecem em producao."
date: "May 14 2026"
---

AppSync, DynamoDB e Lambda formam uma combinacao muito poderosa quando o dominio combina com APIs orientadas a dados, eventos e integracoes cloud-native.

Mas essa stack nao e resposta automatica para tudo. Ela brilha quando as consultas sao bem entendidas, quando o sistema precisa escalar sem gerenciar servidor e quando o custo operacional de manter infraestrutura propria nao compensa.

## Onde faz sentido

Uso esse tipo de desenho quando preciso de:

- API GraphQL com contrato claro para frontend e mobile;
- integracoes com Lambdas para regras de negocio;
- DynamoDB para leituras previsiveis e baixa latencia;
- subscriptions para notificacao de mudancas relevantes;
- controle fino de permissoes e resolvers;
- evolucao incremental sem manter um backend monolitico grande.

## Onde da problema

O ponto fraco quase sempre esta na modelagem. DynamoDB nao perdoa consulta improvisada. Se voce desenha tabelas pensando como SQL relacional e depois tenta consultar qualquer coisa de qualquer jeito, a arquitetura fica cara e dificil de manter.

Outro ponto e colocar regra demais em resolver, Lambda demais em caminho sincrono, ou misturar consulta pesada com publicacao em tempo real. Isso aumenta latencia, acoplamento e custo.

## Como eu abordo

Primeiro desenho os acessos principais. Depois separo o que e comando, consulta, evento e notificacao. Entao penso no que precisa ser transacional, no que pode ser eventual, e no que pode ser recalculado ou reprocessado.

Uma boa arquitetura com AppSync nao e a que usa todos os recursos da AWS. E a que deixa claro por que cada parte existe.
