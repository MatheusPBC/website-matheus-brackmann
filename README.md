# Matheus Brackmann

Site pessoal e portfolio tecnico de Matheus Brackmann, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Sobre

Este projeto apresenta meu perfil profissional, experiencias, projetos, artigos tecnicos e curriculos em PDF em portugues e ingles.

O foco do conteudo e backend, cloud, DevOps, AWS serverless, IoT, dados em alto volume, RAG, MCP e agentes de IA aplicados a engenharia de software.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Markdown com frontmatter para conteudo
- LaTeX para geracao dos curriculos em PDF

## Estrutura

| Caminho | Descricao |
| :-- | :-- |
| `src/app/` | Rotas, layouts e paginas do Next.js |
| `src/components/` | Componentes React reutilizaveis |
| `src/content/` | Blog, projetos, experiencias, educacao, skills e lideranca |
| `src/data/cv-data.json` | Dados centrais do perfil |
| `src/i18n/` | Textos e utilitarios de idioma |
| `src/lib/latex/` | Templates LaTeX dos curriculos |
| `public/` | PDFs, favicons e assets publicos |
| `scripts/generate-resume-pdf.mjs` | Script de geracao dos curriculos |

## Rodando localmente

```sh
npm install
npm run dev
```

O site fica disponivel em `http://localhost:3000`.

## Build

```sh
npm run build
```

O build executa a geracao dos curriculos e depois gera o build de producao do Next.js.

Para rodar apenas a validacao TypeScript:

```sh
npm run lint
```

## Curriculos

Os PDFs gerados ficam em:

- `public/matheus-brackmann-cv-en.pdf`
- `public/matheus-brackmann-cv-pt.pdf`

Para gerar somente os curriculos:

```sh
npm run build:resume
```

Se `tectonic` ou `pdflatex` nao estiver disponivel, o script apenas pula a geracao dos PDFs. Para transformar isso em erro de build, use:

```sh
RESUME_PDF_STRICT=1 npm run build:resume
```

## Deploy

O projeto esta pronto para deploy na Vercel.

Config padrao:

| Campo | Valor |
| :-- | :-- |
| Framework | Next.js |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output | Padrao do Next.js |

## Licenca

Uso pessoal. O codigo pode servir como referencia, mas o conteudo profissional, textos e curriculos pertencem a Matheus Brackmann.

## Referencias e citacoes

Este site foi evoluido a partir de um portfolio pessoal anterior e reestruturado para Next.js, mantendo apenas referencias tecnicas úteis e substituindo o conteudo pelo perfil profissional de Matheus Brackmann.

Repositorios e materiais usados como base ou referencia:

- [Next.js](https://github.com/vercel/next.js) — framework principal usado na versao atual do projeto.
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) — sistema de utilitarios usado para a camada visual.
- [Bear Blog default CSS](https://github.com/HermanMartinus/bearblog/blob/297026a877bc2ab2b3bdfbd6b9f7961c350917dd/templates/styles/blog/default.css) — referencia historica para parte dos estilos globais iniciais.
- [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp) — referencia usada para configurar o MCP oficial da Vercel no fluxo de desenvolvimento.
