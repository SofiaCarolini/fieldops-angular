# Field Ops (Angular)

## Sobre o projeto

O **Field Ops** é uma plataforma para planejamento, execução, acompanhamento e revisão de inspeções técnicas realizadas em campo.

Inspeções de equipamentos e instalações ainda costumam depender de formulários impressos, planilhas, fotos sem identificação e mensagens informais, o que causa perda de informações e pouca rastreabilidade. O Field Ops propõe um fluxo digital único, que conecta o trabalho do técnico em campo à gestão administrativa.

Este repositório contém a versão em **Angular** do protótipo web da visão do **supervisor**, responsável por organizar os cadastros, planejar inspeções, atribuí-las aos técnicos e revisar os resultados.

## Telas

| Tela | Rota | O que faz |
|---|---|---|
| Login | `/` | Acesso administrativo (apenas visual) |
| Dashboard | `/dashboard` | Indicadores, gráficos, alertas e inspeções recentes |
| Clientes | `/clientes` | Lista, pesquisa, cadastro e exclusão |
| Locais de inspeção | `/locais` | Lista, pesquisa, cadastro e exclusão |
| Equipamentos | `/equipamentos` | Lista, pesquisa, cadastro e exclusão |
| Modelos de checklist | `/modelos-checklist` | Lista, pesquisa, cadastro e exclusão |
| Planejar inspeção | `/planejar` | Agenda uma inspeção e atribui a um técnico |
| Acompanhamento | `/acompanhamento` | Progresso e filtro das inspeções por status |
| Revisão | `/revisao` e `/revisao/:id` | Checklist, evidências, parecer, aprovação ou reprovação |

A interface se adapta a telas menores e o painel tem modo escuro.

> Por ser um protótipo, o projeto usa dados fictícios e não possui backend, banco de dados nem login real. As alterações são perdidas quando a página é recarregada.

## Tecnologias

- Angular 22
- TypeScript
- HTML e SCSS
- Bootstrap 5
- Bootstrap Icons

## Recursos do Angular utilizados

- Componentes standalone
- Rotas com o Angular Router
- Signals (`signal` e `computed`) para o estado das telas
- Serviço injetável (`Dados`) para compartilhar informações entre as telas
- Formulários com `FormsModule`
- Controle de fluxo nos templates (`@for` e `@if`)

## Como executar

É necessário ter o [Node.js](https://nodejs.org) instalado, em uma versão compatível com o Angular 22.

```bash
git clone https://github.com/SofiaCarolini/fieldops-angular.git
cd fieldops-angular
npm install
npm start
```

Depois, abra `http://localhost:4200` no navegador e clique em **Entrar**.

## Estrutura principal

```
src/
├── main.ts                  # inicialização da aplicação
├── styles.scss              # identidade visual e modo escuro
└── app/
    ├── app.routes.ts        # rotas
    ├── dados.ts             # serviço com os dados fictícios
    ├── layout/              # menu lateral e barra superior
    └── pages/
        ├── login/
        ├── dashboard/
        ├── cadastros/       # clientes, locais, equipamentos e modelos
        ├── planejar-inspecao/
        ├── acompanhamento/
        └── revisao-inspecao/
```

## Integrantes

- Letícia Favero
- Jean Bueno
- Sofia Carolini
- Kathelyn Tourino
