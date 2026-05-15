---
title: "Deploy em VPS sem romantizar: build, Nginx e rollback"
description: "O minimo que eu gosto de garantir antes de colocar um site no ar em uma VPS."
date: "May 12 2026"
---

Subir um site em VPS pode parecer so copiar arquivos para `/var/www` e apontar o Nginx. Para teste rapido, isso funciona. Para algo que voce quer manter, eu prefiro pensar em alguns guardrails.

O primeiro e separar build de publicacao. Build deve gerar um artefato claro, normalmente uma pasta `dist`. Publicacao deve trocar o que esta em producao de forma previsivel.

## O minimo saudavel

- build local ou no servidor com comando reproduzivel;
- pasta de releases ou backup simples da versao anterior;
- Nginx servindo somente arquivos finais;
- logs acessiveis;
- teste HTTP depois da troca;
- rollback conhecido antes do deploy.

## Por que isso importa

O problema nao e fazer deploy quando tudo da certo. O problema e saber o que fazer quando a pagina abre em branco, o certificado falha, o Nginx nao recarrega ou o build gerou caminho errado.

Um deploy bom e chato: voce sabe o comando, sabe onde esta o artefato, sabe onde olhar log e sabe como voltar.

Quando o dominio entra, HTTPS e DNS viram parte do fluxo. Ate la, testar pelo IP e validar a aplicacao primeiro costuma ser a decisao mais simples.
