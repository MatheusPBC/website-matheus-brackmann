---
title: "RAG, MCP e agentes no fluxo de engenharia"
description: "Como eu enxergo IA aplicada para entender codebases, investigar bugs, escrever documentacao e acelerar manutencao sem perder controle."
date: "May 13 2026"
---

IA aplicada a desenvolvimento nao deveria ser so pedir para um modelo escrever codigo. O maior valor, para mim, esta em reduzir tempo de descoberta e aumentar qualidade das decisoes tecnicas.

Em codebases reais, o problema raramente e escrever uma funcao isolada. O problema e entender fluxo, impacto, contratos, testes relacionados, padroes existentes e risco de regressao.

## Onde RAG ajuda

RAG ajuda quando o modelo precisa responder com base em evidencias. Em vez de depender apenas do contexto da conversa, a ferramenta busca trechos relevantes, confirma arquivos e sintetiza uma resposta rastreavel.

Isso e util para perguntas como:

- onde essa feature comeca e termina?
- quais testes cobrem esse handler?
- qual impacto de mudar esse contrato?
- existe outro fluxo parecido?

## Onde MCP entra

MCP permite conectar o agente a ferramentas reais: repositorio, banco local, Docker, logs, GitHub, documentacao e outros sistemas. Com isso, o agente deixa de ser so texto e passa a operar com evidencias.

O cuidado e importante: agente bom nao e o que executa tudo sozinho. E o que sabe perguntar, confirmar, limitar escopo e mostrar de onde tirou cada conclusao.

## O tipo de IA que me interessa

Eu gosto de IA que melhora engenharia: debugging sistematico, leitura de legado, revisao de impacto, documentacao viva, geracao de testes e investigacao operacional.

Velocidade sem criterio so aumenta divida tecnica. IA boa precisa vir com processo.
