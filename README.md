# Documentação do Projeto TurmaQA - Backend

## Visão Geral

Esta é a documentação do projeto TurmaQA, que descreve o backend do projeto. O TurmaQA é uma plataforma que permite aos usuários fazer perguntas e obter respostas em um ambiente de colaboração. Esta documentação fornecerá informações sobre a estrutura do projeto, sua arquitetura e como os desenvolvedores podem contribuir para ele.

## Estrutura de Pastas

O projeto backend está organizado da seguinte forma:

- `controllers`: Contém os controladores da aplicação responsáveis por tratar as requisições HTTP.
- `data`: Armazena dados estáticos ou funções utilitárias para acesso a dados.
- `middlewares`: Contém middlewares utilizados no tratamento das requisições.
- `models`: Define os modelos de dados da aplicação.
- `routes`: Define as rotas da API da aplicação.
- `utils`: Utilizado para funções auxiliares e utilitárias.

## Ferramentas e Tecnologias

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript do lado do servidor.
- [Express.js](https://expressjs.com/): Framework web para Node.js.
- [TypeScript](https://www.typescriptlang.org/): Linguagem de programação para JavaScript tipada.
- [ESLint](https://eslint.org/): Ferramenta para análise de código.
- [dotenv](https://www.npmjs.com/package/dotenv): Carregamento de variáveis de ambiente.
- [uuid](https://www.npmjs.com/package/uuid): Geração de identificadores únicos.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js: [Download aqui](https://nodejs.org/)
- Yarn (recomendado) ou npm
- Um arquivo `.env` na raiz do projeto contendo as configurações necessárias (ver abaixo).

## Configurações

O projeto utiliza o pacote `dotenv` para gerenciar variáveis de ambiente. Você deve criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
PORT=8080
```

`PORT` é a porta em que o servidor Express será iniciado.

## Padrões de Código
O projeto utiliza ESLint para manter um código limpo e consistente. Certifique-se de seguir as diretrizes definidas no arquivo .eslintrc.json.

## SOLID
O projeto está estruturado com base nos princípios SOLID, visando a facilidade de manutenção e extensibilidade do código. Cada parte do projeto tem responsabilidades claras e pode ser estendida de forma independente.

## Banco de Dados
O projeto utiliza um banco de dados JSON local para armazenar dados.

## Rodando localmente

1. Clone o projeto

```bash
git clone git@github.com:Luzin7/TurmaQA-Backend.git
```

2. Entre no diretório do projeto
   
 ```bash
cd turmaQA-Backend
```

3. Instale as dependências

```bash
  npm install

  ou

  yarn
```

4. Inicie o servidor

```bash
  npm run dev

  ou

  yarn dev
```
