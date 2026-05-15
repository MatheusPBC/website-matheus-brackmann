---
title: "Como penso arquitetura serverless para telemetria IoT"
description: "Notas sobre Lambda, DynamoDB, AppSync, custo, fan-out e operacao quando o volume deixa de ser pequeno."
date: "May 15 2026"
---

Telemetria IoT parece simples no inicio: um dispositivo manda uma medicao, a API recebe, o banco salva e alguem visualiza em uma tela.

O problema aparece quando isso vira escala real. O volume deixa de ser uma sequencia de eventos isolados e passa a ser um fluxo continuo de leituras, estados, timestamps, alarmes, agregacoes e usuarios conectados esperando atualizacao quase em tempo real.

Nesse cenario, minha preocupacao principal nao e apenas "qual servico usar". E entender onde cada evento nasce, quantas vezes ele sera lido, quem realmente precisa dele, quanto custa propagar essa informacao e como investigar quando algo falha.

## O desenho mental

Uma arquitetura serverless boa para telemetria geralmente separa quatro responsabilidades:

- ingestao de eventos;
- validacao e normalizacao;
- persistencia consultavel;
- distribuicao para consumidores interessados.

AWS Lambda encaixa bem quando o processamento e orientado a evento. DynamoDB ajuda quando o acesso e previsivel e a chave foi desenhada a partir das consultas reais. AppSync e GraphQL ajudam quando o cliente precisa consumir dados de forma organizada e, em alguns casos, receber atualizacoes por subscriptions.

O erro comum e tratar tempo real como broadcast infinito. Se todo dado novo e empurrado para todo mundo, o custo cresce junto com o ruido. Por isso penso em interest management: quem esta olhando esse dispositivo? quem precisa desse evento agora? o dado pode ser agregado? existe estado suficiente para evitar fan-out desnecessario?

## O que eu costumo observar

- A chave do DynamoDB nasceu das telas ou de uma entidade generica?
- Existe diferenca entre dado bruto, dado normalizado e dado pronto para leitura?
- O fluxo consegue ser reprocessado?
- Logs mostram device, usuario, stage, correlation id e decisao tomada?
- O custo por mensagem continua aceitavel quando o volume multiplica?

Serverless nao elimina arquitetura. Ele so muda onde a complexidade aparece: eventos, limites, retries, permissoes, observabilidade e modelagem de dados.
