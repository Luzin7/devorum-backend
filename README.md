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

## Como colaborar

### Passo 1: Fork do Repositório

O primeiro passo é fazer um fork do repositório principal para a sua própria conta no GitHub. Isso criará uma cópia do projeto que você pode modificar sem afetar o repositório original.

1. Acesse o repositório do TurmaQA em https://github.com/Luzin7/TurmaQA-Backend.
2. No canto superior direito da página, clique no botão "Fork" para criar uma cópia do projeto na sua conta.

### Passo 2: Clone o Repositório

Agora você precisa clonar o seu fork do repositório para a sua máquina local para que você possa fazer alterações.

```bash
git clone git@github.com:Luzin7/TurmaQA-Backend.git
```

### Passo 3: Crie uma Branch

Antes de fazer alterações, crie uma branch para trabalhar. Use um nome descritivo para a branch que indique a natureza das alterações que você está fazendo.

```bash
git checkout -b minha-tarefa
```

### Passo 4: Faça as Alterações

Antes de fazer alterações, crie uma branch para trabalhar. Use um nome descritivo para a branch que indique a natureza das alterações que você está fazendo.

### Passo 5: Commite Suas Alterações

Quando você estiver satisfeito com suas alterações, faça um commit das mudanças. Lembre-se de utilizar [commits convencionais](https://www.conventionalcommits.org/en/v1.0.0/).

```bash
git commit -m "<type>[scope]: <description>"
```

### Passo 6: Push para o Seu Fork

Envie suas alterações para o seu fork no GitHub.

```bash
git push origin minha-tarefa
```

### Passo 7: Crie um Pull Request

Agora que suas alterações estão no seu fork no GitHub, você pode criar um Pull Request (PR) para enviar as alterações de volta para o repositório original.

1. Acesse a página do seu fork no GitHub.

2. Clique no botão "New Pull Request".

3. Escolha a branch da qual você fez as alterações no seu fork para comparar com a branch principal do repositório original.

4. Dê um título e uma descrição significativa para o seu PR explicando o que você fez.

5. Clique no botão "Create Pull Request" para enviar o PR.

### Passo 8: Revisão e Merge

O codeowner revisará suas alterações e, se estiverem corretas e úteis, o seu PR estará no projeto principal.

Parabéns, você contribuiu para o projeto!

### Passo 9: Não esqueça!

Mantenha seu fork atualizado com as últimas alterações do projeto principal. Para fazer isso, primeiro atualize seu fork localmente:

```bash
git remote add upstream git@github.com:Luzin7/TurmaQA-Backend.git
git fetch upstream
git checkout main
git merge upstream/main
```

Lembre-se, estamos aqui para colaborar e melhorar o projeto juntos. Se você tiver dúvidas ou precisar de ajuda, não hesite em perguntar.

