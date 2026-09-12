<div align="center">

# 🚘 XcleanCar

### Sistema de gerenciamento para empresas de estética automotiva

Uma aplicação desenvolvida para centralizar e facilitar o gerenciamento dos processos de uma empresa de estética automotiva.

<br>

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=fff)

</div>

---

## 📖 Descrição do Projeto

O **XcleanCar** é um sistema desenvolvido com o objetivo de auxiliar no gerenciamento das atividades de uma empresa especializada em estética automotiva (XcleanCar).

A aplicação busca concentrar as principais informações da operação em um único ambiente, foi pensado e está sendo desenvolvido conforme a gestão que apriori era feita por meio de Excel.

O projeto também está sendo um desafio pessoal estou descobrindo mais com relação a banco de dados e vou me aventurar com segurança também, tanto nas requisições quanto na gestão/versionamento desse projeto

A respeito das tecnologias que tenho utilizado:

Node.js - Ambiente de execução no servidor.
Typescript - Linguagem de desenvolvimento.
Fastify - Construção da API.
Prisma - Comunicação e Gerenciamento do banco de dados.
Zod - Validação e tipagem de dados.
TailWind - Estilização e construção das telas
Electron - Framework para geração de app Desktop.

Atualmente estou usando banco local, mas acessando por meio de API pensando em possível expansão futuramente

---

## Sobre o Projeto

Entre as funcionalidades disponíveis no projeto estão:

- 👤 CRUD de Clientes;
- 🚘 CRUD de Veículos e relação com clientes;

> O projeto está sendo desenvolvimento e novas funcionalidades serão adicionadas posteriormente.

---

## 📂 Estrutura de Arquivos

A estrutura do projeto segue uma organização voltada à separação das responsabilidades da aplicação.

```text
📦 apps
│
├── 📂 api
│   │── 📂 prisma
│   │   ├── 📂 migrations
│   │   └── 📄 schema.prisma
│   └──📂 src
│       ├── 📂 database
│       ├── 📂 modules
│       ├── 📄 app.ts
│       ├── 📄 server.ts
├── 📂 desktop
│   ├── 📂 src
│   │   ├── 📂 main
│   │   ├── 📂 preload
│   │   └── 📂 renderer
│   │       └── 📂 src
│   │           ├── 📂 assets
│   │           ├── 📂 components
│   │           ├── 📂 features
│   │           ├── 📂 pages
│   │           ├── 📂 services
│   │           ├── 📄 App.tsx
│   │           └── 📄 main.tsx

```

---

## 📥 Como Baixar

### Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado em sua máquina:

- Git
- Node.js
- Npm
- Banco de dados utilizado pelo projeto

---

### 1. Clone o repositório

Execute:

```bash
git clone
```

### 2. Acesse a pasta do projeto

```bash
cd <xclean>
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo:

```text
.env
```

nas pastas `\apps\api\src` e `\apps\desktop\` seguindo os arquivos `.env_template` como exemplo.

> [!IMPORTANT]
> ⚠️ **Nunca envie o arquivo `.env` para o GitHub.**
> O `.env` deve estar incluído no `.gitignore`.

### 5. Gere o Prisma Client

Após configurar o banco de dados:

```bash
cd .\apps\api
npx prisma generate
```

### 6. Execute as migrations

Para preparar o banco de dados:

```bash
npx prisma migrate dev
```

Caso esteja configurando o projeto pela primeira vez, esse comando criará ou atualizará as tabelas de acordo com o arquivo:

```text
prisma/schema.prisma
```

### 7. Inicie o projeto

Execute:

```bash
cd ..\..\
npm run dev
```

Após a inicialização, o terminal deverá mostrar informações a respeito da API

Exemplo:

```text
http://localhost:3333
```

E o Electron irá abrir uma janela com a aplicação

---

## 📝 Padrão de Commits

Para manter o histórico do projeto organizado, os commits devem seguir um padrão baseado no **Conventional Commits**.

A estrutura recomendada é:

```text
tipo: descrição da alteração
```

### Tipos de commit

| Tipo       | Quando utilizar                                  |
| ---------- | ------------------------------------------------ |
| `feat`     | Nova funcionalidade                              |
| `fix`      | Correção de erro                                 |
| `refactor` | Refatoração sem alteração da funcionalidade      |
| `style`    | Alterações de estilo ou formatação               |
| `docs`     | Alterações de documentação                       |
| `test`     | Criação ou alteração de testes                   |
| `chore`    | Tarefas de manutenção e configuração             |
| `perf`     | Melhorias de performance                         |
| `build`    | Alterações relacionadas ao build ou dependências |
| `ci`       | Alterações relacionadas à integração contínua    |
